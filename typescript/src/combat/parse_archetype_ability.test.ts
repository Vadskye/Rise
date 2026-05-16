import t from 'tap';
import { parseArchetypeAbility } from './parse_archetype_ability.js';
import { battlerager } from '@src/classes/archetypes/barbarian';

t.test('parse base ability at rank 3', t => {
  const abilities = battlerager();
  const aggViolence = abilities.find(a => a.name === 'Aggravated Violence')!;
  
  const parsed = parseArchetypeAbility(aggViolence, 3);
  t.ok(parsed);
  t.equal(parsed?.name, 'Aggravated Violence');
  t.equal(parsed?.usageTime, 'standard');
  t.equal(parsed?.effect, 'Make a melee \\glossterm{strike}. The strike deals double damage against any creature that dealt damage to you since your last turn.');
  t.end();
});

t.test('should include rank 4 scaling at rank 4', t => {
  const abilities = battlerager();
  const aggViolence = abilities.find(a => a.name === 'Aggravated Violence')!;

  const parsed = parseArchetypeAbility(aggViolence, 4);
  t.ok(parsed);
  t.match(parsed?.effect, 'You gain a \\plus1 accuracy bonus with the strike.');
  t.end();
});

t.test('should include all scaling up to rank 6 at rank 6', t => {
  const abilities = battlerager();
  const aggViolence = abilities.find(a => a.name === 'Aggravated Violence')!;

  const parsed = parseArchetypeAbility(aggViolence, 6);
  t.ok(parsed);
  t.match(parsed?.effect, 'You gain a \\plus1 accuracy bonus with the strike.');
  t.match(parsed?.effect, 'The strike deals double \\glossterm{weapon damage}.');
  t.match(parsed?.effect, 'The strike deals triple \\glossterm{weapon damage}.');
  t.notMatch(parsed?.effect, 'If the strike would deal double damage');
  t.end();
});

t.test('should ignore sustainability blocks per user comment', t => {
  const abilities = battlerager();
  const rage = abilities.find(a => a.name === 'Rage')!;
  
  const parsed = parseArchetypeAbility(rage, 1);
  t.equal(parsed, null);
  t.end();
});
