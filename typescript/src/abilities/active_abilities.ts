import { MonsterAttackUsageTime } from '@src/character_sheet/sheet_worker';
import { RiseTag } from '@src/character_sheet/rise_data';
import { AbilityRole } from '@src/abilities';
import { MonsterWeapon } from '@src/monsters/weapons';
import { SphereName } from '@src/abilities/mystic_spheres';

// This is a fully defined active ability with all necessary fields to be converted to
// LaTeX. This can be used for spells and maneuvers, but not rituals, since rituals have
// several unique properties.
export interface ActiveAbility {
  attack?: ActiveAbilityAttack;
  cost?: string;
  effect?: string;
  functionsLike?: FunctionsLike;
  isMagical: boolean;
  kind: ActiveAbilityKind;
  materialCost?: boolean;
  name: string;
  narrative?: string;
  rank: ActiveAbilityRank;
  // A spell can have multiple roles if it has multiple effects, or if its effect is
  // intrinsically versatile.
  roles: AbilityRole[];
  scaling?: ActiveAbilityScaling;
  tableText?: string;
  tags?: RiseTag[];
  // TODO: rename this to 'duration'
  type?: ActiveAbilityDurationType;
  usageTime?: ActiveAbilityUsageTime;
  // TODO: this should be a more generic Weapon type if we add support for non-monster
  // weapons.
  weapon?: MonsterWeapon;
}

export type ActiveAbilityKind = 'cantrip' | 'spell' | 'maneuver' | 'ritual';

// This is the type used to write maneuvers in `combat_styles/`. It's missing some
// inferrable data fields that are shared between all maneuvers.
// Although player-facing maneuvers in combat styles cannot be ranks 2/4/6, monster
// maneuvers can have those ranks, and maneuver-like player abilites can have those ranks,
// so we don't draw a distinction at the type level.
export interface ManeuverDefinition
  extends Omit<ActiveAbility, 'isMagical' | 'kind' | 'usageTime'> {
  usageTime?: MonsterAttackUsageTime;
}

// This is the type used to write cantrips in `mystic_spheres/`. It's missing some
// inferrable data fields that are shared between all cantrips.
export interface CantripDefinition extends Omit<ActiveAbility, 'isMagical' | 'kind' | 'rank'> {
  // It's convenient to be able to test cantrip.rank in several places.
  rank?: never;
}

// This is the type used to write spells in `mystic_spheres/`. It's missing some
// inferrable data fields that are shared between all spells.
export type SpellDefinition = Omit<ActiveAbility, 'isMagical' | 'kind'>;

export type RitualCastingTime = '24 hours' | 'one minute' | 'one hour' | 'special' | 'one week';
export interface Ritual extends Omit<ActiveAbility, 'kind' | 'usageTime'>, RitualDefinition {
  kind: 'ritual';
}

// This is the type used to write rituals. It's missing some
// inferrable data fields that are shared between all rituals.
export interface RitualDefinition extends Omit<ActiveAbility, 'isMagical' | 'kind' | 'usageTime'> {
  materialCost?: boolean;
  sphereEffects?: Partial<Record<SphereName, string>>;
  spheres: SphereName[];
  usageTime: RitualCastingTime;
}

// Cantrips are rank 0.
export type ActiveAbilityRank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type ActiveAbilityScaling =
  | 'accuracy'
  | 'double_accuracy'
  | 'damage'
  | 'healing'
  | Record<string, string>;

type ActiveAbilityDurationType =
  | 'Attune'
  | 'Attune (deep)'
  | 'Attune (deep, target)'
  | 'Attune (target)'
  | 'Sustain (minor)'
  | 'Sustain (standard)'
  | 'Sustain (attuneable, minor)'
  | 'Sustain (attuneable, standard)';

export interface FunctionsLike {
  abilityType?: 'cantrip' | 'spell' | 'maneuver' | 'ability' | 'ritual';
  exceptThat?: string;
  mass?: boolean;
  oneYear?: boolean;
  name: string;
}

export interface ActiveAbilityAttack {
  crit?: string;
  hit: string;
  injury?: string;
  missGlance?: boolean;
  miss?: string;
  targeting: string;
}

export type ActiveAbilityUsageTime = MonsterAttackUsageTime | RitualCastingTime;

export function standardizeCantrip(cantrip: CantripDefinition): ActiveAbility {
  return {
    isMagical: true,
    ...cantrip,
    kind: 'cantrip',
    rank: 0,
  };
}

export function standardizeManeuver(maneuver: ManeuverDefinition): ActiveAbility {
  return {
    isMagical: false,
    ...maneuver,
    kind: 'maneuver',
  };
}

export function standardizeSpell(spell: SpellDefinition): ActiveAbility {
  return {
    isMagical: true,
    ...spell,
    kind: 'spell',
  };
}

export function standardizeRitual(ritual: RitualDefinition): Ritual {
  return {
    isMagical: true,
    ...ritual,
    kind: 'ritual',
  };
}
