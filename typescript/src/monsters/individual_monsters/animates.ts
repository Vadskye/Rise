import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';

export function addAnimates(grimoire: Grimoire) {
  grimoire.addMonster('Darkwraith', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral evil',
      base_class: 'skirmisher',
      elite: true,
      creature_type: 'animate',
      level: 4,
      size: 'medium',
    });
    creature.setProperties({
      has_art: true,
    });
    creature.setKnowledgeResults({
      normal: `
        An darkwraith is a shadow disconnected from its host through strange umbramantic power.
        Its body loosely resembles a dark humanoid shape, with all details obscured.
        Despite its resemblance to a ghost, it is neither undead nor incorporeal.
        It instinctively seeks out sources of light and warmth, including most living creatures, to suppress their hated radiance.
      `,
      hard: `
        Darkwraiths bear an instinctive malevolence towards anything that brings light.
        Although they swarm around sources of warmth, they will not use damaging abilities unless provoked by light or damage.
        Darkwraiths cannot speak or make noise of any kind, though creatures around them seem to hear whispers anyway.
      `,
    });
    creature.setTrainedSkills(['awareness', 'stealth']);
    creature.setBaseAttributes([0, 5, 0, -4, 4, 4]);
    creature.addCustomMovementSpeed('Fly (average, 30 ft. limit)');
    creature.addCustomSense('Darkvision (120 ft.)');
    creature.addTrait('simple-minded');
    creature.addImmunity('Prone');
    creature.addVulnerability('Visual');
    creature.addSpell('Dark Grasp');
    creature.addSpell('Shadowstrike', { weapon: 'bite' });
    creature.addSpell('Whispers in the Dark');
  });

  grimoire.addMonster('Gelatinous Cube', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'brute',
      elite: true,
      creature_type: 'animate',
      level: 5,
      size: 'large',
    });
    creature.setProperties({
      has_art: true,
    });
    creature.setKnowledgeResults({
      normal: `
        Gelatinous cubes are gigantic green oozes that creep along underground tunnels, digesting anything organic they encounter.
        They are feared for their ability to easily snatch up smaller creatures and carry them away.
      `,
      hard: `
        When a gelatinous cube finds prey, it simply moves through the unfortunate creature, trapping it inside the ooze's body.
        Creatures engulfed in this way can find it difficult to escape while they are being slowly digested.
        Gelatinous cubes are unusually fast compared to other oozes, though they are still slow compared to most creatures.
      `,
      legendary: `
        Gelatinous cubes can climb walls, though they rarely climb high.
        If possible, they prefer to nestle into alcoves so they can drop on unsuspecting prey.
      `,
    });
    creature.setTrainedSkills(['climb', 'endurance', 'flexibility', 'stealth']);
    creature.setBaseAttributes([6, -4, 8, -10, 0, -10]);
    creature.addCustomModifier({
      numericEffects: [
        {
          modifier: -20,
          statistic: 'speed',
        },
      ],
    });
    creature.addCustomSense('Tremorsense (120 ft.)');
    creature.addCustomSense('Tremorsight (60 ft.)');
    creature.addImmunity('Critical hits');
    creature.addTrait('sightless');
    creature.addTrait('mindless');
    creature.addImmunity('Grappled');
    creature.addPassiveAbility({
      name: 'Gelatinous',
      effect: `
        The $name can move freely through spaces occupied by other creatures who do not have this ability.
      `,
    });
    creature.addPassiveAbility({
      name: 'Suspension',
      effect: `
        Anything that is \\grappled by the $name while sharing space with it is suspended within its body.
        Whenever it moves, all suspended creatures and objects automatically move with it.
      `,
    });
    creature.addCustomManeuver({
      name: 'Dissolve',
      tags: ['Acid'],
      usageTime: 'elite',
      attack: {
        targeting: `
          The $name makes a $accuracy attack vs. Fortitude against everything in its space.
        `,
        hit: '\\damageranktwo.',
        miss: 'Half damage.',
      },
    });
    creature.addCustomManeuver({
      name: 'Engulf',
      tags: ['Brawling', 'Size-Based'],
      usageTime: 'standard',
      effect: `
        The $name moves up to its speed in a straight line.
        Whenever it shares space with anything Medium or smaller during this movement, it makes a $accuracy+2 \\glossterm{brawling attack} vs. Fortitude against that creature or object.
        \\hit The target is \\grappled by the $name.
        The $name automatically controls the grapple.
      `,
    });
  });

  addAnimatedObjects(grimoire);
  addGolems(grimoire);
  addTreants(grimoire);
}

function addAnimatedObjects(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Animated Objects',
      hasArt: true,
      sharedInitializer: (creature: Creature) => {
        creature.addTrait('simple-minded');
        creature.addCustomSense('Darkvision (60 ft.)');
      },
    },
    [
      [
        'Tiny Object',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'brute',
            creature_type: 'animate',
            level: 1,
            elite: false,
            size: 'tiny',
          });
          creature.setBaseAttributes([-4, 4, -4, -8, 0, 0]);
          creature.addWeaponMult('ram');
        },
      ],
      [
        'Small Object',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'brute',
            creature_type: 'animate',
            level: 1,
            elite: false,
            size: 'small',
          });
          creature.setBaseAttributes([2, 3, 0, -8, 0, 0]);
          creature.addWeaponMult('ram');
        },
      ],
      [
        'Medium Object',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'brute',
            creature_type: 'animate',
            level: 2,
            elite: false,
            size: 'medium',
          });
          creature.setBaseAttributes([4, 2, 2, -8, 0, 0]);
          creature.addManeuver('Knockdown', { weapon: 'ram' });
        },
      ],
      [
        'Large Object',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'brute',
            creature_type: 'animate',
            level: 4,
            elite: false,
            size: 'large',
          });
          creature.setBaseAttributes([5, 1, 3, -8, 0, 0]);
          creature.addManeuver('Knockdown', { weapon: 'ram' });
        },
      ],
      [
        'Huge Object',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'brute',
            creature_type: 'animate',
            level: 7,
            elite: false,
            size: 'huge',
          });
          creature.setBaseAttributes([6, 0, 4, -8, 0, 0]);
          creature.addManeuver('Knockdown+', { weapon: 'ram' });
        },
      ],
      [
        'Gargantuan Object',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'brute',
            creature_type: 'animate',
            level: 9,
            elite: false,
            size: 'gargantuan',
          });
          creature.setBaseAttributes([7, -1, 5, -8, 0, 0]);
          creature.addManeuver('Knockdown+', { weapon: 'ram' });
        },
      ],
      [
        'Colossal Object',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'brute',
            creature_type: 'animate',
            level: 11,
            elite: false,
            size: 'colossal',
          });
          creature.setBaseAttributes([8, -2, 6, -8, 0, 0]);
          creature.addManeuver('Knockdown+', { weapon: 'ram' });
        },
      ],
    ],
  );
}

function addGolems(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Golems',
      hasArt: false,
      sharedInitializer: (creature: Creature) => {
        creature.addTrait('construct');
      },
    },
    [
      [
        'Mining Golem',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'brute',
            elite: false,
            creature_type: 'animate',
            level: 5,
            size: 'medium',
          });
          creature.setTrainedSkills([]);
          creature.setBaseAttributes([5, 3, 3, 0, 2, 0]);
          creature.addWeaponMult('pick');
          creature.addManeuver('Ground Slam', { weapon: 'pick' });
        },
      ],
      [
        'Mithral Golem',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'skirmisher',
            elite: true,
            creature_type: 'animate',
            level: 14,
            size: 'medium',
          });
          creature.addCustomModifier({
            numericEffects: [
              {
                modifier: 10,
                statistic: 'speed',
              },
            ],
          });
          creature.setBaseAttributes([6, 10, 1, 0, 6, 4]);
          creature.addWeaponMult('fists');
          // Not worth the effort to automate conversion of "make two strikes"
          creature.addCustomManeuver({
            name: 'Faster Than Sight',
            attack: {
              hit: '2d6+7 damage.',
              targeting: `
              The $name makes two melee \\glossterm{strikes}.
              If either strike hits and its attack result also hits the target's Reflex defense, the target \\glossterm{briefly} treats the $name as \\glossterm{invisible}.
            `,
            },
          });
          creature.addManeuver('Whirlwind+', { weapon: 'fists' });
          creature.addManeuver('Building Storm', { usageTime: 'elite' });
          creature.addManeuver('Flash Sweep', { usageTime: 'elite', weapon: 'fists' });
        },
      ],
      [
        'Adamantine Golem',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'warrior',
            elite: true,
            creature_type: 'animate',
            level: 17,
            size: 'medium',
          });
          creature.setTrainedSkills([]);
          creature.setBaseAttributes([10, -2, 12, 0, 6, 0]);
          creature.addPassiveAbility({
            name: 'Indestructible',
            effect: `
            The $name reduces all damage it takes by 10.
            This can reduce incoming damage to 0.
            In addition, it takes no additional damage from \\glossterm{critical hits}.
            Non-damaging effects from critical hits still function normally.
          `,
          });
          creature.addPassiveAbility({
            name: 'Unstoppable',
            effect: `
            The $name is unaffected by \\glossterm{difficult terrain} and is immune to being \\slowed.
          `,
          });

          creature.addWeaponMult('fists', { tags: ['Impact'] });
          creature.addManeuver('Steady Slam+', { tags: ['Impact'], weapon: 'fists' });
          creature.addManeuver('Brace for Impact', { usageTime: 'elite' });
          creature.addManeuver('Fortifying Force', {
            weapon: 'fists',
            tags: ['Impact'],
            usageTime: 'elite',
          });
          creature.addManeuver('Sinews of Steel', { usageTime: 'elite' });
        },
      ],
      [
        'Voidstar Golem',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'warrior',
            elite: true,
            creature_type: 'animate',
            level: 20,
            size: 'medium',
          });
          creature.setTrainedSkills([]);
          creature.addCustomMovementSpeed('Burrow (average)');
          creature.addImmunity('Earth');
          creature.addImpervious('Electricity');
          creature.addVulnerability('Acid');
          creature.setBaseAttributes([13, 2, 10, 0, 6, 10]);
          creature.addPassiveAbility({
            name: 'Crushing Gravity',
            effect: `
            All other creatures move at half speed while within a \\medarea radius \\glossterm{emanation} of the $name.
            This does not affect creatures who are moving in a straight line directly towards the $name.
            This is a \\atEarth effect.
          `,
          });
          creature.addPassiveAbility({
            name: 'Denser Than Steel',
            effect: `
            The $name can use its burrow ability to pass through solid metal and stone without reducing its speed.
          `,
          });

          creature.addWeaponMult('fists');
          creature.addManeuver('Boneshatter+', { weapon: 'fists' });
          creature.addManeuver('Chokeslam+');
          creature.addSpell('Mighty Earthspike', { usageTime: 'elite' });
          creature.addSpell('Earthquake', { usageTime: 'elite' });
          creature.addSpell('Swallowed by Earth', { usageTime: 'elite' });
          creature.addSpell('Gravity Well', { usageTime: 'elite' });
        },
      ],
    ],
  );
}

function addTreants(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Treants',
      hasArt: false,
      description: `
        All treants have the \\ability{animate tree} ability.
        \\begin{eliteability}{Animate Tree}{Elite action}
          \\rankline
          The treant animates a tree to fight by its side.
          The tree must be no larger than the treant, and it must be the same type of tree as the treant.

          The tree's combat statistics are the same as the treant's, except that the tree's \\glossterm{hit points} and \\glossterm{injury point} are halved and it cannot use \\glossterm{elite actions}.
          This ability lasts until the treant \\glossterm{dismisses} it or uses it again.
          When this ability ends, the tree sets down roots in its new location if possible.
          Treants avoid stranding trees in unsustainable locations except in desperate circumstances.
        \\end{eliteability}
      `,
      sharedInitializer: (creature: Creature) => {
        creature.addCustomMovementSpeed('Land (slow)');
        creature.setTrainedSkills(['awareness']);
        creature.addTrait('indwelt');
        creature.addVulnerability('Fire');
      },
    },
    [
      [
        'Birch Treant',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'warrior',
            elite: true,
            creature_type: 'animate',
            level: 5,
            size: 'large',
          });
          creature.setBaseAttributes([2, 0, 5, 0, 4, -2]);
          creature.setKnowledgeResults({
            normal: `
              Birch treants tend to be shy, and they try to avoid conflict if at all possible.
            `,
          });
          creature.addWeaponMult('greatclub');

          creature.addSpell('Embedded Growth', { usageTime: 'elite' });
          creature.addSpell('Tripping Vine', { usageTime: 'elite' });
        },
      ],
      [
        'Chestnut Treant',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'warrior',
            elite: true,
            creature_type: 'animate',
            level: 6,
            size: 'large',
          });
          creature.setBaseAttributes([2, 0, 6, 0, 3, 1]);
          creature.setKnowledgeResults({
            normal: `
              Chestnut treants tend to mischievous and outgoing.
              They like playing small tricks on interesting creatures that pass by.
            `,
          });
          creature.addWeaponMult('greatclub');
          creature.addManeuver('Fake Out', { weapon: 'greatclub' });

          creature.addSpell('Embedded Growth', { usageTime: 'elite' });
          creature.addSpell('Tripping Vine', { usageTime: 'elite' });
        },
      ],
      [
        'Willow Treant',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'warrior',
            elite: false,
            creature_type: 'animate',
            level: 7,
            size: 'large',
          });
          creature.setBaseAttributes([2, 3, 5, 1, 2, -2]);
          creature.setKnowledgeResults({
            normal: `
              Willow treants are the most agile treants, and they can twist and bend their bodies with surprising finesse.
              Their attitudes tend to be similarly flexible, and they can be easily persuadable.
            `,
          });

          creature.addWeaponMult('greatclub');
          creature.addManeuver('Whirlwind', { weapon: 'greatclub' });

          creature.addSpell('Embedded Growth', { usageTime: 'elite' });
          creature.addSpell('Tripping Vine', { usageTime: 'elite' });
        },
      ],
      [
        'Darkroot Treant',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral evil',
            base_class: 'warrior',
            elite: false,
            creature_type: 'animate',
            level: 8,
            size: 'large',
          });
          creature.setBaseAttributes([5, 0, 5, 1, 1, 2]);
          creature.setKnowledgeResults({
            normal: `
              Darkroot treants, unlike most other treants, primarily inhabit swamps and other grimy places.
              Their bark is mottled with fungus, and they tend to have a more sinister demeanor than most treants.
            `,
          });

          // Aftershock, but reflavored
          creature.addCustomManeuver({
            name: 'Festering Greatclub',
            weapon: 'greatclub',
            effect: `
              Make a \\glossterm{strike} with a \\minus1 accuracy penalty.
              \\hit If your attack result hits the target's Fortitude defense, the target festers.
              A festering creature takes \\damagerankone during your next action.
            `,
          });
          creature.addWeaponMult('greatclub');

          creature.addSpell('Blight', { usageTime: 'elite' });
          creature.addSpell('Poison -- Wolfsbane', { usageTime: 'elite' });
        },
      ],
      [
        'Pine Treant',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral good',
            base_class: 'warrior',
            elite: false,
            creature_type: 'animate',
            level: 9,
            size: 'huge',
          });
          creature.setBaseAttributes([4, -2, 8, 2, 1, 4]);
          creature.setKnowledgeResults({
            normal: `
              Pine treants tend to be the most steadfast treants.
              They are strong-willed, like oak trees.
              However, while oak treants are stubborn, pine treants are resolutely benevolent, sheltering all who need aid.
            `,
          });
          creature.addCustomModifier({
            numericEffects: [{ modifier: 2, statistic: 'armor_defense' }],
          });

          creature.addWeaponMult('greatclub');
          creature.addManeuver('Prepared Defense', { weapon: 'greatclub' });

          creature.addSpell('Embedded Growth', { usageTime: 'elite' });
          creature.addSpell('Wall of Thorns', { usageTime: 'elite' });
          creature.addSpell('Vineward', { usageTime: 'elite' });
        },
      ],
      [
        'Oak Treant',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'warrior',
            elite: false,
            creature_type: 'animate',
            level: 10,
            size: 'huge',
          });
          creature.setBaseAttributes([5, -2, 7, 0, 0, 5]);
          creature.setKnowledgeResults({
            normal: `
              Oak treants tend to be the most stubborn treants.
              They brook no guff from wayward adventurers.
            `,
          });
          creature.addCustomModifier({
            numericEffects: [{ modifier: 2, statistic: 'armor_defense' }],
          });

          creature.addWeaponMult('greatclub');
          creature.addManeuver('Boneshatter', { weapon: 'greatclub' });

          creature.addSpell('Embedded Growth', { usageTime: 'elite' });
          creature.addSpell('Entangle', { usageTime: 'elite' });
          creature.addSpell('Treeclub', { usageTime: 'elite' });
        },
      ],
      [
        'Cyprus Treant',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'warrior',
            elite: false,
            creature_type: 'animate',
            level: 11,
            size: 'huge',
          });
          creature.setBaseAttributes([6, -2, 8, 0, 1, 2]);
          creature.setKnowledgeResults({
            normal: `
              Cyprus treants are the most durable treants.
              They are virtually indestructible, and are fearsome when roused to anger.
            `,
          });
          creature.addCustomModifier({
            numericEffects: [{ modifier: 2, statistic: 'armor_defense' }],
          });

          creature.addWeaponMult('greatclub');
          creature.addManeuver('Prepared Defense', { weapon: 'greatclub' });

          creature.addSpell('Embedded Growth', { usageTime: 'elite' });
          creature.addSpell('Entangle', { usageTime: 'elite' });
          creature.addSpell('Mass Vineward', { usageTime: 'elite' });
        },
      ],
    ],
  );
}
