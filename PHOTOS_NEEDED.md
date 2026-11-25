# Photos Needed

Club photos to replace stock images and fill in pages with no header photo.

**Size:** landscape, at least 1600×600. Page headers crop the top and bottom
and darken the photo behind the title, so keep the subject in the middle band.

**To add one:** put the file in `public/images/` and update the file listed
under "Set in" (or send the file name and which page it's for).

## Needed: replace stock photos

| Page | URL | Current photo | Set in | Ideas |
|---|---|---|---|---|
| Meeting Minutes | /resources/minutes/ | `anastassia-anufrieva-…-unsplash.jpg` | `src/pages/resources/minutes/index.astro` | A meeting in progress, or the secretary taking notes |
| Zero-Beat | /resources/newsletter/ | `roman-kraft-…-unsplash.jpg` | `src/pages/resources/newsletter/index.astro` | Someone reading the newsletter, or a desk in a ham shack |
| Documents & Downloads | /resources/downloads/ | `wesley-tingey-…-unsplash.jpg` | `src/pages/resources/downloads/index.astro` | Club forms or a clipboard at an event, or the VE testing table |
| Helpful Links | /resources/links/ | `john-…-unsplash.jpg` | `src/pages/resources/links/index.astro` | A member's station with a radio and computer |
| Member Articles & Bios | /resources/articles/ | `patrick-tomasso-…-unsplash.jpg` | `src/pages/resources/articles/index.astro` | A member at their own station |
| Silent Keys | /resources/silent-keys/ | `david-tomaseti-…-unsplash.jpg` | `src/pages/resources/silent-keys/index.astro` | Something quiet: an antenna at sunset, a straight key, or a club memorial item |
| Live Spots | /spots/ | `pawel-czerwinski-…-unsplash.jpg` | `src/pages/spots.astro` | A POTA or SOTA activation in the field |

## Needed: Learn pages

These photos are loaded from Unsplash's website, so they break if Unsplash
changes the link. Club photos stored on our own site fix that.

| Page | URL | Set in | Ideas |
|---|---|---|---|
| Learn (main page) | /learn/ | `src/pages/learn/index.astro` | Members on the air at Field Day |
| What Is Amateur Radio? | /learn/what-is-amateur-radio/ | `src/content/learn/what-is-amateur-radio.md` (`image:`) | Members on the air at Field Day (a different shot) |
| What Is a Repeater? | /learn/what-is-a-repeater/ | `src/content/learn/what-is-a-repeater.md` (`image:`) | The Bays Mountain repeater tower |
| What Is a Net? | /learn/what-is-a-net/ | `src/content/learn/what-is-a-net.md` (`image:`) | Someone running net control |
| What Can You Do With a License? | /learn/what-can-you-do-with-a-license/ | `src/content/learn/what-can-you-do-with-a-license.md` (`image:`) | A fox hunt, POTA activation, or special-event station |

## Needed: one photo reused on several pages

All four of these use `hero-mountains.jpg`.

| Page | URL | Set in | Ideas |
|---|---|---|---|
| About | /about/ | `src/content/about/-index.md` (`image:`) | A club group photo |
| Join | /join/ | `src/pages/join.astro` | New members, or a welcoming meeting shot |
| Contact | /contact/ | `src/content/contact/-index.md` (`image:`) | The outside of the Toy F. Reid Employee Center |
| Officer Responsibilities | /officers/responsibilities/ | `src/pages/officers/responsibilities.astro` | The current officers together |

The Repeaters page and the Repeater Dashboard share `IMG_2781.jpg`:

| Page | URL | Set in | Ideas |
|---|---|---|---|
| Repeater Dashboard | /repeaters/dashboard/ | `src/pages/repeaters/dashboard.astro` | The equipment rack at the tower site |

## Worth checking

| Page | URL | Current photo | Set in | Why |
|---|---|---|---|---|
| Nets (activity) | /activities/nets/ | `ic-705.jpg` | `src/content/activities/nets.md` (`image:`) | May be a manufacturer's product photo, not a club photo |
| SOTA (activity) | /activities/sota/ | `sota-mountains.jpg` | `src/content/activities/sota.mdx` (`image:`) | Generic mountains; a real KARC summit activation would be better |

## Blank: no header photo (optional)

These use the plain grid background, which looks fine. A photo is optional;
the first two would gain the most.

| Page | URL | Set in | Ideas |
|---|---|---|---|
| Find an Elmer | /elmer/ | `src/pages/elmer/index.astro` | A mentor helping a new ham |
| Club Projects | /projects/ | `src/pages/projects/index.astro` | A build session, or a finished antenna or kit |
| Club Activities | /activities/ | `src/pages/activities/index.astro` | A montage-style field operation shot |
| EchoLink | /repeaters/echolink/ | `src/pages/repeaters/echolink.astro` | A member using EchoLink on a phone or computer |
| Club Posts | /posts/ | `src/pages/posts/index.astro` | Probably fine blank; the post cards have photos |
| Presentations | /presentations/ | `src/pages/presentations/index.astro` | Probably fine blank; the cards have video thumbnails |
| Events | /events/ | `src/pages/events/index.astro` | Probably fine blank; the event cards have photos |
| Privacy Policy | /privacy-policy/ | `src/pages/privacy-policy.astro` | Leave blank |

Page types that never use a header photo: individual events, posts, and
presentations show their own cover image or video below the header, and
project pages show their image in the page.

## Already club photos (no change needed)

- Meetings: `clubmeetings2025.jpg`
- Former Presidents: `previous-presidents-gavel.png`
- License Testing: `license-testing-header.png`
- Repeaters: `IMG_2781.jpg`
- Repeater History: `history/RPT07-scaled.jpg`
- Fox Hunting: `activities/fox-hunting/…jpg`
- POTA: `activities/pota/20220813_133807.jpg`
