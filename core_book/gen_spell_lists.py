#!/usr/bin/env python3

import click
from gen_spell_descriptions import generate_spells
from generation.rise_data import spell_sources
from generation.util import latexify
from gen_ritual_descriptions import generate_rituals

def by_source(spells):
    spells_by_source = {source: [] for source in spell_sources}
    for spell in spells:
        for source in spell_sources:
            if source in spell.lists:
                spells_by_source[source].append(spell)
    return spells_by_source


def latex_for_source(source, spells, rituals):
    spell_headers = []
    for spell in sorted(spells, key=lambda s: s.name):
        spell_headers.append(f"\\spellhead<{spell.name}> {spell.short_description}")

    ritual_headers = []
    # Sort by base_level as primary, name as secondary
    for ritual in sorted(sorted(rituals, key=lambda s: s.name), key=lambda s: s.base_level):
        ritual_headers.append(
            f"\\spellhead[{ritual.base_level}]<{ritual.name}> {ritual.short_description}"
        )

    spell_latex = "\n".join(spell_headers)
    ritual_latex = "\n".join(ritual_headers)
    return f"""
        \\small
        \\section<{source} Magic>\\label<{source} Magic>
            \\subsection<{source} Spells>\\label<{source} Spells>
                \\begin<spelllist>
                    {spell_latex}
                \\end<spelllist>
            \\subsection<{source} Rituals>\\label<{source} Rituals>
                \\begin<spelllist>
                    {ritual_latex}
                \\end<spelllist>

    """


def generate_spell_lists():
    spells = generate_spells()
    spells_by_source = by_source(spells)
    rituals = generate_rituals()
    rituals_by_source = by_source(rituals)

    return latexify(
        "\n\n".join([
            latex_for_source(source, spells_by_source[source], rituals_by_source[source])
            for source in spell_sources
        ])
    )


@click.command()
@click.option('-o', '--output')
def main(output):
    if output is None:
        print(generate_spell_lists())
    else:
        with open(output, 'w') as of:
            of.write(generate_spell_lists())


if __name__ == "__main__":
    main()
