(() => {
  const m = window.W4TRC_MEETINGS;
  if (!m) return;

  const $ = (id) => document.getElementById(id);

  const d = new Date(m.datetime || Date.now());
  const fmt = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short"
  }).format(d);

  const title = m.title || "Club Meeting";
  const loc = m.location || "TBD";

  $("meeting-title") && ($("meeting-title").textContent = title);
  $("next-meeting-date") && ($("next-meeting-date").textContent = fmt);
  $("meeting-location") && ($("meeting-location").textContent = loc);

  if (m.topic) {
    const el = $("meeting-topic");
    if (el) {
      el.textContent = `Topic: ${m.topic}`;
      el.classList.remove("hidden");
    }
  }

  if (m.desc) {
    const el = $("meeting-desc");
    if (el) {
      el.textContent = m.desc;
      el.classList.remove("hidden");
    }
  }

  if (m.signupUrl) {
    const ctas = $("meeting-ctas");
    if (ctas) {
      const a = document.createElement("a");
      a.href = m.signupUrl;
      a.className =
        "px-4 py-2 rounded-xl border border-white/20 text-white/90";
      a.textContent = "RSVP";
      ctas.prepend(a);
    }
  }
})();
