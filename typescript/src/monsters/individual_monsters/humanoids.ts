import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';

export function addHumanoids(grimoire: Grimoire) {
  addBandits(grimoire);
  addBugbears(grimoire);
  addCultists(grimoire);
  addGoblins(grimoire);
  addKobolds(grimoire);
  addLizardfolk(grimoire);
  addOrcs(grimoire);
  addTownsfolk(grimoire);
}

function addBandits(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: "Bandits",
      hasArt: false,
      knowledge: {
        normal: `
          Bandits are common throughout civilization.
          They are typically found in small groups, preying on travelers or isolated settlements.
        `,
      },
    },
    [
      ['Army Deserter', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral evil',
          base_class: 'warrior',
          elite: false,
          creature_type: 'humanoid',
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
      }],
      ['Veteran Archer', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral evil',
          base_class: 'sniper',
          elite: false,
          creature_type: 'humanoid',
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
      }],
      ['Renegade Bolter', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral evil',
          base_class: 'sniper',
          elite: false,
          creature_type: 'humanoid',
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
      }],
    ]
  );
}

function addBugbears(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: "Bugbears",
      sharedInitializer: (creature: Creature) => {
        creature.setTrainedSkills(['endurance']);
      },
    },
    [
      ['Bugbear Raider', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'chaotic evil',
          base_class: 'warrior',
          elite: false,
          creature_type: 'humanoid',
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
      }],

      ['Bugbear Shaman', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'chaotic evil',
          base_class: 'leader',
          elite: false,
          creature_type: 'humanoid',
          level: 4,
          size: 'medium',
        });
        creature.setTrainedSkills(["awareness"]);
        creature.setBaseAttributes([0, 0, 5, -2, 2, 4]);
        creature.setEquippedArmor({
          bodyArmor: 'leather lamellar',
          shield: 'standard shield',
        });
        creature.addSpell('Mind Crush');
        creature.addSpell('Taunt');
        creature.addSpell('Repeat');
        creature.addWeaponMult('flail');
      }],

      ['Bugbear Growl', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'chaotic evil',
          base_class: 'warrior',
          elite: false,
          creature_type: 'humanoid',
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
      }],

      ['Bugbear Chief', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral evil',
          base_class: 'leader',
          elite: true,
          creature_type: 'humanoid',
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
      }],
    ]
  );
}

function addCultists(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: "Cultists",
      hasArt: false,
      knowledge: {
        normal: `
          Cultists are common throughout civilization.
          They are typically found in small groups, preying on travelers or isolated settlements.
        `,
      },
    },
    [
      ['Death Cultist', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'lawful evil',
          base_class: 'sniper',
          elite: false,
          creature_type: 'humanoid',
          level: 1,
          size: 'medium',
        });
        creature.setTrainedSkills(['endurance']);
        creature.setBaseAttributes([1, 1, 2, -1, 1, 4]);
        // No body armor; assume they are wearing robes
        creature.addSpell('Drain Life');
        creature.addWeaponMult('scythe');
      }],
      ['Pyromaniac', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'chaotic evil',
          base_class: 'skirmisher',
          elite: false,
          creature_type: 'humanoid',
          level: 4,
          size: 'medium',
        });
        creature.setTrainedSkills([]);
        creature.setBaseAttributes([0, 2, 0, -1, 2, 5]);
        // No body armor; assume they are wearing robes
        creature.addSpell('Ignition');
        creature.addSpell('Pyrohemia');
        creature.addSpell('Burning Grasp');
        creature.addWeaponMult('club');
      }],
    ]
  );
}

function addGoblins(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: "Goblins",
      hasArt: true,
      knowledge: {
        normal: `
          Goblins are common throughout civilization.
          They are typically found in small groups, preying on travelers or isolated settlements.
        `,
      },
    },
    [
      ['Goblin Warrior', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'chaotic evil',
          base_class: 'skirmisher',
          elite: false,
          creature_type: 'humanoid',
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
      }],
      ['Goblin Wolf Rider', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'chaotic evil',
          base_class: 'skirmisher',
          elite: false,
          creature_type: 'humanoid',
          level: 3,
          size: 'medium',
        });
        creature.setTrainedSkills(['ride']);
        creature.setBaseAttributes([-1, 4, 0, -2, 2, -2]);
        creature.addWeaponMult('lance');
        creature.addWeaponMult('spear');
        creature.setEquippedArmor({
          bodyArmor: 'buff leather',
          shield: 'buckler',
        });
      }],
      ['Goblin Shaman', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'chaotic evil',
          base_class: 'skirmisher',
          elite: false,
          creature_type: 'humanoid',
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
      }],
    ]
  );
}

function addLizardfolk(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: "Lizardfolk",
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
        creature.addCustomMovementSpeed('Land (normal)');
        creature.addCustomMovementSpeed('Swim (normal)');
        creature.setEquippedArmor({
          bodyArmor: 'scale',
          shield: 'standard shield',
        });
      },
    },
    [
      ['Lizardfolk Grunt', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'warrior',
          elite: false,
          creature_type: 'humanoid',
          level: 3,
          size: 'medium',
        });
        creature.setTrainedSkills(['swim']);
        creature.setBaseAttributes([2, 2, 4, -1, 1, 0]);
        creature.addWeaponMult('spear');
        creature.addManeuver('Bloodletter', { weapon: 'bite' });
      }],
      ['Lizardfolk Champion', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'warrior',
          elite: false,
          creature_type: 'humanoid',
          level: 5,
          size: 'medium',
        });
        creature.setTrainedSkills(['swim']);
        creature.setBaseAttributes([3, 3, 5, 0, 1, 1]);
        creature.addWeaponMult('spear');
        creature.addManeuver('Bloodletter', { weapon: 'bite' });
        creature.addManeuver('Redeeming Followup', { weapon: 'spear' });
      }],
    ]
  );
}

function addKobolds(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: "Kobolds",
      sharedInitializer: (creature) => {
        creature.setTrainedSkills(['awareness', 'stealth']);
      },
    },
    [
      ['Kobold Nipper', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'lawful neutral',
          base_class: 'skirmisher',
          creature_type: 'humanoid',
          elite: false,
          level: 2,
          size: 'medium',
        });
        creature.setBaseAttributes([0, 4, 2, 0, 4, 0]);
        creature.addSneakAttack('smallswords');
      }],
      ['Kobold Snipper', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'lawful neutral',
          base_class: 'sniper',
          creature_type: 'humanoid',
          elite: false,
          level: 2,
          size: 'medium',
        });
        creature.setBaseAttributes([0, 4, 2, 0, 4, 0]);
        creature.addWeaponMult('longbow');
        creature.addManeuver('Heartpiercer', {weapon: 'longbow'});
      }],
      ['Dragonsworn Nipper', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'lawful neutral',
          base_class: 'skirmisher',
          creature_type: 'humanoid',
          elite: false,
          level: 11,
          size: 'medium',
        });
        creature.addPassiveAbility({
          name: "Dragonsworn",
          effect: `
            The $name is \\impervious to the tag associated with the dragon it swore to serve.
          `
        });
        creature.addImpervious('Varies');
        creature.setBaseAttributes([0, 6, 4, 0, 4, 2]);
        creature.addSneakAttack('smallswords');
      }],
      ['Dragonsworn Snipper', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'lawful neutral',
          base_class: 'sniper',
          creature_type: 'humanoid',
          elite: false,
          level: 11,
          size: 'medium',
        });
        creature.setBaseAttributes([0, 6, 2, 0, 6, 2]);
        creature.addPassiveAbility({
          name: "Dragonsworn",
          effect: `
            The $name is \\impervious to the tag associated with the dragon it swore to serve.
          `
        });
        creature.addImpervious('Varies');
        creature.addWeaponMult('longbow');
        creature.addManeuver('Distant Shot', {weapon: 'longbow'});
        creature.addManeuver('Pure Precision', {weapon: 'longbow'});
      }],
    ],
  );
}

function addOrcs(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: "Orcs",
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
        creature.setTrainedSkills(['endurance']);
        creature.addCustomSense('Darkvision (60 ft.)');
      },
    },
    [
      ['Orc Peon', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'lawful evil',
          base_class: 'brute',
          elite: false,
          creature_type: 'humanoid',
          level: 1,
          size: 'medium',
        });
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
      }],
      ['Orc Grunt', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'lawful evil',
          base_class: 'brute',
          elite: false,
          creature_type: 'humanoid',
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
      }],
      ['Orc Butcher', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'lawful evil',
          base_class: 'brute',
          elite: false,
          creature_type: 'humanoid',
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
      }],
      ['Orc Veteran', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'lawful evil',
          base_class: 'brute',
          elite: false,
          creature_type: 'humanoid',
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
      }],
      ['Orc Clan Chief', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'lawful evil',
          base_class: 'leader',
          elite: true,
          creature_type: 'humanoid',
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
      }],
      ['Orc Shaman', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'lawful evil',
          base_class: 'leader',
          elite: false,
          creature_type: 'humanoid',
          level: 2,
          size: 'medium',
        });
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
      }],
    ]
  );
}

function addTownsfolk(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: "Townsfolk",
      hasArt: false,
      knowledge: {
        normal: `
          Townsfolk are common throughout civilization.
          They are typically found in small groups, preying on travelers or isolated settlements.
        `,
      },
    },
    [
      ['Town Guard', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'lawful neutral',
          base_class: 'warrior',
          elite: false,
          creature_type: 'humanoid',
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

      }],
      ['Town Healer', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'leader',
          elite: false,
          creature_type: 'humanoid',
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
      }],
    ]
  );
}
