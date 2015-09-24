from cgi_simple import *

from sheet_data import ATTRIBUTES, DEFENSES, ATTRIBUTE_SKILLS

def create_page():
    return flex_row([
        flex_col({'id': 'sidebar'}, [
            rise_title(),
            attributes_and_skills(),
        ]),
        flex_col({'id': 'main-sheet-body'}, [
            boring_stuff(),
            core_statistics(),
            passive_abilities(),
            active_abilities(),
            attacks(),
        ]),
    ])

def boring_stuff():
    return div({'id': 'boring-stuff'}, [
        flex_row([
            labeled_text_input('Character name', 'character-name'),
            labeled_text_input('Player name', 'player-name'),
            labeled_text_input('Concept', 'concept'),
        ]),
        flex_row([
            labeled_text_input('Class and level', 'class-and-level'),
            labeled_text_input('Race and background', 'race-and-background'),
            labeled_text_input('Alignment and deity', 'alignment-and-deity'),
            labeled_text_input('Appearance', 'appearance'),
        ]),
    ])

def attributes_and_skills():
    return flex_col({'id': 'attributes-and-skills'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Attributes<br>and Skills')),
        ''.join([attribute_section(attribute) for attribute in ATTRIBUTES]),
        flex_col({'id': 'other-skills', 'class': 'attribute-section'}, [
            div({'class': 'attribute'}, 'Other Skills'),
            ''.join([skill_box(skill) for skill in 'Bluff Intimidate Perform Persuasion'.split()]),
        ]),
    ])

def attribute_section(attribute):
    return flex_col({'id': attribute.lower(), 'class': 'attribute-section'}, [
        labeled_number_input(attribute, attribute.lower(), {'class': 'attribute'}),
        ''.join([skill_box(skill) for skill in ATTRIBUTE_SKILLS[attribute.lower()]])
    ])

def skill_box(name):
    return flex_row({'class': 'skill-box'}, [
        span(
            {'class': 'number-label'},
            name
        ),
        number_input({
            'name': name.lower(),
        }),
    ])

def resources():
    return flex_col({'id': 'resources'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Resources')),
        ''.join([
            #flex_row({'class': 'resource-row'}, [
                unlabeled_number_input()
            #] * 3),
        ] * 5),
    ])

def core_statistics():
    return ''.join([
        flex_row({'id': 'core-statistics'}, [
            defenses(),
            movement(),
            resources(),
            hit_points(),
            #labeled_number_input('Hit Points', 'hit-points')
        ])
    ])

def defenses():
    return flex_col({'id': 'defenses'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Defenses')),
        "".join([labeled_number_input(defense) for defense in DEFENSES]),
    ])

def hit_points():
    return flex_col({'id': 'hit-points'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Hit Points')),
        "".join([
            labeled_number_input(hp_type)
            for hp_type in 'Max Bloodied Temp Nonlethal Critical'.split()
        ]),
    ])

def movement():
    return flex_col({'id': 'movement'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Movement')),
        "".join([
            labeled_number_input(movement_type)
            for movement_type in 'Speed Climb Fly Swim'.split()
        ]),
        unlabeled_number_input(),
    ])

def passive_abilities():
    return flex_col({'id': 'passive-abilities'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Passive Abilities')),
        "".join([
            flex_row({'class': 'passive-ability-row'}, [
                passive_ability(i)
            ] * 2)
            for i in range(4)
        ]),
    ])

def passive_ability(ability_number):
    return div(text_input({'class': 'passive-ability'}))

    return flex_row({'class': 'passive-ability'}, [
        labeled_text_input('Name', 'passive{0}-name'.format(ability_number), {'class': 'passive-name'}),
        labeled_text_input('Effect', 'passive{0}-effect'.format(ability_number), {'class': 'passive-effect'}),
    ])

def conditional_effects():
    return ''

def abilities():
    return ''

def active_abilities():
    return flex_col({'id': 'active-abilities'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Abilities')),
        "".join([active_ability(i) for i in range(4)]),
    ])

def active_ability(ability_number = None):
    return flex_row({'class': 'active-ability'}, [
        labeled_text_input(
            'Ability',
            'active-ability{0}-name'.format(ability_number),
            {'class': 'active-ability-name'}
        ),
        underlabeled_number_input(
            'Bonus',
            'active-ability{0}-bonus'.format(ability_number),
            {'class': 'active-ability-bonus'}
        ),
        labeled_text_input(
            'Effect',
            'active-ability{0}-effect'.format(ability_number),
            {'class': 'active-ability-effect'}
        ),
    ])

def attacks():
    return flex_col({'id': 'attacks'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Attacks')),
        "".join([attack(i) for i in range(4)]),
    ])

def attack(attack_number = None):
    return flex_row({'class': 'attack'}, [
        labeled_text_input(
            'Name',
            'attack{0}-name'.format(attack_number),
            {'class': 'attack-name'}
        ),
        underlabeled_number_input(
            'Bonus',
            'attack{0}-bonus'.format(attack_number),
            {'class': 'attack-bonus'}
        ),
        labeled_text_input(
            'Damage/Effect',
            'attack{0}-effect'.format(attack_number),
            {'class': 'attack-effect'}
        ),
    ])

def rise_title():
    return div(
        {'id': 'rise-title'},
        'Rise'
    )
