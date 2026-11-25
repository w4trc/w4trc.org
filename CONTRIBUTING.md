# Contributing to W4TRC.org

Thanks for helping with the Kingsport Amateur Radio Club website. Club members and visitors are welcome to contribute, whether that means fixing a typo, writing up a fox hunt, or improving the code.

There are two ways to contribute:

1. **Edit content in Pages CMS** (no coding needed). Good for posts, events, meetings, and Silent Keys.
2. **Work with the code on GitHub.** Good for anything else, including layout, styling, and new features.

---

## Editing content without code (Pages CMS)

The site is set up for [Pages CMS](https://pagescms.org/), a web editor for the files in this repository. Its configuration is in `.pages.yml`.

1. Ask the webmaster (see [Contact](#contact)) for access to the repository.
2. Sign in at [app.pagescms.org](https://app.pagescms.org/) with your GitHub account and open `w4trc/w4trc.org`.
3. Choose **Posts**, **Events**, **Meetings**, or **Silent Keys**, then add or edit an entry.
4. Upload images through the media picker. They are saved to `public/images`.

Saving in Pages CMS creates a commit. The site rebuilds and publishes automatically.

---

## Working with the code

### Prerequisites

- Node.js 24 (the exact version is in `.node-version`)
- npm (comes with Node)

### Setup

```bash
git clone https://github.com/w4trc/w4trc.org.git
cd w4trc.org
npm install
npm run dev
```

The dev server runs at <http://localhost:4321>.

### Scripts

| Command           | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Starts the local dev server with live reload        |
| `npm run build`   | Builds the production site into `dist/`             |
| `npm run preview` | Serves the built `dist/` folder locally             |
| `npm run check`   | Type-checks the project and validates content files |
| `npm run format`  | Formats `src/` with Prettier                        |

### Project layout

```text
src/
  content/          Markdown/MDX content, one folder per collection
  content.config.ts Front matter schema for each collection
  components/       Reusable Astro and React components
  layouts/          Page layouts
  pages/            Routes
  config/           Site settings (config.json)
  lib/              Helper functions
  styles/           Global CSS and Tailwind setup
public/images/      Images, served from /images/...
scripts/            One-off generators (printable cards, quick reference)
```

---

## Adding content by hand

Every content file starts with YAML front matter. The fields each collection accepts are defined in `src/content.config.ts`, and `npm run check` or `npm run build` will fail if a required field is missing or has the wrong type.

### Posts (`src/content/posts/`)

Each post is a folder with an `index.md` inside. Name the folder with the date and a short slug, for example `2026-11-13-rewiring-repeaters/`.

```markdown
---
title: "Rewiring the Repeaters"
date: "2026-11-13"
author: "N4JHC"
summary: "One or two sentences for cards and search results, about 155 characters max."
image: "/images/posts/rewiring-repeaters.jpg"
tags: ["repeaters", "projects"]
draft: false
---

Post body goes here.
```

To link to an article on another site instead of hosting it here, add `externalUrl`.

### Events (`src/content/events/`)

Name the file `YYYY-MM-DD-short-name.md`. Use ISO date-times in local time.

```markdown
---
title: December Fox Hunt
date: "2026-12-19T15:00:00"
endDate: "2026-12-19T17:00:00"
location: Kingsport, TN
summary: Find the fox somewhere within Kingsport
cover: /images/activities/FoxHunt.png
featured: false
---

Details about the event.
```

### Meetings (`src/content/meetings/`)

Name the file `YYYY-MM-monthly.md` (or similar). The `datetime` field is required.

### Other collections

Officers, projects, presentations, activities, the Learn pages, and Silent Keys work the same way. Copy an existing file in the same folder and follow its pattern.

### Content guidelines

- Keep content about amateur radio and club activities.
- Do not publish personal contact details such as phone numbers, home addresses, or personal email addresses. Use club addresses (`@w4trc.org`) where needed.
- Get permission before posting photos where people can be clearly identified, and before writing about a member in a post or Silent Key entry.
- Write callsigns in uppercase (W4TRC, N4JHC).
- Start the body at `##` (h2). The page title is already the h1.
- Give every image meaningful alt text.
- Keep images reasonably small. Resize photos to about 1600px wide and compress them before adding them.

---

## Code guidelines

- Run `npm run format` before committing. Prettier settings are in `.prettierrc`; editor settings are in `.editorconfig` (2 spaces, LF line endings).
- Style with Tailwind utility classes. Add custom CSS in `src/styles/` only when utilities are not enough.
- Prefer Astro components. Use React only when a component needs client-side interactivity.
- Keep the site fast and accessible. Check new pages with Lighthouse, test on a phone-sized screen, and confirm keyboard navigation works.
- Do not add tracking scripts or third-party embeds without discussing it with the webmaster first.
- Never commit secrets, API keys, or `.env` files.

---

## Submitting changes

1. Fork the repository (or create a branch if you have write access). Branch from `main` and give the branch a short descriptive name, such as `fix-event-dates` or `post-field-day-2026`.
2. Make your changes.
3. Before opening a pull request, run:

   ```bash
   npm run check
   npm run build
   ```

   Both must finish without errors.
4. Write commit messages in the imperative mood, under about 70 characters (for example, "Add December fox hunt event").
5. Open a pull request against `main`. Describe what changed and why, and add screenshots for visual changes.

A maintainer will review the pull request. When it is merged to `main`, the site builds and deploys to [w4trc.org](https://w4trc.org) on Cloudflare automatically. Other branches get a preview deployment, so you can check your changes before they are merged.

### Reporting problems

Found a broken link, a wrong date, or a display bug? [Open an issue](https://github.com/w4trc/w4trc.org/issues) with the page URL, what you expected, and what happened. Include your browser and device for display problems.

---

## Contact

Questions about the website: **Joshua Carmack, N4JHC**, [n4jhc@w4trc.org](mailto:n4jhc@w4trc.org).

By contributing, you agree that your contributions are licensed under the project's [MIT License](LICENSE).
