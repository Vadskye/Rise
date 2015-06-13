from util import d20

TEST_COUNT = 1000

def run_test(test_name, allies, enemies, level, ideal_creature):
    return {
        'buffs': test_buffs,
    }[test_name](allies, enemies, level, ideal_creature)

def test_buffs(allies, enemies, level, ideal_creature):
    creature = allies[0]
    print creature
    print
    target = ideal_creature

    print creature.average_hit_chance(target)

    unbuffed_damage = 0
    buffed_damage = 0
    rerolled_damage = 0
    attack_bonus_buff = 2
    damage_bonus_buff = 2
    rounds_between_refresh = 1

    for i in range(TEST_COUNT):
        used_reroll = False
        for j in range(rounds_between_refresh):
            for attack_bonus in creature.physical_attack_progression:
                attack_result = d20.roll() + attack_bonus
                attack_damage = creature.average_physical_attack_damage
                if target.is_hit(attack_result):
                    unbuffed_damage += attack_damage
                    buffed_damage += attack_damage + damage_bonus_buff
                    rerolled_damage += attack_damage
                else:
                    if target.is_hit(attack_result + attack_bonus_buff):
                        buffed_damage += attack_damage + damage_bonus_buff
                    if not used_reroll:
                        used_reroll = True
                        attack_result = d20.roll() + attack_bonus
                        if target.is_hit(attack_result):
                            rerolled_damage += attack_damage

    unbuffed_damage = float(unbuffed_damage) / (TEST_COUNT * rounds_between_refresh)
    buffed_damage = float(buffed_damage) / (TEST_COUNT * rounds_between_refresh)
    rerolled_damage = float(rerolled_damage) / (TEST_COUNT * rounds_between_refresh)

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
