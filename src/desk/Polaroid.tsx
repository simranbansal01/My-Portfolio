import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Thread } from "../art/Marks";
import { identity } from "../data/portfolio";

/**
 * The polaroid, hanging from the board on a dashed red thread.
 *
 * On the desk it starts tucked up out of sight behind the edge of the section
 * above — only the thread and a sliver of the white frame show. Pull it down
 * and the photo comes out; pull it far enough and it stays out. Let go short
 * of that and it springs back into hiding. It is the one thing on the page
 * that answers to being handled rather than scrolled past, and the swing is a
 * spring, so it overshoots and settles the way something on a string does.
 *
 * The phone edition has no section to hang under, and reduced motion has no
 * pull, so both just show the photo.
 */

/** Height of the slot the card slides in and out of. */
const WINDOW_H = 380;
/** Resting offset while hidden — the photo and name sit above the slot's top
 *  edge, only the white lip of the frame peeks out. */
const HIDDEN_Y = -315;
const REVEAL_Y = 0;
/** Pull the card this far below its hidden rest and let go, and it stays out. */
const LATCH_PX = 120;

export function Polaroid({
  reduced,
  /**
   * On the desk the polaroid hangs off the bottom edge of the pinned mat, so
   * it is tucked up under it. The phone edition has no pin to hang from.
   */
  hangsFromMat = false,
}: {
  reduced: boolean;
  hangsFromMat?: boolean;
}) {
  const card = useRef<HTMLDivElement>(null);
  const revealed = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [hintGone, setHintGone] = useState(false);

  // The hide-and-pull only applies on the desk, with motion allowed.
  const hides = hangsFromMat && !reduced;

  useEffect(() => {
    const el = card.current;
    if (!el || reduced) return;

    gsap.set(el, { y: hides ? HIDDEN_Y : REVEAL_Y });

    let startX = 0;
    let startY = 0;
    let base = 0;
    let pointer = -1;

    const onDown = (e: PointerEvent) => {
      pointer = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      base = (gsap.getProperty(el, "y") as number) || 0;
      try {
        el.setPointerCapture(pointer);
      } catch {
        // No live pointer with this id (can happen mid-gesture); the move and
        // release listeners still track it by id, so carry on.
      }
      setDragging(true);
      gsap.killTweensOf(el);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== pointer) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      // Downward pull is nearly free; pushing it back up is resisted. Clamp so
      // it can't be flung off the top or dragged unreasonably far down.
      const raw = base + (dy > 0 ? dy * 0.9 : dy * 0.3);
      const y = gsap.utils.clamp(HIDDEN_Y - 24, REVEAL_Y + 240, raw);
      gsap.set(el, { x: dx, y, rotate: gsap.utils.clamp(-16, 16, dx * 0.07) });
    };

    const release = (e: PointerEvent) => {
      if (e.pointerId !== pointer) return;
      pointer = -1;
      setDragging(false);

      const y = (gsap.getProperty(el, "y") as number) || 0;
      if (!hides || revealed.current || y - HIDDEN_Y > LATCH_PX) {
        revealed.current = true;
        setHintGone(true);
      }

      gsap.to(el, {
        x: 0,
        y: revealed.current ? REVEAL_Y : HIDDEN_Y,
        rotate: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.42)",
      });
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", release);
    el.addEventListener("pointercancel", release);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", release);
      el.removeEventListener("pointercancel", release);
      gsap.killTweensOf(el);
    };
  }, [reduced, hides]);

  const cardEl = (
    <div
      ref={card}
      className={[
        "mx-auto -mt-3 w-[210px] bg-paper p-3 pb-6 shadow-[0_24px_50px_-20px_rgba(0,0,0,.85)] select-none",
        reduced ? "" : "grabbable touch-none",
      ].join(" ")}
      style={{ transformOrigin: "50% -30%" }}
    >
      <div className="bg-board p-2">
        <img
          src="/simran.jpg"
          alt="Simran Bansal"
          draggable={false}
          className="block aspect-square w-full object-cover"
        />
      </div>
      <p className="hand mt-3 text-center text-[30px] leading-none text-pen">
        {identity.signature}
      </p>
    </div>
  );

  return (
    <div
      className={[
        "relative z-20 flex justify-center pb-2",
        // The thread starts where the mat ends, so the pull has to land on the
        // plane's bottom edge. That edge sits a fixed ~217px below the pinned
        // section's top — the plane's own travel is in pixels — while the
        // section is a full viewport tall. A pull in vh therefore only lines up
        // at one window height and drifts further off as the window grows; the
        // calc holds it at every height.
        hangsFromMat ? "mt-[calc(217px-100vh)]" : "mt-4",
      ].join(" ")}
    >
      <div className="relative flex flex-col items-center">
        {/* The edge it hangs under — a faint lip with a shadow that falls onto
            what is below it, so the card reads as tucked behind the section
            above rather than clipped in empty space. */}
        {hides && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-1/2 z-20 h-px w-[380px] max-w-[88vw] -translate-x-1/2 bg-paper/15 shadow-[0_18px_30px_-8px_rgba(0,0,0,.92)]"
          />
        )}

        {hides ? (
          <div
            className="relative w-[210px] overflow-hidden"
            style={{ height: WINDOW_H }}
          >
            <div className="relative z-10 flex justify-center text-pen">
              <Thread width={190} height={78} />
            </div>
            {cardEl}
          </div>
        ) : (
          <>
            <div className="text-pen">
              <Thread width={190} height={78} />
            </div>
            {cardEl}
          </>
        )}

        {!reduced && !hintGone && (
          <p
            className="mono mt-4 text-paper/40 transition-opacity duration-300"
            style={{ opacity: dragging ? 0 : 1 }}
          >
            Go on, pull it
          </p>
        )}
      </div>
    </div>
  );
}
