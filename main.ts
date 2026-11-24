// Two-Sentence Horror entry: copies entry.txt byte-for-byte to the output dir.
// Resolves the entry relative to this script file, never the working directory.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");
const trimmed = text.trim();
if (trimmed.length < 1 || trimmed.length > 400 || !/\S/.test(trimmed)) {
  throw new Error(`entry must be 1-400 non-whitespace characters, got ${trimmed.length}`);
}
const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (sentences.length !== 2) {
  throw new Error(`entry must be exactly two sentences, got ${sentences.length}`);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "out");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text);
