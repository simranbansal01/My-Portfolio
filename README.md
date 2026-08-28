# Simran Bansal — Portfolio

Desktop-first, playful-editorial portfolio site. Vite + React + TypeScript + Tailwind v4,
with GSAP/ScrollTrigger, Framer Motion and Lenis driving the motion.

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build to dist/
npm run lint     # oxlint
```

## Layouts

The desktop and mobile experiences are two separate component trees, chosen by
`useIsMobileLayout()` in `src/App.tsx` — the phone layout is not the desktop one reflowed.

| | Desktop (`src/desktop/`) | Mobile (`src/mobile/`) |
| --- | --- | --- |
| Scroll | Lenis smooth scroll on the GSAP ticker | native scrolling |
| Beliefs | section pins, three cards translate on x, then unpins | scroll-snap belt driven by the thumb |
| Stack | infinite marquee, pauses on hover, reverses on scroll-up | contact-sheet grid of badges |
| Work | full-bleed cards, scale + opacity reveal, hover reveals the live link | tap-to-open accordion |
| Position | fixed numbered rail, 18 stops, click to jump | bottom bar with progress line and chapter chips |

## Motion rules

- Every scripted transition sits between 300ms and 800ms (`src/lib/motion.ts`). The only
  continuous motion is the marquee loop and the sticker springs.
- `prefers-reduced-motion` is read once in `App` and threaded through every component:
  Lenis and ScrollTrigger never initialise, the hero renders at its resting state, the
  stickers stop tracking the cursor and the marquee holds still. `src/index.css` also
  clamps any remaining CSS animation.
- The hero title is split per character (40ms stagger, `y: 100% → 0`), the statement per
  word; both live in `src/components/SplitText.tsx`.

## Assets

The cutout stickers (`src/assets/stickers/`) and marquee badges (`src/assets/badges/`) are
generated, not hand-drawn. `scripts/gen_assets.py` rasterises them from signed distance
fields with the Python standard library only:

```bash
python3 scripts/gen_assets.py
```

Content lives in one place: `src/data/portfolio.ts`, including the 18 chapter anchors the
progress rail points at.
