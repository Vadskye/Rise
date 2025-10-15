from sheet_data import ATTRIBUTES, ATTRIBUTE_SKILLS
import re

def generate_script():
    with open("../typescript/src/character_sheet/sheet_worker.js") as file:
        lines = file.readlines()
        return "\n".join([
            '<script type="text/worker">',
            *prune_irrelevant_lines(lines),
            'handleEverything();',
            '</script>',
            '',
        ])

# As a side effect of Typescript compilation, we add some extra junk that we
# don't want to send to roll20. Remove those here.
def prune_irrelevant_lines(lines):
    # We think we know which lines to remove. Remove them, then assert that they
    # had the correct shape, so we know if this assumption becomes out of sync
    # with the current state of sheet_worker.js.
    removed_lines = lines[0:8]
    lines = lines[8:]

    if "".join(removed_lines) != """"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEverything = handleEverything;
const roll20_shim_1 = __importDefault(require("./roll20_shim"));
const { on, getAttrs, setAttrs, getSectionIDs, generateRowID, removeRepeatingRow } = roll20_shim_1.default;
""":
        raise Exception(f"Removal did not match expectation: |{''.join(removed_lines)}|")

    return lines


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
