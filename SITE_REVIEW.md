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

**Blog/News is commented out on the home page** (`src/pages/index.astro:12-17`) — if you ever want a news feed this is already scaffolded but dead.

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

Top 3 to tackle next:

1. **iCal feed** — immediate member utility, relatively easy to build from the existing events collection
2. **Fix the placeholder text on the About page** — that's live right now
3. ~~**Elmer page**~~ — done (`/elmer/`)
