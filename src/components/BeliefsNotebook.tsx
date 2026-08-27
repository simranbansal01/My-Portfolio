import React, { useRef } from "react";
import { motion } from "framer-motion";

export const BeliefsNotebook: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative z-20 w-[94vw] max-w-5xl bg-[#cd4c38] rounded-b-[2.8rem] -mt-6 p-3 md:p-5 pt-0 shadow-[0_30px_80px_rgba(0,0,0,0.9)] border-2 border-t-0 border-[#b03b29] select-none"
    >
      {/* Horizontal Notebook Spine / Page Seam */}
      <div className="w-full h-4 bg-[#b53a29] border-y border-[#982b1c] shadow-inner mb-3 flex items-center justify-around opacity-90">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#5f170c]" />
        ))}
      </div>

      {/* LOWER NOTEBOOK SPREAD */}
      <div className="relative w-full min-h-[480px] bg-[#fdf4e9] rounded-b-[2.2rem] p-8 md:p-12 border-2 border-t-0 border-[#eeddc9] overflow-hidden">
        
        {/* Section Heading */}
        <div className="mb-8">
          <h3 className="font-['Playfair_Display',serif] text-xl md:text-2xl text-[#c83a2a] font-normal tracking-wide">
            3 things I strongly believe in
          </h3>
        </div>

        {/* SCRAPBOOK CUTOUTS STACK */}
        <div className="relative w-full h-[320px] flex items-center justify-center">

          {/* 1. BLUE-RULED LINED TORN PAPER (Left Scrap) */}
          <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            whileHover={{ scale: 1.08, rotate: -4, zIndex: 30 }}
            whileTap={{ scale: 0.96, cursor: "grabbing" }}
            className="absolute -left-2 md:left-24 top-6 z-10 w-64 md:w-72 bg-[#ffffff] p-5 shadow-[5px_8px_18px_rgba(0,0,0,0.18)] border border-neutral-200 cursor-grab rotate-[-6deg]"
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
              <p className="font-['Caveat',cursive] text-3xl md:text-4xl text-[#1e1b18] font-bold leading-tight">
                tirelessly<br />pursue<br />clarity.
              </p>
            </div>
          </motion.div>

          {/* 2. GREY BLUEPRINT / GRID TORN PAPER (Right Scrap) */}
          <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            whileHover={{ scale: 1.08, rotate: 3, zIndex: 30 }}
            whileTap={{ scale: 0.96, cursor: "grabbing" }}
            className="absolute right-0 md:right-28 top-2 z-10 w-64 md:w-72 bg-[#e2ded9] p-6 shadow-[6px_10px_20px_rgba(0,0,0,0.22)] border border-[#ccc6be] cursor-grab rotate-[4deg]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(120, 120, 120, 0.25) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(120, 120, 120, 0.25) 1px, transparent 1px)
              `,
              backgroundSize: "18px 18px",
              clipPath: "polygon(2% 0%, 98% 2%, 100% 92%, 94% 100%, 0% 97%)",
            }}
          >
            <p className="font-['Space_Mono',monospace] text-2xl md:text-3xl font-bold text-[#1a1918] tracking-tight leading-snug">
              Software<br />should<br />empower.
            </p>
          </motion.div>

          {/* 3. KRAFT PAPER SLIP WITH METAL PAPERCLIP (Bottom Center) */}
          <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            whileHover={{ scale: 1.08, rotate: -2, zIndex: 30 }}
            whileTap={{ scale: 0.96, cursor: "grabbing" }}
            className="absolute bottom-2 md:bottom-4 z-20 w-60 md:w-68 bg-[#dfcfbd] p-4 pt-6 rounded-sm shadow-[4px_8px_16px_rgba(0,0,0,0.2)] border border-[#c4b19d] rotate-[-2deg] cursor-grab"
          >
            {/* SVG Metal Paperclip */}
            <div className="absolute -top-4 left-8 pointer-events-none">
              <svg width="22" height="42" viewBox="0 0 22 42" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round">
                <path d="M7 10 V32 C7 36 15 36 15 32 V6 C15 2 3 2 3 6 V30" />
              </svg>
            </div>

            <p className="font-['Caveat',cursive] text-2xl md:text-3xl font-bold text-[#2d241e] text-center leading-snug">
              Craft is in the friction you remove.
            </p>
          </motion.div>

        </div>

      </div>
    </div>
  );
};
