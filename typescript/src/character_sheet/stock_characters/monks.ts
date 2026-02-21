import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addMonks(stock: StockCharacters) {
    stock.addCharacter('Monk', (c: Creature) => {
        c.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'monk',
            elite: false,
            creature_type: 'mortal',
            level: 1,
            size: 'medium',
        });
        c.setProperties({
            dexterity_at_creation: 3,
            strength_at_creation: 2,
            willpower_at_creation: 2,
            constitution_at_creation: 1,
            intelligence_at_creation: 0,
            perception_at_creation: 0,
        });
        // 'Whirlwind' is a rank 1 maneuver in 'Flurry of Blows' style
        c.addManeuver('Whirlwind');
        c.addWeapon('fists');
    });
}
