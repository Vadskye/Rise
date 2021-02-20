import { aeromancy } from "./aeromancy";

export interface MysticSphere {
  cantrips?: Cantrip[];
  name: string;
  rituals?: Ritual[];
  shortDescription: string;
  spells: Spell[];
}

export interface Cantrip {
  attack?: SpellAttack;
  castingTime?: string;
  effect?: string;
  focus?: boolean;
  functionsLike?: {
    exceptThat: string;
    spell: string;
  };
  name: string;
  narrative?: string;
  scaling?: "accuracy" | "damage" | Record<number, string>;
  tags?: string[];
  type:
    | "Instant"
    | "Duration"
    | "Attune (self)"
    | "Attune (target)"
    | "Sustain (free)"
    | "Sustain (minor)"
    | "Sustain (standard)";
}

export interface Spell extends Cantrip {
  rank: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export interface Ritual extends Spell {
  castingTime: string;
}

export interface SpellLike extends Cantrip {
  castingTime?: string;
  rank?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | null;
}

interface SpellAttack {
  crit?: string;
  glance?: string;
  hit: string;
  target: string;
}

export const mysticSpheres = [aeromancy];
