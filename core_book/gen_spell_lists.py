#!/usr/bin/env python3

import click
from gen_spell_descriptions import generate_spells, latexify, SPELL_SOURCES

def spells_by_source(spells):
    spells_by_source = {source: [] for source in SPELL_SOURCES}
    for spell in spells:
        for source in SPELL_SOURCES:
            if source in spell.lists:
                spells_by_source[source].append(spell)
    return spells_by_source


def latex_for_source(source, spells):
    spell_headers = []
    for spell in sorted(spells, key=lambda s: s.name):
        spell_headers.append(f"\\spellhead<{spell.name}> {spell.short_description}")

    spell_latex = "\n".join(spell_headers)

    return f"""
        \\small
        \\section<{source} Magic>\\label<{source} Magic>
            \\subsection<{source} Spells>\\label<{source} Spells>
            \\begin<spelllist>
                {spell_latex}
            \\end<spelllist>
    """


def generate_spell_lists(spells):
    by_source = spells_by_source(spells)

    return latexify(
        "\n\n".join(
            [latex_for_source(source, by_source[source])
             for source in SPELL_SOURCES]
        )
    )


@click.command()
@click.option('-o', '--output')
def main(output):
    spells = generate_spells()
    if output is None:
        print(generate_spell_lists(spells))
    else:
        with open(output, 'w') as of:
            of.write(generate_spell_lists(spells))


if __name__ == "__main__":
    main()
