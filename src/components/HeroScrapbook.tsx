import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rotatingWords = ["honest", "empowering", "natural", "delightful", "tangible"];

const leftStamps = [
  { icon: "🏮", sub: "01" },
  { icon: "🎴", sub: "02" },
  { icon: "🌿", sub: "03" },
  { icon: "🦉", sub: "04" },
  { icon: "🌾", sub: "05" },
  { icon: "💮", sub: "06" },
  { icon: "🍵", sub: "07" },
  { icon: "🍂", sub: "08" },
  { icon: "🀄", sub: "09" },
];

const rightStamps = [
  { icon: "🌿", sub: "09" },
  { icon: "🦉", sub: "08" },
  { icon: "🏺", sub: "07" },
  { icon: "💻", sub: "06" },
  { icon: "💮", sub: "05" },
  { icon: "🍵", sub: "04" },
  { icon: "🏮", sub: "03" },
  { icon: "🎴", sub: "02" },
  { icon: "🀄", sub: "01" },
];

export const HeroScrapbook: React.FC = () => {
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
      className="relative w-full min-h-screen bg-[#161616] text-[#2c2c2c] overflow-hidden flex flex-col items-center justify-start pt-6 pb-16 select-none"
    >
      {/* 1. TOP NAV */}
      <nav className="w-full max-w-3xl flex items-center justify-center gap-10 md:gap-14 text-stone-300 font-['Caveat',cursive] text-2xl mb-6 z-40">
        <span className="hover:rotate-12 transition-transform cursor-pointer">☺</span>
        <a href="#about" className="hover:text-white transition-colors">about</a>
        <a href="#work" className="hover:text-white transition-colors">Work</a>
        <a href="#connect" className="hover:text-white transition-colors">Connect</a>
      </nav>

      {/* 2. LEFT WOODCUT STAMP BORDER */}
      <div className="hidden xl:flex flex-col justify-between absolute left-3 top-2 bottom-2 w-12 py-4 pointer-events-none z-10">
        {leftStamps.map((stamp, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-md bg-[#b83828] border border-[#d95240] flex flex-col items-center justify-center text-white/90 text-xs shadow-inner"
          >
            <span>{stamp.icon}</span>
          </div>
        ))}
      </div>

      {/* 3. RIGHT WOODCUT STAMP BORDER */}
      <div className="hidden xl:flex flex-col justify-between absolute right-3 top-2 bottom-2 w-12 py-4 pointer-events-none z-10">
        {rightStamps.map((stamp, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-md bg-[#b83828] border border-[#d95240] flex flex-col items-center justify-center text-white/90 text-xs shadow-inner"
          >
            <span>{stamp.icon}</span>
          </div>
        ))}
      </div>

      {/* 4. CHALK LINE DOODLES (Scattered around background) */}
      {/* Juice Box */}
      <motion.div
        drag
        dragConstraints={containerRef}
        className="absolute bottom-20 left-8 md:left-28 z-20 cursor-grab opacity-85 hidden sm:block"
        whileHover={{ scale: 1.1, rotate: -6 }}
      >
        <svg width="60" height="85" viewBox="0 0 60 85" fill="none" stroke="#dedad4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 28 L40 28 L50 40 L50 78 L18 78 L12 28 Z" />
          <path d="M12 28 L22 14 L50 14 L40 28" />
          <path d="M50 14 L58 28 L50 40" />
          <path d="M30 14 L36 3 L44 6" />
          <circle cx="32" cy="54" r="8" />
        </svg>
      </motion.div>

      {/* Ramen Bowl */}
      <motion.div
        drag
        dragConstraints={containerRef}
        className="absolute top-28 right-8 md:right-28 z-20 cursor-grab opacity-85 hidden sm:block"
        whileHover={{ scale: 1.1, rotate: 6 }}
      >
        <svg width="78" height="55" viewBox="0 0 78 55" fill="none" stroke="#dedad4" strokeWidth="2.2" strokeLinecap="round">
          <path d="M10 24 C10 46 68 46 68 24 Z" />
          <line x1="8" y1="24" x2="70" y2="24" />
          <path d="M18 20 Q39 6 60 20" />
          <line x1="58" y1="12" x2="76" y2="4" />
        </svg>
      </motion.div>

      {/* Dinosaur / Kaiju Doodle */}
      <motion.div
        drag
        dragConstraints={containerRef}
        className="absolute bottom-24 right-8 md:right-28 z-20 cursor-grab opacity-85 hidden sm:block"
        whileHover={{ scale: 1.1, rotate: 4 }}
      >
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" stroke="#dedad4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 50 Q10 25 35 25 L45 25 Q58 25 60 38 L55 42 L60 46 L50 50 Z" />
          <circle cx="45" cy="32" r="2.5" fill="#dedad4" />
          <path d="M30 25 L34 18 L38 25 L42 18 L46 25" />
          <path d="M10 50 Q15 65 35 65" />
        </svg>
      </motion.div>

      {/* 5. THE MAIN SKETCHBOOK CONTAINER */}
      <div className="relative z-20 w-[94vw] max-w-5xl bg-[#cd4c38] rounded-[2.8rem] p-3 md:p-5 shadow-[0_28px_70px_rgba(0,0,0,0.95)] border-2 border-[#b03b29]">
        
        {/* Silk Ribbon Bookmarks */}
        <div className="absolute -bottom-8 left-14 w-7 h-16 bg-[#b53424] rounded-b-md shadow-lg transform -rotate-12 -z-10 border border-[#8f2010]" />
        <div className="absolute -bottom-10 left-10 w-5 h-16 bg-[#d95643] rounded-b-md shadow-md transform rotate-6 -z-10 border border-[#9b2a1a]" />
        <div className="absolute -right-4 bottom-14 w-12 h-6 bg-[#b53424] rounded-r-md shadow-md transform rotate-12 -z-10" />

        {/* Foliage Doodle bottom left corner */}
        <div className="absolute -bottom-3 -left-2 z-30 pointer-events-none">
          <svg width="65" height="75" viewBox="0 0 65 75" fill="none" stroke="#c83a2a" strokeWidth="2.5">
            <path d="M15 65 Q30 30 50 15" />
            <circle cx="50" cy="15" r="7" fill="#fbf3e8" />
            <circle cx="38" cy="28" r="6" fill="#fbf3e8" />
            <circle cx="28" cy="45" r="5" fill="#fbf3e8" />
          </svg>
        </div>

        {/* INNER GRAPH PAPER PAGE */}
        <div
          className="relative w-full min-h-[560px] bg-[#fdf4e9] rounded-[2.2rem] p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between border-2 border-[#eeddc9] overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(160, 195, 215, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(160, 195, 215, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        >
          {/* LEFT SIDE: Typography */}
          <div className="flex-1 flex flex-col justify-between h-full z-10 w-full max-w-lg">
            <div>
              {/* Jackie-Style Hand-Drawn Name */}
              <div className="font-['Caveat',cursive] text-5xl md:text-6xl text-[#c83a2a] tracking-tight font-bold flex items-center gap-1 leading-none">
                <span>Simran</span>
                <span className="text-3xl font-mono text-[#c83a2a] rotate-12">::</span>
              </div>

              {/* Product Designer Subhead */}
              <p className="font-['Playfair_Display',serif] text-xl md:text-2xl text-[#c83a2a] mt-2 font-normal">
                Product Designer
              </p>

              {/* "Software should feel [rotating word]" */}
              <div className="mt-8 md:mt-12 space-y-1">
                <h1 className="text-4xl md:text-6xl font-['Playfair_Display',serif] text-[#c83a2a] tracking-tight font-normal leading-tight">
                  Software should
                </h1>
                <div className="flex items-center gap-3 text-4xl md:text-6xl font-['Playfair_Display',serif] text-[#c83a2a] tracking-tight leading-tight">
                  <span>feel</span>
                  <div className="relative inline-block h-[1.3em] overflow-hidden min-w-[200px]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={rotatingWords[wordIndex]}
                        initial={{ y: 35, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -35, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 font-['Caveat',cursive] text-5xl md:text-7xl font-bold text-[#c83a2a] lowercase tracking-wide"
                      >
                        {rotatingWords[wordIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Timezone / Location footer */}
            <div className="mt-12 md:mt-16">
              <span className="font-['Playfair_Display',serif] text-sm md:text-base text-[#c83a2a]/90 font-medium">
                Bengaluru • GMT +5:30
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: Hand-Drawn Editorial Sketch */}
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
              {/* Window Outer Container */}
              <rect x="90" y="60" width="260" height="310" rx="10" />
              <line x1="90" y1="95" x2="350" y2="95" />
              <rect x="98" y="73" width="10" height="10" />
              <rect x="114" y="73" width="10" height="10" />
              <text x="185" y="82" fill="#c83a2a" stroke="none" fontSize="11" fontFamily="'Space Mono', monospace" fontWeight="bold">
                UNTITLED
              </text>
              <rect x="322" y="73" width="10" height="10" />
              <line x1="322" y1="73" x2="332" y2="83" />

              {/* URL / Action bar */}
              <rect x="135" y="125" width="170" height="26" rx="13" />
              <path d="M152 138 Q165 132 178 138" />
              <path d="M285 134 L292 138 L285 142" />
              <path d="M140 180 Q160 170 180 180 T220 180" />

              {/* Character inside screen */}
              <circle cx="280" cy="235" r="22" />
              <circle cx="273" cy="230" r="2.5" fill="#c83a2a" />
              <circle cx="287" cy="230" r="2.5" fill="#c83a2a" />
              <path d="M275 242 Q280 248 285 242" />

              {/* Character holding tablet/board */}
              <path d="M260 258 L260 330 L300 330 L300 258" />
              <rect x="200" y="210" width="60" height="85" rx="8" />

              {/* Desk below character */}
              <line x1="190" y1="330" x2="310" y2="330" />
              <rect x="198" y="330" width="60" height="35" />

              {/* Sheep/Creature on right */}
              <path d="M350 220 Q375 220 380 235 L370 245 L380 255 Q360 270 350 260" />
              <path d="M355 260 L360 360" />
              <circle cx="365" cy="235" r="2" fill="#c83a2a" />
              <path d="M358 248 L348 252" />

              {/* Lush Foliage & Bush (foreground) */}
              <path
                d="M40 380 C30 310 90 280 110 380 C130 290 210 300 230 380 C260 310 340 320 360 380 C390 310 440 330 430 380"
                fill="#fdf4e9"
              />
              <path d="M60 380 C80 340 120 340 140 380" />
              <path d="M280 380 C300 340 340 340 360 380" />

              {/* Little Birds on Top of Window */}
              <circle cx="110" cy="50" r="8" />
              <path d="M102 50 L96 52" />
              <circle cx="140" cy="50" r="8" />
              <path d="M148 50 L154 52" />
              <circle cx="330" cy="50" r="8" />
              <path d="M338 50 L344 52" />

              {/* Climbing Vine on Right */}
              <path d="M355 120 Q370 170 355 220 Q370 270 355 320" />
              <path d="M360 140 Q375 135 365 150" />
              <path d="M355 180 Q340 175 350 190" />
              <path d="M362 230 Q377 225 367 240" />
            </svg>
          </div>

        </div>
      </div>
    </div>
  );
};
