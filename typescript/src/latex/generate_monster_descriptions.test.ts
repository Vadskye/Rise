import t from 'tap';
import { Creature } from '@src/character_sheet/creature';
import { genKnowledgeText } from './generate_monster_descriptions';

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
