import argparse
from creature import Creature, CombatCreature
from monster import Monster
import util
import combat
import cProfile
import abilities

CHARACTER = 'character'
MONSTER = 'monster'
COMBAT = 'combat'

def initialize_argument_parser():
    parser = argparse.ArgumentParser(description='Calculate combat statistics for Rise characters')
    parser.add_argument('-f', '--function', dest='function',
            help='function to perform', default=COMBAT,
            choices=[COMBAT, CHARACTER, MONSTER])
    parser.add_argument('-c', '--creature-input', dest='creature_input', 
            help='the creature file to load', default=None)
    parser.add_argument('-l', '--level', dest='level', type=int,
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
    return win_prob1, win_prob2, avg_rounds

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

#set a creature's AC to match generic AC
def normalize_ac(creature):
    creature.armor_class.misc.add_circumstance(
            get_generic_ac_calc()[creature.level-1] - creature.armor_class.normal())

if __name__ == "__main__":
    args = initialize_argument_parser()
    #If no level is specified, show all levels
    if args['function'] == CHARACTER:
        creature = Character.from_creature_name(args['creature'],
                args['level'])
        print creature
    elif args['function'] == MONSTER:
        creature = Monster.from_monster_name(args['creature_input'],
                args['level'])
        print creature
    elif args['function'] == COMBAT:
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
            first_name = 'monk-unarmed'
            second_name = 'ftr-heavy'
            first = CombatCreature.from_creature_name(first_name, i+1)
            second = CombatCreature.from_creature_name(second_name, i+1)

            #print first
            #print second
            second.name='second_char'

            #first.add_feat(abilities.CombatExpertise(), False)
            first.add_feat(abilities.PowerAttack(), False)

            battle = combat.Battle(first, second)

            repeat_count = 500
            results = run_repeated_battles(battle, repeat_count)
            print i+1, results[0], results[2]

            #print npc.armor_class.normal() - generic_ac_real[i]


            #print i+1, cleric.damage_per_round(generic_ac_calc[i]), 'vs', npc.dpr(generic_ac_calc[i])
            #print i+1, compare_ac_to_reflex(barbarian)
            #print rounds_survived(npc, current_char)
            #print i+1, current_char.hp, (i+1)*5.5/2, current_char.hp/((i+1)*5.5/2)
            #print rounds_survived_generic(npc, i)
            #print i+1, current_char.cmd.total(), current_char.armor_class.get_normal()
