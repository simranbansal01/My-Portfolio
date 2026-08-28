export type Chapter = {
  /** DOM id of the anchor this rail tick scrolls to. */
  id: string;
  label: string;
  section: string;
  /**
   * Which way the anchor travels through the viewport. The pinned belief cards
   * move sideways, so the rail reads their horizontal position instead.
   */
  axis?: "x" | "y";
};

export type Belief = {
  index: string;
  title: string;
  body: string;
  tint: "red" | "mustard" | "teal";
};

export type Project = {
  id: string;
  index: string;
  title: string;
  role: string;
  period: string;
  category: string;
  summary: string;
  points: string[];
  tags: string[];
  metric: { value: string; label: string };
  link?: { href: string; label: string };
};

export const profile = {
  name: "Simran Bansal",
  jobTitle: "Revenue Operator",
  statement: "I build the evidence trail that turns messy revenue into something a finance team can actually defend.",
  location: "Bangalore, India",
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "IST",
  available: "Open for B2B finance architecture & revenue ops",
  email: "simranbansal1301@gmail.com",
  phone: "+91 7015933296",
  linkedin: "https://linkedin.com",
  credix: "https://thecredix.com",
};

export const beliefs: Belief[] = [
  {
    index: "01",
    title: "Tirelessly pursue clarity.",
    body: "Every reconciliation break is a story someone stopped telling. I chase it to the root instead of writing it off — the ledger only balances when the narrative does.",
    tint: "red",
  },
  {
    index: "02",
    title: "Software should empower.",
    body: "Finance tooling shouldn't feel like a tax on the people using it. Controls that operators actually want to follow beat controls that only look good in an audit binder.",
    tint: "mustard",
  },
  {
    index: "03",
    title: "One trail, contract to collection.",
    body: "Contract terms, delivery proof, invoice accuracy, collection cadence, dispute evidence — one continuous chain. Break a link and revenue quietly becomes an opinion.",
    tint: "teal",
  },
];

export const projects: Project[] = [
  {
    id: "credix",
    index: "01",
    title: "The Credix",
    role: "Founder",
    period: "2025 — Present",
    category: "AI Revenue Governance",
    summary:
      "Pre-launch AI revenue governance infrastructure for B2B finance teams. It closes the messy gap between what a contract promised, what was delivered, what got invoiced, and what actually landed in the bank.",
    points: [
      "Architected three autonomy tiers — Flag & Suggest, Auto-Execute, Human Handoff.",
      "Built risk-scoring models that surface revenue-at-risk before a payment fails.",
      "Running live AR diagnostics with SaaS and logistics operators.",
    ],
    tags: ["AI Governance", "Order-to-Cash", "Risk Engine", "B2B SaaS"],
    metric: { value: "3", label: "autonomy tiers" },
    link: { href: "https://thecredix.com", label: "thecredix.com" },
  },
  {
    id: "bitespeed",
    index: "02",
    title: "BiteSpeed",
    role: "Reconciliation & Revenue Accounting Lead",
    period: "Dec 2025 — Present",
    category: "SaaS · India",
    summary:
      "Finance operations for fast close cycles under US GAAP (ASC 606) — gateway reconciliations across Razorpay and UPI matched all the way to bank subledgers and the GL.",
    points: [
      "Standardised reconciliation controls and moved the team to an audit-ready cadence.",
      "Automated cash application with root-cause resolution for gateway drops.",
      "Owned GST & TDS compliance plus variance MIS for executive leadership.",
    ],
    tags: ["Razorpay", "UPI", "ASC 606", "Subledger GL"],
    metric: { value: "ASC 606", label: "revenue standard" },
  },
  {
    id: "tgle",
    index: "03",
    title: "Toronto Great Lakes Express",
    role: "Reconciliation & AR Lead",
    period: "Apr 2022 — May 2025",
    category: "Logistics · Canada",
    summary:
      "Led AR and ledger reconciliation across a CAD $60M portfolio — 250+ active accounts, four entities, one very stubborn legacy ERP.",
    points: [
      "Directed an end-to-end JDE → NetSuite migration, delivered 10% under budget, trained 50+ operators.",
      "Cut outstanding reconciling breaks by 75% through systemic root-cause work.",
      "Owned SOX 302/404 compliance, ICFR control matrices and macro automation (75% time saved).",
    ],
    tags: ["NetSuite", "JDE ERP", "SOX 302/404", "Automation"],
    metric: { value: "75%", label: "fewer open breaks" },
  },
  {
    id: "weliveproperty",
    index: "04",
    title: "WeLiveProperty",
    role: "Head of Operations (Freelance)",
    period: "Jun 2025 — Nov 2025",
    category: "Real Estate · UK",
    summary:
      "Built the financial and operational frame for a high-velocity property business — audit-defensible reporting and cross-functional legal workflows without adding headcount.",
    points: [
      "Structured bank and vendor reconciliation protocols from scratch.",
      "Set the cash-flow governance cadence the leadership team still runs on.",
    ],
    tags: ["Cash Flow Governance", "Vendor Recs", "Operations"],
    metric: { value: "0", label: "extra headcount" },
  },
];

export const numbers = [
  { value: "$60M", label: "AR portfolio reconciled" },
  { value: "250+", label: "active accounts owned" },
  { value: "50+", label: "operators trained on ERP" },
  { value: "4", label: "entities, one close calendar" },
];

export const toolkit = [
  { id: "erps", category: "ERPs", items: ["NetSuite", "JD Edwards", "Dynamics GP", "QuickBooks"] },
  { id: "payments", category: "Payments & Recs", items: ["Razorpay", "UPI Settlement", "Gateway Rec", "Subledger GL"] },
  { id: "governance", category: "Governance", items: ["ASC 606", "SOX 302/404", "US GAAP", "ICFR"] },
  { id: "product", category: "Product & Tools", items: ["Claude", "Notion AI", "Excel Macros", "Financial Modeling"] },
];

export const education = [
  { title: "PG Diploma, Financial Planning", school: "Seneca College, Canada", year: "2022" },
  { title: "B.Com (Integrated ACCA)", school: "Chitkara University, India", year: "2021" },
  { title: "CFA Candidate · ACCA RQF Level 4", school: "Global designations", year: "Active" },
];

/** The 18 stops behind the fixed progress rail. Each maps to a real anchor. */
export const chapters: Chapter[] = [
  { id: "ch-index", label: "Index", section: "Hero" },
  { id: "ch-now", label: "Now", section: "Hero" },
  { id: "ch-belief-01", label: "Clarity", section: "Beliefs", axis: "x" },
  { id: "ch-belief-02", label: "Empower", section: "Beliefs", axis: "x" },
  { id: "ch-belief-03", label: "Evidence", section: "Beliefs", axis: "x" },
  { id: "ch-stack", label: "Stack", section: "Stack" },
  { id: "ch-work", label: "Work", section: "Work" },
  { id: "ch-credix", label: "Credix", section: "Work" },
  { id: "ch-bitespeed", label: "BiteSpeed", section: "Work" },
  { id: "ch-tgle", label: "TGLE", section: "Work" },
  { id: "ch-weliveproperty", label: "WeLive", section: "Work" },
  { id: "ch-numbers", label: "Numbers", section: "Numbers" },
  { id: "ch-erps", label: "ERPs", section: "Toolkit" },
  { id: "ch-payments", label: "Payments", section: "Toolkit" },
  { id: "ch-governance", label: "Governance", section: "Toolkit" },
  { id: "ch-product", label: "Product", section: "Toolkit" },
  { id: "ch-education", label: "Studies", section: "Studies" },
  { id: "ch-contact", label: "Contact", section: "Contact" },
];
