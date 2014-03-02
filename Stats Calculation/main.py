import argparse
from creature import Creature, Character
import util
import combat
import cProfile

def initialize_argument_parser():
    parser = argparse.ArgumentParser(description='Calculate combat statistics for Rise characters')
    parser.add_argument('-c', '--creature', dest='creature', 
            help='the creature file to load', default=None)
    parser.add_argument('-l', '--level', dest='level',
            help='the level of the creature', default=None)
    return vars(parser.parse_args())

def compare_ac_to_reflex(creature):
    return 'AC {0}, Reflex {1}, {2}'.format(
            creature.armor_class.get_normal(),
            creature.saves['reflex'].total(),
            util.mstr(creature.armor_class.get_normal() - (10 + creature.saves['reflex'].total())))

def rounds_survived(attacker, defender):
    return combat.rounds_survived(attacker.attack_bonus.total(),
            defender.armor_class.get_normal(), attacker.base_attack_bonus,
            attacker.attack_damage.total(), defender.hp)

def rounds_survived_generic(creature, i):
    return combat.rounds_survived(creature.attack_bonus.total(),
            generic_ac_calc[i], creature.base_attack_bonus,
            creature.attack_damage.total(), generic_hp[i])

def single_battle(battle):
    victor, round_count = battle.determine_victor()
    print victor.name, victor.current_hit_points, victor.max_hit_points, round_count

def run_repeated_battles(battle, repeat_count):
    win_prob1, win_prob2, avg_rounds = battle.iterated_battles(repeat_count)
    print i+1, win_prob1, win_prob2, avg_rounds

def identify_effect_of_bonuses(creature):
    print i+1, current_char.damage_per_round(generic_ac_calc[i]), current_char.damage_per_round(
            generic_ac_calc[i])*1.075,
    #current_char.attack_bonus.add_circumstance(-2-(i+1)/4)
    current_char.attack_bonus.add_circumstance(1)
    #current_char.attack_damage.add_circumstance(2+((i+1)/4)*2)
    #current_char.attack_damage.add_circumstance(2)
    #print i+1, current_char.hits_per_round(generic_ac_calc[i])
    print current_char.damage_per_round(generic_ac_calc[i])

#this is the generic AC we assume for attack calculations
#note that we assume overwhelm 2 since overwhelm penalties are so common 
    #so actual character AC should be two higher
def get_generic_ac_calc():
    return [i+14 for i in range(1,21)]
def get_generic_ac_real():
    return [i+16 for i in range(1,21)]
def get_generic_hp():
    return [i*7 for i in range(1,21)]

if __name__ == "__main__":
    args = initialize_argument_parser()

    if args['level']:
        creature = Creature.from_creature_name(args['creature'],
                int(args['level']))
        print creature
    #Otherwise, show all levels
    elif args['creature']:
        for i in xrange(20):
            creature = Creature.from_creature_name(args['creature'], i+1)
            print creature
    else:
        for i in xrange(1,20):
            """
            barbarian = Character.from_creature_name('brb-heavy', i+1)
            other_barbarian = Character.from_creature_name('brb-heavy', i+1)
            cleric = Character.from_creature_name('cleric-warrior', i+1)
            fighter_heavy = Character.from_creature_name('ftr-heavy', i+1)
            npc = Character.from_creature_name('npc', i+1)
            npc2 = Character.from_creature_name('npc', i+1)
            rogue = Character.from_creature_name('rogue-single', i+1)
            """
            first_name = 'ftr-heavy'
            second_name = 'brb-heavy'
            first = Character.from_creature_name(first_name, i+1)
            second = Character.from_creature_name(second_name, i+1)
            #fighter_heavy.armor_class.misc.add_circumstance((i+1)/5)

            battle = combat.Battle(first, second)
            #print fighter_typical
            #print fighter_heavy

            repeat_count = 500
            run_repeated_battles(battle, repeat_count)

            #print npc.armor_class.normal() - generic_ac_real[i]


            #print i+1, cleric.damage_per_round(generic_ac_calc[i]), 'vs', npc.dpr(generic_ac_calc[i])
            #print i+1, compare_ac_to_reflex(barbarian)
            #print rounds_survived(npc, current_char)
            #print i+1, current_char.hp, (i+1)*5.5/2, current_char.hp/((i+1)*5.5/2)
            #print rounds_survived_generic(npc, i)
            #print i+1, current_char.cmd.total(), current_char.armor_class.get_normal()
