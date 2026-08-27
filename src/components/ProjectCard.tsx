import React, { useRef } from "react";
import { motion } from "framer-motion";

interface ProjectProps {
  project: {
    id: string;
    title: string;
    category: string;
    description: string;
    frontImage: string;
    backDetails: string;
    tags: string[];
  };
  index: number;
}

export const ProjectCard: React.FC<ProjectProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className="relative w-full bg-[#fdf4e9] rounded-[2.2rem] border-2 border-[#eeddc9] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 md:p-10 mb-16 overflow-hidden"
    >
      {/* Background Graph Grid */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(160, 195, 215, 0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(160, 195, 215, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Floating Draggable Chip / Stamp */}
      <motion.div
        drag
        dragConstraints={cardRef}
        dragElastic={0.2}
        whileHover={{ scale: 1.1, rotate: isEven ? 6 : -6 }}
        className="absolute top-4 right-6 z-20 bg-[#cd4c38] text-white px-3 py-1 rounded-full font-['Space_Mono',monospace] text-[11px] font-bold shadow-md cursor-grab"
      >
        ★ Case 0{project.id}
      </motion.div>

      {/* Main Content Layout */}
      <div className={`relative z-10 flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
        
        {/* Visual Showcase (Polaroid Frame) */}
        <div className="flex-1 w-full">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-3 pb-6 rounded-2xl shadow-[6px_8px_20px_rgba(0,0,0,0.12)] border border-stone-200 rotate-[-1deg]"
          >
            <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={project.frontImage}
                alt={project.title}
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="flex justify-between items-center mt-3 px-2">
              <span className="font-['Space_Mono',monospace] text-[11px] text-stone-400 uppercase">
                {project.category}
              </span>
              <span className="font-['Caveat',cursive] text-lg text-[#c83a2a] font-bold">
                interactive preview ↗
              </span>
            </div>
          </motion.div>
        </div>

        {/* Narrative & Specifications Column */}
        <div className="flex-1 w-full space-y-4">
          <div className="inline-block px-3 py-0.5 bg-[#f5e4d2] border border-[#d6beaa] rounded-md font-['Space_Mono',monospace] text-xs text-[#9c2d20] font-bold">
            {project.category}
          </div>

          <h3 className="font-['Playfair_Display',serif] text-3xl md:text-4xl text-[#1e1b18] font-normal leading-tight">
            {project.title}
          </h3>

          <p className="font-['Playfair_Display',serif] text-base text-stone-700 leading-relaxed">
            {project.description}
          </p>

          <div className="bg-[#f2e2cf]/60 border-l-2 border-[#cd4c38] p-3.5 rounded-r-lg">
            <p className="font-['Caveat',cursive] text-2xl text-[#8f281b] leading-snug">
              "{project.backDetails}"
            </p>
          </div>

          {/* Tech Spec Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-['Space_Mono',monospace] text-[11px] bg-white/90 border border-stone-300 text-stone-700 px-3 py-1 rounded-md shadow-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
