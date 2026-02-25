import t from 'tap';
import { Creature } from '@src/character_sheet/creature';
import { CharacterSheet } from '@src/character_sheet/character_sheet';
import { FightState } from '@src/combat/combat_scenario';
import {
    resolveAttack,
    calculateDamage,
    checkVictory,
    handleCreatureDeath,
    executeAttackerAction,
    executeTeamTurn,
    CombatStepStatus
} from '@src/combat/combat_round';
import { stockCharacters, grimoire } from '@src/combat/static_creatures';

t.test('calculateDamage', (t) => {
    const attacker = stockCharacters.getCharacter('Barbarian')!;
    t.ok(attacker, 'Barbarian should exist');

    // Level 1 Barbarian: Level 1 -> Rank 1
    // Damage table Rank 1: 1d6 + halfPower
    // Barbarian level 1 has Str 3 -> power 3 -> halfPower 1
    // So 1d6 + 1. If roll is mocked to 3, total is 4.

    const damage = calculateDamage(attacker, undefined, 0);
    t.equal(damage, 4, 'Damage should be calculated based on rank and power');
    t.end();
});

t.test('resolveAttack', (t) => {
    const attacker = stockCharacters.getCharacter('Barbarian')!;
    const defender = stockCharacters.getCharacter('Target Dummy')!;

    t.test('hit', (t) => {
        const result = resolveAttack(attacker, defender, undefined, 0);
        t.ok(result.hit, 'Should be a hit');
        t.equal(result.damage, 5, 'Should return mocked damage');
        t.end();
    });

    t.test('critical hit', (t) => {
        const result = resolveAttack(attacker, defender, undefined, 0);
        t.ok(result.hit, 'Should be a hit');
        t.equal(result.damage, 10, 'Damage should be doubled on critical hit');
        t.end();
    });

    t.test('miss', (t) => {
        const result = resolveAttack(attacker, defender, undefined, 0);
        t.notOk(result.hit, 'Should be a miss');
        t.equal(result.damage, 0, 'Damage should be 0 on miss');
        t.end();
    });

    t.end();
});

t.test('checkVictory and handleCreatureDeath', (t) => {
    const c1 = stockCharacters.getCharacter('Barbarian')!;
    const c2 = stockCharacters.getCharacter('Target Dummy')!;
    const teamA = { name: 'A', members: [c1] };
    const teamB = { name: 'B', members: [c2] };

    const state: FightState = {
        hp: { [c1.id]: 10, [c2.id]: 10 },
        aliveMembersByTeam: { 'A': [c1], 'B': [c2] },
        memberToTeam: { [c1.id]: teamA, [c2.id]: teamB },
        initialTotalHpByTeam: { 'A': 10, 'B': 10 },
        attacksByTeam: { 'A': 0, 'B': 0 },
        hitsByTeam: { 'A': 0, 'B': 0 },
    };

    t.test('checkVictory - ongoing', (t) => {
        const result = checkVictory(state);
        t.equal(result.status, CombatStepStatus.Ongoing);
        t.equal(result.winner, null);
        t.end();
    });

    t.test('handleCreatureDeath and checkVictory - victory', (t) => {
        handleCreatureDeath(state.aliveMembersByTeam['B'][0], state);
        t.equal(state.aliveMembersByTeam['B'].length, 0);

        const result = checkVictory(state);
        t.equal(result.status, CombatStepStatus.Victory);
        t.equal(result.winner, 'A');
        t.end();
    });

    t.test('checkVictory - draw', (t) => {
        handleCreatureDeath(state.aliveMembersByTeam['A'][0], state);
        t.equal(state.aliveMembersByTeam['A'].length, 0);

        const result = checkVictory(state);
        t.equal(result.status, CombatStepStatus.Draw);
        t.equal(result.winner, null);
        t.end();
    });

    t.end();
});

t.test('executeAttackerAction - elite area attack', (t) => {
    grimoire.addMonster('Elite Ankheg', (elite: Creature) => {
        elite.setRequiredProperties({
            alignment: 'neutral',
            base_class: 'skirmisher',
            elite: true,
            creature_type: 'mortal',
            level: 4,
            size: 'large',
        });
        elite.setBaseAttributes([4, 3, 2, -8, 2, 0]);
    });
    const elite = grimoire.getMonster('Elite Ankheg')!;
    // Note: mundane_power = floor(4/2) + 4 (Str) + 2 (Elite) = 8.
    // halfPower = 4.

    elite.addActiveAbility({
        name: 'acid spit',
        kind: 'maneuver',
        tags: ['attack', 'ranged', 'single'],
        weapon: 'fists', // fists = 2d6, powerMultiplier 0.5.
        isMagical: false,
        effect: 'The $name makes a strike.',
        rank: 1,
        roles: [],
    });

    const target1 = stockCharacters.getCharacter('Target Dummy')!;
    const target2 = stockCharacters.getCharacter('Target Dummy 1000')!; // Use distinct dummy
    const teamE = { name: 'EliteTeam', members: [elite] };
    const teamT = { name: 'TargetTeam', members: [target1, target2] };

    const state: FightState = {
        hp: { [elite.id]: 100, [target1.id]: 50, [target2.id]: 1000 },
        aliveMembersByTeam: { 'EliteTeam': [elite], 'TargetTeam': [target1, target2] },
        memberToTeam: { [elite.id]: teamE, [target1.id]: teamT, [target2.id]: teamT },
        initialTotalHpByTeam: { 'EliteTeam': 100, 'TargetTeam': 1050 },
        attacksByTeam: { 'EliteTeam': 0, 'TargetTeam': 0 },
        hitsByTeam: { 'EliteTeam': 0, 'TargetTeam': 0 },
    };

    // Standard Medium Damage Rank at Level 4 = floor((4+2)/3) = 2.
    // Area attack rank = 2 - 2 = 0.
    // Rank 0 damage = 1d4 + halfPower (4) = [5, 8].
    // Standard attack (fists maneuver) damage = 2d6 + (0.5 * Power) = 2d6 + 4.

    executeAttackerAction(elite, teamE, state);

    t.equal(state.attacksByTeam['EliteTeam'], 3, 'Should have 3 attacks (2 area, 1 standard)');
    t.equal(state.hitsByTeam['EliteTeam'], 3, 'Should have 3 hits');

    const dmg1 = 50 - state.hp[target1.id];
    const dmg2 = 1000 - state.hp[target2.id];

    // Both get 4 from area. One gets 8 from standard.
    // So one is 12, other is 4.
    t.ok((dmg1 === 12 && dmg2 === 4) || (dmg1 === 4 && dmg2 === 12), `One target should take 12, other 4 (actual: ${dmg1}, ${dmg2})`);

    t.end();
});

t.test('executeTeamTurn', (t) => {
    const c1 = stockCharacters.getCharacter('Barbarian')!;
    const target = stockCharacters.getCharacter('Target Dummy')!;

    const teamA = { name: 'A', members: [c1] };
    const teamB = { name: 'B', members: [target] };

    const state: FightState = {
        hp: { [c1.id]: 100, [target.id]: 100 },
        aliveMembersByTeam: { 'A': [c1], 'B': [target] },
        memberToTeam: { [c1.id]: teamA, [target.id]: teamB },
        initialTotalHpByTeam: { 'A': 100, 'B': 100 },
        attacksByTeam: { 'A': 0, 'B': 0 },
        hitsByTeam: { 'A': 0, 'B': 0 },
    };

    executeTeamTurn(teamA, state);

    t.equal(state.attacksByTeam['A'], 1, 'C1 should have attacked');
    t.equal(state.hitsByTeam['A'], 1, 'C1 should have hit');
    t.equal(state.hp[target.id], 90, 'Target should have taken damage');
    t.end();
});
