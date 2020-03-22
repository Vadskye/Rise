from cgi_simple import (
    button, div, fieldset, flex_col, flex_row, flex_wrapper, freeform_number_input,
    labeled_number_input, labeled_text_input, number_input, sidelabel, span,
    text_input, underlabel, underlabel_spaced
)
from sheet_data import ATTRIBUTES, DEFENSES, ATTRIBUTE_SKILLS

def create_page(destination):
    return flex_row({'class': 'first-page'}, [
        flex_col({'class': 'sidebar'}, [
            rise_title(),
            attributes_and_skills(),
        ]),
        flex_col({'class': 'main-body'}, [
            boring_stuff(destination),
            statistics_header(),
            attacks(destination),
            abilities(destination),
        ]),
    ])

def boring_stuff(destination):
    return div({'class': 'boring-stuff'}, [
        flex_row({'class': 'boring-row'}, [
            labeled_text_input('Character name', input_attributes={'name': 'character_name'}),
            labeled_text_input('Player name', input_attributes={'name': 'player_name'}),
            labeled_text_input('Concept', input_attributes={'name': 'concept'}),
            underlabel_spaced(
                'Level',
                number_input({'class': 'fake-text', 'name': 'level'}),
                attributes={'class': 'level-input'},
            ),
            *([
                underlabel_spaced(
                    'CR',
                    number_input({'class': 'fake-text', 'name': 'challenge_rating'}),
                    attributes={'class': 'challenge-rating-input'},
                ),
            ] if destination == 'roll20' else []),
        ]),
    ])

def attributes_and_skills():
    return flex_col({'class': 'attributes-and-skills'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Attributes and Skills')),
        ''.join([attribute_section(attribute.lower()) for attribute in ATTRIBUTES]),
        flex_col({'class': 'other-skills attribute-section'}, [
            flex_row({'class': 'attribute'}, [
                div({'class': 'attribute-header'}, 'Other Skills'),
            ]),
            ''.join([skill_box(skill) for skill in ATTRIBUTE_SKILLS['other']]),
            freeform_number_input({'class': 'skill-box'}, {'name': 'other_skill_1_name'}, {'name': 'other_skill_1'}),
        ]),
    ])

def attribute_section(attribute):
    return flex_col({'class': f'{attribute} attribute-section'}, [
        flex_row({'class': 'attribute'}, [
            span({'class': 'attribute-header number-label'}, attribute.capitalize()),
            underlabel('Base', number_input({
                'disabled': True,
                'name': f"{attribute}_base_display",
                'value': '(@{' + attribute + '_starting})',
            })),
            underlabel('Total', number_input({
                'disabled': True,
                'name': f"{attribute}_display",
                'value': '(@{' + attribute + '})',
            })),
        ]),
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

def resources():
    return flex_col({'class': 'resources'}, [
        flex_wrapper({'class': 'section-header'}, 'Resources'),
        flex_wrapper({'class': 'action-point-header'}, 'Action points'),
        flex_row({'class': 'action-point-wrapper'}, [
            underlabel('Max', number_input({
                'disabled': True,
                'name': 'action_points_total_display',
                'value': '@{action_points_total}',
            })),
            # This needs to be editable to support the Null feat
            underlabel('Available', number_input({
                'name': 'action_points_available',
            })),
            underlabel('Attuned', number_input({'name': 'action_points_attuned'})),
        ]),
    ])

def statistics_header():
    return ''.join([
        flex_row({'class': 'all-statistics'}, [
            core_statistics(),
            defenses(),
            damage_resistance(),
            wound_resistance(),
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

def damage_resistance():
    return flex_col({'class': 'damage-resistances'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Damage Resist')),
        "".join([
            sidelabel('Physical', number_input({
                'disabled': True,
                'name': 'physical_damage_resistance_display',
                'value': '@{physical_damage_resistance}',
            })),
            sidelabel('Energy', number_input({
                'disabled': True,
                'name': 'energy_damage_resistance_display',
                'value': '@{energy_damage_resistance}',
            })),
            freeform_number_input(
                number_input_attributes={'name': 'damage_resistance_freeform'},
                text_input_attributes={'name': 'damage_resistance_freeform_name'},
            ),
            freeform_number_input(
                number_input_attributes={'name': 'damage_resistance_freeform_2'},
                text_input_attributes={'name': 'damage_resistance_freeform_name_2'},
            ),
        ]),
    ])

def wound_resistance():
    return flex_col({'class': 'wound-resistances'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Wound Resist')),
        "".join([
            sidelabel('Physical', number_input({
                'disabled': True,
                'name': 'physical_wound_resistance_display',
                'value': '@{physical_wound_resistance}',
            })),
            sidelabel('Energy', number_input({
                'disabled': True,
                'name': 'energy_wound_resistance_display',
                'value': '@{energy_wound_resistance}',
            })),
            freeform_number_input(
                number_input_attributes={'name': 'wound_resistance_freeform'},
                text_input_attributes={'name': 'wound_resistance_freeform_name'},
            ),
            freeform_number_input(
                number_input_attributes={'name': 'wound_resistance_freeform_2'},
                text_input_attributes={'name': 'wound_resistance_freeform_name_2'},
            ),
        ]),
    ])

def core_statistics():
    return flex_col({'class': 'core-statistics'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Core Statistics')),
        labeled_number_input('Land speed', input_attributes={
            'name': 'land_speed',
            'value': '@{base_speed}',
        }),
        sidelabel('Hit points', number_input({
            'disabled': True,
            'name': 'hit_points_display',
            'value': '@{hit_points}',
        })),
        sidelabel('Action points', number_input({
            'disabled': True,
            'name': 'action_points_display',
            'value': '@{action_points}',
        })),
        sidelabel('Initiative', number_input({
            'disabled': True,
            'name': 'initiative_display',
            'value': '@{initiative}',
        })),
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

def abilities(destination):
    return flex_col({'class': 'abilities'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Abilities')),
        "".join([ability(i) for i in range(13)]) if destination == 'paper' else fieldset(
            {'class': f'repeating_abilities'},
            ability(0),
        )
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


def attacks(destination):
    return flex_col({'class': 'attacks'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Attacks')),
        "".join([attack(i) for i in range(6)]) if destination == 'paper' else fieldset(
            {'class': f'repeating_attacks'},
            attack(0),
        )
    ])

def attack(n):
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
                'value': f"@{{character_name}} uses @{{attack{n}_name}}: [[d10! + @{{accuracy}} + @{{attack{n}_accuracy}}]] to hit! (@{{attack{n}_effect}})",
            },
            'Attack',
        ),
    ])

def rise_title():
    return div(
        {'class': 'rise-title'},
        'Rise'
    )
