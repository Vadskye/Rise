import argparse
from creature import generate_creature_from_file_name
import util
import combat
import cProfile
from abilities import Ability
from strings import *

CREATURE = 'creature'
COMBAT = 'combat'
BATTLE_REPEAT_COUNT = 500

def initialize_argument_parser():
    parser = argparse.ArgumentParser(description='Calculate combat statistics for Rise characters')
    parser.add_argument('-b', '--battle', dest='battle', action='store_true',
            help='simulate a battle between the creatures?')
    parser.add_argument('-c', '--creature', dest='creature', nargs="*",
            help='the creature file to load')
    parser.add_argument('-e', '--enemy', dest='enemy', nargs="*",
            help='enemy creature files to load (for combat purposes)')
    parser.add_argument('-l', '--level', dest='level', type=int,
            help='the level of the creatures')
    parser.add_argument('-el', '--enemylevel', dest='enemy_level', type=int,
            help='the level of the enemy creatures (defaults to being the same as for the given creatures')
    parser.add_argument('-o', '--output', dest='output',
            help='A file name to store any output in')
    parser.add_argument('-v', '--verbose', dest='verbose', action='store_true',
            help='show verbose output?')
    parser.add_argument('-m', '--matchlevel', dest='match_level', action='store_true',
            help='match the levels of all subsequent creatures to the level of the first creature?')
    parser.add_argument('-t', '--test', dest='test', action='store_true',
            help='for one-off tests')
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
#correct AC is level + 15
#note that we assume overwhelm 2 since overwhelm penalties are so common 
#so actual character AC should be two higher
def get_generic_ac_calc():
    return [i+13 for i in range(21)]
def get_generic_ac_real():
    return [i+15 for i in range(21)]
def get_generic_hp():
    return [i*7 for i in range(21)]

#set a creature's AC to match generic AC
def normalize_ac(creature):
    creature.armor_class.misc.add_circumstance(
            get_generic_ac_calc()[creature.level] - creature.armor_class.normal())

def print_generic_stats(level):
    print "Generic stats for comparison"
    print "AC %s, MC %s" % (get_generic_ac_real()[level], 0)
    print "HP %s, Fort %s, Ref %s, Will %s" % (get_generic_hp()[level],
            0, 0, 0)

if __name__ == "__main__":
    args = initialize_argument_parser()
    creatures = list()
    for creature_file_name in args['creature']:
        creature = generate_creature_from_file_name(creature_file_name, args['level'],
                args['verbose'])
        print creature
        print ''
        creatures.append(creature)
        #This is kinda hacky, but shouldn't cause problems
        if args['match_level']:
            args['level'] = creature.meta[LEVEL]
            args['match_level'] = False

    if args['battle']:
        if len(creatures)>=2:
            first = creatures[0]
            second = creatures[1]
            battle = combat.Battle(first, second)
            battle_results = battle.iterated_battles(BATTLE_REPEAT_COUNT)
            print "Battle results:", battle_results
            average_hit_chance_first = first.average_hit_probability(second)
            average_hit_chance_second = second.average_hit_probability(first)
            print 'avg hit chance:    %s    %s' % (average_hit_chance_first, average_hit_chance_second)
        else:
            raise Exception("Can't battle: not enough creatures")

    if args['output'] is not None:
        latex_string = creatures[0].to_latex()
        output_file = open(args['output'], 'w')
        output_file.write(latex_string)

    if False:
        print 'Lvl\twin%1\tRounds\thit%1\thit%2'
        for i in xrange(20):
            """
            barbarian = Character.from_creature_name('brb-heavy', i+1)
            other_barbarian = Character.from_creature_name('brb-heavy', i+1)
            cleric = Character.from_creature_name('cleric-warrior', i+1)
            fighter_heavy = Character.from_creature_name('ftr-heavy', i+1)
            npc = Character.from_creature_name('npc', i+1)
            npc2 = Character.from_creature_name('npc', i+1)
            rogue = Character.from_creature_name('rogue-single', i+1)
            """
            first_name = args['creature_input']
            second_name = args['creature_input_2']
            first = Creature.from_creature_name(first_name, i+1, args['verbose'])
            first = combat.CombatCreature.from_creature(first)
            second = Creature.from_creature_name(second_name, i+1, args['verbose'])
            second = combat.CombatCreature.from_creature(second)

            #print first
            #print second

            #first.add_ability(abilities['combat expertise'], False)
            #first.add_ability(abilities['power attack'], False)

            battle = combat.Battle(first, second)

            repeat_count = 500
            results = run_repeated_battles(battle, repeat_count)
            print '%s \t%s \t%s' % (i+1, results[0], results[2]),
            average_hit_chance_first = first.average_hit_probability(second.defenses[AC].normal())
            average_hit_chance_second = second.average_hit_probability(first.defenses[AC].normal())
            print '\t%s \t%s' % (average_hit_chance_first, average_hit_chance_second),
            print '\t%s \t%s' % (first.attacks[DAMAGE][WEAPON_PRIMARY].get_total(),
                    second.attacks[DAMAGE][WEAPON_PRIMARY].get_total())

            #print npc.armor_class.normal() - generic_ac_real[i]


            #print i+1, cleric.damage_per_round(generic_ac_calc[i]), 'vs', npc.dpr(generic_ac_calc[i])
            #print i+1, compare_ac_to_reflex(barbarian)
            #print rounds_survived(npc, current_char)
            #print i+1, current_char.hp, (i+1)*5.5/2, current_char.hp/((i+1)*5.5/2)
            #print rounds_survived_generic(npc, i)
            #print i+1, current_char.cmd.total(), current_char.armor_class.get_normal()
