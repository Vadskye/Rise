import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';
import { BRIEF_COOLDOWN } from '@src/abilities/constants';

export function addBeasts(grimoire: Grimoire) {
  grimoire.addMonster('Ankheg', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'skirmisher',
      elite: true,
      creature_type: 'beast',
      level: 4,
      size: 'large',
    });
    creature.setProperties({
      has_art: true,
    });
    creature.setKnowledgeResults({
      normal: `
        An ankheg is a Large burrowing ant-like creature with large mandibles and a taste for fresh meat.
        It has six legs, and most ankhegs are brown.
        In battle, they try to emerge briefly out of tunnels to ambush unwary foes and drag them underground.
      `,
      hard: `
        A typical adult ankheg is about 10 feet long and weighs about 800 pounds.
        Ankhegs burrow quickly thanks to the powerful acid they naturally produce.
        They are able spit that acid at foes up to 20 feet away.
        When burrowing, they usually do not leave usable tunnels behind them.
        They can choose to do so, though this halves their burrowing speed.
      `,
      legendary: `
        When hunting, ankhegs usually dig a winding tunnel up to 40 feet below the surface in the rich soil of forests or farmlands.
        The tunnel usually 5 feet tall and wide, and up to 150 feet long.
        If they have been in an area for some time, they generally store the remains from previous kills at the end of the tunnel.
        When they move on, they leave any valuable objects behind with their old tunnels.
      `,
    });
    creature.setTrainedSkills(['awareness', 'climb']);
    creature.setBaseAttributes([4, 3, 2, -8, 2, 0]);
    creature.addTrait('multipedal');
    creature.addCustomMovementSpeed('Burrow (slow)');
    creature.addCustomSense('Darkvision (60 ft.)');
    creature.addCustomSense('Tremorsense (60 ft.)');

    creature.addGrapplingStrike('bite');
    // area rank 0 is drX+1
    creature.addCustomSpell({
      attack: {
        hit: `\\damageranktwo.`,
        miss: `Half damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarealong, 5 ft. wide line from you.
        `,
      },
      isMagical: false,
      name: 'Spew Acid',
      tags: ['Acid'],
    });
  });

  // Should this be "wasp, giant"?
  grimoire.addMonster('Giant Wasp', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'skirmisher',
      elite: false,
      creature_type: 'beast',
      level: 1,
      size: 'large',
    });
    creature.setKnowledgeResults({
      normal: `
        A giant wasp is a Large insect resembling a normal wasp.
        Giant wasps attack when hungry or threatened, stinging their prey to death.
      `,
      hard: `
        Giant wasps take dead or incapacitated opponents back to their lairs as food for their unhatched young.
      `,
    });
    creature.setTrainedSkills(['awareness', 'balance', 'flexibility', 'stealth']);
    creature.setBaseAttributes([2, 5, 0, -8, 3, -2]);
    creature.addCustomMovementSpeed('Fly (fast, 120 ft.)');
    creature.addCustomSense('Scent');
    creature.addPoisonousStrike(
      'stinger',
      {
        name: 'Giant Wasp Venom',
        injury: true,
        accuracyModifier: 2,
        itMakes: `
          the target \\slowed while the poison lasts.
          Its stage 3 effect also deals \\damagerankthreelow.
        `,
      },
    );
  });

  grimoire.addMonster('Carrion Crow', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'skirmisher',
      elite: false,
      creature_type: 'beast',
      level: 3,
      size: 'small',
    });
    creature.setKnowledgeResults({
      normal: `
        Carrion crows are larger and stronger than ordinary crows.
        They are primarily scavengers, but if hungry, they will ruthlessly mob creatures who seem weak or isolated.
      `,
    });
    creature.addCustomMovementSpeed('Fly (normal, 90 ft.)');
    creature.setTrainedSkills(['awareness']);
    creature.setTrainedSkills([]);
    creature.setBaseAttributes([2, 4, -1, 0, 4, 0]);
    creature.addManeuver('Eye Poke', { displayName: 'Peck Out Your Eyes', weapon: 'beak' });
  });

  grimoire.addMonster('Frostweb Spider', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'skirmisher',
      elite: true,
      creature_type: 'beast',
      level: 12,
      size: 'large',
    });
    creature.setTrainedSkills(['awareness', 'balance', 'climb']);
    creature.setBaseAttributes([4, 8, 2, 0, 3, 2]);
    creature.addTrait('multipedal');
    creature.addCustomSense('Tremorsense (90 ft.)');

    creature.addPoisonousStrike(
      'bite',
      {
        injury: true,
        name: 'frostweb spider venom',
        itMakes: `
          the target \\slowed while the poison lasts.

          The second escalation also inflicts a \\glossterm{vital wound} with a unique vital wound effect.
          Instead of making a \\glossterm{vital roll} for the \\glossterm{vital wound}, the target's blood runs cold.
          Whenever it takes damage from a \\atCold ability, it becomes \\glossterm{briefly} \\paralyzed.
          This effect lasts until the vital wound is removed.
        `,
      },
    );

    // Hailstorm, but Reflex instead of Fortitude and without the ice crystal
    creature.addCustomSpell({
      name: 'Iceweb',

      attack: {
        hit: `
          \\damageranktwo.
        `,
        missGlance: true,
        targeting: `
          Choose a \\smallarea radius within \\shortrange.
          Make an attack vs. Armor and Reflex against everything in the area.
          During your next action, this effect \\glossterm{repeats} in the same area.
        `,
      },
      tags: ['Cold'],
    });

    // Med cone is r1, so drX. Base rank is 4, then +1dr for delay.
    creature.addCustomSpell({
      attack: {
        hit: `
          The target feels a growing chill.
          Duing your next action, it takes \\damagerankfive.
        `,
        missGlance: true,
        targeting: `
          The $name makes a $accuracy attack vs. Fortitude against everything within in a \\medarea cone from it.
        `,
      },
      cost: BRIEF_COOLDOWN,
      name: 'Frost Breath',
      tags: ['Cold'],
      usageTime: 'elite',
    });
  });

  grimoire.addMonster('Warg', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'skirmisher',
      elite: false,
      creature_type: 'beast',
      level: 2,
      size: 'medium',
    });
    creature.setTrainedSkills(['awareness', 'survival']);
    creature.setBaseAttributes([3, 2, 1, -4, 2, -1]);
    creature.addTrait('quadrupedal');
    creature.addCustomSense('Scent');

    creature.addWeaponMult('bite');
  });

  grimoire.addMonster('Nightcrawler', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'brute',
      elite: false,
      creature_type: 'beast',
      level: 7,
      size: 'large',
    });
    creature.setProperties({
      has_art: true,
    });
    creature.setKnowledgeResults({
      normal: `
        A nightcrawler is a Large worm imbued with umbramantic power.
        Its body is colored only in shades of gray.
        In battle, they wriggle towards their foes and try to eat them.
      `,
      hard: `
        A typical nightcrawler is about 9 feet long and weighs about 700 pounds.
        They cover distances slowly, but are surprisingly agile in combat.
        They can easily contort their body to avoid attacks.
        Nightcrawlers have several magical abilities that draw on their umbramantic power to damage nearby foes.
      `,
      legendary: `
        Nightcrawlers hate and fear light.
        They can be driven away by light, and are weaker in its presence.
        If they have no escape, they ferociously attack any sources of light.
      `,
    });
    creature.setTrainedSkills(['climb']);
    creature.setBaseAttributes([3, 4, 2, -8, 0, 3]);
    creature.addTrait('legless');
    creature.addCustomMovementSpeed('Climb (slow)');
    creature.addCustomMovementSpeed('Land (slow)');
    creature.addCustomSense('Darkvision (60 ft.)');
    creature.addCustomSense('Blindsense (120 ft.)');

    creature.addWeaponMult('bite');
    creature.addSpell('My Shadow Hungers', { displayName: 'Crawling Darkness' });
  });

  grimoire.addMonster('Hydra Maggot', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'brute',
      elite: true,
      creature_type: 'beast',
      level: 7,
      size: 'large',
    });
    creature.setProperties({
      has_art: true,
    });
    creature.setKnowledgeResults({
      normal: `
        A hydra maggot is a Large maggot-like creature that wriggles across the ground in search of food.
        It is named for the cluster of tentacles that sprout from its heads, which it uses to grab foes so it can eat them.
      `,
      hard: `
        Hydra maggots are carnivorous, but are not picky, and will feast on rotting carcasses just as happily as they feast on fresh meat.
        When hydra maggots attack, they can shape the tip of their tentacles into a point, allowing them to impale their foes.
        Their tentacles are quite adept at slipping past defenses and through cracks in armor.
      `,
    });
    creature.setTrainedSkills(['climb']);
    creature.setBaseAttributes([6, 6, 1, -8, 2, -1]);
    creature.addTrait('legless');
    creature.addCustomSense('Darkvision (60 ft.)');

    // Grappling Bite
    creature.addGrapplingStrike('bite');

    creature.addCustomManeuver({
      effect: `
        Make a \\glossterm{strike}.
        The attack is made against the target's Reflex defense instead of its Armor defense.
      `,
      name: 'Impaling Tentacles',
      weapon: 'tentacle',
      usageTime: 'elite',
      tags: ['Sweeping (7)'],
    });
    creature.addSpell('Putrefying Blast', { displayName: 'Maggot Breath' });
  });

  grimoire.addMonster('Darkmantle', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'skirmisher',
      elite: false,
      creature_type: 'beast',
      level: 2,
      size: 'small',
    });
    creature.setProperties({
      has_art: true,
    });
    creature.setKnowledgeResults({
      normal: `
        A darkmantle has a small body and a large number of strong tentacles.
        It hides itself on walls and ceilings and drops on its foes to strangle them to death.
      `,
      hard: `
        Darkmantles hang from ceilings using a muscular "foot" at the top of their bodies.
        They can look like a stalactite by holding their tentacles stiffly under themeselves, or like a lump of rock by spreading their tentacles so the membrane between them covers their bodies.
        Their shell and skin usually resemble limestone, but a darkmantle can change its color to match almost any type of stony background.

        A darkmantle that misses its initial attack often climbs away and tries to drop on the opponent again if there is a conveniently placed wall.
        Otherwise, it tries to climb its opponent's body to suffocate its head.
        Darkmantles move very slowly, so they rely heavily on stealth to ambush their foes.
      `,
    });
    creature.setTrainedSkills(['awareness', 'climb', 'stealth']);
    creature.setBaseAttributes([4, 3, -2, -6, 3, 0]);
    creature.addCustomMovementSpeed('Climb (slow)');
    creature.addCustomMovementSpeed('Land (slow)');
    creature.addCustomSense('Darkvision (120 ft.)');

    creature.addGrapplingStrike('tentacle');
  });

  grimoire.addMonster('Griffon', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'skirmisher',
      elite: true,
      creature_type: 'beast',
      level: 5,
      size: 'large',
    });
    creature.setProperties({
      has_art: true,
    });
    creature.setKnowledgeResults({
      normal: `
        Griffons are powerful, majestic creatures with characteristics of both lions and eagles.
        A pair of broad, golden wings emerge from the creature’s back that can span 25 feet or more.
        In battle, they pounce on their foes like a lion.
      `,
      hard: `
        From nose to tail, an adult griffon can measure as much as 8 feet.
        Griffons cannot speak, but they understand Common.
      `,
    });
    creature.setTrainedSkills(['awareness', 'jump']);
    creature.setBaseAttributes([5, 5, 2, -3, 2, 2]);
    creature.addTrait('quadrupedal');
    creature.addCustomMovementSpeed('Fly (fast, 60 ft.)');
    creature.addCustomSense('Low-light Vision');

    creature.addManeuver('Rend the Hide', { displayName: "Bloodletting Claws", usageTime: 'elite', weapon: 'claws' });

    creature.addWeaponMult('bite');
    creature.addManeuver('Mighty Rushdown', { displayName: 'Rushdown', weapon: 'bite' });

    creature.addCustomManeuver({
      effect: `
        The $name makes a $accuracy attack vs. Reflex against against one non-adjacent creature within \\distrange.
        \\hit The target becomes marked as a condition.
        If the $name loses sight of the target for a full round, this effect ends.
        The $name gains a +2 bonus to accuracy and defenses against all targets that it has marked in this way.
      `,
      name: 'Eagle Eye',
      usageTime: 'elite',
    });
  });

  grimoire.addMonster('Yrthak', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'skirmisher',
      elite: true,
      creature_type: 'beast',
      level: 7,
      size: 'huge',
    });
    creature.setKnowledgeResults({
      normal: `
        Yrthaks are virtually blind.
        They can "see" around themselves with their blindsight ability, which relies on their incredible hearing.
        Beyond that range, they cannot see, though they can still identify the existence and location of creatures at great range by sound.
      `,
    });
    creature.setTrainedSkills(['awareness', 'stealth']);
    creature.setBaseAttributes([5, 2, 4, -4, 6, 0]);
    // TODO: Add Sightless modifiers
    creature.addCustomMovementSpeed('Fly (fast, 90 ft.)');
    creature.addCustomSense('Blindsight (120 ft.)');
    creature.addCustomSense('Blindsense (240 ft.)');
    creature.addPassiveAbility({
      name: 'Sightless',
      effect: `
        The $name uses its hearing to "see".
        While it is deafened, it loses its natural blindsight and blindsense abilities, making it \\blinded.
      `,
    });

    // rank 3 effect, r0 area gives drX+1
    creature.addCustomManeuver({
      attack: {
        hit: `\\damagerankfour.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Fortitude against all creatures in a \\medarealong, 5 ft. wide line.
        `,
      },
      name: 'Sonic Lance',
      tags: ['Auditory'],
      usageTime: 'elite',
    });

    creature.addGrapplingStrike('bite');
  });

  grimoire.addMonster('Stygian Leech', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'brute',
      elite: false,
      creature_type: 'beast',
      level: 5,
      size: 'medium',
    });
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
    creature.setTrainedSkills(['climb', 'stealth']);
    creature.setBaseAttributes([5, 2, 4, -6, 2, -2]);
    creature.addTrait('legless');
    creature.addCustomMovementSpeed('Climb (normal)');
    creature.addCustomSense('Darkvision (120 ft.)');
    creature.addCustomSense('Lifesense (120 ft.)');

    creature.addCustomManeuver({
      effect: `
        Make a \\glossterm{strike}.
        \\injury If the target has blood, the $name regains \\damageranktwo hit points at the end of the round.
      `,
      name: 'Leech Life',
      weapon: 'bite',
    });
  });

  addAnimals(grimoire);
  addDireAnimals(grimoire);
  addIchorTainted(grimoire);
}

function addAnimals(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Animals',
      knowledge: {
        easy: `
          All animals are \\glossterm{mundane} and cannot speak.
          They are easier to influence with the Creature Handling skill than other creatures.
        `,
      },
    },
    [
      ['Baboon', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'skirmisher',
          elite: false,
          creature_type: 'beast',
          level: 1,
          size: 'medium',
        });
        creature.setKnowledgeResults({
          normal: `
            A baboon is an aggressive primate adapted to life on the ground.
            A typical baboon is the size of a big dog.
          `,
          hard: `
            Baboons prefer open spaces but climb trees to find safe places to rest overnight.
            They can be aggressive, though they avoid attacking creatures that seem too dangerous.
          `,
        });
        creature.setTrainedSkills(['awareness']);
        creature.setBaseAttributes([2, 3, 1, -8, 2, -1]);
        creature.addWeaponMult('claws');
        creature.addCustomMovementSpeed('Climb (normal)');
      }],
      ['Badger', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'warrior',
          elite: false,
          creature_type: 'beast',
          level: 1,
          size: 'medium',
        });
        creature.setKnowledgeResults({
          normal: `
            A badger is a furry animal with a squat, powerful body.
            Badgers can be tenacious in combat.
          `,
          hard: `
            Badgers have strong forelimbs that are armed with long claws for digging.
            A typical adult badger is 2 to 3 feet long and weighs 25 to 35 pounds.
          `,
        });
        creature.setTrainedSkills(['endurance']);
        creature.setBaseAttributes([-2, 2, 3, -8, 1, -1]);
        creature.addTrait('quadrupedal');
        creature.addCustomSense('Scent');
        creature.addWeaponMult('claws');
      }],
      ['Black Bear', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'brute',
          elite: true,
          creature_type: 'beast',
          level: 1,
          size: 'medium',
        });
        creature.setKnowledgeResults({
          normal: `
            Black bears are forest-dwelling omnivores that are usually not dangerous unless an interloper threatens their cubs or food supply.
            They can be pure black, blond, or cinnamon in color, and are rarely more than 5 feet long.
            A typical black bear can be easily frightened away by loud noises and creatures that appear large.
          `,
        });
        creature.setBaseAttributes([4, 0, 5, -8, 2, -2]);
        creature.addTrait('quadrupedal');
        creature.addCustomSense('Scent');
        creature.setTrainedSkills(['awareness', 'climb', 'endurance', 'survival', 'swim']);
        creature.addWeaponMult('bite', { usageTime: 'elite' });
        creature.addWeaponMult('claws');
      }],
      ['Brown Bear', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'brute',
          elite: true,
          creature_type: 'beast',
          level: 3,
          size: 'large',
        });
        creature.setKnowledgeResults({
          normal: `
            Brown bears tend to be bad-tempered and territorial.
          `,
        });
        creature.setProperties({
          description: "A brown bear's statistics can be used for almost any big bear, including a grizzly bear.",
        });
        creature.setBaseAttributes([5, 0, 6, -8, 1, 0]);
        creature.addTrait('quadrupedal');
        creature.addCustomSense('Scent');
        creature.setTrainedSkills(['awareness', 'climb', 'endurance', 'survival', 'swim']);
        creature.addWeaponMult('bite', { usageTime: 'elite' });
        creature.addWeaponMult('claws');
      }],
      ['Camel', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'brute',
          elite: false,
          creature_type: 'beast',
          level: 1,
          size: 'large',
        });
        creature.setKnowledgeResults({
          normal: `
            Camels are known for their ability to travel long distances without food or water.
          `,
        });
        creature.setTrainedSkills(['endurance']);
        creature.setBaseAttributes([3, 0, 3, -8, 1, 0]);
        creature.addTrait('quadrupedal');
        creature.addWeaponMult('bite');
      }],
      ['Cat', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'skirmisher',
          elite: false,
          creature_type: 'beast',
          level: 1,
          size: 'small',
        });
        creature.setTrainedSkills(['awareness', 'balance', 'flexibility', 'stealth']);
        creature.setBaseAttributes([-7, 4, -3, -7, 2, -2]);
        creature.addTrait('quadrupedal');
        creature.addCustomSense('Scent');
        creature.addWeaponMult('bite');
      }],
      ['Dog', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'skirmisher',
          elite: false,
          creature_type: 'beast',
          level: 1,
          size: 'medium',
        });
        creature.setKnowledgeResults({
          normal: `
            Some dogs are trained to serve as steeds for halflings and kobolds.
            Such riding dogs may be trained for combat, or may be only used for travel.
          `,
        });
        creature.setProperties({
          description: `
            These statistics can be used for any large dog or similar creature, such as an ordinary wolf.
            For particularly small dogs, use the statistics for a cat instead.
          `,
        });
        creature.setTrainedSkills(['awareness', 'survival']);
        creature.setBaseAttributes([0, 1, 0, -7, 2, -1]);
        creature.addTrait('quadrupedal');
        creature.addCustomSense('Scent');
        creature.addWeaponMult('bite');
      }],
      ['Draft Horse', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'brute',
          elite: false,
          creature_type: 'beast',
          level: 2,
          size: 'large',
        });
        creature.setKnowledgeResults({
          normal: `
            Draft horses are typically used to work farms.
            They are slower than light horses, but stronger.
            They are the cheapest type of horse that is normally available.
          `,
        });
        creature.setTrainedSkills(['endurance']);
        creature.addCustomMovementSpeed('Land (slow)');
        creature.setBaseAttributes([4, 1, 2, -8, 0, -2]);
      }],
      ['Light Horse', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'skirmisher',
          elite: false,
          creature_type: 'beast',
          level: 2,
          size: 'large',
        });
        creature.setKnowledgeResults({
          normal: `
            Light horses are typically used to carry riders, not to work or fight.
          `,
        });
        creature.setBaseAttributes([2, 2, -1, -8, 0, -2]);
      }],
      ['Pony', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'brute',
          elite: false,
          creature_type: 'beast',
          level: 2,
          size: 'medium',
        });
        creature.setTrainedSkills(['endurance']);
        creature.setBaseAttributes([2, 0, 2, -8, 0, -2]);
        creature.addTrait('quadrupedal');
        creature.addWeaponMult('bite');
      }],
      ['Warhorse', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'skirmisher',
          elite: false,
          creature_type: 'beast',
          level: 3,
          size: 'large',
        });
        creature.setKnowledgeResults({
          normal: `
            Warhorses are trained to carry riders into battle.
            They are superior to other types of horses, but more expensive.
          `,
        });
        creature.setBaseAttributes([4, 2, 2, -8, 0, 0]);
      }],
    ],
  );
}

function addDireAnimals(grimoire: Grimoire) {
  // Dire animals are +1 size category and +3 levels over the base animal.
  grimoire.addMonsterGroup(
    {
      name: "Dire Animals",
      knowledge: {
        normal: `
          Dire animals are monstrous variants of ordinary animals.
          They are larger, stronger, and more aggressive.
          Like animals, they are more susceptible to the Creature Handling skill, though their aggression makes any lapse in control more dangerous.
        `,
      },
    },
    [
      ['Dire Rat', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'skirmisher',
          elite: false,
          creature_type: 'beast',
          level: 1,
          size: 'small',
        });
        creature.setProperties({
          has_art: true,
        });
        creature.setKnowledgeResults({
          normal: `
            A dire rat is a Small omnivorous scavenger that resembles an unusually large rat.
            Dire rats are not generally aggressive, but will attack to defend their nests and territories.
            Dire rats can grow to be up to 3 feet long and weigh over 20 pounds.
          `,
        });
        creature.setTrainedSkills(['awareness', 'climb', 'stealth']);
        creature.setBaseAttributes([1, 4, 0, -9, 3, -2]);
        creature.addTrait('quadrupedal');
        creature.addCustomSense('Scent');
        creature.addManeuver('Gutshot', { displayName: 'Noxious Bite', weapon: 'bite' });
      }],
      ['Dire Wolf', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'skirmisher',
          elite: false,
          creature_type: 'beast',
          level: 4,
          size: 'large',
        });
        creature.setProperties({
          has_art: true,
        });
        creature.setKnowledgeResults({
          normal: `
            A dire wolf is a wolf-like creature that is much larger than an ordinary wolf.
            Their fur is usually mottled gray or black.
            Dire wolves are efficient pack hunters that will kill anything they can catch.
          `,
        });
        creature.setTrainedSkills(['awareness']);
        creature.setBaseAttributes([4, 4, 1, -7, 3, 0]);
        creature.addTrait('quadrupedal');
        creature.addCustomSense('Scent');
        creature.addManeuver('Crush the Fallen', { weapon: 'bite' });
        creature.addManeuver('Knockdown', { weapon: 'bite' });
      }],
    ]
  );
}

function addIchorTainted(grimoire: Grimoire) {
  // Ichor creatures should be +6 levels over their animal counterpart

  grimoire.addMonsterGroup(
    {
      name: "Ichor-Tainted",
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
      }
    },
    [
      ['Ichor Black Bear', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'brute',
          elite: true,
          creature_type: 'beast',
          level: 7,
          size: 'medium',
        });
        creature.setTrainedSkills(['awareness', 'climb', 'endurance', 'survival', 'swim']);
        creature.setBaseAttributes([6, 2, 7, -8, 2, -2]);
        creature.addTrait('quadrupedal');
        creature.addCustomSense('Scent');

        creature.addWeaponMult('bite', { usageTime: 'elite' });
        creature.addWeaponMult('claws');
      }],
      ['Ichor Brown Bear', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'brute',
          elite: true,
          creature_type: 'beast',
          level: 9,
          size: 'large',
        });
        creature.setTrainedSkills(['awareness', 'climb', 'endurance', 'survival', 'swim']);
        creature.setBaseAttributes([7, 1, 8, -8, 2, 1]);
        creature.addTrait('quadrupedal');
        creature.addCustomSense('Scent');

        creature.addWeaponMult('bite', { usageTime: 'elite' });
        creature.addWeaponMult('claws');
      }],
      ['Ichor Wolf', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral',
          base_class: 'skirmisher',
          elite: false,
          creature_type: 'beast',
          level: 7,
          size: 'medium',
        });
        creature.setTrainedSkills(['awareness', 'survival']);
        creature.setBaseAttributes([4, 5, 3, -7, 4, 0]);
        creature.addTrait('quadrupedal');

        creature.addManeuver('Crush the Fallen', { weapon: 'bite' });
        creature.addManeuver('Knockdown', { weapon: 'bite' });
      }],
    ],
  );
}
