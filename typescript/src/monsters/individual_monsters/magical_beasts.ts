import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';
import { BRIEF_COOLDOWN } from '@src/abilities/constants';

export function addMagicalBeasts(grimoire: Grimoire) {
  grimoire.addMonster('Ankheg', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'skirmisher',
      challenge_rating: 4,
      creature_type: 'beast',
      level: 4,
      size: 'large',
    });
    creature.setProperties({
      has_art: true,
    });
    creature.setKnowledgeResults({
      easy: `
        An ankheg is a Large burrowing ant-like creature with large mandibles and a taste for fresh meat.
        It has six legs, and most ankhegs are brown.
        In battle, they try to emerge briefly out of tunnels to ambush unwary foes and drag them underground.
      `,
      normal: `
        A typical adult ankheg is about 10 feet long and weighs about 800 pounds.
        Ankhegs burrow quickly thanks to the powerful acid they naturally produce.
        They are able spit that acid at foes up to 20 feet away.
        When burrowing, they usually do not leave usable tunnels behind them.
        They can choose to do so, though this halves their burrowing speed.
      `,
      hard: `
        When hunting, ankhegs usually dig a winding tunnel up to 40 feet below the surface in the rich soil of forests or farmlands.
        The tunnel usually 5 feet tall and wide, and up to 150 feet long.
        If they have been in an area for some time, they generally store the remains from previous kills at the end of the tunnel.
        When they move on, they leave any valuable objects behind with their old tunnels.
      `,
    });
    creature.setTrainedSkills(['awareness', 'climb']);
    creature.setBaseAttributes([4, 3, 2, -8, 2, 0]);
    // TODO: Add Multipedal modifier bundle
    creature.addCustomMovementSpeed('Burrow (slow)');
    creature.addCustomMovementSpeed('Land (normal)');
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

  grimoire.addMonster('Frostweb Spider', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'skirmisher',
      challenge_rating: 4,
      creature_type: 'beast',
      level: 12,
      size: 'large',
    });
    creature.setTrainedSkills(['awareness', 'balance', 'climb']);
    creature.setBaseAttributes([4, 8, 2, 0, 3, 2]);
    // TODO: Add Multipedal modifier bundle
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
      challenge_rating: 2,
      creature_type: 'beast',
      level: 2,
      size: 'medium',
    });
    creature.setTrainedSkills(['awareness', 'survival']);
    creature.setBaseAttributes([3, 2, 1, -4, 2, -1]);
    // TODO: Add Multipedal modifier bundle
    creature.addCustomSense('Scent');

    creature.addWeaponMult('bite');
  });

  grimoire.addMonster('Nightcrawler', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'brute',
      challenge_rating: 7,
      creature_type: 'beast',
      level: 7,
      size: 'large',
    });
    creature.setProperties({
      has_art: true,
    });
    creature.setKnowledgeResults({
      easy: `
        A nightcrawler is a Large worm imbued with umbramantic power.
        Its body is colored only in shades of gray.
        In battle, they wriggle towards their foes and try to eat them.
      `,
      normal: `
        A typical nightcrawler is about 9 feet long and weighs about 700 pounds.
        They cover distances slowly, but are surprisingly agile in combat.
        They can easily contort their body to avoid attacks.
        Nightcrawlers have several magical abilities that draw on their umbramantic power to damage nearby foes.
      `,
      hard: `
        Nightcrawlers hate and fear light.
        They can be driven away by light, and are weaker in its presence.
        If they have no escape, they ferociously attack any sources of light.
      `,
    });
    creature.setTrainedSkills(['climb']);
    creature.setBaseAttributes([3, 4, 2, -8, 0, 3]);
    // TODO: Add Legless modifier bundle
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
      challenge_rating: 4,
      creature_type: 'beast',
      level: 7,
      size: 'large',
    });
    creature.setProperties({
      has_art: true,
    });
    creature.setKnowledgeResults({
      easy: `
        A hydra maggot is a Large maggot-like creature that wriggles across the ground in search of food.
        It is named for the cluster of tentacles that sprout from its heads, which it uses to grab foes so it can eat them.
      `,
      normal: `
        Hydra maggots are carnivorous, but are not picky, and will feast on rotting carcasses just as happily as they feast on fresh meat.
        When hydra maggots attack, they can shape the tip of their tentacles into a point, allowing them to impale their foes.
        Their tentacles are quite adept at slipping past defenses and through cracks in armor.
      `,
    });
    creature.setTrainedSkills(['climb']);
    creature.setBaseAttributes([6, 6, 1, -8, 2, -1]);
    // TODO: Add Legless modifier bundle
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
      challenge_rating: 2,
      creature_type: 'beast',
      level: 2,
      size: 'small',
    });
    creature.setProperties({
      has_art: true,
    });
    creature.setKnowledgeResults({
      easy: `
        A darkmantle has a small body and a large number of strong tentacles.
        It hides itself on walls and ceilings and drops on its foes to strangle them to death.
      `,
      normal: `
        Darkmantles hang from ceilings using a muscular "foot" at the top of their bodies.
        They can look like a stalactite by holding their tentacles stiffly under themeselves, or like a lump of rock by spreading their tentacles so the membrane between them covers their bodies.
        Their shell and skin usually resemble limestone, but a darkmantle can change its color to match almost any type of stony background.
      `,
      hard: `
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
      challenge_rating: 4,
      creature_type: 'beast',
      level: 5,
      size: 'large',
    });
    creature.setProperties({
      has_art: true,
    });
    creature.setKnowledgeResults({
      easy: `
        Griffons are powerful, majestic creatures with characteristics of both lions and eagles.
        A pair of broad, golden wings emerge from the creature’s back that can span 25 feet or more.
        In battle, they pounce on their foes like a lion.
      `,
      normal: `
        From nose to tail, an adult griffon can measure as much as 8 feet.
        Neither males nor females are endowed with a mane.
        Griffons cannot speak, but they understand Common.
      `,
    });
    creature.setTrainedSkills(['awareness', 'jump']);
    creature.setBaseAttributes([5, 5, 2, -3, 2, 2]);
    // TODO: Add Multipedal modifier bundle
    creature.addCustomMovementSpeed('Fly (fast, 60 ft.)');
    creature.addCustomMovementSpeed('Land (normal)');
    creature.addCustomSense('Low-light Vision');

    creature.addManeuver('Mighty Rushdown', { weapon: 'claws' });
    creature.addManeuver('Rend the Hide', { displayName: "Bloodletting Claws", weapon: 'claws' });

    // Bite
    creature.addWeaponMult('bite', { usageTime: 'elite' })

    // Eagle Eye
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
      challenge_rating: 4,
      creature_type: 'beast',
      level: 7,
      size: 'huge',
    });
    creature.setKnowledgeResults({
      easy: `
        Yrthaks are virtually blind.
        They can "see" around themselves with their blindsight ability, which relies on their incredible hearing.
        Beyond that range, they cannot see, though they can still identify the existence and location of creatures at great range by sound.
      `,
    });
    creature.setTrainedSkills(['awareness', 'stealth']);
    creature.setBaseAttributes([5, 2, 4, -4, 6, 0]);
    // TODO: Add Sightless modifiers
    creature.addCustomMovementSpeed('Fly (fast, 90 ft.)');
    creature.addCustomMovementSpeed('Land (normal)');
    creature.addCustomSense('Blindsight (120 ft.)');
    creature.addCustomSense('Blindsense (240 ft.)');

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
      challenge_rating: 5,
      creature_type: 'beast',
      level: 5,
      size: 'medium',
    });
    creature.setKnowledgeResults({
      easy: `
        A stygian leech is a Medium worm-like creature that feeds on life energy.
        It uses its ability to crawl on walls and ceilings to drop on unsuspecting foes.
      `,
      normal: `
        Stygian leeches instinctively avoid feeding on other stygian leeches, but will otherwise attempt to drain the life from any living creatures, regardless of danger.
        They can instinctively sense the location of any living creatures nearby.
        Their life-draining attacks can allow them to heal themselves.
      `,
      hard: `
        Stygian leeches ignore non-living creatures entirely unless severely provoked.
        Some non-living creatures, such as intelligent undead, take advantage of this by gathering stygian leeches to guard their homes.
      `,
    });
    creature.setTrainedSkills(['climb', 'stealth']);
    creature.setBaseAttributes([5, 2, 4, -6, 2, -2]);
    creature.addCustomMovementSpeed('Climb (normal)');
    creature.addCustomMovementSpeed('Land (normal)');
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
}
