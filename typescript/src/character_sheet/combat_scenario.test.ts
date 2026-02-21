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

t.test('CombatScenario can simulate a fight and report statistics', (t) => {
    const gen = new CombatScenarioGenerator();
    addBeasts(gen.grimoire);
    const ankheg = gen.getMonster('Ankheg');
    const wasp = gen.getMonster('Giant Wasp');

    const scenario = gen.createScenario([wasp, ankheg]);
    const result = scenario.simulate(100);

    t.ok(result.averageRounds > 0, 'Average rounds should be positive');
    t.ok(result.winRates['Ankheg'] > 0 || result.winRates['Giant Wasp'] > 0, 'There should be at least one winner');
    console.log(`Ankheg Win Rate: ${result.winRates['Ankheg']}%`);
    console.log(`Giant Wasp Win Rate: ${result.winRates['Giant Wasp']}%`);
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
