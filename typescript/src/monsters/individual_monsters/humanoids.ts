import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';

export function addHumanoids(grimoire: Grimoire) {
  grimoire.addMonster('Choker', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'chaotic evil',
      base_class: 'brute',
      elite: false,
      creature_type: 'mortal',
      level: 4,
      size: 'medium',
    });
    creature.setProperties({ has_art: true });
    creature.setKnowledgeResults({
      normal: `
        A choker is a vicious predator that delights in strangling its foes.
        Chokers are bipedal, but their arms are inhumanly long and sinuous, terminating in hands with spiny pads to help them hold on tightly to walls and foes.
        They live to hear the desperate gasping for breath and crunching of bones that their powerful arms can inflict on their prey.
      `,
    });
    creature.addTrait('humanoid');
    creature.setTrainedSkills(['awareness', 'climb', 'stealth']);
    creature.addCustomSense('Darkvision (60 ft.)');
    creature.addCustomMovementSpeed('Climb (slow)');
    creature.setBaseAttributes([5, 4, -1, -4, 0, -1]);
    creature.addGrapplingStrike('tentacle');
    creature.addManeuver('Piledriver', { displayName: 'Choke' });
  });

  grimoire.addMonster('Minotaur', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'brute',
      elite: true,
      creature_type: 'mortal',
      level: 7,
      size: 'large',
    });
    creature.addTrait('humanoid');
    creature.setProperties({
      has_art: true,
    });
    creature.setKnowledgeResults({
      normal: `
        A minotaur is a Large bull-headed creature.
        Minotaurs are known for their poor sense of direction.
        They have a tendency to become trapped in dungeons of even moderate complexity.
      `,
    });
    creature.setTrainedSkills(['awareness']);
    creature.setBaseAttributes([6, 0, 4, -2, 0, 1]);
    creature.addCustomSense('Darkvision (60 ft.)');

    // Horns are standard, smashing is elite.
    creature.addManeuver('Mighty Rushdown', { displayName: 'Charging Gore', weapon: 'horn' });
    creature.addWeaponMult('horn', { displayName: 'Gore' });
    creature.addManeuver('Chokeslam', { usageTime: 'elite' });
    creature.addManeuver('Ground Stomp', { usageTime: 'elite' });
  });

  addBandits(grimoire);
  addBugbears(grimoire);
  addCultists(grimoire);
  addGiants(grimoire);
  addGoblins(grimoire);
  addKobolds(grimoire);
  addLizardfolk(grimoire);
  addNecromancers(grimoire);
  addOgres(grimoire);
  addOrcs(grimoire);
  addTownsfolk(grimoire);
}

function addBandits(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Bandits',
      hasArt: false,
      sharedInitializer: (creature: Creature) => {
        creature.addTrait('humanoid');
      }
    },
    [
      [
        'Army Deserter',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral evil',
            base_class: 'warrior',
            elite: false,
            creature_type: 'mortal',
            level: 1,
            size: 'medium',
          });
          creature.setProperties({
            has_art: true,
          });
          creature.setKnowledgeResults({
            normal: `
            Army deserters have abandoned their past life in an army and struck out on their own.
            Since the punishments for desertion are typically harsh, they have little to lose.
          `,
          });
          creature.setTrainedSkills(['endurance']);
          creature.setBaseAttributes([2, 0, 2, 0, 1, 0]);
          creature.setEquippedArmor({
            bodyArmor: 'leather lamellar',
            shield: 'buckler', // Buckler over standard shield so they can use the crossbow more easily
          });
          creature.addWeaponMult('spear');
          creature.addWeaponMult('heavy crossbow');
        },
      ],
      [
        'Veteran Archer',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral evil',
            base_class: 'sniper',
            elite: false,
            creature_type: 'mortal',
            level: 3,
            size: 'medium',
          });
          creature.setProperties({
            has_art: false,
          });
          creature.setTrainedSkills(['awareness']);
          creature.setBaseAttributes([2, 3, 0, 0, 4, 0]);
          creature.setEquippedArmor({
            bodyArmor: 'buff leather',
          });
          creature.addManeuver('Arrowguide', { weapon: 'longbow' });
          creature.addWeaponMult('longbow');
        },
      ],
      [
        'Renegade Bolter',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral evil',
            base_class: 'sniper',
            elite: false,
            creature_type: 'mortal',
            level: 4,
            size: 'medium',
          });
          creature.setTrainedSkills(['awareness']);
          creature.setBaseAttributes([0, 3, 0, 0, 3, 4]);
          creature.setEquippedArmor({
            bodyArmor: 'buff leather',
            shield: 'buckler',
          });
          creature.addSpell('Arc');
          creature.addSpell('Electrocute');
          creature.addSpell('Stunning Discharge');
        },
      ],
    ],
  );
}

function addBugbears(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Bugbears',
      knowledge: {
        normal: `
          Bugbears are Medium humanoid creatures with burly, hairy bodies and ugly goblin faces.
          They are brutish and chaotic, and enjoy bullying their goblin kin.
        `,
        hard: `
          Although bugbears have only ordinary physical strength, they are remarkably durable.
          Their name comes from their hirstute nature and inexhaustible endurance, both of which are reminiscent of bears.
          They enjoy wrestling, and tend to grapple their foes in combat, even when doing so is not tactically advantageous.
        `,
        legendary: `
          Bugbears are typically found in small packs that rarely have more than a dozen members.
          However, sometimes they will congregate around a powerful leader for a time.
          These groupings are not hierarchical or well organized, and are typically based around some discovery of wealth that a chief can ration out to their followers.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        creature.addTrait('humanoid');
        creature.setTrainedSkills(['endurance']);
      },
    },
    [
      [
        'Bugbear Raider',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'warrior',
            elite: false,
            creature_type: 'mortal',
            level: 4,
            size: 'medium',
          });
          creature.setTrainedSkills([]);
          creature.setEquippedArmor({
            bodyArmor: 'leather lamellar',
          });
          creature.setBaseAttributes([2, 0, 5, -2, 0, 2]);
          creature.addManeuver('Grapple');
          creature.addManeuver('Piledriver');
          creature.addWeaponMult('heavy flail');
        },
      ],

      [
        'Bugbear Shaman',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'leader',
            elite: false,
            creature_type: 'mortal',
            level: 4,
            size: 'medium',
          });
          creature.setTrainedSkills(['awareness']);
          creature.setBaseAttributes([1, 0, 5, -2, 2, 4]);
          creature.setEquippedArmor({
            bodyArmor: 'leather lamellar',
            shield: 'standard shield',
          });
          creature.addSpell('Mind Crush');
          creature.addSpell('Taunt');
          creature.addSpell('Repeat');
          creature.addWeaponMult('flail');
        },
      ],

      [
        'Bugbear Growl',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'warrior',
            elite: false,
            creature_type: 'mortal',
            level: 2,
            size: 'medium',
          });
          creature.setEquippedArmor({
            bodyArmor: 'buff leather',
          });
          creature.setBaseAttributes([2, 0, 4, -2, 0, 1]);
          creature.addWeaponMult('heavy flail');
          creature.addManeuver('Piledriver');
          creature.addManeuver('Grapple');
        },
      ],

      [
        'Bugbear Chief',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral evil',
            base_class: 'leader',
            elite: true,
            creature_type: 'mortal',
            level: 6,
            size: 'medium',
          });
          creature.setEquippedArmor({
            bodyArmor: 'brigandine',
          });
          creature.setTrainedSkills([]);
          creature.setBaseAttributes([3, 0, 6, 0, 3, 6]);
          creature.addWeaponMult('heavy flail');
          creature.addManeuver('Weather the Storm', { usageTime: 'elite' });
          creature.addManeuver('Invigoration', { usageTime: 'elite' });
          creature.addManeuver('Defensive Stance', { usageTime: 'elite' });
        },
      ],
    ],
  );
}

function addCultists(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Cultists',
      hasArt: false,
      sharedInitializer: (creature: Creature) => {
        creature.addTrait('humanoid');
      },
    },
    [
      [
        'Death Cultist',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful evil',
            base_class: 'sniper',
            elite: false,
            creature_type: 'mortal',
            level: 1,
            size: 'medium',
          });
          creature.setTrainedSkills(['endurance']);
          creature.setBaseAttributes([1, 1, 2, -1, 1, 4]);
          // No body armor; assume they are wearing robes
          creature.addSpell('Drain Life');
          creature.addWeaponMult('scythe');
        },
      ],
      [
        'Pyromaniac',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'mortal',
            level: 4,
            size: 'medium',
          });
          creature.setProperties({ has_art: true });
          creature.setTrainedSkills([]);
          creature.setBaseAttributes([0, 2, 0, -1, 2, 5]);
          // No body armor; assume they are wearing robes
          creature.addSpell('Ignition');
          creature.addSpell('Pyrohemia');
          creature.addSpell('Burning Grasp');
          creature.addWeaponMult('club');
        },
      ],
      [
        'Arsonist',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'mortal',
            level: 6,
            size: 'medium',
          });
          creature.setTrainedSkills([]);
          creature.setBaseAttributes([0, 4, 1, 0, 3, 1]);
          creature.addCustomManeuver({
            name: "Alchemist's Fire",
            attack: {
              hit: '\\damagerankfourlow.',
              targeting: `
                Make an attack vs. Reflex against something within \\shortrange.
              `,
            },
            tags: ['Fire'],
          });
          creature.addCustomManeuver({
            name: "Firebomb",
            attack: {
              hit: '\\damagerankthreelow.',
              missGlance: true,
              targeting: `
                Make an attack vs. Reflex against everything in a \\smallarea radius within \\shortrange.
              `,
            },
            tags: ['Fire'],
          });
        },
      ],
    ],
  );
}

function addGiants(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Giants',
      hasArt: false,
      knowledge: {
        easy: `
          Giants are massive humanoid creatures that tower over lesser creatures.
          All giants have immense strength and unimpressive agility - except when it comes to throwing and catching rocks, which they tend to excel at.
        `,
        normal: `
          A giant can throw objects no larger than two size categories smaller than itself with ease.
          Giants prefer to throw boulders, but in a pinch they can throw almost anything.
        `,
        hard: `
          A giant's \\glossterm{range limits} with an object other than a boulder are generally half its range limit with a boulder.
          The object may also deal less damage than a boulder depending on its construction.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        creature.addTrait('humanoid');
      }
    },
    [
      [
        'Hill Giant',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'brute',
            elite: false,
            creature_type: 'mortal',
            level: 10,
            size: 'huge',
          });
          creature.setProperties({ has_art: true });
          creature.setBaseAttributes([8, 0, 3, -2, 2, -1]);
          creature.setKnowledgeResults({
            normal: `
              A hill giant is a Huge giant that is usually found in hilly areas.
              Hill giants prefer to fight from high, rocky outcroppings, where they can pelt opponents with rocks and boulders while limiting the risk to themselves.
              Skin color among hill giants ranges from light tan to deep ruddy brown.
              They wear layers of crudely prepared hides with the fur left on.
            `,
            hard: `
              Hill giants lack the intelligence or desire to retreat if their enemies survive to approach them, and prefer to draw their massive clubs and enter melee.
              If possible, they smash their foes off of cliffs.

              The hair of hill giants is brown or black, with eyes the same color.
              They seldom wash or repair their garments, preferring to simply add more hides as their old ones wear out.
              Adult hill giants are about 25 feet tall.
              They can live to be 70 years old.
            `,
          });
          creature.addWeaponMult('giant boulder', { displayName: 'Boulder Toss' });
          creature.addManeuver('Forceful Smash', { weapon: 'greatclub' });
          creature.addWeaponMult('greatclub');
        },
      ],
      [
        'Stone Giant',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'warrior',
            elite: true,
            creature_type: 'mortal',
            level: 11,
            size: 'gargantuan',
          });
          creature.setProperties({ has_art: true });
          creature.setBaseAttributes([7, -2, 7, 0, 2, 4]);
          creature.setKnowledgeResults({
            normal: `
              A stone giant is a Gargantuan giant that is usually found in mountainous regions.
              Stone giants fight from a great distance whenever possible, using their ability to hurl stones vast distances and bend the earth to their will.
              They prefer thick leather garments, dyed in shades of brown and gray to match the stone around them.
            `,
            hard: `
              Adult stone giants stand about 50 feet tall.
              They can live to be 300 years old.
              Young stone giants can be capricious, hunting tiny creatures like goats and mortal on a whim.
              Elder stone giants tend to be wiser and more cautious, and avoid unnecessary conflict.
            `,
          });
          creature.addWeaponMult('giant boulder', { displayName: 'Boulder Toss' });
          creature.addManeuver('Forceful Smash', { weapon: 'greatclub' });
          creature.addWeaponMult('greatclub');
          creature.addSpell('Mighty Rockshard Blast', { usageTime: 'elite' });
          creature.addSpell('Crushing Gravity', { usageTime: 'elite' });
          creature.addSpell('Tremor', { usageTime: 'elite' });
        },
      ],
      [
        'Stone Giant Elder',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'warrior',
            elite: true,
            creature_type: 'mortal',
            level: 15,
            size: 'gargantuan',
          });
          creature.setBaseAttributes([8, -2, 8, 0, 4, 6]);
          creature.addWeaponMult('giant boulder', { displayName: 'Boulder Toss' });
          creature.addManeuver('Forceful Smash+', { weapon: 'greatclub' });
          creature.addWeaponMult('greatclub');
          creature.addSpell('Mighty Rockshard Blast', { usageTime: 'elite' });
          creature.addSpell('Crushing Gravity', { usageTime: 'elite' });
          creature.addSpell('Mighty Tremor', { usageTime: 'elite' });
        },
      ],
    ],
  );
}

function addGoblins(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Goblins',
      knowledge: {
        normal: `
          Goblins are common throughout civilization.
          They are typically found in small groups, preying on travelers or isolated settlements.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        creature.addTrait('humanoid');
      },
    },
    [
      [
        'Goblin Warrior',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'mortal',
            level: 1,
            size: 'medium',
          });
          creature.setTrainedSkills(['awareness']);
          creature.setBaseAttributes([-1, 4, 0, -2, 2, -2]);
          creature.addWeaponMult('spear');
          creature.addManeuver('Rushdown', { weapon: 'spear' });
          creature.setEquippedArmor({
            bodyArmor: 'buff leather',
            shield: 'buckler',
          });
        },
      ],
      [
        'Goblin Wolf Rider',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'mortal',
            level: 3,
            size: 'medium',
          });
          creature.setProperties({ has_art: true });
          creature.setTrainedSkills(['ride']);
          creature.setBaseAttributes([-1, 4, 0, -2, 2, -2]);
          creature.addWeaponMult('lance');
          creature.addWeaponMult('spear');
          creature.setEquippedArmor({
            bodyArmor: 'buff leather',
            shield: 'buckler',
          });
        },
      ],
      [
        'Goblin Shaman',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'mortal',
            level: 1,
            size: 'medium',
          });
          creature.setTrainedSkills(['awareness']);
          creature.setBaseAttributes([-1, 3, 0, -2, 2, 3]);
          creature.addSpell('Word of Power');
          creature.setEquippedArmor({
            bodyArmor: 'buff leather',
            shield: 'standard shield',
          });
          creature.addWeaponMult('spear', { displayName: 'Consecrated Strike', isMagical: true });
        },
      ],
    ],
  );
}

function addLizardfolk(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Lizardfolk',
      hasArt: true,
      knowledge: {
        normal: `
          Lizardfolk are Medium bipedal creatures covered in reptilian scales.
          They are slightly taller and bulkier than humans, typically standing 6 to 7 feet tall and weighing up to 250 pounds.
          Their tail resembles that of a crocodile, and is typically 3 to 4 feet long.
          Their scales are typically green, gray, or brown.
          In battle, they typically fight as unorganized individuals.
        `,
        hard: `
          Lizardfolk use their tail for balance on land and to accelerate their swimming while in water.
          They prefer direct charges and massed rushes in battle, sometimes trying to force foes into the water, where the lizardfolk have an advantage.
          If lizardfolk are outnumbered or if their territory is being invaded, they set snares, plan ambushes, and make raids to hinder enemy supplies.
          Advanced tribes use more sophisticated tactics and have better traps and ambushes.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        creature.addTrait('amphibious');
        creature.addTrait('humanoid');
        creature.addCustomMovementSpeed('Land (normal)');
        creature.addCustomMovementSpeed('Swim (normal)');
        creature.setEquippedArmor({
          bodyArmor: 'scale',
          shield: 'standard shield',
        });
      },
    },
    [
      [
        'Lizardfolk Grunt',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'warrior',
            elite: false,
            creature_type: 'mortal',
            level: 3,
            size: 'medium',
          });
          creature.setTrainedSkills(['swim']);
          creature.setBaseAttributes([2, 2, 4, -1, 1, 0]);
          creature.addWeaponMult('spear');
          creature.addManeuver('Bloodletter', { weapon: 'bite' });
        },
      ],
      [
        'Lizardfolk Champion',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'warrior',
            elite: false,
            creature_type: 'mortal',
            level: 5,
            size: 'medium',
          });
          creature.setTrainedSkills(['swim']);
          creature.setBaseAttributes([3, 3, 5, 0, 1, 1]);
          creature.addWeaponMult('spear');
          creature.addManeuver('Bloodletter', { weapon: 'bite' });
          creature.addManeuver('Redeeming Followup', { weapon: 'spear' });
        },
      ],
    ],
  );
}

function addKobolds(grimoire: Grimoire) {
  const dragonsworn = {
    name: 'Dragonsworn',
    effect: `
      The $name is \\impervious to the tag associated with the dragon it swore to serve.
    `,
  }

  grimoire.addMonsterGroup(
    {
      name: 'Kobolds',
      sharedInitializer: (creature) => {
        creature.addTrait('humanoid');
        creature.setTrainedSkills(['awareness', 'stealth']);
      },
    },
    [
      [
        'Nipper',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'skirmisher',
            creature_type: 'mortal',
            elite: false,
            level: 2,
            size: 'medium',
          });
          creature.setBaseAttributes([0, 4, 2, 0, 4, 0]);
          creature.setEquippedArmor({ bodyArmor: 'buff leather' });
          creature.addSneakAttack('smallswords', { displayName: 'Sneaky Nip' });
          creature.addSneakAttack('darts', { displayName: 'Sneaky Darts' });
        },
      ],
      [
        'Snipper',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'sniper',
            creature_type: 'mortal',
            elite: false,
            level: 2,
            size: 'medium',
          });
          creature.setBaseAttributes([0, 4, 2, 0, 4, 0]);
          creature.setEquippedArmor({ bodyArmor: 'buff leather' });
          creature.addWeaponMult('longbow');
          creature.addManeuver('Heartpiercer', { weapon: 'longbow' });
        },
      ],
      [
        'Yipper',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'leader',
            elite: false,
            creature_type: 'mortal',
            level: 3,
            size: 'medium',
          });
          creature.setBaseAttributes([-2, 4, 2, 1, 2, 3]);
          creature.setEquippedArmor({
            bodyArmor: 'buff leather',
            shield: 'buckler',
          });
          creature.addWeaponMult('spear');
          creature.addManeuver('Stunning Shout');
          creature.addManeuver('Battle Command');
        },
      ],
      [
        'Dragonsworn Nipper',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'skirmisher',
            creature_type: 'mortal',
            elite: false,
            level: 11,
            size: 'medium',
          });
          creature.addPassiveAbility(dragonsworn);
          creature.setEquippedArmor({ bodyArmor: 'buff leather' });
          creature.addImpervious('Varies');
          creature.setBaseAttributes([0, 6, 4, 0, 4, 2]);
          creature.addSneakAttack('smallswords', { displayName: 'Sneaky Nip' });
          creature.addSneakAttack('darts', { displayName: 'Sneaky Darts' });
        },
      ],
      [
        'Dragonsworn Snipper',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'sniper',
            creature_type: 'mortal',
            elite: false,
            level: 12,
            size: 'medium',
          });
          creature.setBaseAttributes([0, 6, 2, 0, 6, 2]);
          creature.setEquippedArmor({ bodyArmor: 'buff leather' });
          creature.addPassiveAbility(dragonsworn);
          creature.addImpervious('Varies');
          creature.addWeaponMult('longbow');
          creature.addManeuver('Distant Shot', { weapon: 'longbow' });
          creature.addManeuver('Pure Precision', { weapon: 'longbow' });
        },
      ],
      [
        'Dragonsworn Yipper',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'leader',
            elite: false,
            creature_type: 'mortal',
            level: 13,
            size: 'medium',
          });
          creature.setBaseAttributes([-1, 6, 3, 2, 5, 4]);
          creature.setEquippedArmor({
            bodyArmor: 'buff leather',
            shield: 'buckler',
          });
          creature.addPassiveAbility(dragonsworn);
          creature.addImpervious('Varies');
          creature.addWeaponMult('spear');
          creature.addManeuver('Directing Shout');
          creature.addManeuver('Stunning Shout+');
        },
      ],
    ],
  );
}

function addNecromancers(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Necromancers',
      hasArt: false,
      knowledge: {
        normal: `
          Necromancers revive and manipulate undead.
          Some even attempt to emulate the strength of undead in their own bodies.
          They are reviled in most societies, both for their desecration of the dead and for the harm their magic can do to souls.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        creature.addTrait('humanoid');
      }
    },
    [
      [
        'Graverobber',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'leader',
            elite: true,
            creature_type: 'mortal',
            level: 4,
            size: 'medium',
          });
          creature.setTrainedSkills(['awareness', 'stealth', 'craft_bone']);
          creature.setBaseAttributes([0, 4, 0, 2, 2, 4]);

          creature.addWeaponMult('heavy crossbow');
          creature.addSpell('Inflict Wound');
          creature.addSpell('Putrefying Blast', { usageTime: 'elite' });
          creature.addSpell('Lifesteal');
          creature.addSpell('Drain Life', { usageTime: 'elite' });
        },
      ],

      [
        'Lichbound',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful evil',
            base_class: 'leader',
            elite: true,
            creature_type: 'mortal',
            level: 8,
            size: 'medium',
          });
          creature.setKnowledgeResults({
            normal: `
            A lichbound is a mage who has started the process of becoming a lich by intentionally splintering their own soul.
            They still have far to go before they truly embrace undeath, but they gain some benefits from their partial transformation.
          `,
          });
          creature.setTrainedSkills(['awareness', 'intimidate', 'craft_bone', 'knowledge_arcana']);
          creature.setBaseAttributes([0, 2, 4, 3, 2, 6]);
          creature.addCustomSense('Darkvision (60 ft.)');
          creature.addCustomSense('Lifesight (30 ft.)');

          creature.addPassiveAbility({
            name: 'Life Suppression',
            effect: `
            Although the $name is alive, it is not considered a living creature for the purpose of attacks against it.
            This means that attacks which only affect living creatures have no effect on it.
          `,
          });

          // Immediate damage is standard action, debuff / buildup is elite action
          creature.addWeaponMult('scythe', { displayName: 'Reaping Scythe', isMagical: true });
          // Lifesteal Grasp, but as rank 3 and reformatted for a monster.
          creature.addCustomSpell({
            name: 'Lifesteal Grasp',
            attack: {
              hit: '\\damagerankfour.',
              // A true lifesteal grasp should be rank 6, but that seems strong when they
              // don't have to pay a fatigue cost.
              injury: 'You regain \\hprankfive at the end of the round.',
              targeting: `
              You must have a \\glossterm{free hand} to cast this spell.

              Make an attack vs. Fortitude against a living creature you \\glossterm{touch}.
            `,
            },
          });

          creature.addSpell('Circle of Death', { usageTime: 'elite' });
          creature.addSpell('Fearsome Aura', { usageTime: 'triggered' });
          creature.addSpell('Mind Blank', { displayName: 'Splinter Soul', usageTime: 'elite' });
          creature.addSpell('Lifetap Blast');
          creature.addSpell('Sanguine Bond', { usageTime: 'elite' });
        },
      ],
      [
        'Idoris, Queen of the Dead',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'mystic',
            elite: true,
            creature_type: 'mortal',
            level: 18,
            size: 'medium',
          });
          creature.setKnowledgeResults({
            normal: `
              Idoris is a powerful necromancer who lives deep in a cursed forest.
              She controls a large army of undead minions who aggressively defend her territory.
            `,
            // TODO: there is no reasonable god for Idoris to worship
          });
          creature.setTrainedSkills(['awareness', 'knowledge_arcana', 'knowledge_religion', 'persuasion']);
          creature.setBaseAttributes([0, 4, 1, 5, 6, 10]);

          // Channel Divinity spells are elite actions
          creature.addSpell('Mighty Retributive Judgment', { usageTime: 'elite' });
          creature.addSpell('Mighty Word of Faith', { usageTime: 'elite' });
          creature.addSpell('Divine Interdiction', { usageTime: 'elite' });
          creature.addSpell('Mighty Lifetap Slash');
          creature.addSpell('Mighty Sanguine Bond');
          // Mighty lifesteal; TODO automatically support `functionsLike` spells
          creature.addCustomSpell({
            name: 'Lifesteal',
            attack: {
              hit: `
                \\damagerankfive.
              `,
              injury: `
                You regain \\hprankeight at the end of the round.
              `,
              targeting: `
                Make an attack vs. Fortitude against one living creature within \\medrange.
              `,
            },
            rank: 6,
          });
        },
      ],
    ],
  );
}

function addOgres(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Ogres',
      hasArt: false,
      knowledge: {
        normal: `
          Ogres are Large, hideous humanoid creatures with a taste for human flesh.
          If that is unavailable, they also enjoy the flesh of other humanoid creatures.
          They lack the intelligence for complex plans, but they like lying in wait to ambush helpless travelers.
        `,
        hard: `
          Ogre skin color ranges from dull yellow to dull brown.
          Their clothing consists of poorly cured furs and hides, which add to their naturally repellent odor.

          They are intelligent enough to throw their javelins first to soften up their foes before closing into melee, but ogre gangs and bands fight as disorganized individuals.
          Ogres use massive clubs in battle to tenderize their meat instead of wastefully hacking off bits.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        creature.addTrait('humanoid');
      }
    },
    [
      [
        'Ogre Ganger',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'brute',
            elite: false,
            creature_type: 'mortal',
            level: 5,
            size: 'large',
          });
          creature.setBaseAttributes([5, 0, 2, -4, 1, -1]);
          creature.setKnowledgeResults({
            normal: `
              Ogre gangers are relatively weak or young ogres that tend to gather together in gangs for mutual protection.
            `,
          });
          creature.setTrainedSkills(['intimidate']);
          creature.setEquippedArmor({ bodyArmor: 'leather lamellar' });

          creature.addWeaponMult('javelin');
          creature.addManeuver('Knockdown', { weapon: 'greatclub' });
          creature.addManeuver('Sweep', { weapon: 'greatclub' });
        },
      ],
      [
        'Ogre Menace',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'brute',
            elite: false,
            creature_type: 'mortal',
            level: 8,
            size: 'large',
          });
          creature.setProperties({ has_art: true });
          creature.setBaseAttributes([6, 1, 3, -2, 2, 0]);
          creature.setKnowledgeResults({
            normal: `
              Ogre menaces are mature adult ogres that often terrorize small towns.
              They tend to work in pairs or with minions like goblins that they bully into submission.
            `,
          });
          creature.setTrainedSkills(['intimidate']);
          creature.setEquippedArmor({ bodyArmor: 'leather lamellar' });

          creature.addWeaponMult('javelin');
          creature.addManeuver('Armorcrusher', { weapon: 'greatclub' });
          creature.addManeuver('Concussion', { weapon: 'greatclub' });
          creature.addWeaponMult('greatclub');
        },
      ],
      [
        'Ogre Mage',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'sniper',
            elite: false,
            creature_type: 'mortal',
            level: 8,
            size: 'large',
          });
          creature.setProperties({ has_art: true });
          creature.setBaseAttributes([4, 0, 0, 1, 4, 4]);
          creature.setKnowledgeResults({
            normal: `
              Ogre mages are unusual ogres that have innate arcane magical talent.
              They are generally identifiable as the only ogres who do not go into battle wearing armor.
              They are more intelligent than other ogres, and more likely to use combat strategies like hiding behind their minions.
            `,
          });
          creature.setTrainedSkills(['awareness']);
          creature.setEquippedArmor({ bodyArmor: 'buff leather' });

          creature.addWeaponMult('greatclub');
          creature.addSpell('Time Ebbs and Flows');
          creature.addSpell('Stutterstop');
          creature.addSpell('Wave of Senescence');
          creature.addSpell('Unstable Aging');
        },
      ],
      [
        'Ogre Skullclaimer',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'brute',
            elite: true,
            creature_type: 'mortal',
            level: 9,
            size: 'large',
          });
          creature.setBaseAttributes([8, 1, 4, -1, 3, 2]);
          creature.setKnowledgeResults({
            normal: `
              Ogre skullclaimers are the leaders of large roaming bands of ogres.
              Ogre bands are often accompanied by goblins or other similar creatures that help the ogres in exchange for a share of the valuable items they find, since the ogres care more about the creatures they kill.
            `,
            hard: `
              Ogre skullclaimers are named after their right to eat the most prized part of any humanoid the band kills: the head.
            `,
          });
          creature.setTrainedSkills(['intimidate']);
          creature.addManeuver('Armorcrusher', { weapon: 'greatclub' });
          creature.addManeuver('Concussion', { weapon: 'greatclub' });
          creature.addWeaponMult('greatclub');
          creature.addManeuver('Watch Out', { usageTime: 'elite' });
          creature.addManeuver('Empowering Roar', { usageTime: 'elite' });
          creature.addManeuver('Deafening Shout', { usageTime: 'elite' });
        },
      ],
    ],
  );
}

function addOrcs(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Orcs',
      hasArt: false,
      knowledge: {
        normal: `
          Orcs are green-skinned humanoids that are generally larger, stronger, and less intelligent than humans.
          Most other humanoid races consider them ugly, though orcs would say the same about most other humanoid races.
          They tend to be selfish, but they adhere strictly to the particular orcish interpretation of honorable combat.
        `,
        hard: `
          Honorable orc combat avoids sneak attacks or deception, allows enemies to surrender, and respects the distinction between civilians and combatants.
          However, honorable orc combat does not require a great deal of warning before battle is joined, and they have no concept of "dirty fighting" - orcs fight brutally and with no reservations in combat.

          Orcs have highly militaristic and regimented society that is divided into different clans, each of which is ruled by a powerful chieftain.
        `,
        legendary: `
          Orc hierarchy and status is almost always determined by power, and chieftains can be deposed at specific intervals in a personal trial by combat.
          You know the general patterns that determine when these personal trials by combat are permissible for local orc clans.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        creature.addTrait('humanoid');
        creature.setTrainedSkills(['endurance']);
        creature.addCustomSense('Darkvision (60 ft.)');
      },
    },
    [
      [
        'Orc Peon',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful evil',
            base_class: 'brute',
            elite: false,
            creature_type: 'mortal',
            level: 1,
            size: 'medium',
          });
          creature.setProperties({ has_art: true });
          creature.setKnowledgeResults({
            normal: `
            Orc peons are the weakest warrior that orc clans field in battle.
            They have the lowest status of any adult in orc society.
            Peons are typically fresh recruits who have not yet been fully incorporated into an orc army.
          `,
          });
          creature.setEquippedArmor({
            bodyArmor: 'buff leather',
          });
          creature.setBaseAttributes([4, 0, 1, -2, 0, 0]);
          creature.addWeaponMult('greataxe');
        },
      ],
      [
        'Orc Grunt',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful evil',
            base_class: 'brute',
            elite: false,
            creature_type: 'mortal',
            level: 2,
            size: 'medium',
          });
          creature.setKnowledgeResults({
            normal: `
            Orc grunts are the standard warrior that orc clans field in battle.
          `,
          });
          creature.setBaseAttributes([5, 0, 2, -2, 0, 0]);
          creature.setEquippedArmor({
            bodyArmor: 'leather lamellar',
          });
          creature.addWeaponMult('greataxe');
          creature.addManeuver('Wild Swing', { weapon: 'greataxe' });
        },
      ],
      [
        'Orc Butcher',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful evil',
            base_class: 'brute',
            elite: false,
            creature_type: 'mortal',
            level: 3,
            size: 'medium',
          });
          creature.setKnowledgeResults({
            normal: `
            Orc butchers usually run the field kitchens in orc armies.
            They tend to be smarter than the average orc warrior, but are no less ferocious when challenged.
          `,
          });
          creature.setBaseAttributes([5, 1, 2, 0, 0, 0]);
          creature.setEquippedArmor({
            bodyArmor: 'leather lamellar',
          });
          creature.addCustomManeuver({
            name: "Butcher's Cleaver",
            effect: `
            The $name makes a strike.
          `,
            tags: ['sweeping (2)'],
            weapon: 'greataxe',
          });
          creature.addManeuver('Bloodletter', { weapon: 'greataxe' });
        },
      ],
      [
        'Orc Veteran',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful evil',
            base_class: 'brute',
            elite: false,
            creature_type: 'mortal',
            level: 5,
            size: 'medium',
          });
          creature.setKnowledgeResults({
            normal: `
            Orc veterans are battle-hardened elite warriors who are deadly at any range.
            They often serve as bodyguards to orc chieftains or as devastating shock troops in battle.
          `,
          });
          creature.setBaseAttributes([6, 0, 3, -2, 1, 1]);
          creature.setEquippedArmor({
            bodyArmor: 'scale',
          });
          creature.addWeaponMult('greataxe');
          creature.addManeuver('Wild Swing', { weapon: 'greataxe' });
          creature.addWeaponMult('heavy crossbow');
        },
      ],
      [
        'Orc Clan Chief',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful evil',
            base_class: 'leader',
            elite: true,
            creature_type: 'mortal',
            level: 7,
            size: 'medium',
          });
          creature.setKnowledgeResults({
            normal: `
            Orc clan chiefs are the among the most powerful orc warriors.
            Even the lowest clan chief commands hundreds of powerful orc warriors, plus at least as many noncombatants.
          `,
          });
          creature.setBaseAttributes([6, 0, 4, 0, 2, 3]);
          creature.setEquippedArmor({
            bodyArmor: 'scale',
          });
          creature.addWeaponMult('greataxe');
          creature.addManeuver('Distant Shot', { weapon: 'heavy crossbow' });
          creature.addManeuver('Armorcrusher', { weapon: 'greataxe' });
          creature.addManeuver('Battle Command', { usageTime: 'elite' });
        },
      ],
      [
        'Orc Shaman',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful evil',
            base_class: 'leader',
            elite: false,
            creature_type: 'mortal',
            level: 2,
            size: 'medium',
          });
          creature.setProperties({ has_art: true });
          creature.setKnowledgeResults({
            normal: `
            Orc shamans provide orc battle squads with divine magical support.
            They primarily aid their allies, though they have no fear of taking up arms themselves when necessary.
          `,
            hard: `
            If an orc shaman proves their mettle and wisdom in combat, they may eventually become a trusted advisor to a clan chief.
            The advice and spiritual guidance of a capable shaman often has more influence on the success of an orc clan than mere strength of arms, and good clan chiefs recognize that fact.
          `,
          });
          creature.setBaseAttributes([4, 1, 1, -1, 1, 4]);
          creature.setEquippedArmor({
            bodyArmor: 'leather lamellar',
          });
          creature.addSpell('Reveal Victory');
          creature.addSpell('Foresee Safety');
          creature.addSpell("Executioner's Axe");
          creature.addWeaponMult('greataxe');
        },
      ],
    ],
  );
}

function addTownsfolk(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Townsfolk',
      hasArt: false,
      knowledge: {
        normal: `
          Townsfolk are common throughout civilization.
          They are typically found in small groups, preying on travelers or isolated settlements.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        creature.addTrait('humanoid');
      },
    },
    [
      [
        'Town Guard',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'warrior',
            elite: false,
            creature_type: 'mortal',
            level: 1,
            size: 'medium',
          });
          creature.setProperties({
            has_art: false,
          });
          creature.setKnowledgeResults({
            easy: `
            Town guards are common throughout civilization.
            This represents the sort of ordinary guard that would be found even in rural towns, not an elite bodyguard.
          `,
          });
          creature.setTrainedSkills([]);
          creature.setBaseAttributes([1, 1, 1, 0, 0, 0]);
          creature.setEquippedArmor({
            bodyArmor: 'leather lamellar',
            shield: 'standard shield',
          });
          creature.addWeaponMult('spear');
        },
      ],
      [
        'Town Healer',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'leader',
            elite: false,
            creature_type: 'mortal',
            level: 2,
            size: 'medium',
          });
          creature.setProperties({
            has_art: false,
          });
          creature.setKnowledgeResults({
            easy: `
            Town healers are typically clerics or druids with some healing ability.
            They may be prominent leaders of a temple, or they may prefer solitude, but it is rare to find a reasonably sized town that does not have a healer of some variety.
          `,
          });
          creature.setTrainedSkills(['medicine']);
          creature.setBaseAttributes([0, 0, 0, 0, 3, 3]);
          creature.setEquippedArmor({
            bodyArmor: 'buff leather',
            shield: 'buckler',
          });
          creature.addSpell('Restoration');
          creature.addWeaponMult('club');
        },
      ],
    ],
  );
}
