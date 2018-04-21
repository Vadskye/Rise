from cgi_simple import (
    div, equation, flex_col, flex_row, flex_wrapper, minus, number_input,
    plus, text_input, this_or_that, underlabeled_number_input,
)

def misc_spacer():
    return div({'class': 'misc-spacer'}, '')

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
                    attributes={'class': 'eq-level eq-optional'},
                    # input_attributes = {'value': '0'},
                ),
                misc_spacer(),
                plus(),
                underlabeled_number_input(
                    'Misc',
                    calc_name + '-misc',
                    {'class': 'eq-optional'},
                    # input_attributes = {'value': '0'}
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
        flex_col({'class': 'level-chart'}, [
            div({'class': 'section-header'}, 'Alignment and Deity'),
            div(text_input()),
            div({'class': 'section-header'}, 'Goals and Flaws'),
            div(text_input()),
            div(text_input()),
            div({'class': 'section-header'}, 'Background'),
            "".join([div(text_input()) for i in range(1, 7)]),
            div({'class': 'section-header'}, 'Other Calculations'),
            "".join([div(text_input()) for i in range(1, 4)]),
        ])
    ])

def level_row(level):
    return flex_row({'class': 'level-chart-row'}, [
        flex_wrapper({'class': 'ability-level-row'}, [
            text_input({'name': 'ability-level' + str(level)})
        ]),
        flex_wrapper({'class': 'ability-name-row'}, [
            text_input({'name': 'ability-name' + str(level)})
        ]),
    ])

def level_chart_column(title, html_name, contents):
    return flex_col({'class': html_name}, [
        flex_wrapper(div({'class': html_name + '-header chart-header'}, title)),
        contents
    ])

def attribute_bonuses():
    return flex_col({'class': 'attribute-bonuses'}, [
        flex_wrapper(div({'class': 'attribute-bonus-header chart-header'}, 'Attributes')),
        ''.join([text_input({'class': 'level' + str(level)}) for level in range(1, 21)]),
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
                underlabeled_number_input('Level', 'hp-level', {'class': 'eq-level'}),
                flex_col({'class': 'equation-text'}, 'times the total of'),
                number_input({
                    'disabled': 'true',
                    'value': '5'
                }),
                plus(),
                underlabeled_number_input('Con*'),
                misc_spacer(),
                plus(),
                underlabeled_number_input('Misc', 'hp-misc', {'class': 'eq-optional'}),
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
            underlabeled_number_input('Misc', attributes={'class': 'eq-optional'}),
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
                misc_spacer(),
                plus(),
                underlabeled_number_input('Misc', 'standard-damage-misc', {'class': 'eq-optional'}),
            ],
        ),
    ])

def calc_strike_accuracy():
    return flex_row([
        div({'class': 'calc-header'}, 'Strike Accuracy'),
        equation(
            [
                underlabeled_number_input('Lvl/Attr'),
                misc_spacer(),
                plus(),
                underlabeled_number_input('Misc', 'melee-misc', {'class': 'eq-optional'}),
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
                misc_spacer(),
                plus(),
                underlabeled_number_input('Misc', 'strike-damage-misc', {'class': 'eq-optional'}),
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
                misc_spacer(),
                plus(),
                underlabeled_number_input('Misc', 'strike-damage-misc', {'class': 'eq-optional'}),
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
            misc_spacer(),
            plus(),
            underlabeled_number_input('Misc', 'skill-points-misc', {'class': 'eq-optional'}),
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
                misc_spacer(),
                plus(),
                underlabeled_number_input('Misc', 'special-misc', {'class': 'eq-optional'}),
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
                    underlabeled_number_input('Dex/Con'),
                ]),
                plus(),
                underlabeled_number_input('Armor', 'armor-body'),
                plus(),
                underlabeled_number_input('Shield', 'shield'),
                misc_spacer(),
                plus(),
                underlabeled_number_input('Misc', 'armor-misc', {'class': 'eq-optional'}),
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
                underlabeled_number_input('Race'),
                plus(),
                underlabeled_number_input('Class'),
                misc_spacer(),
                plus(),
                underlabeled_number_input('Misc', 'fort-misc', {'class': 'eq-optional'}),
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
                underlabeled_number_input('Race'),
                plus(),
                underlabeled_number_input('Class'),
                plus(),
                underlabeled_number_input('Shield', 'shield'),
                misc_spacer(),
                plus(),
                underlabeled_number_input('Misc', 'ref-misc', {'class': 'eq-optional'}),
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
                underlabeled_number_input('Race'),
                plus(),
                underlabeled_number_input('Class'),
                misc_spacer(),
                plus(),
                underlabeled_number_input('Misc', 'ment-misc', {'class': 'eq-optional'}),
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'mental',
                'value': ROLL20_CALC['mental'],
            },
        ),
    ])
