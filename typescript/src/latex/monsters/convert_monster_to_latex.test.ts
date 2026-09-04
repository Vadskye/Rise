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

  t.test('scales weapon dice increment at level 7, 13, and 19 in generated latex', (t) => {
    // Level 7 brute with bite (1d8 base -> 1d10 with +1 increment, rank 3 = 2x weapon damage -> 2d10)
    const monster7 = Creature.new();
    monster7.setRequiredProperties({
      base_class: 'brute',
      elite: false,
      level: 7,
      alignment: 'neutral',
      creature_origin: 'natural',
      creature_types: ['beast'],
      size: 'medium',
    });
    monster7.setProperties({ name: 'Dire Beast' });
    monster7.addWeaponMult('bite');
    const latex7 = convertMonsterToLatex(monster7);
    t.match(latex7, '2d10', 'Level 7 monster scales bite to 2d10');

    // Level 13 brute with bite (1d8 base -> 2d6 with +2 increment, rank 5 = 3x weapon damage -> 6d6)
    const monster13 = Creature.new();
    monster13.setRequiredProperties({
      base_class: 'brute',
      elite: false,
      level: 13,
      alignment: 'neutral',
      creature_origin: 'natural',
      creature_types: ['beast'],
      size: 'medium',
    });
    monster13.setProperties({ name: 'Apex Beast' });
    monster13.addWeaponMult('bite');
    const latex13 = convertMonsterToLatex(monster13);
    t.match(latex13, '6d6', 'Level 13 monster scales bite to 6d6');

    // Level 19 brute with bite (1d8 base -> 2d8 with +3 increment, rank 7 = 6x weapon damage -> 12d8)
    const monster19 = Creature.new();
    monster19.setRequiredProperties({
      base_class: 'brute',
      elite: false,
      level: 19,
      alignment: 'neutral',
      creature_origin: 'natural',
      creature_types: ['beast'],
      size: 'medium',
    });
    monster19.setProperties({ name: 'Mythic Beast' });
    monster19.addWeaponMult('bite');
    const latex19 = convertMonsterToLatex(monster19);
    t.match(latex19, '12d8', 'Level 19 monster scales bite to 12d8');

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
