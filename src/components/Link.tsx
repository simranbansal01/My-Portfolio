import type { AnchorHTMLAttributes } from "react";
import { navigate } from "../lib/router";

/**
 * A real anchor that happens to route.
 *
 * It stays an `<a href>` so middle-click, cmd-click and "copy link address"
 * all behave, and only plain left clicks are intercepted. Anything that opens
 * a new context is left to the browser.
 */
export function Link({
  to,
  children,
  ...rest
}: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={to}
      onClick={(e) => {
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey
        ) {
          return;
        }
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
