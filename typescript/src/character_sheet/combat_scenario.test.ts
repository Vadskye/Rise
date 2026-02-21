import t from 'tap';
import { CombatScenarioGenerator } from './combat_scenario';
import { addBeasts } from '../monsters/individual_monsters/beasts';

t.test('CombatScenarioGenerator can create a monster', (t) => {
    const gen = new CombatScenarioGenerator();
    addBeasts(gen.grimoire);
    const ankheg = gen.getMonster('Ankheg');
    t.equal(ankheg.name, 'Ankheg');
    t.end();
});

t.test('CombatScenarioGenerator can create a custom character', (t) => {
    const gen = new CombatScenarioGenerator();
    const hero = gen.createCharacter('Hero', 5, 'fighter');
    t.equal(hero.name, 'Hero');
    t.equal(hero.level, 5);
    t.equal(hero.base_class, 'fighter');
    t.end();
});

t.test('CombatScenario can simulate a fight and report a victor', (t) => {
    const gen = new CombatScenarioGenerator();
    addBeasts(gen.grimoire);
    const ankheg = gen.getMonster('Ankheg');
    const hero = gen.createCharacter('Hero', 5, 'fighter');

    const scenario = gen.createScenario([hero, ankheg]);
    const victor = scenario.simulate();

    t.ok(victor, 'A victor should be reported');
    t.equal(victor?.name, 'Hero', 'The first combatant should be the victor for now');
    t.end();
});

t.test('Creatures have independent sheets', (t) => {
    const gen = new CombatScenarioGenerator();
    const c1 = gen.createCreature('C1');
    const c2 = gen.createCreature('C2');

    c1.setProperties({ level: 10 });
    c2.setProperties({ level: 20 });

    t.equal(c1.level, 10);
    t.equal(c2.level, 20);
    t.not(c1.level, c2.level);
    t.end();
});
