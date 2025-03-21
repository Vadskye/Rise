from sheet_data import ATTRIBUTES, ATTRIBUTE_SKILLS
import re

def generate_script():
    with open("../typescript/src/character_sheet/sheet_worker.js") as file:
        lines = file.readlines()
        return "".join([
            '<script type="text/worker">',
            *lines,
            '</script>',
            '',
        ])

def standard_damage_at_power(power):
    return {
        "-4": "1d3",
        "-2": "1d4",
        "0": "1d6",
        "2": "1d8",
        "4": "1d10",
        "6": "2d6",
        "8": "1d8+1d6",
        "10": "1d10+1d6",
        "12": "3d6",
        "14": "1d8+2d6",
        "16": "1d10+2d6",
        "18": "4d6",
        "20": "1d8+3d6",
        "22": "1d10+3d6",
        "24": "5d6",
    }[str(power)]
