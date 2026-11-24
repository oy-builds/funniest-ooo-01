import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Funniest Out-of-Office — make.fun entry.
// Writes one original out-of-office auto-reply to entry.txt.
const ENTRY =
  "I'm out of office — the office quit first, so I'm replying from the beach it ran off to. Emergencies go to the tide.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY, "utf8");

// Gate check: 1-140 characters (counted as code points, not UTF-16 units),
// single line, not only whitespace.
const back = readFileSync(outFile, "utf8");
if (back !== ENTRY) throw new Error("entry.txt does not match the entry text");
const chars = Array.from(ENTRY).length;
if (chars < 1 || chars > 140)
  throw new Error(`entry is ${chars} chars, must be 1-140`);
if (ENTRY.includes("\n") || ENTRY.trim().length === 0)
  throw new Error("entry must be a single non-blank line");

console.log(`wrote ${outFile} (${chars} chars)`);
console.log(ENTRY);
