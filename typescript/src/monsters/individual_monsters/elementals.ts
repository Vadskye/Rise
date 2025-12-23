import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';

export function addElementals(grimoire: Grimoire) {
  // TODO: add earth elementals and give them immunity to gravity effects
  addAirElementals(grimoire);
  addFireElementals(grimoire);
  addMagmaElementals(grimoire);

  grimoire.addMonster('Fusion Elemental', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'leader',
      elite: true,
      creature_type: 'animate',
      level: 16,
      size: 'huge',
    });
    creature.setTrainedSkills(["awareness", "jump"]);
    creature.setBaseAttributes([8, 6, 5, -4, 2, 4]);
    creature.addImpervious('Air');
    creature.addImpervious('Earth');
    creature.addImpervious('Fire');
    creature.addImpervious('Water');
    creature.addTrait('soulless');

    // Single-target is standard action, AOE is elite action
    // Air
    creature.addSpell('Mighty Windslash');
    creature.addSpell('Mighty Windblast', { usageTime: 'elite' });
    // Earth
    creature.addManeuver('Ground Slam+', { tags: ['Earth'], weapon: 'slam' });
    creature.addSpell('Mighty Crushing Gravity', { usageTime: 'elite' });
    // Fire
    creature.addSpell('Distant Flame Dash');
    creature.addSpell('Mighty Pyroclasm', { usageTime: 'elite' });
    // Water
    creature.addManeuver('Forceful Smash', { displayName: 'Tidal Slam', tags: ['Water'], weapon: 'slam' });
    creature.addSpell('Constraining Bubble', { usageTime: 'elite' });
  });
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
          Air elementals are native to Ventus, the wind planet.
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
            creature_type: 'animate',
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
            creature_type: 'animate',
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
            creature_type: 'animate',
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
            creature_type: 'animate',
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
            creature_type: 'animate',
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
          Fire elementals are native to Ignis, the fire planet.
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
            creature_type: 'animate',
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
            creature_type: 'animate',
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
            creature_type: 'animate',
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
            creature_type: 'animate',
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
            creature_type: 'animate',
            level: 20,
            size: 'huge',
          });
          creature.setBaseAttributes([7, 7, 2, 2, 2, 4]);
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
          Magma elementals are native to Terra, the earth planet.
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
            creature_type: 'soulforged',
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
            creature_type: 'soulforged',
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
            creature_type: 'soulforged',
            level: 18,
            size: 'huge',
          });
          creature.setBaseAttributes([6, 6, 10, -3, 0, 2]);
        },
      ],
    ],
  );
}
