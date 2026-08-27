import { JournalBook } from "./components/JournalBook";
import { WorkLedger } from "./components/WorkLedger";
import { portfolioData } from "./data/portfolio";

const stampIconsLeft = ["🏮", "🎴", "🌿", "🦉", "🌾", "💮", "🍵", "🍂", "🀄", "🏮", "🎴", "🌿", "🦉", "🌾"];
const stampIconsRight = ["🌿", "🦉", "🏺", "💻", "💮", "🍵", "🏮", "🎴", "🀄", "🌾", "💮", "🍵", "🏮", "🎴"];

export default function App() {
  return (
    <main className="min-h-screen bg-[#141414] text-[#fbf3e8] selection:bg-[#cd4c38] selection:text-white font-sans overflow-x-hidden flex flex-col items-center">
      
      {/* ================= FIXED LEFT STAMP GUTTER ================= */}
      <aside className="fixed left-3 top-0 bottom-0 w-12 py-4 hidden xl:flex flex-col justify-between z-50 pointer-events-none select-none">
        {stampIconsLeft.map((icon, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-md bg-[#b83828] border border-[#d95240] flex items-center justify-center text-white/90 text-sm shadow-md"
          >
            <span>{icon}</span>
          </div>
        ))}
      </aside>

      {/* ================= FIXED RIGHT STAMP GUTTER ================= */}
      <aside className="fixed right-3 top-0 bottom-0 w-12 py-4 hidden xl:flex flex-col justify-between z-50 pointer-events-none select-none">
        {stampIconsRight.map((icon, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-md bg-[#b83828] border border-[#d95240] flex items-center justify-center text-white/90 text-sm shadow-md"
          >
            <span>{icon}</span>
          </div>
        ))}
      </aside>

      {/* 1. Hero Cover & Beliefs Journal Spread */}
      <JournalBook />

      {/* 2. Works & Career Ledger Spreads */}
      <WorkLedger />

      {/* 3. Footer */}
      <footer id="connect" className="w-full bg-[#0d0d0d] border-t border-stone-800 py-20 px-6 text-center z-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-['Playfair_Display',serif] text-white">
            Let's build something defensible.
          </h2>
          <p className="font-['Caveat',cursive] text-2xl text-[#d95643] mt-3">
            Open for B2B finance architecture, revenue operations, and The Credix partnerships.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${portfolioData.contact.email}`}
              className="inline-block px-8 py-3 bg-[#cd4c38] text-white font-['Space_Mono',monospace] text-xs uppercase tracking-wider rounded-full shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform font-bold"
            >
              Email Simran ↗
            </a>
            <a
              href={portfolioData.contact.credixUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-8 py-3 bg-white text-stone-900 font-['Space_Mono',monospace] text-xs uppercase tracking-wider rounded-full shadow-[4px_4px_0px_0px_rgba(200,58,42,1)] hover:scale-105 transition-transform font-bold"
            >
              Explore The Credix ↗
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}
