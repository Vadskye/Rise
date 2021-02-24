import { aeromancy } from "./aeromancy";
import { aquamancy } from "./aquamancy";
import { astromancy } from "./astromancy";
import { barrier } from "./barrier";
import { bless } from "./bless";
import { channelDivinity } from "./channel_divinity";
import { chronomancy } from "./chronomancy";
import { cryomancy } from "./cryomancy";
import { electromancy } from "./electromancy";
import { enchantment } from "./enchantment";
import { fabrication } from "./fabrication";
import { photomancy } from "./photomancy";
import { polymorph } from "./polymorph";
import { pyromancy } from "./pyromancy";
import { revelation } from "./revelation";
import { summoning } from "./summoning";
import { telekinesis } from "./telekinesis";
import { umbramancy } from "./umbramancy";

export const mysticSpheres: MysticSphere[] = [
  aeromancy,
  aquamancy,
  astromancy,
  barrier,
  bless,
  channelDivinity,
  chronomancy,
  cryomancy,
  electromancy,
  enchantment,
  fabrication,
  photomancy,
  polymorph,
  pyromancy,
  revelation,
  summoning,
  telekinesis,
  umbramancy,
];

export type Source = "arcane" | "divine" | "nature" | "pact";

export interface MysticSphere {
  cantrips?: Cantrip[];
  name: string;
  rituals?: Ritual[];
  sources: Source[];
  shortDescription: string;
  spells: Spell[];
}

interface BaseSpellLike {
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

export interface Cantrip extends BaseSpellLike {
  focus: false;
}

export interface Spell extends BaseSpellLike {
  rank: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export interface Ritual extends Omit<Spell, "scaling"> {
  castingTime: string;
}

export interface SpellLike extends BaseSpellLike {
  castingTime?: string;
  rank?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | null;
}

interface SpellAttack {
  crit?: string;
  glance?: string;
  hit: string;
  targeting: string;
}
