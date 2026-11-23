# W4TRC Website Review

Working list of fixes and improvements. Last full review: November 23, 2026.
Strike items through (`~~like this~~`) and add "— done" when finished.

---

## To Do (outside the code)

- [ ] **Run Google's Rich Results Test** on the homepage and the Field Day event page: <https://search.google.com/test/rich-results>. It should find an Organization on the homepage and an Event on the Field Day page with no errors.
- [ ] **Submit the sitemap in Google Search Console**: add `https://w4trc.org/sitemap-index.xml` under Sitemaps (set up the w4trc.org property first if it isn't there).
- [ ] **Add 2027 meetings and events** before December 10, so the homepage "Next Meeting" box doesn't fall back to the Christmas party. Write event locations as `Venue (street, city, ST zip)`.
- [ ] **Gallery captions** for the POTA/SOTA photos — see item 4.

---

## Fix Soon

1. ~~**Write a real privacy policy**~~ — done; `/privacy-policy/` (`src/pages/privacy-policy.astro`), linked in the footer. Covers Google Search ads, Rybbit, FormSubmit, Stripe, embedded services, forms.w4trc.org and members.w4trc.org; requests go to contact@w4trc.org. Update the "Last updated" date when it changes. Original note: the club will be running ads, and every page already loads the Google Ads tag (`AW-17728556033` in `src/layouts/Base.astro`), Rybbit analytics, and forms that collect email addresses. `src/content/pages/privacy-policy.md` is still template lorem ipsum (it isn't published right now). Cover: Google Ads / cookies, Rybbit analytics, FormSubmit contact forms, membership system (members.w4trc.org), and how to request removal. Publish it and link it from the footer.
2. ~~**Fix broken links**~~ — done
   - `/learn/how-to-get-licensed` links now point to `/resources/license-testing/`.
   - The Fox Hunting PDF is back on `/resources/downloads/`, compressed from 48 MB to 6.5 MB (Cloudflare's limit is 25 MB).
   - All 3 projects are marked `draft: true` and the placeholder images were removed. `/projects/` shows a "coming soon" note, is `noindex`, and is left out of the sitemap until a project is published. **To publish one:** fill in its content and real photos, then delete `draft: true`.
3. ~~**Settle the founding date**~~ — done; the About page now uses the ARRL affiliation date (October 2, 1947), matching the homepage.
4. ~~**Shrink the POTA/SOTA galleries**~~ — done; `Gallery.astro` now builds 600px WebP thumbnails (about 100 KB each instead of 2–3.5 MB) and links each one to a 1600px version. Alt text is now "Parks on the Air activation photo 1" etc. instead of the filename.
   - **Still to do: real captions.** Pass a `captions` map to the gallery in `pota.mdx` / `sota.mdx`, keyed by filename. Each caption becomes the alt text and shows under the photo:
     `<Gallery dir="images/activities/pota" label="Parks on the Air activation" captions={{ "Tim-scaled.jpg": "Who is in the photo, and which park" }} ... />`
5. ~~**Shrink homepage post-card images**~~ — done; post cards and event covers (homepage, `/events/`, event pages) now use `ImageMod`, which outputs resized WebP. The homepage's images dropped from about 2.6 MB to about 660 KB.

## Accessibility

6. ~~**Keyboard users can't use the menu**~~ — done; the menu button and dropdowns are now real `<button aria-expanded>` controls. Enter/Space opens, Escape closes and returns focus, and tabbing or clicking away closes. Mouse hover still works on desktop, and the menu now works as soon as the page appears instead of after every image finishes loading. Original note: the mobile menu and dropdowns are driven by checkboxes hidden with `display:none`, which can't take keyboard focus. On desktop, dropdowns open on hover only. Switch to `<button aria-expanded>` controls and add `focus-within` styles (`src/layouts/partials/Header.astro`, `src/styles/safe.css`).
7. ~~**Missing alt text**~~ — done; the footer badge now reads "EchoLink node status". The images flagged on `/activities/` and `/spots/` turned out to have `alt=""` (correct for decorative images next to their own heading), so they were left alone. A full scan of the built site found no images missing alt text.
8. **Check light mode** — many components hard-code `text-white`. Only matters if the theme switcher is turned on (`settings.theme_switcher` is currently `false`).

## SEO & Metadata

9. ~~**Homepage title / title prefixes**~~ — done; the homepage is "Kingsport Amateur Radio Club (W4TRC) | Kingsport, TN" and posts now use "KARC -" like every other page.
10. ~~**Long descriptions**~~ — done; the DeVault post title is title case with a 152-character summary. Presentations have a new optional `meta_description` field (used for search results; the longer `description` still shows on the page), filled in for the six long ones. Use it on future presentations when the description runs past ~155 characters.
11. ~~**Base.astro defaults**~~ — done; every indexed page gets a canonical URL (pages can still override), `og:url` matches it, posts use `og:type` `article`, image URLs that are already absolute aren't doubled, and pages can pass `jsonLd`. The homepage has Organization data (name, KARC/W4TRC, logo, email, founding date, Kingsport TN, Facebook). The 404 page is now `noindex`.
12. ~~**Charset**~~ — done; `<meta charset="utf-8">` is the first tag in `<head>`.
13. ~~**robots.txt**~~ — done; sitemap added, unused `Disallow` removed.
14. ~~**Event structured data**~~ — done; event pages output schema.org Event data with correct Eastern-time offsets. Skipped for `noindex` events (fox hunts) and events without a physical place ("N/A", "Working from home"), since Google requires one. **Tip:** write locations as `Venue (street, city, ST zip)` so the address is picked up; the January POTA outing only says "Natural Tunnel State Park".

## Content & UX

15. ~~**About page**~~ — done; the duplicate contact form is replaced by a short note and a "Contact the Club" button to `/contact/`, the empty block is gone, the title is "KARC - About", and the Nets / Get Licensed quick links point straight to their pages instead of through redirects.
16. **Footer** — copyright year is hard-coded "© 2026" (use the build year); add meeting location and a contact email; add the privacy policy link; consider a custom Facebook page URL instead of `profile.php?id=`.
17. **Announcement banner** _(skipped for now)_ — closing it sets one cookie for 7 days, so closing one announcement also hides the next one. Key the cookie to the announcement text (`src/layouts/helpers/Announcement.tsx`).
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

28. ~~**Template and old-hosting leftovers**~~ — done
    - `package.json` is now `w4trc-org` (private, club as author); the `remove-darkmode` script is gone. The `theme-name` meta tag is removed.
    - Removed `netlify.toml`, `Dockerfile`, `.dockerignore`, `config/nginx/`, `public/.htaccess`.
    - `config.json`: removed `disqus`, `google_tag_manager`, and unused `settings` keys; `navigation_button` (still off) now points to `/join/` instead of the template's GitHub.
    - Removed the template demo page (`elements.mdx`) and the `[regular].astro` route that was meant to render it (this also clears the "pages collection does not exist" build warning), plus `public/js/next-meeting.js` and `src/data/meetings.json`. `NextMeeting` no longer falls back to that stale 2025 file.
    - **Kept `qrz.html`** — it's the club's QRZ bio source and is still maintained.
29. ~~**`.pages.yml` (Pages CMS)**~~ — done; Posts now point to `src/content/posts` and Posts/Events fields match the real schemas (cover image pickers, start/end with time, RSVP, noindex). Presentations gained the `meta_description` field. Media output fixed to `/images` (it was `/`, which would have produced broken image paths). **Check in Pages CMS** that the Posts list shows the folder-per-post entries (`<post>/index.md`).
30. ~~**Unused code**~~ — done; removed 30 unused template files (post layout, sidebar, blog card, share, breadcrumbs, pagination, testimonial slider, Disqus, all 7 shortcodes, taxonomy/sort/reading-time helpers, `useTheme`) and the packages `disqus-react`, `swiper`, `prop-types`, `date-fns`, `@justinribeiro/lite-youtube`. Also fixed the Officer Responsibilities page, whose search description still read "Replace placeholders with official descriptions", and a typo ("Obersee").
31. **Unused images** — removed the template stock images (`avatar*.png`, `image-placeholder.png`, an unused 3 MB unsplash photo). **Needs a decision** — these club images aren't used on the site, but might be linked from elsewhere (emails, Facebook, QRZ) or wanted later:
    - `VETESTING.png`, `activities/Nets_Logo.png`, `activities/SOTA_Logo.png`, `arrl-badge.png`, `cdn/NetControl_SignUp.jpg`, `officers/km4nwh.png`, `officers/placeholder.png`, `posts/KARC-N4I-2026.jpg` (2.2 MB), `winterfieldday.png` (1.9 MB)
    - ~~Compress the big PDFs~~ — done; Portable Digital 18 MB → 2.8 MB, Fox Hunting 48 MB → 6.5 MB. Photos were resampled to ~110 dpi (about 2200 px across a slide), which looks the same full-screen; text is unchanged. **For future slide decks:** in PowerPoint, File → Compress Pictures → 150 ppi before exporting to PDF keeps them small.
32. **Commit a lockfile** — `package-lock.json` and `yarn.lock` are both in `.gitignore`, so every Cloudflare build installs whatever versions match the `^` ranges that day, and a new package release can change or break the site without any commit (Tailwind already had to be pinned by hand). Committing `package-lock.json` makes builds repeatable; Cloudflare will then use `npm ci`.

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
