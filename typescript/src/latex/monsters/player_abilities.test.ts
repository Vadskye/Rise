import t from 'tap';
import { reformatAttack } from './player_abilities';
import { Spell } from '@src/mystic_spheres';
import { Creature } from '@src/character_sheet/creature';

t.test('reformatAttack', (t) => {

  const simpleCreature = Creature.new();
  simpleCreature.setProperties({
    level: 10,
  });

  // TODO: figure out type of 't'
  function testTargeting(localT: any, original: string, expected: string) {
    const mockSpell: Partial<Spell> = {
      attack: {
        hit: 'stuff',
        targeting: original
      },
    };
    const reformatted = structuredClone(mockSpell);
    reformatAttack(simpleCreature, reformatted as any);
    localT.matchStrict(reformatted.attack, {
      hit: 'stuff',
      targeting: expected,
    });
  }

  t.test('Calculating accuracy', (t) => {
    t.test("With a numeric accuracy bonus", (t) => {
      testTargeting(t,
        `
          Make an attack vs. Mental with a +4 accuracy bonus against something.
        `,
        `
          The $name makes a $accuracy+4 attack vs. Mental against something.
        `,
      );
      t.end();
    });

    t.test("With a numeric accuracy penalty", (t) => {
      testTargeting(t,
        `
          Make an attack vs. Mental with a -8 accuracy penalty against something.
        `,
        `
          The $name makes a $accuracy-8 attack vs. Mental against something.
        `,
      );
      t.end();
    });

    t.test("With a \\plus accuracy bonus", (t) => {
      testTargeting(t,
        `
          Make an attack vs. Mental with a \\plus2 accuracy bonus against something.
        `,
        `
          The $name makes a $accuracy+2 attack vs. Mental against something.
        `,
      );
      t.end();
    });

    t.test("With a \\minus accuracy penalty", (t) => {
      testTargeting(t,
        `
          Make an attack vs. Mental with a \\minus3 accuracy bonus against something.
        `,
        `
          The $name makes a $accuracy-3 attack vs. Mental against something.
        `,
      );
      t.end();
    });

    t.test("With a \\glossterm{accuracy} bonus", (t) => {
      testTargeting(t,
        `
          Make an attack vs. Mental with a +4 \\glossterm{accuracy} bonus against something.
        `,
        `
          The $name makes a $accuracy+4 attack vs. Mental against something.
        `,
      );
      t.end();
    });

    t.test("With accuracy scaling", (t) => {
      const mockSpell: Partial<Spell> = {
        attack: {
          hit: 'stuff',
          targeting: 'Make an attack vs. Mental against something.',
        },
        rank: 1,
        scaling: 'accuracy',
      };
      const reformatted = structuredClone(mockSpell);
      reformatAttack(simpleCreature, reformatted as any);
      t.matchStrict(reformatted.attack, {
        hit: 'stuff',
        // 10th level, so rank 4, vs rank 1 spell
        targeting: 'The $name makes a $accuracy+3 attack vs. Mental against something.',
      });
      t.end();
    });

    t.end();
  });

  t.test('Replacing "you"', (t) => {

    t.test('With standard attack syntax', (t) => {
      testTargeting(
        t,
        `
          Make an attack vs. Mental against something.
        `,
        `
          The $name makes a $accuracy attack vs. Mental against something.
        `,
      );
      t.end();
    });

    t.test('With an area that mentions "you"', (t) => {
      testTargeting(
        t,
        `
          Make an attack vs. Mental against all enemies in a Medium cone from you.
        `,
        `
          The $name makes a $accuracy attack vs. Mental against all enemies in a Medium cone from itself.
        `,
      );
      t.end();
    });

    t.test('With an area that mentions "you" and a followup conditional "you"', (t) => {
      testTargeting(
        t,
        `
          Make an attack vs. Mental against all enemies in a Medium cone from you.
          You gain a +2 accuracy bonus against each \\glossterm{shadowed} target.
        `,
        `
          The $name makes a $accuracy attack vs. Mental against all enemies in a Medium cone from itself.
          It gains a +2 accuracy bonus against each \\glossterm{shadowed} target.
        `,
      );
      t.end();
    });

    t.end();
  });

  t.end();
});
