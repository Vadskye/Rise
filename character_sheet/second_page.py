from cgi_simple import *

from sheet_data import ATTRIBUTES, DEFENSES, ATTRIBUTE_SKILLS

def create_page():
    return flex_col({'id': 'level-chart'}, [
        level_chart_header(),
        ''.join([level_row(level) for level in range(1,21)]),
    ])

def level_chart_header():
    return flex_row({'id': 'level-chart-header', 'class': 'level-row'}, [
        span({'id': 'level-number-header'}, 'Level'),
        span({'id': 'level-attributes-header'}, 'Attribute Bonuses'),
        span({'id': 'level-abilities-header'}, 'Abilities'),
    ])

def level_row(level):
    return flex_row({'class': 'level-row'}, [
        span({'class': 'level-number'}, str(level)),
        text_input({'class': 'level-attributes'}),
        text_input({'class': 'level-abilities'}),
    ])
