from cgi_simple import (
    div, ensure_valid_attributes_and_contents, flex_col, flex_row, flex_wrapper,
    labeled_text_input, text_input,
)

def create_page():
    return flex_row({'class': 'third-page'}, [
        flex_col({'class': 'sidebar'}, [
            basic_info(),
            archetypes(),
            feats_summary(),
            inventory(),
        ]),
        flex_col({'class': 'main-body'}, [
            equipment(),
            abilities_summary(),
            personality(),
        ]),
    ])

def basic_info():
    return flex_col({'class': 'basic-info'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Basic Info')),
        labeled_text_input('Species', input_attributes={'name': f'species'}),
        labeled_text_input('Class', input_attributes={'name': f'class'}),
        labeled_text_input('Armor proficiencies', input_attributes={'name': 'prof_armor'}),
        text_input({'name': 'armor_proficiencies'}),
        labeled_text_input('Weapon groups', input_attributes={'name': 'weapon_proficiencies_1'}),
        text_input({'name': 'weapon_proficiencies_2'}),
        labeled_text_input('Languages known', input_attributes={'name': 'language_proficiencies'}),
        labeled_text_input('Alignment', input_attributes={'name': f'alignment'}),
        labeled_text_input('Deity', input_attributes={'name': f'deity'}),
        labeled_text_input('Experience points', input_attributes={'name': 'experience'}),
    ])

def feats_summary():
    return flex_col({'class': 'feats-summary'}, [
        flex_row({'class': 'summary-header'}, [
            div({'class': 'summary-header-level section-header'}, 'Lvl'),
            div({'class': 'summary-header-name section-header'}, 'Feats'),
        ]),
        "".join([feat_row(i) for i in [1, 3, 6, 9]]),
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
            for i in range(10)
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
            for i in range(6)
        ],
    ])

def archetypes():
    return div({'class': 'inventory'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Archetypes')),
        *[
            text_input({'name': f"archetypes_{i}"}) for i in range(4)
        ]
    ])

def inventory():
    return div({'class': 'inventory'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Inventory')),
        *[
            text_input({'name': f"inventory_{i}"}) for i in range(9)
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
        div({'class': 'section-header'}, 'Personality and Background'),
        "".join([div(text_input({'name': f'personality_and_background_{i}'})) for i in range(5)]),
        div({'class': 'section-header goals-and-flaws'}, 'Goals and Flaws'),
        "".join([div(text_input({'name': f'goals_and_flaws_{i}'})) for i in range(2)]),
    ])
