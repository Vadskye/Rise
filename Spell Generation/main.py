import argparse
import re

PART=0.8
HALF=0.6
duration_choices = ['round','short','medium','long','extreme', 'permanent']
area_choices = ['none', 'tiny', 'normal','large_line', 'medium_radius','large_cone','large_radius']
range_choices = ['personal', 'touch', 'close', 'medium', 'far', 'extreme']
condition_choices = [0,1,1.5,2,2.5,3,3.5]
touch_attack_choices =['none','poor','1','average','2', 'ray']
storage_file_name = 'spells.txt'
condition_debug=False
general_debug=True
damage_debug=False
buff_debug=True

default_args = {'energy': False, 'choose_targets': False, 'duration': 'short', 'max_targets': 0, 'touch_attack': 'none', 'concentration': False, 'load_name': '', 'bloodied': False, 'area': 'none', 'noncombat': False, 'alternate': False, 'damage': False, 'instantaneous': False, 'trigger': 'none', 'save': 'none', 'save_name': '', 'buff': 0, 'save_ends': False, 'casting_time': 'standard', 'limit_types': 0, 'dispellable': True, 'escapable': 0, 'condition': 0, 'healthy': False, 'sr': True, 'range': 'medium', 'dot': False}

def bool_parser(value):
    if value=='0' or value=='False' or value=='false' or value=='none':
        return False
    return True

#Return the arguments
def initialize_argument_parser():
    parser = argparse.ArgumentParser(description='Spell information')
    parser.add_argument('--damage', dest = 'damage', type=bool_parser,
            help='Damage level', nargs='*', default=0)
    parser.add_argument('--condition', nargs='*', dest='condition', type=float,
            help='Condition tier', default=0, choices=condition_choices)
    parser.add_argument('--buff', nargs='*', dest = 'buff', type=int,
            help='Buff level', default=0)
    parser.add_argument('--bloodied', dest = 'bloodied', type=bool_parser,
            nargs='*', default=False)
    parser.add_argument('--alternate', dest = 'alternate', type=bool_parser,
            nargs='*', default=False)
    parser.add_argument('--duration', dest = 'duration', type=str,
            default='short', nargs='*',
            choices=duration_choices)
    parser.add_argument('--dispellable', dest = 'dispellable',
            help='Subject to dispelling?', nargs='*', default=True)
    parser.add_argument('--concentration', dest = 'concentration', 
            type=bool_parser, help='Requires concentration?',
            nargs='*', default=False)
    parser.add_argument('--save_ends', dest='save_ends', 
            type=bool_parser, help='Save each round to end?',
            nargs='*', default=False)
    parser.add_argument('--instantaneous', dest='instantaneous',
            help='Bloodied is checked only when spell is cast?',
            type=bool_parser, nargs='*', default=False) 
    parser.add_argument('--area', dest='area', type=str,
            default='none', choices=area_choices)
    parser.add_argument('--choose_targets', dest='choose_targets',
            type=bool_parser, default=False,
            help='Choose targets of area (not buff) spell?')
    parser.add_argument('--max_targets', dest='max_targets', type=bool_parser,
            help='Max target limit', default=False)
    parser.add_argument('--save', dest='save', type=str,
            help='Saving throw type', nargs='*', default='none',
            choices=['none','half','partial','negates'])
    parser.add_argument('--sr', dest='sr', type=bool_parser,
            help='Spell resistance allowed?', default=True)
    parser.add_argument('--limit_types', dest='limit_types', type=int,
            help='Limit affected types?', default=0, nargs='*', choices=[0,1,2,3])
    parser.add_argument('--escapable', dest='escapable', type=int,
            help='Is the spell escapable?', default=0, choices=[0,1,2])
    parser.add_argument('--energy', dest='energy', type=bool_parser,
            help='Deals energy damage?', default=False)
    parser.add_argument('--noncombat', dest='noncombat', 
            type=bool_parser, help='Irrelevant in combat?',
            nargs='*', default=False)
    parser.add_argument('--touch_attack', dest='touch_attack',
            type=str, help='Touch attack and bab',
            nargs='*', default='none',
            choices = touch_attack_choices)
    parser.add_argument('--healthy', dest='healthy', type=bool_parser,
            help='Only affects healthy creatures?', nargs='*', default=False)
    parser.add_argument('--trigger', dest='trigger', type=str,
            help='Triggered by specific event?', default='none',
            choices=['false','immediate','no_action'])
    parser.add_argument('--casting_time', dest='casting_time', type=str,
            default='standard', choices=['standard', 'full', 'swift'])
    parser.add_argument('--range', dest='range', type=str,
            default='medium', choices=range_choices)
    parser.add_argument('--save_name', dest='save_name', type=str, 
            nargs='*', default='')
    parser.add_argument('--load_name', dest='load_name', type=str, 
            nargs='*', default='')
    parser.add_argument('--dot', dest='dot', type=bool_parser,
            help='damage over time?', nargs='*', default=False)
    return vars(parser.parse_args())

def calculate_spell_level(args):
    """
    Need compatability to use different attributes for different aspects
    of the spell. 
    Solution: Copy args such that we have one args per separate condition
    (or other aspect)
    For arguments that only have one value, simply copy them across all aspects
    For arguments that have multiple values, assign one value per aspect
    Thus, the args after this splitting will always have one value per argument
    """

    split_args = generate_split_args(args)
    combined_condition_strength_levels = 0
    all_aspects = set()
    buff_count=0
    for args in split_args:
        if general_debug: print find_unique_args(args)
        if args['damage']:
            added_level = calculate_damage(args)
            all_aspects.add('damage')
        if args['condition']:
            added_level = calculate_condition(args)
            all_aspects.add('condition')
        if args['buff']:
            added_level = calculate_buff(args)
            if buff_count>1:
                added_level*=PART
            buff_count+=1
            all_aspects.add('buff')

        #if there are multiple unique aspects
        if len(all_aspects)>1:
            added_level*=PART

        combined_condition_strength_levels += added_level
        if general_debug:
            print 'current combined:', combined_condition_strength_levels

    area_level = convert_area(args['area'])
    if args['choose_targets']: area_level+=1
    if args['max_targets']: area_level*=PART
    if general_debug: print 'area_level', area_level

    total_level = combined_condition_strength_levels+area_level
    if not args['sr']: total_level+=1
    if not args['trigger']=='none':
        if args['trigger']=='no_action': total_level+=1
        if args['trigger']: total_level*=1.5
    if args['buff']:
        total_level+= convert_range_buff(args['range'])
    elif args['area']!='none':
        total_level+=convert_range_aoe(args['range'])
    else:
        total_level += convert_range(args['range'])
    if general_debug: print 'total_level', total_level

    return total_level-3

def generate_split_args(args):
    #Count the number of significant aspects
    aspect_count=0
    if args['damage']: aspect_count+=1
    if args['condition']: aspect_count+=len([x for x in args['condition'] if x!=0])
    if args['buff']: aspect_count+=len([x for x in args['buff'] if x!=0])
    new_args_list = list()
    keys = args.keys()
    for i in xrange(aspect_count):
        new_args = dict()
        for key in keys:
            if is_list(args[key]):
                if len(args[key])>1:
                    new_args[key]=args[key][i]
                else:
                    new_args[key]=args[key][0]
            else:
                new_args[key]=args[key]
        new_args_list.append(new_args)
    return new_args_list

def is_list(value):
    return type(value)==type(list())

def calculate_damage(args):
    if damage_debug: print 'Calculating damage aspect' 
    effect_level = 5
    if args['energy']: effect_level-=1

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
    effect_level = convert_condition_tier(args['condition'])
    
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
    if args['save_ends']: duration_level*=HALF
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
    if not (args['area']=='none' or args['area']=='tiny'):
        strength_level*=1.25
    if args['escapable']==1:
        strength_level*=PART
    elif args['escapable']==2:
        strength_level*=HALF
    if args['healthy']: strength_level*=HALF
    if condition_debug: print 'raw strength_level', strength_level

    return strength_level

def calculate_limit_types(limit_types, strength_level):
    if limit_types==1:
        strength_level*=0.9
    elif limit_types==2: 
        strength_level*=0.75
    elif limit_types==3:
        strength_level*=0.6
    return strength_level


#Return the level adjustment associated with the condition tier
def convert_condition_tier(condition_tier):
    return (4-condition_tier)*4

def convert_duration(duration):
    if not duration:
        return 0
    #duration_choices = ['round','short','medium','long','extreme', 'permanent']
    return switch(duration, duration_choices, [-3, 0, 1, 2, 3, 5])

#convert duration for damage spells
def convert_duration_damage(duration):
    return switch(duration, duration_choices, [0.5,2, 3, 4, 5, 7])

def convert_area(area):
    print 'derp'
    #area_choices = ['none', 'tiny', 'normal','large_line', 'medium_radius','large_cone','large_radius']
    return switch(area, area_choices, [0,0,0,1,2,3,4])

def convert_range(spell_range):
    #range_choices = ['personal', 'touch', 'close', 'medium', 'far', 'extreme']
    return switch(spell_range, range_choices, [-2,-2,-1,0,1,2])

def convert_range_aoe(spell_range):
    #range_choices = ['personal', 'touch', 'close', 'medium', 'far', 'extreme']
    return switch(spell_range, range_choices, [0,0,1,2,3,4])

def convert_range_buff(spell_range):
    #range_choices = ['personal', 'touch', 'close', 'medium', 'far', 'extreme']
    return switch(spell_range, range_choices, [0,0.5,1,1.5,2])

def switch(data, choices, outputs):
    for i in xrange(len(choices)):
        if choices[i]==data:
            return outputs[i]
    print 'Error: switch failed'
    return False

def find_unique_args(args):
    unique=dict()
    for key in args.keys():
        if not args[key]==default_args[key]:
            unique[key]=args[key]
    return unique
    
if __name__ == "__main__":
    args = initialize_argument_parser()
    if args['load_name']:
        load_name = ' '.join(args['load_name'])
        name_pattern = re.compile(load_name)
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
