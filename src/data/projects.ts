export type Tone = 'forest' | 'rust' | 'sky' | 'sand' | 'charcoal'

export interface CaseSection {
  index: string
  title: string
  body: string[]
  layout: 'type-heavy' | 'image-heavy' | 'split'
}

export interface Project {
  slug: string
  number: string
  name: string
  oneLiner: string
  role: string
  year: string
  tone: Tone
  seed: number
  tags: string[]
  intro: string
  sections: CaseSection[]
}

export const projects: Project[] = [
  {
    slug: 'corner-shelf',
    number: '01',
    name: 'Corner Shelf',
    oneLiner: 'A small-space furniture system that designs itself around your room.',
    role: 'Product · Systems design',
    year: '2023',
    tone: 'forest',
    seed: 2,
    tags: ['Product thinking', 'Systems', 'Manufacturing'],
    intro:
      'Corner Shelf started as an argument with my own apartment. It became a study in how much intelligence you can hide inside a very boring object.',
    sections: [
      {
        index: '01',
        title: 'The problem',
        layout: 'type-heavy',
        body: [
          'Corners are the most wasted volume in any small home, and every shelf on the market assumes a wall, not a wedge.',
          'I wanted to know whether a single modular system could fit almost any corner without a custom carpenter.',
        ],
      },
      {
        index: '02',
        title: 'What I discovered',
        layout: 'image-heavy',
        body: [
          'Corners are never actually 90 degrees. Skirting boards, old plaster and lazy contractors mean the "standard" corner is a myth.',
          'People don’t want more storage. They want less visual noise. Storage was the excuse, calm was the goal.',
        ],
      },
      {
        index: '03',
        title: 'The hypothesis',
        layout: 'type-heavy',
        body: [
          'If the shelf could tolerate angle error the way good software tolerates bad input, we wouldn’t need custom joinery — just a forgiving joint.',
        ],
      },
      {
        index: '04',
        title: 'Research',
        layout: 'split',
        body: [
          'Measured 40 corners across friends’ apartments. Angles ranged from 84° to 97°.',
          'Interviewed six people mid-move. Nobody described their storage needs in cubic feet — they described feelings: cramped, chaotic, unfinished.',
        ],
      },
      {
        index: '05',
        title: 'Thinking',
        layout: 'type-heavy',
        body: [
          'Treated the shelf like a product with an API: a single adjustable bracket as the interface, everything else as implementation detail the user never sees.',
        ],
      },
      {
        index: '06',
        title: 'Product direction',
        layout: 'image-heavy',
        body: [
          'One bracket, three plank lengths, a single hex key. The whole system ships flat and reads like a piece of furniture, not a kit.',
        ],
      },
      {
        index: '07',
        title: 'Design',
        layout: 'split',
        body: [
          'Rounded every edge by hand until the shelf stopped looking like hardware and started looking like something you’d keep.',
          'Chose a finish that hides dust and forgives a slightly-off wall colour — small mercies matter in real homes.',
        ],
      },
      {
        index: '08',
        title: 'What happened',
        layout: 'type-heavy',
        body: [
          'A working prototype held books, a turntable and one extremely skeptical cat. It fit three different corners without a single measurement.',
        ],
      },
      {
        index: '09',
        title: 'What I learned',
        layout: 'type-heavy',
        body: [
          'The best system design is the one nobody notices. The bracket is the whole product; everything else is decoration around a good decision.',
        ],
      },
    ],
  },
  {
    slug: 'ai-learning-platform',
    number: '02',
    name: 'AI Learning Platform',
    oneLiner: 'A gamified way to actually understand how the models work, not just prompt them.',
    role: 'Product · AI',
    year: '2024',
    tone: 'sky',
    seed: 4,
    tags: ['AI', 'Education', 'Gamification'],
    intro:
      'Everyone was learning to prompt. Almost nobody was learning to reason about what was happening underneath. This platform tried to close that gap, one level at a time.',
    sections: [
      {
        index: '01',
        title: 'The problem',
        layout: 'type-heavy',
        body: [
          'Most "learn AI" content is either a listicle of prompt hacks or a graduate lecture. Nothing sat in between and made the concepts sticky.',
        ],
      },
      {
        index: '02',
        title: 'What I discovered',
        layout: 'image-heavy',
        body: [
          'People retain systems better as games than as documentation. Give someone a broken pipeline to fix and they’ll remember it longer than any explainer.',
        ],
      },
      {
        index: '03',
        title: 'The hypothesis',
        layout: 'type-heavy',
        body: [
          'If we turned core AI concepts — tokens, context windows, embeddings, fine-tuning — into small interactive puzzles, curiosity would do the rest.',
        ],
      },
      {
        index: '04',
        title: 'Research',
        layout: 'split',
        body: [
          'Ran a paper prototype with twelve people of wildly different technical backgrounds. The gamified version outperformed the article version on next-day recall.',
        ],
      },
      {
        index: '05',
        title: 'Thinking',
        layout: 'type-heavy',
        body: [
          'Designed a difficulty curve like a game, not a curriculum: fail fast, fail cheap, and always show the "why" immediately after the "what".',
        ],
      },
      {
        index: '06',
        title: 'Product direction',
        layout: 'image-heavy',
        body: [
          'Levels instead of chapters. A visible skill tree instead of a syllabus. Points that map to real capability, not attendance.',
        ],
      },
      {
        index: '07',
        title: 'Design',
        layout: 'split',
        body: [
          'Leaned into playful, almost cartoonish visuals for a topic people already find intimidating — the tone does a lot of the teaching.',
        ],
      },
      {
        index: '08',
        title: 'What happened',
        layout: 'type-heavy',
        body: [
          'Early testers who called themselves "not technical" were explaining context windows to their friends within a week.',
        ],
      },
      {
        index: '09',
        title: 'What I learned',
        layout: 'type-heavy',
        body: [
          'AI literacy isn’t a content problem, it’s a design problem. The concepts were never the hard part — the delivery was.',
        ],
      },
    ],
  },
  {
    slug: 'the-credix',
    number: '03',
    name: 'The Credix',
    oneLiner: 'A concept for revenue, AR and collections that treats cash flow like a living thing.',
    role: 'Product · Finance',
    year: '2023',
    tone: 'rust',
    seed: 6,
    tags: ['Finance', 'B2B', 'Ops tooling'],
    intro:
      'Finance taught me that most companies don’t have a revenue problem — they have a visibility problem. The Credix is what happens when you design accounts receivable like a product, not a spreadsheet.',
    sections: [
      {
        index: '01',
        title: 'The problem',
        layout: 'type-heavy',
        body: [
          'Collections teams live in email threads and aging reports. By the time a late invoice becomes visible, it’s already a relationship problem.',
        ],
      },
      {
        index: '02',
        title: 'What I discovered',
        layout: 'image-heavy',
        body: [
          'The best collections analysts weren’t working from the aging report at all — they had built their own mental model of "who’s about to be late" days before finance systems caught up.',
        ],
      },
      {
        index: '03',
        title: 'The hypothesis',
        layout: 'type-heavy',
        body: [
          'If we could surface that mental model as a live signal — a health score per account, not a static bucket — teams could act a week earlier.',
        ],
      },
      {
        index: '04',
        title: 'Research',
        layout: 'split',
        body: [
          'Shadowed three collections teams for two weeks. Every one of them kept a private, ad-hoc "watch list" outside the official system.',
        ],
      },
      {
        index: '05',
        title: 'Thinking',
        layout: 'type-heavy',
        body: [
          'Modeled receivables less like accounting and more like churn prediction: payment history, contact responsiveness and contract terms as leading indicators.',
        ],
      },
      {
        index: '06',
        title: 'Product direction',
        layout: 'image-heavy',
        body: [
          'A single prioritized queue instead of a static aging table — sorted by risk and dollar impact, not just days overdue.',
        ],
      },
      {
        index: '07',
        title: 'Design',
        layout: 'split',
        body: [
          'Deliberately unglamorous UI: dense, fast, keyboard-first. Finance tools should feel like a cockpit, not a dashboard for its own sake.',
        ],
      },
      {
        index: '08',
        title: 'What happened',
        layout: 'type-heavy',
        body: [
          'The concept model flagged risk accounts an average of 9 days before they would have appeared on a standard aging report.',
        ],
      },
      {
        index: '09',
        title: 'What I learned',
        layout: 'type-heavy',
        body: [
          'Finance systems are full of tacit knowledge nobody wrote down. The real product opportunity is making that knowledge visible to everyone, not just the veteran on the team.',
        ],
      },
    ],
  },
  {
    slug: 'noore',
    number: '04',
    name: 'Nooré',
    oneLiner: 'A hospitality concept built around slowness, in an industry obsessed with speed.',
    role: 'Concept · Business design',
    year: '2022',
    tone: 'sand',
    seed: 8,
    tags: ['Hospitality', 'Brand', 'Business design'],
    intro:
      'Nooré is a small-hotel concept for people who want a room, not a checklist of amenities. It’s the most human project on this page.',
    sections: [
      {
        index: '01',
        title: 'The problem',
        layout: 'type-heavy',
        body: [
          'Boutique hospitality brands had started to look identical: same beige, same "curated" language, same fifteen-step check-in flow nobody asked for.',
        ],
      },
      {
        index: '02',
        title: 'What I discovered',
        layout: 'image-heavy',
        body: [
          'The guests who left the best reviews rarely mentioned the amenities. They mentioned one specific, unplanned moment — a conversation, a view, a quiet hour.',
        ],
      },
      {
        index: '03',
        title: 'The hypothesis',
        layout: 'type-heavy',
        body: [
          'If the whole business was designed to protect a guest’s unstructured time instead of filling it, that would become the brand.',
        ],
      },
      {
        index: '04',
        title: 'Research',
        layout: 'split',
        body: [
          'Read two hundred reviews across competitor properties, tagging every sentence by whether it described a feature or a feeling.',
        ],
      },
      {
        index: '05',
        title: 'Thinking',
        layout: 'type-heavy',
        body: [
          'Built the business model around fewer rooms, longer average stays and a deliberately short amenities list — subtraction as a strategy.',
        ],
      },
      {
        index: '06',
        title: 'Product direction',
        layout: 'image-heavy',
        body: [
          'No lobby small talk, no upsell script. One welcome ritual, then the staff mostly disappear until you want them.',
        ],
      },
      {
        index: '07',
        title: 'Design',
        layout: 'split',
        body: [
          'Warm, low-saturation materials and a signage system with almost no words on it. The absence of instruction became part of the experience.',
        ],
      },
      {
        index: '08',
        title: 'What happened',
        layout: 'type-heavy',
        body: [
          'A small pilot pop-up over one weekend converted more word-of-mouth referrals than paid reach — people wanted to describe the feeling to someone.',
        ],
      },
      {
        index: '09',
        title: 'What I learned',
        layout: 'type-heavy',
        body: [
          'A brand isn’t what you say in the lobby. It’s what you deliberately choose not to do.',
        ],
      },
    ],
  },
]

export interface Experiment {
  slug: string
  title: string
  blurb: string
  tone: Tone
  seed: number
  year: string
}

export const experiments: Experiment[] = [
  {
    slug: 'scroll-synth',
    title: 'Scroll Synth',
    blurb: 'A tiny instrument that turns scroll velocity into sound. Built in an afternoon, impossible to stop touching.',
    tone: 'sky',
    seed: 3,
    year: '2024',
  },
  {
    slug: 'receipt-poems',
    title: 'Receipt Poems',
    blurb: 'A script that turns your last ten purchases into a short, slightly judgmental poem.',
    tone: 'rust',
    seed: 5,
    year: '2023',
  },
  {
    slug: 'desk-plant-os',
    title: 'Desk Plant OS',
    blurb: 'A tiny moisture sensor that texts you in the voice of your plant. Mine is dramatic.',
    tone: 'forest',
    seed: 7,
    year: '2023',
  },
  {
    slug: 'meeting-weather',
    title: 'Meeting Weather',
    blurb: 'A menu-bar app that forecasts how a meeting will go based on the calendar invite alone.',
    tone: 'charcoal',
    seed: 9,
    year: '2022',
  },
  {
    slug: 'paper-budget',
    title: 'Paper Budget',
    blurb: 'A one-page, printable budgeting system for people who trust pen and paper more than an app.',
    tone: 'sand',
    seed: 11,
    year: '2022',
  },
  {
    slug: 'night-shift-journal',
    title: 'Night Shift Journal',
    blurb: 'A journaling prompt generator that only works between midnight and 4am. Unreasonably popular with three friends.',
    tone: 'sky',
    seed: 13,
    year: '2021',
  },
]
