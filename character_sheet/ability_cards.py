from cgi_simple import div, equation, flex_col, flex_row, labeled_text_input, number_input, plus, this_or_that, underlabel

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
                    underlabel('Level', number_input()),
                    underlabel('Attr', number_input()),
                ]),
                plus(),
                underlabel('Misc', number_input({'class': 'equation-misc'})),
            ]),
        ]),
        flex_row([
            div({'class': 'calc-header'}, 'Concentration'),
            equation([
                this_or_that([
                    underlabel('Level', number_input()),
                    underlabel('Con', number_input()),
                    underlabel('Wil', number_input()),
                ]),
                plus(),
                underlabel('Misc', number_input({'class': 'equation-misc'})),
            ]),
        ]),
    ])

def ability_card():
    return flex_col({'class': 'ability-card'}, [
        flex_row({'class': 'card-header'}, [
            labeled_text_input(
                'Name',
                attributes={'class': 'ability-name-container'},
                input_attributes={'name': 'ability-name'},
            ),
            labeled_text_input(
                'Action',
                attributes={'class': 'ability-action-container'},
                input_attributes={'name': 'ability-action'},
            ),
            labeled_text_input(
                'Ability Type',
                attributes={'class': 'ability-type-container'},
                input_attributes={'name': 'ability-type'},
            ),
        ]),
        flex_row({'class': 'card-targeting'}, [
            labeled_text_input(
                'Targets',
                attributes={'class': 'ability-targets-container'},
                input_attributes={'name': 'ability-targets'},
            ),
            labeled_text_input(
                'Range',
                attributes={'class': 'ability-range-container'},
                input_attributes={'name': 'ability-range'},
            ),
        ]),
        div({'class': 'card-effect-separator'}),
        div({'class': 'ability-effect'}),
        div({'class': 'card-subeffect-separator'}),
        div({'class': 'ability-subeffect'}),
    ])
