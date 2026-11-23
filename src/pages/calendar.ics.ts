import { getCollection } from "astro:content";
import { toEasternIso } from "@/lib/utils/floatingDate";

// Subscribable iCalendar feed of club events and meetings:
// https://w4trc.org/calendar.ics (webcal://w4trc.org/calendar.ics)
//
// Content times are floating Eastern wall-clock times; they are converted to
// UTC here so every calendar app shows the right local time, including across
// daylight saving changes. The site is rebuilt daily, and calendar apps
// re-fetch the feed on their own schedule (Google: every 12-24 hours).

export const prerender = true;

const BASE = "https://w4trc.org";
const MEETING_HOURS = 2; // meetings have no end time in the content; assume 2 hours

const toUtc = (value: string): Date | null => {
  const iso = toEasternIso(value);
  return iso ? new Date(iso) : null;
};

// 20260627T150000Z
const icsDate = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

// RFC 5545 text escaping
const esc = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

// RFC 5545 line folding: max 75 octets per line, continuation lines start with a space.
const fold = (line: string) => {
  const bytes = new TextEncoder();
  const out: string[] = [];
  let cur = "";
  for (const ch of line) {
    const limit = out.length === 0 ? 75 : 74; // continuation lines lose one octet to the leading space
    if (bytes.encode(cur + ch).length > limit) {
      out.push(cur);
      cur = ch;
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out.join("\r\n ");
};

interface CalItem {
  uid: string;
  start: Date;
  end: Date;
  title: string;
  location?: string;
  description?: string;
  url: string;
}

export async function GET() {
  const [events, meetings] = await Promise.all([
    getCollection("events"),
    getCollection("meetings", ({ data }) => !data.draft),
  ]);

  const items: CalItem[] = [];

  for (const e of events) {
    const start = toUtc(e.data.date);
    if (!start) continue;
    const end = (e.data.endDate && toUtc(e.data.endDate)) || new Date(start.getTime() + 2 * 3600_000);
    const url = e.data.url ?? `${BASE}/events/${e.id}/`;
    const description = [e.data.summary, e.data.rsvpUrl && `RSVP: ${e.data.rsvpUrl}`, url]
      .filter(Boolean)
      .join("\n\n");
    items.push({
      uid: `event-${e.id}@w4trc.org`,
      start,
      end,
      title: e.data.title,
      location: e.data.location && !/^n\/a$/i.test(e.data.location) ? e.data.location : undefined,
      description,
      url,
    });
  }

  for (const m of meetings) {
    const start = toUtc(m.data.datetime);
    if (!start) continue;
    const t = m.data.topic?.trim();
    const topic = t && t !== m.data.title && !/^n\/a$/i.test(t) ? `Program: ${t}` : undefined;
    const description = [topic, m.data.desc, m.data.signupUrl && `RSVP: ${m.data.signupUrl}`, `${BASE}/meetings/`]
      .filter(Boolean)
      .join("\n\n");
    items.push({
      uid: `meeting-${m.id}@w4trc.org`,
      start,
      end: new Date(start.getTime() + MEETING_HOURS * 3600_000),
      title: m.data.title,
      location: m.data.location,
      description,
      url: `${BASE}/meetings/`,
    });
  }

  items.sort((a, b) => a.start.getTime() - b.start.getTime());

  const stamp = icsDate(new Date());
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kingsport Amateur Radio Club//w4trc.org//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:KARC (W4TRC) Events",
    "X-WR-CALDESC:Meetings and events of the Kingsport Amateur Radio Club",
    "X-WR-TIMEZONE:America/New_York",
    "REFRESH-INTERVAL;VALUE=DURATION:PT12H",
    "X-PUBLISHED-TTL:PT12H",
  ];

  for (const it of items) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${it.uid}`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${icsDate(it.start)}`,
      `DTEND:${icsDate(it.end)}`,
      `SUMMARY:${esc(it.title)}`,
      ...(it.location ? [`LOCATION:${esc(it.location.replace(/\s+/g, " "))}`] : []),
      ...(it.description ? [`DESCRIPTION:${esc(it.description)}`] : []),
      `URL:${it.url}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");

  return new Response(lines.map(fold).join("\r\n") + "\r\n", {
    headers: { "Content-Type": "text/calendar; charset=utf-8" },
  });
}
