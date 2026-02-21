import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addSorcerers(stock: StockCharacters) {
    stock.addCharacter('Ignis', (c: Creature) => {
        c.setRequiredProperties({
            alignment: 'chaotic neutral',
            base_class: 'sorcerer',
            elite: false,
            creature_type: 'mortal',
            level: 1,
            size: 'medium',
        });
        c.setProperties({
            willpower_at_creation: 3,
            constitution_at_creation: 2,
            perception_at_creation: 2,
            dexterity_at_creation: 1,
            strength_at_creation: 0,
            intelligence_at_creation: 0,
        });
        // 'Eyes of Flame' is a rank 1 spell in 'Pyromancy' sphere
        c.addSpell('Eyes of Flame');
    });
}
