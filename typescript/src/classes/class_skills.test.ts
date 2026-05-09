import t from 'tap';
import { getClassSkills, getClassTrainedSkills, latexClassSkills } from './class_skills';

t.test('Class Skills Logic', (t) => {
  t.test('getClassSkills returns expected skills for Barbarian', (t) => {
    const skills = getClassSkills('Barbarian');
    t.ok(skills.includes('awareness'));
    t.ok(skills.includes('survival'));
    t.notOk(skills.includes('knowledge_arcana'));
    t.end();
  });

  t.test('getClassSkills returns expected skills for Wizard', (t) => {
    const skills = getClassSkills('Wizard');
    t.ok(skills.includes('knowledge_arcana'));
    t.ok(skills.includes('knowledge_religion'));
    t.end();
  });

  t.test('getClassTrainedSkills returns expected counts', (t) => {
    t.equal(getClassTrainedSkills('Rogue'), 6);
    t.equal(getClassTrainedSkills('Wizard'), 3);
    t.equal(getClassTrainedSkills('Ranger'), 5);
    t.end();
  });

  t.test('latexClassSkills returns expected LaTeX output', (t) => {
    const output = latexClassSkills('Barbarian', 'Bbn');
    t.match(output, '\\cf{Bbn}{Class Skills}');
    t.match(output, 'You have the following \\glossterm{class skills}:');
    t.match(output, '\\subparhead{Strength} Climb, Jump, Swim.');
    t.end();
  });

  t.end();
});
