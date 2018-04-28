from cgi_simple import (
    div, ensure_valid_attributes_and_contents, flex_col, flex_row, flex_wrapper,
    labeled_text_input, text_input,
)

def create_page():
    return flex_row({'class': 'third-page'}, [
        flex_col({'class': 'sidebar'}, [
            feats_summary(),
            proficiencies(),
            inventory(),
            flex_col([
                flex_wrapper(div({'class': 'section-header'}, 'Experience')),
                div(text_input({'name': 'experience'})),
            ]),
            flex_col([
                flex_wrapper(div({'class': 'section-header'}, 'Wealth')),
                div(text_input({'name': 'wealth'})),
            ]),
        ]),
        flex_col({'class': 'main-body'}, [
            equipment(),
            abilities_summary(),
            personality(),
        ]),
    ])

def feats_summary():
    return flex_col({'class': 'feats-summary'}, [
        flex_row({'class': 'summary-header'}, [
            div({'class': 'summary-header-level section-header'}, 'Lvl'),
            div({'class': 'summary-header-name section-header'}, 'Feats'),
        ]),
        "".join([feat_row(i) for i in [1, 2, 5, 9]]),
    ])

def abilities_summary():
    return flex_col({'class': 'abilities'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Abilities')),
        *[
            flex_row([
                labeled_text_input('Name', {'class': 'ability-name'}, input_attributes={
                    'name': f'ability_name_{i}',
                }),
                labeled_text_input('Effects', {'class': 'ability-effects'}, input_attributes={
                    'name': f'ability_effects_{i}',
                }),
            ])
            for i in range(9)
        ],
    ])

def feat_row(level):
    return flex_row({'class': 'summary-row'}, [
        div({'class': 'summary-row-level'}, text_input({
            'disabled': True,
            'name': f"feat_level_{level}",
            'value': level,
        })),
        div({'class': 'summary-row-name'}, text_input({'name': f"feat_name_{level}"})),
    ])

def proficiencies():
    return flex_col({'class': 'proficiencies'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Proficiencies')),
        labeled_text_input('Armor', input_attributes={'name': 'prof_armor'}),
        text_input({'name': 'armor_proficiencies'}),
        labeled_text_input('Weapons', input_attributes={'name': 'weapon_proficiencies_1'}),
        text_input({'name': 'weapon_proficiencies_2'}),
        labeled_text_input('Languages', input_attributes={'name': 'language_proficiencies'}),
    ])

def subsection_header(attributes=None, contents=None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)
    attributes['class'] = 'subsection-header ' + attributes.get('class', '')
    return flex_col(attributes, contents)

def equipment():
    return flex_col({'class': 'equipment'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Equipment')),
        *[
            flex_row([
                labeled_text_input('Name', {'class': 'equipment-name'}, {'name': f'equipment_name_{i}'}),
                labeled_text_input('Effects', {'class': 'equipment-effects'}, {'name': f'equipment_effects_{i}'}),
            ])
            for i in range(5)
        ],
    ])

def inventory():
    return div({'class': 'inventory'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Inventory')),
        *[
            text_input({'name': f"inventory_{i}"}) for i in range(17)
        ]
    ])

def misc_equipment(body_slot, body_slot_html=None):
    if body_slot_html is None:
        body_slot_html = body_slot.lower()
    return flex_row({'class': body_slot_html}, [
        subsection_header(body_slot),
        labeled_text_input('Name', {'class': 'equipment-name'}, {'name': body_slot_html + '-name'}),
        labeled_text_input('Special', {'class': 'equipment-special'}, {'name': body_slot_html + '-special'}),
    ])

def personality():
    return flex_col({'class': 'personality'}, [
        div({'class': 'section-header'}, 'Alignment and Deity'),
        div(text_input({'name': 'alignment_and_deity'})),
        div({'class': 'section-header'}, 'Personality and Background'),
        "".join([div(text_input({'name': f'personality_and_background_{i}'})) for i in range(5)]),
        div({'class': 'section-header'}, 'Goals and Flaws'),
        "".join([div(text_input({'name': f'goals_and_flaws_{i}'})) for i in range(2)]),
    ])
