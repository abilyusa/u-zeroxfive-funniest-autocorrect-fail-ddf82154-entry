// Funniest Autocorrect Fail — make.fun entry (program/v1).
// Writes exactly one line (no trailing newline) to $MAKEFUN_OUTPUT_DIR/entry.txt
// (fallback /output/entry.txt). Deterministic, no network, no external reads.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I texted my crush 'Can't stop thinking about you' — autocorrect sent 'Can't stop thinking about your brother.'";

// Self-check the house gate before writing: 1–199 characters, one line,
// not only whitespace. Fail loudly rather than emit an invalid entry.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 199 || ENTRY.includes("\n") || ENTRY.trim().length === 0) {
  throw new Error(`entry fails gate: ${chars} chars`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
