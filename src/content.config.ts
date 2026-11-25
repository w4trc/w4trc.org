import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    endDate: z.string().optional(),
    location: z.string().optional(),
    summary: z.string().optional(),
    cover: z.string().optional(),
    url: z.string().optional(),
    rsvpUrl: z.string().optional(),
    featured: z.boolean().optional(),
    noindex: z.boolean().optional(),
  }),
});

const officers = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/officers" }),
  schema: z.object({
    title: z.string(),
    position: z.string(),
    callsign: z.string().optional(),
    photo: z.string().optional(),
    photo_alt: z.string().optional(),
    weight: z.number().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    image: z.string().optional(),
    weight: z.number().optional(),
    draft: z.boolean().optional(),
  }),
});

const silentKeys = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/silentKeys" }),
  schema: z.object({
    name: z.string(),
    callsign: z.string().optional(),
    years: z.string().optional(),
    description: z.string().optional(),
    obituaryUrl: z.url().optional(),
    weight: z.number().optional(),
  }),
});

const meetings = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/meetings" }),
  schema: z.object({
    title: z.string(),
    datetime: z.string(),
    location: z.string().optional(),
    topic: z.string().optional(),
    desc: z.string().optional(),
    signupUrl: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const presentations = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/presentations" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    presenter: z.string(),
    description: z.string().optional(),
    /** Shorter description for search results (about 155 characters max); falls back to description */
    meta_description: z.string().optional(),
    youtubeId: z.string().optional(),
    slidesUrl: z.string().optional(),
    slidesEmbed: z.string().optional(),
    cover: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const activities = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/activities" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    nets: z.array(z.any()).optional(),
    net_rules: z.array(z.any()).optional(),
    scripts: z.array(z.any()).optional(),
    foxhunts: z.any().optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z.string().optional(),
    summary: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    externalUrl: z.string().optional(),
  }),
});

const learn = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/learn" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    weight: z.number().optional(),
  }),
});

// Photo albums, loaded from the gallery Worker (w4trc-gallery repo) when the
// site builds. Albums and photos are managed at gallery.w4trc.org/admin; the
// image files are in R2 (see src/lib/gallery.ts). If the API can't be
// reached the build fails, so the last good deploy stays live.
const GALLERY_API = (process.env.GALLERY_API ?? "https://gallery.w4trc.org").replace(/\/$/, "");

const albums = defineCollection({
  loader: async () => {
    const res = await fetch(`${GALLERY_API}/api/gallery`);
    if (!res.ok) throw new Error(`Gallery API ${GALLERY_API}/api/gallery returned HTTP ${res.status}`);
    const { albums } = await res.json();
    return albums.map(({ slug, ...album }: { slug: string }) => ({ id: slug, ...album }));
  },
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
    /** `file` of the cover photo */
    cover: z.string(),
    photos: z
      .array(
        z.object({
          /** Key name in R2, without size folder or extension */
          file: z.string(),
          /** Size of the display image, so the layout can reserve space */
          width: z.number(),
          height: z.number(),
          alt: z.string().optional(),
          caption: z.string().optional(),
        })
      )
      .min(1),
  }),
});

export const collections = { albums, events, officers, projects, meetings, silentKeys, presentations, activities, posts, learn };