from cgi_simple import (
    div, fieldset, equation, flex_col, flex_row, flex_wrapper, labeled_text_input, minus, number_input,
    plus, span, text_input, underlabel, checkbox
)
from sheet_worker import standard_damage_at_power

def create_page():
    return flex_row({'class': 'page reference-page'}, [
        standard_damage(),
        vital_wound_chart(),
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

def vital_wound_chart():
    return flex_col({'class': 'vital-wound-effects'}, [
        div({'class': 'section-header'}, 'Vital Wound Effects'),
        flex_row({'class': 'vital-wound-chart'}, [
            flex_col([
                div({'class': 'header'}, 'Roll'),
                "".join([div(f"{i}") for i in [*range(-1, 11), '11+']])
            ]),
            flex_col([
                div({'class': 'header'}, 'Effect'),
                "".join([
                    div(vital_roll_effect(i))
                    for i in [*range(-1, 11), '11+']
                ]),
            ])
        ])
    ])

def vital_roll_effect(roll):
    return {
        -1: 'Unconscious, die next round',
        0: 'Unconscious, die after a minute',
        1: 'Unconscious below max HP',
        2: 'Half max HP and resistances',
        3: '-2 accuracy',
        4: '-2 defenses',
        5: '-2 vital rolls',
        6: 'Half speed below max HP',
        7: 'Half max resistances',
        8: '-1 accuracy',
        9: '-1 defenses',
        10: '-1 vital rolls',
        '11+': 'No effect',
    }[roll]
