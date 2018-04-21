from cgi_simple import value_sum

ATTRIBUTES = 'Strength Dexterity Constitution Intelligence Perception Willpower'.split()
DEFENSES = 'Armor Fortitude Reflex Mental'.split()
ATTRIBUTE_SKILLS = {
    'strength': 'Climb Jump Swim'.split(),
    'dexterity': ['Acrobatics', 'Escape Artist', 'Ride', 'Sleight of Hand', 'Stealth'],
    'constitution': [],
    'intelligence': ['Craft ______', 'Deduction', 'Devices', 'Disguise', 'Heal', 'Knowledge ______', 'Knowledge ______', 'Linguistics'],
    'perception': ['Awareness', 'Creature Handling', 'Sense Motive', 'Spellcraft', 'Survival'],
    'willpower': [],
}

ALL_SKILLS_BY_ATTRIBUTE = [
    *ATTRIBUTE_SKILLS['strength'],
    *ATTRIBUTE_SKILLS['dexterity'],
    *ATTRIBUTE_SKILLS['constitution'],
    *ATTRIBUTE_SKILLS['intelligence'],
    *ATTRIBUTE_SKILLS['perception'],
    *ATTRIBUTE_SKILLS['willpower'],
    *['Bluff', 'Intimidate', 'Perform ______', 'Persuasion'],
]


ALL_SKILLS = ['Awareness', 'Balance', 'Bluff', 'Climb', 'Craft', 'Creature Handling',
              'Devices', 'Disguise', 'Escape Artist', 'Heal', 'Intimidate', 'Jump',
              'Knowledge', 'Linguistics', 'Perform', 'Persuasion',
              'Ride', 'Sense Motive', 'Sleight of Hand', 'Spellcraft', 'Sprint',
              'Stealth', 'Survival', 'Swim', 'Tumble']

def attribute_roll20_text(attribute_name):
    return value_sum([
        attribute_name + '-base',
        attribute_name + '-level',
        attribute_name + '-misc',
    ])

def roll20_max_text(x, y):
    return 'ceil(floor(({0}-0.1+100)/({1}+100))/200)*({0}+100)  + ceil(floor(({1}+100)/({0}+100))/(200))*({1}+100)-100'.format(
        x,
        y,
    )

ROLL20_CALC = {
    'attribute': attribute_roll20_text,
    'base_attack_bonus': value_sum([
        'bab-good',
        'bab-avg',
        'bab-poor',
    ]),
    'fortitude': '+'.join([
        '10',
        roll20_max_text(
            '{0}+floor({1}/2)'.format(
                attribute_roll20_text('constitution'),
                attribute_roll20_text('strength'),
            ),
            '@{fort-base}',
        ),
        '@{fort-misc}',
    ]),
    'mental': '+'.join([
        '10',
        roll20_max_text(
            '{0}+floor({1}/2)'.format(
                attribute_roll20_text('willpower'),
                attribute_roll20_text('intelligence'),
            ),
            '@{ment-base}',
        ),
        '@{ment-misc}',
    ]),
    'reflex': '+'.join([
        '10',
        roll20_max_text(
            '{0}+floor({1}/2)'.format(
                attribute_roll20_text('dexterity'),
                attribute_roll20_text('perception'),
            ),
            '@{ref-base}',
        ),
        '@{ref-misc}',
    ]),
}

# these have dependencies and should be added second
ROLL20_CALC['armor'] = '+'.join([
    '10',
    roll20_max_text(
        ROLL20_CALC['base_attack_bonus'],
        roll20_max_text(
            ROLL20_CALC['attribute']('dexterity'),
            ROLL20_CALC['attribute']('constitution'),
        ),
    ),
    '@{armor-body}',
    '@{shield}',
    '@{armor-misc}',
]),
ROLL20_CALC['maneuver'] = '+'.join([
    '10',
    roll20_max_text(
        ROLL20_CALC['base_attack_bonus'],
        roll20_max_text(
            ROLL20_CALC['attribute']('strength'),
            ROLL20_CALC['attribute']('dexterity'),
        ),
    ),
    '@{shield}',
    '@{maneuver-misc}',
]),
ROLL20_CALC['hit_points'] = '(' + '+'.join([
    'floor((' + roll20_max_text(
        ROLL20_CALC['fortitude'],
        ROLL20_CALC['mental'],
    ) + ')/2)',
    'floor(' + ROLL20_CALC['attribute']('constitution') + '/2)',
]) + ') * @{level}',
