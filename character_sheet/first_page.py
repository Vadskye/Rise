from cgi_simple import (
    button, div, flex_col, flex_row, flex_wrapper, freeform_number_input,
    labeled_number_input, labeled_text_input, number_input, sidelabel, text_input, underlabel, underlabel_spaced
)
from sheet_data import ATTRIBUTES, DEFENSES, ATTRIBUTE_SKILLS, ROLL20_CALC

def create_page():
    return flex_row({'class': 'first-page'}, [
        flex_col({'class': 'sidebar'}, [
            rise_title(),
            attributes_and_skills(),
        ]),
        flex_col({'class': 'main-body'}, [
            boring_stuff(),
            statistics_header(),
            wound_thresholds(),
            attacks(),
            abilities(),
        ]),
    ])

def boring_stuff():
    return div({'class': 'boring-stuff'}, [
        flex_row({'class': 'boring-row'}, [
            labeled_text_input('Character name', input_attributes={'name': 'character_name'}),
            labeled_text_input('Player name', input_attributes={'name': 'player_name'}),
            labeled_text_input('Concept', input_attributes={'name': 'concept'}),
        ]),
        flex_row({'class': 'boring-row'}, [
            underlabel_spaced(
                'Level',
                number_input({'class': 'fake-text', 'name': 'level'}),
                attributes={'class': 'level-input'},
            ),
            labeled_text_input(
                'Class',
                attributes={'class': 'class-input'},
                input_attributes={'name': 'class'},
            ),
            labeled_text_input(
                'Species and background',
                attributes={'class': 'species-input'},
                input_attributes={'name': 'species_and_background'},
            ),
            labeled_text_input(
                'Description',
                attributes={'class': 'description-input'},
                input_attributes={'name': 'description'},
            ),
        ]),
    ])

def attributes_and_skills():
    return flex_col({'class': 'attributes-and-skills'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Attributes and Skills')),
        ''.join([attribute_section(attribute.lower()) for attribute in ATTRIBUTES]),
        flex_col({'class': 'other-skills attribute-section'}, [
            div({'class': 'attribute attribute-header'}, 'Other Skills'),
            ''.join([skill_box(skill) for skill in ATTRIBUTE_SKILLS['other']]),
            freeform_number_input({'class': 'skill-box'}, {'name': 'other_skill_1_name'}, {'name': 'other_skill_1'}),
            freeform_number_input({'class': 'skill-box'}, {'name': 'other_skill_2_name'}, {'name': 'other_skill_2'}),
            freeform_number_input({'class': 'skill-box'}, {'name': 'other_skill_3_name'}, {'name': 'other_skill_3'}),
            freeform_number_input({'class': 'skill-box'}, {'name': 'other_skill_4_name'}, {'name': 'other_skill_4'}),
        ]),
    ])

def attribute_section(attribute):
    return flex_col({'class': f'{attribute} attribute-section'}, [
        labeled_number_input(
            attribute.capitalize(),
            attributes={'class': 'attribute'},
            input_attributes={
                'disabled': 'true',
                'name': f"{attribute}_display",
                'value': '(@{' + attribute + '})',
            },
        ),
        ''.join([skill_box(skill) for skill in ATTRIBUTE_SKILLS[attribute]])
    ])

def skill_box(name):
    formatted_skill = name.lower().replace(' ', '_')
    return flex_row({'class': 'skill-box'}, [
        button(
            {
                'class': 'number-label',
                'name': f"roll_skill_{formatted_skill}",
                'type': 'roll',
                'value': f"@{{character_name}} uses {name}: [[d10 + @{{{formatted_skill}_total}}]]",
            },
            name
        ),
        number_input({
            'disabled': True,
            'name': formatted_skill + '_total_display',
            'value': '@{' + formatted_skill + '_total}',
        }),
    ])

# def resources():
#     return flex_col({'class': 'resources'}, [
#         flex_wrapper({'class': 'section-header'}, 'Resources'),
#         flex_wrapper({'class': 'action-point-header'}, 'Action points'),
#         flex_row({'class': 'action-point-wrapper'}, [
#             underlabel('Reserve', number_input({
#                 'disabled': True,
#                 'name': 'action_points_max',
#                 'value': ROLL20_CALC['reserve_ap'],
#             })),
#             underlabel('Recover', number_input({
#                 'disabled': True,
#                 'name': 'action_points_recovery_max',
#                 'value': ROLL20_CALC['recovery_ap'],
#             })),
#             underlabel('Attuned', number_input({'name': 'action_points_attuned'})),
#         ]),
#         labeled_number_input('Legend points', input_attributes={
#             'disabled': True,
#             'name': 'legend_points_display',
#             'value': '@{legend_points}',
#         }),
#         labeled_number_input('Item slots', input_attributes={'name': 'item_slots'}),
#     ])

def statistics_header():
    return ''.join([
        flex_row({'class': 'all-statistics'}, [
            core_statistics(),
            defenses(),
            resources(),
        ])
    ])

def defenses():
    return flex_col({'class': 'defenses'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Defenses')),
        "".join([
            labeled_number_input(
                defense,
                input_attributes={
                    'disabled': 'true',
                    'name': defense.lower() + '_display',
                    'value': '@{' + ('armor_defense' if defense == 'Armor' else defense.lower()) + '}',
                },
            )
            for defense in DEFENSES
        ]),
    ])

def special_defenses():
    return flex_col({'class': 'special-defenses'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Special Defenses')),
        "".join([
            text_input({'name': f"special_defense_{i}"})
            for i in range(4)
        ]),
    ])

def core_statistics():
    return flex_col({'class': 'core-statistics'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Core Statistics')),
        labeled_number_input('Land speed', input_attributes={
            'name': 'land_speed',
            'value': '@{base_speed}',
        }),
        sidelabel('Threat', number_input({
            'disabled': True,
            'name': 'threat_display',
            'value': '@{threat}',
        })),
        sidelabel('FT', number_input({
            'disabled': True,
            'name': 'fatigue_threshold_display',
            'value': '(@{fatigue_threshold})',
        })),
        labeled_number_input('Item slots', input_attributes={
            'disabled': True,
            'name': 'hit_points_bloodied_display',
            'value': 'floor(@{hit_points_total} / 2)',
        }),
    ])

def resources():
    return flex_col({'class': 'resources'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Resources')),
        flex_row({'class': 'recovery-action-points'}, [
            div({'class': 'resource-header number-label'}, 'Recovery AP'),
            flex_row({'class': 'resource-inputs'}, [
                number_input(),
                number_input(),
                number_input(),
                number_input(),
                number_input(),
            ]),
        ]),
        flex_row({'class': 'reserve-action-points'}, [
            div({'class': 'resource-header number-label'}, 'Reserve AP'),
            flex_row({'class': 'resource-inputs'}, [
                number_input(),
                number_input(),
                number_input(),
                number_input(),
                number_input(),
                number_input(),
            ]),
        ]),
        flex_row({'class': 'item-slots'}, [
            div({'class': 'resource-header number-label'}, 'Item slots'),
            flex_row({'class': 'resource-inputs'}, [
                number_input(),
                number_input(),
                number_input(),
                number_input(),
            ]),
        ]),
        flex_row({'class': 'legend-points'}, [
            div({'class': 'resource-header number-label'}, 'Legend point'),
            number_input(),
        ]),
    ])

def movement():
    return flex_col({'class': 'movement'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Movement')),
        "".join([
            labeled_number_input(movement_type)
            for movement_type in 'Land Climb Fly Swim'.split()
        ]),
        freeform_number_input(),
    ])

def abilities():
    return flex_col({'class': 'abilities'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Abilities')),
        "".join([ability(i) for i in range(10)]),
    ])

def ability(ability_number=None):
    return flex_row({'class': 'ability'}, [
        labeled_text_input(
            'Name',
            {'class': 'active-ability-name'},
            {'name': 'active_ability{0}_name'.format(ability_number)},
        ),
        labeled_text_input(
            'Effect',
            {'class': 'active-ability-effect'},
            {'name': 'active_ability{0}_effect'.format(ability_number)},
        ),
    ])

def passive_abilities():
    return flex_col({'class': 'passive-abilities'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Passive Abilities')),
        "".join([
            flex_row({'class': 'passive-ability-row'}, [
                passive_ability(prefix='l', ability_number=i),
                passive_ability(prefix='r', ability_number=i),
            ])
            for i in range(5)
        ]),
    ])

def passive_ability(prefix, ability_number):
    return div(
        text_input({
            'name': 'passive{0}-{1}-name'.format(ability_number, prefix)
        })
    )

    return flex_row({'class': 'passive-ability'}, [
        labeled_text_input('Name', {'class': 'passive-name'}, input_attributes={
            'name': 'passive{0}-{1}-name'.format(ability_number, prefix),
        }),
        labeled_text_input('Effect', {'class': 'passive-effect'}, input_attributes={
            'name': 'passive{0}-{1}-effect'.format(ability_number, prefix),
        }),
    ])

def wound_thresholds():
    return flex_col({'class': 'wound-thresholds'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Fatigue Track')),
        flex_row({'class': 'wound-threshold-values'}, [
            wound_threshold_header(),
            "".join(wound_threshold_value(i) for i in range(9)),
        ]),
    ])


def wound_threshold_header():
    return flex_col({'class': 'wound-threshold-headers'}, [
        div({'class': 'number-label'}, 'WT'),
        div({'class': 'number-label'}, 'Fatigue'),
    ])


def wound_threshold_value(i):
    return flex_col([
        number_input(),
        div({'class': 'fatigue-value'}, str(i)),
    ])


def attacks():
    return flex_col({'class': 'attacks'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Basic Attacks')),
        "".join([attack(i) for i in range(4)]),
    ])

def attack(n=None):
    return flex_row({'class': 'attack'}, [
        labeled_text_input(
            'Name',
            {'class': 'attack-name'},
            {'name': 'attack{0}_name'.format(n)},
        ),
        underlabel_spaced(
            'Accuracy',
            number_input({
                'class': 'fake-text',
                'name': 'attack{0}_accuracy'.format(n),
            }),
            {'class': 'attack-bonus'}
        ),
        labeled_text_input(
            'Damage/Effect',
            {'class': 'attack-effect'},
            {'name': 'attack{0}_effect'.format(n)},
        ),
        button(
            {
                'class': 'attack-roll',
                'name': f"roll_attack_{n}",
                'type': 'roll',
                'value': f"@{{character_name}} uses @{{attack{n}_name}}: [[d10! + @{{base_accuracy}} + @{{attack{n}_accuracy}}]] to hit! (@{{attack{n}_effect}})",
            },
            'Attack',
        ),
    ])

def rise_title():
    return div(
        {'class': 'rise-title'},
        'Rise'
    )
