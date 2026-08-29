import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Thread } from "../art/Marks";
import { identity } from "../data/portfolio";

/**
 * The polaroid, hanging from the board on a dashed red thread.
 *
 * It can be pulled around and it swings back — the one thing on the page that
 * responds to being handled rather than to being scrolled past. The swing is
 * a spring, so it overshoots and settles the way something on a string does.
 */
export function Polaroid({
  reduced,
  /**
   * On the desk the polaroid hangs off the bottom edge of the pinned mat, so
   * it is pulled up into it. The phone edition has no pin to hang from, and
   * the same pull would drop it on top of the last card.
   */
  hangsFromMat = false,
}: {
  reduced: boolean;
  hangsFromMat?: boolean;
}) {
  const card = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = card.current;
    if (!el || reduced) return;

    let startX = 0;
    let startY = 0;
    let pointer = -1;

    const onDown = (e: PointerEvent) => {
      pointer = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      el.setPointerCapture(pointer);
      setDragging(true);
      gsap.killTweensOf(el);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== pointer) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      gsap.set(el, {
        x: dx,
        // It hangs, so it resists being pushed up more than pulled down.
        y: dy > 0 ? dy * 0.6 : dy * 0.25,
        rotate: gsap.utils.clamp(-16, 16, dx * 0.07),
      });
    };

    const release = (e: PointerEvent) => {
      if (e.pointerId !== pointer) return;
      pointer = -1;
      setDragging(false);
      gsap.to(el, {
        x: 0,
        y: 0,
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
  }, [reduced]);

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
        <div className="text-pen">
          <Thread width={190} height={78} />
        </div>

        <div
          ref={card}
          className={[
            "-mt-3 w-[210px] bg-paper p-3 pb-6 shadow-[0_24px_50px_-20px_rgba(0,0,0,.85)] select-none",
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

        {!reduced && (
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
