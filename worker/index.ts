// Worker in front of the static site. It handles POST /api/contact and sends
// the message to contact@w4trc.org through Cloudflare Email Service.
// Every other request falls through to the static assets in ./dist.

const TO = "contact@w4trc.org";
const FROM = { email: "noreply@w4trc.org", name: "W4TRC Website" };

const LIMITS = { name: 100, email: 254, message: 5000 };
const TURNSTILE_ACTION = "contact";

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact" || url.pathname === "/api/contact/") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
      }
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

async function handleContact(request: Request, env: Env): Promise<Response> {
  const wantsJson = (request.headers.get("Accept") || "").includes("application/json");
  const reply = (ok: boolean, status: number, error?: string) => {
    if (wantsJson) return Response.json(ok ? { ok } : { ok, error }, { status });
    // No-JS fallback: send the browser back to the contact page.
    const back = new URL("/contact/", request.url);
    back.searchParams.set(ok ? "sent" : "error", "1");
    return Response.redirect(back.toString(), 303);
  };

  // Only accept posts from our own pages.
  const origin = request.headers.get("Origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return reply(false, 403, "Forbidden");
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(false, 400, "Invalid form submission.");
  }

  // Honeypot: real people never see or fill this field. Pretend it worked.
  if (String(form.get("website") || "").trim() !== "") return reply(true, 200);

  // Turnstile bot check, done before anything else is looked at.
  if (!(await verifyTurnstile(form.get("cf-turnstile-response"), request, env))) {
    return reply(false, 403, "Bot check failed. Please complete the check and try again.");
  }

  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const message = String(form.get("message") || "").trim();

  if (!name || !email || !message) {
    return reply(false, 400, "Please fill in your name, email, and message.");
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return reply(false, 400, "One of the fields is too long.");
  }
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
    return reply(false, 400, "Please enter a valid email address.");
  }

  // Keep header-bound values on one line.
  const safeName = name.replace(/[\r\n]+/g, " ");

  try {
    await env.EMAIL.send({
      to: TO,
      from: FROM,
      replyTo: { email, name: safeName },
      subject: `Website contact: ${safeName}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}\n\n--\nSent from the contact form at w4trc.org`,
      html: `<p><strong>Name:</strong> ${esc(name)}<br><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
<p style="white-space:pre-wrap">${esc(message)}</p>
<hr><p style="color:#666;font-size:12px">Sent from the contact form at w4trc.org. Reply to this email to answer ${esc(name)} directly.</p>`,
    });
  } catch (err) {
    const code = (err as { code?: string }).code;
    console.error("contact form send failed", code, err);
    if (code === "E_RATE_LIMIT_EXCEEDED" || code === "E_DAILY_LIMIT_EXCEEDED") {
      return reply(false, 429, "Too many messages right now. Please try again later or email contact@w4trc.org.");
    }
    return reply(false, 500, "Sorry, your message could not be sent. Please email contact@w4trc.org.");
  }

  return reply(true, 200);
}

async function verifyTurnstile(token: File | string | null, request: Request, env: Env): Promise<boolean> {
  const hostnames = new Set(
    (env.TURNSTILE_HOSTNAMES || "").split(",").map((h) => h.trim()).filter(Boolean),
  );
  if (typeof token !== "string" || token.length === 0 || token.length > 2048) return false;
  if (!env.TURNSTILE_SECRET || hostnames.size === 0) {
    console.error("Turnstile is not configured (TURNSTILE_SECRET / TURNSTILE_HOSTNAMES)");
    return false;
  }

  const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token });
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) body.set("remoteip", ip);

  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    if (!r.ok) throw new Error(`siteverify ${r.status}`);
    const result = (await r.json()) as { success?: boolean; action?: string; hostname?: string; "error-codes"?: string[] };
    const ok = result.success === true && result.action === TURNSTILE_ACTION && hostnames.has(result.hostname || "");
    if (!ok) console.warn("Turnstile rejected", result["error-codes"], result.action, result.hostname);
    return ok;
  } catch (err) {
    // Network error, non-2xx, or bad JSON from siteverify: fail closed.
    console.error("Turnstile siteverify failed", err);
    return false;
  }
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
