import t from 'tap';
import { Creature } from '@src/character_sheet/creature';
import { convertMonsterToLatex, genKnowledgeText } from './convert_monster_to_latex';

t.test('convertMonsterToLatex', (t) => {
  t.test('can generate basic latex for a simple creature', (t) => {
    const creature = Creature.new();
    creature.setProperties({
      base_class: 'warrior',
      creature_type: 'mortal',
      level: 1,
      name: 'Test Monster',
      size: 'medium',
    });
    const latexOutput = convertMonsterToLatex(creature);
    t.ok(latexOutput.includes('\monsubsection{Test Monster}{Level 1 Warrior}{Medium mortal}'));
    t.ok(latexOutput.includes('\\begin{monsterstatistics}'));
    t.ok(latexOutput.includes('\\end{monsterstatistics}'));
    t.ok(latexOutput.includes('\\monsterabilitiesheader{Test Monster}'));
    t.end();
  });
  t.end();
});

t.test('genKnowledgeText', (t) => {
  t.test('can generate empty knowledge', (t) => {
    const creature = Creature.new();
    creature.setProperties({ creature_type: 'mortal' });
    t.equal(genKnowledgeText(creature.getKnowledgeResultConfig()), '');
    t.end();
  });

  t.test('Can generate meaningful knowledge', (t) => {
    const creature = Creature.new();
    creature.setProperties({
      creature_type: 'undead',
      knowledge_result_easy: 'Easy result',
      level: 20,
      knowledge_result_hard: 'Hard result',
    });

    t.equal(
      genKnowledgeText(creature.getKnowledgeResultConfig()),
      `
      \\monsterknowledgeheader{$Name}
      \\par Religion DV 10: Easy result
\\par Religion DV 20: Hard result
    `,
    );
    t.end();
  });
  t.end();
});
