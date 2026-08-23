---
trigger: model_decision
description: When interacting with spells, rituals, spellcasting, or mystic spheres
---

# Spells and Spellcasting

## Rule Locations

Spells and spellcasting are generally defined in `comprehensive_codex/MysticSpheres.tex`. Individual spells and rituals are defined in `typescript/src/abilities/mystic_spheres/`. Rules for how abilities are used are generally found in `comprehensive_codex/Combat.tex`.

## Spell Roles

Each spell has a role defining its primary function in combat. A spell's role relates to how characters spend their standard actions in combat.

### List of Roles

The list of roles is defined in `typescript/src/abilities/constants.ts`. A summary of the roles is given below:

- `attune`: Buff that lasts as long as you stay attuned.
- `barrier`: Walls that deal damage on passage or fully block passage.
- `boon`: Brief or one-turn combat-relevant effects on one or more allies, possibly including you. If the effect is not combat relevant, it should be 'narrative' instead.
- `burn`: Single-target damage over time or delayed damage.
- `burst`: Single-target immediate damage.
- `cleanse`: Remove conditions or, more rarely, poisons.
- `clear`: Immediate damage to multiple targets, typically in an area.
- `dive`: Move towards or through enemies and attack at short range.
- `execute`: Single-target immediate damage that requires the target to be injured.
- `exertion`: Spend stamina for more powerful effects (or, rarely, spend other resources like vital wounds).
- `flash`: Brief or one-turn debuff that affects multiple targets, typically in an area. Does not require injury.
- `focus`: Brief offensive buff on yourself. If an ability makes an attack, it is not a focus ability, though it may be a generator.
- `generator`: Attack and gain a brief buff on yourself that is typically offensive. The buff must last after the effect of the attack, typically for its next turn.
- `hazard`: Create a persistent battlefield hazard, such as a zone that deals damage each turn.
- `healing`: Regain hit points.
- `maim`: Debuff that requires the target to be injured and has no debuff on uninjured targets. Can deal damage to uninjured targets.
- `mobility`: Move yourself or allies without making an attack.
- `narrative`: Non-combat effects.
- `payoff`: Ability with unusual prerequisites that generally require at least a turn of prep.
- `ramp`: Self-buff for the rest of the fight that does not require attunement.
- `retaliate`: Attack that is stronger against creatures that attack you or your allies.
- `snipe`: Long-range damage.
- `softener`: Debuff condition or curse that affects one or more non-injured targets.
- `trip`: Single-target brief or one-turn debuff, or similarly short-term detrimental effect like fling/teleport/prone. Does not require injury.
- `turtle`: Brief or one-turn defensive buff or protection effect on yourself.

### Attuned Effects

Roles are defined in terms of how characters spend standard actions. Long duration buff spells are generally not cast in the middle of combat, so their specific effects generally don't change a character's standard actions. For that reason, spells that require attunement will generally _only_ have the 'attune' role, rather than any more specific roles based on their effects (e.g., a spell that grants a persistent bonus is just an 'attune' spell, not a 'boon attune' spell).

## Magic Sources

There are four magic sources:

- **Arcane:** Sorcerers and Wizards. Requires verbal and somatic components.
- **Divine:** Clerics and Paladins. Requires verbal components.
- **Nature:** Druids. Requires verbal components.
- **Pact:** Votives. Requires verbal and somatic components.

## Casting Components

- **Verbal:** Speaking clearly. 20% failure if deafened.
- **Somatic:** Free hand required. Cannot be used if grappled or restrained.

## Rituals

Rituals are powerful magical effects that take time and fatigue to perform.

- **Fatigue Cost:** Every ritual takes at least 1 fatigue level.
- **Leader:** Must have access to the ritual's sphere and be able to cast spells of its rank.
- **Time:** At least 1 minute, often much longer.
- **Participation:** Non-leaders can participate to help share the fatigue cost. Requires verbal and somatic components.
- **Ritual Books:** Used to learn and store rituals.

## LaTeX Rendering & Ability Formatting

The TypeScript project generates LaTeX for spells and rituals.

- **Standard Prefix (`spellTypePrefix`):** Handles tags, ranks, and costs. It is idiomatic to use the `cost` field of an `ActiveAbility` for any associated costs, which renders using the `\abilitycost` command.
- **Ritual Fatigue:** For rituals, the fatigue and material costs are automatically calculated and rendered as an `\abilitycost` prefix if `fatigueCost` is true and no explicit `cost` is provided. This logic resides in `spellTypePrefix.ts`.
- **Effect Description (`spellEffect`):** Should strictly contain the ability's effects and should not include cost-related suffixes or prefixes, as these are handled by the standard prefix.
