import t from 'tap';
import {
  getArchetypeClass,
  getArchetypeName,
  latexClassFeature,
  latexArchetypeDescription,
} from './archetypes';
import {
  addStandardSpellModifiers,
  addStandardManeuverModifiers,
} from './definitions/standard_modifiers';
import { RankAbility } from './types';

t.test('Archetypes', (t) => {
  t.test('getArchetypeClass returns expected class', (t) => {
    t.equal(getArchetypeClass('Battlerager'), 'Barbarian');
    t.equal(getArchetypeClass('Alchemist'), 'Wizard');
    t.equal(getArchetypeClass('Dragon'), 'Dragon');
    t.end();
  });

  t.test('getArchetypeName returns title case name', (t) => {
    t.equal(getArchetypeName('BattleforgedResilience'), 'Battleforged Resilience');
    t.equal(getArchetypeName('DivineSpellMastery'), 'Divine Spell Mastery');
    t.end();
  });

  t.test('latexClassFeature matches Rust format', (t) => {
    const ability: RankAbility = {
      complexity: 2,
      name: 'Test Ability',
      isMagical: true,
      rank: 3,
      description: 'Ability description.',
    };
    const output = latexClassFeature(ability, 'Bbn');
    t.match(output, '\\cf{Bbn}[3]{Test Ability}[\\sparkle]');
    t.match(output, 'Ability description.');
    t.end();
  });

  t.test('latexArchetypeDescription matches Rust format', (t) => {
    const output = latexArchetypeDescription('Totemist');
    t.match(output, '\\archetypedef{Bbn}{Totemist}');
    t.match(output, 'This archetype allows you to embody the spirits of apex predators');
    t.match(output, '\\cf{Bbn}[1]{Totem Animal}');
    t.match(output, 'You choose a totem animal that represents you.');
    t.end();
  });

  t.end();
});

t.test('Standard Modifiers', (t) => {
  t.test('addStandardSpellModifiers appends 7 spell abilities', (t) => {
    const abilities: RankAbility[] = [];
    addStandardSpellModifiers(abilities);
    t.equal(abilities.length, 7);
    t.equal(abilities[0].name, 'Spells');
    t.equal(abilities[0].rank, 1);
    t.equal(abilities[6].rank, 7);
    t.end();
  });

  t.test('addStandardManeuverModifiers appends 4 maneuver abilities', (t) => {
    const abilities: RankAbility[] = [];
    addStandardManeuverModifiers(abilities);
    t.equal(abilities.length, 4);
    t.equal(abilities[0].name, 'Maneuvers');
    t.equal(abilities[0].rank, 1);
    t.equal(abilities[3].rank, 7);
    t.end();
  });

  t.end();
});
