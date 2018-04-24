from cgi_simple import (
    div, equation, flex_col, flex_row, flex_wrapper, labeled_text_input, minus, number_input,
    plus, text_input, underlabel
)
from sheet_data import ATTRIBUTE_SKILLS, ATTRIBUTES, ROLL20_CALC

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
        div({'class': 'skill-label'}, 'Points'),
        div({'class': 'skill-label'}, 'Bonus'),
        div({'class': 'skill-label skill-attribute'}, attribute),
        div({'class': 'skill-label misc'}, 'Misc'),
    ])

def calc_skill(skill_name, blank_input=False):
    return flex_row({'class': 'skill-row'}, [
        div({'class': f'skill-name{" blank-input" if blank_input else ""}'}, skill_name),
        number_input({'class': 'skill-points'}),
        number_input({'class': 'skill-ranks'}),
        number_input({'class': 'skill-attr'}),
        number_input({
            'class': 'equation-misc',
            'name': skill_name + '-misc',
        }),
    ])

def calc_attributes():
    return flex_col({'class': 'calc-attributes'}, [
        flex_wrapper(div({'class': 'section-header attributes-header'}, 'Attributes')),
        ''.join([calc_attribute(attribute) for attribute in ATTRIBUTES]),
    ])

def calc_attribute(attribute_name):
    return ''.join([
        div({'class': 'calc-attribute-header'}, attribute_name),
        equation(
            [
                underlabel('Base*', number_input({
                    'name': f"{attribute_name}*",
                })),
                plus(),
                underlabel('Level', number_input({
                    'disabled': True,
                    'name': 'Level',
                    'value': '@{Level}',
                })),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': attribute_name + '-misc',
                }),
            ],
            result_attributes={
                'disabled': 'true',
                'name': attribute_name,
                'value': ROLL20_CALC['attribute'](attribute_name.lower()),
            },
        )
    ])

def level_chart():
    return flex_row([
        calc_attributes(),
        adventuring(),
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
                underlabel(
                    '1+Level',
                    number_input({'name': 'hp-level'}),
                    {'class': 'eq-level'},
                ),
                flex_col({'class': 'equation-text'}, 'times'),
                underlabel('5+Con*', number_input()),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'hp-misc',
                }),
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
            underlabel('Size', number_input()),
            minus(),
            underlabel('Armor', number_input()),
            plus(),
            number_input({'class': 'equation-misc'}),
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
                underlabel('Level', number_input()),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'standard-damage-misc',
                }),
            ],
        ),
    ])

def calc_strike_accuracy():
    return flex_row([
        div({'class': 'calc-header'}, 'Strike Accuracy'),
        equation(
            [
                underlabel('Lvl/Attr', number_input()),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'melee-misc',
                }),
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
                underlabel('Level/Str', number_input()),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'strike-damage-misc',
                }),
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
                underlabel('Level/Attr', number_input()),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'strike-damage-misc',
                }),
            ],
        ),
    ])

def calc_skill_points():
    return flex_row([
        div({'class': 'calc-header'}, 'Skill Points'),
        equation([
            underlabel('Class', number_input()),
            plus(),
            underlabel('Int', number_input()),
            plus(),
            number_input({
                'class': 'equation-misc',
                'name': 'skill-points-misc',
            })
        ]),
    ])

def calc_special_attack():
    return flex_row([
        flex_wrapper({'class': 'calc-header'}, [
            text_input({'class': 'calc-header'}),
        ]),
        equation(
            [
                underlabel('Level/Attr', number_input()),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'special-misc',
                })
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
                underlabel('Lvl/Dex', number_input()),
                plus(),
                underlabel('Armor', number_input({'name': 'armor-body'})),
                plus(),
                underlabel('Shield', number_input({'name': 'shield'})),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'armor-misc',
                })
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
                underlabel('Lvl/Str/Con', number_input()),
                plus(),
                underlabel('Con*', number_input()),
                plus(),
                underlabel('Class', number_input()),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'fort-misc',
                })
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
                underlabel('Lvl/Dex/Per', number_input()),
                plus(),
                underlabel('Dex*', number_input()),
                plus(),
                underlabel('Class', number_input()),
                plus(),
                underlabel('Shield', number_input({'name': 'shield'})),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'ref-misc',
                })
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
                underlabel('Lvl/Int/Wil', number_input()),
                plus(),
                underlabel('Wil*', number_input()),
                plus(),
                underlabel('Class', number_input()),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'ment-misc',
                })
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'mental',
                'value': ROLL20_CALC['mental'],
            },
        ),
    ])

def adventuring():
    return flex_col({'class': 'adventuring'}, [
        flex_col({'class': 'misc'}, [
            flex_wrapper(div({'class': 'section-header'}, 'Weight Limits')),
            flex_row({'class': 'weight-limits'}, [
                labeled_text_input('Unencumbered', 'weight-unencumbered'),
                labeled_text_input('Maximum', 'weight-maximum'),
            ]),
            flex_row({'class': 'weight-limits'}, [
                labeled_text_input('Overloaded', 'weight-overloaded'),
                labeled_text_input('Push/Drag', 'weight-push-drag'),
            ]),
        ]),
        standard_damage(),
    ])

def standard_damage():
    return flex_col({'class': 'standard-damage'}, [
        div({'class': 'section-header'}, 'Standard Damage'),
        flex_row({'class': 'damage-chart'}, [
            flex_col([
                div({'class': 'header'}, 'Power'),
                "".join([div(f"{i}-{i+1}") for i in range(0, 25, 2)])
            ]),
            flex_col([
                div({'class': 'header'}, 'Damage'),
                "".join([
                    div(standard_damage_at_power(i))
                    for i in range(0, 25, 2)
                ]),
            ])
        ])
    ])

def standard_damage_at_power(power):
    return {
        0: '1d8',
        2: '1d10',
        4: '2d6',
        6: '2d8',
        8: '2d10',
        10: '4d6',
        12: '4d8',
        14: '4d10',
        16: '5d10',
        18: '6d10',
        20: '7d10',
        22: '8d10',
        24: '9d10',
    }[power]
