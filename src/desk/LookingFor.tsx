import { useState } from "react";
import { CheckBox, Frame, Strike, Tick, Underline } from "../art/Marks";
import { NightDeskScene } from "../art/Scenes";
import { contact } from "../data/portfolio";

/**
 * The closing card.
 *
 * A list of what Simran is looking for, drawn as an unticked checklist. Ticking
 * a line strikes it through and brings a little more of the drawing in the
 * frame beside it into view — the page finishes itself once the visitor has
 * agreed with it.
 *
 * Nothing here is scroll-driven. It is the one interaction on the page that
 * belongs entirely to the visitor.
 */
export function LookingFor() {
  const [ticked, setTicked] = useState<boolean[]>(
    () => contact.looking.map(() => false),
  );

  const toggle = (i: number) =>
    setTicked((prev) => prev.map((v, k) => (k === i ? !v : v)));

  const agreed = ticked.filter(Boolean).length / contact.looking.length;

  return (
    <section
      id="connect"
      className="relative z-10 px-4 pt-10 pb-14 lg:px-24"
      aria-labelledby="connect-heading"
    >
      <div className="paper-plain mx-auto grid max-w-[940px] gap-10 rounded-[30px] px-8 py-12 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)] sm:px-12 md:grid-cols-[1.05fr_1fr] md:items-center">
        {/* left: the checklist */}
        <div>
          <h2
            id="connect-heading"
            className="font-display text-[clamp(24px,3vw,36px)] font-bold text-pen"
          >
            What I look for
          </h2>
          <div className="mt-1 text-pen">
            <Underline />
          </div>

          <ul className="mt-7">
            {contact.looking.map((item, i) => (
              <li
                key={item}
                className="border-b border-dashed border-pen/35 last:border-b-0"
              >
                <button
                  type="button"
                  aria-pressed={ticked[i]}
                  onClick={() => toggle(i)}
                  className="flex w-full cursor-pointer items-center gap-4 py-3.5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pen"
                >
                  <span className="relative block h-5 w-5 shrink-0 text-pen">
                    <CheckBox />
                    <span
                      className="absolute -top-1 -left-0.5 text-pen transition-[opacity,transform] duration-[380ms] ease-[cubic-bezier(.34,1.56,.64,1)]"
                      style={{
                        opacity: ticked[i] ? 1 : 0,
                        transform: ticked[i]
                          ? "scale(1) rotate(-8deg)"
                          : "scale(.4) rotate(-16deg)",
                      }}
                    >
                      <Tick />
                    </span>
                  </span>

                  <span className="hand relative text-[24px] text-pen">
                    {item}
                    <Strike progress={ticked[i] ? 1 : 0} />
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-7 max-w-[46ch] font-body text-[17px] text-ink-soft">
            {contact.body}
          </p>

          <CallToAction />

          <ul className="mono mt-8 flex flex-wrap gap-6">
            {contact.links.map((link) => (
              <li key={link.label}>
                <ContactLink label={link.label} href={link.href} />
              </li>
            ))}
          </ul>
        </div>

        {/* right: the framed drawing, filling in as the list is agreed with */}
        <div className="relative aspect-[4/3] w-full">
          <div className="absolute inset-0 text-pen">
            <Frame radius={14} />
          </div>
          <div
            className="absolute inset-[9%] flex items-center justify-center text-pen transition-opacity duration-[600ms] ease-out"
            style={{ opacity: 0.18 + agreed * 0.82 }}
          >
            <NightDeskScene className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The email button. Until an address is filled into the data it is a drawn
 * label rather than a link, so nothing on the page claims to go somewhere it
 * does not.
 */
function CallToAction() {
  const href = contact.links[0].href;
  const shell =
    "hand relative mt-7 inline-block px-7 py-2.5 text-[24px] text-pen";

  if (isPlaceholder(href)) {
    return (
      <span className={shell}>
        <span className="relative z-10">{contact.cta}</span>
        <Frame />
      </span>
    );
  }

  return (
    <a
      href={href}
      className={`${shell} transition-transform duration-300 hover:-translate-y-0.5`}
    >
      <span className="relative z-10">{contact.cta}</span>
      <Frame />
    </a>
  );
}

/** One contact line — a link when it has somewhere to go, else plain text. */
function ContactLink({ label, href }: { label: string; href: string }) {
  if (isPlaceholder(href)) {
    return (
      <span className="border-b border-dashed border-rule pb-0.5 text-ink-soft">
        {label}
      </span>
    );
  }
  return (
    <a
      href={href}
      className="border-b border-rule pb-0.5 text-ink transition-colors duration-250 hover:border-pen hover:text-pen"
    >
      {label}
    </a>
  );
}

/** `#` is the content master's stand-in for a destination not yet decided. */
function isPlaceholder(href: string) {
  return href === "#" || href === "";
}
