from cgi_simple import (
    button, div, flex_col, flex_row, flex_wrapper, freeform_number_input,
    labeled_number_input, labeled_text_input, number_input, text_input, underlabel
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
            labeled_text_input('Class', input_attributes={'name': 'class'}),
            labeled_number_input('Level', input_attributes={'name': 'level', 'value': '1'}),
            labeled_text_input('Race and background', input_attributes={'name': 'race_and_background'}),
            labeled_text_input('Description', input_attributes={'name': 'description'}),
        ]),
    ])

def attributes_and_skills():
    return flex_col({'class': 'attributes-and-skills'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Attributes and Skills')),
        ''.join([attribute_section(attribute.lower()) for attribute in ATTRIBUTES]),
        flex_col({'class': 'other-skills attribute-section'}, [
            div({'class': 'attribute attribute-header'}, 'Other Skills'),
            ''.join([skill_box(skill) for skill in ['Bluff', 'Intimidate', 'Perform ______', 'Persuasion']]),
            freeform_number_input({'class': 'skill-box'}, {'name': 'other_skill_1'}),
            freeform_number_input({'class': 'skill-box'}, {'name': 'other_skill_2'}),
            freeform_number_input({'class': 'skill-box'}, {'name': 'other_skill_3'}),
            freeform_number_input({'class': 'skill-box'}, {'name': 'other_skill_4'}),
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
                'value': '@{' + formatted_skill + '} for ' + name
            },
            name
        ),
        number_input({
            'disabled': True,
            'name': formatted_skill,
            'value': ROLL20_CALC['skill_total'](formatted_skill)
        }),
    ])

def resources():
    return flex_col({'class': 'resources'}, [
        flex_wrapper({'class': 'section-header'}, 'Resources'),
        flex_wrapper({'class': 'action-point-header'}, 'Action points'),
        flex_row({'class': 'action-point-wrapper'}, [
            underlabel('Maximum', number_input({
                'disabled': True,
                'name': 'action_points_display',
                'value': '@{action_points}',
            })),
            underlabel('Attuned', number_input({'name': 'action_points_attuned'})),
            underlabel('Recovery', number_input({
                'disabled': True,
                'name': 'action_points_recovery',
                'value': 'floor(@{action_points} / 2)',
            })),
        ]),
        labeled_number_input('Legend points', input_attributes={
            'disabled': True,
            'name': 'legend_points',
            'value': 'floor((@{level} + 2) / 4)',
        }),
        labeled_number_input('Item slots', input_attributes={'name': 'item_slots'}),
    ])

def statistics_header():
    return ''.join([
        flex_row({'class': 'core-statistics'}, [
            defenses(),
            core_statistics(),
            hit_points(),
            resources()
            # labeled_number_input('Hit Points', 'hit-points')
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
                    'name': defense.lower() + '_defense__display',
                    'value': '@{' + defense.lower() + '}',
                },
            )
            for defense in DEFENSES
        ]),
    ])

def core_statistics():
    return flex_col({'class': 'offense'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Core Statistics')),
        labeled_number_input('Strike accuracy', input_attributes={
            'disabled': 'true',
            'name': 'strike_accuracy_display',
            'value': '@{strike_accuracy}',
        }),
        labeled_text_input('Strike damage', input_attributes={
            'disabled': 'true',
            'name': 'strike_damage_display',
            'value': '(@{strike_damage})',
        }),
        labeled_number_input('Land speed', input_attributes={
            'name': 'land_speed',
            'value': '@{speed}',
        }),
        labeled_number_input('Strike accuracy', input_attributes={
            'name': 'other_speed',
        }),
    ])

def hit_points():
    return flex_col({'class': 'hit-points'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Hit Points')),
        labeled_number_input('Max', input_attributes={
            'disabled': True,
            'name': 'hit_points_display',
            'value': '@{hit_points_max}',
        }),
        labeled_number_input('Bloodied', input_attributes={
            'disabled': True,
            'name': 'hit_points_bloodied_display',
            'value': 'floor(@{hit_points_max} / 2)',
        }),
        labeled_number_input('Vital', input_attributes={'name': 'vital_damage'}),
        freeform_number_input(number_input_attributes={'name': 'hit_points_other'}),
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

def attacks():
    return flex_col({'class': 'attacks'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Attacks')),
        "".join([attack(i) for i in range(6)]),
    ])

def attack(attack_number=None):
    return flex_row({'class': 'attack'}, [
        labeled_text_input(
            'Name',
            {'class': 'attack-name'},
            {'name': 'attack{0}_name'.format(attack_number)},
        ),
        underlabel(
            'Accuracy',
            number_input({
                'name': 'attack{0}_accuracy'.format(attack_number),
            }),
            {'class': 'attack-bonus'}
        ),
        labeled_text_input(
            'Damage/Effect',
            {'class': 'attack-effect'},
            {'name': 'attack{0}_effect'.format(attack_number)},
        ),
    ])

def rise_title():
    return div(
        {'class': 'rise-title'},
        'Rise'
    )
