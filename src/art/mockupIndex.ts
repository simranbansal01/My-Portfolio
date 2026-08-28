import {
  CornerShelfMock,
  FastLaneMock,
  GoldenHourMock,
  PaarthMock,
} from "./Mockups";

/**
 * Mockup by story number, so the gallery stays data-driven and the story
 * order lives in one place — `portfolio.ts` — rather than two.
 */
export const MOCKUP_BY_NO: Record<string, () => React.ReactElement> = {
  "01": CornerShelfMock,
  "02": FastLaneMock,
  "03": PaarthMock,
  "04": GoldenHourMock,
};
