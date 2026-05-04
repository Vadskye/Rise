import {
  getUncommonClasses,
  latexArchetypeDescription,
  latexBasicClassAbilities,
  getArchetypesForClass,
  latexifyClass,
  validateClassPoints,
} from '../classes/metadata';
import fs from 'fs';
import path from 'path';

function main() {
  validateClassPoints();
  const classes = getUncommonClasses();
  const outputDir = path.resolve(__dirname, '../../../comprehensive_codex/generated/');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const cls of classes) {
    const filename = `${cls.toLowerCase()}.tex`;
    const filepath = path.join(outputDir, filename);

    const archetypes = getArchetypesForClass(cls);
    const archetype = archetypes[0];

    const content = latexifyClass(`
      ${latexArchetypeDescription(archetype)}

      ${latexBasicClassAbilities(cls)}
    `);

    fs.writeFileSync(filepath, content);
    console.log(`Generated ${filepath}`);
  }
}

main();
