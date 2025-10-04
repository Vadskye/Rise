import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';

export function addAberrations(grimoire: Grimoire) {
  grimoire.addMonster('Aboleth', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral evil',
      base_class: 'leader',
      challenge_rating: 4,
      creature_type: 'planeforged',
      level: 12,
    });
    creature.setProperties({
      size: 'huge',
    });
    creature.setKnowledgeResults({
      easy: `
        Legends speak of revolting water-dwelling creatures called aboleths that lurk in the deepest caves.
        They are said to have power over people's minds.
      `,
      normal: `
        An aboleth is a Huge fishlike creature found primarily in subterranean lakes and rivers.
        It has four tentacles and two vertically stacked eyes in the center of its ridged forehead.
        It uses its powerful mental abilities to overwhelm the minds of its foes.
      `,
      hard: `
        Four pulsating dark blue orifices line the bottom of an aboleth's body and secrete gray slime that smells like rancid grease.
        This slime coats its tentacles, and creatures struck by the tentacles can have their skin transformed into a similar slime.
        Aboleths are amphibious, and they are able to drag themselves along with their tentacles on land, though they are much faster in the water.
      `,
      legendary: `
        Aboleths can completely dominate the minds of lesser creatures.
        They sometimes use their minions as agents to spy in cities or otherwise further their sinister goals.
      `,
    });
    creature.setTrainedSkills(['awareness', 'endurance', 'social_insight', 'swim']);
    creature.setBaseAttributes([4, 0, 6, 4, 4, 6]);
    creature.addCustomModifier({
      numericEffects: [{ statistic: 'armor_defense', modifier: 4 }],
    });
    creature.addCustomMovementSpeed('Swim (normal)');
    creature.addCustomMovementSpeed('Land (slow)');
    creature.addCustomSense('Darkvision (240)');
    creature.addCustomSense('Telepathy (480)');

    // TODO: mark these as elite actions
    creature.addSpellByName('Psionic Blast');
    creature.addSpellByNewName('Mighty Mind Crush', 'Mind Crush');
    creature.addSpellByName('Friend to Foe');
    creature.addSpellByName('Cause Fear');
    creature.addCustomAttack({
      effect: `
        The aboleth \glossterm{dominates} the mind of humanoid or aberration within \shortrange that is unconscious.
        It can attune to this ability five times, allowing it to control up to five different creatures.
      `,
      isMagical: true,
      name: 'Dominate',
      tags: ['Compulsion'],
      usageTime: 'elite',
    });

    // TODO: mark this as a non-action
    creature.addSpell({
      attack: {
        hit: `
          The target becomes \\glossterm{poisoned} by aboleth slime.
          The poison's accuracy is $accuracy.
          It makes the target \\slowed while the poison lasts.
          The second escalation also deals \\damagerankfive.
        `,
        targeting: `
          Whenever a creature hits the $name with a melee \\glossterm{strike} using a non-Long weapon, the $name makes an $accuracy \\glossterm{reactive attack] vs. Fortitude against the creature that struck it.
        `,
      },
      name: 'Slime-Covered Body',
      rank: 4,
      roles: ['softener'],
      tags: ['Poison'],
    });
    creature.addAutoAttack({
      defense: ['Armor'],
      effect: 'damage',
      isMagical: false,
      name: 'Slimy Tentacle',
      tags: [],
      targeting: 'targeted_medium',
      usageTime: 'standard',
    });
  });
}
