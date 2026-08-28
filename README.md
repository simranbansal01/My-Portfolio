# Simran Bansal — Portfolio

A dark desk with a red-bezel notebook lying on it, a cutting mat holding the
work, and an auditor's red pen over everything. Vite + React + TypeScript +
Tailwind v4, with GSAP/ScrollTrigger driving the motion and Lenis smoothing the
scroll.

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build to dist/
npm run lint     # oxlint
```

## The object

Top to bottom, the page is one argument:

| | |
| --- | --- |
| **Notebook** | A red moulded case holding two paper pages — the hero on grid paper, the editorial intro in columns — separated by a ribbon bookmark. |
| **Notes** | Three torn papers that slide out over the case's bottom edge and spread across the desk on scrub. |
| **Mat** | A numbered cutting mat in perspective. It tilts in, lies flat through the middle of the scroll where the work is read, and tilts away as it leaves. |
| **Polaroid** | Hangs off the mat's bottom edge on a dashed red thread. Draggable; springs back. |
| **Ledger** | The career, reconciled one line at a time. Rows tick off in red as the scroll passes through them. |
| **Proof** | The only verified figures on the site, run as a printed band. |
| **What I look for** | A checklist the visitor ticks. Ticking a line strikes it through and brings the drawing beside it into view. |

Fixed rails of red stamps run down both margins, chalk objects drift on scroll
outside the content column, and red annotations drift on the cursor.

## Layouts

Desktop and phone are two separate component trees, chosen by
`useIsMobileLayout()` in `src/App.tsx`. The phone layout is not the desktop one
reflowed — there is no margin on a phone, so the rails, chalk objects,
annotations and cursor parallax are not rendered at all, and nothing is pinned.

| | Desktop (`src/desk/`) | Phone (`src/mobile/`) |
| --- | --- | --- |
| Scroll | Lenis on the GSAP ticker | native scrolling |
| Nav | three words, hover draws a pen ring and pops a doodle | a row of tap targets |
| Notes | scrubbed spread across the desk | dealt down the page, each on its own angle |
| Work | one pinned mat in perspective | the mat narrowed to a strip, ruler kept |
| Margins | rails, chalk objects, red annotations | none |

## Motion rules

- **Scroll position is the playhead.** Everything scroll-driven is scrubbed,
  never triggered — `src/lib/scrub.ts` exists so no component reaches for a
  fire-once reveal. A reveal that fires at a threshold makes the page feel like
  a slideshow instead of an object you are moving through.
- Every scripted transition sits between 300ms and 800ms. The only continuous
  loops are the proof marquee and the rotating role line, which is a clock
  rather than a position.
- Cursor parallax is always lerped and never 1:1.
- `prefers-reduced-motion` is read once in `App` and threaded through every
  component: Lenis and ScrollTrigger never initialise, the mat renders flat in
  document order, the notes render spread, the ledger renders ticked, and the
  annotations hold still. `src/index.css` clamps anything left.

## Art

Everything drawn is original SVG, authored in `src/art/`:

| | |
| --- | --- |
| `Filters.tsx` | The `feTurbulence` displacement filters that give straight paths a pen wobble, chalk grain and stamped-ink erosion. |
| `sealGlyphs.tsx` / `Seals.tsx` | The rail stamps — an auditor's block: ticks, T-accounts, a magnifier over a line item, an exception flag, a balance. Glyphs are knocked out of the ink, the way a real stamp works. |
| `Doodles.tsx` | Chalk desk objects for the margins. All stroke, no fill. |
| `Marks.tsx` | Red-pen marks: the hover ring, checkbox and tick, strike-through, underline, the rough frame, the hanging thread. |
| `Scenes.tsx` | The three line drawings. |

Paper, grid, ruled, graph, kraft, the board, the bezel and the mat are all CSS —
gradients and clip-paths, no raster textures, so they stay crisp at any zoom.

## Type

Self-hosted in `public/fonts` and declared in `src/fonts.css`: Bodoni Moda
(display), Newsreader (body), Space Mono (labels), Caveat (hand). Latin subsets
only. The site is a typographic object, so the fonts are part of the build
rather than a CDN request that may or may not arrive.

## Content

All copy lives in `src/data/portfolio.ts`, transcribed from the content master
(`Simran_Bansal_Portfolio_Content_Master.docx`). That file carries the
guardrails as comments — read them before editing copy. In short:

- Simran is never "Founder" of The Credix. The status reads
  **Building · Independent product**.
- Source currencies are preserved. CAD $60M stays CAD.
- No invented research findings, user counts, business impact or metrics.
  `proof` holds the only verified numbers on the site.
- Golden Hour: the broader research was shared across the team; the reframe and
  solution direction are Simran's.
- The two exploratory concepts stay exploratory.

### Links are still placeholders

Every `href` in `portfolio.ts` is `"#"` — email, LinkedIn, GitHub, résumé, and
every PRD / Artifact / Live / Repo. The UI renders a `"#"` destination as plain
text rather than as a dead link, so filling in the data is the only change
needed to turn them live.
