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
      size: 'Huge',
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
    creature.addCustomMovementSpeed('Swim (Normal)');
    creature.addCustomMovementSpeed('Land (Slow)');
    creature.addCustomSense('Darkvision (240)');
    creature.addCustomSense('Telepathy (480)');

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
    creature.addCustomAttack({
      effect: `
        The $name makes a $accuracy attack vs. Mental against each enemy in a \largearea cone.
        \hit $dr2 damage.
        \injury The target is \stunned as a condition.
        \miss Half damage.
      `,
      isMagical: true,
      name: 'Psionic Blast',
      tags: ['Compulsion'],
      usageTime: 'elite',
    });
    creature.addCustomAttack({
      effect: `
        The $name makes a $accuracy attack vs. Mental against one creature within \medrange.
        \hit $dr4 damage.
        \injury The target becomes \stunned as a \glossterm{condition}.
      `,
      isMagical: true,
      name: 'Mind Crush',
      tags: ['Compulsion'],
      usageTime: 'elite',
    });
    creature.addCustomAttack({
      effect: `
        Whenever a creature hits the $name with a melee strike using a non-Long weapon, it risks being covered in slime.
        The $name makes an $accuracy \glossterm{reactive attack} vs. Reflex against the creature that struck it.
        \hit $dr2l damage.
        \injury The target is poisoned by aboleth slime.
      `,
      isMagical: true,
      name: 'Slime-Covered Body',
      tags: [],
      usageTime: 'standard', // Using 'standard' as 'triggered' is not available in MonsterAttackUsageTime
    });
    creature.addCustomAttack({
      effect: `
        Aboleth slime is an injury-based liquid \glossterm{poison}.
        The poison's accuracy is $accuracy+2.
        Its stage 1 effect makes the target \slowed while the poison lasts.
        Its stage 3 effect also inflicts a \glossterm{vital wound} with a unique vital wound effect.
        Instead of making a \glossterm{vital roll} for the \glossterm{vital wound},
          the target's skin is transformed into a clear, slimy membrane.
        An afflicted creature must be moistened with cool, fresh water at least once every ten minutes
          or it will increase its \glossterm<fatigue level> by two.
        This effect lasts until the vital wound is removed.
        Whenever a creature hits the $name with a melee strike using a non-Long weapon, it risks being covered in slime.
      `,
      isMagical: true,
      name: 'Aboleth Slime',
      tags: ['Poison'],
      usageTime: 'standard', // Using 'standard' as 'triggered' is not available in MonsterAttackUsageTime
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
