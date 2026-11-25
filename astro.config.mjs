import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import config from "./src/config/config.json";
import mdx from "@astrojs/mdx";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Event pages flagged `noindex: true` in frontmatter are left out of the sitemap.
const eventsDir = "./src/content/events";
const noindexPaths = fs
  .readdirSync(eventsDir)
  .filter((f) => /\.mdx?$/.test(f))
  .filter((f) => matter(fs.readFileSync(path.join(eventsDir, f), "utf8")).data.noindex === true)
  .map((f) => `/events/${f.replace(/\.mdx?$/, "")}/`);

// The projects index is noindex while every project is a draft, so leave it out too.
const projectsDir = "./src/content/projects";
const hasPublishedProjects = fs
  .readdirSync(projectsDir)
  .filter((f) => /\.mdx?$/.test(f))
  .some((f) => matter(fs.readFileSync(path.join(projectsDir, f), "utf8")).data.draft !== true);
if (!hasPublishedProjects) noindexPaths.push("/projects/");

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  // Astro 7 defaults to JSX-style whitespace removal ("jsx"), which can delete
  // spaces between inline elements. Keep the Astro 6 behavior.
  compressHTML: true,
  vite: { plugins: [tailwindcss()] },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !noindexPaths.some((p) => new URL(page).pathname === p),
    }),
    mdx(),
  ],
  redirects: {
    '/nets': '/activities/nets/',  // handles both /nets and /nets/
    '/pota': '/activities/pota/',
    '/sota': '/activities/sota/',
    // The photo upload form is part of the gallery Worker (w4trc-gallery repo).
    '/gallery/submit': 'https://gallery.w4trc.org/submit',
  },
});
