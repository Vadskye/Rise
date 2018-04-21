from cgi_simple import div, equation, flex_col, flex_row, labeled_text_input, plus, this_or_that, underlabeled_number_input

def create_page():
    return flex_col([
        abilities_overview(),
        "".join([
            flex_row([
                ability_card(),
                ability_card(),
            ]),
        ] * 3),
    ])

def abilities_overview():
    return flex_row({'class': 'abilities-overview'}, [
        flex_row({'class': 'power-container'}, [
            div({'class': 'calc-header'}, 'Power'),
            equation([
                this_or_that([
                    underlabeled_number_input('Level'),
                    underlabeled_number_input('Attr'),
                ]),
                plus(),
                underlabeled_number_input('Misc', attributes={'class': 'eq-optional'}),
            ]),
        ]),
        flex_row([
            div({'class': 'calc-header'}, 'Concentration'),
            equation([
                this_or_that([
                    underlabeled_number_input('Level'),
                    underlabeled_number_input('Con'),
                    underlabeled_number_input('Wil'),
                ]),
                plus(),
                underlabeled_number_input('Misc', attributes={'class': 'eq-optional'}),
            ]),
        ]),
    ])

def ability_card():
    return flex_col({'class': 'ability-card'}, [
        flex_row({'class': 'card-header'}, [
            labeled_text_input('Name', 'ability-name',
                               attributes={'class': 'ability-name-container'}
                               ),
            labeled_text_input('Action', 'ability-action',
                               attributes={'class': 'ability-action-container'}
                               ),
            labeled_text_input('Ability Type', 'ability-type',
                               attributes={'class': 'ability-type-container'}
                               ),
        ]),
        flex_row({'class': 'card-targeting'}, [
            labeled_text_input('Targets', 'ability-targets',
                               attributes={'class': 'ability-targets-container'}
                               ),
            labeled_text_input('Range', 'ability-range',
                               attributes={'class': 'ability-range-container'}
                               ),
        ]),
        div({'class': 'card-effect-separator'}),
        div({'class': 'ability-effect'}),
        div({'class': 'card-subeffect-separator'}),
        div({'class': 'ability-subeffect'}),
    ])
