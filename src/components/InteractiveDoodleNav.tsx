import React, { useState } from "react";
import { motion } from "framer-motion";

interface NavItemProps {
  href: string;
  label: string;
}

export const DoodleNavItem: React.FC<NavItemProps> = ({ href, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative text-stone-300 hover:text-white transition-colors py-1 px-2 font-caveat text-2xl"
    >
      <span>{label}</span>
      {/* Hand-drawn scribble underline */}
      <svg
        className="absolute left-0 -bottom-2 w-full h-4 overflow-visible pointer-events-none"
        viewBox="0 0 100 20"
        fill="none"
      >
        <motion.path
          d="M 2,12 Q 25,4 50,14 T 98,10 Q 75,18 45,12 T 5,16"
          stroke="#d95643"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        />
      </svg>
    </a>
  );
};
