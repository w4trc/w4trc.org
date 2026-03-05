# W4TRC.org — Kingsport Amateur Radio Club Website

The official website for the **Kingsport Amateur Radio Club (KARC)**, callsign **W4TRC**, located in Kingsport, Tennessee. Built with [Astro](https://astro.build/), [Tailwind CSS](https://tailwindcss.com/), and TypeScript.

Live site: [https://w4trc.org](https://w4trc.org)

---

## About the Club

The Kingsport Amateur Radio Club was affiliated with the American Radio Relay League (ARRL) on October 2, 1947. Founded by veteran amateur radio operators with a mission to advance the art of radio and welcome all who wanted to learn and grow.

Over the decades, KARC built a close relationship with Eastman Corporation, and club members working there helped establish a sister organization — the Bays Mountain Radio Club (BMRC) — in 1953. The two clubs later merged in the 1970s to become KARC/BMRC.

Today, KARC continues its mission with monthly meetings, on-air nets, fox hunts, POTA/SOTA activations, Field Day, and ongoing technical projects.

---

## Tech Stack

- **Framework:** [Astro](https://astro.build/) v5+
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4+
- **Language:** TypeScript
- **Content:** Markdown / MDX

---

## Getting Started

### Prerequisites

- Node.js v20.10+
- Yarn v1.22+

### Install dependencies

```bash
yarn install
```

### Run the development server

```bash
yarn dev
```

### Build for production

```bash
yarn build
```

---

## Project Structure

```
src/
  content/       # Markdown/MDX content (blog, events, meetings, officers, etc.)
  layouts/       # Astro layout components
  pages/         # Astro page routes
  config/        # Site configuration (config.json)
  lib/           # Utility functions
```

Most site content lives in `src/content/`. Adding or editing a blog post, event, meeting recap, or officer profile is as simple as creating or editing a Markdown file in the appropriate subdirectory.

---

## Contributing

Contributions are welcome, especially from club members. Here are some ways to help:

- **Write content:** Add blog posts, meeting recaps, event announcements, or project writeups in `src/content/`
- **Fix bugs:** Open an issue or submit a pull request
- **Improve the site:** UI improvements, accessibility fixes, new features

### How to contribute

1. Fork the repository and create a branch from `main`
2. Make your changes
3. Test locally with `yarn dev`
4. Open a pull request with a clear description of what you changed and why

### Content guidelines

- Keep content relevant to amateur radio and club activities
- Use proper Markdown formatting
- Include a date in event/meeting filenames (e.g., `2026-06-24-field-day.md`)
- Do not include personal contact information (phone numbers, home addresses) in public content files

---

## Contact

For questions about the website or to report an issue:

**Joshua Carmack, N4JHC**
[n4jhc@w4trc.org](mailto:n4jhc@w4trc.org)

For general club inquiries, use the contact form at [w4trc.org/contact](https://w4trc.org/contact/).

---

## License

Site code is open source under the [MIT License](LICENSE). Content (text, images) is copyright the Kingsport Amateur Radio Club unless otherwise noted.
