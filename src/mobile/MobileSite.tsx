import { BeliefBelt } from "./BeliefBelt";
import { MobileClosing } from "./MobileClosing";
import { MobileHero } from "./MobileHero";
import { MobileNav } from "./MobileNav";
import { StackSheet } from "./StackSheet";
import { WorkList } from "./WorkList";

type Props = { reduced: boolean };

/**
 * A separate tree from the desktop site — different navigation, different
 * section mechanics, different density. Nothing here is the desktop layout
 * reflowed.
 */
export function MobileSite({ reduced }: Props) {
  return (
    <div className="grain relative bg-paper text-ink">
      <main>
        <MobileHero reduced={reduced} />
        <BeliefBelt />
        <StackSheet reduced={reduced} />
        <WorkList reduced={reduced} />
        <MobileClosing reduced={reduced} />
      </main>
      <MobileNav />
    </div>
  );
}
