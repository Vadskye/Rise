/**
 * verify_latex_parity.ts
 *
 * Compares two LaTeX output files semantically, ignoring whitespace differences.
 * Used to verify parity between Rust and TypeScript equipment generation.
 *
 * Usage:
 *   npx tsx src/scripts/verify_latex_parity.ts <rust_file> <ts_file>
 *
 * Outputs MATCH or a focused diff of the first N mismatched tokens.
 */
import * as fs from 'fs';

const MAX_DIFF_TOKENS = 30;

export function readFileNormalized(path: string): string {
  let content: string;
  try {
    const buffer = fs.readFileSync(path);
    // Handle UTF-16LE (common when PowerShell redirects on Windows)
    if (buffer[0] === 0xff && buffer[1] === 0xfe) {
      content = buffer.toString('utf16le');
    } else {
      content = buffer.toString('utf8');
    }
  } catch (e: any) {
    console.error(`Error reading file: ${path}\n  ${e.message}`);
    process.exit(1);
  }
  return content;
}

/**
 * Normalize a LaTeX string for semantic comparison:
 * - Collapse all whitespace runs to a single space
 * - Trim leading/trailing whitespace
 */
export function normalize(content: string): string {
  return content
    .replace(/%.*$/gm, '') // Strip LaTeX comments
    .replace(/ft\.\\ /g, 'ft. ') // Normalize 'ft.\ ' to 'ft. '
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Split normalized content into tokens (words/symbols) for line-by-line diff.
 * We split on spaces to produce comparable units.
 */
export function tokenize(normalized: string): string[] {
  return normalized.split(' ').filter(t => t.length > 0);
}

/**
 * Find the first index where two token arrays diverge.
 */
export function firstDiffIndex(tokA: string[], tokB: string[]): number {
  const len = Math.min(tokA.length, tokB.length);
  for (let i = 0; i < len; i++) {
    if (tokA[i] !== tokB[i]) return i;
  }
  if (tokA.length !== tokB.length) return len;
  return -1;
}

/**
 * Return a window of tokens around a given index, formatted for display.
 */
export function contextWindow(tokens: string[], idx: number, radius = 10): string {
  const start = Math.max(0, idx - radius);
  const end = Math.min(tokens.length, idx + radius + 1);
  return tokens
    .slice(start, end)
    .map((t, i) => (start + i === idx ? `>>>${t}<<<` : t))
    .join(' ');
}

export function verify(rustFile: string, tsFile: string): boolean {
  const rustRaw = readFileNormalized(rustFile);
  const tsRaw = readFileNormalized(tsFile);

  const rustNorm = normalize(rustRaw);
  const tsNorm = normalize(tsRaw);

  if (rustNorm === tsNorm) {
    console.log(`✅ MATCH: ${rustFile} vs ${tsFile}`);
    return true;
  }

  const rustTokens = tokenize(rustNorm);
  const tsTokens = tokenize(tsNorm);

  const diffIdx = firstDiffIndex(rustTokens, tsTokens);

  console.log(`❌ DIFFERENCE: ${rustFile} vs ${tsFile}`);
  console.log(`   Token count — Rust: ${rustTokens.length}, TS: ${tsTokens.length}`);
  console.log(`   First divergence at token #${diffIdx}:`);
  console.log(`   Rust: ${contextWindow(rustTokens, diffIdx)}`);
  console.log(`   TS:   ${contextWindow(tsTokens, diffIdx)}`);

  // Show up to MAX_DIFF_TOKENS additional mismatches
  let shown = 1;
  for (let i = diffIdx + 1; i < Math.min(rustTokens.length, tsTokens.length) && shown < MAX_DIFF_TOKENS; i++) {
    if (rustTokens[i] !== tsTokens[i]) {
      console.log(`   Also differs at token #${i}: Rust="${rustTokens[i]}" TS="${tsTokens[i]}"`);
      shown++;
    }
  }

  return false;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: npx tsx src/scripts/verify_latex_parity.ts <rust_file> <ts_file>');
    process.exit(1);
  }

  const matched = verify(args[0], args[1]);
  process.exit(matched ? 0 : 1);
}

