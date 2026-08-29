import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Thread } from "../art/Marks";
import { identity } from "../data/portfolio";

/**
 * The polaroid, hanging from the board on a dashed red thread.
 *
 * On the desk it rests tucked up inside a slot — thread and card together sit
 * above the slot's top edge, so only a lip of the white frame shows under the
 * ledge. Pull it down and the whole thing slides out; pull past a threshold
 * and it latches, photo revealed, prompt gone. Let go short of that and it
 * springs back into hiding. The swing is a spring, so it overshoots and
 * settles the way something on a string does.
 *
 * The phone edition has no slot to hang in and reduced motion has no pull, so
 * both just show the photo.
 */

/** The slot the polaroid tucks into and slides out of. */
const SLOT_H = 344;
/** Resting offset while hidden — thread and card sit above the slot, only the
 *  white frame's lip peeks out below the ledge. */
const HIDDEN_Y = -312;
const REVEAL_Y = 0;
/** Pull the rig this far past its hidden rest and let go, and it stays out. */
const LATCH_PX = 130;

export function Polaroid({
  reduced,
  /**
   * On the desk the polaroid hangs off the bottom edge of the pinned mat, so
   * it is tucked up into a slot under it. The phone edition has no pin.
   */
  hangsFromMat = false,
}: {
  reduced: boolean;
  hangsFromMat?: boolean;
}) {
  const slot = useRef<HTMLDivElement>(null);
  const rig = useRef<HTMLDivElement>(null);
  const revealed = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [hintGone, setHintGone] = useState(false);

  // The tuck-and-pull only applies on the desk, with motion allowed.
  const hides = hangsFromMat && !reduced;

  useEffect(() => {
    const target = slot.current;
    const el = rig.current;
    if (!target || !el || reduced) return;

    gsap.set(el, {
      y: hides ? HIDDEN_Y : REVEAL_Y,
      transformOrigin: "50% -8%",
    });

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
        target.setPointerCapture(pointer);
      } catch {
        // No live pointer with this id — the move/release listeners still
        // track it by id, so carry on.
      }
      setDragging(true);
      gsap.killTweensOf(el);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== pointer) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      // Pulling down is nearly free; pushing back up is resisted. Clamp so it
      // can't be flung off the top.
      const lo = hides ? HIDDEN_Y - 24 : -90;
      const raw = base + (dy > 0 ? dy * 0.9 : dy * 0.3);
      gsap.set(el, {
        x: dx,
        y: gsap.utils.clamp(lo, REVEAL_Y + 240, raw),
        rotate: gsap.utils.clamp(-16, 16, dx * 0.07),
      });
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

    target.addEventListener("pointerdown", onDown);
    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerup", release);
    target.addEventListener("pointercancel", release);

    return () => {
      target.removeEventListener("pointerdown", onDown);
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerup", release);
      target.removeEventListener("pointercancel", release);
      gsap.killTweensOf(el);
    };
  }, [reduced, hides]);

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
      <div
        ref={slot}
        className={[
          "relative flex flex-col items-center",
          hides ? "w-[240px] overflow-hidden" : "",
          reduced ? "" : "grabbable touch-none",
        ].join(" ")}
        // Transparent — it only clips. The board shows through it unchanged.
        style={hides ? { height: SLOT_H } : undefined}
      >
        {/* The soft shadow of the edge it is tucked behind — no hard line, just
            a darkening at the top so the clipped frame reads as "under
            something" rather than cut off. */}
        {hides && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-6 bg-gradient-to-b from-black/55 to-transparent"
          />
        )}

        {/* Thread and card move as one — the whole thing is pulled out. */}
        <div ref={rig} className="relative z-10 flex flex-col items-center">
          <div className="text-pen">
            <Thread width={190} height={78} />
          </div>
          <div className="mx-auto -mt-3 w-[210px] bg-paper p-3 pb-6 shadow-[0_24px_50px_-20px_rgba(0,0,0,.85)] select-none">
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
        </div>

        {!reduced && !hintGone && (
          <p
            className={[
              "mono text-paper/40 transition-opacity duration-300",
              hides ? "absolute inset-x-0 top-[38px] z-0 text-center" : "mt-4",
            ].join(" ")}
            style={{ opacity: dragging ? 0 : 1 }}
          >
            Go on, pull it
          </p>
        )}
      </div>
    </div>
  );
}
