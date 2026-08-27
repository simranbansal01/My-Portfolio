import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolio";

export default function Projects() {
  return (
    <main className="min-h-screen bg-[#141414] text-[#fbf3e8] font-sans overflow-x-hidden flex flex-col items-center pt-6 pb-20 px-4">
      <nav className="w-full max-w-3xl flex items-center justify-center gap-10 md:gap-14 text-stone-300 font-caveat text-2xl mb-8 z-40">
        <Link to="/" className="hover:text-[#cd4c38] transition-colors relative group">
          ← home
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#cd4c38] transition-all group-hover:w-full" />
        </Link>
        <Link to="/#experience" className="hover:text-[#cd4c38] transition-colors relative group">
          Experience
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#cd4c38] transition-all group-hover:w-full" />
        </Link>
        <Link to="/#connect" className="hover:text-[#cd4c38] transition-colors relative group">
          Connect
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#cd4c38] transition-all group-hover:w-full" />
        </Link>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-[94vw] max-w-5xl bg-[#cd4c38] rounded-[2.8rem] p-3.5 md:p-5 shadow-[0_30px_90px_rgba(0,0,0,0.95)] border-2 border-[#b03b29]"
      >
        <div className="relative w-full bg-[#fdf4e9] rounded-[2.2rem] border-2 border-[#eeddc9] overflow-hidden p-8 md:p-14 paper-grain">
          <span className="font-mono text-xs text-[#c83a2a] uppercase tracking-widest font-bold">
            Case Studies
          </span>
          <h1 className="text-3xl md:text-5xl font-playfair text-[#1c1b1a] mt-1 mb-10">
            Projects
          </h1>

          <div className="space-y-8">
            {portfolioData.projects.map((project) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/95 border-2 border-[#1c1b1a] rounded-3xl p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(200,58,42,1)]"
              >
                <span className="font-mono text-xs text-[#c83a2a] uppercase tracking-widest font-bold">
                  {project.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-playfair text-[#1c1b1a] font-bold mt-1 mb-3">
                  {project.title}
                </h2>
                <p className="font-playfair italic text-base text-[#8f281b] mb-5">
                  {project.summary}
                </p>

                {"flow" in project && project.flow && (
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-stone-800 mb-5">
                    {project.flow.map((step, i) => (
                      <span key={step} className="flex items-center gap-1.5">
                        <span className="border border-stone-300 bg-[#fdf4e9] rounded-full px-3 py-1.5">
                          {step}
                        </span>
                        {i < project.flow.length - 1 && (
                          <span className="text-[#cd4c38]">→</span>
                        )}
                      </span>
                    ))}
                  </div>
                )}

                {"problem" in project && project.problem && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
                    <div>
                      <span className="block font-mono text-[10px] text-stone-500 uppercase tracking-wider mb-1">
                        Problem
                      </span>
                      <p className="text-sm text-stone-700">{project.problem}</p>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] text-stone-500 uppercase tracking-wider mb-1">
                        Built
                      </span>
                      <p className="text-sm text-stone-700">{project.built}</p>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] text-stone-500 uppercase tracking-wider mb-1">
                        Impact
                      </span>
                      <p className="text-sm text-stone-700">{project.impact}</p>
                    </div>
                  </div>
                )}

                {"highlights" in project && project.highlights && (
                  <ul className="flex flex-wrap gap-2 mb-5">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="font-mono text-[11px] bg-stone-100 border border-stone-300 px-2.5 py-1 rounded shadow-sm text-stone-700"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] bg-[#fdf4e9] border border-stone-400 px-3 py-1 rounded-md text-stone-800 shadow-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
