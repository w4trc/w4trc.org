// Gallery photos are stored in the R2 bucket served at PHOTOS_BASE, not in
// this repo. The gallery Worker (gallery.w4trc.org) makes the sizes, stores
// them, and lists the albums; see the `albums` collection in content.config.ts.

export const PHOTOS_BASE = (
  import.meta.env.PUBLIC_PHOTOS_BASE ?? "https://photos.w4trc.org"
).replace(/\/$/, "");

/** t = 640px-wide thumbnail, d = 2048px-wide display copy (both WebP) */
export type PhotoSize = "t" | "d";

export const photoUrl = (album: string, file: string, size: PhotoSize) =>
  `${PHOTOS_BASE}/albums/${album}/${size}/${file}.webp`;

export const photoAlt = (
  photo: { alt?: string; caption?: string },
  albumTitle: string,
  index: number,
) => photo.alt || photo.caption || `${albumTitle}, photo ${index + 1}`;
