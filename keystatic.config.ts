import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'w4trc/w4trc.org',
  },
  collections: {
    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'src/content/events/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.text({ label: 'Start Date/Time', description: 'Format: 2026-06-27T14:00:00' }),
        endDate: fields.text({ label: 'End Date/Time', validation: { isRequired: false } }),
        location: fields.text({ label: 'Location', validation: { isRequired: false } }),
        summary: fields.text({ label: 'Summary', multiline: true, validation: { isRequired: false } }),
        cover: fields.text({ label: 'Cover Image Path', validation: { isRequired: false } }),
        rsvpUrl: fields.url({ label: 'RSVP URL', validation: { isRequired: false } }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    meetings: collection({
      label: 'Meetings',
      slugField: 'title',
      path: 'src/content/meetings/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        datetime: fields.text({ label: 'Date/Time', description: 'Format: 2026-06-09T19:00:00' }),
        location: fields.text({ label: 'Location', validation: { isRequired: false } }),
        topic: fields.text({ label: 'Topic', validation: { isRequired: false } }),
        desc: fields.text({ label: 'Description', multiline: true, validation: { isRequired: false } }),
        signupUrl: fields.url({ label: 'Signup URL', validation: { isRequired: false } }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});