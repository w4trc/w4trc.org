# W4TRC Website Review

The site is already well above average for a club site — repeaters, events, nets, POTA/SOTA, fox hunting, presentations, projects, silent keys, a spots board, solar conditions, and a gallery. That's a solid foundation. Here's what's missing or worth improving:

---

## Missing Pages (Standard for Ham Club Sites)

### 1. Elmer / Mentorship Program
A short page explaining that new hams can contact the club to be put in touch with an Elmer. No formal program needed — just a clear signal that help is available and a link to the contact page.

### 3. Contesting
The links page references contesting but there's no club page. Past contest results, current club standings (ARRL Club Competition), what contests the club participates in as a group — this is a big motivator for members.

### 4. Member Buy/Sell/Trade Classifieds
Swap meets and equipment trade are huge in the hobby. Even a simple "post your for-sale gear here, email the club" page would get regular traffic.

### 5. EchoLink Connection Guide
The repeater data mentions `W4TRC-R` but nowhere explains how to connect via EchoLink. New and remote hams will want this.

### 6. Meshtastic Page
`tricitiesmesh.net` is in the footer but there's no page on the club site explaining the local mesh network or how to participate.

---

## Content Gaps on Existing Pages

**About page — "Get Involved" is still placeholder text:**
```
src/pages/about.astro:101 — "How to join, renew membership, volunteer, or learn more. Add links..."
```
This is visible to visitors right now.

~~**Blog/News is commented out on the home page**~~ — done; the homepage now shows the 3 latest posts.

---

## Functional Gaps

### iCal / Calendar Subscription Feed
There's a JSON events feed (`/events.json`) but no `.ics` export. Members want to subscribe to club events in Google Calendar, Apple Calendar, etc. This is the #1 request most clubs get.

### APRS Embed
A live APRS.fi map showing W4TRC or club members on the air during events (Field Day, POTA activations) would be a great live element alongside the spots board.

---

## Nice-to-Haves

- **Member spotlight / ham of the month** — coming soon
- **Hamfest calendar** — will be added as events
- ~~**Quick-reference card**~~ — done (printable PDFs in Downloads)
- ~~**Club station photos**~~ — already on the Repeaters page
- ~~**Grid square reference**~~ — done, added to Repeaters page (EM86)
- ~~**Bylaws / constitution**~~ — already in Downloads

---

## Priority Order

### Worth doing

1. **Fix the duplicate Tailwind CSS** — `src/styles/global.css` re-imports Tailwind with old v3 `@tailwind` lines, emitting a second, unlayered copy of the utilities. That copy overrides responsive variants site-wide (e.g. `flex-col` beats `md:flex-row` at every width). Remove the 3 lines, then fix layouts built around the bug — the header nav overlaps the club name without it. Until then, new layouts must avoid mixing a base utility with a responsive one for the same property (use `max-md:flex-col md:flex-row`).
2. **iCal feed (.ics)** — immediate member utility; members subscribe once in Google/Apple Calendar. Build from the existing events and meetings collections, so no extra upkeep.
3. **Shrink post images** — the 3 post cards on the homepage load ~4 MB (`KARC-N4I-2026.jpg` 2.3 MB, `FieldDay2026.jpg` 1.6 MB, `GeorgeDeVault.png` 1 MB). Use `ImageMod` in `src/layouts/components/PostCard.astro` to fix site-wide.
4. **One switch for repeater outages** — the red banner (`src/config/config.json` → `announcement`) and repeater status (`src/data/repeaters.json` → `status.onAir`) are set separately. Drive the banner from the repeater status so one change updates the whole site.

### Smaller

5. **Event structured data** — add JSON-LD `Event` markup to event pages so Google lists fox hunts, Field Day, and N4I in event search results.
6. **Post card padding** — `PostCard` cards are padded twice (`.w4-card` padding plus inner `p-6`), so images sit indented instead of filling the card edge to edge.
7. **Check light mode** — many components hard-code `text-white`; verify nothing is unreadable with the theme switcher set to light.

### Content (needs input, not just code)

8. **EchoLink connection guide** — see Missing Pages #5
9. **Meshtastic page** — see Missing Pages #6
10. **Contesting page** — see Missing Pages #3
11. **Buy/Sell/Trade classifieds** — see Missing Pages #4

### Done

- ~~**Fix the placeholder text on the About page**~~ — done
- ~~**Elmer page**~~ — done (`/elmer/`)
- ~~**Homepage redesign**~~ — done (on-air strip, meeting + events side by side, latest posts, linked Get Involved cards, WebP images, `/activities/` index)
