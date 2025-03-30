import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';

export function addAberrations(grimoire: Grimoire) {
  grimoire.addMonster("aboleth", (creature: Creature) => {
    creature.setTrainedSkills(["awareness", "endurance", "social_insight", "swim"]);
    creature.setBaseAttributes([4, 0, 6, 4, 4, 6]);
    creature.setProperties({
      base_class: "mystic",
      challenge_rating: 4,
      level: 12,
      size: "Huge",
    });
  });
}
