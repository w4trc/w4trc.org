#!/usr/bin/env node
// Generates public/files/KARC-Quick-Reference.pdf
// Run: node scripts/generate-quick-reference.js

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// Page: 5.5" x 4.25" at 72pt/in
const W = 5.5 * 72;  // 396pt
const H = 4.25 * 72; // 306pt

// Brand colours
const NAVY     = "#0b1220";
const AMBER    = "#f59e0b";
const BLUE     = "#2b6cb0";
const WHITE    = "#ffffff";
const LIGHT    = "#f4f6fb";
const MUTED    = "#5a6a7a";
const RULE     = "#dde3ef";
const ROW_ALT  = "#eef2fa";
const ROW_PRI  = "#fffbeb";  // subtle amber tint for primary row

const doc = new PDFDocument({
  size: [W, H],
  margin: 0,
  info: {
    Title: "KARC Quick Reference Card",
    Author: "Kingsport Amateur Radio Club",
  },
});

const out = path.join(ROOT, "public", "files", "KARC-Quick-Reference.pdf");
doc.pipe(fs.createWriteStream(out));

// ─────────────────────────────────────────────
// HEADER  (60pt tall)
// ─────────────────────────────────────────────
const HEADER_H = 60;

doc.rect(0, 0, W, HEADER_H).fill(NAVY);
doc.rect(0, HEADER_H - 3, W, 3).fill(AMBER);

// Logo
const logoPath = path.join(ROOT, "public", "images", "KARC-LOGO-AlphaBG.png");
const LOGO = 46;
doc.image(logoPath, 10, (HEADER_H - 3 - LOGO) / 2, { width: LOGO, height: LOGO });

// Callsign + club name
doc.font("Helvetica-Bold").fontSize(26).fillColor(WHITE)
  .text("W4TRC", 64, 10, { lineBreak: false });
doc.font("Helvetica").fontSize(9).fillColor("rgba(255,255,255,0.80)")
  .text("Kingsport Amateur Radio Club", 65, 40, { lineBreak: false });

// Contact block (right-aligned)
doc.font("Helvetica-Bold").fontSize(8).fillColor(AMBER)
  .text("w4trc.org", 0, 12, { align: "right", width: W - 12, lineBreak: false });
doc.font("Helvetica").fontSize(7).fillColor("rgba(255,255,255,0.70)")
  .text("contact@w4trc.org", 0, 25, { align: "right", width: W - 12, lineBreak: false })
  .text("Kingsport, TN", 0, 37, { align: "right", width: W - 12, lineBreak: false });

// ─────────────────────────────────────────────
// BODY
// ─────────────────────────────────────────────
const BODY_Y   = HEADER_H + 1;
const BODY_H   = H - BODY_Y;
const RIGHT_W  = 154;
const LEFT_W   = W - RIGHT_W;      // 242pt
const PAD      = 11;
const TBL_W    = LEFT_W - PAD * 2; // 220pt

// Right column background + divider
doc.rect(LEFT_W, BODY_Y, RIGHT_W, BODY_H).fill(LIGHT);
doc.rect(LEFT_W, BODY_Y, 0.75, BODY_H).fill(RULE);

// ─────────────────────────────────────────────
// LEFT — Repeater table
// ─────────────────────────────────────────────
let ly = BODY_Y + 11;

// Section label
doc.font("Helvetica-Bold").fontSize(6).fillColor(BLUE)
  .text("CLUB REPEATERS  —  BAYS MOUNTAIN, KINGSPORT TN", PAD, ly, { width: TBL_W });
ly += 11;

// Columns total = TBL_W (220pt)
const COLS  = ["Frequency", "Offset", "Tone (PL)", "Mode"];
const COL_W = [68, 38, 44, 70];
const ROW_H = 22;

// Header row
doc.rect(PAD, ly, TBL_W, ROW_H).fill(NAVY);
let cx = PAD + 5;
doc.font("Helvetica-Bold").fontSize(6).fillColor(WHITE);
COLS.forEach((label, i) => {
  doc.text(label, cx, ly + 8, { width: COL_W[i] - 5, lineBreak: false });
  cx += COL_W[i];
});
ly += ROW_H;

// Data rows
const repeaters = [
  { freq: "146.970 MHz", offset: "-0.6 MHz", tone: "123.0 Hz", mode: "Analog / C4FM", primary: true  },
  { freq: "443.325 MHz", offset: "+5.0 MHz", tone: "123.0 Hz", mode: "Dual Mode (AMS)", primary: false },
  { freq: "443.175 MHz", offset: "+5.0 MHz", tone: "--",       mode: "C4FM / Wires-X", primary: false },
];

repeaters.forEach((r, idx) => {
  const bg = r.primary ? ROW_PRI : (idx % 2 === 1 ? WHITE : ROW_ALT);
  doc.rect(PAD, ly, TBL_W, ROW_H).fill(bg);

  // Amber left bar for primary row
  if (r.primary) {
    doc.rect(PAD, ly, 3, ROW_H).fill(AMBER);
  }

  cx = PAD + 5;
  [r.freq, r.offset, r.tone, r.mode].forEach((val, i) => {
    const isFreq = i === 0;
    doc.font(isFreq ? "Helvetica-Bold" : "Helvetica")
      .fontSize(7).fillColor(isFreq ? NAVY : "#222222")
      .text(val, cx, ly + 7.5, { width: COL_W[i] - 6, lineBreak: false });

    cx += COL_W[i];
  });

  doc.rect(PAD, ly + ROW_H - 0.5, TBL_W, 0.5).fill(RULE);
  ly += ROW_H;
});

// EchoLink footnote
ly += 5;
doc.font("Helvetica").fontSize(6.5).fillColor(MUTED)
  .text("Primary (146.970) supports EchoLink node W4TRC-R", PAD, ly, { width: TBL_W });
ly += 12;

// ─────────────────────────────────────────────
// LEFT — Regular Activities
// ─────────────────────────────────────────────
doc.rect(PAD, ly, TBL_W, 0.75).fill(RULE);
ly += 8;

doc.font("Helvetica-Bold").fontSize(6).fillColor(BLUE)
  .text("REGULAR ACTIVITIES", PAD, ly, { width: TBL_W });
ly += 11;

const activities = [
  ["Monthly Meetings",    "2nd Thursday, 7 PM"],
  ["Monthly Fox Hunts",   "3rd Saturday of most months"],
  ["POTA Outings",        "Regular park activations"],
  ["SOTA Activations",    "Summit portable ops"],
  ["Field Day",           "ARRL Field Day — June"],
  ["Special Events",      "Nets, public service & more"],
  ["Weekly Nets",         "See w4trc.org/nets for times"],
  ["Winter Field Day",    "January"],
];

const COL2_W   = (TBL_W - 8) / 2;
const ACT_H    = 23;

activities.forEach((pair, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const ax  = PAD + col * (COL2_W + 8);
  const ay  = ly + row * ACT_H;

  doc.circle(ax + 3.5, ay + 5, 2.5).fill(AMBER);

  doc.font("Helvetica-Bold").fontSize(7).fillColor(NAVY)
    .text(pair[0], ax + 10, ay, { width: COL2_W - 10, lineBreak: false });
  doc.font("Helvetica").fontSize(6).fillColor(MUTED)
    .text(pair[1], ax + 10, ay + 9, { width: COL2_W - 10, lineBreak: false });
});

// ─────────────────────────────────────────────
// RIGHT — Info blocks
// ─────────────────────────────────────────────
const rx  = LEFT_W + 9;
const rw  = RIGHT_W - 18;   // 136pt wide
let ry    = BODY_Y + 7;
const BP  = 10;
const BR  = 3;
const GAP = 7;

function infoBlock(label, lines, y) {
  const LINE_H = 12;
  const blockH = BP + 8 + lines.length * LINE_H + BP - 3;
  doc.roundedRect(rx, y, rw, blockH, BR).fill(WHITE).stroke(RULE);
  doc.font("Helvetica-Bold").fontSize(6).fillColor(BLUE)
    .text(label, rx + BP, y + BP, { width: rw - BP * 2, lineBreak: false });
  let ty = y + BP + 9;
  lines.forEach(({ text, bold, sub }) => {
    doc.font(bold ? "Helvetica-Bold" : "Helvetica")
      .fontSize(sub ? 6.5 : 8)
      .fillColor(sub ? MUTED : NAVY)
      .text(text, rx + BP, ty, { width: rw - BP * 2, lineBreak: false });
    ty += LINE_H;
  });
  return y + blockH + GAP;
}

ry = infoBlock("WEEKLY NET", [
  { text: "146.970 (-)  PL 123.0", bold: true },
  { text: "w4trc.org/nets for times", sub: true },
], ry);

ry = infoBlock("MONTHLY MEETING", [
  { text: "2nd Thursday - 7:00 PM", bold: true },
  { text: "Reid Employee Ctr, Rm 219", sub: true },
  { text: "400 S. Wilcox Dr, Kingsport TN", sub: true },
], ry);

ry = infoBlock("VE LICENSE TESTING", [
  { text: "On demand by appointment", bold: true },
  { text: "Contact us to schedule", sub: true },
], ry);

ry = infoBlock("MEMBERSHIP", [
  { text: "$20 / yr   -   $30 family", bold: true },
  { text: "w4trc.org/join", sub: true },
], ry);

// ─────────────────────────────────────────────
doc.end();
console.log(`PDF written to ${out}`);
