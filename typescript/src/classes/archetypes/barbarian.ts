import { Creature } from '@src/character_sheet/creature';

export function battleforgedResilience(creature: Creature, rank: number) {
  if (rank >= 1) {
    // Second Wind doesn't have a clear combat effect
  }

  // Battle-Scarred
  if (rank >= 6) {
    creature.addCustomModifier({
      name: 'Battle-Scarred+',
      numericEffects: [
        {
          modifier: 8,
          statistic: 'durability',
        },
        {
          modifier: 20,
          statistic: 'injury_point',
        },
      ],
    });
  } else if (rank >= 2) {
    creature.addCustomModifier({
      name: 'Battle-Scarred',
      numericEffects: [
        {
          modifier: 4,
          statistic: 'durability',
        },
        {
          modifier: 4,
          statistic: 'injury_point',
        },
      ],
    });
  }

  if (rank >= 3) {
    // Resilient Blow doesn't have a clear combat effect
  }

  if (rank >= 4) {
    creature.addSimpleModifier({
      name: 'Primal Resilience',
      statistic: 'constitution',
      value: 1,
    });
  }

  if (rank >= 5) {
    // Limitless Recovery doesn't have a clear combat effect
  }

  if (rank >= 7) {
    // Unbreakable doesn't have a clear combat effect
  }
}

export function battlerager(creature: Creature, rank: number) {
  if (rank >= 1) {
    // Assume rage is constantly active
    creature.addCustomModifier({
      name: 'Rage',
      numericEffects: [
        {
          // Technically Rage doesn't provide a bonus to magical or projectile strikes.
          // However, that's an edge case that we can generally ignore.
          modifier: 2,
          statistic: 'accuracy_with_strikes',
        },
        {
          modifier: -2,
          statistic: 'armor_defense',
        },
        {
          modifier: -2,
          statistic: 'reflex',
        },
      ],
    });
  }

  // Amplified Anger
  if (rank >= 6) {
    let bonusFromWillpower = 0;
    if (creature.willpower >= 3) {
      bonusFromWillpower += 1;
    }
    if (creature.willpower >= 6) {
      bonusFromWillpower += 1;
    }
    creature.addSimpleModifier({
      name: 'Amplified Anger+',
      statistic: 'mundane_power',
      value: 2 + bonusFromWillpower,
    });
  } else if (rank >= 2) {
    creature.addSimpleModifier({
      name: 'Amplified Anger',
      statistic: 'mundane_power',
      value: creature.willpower >= 3 ? 2 : 1,
    });
  }

  if (rank >= 3) {
    // Aggravated Violence doesn't have a clear combat effect
  }

  if (rank >= 4) {
    creature.addSimpleModifier({
      name: 'Primal Brawn',
      statistic: 'strength',
      value: 1,
    });
  }

  if (rank >= 5) {
    // Insensible Rage doesn't have a clear combat effect
  }

  if (rank >= 7) {
    // Assume you always choose to increase your size, and that you start from Medium.
    // Technically we should check creature.size and increase it by one step, but I'm
    // lazy.
    creature.setProperties({ size: 'large' });
  }
}

export function outlandSavage(creature: Creature, rank: number) {
  if (rank >= 1) {
    creature.addSimpleModifier({
      name: 'Savage Precision',
      statistic: 'brawling_accuracy',
      value: 1,
    });
  }

  if (rank >= 4) {
    creature.addSimpleModifier({
      name: 'Primal Agility',
      statistic: 'dexterity',
      value: 1,
    });
  }

  if (rank >= 5) {
    creature.addSimpleModifier({
      name: 'Outlandish Speed',
      statistic: 'speed',
      value: 10,
    });
  }
}

export function primalWarrior(creature: Creature, rank: number) {
  // Primal Warrior adds maneuvers and augments to maneuvers.
  // These don't have static statistical modifiers that we represent here.
}

export function totemist(creature: Creature, rank: number) {
  // Bear Totem
  if (rank >= 1) {
    creature.addSimpleModifier({
      name: 'Totem Animal (Bear)',
      statistic: 'mundane_power',
      value: Math.floor(creature.constitution / 2),
    });
  }

  if (rank >= 2) {
    // Animal Instincts
    creature.addCustomModifier({
      name: 'Animal Instincts (Bear)',
      numericEffects: [
        {
          statistic: 'endurance',
          modifier: rank >= 6 ? 4 : 2,
        },
        {
          statistic: 'vital_rolls',
          modifier: rank >= 6 ? 2 : 1,
        },
      ],
    });
  }

  if (rank >= 5) {
    creature.addSimpleModifier({
      name: 'Animal Ferocity',
      statistic: 'accuracy',
      value: 1,
    });
  }

  if (rank >= 7) {
    creature.addSimpleModifier({
      name: 'Totem Animal++ (Bear)',
      statistic: 'constitution',
      value: 1,
    });
  }
}
