from copy import copy
from rise.statistics.sample_creatures import get_sample_creatures

def parse_creature(creature_text, sample_info=None):
    sample_info = sample_info or get_sample_creatures()
    tokens = creature_text.split(' ')
    name = tokens[0]
    creature = copy(sample_info['characters'].get(name) or sample_info['monsters'].get(name))
    for modifier_name in tokens[1:]:
        sample_info['modifiers'][modifier_name](creature)
    return creature

def parse_level_group(levels):
    if levels == 'all':
        return [str(n) for n in range(1, 21)]
    elif levels == 'odd':
        return [str(n) for n in range(1, 21, 2)]
    elif levels == 'even':
        return [str(n) for n in range(2, 21, 2)]
    elif levels == 'std':
        return [str(n) for n in range(2, 21, 5)]
    elif levels == 'threes':
        return [str(n) for n in range(2, 21, 3)]
    elif levels == 'low':
        return [str(n) for n in range(2, 12, 3)]
    else:
        return map(str, sorted(map(int, levels.split(' '))))

def parse_leveled_creature_groups(blue_descriptions, red_descriptions, levels=None):
    """Parse leveled pairs of creature groups

    Args:
        blue_descriptions (str[]):
        red_descriptions (str[]):
        levels (str):

    Yields:
        type: Explanation
    """
    sample_info = get_sample_creatures()

    creature_groups = []

    if levels:
        for level in parse_level_group(levels):
            blue_leveled = [d + f" l{level}" for d in blue_descriptions]
            red_leveled = [d + f" l{level}" for d in red_descriptions]
            creature_groups.append({
                'blue': [parse_creature(d, sample_info) for d in blue_leveled],
                'red': [parse_creature(d, sample_info) for d in red_leveled],
            })
    else:
        creature_groups.append({
            'blue': [parse_creature(d, sample_info) for d in blue_descriptions],
            'red': [parse_creature(d, sample_info) for d in blue_descriptions],
        })
    return creature_groups
