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

export type AbilityScaling =
  | 'accuracy'
  | 'double_accuracy'
  | 'damage'
  | 'healing'
  | Record<string, string>;

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
import { AbilityRole } from '../constants';

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
