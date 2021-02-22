import { aeromancy } from "./aeromancy";
import { aquamancy } from "./aquamancy";
import { astromancy } from "./astromancy";
import { barrier } from "./barrier";
import { bless } from "./bless";
import { channelDivinity } from "./channel_divinity";

export const mysticSpheres = [aeromancy, aquamancy, astromancy, barrier, bless, channelDivinity];

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
    exceptThat?: string;
    mass?: boolean;
    spell: string;
  };
  name: string;
  narrative?: string;
  scaling?: "accuracy" | "damage" | Record<string, string>;
  tags?: string[];
  type:
    | "Instant"
    | "Duration"
    | "Attune (self)"
    | "Attune (target)"
    | "Attune (ritual)"
    | "Sustain (free)"
    | "Sustain (minor)"
    | "Sustain (standard)";
}

export interface Spell extends Cantrip {
  rank: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export interface Ritual extends Omit<Spell, "scaling"> {
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
  targeting: string;
}
