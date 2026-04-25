import t from 'tap';
import { Creature } from '@src/character_sheet/creature';
import { convertMonsterToLatex, genKnowledgeText } from './convert_monster_to_latex';

t.test('convertMonsterToLatex', (t) => {
  t.test('can generate basic latex for a simple creature', (t) => {
    const creature = Creature.new();
    creature.setProperties({
      base_class: 'warrior',
      creature_origin: 'natural',
      creature_type: 'humanoid',
      level: 1,
      name: 'Test Monster',
      size: 'medium',
    });
    const latexOutput = convertMonsterToLatex(creature);
    t.match(
      latexOutput,
      'monsubsection{Test Monster}{Level 1 Warrior}{Medium Natural Humanoid}',
    );
    t.match(latexOutput, '\\begin{monsterstatistics}');
    t.match(latexOutput, '\\end{monsterstatistics}');
    t.match(latexOutput, '\\monsterabilitiesheader{Test Monster}');
    t.end();
  });
  t.end();
});

t.test('genKnowledgeText', (t) => {
  t.test('can generate empty knowledge', (t) => {
    const creature = Creature.new();
    creature.setProperties({ creature_type: 'humanoid' });
    t.equal(genKnowledgeText(creature.getKnowledgeResultConfig()), '');
    t.end();
  });

  t.test('Can generate meaningful knowledge', (t) => {
    const creature = Creature.new();
    creature.setProperties({
      creature_type: 'humanoid',
      knowledge_result_easy: 'Easy result',
      level: 20,
      name: 'Test Monster',
      knowledge_result_hard: 'Hard result',
    });

    t.equal(
      genKnowledgeText(creature.getKnowledgeResultConfig()),
      `
      \\monsterknowledgeheader{Test Monster}
      \\par Local DV 10: Easy result
\\par Local DV 20: Hard result
    `,
    );
    t.end();
  });
  t.end();
});
