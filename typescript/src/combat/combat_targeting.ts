import { Creature } from '@src/character_sheet/creature';
import { FightState } from '@src/combat/combat_scenario';

export function selectTarget(attacker: Creature, targets: Creature[], state: FightState): Creature {
  const logic = attacker.targetPreference;

  if (logic === 'Random') {
    const index = Math.floor(Math.random() * targets.length);
    return targets[index];
  } else if (logic === 'Vulnerable') {
    // Sort by armor_defense (lowest first), then by current HP (lowest first)
    const sorted = [...targets].sort((a, b) => {
      const defA = a.armor_defense;
      const defB = b.armor_defense;
      if (defA !== defB) return defA - defB;

      const hpA = state.hp[a.id];
      const hpB = state.hp[b.id];
      return hpA - hpB;
    });
    return sorted[0];
  } else if (logic === 'Ordered') {
    return targets[0];
  }

  throw new Error(`Unknown target preference: ${logic}`);
}
