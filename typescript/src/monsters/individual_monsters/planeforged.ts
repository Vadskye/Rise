import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';

export function addPlaneforged(grimoire: Grimoire) {
  addAngels(grimoire);
  addAirElementals(grimoire);
  addDemonspawn(grimoire);
  addFireElementals(grimoire);
  addMagmaElementals(grimoire);
  addFormians(grimoire);

  // Imps
  grimoire.addMonsterGroup(
    {
      name: 'Imps',
      hasArt: false,
    },
    [
      [
        'Flamefist Imp',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'planeforged',
            level: 5,
            size: 'small',
          });
          creature.addTrait('soulless');
          creature.setBaseAttributes([3, 5, 2, 1, 0, -2]);
          creature.addWeaponMult('fists', { tags: ['Fire'] });
        },
      ],
    ],
  );
}

function addAngels(grimoire: Grimoire) {
  function angel(creature: Creature) {
    const rank = creature.calculateRank();
    let teleportRange: string;
    if (rank >= 7) {
      teleportRange = '\\extrange';
    } else if (rank >= 5) {
      teleportRange = '\\distrange';
    } else if (rank >= 3) {
      teleportRange = '\\longrange';
    } else {
      teleportRange = '\\medrange';
    }

    creature.addTrait('soulless');
    creature.addImmunity('Frightened');
    creature.addImmunity('Panicked');

    creature.addPassiveAbility({
      name: 'Divine Radiance',
      effect: `
        The $name constantly radiates \\glossterm{bright illumination} in a \\largearea radius.
      `,
    });
    creature.addCustomSpell({
      name: 'Divine Translocation',
      effect: `
        The $name \\glossterm{teleports} into an unoccupied location within ${teleportRange}.
        It can teleport in any direction and does not need to land on stable ground.
      `,
      usageTime: 'elite',
    });

    creature.addCustomMovementSpeed('Fly (normal, 60 ft. limit)');
  }

  grimoire.addMonsterGroup(
    {
      name: 'Angels',
      hasArt: false,
      knowledge: {
        easy: `
          Angels are the ultimate champions of good in the endless battle of good and evil.
          They are native to Elysium, and they often serve the interests of good-aligned deities.
        `,
        normal: `
          All angels have a striking and highly memorable appearance that evokes strong emotions in most viewers.
          Most angels evoke an overpowering sense of awe and beauty, but individual angels may have highly varied appearances.
        `,
        hard: `
          In battle, angels are feared for their fundamental perfection.
          They tend not to have any weaknesses for attackers to use against them.
          Their only true foes are demons, who use overwhelming hordes rather than any clever tactics.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        angel(creature);
      },
    },
    [
      [
        'Seraph',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral good',
            base_class: 'leader',
            elite: true,
            creature_type: 'planeforged',
            level: 16,
            size: 'huge',
          });
          creature.setBaseAttributes([8, 8, 8, 8, 8, 8]);
          creature.setProperties({
            has_art: true,
          });
          creature.setKnowledgeResults({
            normal: `
              Seraphim are six-winged angels of immense power.
              They burn with holy fire, which they use to immolate evildoers.
              A seraph resembles a massive serpent that leaves a trail of fire as it flies.
            `,
            hard: `
              Despite their serpentine appearance, seraphim have beautiful singing voices.
              They sing almost constantly both in and out of combat.
            `,
          });
          creature.setTrainedSkills(['awareness', 'endurance']);
          creature.addRituals(['Channel Divinity', 'Prayer']);
          creature.addSpell('Mighty Pyroclasm', { usageTime: 'elite' });
          creature.addSpell('Immolating Fireball', { usageTime: 'elite' });
          creature.addWeaponMult('bite', { tags: ['Fire'] });
        },
      ],
      [
        'Justicar',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful good',
            base_class: 'warrior',
            elite: true,
            creature_type: 'planeforged',
            level: 13,
            size: 'large',
          });
          creature.setBaseAttributes([7, 7, 7, 7, 7, 7]);
          creature.setProperties({
            has_art: true,
          });
          creature.setKnowledgeResults({
            normal: `
              Justicars enforce justice on good-aligned planes.
              They are extremely skilled at identifying the truth of any situation, and act to deal justice however they see fit.
              Physically, a justicar appears similar to a large human with strong muscles and a constantly stern expression.
            `,
            hard: `
              In rare circumstances, justicars may leave good-aligned planes to pursue those they see as exceptionally heinous criminals.
              Generally, this requires that the perpetrator committed a direct offense against a good deity or desecrated an area of a good-aligned plane.
              Justicars have no interest in mortal matters or minor crimes.
            `,
            legendary: `
              Once, a group of thugs and murderers broke through a magic seal guarding an ancient wizard's tower, intending to loot everything inside.
              They were shocked when a justicar suddenly appeared in front of them, and prepared to fight for their lives.
              However, the justicar ignored them.
              Instead, it killed the ancient wizard of the tower and disappeared, leaving the spoils to the evildoers who broke the seal.

              This is the morality of a justicar.
              They consider only truly immense evils to be worthy of their attention, and ignore all lesser sins.
            `,
          });
          creature.setTrainedSkills([
            'awareness',
            'deduction',
            'endurance',
            'intimidate',
            'social_insight',
          ]);

          creature.addWeaponMult('greatsword');
          creature.addRituals(['Channel Divinity', 'Revelation']);
          creature.addSpell('Baffling Visions', { usageTime: 'elite' })
          creature.addSpell('Clairvoyance', { usageTime: 'elite' })
          creature.addSpell('Foresee Distant Safety', { usageTime: 'elite' })
        },
      ],
      [
        'Ophan',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral good',
            base_class: 'skirmisher',
            elite: true,
            creature_type: 'planeforged',
            level: 10,
            size: 'large',
          });
          creature.setBaseAttributes([4, 5, 7, 4, 4, 6]);
          creature.setProperties({
            has_art: true,
          });
          creature.setKnowledgeResults({
            normal: `
              Ophanim resemble burning wheels rimmed with many eyes.
              They serve as sentries and guardians of planar portals in good-aligned planes.
              In combat, they spin into a raging whirlwind.
            `,
          });
          creature.setTrainedSkills(['awareness', 'endurance']);

          creature.addSpell('Pyroclasm', { usageTime: 'elite' });
          creature.addSpell('Mighty Combustion', { usageTime: 'elite' });
          creature.addSpell('Stoke the Fires', { usageTime: 'elite' });
          creature.addManeuver('Whirlwind+', { weapon: 'ram' });
        },
      ],
    ],
  );
}

function addAirElementals(grimoire: Grimoire) {
  function airElemental(creature: Creature) {
    creature.addTrait('floating');
    creature.addTrait('soulless');
    creature.addImpervious('Air');
    creature.addVulnerability('Earth');
    creature.addVulnerability('Electricity');
    creature.addPassiveAbility({
      name: 'Wind Screen',
      effect: `
        The $name gains a +2 bonus to its defenses against ranged strikes.
      `,
      isMagical: true,
    });

    const rank = creature.calculateRank();
    creature.addSpell('Windblast');
    if (rank >= 3) {
      creature.addSpell('Windslash');
    }
    if (rank >= 4) {
      creature.addSpell('Windsnipe');
    }

    // Knockdown and generic weapon damage
    if (rank >= 3) {
      creature.addManeuver('Knockdown+', { weapon: 'fists' });
    } else {
      creature.addManeuver('Knockdown', { weapon: 'fists' });
    }
    creature.addWeaponMult('fists');

    creature.addCustomMovementSpeed('Fly (normal, limitless)');
  }

  grimoire.addMonsterGroup(
    {
      name: 'Air Elementals',
      hasArt: true,
      knowledge: {
        normal: `
          Air elementals are formed from the pure essence of the Plane of Air.
          They can fly through the air with agile ease, but they tend to be physically frail.
        `,
        hard: `
          Air elementals have no insulation in their wispy bodies, making them vulnerable to electrical attacks.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        airElemental(creature);
      },
    },
    [
      [
        'Breeze',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'planeforged',
            level: 4,
            size: 'small',
          });
          creature.setBaseAttributes([2, 5, 0, -3, 2, 0]);
        },
      ],
      [
        'Gale',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'planeforged',
            level: 8,
            size: 'medium',
          });
          creature.setBaseAttributes([4, 6, 0, -2, 3, 0]);
        },
      ],
      [
        'Tempest',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'planeforged',
            level: 12,
            size: 'large',
          });
          creature.setBaseAttributes([4, 7, 0, -2, 4, 0]);
        },
      ],
      [
        'Tornado',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'planeforged',
            level: 16,
            size: 'large',
          });
          creature.setBaseAttributes([4, 8, 1, -2, 4, 0]);
        },
      ],
      [
        'Elder',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'planeforged',
            level: 20,
            size: 'huge',
          });
          creature.setBaseAttributes([4, 9, 1, -2, 4, 0]);
        },
      ],
    ],
  );
}

function addFireElementals(grimoire: Grimoire) {
  function fireElemental(creature: Creature) {
    const rank = creature.calculateRank();
    creature.addTrait('soulless');
    creature.addImmunity('Fire');
    creature.addImpervious('Cold');
    creature.addVulnerability('Water');
    creature.addSpell('Combustion');
    if (rank >= 2) {
      creature.addSpell('Ignition');
    }
    if (rank >= 3) {
      creature.addSpell('Fireball');
    }
  }

  grimoire.addMonsterGroup(
    {
      name: 'Fire Elementals',
      hasArt: true,
      knowledge: {
        normal: `
          Fire elementals are formed from the pure essence of the Plane of Fire.
          They tend to be fast and agile, and they burn their opponents to ash in combat.
        `,
        hard: `
          Fire elementals burn fast and bright, with little insulation from their surroundings.
          This makes them vulnerable to cold attacks, which can chill their very core.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        fireElemental(creature);
      },
    },
    [
      [
        'Ember',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'planeforged',
            level: 4,
            size: 'small',
          });
          creature.setBaseAttributes([2, 4, 0, -3, 0, 2]);
        },
      ],
      [
        'Kindled',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'planeforged',
            level: 8,
            size: 'medium',
          });
          creature.setBaseAttributes([4, 5, 0, -2, 0, 2]);
        },
      ],
      [
        'Bonfire',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'planeforged',
            level: 12,
            size: 'large',
          });
          creature.setBaseAttributes([5, 6, 0, -2, 0, 3]);
        },
      ],
      [
        'Inferno',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'planeforged',
            level: 16,
            size: 'large',
          });
          creature.setBaseAttributes([6, 6, 2, 1, 2, 3]);
        },
      ],
      [
        'Elder',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'planeforged',
            level: 20,
            size: 'huge',
          });
          creature.setBaseAttributes([7, 7, 2, 2, 2, 4]);
        },
      ],
    ],
  );
}

function addDemonspawn(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: 'Demonspawn',
      hasArt: false,
      knowledge: {
        normal: `
          Demonspawn are infernal beings that live in the Abyss.
          They are the weakest and least intelligent type of demon, but they are still dangerous to mortals.
        `,
        hard: `
          Demonspawn were formed in the torturous flames of the Abyss.
          They are all resistant to fire.
          Like many demons, they are vulnerable to cold iron weapons.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        creature.addImpervious('Fire');
        creature.addTrait('soulless');
        creature.addVulnerability('Cold iron weapons');
      },
    },
    [
      [
        'Rageborn Demon',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'brute',
            elite: true,
            creature_type: 'planeforged',
            level: 5,
            size: 'large',
          });
          creature.setBaseAttributes([8, 3, 2, -4, 2, 4]);
          creature.setProperties({
            has_art: true,
          });
          creature.setKnowledgeResults({
            normal: `
              Rageborn demons are anger personified.
              They lash out constantly and violently at everything around them.
              If they are left alone, they simply destroy their environment.
            `,
            hard: `
              Since rageborn demons normally feel only anger, they have little experience with other emotions.
              This makes them easy to mislead with magical effects that manipulate their emotions.
            `,
          });
          creature.setTrainedSkills(['endurance']);
          creature.addVulnerability('Emotion');

          creature.addWeaponMult('fists');
          creature.addManeuver('Gutshot', { usageTime: 'elite', weapon: 'fists' });
          creature.addManeuver('Rushdown', { usageTime: 'elite', weapon: 'fists' });
          creature.addManeuver('Whirlwind', { usageTime: 'elite', weapon: 'fists' });
        },
      ],
      [
        'Painborn Demon',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral evil',
            base_class: 'warrior',
            elite: true,
            creature_type: 'planeforged',
            level: 7,
            size: 'medium',
          });
          creature.setBaseAttributes([4, 2, 8, -4, 1, 1]);
          creature.setProperties({
            has_art: true,
          });
          creature.setKnowledgeResults({
            normal: `
              Painborn demons are pain personified.
              They are covered in spikes that pierce their own skin, shifting and causing them pain whenever they move.
              These unfortunate creatures suffer continously, and they try to share that suffering with anything around them.
            `,
            hard: `
              Painborn demons have a hidden desire that most of them do not even consciously realize: the desire to give up control.
              Fighting through their constant pain is mentally taxing.
              Magical effects that compel their actions, freeing them from the burden of choice, are their greatest weakness.
            `,
          });
          creature.setTrainedSkills(['endurance']);
          creature.addVulnerability('Compulsion');

          creature.addGrapplingStrike('claws');
          creature.addCustomManeuver({
            name: 'Impale',
            attack: {
              hit: '\\damagerankfive.',
              targeting: `
                Make a \\glossterm{brawling attack} vs. Armor using a \\glossterm{free hand} against a creature you are \\glossterm{grappling}.
              `,
            },
            rank: 3,
            tags: ['Brawling'],
          });
          creature.addSpell('Agony', { usageTime: 'elite' });
          creature.addSpell('Sanguine Bond', { displayName: 'Painbond',  usageTime: 'elite' });

          creature.addCustomManeuver({
            name: 'Spiked Body',
            attack: {
              hit: '\\damagerankone.',
              targeting: `
                Whenever a creature attacks the $name with a melee strike using a non-Long weapon, it risks being impaled by spikes.
                The $name makes an $accuracy \\glossterm{reactive attack} vs. Armor against the creature that attacked it.
              `,
            },
            usageTime: 'triggered',
          });
        },
      ],
      [
        'Soulfire Demon',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'sniper',
            elite: true,
            creature_type: 'planeforged',
            level: 14,
            size: 'large',
          });
          creature.setProperties({
            has_art: true,
          });
          creature.setBaseAttributes([3, 2, 3, 2, 6, 7]);
          creature.addPassiveAbility({
            name: 'Soulfire',
            effect: `
              Whenever the $name \\glossterm{injures} a creature, that creature is \\glossterm{briefly} unable to regain \\glossterm{hit points}.
            `,
            isMagical: true,
          });
          // TODO: decide a clearer pattern for standard vs elite here
          creature.addSpell('Mighty Burning Grasp');
          creature.addSpell('Ignition');
          creature.addSpell('Split Fireball');
          creature.addSpell('Mighty Pyrohemia', { usageTime: 'elite' });
          creature.addSpell('Flame Dash', { usageTime: 'elite' });
          creature.addSpell('Stoke the Fires', { usageTime: 'elite' });
        },
      ],
      [
        'Atrophic Demon',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'chaotic evil',
            base_class: 'skirmisher',
            elite: true,
            creature_type: 'planeforged',
            level: 11,
            size: 'large',
          });
          creature.addPassiveAbility({
            name: 'Atrophy',
            effect: `
              Whenever the $name \\glossterm{injures} a creature, that creature suffers a \\minus1 penalty to all defenses as a \\glossterm{condition}.
              This condition stacks with itself, up to a maximum penalty of \\minus5.
            `,
            isMagical: true,
          });
          creature.setBaseAttributes([4, 6, 0, 1, 2, 4]);
          creature.addSpell('Quicksilver Ambush', { weapon: 'claws' });
          creature.addSpell('Quicksilver Perfection', { weapon: 'claws' });
          creature.addSpell('Wave of Senescence', { usageTime: 'elite' });
          creature.addSpell('Stutterstop', { usageTime: 'elite' });
          creature.addSpell('Slow', { usageTime: 'elite' });
        },
      ],
    ],
  );
}

function addMagmaElementals(grimoire: Grimoire) {
  function magmaElemental(creature: Creature) {
    creature.addTrait('soulless');
    creature.addImpervious('Earth');
    creature.addImmunity('Fire');
    creature.addImpervious('Cold');
    creature.addVulnerability('Acid');
    creature.addVulnerability('Water');

    creature.addSpell('Combustion');
    creature.addSpell('Rock Throw', {
      displayName: 'Magma Throw',
      tags: ['Fire'],
    });
    creature.addWeaponMult('fists');
  }

  grimoire.addMonsterGroup(
    {
      name: 'Magma Elementals',
      hasArt: true,
      knowledge: {
        normal: `
          Magma elementals are a fusion of the Plane of Earth and the Plane of Fire.
          They combine the durability of earth elementals with some of the agility of fire elementals.
          Their outer shell appears rocky, but inside that shell they hold molten rock at incredible temperatures.
        `,
        hard: `
          Magma elementals lack the usual weaknesses of both fire elementals and earth elementals.
          Their massive internal heat, steadied by their rocky core, makes them resistant to cold.
          However, they fear and avoid water, as it reacts explosively with their bodies.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        magmaElemental(creature);
      },
    },
    [
      [
        'Volcanite',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'warrior',
            elite: false,
            creature_type: 'planeforged',
            level: 6,
            size: 'medium',
          });
          creature.setBaseAttributes([4, 4, 6, -4, 0, 0]);
        },
      ],
      [
        'Volcano',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'warrior',
            elite: false,
            creature_type: 'planeforged',
            level: 12,
            size: 'large',
          });
          creature.setBaseAttributes([5, 5, 8, -3, 0, 1]);
        },
      ],
      [
        'Volcanic Titan',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'warrior',
            elite: false,
            creature_type: 'planeforged',
            level: 18,
            size: 'huge',
          });
          creature.setBaseAttributes([6, 6, 10, -3, 0, 2]);
        },
      ],
    ],
  );
}

function addFormians(grimoire: Grimoire) {
  function formian(creature: Creature) {
    const rank = creature.calculateRank();
    let tremorsenseRadius: number;
    if (rank >= 7) {
      tremorsenseRadius = 480;
    } else if (rank >= 5) {
      tremorsenseRadius = 240;
    } else if (rank >= 3) {
      tremorsenseRadius = 120;
    } else {
      tremorsenseRadius = 60;
    }
    const tremorsightRadius = tremorsenseRadius / 4;

    creature.addCustomSense(`Tremorsense (${tremorsenseRadius} ft.)`);
    creature.addCustomSense(`Tremorsight (${tremorsightRadius} ft.)`);

    creature.addPassiveAbility({
      name: 'Hive Mind',
      effect: `
        All formians within 50 miles of their queen are in constant telepathic communication with her, regardless of any intervening physical obstacles.
        They instantaneously share information about threats and discoveries.
        This allows formians to usually respond to new information intelligently and in perfect unison, regardless of each formian's individual intelligence.
      `,
      isMagical: true,
    });
    creature.addImpervious('Earth');
    creature.addTrait('multipedal');
  }

  grimoire.addMonsterGroup(
    {
      name: 'Formians',
      hasArt: true,
      knowledge: {
        normal: `
          Formians are ant-like inhabitants native to Ordus, the Aligned Plane of law.
          They share a hive mind that allows telepathic communication at great distances.
        `,
        hard: `
          All formians can sense their surroundings instinctively by feeling tremors in the ground.
          Most formians are simple drones with no independent thought or agency; they act only as directed by their queen.
          As a result, they fight with no concern for their own lives, serving only the greater good of the group.
          They may still retreat to avoid expending unnecessary resources on a battle that is already lost.
        `,
        legendary: `
          Formians often attempt to set up colonies in unclaimed locations on other planes to expand their influence, though they never attack civilizations or sentient creatures to do so.
          Once they have established their colonies, they consider themselves to have a rightful claim to that land, and they can be highly territorial.

          If a formian queen is killed, all formians it was controlling immediately become inert, taking no actions of any kind.
          These isolated formians typically die of dehydration or similar causes, though in rare cases they may be claimed by another formian queen.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        formian(creature);
      },
    },
    [
      [
        'Worker',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'planeforged',
            level: 1,
            size: 'medium',
          });
          creature.addTrait('simple-minded');
          creature.addWeaponMult('bite');
          creature.setTrainedSkills(['craft_stone', 'craft_metal']);
          creature.setBaseAttributes([1, 3, -1, -2, 0, -2]);
          creature.setKnowledgeResults({
            normal: `
              Workers are the basic building blocks of formian society.
              A typical worker is about 3 feet long and about 2-1/2 feet high at the front.
              Its hands are suitable only for manual labor.
            `,
            hard: `
              Individual workers are simple-minded, but they are given instructions by the hive mind.
              Even the smallest formian colony typically has hundreds of workers, and larger colonies can have tens of thousands.
              Workers are generally given orders by a formian queen in groups of at least five, and it is rare to see an individual worker on its own.
            `,
          });
        },
      ],
      [
        'Drone',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'warrior',
            elite: false,
            creature_type: 'planeforged',
            level: 5,
            size: 'medium',
          });
          creature.addTrait('simple-minded');
          creature.addPoisonousStrike('stinger', {
            name: 'drone venom',
            injury: true,
            it: `
              inflicts \\damageranktwolow immediately and with each escalation.
              The second escalation also ends the poison.
            `,
          });
          creature.setTrainedSkills(['awareness', 'climb', 'endurance']);
          creature.setBaseAttributes([3, 4, 2, -4, 3, 0]);
          creature.setKnowledgeResults({
            normal: `
              Drones are the basic fighting unit of formian society.
              In combat, drones use their high mobility to ruthlessly coordinate attacks on their most dangerous or most vulnerable foes.
            `,
            hard: `
              Even the smallest formian colony typically has dozens of warriors, and larger colonies can have thousands.
            `,
          });
        },
      ],
      [
        'Myrmarch',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'warrior',
            elite: false,
            creature_type: 'planeforged',
            level: 9,
            size: 'medium',
          });
          creature.setProperties({ has_art: true });
          creature.addTrait('simple-minded');
          creature.setTrainedSkills(['awareness', 'climb', 'endurance']);
          creature.setBaseAttributes([4, 6, 3, -4, 3, 2]);

          creature.addWeaponMult('greatsword');
          creature.addManeuver('Dance of Death');
          creature.addManeuver('Reckless Smash', { weapon: 'greatsword' });
        },
      ],
    ],
  );
}
