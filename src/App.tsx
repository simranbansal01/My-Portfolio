import { useIsMobileLayout, usePrefersReducedMotion } from "./lib/hooks";
import { DesktopSite } from "./desktop/DesktopSite";
import { MobileSite } from "./mobile/MobileSite";

export default function App() {
  const isMobile = useIsMobileLayout();
  const reduced = usePrefersReducedMotion();

  return isMobile ? <MobileSite reduced={reduced} /> : <DesktopSite reduced={reduced} />;
}
