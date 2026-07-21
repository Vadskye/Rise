import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';
import { BRIEF_COOLDOWN } from '@src/abilities/constants';

export function addBeasts(grimoire: Grimoire) {
  grimoire.addMonster('Stygian Leech', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'brute',
      elite: false,
      creature_origin: 'natural',
      creature_type: 'beast',
      level: 5,
      size: 'medium',
    });
    creature.setProperties({ has_art: true });
    creature.setKnowledgeResults({
      normal: `
        A stygian leech is a Medium worm-like creature that feeds on life energy.
        It uses its ability to crawl on walls and ceilings to drop on unsuspecting foes.
      `,
      hard: `
        Stygian leeches instinctively avoid feeding on other stygian leeches, but will otherwise attempt to drain the life from any living creatures, regardless of danger.
        They can instinctively sense the location of any living creatures nearby.
        Their life-draining attacks can allow them to heal themselves.
      `,
      legendary: `
        Stygian leeches ignore non-living creatures entirely unless severely provoked.
        Some non-living creatures, such as intelligent undead, take advantage of this by gathering stygian leeches to guard their homes.
      `,
    });
    creature.setTrainedSkills(['athletics', 'stealth']);
    creature.setBaseAttributes([5, 2, 4, -6, 2, -2]);
    creature.addTrait('legless');
    creature.addCustomMovementSpeed('Climb (average)');
    creature.addCustomSense('Darkvision (120 ft.)');
    creature.addCustomSense('Lifesense (120 ft.)');

    creature.addCustomManeuver({
      effect: `
        Make a \\glossterm{strike}.
        \\injury The $name regains \\hpranktwo.
      `,
      name: 'Leech Life',
      tags: ['Blood'],
      weapon: 'bite',
    });
  });
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
          creature.setBaseAttributes([4, 5, 3, -7, 4, 0]);
          creature.addTrait('quadrupedal');

          creature.addManeuver('Crush the Fallen', { weapon: 'bite' });
          creature.addManeuver('Knockdown', { weapon: 'bite' });
        },
      ],
    ],
  );
}
