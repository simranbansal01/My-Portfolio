import { DeskSite } from "./desk/DeskSite";
import { useIsMobileLayout, usePrefersReducedMotion } from "./lib/hooks";
import { MobileSite } from "./mobile/MobileSite";

/**
 * Two layouts, two component trees. The phone edition is designed rather than
 * reflowed, so it is a different tree — not the desk one with things hidden.
 */
export default function App() {
  const isMobile = useIsMobileLayout();
  const reduced = usePrefersReducedMotion();

  return isMobile ? (
    <MobileSite reduced={reduced} />
  ) : (
    <DeskSite reduced={reduced} />
  );
}
