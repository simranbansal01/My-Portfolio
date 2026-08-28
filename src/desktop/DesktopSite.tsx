import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Beliefs } from "./Beliefs";
import { Contact } from "./Contact";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { Numbers } from "./Numbers";
import { ProgressRail } from "./ProgressRail";
import { Studies } from "./Studies";
import { Toolkit } from "./Toolkit";
import { Work } from "./Work";
import { useSmoothScroll } from "../lib/smoothScroll";

type Props = { reduced: boolean };

export function DesktopSite({ reduced }: Props) {
  useSmoothScroll(!reduced);

  useEffect(() => {
    // Late-loading webfonts and images change section heights; re-measure once
    // everything has settled so the pinned section ends where it should.
    const refresh = () => ScrollTrigger.refresh();
    const id = window.setTimeout(refresh, 400);
    window.addEventListener("load", refresh);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <div className="grain relative bg-paper text-ink">
      <ProgressRail />
      <main>
        <Hero reduced={reduced} />
        <Beliefs reduced={reduced} />
        <Marquee reduced={reduced} />
        <Work reduced={reduced} />
        <Numbers reduced={reduced} />
        <Toolkit reduced={reduced} />
        <Studies reduced={reduced} />
      </main>
      <Contact reduced={reduced} />
    </div>
  );
}
