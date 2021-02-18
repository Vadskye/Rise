from cgi_simple import (
    div, fieldset, equation, flex_col, flex_row, flex_wrapper, labeled_text_input, minus, number_input,
    plus, span, text_input, underlabel, checkbox
)
from sheet_worker import standard_damage_at_power

def create_page():
    return flex_col({'class': 'page reference-page'}, [
        standard_damage()
    ])

def standard_damage():
    return flex_col({'class': 'standard-damage'}, [
        div({'class': 'section-header'}, 'Dice Pools'),
        flex_row({'class': 'damage-chart'}, [
            flex_col([
                div({'class': 'header'}, 'Damage'),
                "".join([
                    div(standard_damage_at_power(i))
                    for i in range(-4, 25, 2)
                ]),
            ])
        ])
    ])
