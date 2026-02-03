# Spells and Spellcasting

## Rule Locations

Spells and spellcasting are generally defined in `comprehensive_codex/MysticSpheres.tex`. Individual spells and rituals are defined in `typescript/src/mystic_spheres/`. Rules for how abilities are used are generally found in `comprehensive_codex/Combat.tex`.

## Spell Roles

Each spell has a role defining its primary function in combat. A spell's role relates to how characters spend their standard actions in combat.

### List of Roles
The list of roles is defined in `typescript/src/mystic_spheres/index.ts`. A summary of the roles is given below:

- `attune`: A buff that lasts as long as you stay attuned. (Primary role for persistent effects).
- `boon`: Brief or one-round combat-relevant effects on one or more allies (including self).
- `burn`: Single-target damage over time.
- `burst`: Single-target immediate damage.
- `cleanse`: Remove conditions (or, more rarely, poisons).
- `clear`: Immediate damage to multiple targets, typically in an area (AOE).
- `combo`: Has an effect that requires other abilities to be useful.
- `dive`: Move towards or through enemies and attack at short range.
- `execute`: Single-target immediate damage that requires the target to be injured or causes immediate death.
- `exertion`: Spend fatigue (or other resources) for more powerful effects.
- `flash`: Brief or one-round debuff that affects multiple targets, typically in an area (AOE).
- `focus`: Brief offensive buff on yourself. (Not an attack ability).
- `generator`: Attack and gain a brief offensive buff on yourself. The buff typically lasts after the attack.
- `hazard`: Create a persistent battlefield hazard, such as a zone that deals damage each round.
- `healing`: Regain hit points.
- `kite`: Move away from enemies and make a ranged attack, or prevent enemies from moving closer.
- `maim`: Single-target debuff that requires the target to be injured.
- `mobility`: Move yourself or allies without making an attack. (Generally not applied to `attune` spells unless they grant a new standard action for movement).
- `narrative`: Non-combat effects.
- `payoff`: Ability with unusual prerequisites that generally require at least a round of prep.
- `ramp`: Self-buff for the rest of the fight that does not require attunement.
- `retaliate`: Attack that is stronger against creatures that attack you or your allies. (Generally not applied to `attune` spells unless they grant a new standard action for retaliation).
- `retreat`: Make a short range attack and move away from enemies.
- `snipe`: Long-range single-target damage.
- `softener`: Debuff that affects a single non-injured target.
- `stasis`: Single-target brief or one-round debuff that prevents enemy action.
- `trip`: Single-target brief or one-round debuff that penalizes defenses.
- `turtle`: Brief or one-round defensive buff or protection effect on yourself.
- `wildfire`: Damage over time against multiple targets, typically in an area (AOE).

### Attuned Effects
Roles are defined in terms of how characters spend standard actions. Long duration buff spells are generally not cast in the middle of combat, so their specific effects generally don't change a character's standard actions. For that reason, spells that require attunement will generally *only* have the 'attune' role, rather than any more specific roles based on their effects.
