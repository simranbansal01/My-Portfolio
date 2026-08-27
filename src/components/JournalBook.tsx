import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../data/portfolio";

const rotatingWords = ["reliable", "empowering", "clarifying", "defensible", "tactile"];

export const JournalBook: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-visible flex flex-col items-center justify-start pt-6 select-none"
    >
      {/* 1. TOP NAV WITH SMOOTH ANCHORS */}
      <nav className="w-full max-w-3xl flex items-center justify-center gap-10 md:gap-14 text-stone-300 font-caveat text-2xl mb-8 z-40">
        <motion.span whileHover={{ scale: 1.3, rotate: 20 }} className="cursor-pointer">
          ☺
        </motion.span>
        <a href="#about" className="hover:text-[#cd4c38] transition-colors relative group">
          about
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#cd4c38] transition-all group-hover:w-full" />
        </a>
        <a href="#building" className="hover:text-[#cd4c38] transition-colors relative group">
          Building
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#cd4c38] transition-all group-hover:w-full" />
        </a>
        <a href="#experience" className="hover:text-[#cd4c38] transition-colors relative group">
          Experience
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#cd4c38] transition-all group-hover:w-full" />
        </a>
        <a href="#connect" className="hover:text-[#cd4c38] transition-colors relative group">
          Connect
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#cd4c38] transition-all group-hover:w-full" />
        </a>
      </nav>

      {/* 2. FLOATING CHALK DOODLES */}
      <motion.div
        drag
        dragConstraints={containerRef}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-64 left-10 md:left-24 z-30 cursor-grab opacity-85 hidden sm:block"
        whileHover={{ scale: 1.15, rotate: -8 }}
      >
        <svg width="60" height="85" viewBox="0 0 60 85" fill="none" stroke="#dedad4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 28 L40 28 L50 40 L50 78 L18 78 L12 28 Z" />
          <path d="M12 28 L22 14 L50 14 L40 28" />
          <path d="M50 14 L58 28 L50 40" />
          <path d="M30 14 L36 3 L44 6" />
          <circle cx="32" cy="54" r="8" />
        </svg>
      </motion.div>

      <motion.div
        drag
        dragConstraints={containerRef}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-36 right-10 md:right-28 z-30 cursor-grab opacity-85 hidden sm:block"
        whileHover={{ scale: 1.15, rotate: 8 }}
      >
        <svg width="78" height="55" viewBox="0 0 78 55" fill="none" stroke="#dedad4" strokeWidth="2.2" strokeLinecap="round">
          <path d="M10 24 C10 46 68 46 68 24 Z" />
          <line x1="8" y1="24" x2="70" y2="24" />
          <path d="M18 20 Q39 6 60 20" />
          <line x1="58" y1="12" x2="76" y2="4" />
        </svg>
      </motion.div>

      {/* 3. HARDCOVER JOURNAL SPREAD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-[94vw] max-w-5xl bg-[#cd4c38] rounded-[2.8rem] p-3.5 md:p-5 shadow-[0_30px_90px_rgba(0,0,0,0.95)] border-2 border-[#b03b29]"
      >
        {/* Bookmarks */}
        <div className="absolute top-[480px] -left-5 w-8 h-20 bg-[#b53424] rounded-b-md shadow-lg transform -rotate-45 -z-10 border border-[#8f2010]" />
        <div className="absolute top-[495px] -left-3 w-6 h-18 bg-[#d95643] rounded-b-md shadow-md transform -rotate-30 -z-10 border border-[#9b2a1a]" />
        <div className="absolute top-[470px] -right-4 w-12 h-6 bg-[#b53424] rounded-r-md shadow-md transform rotate-12 -z-10" />

        {/* Inner Graph Paper */}
        <div className="relative w-full bg-[#fdf4e9] rounded-[2.2rem] border-2 border-[#eeddc9] overflow-hidden shadow-inner flex flex-col">
          
          {/* HERO TOP */}
          <div
            id="about"
            className="relative w-full p-8 md:p-14 pb-8 flex flex-col lg:flex-row items-center justify-between"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(160, 195, 215, 0.4) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(160, 195, 215, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
            }}
          >
            <div className="flex-1 flex flex-col justify-between h-full z-10 w-full max-w-lg">
              <div>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="font-caveat text-5xl md:text-6xl text-[#c83a2a] tracking-tight font-bold flex items-center gap-1 leading-none cursor-pointer"
                >
                  <span>{portfolioData.name.split(" ")[0]}</span>
                  <span className="text-3xl font-mono text-[#c83a2a] rotate-12">::</span>
                </motion.div>

                <p className="font-playfair text-lg md:text-xl text-[#c83a2a] mt-2 font-normal">
                  {portfolioData.role}
                </p>

                <div className="mt-8 md:mt-10 space-y-1">
                  <h1 className="text-4xl md:text-6xl font-playfair text-[#c83a2a] tracking-tight font-normal leading-tight">
                    Software should
                  </h1>
                  <div className="flex items-center gap-3 text-4xl md:text-6xl font-playfair text-[#c83a2a] tracking-tight leading-tight">
                    <span>feel</span>
                    <div className="relative inline-block h-[1.3em] overflow-hidden min-w-[220px]">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={rotatingWords[wordIndex]}
                          initial={{ y: 35, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -35, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-0 font-caveat text-5xl md:text-7xl font-bold text-[#c83a2a] lowercase tracking-wide"
                        >
                          {rotatingWords[wordIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 md:mt-12">
                <span className="font-playfair text-sm md:text-base text-[#c83a2a]/90 font-medium">
                  {portfolioData.location}
                </span>
              </div>
            </div>

            {/* Sketch SVG */}
            <div className="flex-1 flex items-center justify-center relative mt-8 lg:mt-0 w-full">
              <svg
                className="w-full max-w-[420px] h-auto text-[#c83a2a]"
                viewBox="0 0 450 420"
                fill="none"
                stroke="#c83a2a"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="90" y="60" width="260" height="310" rx="10" />
                <line x1="90" y1="95" x2="350" y2="95" />
                <rect x="98" y="73" width="10" height="10" />
                <rect x="114" y="73" width="10" height="10" />
                <text x="185" y="82" fill="#c83a2a" stroke="none" fontSize="11" fontFamily="'Space Mono', monospace" fontWeight="bold">
                  THE CREDIX
                </text>
                <rect x="322" y="73" width="10" height="10" />
                <line x1="322" y1="73" x2="332" y2="83" />

                <rect x="135" y="125" width="170" height="26" rx="13" />
                <path d="M152 138 Q165 132 178 138" />
                <path d="M285 134 L292 138 L285 142" />
                <path d="M140 180 Q160 170 180 180 T220 180" />

                <circle cx="280" cy="235" r="22" />
                <circle cx="273" cy="230" r="2.5" fill="#c83a2a" />
                <circle cx="287" cy="230" r="2.5" fill="#c83a2a" />
                <path d="M275 242 Q280 248 285 242" />

                <path d="M260 258 L260 330 L300 330 L300 258" />
                <rect x="200" y="210" width="60" height="85" rx="8" />

                <line x1="190" y1="330" x2="310" y2="330" />
                <rect x="198" y="330" width="60" height="35" />

                <path d="M350 220 Q375 220 380 235 L370 245 L380 255 Q360 270 350 260" />
                <path d="M355 260 L360 360" />
                <circle cx="365" cy="235" r="2" fill="#c83a2a" />
                <path d="M358 248 L348 252" />

                <path
                  d="M40 380 C30 310 90 280 110 380 C130 290 210 300 230 380 C260 310 340 320 360 380 C390 310 440 330 430 380"
                  fill="#fdf4e9"
                />
                <circle cx="110" cy="50" r="8" />
                <path d="M102 50 L96 52" />
                <circle cx="140" cy="50" r="8" />
                <path d="M148 50 L154 52" />
                <circle cx="330" cy="50" r="8" />
                <path d="M338 50 L344 52" />

                <path d="M355 120 Q370 170 355 220 Q370 270 355 320" />
              </svg>
            </div>
          </div>

          {/* PAGE SEAM */}
          <div className="relative w-full h-7 bg-[#f0e2d3] border-y border-[#dfccbb] flex items-center justify-around px-4">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#c2a690] shadow-sm" />
            ))}
          </div>

          {/* 3 BELIEFS SPREAD */}
          <div className="relative w-full min-h-[460px] p-8 md:p-14 pt-8 bg-[#fdf4e9]">
            <h3 className="font-playfair text-xl md:text-2xl text-[#c83a2a] mb-6">
              3 things I strongly believe in
            </h3>

            <div className="relative w-full h-[320px] flex items-center justify-center">
              {/* Lined Paper */}
              <motion.div
                drag
                dragConstraints={containerRef}
                dragElastic={0.2}
                whileHover={{ scale: 1.08, rotate: -3, zIndex: 30 }}
                whileTap={{ scale: 0.96 }}
                className="absolute -left-2 md:left-16 top-4 z-10 w-64 md:w-72 bg-[#ffffff] p-5 shadow-lg border border-neutral-200 cursor-grab rotate-[-6deg]"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, transparent 36px, #ef4444 37px, transparent 38px),
                    linear-gradient(to bottom, transparent 24px, #bfdbfe 25px)
                  `,
                  backgroundSize: "100% 26px",
                  clipPath: "polygon(0% 4%, 100% 0%, 98% 96%, 3% 100%, 0% 90%)",
                }}
              >
                <div className="pt-6 pl-8">
                  <p className="font-caveat text-3xl md:text-4xl text-[#1e1b18] font-bold leading-tight whitespace-pre-line">
                    {portfolioData.beliefs[0].title}
                  </p>
                </div>
              </motion.div>

              {/* Grid Paper */}
              <motion.div
                drag
                dragConstraints={containerRef}
                dragElastic={0.2}
                whileHover={{ scale: 1.08, rotate: 2, zIndex: 30 }}
                whileTap={{ scale: 0.96 }}
                className="absolute right-0 md:right-20 top-0 z-10 w-64 md:w-72 bg-[#e5e1dc] p-6 shadow-lg border border-[#ccc6be] cursor-grab rotate-[4deg]"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(120, 120, 120, 0.25) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(120, 120, 120, 0.25) 1px, transparent 1px)
                  `,
                  backgroundSize: "18px 18px",
                  clipPath: "polygon(2% 0%, 98% 2%, 100% 92%, 94% 100%, 0% 97%)",
                }}
              >
                <p className="font-mono text-2xl md:text-3xl font-bold text-[#1a1918] tracking-tight leading-snug whitespace-pre-line">
                  {portfolioData.beliefs[1].title}
                </p>
              </motion.div>

              {/* Kraft Slip */}
              <motion.div
                drag
                dragConstraints={containerRef}
                dragElastic={0.2}
                whileHover={{ scale: 1.08, rotate: -1, zIndex: 30 }}
                whileTap={{ scale: 0.96 }}
                className="absolute bottom-2 md:bottom-3 z-20 w-64 md:w-72 bg-[#dfcfbd] p-4 pt-6 rounded-sm shadow-md border border-[#c4b19d] rotate-[-2deg] cursor-grab"
              >
                <div className="absolute -top-4 left-8 pointer-events-none">
                  <svg width="22" height="42" viewBox="0 0 22 42" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M7 10 V32 C7 36 15 36 15 32 V6 C15 2 3 2 3 6 V30" />
                  </svg>
                </div>
                <p className="font-caveat text-2xl md:text-3xl font-bold text-[#2d241e] text-center leading-snug">
                  "{portfolioData.beliefs[2].title}"
                </p>
              </motion.div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
