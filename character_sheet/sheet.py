from cgi_simple import *

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
            flex_col([
                defenses(),
                core_statistics(),
            ]),
            conditional_effects(),
            attacks(),
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
        div(div({'class': 'section-header'}, 'Attributes and Skills')),
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
    return flex_col({'id': 'core-statistics'}, [
        div(div({'class': 'section-header'}, 'Core Statistics')),
        hit_points(),
    ])

def defenses():
    return flex_col({'id': 'defenses'}, [
        div(div({'class': 'section-header'}, 'Defenses')),
        "".join([labeled_defense_input(defense) for defense in DEFENSES]),
    ])

def labeled_defense_input(defense_name):
    return labeled_number_input(defense_name, defense_name.lower(), {'class': 'defense'})

def hit_points():
    return labeled_number_input('Hit Points', 'hit-points', {'class': 'defense'})

def conditional_effects():
    return ''

def attacks():
    return flex_col({'id': 'attacks'}, [
        div(div({'class': 'section-header'}, 'Attacks')),
        "".join([attack(i) for i in range(4)]),
    ])

def attack(attack_number = None):
    return flex_row({'class': 'single-attack'}, [
        labeled_text_input('Attack', 'attack{0}-name'.format(attack_number), {'class': 'attack-name'}),
        underlabeled_number_input('Bonus', 'attack{0}-bonus'.format(attack_number), {'class': 'attack-bonus'}),
        labeled_text_input('Damage/Effect', 'attack{0}-effect'.format(attack_number), {'class': 'attack-effect'}),
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

def labeled_number_input(label_name, input_name, attributes = None):
    attributes = attributes or dict()
    attributes['class'] = 'labeled-number-input ' + attributes.get('class', '')

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
            'href': 'paper_sheet.css',
        }),
    ])

def debug_html_wrapper(html):
    return div(
        {
            'class': 'dialog characterdialog ui-dialog ui-dialog-content ui-widget-content',
            'style': 'display: block; height: 11in; width: 8in;',
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
