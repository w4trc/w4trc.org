# W4TRC Website Review

Working list of fixes and improvements. Last full review: November 23, 2026.
Strike items through (`~~like this~~`) and add "— done" when finished.

---

## Fix Soon

1. **Write a real privacy policy** — the club will be running ads, and every page already loads the Google Ads tag (`AW-17728556033` in `src/layouts/Base.astro`), Rybbit analytics, and forms that collect email addresses. `src/content/pages/privacy-policy.md` is still template lorem ipsum (it isn't published right now). Cover: Google Ads / cookies, Rybbit analytics, FormSubmit contact forms, membership system (members.w4trc.org), and how to request removal. Publish it and link it from the footer.
2. **Fix broken links**
   - `/learn/how-to-get-licensed` doesn't exist — linked from `src/content/learn/what-is-amateur-radio.md` and `what-is-a-repeater.md`. Create the page or point to `/resources/license-testing/`.
   - The Fox Hunting PDF linked on `/resources/downloads/` (`/files/presentations/KARC Presentation - Fox Hunting.pdf`) is missing from `public/files/presentations/`.
   - All 3 project pages and `/projects/` use `placeholder-*.jpg` images that don't exist, and their content is "tbd". Hide Projects until there's real content, or fill them in.
3. **Settle the founding date** — the homepage and `src/content/about/-index.md` say "affiliated October 2, 1947"; `src/pages/about.astro:93` says "founded in 1948".
4. **Shrink the POTA/SOTA galleries** — `Gallery.astro` serves original files with no resizing: 46 MB in `public/images/activities/pota/`, 5.5 MB in `sota/`, single files of 2–3.5 MB. Alt text is the filename (e.g. `20230204_122439-scaled.jpg`). Run them through `astro:assets`/`ImageMod` and add real captions.
5. **Shrink homepage post-card images** — `PostCard.astro` uses a plain `<img>`, so the homepage loads `GeorgeDeVault.png` (1 MB) and `FoxHunt.png` (755 KB) at full size. Use `ImageMod` to fix it site-wide.

## Accessibility

6. **Keyboard users can't use the menu** — the mobile menu and dropdowns are driven by checkboxes hidden with `display:none`, which can't take keyboard focus. On desktop, dropdowns open on hover only. Switch to `<button aria-expanded>` controls and add `focus-within` styles (`src/layouts/partials/Header.astro`, `src/styles/safe.css`).
7. **Missing alt text** — 4 images on `/activities/`, 1 on `/spots/`. The footer status badge alt reads "EchoLink Node Status status".
8. **Check light mode** — many components hard-code `text-white`. Only matters if the theme switcher is turned on (`settings.theme_switcher` is currently `false`).

## SEO & Metadata

9. **Homepage title is "KARC - Home"** — use something like "Kingsport Amateur Radio Club (W4TRC) – Kingsport, TN". Titles also mix "W4TRC -" (posts) and "KARC -" (everything else); pick one.
10. **Long descriptions** — the George DeVault post title is ALL CAPS with a 258-character description. Six presentation descriptions are 180–230 characters; search results cut off around 160.
11. **Base.astro defaults** — add a canonical URL by default (currently only when a page passes one); use `og:type` `article` for posts; add Organization JSON-LD.
12. **Charset** — put `<meta charset="utf-8">` first in `<head>`. Today the `http-equiv` version comes after the gtag scripts.
13. **robots.txt** — add `Sitemap: https://w4trc.org/sitemap-index.xml`; remove `Disallow: /api/*` (matches nothing).
14. **Event structured data** — add JSON-LD `Event` markup to event pages so Google lists Field Day, N4I, etc. in event search.

## Content & UX

15. **About page** — includes a full copy of the contact form; replace it with a link to `/contact/`. Also remove the empty `<div class="prose">` near the top.
16. **Footer** — copyright year is hard-coded "© 2026" (use the build year); add meeting location and a contact email; add the privacy policy link; consider a custom Facebook page URL instead of `profile.php?id=`.
17. **Announcement banner** — closing it sets one cookie for 7 days, so closing one announcement also hides the next one. Key the cookie to the announcement text (`src/layouts/helpers/Announcement.tsx`).
18. **One switch for repeater outages** — the banner (`config.json` → `announcement`) and repeater status (`src/data/repeaters.json` → `status`) are set separately. Drive one from the other.
19. **Net Coordinator vacancy** — turn "Position Vacant" on the About page into a short volunteer call to action.
20. **"Coming soon" repeaters** — the 6 m and 900 MHz entries are all TBD. Keep only if actually planned.

## New Features

21. **iCal (.ics) feed** — build from the events and meetings collections so members can subscribe in Google/Apple Calendar.
22. **EchoLink connection guide** — the repeater data mentions `W4TRC-R` but nothing explains how to connect.
23. **Meshtastic page** — `tricitiesmesh.net` is in the footer but there's no page explaining the local mesh or how to join.
24. **Contesting page** — contests the club does as a group, past results, ARRL Club Competition standings.
25. **Buy/Sell/Trade classifieds** — even a simple "email the club to list gear" page.
26. **APRS embed** — live map during Field Day / POTA activations.
27. **Member spotlight / ham of the month.**

## Cleanup

28. **Template and old-hosting leftovers**
    - `package.json` name is `astroplate`; every page has `<meta name="theme-name" content="astroplate">`.
    - `netlify.toml` (also says `yarn`), `Dockerfile`, `config/nginx/`, `public/.htaccess` — site is hosted on Cloudflare.
    - `config.json`: `disqus`, `google_tag_manager`, `navigation_button` still hold template values.
    - `src/content/pages/elements.mdx`, `qrz.html` (repo root), `public/js/next-meeting.js`, `src/data/meetings.json` (has an `example.com` RSVP link).
29. **`.pages.yml` (Pages CMS) is broken for posts** — points to `src/content/blog` (posts live in `src/content/posts`), and the post/event fields (`pubDatetime`, `ogImage`, …) don't match the real schema. Fix or delete.
30. **Unused code** — `Testimonial.astro`, `Disqus.tsx`, `useTheme.ts`, `similarItems.ts`; packages `disqus-react`, `swiper`, `prop-types`. Confirm nothing imports them, then remove.
31. **Unused images** — `public/images` is 117 MB. About 15 files outside the galleries aren't referenced (unsplash stock photos, `avatar*.png`, `arrl-badge.png`, `fieldday2023.jpg`, …). Also compress the 18 MB "KARC Presentation - Portable Digital.pdf".

---

## Done

- ~~Fix the duplicate Tailwind CSS~~ — responsive layouts and desktop dropdowns work again
- ~~Fix the placeholder text on the About page~~
- ~~Elmer page~~ — `/elmer/`
- ~~Homepage redesign~~ — on-air strip, meeting + events side by side, latest posts, linked Get Involved cards, WebP images, `/activities/` index
- ~~Blog/News on the home page~~ — shows the 3 latest posts
- ~~Quick-reference card~~ — printable PDFs in Downloads
- ~~Club station photos~~ — on the Repeaters page
- ~~Grid square reference~~ — EM86 on the Repeaters page
- ~~Bylaws / constitution~~ — in Downloads
- ~~Keep "Next Meeting" and upcoming events current~~ — handled by the daily rebuild cron (2027 meetings/events still need to be added before Dec 10)
