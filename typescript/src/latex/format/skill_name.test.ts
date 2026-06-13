import tap from 'tap';
import { skillName } from './skill_name';

tap.test('skillName', (t) => {
  t.equal(skillName('climb'), 'Climb');
  t.equal(skillName('jump'), 'Jump');
  t.equal(skillName('swim'), 'Swim');
  t.equal(skillName('balance'), 'Balance');
  t.equal(skillName('flexibility'), 'Flexibility');
  t.equal(skillName('ride'), 'Ride');
  t.equal(skillName('stealth'), 'Stealth');

  t.equal(skillName('analysis'), 'Analysis');
  t.equal(skillName('awareness'), 'Awareness');

  t.equal(skillName('deception'), 'Deception');
  t.equal(skillName('disguise'), 'Disguise');
  t.equal(skillName('intimidate'), 'Intimidate');
  t.equal(skillName('perform'), 'Perform');
  t.equal(skillName('social_insight'), 'Social Insight');
  t.equal(skillName('persuasion'), 'Persuasion');

  t.equal(skillName('creature_handling'), 'Creature Handling');
  t.equal(skillName('devices'), 'Devices');
  t.equal(skillName('endurance'), 'Endurance');
  t.equal(skillName('medicine'), 'Medicine');
  t.equal(skillName('sleight_of_hand'), 'Sleight of Hand');
  t.equal(skillName('survival'), 'Survival');
  t.equal(skillName('profession'), 'Profession');

  t.equal(skillName('craft_untrained'), 'Craft');
  t.equal(skillName('craft_alchemy'), 'Craft (alchemy)');
  t.equal(skillName('craft_bone'), 'Craft (bone)');
  t.equal(skillName('craft_ceramics'), 'Craft (ceramics)');

  t.equal(skillName('knowledge_nature'), 'Knowledge (nature)');
  t.equal(skillName('knowledge_arcana'), 'Knowledge (arcana)');
  t.equal(skillName('knowledge_untrained'), 'Knowledge');

  // Potential future skills or generic handling
  // @ts-expect-error: profession_baker is not a standard skill id
  t.equal(skillName('profession_baker'), 'Profession (baker)');
  // @ts-expect-error: perform_acting is not a standard skill id
  t.equal(skillName('perform_acting'), 'Perform (acting)');

  t.end();
});
