import asc606 from "../assets/badges/asc606.png";
import automation from "../assets/badges/automation.png";
import controls from "../assets/badges/controls.png";
import gaap from "../assets/badges/gaap.png";
import jde from "../assets/badges/jde.png";
import modeling from "../assets/badges/modeling.png";
import netsuite from "../assets/badges/netsuite.png";
import razorpay from "../assets/badges/razorpay.png";
import sox from "../assets/badges/sox.png";
import upi from "../assets/badges/upi.png";

export type BadgeItem = { src: string; label: string };

export const badges: BadgeItem[] = [
  { src: netsuite, label: "NetSuite" },
  { src: razorpay, label: "Razorpay" },
  { src: asc606, label: "ASC 606" },
  { src: sox, label: "SOX 302/404" },
  { src: jde, label: "JD Edwards" },
  { src: upi, label: "UPI Settlement" },
  { src: gaap, label: "US GAAP" },
  { src: automation, label: "Macro Automation" },
  { src: modeling, label: "Financial Modeling" },
  { src: controls, label: "ICFR Controls" },
];
