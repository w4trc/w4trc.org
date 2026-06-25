#!/usr/bin/env node
// Generates public/files/KARC-Congrats-Card.pdf
// Run: node scripts/generate-congrats-card.js

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const W = 5.5 * 72;
const H = 4.25 * 72;

const NAVY    = "#0b1220";
const AMBER   = "#f59e0b";
const BLUE    = "#2b6cb0";
const WHITE   = "#ffffff";
const LIGHT   = "#f4f6fb";
const MUTED   = "#5a6a7a";
const RULE    = "#dde3ef";
const ROW_ALT = "#eef2fa";
const GREEN   = "#166534";
const GREEN_BG = "#f0fdf4";
const GREEN_BORDER = "#bbf7d0";

const doc = new PDFDocument({
  size: [W, H],
  margin: 0,
  info: {
    Title: "Congratulations New Ham — KARC",
    Author: "Kingsport Amateur Radio Club",
  },
});

const out = path.join(ROOT, "public", "files", "KARC-Congrats-Card.pdf");
doc.pipe(fs.createWriteStream(out));

// ─────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────
const HEADER_H = 60;

doc.rect(0, 0, W, HEADER_H).fill(NAVY);
doc.rect(0, HEADER_H - 3, W, 3).fill(AMBER);

const logoPath = path.join(ROOT, "public", "images", "KARC-LOGO-AlphaBG.png");
const LOGO = 46;
doc.image(logoPath, 10, (HEADER_H - 3 - LOGO) / 2, { width: LOGO, height: LOGO });

doc.font("Helvetica-Bold").fontSize(26).fillColor(WHITE)
  .text("W4TRC", 64, 10, { lineBreak: false });
doc.font("Helvetica").fontSize(9).fillColor("rgba(255,255,255,0.80)")
  .text("Kingsport Amateur Radio Club", 65, 40, { lineBreak: false });

doc.font("Helvetica-Bold").fontSize(8).fillColor(AMBER)
  .text("w4trc.org", 0, 12, { align: "right", width: W - 12, lineBreak: false });
doc.font("Helvetica").fontSize(7).fillColor("rgba(255,255,255,0.70)")
  .text("contact@w4trc.org", 0, 25, { align: "right", width: W - 12, lineBreak: false })
  .text("Kingsport, TN", 0, 37, { align: "right", width: W - 12, lineBreak: false });

// ─────────────────────────────────────────────
// BODY
// ─────────────────────────────────────────────
const BODY_Y  = HEADER_H + 1;
const BODY_H  = H - BODY_Y;
const RIGHT_W = 154;
const LEFT_W  = W - RIGHT_W;
const PAD     = 11;
const CONT_W  = LEFT_W - PAD * 2; // 220pt

doc.rect(LEFT_W, BODY_Y, RIGHT_W, BODY_H).fill(LIGHT);
doc.rect(LEFT_W, BODY_Y, 0.75, BODY_H).fill(RULE);

// ─────────────────────────────────────────────
// LEFT — Congrats banner
// ─────────────────────────────────────────────
let ly = BODY_Y + 10;

// Green congrats banner
const BANNER_H = 28;
doc.roundedRect(PAD, ly, CONT_W, BANNER_H, 3)
  .fill(GREEN_BG).stroke(GREEN_BORDER);

doc.font("Helvetica-Bold").fontSize(11).fillColor(GREEN)
  .text("You passed!", PAD + 9, ly + 5, { lineBreak: false });
doc.font("Helvetica").fontSize(7).fillColor(GREEN)
  .text("Welcome to amateur radio. Here's what happens next.", PAD + 9, ly + 19, {
    width: CONT_W - 14, lineBreak: false,
  });

ly += BANNER_H + 10;

// ─────────────────────────────────────────────
// LEFT — What happens next
// ─────────────────────────────────────────────
doc.font("Helvetica-Bold").fontSize(6).fillColor(BLUE)
  .text("WHAT HAPPENS NEXT", PAD, ly, { width: CONT_W });
ly += 11;

const steps = [
  ["Check ULS daily",    "Your callsign appears at wireless.fcc.gov/ULS within 1-3 days"],
  ["Once issued",        "You are now legal to operate — not before!"],
  ["Look up your call",  "Search your new callsign at QRZ.com and claim your profile"],
  ["Program your radio", "Enter the W4TRC repeaters below and make your first contact"],
  ["Check in to the net", "When NCS opens check-ins, key up and say your callsign"],
  ["Join KARC",          "Dues are $20/yr — we'd love to have you as a member"],
];

steps.forEach(([when, desc]) => {
  // Amber dot
  doc.circle(PAD + 3.5, ly + 4.5, 2.5).fill(AMBER);

  doc.font("Helvetica-Bold").fontSize(7).fillColor(NAVY)
    .text(when + ":", PAD + 10, ly, { lineBreak: false });
  doc.font("Helvetica").fontSize(7).fillColor(MUTED)
    .text(desc, PAD + 10, ly + 8.5, { width: CONT_W - 10, lineBreak: false });
  ly += 17;
});

// ─────────────────────────────────────────────
// LEFT — Repeater programming table
// ─────────────────────────────────────────────
ly += 3;
doc.rect(PAD, ly, CONT_W, 0.75).fill(RULE);
ly += 7;

doc.font("Helvetica-Bold").fontSize(6).fillColor(BLUE)
  .text("PROGRAM THESE REPEATERS FIRST", PAD, ly, { width: CONT_W });
ly += 9;

const COLS  = ["Name / Label", "Frequency", "Offset", "Tone (PL)"];
const COL_W = [68, 62, 38, 52];
const TBL_W = CONT_W;
const ROW_H = 15;

doc.rect(PAD, ly, TBL_W, ROW_H).fill(NAVY);
let cx = PAD + 4;
doc.font("Helvetica-Bold").fontSize(5.5).fillColor(WHITE);
COLS.forEach((label, i) => {
  doc.text(label, cx, ly + 5, { width: COL_W[i] - 4, lineBreak: false });
  cx += COL_W[i];
});
ly += ROW_H;

const repeaters = [
  { name: "W4TRC Primary", freq: "146.970 MHz", offset: "-0.6 MHz", tone: "123.0 Hz", primary: true  },
  { name: "W4TRC UHF #1",  freq: "443.325 MHz", offset: "+5.0 MHz", tone: "123.0 Hz", primary: false },
  { name: "W4TRC UHF #2",  freq: "443.175 MHz", offset: "+5.0 MHz", tone: "None",     primary: false },
];

repeaters.forEach((r, idx) => {
  doc.rect(PAD, ly, TBL_W, ROW_H).fill(idx % 2 === 0 ? WHITE : ROW_ALT);
  if (r.primary) doc.rect(PAD, ly, 3, ROW_H).fill(AMBER);
  cx = PAD + 4;
  [r.name, r.freq, r.offset, r.tone].forEach((val, i) => {
    doc.font(i === 0 ? "Helvetica-Bold" : "Helvetica")
      .fontSize(6.5).fillColor(NAVY)
      .text(val, cx, ly + 4.5, { width: COL_W[i] - 5, lineBreak: false });
    cx += COL_W[i];
  });
  doc.rect(PAD, ly + ROW_H - 0.5, TBL_W, 0.5).fill(RULE);
  ly += ROW_H;
});

// ─────────────────────────────────────────────
// RIGHT — Info blocks
// ─────────────────────────────────────────────
const rx  = LEFT_W + 9;
const rw  = RIGHT_W - 18;
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

ry = infoBlock("FIND AN ELMER", [
  { text: "Questions? We can help.", bold: true },
  { text: "We'll pair you with a mentor", sub: true },
  { text: "w4trc.org/elmer", sub: true },
], ry);

ry = infoBlock("JOIN KARC", [
  { text: "$20 / yr   -   $30 family", bold: true },
  { text: "w4trc.org/join", sub: true },
], ry);

// ─────────────────────────────────────────────
doc.end();
console.log(`PDF written to ${out}`);
