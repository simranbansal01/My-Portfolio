import { DeskSite } from "./desk/DeskSite";
import { identity, storyBySlug } from "./data/portfolio";
import { useIsMobileLayout, usePrefersReducedMotion } from "./lib/hooks";
import { useDocumentTitle, usePath, useRouteScroll } from "./lib/router";
import { MobileSite } from "./mobile/MobileSite";
import { NotFoundPage, ProjectPage } from "./pages/ProjectPage";

/**
 * Five pages: the desk, and one per project.
 *
 * The desk is two component trees — the phone layout is designed rather than
 * reflowed — while a project page is one responsive sheet, because a page of
 * reading and one control does not need two.
 */
export default function App() {
  const path = usePath();
  useRouteScroll(path);

  const isMobile = useIsMobileLayout();
  const reduced = usePrefersReducedMotion();

  const project = path.startsWith("/work/")
    ? storyBySlug(path.slice("/work/".length))
    : undefined;

  // The desk owns its own title; a project page sets its own.
  useDocumentTitle(
    path === "/" ? `${identity.name} — ${identity.roleStrip}` : null,
  );

  if (path === "/") {
    return isMobile ? (
      <MobileSite reduced={reduced} />
    ) : (
      <DeskSite reduced={reduced} />
    );
  }

  return project ? <ProjectPage story={project} /> : <NotFoundPage />;
}
