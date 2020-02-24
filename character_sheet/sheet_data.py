from cgi_simple import value_sum

ATTRIBUTES = 'Strength Dexterity Constitution Intelligence Perception Willpower'.split()
DEFENSES = 'Armor Fortitude Reflex Mental'.split()
ATTRIBUTE_SHORTHAND = {
    'strength': 'Str',
    'dexterity': 'Dex',
    'constitution': 'Con',
    'intelligence': 'Int',
    'perception': 'Per',
    'willpower': 'Wil',
}
ATTRIBUTE_SKILLS = {
    'strength': 'Climb Jump Swim'.split(),
    'dexterity': ['Acrobatics', 'Escape Artist', 'Ride', 'Sleight of Hand', 'Stealth'],
    'constitution': [],
    'intelligence': ['Craft _________', 'Deduction', 'Devices', 'Disguise', 'Heal', 'Knowledge ________', 'Knowledge _________', 'Linguistics'],
    'perception': ['Awareness', 'Creature Handling', 'Sense Motive', 'Spellcraft', 'Survival'],
    'willpower': [],
    'other': ['Bluff', 'Intimidate', 'Perform _________', 'Persuasion'],
}

ALL_SKILLS = ['Awareness', 'Balance', 'Bluff', 'Climb', 'Craft', 'Creature Handling',
              'Devices', 'Disguise', 'Escape Artist', 'Heal', 'Intimidate', 'Jump',
              'Knowledge', 'Linguistics', 'Perform', 'Persuasion',
              'Ride', 'Sense Motive', 'Sleight of Hand', 'Spellcraft', 'Sprint',
              'Stealth', 'Survival', 'Swim', 'Tumble']

ROLL20_CALC = {
    'armor_defense': value_sum([
        'armor_scaling',
        'body_armor_defense_value',
        'shield_defense_value',
        'armor_misc',
    ]),
    'base_speed': value_sum([
        'speed_size',
        'speed_armor',
        'speed_misc',
    ]),
    'insight_points': value_sum([
        'insight_points_base',
        'insight_points_intelligence',
        'insight_points_misc',
    ]),
    'recovery_ap': "(3 + floor((@{level}) / 7))",
    'reserve_ap': value_sum([
        'action_points_base',
        'action_points_willpower',
        'action_points_misc',
    ]),
    'strike_accuracy': value_sum([
        'strike_accuracy_scaling',
        'strike_accuracy_misc',
    ]),
}
