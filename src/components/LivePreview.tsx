import { useEffect, useRef, useState } from "react";

/**
 * A live preview of a deployed product.
 *
 * The real site, framed in browser chrome and scaled to fit the column. It is
 * rendered at a full desktop width and then transformed down, so what you see
 * is the product's actual desktop layout rather than its narrow breakpoint
 * squeezed into a card.
 *
 * Two deliberate constraints:
 *
 * - It loads lazily. A project page should not pull a third-party site before
 *   the visitor has scrolled anywhere near it.
 * - It is inert until clicked. A scaled iframe otherwise swallows the wheel
 *   and traps the page scroll, which is a genuinely unpleasant way to lose
 *   control of a page you were only reading.
 *
 * The sandbox keeps `allow-top-navigation` off, so an embedded page cannot
 * navigate the portfolio out from under the visitor. Everything a normal app
 * needs — scripts, its own origin, forms, opening links in a new tab — stays.
 */

const SANDBOX = [
  "allow-scripts",
  "allow-same-origin",
  "allow-forms",
  "allow-popups",
  "allow-popups-to-escape-sandbox",
].join(" ");

export function LivePreview({
  url,
  title,
  designWidth = 1280,
  designHeight = 800,
}: {
  url: string;
  title: string;
  /** The viewport the product is rendered at before being scaled down. */
  designWidth?: number;
  designHeight?: number;
}) {
  const shell = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [live, setLive] = useState(false);

  // The scale has to come from the measured column: CSS cannot divide a
  // length by a length to produce the unitless number `scale()` needs.
  useEffect(() => {
    const el = shell.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / designWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);

  const host = safeHost(url);

  return (
    <div className="rounded-[14px] bg-white p-1.5 shadow-[0_30px_60px_-24px_rgba(0,0,0,.85)]">
      {/* browser chrome */}
      <div className="flex items-center gap-2 px-2.5 py-2">
        <span className="flex gap-1">
          <i className="block h-2 w-2 rounded-full bg-black/12" />
          <i className="block h-2 w-2 rounded-full bg-black/12" />
          <i className="block h-2 w-2 rounded-full bg-black/12" />
        </span>
        <span className="mono flex-1 truncate rounded-full bg-black/5 px-3 py-1 text-[9px] text-black/45">
          {host}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="mono shrink-0 rounded-full border border-black/10 px-2.5 py-1 text-[9px] text-black/50 transition-colors duration-200 hover:border-pen hover:text-pen"
        >
          Open ↗
        </a>
      </div>

      <div
        ref={shell}
        className="relative overflow-hidden rounded-[9px] bg-[#f2f1ee]"
        style={{ height: scale ? designHeight * scale : undefined }}
      >
        {/* Sits behind the frame, so it is what you see while the product is
            still loading — and what you are left with if it never does. There
            is no reliable cross-origin way to detect a refused frame, so the
            fallback is simply never covered up in that case. */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
          <p className="mono text-black/40">Loading the live product</p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="mono border-b border-pen pb-0.5 text-pen"
          >
            open it in a tab ↗
          </a>
        </div>

        {scale > 0 && (
          <iframe
            src={url}
            title={`${title} — live preview`}
            loading="lazy"
            sandbox={SANDBOX}
            referrerPolicy="no-referrer"
            className="absolute top-0 left-0 border-0"
            style={{
              width: designWidth,
              height: designHeight,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              // Inert until asked for, so it cannot capture the page scroll.
              pointerEvents: live ? "auto" : "none",
            }}
          />
        )}

        {!live && (
          <button
            type="button"
            onClick={() => setLive(true)}
            className="group absolute inset-0 flex cursor-pointer items-end justify-center bg-transparent pb-5 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-pen"
          >
            <span className="mono rounded-full bg-ink/85 px-4 py-2 text-paper opacity-80 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              Click to use it
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

/** The host, for the address bar. Falls back to the raw string if unparsable. */
function safeHost(url: string): string {
  try {
    const u = new URL(url);
    return u.host + (u.pathname === "/" ? "" : u.pathname);
  } catch {
    return url;
  }
}
