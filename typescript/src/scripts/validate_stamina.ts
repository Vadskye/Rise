import fs from 'fs';
import path from 'path';

interface Issue {
  file: string;
  lineNum: number;
  message: string;
  text: string;
}

const issues: Issue[] = [];

// Clean LaTeX and formatting commands for regex checking
function cleanLine(line: string): string {
  return line
    .replace(/\\glossterm\{([^}]+)\}/g, '$1')
    .replace(/\\ability\{([^}]+)\}/g, '$1')
    .replace(/\\spell\{([^}]+)\}/g, '$1')
    .replace(/\\ritual\{([^}]+)\}/g, '$1')
    .replace(/\\cf\{[^}]+\}\{[^}]+\}/g, '')
    .replace(/\\magicalcf\{[^}]+\}\{[^}]+\}/g, '')
    .replace(/\\abilitytags?\s+\\[\w\d]+/gi, '')
    .replace(/\\abilitycost\b/gi, '')
    .replace(/\\+/g, ' ');
}

function getFiles(dir: string, extensions: string[]): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      // Exclude third-party, build, and generated output directories
      if (
        file !== 'node_modules' &&
        file !== '.git' &&
        file !== 'generated' &&
        file !== 'dist-test' &&
        file !== 'dist'
      ) {
        results.push(...getFiles(filePath, extensions));
      }
    } else {
      if (extensions.includes(path.extname(file))) {
        results.push(filePath);
      }
    }
  }
  return results;
}

function scanFile(filePath: string) {
  if (filePath.endsWith('validate_stamina.ts')) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/);
  const ext = path.extname(filePath);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Support 'nolint' bypass
    if (line.includes('nolint')) continue;

    // Check for comment lines
    if (ext === '.tex' && /^\s*%/.test(line)) continue;
    if (ext === '.ts' && /^\s*(\/\/|\*)/.test(line)) continue;
    if ((ext === '.py' || ext === '.yml') && /^\s*#/.test(line)) continue;
    if (ext === '.less' && /^\s*(\/\/|\/\*|\*)/.test(line)) continue;

    const cleaned = cleanLine(line);

    // 1. Check for incorrect stamina increases (should be reduce/spend)
    // Matches verbs like increase, gain, add, receive, regain followed by stamina (unless maximum stamina)
    const staminaIncreaseRegex =
      /\b(increase|gain|add|receive|regain)(?:s|d|ing)?\b(?!\s+(?:your\s+|its\s+|a\s+)?maximum\b)\s+(?:your\s+|its\s+|a\s+|one\s+|two\s+|three\s+|four\s+|five\s+|some\s+|any\s+|additional\s+|optional\s+|current\s+|of\s+|our\s+)*stamina\b/i;
    if (staminaIncreaseRegex.test(cleaned)) {
      issues.push({
        file: filePath,
        lineNum,
        message: 'Likely incorrect stamina increase phrasing (should reduce/spend stamina)',
        text: line,
      });
    }

    // 2. Check for leftover "fatigue" references
    const fatigueRegex = /\bfatigue\b/i;
    if (fatigueRegex.test(cleaned)) {
      issues.push({
        file: filePath,
        lineNum,
        message: 'Leftover "fatigue" reference',
        text: line,
      });
    }

    // 3. Check for specific double word typos
    const doubleWordRegex = /\b(maximum\s+maximum|stamina_max_max|its\s+increases\s+its)\b/i;
    if (doubleWordRegex.test(cleaned)) {
      issues.push({
        file: filePath,
        lineNum,
        message: 'Search-replace typo / duplicate word',
        text: line,
      });
    }

    // 4. Check for "does not/without increase/increasing stamina" which should be "reduce/reducing"
    const withoutIncreaseStaminaRegex =
      /\b(without\s+increasing\s+(?:your\s+|its\s+)?stamina|does\s+not\s+increase\s+(?:your\s+|its\s+)?stamina)\b/i;
    if (withoutIncreaseStaminaRegex.test(cleaned)) {
      issues.push({
        file: filePath,
        lineNum,
        message:
          'Phrasing "without/does not increase stamina" should probably be "without/does not reduce stamina"',
        text: line,
      });
    }

    // 5. Check for reducing stamina as a cost insted of spendin it
    const canReduceRegex = /\bcan\b.*reduc.*stamina/i;
    if (canReduceRegex.test(cleaned)) {
      issues.push({
        file: filePath,
        lineNum,
        message: 'Phrasing "can reduce stamina" should probably be "spend stamina"',
        text: line,
      });
    }
    const reduceAsCostRegex = /abilitycost.*reduc.*stamina/i;
    if (reduceAsCostRegex.test(cleaned)) {
      issues.push({
        file: filePath,
        lineNum,
        message: 'Ability cost that reduces stamina should probably spend stamina',
        text: line,
      });
    }
  }
}

// Main execution
console.log('Running Stamina & Fatigue validation on source files...');

const projectRoot = path.resolve(__dirname, '../../..');

// Find all relevant files in the directories
const extensions = ['.tex', '.ts', '.py', '.js', '.less'];
const filesToScan: string[] = [];

filesToScan.push(...getFiles(path.join(projectRoot, 'comprehensive_codex'), ['.tex']));
filesToScan.push(...getFiles(path.join(projectRoot, 'core_book'), ['.tex']));
filesToScan.push(...getFiles(path.join(projectRoot, 'typescript/src'), ['.ts']));
filesToScan.push(...getFiles(path.join(projectRoot, 'character_sheet'), ['.py', '.js', '.less']));

console.log(`Found ${filesToScan.length} source files to scan.`);

for (const file of filesToScan) {
  scanFile(file);
}

// Report issues
if (issues.length === 0) {
  console.log('\x1b[32m%s\x1b[0m', 'Validation successful: No stamina/fatigue issues found.');
  process.exit(0);
} else {
  console.error(
    '\x1b[31m%s\x1b[0m',
    `Validation failed: Found ${issues.length} potential stamina/fatigue issues:\n`,
  );
  for (const issue of issues) {
    const relativePath = path.relative(projectRoot, issue.file);
    console.error(`\x1b[33m%s\x1b[0m`, `${relativePath}:${issue.lineNum}`);
    console.error(`  Error: ${issue.message}`);
    console.error(`  Line:  "${issue.text.trim()}"`);
    console.error();
  }
  process.exit(1);
}
