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
import { CantripDefinition, SpellDefinition} from '@src/abilities/active_abilities';

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
  cantrips?: CantripDefinition[];
  hasImage?: boolean;
  name: SphereName;
  sources: MysticSphereSource[];
  shortDescription: string;
  specialRules?: string;
  spells: SpellDefinition[];
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
