export const portfolioData = {
  name: "Simran Bansal",
  role: "Operator + Builder · Revenue Operations & Finance Systems",
  location: "Bangalore, India • IST +5:30",
  tagline: "Software should feel reliable, transparent, and grounded.",
  contact: {
    email: "simranbansal1301@gmail.com",
    phone: "+91 7015933296",
    linkedin: "https://linkedin.com",
    credixUrl: "https://thecredix.com"
  },
  beliefs: [
    {
      title: "tirelessly\npursue\nclarity.",
      type: "lined",
      rotate: -5
    },
    {
      title: "Software\nshould\nempower.",
      type: "grid",
      rotate: 4
    },
    {
      title: "One evidence trail from contract to collection.",
      type: "kraft",
      rotate: -2
    }
  ],
  projects: [
    {
      id: "01",
      title: "Reconciliation Governance System",
      category: "Financial Systems",
      summary: "Fragmented reconciliation processes across multiple entities, made auditable.",
      problem: "Fragmented reconciliation processes across multiple entities.",
      built: "Standardized templates, escalation workflows, governance controls, and sign-off processes.",
      impact: "Reduced unresolved reconciliation items and improved audit readiness.",
      tags: ["Reconciliation", "Governance", "Audit-Ready", "Multi-Entity"]
    },
    {
      id: "02",
      title: "JDE → NetSuite ERP Transformation",
      category: "ERP Migration",
      summary: "End-to-end ERP migration across a CAD $60M portfolio, delivered under budget.",
      flow: ["JDE", "Data & GL Mapping", "Validation", "NetSuite"],
      highlights: ["GL mapping", "Reconciliation configuration", "Data validation", "Cross-functional implementation", "User training"],
      tags: ["NetSuite", "JDE ERP", "GL Mapping", "50+ Users Trained"]
    },
    {
      id: "03",
      title: "Revenue & Payment Operations",
      category: "Revenue Operations",
      summary: "One continuous system from customer invoice to recognized revenue.",
      flow: ["Customer", "Invoice", "Payment", "Gateway", "Reconciliation", "Cash Application", "Revenue"],
      highlights: ["Payment gateways", "Razorpay", "UPI", "Settlements", "AR", "Reconciliation", "Deferred revenue"],
      tags: ["Razorpay", "UPI", "AR", "Deferred Revenue"]
    }
  ],
  ventures: [
    {
      id: "01",
      title: "The Credix",
      role: "Founder (2025 – Present)",
      category: "AI Revenue Governance",
      highlight: "From contract to collection to consequence",
      description:
        "Pre-launch AI-driven revenue governance infrastructure for B2B finance teams. Bridges the messy gap across contract terms, delivery proof, invoice accuracy, collection cadence, and dispute evidence.",
      details: [
        "Architected 3 autonomy tiers: Flag & Suggest, Auto-Execute, and Human Handoff.",
        "Built risk-scoring models predicting revenue-at-risk before payment failures occur.",
        "Currently conducting live AR diagnostics with SaaS and logistics operators."
      ],
      tags: ["AI Governance", "Order-to-Cash", "Risk Engine", "B2B SaaS"]
    }
  ],
  experience: [
    {
      id: "02",
      company: "BiteSpeed",
      role: "Reconciliation & Revenue Accounting Lead",
      period: "Dec 2025 – Present",
      location: "India · SaaS",
      description:
        "Leading finance operations for rapid close cycles under US GAAP (ASC 606). Owning payment gateway reconciliations across Razorpay and UPI matched to bank subledgers and GL.",
      points: [
        "Implemented standardized reconciliation controls moving teams to an audit-ready cadence.",
        "Built automated cash application workflows and root-cause resolution for gateway drops.",
        "Delivered full GST & TDS compliance and regular variance MIS reports for executive leadership."
      ],
      tags: ["Razorpay", "UPI", "ASC 606", "US GAAP", "Subledger GL"]
    },
    {
      id: "03",
      company: "Toronto Great Lakes Express",
      role: "Reconciliation & AR Lead",
      period: "Apr 2022 – May 2025",
      location: "Canada · Logistics",
      description:
        "Led AR and ledger reconciliations across a CAD $60M portfolio with 250+ active accounts and 4 entities.",
      points: [
        "Directed end-to-end JDE → NetSuite ERP migration 10% under budget, training 50+ operators.",
        "Reduced outstanding reconciling breaks by 75% via systemic root-cause resolution.",
        "Owned SOX 302/404 compliance, ICFR control matrices, and automated macro workflows (75% time cut)."
      ],
      tags: ["NetSuite", "JDE ERP", "$60M Portfolio", "SOX 302/404", "Automation"]
    },
    {
      id: "04",
      company: "WeLiveProperty",
      role: "Head of Operations (Freelance)",
      period: "Jun 2025 – Nov 2025",
      location: "UK · Real Estate",
      description:
        "Engineered financial and operational frameworks, audit-defensible reporting, and cross-functional legal workflows without adding overhead.",
      points: [
        "Structured bank and vendor reconciliation protocols for high-velocity real estate operations."
      ],
      tags: ["Cash Flow Governance", "Vendor Recs", "Operations"]
    }
  ],
  skills: [
    { category: "ERPs", items: ["NetSuite", "JDE", "Dynamics GP", "QuickBooks"] },
    { category: "Payments & Recs", items: ["Razorpay", "UPI Settlement", "Gateway Rec", "Subledger GL"] },
    { category: "Governance & Acct", items: ["ASC 606", "SOX 302/404", "US GAAP", "ICFR Frameworks"] },
    { category: "Product & Tools", items: ["Claude", "Notion AI", "Excel Macros", "Financial Modeling"] }
  ],
  education: [
    { title: "PGD in Financial Planning", school: "Seneca College, Canada", year: "2022" },
    { title: "Bachelor of Commerce (Integrated ACCA)", school: "Chitkara University, India", year: "2021" },
    { title: "CFA Candidate & ACCA RQF Level 4", school: "Global Designations", year: "Active" }
  ]
};
