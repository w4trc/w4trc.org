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

const officers = defineCollection({
  type: "content",
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
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    image: z.string().optional(),
    weight: z.number().optional(),
  }),
});

const silentKeys = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    callsign: z.string().optional(),
    years: z.string().optional(),
    description: z.string().optional(),
    obituaryUrl: z.string().url().optional(),
    weight: z.number().optional(),
  }),
});

const meetings = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    datetime: z.string().or(z.date()),
    location: z.string().optional(),
    topic: z.string().optional(),
    desc: z.string().optional(),
    signupUrl: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { events, blog, news, officers, projects, meetings, silentKeys, };
