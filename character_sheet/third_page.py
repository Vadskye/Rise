from cgi_simple import *

from sheet_data import ATTRIBUTES, DEFENSES, ATTRIBUTE_SKILLS

def create_page():
    return flex_col([
        equipment(),
        inventory(),
        adventuring(),
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
            underlabeled_number_input('Check penalty', 'armor-check'),
            labeled_text_input('Special', 'armor-special', {'class': 'equipment-special'}),
        ]),
        flex_row({'class': 'shield'}, [
            subsection_header('Shield'),
            labeled_text_input('Name', 'shield-name', {'class': 'equipment-name'}),
            underlabeled_number_input('Bonus', 'shield-bonus'),
            underlabeled_number_input('Check penalty', 'shield-check'),
            labeled_text_input('Special', 'shield-special', {'class': 'equipment-special'}),
        ]),
        misc_equipment('Arms'),
        misc_equipment('Head'),
        misc_equipment('Legs'),
        misc_equipment('Torso', 'torso1'),
        misc_equipment('Torso', 'torso2'),
        misc_equipment('Ring', 'ring1'),
        misc_equipment('Ring', 'ring2'),
    ])

def inventory():
    return div({'id': 'inventory'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Other Items')),
        flex_row({'id': 'inventory-items'}, [
            inventory_col(),
            inventory_col(),
        ]),
    ])

def inventory_col():
    return flex_col({'class': 'inventory-col'}, [
        text_input(),
    ] * 8)

def misc_equipment(body_slot, body_slot_html = None):
    if body_slot_html is None:
        body_slot_html = body_slot.lower()
    return flex_row({'class': body_slot_html}, [
        subsection_header(body_slot),
        labeled_text_input('Name', body_slot_html + '-name', {'class': 'equipment-name'}),
        labeled_text_input('Special', body_slot_html + '-special', {'class': 'equipment-special'}),
    ])

def adventuring():
    return flex_row({'id': 'adventuring'}, [
        flex_col({'id': 'proficiencies'}, [
            flex_wrapper(div({'class': 'section-header'}, 'Proficiencies')),
            labeled_text_input('Armor', 'prof-armor'),
            labeled_text_input('Weapons', 'prof-weapons'),
            labeled_text_input('Languages', 'prof-languages'),
        ]),
        flex_col({'id': 'misc'}, [
            flex_wrapper(div({'class': 'section-header'}, 'Weight Limits')),
            flex_row({'id': 'weight-limits'}, [
                labeled_text_input('Normal', 'weight-normal'),
                labeled_text_input('Overloaded', 'weight-overloaded'),
                labeled_text_input('Max', 'weight-max'),
                labeled_text_input('Push/Drag', 'weight-push-drag'),
            ]),
            flex_row({'id': 'wealth-and-xp'}, [
                flex_col([
                    flex_wrapper(div({'class': 'section-header'}, 'Wealth')),
                    div(text_input()),
                ]),
                flex_col([
                    flex_wrapper(div({'class': 'section-header'}, 'Experience')),
                    div(text_input()),
                ]),
            ]),
        ]),
    ])
