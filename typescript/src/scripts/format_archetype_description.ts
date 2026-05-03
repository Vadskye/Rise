import * as fs from 'fs';
import * as path from 'path';
import { Command } from 'commander';

const program = new Command();

program
  .option('--class-name <name>', 'The name of the class (e.g., barbarian)')
  .parse(process.argv);

const options = program.opts();
const className = options.className?.toLowerCase();

if (!className) {
  console.error('Error: --class-name is required');
  process.exit(1);
}
const filePath = path.join(__dirname, '../classes/archetypes', `${className}.ts`);

if (!fs.existsSync(filePath)) {
  console.error(`Error: File not found at ${filePath}`);
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

/**
 * Formats a single LaTeX description block with proper indentation.
 */
function formatDescription(text: string): string {
  const lines = text.trim().split('\n');
  let currentIndent = 0;
  const BASE_INDENT = '        '; // 8 spaces for the description block
  const STEP_INDENT = '  ';       // 2 spaces for nested blocks

  const formattedLines = lines.map((line) => {
    const trimmedLine = line.trim();
    
    // Decrement indent before the line if it's an \end
    if (trimmedLine.includes('\\end{') || trimmedLine.includes('\\\\end{')) {
      currentIndent = Math.max(0, currentIndent - 1);
    }

    const indent = BASE_INDENT + STEP_INDENT.repeat(currentIndent);
    const result = trimmedLine === '' ? '' : indent + trimmedLine;

    // Increment indent after the line if it's a \begin
    if ((trimmedLine.includes('\\begin{') || trimmedLine.includes('\\\\begin{')) && 
        !(trimmedLine.includes('\\end{') || trimmedLine.includes('\\\\end{'))) {
      currentIndent++;
    }

    return result;
  });

  return `\n${formattedLines.join('\n')}\n      `;
}

// Regex to find description: ` ... `
// Matches description: followed by backticks, capturing content in group 1
const descriptionRegex = /description: `([\s\S]*?)`,/g;

const newContent = content.replace(descriptionRegex, (match, p1) => {
  const formatted = formatDescription(p1);
  return `description: \`${formatted}\`,`;
});

fs.writeFileSync(filePath, newContent, 'utf8');
console.log(`Successfully reformatted archetype descriptions in ${className}.ts`);
