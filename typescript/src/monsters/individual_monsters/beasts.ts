import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';

export function addBeasts(grimoire: Grimoire) {
  addIchorTainted(grimoire);
}

function addIchorTainted(grimoire: Grimoire) {
  // Ichor creatures should be +6 levels over their animal counterpart

  grimoire.addMonsterGroup(
    {
      name: 'Ichor-Tainted',
      hasArt: true,
      knowledge: {
        normal: `
            The dreadful magical liquid known as ichor has no known origin.
            All is known is that it can corrupt creatures who contact it.
            Creatures who become tainted in this way recklessly attack anything they encounter, making them extremely dangerous.
        `,
        hard: `
          Ichor-tainted creatures have had their internal organs restructured in unnatural ways, making them difficult to dispatch quickly.
          When the ichor spreads, as it often does during a fight, it inhibits healing as it tries to corrupt its new host.
        `,
        legendary: `
          Only animals can be fully transformed by ichor.
          Other creatures suffer temporary effects at worst.
          The biological structure of transformed animals bears some resemblance to aberrations.
          Some scholars theorize that this means the ichor originated from the Eternal Void, while others think it is a mere imitation.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        creature.addCustomModifier({
          name: 'Ichor',
          immune: 'Critical hits',
          vulnerable: 'Fire',
        });
        for (const ability of creature.getActiveAbilities()) {
          ability.effect += `
            \\injury The target becomes unable to regain hit points as a \\glossterm{condition}.
          `;
        }
      },
    },
    [
      [
        'Ichor Black Bear',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'brute',
            creature_origin: 'natural',
            creature_type: 'animal',
            elite: true,
            level: 7,
            size: 'medium',
          });
          creature.setTrainedSkills(['athletics', 'awareness', 'endurance', 'survival']);
          creature.setBaseAttributes([6, 2, 7, -8, 2, -2]);
          creature.addTrait('quadrupedal');
          creature.addCustomSense('Scent');

          creature.addWeaponMult('bite', { usageTime: 'elite' });
          creature.addWeaponMult('claws');
        },
      ],
      [
        'Ichor Brown Bear',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'brute',
            creature_origin: 'natural',
            creature_type: 'animal',
            elite: true,
            level: 9,
            size: 'large',
          });
          creature.setTrainedSkills(['athletics', 'awareness', 'endurance', 'survival']);
          creature.setBaseAttributes([7, 1, 8, -8, 2, 1]);
          creature.addTrait('quadrupedal');
          creature.addCustomSense('Scent');

          creature.addWeaponMult('bite', { usageTime: 'elite' });
          creature.addWeaponMult('claws');
        },
      ],
      [
        'Ichor Wolf',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'skirmisher',
            creature_origin: 'natural',
            creature_type: 'animal',
            elite: false,
            level: 7,
            size: 'medium',
          });
          creature.setTrainedSkills(['awareness', 'survival']);
          creature.setBaseAttributes([4, 5, 3, -8, 4, 0]);
          creature.addTrait('quadrupedal');

          creature.addManeuver('Crush the Fallen', { weapon: 'bite' });
          creature.addManeuver('Knockdown', { weapon: 'bite' });
        },
      ],
    ],
  );
}
