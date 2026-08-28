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
    "Product builder in the making.",
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
  title: string;
  category: string;
  teaser: string;
  noticed: string;
  questioned: string;
  built: string;
  links: readonly { label: string; href: string }[];
};

/**
 * The four product stories, each on the I NOTICED → I QUESTIONED → I BUILT
 * spine the content master requires. Links are still placeholders; they are
 * marked so the UI can render them as unresolved rather than as live links.
 */
export const stories: readonly Story[] = [
  {
    no: "01",
    title: "Corner Shelf",
    category: "AI × Learning",
    teaser:
      "AI learning is full of content. The harder question is whether people can tell if they are actually getting better at using it.",
    noticed:
      "People can use AI frequently and still struggle to judge the quality of the output. More usage does not automatically create confidence or capability.",
    questioned:
      "What if an AI-learning product focused less on consuming lessons and more on practice, feedback, confidence calibration and applying skills?",
    built:
      "An interactive AI-learning concept built around a customized learning path, practical tasks and case studies, regular testing, and a shared library where learners work alongside or challenge each other.",
    links: [
      { label: "PRD", href: "#" },
      { label: "Artifact", href: "#" },
      { label: "Live", href: "#" },
      { label: "Repo", href: "#" },
    ],
  },
  {
    no: "02",
    title: "FastLane",
    category: "B2B × Workflow · Vendor management",
    teaser:
      "Vendor operations look like a simple workflow until the status of one request disappears across people, tools and follow-ups.",
    noticed:
      "Vendor onboarding becomes a chain of chasing: unclear status, fragmented ownership, repeated follow-ups, limited visibility into what is blocking progress.",
    questioned:
      "What would the workflow look like if status, ownership and the next action were obvious without someone manually chasing every step?",
    built:
      "A vendor-management workflow concept designed to make requests, bottlenecks, ownership and progress readable at a glance.",
    links: [
      { label: "PRD", href: "#" },
      { label: "Artifact", href: "#" },
      { label: "Live", href: "#" },
      { label: "Repo", href: "#" },
    ],
  },
  {
    no: "03",
    title: "Paarth",
    category: "Elder care × Marketplace",
    teaser:
      "Elder care is rarely one service. Families often need to coordinate multiple needs while also figuring out who they can trust.",
    noticed:
      "The difficulty is not only finding a service. It is navigating an ecosystem of care needs, providers, coordination and trust.",
    questioned:
      "How might an elder-care product make discovering and coordinating support feel less fragmented for families?",
    built:
      "An elder-care service ecosystem concept focused on making care discovery and coordination easier to navigate.",
    links: [
      { label: "PRD", href: "#" },
      { label: "Artifact", href: "#" },
      { label: "Live", href: "#" },
      { label: "Repo", href: "#" },
    ],
  },
  {
    no: "04",
    title: "The first few minutes belong to nobody.",
    category: "Gig economy × Emergency response · The Golden Hour",
    teaser:
      "The research began in the gig economy. The direction emerged when the problem was reframed around a different question.",
    noticed:
      "While exploring the gig economy I found a more urgent gap: the period before qualified emergency help reaches a person can be critical, yet that window may have no coordinated first-response layer.",
    questioned:
      "Could the density and location of an existing gig-worker network be used differently — not as a replacement for ambulances or medical professionals, but as a way to rethink the first-response gap?",
    built:
      "I reframed the problem and proposed the Golden Hour direction around that gap. Research for the broader case study was shared across the team; the reframe and solution direction are mine.",
    links: [
      { label: "PRD", href: "#" },
      { label: "Artifact", href: "#" },
      { label: "Live", href: "#" },
      { label: "Repo", href: "#" },
    ],
  },
];

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
    { label: "Email", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Résumé", href: "#" },
  ],
} as const;

export const colophon = [
  "The Simran Times · Content edition",
  "Set in Bodoni Moda & Newsreader",
  "Annotated in red",
] as const;

/** Margin annotations. Drift on cursor, always in the pen colour. */
export const annotations = [
  "black + white first. colour when you look closer.",
  "follow the friction.",
  "a small question with a suspiciously large rabbit hole.",
] as const;
