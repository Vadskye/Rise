import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';

function addBandits(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: "Bandits",
      hasArt: false,
      knowledge: {
        normal: `
          Bandits are common throughout civilization.
          They are typically found in small groups, preying on travelers or isolated settlements.
        `,
      },
    },
    [
      ['Army Deserter', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral evil',
          base_class: 'warrior',
          challenge_rating: 1,
          creature_type: 'humanoid',
          level: 1,
          size: 'medium',
        });
        creature.setProperties({
          has_art: true,
        });
        creature.setKnowledgeResults({
          easy: `
            Army deserters have abandoned their past life in an army and struck out on their own.
            Since the punishments for desertion are typically harsh, they have little to lose.
          `,
        });
        creature.setTrainedSkills(['endurance']);
        creature.setBaseAttributes([2, 0, 2, 0, 1, 0]);
        creature.addWeaponMult('spear');
        creature.addWeaponMult('heavy crossbow');
      }],
      ['Veteran Archer', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral evil',
          base_class: 'sniper',
          challenge_rating: 1,
          creature_type: 'humanoid',
          level: 3,
          size: 'medium',
        });
        creature.setProperties({
          has_art: false,
        });
        creature.setTrainedSkills(['awareness']);
        creature.setBaseAttributes([2, 3, 0, 0, 4, 0]);
        creature.addManeuver('Arrowguide', { weapon: 'longbow' });
        creature.addWeaponMult('longbow');
      }],
    ]
  );
}

export function addHumanoids(grimoire: Grimoire) {
  addBandits(grimoire);
}
