import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';

export function addAberrations(grimoire: Grimoire) {
  grimoire.addMonster('aboleth', (creature: Creature) => {
    creature.setRequiredProperties({
      alignment: 'neutral evil',
      base_class: 'leader',
      challenge_rating: 4,
      creature_type: 'planeforged',
      level: 12,
    });
    creature.setProperties({
      has_art: true,
      size: 'Huge',
    });
    creature.setKnowledgeResults({
      easy: `
        Legends speak of revolting water-dwelling creatures called aboleths that lurk in the deepest caves.
        They are said to have power over people's minds.
      `,
      normal: `
        An aboleth is a Huge fishlike creature found primarily in subterranean lakes and rivers.
        It has four tentacles and two vertically stacked eyes in the center of its ridged forehead.
        It uses its powerful mental abilities to overwhelm the minds of its foes.
      `,
      hard: `
        Four pulsating dark blue orifices line the bottom of an aboleth's body and secrete gray slime that smells like rancid grease.
        This slime coats its tentacles, and creatures struck by the tentacles can have their skin transformed into a similar slime.
        Aboleths are amphibious, and they are able to drag themselves along with their tentacles on land, though they are much faster in the water.
      `,
      legendary: `
        Aboleths can completely dominate the minds of lesser creatures.
        They sometimes use their minions as agents to spy in cities or otherwise further their sinister goals.
      `,
    });
    creature.setTrainedSkills(['awareness', 'endurance', 'social_insight', 'swim']);
    creature.setBaseAttributes([4, 0, 6, 4, 4, 6]);
    creature.addAutoAttack({
      areaShape: 'cone',
      defense: ['Mental'],
      effect: 'stunned',
      isMagical: true,
      name: 'Psionic Blast',
      tags: ['Compulsion'],
      targeting: 'large_area',
    });
  });
}
