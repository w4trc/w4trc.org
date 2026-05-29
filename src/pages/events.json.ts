import { getCollection } from "astro:content";

export const prerender = true;

export async function GET() {
  const BASE = "https://w4trc.org";
  const now = new Date().toISOString().slice(0, 10); // YYYY-MM-DD at build time

  const [rawEvents, rawMeetings] = await Promise.all([
    getCollection("events"),
    getCollection("meetings"),
  ]);

  const events = rawEvents
    .filter((e) => e.data.date.slice(0, 10) >= now)
    .map((e) => ({
      type: "event",
      title: e.data.title,
      date: e.data.date,
      endDate: e.data.endDate ?? null,
      location: e.data.location ?? null,
      summary: e.data.summary ?? null,
      url: `${BASE}/events/${e.slug}/`,
      rsvpUrl: e.data.rsvpUrl ?? null,
    }));

  const meetings = rawMeetings
    .filter((m) => !m.data.draft && m.data.datetime.slice(0, 10) >= now)
    .map((m) => ({
      type: "meeting",
      title: m.data.title,
      date: m.data.datetime,
      endDate: null,
      location: m.data.location ?? null,
      summary: m.data.topic ?? m.data.desc ?? null,
      url: `${BASE}/meetings/`,
      rsvpUrl: null,
    }));

  const combined = [...events, ...meetings].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return new Response(
    JSON.stringify({ generated: new Date().toISOString(), events: combined }, null, 2),
    { headers: { "Content-Type": "application/json" } }
  );
}
