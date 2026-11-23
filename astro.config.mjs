import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import sharp from "sharp";
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

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  image: { service: sharp() },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !noindexPaths.some((p) => new URL(page).pathname === p),
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: { theme: "one-dark-pro", wrap: true },
  },
  redirects: {
    '/nets': '/activities/nets/',  // handles both /nets and /nets/
    '/pota': '/activities/pota/',
    '/sota': '/activities/sota/',
  },
});
