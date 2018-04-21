from cgi_simple import (
    div, equation, flex_col, flex_row, flex_wrapper, minus, number_input,
    plus, text_input, this_or_that, underlabeled_number_input, unlabeled_number_input
)

from sheet_data import ATTRIBUTE_SKILLS, ATTRIBUTES, ROLL20_CALC, roll20_max_text

def create_page():
    return flex_row({'class': 'second-page'}, [
        flex_col({'class': 'sidebar'}, [
            calc_skills(),
        ]),
        flex_col({'class': 'main-body'}, [
            flex_col({'class': 'statistics'}, [
                flex_wrapper(div({'class': 'section-header'}, 'Core Statistics')),
                calc_speed(),
                calc_attacks(),
                calc_hit_points(),
                calc_skill_points(),
                flex_wrapper(div({'class': 'section-header'}, 'Defenses')),
                calc_defenses(),
            ]),
            level_chart(),
        ]),
    ])

def calc_skills():
    return flex_col({'class': 'calc-skills'}, [
        div({'class': 'section-header'}, 'Skills'),
        skill_labels('Str'),
        *[calc_skill(skill_name) for skill_name in ATTRIBUTE_SKILLS['strength']],
        skill_labels('Dex'),
        *[calc_skill(skill_name) for skill_name in ATTRIBUTE_SKILLS['dexterity']],
        # *[calc_skill(skill_name) for skill_name in ATTRIBUTE_SKILLS['constitution']],
        skill_labels('Int'),
        *[calc_skill(skill_name) for skill_name in ATTRIBUTE_SKILLS['intelligence']],
        skill_labels('Per'),
        *[calc_skill(skill_name) for skill_name in ATTRIBUTE_SKILLS['perception']],
        *[calc_skill(skill_name) for skill_name in ATTRIBUTE_SKILLS['willpower']],
        skill_labels('Other'),
        *[calc_skill(skill_name) for skill_name in ['Bluff', 'Intimidate', 'Perform ______', 'Persuasion']],
        calc_skill('____________', blank_input=True),
        calc_skill('____________', blank_input=True),
        calc_skill('____________', blank_input=True),
        calc_skill('____________', blank_input=True),
    ])

def skill_labels(attribute):
    return flex_row({'class': 'skill-labels'}, [
        div({'class': 'skill-name'}),
        div({'class': 'skill-label'}, 'Train'),
        div({'class': 'skill-label'}, 'Bonus'),
        div({'class': 'skill-label skill-attribute'}, attribute),
        div({'class': 'skill-label'}, 'Misc'),
    ])

def calc_skill(skill_name, blank_input=False):
    return flex_row({'class': 'skill-row'}, [
        div({'class': f'skill-name{" blank-input" if blank_input else ""}'}, skill_name),
        number_input({'class': 'skill-training'}),
        number_input({'class': 'skill-ranks'}),
        number_input({'class': 'skill-attr'}),
        number_input({'class': 'skill-misc'}),
    ])

def calc_attributes():
    return flex_col({'class': 'calc-attributes'}, [
        flex_wrapper(div({'class': 'section-header attributes-header'}, 'Attributes')),
        ''.join([calc_attribute(attribute) for attribute in ATTRIBUTES]),
    ])

def calc_attribute(attribute_name):
    calc_name = attribute_name.lower()
    return ''.join([
        div({'class': 'calc-attribute-header'}, attribute_name),
        equation(
            [
                underlabeled_number_input(
                    'Base*',
                    calc_name + '-base',
                    attributes={'class': 'eq-base'},
                    # input_attributes = {'value': '0'},
                ),
                plus(),
                underlabeled_number_input(
                    'Level',
                    calc_name + '-level',
                    attributes={'class': 'eq-level'},
                    # input_attributes = {'value': '0'},
                ),
                plus(),
                unlabeled_number_input(
                    calc_name + '-misc',
                    {'class': 'equation-misc'},
                ),
            ],
            result_attributes={
                'disabled': 'true',
                'name': calc_name.lower(),
                'value': ROLL20_CALC['attribute'](calc_name),
            },
        )
    ])

def level_chart():
    return flex_row([
        calc_attributes(),
    ])

def abilities(name_prefix):
    return flex_col({'class': 'abilities'}, [
        flex_wrapper(div({'class': 'ability-header chart-header'}, 'Feats and Abilities')),
        ''.join([text_input({
            'class': 'level' + str(level),
            'name': 'ability-name-' + name_prefix + '-' + str(level)
        }) for level in range(1, 14)]),
    ])

def calc_hit_points():
    return flex_row([
        div({'class': 'calc-header'}, 'Hit Points'),
        equation(
            [
                underlabeled_number_input('1+Level', 'hp-level', {'class': 'eq-level'}),
                flex_col({'class': 'equation-text'}, 'times'),
                underlabeled_number_input('5+Con*'),
                plus(),
                unlabeled_number_input('hp-misc', {'class': 'equation-misc'}),
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'hit-points',
                'value': ROLL20_CALC['hit_points'],
            },
        ),
    ])

def calc_attacks():
    return ''.join([
        calc_strike_accuracy(),
        # calc_special_attack(),
        calc_standard_damage(),
        calc_strike_damage(),
        calc_other_damage(),
    ])

def calc_speed():
    return flex_row([
        div({'class': 'calc-header'}, 'Base Speed'),
        equation([
            underlabeled_number_input('Size'),
            minus(),
            underlabeled_number_input('Armor'),
            plus(),
            unlabeled_number_input(attributes={'class': 'equation-misc'}),
        ])
    ])

def calc_defenses():
    return ''.join([
        calc_armor(),
        calc_fort(),
        calc_ref(),
        calc_mental(),
    ])

def calc_standard_damage():
    return flex_row([
        div({'class': 'calc-header'}, 'Standard Dmg'),
        equation(
            [
                text_input({
                    'class': 'fake-number',
                    'disabled': 'true',
                    'value': '1d8'
                }),
                flex_col({'class': 'equation-text'}, '+1d per two'),
                underlabeled_number_input('Level'),
                plus(),
                unlabeled_number_input('standard-damage-misc', {'class': 'equation-misc'}),
            ],
        ),
    ])

def calc_strike_accuracy():
    return flex_row([
        div({'class': 'calc-header'}, 'Strike Accuracy'),
        equation(
            [
                underlabeled_number_input('Lvl/Attr'),
                plus(),
                unlabeled_number_input('melee-misc', {'class': 'equation-misc'}),
            ],
        ),
    ])

def calc_strike_damage():
    return flex_row([
        div({'class': 'calc-header'}, 'Strike Dmg'),
        equation(
            [
                text_input({
                    'class': 'fake-number',
                    'disabled': 'true',
                    'value': '1d8'
                }),
                flex_col({'class': 'equation-text'}, '+1d per two'),
                underlabeled_number_input('Level/Str'),
                plus(),
                unlabeled_number_input('strike-damage-misc', {'class': 'equation-misc'}),
            ],
        ),
    ])

def calc_other_damage():
    return flex_row([
        div({'class': 'calc-header blank-input'}, '____________'),
        equation(
            [
                text_input({
                    'class': 'fake-number',
                    'disabled': 'true',
                    'value': '1d8'
                }),
                flex_col({'class': 'equation-text'}, '+1d per two'),
                underlabeled_number_input('Level/Attr'),
                plus(),
                unlabeled_number_input('strike-damage-misc', {'class': 'equation-misc'}),
            ],
        ),
    ])

def calc_skill_points():
    return flex_row([
        div({'class': 'calc-header'}, 'Skill Points'),
        equation([
            underlabeled_number_input('Class'),
            plus(),
            underlabeled_number_input('Int'),
            plus(),
            unlabeled_number_input('skill-points-misc', {'class': 'equation-misc'}),
        ]),
    ])

def calc_special_attack():
    return flex_row([
        flex_wrapper({'class': 'calc-header'}, [
            text_input({'class': 'calc-header'}),
        ]),
        equation(
            [
                underlabeled_number_input('Level/Attr'),
                plus(),
                unlabeled_number_input('special-misc', {'class': 'equation-misc'}),
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'special-attack',
            },
        ),
    ])

def base_10():
    return number_input({
        'disabled': 'true',
        'value': '10'
    })

def calc_armor():
    return flex_row([
        div({'class': 'calc-header'}, 'Armor'),
        equation(
            [
                this_or_that([
                    underlabeled_number_input(
                        'Level',
                    ),
                    underlabeled_number_input('Dex'),
                ]),
                plus(),
                underlabeled_number_input('Armor', 'armor-body'),
                plus(),
                underlabeled_number_input('Shield', 'shield'),
                plus(),
                unlabeled_number_input('armor-misc', {'class': 'equation-misc'}),
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'armor',
                'value': ROLL20_CALC['armor'],
            },
        ),
    ])

def calc_fort():
    return flex_row([
        div({'class': 'calc-header'}, 'Fort'),
        equation(
            [
                this_or_that([
                    underlabeled_number_input('Level', 'fort-level'),
                    underlabeled_number_input('Str/Con'),
                ]),
                plus(),
                underlabeled_number_input('Con*'),
                plus(),
                underlabeled_number_input('Class'),
                plus(),
                unlabeled_number_input('fort-misc', {'class': 'equation-misc'}),
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'fortitude',
                'value': ROLL20_CALC['fortitude'],
            },
        ),
    ])

def calc_ref():
    return flex_row([
        div({'class': 'calc-header'}, 'Ref'),
        equation(
            [
                this_or_that([
                    underlabeled_number_input('Level', 'ref-level'),
                    underlabeled_number_input('Dex/Per'),
                ]),
                plus(),
                underlabeled_number_input('Dex*'),
                plus(),
                underlabeled_number_input('Class'),
                plus(),
                underlabeled_number_input('Shield', 'shield'),
                plus(),
                unlabeled_number_input('ref-misc', {'class': 'equation-misc'}),
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'reflex',
                'value': ROLL20_CALC['reflex'],
            },
        ),
    ])

def calc_mental():
    return flex_row([
        div({'class': 'calc-header'}, 'Ment'),
        equation(
            [
                this_or_that([
                    underlabeled_number_input('Level', 'ment-level'),
                    underlabeled_number_input('Int/Wil'),
                ]),
                plus(),
                underlabeled_number_input('Wil*'),
                plus(),
                underlabeled_number_input('Class'),
                plus(),
                unlabeled_number_input('ment-misc', {'class': 'equation-misc'}),
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'mental',
                'value': ROLL20_CALC['mental'],
            },
        ),
    ])
