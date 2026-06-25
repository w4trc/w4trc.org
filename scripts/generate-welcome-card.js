#!/usr/bin/env node
// Generates public/files/KARC-Welcome-Card.pdf
// Run: node scripts/generate-welcome-card.js

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const W = 5.5 * 72;  // 396pt
const H = 4.25 * 72; // 306pt

const NAVY    = "#0b1220";
const AMBER   = "#f59e0b";
const BLUE    = "#2b6cb0";
const WHITE   = "#ffffff";
const LIGHT   = "#f4f6fb";
const MUTED   = "#5a6a7a";
const RULE    = "#dde3ef";

const doc = new PDFDocument({
  size: [W, H],
  margin: 0,
  info: {
    Title: "Welcome to Amateur Radio — KARC",
    Author: "Kingsport Amateur Radio Club",
  },
});

const out = path.join(ROOT, "public", "files", "KARC-Welcome-Card.pdf");
doc.pipe(fs.createWriteStream(out));

// ─────────────────────────────────────────────
// HEADER  (identical to quick reference card)
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
const LEFT_W  = W - RIGHT_W;   // 242pt
const PAD     = 11;
const CONT_W  = LEFT_W - PAD * 2; // 220pt

// Right column background + divider
doc.rect(LEFT_W, BODY_Y, RIGHT_W, BODY_H).fill(LIGHT);
doc.rect(LEFT_W, BODY_Y, 0.75, BODY_H).fill(RULE);

// ─────────────────────────────────────────────
// LEFT — What is amateur radio?
// ─────────────────────────────────────────────
let ly = BODY_Y + 11;

// Section label
doc.font("Helvetica-Bold").fontSize(6).fillColor(BLUE)
  .text("WHAT IS AMATEUR RADIO?", PAD, ly, { width: CONT_W });
ly += 11;

// Intro paragraph
doc.font("Helvetica").fontSize(7.5).fillColor(NAVY)
  .text(
    "Ham radio lets you talk to people across town or around the world using nothing but a radio and an antenna — no cell towers, no internet, no monthly bill.",
    PAD, ly, { width: CONT_W }
  );
ly += 34;

// What you can do — amber dot bullets
const canDo = [
  "Chat locally, just like a walkie-talkie but far more powerful",
  "Reach people worldwide without any internet connection",
  "Stay connected when disasters knock out phone networks",
  "Learn how radio, electronics, and antennas really work",
  "Join a community of 750,000+ licensed hams across the U.S.",
];

canDo.forEach((item) => {
  doc.circle(PAD + 3.5, ly + 4, 2.5).fill(AMBER);
  doc.font("Helvetica").fontSize(7).fillColor(NAVY)
    .text(item, PAD + 10, ly, { width: CONT_W - 10, lineBreak: false });
  ly += 12;
});

// ─────────────────────────────────────────────
// LEFT — How to get licensed
// ─────────────────────────────────────────────
ly += 4;
doc.rect(PAD, ly, CONT_W, 0.75).fill(RULE);
ly += 8;

doc.font("Helvetica-Bold").fontSize(6).fillColor(BLUE)
  .text("HOW TO GET LICENSED", PAD, ly, { width: CONT_W });
ly += 11;

const steps = [
  ["1", "Study",   "Free resources at hamstudy.org and hamradioprep.com"],
  ["2", "Test",    "35 multiple-choice questions — no code required"],
  ["3", "License", "FCC issues your callsign, usually within a week"],
  ["4", "Get on the air!", "Join KARC and start operating"],
];

steps.forEach(([num, title, desc]) => {
  // Number circle
  doc.circle(PAD + 5, ly + 5, 6).fill(NAVY);
  doc.font("Helvetica-Bold").fontSize(6.5).fillColor(WHITE)
    .text(num, PAD + 2, ly + 2, { width: 10, align: "center", lineBreak: false });

  doc.font("Helvetica-Bold").fontSize(7).fillColor(NAVY)
    .text(title, PAD + 14, ly, { lineBreak: false });
  doc.font("Helvetica").fontSize(6.5).fillColor(MUTED)
    .text(desc, PAD + 14, ly + 9, { width: CONT_W - 14, lineBreak: false });
  ly += 21;
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

ry = infoBlock("COME TO A MEETING", [
  { text: "2nd Thursday - 7:00 PM", bold: true },
  { text: "Reid Employee Ctr, Rm 219", sub: true },
  { text: "400 S. Wilcox Dr, Kingsport TN", sub: true },
], ry);

ry = infoBlock("VE LICENSE TESTING", [
  { text: "On demand by appointment", bold: true },
  { text: "Contact us to schedule", sub: true },
], ry);

ry = infoBlock("FIND AN ELMER", [
  { text: "We'll pair you with a mentor", bold: true },
  { text: "Any skill level welcome", sub: true },
  { text: "w4trc.org/elmer", sub: true },
], ry);

ry = infoBlock("JOIN KARC", [
  { text: "$20 / yr   -   $30 family", bold: true },
  { text: "w4trc.org/join", sub: true },
], ry);

// ─────────────────────────────────────────────
doc.end();
console.log(`PDF written to ${out}`);
