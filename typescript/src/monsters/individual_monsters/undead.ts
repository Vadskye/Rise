import { Grimoire } from '@src/monsters/grimoire';
import { Creature, CustomMonsterAbility } from '@src/character_sheet/creature';
import { getWeaponMultByRank } from '@src/abilities/combat_styles';

export function addUndead(grimoire: Grimoire) {
  grimoire.addMonster('Allip', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral evil',
      base_class: 'skirmisher',
      challenge_rating: 1,
      creature_type: 'undead',
      level: 4,
      size: 'medium',
    });
    creature.setProperties({
      has_art: true,
    });
    creature.setKnowledgeResults({
      easy: `
        Allips are incorporeal ghost-like creatures.
        They cannot speak intelligibly, but they are known for their propensity for babbling incoherently as they attack.
      `,
      normal: `
        An allip is the spectral remains of someone driven to suicide by madness.
        It craves only revenge and unrelentingly pursues those that it believes tormented it in life.
        This belief may or may not have any basis in reality.
      `,
    });
    creature.setTrainedSkills(['awareness', 'stealth']);
    creature.setBaseAttributes([0, 3, 0, -2, -2, 6]);
    creature.addCustomMovementSpeed('Fly (normal)');
    creature.addCustomSense('Darkvision (60 ft.)');
    creature.addCustomSense('Lifesense (120 ft.)');
    creature.addTrait('Incorporeal');
    creature.addSpell('Inflict Wound');
  });

  grimoire.addMonsterGroup(
    {
      hasArt: true,
      name: "Ghouls",
      knowledge: {
        normal: `
          Ghouls are undead creatures that hunger for the flesh of the living.
          Their bodies are emaciated and desiccated, with no blood or fluids remaining.
          Although they are sometimes confused with zombies, ghouls are faster and smarter than their lesser kin.
        `,
        hard: `
          Ghouls can lay simple ambushes, but lack the capacity for complex traps or schemes.
          They are commmonly found in the service of vampires, who can create new ghouls by draining the blood of their victims completely.
          As natural servants, ghouls are weak-willed despite their combat acumen.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        creature.addVulnerability('Compulsion');
        creature.addVulnerability('Emotion');
        creature.addCustomSense('Darkvision (60 ft.)');
      },
    },
    [
      ['Drudge Ghoul', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral evil',
          base_class: 'skirmisher',
          challenge_rating: 3,
          creature_type: 'undead',
          level: 3,
          size: 'medium',
        });
        creature.setKnowledgeResults({
          normal: `
            Drudge ghouls are the weakest form of ghoul.
            They are typically made from incomplete corpses or partially botched rituals that failed to create a true ghoul.
          `,
        });
        creature.setBaseAttributes([4, 4, 0, -4, 1, -2]);
        creature.addManeuver('Strip the Flesh', { weapon: 'bite' });
        creature.addWeaponMult('bite');
      }],
      ['True Ghoul', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral evil',
          base_class: 'skirmisher',
          challenge_rating: 6,
          creature_type: 'undead',
          level: 6,
          size: 'medium',
        });
        creature.setKnowledgeResults({
          normal: `
            True ghouls are the most common form of ghoul.
          `,
        });
        creature.setBaseAttributes([5, 5, 1, -3, 1, 0]);
        creature.addManeuver('Strip the Flesh', { weapon: 'bite' });
        creature.addWeaponMult('bite');
      }],
    ]
  );

  addVampires(grimoire);
  // TODO: We can't add skeletons or zombies until we add humanoids
}

function addVampires(grimoire: Grimoire) {

  // These effects are copied from the uncommon species definition
  const vampireDescription = `
    \\parhead{Creature of the Night\\sparkle} All vampires have the \\ability{creature of the night} ability.
    \\begin{magicalattuneability}{Creature of the Night}{Standard action}
      \\abilitytags \\abilitytag{Attune}
      \\rankline
      The vampire \\glossterm{shapeshifts} into the form of a Tiny bat, a Medium cloud of mist, or its normal humanoid form.
      \\begin{raggeditemize}
        \\item Bat: While in its bat form, the vampire gains \\trait{blindsense} (120 ft.) and \\trait{blindsight} (30 ft.).
          It cannot speak and has no \\glossterm{free hands}.
          All of its normal movement modes are replaced with an average fly speed with a 60 ft. height limit.
        \\item Mist: While in its mist form, the vampire becomes \\trait{floating}, \\trait{intangible}, and \\trait{legless}.
          It cannot speak and has no \\glossterm{free hands}.
          All of its normal movement modes are replaced with a slow \\glossterm{fly speed} with a 30 foot \\glossterm{height limit}.
      \\end{raggeditemize}

      In either non-humanoid form, the vampire is unable to take any standard actions, but it can still take \\glossterm{move actions} in place of standard actions.
      Since it has no \\glossterm{walk speed} in those forms, flying does not make it \\unsteady.
      The vampire cannot use this ability while \\paralyzed.
    \\end{magicalattuneability}

    \\parhead{Gentle Fangs} Whenever a vampire deal damage using its bite natural weapon, it can choose not to reduce the target's hit points below 0, or it can treat the damage as \\glossterm{subdual damage}.
    In addition, damage dealt using a vampire's bite natural weapon does not wake sleeping creatures unless it inflicts a vital wound.

    \\parhead{Vampire Weaknesses\\sparkle}
    Vampires have a number of specific weaknesses.
    Many vampire weaknesses trigger on exposure to particular substances or circumstances.
    These weaknesses trigger immediately upon first contact, and are repeated at the start of each \\glossterm{action phase} in subsequent rounds.
    \\begin{raggeditemize}
      \\itemhead{Blood Dependence} For every 24 hours that a vampire remains awake without ingesting at least one pint of blood from living creatures, its maximum hit points are reduced by 20.
        If its maximum hit points are reduced to 0 in this way, it dies and withers away into a pile of ash.
        This penalty is removed as soon as the vampire drinks a pint of blood.
        A vampire can can enter a torpor to survive without blood.
        While in a torpor, it is unconscious until it smells blood nearby.
        It can survive while in torpor for a number of consecutive centuries equal to its \\glossterm{rank} before it withers away to dust.
      \\itemhead{Consecrated Ground} A vampire in consecrated ground takes 20 damage and becomes \\stunned as a condition if it is not already stunned.
      \\itemhead{Garlic} A vampire that smells garlic becomes \\frightened by any creatures bearing garlic as a condition.
        In addition, creatures that have eaten garlic recently are treated as not having blood for the purpose of a vampire's abilities, so their blood cannot be drained.
      \\itemhead{Holy Water} A vampire that touches holy water takes 20 damage and becomes \\stunned as a condition if it is not already stunned.
      \\itemhead{Running Water} A vampire that touches or passes over running water takes 10 damage and \\glossterm{briefly} becomes \\paralyzed.
        This applies as long as the vampire is within 100 feet of the running water, even the water is underground or under a bridge.
        It can use the \\ability{struggle} ability to move despite being paralyzed, but only towards the closest shore.
      \\itemhead{Silver} Vampires are \\vulnerable to strikes using silvered weapons.
      \\itemhead{Sunlight} A vampire that touches sunlight takes 20 damage and becomes \\blinded as a condition if it is not already blinded.
      \\itemhead{Unmirrored} Vampires have no reflection in mirrors, including their clothes and equipment.
        This can allow careful observers to identify vampires.
      \\itemhead{Wooden Stakes} If a vampire is \\glossterm{injured} by a critical strike using a wooden stake, the stake becomes impaled in its heart.
        The vampire becomes \\paralyzed until the stake is removed.
        A wooden stake is a \\weapontag{Light} improvised weapon that deals 1d4 damage.
    \\end{raggeditemize}
  `;

  // TODO: Vampires need more abilities so they can use their elite actions
  grimoire.addMonsterGroup(
    {
      name: "Vampires",
      description: vampireDescription,
      sharedInitializer: (creature: Creature) => {
        creature.addVulnerability('Silvered weapons');
        creature.addCustomSense('Darkvision (120 ft.)');

        const bloodDrain: CustomMonsterAbility = {
          ...getWeaponMultByRank(creature.calculateRank()),
          name: 'Blood Drain',
          weapon: 'bite' as const,
        };
        bloodDrain.effect += `
          \\injury You regain hit points at the end of the round equal to the hit points the target lost from the strike, ignoring negative hit points and any damage increase from critical hits.
        `;
        creature.addCustomManeuver(bloodDrain);

        // Same as Charming Gaze from Vampire class, except that we don't include accuracy
        // scaling because it's annoying to implement.
        // TODO: add accuracy scaling.
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
              Make an attack vs. Mental against all humanoid creatures in a \\medarea cone from you.
              You take a \\minus10 penalty to \\glossterm{accuracy} with this attack against creatures who have made an attack or been attacked since the start of the last round.
            `,
          },
          usageTime: 'elite',
          tags: ['Emotion', 'Subtle', 'Sustain (minor)', 'Visual'],
        });
      }
    },
    [
      ['Fledgling Vampire', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral evil',
          base_class: 'skirmisher',
          challenge_rating: 5,
          creature_type: 'undead',
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
      }],
      ['True Vampire', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'lawful evil',
          base_class: 'skirmisher',
          challenge_rating: 4,
          creature_type: 'undead',
          level: 10,
          size: 'medium',
        });
        creature.setKnowledgeResults({
          normal: `
            True vampires have fully awakened their vampiric potential.
            They have abandoned the world of the living and embraced their need for blood.
          `,
        });
        creature.setTrainedSkills(['awareness', 'intimidate', 'social_insight', 'persuasion']);
        creature.setBaseAttributes([5, 6, 2, 4, 4, 4]);
      }],
      ['Vampire Lord', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'lawful evil',
          base_class: 'skirmisher',
          challenge_rating: 4,
          creature_type: 'undead',
          level: 15,
          size: 'medium',
        });
        creature.setKnowledgeResults({
          normal: `
            Vampire lords are one of the most powerful types of undead.
            They can command legions of followers and vast fortunes that they have developed over centuries.
          `,
        });
        creature.setTrainedSkills(['awareness', 'intimidate', 'social_insight', 'persuasion']);
        creature.setBaseAttributes([4, 6, 2, 5, 5, 5]);
      }],
    ]
  );
}
