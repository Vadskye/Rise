#!/usr/bin/env python3

import rise.latex_generation.gen_apparel as gen_apparel
import rise.latex_generation.gen_implements as gen_implements
import rise.latex_generation.gen_maneuvers as gen_maneuvers
import rise.latex_generation.gen_spell_descriptions as gen_spell_descriptions
import rise.latex_generation.gen_spell_lists as gen_spell_lists
import rise.latex_generation.gen_tools as gen_tools
import rise.latex_generation.gen_weapons as gen_weapons
import rise.latex_generation.monsters as monsters


def main():
    gen_apparel.write_to_file()
    gen_implements.write_to_file()
    gen_maneuvers.write_to_file()
    gen_spell_descriptions.write_to_file()
    gen_spell_lists.write_to_file()
    gen_tools.write_to_file()
    gen_weapons.write_to_file()
    monsters.write_to_file()


if __name__ == "__main__":
    main()
