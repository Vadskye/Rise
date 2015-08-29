import argparse
from creature import Creature, CreatureGroup
import util
import combat
import cProfile
import pstats
import tests
from strings import *
from pprint import pprint, PrettyPrinter

CREATURE = 'creature'
COMBAT = 'combat'
BATTLE_REPEAT_COUNT = 500

TARGET_MODES = 'active any easiest hardest strongest weakest'.split()
TARGET_MODE_CHOICES = TARGET_MODES + ['test']

def initialize_argument_parser():
    parser = argparse.ArgumentParser(description='Calculate combat statistics for Rise characters')
    parser.add_argument('-b', '--battle', dest='battle', action='store_true',
            help='simulate a battle between the creatures?')
    parser.add_argument('-a', '--ally', dest='allies', nargs="*",
            help='allied creature files to load')
    parser.add_argument('-ac', '--allycount', dest='ally_count', type=str,
            help='number of allies to duplicate')
    parser.add_argument('-al', '--allylevel', dest='ally_level', type=str,
            help='the level of the ally creatures')
    parser.add_argument('-at', '--allytargets', dest='ally_targets', type=str,
            choices = TARGET_MODE_CHOICES,
            help='how the allies choose targets')
    parser.add_argument('-av', '--allyvariant', dest='ally_variants', nargs="*",
            help = 'variant to apply to all allies')
    parser.add_argument('-e', '--enemy', dest='enemies', nargs="*",
            help='enemy creature files to load (for combat purposes)')
    parser.add_argument('-e2', '--enemy2', dest='enemies2', nargs="*",
            help='other enemy creature files to load (for combat purposes)')
    parser.add_argument('-ec', '--enemycount', dest='enemy_count', type=str,
            help='number of enemies to duplicate')
    parser.add_argument('-el', '--enemylevel', dest='enemy_level', type=str,
            help='the level of the enemy creatures')
    parser.add_argument('-et', '--enemytargets', dest='enemy_targets', type=str,
            choices = TARGET_MODE_CHOICES,
            help='how the enemies choose targets')
    parser.add_argument('-ev', '--enemyvariant', dest='enemy_variants', nargs="*",
                        help = 'variant to apply to all enemies')
    parser.add_argument('-c', '--count', dest='count', type=str,
                        help = 'number of creatures to duplicate from both sides')
    parser.add_argument('-l', '--level', dest='level', type=str,
            help='the level of the allied creatures')
    parser.add_argument('-o', '--output', dest='output',
            help='A file name to store any output in')
    parser.add_argument('-p', '--printattribute', dest='print_attribute',
                        nargs="*", help = 'attribute to print for comparison')
    parser.add_argument('-m', '--printmodifier', dest='print_modifier',
                        nargs="*", help = 'modifier to print for comparison')
    parser.add_argument('--targets', dest='targets', type=str,
            choices = TARGET_MODE_CHOICES,
            help='how creatures choose targets')
    parser.add_argument('-t', '--test', dest='test', type=str,
            help='A specific test to run')
    parser.add_argument('-v', '--variant', dest='variants', nargs="*",
            help = 'variants to apply to all creatures')
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

def generate_creatures(creature_keys, data, level = None, extra_variants = None):
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
    rounds = 0
    ally_victories = 0
    ally_any_inactive = 0
    ally_any_dead = 0
    enemy_victories = 0
    enemy_any_inactive = 0
    enemy_any_dead = 0
    ties = 0

    for i in xrange(BATTLE_REPEAT_COUNT):
        rounds += fight_battle(allies, enemies)
        if allies.is_active and not enemies.is_active:
            ally_victories += 1
        elif enemies.is_active and not allies.is_active:
            enemy_victories += 1
        elif (not allies.is_active) and (not enemies.is_active):
            ties += 1
            # make the victories
            ally_victories += 0.5
            enemy_victories += 0.5
        else:
            raise Exception("Zees ees impossible!")

        if allies.count_inactive_creatures():
            ally_any_inactive += 1
        if enemies.count_inactive_creatures():
            enemy_any_inactive += 1

        if allies.count_dead_creatures() or not allies.is_active:
            ally_any_dead += 1
        if enemies.count_dead_creatures() or not enemies.is_active:
            enemy_any_dead += 1
        allies.reset_combat()
        enemies.reset_combat()

    rounds = float(rounds)/BATTLE_REPEAT_COUNT
    ally_victories = float(ally_victories)/BATTLE_REPEAT_COUNT
    ally_any_inactive = float(ally_any_inactive)/BATTLE_REPEAT_COUNT
    ally_any_dead = float(ally_any_dead)/BATTLE_REPEAT_COUNT
    enemy_victories = float(enemy_victories)/BATTLE_REPEAT_COUNT
    enemy_any_inactive = float(enemy_any_inactive)/BATTLE_REPEAT_COUNT
    enemy_any_dead = float(enemy_any_dead)/BATTLE_REPEAT_COUNT
    ties = float(ties)/BATTLE_REPEAT_COUNT
    return {
        'ally': {
            'any_dead': ally_any_dead,
            'any_inactive': ally_any_inactive,
            'average_hit_chance': allies.average_hit_chance(enemies),
            'average_damage_dealt_per_round': allies.average_damage_dealt_per_round(),
            'victories': ally_victories,
        },
        'enemy': {
            'any_dead': enemy_any_dead,
            'any_inactive': enemy_any_inactive,
            'average_hit_chance': enemies.average_hit_chance(allies),
            'average_damage_dealt_per_round': enemies.average_damage_dealt_per_round(),
            'victories': enemy_victories,
        },
        'rounds': rounds,
        'ties': ties
    }

def fight_battle(allies, enemies):
    rounds = 0
    while allies.is_active and enemies.is_active:
        allies.attack(enemies)
        enemies.attack(allies)
        allies.end_round()
        enemies.end_round()
        rounds += 1

    return rounds

def inherit_shared_args(args):
    args['ally_level'] = args.get('ally_level') or args.get('level')
    args['enemy_level'] = args.get('enemy_level') or args.get('level')

    args['ally_count'] = args.get('ally_count') or args.get('count')
    args['enemy_count'] = args.get('enemy_count') or args.get('count')

    args['ally_targets'] = args.get('ally_targets') or args.get('targets')
    args['enemy_targets'] = args.get('enemy_targets') or args.get('targets')

    args['ally_variants'] = args.get('ally_variants') or args.get('variant')
    args['enemy_variants'] = args.get('enemy_variants') or args.get('variant')
    return args

def analyze_combined_results(results):
    pprint(results)
    print "\nally victories:"
    pprint(results['ally']['victories'])

    good_victory_chance_tests = list()
    for i, victory_chance in results['ally']['victories']:
        if 0.25 <= victory_chance < 0.75:
            good_victory_chance_tests.append((i, victory_chance))
    print 'good victory tests:', good_victory_chance_tests

    good_inactive_chance_tests = list()
    for i, inactive_chance in results['ally']['any_inactive']:
        if 0.05 <= inactive_chance <= 0.95:
            good_inactive_chance_tests.append((i, inactive_chance))
    print 'good inactive tests:', good_inactive_chance_tests

    good_death_chance_tests = list()
    for i, death_chance in results['ally']['any_dead']:
        if 0.01 <= death_chance <= 0.2:
            good_death_chance_tests.append((i, death_chance))
    print 'good death tests:', good_death_chance_tests

def generate_creature_groups(data, names, count, level, target_mode, variants):
    creature_groups = list()

    if target_mode == 'test':
        for target_mode in TARGET_MODES:
            creature_group = generate_creatures(names, data, level, variants)
            creature_group.target_mode = target_mode
            creature_groups.append(creature_group)
        return creature_groups

    if count == 'test':
        for test_count in xrange(15,30):
            test_names = names * test_count
            creature_groups.append(generate_creatures(test_names, data, level, variants))
        return creature_groups
    elif count:
        names *= int(count)

    if level == 'test':
        for test_level in xrange(1,21):
            creature_groups.append(generate_creatures(names, data, test_level, variants))
        return creature_groups
    else:
        creature_groups.append(generate_creatures(names, data, level, variants))

    # at this point, we are just modifying the existing creature_groups

    if target_mode:
        for creature_group in creature_groups:
            creature_group.target_mode = target_mode

    return creature_groups

def add_custom_modifiers(ally_groups, enemy_groups):
    for ally_group in ally_groups:
        for ally in ally_group:
            """
            if len(ally.physical_attack_progression) == 1:
                ally.add_modifier('extra_attacks', 'testing', 1)
                ally.add_modifier('extra_physical_attack_bonus', 'testing', -5)
            elif len(ally.physical_attack_progression) == 2:
                ally.add_modifier('second_physical_attack_bonus', 'testing', 5)
            elif len(ally.physical_attack_progression) == 3:
                ally.add_modifier('third_physical_attack_bonus', 'testing', 5)
            else:
                ally.add_modifier('fourth_physical_attack_bonus', 'testing', 5)
            """
            #ally.add_modifier('physical_attacks', 'testing', 2)
            #ally.add_modifier('extra_attacks', 'testing', 1)
            #ally.add_modifier('extra_physical_attack_bonus', 'testing', -5)
            #ally.add_modifier('physical_damage_reduction', 'testing', lambda c: c.level)
            #ally.add_modifier('extra_attacks', 'testing', 1)
            #ally.add_modifier('extra_physical_attack_bonus', 'testing', -5)
            #ally.add_modifier('weapon_size', 'testing', 1)
            #ally.add_modifier('hit_points', 'testing', lambda c: c.level * 2)
            #ally.add 
            pass

    for enemy_group in enemy_groups:
        for enemy in enemy_group:
            #enemy.add_modifier('extra_attacks', 'testing', 1)
            #enemy.add_modifier('extra_physical_attack_bonus', 'testing', -5)
            pass
            #enemy.add_modifier('physical_attacks', 'testing', 2)
            #enemy.add_modifier('hit_points', 'testing', lambda c: (c.hit_value + c.constitution/2) * c.level)

def main(args):
    args = inherit_shared_args(args)
    data = util.import_data()
    ally_names = args.get('allies')
    if ally_names is not None and ally_names[0] == 'classes':
        ally_names = 'barbarian cleric druid fighter monk paladin ranger rogue sorcerer spellwarped wizard'.split()
    enemy_names = args.get('enemies')
    if enemy_names is not None and enemy_names[0] == 'classes':
        enemy_names = 'barbarian cleric druid fighter monk paladin ranger rogue sorcerer spellwarped wizard'.split()

    ally_groups = generate_creature_groups(data, ally_names, args['ally_count'], args['ally_level'], args['ally_targets'], args['ally_variants'])
    enemy_groups = generate_creature_groups(data, enemy_names, args['enemy_count'], args['enemy_level'], args['enemy_targets'], args['enemy_variants'])

    add_custom_modifiers(ally_groups, enemy_groups)

    if args['test']:
        ideal_creature = Creature.get_ideal_creature(
            raw_stats = data,
            level = args.get('level'),
        )
        tests.run_test(
            args['test'],
            ally_groups[0],
            enemy_groups[0],
            level = int(args.get('level', 1)),
            ideal_creature = ideal_creature,
        )
    else:
        allies = ally_groups[0]
        print "~~~~ allies:"
        for i, ally in enumerate(allies):
            print ally#.to_latex()
            if args.get('print_attribute'):
                for attribute in args.get('print_attribute'):
                    print getattr(ally, attribute)
            if args.get('print_modifier'):
                for modifier in args.get('print_modifier'):
                    print ally.get_modifiers_as_dict(modifier)
            #pprint(ally._modifiers)
            #print
            #print ally.average_hit_chance(ideal_creature)
            #print ally.get_average_damage_per_round(ideal_creature)
            #print ally.traits
            #ally.set_modifier('physical_attacks', 'enhancement', util.std_scale(ally.caster_level))
            #ally.set_modifier('physical_damage', 'enhancement', util.std_scale(ally.caster_level))
            #ally.set_modifier('physical_defenses', 'enhancement', util.std_scale(ally.caster_level))
            #ally._update_static_modifiers()
            #ally.add_modifier('extra_attacks', 1, 'because')
            #ally.size = 'large'
            #ally.level = 6
            #print
            #print i+1, ally.armor_defense - avg(ally.physical_attack_progression), i+16 - avg(ally.physical_attack_progression)
            #print ally#.to_latex()
            #print ally.get_modifiers_as_dict('first_physical_attack_bonus')
            #print ally.get_modifiers_as_dict('armor_defense')
            #print ally.physical_attack_progression
            #print ally.get_modifiers('maneuver_defense', as_dict = True)
            #print ally.get_modifiers_as_dict('primary_weapon_damage')
            #print ally.get_modifiers('armor_defense', as_dict = True)
            #print ally.get_modifiers('armor_defense', as_dict = True)
            #print ally.get_modifiers('maneuver_defense', as_dict = True)
            #print ally.get_modifiers('reflex', as_dict = True)
            #print ally.get_modifiers('will', as_dict = True)
            #print ally.get_modifiers('primary_weapon_size', as_dict = True)
            #print ally.primary_weapon.damage_die
            #print ally.armor_class.get_details()
            #print ally#.to_latex()
            print

        enemies = enemy_groups[0]
        print "~~~~ enemies:"
        print
        for enemy in enemies:
            print enemy#.to_latex()
            if args.get('print_attribute'):
                for attribute in args.get('print_attribute'):
                    print getattr(enemy, attribute)
            if args.get('print_modifier'):
                for modifier in args.get('print_modifier'):
                    print enemy.get_modifiers_as_dict(modifier)
            #print enemy.armor_class.get_details()
            #print enemy.get_modifiers_as_dict('armor_defense')
            #pprint(enemy._modifiers)
            print

    if args['battle']:
        if not len(ally_groups) == len(enemy_groups):
            if len(ally_groups) == 1:
                ally_groups *= len(enemy_groups)
            elif len(enemy_groups) == 1:
                enemy_groups *= len(ally_groups)
            else:
                raise Exception("Must have same number of ally groups ({0}) and enemy groups ({1})".format(len(ally_groups), len(enemy_groups)))

        combined_results = {
            'ally': {
                'any_dead': list(),
                'any_inactive': list(),
                'average_hit_chance': list(),
                'average_damage_dealt_per_round': list(),
                'victories': list(),
            },
            'enemy': {
                'any_dead': list(),
                'any_inactive': list(),
                'average_hit_chance': list(),
                'average_damage_dealt_per_round': list(),
                'victories': list(),
            },
            'rounds': list(),
            'ties': list(),
        }

        for i in xrange(len(ally_groups)):
            allies = ally_groups[i]
            enemies = enemy_groups[i]

            print "Running test ", i
            war_results = wage_war(allies, enemies)
            #pprint(war_results)
            #print

            combined_results['rounds'].append((i, war_results['rounds']))
            combined_results['ties'].append((i, war_results['ties']))
            for key in war_results['ally']:
                combined_results['ally'][key].append((i+1, war_results['ally'][key]))
            for key in war_results['enemy']:
                combined_results['enemy'][key].append((i+1, war_results['enemy'][key]))

        analyze_combined_results(combined_results)

    if args['output'] is not None:
        latex_string = creatures[0].to_latex()
        output_file = open(args['output'], 'w')
        output_file.write(latex_string)

if __name__ == "__main__":
    args = initialize_argument_parser()
    if args['profile']:
        cProfile.run('main(args)', 'profile.log')
        stats = pstats.Stats('profile.log')
        stats.strip_dirs().sort_stats('time').print_stats()
    else:
        main(args)
