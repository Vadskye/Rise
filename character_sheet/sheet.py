from cgi_simple import *

DESTINATION = 'paper'

ATTRIBUTES = 'Strength Dexterity Constitution Intelligence Perception Willpower'.split()
DEFENSES = 'Armor Maneuver Fortitude Reflex Mental'.split()
ATTRIBUTE_SKILLS = {
    'strength':  'Climb Jump Sprint Swim'.split(),
    'dexterity': ['Balance', 'Escape Artist', 'Ride', 'Sleight of Hand', 'Tumble', 'Stealth'],
    'constitution': [],
    'intelligence': ['Craft', 'Devices', 'Disguise', 'Knowledge', 'Linguistics'],
    'perception': ['Awareness', 'Heal', 'Sense Motive', 'Spellcraft', 'Survival'],
    'willpower': [],
}

def main(fh):
    w('<!DOCTYPE html>')
    w(debug_stylesheets())

    html = '\n'.join([
        boring_stuff(),
        flex_row([
            attributes_and_skills(),
            flex_col({'id': 'main-sheet-body'}, [
                core_statistics(),
                active_abilities(),
                attacks(),
                #defenses(),
            ]),
            #conditional_effects(),
        ]),
    ])

    w(debug_html_wrapper(html))

def boring_stuff():
    return div({'id': 'boring-stuff'}, [
        flex_row([
            labeled_text_input('Character name', 'character-name'),
            labeled_text_input('Player name', 'player-name'),
            labeled_text_input('Class and level', 'class-and-level'),
        ]),
        flex_row([
            labeled_text_input('Race and background', 'race-and-background'),
            labeled_text_input('Alignment and deity', 'alignment-and-deity'),
            labeled_text_input('Appearance', 'appearance'),
            labeled_text_input('Concept', 'concept'),
        ]),
    ])

def attributes_and_skills():
    return flex_col({'id': 'attributes-and-skills'}, [
        div(div({'class': 'section-header'}, 'Attributes<br>and Skills')),
        ''.join([attribute_section(attribute) for attribute in ATTRIBUTES]),
    ])

def attribute_section(attribute):
    return flex_col({'class': 'attribute-section'}, [
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

def core_statistics():
    return ''.join([
        div({'id': 'core-statistics-header'},
            div({'class': 'section-header'}, 'Core Statistics'),
        ),
        flex_row({'id': 'core-statistics'}, [
            defenses(),
            movement(),
            passive_abilities(),
            hit_points(),
            #labeled_number_input('Hit Points', 'hit-points')
        ])
    ])

def defenses():
    return flex_col({'id': 'defenses'}, [
        div(div({'class': 'section-header'}, 'Defenses')),
        "".join([labeled_number_input(defense) for defense in DEFENSES]),
    ])

def hit_points():
    return flex_col({'id': 'hit-points'}, [
        div(div({'class': 'section-header'}, 'Hit Points')),
        "".join([
            labeled_number_input(hp_type)
            for hp_type in 'Maximum Bloodied Temporary Nonlethal Critical'.split()
        ]),
    ])

def movement():
    return flex_col({'id': 'movement'}, [
        div(div({'class': 'section-header'}, 'Movement')),
        "".join([
            labeled_number_input(movement_type)
            for movement_type in 'Speed Climb Fly Swim'.split()
        ]),
        flex_row({'class': 'unlabeled-number-input'}, [
            text_input(),
            number_input(),
        ]),
    ])

def passive_abilities():
    return flex_col({'id': 'passive-abilities'}, [
        div(div({'class': 'section-header'}, 'Passive Abilities')),
        "".join([
            passive_ability(i)
            for i in range(5)
        ]),
    ])

def passive_ability(ability_number):
    return text_input({'class': 'passive-ability'})

    return flex_row({'class': 'passive-ability'}, [
        labeled_text_input('Ability', 'passive{0}-name'.format(ability_number), {'class': 'passive-name'}),
        labeled_text_input('Effect', 'passive{0}-effect'.format(ability_number), {'class': 'passive-effect'}),
    ])

def conditional_effects():
    return ''

def abilities():
    return ''

def active_abilities():
    return flex_col({'id': 'active-abilities'}, [
        div(div({'class': 'section-header'}, 'Abilities')),
        "".join([active_ability(i) for i in range(5)]),
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
            'Damage/Effect',
            'active-ability{0}-effect'.format(ability_number),
            {'class': 'active-ability-effect'}
        ),
    ])

def attacks():
    return flex_col({'id': 'attacks'}, [
        div(div({'class': 'section-header'}, 'Attacks')),
        "".join([attack(i) for i in range(5)]),
    ])

def attack(attack_number = None):
    return flex_row({'class': 'attack'}, [
        labeled_text_input(
            'Attack',
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

def flex_row(attributes = None, contents = None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)
    attributes['class'] = 'flex-row ' + attributes.get('class', '')
    return div(attributes, contents)

def flex_col(attributes = None, contents = None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)
    attributes['class'] = 'flex-col ' + attributes.get('class', '')
    return div(attributes, contents)

def rise_title():
    return h1(
        {'id': 'main-title'},
        'Rise'
    )

def labeled_text_input(label_name, input_name, attributes = None):
    attributes = attributes or dict()
    attributes['class'] = 'labeled-text-input ' + attributes.get('class', '')
    return span(attributes, [
        text_input({
            'name': input_name,
        }),
        span(
            {'class': 'under-label'},
            label_name
        ),
    ])

def labeled_number_input(label_name, input_name = None, attributes = None):
    attributes = attributes or dict()
    attributes['class'] = 'labeled-number-input ' + attributes.get('class', '')
    input_name = input_name or label_name.lower()

    return flex_row(attributes, [
        span(
            {'class': 'number-label'},
            label_name
        ),
        number_input({
            'name': input_name,
        }),
    ])

def underlabeled_number_input(label_name, input_name, attributes = None):
    attributes = attributes or dict()
    if attributes.has_key('class'):
        attributes['class'] += ' underlabeled-number-input'
    else:
        attributes['class'] = 'underlabeled-number-input'

    return div(attributes, [
        number_input({
            'name': input_name,
        }),
        span(
            {'class': 'under-label'},
            label_name
        ),
    ])

def labeled_dual_input(label_name, text_input_name, number_input_name):
    return div({'class': 'labeled-dual-input'}, [
        labeled_text_input(label_name, text_input_name),
        number_input({
            'name': number_input_name,
        }),
    ])

def debug_stylesheets():


    return head([
        #link({
        #    'rel': 'stylesheet',
        #    'href': 'roll20.css',
        #}),
        #link({
            #'rel': 'stylesheet',
            #'href': 'roll20_editor.css',
        #}),
        link({
            'rel': 'stylesheet',
            'href': 'sheet.css',
        }),
        link({
            'rel': 'stylesheet',
            'href': DESTINATION + '_sheet.css',
        }),
    ])

def debug_html_wrapper(html):
    return div(
        {
            'class': 'dialog characterdialog ui-dialog ui-dialog-content ui-widget-content',
        },
        div(
            {'id': 'root', 'class': 'charsheet tab-pane'},
            html
        )
    )

def w(text):
    fh.write(str(text) + '\n')

if __name__ == "__main__":
    with open('sheet.html', 'w') as fh:
        main(fh)
