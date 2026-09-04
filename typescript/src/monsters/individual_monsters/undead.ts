import { Grimoire } from '@src/monsters/grimoire';
import { Creature, CustomMonsterAbility } from '@src/character_sheet/creature';
import { getWeaponMultByRank } from '@src/abilities/combat_styles';
import { BARRIER_COOLDOWN } from '@src/abilities/constants';

export function addUndead(grimoire: Grimoire) {
  addHalfsouls(grimoire);
  addVampires(grimoire);
}

function addHalfsouls(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Halfsouls',
      knowledge: {
        normal: `
          A halfsoul is an undead creature that was incorrectly resurrected, returning only half of the original creature's soul to its body.
          This splitting of the soul has disastrous consequences, leaving both halves wracked by pain and confusion.
          Although a halfsoul has all of the original abilities of the creature, it is violent and insane, with only fragmentary glimpses of its original personality.
        `,
        hard: `
          Halfsouls can be created by resurrection rituals that are interrupted shortly before completion.
          They can also be the result of botched necromantic rituals that were intended to splinter a soul, such as rituals to create skeletons and zombies.
        `,
      },
      sharedInitializer: (creature) => {
        creature.addResistant('Emotion');
      },
    },
    [
      [
        'Halfsoul Telekine',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic neutral',
            base_class: 'sniper',
            elite: true,
            creature_origin: 'undead',
            creature_types: ['humanoid'],
            level: 15,
            size: 'medium',
          });
          creature.setTrainedSkills(['awareness', 'knowledge_arcana']);
          creature.setBaseAttributes([-1, 4, 1, 6, 5, 7]);
          // Proprioception
          creature.addCustomSense('Blindsense (60 ft.)');
          creature.addCustomSense('Blindsight (15 ft.)');

          // Single target is standard action, AOE is elite
          creature.addSpell('Neck Snap');
          creature.addSpell('Mighty Compression');
          creature.addSpell('Intense Mind Shove', { usageTime: 'elite' });
          creature.addSpell('Mighty Blastwave', { usageTime: 'elite' });
          // Annoying to automate the conversion for this spell.
          // TODO: make this automatic if we want to give other creatures Wall of Force.
          creature.addCustomSpell({
            name: 'Sturdy Wall of Force',

            cost: BARRIER_COOLDOWN,
            effect: `
            You create a \\medarealong \\glossterm{wall} of magical energy within \\shortrange.
            The wall is visible as a shimmering magical field that does not block sight.
            Nothing can pass through the wall until it is destroyed.
            It has \\glossterm{hit points} equal to five times your \\glossterm{power}, and is destroyed when its hit points become negative.
          `,
            usageTime: 'elite',
            tags: ['Barrier', 'Manifestation'],
            type: 'Sustain (attunable, minor)',
          });
        },
      ],
    ],
  );
}

// TODO: vampires need coffins
function addVampires(grimoire: Grimoire) {
  // These effects are copied from the uncommon species definition
  const vampireDescription = `
    \\parhead{Creature of the Night\\sparkle} All vampires have the \\ability{creature of the night} ability.
    \\begin{magicalattuneability}{Creature of the Night}{Standard action}
      \\abilitytags \\abilitytag{Attune}
      \\rankline
      The vampire \\glossterm{shapeshifts} into the form of a Tiny bat, a Medium cloud of mist, or its normal humanoid form.
      \\begin{raggeditemize}
        \\item Bat: While in its bat form, the vampire gains \\sense{blindsense} (120 ft.) and \\sense{blindsight} (30 ft.).
          It cannot speak and has no \\glossterm{free hands}.
          All of its normal movement modes are replaced with an average fly speed with a 60 ft. height limit.
        \\item Rat: While in its rat form, the vampire gains \\trait{scent} and \\trait{low-light vision}.
          It cannot speak and has no \\glossterm{free hands}, but it has four legs, making it \\trait{quadrupedal}.
      \\end{raggeditemize}
 
      In either non-humanoid form, the vampire is unable to take any standard actions, but it can still take \\glossterm{move actions} in place of standard actions.
      Since it has no \\glossterm{walk speed} in those forms, flying does not make it \\unsteady.
      The vampire cannot use this ability while \\helpless.
      When this ability ends, the vampire does not regain its normal humanoid form until the start of its next turn.
    \\end{magicalattuneability}
 
    \\parhead{Gentle Fangs} Whenever a vampire deal damage using its bite natural weapon, it can choose not to reduce the target's hit points below 0, or it can treat the damage as \\glossterm{subdual damage}.
    In addition, damage dealt using a vampire's bite natural weapon does not wake sleeping creatures unless it inflicts a vital wound.
 
    \\parhead{Vampire Weaknesses\\sparkle}
    Vampires have a number of specific weaknesses.
    Many vampire weaknesses trigger on exposure to particular substances or circumstances.
    These weaknesses trigger immediately upon first contact, and are repeated at the start of each of the vampire's subsequent turns as long as the vampire remains exposed.
    \\begin{raggeditemize}
      \\itemhead{Blood Dependence} For every 24 hours that a vampire remains awake without ingesting at least one pint of blood, its maximum hit points are reduced by 20.
        If its maximum hit points are reduced to 0 in this way, it dies and withers away into a pile of ash.
        This penalty is removed as soon as the vampire drinks a pint of blood.
        A vampire can enter a torpor to survive without blood.
        While in a torpor, it is unconscious until it smells blood nearby.
        It can survive while in torpor for a number of consecutive centuries equal to its \\glossterm{rank} before it withers away to dust.
      \\itemhead{Consecrated Ground} A vampire in consecrated ground takes 20 damage and becomes \\dazed as a condition if it is not already dazed.
      \\itemhead{Garlic} A vampire that smells garlic becomes \\frightened by any creatures bearing garlic as a condition.
        In addition, creatures that have eaten garlic recently are treated as not having blood for the purpose of a vampire's abilities, so their blood cannot be drained.
      \\itemhead{Holy Water} A vampire that touches holy water takes 20 damage and becomes \\sickened as a condition if it is not already sickened.
      \\itemhead{Running Water} A vampire that touches or passes over running water takes 10 damage and \\briefly becomes \\helpless.
        This applies as long as the vampire is within 100 feet of the running water, even the water is underground or under a bridge.
        It can use the \\ability{struggle} ability to move despite being helpless, but only towards the closest shore.
      \\itemhead{Silver} Vampires are \\vulnerable to strikes using silver weapons.
      \\itemhead{Sunlight} A vampire that touches sunlight takes 20 damage and becomes \\blinded as a condition if it is not already blinded.
      \\itemhead{Unmirrored} Vampires have no reflection in mirrors, including their clothes and equipment.
        This can allow careful observers to identify vampires.
      \\itemhead{Wooden Stakes} If a vampire is \\glossterm{injured} by a critical strike using a wooden stake, the stake becomes impaled in its heart.
        The vampire becomes \\helpless until the stake is removed.
        A wooden stake is a \\weapontag{Light} improvised weapon that deals 1d4 damage.
    \\end{raggeditemize}
  `;

  // TODO: Vampires need more abilities so they can use their elite actions
  grimoire.addMonsterGroup(
    {
      name: 'Vampires',
      description: vampireDescription,
      sharedInitializer: (creature: Creature) => {
        creature.addVulnerability('Silver weapons');
        creature.addCustomSense('Darkvision (120 ft.)');

        const bloodDrain: CustomMonsterAbility = {
          ...getWeaponMultByRank(creature.calculateRank()),
          name: 'Blood Drain',
          weapon: 'bite' as const,
        };
        bloodDrain.effect += `
          \\injury You regain hit points equal to the hit points the target lost from the strike, ignoring negative hit points and any damage increase from critical hits.
        `;
        creature.addCustomManeuver(bloodDrain);

        // Same as Charming Gaze from Vampire class.
        creature.addCustomSpell({
          name: 'Charming Gaze',
          attack: {
            hit: `
              The target is \\charmed by you.
              Any act by you or by creatures that appear to be your allies that threatens or harms the charmed person breaks the effect.
              Harming the target is not limited to dealing it damage, but also includes causing it significant subjective discomfort.
              An observant target may interpret overt threats to its allies as a threat to itself.
            `,
            targeting: `
              Make an attack vs. Mental against all humanoid creatures and undead creatures in a \\medarea cone from you.
              You take a \\minus10 penalty to \\glossterm{accuracy} with this attack against creatures who have made an attack or been attacked since the start of your last turn.
            `,
          },
          rank: 3,
          scaling: 'double_accuracy',
          usageTime: 'elite',
          tags: ['Emotion', 'Subtle', 'Visual'],
          type: 'Sustain (minor)',
        });
      },
    },
    [
      [
        'Fledgling Vampire',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral evil',
            base_class: 'skirmisher',
            elite: true,
            creature_origin: 'undead',
            creature_types: ['humanoid'],
            level: 5,
            size: 'medium',
          });
          creature.setKnowledgeResults({
            normal: `
            Fledgling vampires are the weakest form of vampire.
            They are recently turned, and some still feel a strong attachment to their old life.
            Despite their inexperience, they still possess some of a vampire's powerful abilities, so they should not be taken lightly.
          `,
            hard: `
            Most fledgling vampires are still growing accustomed to their need for blood.
            They may attempt to fast, which weakens them, before being consumed by an uncontrollable bloodlust.
          `,
          });
          creature.setTrainedSkills(['awareness', 'intimidate']);
          creature.setBaseAttributes([3, 4, 1, 3, 3, 3]);
        },
      ],
      [
        'True Vampire',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful evil',
            base_class: 'skirmisher',
            elite: true,
            creature_origin: 'undead',
            creature_types: ['humanoid'],
            level: 10,
            size: 'medium',
          });
          creature.setKnowledgeResults({
            normal: `
              True vampires have fully awakened their vampiric potential.
              They have abandoned the world of the living and embraced their need for blood.
            `,
          });
          creature.setTrainedSkills(['awareness', 'intimidate', 'persuasion', 'social_insight']);
          creature.setBaseAttributes([5, 6, 2, 4, 4, 4]);
        },
      ],
      [
        'Vampire Lord',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful evil',
            base_class: 'skirmisher',
            elite: true,
            creature_origin: 'undead',
            creature_types: ['humanoid'],
            level: 16,
            size: 'medium',
          });
          creature.setKnowledgeResults({
            normal: `
              Vampire lords are some of the most powerful undead.
              They can command legions of followers and vast fortunes that they have developed over centuries.
            `,
          });
          creature.setTrainedSkills(['awareness', 'intimidate', 'social_insight', 'persuasion']);
          creature.setBaseAttributes([4, 6, 2, 5, 5, 5]);

          // Mostly the same as the vampire ability, but without attunement
          creature.addCustomSpell({
            name: 'Dominating Gaze',
            attack: {
              hit: `
              If the target is \\glossterm{injured} or its \\glossterm{character rank} is 5 or lower, it is \\confused as a \\glossterm{condition}.
            `,
              crit: `
                If the target was already confused from a previous use of this ability, or if they are a vampire spawn sired by the $name, the $name may make it permanently \\dominated.
                The $name can dominate any number of rank 5 or lower creatures with this ability.
                This ability has a \\glossterm{limit} of one dominated creature with a rank higher than 5.
              `,
              targeting: `
              Make an attack vs. Mental against all humanoid \\glossterm{enemies} and undead enemies within a \\medarea \\glossterm{cone} from you.
            `,
            },
            usageTime: 'elite',
            tags: ['Emotion', 'Visual'],
          });
        },
      ],
    ],
  );
}
