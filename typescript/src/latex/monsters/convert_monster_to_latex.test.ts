import t from 'tap';
import { Creature } from '@src/character_sheet/creature';
import { convertMonsterToLatex, genKnowledgeText } from './convert_monster_to_latex';
import { convertMonsterGroupToLatex } from './generate_monster_descriptions';

t.test('convertMonsterToLatex', (t) => {
  t.test('can generate basic latex for a simple creature', (t) => {
    const creature = Creature.new();
    creature.setProperties({
      base_class: 'warrior',
      creature_origin: 'natural',
      creature_types: ['humanoid'],
      level: 1,
      name: 'Test Monster',
      size: 'medium',
    });
    const latexOutput = convertMonsterToLatex(creature);
    t.match(latexOutput, 'monsubsection{Test Monster}{Level 1}{Medium natural warrior}');
    t.match(latexOutput, '\\begin{monsterstatistics}');
    t.match(latexOutput, 'Types:} humanoid');
    t.match(latexOutput, '\\end{monsterstatistics}');
    t.match(latexOutput, '\\monsterabilitiesheader{Test Monster}');
    t.end();
  });
  t.end();
});

t.test('genKnowledgeText', (t) => {
  t.test('can generate empty knowledge', (t) => {
    const creature = Creature.new();
    creature.setProperties({ creature_types: ['humanoid'] });
    t.equal(genKnowledgeText(creature.getKnowledgeResultConfig()), '');
    t.end();
  });

  t.test('Can generate meaningful knowledge', (t) => {
    const creature = Creature.new();
    creature.setProperties({
      creature_types: ['humanoid'],
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

t.test('convertMonsterGroupToLatex error accumulation', (t) => {
  t.test('accumulates errors from failing monsters instead of throwing immediately', (t) => {
    const validCreature = Creature.new();
    validCreature.setProperties({
      base_class: 'warrior',
      creature_origin: 'natural',
      creature_types: ['humanoid'],
      level: 1,
      name: 'Valid Monster',
      size: 'medium',
    });

    const invalidCreature = {
      name: 'Invalid Monster',
    } as any;

    const group = {
      name: 'Test Group',
      hasArt: false,
      monsters: [validCreature, invalidCreature],
    };

    const errors: { name: string; error: unknown }[] = [];
    const latex = convertMonsterGroupToLatex(group as any, errors);

    t.match(latex, 'Valid Monster');
    t.equal(errors.length, 1);
    t.equal(errors[0].name, 'Test Group -> Invalid Monster');
    t.ok(errors[0].error instanceof Error);
    t.end();
  });
  t.end();
});
