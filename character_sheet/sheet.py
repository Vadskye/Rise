from cgi_simple import *

ATTRIBUTES = 'strength dexterity constitution intelligence perception willpower'.split()
DEFENSES = 'Armor Maneuver Fortitude Reflex Mental'.split()

def main(fh):
    w('<!DOCTYPE html>')
    w(debug_stylesheets())

    html = '\n'.join([
        boring_stuff(),
        div({'class': 'sheet-4colrow'}, [
            col(attributes_and_skills()),
            col(defenses()),
            col([core_statistics(), conditional_effects()], 2),
        ]),
        attacks(),
    ])

    w(debug_html_wrapper(html))

def boring_stuff():
    return div({'id': 'boring-stuff'}, [
        row(3, [
            labeled_text_input('Character name', 'character-name'),
            labeled_text_input('Player name', 'player-name'),
            labeled_text_input('Class and level', 'class-and-level'),
        ]),
        row(4, [
            labeled_text_input('Race and background', 'race-and-background'),
            labeled_text_input('Concept', 'concept'),
            labeled_text_input('Alignment and deity', 'alignment-and-deity'),
            labeled_text_input('Appearance', 'appearance'),
        ]),
    ])

def attributes_and_skills():
    return div({'id': 'attributes-and-skills'}, [
        attribute_section(attribute) for attribute in ATTRIBUTES
    ])

def attribute_section(attribute):
    return {
        'strength': strength_section,
        'dexterity': dexterity_section,
        'constitution': constitution_section,
        'intelligence': intelligence_section,
        'perception': perception_section,
        'willpower': willpower_section,
    }[attribute]()

def strength_section():
    return div({'id': 'strength-section', 'class': 'attribute-section'},
               [attribute_header('Strength')]
               + [skill_box(skill) for skill in 'Climb Jump Sprint Swim'.split()]
    )

def dexterity_section():
    return div({'id': 'dexterity-section', 'class': 'attribute-section'},
               [attribute_header('Dexterity')]
               + [skill_box(skill) for skill in ['Balance', 'Escape Artist', 'Ride', 'Sleight of Hand', 'Tumble', 'Stealth']]
    )

def constitution_section():
    return div({'id': 'constitution-section', 'class': 'attribute-section'},
               [attribute_header('Constitution')],
    )

def intelligence_section():
    return div({'id': 'intelligence-section', 'class': 'attribute-section'},
               [attribute_header('Intelligence')]
               + [skill_box(skill) for skill in ['Craft', 'Devices', 'Disguise', 'Knowledge', 'Linguistics']]
    )

def perception_section():
    return div({'id': 'perception-section', 'class': 'attribute-section'},
               [attribute_header('Perception')]
               + [skill_box(skill) for skill in ['Awareness', 'Heal', 'Sense Motive', 'Spellcraft', 'Survival']]
    )

def willpower_section():
    return div({'id': 'willpower-section', 'class': 'attribute-section'},
               [attribute_header('Willpower')]
    )

def attribute_header(name):
    return div({'class': 'attribute-header labeled_number_input'}, [
        span({'class': 'attribute-name number-label'}, name),
        number_input({
            'name': name,
            'class': 'number-input boxed-input',
        }),
    ])

def defense_header(name):
    return div({'class': 'defense-header labeled_number_input'}, [
        span({'class': 'defense-name number-label'}, name),
        number_input({
            'name': name,
            'class': 'number-input boxed-input',
        }),
    ])

def skill_box(name):
    return div({'class': 'skill-box'}, [
        span(
            {'class': 'number-label'},
            name
        ),
        number_input({
            'name': name.lower(),
            'class': 'number-input boxed-input',
        }),
    ])

def core_statistics():
    return ''

def defenses():
    return div({'id': 'defenses'}, [
        defense_header(defense) for defense in DEFENSES
    ])

def conditional_effects():
    return ''

def attacks():
    return ''

def row(column_count, contents):
    return div(
        {'class': 'sheet-{0}colrow'.format(column_count)},
        [col(stuff) for stuff in contents]
    )

def col(contents, column_count = None):
    return div(
        {'class': 'my-{0}col'.format(column_count or '')},
        contents
    )

def rise_title():
    return h1(
        {'id': 'main-title'},
        'Rise'
    )

def labeled_text_input(label_name, input_name):
    return div({'class': 'labeled-text-input'}, [
        text_input({
            'name': input_name,
            'class': 'text-input underlined-input',
        }),
        span(
            {'class': 'text-label'},
            label_name
        ),
    ])

def labeled_number_input(label_name, input_name):
    return div({'class': 'labeled-number-input'}, [
        span(
            {'class': 'number-label'},
            label_name
        ),
        number_input({
            'name': input_name,
            'class': 'number-input boxed-input',
        }),
    ])

def labeled_dual_input(label_name, text_input_name, number_input_name):
    return div({'class': 'labeled-dual-input'}, [
        labeled_text_input(label_name, text_input_name),
        number_input({
            'name': number_input_name,
            'class': 'number-input boxed-input',
        }),
    ])

def debug_stylesheets():


    return head([
        #link({
        #    'rel': 'stylesheet',
        #    'href': 'roll20.css',
        #}),
        link({
            'rel': 'stylesheet',
            'href': 'roll20_editor.css',
        }),
        link({
            'rel': 'stylesheet',
            'href': 'sheet.css',
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
