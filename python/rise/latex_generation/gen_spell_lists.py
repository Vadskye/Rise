#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex_generation.gen_spell_descriptions import generate_mystic_spheres
from rise.latex.util import latexify
from rise.statistics.rise_data import mystic_sphere_sources


def by_source(mystic_spheres):
    mystic_spheres_by_source = {source: [] for source in mystic_sphere_sources}
    for mystic_sphere in mystic_spheres:
        for source in mystic_sphere_sources:
            if source in mystic_sphere.lists:
                mystic_spheres_by_source[source].append(mystic_sphere)
    return mystic_spheres_by_source


def latex_for_source(source, mystic_spheres):
    mystic_sphere_headers = []
    for mystic_sphere in sorted(mystic_spheres, key=lambda s: s.name):
        mystic_sphere_headers.append(
            f"\\spellhead<{mystic_sphere.name}> {mystic_sphere.short_description}."
        )

    mystic_sphere_list = "\n".join(mystic_sphere_headers)
    return f"""
        \\small
        \\subsection<{source} Magic>\\label<{source} Magic>
            \\subsubsection<{source} Mystic Spheres>\\label<{source} Mystic Spheres>
                \\begin<spelllist>
                    {mystic_sphere_list}
                \\end<spelllist>
    """


def generate_mystic_sphere_lists():
    mystic_spheres = generate_mystic_spheres()
    mystic_spheres_by_source = by_source(mystic_spheres)

    return latexify(
        "\n\n".join(
            [
                latex_for_source(source, mystic_spheres_by_source[source])
                for source in mystic_sphere_sources
            ]
        )
    )


def write_to_file():
    mystic_sphere_lists = generate_mystic_sphere_lists()
    with open(book_path("mystic_sphere_lists.tex"), "w") as mystic_sphere_lists_file:
        mystic_sphere_lists_file.write(mystic_sphere_lists)


@click.command()
@click.option("-o", "--output/--no-output", default=False)
def main(output):
    if output:
        write_to_file()
    else:
        print(generate_mystic_sphere_lists())


if __name__ == "__main__":
    main()
