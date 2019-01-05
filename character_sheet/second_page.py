from cgi_simple import (
    div, fieldset, equation, flex_col, flex_row, flex_wrapper, labeled_text_input, minus, number_input,
    plus, text_input, underlabel
)
from sheet_data import ATTRIBUTE_SKILLS, ATTRIBUTES, ROLL20_CALC

def create_page(destination):
    return flex_row({'class': 'second-page'}, [
        flex_col({'class': 'sidebar'}, [
            calc_skills(destination),
        ]),
        flex_col({'class': 'main-body'}, [
            flex_col({'class': 'statistics'}, [
                flex_wrapper(div({'class': 'section-header'}, 'Core Statistics')),
                calc_base_speed(),
                calc_encumbrance(),
                calc_hit_points(),
                calc_initiative() if destination == 'roll20' else "",
                calc_insight_points(),
                calc_reserve_ap(),
                calc_skill_points(),
                calc_strike_damage() if destination == 'roll20' else "",
                calc_threat(),
                flex_wrapper(div({'class': 'section-header'}, 'Defenses')),
                calc_defenses(),
            ]),
            level_chart(),
        ]),
    ])

def calc_skills(destination):
    # Does not work
    blank_skill_info = [
        calc_skill('__________'),
        calc_skill('__________'),
        calc_skill('__________'),
        calc_skill('__________'),
    ] if destination == 'paper' else [
        div({'class': 'other-skills-header'}, 'Other Skills'),
        fieldset({'class': 'repeating_blankskills'}, [
            calc_blank_skill(),
        ]),
    ]

    return flex_col({'class': 'calc-skills'}, [
        div({'class': 'section-header'}, 'Skills'),
        skill_labels('Str'),
        *[calc_skill(skill_name, 'strength') for skill_name in ATTRIBUTE_SKILLS['strength']],
        skill_labels('Dex'),
        *[calc_skill(skill_name, 'dexterity') for skill_name in ATTRIBUTE_SKILLS['dexterity']],
        # *[calc_skill(skill_name) for skill_name in ATTRIBUTE_SKILLS['constitution']],
        skill_labels('Int'),
        *[calc_skill(skill_name, 'intelligence') for skill_name in ATTRIBUTE_SKILLS['intelligence']],
        skill_labels('Per'),
        *[calc_skill(skill_name, 'perception') for skill_name in ATTRIBUTE_SKILLS['perception']],
        *[calc_skill(skill_name, 'constitution') for skill_name in ATTRIBUTE_SKILLS['willpower']],
        skill_labels('Other'),
        *[calc_skill(skill_name) for skill_name in ['Bluff', 'Intimidate', 'Perform ______', 'Persuasion']],
        *blank_skill_info
    ])

def skill_labels(attribute):
    return flex_row({'class': 'skill-labels'}, [
        div({'class': 'skill-name'}),
        div({'class': 'skill-label'}, 'Points'),
        div({'class': 'skill-label'}, 'Mod'),
        div({'class': 'skill-label skill-attribute'}, attribute),
        div({'class': 'skill-label misc'}, 'Misc'),
    ])

def calc_skill(skill_name, attribute=None):
    skill_parsable = skill_name.lower().replace(' ', '_')
    return flex_row({'class': 'skill-row'}, [
        div({'class': 'skill-name'}, skill_name),
        number_input({'class': 'skill-points', 'name': skill_parsable + '_points'}),
        number_input({
            'class': 'skill-ranks',
            'disabled': True,
            'name': skill_parsable + '_ranks_display',
            'value': '@{' + skill_parsable + '_ranks}',
        }),
        number_input({
            'class': 'skill-attr',
            'disabled': True,
            'name': skill_parsable + '_attribute_display',
            'value': '(@{' + skill_parsable + '_attribute})' if attribute else '0',
        }),
        number_input({
            'class': 'equation-misc',
            'name': skill_parsable + '_misc',
        }),
    ])


def calc_blank_skill():
    return flex_row({'class': 'skill-row'}, [
        text_input({'class': 'skill-name', 'name': 'blank_skill_name'}),
        number_input({'class': 'skill-points', 'name': 'blank_skill_points'}),
        number_input({'class': 'skill-ranks', 'name': 'blank_skill_ranks'}),
        number_input({'class': 'skill-attr', 'name': 'blank_skill_attribute'}),
        number_input({'class': 'equation-misc', 'name': 'blank_skill_misc'}),
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
                underlabel('(Base)', number_input({
                    'name': attribute_name + '_starting',
                })),
                plus(),
                underlabel('Lvl mod', number_input({
                    'disabled': True,
                    'name': attribute_name + '_scaling_display',
                    'value': '@{' + attribute_name + '_scaling}',
                })),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': attribute_name + '_misc',
                }),
            ],
            result_attributes={
                'disabled': 'true',
                'name': attribute_name + '_display',
                'value': '@{' + attribute_name + '}',
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
                underlabel('5+(Con)', number_input({
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
                'name': 'hit_points_display',
                'value': '(@{hit_points_total})',
            },
        ),
    ])

def calc_initiative():
    return flex_row([
        div({'class': 'calc-header'}, 'Initiative'),
        equation(
            [
                underlabel('Dex/Per', number_input({
                    'disabled': True,
                    'name': 'initiative_scaling_display',
                    'value': '@{initiative_scaling}',
                })),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'initiative_misc',
                }),
            ],
            result_attributes={
                'disabled': True,
                'name': 'initiative_display',
                'value': '@{initiative}',
            },
        ),
    ])

def calc_base_speed():
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
                'disabled': True,
                'name': 'base_speed_display',
                'value': '@{base_speed}',
            },
        )
    ])

def calc_strike_damage():
    return flex_row([
        div({'class': 'calc-header'}, 'Strike Dmg'),
        equation(
            [
                underlabel('Lvl/Str', text_input({
                    'name': 'strike_damage_scaling_display',
                })),
                plus(),
                text_input({
                    'class': 'equation-misc',
                    'name': 'strike_damage_misc',
                }),
            ],
            result_attributes={
                'name': 'strike_damage_display',
            },
            input_type=text_input,
        ),
    ])

def calc_threat():
    return flex_row([
        div({'class': 'calc-header'}, 'Threat'),
        equation(
            [
                underlabel('Lvl/Str', number_input({
                    'disabled': True,
                    'name': 'threat_scaling_display',
                    'value': '@{threat_scaling}',
                })),
                plus(),
                underlabel('1/2 Armor', number_input({
                    'disabled': True,
                    'name': 'threat_armor_display',
                    'value': '@{threat_armor}',
                })),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'threat_misc',
                }),
            ],
            result_attributes={
                'disabled': True,
                'name': 'threat_display',
                'value': '@{threat}',
            },
        ),
    ])

def calc_encumbrance():
    return flex_row([
        div({'class': 'calc-header'}, 'Encumbrance'),
        equation(
            [
                underlabel('Armor', number_input({'name': 'body_armor_encumbrance'})),
                minus(),
                underlabel('(Str)', number_input({
                    'disabled': True,
                    'name': 'encumbrance_strength',
                    'value': '(@{strength_starting})',
                })),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'encumbrance_misc',
                }),
            ],
            result_attributes={
                'disabled': True,
                'name': 'encumbrance_display',
                'value': '@{encumbrance}',
            },
        ),
    ])

def calc_defenses():
    return ''.join([
        calc_armor(),
        calc_fort(),
        calc_ref(),
        calc_mental(),
    ])

def calc_skill_points():
    return flex_row([
        div({'class': 'calc-header'}, 'Skill Points'),
        equation(
            [
                underlabel('Base', number_input({
                    'disabled': True, 'name': 'skill_points_base', 'value': 8,
                })),
                plus(),
                underlabel('2 * (Int)', number_input({
                    'disabled': True,
                    'name': 'skill_points_intelligence',
                    'value': '(@{intelligence_starting} * 2)',
                })),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'skill_points_misc',
                })
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'skill_points_display',
                'value': '(@{skill_points})',
            },
        ),
    ])

def calc_reserve_ap():
    return flex_row([
        div({'class': 'calc-header'}, 'Reserve AP'),
        equation(
            [
                underlabel('Base', number_input({
                    'disabled': True,
                    'name': 'action_points_base',
                    'value': 3,
                })),
                plus(),
                underlabel('(Wil)', number_input({
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
                'name': 'reserve_ap_display',
                'value': ROLL20_CALC['reserve_ap'],
            },
        ),
    ])

def calc_insight_points():
    return flex_row([
        div({'class': 'calc-header'}, 'Insight Points'),
        equation(
            [
                underlabel('Base', number_input({
                    'disabled': True,
                    'name': 'insight_points_base',
                    'value': 1,
                })),
                plus(),
                underlabel('(Int)', number_input({
                    'disabled': True,
                    'name': 'insight_points_intelligence',
                    'value': '(@{intelligence_starting})',
                })),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'insight_points_misc',
                })
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'insight_points',
                'value': ROLL20_CALC['insight_points'],
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
                    'name': 'armor_defense_scaling_display',
                    'value': '@{armor_defense_scaling}',
                })),
                plus(),
                underlabel('Armor', number_input({'name': 'body_armor_defense_value'})),
                plus(),
                underlabel('Shield', number_input({'name': 'shield_defense_value'})),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'armor_defense_misc',
                })
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'armor_defense_display',
                'value': '@{armor_defense}',
            },
        ),
    ])

def calc_fort():
    return flex_row([
        div({'class': 'calc-header'}, 'Fortitude'),
        equation(
            [
                underlabel('Lvl/Con', number_input({
                    'disabled': True,
                    'name': 'fortitude_scaling_display',
                    'value': '@{fortitude_scaling}',
                })),
                plus(),
                underlabel('(Con)', number_input({
                    'disabled': True,
                    'name': 'fortitude_starting_attribute',
                    'value': '(@{constitution_starting})',
                })),
                plus(),
                underlabel('Class', number_input({'name': 'fortitude_class', 'value': '4'})),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'fortitude_misc',
                })
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'fortitude_defense_display',
                'value': '@{fortitude}',
            },
        ),
    ])

def calc_ref():
    return flex_row([
        div({'class': 'calc-header'}, 'Reflex'),
        equation(
            [
                underlabel('Lvl/Dex', number_input({
                    'disabled': True,
                    'name': 'reflex_scaling_display',
                    'value': '@{reflex_scaling}',
                })),
                plus(),
                underlabel('(Dex)', number_input({
                    'disabled': True,
                    'name': 'reflex_starting_attribute',
                    'value': '(@{dexterity_starting})',
                })),
                plus(),
                underlabel('Class', number_input({'name': 'reflex_class', 'value': '4'})),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'reflex_misc',
                })
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'reflex_display',
                'value': '@{reflex}',
            },
        ),
    ])

def calc_mental():
    return flex_row([
        div({'class': 'calc-header'}, 'Mental'),
        equation(
            [
                underlabel('Lvl/Wil', number_input({
                    'disabled': True,
                    'name': 'mental_scaling_display',
                    'value': '@{mental_scaling}',
                })),
                plus(),
                underlabel('(Wil)', number_input({
                    'disabled': True,
                    'name': 'mental_starting_attribute',
                    'value': '(@{willpower_starting})',
                })),
                plus(),
                underlabel('Class', number_input({'name': 'mental_class', 'value': '4'})),
                plus(),
                number_input({
                    'class': 'equation-misc',
                    'name': 'mental_misc',
                })
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'mental_display',
                'value': '@{mental}',
            },
        ),
    ])

def adventuring():
    return flex_col({'class': 'adventuring'}, [
        flex_col({'class': 'carrying-capacity'}, [
            flex_wrapper(div({'class': 'section-header'}, 'Carrying Capacity')),
            flex_row([
                labeled_text_input('Light', input_attributes={'name': 'weight_light'}),
                labeled_text_input('Maximum', input_attributes={'name': 'weight_maximum'}),
            ]),
            flex_row([
                labeled_text_input('Overloaded', input_attributes={'name': 'weight_overloaded'}),
                labeled_text_input('Push/Drag', input_attributes={'name': 'weight_push_drag'}),
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
        0: '1d6',
        2: '1d8',
        4: '1d10',
        6: '2d6',
        8: '2d8',
        10: '2d10',
        12: '4d6',
        14: '4d8',
        16: '4d10',
        18: '5d10',
        20: '6d10',
        22: '7d10',
        24: '8d10',
    }[power]
