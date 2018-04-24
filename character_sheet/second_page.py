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
                calc_action_points(),
                calc_skill_points(),
                calc_hit_points(),
                calc_speed(),
                calc_attacks(),
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
        ''.join([calc_attribute(attribute.lower()) for attribute in ATTRIBUTES]),
    ])

def calc_attribute(attribute_name):
    return ''.join([
        div({'class': 'calc-attribute-header'}, attribute_name.capitalize()),
        equation(
            [
                underlabel('Base*', number_input({
                    'name': attribute_name + '_starting',
                })),
                plus(),
                underlabel('Level', number_input({
                    'disabled': True,
                    'name': attribute_name + '_scaling',
                    'value': ROLL20_CALC[attribute_name + '_scaling'],
                })),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': attribute_name + '_misc',
                }),
            ],
            result_attributes={
                'disabled': 'true',
                'name': attribute_name,
                'value': ROLL20_CALC[attribute_name],
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
                    number_input({
                        'disabled': True,
                        'name': 'hit_points_level',
                        'value': '(@{level} + 1)',
                    }),
                    {'class': 'eq-level'},
                ),
                flex_col({'class': 'equation-text'}, 'times'),
                underlabel('5+Con*', number_input({
                    'disabled': True,
                    'name': 'hit_points_constitution',
                    'value': '(@{constitution_starting} + 5)',
                })),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'hit_points_misc',
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
        calc_strike_damage(),
        calc_other_damage(),
    ])

def calc_speed():
    return flex_row([
        div({'class': 'calc-header'}, 'Base Speed'),
        equation(
            [
                underlabel('Size', number_input({'name': 'speed_size'})),
                minus(),
                underlabel('Armor', number_input({'name': 'speed_armor'})),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'speed_misc',
                }),
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'speed',
            },
        )
    ])

def calc_defenses():
    return ''.join([
        calc_armor(),
        calc_fort(),
        calc_ref(),
        calc_mental(),
    ])


def calc_strike_accuracy():
    return flex_row([
        div({'class': 'calc-header'}, 'Strike Accuracy'),
        equation(
            [
                # Not disabled because it's possible to override with Dex
                underlabel('Lvl/Attr', number_input({
                    'name': 'strike_accuracy_scaling',
                    'value': ROLL20_CALC['strike_accuracy_scaling'],
                })),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'strike_accuracy_misc',
                }),
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'strike_accuracy',
                'value': ROLL20_CALC['strike_accuracy'],
            },
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
            underlabel('Int*', number_input()),
            plus(),
            number_input({
                'class': 'equation-misc',
                'name': 'skill-points-misc',
            })
        ]),
    ])

def calc_action_points():
    return flex_row([
        div({'class': 'calc-header'}, 'Action Points'),
        equation(
            [
                underlabel('Base', number_input({
                    'disabled': True,
                    'name': 'action_points_base',
                    'value': 6,
                })),
                plus(),
                underlabel('Wil*', number_input({
                    'disabled': True,
                    'name': 'action_points_willpower',
                    'value': '(@{willpower_starting})',
                })),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'action_points_misc',
                })
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'action_points',
                'value': ROLL20_CALC['action_points'],
            },
        ),
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
                underlabel('Lvl/Dex', number_input({
                    'disabled': True,
                    'name': 'armor_scaling',
                    'value': ROLL20_CALC['armor_scaling'],
                })),
                plus(),
                underlabel('Armor', number_input({'name': 'body_armor_defense_value'})),
                plus(),
                underlabel('Shield', number_input({'name': 'shield_defense_value'})),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'armor_misc',
                })
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'armor_defense',
                'value': ROLL20_CALC['armor_defense'],
            },
        ),
    ])

def calc_fort():
    return flex_row([
        div({'class': 'calc-header'}, 'Fort'),
        equation(
            [
                underlabel('Lvl/Str/Con', number_input({
                    'disabled': True,
                    'name': 'fortitude_scaling',
                    'value': ROLL20_CALC['fortitude_scaling'],
                })),
                plus(),
                underlabel('Con*', number_input({
                    'disabled': True,
                    'name': 'fortitude_starting_attribute',
                    'value': '(@{constitution_starting})',
                })),
                plus(),
                underlabel('Class', number_input({'name': 'fortitude_class'})),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'fortitude_misc',
                })
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'fortitude',
                'value': ROLL20_CALC['fortitude_defense'],
            },
        ),
    ])

def calc_ref():
    return flex_row([
        div({'class': 'calc-header'}, 'Ref'),
        equation(
            [
                underlabel('Lvl/Dex/Per', number_input({
                    'disabled': True,
                    'name': 'reflex_scaling',
                    'value': ROLL20_CALC['reflex_scaling'],
                })),
                plus(),
                underlabel('Dex*', number_input({
                    'disabled': True,
                    'name': 'reflex_starting_attribute',
                    'value': '(@{dexterity_starting})',
                })),
                plus(),
                underlabel('Class', number_input({'name': 'reflex_class'})),
                plus(),
                underlabel('Shield', number_input({
                    'disabled': True,
                    'name': 'shield',
                    'value': '@{shield_defense_value}',
                })),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'reflex_misc',
                })
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'reflex_defense',
                'value': ROLL20_CALC['reflex_defense'],
            },
        ),
    ])

def calc_mental():
    return flex_row([
        div({'class': 'calc-header'}, 'Ment'),
        equation(
            [
                underlabel('Lvl/Int/Wil', number_input({
                    'disabled': True,
                    'name': 'mental_scaling',
                    'value': ROLL20_CALC['mental_scaling'],
                })),
                plus(),
                underlabel('Wil*', number_input({
                    'disabled': True,
                    'name': 'mental_starting_attribute',
                    'value': '(@{willpower_starting})',
                })),
                plus(),
                underlabel('Class', number_input({'name': 'mental_class'})),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'mental_misc',
                })
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'mental_defense',
                'value': ROLL20_CALC['mental_defense'],
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
