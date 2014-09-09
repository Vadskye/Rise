import argparse
import re
import util

PART=0.8
HALF=0.6
duration_choices = ['round','short','medium','long','extreme', 'permanent']
area_choices = ['none', 'tiny', 'normal','large_line', 'mr', 'medium_radius','large_cone','large_radius']
range_choices = ['personal', 'touch', 'close', 'medium', 'long', 'extreme']
condition_choices = [0,1,1.5,2,2.5,3,3.5]
touch_attack_choices =['none','poor','1','average','2', 'ray']
storage_file_name = 'spells.txt'
condition_debug=True
general_debug=True
damage_debug=False
buff_debug=False
DAMAGE = 'damage'
CONDITION = 'condition'
BUFF = 'buff'

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

class Spell:
    def init():
        self.components = {
                'damage': list(),
                'condition': list(),
                'buff': list(),
                }

    def get_level():
        level=-3
        for component_type in self.components.keys:
            for component in self.components[component_type]:
                level += component.level
        level += calculate_area_modifier()
        if no_spell_resistance:
            level += 1
        if trigger:
            if trigger == 'no_action':
                level +=1
            level *= 1.5
        if spell_range:
                #range_choices = ['personal', 'touch', 'close', 'medium', 'long', 'extreme']
            if self.components[DAMAGE] or self.components[CONDITION]:
                level += switch(spell_range, range_choices, (-2,-2,-1,0,1,2))
            else:
                level += switch(spell_range, range_choices, (0,0.5,1,1.5,2))
        return level

class SpellComponent:
    def init(component_type, alternate_effect=None, bloodied_only=None, check_bloodied_instantly=None, component_strength=None, undispellable=None, duration=None, requires_concentration=None, save_ends=None):
        self.level = calculate_base_level(alternate_effect, component_type, component_strength)
        if bloodied_only:
            self.level *=0.4
        self.level += calculate_duration_modifier(component_type, component_strength, duration, requires_concentration, undispellable, save_ends, check_bloodied_instantly)
        self.level *= calculate_miscellaneous_component_multiplier()

def calculate_base_level(alternate_effect, component_type, component_strength):
    level = {
            'damage': 4,
            'condition': rank_condition_tier(component_strength),
            'buff': component_strength,
            }[component_type]
    if alternate_effect:
        level+=1
    return level

#Return the level adjustment associated with the condition tier
def rank_condition_tier(condition_tier):
    return {
            '3': 4,
            '2': 8,
            '1.5': 12,
            '1': 16}[condition_tier]
    #return (4-condition_tier)*4

def calculate_duration_modifier(component_type, component_strength, duration, requires_concentration, undispellable, save_ends, check_bloodied_instantly):
    if duration is None:
        return 0
    #duration_choices = ['round','short','medium','long','extreme', 'permanent']
    if component_type=='damage':
        level = switch(duration, duration_choices, [0.5, 2, 3, 4, 5, 7])
    elif component_type=='condition' or component_type=='buff':
        level = switch(duration, duration_choices, [-3,0,1,2,3,5])

    #apply condition tier modifier
    if component_type=='condition':
        if component_strength==1.5:
            level+=3
            level*=1.5
        elif component_strength == 1:
            level+=3
            level*=2

    #now that the base level is established, apply universal modifiers
    if undispellable:
        level+=1
    if save_ends:
        level*=PART
    if requires_concentration:
        level*=HALF
    if check_bloodied_instantly:
        level*=PART
    return level

def calculate_miscellaneous_component_multiplier():
    multiplier=1
    if limit_affected_types:
        multiplier *= switch(limit_affected_types, [1,2,3], [0.9,0.75,0.6])
    if noncombat:
        multiplier *= PART
    if touch_attack:
        multiplier *= switch(touch_attack, ['ray', 'poor', '1', 'average', '2'],
                [HALF, PART, PART, 0.9, 0.9])
    if saving_throw:
        multiplier *= switch(saving_throw, ['negates', 'half', 'partial'],
                [HALF, PART, PART])
    if area and area is not 'tiny':
        multiplier *= 1.25
    if escapable:
        multiplier *= switch(escapable, ['1', '2'], [PART, HALF])
    if healthy_only:
        multiplier *= HALF
    return multiplier

def calculate_area_modifier():
    if not area:
        return 0
    #area_choices = ['none', 'tiny', 'normal','large_line', 'mr', 'medium_radius','large_cone','large_radius']
    area_level = 0
    if self.components[DAMAGE] or self.components[CONDITION]:
        area_level = switch(area, area_choices, [0,1,2,3,4,4,5,6])
    else:
        area_level = switch(area, area_choices, [0,2,2,2.5,3,3,3.5,4])
    #adding max targets shouldn't affect small areas.
    if max_targets and area_level>=2:
        area_level = max(area_level*HALF,2)
    #spells that are pure buffs don't have a penalty for choosing targets
    if choose_targets and (self.components[DAMAGE] or
            self.components[CONDITION]):
        area_level+=1
    level += area_level

def levels_from_fundamental_elements():
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

    return sum(level_increases.values())

def switch(data, choices, outputs):
    for i in xrange(len(choices)):
        if choices[i]==data:
            return outputs[i]
    raise Exception("Switch failed", data, choices, outputs)
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
    print 'args:', args
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
        spell = Spell()
        for component_type in (DAMAGE, CONDITION, BUFF):
            for component in args[component_type]:
                spell.components[component_type].add(SpellComponent(component_type,
                    args['alternateeffect'], args['bloodied'], args['bloodiedinstant'],
                    args['strength'], args['undispellable'], args['duration'],
                    args['concentration'], args['saveends']))

        spell_level = spell.get_level()
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
