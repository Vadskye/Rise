import { Grimoire } from '@src/monsters/grimoire';
import { Creature, CustomMonsterAbility } from '@src/character_sheet/creature';
import { getWeaponMultByRank } from '@src/abilities/combat_styles';
import { BARRIER_COOLDOWN, CONDITION_CRIT } from '@src/abilities/constants';

export function addUndead(grimoire: Grimoire) {
  grimoire.addMonster('Corpsetree', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral evil',
      base_class: 'warrior',
      elite: true,
      creature_type: 'undead',
      level: 8,
      size: 'huge',
    });
    creature.setKnowledgeResults({
      normal: `
        A corpsetree's body is a mixture of rotting flesh and wood.
        When fresh corpses are left to rot near a dying tree, their lingering soul energy can merge with the tree to create a corpsetree.
      `,
    });
    creature.setTrainedSkills(['awareness']);
    creature.setBaseAttributes([7, -2, 5, -5, 2, 2]);
    creature.addTrait('plant');

    creature.addWeaponMult('fists');
    creature.addGrapplingStrike('fists');
    creature.addSpell('Circle of Death', { usageTime: 'elite' });
    creature.addSpell('Embedded Growth', { usageTime: 'elite' });
    creature.addSpell('Corpse Explosion', { usageTime: 'elite' });
  });

  grimoire.addMonster('Corpsemound', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral evil',
      base_class: 'brute',
      elite: true,
      creature_type: 'undead',
      level: 8,
      size: 'large',
    });
    creature.addTrait('mindless');
    creature.setBaseAttributes([6, -2, 6, -5, 2, 2]);
    creature.setKnowledgeResults({
      normal: `
        A corpsemound is a Large undead amalgation of many corpses.
        It resembles a pile of bodies.
        The bodies push, drag, and roll the mound towards anything living.
      `,
    });
    // Same as trample from juggernaut
    creature.addCustomManeuver({
      name: 'Trample',
      attack: {
        hit: '\\damagerankthree.',
        missGlance: true,
        targeting: `
          Move up to your speed in a straight line.
          Then, make a \\glossterm{brawling attack} vs. Brawn against each creature whose space you moved through in this way.
        `,
      },
      tags: ['Brawling', 'Size-Based'],
    });
    creature.addWeaponMult('fists');

    creature.addCustomManeuver({
      name: 'Fling Corpse',
      attack: {
        hit: '\\damagerankthree.',
        targeting: `
          The $name throws a zombie mauler from its body.
          Make an attack vs. Armor against something within \\shortrange.
          Whether the attack hits or misses, the mauler takes damage as if it was hit by the attack, and then acts independently afterwards.
        `,
      },
    });
    creature.addManeuver('Mighty Stomp', { usageTime: 'elite' });
  });

  addFleshwrought(grimoire);
  addGhosts(grimoire);
  addGhouls(grimoire);
  addHalfsouls(grimoire);
  addLiches(grimoire);
  addSkeletons(grimoire);
  addVampires(grimoire);
  addZombies(grimoire);
}

function addFleshwrought(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Fleshwrought',
      knowledge: {
        normal: `
          Some necromancers use mechanical augmentations to compensate for the weaknesses of the flesh.
          The creatures resulting from these twisted experiments are called fleshwrought.
          They are undead, but they have inorganic matter incorporated directly into their body.
        `,
      },
    },
    [
      [
        'Fleshwrought Spiker',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral evil',
            base_class: 'brute',
            elite: true,
            creature_type: 'undead',
            level: 16,
            size: 'large',
          });
          creature.setBaseAttributes([8, 4, 6, -4, 2, 0]);
          creature.addWeaponMult('spike');
          creature.addGrapplingStrike('spike');
          creature.addManeuver('Piledriver+', { displayName: 'Impale' });
          creature.addManeuver('Anklebreaker', { weapon: 'spike' });
          // TODO: unclear EA
          creature.addCustomManeuver({
            name: 'Rotting Stench',
            attack: {
              // Explicitly mark no crit to avoid lint warnings
              crit: null,
              hit: `
              The target feels sick as a \\glossterm{condition}.
              The next time it becomes \\glossterm{injured}, it must spend a standard action vomiting.
              After it does, it removes all instances of this condition.
            `,
              targeting: `
              Make an attack vs. Fortitude against all adjacent living creatures.
            `,
            },
            usageTime: 'elite',
          });
        },
      ],
      [
        'Fleshwrought Slicer',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral evil',
            base_class: 'warrior',
            elite: false,
            creature_type: 'undead',
            level: 8,
            size: 'medium',
          });
          creature.setTrainedSkills([]);
          creature.setBaseAttributes([4, 5, 0, -4, 1, 0]);
          creature.addManeuver('Spinning Steel', { weapon: 'claws' });
          creature.addManeuver('Strip the Flesh', { weapon: 'claws' });
          creature.addManeuver('Rend the Hide', { weapon: 'claws' });
        },
      ],
    ],
  );
}

function addGhosts(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Ghosts',
      knowledge: {
        normal: `
          Ghosts are the souls of deceased creatures that linger after death instead of proceeding to their proper afterlife.
        `,
        hard: `
          Some ghosts can be appeased peacefully if the reason they refused to pass on is addressed.
          Others can only be banished by force.
          Although ghosts do not fear cold, they are strongly affected by fire.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        creature.addTrait('ghost');
        creature.addCustomSense('Darkvision (90 ft.)');
        creature.addCustomMovementSpeed('Fly (average, 30 ft. limit)');
      },
    },
    [
      [
        'Allip',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral evil',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'undead',
            level: 4,
            size: 'medium',
          });
          creature.setProperties({
            has_art: true,
          });
          creature.setKnowledgeResults({
            normal: `
              Allips are incorporeal ghost-like creatures.
              They cannot speak intelligibly, but they are known for their propensity for babbling incoherently as they attack.
            `,
            hard: `
              An allip is the spectral remains of someone driven to suicide by madness.
              It craves only revenge and unrelentingly pursues those that it believes tormented it in life.
              This belief may or may not have any basis in reality.
            `,
          });
          creature.setTrainedSkills(['awareness', 'stealth']);
          // TODO: should allips have any defined Strength attribute?
          creature.setBaseAttributes([-9, 3, 0, -2, -2, 6]);
          creature.addCustomSense('Darkvision (60 ft.)');
          creature.addCustomSense('Lifesense (120 ft.)');
          creature.addSpell('Inflict Wound');
        },
      ],
      [
        'Macabre Mourner',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral evil',
            base_class: 'skirmisher',
            elite: true,
            creature_type: 'undead',
            level: 5,
            size: 'large',
          });
          // TODO: awkward wording
          creature.setKnowledgeResults({
            normal: `
              A macabre mourner is a Large ghost.
              When a great many people mourn at once, and the creature they mourn was not buried properly, the strength of their feeling can trap the soul of the creature they mourn.
            `,
          });
          creature.setTrainedSkills(['awareness', 'intimidate']);
          creature.addVulnerability('Auditory');
          creature.addVulnerability('Emotion');
          creature.setBaseAttributes([0, 0, -2, -4, 2, 4]);
          creature.addCustomSpell({
            name: 'Mournful Howl',
            attack: {
              hit: '\\damagerankone.',
              targeting: `
                Make an attack vs. Mental against all creatures within a \\medarea radius from you.
                You gain a \\plus4 accuracy bonus if you or any creature in the area suffered an \\glossterm{injury} last round.
              `,
            },
            tags: ['Auditory'],
            usageTime: 'elite',
          });
          creature.addCustomSpell({
            name: 'Toll the Dead',
            attack: {
              crit: CONDITION_CRIT,
              hit: `
                As a \\glossterm{condition}, the target takes \\damagerankone whenever it deals damage.
              `,
              targeting: `
                Make an attack vs. Mental against one creature within \\medrange.
                You gain a \\plus4 accuracy bonus if the target has killed a living creature within the last 24 hours.
              `,
            },
          });
        },
      ],
      [
        'Tetherghast',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral evil',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'undead',
            level: 14,
            size: 'medium',
          });
          creature.setKnowledgeResults({
            normal: `
              A tetherghast is a ghost formed by a creature who died while bound and trying desperately to escape.
            `,
          });
          creature.setBaseAttributes([0, 8, -2, -4, 2, 6]);
          creature.addCustomSpell({
            name: 'Entangling Cords',
            attack: {
              hit: `
                \\damagerankfour, and the target is \\glossterm{briefly} \\slowed.
              `,
              targeting: `
                Make an attack vs. Brawn against one creature within \\medrange.
              `,
            },
            rank: 5,
            tags: ['Manifestation'],
          }),
          creature.addSpell('Garotte')
        },
      ],
    ],
  );
}

function addGhouls(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      hasArt: true,
      name: 'Ghouls',
      knowledge: {
        normal: `
          Ghouls are undead creatures that hunger for the flesh of the living.
          Their bodies are emaciated and desiccated, with no blood or fluids remaining.
          Although they are sometimes confused with zombies, ghouls are faster and smarter than their lesser kin.
        `,
        hard: `
          Ghouls can lay simple ambushes, but lack the capacity for complex traps or schemes.
          They are commmonly found in the service of vampires.
          As natural servants, ghouls are weak-willed despite their combat acumen.
        `,
        legendary: `
          Vampires can create new ghouls by fully draining a creature's blood shortly after death.
          Necromancers can achieve the same ends with a ritual.
          In either case, the newly created ghoul owes its creator no allegiance unless compelled to do so, making the process dangerous for the unprepared.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        creature.addVulnerability('Compulsion');
        creature.addVulnerability('Emotion');
        creature.addCustomSense('Darkvision (60 ft.)');
      },
    },
    [
      [
        'Drudge Ghoul',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral evil',
            base_class: 'skirmisher',
            elite: false,
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
        },
      ],
      [
        'True Ghoul',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral evil',
            base_class: 'skirmisher',
            elite: false,
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
        },
      ],
    ],
  );
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
        creature.addImpervious('Emotion');
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
            creature_type: 'undead',
            level: 15,
            size: 'medium',
          });
          creature.setTrainedSkills(['awareness', 'knowledge_arcana']);
          creature.setBaseAttributes([-1, 4, 1, 6, 5, 7]);
          // Proprioception
          creature.addCustomSense('Blindsense (60 ft.)');
          creature.addCustomSense('Blindsight (15 ft.)');

          // Damaging effects are standard action, debuffs are elite
          creature.addSpell('Neck Snap');
          creature.addSpell('Mighty Compression');
          creature.addSpell('Kinetic Cudgel', { usageTime: 'elite' });
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
            type: 'Sustain (attuneable, minor)',
          });
        },
      ],
    ],
  );
}

function addLiches(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Liches',
      description: `
        \\parhead{Phylactery \\sparkle} Every lich contains their soul in their phylactery.
          Most phylacteries are valuable gems, but other objects are possible.
          A phylactery must be at least Tiny in size.

          Liches can commune with their phylacteries to allow their souls to temporarily inhabit their bodies.
          This allows their soul to process the memories stored in their body, allowing the lich to improve its skills and change its mind.
          A lich that never communes with its phylactery suffers no direct consequences, but is also incapable of increasing its personal power.

          When a lich dies, the phylactery creates a new body for the lich after 24 hours.
          The new body has no memory of what happened to the original body since the last time the lich communed with its phylactery.
      `,
      knowledge: {
        normal: `
          A lich is an undead creature that intentionally severed its soul from its body and placed the soul in a vessel called a phylactery.
          As long as its phylactery survives, a lich cannot be fully destroyed.
          Becoming a lich requires horrific acts of violence, and even researching the process is generally illegal.
        `,
        hard: `
          Because the normal body of a lich is soulless, it is incapable of growing or changing its mind.
          Liches must commune with their phylactery to truly learn and develop their skills.
          However, they must also keep their phylactery safely protected, since keeping it on their body means it could easily be destroyed if they die.
          Each lich must resolve this dangerous contradiction in their own way.
        `,
        legendary: `
          The body of a lich is not completely soulless.
          A tiny soul splinter inhabits the body, binding it to the phylactery.
          It provides the body no animating force, but the soul splinter returns to the phylactery when the lich's body is destroyed.
          The return of that soul splinter prompts the phylactery to inhabit a new body.
        `,
      },
      sharedInitializer: (creature) => {
        creature.addTrait('soulless');
      },
    },
    [
      [
        'Okonlok, Astral Lich',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'sniper',
            elite: true,
            creature_type: 'undead',
            level: 17,
            size: 'medium',
          });
          creature.setTrainedSkills([
            'awareness',
            'deduction',
            'craft_bone',
            'knowledge_arcana',
            'knowledge_souls',
          ]);
          creature.setBaseAttributes([-2, 5, 2, 5, 8, 10]);
          creature.setKnowledgeResults({
            hard: `
              Okonlok learned how to become a lich on a long interplanar quest for power.
            `,
          });

          creature.addSpell('Planar Jaunt -- Myriad');
          creature.addSpell('Massive Astral Rupture');
          creature.addSpell('Distant Splicing Grasp');
          creature.addSpell('Giant Twinned Portals', { usageTime: 'elite' });
          creature.addSpell('Dimension Door', { usageTime: 'elite' });
          creature.addSpell('Banishment', { usageTime: 'elite' });
          creature.addSpell('Hostile Transposition', { usageTime: 'elite' });
        },
      ],
    ],
  );
}

function addSkeletons(grimoire: Grimoire) {
  const requiredProperties = {
    alignment: 'neutral evil',
    elite: false,
    creature_type: 'undead',
  } as const;

  grimoire.addMonsterGroup(
    {
      name: 'Skeletons',
      hasArt: true,
      knowledge: {
        easy: `
          Skeletons are the reanimated corpses of once-living creatures.
          They are the most basic form of animated undead, since they can be created from corpses that have been reduced to mere bones.
          Creating a skeleton is generally regarded as an evil act.
        `,
        normal: `
          Skeletons retain none of the specific physical or magical abilities of the original creature.
          They are capable of using armor and weapons, and have a minimal degree of self-preservation, but they lack any understanding of tactics.

          Skeletons are sometimes created naturally near areas of recent mass death, such as battlefields where the corpses were not removed.
        `,
        legendary: `
          Creating a skeleton from a corpse requires splintering the soul of the creature the corpse belonged to.
          The soul splinter created this way is used to give the skeleton its agency.
          This is painful for the dead creature in its afterlife.
          The more powerful the soul, the more powerful the corresponding skeleton.

          Creating a skeleton requires a larger soul splinter than creating a zombie.
          This larger splinter compensates for the greater decay of the corpse and grants skeletons a slightly greater effective intelligence.
          However, skeletons still retain none of the original creature's personality.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        creature.addTrait('simple-minded');
      },
    },
    [
      [
        'Bones',
        (creature) => {
          creature.setRequiredProperties({
            ...requiredProperties,
            base_class: 'skirmisher',
            level: 1,
            size: 'medium',
          });
          creature.setBaseAttributes([3, 3, 0, -8, 0, 0]);
          creature.addWeaponMult('claws');
        },
      ],
      [
        'Fallen Soldier',
        (creature) => {
          creature.setRequiredProperties({
            ...requiredProperties,
            base_class: 'warrior',
            level: 2,
            size: 'medium',
          });
          creature.setBaseAttributes([3, 3, 0, -8, 0, 0]);
          creature.setEquippedArmor({
            bodyArmor: 'leather lamellar',
            shield: 'standard shield',
          });
          creature.addWeaponMult('spear');
        },
      ],
      [
        'Skeleton Archer',
        (creature) => {
          creature.setRequiredProperties({
            ...requiredProperties,
            base_class: 'sniper',
            level: 3,
            size: 'medium',
          });
          creature.setBaseAttributes([3, 3, 0, -7, 2, 0]);
          creature.setEquippedArmor({
            bodyArmor: 'leather lamellar',
          });
          creature.addWeaponMult('longbow');
        },
      ],
      [
        'Bone Knight',
        (creature) => {
          creature.setRequiredProperties({
            ...requiredProperties,
            base_class: 'warrior',
            level: 5,
            size: 'large',
          });
          creature.setKnowledgeResults({
            normal: `
            A bone knight is a fusion of horse and rider, reanimated as a single skeleton.
            The rider wields its lance as if mounted, but the two cannot be separated without death.
          `,
          });
          creature.setBaseAttributes([4, 4, 0, -7, 2, 0]);
          creature.setEquippedArmor({
            bodyArmor: 'scale',
            shield: 'standard shield',
          });
          creature.addWeaponMult('lance');
          creature.addManeuver('Rushdown', { weapon: 'lance' });
        },
      ],
      [
        'Fallen Hero',
        (creature) => {
          creature.setRequiredProperties({
            ...requiredProperties,
            base_class: 'warrior',
            level: 7,
            size: 'medium',
          });
          creature.setBaseAttributes([5, 5, 0, -7, 2, 0]);
          creature.setEquippedArmor({
            bodyArmor: 'scale',
            shield: 'standard shield',
          });
          creature.addWeaponMult('battleaxe');
          creature.addWeaponMult('javelin');
        },
      ],
      [
        'Skeleton Sniper',
        (creature) => {
          creature.setRequiredProperties({
            ...requiredProperties,
            base_class: 'sniper',
            level: 10,
            size: 'medium',
          });
          creature.setBaseAttributes([4, 5, 0, -7, 5, 0]);
          creature.setEquippedArmor({
            bodyArmor: 'leather lamellar',
          });
          creature.addWeaponMult('longbow');
          creature.addManeuver('Distant Shot', { weapon: 'longbow' });
          creature.addManeuver('Armorpiercer', { weapon: 'longbow' });
        },
      ],
    ],
  );
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
        \\item Bat: While in its bat form, the vampire gains \\sense{blindsense} (120 ft.) and \\sense{blindsight} (30 ft.).
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
    These weaknesses trigger immediately upon first contact, and are repeated at the start of each \\glossterm{action phase} in subsequent rounds as long as the vampire remains exposed.
    \\begin{raggeditemize}
      \\itemhead{Blood Dependence} For every 24 hours that a vampire remains awake without ingesting at least one pint of blood from living creatures, its maximum hit points are reduced by 20.
        If its maximum hit points are reduced to 0 in this way, it dies and withers away into a pile of ash.
        This penalty is removed as soon as the vampire drinks a pint of blood.
        A vampire can enter a torpor to survive without blood.
        While in a torpor, it is unconscious until it smells blood nearby.
        It can survive while in torpor for a number of consecutive centuries equal to its \\glossterm{rank} before it withers away to dust.
      \\itemhead{Consecrated Ground} A vampire in consecrated ground takes 20 damage and becomes \\stunned as a condition if it is not already stunned.
      \\itemhead{Garlic} A vampire that smells garlic becomes \\frightened by any creatures bearing garlic as a condition.
        In addition, creatures that have eaten garlic recently are treated as not having blood for the purpose of a vampire's abilities, so their blood cannot be drained.
      \\itemhead{Holy Water} A vampire that touches holy water takes 20 damage and becomes \\stunned as a condition if it is not already stunned.
      \\itemhead{Running Water} A vampire that touches or passes over running water takes 10 damage and \\glossterm{briefly} becomes \\paralyzed.
        This applies as long as the vampire is within 100 feet of the running water, even the water is underground or under a bridge.
        It can use the \\ability{struggle} ability to move despite being paralyzed, but only towards the closest shore.
      \\itemhead{Silver} Vampires are \\vulnerable to strikes using silver weapons.
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
      name: 'Vampires',
      description: vampireDescription,
      sharedInitializer: (creature: Creature) => {
        creature.addTrait('humanoid');
        creature.addVulnerability('Silver weapons');
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
              You take a \\minus10 penalty to \\glossterm{accuracy} with this attack against creatures who have made an attack or been attacked since the start of the last round.
            `,
          },
          rank: 3,
          scaling: 'double_accuracy',
          usageTime: 'elite',
          tags: ['Emotion', 'Subtle', 'Sustain (minor)', 'Visual'],
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
        },
      ],
      [
        'True Vampire',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful evil',
            base_class: 'skirmisher',
            elite: true,
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
        },
      ],
      [
        'Vampire Lord',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful evil',
            base_class: 'skirmisher',
            elite: true,
            creature_type: 'undead',
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
              If the target was already confused from a previous use of this ability, the $name may make it permanently \\dominated.
              The $name can dominate any number of rank 5 or lower creatures with this ability, but only one creature at a time with a rank higher than that.
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

function addZombies(grimoire: Grimoire) {
  const requiredProperties = {
    alignment: 'neutral evil',
    base_class: 'brute',
    elite: false,
    creature_type: 'undead',
  } as const;

  grimoire.addMonsterGroup(
    {
      name: 'Zombies',
      knowledge: {
        easy: `
          Zombies are the reanimated corpses of once-living creatures.
          They must be created from corpses that still retain most of their organs and internal structure.
          Creating a zombie is generally regarded as an evil act.
        `,
        normal: `
          Zombies retain the raw strength of the original creature, but lose all special abilities.
          They are mindless, relentless, and incapable of tactics or tool usage.
          Instead of using weapons, they try to grab and bite their enemies.
          They have a relentless hunger for flesh, though consuming it brings them no relief.

          Zombies are sometimes created naturally near areas of recent mass death, such as battlefields where the corpses were not removed.
        `,
        legendary: `
          Creating a zombie from a corpse requires splintering the soul of the creature the corpse belonged to.
          The soul splinter created this way is used to give the zombie its limited agency.
          This is painful for the dead creature in its afterlife.
          The more powerful the soul, the more powerful the corresponding zombie.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        creature.addCustomSense('Darkvision (60 ft.)');
        creature.addTrait('mindless');
        creature.addManeuver('Grapple');
        creature.addWeaponMult('bite');
      },
    },
    [
      [
        'Shambler',
        (creature) => {
          creature.setRequiredProperties({
            ...requiredProperties,
            level: 1,
            size: 'medium',
          });
          creature.setBaseAttributes([4, -2, 5, 0, -2, 0]);
        },
      ],
      [
        'Walker',
        (creature) => {
          creature.setRequiredProperties({
            ...requiredProperties,
            level: 3,
            size: 'medium',
          });
          creature.setBaseAttributes([5, -2, 6, 0, -2, 0]);
        },
      ],
      [
        'Mauler',
        (creature) => {
          creature.setRequiredProperties({
            ...requiredProperties,
            level: 6,
            size: 'medium',
          });
          creature.setBaseAttributes([6, -2, 7, 0, -2, 0]);
        },
      ],
      [
        'Hulk',
        (creature) => {
          creature.setRequiredProperties({
            ...requiredProperties,
            level: 9,
            size: 'medium',
          });
          creature.setBaseAttributes([7, -2, 8, 0, -2, 0]);
        },
      ],
    ],
  );
}
