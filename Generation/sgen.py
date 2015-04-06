import argparse
import re
import sys
import util

PART=0.8
HALF=0.6
damage_type_choices = ['force']
duration_choices = ['round','short','medium','long','extreme', 'month', 'year', 'permanent']
area_choices = ['tiny', 'normal',
    'small_radius', 'medium_radius', 'large_radius',
    'large_line',
    'medium_cone', 'large_cone',
    'medium_wall', 'large_wall', 'huge_wall',
]
range_choices = ['personal', 'touch', 'close', 'medium', 'long', 'extreme']
condition_choices = [0,1,1.5,2,2.5,3,3.5]
touch_attack_choices =['none','poor','1','average','2', 'ray']
bloodied_behavior_choices = ['while', 'instant', 'ifever']
storage_file_name = 'spells.txt'
condition_debug=True
general_debug=True
damage_debug=False
buff_debug=False
DAMAGE = 'damage'
CONDITION = 'condition'
BUFF = 'buff'

#Return the arguments
def initialize_argument_parser():
    parser = argparse.ArgumentParser(description='Spell information')
    parser.add_argument('-d', dest=DAMAGE, action='store_true')
    parser.add_argument('-c', dest=CONDITION, type=float)
    parser.add_argument('-b', dest=BUFF, type=int)
    parser.add_argument('-o', '--bloodied', dest='bloodied', action='store_true',
            help='Condition only affects healthy creatures?')
    parser.add_argument('-e', '--healthy', dest='healthy', action='store_true',
            help='Condition only affects healthy creatures?')
    parser.add_argument('--alternateeffect', dest = 'alternateeffect', 
            help='Spell has an alternate effect?', action='store_true')
    parser.add_argument('-u', '--duration', dest = 'duration', type=str,
            choices=duration_choices)
    parser.add_argument('--damagetype', dest = 'damagetype', type=str,
            choices = damage_type_choices,
            help = 'force damage is more expensive')
    parser.add_argument('--undispellable', dest = 'undispellable',
            help='Immune to dispelling?', action='store_true')
    parser.add_argument('--concentration', dest = 'concentration', 
            action='store_true', help='Requires concentration?')
    parser.add_argument('--saveends', dest='saveends', 
            action='store_true', help='Save each round to end?')
    parser.add_argument('--bloodiedbehavior', dest='bloodiedinstant',
            help='''How is the bloodied effect triggered?
                "while": active while target is bloodied during duration (default)
                "instant": activates if target is bloodied when cast
                "ifever": activates if target is ever bloodied during duration''',
            choices=bloodied_behavior_choices)
    parser.add_argument('-a', '--area', dest='area', type=str,
            choices=area_choices)
    parser.add_argument('--choosetargets', dest='choosetargets',
            action='store_true', help='Choose targets of area spell?')
    parser.add_argument('-m', '--maxtargets', dest='maxtargets', action='store_true',
            help='Max target limit')
    parser.add_argument('-v', '--save', dest='save', type=str,
            help='Saving throw type', 
            choices=['none','half','partial','negates'])
    parser.add_argument('--nosr', dest='nosr', action='store_true',
            help='Doesn\'t allow spell resistance?')
    parser.add_argument('--norepeat', dest='norepeat', action='store_true',
            help='Target immune for 24 hours after spell is cast?')
    parser.add_argument('--repeatable', dest='repeatable', type=int,
            choices=[0, 1, 2],
            help='''Effect can be used multiple times?
                0: no (default)
                1: twice
                2: caster level times''')
    parser.add_argument('-l', '--limittypes', dest='limittypes', type=int,
            help='Limit affected types?', choices=[0,1,2,3])
    parser.add_argument('--escapable', dest='escapable', type=str,
            help='Is the spell escapable?', choices=['1','2'])
    parser.add_argument('--noncombat', dest='noncombat', 
            action='store_true', help='Irrelevant in combat?')
    parser.add_argument('--touchattack', dest='touchattack',
            type=str, help='Touch attack and bab',
            choices = touch_attack_choices)
    parser.add_argument('--trigger', dest='trigger', type=str,
            help='Triggered by specific event?',
            choices=['false','immediate','noaction'])
    parser.add_argument('--castingtime', dest='castingtime', type=str,
            choices=['standard', 'full', 'swift'])
    parser.add_argument('-r', '--range', dest='range', type=str,
            choices=range_choices)
    parser.add_argument('--discharged', type=str, choices=[None, 'depleted', 'delayed'],
            help='Discharged before its duration is over? \
            1=effect depleted over time, 2=delayed single effect')
    parser.add_argument('--shapeable', action='store_true',
            help='Line or wall can be shaped?')
    parser.add_argument('--savename', dest='savename', type=str)
    parser.add_argument('--loadname', dest='loadname', type=str)
    parser.add_argument('--dot', dest='dot', type=util.bool_parser,
            help='damage over time?')
    return parser
    #return vars(parser.parse_args())

class Spell:
    def __init__(self):
        self.components = {
                DAMAGE: list(),
                CONDITION: list(),
                BUFF: list(),
                }

    def get_level(self, area=None, choose_targets=None, max_targets=None,
            shapeable=None, bloodied_behavior=None, duration=None,
            no_spell_resistance=None, no_repeat=None, spell_range=None, trigger=None,
            repeatable=None):
        level=0
        for component_type in self.components.keys():
            for component in self.components[component_type]:
                # if the bloodied effect only happens if the target is
                # bloodied as the spell is cast, the healthy effect is
                # discounted, since it won't usually trigger.
                if bloodied_behavior == 'instant' and not component.bloodied_only:
                    level += component.level * HALF
                # if the bloodied effect happens if the target is ever bloodied
                # during the duration of the spell, the bloodied effect is more
                # expensive, based on the duration of the spell.
                elif bloodied_behavior == 'ifever' and component.bloodied_only:
                    level += component.level * {
                            None: 1,
                            'round': 1,
                            'short': 1.1,
                            'medium': 1.2,
                            'long': 1.3,
                            'extreme': 1.5,
                            'permanent': 2,
                            }[duration]
                # if there is no bloodied effect, or if the bloodied effect
                # happens for as long as the target is bloodied,
                # there is no special modifier to the level of the component
                else:
                    level += component.level

        print
        print 'combined level from components', level
        level += calculate_area_modifier(area, choose_targets, max_targets, shapeable, self.components)
        print 'total level after area modifier', level

        if repeatable == 1:
            level *= 1.25
        elif repeatable == 2:
            level *= 1.5
        if no_repeat:
            level *= PART
        if no_spell_resistance:
            level += 1
        if trigger:
            if trigger == 'no_action':
                level +=1
            level *= 1.5
        if spell_range:
                #range_choices = ['personal', 'touch', 'close', 'medium', 'long', 'extreme']
            if self.components[DAMAGE] or self.components[CONDITION]:
                level += {
                        'personal': -2,
                        'touch': -2,
                        'close': -1,
                        'medium': 0,
                        'long': 1,
                        'extreme': 2,
                        }[spell_range]
            else:
                level += {
                        'personal': 0,
                        'touch': 0.5,
                        'close': 1,
                        'medium': 1.5,
                        'long': 2,
                        'extreme': 2.5,
                        }[spell_range]

        print 'combined level after range and misc modifiers', level
        # we subtract 3 to convert from 'spell level' as used for modifiers and
        # the actual level of the spell
        return level-3

class SpellComponent:
    def __init__(self, component_type, alternate_effect=None, area=None,
            bloodied_only=None, component_strength=None,
            discharged=None, duration=None, escapable=None, healthy_only=None,
            limit_affected_types=None, noncombat=None, requires_concentration=None,
            save_ends=None, saving_throw=None, touch_attack=None,
            undispellable=None, damage_type=None):

        #some attributes need to be referenced externally to the component
        self.bloodied_only = bloodied_only

        self.level = calculate_base_level(alternate_effect, component_type, component_strength, damage_type)
        if bloodied_only:
            self.level *= 0.4
        print "base level:", self.level
        self.level += calculate_duration_modifier(component_type, component_strength, duration, requires_concentration, undispellable, save_ends, bloodied_only, discharged)
        print "with duration modifier:", self.level
        self.level *= calculate_miscellaneous_component_multiplier(component_type, area,
                escapable, healthy_only, limit_affected_types, noncombat,
                saving_throw, touch_attack, bloodied_only)
        print "with miscellaneous modifiers:", self.level

def calculate_base_level(alternate_effect, component_type, component_strength, damage_type):
    level = {
            DAMAGE: 4,
            CONDITION: rank_condition_strength(component_strength),
            BUFF: component_strength,
            }[component_type]
    if alternate_effect:
        level += 1
    if damage_type == 'force':
        level += 1
    return level

#Return the level adjustment associated with the condition strength
def rank_condition_strength(condition_strength):
    #this is called for all strengths, even inapplicable ones
    #so we need to support arbitrary strengths
    try:
        return {
            3: 2,
            2: 6,
            1.5: 10,
            1: 14}[condition_strength]
    except KeyError:
        return 0

def calculate_duration_modifier(component_type, component_strength, duration, requires_concentration, undispellable, save_ends, bloodied_only, discharged):
    if component_type==DAMAGE:
        level = {
                # assume no duration by default
                None: 0,
                'round': 0.5,
                'short': 2,
                'medium': 3,
                'long': 3.5,
                'extreme': 4,
                'month': 4.5,
                'year': 5,
                'permanent': 6,
                }[duration]
    elif component_type==CONDITION or component_type==BUFF:
        if component_type == CONDITION and component_strength in [1.5, 1]:
            # high-tier conditions get a big level bump if they are longer than 1 round
            # but there isn't a huge difference between different durations once 
            # you pass the 5 round threshold
            level = {
                'round': 0,
                # assume short duration by default
                None: 5,
                'short': 5,
                'medium': 6,
                'long': 6.5,
                'extreme': 7,
                'month': 7.5,
                'year': 8,
                'permanent': 9,
                }[duration]
        else:
            # this is the normal scaling for condition and damage spell durations
            level = {
                    'round': 0,
                    # assume short duration by default
                    None: 2,
                    'short': 2,
                    'medium': 3,
                    'long': 3.5,
                    'extreme': 4,
                    'month': 4.5,
                    'year': 5,
                    'permanent': 6,
                    }[duration]
    else:
        raise Exception("unrecognized component_type %s" % component_type)

    #now that the base level is established, apply universal modifiers
    if undispellable:
        level*=1.5
    if save_ends:
        level*=PART
    if requires_concentration:
        level*=HALF
    if discharged == 'depleted':
        level*=PART
    elif discharged == 'delayed':
        level*=0.5  # this is even more significant than HALF

    print "duration modifier:", level
    return level

def calculate_miscellaneous_component_multiplier(component_type, area, escapable,
        healthy_only, limit_affected_types, noncombat, saving_throw, touch_attack,
        bloodied_only):
    multiplier=1
    if limit_affected_types:
        multiplier *= {
                1: 0.9,
                2: 0.75,
                3: 0.6,
                }[limit_affected_types]
    if noncombat:
        multiplier *= PART
    if escapable:
        multiplier *= {
                '1': PART,
                '2': HALF,
                }[escapable]
    if healthy_only:
        multiplier *= HALF

    # some components for damage spells are represented as increased damage dice
    # rather than increased spell level
    if component_type != 'damage':
        if touch_attack:
            multiplier *= {
                    'ray': HALF,
                    'poor': PART,
                    '1': PART,
                    'average': 0.9,
                    '2': 0.9
                    }[touch_attack]
        if saving_throw:
            multiplier *= {
                    'none': 1,
                    'negates': HALF,
                    'half': PART,
                    'partial': PART,
                    }[saving_throw]
        # in general, conditions should be more expensive with area spells
        # but bloodied effects are less useful, since you're much less likely to
        # trigger them shortly after the spell is cast
        if area and area is not 'tiny' and not bloodied_only:
            multiplier *= 1.25

    return multiplier

def calculate_area_modifier(area=None, choose_targets=None, max_targets=None, 
        shapeable=None, components = None):
    if not area:
        return 0
    #area_choices = ['none', 'tiny', 'normal','large_line', 'mr', 'medium_radius','large_cone','large_radius']
    level = 0
    # these are the area weights for condition and damage spells
    if components is not None and (DAMAGE in components.keys() or CONDITION in components.keys()):
        level = {
                None: 0,
                'tiny': 1,
                'medium_wall': 1,
                'large_wall': 2,
                'medium_cone': 2,
                'normal': 2,
                'small_radius': 2,
                'huge_wall': 3,
                'large_line': 3,
                'medium_radius': 4,
                'large_cone': 5,
                'large_radius': 6,
                }[area]
        #level = switch(area, area_choices, [0,1,2,3,4,4,5,6])
    else:
        # these are the area weights for buff-only spells
        level = {
                None: 0,
                'tiny': 2,
                'medium_cone': 2,
                'normal': 2,
                'small_radius': 2,
                'large_line': 2.5,
                'medium_radius': 3,
                'large_cone': 3.5,
                'large_radius': 4,
                }[area]
        #level = switch(area, area_choices, [0,2,2,2.5,3,3,3.5,4])
    # adding max targets shouldn't affect small areas
    # but should have a strong effect on large areas
    if max_targets and level>=2:
        level = 2 + (level-2)*0.5
    #spells that are pure buffs don't have a penalty for choosing targets
    # choosing targets should have a stronger effect on larger areas
    if choose_targets and (components[DAMAGE] or components[CONDITION]):
        level *= 1.25
    if shapeable:
        level += 1
    return level

#accept string in the format "arg1=blah, arg2=herp derp, arg3=whee"
#return dict in the format {arg1: blah, arg2: herp derp, arg3: whee}
def parse_string_args_to_dict(text):
    resulting_args = dict()
    separate_args = [x.strip() for x in re.split('[, ]+', text)]
    for individual_arg in separate_args:
        split_args = [x.strip() for x in individual_arg.split('=')]
        #most args should be of the format "arg1=blah"
        #but some can exist on their own, and are simply boolean toggles
        try:
            (key, value) = split_args
            resulting_args[key] = value
        except ValueError:
            print split_args
            raise ValueError("every sub-argument needs two values!")
    return resulting_args

def merge_args(parsed_component_args, general_args):
    merged_args = general_args.copy()
    for arg in parsed_component_args.keys():
        if parsed_component_args[arg]:
            merged_args[arg] = parsed_component_args[arg]
    return merged_args

if __name__ == "__main__":
    parser = initialize_argument_parser()
    print 'sysargs', sys.argv[1:]
    #split the given args into two groups:
    # the component-specific elements
    # and the generally applicable elements
    component_args = {
            DAMAGE: list(),
            CONDITION: list(),
            BUFF: list(),
            }
    general_args = list()
    #the first argument is the name of this script, which we don't need
    for arg in sys.argv[1:]:
        print "arg:", arg
        if arg[:2] == '-d':
            component_args[DAMAGE].append(arg)
        elif arg[:2] == '-c':
            component_args[CONDITION].append(arg)
        elif arg[:2] == '-b':
            component_args[BUFF].append(arg)
        else:
            general_args.append(arg)

    general_args = vars(parser.parse_args(general_args))
    print 'general args', general_args

    if general_args['loadname']:
        name_pattern = re.compile(args['loadname'], re.IGNORECASE)
        storage = open(storage_file_name, 'r')
        #Find the spell in the storage file and print three lines
        #The lines are (name), (args), (level)
        lines_read=0
        read_line=False
        max_lines_read=3
        for line in storage:
            if read_line:
                print line,
                lines_read+=1
                if lines_read>=max_lines_read:
                    break
            elif name_pattern.match(line):
                print line,
                read_line=True
                lines_read+=1
        storage.close() 
    else:
        spell = Spell()
        for component_type in (DAMAGE, CONDITION, BUFF):
            for component in component_args[component_type]:
                derp = vars(parser.parse_args(component.split()))
                derp = merge_args(derp, general_args)
                print '\nparsed:', derp
                spell.components[component_type].append(SpellComponent(
                    component_type = component_type,
                    alternate_effect = derp['alternateeffect'],
                    area = derp['area'],
                    bloodied_only = derp['bloodied'], 
                    component_strength = derp[component_type],
                    discharged = derp['discharged'],
                    duration = derp['duration'],
                    escapable = derp['escapable'],
                    healthy_only = derp['healthy'],
                    limit_affected_types = derp['limittypes'],
                    noncombat = derp['noncombat'],
                    requires_concentration = derp['concentration'],
                    save_ends = derp['saveends'],
                    saving_throw = derp['save'],
                    touch_attack = derp['touchattack'],
                    undispellable = derp['undispellable'],
                    damage_type = derp['damagetype']))

        spell_level = spell.get_level(
                general_args['area'],
                general_args['choosetargets'],
                general_args['maxtargets'],
                general_args['shapeable'],
                general_args['bloodiedinstant'],
                general_args['duration'],
                general_args['nosr'],
                general_args['norepeat'],
                general_args['range'],
                general_args['trigger'],
                general_args['repeatable'])
        if general_args['savename']:            
            save_name = ''.join(general_args['savename'])
            print 'Spell level of', save_name+': ', spell_level
            storage = open(storage_file_name,'a')
            storage.seek(0)
            storage.write(save_name+'\n')
            storage.write(general_args.__str__()+'\n')
            storage.write('Spell Level: '+str(spell_level)+'\n\n')
            storage.close()
        else:
            print 'Spell level:', spell_level
