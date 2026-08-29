/**
 * Every word on this site comes from the content master
 * (`Simran_Bansal_Portfolio_Content_Master.docx`, transcribed into the
 * `simrantimes.html` reference). Copy is transcribed, never paraphrased.
 *
 * Guardrails that this file exists to enforce:
 *  - Simran is never "Founder" of The Credix. The status reads
 *    "Building · Independent product".
 *  - Source currencies are preserved. CAD $60M stays CAD.
 *  - No invented research findings, user counts, business impact or metrics.
 *    `proof` holds the only verified numbers.
 *  - Golden Hour: the team shared the broader research; the reframe is Simran's.
 *  - The two exploratory concepts stay exploratory.
 */

export const identity = {
  name: "Simran Bansal",
  signature: "Simran",
  /** The rotating line under the signature. Order is the career order. */
  roles: [
    "Finance executive.",
    "Systems thinker.",
    "Product builder.",
  ],
  roleStrip: "Finance executive · Systems thinker · Product builder",
  route: "Ambala → Toronto",
  timezone: "America/Toronto",
  timezoneLabel: "GMT −05:00",
  deck: "I started by following money through complicated systems. Somewhere along the way, I started wondering why the systems were complicated in the first place.",
} as const;

export const nav = [
  { id: "about", label: "about" },
  { id: "work", label: "work" },
  { id: "connect", label: "connect" },
] as const;

/** The editorial intro, set as the notebook's second page. */
export const intro = [
  "I like finding the part of a system everyone has learned to tolerate, asking why it works that way, and then trying to build a better version.",
  "Accounting and receivables gave me repeated exposure to broken workflows — exceptions, reconciliation problems, manual follow-ups, gaps between the tools that were supposed to talk to each other.",
  "That exposure gradually shifted my focus from completing the process to questioning the process itself. This page is the record of what I noticed, and where each thing led.",
  "Currently exploring product opportunities, interesting problems, and teams where curiosity is useful.",
] as const;

/**
 * Three notes pinned to the board. Each is a compression of one intro
 * paragraph plus the margin-annotation bank — Simran's own lines, not new
 * claims. `paper` picks which paper texture the note is torn from.
 */
export const beliefs = [
  {
    id: "friction",
    text: "Follow the friction.",
    paper: "ruled",
    rotate: -6,
  },
  {
    id: "tolerate",
    text: "Every system has a part everyone learned to tolerate.",
    paper: "graph",
    rotate: 4,
  },
  {
    id: "process",
    text: "Question the process, don't just complete it.",
    paper: "kraft",
    rotate: -2,
  },
] as const;

export type Belief = (typeof beliefs)[number];

export type Story = {
  no: string;
  /** The last segment of the story's own URL: /work/<slug>. */
  slug: string;
  title: string;
  category: string;
  teaser: string;
  noticed: string;
  questioned: string;
  built: string;
  /** Which inline demo this story carries. Paarth deliberately has none. */
  demo?: "verdict" | "workflow" | "pivot";
  /**
   * Notes on the thinking the concept has to keep hold of. Only present where
   * the content master records them.
   */
  productThinking?: readonly string[];
  /** A credit line the story must not be read without. */
  ownership?: string;
  links: readonly { label: string; href: string }[];
};

/**
 * The four product stories, each on the I NOTICED → I QUESTIONED → I BUILT
 * spine the content master requires.
 *
 * `href: "#"` still means "no destination decided" and renders as plain text
 * rather than a dead link, so the PRD and Repo entries stay honest until they
 * point somewhere.
 */
export const stories: readonly Story[] = [
  {
    no: "01",
    slug: "corner-shelf",
    title: "Corner Shelf",
    category: "AI × Learning",
    teaser:
      "AI learning is full of content. The harder question is whether people can tell if they are actually getting better at using it.",
    noticed:
      "People can use AI frequently and still struggle to judge the quality of the output. More usage does not automatically create confidence or capability.",
    questioned:
      "What if an AI-learning product focused less on consuming lessons and more on practice, feedback, confidence calibration and applying skills?",
    built:
      "Corner Shelf: an interactive AI-learning concept built around a customized learning path, practical tasks and case studies, regular testing, and a shared library environment where learners can work alongside or challenge each other.",
    demo: "verdict",
    productThinking: [
      "Gamification should support learning, not become the product.",
      "Beginner motivation mechanics may become annoying or performative as users become more capable.",
      "The experience should evolve with the learner rather than doubling down on streaks forever.",
    ],
    links: [
      { label: "PRD", href: "#" },
      { label: "Artifact", href: "#" },
      { label: "Live", href: "https://corner-shelf.netlify.app" },
      { label: "Repo", href: "#" },
    ],
  },
  {
    no: "02",
    slug: "fastlane",
    title: "FastLane",
    category: "B2B × Workflow · Vendor management",
    teaser:
      "Vendor operations often look like a simple workflow until the status of one request disappears across people, tools and follow-ups.",
    noticed:
      "Vendor onboarding and management can become a chain of chasing: unclear status, fragmented ownership, repeated follow-ups and limited visibility into what is blocking progress.",
    questioned:
      "What would the workflow look like if status, ownership and the next action were obvious without someone manually chasing every step?",
    built:
      "FastLane: a vendor-management workflow concept designed to make requests, bottlenecks, ownership and progress easier to understand at a glance.",
    demo: "workflow",
    links: [
      { label: "PRD", href: "#" },
      { label: "Artifact", href: "#" },
      { label: "Live", href: "https://fastlane-xi.vercel.app/overview" },
      { label: "Repo", href: "#" },
    ],
  },
  {
    no: "03",
    slug: "paarth",
    title: "Paarth",
    category: "Healthcare / Elder care × Marketplace",
    teaser:
      "Elder care is rarely one service. Families often need to coordinate multiple needs while also figuring out who they can trust.",
    noticed:
      "The difficulty is not only finding a service. It is navigating an ecosystem of care needs, providers, coordination and trust.",
    questioned:
      "How might an elder-care product make discovering and coordinating support feel less fragmented for families?",
    built:
      "Paarth: an elder-care service ecosystem / marketplace concept focused on making care discovery and coordination easier to navigate.",
    // No demo, by instruction: keep this story concise and invent no
    // interaction or validation the project work does not support.
    links: [
      { label: "PRD", href: "#" },
      {
        label: "Artifact",
        href: "https://claude.ai/code/artifact/155cdbed-1dff-47b8-9c25-eceb00f78503",
      },
      { label: "Live", href: "#" },
      { label: "Repo", href: "#" },
    ],
  },
  {
    no: "04",
    slug: "golden-hour",
    // The content master offers "WHAT HAPPENS BEFORE HELP ARRIVES?" as the
    // alternate feature headline for this story.
    title: "The first few minutes belong to nobody.",
    category: "Gig economy × Emergency response · The Golden Hour",
    teaser:
      "The research began in the gig economy. The product direction emerged when the problem was reframed around a different question: could an existing distributed network help close the gap before qualified emergency response arrives?",
    noticed:
      "While exploring the gig economy, I found a more urgent gap: the period before qualified emergency help reaches a person can be critically important, yet that window may have no coordinated first-response layer.",
    questioned:
      "Could the density and location of an existing gig-worker network be used differently — not as a replacement for ambulances or medical professionals, but as a way to rethink the first-response gap?",
    built:
      "I reframed the problem and proposed the Golden Hour solution around that gap, connecting the idea of a distributed gig network with faster first-response support before qualified help arrives.",
    demo: "pivot",
    ownership:
      "Research for the broader case study was shared across the team. I identified and reframed the emergency-response gap and proposed the solution direction.",
    links: [
      { label: "PRD", href: "#" },
      {
        label: "Artifact",
        href: "https://claude.ai/code/artifact/b9c247c2-ddd9-4c9a-ba04-07651725c38c",
      },
      { label: "Live", href: "#" },
      { label: "Repo", href: "#" },
    ],
  },
];

/**
 * The deployed product to embed on a story's page, if there is one.
 *
 * Only a "Live" destination qualifies. The two Claude artifact links are not
 * embeddable and never will be: claude.ai serves `frame-ancestors 'self'`, and
 * the sandbox origin its CSP names is not reachable without the owner's
 * session. Those stories keep the drawing instead.
 */
export function livePreviewHref(story: Story): string | null {
  const live = story.links.find((l) => l.label === "Live");
  return live && !isPlaceholderHref(live.href) ? live.href : null;
}

/** Looks a story up by the slug in its URL. */
export function storyBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

/** The career ledger. Rows tick off in red as the scroll passes through them. */
export const ledger = [
  "I balanced the books.",
  "I chased the money.",
  "I found why it kept breaking.",
  "I fixed the system.",
  "I made the system fix itself.",
  "I shaped the product.",
  "I'm building the thing.",
] as const;

export const routeLine = "Ambala → Toronto → Finance → Systems → Product";

/**
 * The only verified numbers on the site. `figure` is set apart in red; nothing
 * else on the page may claim a metric. CAD stays CAD.
 */
export const proof = [
  { before: "Approx. ", figure: "CAD $60M", after: " in portfolio exposure" },
  { before: "", figure: "4", after: " entities and subdivisions" },
  { before: "", figure: "250+", after: " accounts weekly" },
  { before: "Reconciling items reduced by ", figure: "75%", after: "" },
  {
    before: "",
    figure: "",
    after: "MS Dynamics GP · AS400 · NetSuite · QuickBooks · Power BI",
  },
] as const;

/** The Credix. Status line is fixed by the guardrails — do not change it. */
export const credix = {
  status: "Building · Independent product",
  title: "The Credix",
  lede: "I'm exploring what happens when collections is treated as a revenue-governance system rather than a sequence of reminders.",
  body: "Collections problems are not always reminder problems. They can come from contracts, ownership, process gaps, missing follow-up logic, weak escalation paths and poor visibility across the revenue cycle.",
  pillars: [
    { no: "01", text: "Human audit and process readiness" },
    {
      no: "02",
      text: "Automation across reminders, voice workflows and trigger-based actions",
    },
    { no: "03", text: "Escalation and exception handling" },
  ],
} as const;

/** Exploratory concepts. These stay exploratory — never solved products. */
export const investigations = [
  {
    status: "Exploring",
    title: "A memory for things I see",
    body: "A screenshot is often the beginning of an idea and the end of its context. I'm exploring a lightweight memory system that saves the image together with where it came from and enough context to make it useful later.",
  },
  {
    status: "Questioning",
    title: "Shared stays, split payments",
    body: "Still investigating.",
  },
] as const;

export const contact = {
  heading: "Get in touch.",
  body: 'Interesting product problem, unusual project, or a team that likes people who ask too many "why" questions? I\'d like to hear about it.',
  /**
   * "What I look for" — drawn from the contact paragraph above, one checkbox
   * per thing it names. Ticking one strikes it through, as in the reference.
   */
  looking: [
    "Interesting product problems",
    "Unusual projects",
    'Teams that like too many "why" questions',
  ],
  cta: "let's chat!",
  links: [
    { label: "Email", href: "mailto:simranbansal1301@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sbansal02/" },
    { label: "Résumé", href: "#" },
  ],
} as const;

export const colophon = [
  "The Simran Times · Content edition",
  "Set in Arial & Newsreader",
  "Annotated in red",
] as const;

/** `#` is the content master's stand-in for a destination not yet decided. */
export function isPlaceholderHref(href: string): boolean {
  return href === "#" || href === "";
}

/** Margin annotations. Drift on cursor, always in the pen colour. */
export const annotations = [
  "black + white first. colour when you look closer.",
  "follow the friction.",
] as const;

/**
 * The content master pins this one to the "Currently investigating" section
 * specifically, so it is written on the board itself rather than left to
 * float in the margin with the other two.
 */
export const investigatingNote =
  "a small question with a suspiciously large rabbit hole.";

/** The scrap pinned in the middle of the work gallery. */
export const galleryNote =
  "The questions changed. The instinct to investigate didn't.";
