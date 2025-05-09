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
import { summoning } from './summoning';
import { telekinesis } from './telekinesis';
import { terramancy } from './terramancy';
import { thaumaturgy } from './thaumaturgy';
import { toxicology } from './toxicology';
import { umbramancy } from './umbramancy';
import { verdamancy } from './verdamancy';
import { vivimancy } from './vivimancy';
import { universal } from './universal';

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
  summoning,
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

export interface BaseSpellLike {
  attack?: StandardAttack;
  castingTime?: string;
  cost?: string;
  effect?: string;
  functionsLike?: FunctionsLike;
  name: string;
  narrative?: string;
  roles: AbilityRole[];
  scaling?: 'accuracy' | 'double_accuracy' | 'poison' | Record<string, string>;
  tableText?: string;
  tags?: string[];
  type?:
    | 'Attune'
    | 'Attune (deep)'
    | 'Attune (deep, target)'
    | 'Attune (target)'
    | 'Sustain (free)'
    | 'Sustain (minor)'
    | 'Sustain (standard)'
    | 'Sustain (attuneable, free)'
    | 'Sustain (attuneable, minor)'
    | 'Sustain (attuneable, standard)';
}

export const ABILITY_ROLES = [
  'artillery', // Long-range AOE damage to contribute while staying out of danger
  'barrier',   // Non-damaging walls to limit the swarm's mobility and set up choke points
  'boon',      // Brief or single-round effects on allies
  'burn',      // Single-target damage over time
  'burst',     // Single-target immediate damage
  'cleanse',   // Remove conditions
  'clear',     // AOE immediate damage
  'combo',     // Has an effect that requires other abilities to be useful
  'dive',      // Move towards or through enemies and attack at short range
  'execute',   // Single-target immediate damage that requires the target to be in HP
  'exertion',  // Spend fatigue for more powerful effects
  'flash',     // AOE brief debuff
  'focus',     // Brief offensive self-buff that doesn't require hitting with an attack
  'generator', // Attack and gain a brief offensive self-buff, inclulding payoff prep
  'hazard',    // Create a battlefield hazard
  'healing',   // Regain HP or DR
  'kite',      // Move away from enemies and make a ranged attack
  'maim',      // Single-target debuff that requires the target to be in HP
  'narrative', // Non-combat effects
  'payoff',    // Ability with unusual prerequisites that generally require at least a round of prep
  'ramp',      // Self-buff for the rest of the fight
  'retaliate', // Attack that is stronger against creatures that attack you
  'retreat',   // Make a short range attack and move away from enemies
  'snipe',     // Long-range single-target damage
  'softener',  // Debuff that works against max hp targets
  'stasis',    // Single-target single action trade, or as close as possible
  'trip',      // Single-target brief or one-round defensive debuff
  'turtle',    // One-round defense or protection effect on self
  'wildfire',  // AOE damage over time
] as const;
export type AbilityRole = (typeof ABILITY_ROLES)[number]; 

export type Cantrip = BaseSpellLike;

export interface Spell extends BaseSpellLike {
  rank: 1 | 2 | 3 | 4 | 5 | 6 | 7;
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
  | 'Summoning'
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

export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | null;

export interface SpellLike extends BaseSpellLike {
  castingTime?: string;
  materialCost?: boolean;
  rank?: Rank;
}

export interface StandardAttack {
  crit?: string;
  hit: string;
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
