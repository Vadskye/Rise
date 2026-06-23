import { MysticSphere } from '.';
import { ActiveAbility } from '@src/abilities';
import { RiseAbilityDefinitionTag } from '@src/character_sheet/rise_data';

export function add_tag_to_sphere(
  tag: RiseAbilityDefinitionTag,
  sphere: MysticSphere,
): MysticSphere {
  if (sphere.cantrips) {
    for (const cantrip of sphere.cantrips) {
      add_tag_to_spelllike(tag, cantrip);
    }
  }

  for (const spell of sphere.spells) {
    add_tag_to_spelllike(tag, spell);
  }

  return sphere;
}

function add_tag_to_spelllike(tag: RiseAbilityDefinitionTag, ability: Pick<ActiveAbility, 'tags'>) {
  ability.tags = ability.tags || [];
  ability.tags.push(tag);
}
