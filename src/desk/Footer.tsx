import { Doodle } from "../art/Doodles";
import { identity, routeLine } from "../data/portfolio";

/**
 * The sign-off.
 *
 * A chalk machine on the desk, the route line under it, and the signature
 * last — the way a paper signs off.
 */
export function Footer() {
  return (
    <footer className="relative z-10 px-4 pt-4 pb-20 text-center lg:px-24">
      <div className="flex justify-center">
        <Doodle id="computer" size={150} className="chalk" />
      </div>

      <p className="hand mt-3 text-[24px] text-paper/70">{routeLine}</p>

      <p className="hand mt-8 text-[46px] leading-none text-pen">
        {identity.signature}
      </p>
    </footer>
  );
}
