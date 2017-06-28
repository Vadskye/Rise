#!/usr/bin/env python3

import click
from gen_spell_descriptions import DOMAINS, generate_spells, latexify, SPELL_SOURCES

def spells_by_source(spells):
    spells_by_source = {source: [] for source in SPELL_SOURCES}
    for spell in spells:
        for source in SPELL_SOURCES:
            if source in spell.lists:
                spells_by_source[source].append(spell)
    return spells_by_source


def spells_by_domain(spells):
    by_domain = {}
    for spell in spells:
        for domain in DOMAINS:
            if domain in spell.lists:
                if (domain in by_domain):
                    print(f"Domain {domain} has too many spells")
                by_domain[domain] = spell
    return by_domain

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


def latex_for_domains(spells):
    by_domain = spells_by_domain(spells)
    domain_spell_headers = []
    for domain in sorted(DOMAINS):
        spell = by_domain.get(domain, None)
        if spell is None:
            domain_spell_headers.append(f"\\item {domain} -- \\spellhead*<missing> \\tdash")
        else:
            domain_spell_headers.append(f"\\item {domain} -- \\spellhead*<{spell.name}> {spell.short_description}")
    domain_spell_latex = "\n".join(domain_spell_headers)
    return f"""
        \\subsection<Domain Spells>\\label<Domain Spells>
        \\begin<spelllist>
            {domain_spell_latex}
        \\end<spelllist>
    """


def generate_spell_lists(spells):
    by_source = spells_by_source(spells)

    return latexify(
        "\n\n".join([
            latex_for_source('Arcane', by_source['Arcane']),
            latex_for_source('Divine', by_source['Divine']),
            latex_for_domains(spells),
            latex_for_source('Nature', by_source['Nature']),
        ])
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
