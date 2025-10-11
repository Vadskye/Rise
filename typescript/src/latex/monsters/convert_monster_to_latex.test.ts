import t from 'tap';
import { Creature } from '@src/character_sheet/creature';
import { convertMonsterToLatex, genKnowledgeText } from './convert_monster_to_latex';

t.test('convertMonsterToLatex', (t) => {
  t.test('can generate basic latex for a simple creature', (t) => {
    const creature = Creature.new();
    creature.setProperties({
      name: 'Test Monster',
      level: 1,
      base_class: 'warrior',
      size: 'medium',
      creature_type: 'humanoid',
    });
    const latexOutput = convertMonsterToLatex(creature);
    t.ok(latexOutput.includes('\\monsubsection{Test Monster}{1 Warrior}'));
    t.ok(latexOutput.includes('\\monstersize{Medium humanoid}'));
    t.ok(latexOutput.includes('\\begin{monsterstatistics}'));
    t.ok(latexOutput.includes('\\end{monsterstatistics}'));
    t.ok(latexOutput.includes('\\monsterabilitiesheader{Test Monster}'));
    t.end();
  });
  t.end();
});

t.test('can generate empty knowledge text', (t) => {
  const creature = Creature.new();
  t.equal(genKnowledgeText(creature), '');
  t.end();
});

t.test('Can generate meaningful knowledge text', (t) => {
  const creature = Creature.new();
  creature.setProperties({
    creature_type: 'undead',
    knowledge_result_easy: 'Easy result',
    level: 20,
    knowledge_result_hard: 'Hard result',
  });

  t.equal(
    genKnowledgeText(creature),
    `\\par Knowledge (religion) 10: Easy result
\\par Knowledge (religion) 20: Hard result`,
  );
  t.end();
});
