import React, { useRef } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolio";

export const WorkLedger: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id="work"
      ref={containerRef}
      className="relative z-20 w-[94vw] max-w-5xl bg-[#cd4c38] rounded-[2.8rem] -mt-6 p-3.5 md:p-5 shadow-[0_30px_90px_rgba(0,0,0,0.95)] border-2 border-[#b03b29] mb-20 select-none scroll-mt-6"
    >
      {/* Notebook Top Seam */}
      <div className="w-full h-5 bg-[#b53a29] border-y border-[#982b1c] shadow-inner mb-6 flex items-center justify-around rounded-t-[2rem] opacity-90">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#5f170c]" />
        ))}
      </div>

      {/* Main Page Body */}
      <div className="relative w-full bg-[#fdf4e9] rounded-[2.2rem] p-6 md:p-12 border-2 border-[#eeddc9] overflow-hidden paper-grain">
        
        {/* ================= SECTION 1: BUILDING (THE CREDIX) ================= */}
        <section id="building" className="mb-16 scroll-mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#eeddc9] pb-4 mb-8"
          >
            <div>
              <span className="font-mono text-xs text-[#c83a2a] uppercase tracking-widest font-bold">
                01 / Venture
              </span>
              <h2 className="text-3xl md:text-5xl font-playfair text-[#1c1b1a] mt-1">
                Currently Building
              </h2>
            </div>
            <span className="font-caveat text-2xl text-[#c83a2a] font-bold">
              pre-launch AI revenue infrastructure ⚡️
            </span>
          </motion.div>

          {portfolioData.ventures.map((venture) => (
            <motion.div
              key={venture.id}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-white/95 border-2 border-[#1c1b1a] rounded-3xl p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(200,58,42,1)] hover:shadow-[12px_12px_0px_0px_rgba(200,58,42,1)] transition-all"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#fde047] border border-black font-mono text-xs font-bold rounded-full shadow-sm">
                      Founder · 2025–Present
                    </span>
                    <a
                      href={portfolioData.contact.credixUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs text-[#c83a2a] underline font-bold hover:text-black transition-colors"
                    >
                      thecredix.com ↗
                    </a>
                  </div>

                  <h3 className="text-4xl font-serif text-[#1c1b1a] tracking-tight">
                    {venture.title}
                  </h3>

                  <p className="font-playfair italic text-lg text-[#8f281b]">
                    "{venture.highlight}"
                  </p>

                  <p className="text-sm md:text-base text-stone-700 leading-relaxed font-sans">
                    {venture.description}
                  </p>

                  <ul className="space-y-2 pt-2">
                    {venture.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-stone-800 font-sans">
                        <span className="text-[#c83a2a] font-bold">↳</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {venture.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] bg-[#fdf4e9] border border-stone-400 px-3 py-1 rounded-md text-stone-800 shadow-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3-Tier Architecture Card */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="w-full lg:w-72 bg-[#fbf3e8] border-2 border-stone-800 p-5 rounded-2xl shadow-md flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <span className="font-mono text-[10px] text-stone-500 uppercase tracking-wider">
                      Live Architecture
                    </span>
                    <h4 className="font-playfair text-xl font-bold text-stone-900 mt-1">
                      3-Tier Autonomy Engine
                    </h4>
                    <div className="space-y-2 mt-4 text-xs font-mono">
                      <div className="p-2.5 bg-white rounded-lg border border-stone-300 shadow-sm">
                        🟢 <b>Tier 1:</b> Flag & Suggest
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-stone-300 shadow-sm">
                        🟡 <b>Tier 2:</b> Auto-Execute
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-stone-300 shadow-sm">
                        🔴 <b>Tier 3:</b> Human Handoff
                      </div>
                    </div>
                  </div>
                  <p className="font-caveat text-xl text-[#c83a2a] text-center mt-6 font-bold">
                    $60M portfolio intuition baked into code
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* ================= SECTION 2: EXPERIENCE / TRACK RECORD ================= */}
        <section id="experience" className="mb-16 scroll-mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#eeddc9] pb-4 mb-8"
          >
            <div>
              <span className="font-mono text-xs text-[#c83a2a] uppercase tracking-widest font-bold">
                02 / Proven Systems
              </span>
              <h2 className="text-3xl md:text-5xl font-playfair text-[#1c1b1a] mt-1">
                Experience & Transformations
              </h2>
            </div>
            <span className="font-caveat text-2xl text-[#c83a2a] font-bold">
              $60M AR portfolio & ERP transformations ✎
            </span>
          </motion.div>

          <div className="space-y-6">
            {portfolioData.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}
                className="bg-white/90 border border-stone-300 rounded-2xl p-6 md:p-8 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-playfair text-2xl text-stone-900 font-bold">
                      {exp.company}
                    </h3>
                    <p className="font-mono text-xs text-[#c83a2a] font-bold mt-0.5">
                      {exp.role} · {exp.location}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-stone-600 bg-stone-100 px-3 py-1 rounded-full border border-stone-200 self-start md:self-auto font-medium">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-stone-700 font-sans mb-4 leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-2 mb-5">
                  {exp.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-stone-800 font-sans">
                      <span className="text-[#c83a2a] font-bold">↳</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono bg-stone-100 border border-stone-300 px-2.5 py-1 rounded shadow-sm text-stone-700">
                      #{t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 3: TOOLING & CREDENTIALS ================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#f5e7d8] border-2 border-dashed border-[#d2b89f] rounded-2xl p-6"
          >
            <span className="font-mono text-xs text-[#c83a2a] uppercase font-bold">
              Toolbox & Systems
            </span>
            <div className="space-y-4 mt-4">
              {portfolioData.skills.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <h4 className="font-mono text-xs text-stone-800 font-bold">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {skillGroup.items.map((item) => (
                      <span key={item} className="font-mono text-[11px] bg-white border border-stone-300 px-2.5 py-1 rounded shadow-sm font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#f5e7d8] border-2 border-dashed border-[#d2b89f] rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs text-[#c83a2a] uppercase font-bold">
                Education & Credentials
              </span>
              <div className="space-y-4 mt-4">
                {portfolioData.education.map((edu, idx) => (
                  <div key={idx} className="border-b border-[#d6beaa] pb-2.5 last:border-0">
                    <h4 className="font-playfair text-base font-bold text-stone-900">{edu.title}</h4>
                    <p className="font-mono text-xs text-stone-600 mt-0.5">{edu.school} • {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 p-3.5 bg-white rounded-xl border border-stone-300 shadow-sm">
              <p className="font-caveat text-lg text-[#8f281b] text-center font-bold">
                ACCA RQF Level 4 · HBS Online Alternative Investments
              </p>
            </div>
          </motion.div>

        </section>

      </div>
    </div>
  );
};
