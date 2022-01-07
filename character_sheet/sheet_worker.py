from sheet_data import ATTRIBUTES, ATTRIBUTE_SKILLS
import re

def generate_script():
    with open("./sheet_worker.js") as file:
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
        "8": "2d8",
        "10": "2d10",
        "12": "4d6",
        "14": "4d8",
        "16": "4d10",
        "18": "5d10",
        "20": "6d10",
        "22": "7d10",
        "24": "8d10",
    }[str(power)]
