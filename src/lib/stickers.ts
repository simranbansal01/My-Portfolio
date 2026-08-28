import arrow from "../assets/stickers/arrow.png";
import chart from "../assets/stickers/chart.png";
import coin from "../assets/stickers/coin.png";
import ledger from "../assets/stickers/ledger.png";
import note from "../assets/stickers/note.png";
import spark from "../assets/stickers/spark.png";
import stamp from "../assets/stickers/stamp.png";

export type Sticker = {
  src: string;
  alt: string;
  /** Parallax multiplier — how far the sticker drifts per pixel of cursor travel. */
  depth: number;
  /** Position inside the hero, as CSS values. */
  style: { top?: string; left?: string; right?: string; bottom?: string; width: string };
  rotate: number;
};

/** Seven cutouts, each on its own parallax multiplier between 0.02 and 0.08. */
export const stickers: Sticker[] = [
  { src: ledger, alt: "Cut-out of a ruled ledger slip", depth: 0.02, rotate: -9, style: { top: "12%", left: "6%", width: "150px" } },
  { src: coin, alt: "Cut-out of a coin", depth: 0.08, rotate: 12, style: { top: "19%", right: "16%", width: "118px" } },
  { src: chart, alt: "Cut-out of a bar chart card", depth: 0.05, rotate: 7, style: { bottom: "16%", left: "10%", width: "168px" } },
  { src: stamp, alt: "Cut-out of an approval stamp", depth: 0.065, rotate: -14, style: { top: "8%", right: "24%", width: "126px" } },
  { src: note, alt: "Cut-out of a sticky note", depth: 0.035, rotate: -5, style: { bottom: "11%", right: "19%", width: "142px" } },
  { src: spark, alt: "Cut-out of a paper flower", depth: 0.07, rotate: 18, style: { top: "46%", left: "2%", width: "104px" } },
  { src: arrow, alt: "Cut-out of an arrow", depth: 0.045, rotate: -3, style: { bottom: "34%", right: "26%", width: "132px" } },
];

export const stickerCollage = [ledger, coin, chart, stamp, note, spark, arrow];
