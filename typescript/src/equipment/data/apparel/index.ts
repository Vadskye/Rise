import { Apparel, StandardItem, AttunementRequirement } from '../../types';
import { arms } from './arms';
import { head } from './head';
import { jewelry } from './jewelry';
import { legs } from './legs';
import { torso } from './torso';

// leave attunement optional in direct item definitions because apparel is almost always attunement and I'm lazy
export type RawApparel = Omit<Apparel, 'item'> & {
  item: Omit<StandardItem, 'attunement'> & { attunement?: AttunementRequirement };
};

export function allApparel(): Apparel[] {
  const rawList: RawApparel[] = [...arms(), ...head(), ...jewelry(), ...legs(), ...torso()];
  return rawList.map((a) => {
    let attunement: AttunementRequirement = a.item.attunement || 'Attune';
    if (a.item.rarity === 'Relic' && !a.item.attunement) {
      attunement = 'Unrestricted';
    }

    return {
      kind: a.kind,
      item: {
        ...a.item,
        attunement,
      },
    };
  });
}
