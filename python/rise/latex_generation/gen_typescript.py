#!/usr/bin/env python3

from rise.latex_generation.gen_spell_descriptions import generate_mystic_spheres
from rise.latex_generation.book_path import book_path

def main():
    mystic_spheres = generate_mystic_spheres()
    for sphere in mystic_spheres:
        sphere_typescript = sphere.generate_typescript()
        with open(
            book_path(f"typescript/{sphere.name.lower()}.ts"), "w"
        ) as sphere_file:
            sphere_file.write(sphere_typescript)

if __name__ == "__main__":
    main()
