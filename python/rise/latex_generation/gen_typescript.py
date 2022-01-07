#!/usr/bin/env python3

from rise.statistics.rise_data import maneuver_sources
from rise.latex_generation.gen_spell_descriptions import generate_mystic_spheres
from rise.latex_generation.gen_maneuvers import generate_maneuvers, group_by_source
from rise.latex_generation.book_path import book_path


def main():
    mystic_spheres = generate_mystic_spheres()
    for sphere in mystic_spheres:
        sphere_typescript = sphere.generate_typescript()
        with open(
            book_path(f"typescript/{sphere.name.lower()}.ts"), "w"
        ) as sphere_file:
            sphere_file.write(sphere_typescript)

    maneuvers = generate_maneuvers()
    with open(book_path(f"typescript/maneuvers.ts"), "w") as maneuver_file:
        for maneuver in maneuvers:
            maneuver_typescript = maneuver.generate_typescript()
            maneuver_file.write(maneuver_typescript)


if __name__ == "__main__":
    main()
