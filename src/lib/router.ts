import { useEffect, useState } from "react";
import { scrollToY } from "./smoothScroll";

/**
 * A very small router.
 *
 * The site has five pages — the desk and one per project — with no nested
 * layouts, no loaders and no params beyond a slug, so it does not need a
 * routing library. What it does need is for the URLs to be real: shareable,
 * bookmarkable, and correct under the back button. `netlify.toml` already
 * serves index.html for any path, so a deep link into /work/... loads.
 */

const NAVIGATE = "app:navigate";

/**
 * The browser restores its own remembered position on popstate, which fights
 * whatever this module tries to do and lands somewhere neither chose. Since
 * the router restores position itself — and has to, because the desk's pinned
 * sections change the document height as they build — that automatic
 * behaviour is turned off.
 */
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

/** Where the page was left, per path, so going back lands where you were. */
const scrollPositions = new Map<string, number>();

/** Set by whichever transition is in flight; consumed once by the scroller. */
let pendingScroll: number | null = null;

export function currentPath(): string {
  if (typeof window === "undefined") return "/";
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

export function navigate(to: string, { replace = false } = {}) {
  const from = currentPath();
  if (to === from) return;

  scrollPositions.set(from, window.scrollY);
  // A new page starts at the top; going back is handled by popstate below.
  pendingScroll = 0;

  if (replace) window.history.replaceState(null, "", to);
  else window.history.pushState(null, "", to);

  window.dispatchEvent(new Event(NAVIGATE));
}

/** The current path, re-read on both programmatic and browser navigation. */
export function usePath(): string {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const onPush = () => setPath(currentPath());
    const onPop = () => {
      // Returning to a page you have already scrolled through should not
      // dump you at the top of it.
      pendingScroll = scrollPositions.get(currentPath()) ?? 0;
      setPath(currentPath());
    };
    window.addEventListener(NAVIGATE, onPush);
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener(NAVIGATE, onPush);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  return path;
}

/**
 * Applies the scroll the transition asked for.
 *
 * Restoring a position on the desk is not a single call: its pinned sections
 * only get their real height once ScrollTrigger has built the pin spacers, so
 * a scroll issued on the first frame lands short against a document that is
 * still growing. This keeps asking until the page is tall enough to honour the
 * request, then stops — and gives up after a beat rather than fighting a page
 * that genuinely is shorter than where you were.
 */
export function useRouteScroll(path: string) {
  useEffect(() => {
    const target = pendingScroll;
    pendingScroll = null;
    if (target === null) return;

    if (target === 0) {
      scrollToY(0);
      return;
    }

    let frame = 0;
    const deadline = performance.now() + 900;
    const attempt = () => {
      scrollToY(target);
      const settled = Math.abs(window.scrollY - target) < 2;
      if (!settled && performance.now() < deadline) {
        frame = requestAnimationFrame(attempt);
      }
    };
    frame = requestAnimationFrame(attempt);
    return () => cancelAnimationFrame(frame);
  }, [path]);
}

/**
 * Keeps the tab honest about which page is open.
 *
 * `null` means "not mine to set" — a parent that does not own the title must
 * pass null rather than the current value, because parent effects run after
 * child effects and would otherwise stamp a stale title back over the one the
 * page just set.
 */
export function useDocumentTitle(title: string | null) {
  useEffect(() => {
    if (title !== null) document.title = title;
  }, [title]);
}
