import {
  getUncommonClasses,
  validateClassPoints,
} from '../classes/metadata';
import {
  getArchetypesForClass,
} from '../classes/archetypes';
import {
  latexify,
  latexArchetypeDescription,
} from '../latex/classes';
import {
  latexBasicClassAbilities,
} from '../classes/base_class_abilities';
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

    const content = latexify(`
      ${latexArchetypeDescription(archetype)}

      ${latexBasicClassAbilities(cls)}
    `);

    fs.writeFileSync(filepath, content);
    console.log(`Generated ${filepath}`);
  }
}

main();
