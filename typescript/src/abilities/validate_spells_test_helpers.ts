import { SpellDefinition } from './active_abilities';
import { MysticSphere } from './mystic_spheres';

export function makeMockSpell(props: Partial<SpellDefinition>): SpellDefinition {
  return {
    name: 'Default Spell',
    rank: 1,
    roles: ['burst'],
    ...props,
  };
}

export function makeMockSphere(name: string, spells: SpellDefinition[]): MysticSphere {
  return {
    name: name as any,
    shortDescription: 'Mock description',
    sources: ['arcane'] as any,
    spells,
  };
}
