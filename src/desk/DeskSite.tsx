import { Filters } from "../art/Filters";
import { useRefreshOnFonts } from "../lib/scrub";
import { useSmoothScroll } from "../lib/smoothScroll";
import { Beliefs } from "./Beliefs";
import { CaseFiles } from "./CaseFiles";
import { Footer } from "./Footer";
import { Ledger } from "./Ledger";
import { LookingFor } from "./LookingFor";
import { Annotations, MarginDoodles } from "./Margins";
import { Nav } from "./Nav";
import { Notebook } from "./Notebook";
import { Polaroid } from "./Polaroid";
import { ProofMarquee } from "./ProofMarquee";
import { Rails } from "./Rails";
import { WorkGallery } from "./WorkGallery";
import { WorkMat } from "./WorkMat";

/**
 * The desk, top to bottom.
 *
 * The order is the argument: an object you open, three notes that fall out of
 * it, the work laid out on a mat, the career reconciled line by line, the
 * numbers that back it, and then the ask.
 */
export function DeskSite({ reduced }: { reduced: boolean }) {
  useSmoothScroll(!reduced);
  useRefreshOnFonts();

  return (
    <div className="board grain relative min-h-screen overflow-clip">
      <Filters />

      <MarginDoodles reduced={reduced} />
      <Annotations reduced={reduced} />
      <Rails reduced={reduced} />

      <div className="relative z-20">
        <Nav reduced={reduced} />

        <main>
          <Notebook reduced={reduced} />
          <Beliefs reduced={reduced} />
          <WorkGallery reduced={reduced} />
          <CaseFiles />
          <WorkMat reduced={reduced} />
          <Polaroid reduced={reduced} hangsFromMat />
          <Ledger reduced={reduced} />
          <ProofMarquee reduced={reduced} />
          <LookingFor />
        </main>

        <Footer />
      </div>
    </div>
  );
}
