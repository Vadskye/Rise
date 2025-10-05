import { aeromancy } from './aeromancy';
import { aquamancy } from './aquamancy';
import { astromancy } from './astromancy';
import { channelDivinity } from './channel_divinity';
import { chronomancy } from './chronomancy';
import { cryomancy } from './cryomancy';
import { electromancy } from './electromancy';
import { enchantment } from './enchantment';
import { fabrication } from './fabrication';
import { photomancy } from './photomancy';
import { polymorph } from './polymorph';
import { prayer } from './prayer';
import { pyromancy } from './pyromancy';
import { revelation } from './revelation';
import { telekinesis } from './telekinesis';
import { terramancy } from './terramancy';
import { thaumaturgy } from './thaumaturgy';
import { toxicology } from './toxicology';
import { umbramancy } from './umbramancy';
import { verdamancy } from './verdamancy';
import { vivimancy } from './vivimancy';
import { universal } from './universal';

export { getSpellByName } from './get_spell_by_name';
export { rituals } from './rituals';

export const mysticSpheres: MysticSphere[] = [
  aeromancy,
  aquamancy,
  astromancy,
  channelDivinity,
  chronomancy,
  cryomancy,
  electromancy,
  enchantment,
  fabrication,
  photomancy,
  polymorph,
  prayer,
  pyromancy,
  revelation,
  telekinesis,
  terramancy,
  thaumaturgy,
  toxicology,
  umbramancy,
  verdamancy,
  vivimancy,
  universal,
];

export type MysticSphereSource = 'arcane' | 'divine' | 'domain' | 'nature' | 'pact' | 'soulkeeper';

export interface MysticSphere {
  cantrips?: Cantrip[];
  hasImage?: boolean;
  name: SphereName;
  sources: MysticSphereSource[];
  shortDescription: string;
  specialRules?: string;
  spells: Spell[];
}

export type AbilityScaling = 'accuracy' | 'double_accuracy' | 'damage' | 'healing' | Record<string, string>;

export interface BaseSpellLike {
  attack?: StandardAttack;
  castingTime?: string;
  cost?: string;
  effect?: string;
  functionsLike?: FunctionsLike;
  name: string;
  narrative?: string;
  roles: AbilityRole[];
  scaling?: AbilityScaling;
  tableText?: string;
  // TODO: define the set of allowable tags
  tags?: string[];
  type?:
  | 'Attune'
  | 'Attune (deep)'
  | 'Attune (deep, target)'
  | 'Attune (target)'
  | 'Sustain (minor)'
  | 'Sustain (standard)'
  | 'Sustain (attuneable, minor)'
  | 'Sustain (attuneable, standard)';
}

// A spell can have multiple roles if it has multiple effects, or if its effect is
// intrinsically versatile.
// Roles refer to how you spend your standard action in combat.
// For that reason, most attunement effects only have the 'attune' role, since they
// do not change how you spend standard actions in combat. If an attunement effect grants
// a unique ability that you can use as a standard action, it would have the roles
// appropriate to that standard action ability.
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

export type Cantrip = BaseSpellLike;

export interface Spell extends BaseSpellLike {
  rank: Rank;
}

export type SphereName =
  | 'Aeromancy'
  | 'Aquamancy'
  | 'Astromancy'
  | 'Channel Divinity'
  | 'Chronomancy'
  | 'Cryomancy'
  | 'Electromancy'
  | 'Enchantment'
  | 'Fabrication'
  | 'Photomancy'
  | 'Polymorph'
  | 'Prayer'
  | 'Pyromancy'
  | 'Revelation'
  | 'Telekinesis'
  | 'Terramancy'
  | 'Thaumaturgy'
  | 'Toxicology'
  | 'Umbramancy'
  | 'Verdamancy'
  | 'Vivimancy'
  | 'Universal';

// TODO: allow customizing individual ritual fatigue costs
export interface Ritual extends Spell {
  castingTime: '24 hours' | 'one minute' | 'one hour' | 'minor action' | 'special' | 'one week';
  materialCost?: boolean;
  sphereEffects?: Partial<Record<SphereName, string>>;
  spheres: SphereName[];
}

export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface SpellLike extends BaseSpellLike {
  castingTime?: string;
  materialCost?: boolean;
  rank?: Rank;
}

export interface StandardAttack {
  crit?: string;
  hit: string;
  injury?: string;
  missGlance?: boolean;
  miss?: string;
  targeting: string;
}

export interface FunctionsLike {
  abilityType?: 'cantrip' | 'spell' | 'maneuver' | 'ability' | 'ritual';
  exceptThat?: string;
  mass?: boolean;
  oneYear?: boolean;
  name: string;
}
