import { defineCollection, z } from "astro:content";

const events = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string().or(z.date()),     // start
    endDate: z.string().or(z.date()).optional(),
    location: z.string().optional(),
    summary: z.string().optional(),
    cover: z.string().optional(),
    url: z.string().optional(),
  }),
});

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string().or(z.date()),
    cover: z.string().optional(),
    summary: z.string().optional(),
  }),
});

const news = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string().or(z.date()),
    cover: z.string().optional(),
    summary: z.string().optional(),
  }),
});

export const collections = { events, blog, news };
