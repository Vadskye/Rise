import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';

export function addAliens(grimoire: Grimoire) {
  addFormians(grimoire);
}

function addFormians(grimoire: Grimoire) {
  function formian(creature: Creature) {
    const rank = creature.calculateRank();
    let tremorsenseRadius: number;
    if (rank >= 7) {
      tremorsenseRadius = 480;
    } else if (rank >= 5) {
      tremorsenseRadius = 240;
    } else if (rank >= 3) {
      tremorsenseRadius = 120;
    } else {
      tremorsenseRadius = 60;
    }
    const tremorsightRadius = tremorsenseRadius / 4;

    creature.addCustomSense(`Tremorsense (${tremorsenseRadius} ft.)`);
    creature.addCustomSense(`Tremorsight (${tremorsightRadius} ft.)`);

    creature.addPassiveAbility({
      name: 'Hive Mind',
      effect: `
        All formians within 50 miles of their queen are in constant telepathic communication with her, regardless of any intervening physical obstacles.
        They instantaneously share information about threats and discoveries.
        This allows formians to usually respond to new information intelligently and in perfect unison, regardless of each formian's individual intelligence.
      `,
      isMagical: true,
    });
    creature.addImpervious('Earth');
    creature.addTrait('multipedal');
  }

  grimoire.addMonsterGroup(
    {
      name: 'Formians',
      hasArt: true,
      knowledge: {
        normal: `
          Formians are ant-like creatures native to Terra.
          They share a hive mind that allows telepathic communication at great distances.
        `,
        hard: `
          All formians can sense their surroundings instinctively by feeling tremors in the ground.
          Most formians are simple drones with no independent thought or agency; they act only as directed by their queen.
          As a result, they fight with no concern for their own lives, serving only the greater good of the group.
          They may still retreat to avoid expending unnecessary resources on a battle that is already lost.
        `,
        legendary: `
          Formians often attempt to set up colonies in unclaimed locations on other planes to expand their influence, though they never attack civilizations or sentient creatures to do so.
          Once they have established their colonies, they consider themselves to have a rightful claim to that land, and they can be highly territorial.

          If a formian queen is killed, all formians it was controlling immediately become inert, taking no actions of any kind.
          These isolated formians typically die of dehydration or similar causes, though in rare cases they may be claimed by another formian queen.
        `,
      },
      sharedInitializer: (creature: Creature) => {
        formian(creature);
      },
    },
    [
      [
        'Worker',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'skirmisher',
            elite: false,
            creature_type: 'mortal',
            level: 1,
            size: 'medium',
          });
          creature.addTrait('simple-minded');
          creature.addWeaponMult('bite');
          creature.setTrainedSkills(['craft_stone', 'craft_metal']);
          creature.setBaseAttributes([1, 3, -1, -2, 0, -2]);
          creature.setKnowledgeResults({
            normal: `
              Workers are the basic building blocks of formian society.
              A typical worker is about 3 feet long and about 2-1/2 feet high at the front.
              Its hands are suitable only for manual labor.
            `,
            hard: `
              Individual workers are simple-minded, but they are given instructions by the hive mind.
              Even the smallest formian colony typically has hundreds of workers, and larger colonies can have tens of thousands.
              Workers are generally given orders by a formian queen in groups of at least five, and it is rare to see an individual worker on its own.
            `,
          });
        },
      ],
      [
        'Drone',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'warrior',
            elite: false,
            creature_type: 'mortal',
            level: 5,
            size: 'medium',
          });
          creature.addTrait('simple-minded');
          creature.addPoisonousStrike('stinger', {
            name: 'drone venom',
            injury: true,
            it: `
              inflicts \\damageranktwolow immediately and with each escalation.
              The second escalation also ends the poison.
            `,
          });
          creature.setTrainedSkills(['awareness', 'climb', 'endurance']);
          creature.setBaseAttributes([3, 4, 2, -4, 3, 0]);
          creature.setKnowledgeResults({
            normal: `
              Drones are the basic fighting unit of formian society.
              In combat, drones use their high mobility to ruthlessly coordinate attacks on their most dangerous or most vulnerable foes.
            `,
            hard: `
              Even the smallest formian colony typically has dozens of warriors, and larger colonies can have thousands.
            `,
          });
        },
      ],
      [
        'Myrmarch',
        (creature: Creature) => {
          creature.setRequiredProperties({
            alignment: 'lawful neutral',
            base_class: 'warrior',
            elite: false,
            creature_type: 'mortal',
            level: 9,
            size: 'medium',
          });
          creature.setProperties({ has_art: true });
          creature.addTrait('simple-minded');
          creature.setTrainedSkills(['awareness', 'climb', 'endurance']);
          creature.setBaseAttributes([4, 6, 3, -4, 3, 2]);

          creature.addWeaponMult('greatsword');
          creature.addManeuver('Dance of Death');
          creature.addManeuver('Pure Precision', { weapon: 'greatsword' });
        },
      ],
    ],
  );
}
