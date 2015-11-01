from util import d20

TEST_COUNT = 1000
COMBAT_DURATION = 3

def run_test(test_name, allies, enemies, level, ideal_creature):
    return {
        'apa': test_awesome_point_attack,
        'haste': test_haste,
    }[test_name](allies, enemies, level, ideal_creature)

def test_haste(allies, enemies, level, ideal_creature):
    creature = allies[0]
    print creature
    print
    target = ideal_creature

    affected_targets = 1

    base_damage = 0
    haste_damage = 0

    for i in range(TEST_COUNT):
        for j in range(affected_targets):
            for k in range(COMBAT_DURATION):
                creature.attack(ideal_creature)
                base_damage += ideal_creature.damage
                ideal_creature.damage = 0

    creature.add_modifier('extra_attacks', 'testing', 1)
    creature.add_modifier('extra_physical_attack_bonus', 'testing', -5)

    for i in range(TEST_COUNT):
        for j in range(affected_targets):
            for k in range(COMBAT_DURATION):
                creature.attack(ideal_creature)
                haste_damage += ideal_creature.damage
                ideal_creature.damage = 0

    base_damage = float(base_damage) / TEST_COUNT
    haste_damage = float(haste_damage) / TEST_COUNT

    print "Base {0}, haste {1}".format(
        base_damage,
        haste_damage,
    )
    print "Haste bonus {0}, spell {1}".format(
        haste_damage - base_damage,
        level * 2.5,
    )

def test_awesome_point_attack(allies, enemies, level, ideal_creature):
    creature = allies[0]
    print creature
    print
    target = ideal_creature

    print creature.average_hit_chance(target)

    unbuffed_damage = 0
    buffed_damage = 0
    rerolled_damage = 0
    attack_bonus_buff = 2
    damage_bonus_buff = 0
    affected_targets = 1
    max_rerolls = 1

    for i in range(TEST_COUNT):
        for j in range(affected_targets):
            rerolls_used = 0
            for k in range(COMBAT_DURATION):
                reroll_used_this_round = False
                for attack_bonus in creature.physical_attack_progression:
                    roll = d20.roll()
                    attack_damage = creature.average_physical_attack_damage
                    if target.is_hit(roll + attack_bonus):
                        unbuffed_damage += attack_damage
                        buffed_damage += attack_damage + damage_bonus_buff
                        rerolled_damage += attack_damage
                        if roll == 20:
                            if target.is_hit(d20.roll() + attack_bonus):
                                unbuffed_damage += attack_damage
                                buffed_damage += attack_damage + damage_bonus_buff
                                rerolled_damage += attack_damage
                        elif rerolls_used < max_rerolls and not reroll_used_this_round:
                            # use the reroll to crit
                            rerolls_used += 1
                            reroll_used_this_round = True
                            if target.is_hit(d20.roll() + attack_bonus):
                                rerolled_damage += attack_damage
                    else:
                        if target.is_hit(roll + attack_bonus + attack_bonus_buff):
                            buffed_damage += attack_damage + damage_bonus_buff
                        if rerolls_used < max_rerolls and not reroll_used_this_round:
                            rerolls_used += 1
                            reroll_used_this_round = True
                            if target.is_hit(d20.roll() + attack_bonus):
                                rerolled_damage += attack_damage

    unbuffed_damage = float(unbuffed_damage) / TEST_COUNT
    buffed_damage = float(buffed_damage) / TEST_COUNT
    rerolled_damage = float(rerolled_damage) / TEST_COUNT

    print "Unbuffed {0}, buffed {1}, rerolled {2}".format(
        unbuffed_damage,
        buffed_damage,
        rerolled_damage,
    )
    print "Buffed bonus {0}, rerolled bonus {1}, spell {2}".format(
        buffed_damage - unbuffed_damage,
        rerolled_damage - unbuffed_damage,
        level * 2.5,
    )
