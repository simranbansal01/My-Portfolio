import { Doodle } from "../art/Doodles";
import { colophon, identity, routeLine } from "../data/portfolio";

/**
 * The colophon.
 *
 * A chalk machine on the desk, the route line under it, the imprint, and the
 * signature last — the way a paper signs off.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 px-4 pt-4 pb-20 text-center lg:px-24">
      <div className="flex justify-center">
        <Doodle id="computer" size={150} className="chalk" />
      </div>

      <p className="hand mt-3 text-[24px] text-paper/70">{routeLine}</p>

      <ul className="mono mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-paper/45">
        {colophon.map((line) => (
          <li key={line}>{line}</li>
        ))}
        <li>© {year}</li>
      </ul>

      <p className="hand mt-8 text-[46px] leading-none text-pen">
        {identity.signature}
      </p>
    </footer>
  );
}
