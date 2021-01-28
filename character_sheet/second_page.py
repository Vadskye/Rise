from cgi_simple import (
    div, fieldset, equation, flex_col, flex_row, flex_wrapper, labeled_text_input, minus, number_input,
    plus, span, text_input, underlabel, checkbox
)
from sheet_data import ATTRIBUTE_SHORTHAND, ATTRIBUTE_SKILLS, ATTRIBUTES, ROLL20_CALC
from sheet_worker import standard_damage_at_power

equation_space = flex_col({'class': 'equation-glue'}, div({'class': 'equation-math'}, ' '))

def equation_misc(name, i=0):
    return flex_col([
        number_input({
            'class': 'equation-misc',
            'name': f"{name}_misc_{i}",
        }),
        text_input({
            'class': 'invisible-text-input',
            'name': f"{name}_misc_label_{i}",
        }),
    ])

def equation_misc_repeat(name, count=1, joiner=plus):
    return joiner().join([
        equation_misc(name, i)
        for i in range(count)
    ])

def create_page(destination):
    return flex_row({'class': 'page second-page'}, [
        flex_col({'class': 'sidebar'}, [
            level_chart(),
            flex_wrapper(div({'class': 'section-header abilities-known-header'}, 'Abilities Known')),
            calc_maneuvers(),
            calc_spells(),
            calc_spheres(),
            *[calc_blank_ability(i) for i in range(1)],
            calc_skills(destination),
        ]),
        flex_col({'class': 'main-body'}, [
            flex_col({'class': 'statistics'}, [
                flex_wrapper(div({'class': 'section-header'}, 'Core Statistics')),
                calc_accuracy(),
                calc_base_speed(),
                calc_carrying_capacity(),
                calc_encumbrance(),
                calc_focus_penalty(),
                calc_initiative(),
                calc_magical_power(),
                calc_mundane_power(),
                calc_unknown_statistic(),
                flex_wrapper(div({'class': 'section-header'}, 'Resources')),
                calc_attunement_points(),
                calc_fatigue_tolerance(),
                calc_hit_points(),
                calc_insight_points(),
                calc_skill_points(),
                flex_wrapper(div({'class': 'section-header'}, 'Resistances')),
                calc_physical_resistance_bonus(),
                calc_energy_resistance_bonus(),
                flex_wrapper(div({'class': 'section-header'}, 'Defenses')),
                calc_defenses(),
            ]),
            flex_wrapper(div({'class': 'section-header skill-modifiers'}, 'Skill Modifiers')),
            flex_row({'class': 'skill-modifier-reminder'}, [
                flex_col([
                    div({'class': 'skill-modifier-reminder-header'}, 'Training Level'),
                    div('Untrained'),
                    div('Trained'),
                    div('Mastered'),
                ]),
                flex_col([
                    div({'class': 'skill-modifier-reminder-header'}, 'Modifier'),
                    div('Base attribute'),
                    div('1 + half level + base attribute'),
                    div('3 + level + base attribute'),
                ]),
            ])
        ]),
    ])

def calc_skills(destination):
    if destination == 'roll20':
        return flex_col({'class': 'calc-skills'}, [
            div({'class': 'section-header'}, 'Skills'),
            skill_labels(),
            *[calc_skill(skill_name, 'strength') for skill_name in ATTRIBUTE_SKILLS['strength']],
            skill_labels(),
            *[calc_skill(skill_name, 'dexterity') for skill_name in ATTRIBUTE_SKILLS['dexterity']],
            *[calc_skill(skill_name, 'constitution') for skill_name in ATTRIBUTE_SKILLS['constitution']],
            skill_labels(),
            *[calc_skill(skill_name, 'intelligence') for skill_name in ATTRIBUTE_SKILLS['intelligence']],
            skill_labels(),
            *[calc_skill(skill_name, 'perception') for skill_name in ATTRIBUTE_SKILLS['perception']],
            *[calc_skill(skill_name, 'constitution') for skill_name in ATTRIBUTE_SKILLS['willpower']],
            skill_labels(),
            *[calc_skill(skill_name) for skill_name in ['Deception', 'Intimidate', 'Perform _________', 'Persuasion']],
            flex_row({'class': 'skill-row'}, [
                div({'class': 'skill-name'}, 'Points spent'),
                number_input({
                    'class': 'skill-points-spent',
                    'disabled': True,
                    'name': 'skill_points_spent_display',
                    'value': '@{skill_points_spent}',
                }),
            ]),
        ])
    else:
        blank_skill_info = [
            calc_skill('')
            for i in range(16)
        ]

        return flex_col({'class': 'calc-skills'}, [
            div({'class': 'section-header'}, 'Skills'),
            skill_labels(),
            *blank_skill_info
        ])

def skill_labels():
    return flex_row({'class': 'skill-labels'}, [
        div({'class': 'skill-label skill-label-points'}, 'Points'),
        div({'class': 'skill-label skill-label-training'}, 'T/M'),
        div({'class': 'skill-label skill-label-class'}, 'Class?'),
        div({'class': 'skill-label skill-label-misc'}, 'Misc'),
    ])

def calc_skill(skill_name, attribute=None, blank_input=False):
    visible_skill_name = 'Knowledge' if 'Knowledge' in skill_name else skill_name
    skill_parsable = skill_name.lower().replace(' ', '_')
    return flex_row({'class': 'skill-row'}, [
        div(
            {'class': f'skill-name{" blank-input" if blank_input else ""}'},
            [
                visible_skill_name,
                text_input({
                    'class': 'knowledge-type',
                    'name': f'{skill_parsable}_type',
                }) if 'Knowledge' in skill_name else '',
            ],
        ),
        number_input({'class': 'skill-points', 'name': skill_parsable + '_points'}),
        flex_wrapper(
            text_input({
                'class': 'skill-training',
                'disabled': True,
                'name': f'${skill_parsable}_training_display',
                'value': '@{' + skill_parsable + '_training}',
            }),
        ),
        flex_wrapper(
            checkbox({
                'class': 'is-class-skill',
                'name': skill_parsable + '_class_skill',
            }),
        ),
        equation_misc_repeat(skill_parsable, 3, lambda: ''),
    ])

def calc_attributes():
    return flex_col({'class': 'calc-attributes'}, [
        flex_wrapper(div({'class': 'section-header attributes-header'}, 'Attributes')),
        ''.join([calc_attribute(attribute.lower()) for attribute in ATTRIBUTES]),
    ])

def calc_attribute(attribute_name):
    return ''.join([
        equation(
            [
                underlabel('(Base)', number_input({
                    'name': attribute_name + '_starting',
                })),
                plus(),
                underlabel('Lvl mod', number_input({
                    'disabled': True,
                    'name': attribute_name + '_scaling_display',
                    'value': '(@{' + attribute_name + '_scaling})',
                })),
                plus(),
                equation_misc(attribute_name),
            ],
            result_attributes={
                'disabled': 'true',
                'name': attribute_name + '_display',
                'value': '(@{' + attribute_name + '})',
            },
            result_label=ATTRIBUTE_SHORTHAND[attribute_name],
            underlabel_attributes={'class': 'attribute-name'},
        )
    ])

def level_chart():
    return flex_row([
        standard_damage(),
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

def calc_carrying_capacity():
    return flex_row({'class': 'carrying-capacity'}, [
        div({'class': 'calc-header'}, 'Carrying Capacity'),
        underlabel(
            'Light',
            number_input({
                'name': 'carrying_capacity_light_display',
            }),
        ),
        equation_space,
        underlabel(
            'Max',
            number_input({
                'name': 'carrying_capacity_max_display',
            }),
        ),
        equation_space,
        underlabel(
            'Over',
            number_input({
                'name': 'carrying_capacity_over_display',
            }),
        ),
        equation_space,
        underlabel(
            'Push',
            number_input({
                'name': 'carrying_capacity_push_display',
            }),
        ),
    ])

def calc_accuracy():
    return flex_row([
        div({'class': 'calc-header'}, 'Accuracy'),
        equation(
            [
                underlabel('Lvl', number_input({
                    'disabled': True,
                    'name': 'accuracy_scaling_display',
                    'value': '@{level}',
                })),
                plus(),
                underlabel('1/2 (Per)', number_input({
                    'disabled': True,
                    'name': 'accuracy_perception_display',
                    'value': '(@{perception_starting} / 2)',
                })),
                plus(),
                equation_misc_repeat('accuracy', 2),
            ],
            result_attributes={
                'disabled': True,
                'name': 'accuracy_display',
                'value': '@{accuracy}',
            },
        ),
    ])

def calc_physical_resistance_bonus():
    return flex_row({'class': 'resistance-row'}, [
        div({'class': 'calc-header'}, 'Physical'),
        equation(
            [
                underlabel(
                    'Con',
                    number_input({
                        'disabled': True,
                        'name': 'physical_resistance_constitution',
                        'value': '(@{constitution})',
                    }),
                ),
                plus(),
                underlabel(
                    'Armor',
                    number_input({
                        'name': 'physical_resistance_bonus_armor',
                    }),
                ),
                plus(),
                underlabel(
                    'Base',
                    number_input({
                        'disabled': True,
                        'name': 'physical_resistance_from_level_display',
                        'value': '(@{physical_resistance_from_level})',
                    }),
                ),
                plus(),
                equation_misc_repeat('physical_resistance_bonus', 3)
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'physical_resistance_bonus_display',
                'value': '(@{physical_resistance_maximum})',
            },
            result_label='Bonus'
        ),
    ])

def calc_attunement_points():
    return flex_row([
        div({'class': 'calc-header'}, 'Attune Points'),
        equation(
            [
                underlabel('Base', number_input({
                    'disabled': True,
                    'name': 'attunement_points_from_level_display',
                    'value': '(@{attunement_points_from_level})',
                })),
                plus(),
                equation_misc_repeat('attunement_points', 2),
            ],
            result_attributes={
                'disabled': True,
                'name': 'attunement_points_display',
                'value': '@{attunement_points_maximum}',
            },
        ),
    ])

def calc_energy_resistance_bonus():
    return flex_row({'class': 'resistance-row'}, [
        div({'class': 'calc-header'}, 'Energy'),
        equation(
            [
                underlabel(
                    'Wil',
                    number_input({
                        'disabled': True,
                        'name': 'energy_resistance_willpower',
                        'value': '(@{willpower})',
                    }),
                ),
                plus(),
                underlabel(
                    'Armor',
                    number_input({
                        'name': 'energy_resistance_bonus_armor',
                    }),
                ),
                plus(),
                underlabel(
                    'Base',
                    number_input({
                        'disabled': True,
                        'name': 'energy_resistance_from_level_display',
                        'value': '(@{energy_resistance_from_level})',
                    }),
                ),
                plus(),
                equation_misc_repeat('energy_resistance_bonus', 3)
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'energy_resistance_bonus_display',
                'value': '(@{energy_resistance_maximum})',
            },
            result_label='Bonus'
        ),
    ])

def calc_fatigue_tolerance():
    return flex_row([
        div({'class': 'calc-header'}, 'Fatigue Tolerance'),
        equation(
            [
                underlabel('Base', number_input({
                    'disabled': True,
                    'name': 'fatigue_tolerance_base',
                    'value': '2',
                })),
                plus(),
                underlabel('(Con)', number_input({
                    'disabled': True,
                    'name': 'fatigue_tolerance_con',
                    'value': '(@{constitution_starting})',
                })),
                plus(),
                underlabel('(Wil)', number_input({
                    'disabled': True,
                    'name': 'fatigue_tolerance_wil',
                    'value': '(@{willpower_starting})',
                })),
                plus(),
                equation_misc_repeat('fatigue_tolerance', 2),
            ],
            result_attributes={
                'disabled': True,
                'name': 'fatigue_tolerance_display',
                'value': '@{fatigue_tolerance}',
            },
        ),
    ])

def calc_focus_penalty():
    return flex_row([
        div({'class': 'calc-header'}, 'Focus Penalty'),
        equation(
            [
                underlabel('Base', number_input({
                    'disabled': True,
                    'name': 'focus_penalty_base',
                    'value': '4',
                })),
                minus(),
                equation_misc_repeat('focus_penalty', 3, minus),
            ],
            result_attributes={
                'disabled': True,
                'name': 'focus_penalty_display',
                'value': '@{focus_penalty}',
            },
        ),
    ])

def calc_hit_points():
    return flex_row([
        div({'class': 'calc-header'}, 'Hit Points'),
        equation(
            [
                underlabel('Base', number_input({
                    'disabled': True,
                    'name': 'hit_points_base',
                    'value': '(@{hit_points_from_level})',
                })),
                plus(),
                underlabel('Con', number_input({
                    'disabled': True,
                    'name': 'hit_points_from_constitution',
                    'value': '(@{constitution})',
                })),
                plus(),
                equation_misc_repeat('hit_points', 3),
            ],
            result_attributes={
                'disabled': True,
                'name': 'hit_points_display',
                'value': '@{hit_points_maximum}',
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
                equation_misc_repeat('initiative', 3),
            ],
            result_attributes={
                'disabled': True,
                'name': 'initiative_display',
                'value': '@{initiative}',
            },
        ),
    ])

def calc_magical_power():
    return flex_row([
        div({'class': 'calc-header'}, 'Magical Power'),
        equation(
            [
                underlabel('1/2 Wil', number_input({
                    'disabled': True,
                    'name': 'magical_power_willpower_display',
                    'value': '@{willpower_power_scaling}',
                })),
                plus(),
                equation_misc_repeat('magical_power', 3),
            ],
            result_attributes={
                'disabled': True,
                'name': 'magical_power_display',
                'value': '@{magical_power}',
            },
        ),
    ])

def calc_mundane_power():
    return flex_row([
        div({'class': 'calc-header'}, 'Mundane Power'),
        equation(
            [
                underlabel('1/2 Str', number_input({
                    'disabled': True,
                    'name': 'mundane_power_strength_display',
                    'value': '@{strength_power_scaling}',
                })),
                plus(),
                equation_misc_repeat('mundane_power', 3),
            ],
            result_attributes={
                'disabled': True,
                'name': 'mundane_power_display',
                'value': '@{mundane_power}',
            },
        ),
    ])

def calc_unknown_statistic():
    return flex_row([
        div({'class': 'calc-header'}, text_input({'name': 'unknown_statistic_name'})),
        equation(
            [
                equation_misc_repeat('unknown_statistic', 4),
            ],
            result_attributes={
                'disabled': True,
                'name': f'unknown_statistic_display',
                'value': '(@{unknown_statistic})',
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
                equation_misc_repeat('speed', 2)
            ],
            result_attributes={
                'disabled': True,
                'name': 'base_speed_display',
                'value': '@{base_speed}',
            },
        )
    ])

# def calc_strike_damage():
#     return flex_row([
#         div({'class': 'calc-header'}, 'Strike Dmg'),
#         equation(
#             [
#                 underlabel('Lvl/Str', text_input({
#                     'name': 'strike_damage_scaling_display',
#                 })),
#                 plus(),
#                 text_input({
#                     'class': 'equation-misc',
#                     'name': 'strike_damage_misc',
#                 }),
#             ],
#             result_attributes={
#                 'name': 'strike_damage_display',
#             },
#             input_type=text_input,
#         ),
#     ])

# def calc_threat():
#     return flex_row([
#         div({'class': 'calc-header'}, 'Threat'),
#         equation(
#             [
#                 underlabel('Lvl/Str', number_input({
#                     'disabled': True,
#                     'name': 'threat_scaling_display',
#                     'value': '@{threat_scaling}',
#                 })),
#                 plus(),
#                 underlabel('1/2 Armor', number_input({
#                     'disabled': True,
#                     'name': 'threat_armor_display',
#                     'value': '@{threat_armor}',
#                 })),
#                 equation_misc('threat')
#             ],
#             result_attributes={
#                 'disabled': True,
#                 'name': 'threat_display',
#                 'value': '@{threat}',
#             },
#         ),
#     ])

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
                minus(),
                equation_misc('encumbrance', 0),
                minus(),
                equation_misc('encumbrance', 1)
            ],
            result_attributes={
                'disabled': True,
                'name': 'encumbrance_display',
                'value': '@{encumbrance}',
            },
        ),
    ])

def calc_defenses():
    return div({'class': 'defenses'}, [
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
                    'disabled': True, 'name': 'skill_points_base', 'value': 6,
                })),
                plus(),
                underlabel('2 * (Int)', number_input({
                    'disabled': True,
                    'name': 'skill_points_intelligence',
                    'value': '(@{intelligence_starting} * 2)',
                })),
                plus(),
                equation_misc_repeat('skill_points', 2)
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'skill_points_display',
                'value': '(@{skill_points})',
            },
        ),
    ])

def calc_maneuvers():
    return flex_row([
        div({'class': 'calc-header'}, 'Maneuvers'),
        equation(
            [
                underlabel('Insight', number_input({
                    'name': 'maneuvers_known_insight_points',
                })),
                plus(),
                equation_misc_repeat('maneuvers_known', 3)
            ],
            result_attributes={
                'disabled': True,
                'name': 'maneuvers_known_display',
                'value': '@{maneuvers_known}',
            },
        )
    ])

def calc_spells():
    return flex_row([
        div({'class': 'calc-header'}, 'Spells'),
        equation(
            [
                underlabel('Insight', number_input({
                    'name': 'spells_known_insight_points',
                })),
                plus(),
                equation_misc_repeat('spells_known', 3)
            ],
            result_attributes={
                'disabled': True,
                'name': 'spells_known_display',
                'value': '@{spells_known}',
            },
        ),
    ])

def calc_spheres():
    return flex_row([
        div({'class': 'calc-header'}, 'Spheres'),
        equation(
            [
                underlabel('1/2 Insight', number_input({
                    'name': 'spheres_known_insight_points',
                })),
                plus(),
                equation_misc_repeat('spheres_known', 3)
            ],
            result_attributes={
                'disabled': True,
                'name': 'spheres_known_display',
                'value': '@{spheres_known}',
            },
        ),
    ])

def calc_blank_ability(i):
    name = f'blank_ability_known_{i}'
    return flex_row([
        div({'class': 'calc-header'}, text_input({'name': f'active_ability_name_{i}'})),
        equation(
            [
                underlabel('Insight', number_input({
                    'name': f'{name}_insight_points',
                })),
                plus(),
                equation_misc_repeat(name, 3)
            ],
            result_attributes={
                'disabled': True,
                'name': f'{name}_display',
                'value': f'(@{{{name}}})',
            },
        )
    ])

def calc_insight_points():
    return flex_row([
        div({'class': 'calc-header'}, 'Insight Points'),
        equation(
            [
                underlabel('Base', number_input({
                    'disabled': True,
                    'name': 'insight_points_base',
                    'value': 2,
                })),
                plus(),
                underlabel('(Int)', number_input({
                    'disabled': True,
                    'name': 'insight_points_intelligence_display',
                    'value': '(@{intelligence_starting})',
                })),
                plus(),
                equation_misc_repeat('insight_points', 2)
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'insight_points_display',
                'value': '(@{insight_points})',
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
                underlabel('Lvl', number_input({
                    'disabled': True,
                    'name': 'armor_defense_scaling_display',
                    'value': '@{level}',
                })),
                plus(),
                underlabel('(Dex)', number_input({
                    'disabled': True,
                    'name': 'body_armor_dexterity_display',
                    'value': '@{dexterity_starting}',
                })),
                plus(),
                underlabel('Class', number_input({'name': 'armor_defense_class_bonus', 'value': '2'})),
                plus(),
                underlabel('Armor', number_input({'name': 'body_armor_defense_value'})),
                plus(),
                equation_misc_repeat('armor_defense', 3)
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
        div({'class': 'calc-header'}, 'Fort'),
        equation(
            [
                underlabel('Lvl', number_input({
                    'disabled': True,
                    'name': 'fortitude_scaling_display',
                    'value': '@{level}',
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
                equation_misc_repeat('fortitude', 4)
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
        div({'class': 'calc-header'}, 'Ref'),
        equation(
            [
                underlabel('Lvl', number_input({
                    'disabled': True,
                    'name': 'reflex_scaling_display',
                    'value': '@{level}',
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
                equation_misc_repeat('reflex', 4)
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
        div({'class': 'calc-header'}, 'Ment'),
        equation(
            [
                underlabel('Lvl', number_input({
                    'disabled': True,
                    'name': 'mental_scaling_display',
                    'value': '@{level}',
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
                equation_misc_repeat('mental', 4)
            ],
            result_attributes={
                'disabled': 'true',
                'name': 'mental_display',
                'value': '@{mental}',
            },
        ),
    ])


def standard_damage():
    return flex_col({'class': 'standard-damage'}, [
        div({'class': 'section-header'}, 'Dice Pools'),
        flex_row({'class': 'damage-chart'}, [
            flex_col([
                div({'class': 'header'}, 'Damage'),
                "".join([
                    div(standard_damage_at_power(i))
                    for i in range(-4, 25, 2)
                ]),
            ])
        ])
    ])
