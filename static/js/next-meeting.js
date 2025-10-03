/* W4TRC — Next Meeting (data-only v4: normalizes data + extra debug) */
(function () {
  console.log("[W4TRC] next-meeting.js v4 starting");

  var cfg = (typeof window !== "undefined" && window.W4TRC_MEETINGS);
  console.log("[W4TRC] raw window.W4TRC_MEETINGS =", cfg, "typeof:", typeof cfg);

  // Normalize: if it somehow came in as a JSON string, parse it.
  if (typeof cfg === "string") {
    try { cfg = JSON.parse(cfg); console.log("[W4TRC] parsed cfg =", cfg); }
    catch (e) { console.warn("[W4TRC] JSON.parse failed:", e); cfg = {}; }
  }
  cfg = cfg || {};

  // Some environments wrap the object under a 'default' key — handle that too.
  if (!cfg.upcoming && cfg.default && Array.isArray(cfg.default.upcoming)) {
    cfg = cfg.default;
  }

  console.log("[W4TRC] cfg keys:", Object.keys(cfg));
  console.log("[W4TRC] typeof cfg.upcoming:", typeof cfg.upcoming, "isArray?", Array.isArray(cfg.upcoming));

  var list = Array.isArray(cfg.upcoming) ? cfg.upcoming : [];
  console.log("[W4TRC] upcoming count =", list.length, list);

  // Elements
  var elTitle = document.getElementById("meeting-title");
  var elDate  = document.getElementById("next-meeting-date");
  var elLoc   = document.getElementById("meeting-location");
  var elTopic = document.getElementById("meeting-topic");
  var elDesc  = document.getElementById("meeting-desc");
  var ctas    = document.getElementById("meeting-ctas");
  if (!elDate) { console.warn("[W4TRC] #next-meeting-date not found"); return; }

  function parseDate(d, t) {
    if (!d) return null;
    var parts = d.split("-");
    if (parts.length < 3) return null;
    var y = +parts[0], m = (+parts[1] - 1), day = +parts[2];
    var hh = 19, mm = 0;
    if (t) { var tp = t.split(":"); hh = +(tp[0]||19); mm = +(tp[1]||0); }
    var dt = new Date(y, m, day, hh, mm, 0, 0);
    return isNaN(dt.getTime()) ? null : dt;
  }

  function fmtDate(d) {
    return d.toLocaleString(undefined, {
      weekday: "long", month: "long", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit"
    });
  }

  var now = new Date();

  // Build candidate list (future only; include later-today)
  var candidates = list.map(function (item) {
    return { when: parseDate(item.date, item.time), item: item };
  }).filter(function (x) {
    return x.when && x.when >= now;
  }).sort(function (a, b) {
    return a.when - b.when;
  });

  console.log("[W4TRC] valid future candidates =", candidates.length, candidates);

  if (!candidates.length) {
    if (elTitle) elTitle.textContent = "No upcoming meetings posted";
    elDate.textContent = "Please check back soon or see the calendar.";
    return;
  }

  var next = candidates[0];
  var it = next.item;

  if (elTitle) elTitle.textContent = it.title || "Club Meeting";
  elDate.textContent  = fmtDate(next.when);
  if (elLoc)   elLoc.textContent   = it.location || "TBD";

  if (it.topic && elTopic) {
    elTopic.textContent = "Topic: " + it.topic;
    elTopic.classList.remove("hidden");
  }
  if (it.desc && elDesc) {
    elDesc.textContent = it.desc;
    elDesc.classList.remove("hidden");
  }

  if (ctas && it.link && it.link.url) {
    var a = document.createElement("a");
    a.href = it.link.url;
    a.className = "px-4 py-2 rounded-xl bg-emerald-400 text-emerald-950 font-semibold";
    a.textContent = it.link.label || "Sign Up";
    a.target = "_blank";
    a.rel = "noopener";
    ctas.prepend(a);
  }
})();
