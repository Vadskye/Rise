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
          elite: false,
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
          elite: false,
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
      ['Renegade Bolter', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'neutral evil',
          base_class: 'sniper',
          elite: false,
          creature_type: 'humanoid',
          level: 4,
          size: 'medium',
        });
        creature.setTrainedSkills(['awareness']);
        creature.setBaseAttributes([0, 3, 0, 0, 3, 5]);
        creature.addCustomSpell({
          name: 'Arc',
          attack: {
            targeting: `
              Make a \\accuracy+1 attack vs. Fortitude against something within \\shortrange.
            `,
            hit: `
              This attack \\glossterm{chains} once. \\damagerankone.
            `,
          },
          isMagical: true,
          tags: ['Electricity'],
          usageTime: 'standard',
        });
        creature.addCustomSpell({
          name: 'Lightning Bolt',
          attack: {
            targeting: `
              Make a \\accuracy attack vs. Reflex against everything in a \\largearealong, 5 ft. wide line from $name.
            `,
            hit: `
              \\damagerankone.
            `,
          },
          isMagical: true,
          tags: ['Electricity'],
          usageTime: 'standard',
        });
        creature.addCustomSpell({
          name: 'Stunning Discharge',
          attack: {
            targeting: `
              Make a \\accuracy attack vs. Mental against all creatures in a \\medarea radius from $name.
            `,
            hit: `
              If the target is \\glossterm{injured}, it is \\stunned as a \\glossterm{condition}.
            `,
            crit: `
              TODO: Verify if \\critcondition means the condition is removed on a crit.
            `,
          },
          isMagical: true,
          tags: ['Electricity'],
          usageTime: 'standard',
        });
      }],
    ]
  );
}

function addCultists(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: "Cultists",
      hasArt: false,
      knowledge: {
        normal: `
          Cultists are common throughout civilization.
          They are typically found in small groups, preying on travelers or isolated settlements.
        `,
      },
    },
    [
      ['Death Cultist', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'lawful evil',
          base_class: 'sniper',
          elite: false,
          creature_type: 'humanoid',
          level: 1,
          size: 'medium',
        });
        creature.setTrainedSkills(['endurance']);
        creature.setBaseAttributes([0, 1, 2, -1, 0, 4]);
        creature.addCustomSpell({
          name: 'Drain Life',
          attack: {
            targeting: `
              Make a \\accuracy attack vs. Fortitude against one living creature within \\medrange.
            `,
            hit: `
              \\damagerankone.
            `,
          },
          isMagical: true,
          tags: [],
          usageTime: 'standard',
        });
        creature.addWeaponMult('sickle');
      }],
      ['Pyromaniac', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'chaotic evil',
          base_class: 'sniper',
          elite: false,
          creature_type: 'humanoid',
          level: 4,
          size: 'medium',
        });
        creature.setTrainedSkills([]);
        creature.setBaseAttributes([0, 2, 0, -1, 2, 5]);
        creature.addCustomSpell({
          name: 'Burning Grasp',
          attack: {
            targeting: `
              The $name must have a free hand to cast this spell.

              Make a \\accuracy attack vs. Reflex against something it \\glossterm{touches}.
            `,
            hit: `
              \\damagerankone immediately, and again during the $name's next action.
            `,
          },
          isMagical: true,
          tags: ['Fire'],
          usageTime: 'standard',
        });
        creature.addCustomSpell({
          name: 'Pyrohemia',
          attack: {
            targeting: `
              Make a \\accuracy attack vs. Fortitude against one creature within \\medrange.
            `,
            hit: `
              \\damagerankone.
            `,
            injury: `
              The target takes \\damagerankone again during the $name's next action.
            `,
          },
          isMagical: true,
          tags: ['Fire'],
          usageTime: 'standard',
        });
        creature.addCustomSpell({
          name: 'Pyroclasm',
          attack: {
            targeting: `
              Make a \\accuracy attack vs. Reflex against everything in a \\medarea radius from $name.
              In addition, it suffers a glancing blow from this attack.
            `,
            hit: `
              \\damagerankone.
            `,
          },
          isMagical: true,
          tags: ['Fire'],
          usageTime: 'standard',
        });
        creature.addWeaponMult('club');
      }],
    ]
  );
}

function addGoblins(grimoire: Grimoire) {
  grimoire.addMonsterGroup(
    {
      name: "Goblins",
      hasArt: true,
      knowledge: {
        normal: `
          Goblins are common throughout civilization.
          They are typically found in small groups, preying on travelers or isolated settlements.
        `,
      },
    },
    [
      ['Goblin Warrior', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'chaotic evil',
          base_class: 'skirmisher',
          elite: false,
          creature_type: 'humanoid',
          level: 1,
          size: 'medium',
        });
        creature.setTrainedSkills(['awareness']);
        creature.setBaseAttributes([-1, 4, 0, -2, 2, -2]);
        creature.addWeaponMult('spear');
        creature.addManeuver('Rushed Strike', { weapon: 'spear' });
        creature.addTrait('Buckler');
      }],
      ['Goblin Wolf Rider', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'chaotic evil',
          base_class: 'skirmisher',
          elite: false,
          creature_type: 'humanoid',
          level: 3,
          size: 'medium',
        });
        creature.setTrainedSkills(['ride']);
        creature.setBaseAttributes([-1, 4, 0, -2, 2, -2]);
        creature.addWeaponMult('lance');
        creature.addWeaponMult('spear');
        creature.addTrait('Buckler');
      }],
      ['Goblin Shaman', (creature: Creature) => {
        creature.setRequiredProperties({
          alignment: 'chaotic evil',
          base_class: 'skirmisher',
          elite: false,
          creature_type: 'humanoid',
          level: 1,
          size: 'medium',
        });
        creature.setTrainedSkills(['awareness']);
        creature.setBaseAttributes([-1, 3, 0, -2, 2, 3]);
        creature.addSpell('Word of Power');
        creature.addWeaponMult('spear', { displayName: 'Consecrated Strike', isMagical: true });
      }],
    ]
  );
}

export function addHumanoids(grimoire: Grimoire) {
  addBandits(grimoire);
  addCultists(grimoire);
  addGoblins(grimoire);
}
