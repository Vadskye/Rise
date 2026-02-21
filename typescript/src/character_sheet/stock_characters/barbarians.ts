import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addBarbarians(stock: StockCharacters) {
    stock.addCharacter('Grognak', (c: Creature) => {
        c.setRequiredProperties({
            alignment: 'chaotic neutral',
            base_class: 'barbarian',
            elite: false,
            creature_type: 'mortal',
            level: 1,
            size: 'medium',
        });
        c.setProperties({
            strength_at_creation: 3,
            constitution_at_creation: 2,
            dexterity_at_creation: 2,
            perception_at_creation: 1,
            intelligence_at_creation: 0,
            willpower_at_creation: 0,
        });
        c.addManeuver('Wild Swing');
        // Greataxe is implicit in some maneuvers but better to be explicit if not using a specific maneuver weapon
        c.addWeapon('greataxe');
    });
}
