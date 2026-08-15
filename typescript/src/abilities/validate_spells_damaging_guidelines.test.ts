import t from 'tap';
import { validateSpellDesignGuidelines } from './validate_spells';
import { buildSpellProfile } from './spell_profile';
import { calculateExpectedDamageRank } from './expected_damage_rank';
import { makeMockSpell } from './validate_spells_test_helpers';
import { polymorph } from './mystic_spheres/polymorph';
import { pyromancy } from './mystic_spheres/pyromancy';
import { cryomancy } from './mystic_spheres/cryomancy';

t.test('Damaging Spell Design Guidelines: calculateExpectedDamageRank', (t) => {
  t.test('Range Modifiers (Single Target)', (t) => {
    const meleeSpell = makeMockSpell({
      name: 'Melee Strike',
      rank: 2,
      attack: {
        hit: '\\damagerankfour.',
        targeting: 'Make an attack vs. Fortitude against one adjacent creature.',
      },
    });
    const shortSpell = makeMockSpell({
      name: 'Short Blast',
      rank: 2,
      attack: {
        hit: '\\damagerankthree.',
        targeting: 'Make an attack vs. Fortitude against one creature within \\shortrange.',
      },
    });
    const medSpell = makeMockSpell({
      name: 'Med Blast',
      rank: 2,
      attack: {
        hit: '\\damageranktwo.',
        targeting: 'Make an attack vs. Fortitude against one creature within \\medrange.',
      },
    });
    const longSpell = makeMockSpell({
      name: 'Long Blast',
      rank: 2,
      attack: {
        hit: '\\damagerankone.',
        targeting: 'Make an attack vs. Fortitude against one creature within \\longrange.',
      },
    });
    const distSpell = makeMockSpell({
      name: 'Distant Blast',
      rank: 2,
      attack: {
        hit: '\\damagerankzero.',
        targeting: 'Make an attack vs. Fortitude against one creature within \\distrange.',
      },
    });

    t.equal(
      calculateExpectedDamageRank(buildSpellProfile(meleeSpell, 'Test'))?.expectedDamageRank,
      4,
    );
    t.equal(
      calculateExpectedDamageRank(buildSpellProfile(shortSpell, 'Test'))?.expectedDamageRank,
      3,
    );
    t.equal(
      calculateExpectedDamageRank(buildSpellProfile(medSpell, 'Test'))?.expectedDamageRank,
      2,
    );
    t.equal(
      calculateExpectedDamageRank(buildSpellProfile(longSpell, 'Test'))?.expectedDamageRank,
      1,
    );
    t.equal(
      calculateExpectedDamageRank(buildSpellProfile(distSpell, 'Test'))?.expectedDamageRank,
      0,
    );
    t.end();
  });

  t.test('Reflex Defense Penalty on Single Target', (t) => {
    const fortSpell = makeMockSpell({
      name: 'Fort Attack',
      rank: 3,
      attack: {
        hit: '\\damagerankfour.',
        targeting: 'Make an attack vs. Fortitude against one creature within \\shortrange.',
      },
    });
    const reflexSpell = makeMockSpell({
      name: 'Reflex Attack',
      rank: 3,
      attack: {
        hit: '\\damagerankthree.',
        targeting: 'Make an attack vs. Reflex against one creature within \\shortrange.',
      },
    });

    t.equal(
      calculateExpectedDamageRank(buildSpellProfile(fortSpell, 'Test'))?.expectedDamageRank,
      4,
    );
    t.equal(
      calculateExpectedDamageRank(buildSpellProfile(reflexSpell, 'Test'))?.expectedDamageRank,
      3,
    );
    t.end();
  });

  t.test('Area Ranks and Modifiers', (t) => {
    const smallCone = makeMockSpell({
      name: 'Small Cone',
      rank: 3,
      attack: {
        hit: '\\damagerankfour.',
        targeting:
          'Make an attack vs. Fortitude against everything in a \\smallarea cone from you.',
      },
    });
    const medCone = makeMockSpell({
      name: 'Med Cone',
      rank: 3,
      attack: {
        hit: '\\damageranktwo.',
        targeting: 'Make an attack vs. Fortitude against everything in a \\medarea cone from you.',
      },
    });
    const largeCone = makeMockSpell({
      name: 'Large Cone',
      rank: 3,
      attack: {
        hit: '\\damagerankone.',
        targeting:
          'Make an attack vs. Fortitude against everything in a \\largearea cone from you.',
      },
    });

    t.equal(
      calculateExpectedDamageRank(buildSpellProfile(smallCone, 'Test'))?.expectedDamageRank,
      4,
    );
    t.equal(calculateExpectedDamageRank(buildSpellProfile(medCone, 'Test'))?.expectedDamageRank, 2);
    t.equal(
      calculateExpectedDamageRank(buildSpellProfile(largeCone, 'Test'))?.expectedDamageRank,
      1,
    );
    t.end();
  });

  t.test('Bonus Modifiers (Double Defense, Accuracy Penalties, Self-Hit)', (t) => {
    const doubleDefenseSpell = makeMockSpell({
      name: 'Double Defense',
      rank: 3,
      attack: {
        hit: '\\damagerankfour.',
        targeting: 'Make an attack vs. Armor and Reflex against one creature within \\medrange.',
      },
    });
    const minus4AccuracySpell = makeMockSpell({
      name: 'Disintegrate Mock',
      rank: 4,
      attack: {
        hit: '\\damageranksix.',
        targeting:
          'Make an attack vs. Fortitude with a \\minus4 accuracy penalty against something within \\medrange.',
      },
    });

    t.equal(
      calculateExpectedDamageRank(buildSpellProfile(doubleDefenseSpell, 'Test'))
        ?.expectedDamageRank,
      4,
    );
    t.equal(
      calculateExpectedDamageRank(buildSpellProfile(minus4AccuracySpell, 'Test'))
        ?.expectedDamageRank,
      6,
    );
    t.end();
  });

  t.test('Effect Modifiers (Injury-Only Double Damage, DoT, Debuffs)', (t) => {
    const injuryDoubleDamageSpell = makeMockSpell({
      name: 'Bloody Strike Mock',
      rank: 3,
      attack: {
        hit: '\\damagerankfour.',
        injury: 'The target takes \\damagerankfour at the end of its next turn.',
        targeting: 'Make an attack vs. Armor against an adjacent creature.',
      },
    });
    const debuffSpell = makeMockSpell({
      name: 'Slow Strike',
      rank: 3,
      attack: {
        hit: '\\damagerankfour, and the target is \\slowed as a condition.',
        targeting: 'Make an attack vs. Fortitude against one creature within \\shortrange.',
      },
    });

    // Melee (+2) - InjuryDoubleDamage (-1) = +1 -> 3 + 1 = 4
    t.equal(
      calculateExpectedDamageRank(buildSpellProfile(injuryDoubleDamageSpell, 'Test'))
        ?.expectedDamageRank,
      4,
    );
    // Short (+1) - Debuff (-1) = 0 -> 3 + 0 = 3 (if hit is dr4, expected is dr3)
    t.equal(
      calculateExpectedDamageRank(buildSpellProfile(debuffSpell, 'Test'))?.expectedDamageRank,
      3,
    );
    t.end();
  });

  t.test('Verifies benchmark spells validate cleanly', (t) => {
    const polymorphIssues = validateSpellDesignGuidelines([polymorph]);
    t.notOk(
      polymorphIssues.find((i) => i.spellName === 'Flense'),
      'Flense should adhere to design guidelines (dr5)',
    );
    t.notOk(
      polymorphIssues.find((i) => i.spellName === 'Disintegrate'),
      'Disintegrate should adhere to design guidelines (dr6)',
    );

    const pyromancyIssues = validateSpellDesignGuidelines([pyromancy]);
    t.notOk(
      pyromancyIssues.find((i) => i.spellName === 'Fireball'),
      'Fireball should adhere to design guidelines (dr3)',
    );
    t.notOk(
      pyromancyIssues.find((i) => i.spellName === 'Burning Grasp'),
      'Burning Grasp should adhere to design guidelines (dr1)',
    );

    const cryomancyIssues = validateSpellDesignGuidelines([cryomancy]);
    t.notOk(
      cryomancyIssues.find((i) => i.spellName === 'Cone of Cold'),
      'Cone of Cold should adhere to design guidelines (dr1)',
    );
    t.notOk(
      cryomancyIssues.find((i) => i.spellName === 'Freezing Grasp'),
      'Freezing Grasp should adhere to design guidelines (dr4)',
    );
    t.end();
  });

  t.end();
});
