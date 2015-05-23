import argparse
#from creature import generate_creature_from_key
from creature import Creature, CreatureGroup
import util
import combat
import cProfile
import pstats
from strings import *
from pprint import pprint, PrettyPrinter

CREATURE = 'creature'
COMBAT = 'combat'
BATTLE_REPEAT_COUNT = 1000

def initialize_argument_parser():
    parser = argparse.ArgumentParser(description='Calculate combat statistics for Rise characters')
    parser.add_argument('-b', '--battle', dest='battle', action='store_true',
            help='simulate a battle between the creatures?')
    parser.add_argument('-a', '--ally', dest='allies', nargs="*",
            help='allied creature files to load')
    parser.add_argument('-av', '--allyvariant', dest='allies_variants', nargs="*",
                        help = 'variant to apply to all allies')
    parser.add_argument('-e', '--enemy', dest='enemies', nargs="*",
            help='enemy creature files to load (for combat purposes)')
    parser.add_argument('-ev', '--enemyvariant', dest='enemies_variants', nargs="*",
                        help = 'variant to apply to all enemies')
    parser.add_argument('-l', '--level', dest='level', type=str,
            help='the level of the allied creatures')
    parser.add_argument('-el', '--enemylevel', dest='enemy_level', type=int,
            help='the level of the enemy creatures (defaults to allied creature level)')
    parser.add_argument('-o', '--output', dest='output',
            help='A file name to store any output in')
    parser.add_argument('-v', '--verbose', dest='verbose', action='store_true',
            help='show verbose output?')
    parser.add_argument('-m', '--matchlevel', dest='match_level', action='store_true',
            help='match the levels of all subsequent creatures to the level of the first creature?')
    parser.add_argument('-t', '--test', dest='test', action='store_true',
            help='for one-off tests')
    parser.add_argument('--profile', dest='profile', action='store_true',
            help = 'profile performance?')
    return vars(parser.parse_args())

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

def generate_creatures(creature_keys, data, level = None, extra_variants = None, verbose = None):
    creatures = list()
    if creature_keys is None:
        return creatures
    stats_override = dict()
    if level is not None:
        stats_override['level'] = level

    for creature_key in creature_keys:
        if extra_variants is not None:
            creature_key += '/' + '/'.join(extra_variants)
        creature = Creature.from_raw_stats(
            raw_stats = data,
            creature_key = creature_key, 
            stats_override = stats_override
        )
        creatures.append(creature)
    return CreatureGroup(creatures)

def generate_battle_results_old(allies, enemies):
    # for now, just have the two first creatures fight
    # later on, simulate multi-creature battles
    first = allies[0]
    second = enemies[0]
    battle = combat.Battle(first, second)
    battle_results = battle.iterated_battles(BATTLE_REPEAT_COUNT)

    average_hit_chance_first = first.average_hit_probability(second)
    average_hit_chance_second = second.average_hit_probability(first)
    return battle_results, (average_hit_chance_first, average_hit_chance_second)

def wage_war(allies, enemies):
    #allies.target_mode = 'weakest'
    #enemies.target_mode = 'weakest'
    rounds = 0
    ally_victories = 0
    enemy_victories = 0
    ties = 0

    for i in xrange(BATTLE_REPEAT_COUNT):
        rounds += fight_battle(allies, enemies)
        if allies.is_active and not enemies.is_active:
            ally_victories += 1
        elif enemies.is_active and not allies.is_active:
            enemy_victories += 1
        elif (not allies.is_active) and (not enemies.is_active):
            ties += 1
        else:
            raise Exception("Zees ees impossible!")
        allies.reset_damage()
        enemies.reset_damage()
    rounds = float(rounds)/BATTLE_REPEAT_COUNT
    ally_victories = float(ally_victories)/BATTLE_REPEAT_COUNT
    enemy_victories = float(enemy_victories)/BATTLE_REPEAT_COUNT
    ties = float(ties)/BATTLE_REPEAT_COUNT
    return rounds, ally_victories, enemy_victories, ties

def fight_battle(allies, enemies):
    rounds = 0
    while allies.is_active and enemies.is_active:
        allies.attack(enemies)
        enemies.attack(allies)
        allies.end_round()
        enemies.end_round()
        rounds += 1

    return rounds

def avg(numbers):
    if numbers is None:
        return None
    return float(sum(numbers))/len(numbers)

def main(args):
    data = util.import_data()
    ally_names = args.get('allies')
    if ally_names is not None and ally_names[0] == 'classes':
        ally_names = 'barbarian cleric druid fighter monk paladin ranger rogue sorcerer spellwarped wizard'.split()
    enemy_names = args.get('enemies')
    if enemy_names is not None and enemy_names[0] == 'classes':
        enemy_names = 'barbarian cleric druid fighter monk paladin ranger rogue sorcerer spellwarped wizard'.split()
    if args['level'] == 'all':
        raise Exception('not yet implemented')
        for level in xrange(1,21):
            allies += generate_creatures(ally_names, data, level, args['verbose'])
            enemies += generate_creatures(enemy_names, data, level, args['verbose'])
    else:
        allies = generate_creatures(ally_names, data, args['level'], args['allies_variants'], args['verbose'])
        enemies = generate_creatures(enemy_names, data, args['enemy_level'] or args['level'], args['enemies_variants'], args['verbose'])

    if allies:
        print "allies:"
        for i, ally in enumerate(allies):
            print ally#.to_latex()
            #print ally.traits
            #ally.add_modifier('physical_attacks', 5, 'because')
            #ally.add_modifier('physical_damage', 5, 'because')
            #ally.add_modifier('physical_defenses', 5, 'because')
            #ally.add_modifier('extra_attacks', 1, 'because')
            #ally.size = 'large'
            #ally.level = 6
            #print
            #print i+1, ally.armor_defense - avg(ally.physical_attack_progression), i+16 - avg(ally.physical_attack_progression)
            #print ally#.to_latex()
            #print ally.get_modifiers('maneuver_defense', as_dict = True)
            #print ally.get_modifiers('first_physical_attack_bonus', as_dict = True)
            #print ally.get_modifiers('armor_defense', as_dict = True)
            #print ally.get_modifiers('armor_defense', as_dict = True)
            #print ally.get_modifiers('maneuver_defense', as_dict = True)
            #print ally.get_modifiers('reflex', as_dict = True)
            #print ally.get_modifiers('will', as_dict = True)
            #print ally.get_modifiers('primary_weapon_size', as_dict = True)
            #print ally.primary_weapon.damage_die
            #print ally.armor_class.get_details()
            print

    if enemies:
        print "enemies:"
        for enemy in enemies:
            print enemy#.to_latex()
            #print enemy.armor_class.get_details()
            print ''

    if args['battle']:
        if allies and enemies:
            if args['level'] == 'all':
                print "Level\t%s\t%s\tRounds" % (allies[0][0].name, enemies[0][0].name)
                for i in xrange(len(allies)):
                    battle_results, hit_chances = generate_battle_results(allies[i], enemies[i])
                    print "%s\t\t%.3f\t\t%.3f\t%.3f" % (i+1, battle_results[0], battle_results[1], battle_results[2])
            else:
                print wage_war(allies, enemies)
        else:
            raise Exception("Must have both allies and enemies to have a battle")

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

if __name__ == "__main__":
    args = initialize_argument_parser()
    if args['profile']:
        cProfile.run('main(args)', 'profile.log')
        stats = pstats.Stats('profile.log')
        stats.strip_dirs().sort_stats('time').print_stats()
    else:
        main(args)
