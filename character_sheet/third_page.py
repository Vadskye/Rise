from cgi_simple import *

from sheet_data import ATTRIBUTES, DEFENSES, ATTRIBUTE_SKILLS

def create_page():
    return flex_row({'class': 'third-page'}, [
        flex_col({'class': 'sidebar'}, [
            feats_summary(),
            abilities_summary(),
            proficiencies(),
            flex_col([
                flex_wrapper(div({'class': 'section-header'}, 'Experience')),
                div(text_input()),
            ]),
            flex_col([
                flex_wrapper(div({'class': 'section-header'}, 'Wealth')),
                div(text_input()),
            ]),
        ]),
        flex_col({'class': 'main-body'}, [
            equipment(),
            inventory(),
            adventuring(),
            description(),
        ]),
    ])

def feats_summary():
    return flex_col({'class': 'feats-summary'}, [
        flex_row({'class': 'summary-header'}, [
            div({'class': 'summary-header-level section-header'}, 'Lvl'),
            div({'class': 'summary-header-name section-header'}, 'Feats'),
        ]),
        "".join([summary_row(i) for i in [1, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19]]),
    ])

def abilities_summary():
    return flex_col({'class': 'abilities-summary'}, [
        flex_row({'class': 'summary-header'}, [
            div({'class': 'summary-header-level section-header'}, 'Lvl'),
            div({'class': 'summary-header-name section-header'}, 'Abilities'),
        ]),
        "".join([summary_row() for i in range(1, 16)]),
    ])

def summary_row(level = None):
    return flex_row({'class': 'summary-row'}, [
        div({'class': 'summary-row-level'}, text_input({
            'value': level,
        })),
        div({'class': 'summary-row-name'}, text_input()),
    ])

def proficiencies():
    return flex_col({'class': 'proficiencies'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Proficiencies')),
        labeled_text_input('Armor', 'prof-armor'),
        labeled_text_input('Weapons', 'prof-weapons'),
        labeled_text_input('Languages', 'prof-languages'),
    ])

def subsection_header(attributes = None, contents = None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)
    attributes['class'] = 'subsection-header ' + attributes.get('class', '')
    return flex_col(attributes, contents)

def equipment():
    return flex_col({'class': 'equipment'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Equipment')),
        flex_row({'class': 'armor'}, [
            subsection_header('Armor'),
            labeled_text_input('Name', 'armor-name', {'class': 'equipment-name'}),
            underlabeled_number_input('Bonus', 'armor-bonus'),
            underlabeled_number_input('Encumb', 'armor-encumb'),
            labeled_text_input('Special', 'armor-special', {'class': 'equipment-special'}),
        ]),
        flex_row({'class': 'shield'}, [
            subsection_header('Shield'),
            labeled_text_input('Name', 'shield-name', {'class': 'equipment-name'}),
            underlabeled_number_input('Bonus', 'shield-bonus'),
            underlabeled_number_input('Encumb', 'shield-encumb'),
            labeled_text_input('Special', 'shield-special', {'class': 'equipment-special'}),
        ]),
        misc_equipment('Weapon'),
        misc_equipment('Weapon'),
        misc_equipment('Arms'),
        misc_equipment('Head'),
        misc_equipment('Legs'),
        misc_equipment('Torso', 'torso1'),
        misc_equipment('Torso', 'torso2'),
        misc_equipment('Ring', 'ring1'),
        misc_equipment('Ring', 'ring2'),
    ])

def inventory():
    return div({'class': 'inventory'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Inventory')),
        flex_row({'class': 'inventory-items'}, [
            inventory_col(),
            inventory_col(),
        ]),
    ])

def inventory_col():
    return flex_col({'class': 'inventory-col'}, [
        text_input() for i in range(6)
    ])

def misc_equipment(body_slot, body_slot_html = None):
    if body_slot_html is None:
        body_slot_html = body_slot.lower()
    return flex_row({'class': body_slot_html}, [
        subsection_header(body_slot),
        labeled_text_input('Name', body_slot_html + '-name', {'class': 'equipment-name'}),
        labeled_text_input('Special', body_slot_html + '-special', {'class': 'equipment-special'}),
    ])

def adventuring():
    return flex_row({'class': 'adventuring'}, [
        flex_col({'class': 'misc'}, [
            flex_wrapper(div({'class': 'section-header'}, 'Weight Limits')),
            flex_row({'class': 'weight-limits'}, [
                labeled_text_input('Normal', 'weight-normal'),
                labeled_text_input('Overloaded', 'weight-overloaded'),
                labeled_text_input('Max', 'weight-max'),
                labeled_text_input('Push/Drag', 'weight-push-drag'),
            ]),
            flex_row({'class': 'wealth-and-xp'}, [
            ]),
        ]),
    ])

def description():
    return flex_col({'class': 'description'}, [
        div({'class': 'section-header'}, 'Personality and Description'),
        "".join([
            div({'class': 'description-row'}, text_input()) for i in range(8)
        ]),
    ])
