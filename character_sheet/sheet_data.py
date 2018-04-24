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

def at(text):
    return '@{' + text + '}'

def attribute_roll20_text(attribute_name):
    return value_sum([
        attribute_name.lower() + '_starting',
        # 0 if attribute_starting is 0, level / 2 if attribute_starting is 1,
        attribute_name.lower() + '_level',
        # f"{{starting_formula} * {at('level')}
        attribute_name.lower() + '_misc',
    ])

def roll20_max_text(x, y):
    return 'ceil(floor(({0}-0.1+100)/({1}+100))/200)*({0}+100)  + ceil(floor(({1}+100)/({0}+100))/(200))*({1}+100)-100'.format(
        x,
        y,
    )

def roll20_min_text(x, y):
    return '-1 * (' + roll20_max_text(f"(-1 * {x})", f"(-1 * {y})") + ')'

ROLL20_CALC = {
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
for attribute in ATTRIBUTES:
    ROLL20_CALC[attribute.lower()] = attribute_roll20_text(attribute.lower())
    starting_formula = at(attribute.lower() + '_starting')
    ROLL20_CALC[attribute.lower() + '_level'] = f"""({roll20_min_text(f"({starting_formula} * ({at('level')} / 2))", at('level'))} - ({roll20_min_text(starting_formula, 1)}))"""


# these have dependencies and should be added second
ROLL20_CALC['armor'] = '+'.join([
    '10',
    roll20_max_text(
        ROLL20_CALC['base_attack_bonus'],
        roll20_max_text(
            ROLL20_CALC['dexterity'],
            ROLL20_CALC['constitution'],
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
            ROLL20_CALC['strength'],
            ROLL20_CALC['dexterity'],
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
    'floor(' + ROLL20_CALC['constitution'] + '/2)',
]) + ') * @{level}',
