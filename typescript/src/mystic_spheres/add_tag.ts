import { BaseSpellLike, MysticSphere } from '.';

export function add_tag_to_sphere(tag: string, sphere: MysticSphere): MysticSphere {
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

function add_tag_to_spelllike(tag: string, ability: BaseSpellLike) {
  ability.tags = ability.tags || [];
  ability.tags.push(tag);
}
