from cgi_simple import *

ATTRIBUTES = 'strength dexterity constitution intelligence perception willpower'.split()

def main(fh):
    w('<!DOCTYPE html>')
    w(debug_stylesheets())

    html = '\n'.join([
        boring_stuff(),
        attributes_and_skills(),
        core_statistics(),
        defenses(),
        conditional_effects(),
        attacks(),
    ])

    w(debug_html_wrapper(html))

def boring_stuff():
    return card({'id': 'boring-stuff'}, [
        labeled_text_input('Character name', 'character-name'),
        labeled_text_input('Player name', 'player-name'),
        labeled_text_input('Class and level', 'class-and-level'),
        labeled_text_input('Race and background', 'race-and-background'),
        labeled_text_input('Concept', 'concept'),
        labeled_text_input('Alignment and deity', 'alignment-and-deity'),
        labeled_text_input('Appearance', 'appearance'),
    ])

def attributes_and_skills():
    return div({'class': 'attributes-and-skills'}, [
        attribute_card(attribute) for attribute in ATTRIBUTES
    ])

def attribute_card(attribute):
    return {
        'strength': strength_card,
        'dexterity': dexterity_card,
        'constitution': constitution_card,
        'intelligence': intelligence_card,
        'perception': perception_card,
        'willpower': willpower_card,
    }[attribute]()

def strength_card():
    return card({'id': 'strength-card'}, [
        attribute_header('Strength', 'STR'),
    ] + [skill_box(skill) for skill in 'Climb Jump Sprint Swim'.split()]
    + [
        div({'class': 'attribute-ability-separator'}, ''),
        labeled_dual_input('Ability', 'strength-ability-name', 'strength-ability-value'),
        labeled_dual_input('Ability', 'strength-ability-name', 'strength-ability-value'),
        labeled_dual_input('Ability', 'strength-ability-name', 'strength-ability-value'),
    ])

def dexterity_card():
    return card({'id': 'dexterity-card'}, [
        attribute_header('Dexterity', 'DEX')
    ] + [skill_box(skill) for skill in ['Balance', 'Escape Artist', 'Ride', 'Sleight of Hand', 'Tumble', 'Stealth']]
    + [
        div({'class': 'attribute-ability-separator'}, ''),
        labeled_dual_input('Ability', 'dexterity-ability-name', 'dexterity-ability-value'),
        labeled_dual_input('Ability', 'dexterity-ability-name', 'dexterity-ability-value'),
    ])

def constitution_card():
    return attribute_header('Constitution', 'CON')

def intelligence_card():
    return attribute_header('Intelligence', 'INT')

def perception_card():
    return attribute_header('Perception', 'PER')

def willpower_card():
    return attribute_header('Willpower', 'WIL')

def attribute_header(name, shorthand):
    return div({'class': 'attribute-header labeled_number_input'}, [
        span({'class': 'attribute-name number-label'}, name),
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
    return ''

def conditional_effects():
    return ''

def attacks():
    return ''

def row(column_count, contents):
    return div(
        {'class': 'sheet-{0}colrow'.format(column_count)},
        [col(stuff) for stuff in contents]
    )

def col(contents):
    return div(
        {'class': 'my-col'},
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
