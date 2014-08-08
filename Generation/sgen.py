import argparse
import shlex
import re
import util

PART=0.8
HALF=0.6
duration_choices = ['round','short','medium','long','extreme', 'permanent']
area_choices = ['none', 'tiny', 'normal','large_line', 'mr', 'medium_radius','large_cone','large_radius']
range_choices = ['personal', 'touch', 'close', 'medium', 'far', 'extreme']
condition_choices = [0,1,1.5,2,2.5,3,3.5]
touch_attack_choices =['none','poor','1','average','2', 'ray']
storage_file_name = 'spells.txt'
condition_debug=True
general_debug=True
damage_debug=False
buff_debug=False

fundamental_spell_element_names = ('damage', 'condition', 'buff')

default_args = {'choose_targets': False, 'duration': 'short', 'max_targets': 0, 'touch_attack': 'none', 'concentration': False, 'load_name': '', 'bloodied': False, 'area': 'none', 'noncombat': False, 'alternate': False, 'damage': False, 'instantaneous': False, 'trigger': 'none', 'save': 'none', 'save_name': '', 'buff': 0, 'save_ends': False, 'casting_time': 'standard', 'limit_types': 0, 'dispellable': True, 'escapable': 0, 'condition': 0, 'healthy': False, 'sr': True, 'range': 'medium', 'dot': False}

#Return the arguments
def initialize_argument_parser():
    parser = argparse.ArgumentParser(description='Spell information')
    parser.add_argument('-d', '--damage', dest = 'damage', type=str,
            help='Damage level')
    parser.add_argument('-c', '--condition', dest='condition', type=str,
            help='Condition tier', nargs='*')
    parser.add_argument('-b', '--buff', dest = 'buff', type=str,
            help='Buff level', nargs='*')
    parser.add_argument('-t', '--tier', dest='tier', type=str,
            help='Tier of the strength of the effect', choices=condition_choices)
    parser.add_argument('--bloodied', dest='bloodied', type=util.bool_parser,
            help='Condition only affects healthy creatures?')
    parser.add_argument('--healthy', dest='healthy', type=util.bool_parser,
            help='Condition only affects healthy creatures?')
    parser.add_argument('--alternate', dest = 'alternate', type=util.bool_parser,
            )
    parser.add_argument('-u', '--duration', dest = 'duration', type=str,
            default='short', choices=duration_choices)
    parser.add_argument('--dispellable', dest = 'dispellable',
            help='Subject to dispelling?', type=util.bool_parser, default=True)
    parser.add_argument('--concentration', dest = 'concentration', 
            type=util.bool_parser, help='Requires concentration?')
    parser.add_argument('--save_ends', dest='save_ends', 
            type=util.bool_parser, help='Save each round to end?')
    parser.add_argument('--instantaneous', dest='instantaneous',
            help='Bloodied is checked only when spell is cast?',
            type=util.bool_parser) 
    parser.add_argument('-a', '--area', dest='area', type=str,
            choices=area_choices)
    parser.add_argument('--choose_targets', dest='choose_targets',
            type=util.bool_parser, help='Choose targets of area spell?')
    parser.add_argument('-m', '--max_targets', dest='max_targets', type=util.bool_parser,
            help='Max target limit')
    parser.add_argument('-s', '--save', dest='save', type=str,
            help='Saving throw type', 
            choices=['none','half','partial','negates'])
    parser.add_argument('--sr', dest='sr', type=util.bool_parser,
            help='Spell resistance allowed?', default=True)
    parser.add_argument('-l', '--limit_types', dest='limit_types', type=str,
            help='Limit affected types?', choices=['0','1','2','3'])
    parser.add_argument('--escapable', dest='escapable', type=str,
            help='Is the spell escapable?', choices=['0','1','2'])
    parser.add_argument('--noncombat', dest='noncombat', 
            type=util.bool_parser, help='Irrelevant in combat?')
    parser.add_argument('--touch_attack', dest='touch_attack',
            type=str, help='Touch attack and bab',
            choices = touch_attack_choices)
    parser.add_argument('--trigger', dest='trigger', type=str,
            help='Triggered by specific event?',
            choices=['false','immediate','no_action'])
    parser.add_argument('--casting_time', dest='casting_time', type=str,
            default='standard', choices=['standard', 'full', 'swift'])
    parser.add_argument('-r', '--range', dest='range', type=str,
            default='medium', choices=range_choices)
    parser.add_argument('--save_name', dest='save_name', type=str)
    parser.add_argument('--load_name', dest='load_name', type=str)
    parser.add_argument('--dot', dest='dot', type=util.bool_parser,
            help='damage over time?')
    return parser
    #return vars(parser.parse_args())

def calculate_spell_level(args):

    #split_args = util.generate_split_args(args)
    combined_condition_strength_levels = 0
    #we need to keep track of all fundamental elements present in a spell
    present_fundamental_elements = set()
    buff_count=0
    #track the level increases from each spell element
    level_increases = {
            'damage': 0,
            'condition': 0,
            'buff': 0,
    }
    for spell_element_name in fundamental_spell_element_names:
        if args[spell_element_name] is None:
            continue
        for spell_element in args[spell_element_name]:
            #if there is at least one spell element, add it to the list of
            #present fundamental elements
            present_fundamental_elements.add(spell_element_name)
            #each spell component starts as a copy of the general aspects of the spell
            spell_element_complete_args = args
            #each spell component also has different args unique to the element
            spell_element_unique_args = parse_string_args_to_dict(
                    spell_element)
            #the two must be combined, with the unique args replacing the base args
            for key in spell_element_unique_args:
                spell_element_complete_args[key] = spell_element_unique_args[key]
            level_increases[spell_element_name] = calculate_fundamental_spell_element_level(
                    spell_element_name, spell_element_complete_args)

    #we have now gathered the levels for all fundamental elements of the spell

    #if there are multiple unique aspects, the net increases from all
    #elements except the most powerful element cost less
    if len(present_fundamental_elements)>1:
        max_level_increase = max(level_increases.values())
        for key in level_increases:
            if level_increases[key] < max_level_increase:
                level_increases[key]*=PART
            level_increases[key] = max(1, level_increases[key])

    combined_condition_strength_levels = sum(level_increases.values())

    #Use different calculations if it is a buff-only spell
    if 'damage' in present_fundamental_elements or 'condition' in present_fundamental_elements:
        area_level = convert_area(args['area'])
        #adding max targets shouldn't affect small areas.
        if args['max_targets'] and area_level>=2:
            area_level= max (area_level*HALF,2)
        if args['choose_targets']: area_level+=1
    else:
        area_level = convert_area_buff(args['area'])
        #adding max targets shouldn't affect small areas.
        if args['max_targets'] and area_level>=2:
            area_level= max (area_level*HALF,2)
        #all buffs are assumed to choose targets - not added separately 
    if general_debug: print 'area_level', area_level

    total_level = combined_condition_strength_levels+area_level
    if not args['sr']: total_level+=1
    if not args['trigger']=='none':
        if args['trigger']=='no_action': total_level+=1
        if args['trigger']: total_level*=1.5
    if 'buff' in present_fundamental_elements:
        total_level+= convert_range_buff(args['range'])
    else:
        total_level += convert_range(args['range'])
    if general_debug: print 'total_level', total_level

    return total_level-3

def calculate_fundamental_spell_element_level(spell_element_name,
        spell_element_args):
    return {
            'damage': calculate_damage,
            'condition': calculate_condition,
            'buff': calculate_buff,
            }[spell_element_name](spell_element_args)

def calculate_damage(args):
    if damage_debug: print 'Calculating damage aspect' 
    effect_level = 4

    if args['dot']:
        duration_level = convert_duration_damage(
            args['duration'])
        if args['concentration']: duration_level*=HALF
        strength_level = effect_level + duration_level
    else:
        strength_level = effect_level

    if args['limit_types']: 
        strength_level = calculate_limit_types(args['limit_types'], strength_level)

    return strength_level
    
def calculate_buff(args):
    if buff_debug: print 'Calculating buff aspect'
    effect_level = args['buff']
    if args['alternate']: effect_level+=1

    #may not want to use same duration conversions as condition spells
    duration_level = convert_duration(args['duration'])
    if args['concentration']: duration_level*=HALF
    if buff_debug: print 'duration_level', duration_level
    
    strength_level = effect_level + duration_level
    if args['limit_types']: 
        strength_level = calculate_limit_types(args['limit_types'], strength_level)
    if args['noncombat']: strength_level*=PART
    if args['instantaneous']: strength_level*=PART
    if not (args['area']=='none' or args['area']=='tiny'):
        strength_level*=1.25
    if buff_debug: print 'strength_level', strength_level

    return strength_level

def calculate_condition(args):
    if condition_debug: print 'Calculating condition aspect'
    effect_level = convert_condition_tier(args['tier'])
    
    if args['alternate']: effect_level+=1
    if args['bloodied']:
        effect_level*=0.4
    if condition_debug: print 'effect_level', effect_level

    duration_level = convert_duration(args['duration'])
    if not args['dispellable']: duration_level+=1
    if args['condition']<2: duration_level+=3
    if args['condition']==1: duration_level*=2
    elif args['condition']==1.5: duration_level*=1.5
    if args['concentration']: duration_level*=HALF
    if args['save_ends']: duration_level*=PART
    if args['bloodied'] and args['instantaneous']: duration_level*=PART
    if condition_debug: print 'duration_level', duration_level

    strength_level = effect_level + duration_level 
    if args['limit_types']: 
        strength_level = calculate_limit_types(args['limit_types'], strength_level)
    if args['noncombat']: strength_level*=PART
    #touch attack
    if args['touch_attack']=='poor' or args['touch_attack']=='1':
        strength_level*=PART
    elif args['touch_attack']=='average' or args['touch_attack']=='2':
        strength_level*=0.9
    elif args['touch_attack']=='ray':
        #If you miss with a ray, you can't try again
        strength_level*=HALF
    #saving throw
    if not args['save']=='none':
        save = args['save']
        if save=='half' or save=='partial':
            strength_level*=PART
        elif save=='negates':
            strength_level*=HALF
    #area
    if not (args['area']==None or args['area']=='tiny'):
        #damage spells decrease in damage when they become AOE
        #condition spells also need similar mitigation in addition to area cost.
        strength_level*=1.25
    if args['escapable']=='1':
        strength_level*=PART
    elif args['escapable']=='2':
        strength_level*=HALF
    if args['healthy']: strength_level*=HALF
    if condition_debug: print 'raw strength_level', strength_level

    return strength_level

def calculate_limit_types(limit_types, strength_level):
    multiplier = {
            '1': 0.9,
            '2': 0.75,
            '3': 0.6,
            }[limit_types]
    return strength_level*multiplier

#Return the level adjustment associated with the condition tier
def convert_condition_tier(condition_tier):
    return {
            '3': 4,
            '2': 8,
            '1.5': 12,
            '1': 16}[condition_tier]
    #return (4-condition_tier)*4

def convert_duration(duration):
    if duration is None:
        return 0
    #duration_choices = ['round','short','medium','long','extreme', 'permanent']
    return switch(duration, duration_choices, [-3, 0, 1, 2, 3, 5])

#convert duration for damage spells
def convert_duration_damage(duration):
    return switch(duration, duration_choices, [0.5,2, 3, 4, 5, 7])

def convert_area(area):
    if area is None:
        return 0
    #area_choices = ['none', 'tiny', 'normal','large_line', 'mr', 'medium_radius','large_cone','large_radius']
    return switch(area, area_choices, [0,1,2,3,4,4,5,6])

def convert_area_buff(area):
    if area is None:
        return 0
    return switch(area, area_choices, [0,2,2,2.5,3,3,3.5,4])

def convert_range(spell_range):
    if spell_range is None:
        return 0
    #range_choices = ['personal', 'touch', 'close', 'medium', 'far', 'extreme']
    return switch(spell_range, range_choices, [-2,-2,-1,0,1,2])

#def convert_range_aoe(spell_range):
    #range_choices = ['personal', 'touch', 'close', 'medium', 'far', 'extreme']
    #return switch(spell_range, range_choices, [0,0,1,2,3,4])

def convert_range_buff(spell_range):
    if spell_range is None:
        return 0
    #range_choices = ['personal', 'touch', 'close', 'medium', 'far', 'extreme']
    return switch(spell_range, range_choices, [0,0.5,1,1.5,2])

def switch(data, choices, outputs):
    for i in xrange(len(choices)):
        if choices[i]==data:
            return outputs[i]
    raise Exception("Switch failed", choices, outputs)
    return False

def find_unique_args(args):
    unique=dict()
    for key in args.keys():
        if not args[key]==default_args[key]:
            unique[key]=args[key]
    return unique

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

if __name__ == "__main__":
    parser = initialize_argument_parser()
    args = vars(parser.parse_args())
    if args['load_name']:
        name_pattern = re.compile(args['load_name'], re.IGNORECASE)
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
        spell_level = calculate_spell_level(args)
        if args['save_name']:            
            save_name = ' '.join(args['save_name'])
            print 'Spell level of', save_name+': ', spell_level
            storage = open(storage_file_name,'a')
            storage.seek(0)
            storage.write(save_name+'\n')
            storage.write(find_unique_args(args).__str__()+'\n')
            storage.write('Spell Level: '+str(spell_level)+'\n\n')
            storage.close()
        else:
            print 'Spell level:', spell_level
