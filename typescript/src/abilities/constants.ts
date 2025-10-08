export const CONDITION_CRIT =
  'The condition must be removed an additional time before the effect ends.';
export const MULTIHIT_CRIT = 'All instances of damage are doubled, not just the initial damage.';
export const POISON_CRIT = 'The poison immediately escalates.';
export const DELAYED_HALF = 'Half damage immediately, and no damage during your next action.';
export const SWIFT_FATIGUE =
  'You can increase your \\glossterm{fatigue level} by one to make this spell \\abilitytag{Swift}.';
export const SWIFT_FATIGUE_SELF =
  'You can increase your \\glossterm{fatigue level} by one to make this spell \\abilitytag{Swift}. If you do, you can only target yourself with it.';
export const MINOR_FATIGUE =
  'You can increase your \\glossterm{fatigue level} by one to cast this spell as a \\glossterm{minor action}.';
export const TELEPORT_ATTACK_FATIGUE =
  'You can increase your \\glossterm{fatigue level} by one to make the teleportation \\abilitytag{Swift}. The attack still resolves during your normal action.';
export const EXCEPT_NOT_DEEP =
  'it has the \\abilitytag{Attune} tag instead of \\abilitytag{Attune} (deep).';
export const BARRIER_COOLDOWN =
  'After you use this ability, you \\glossterm{briefly} cannot use it or any other \\atBarrier ability.';
export const BRIEF_COOLDOWN = 'You \\glossterm{briefly} cannot cast this spell again.';

export const ABILITY_ROLES = [
  'attune', // Buff that lasts as long as you stay attuned.
  'barrier', // Non-damaging walls to limit mobility and set up choke points
  'boon', // Brief or one-round combat-relevant effects on one or more allies, possibly including you. If the effect is not combat relevant, it should be 'narrative' instead.
  'burn', // Single-target damage over time
  'burst', // Single-target immediate damage
  'cleanse', // Remove conditions or, more rarely, poisons
  'clear', // Immediate damage to multiple targets, typically in an area
  'dive', // Move towards or through enemies and attack at short range
  'execute', // Single-target immediate damage that requires the target to be injured
  'exertion', // Spend fatigue for more powerful effects (or, rarely, spend other resources like vital wounds)
  'flash', // Brief or one-round debuff that affects multiple targets, typically in an area. Does not require injury.
  'focus', // Brief offensive buff on yourself. If an ability makes an attack, it is not a focus ability, though it may be a generator.
  'generator', // Attack and gain a brief buff on yourself that is typically offensive. The buff must last after the effect of the attack, typically for the next round.
  'hazard', // Create a persistent battlefield hazard, such as a zone that deals damage each round
  'healing', // Regain hit points
  'kite', // Move away from enemies and make a ranged attack, or prevent enemies from moving closer
  'maim', // Single-target debuff that requires the target to be injured. Can be brief or condition.
  'mobility', // Move yourself or allies without making an attack
  'narrative', // Non-combat effects
  'payoff', // Ability with unusual prerequisites that generally require at least a round of prep
  'ramp', // Self-buff for the rest of the fight that does not require attunement
  'retaliate', // Attack that is stronger against creatures that attack you or your allies
  'snipe', // Long-range damage
  'softener', // Debuff condition or curse that affects one or more non-injured targets
  'stasis', // Single-target brief or one-round debuff that prevents enemy action
  'trip', // Single-target brief or one-round debuff. Does not require injury.
  'turtle', // Brief or one-round defensive buff or protection effect on yourself
  'wildfire', // Damage over time against multiple targets, typically in an area
] as const;
export type AbilityRole = (typeof ABILITY_ROLES)[number];
