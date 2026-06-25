# W4TRC Spots Board — Website Integration Brief

## What this is

The club has a live "who's on the air" board running at `https://spots.w4trc.org`. It polls HamAlert and shows the latest spot per member per band — name, frequency, mode, source, and how long ago they were heard.

There's a public JSON feed at:
```
GET https://spots.w4trc.org/spots.json
```

And a self-contained HTML board at:
```
https://spots.w4trc.org/
```

## Task for Claude Code

Integrate the spots board into this Astro site. Before writing any code, answer these questions by reading the repo:

1. **Styling** — Is Tailwind CSS in use? Any other CSS framework? What does a typical content section look like (check an existing page)?
2. **Component islands** — Does the site use React, Preact, Vue, or Svelte for interactive components? Or is interactivity done with vanilla `<script>` tags?
3. **Layout** — Is there a shared page layout/shell? Where would a new page or section live?
4. **Existing pages** — Is there an "Activity," "Members," or "On the Air" page this should live on, or should it be a new `/spots` page?

## Integration options (pick based on what you find)

### Option A — Native Astro component (recommended if no UI framework)
Create `src/components/SpotsBoard.astro`. Use a `<script>` tag to fetch `/spots.json` from `spots.w4trc.org` on load and every 60 seconds, and render the table. Style it to match the site. Add it to an existing page or create `src/pages/spots.astro`.

### Option B — React/Preact/Vue/Svelte island
Create a `SpotsBoard` component in whatever framework the site already uses. Add `client:load` so it hydrates in the browser. Fetch from `https://spots.w4trc.org/spots.json` on mount and poll every 60 seconds.

### Option C — iframe embed (simplest, least native-looking)
Embed `<iframe src="https://spots.w4trc.org/" ...>` on a page. Easiest to drop in but won't match the site's design.

## Feed shape

Each item in the JSON array looks like:

```json
{
  "callsign": "N4JHC",
  "name": "Joshua Carmack",
  "band": "20m",
  "frequency": 14285.0,
  "mode": "SSB",
  "source": "cluster",
  "spotter": "W1AW",
  "ref": null,
  "ref_name": null,
  "ref_type": null,
  "rx_at": 1750000000
}
```

- `name` may be null — fall back to `callsign`
- `frequency` is in **kHz** — divide by 1000 and show 3 decimals for MHz display
- `rx_at` is Unix epoch seconds — use it for relative time ("just now", "3m ago") and to highlight rows spotted within the last 15 minutes as "active"
- `ref` / `ref_name` / `ref_type` are set for POTA/SOTA/WWFF activations — show them as a "Where" field when present
- `source` values: `cluster`, `rbn`, `pota`, `sota`, `wwff`, `pskreporter`

## Display columns

| Column | Notes |
|---|---|
| Member | `name` or `callsign`; link callsign to `https://www.qrz.com/db/<callsign>` |
| Freq / Band | frequency in MHz + band label |
| Mode | CW / SSB / FT8 / etc. |
| Source | small badge |
| Where | `ref · ref_name` when `ref_type` is set; hide column if no rows have it |
| Heard by | spotter callsign, de-emphasized |
| When | relative time from `rx_at`; highlight row if within 15 min |

## CORS

The feed returns `access-control-allow-origin: *` so it can be fetched client-side from any origin.

## Notes

- Do **not** server-side render the spots data at build time — it changes every minute and must be fetched in the browser.
- The feed has a 45-second cache on the CDN, so polling every 60 seconds is fine.
- No authentication needed to read the feed.
