#!/usr/bin/env python3

import click
from rise.latex_generation.mystic_spheres.aeromancy import aeromancy
from rise.latex_generation.mystic_spheres.aquamancy import aquamancy
from rise.latex_generation.mystic_spheres.astromancy import astromancy
from rise.latex_generation.mystic_spheres.barrier import barrier
from rise.latex_generation.mystic_spheres.bless import bless
from rise.latex_generation.mystic_spheres.channel_divinity import channel_divinity
from rise.latex_generation.mystic_spheres.chronomancy import chronomancy
from rise.latex_generation.mystic_spheres.cryomancy import cryomancy
from rise.latex_generation.mystic_spheres.enchantment import enchantment
from rise.latex_generation.mystic_spheres.electromancy import electromancy
from rise.latex_generation.mystic_spheres.fabrication import fabrication
from rise.latex_generation.mystic_spheres.photomancy import photomancy
from rise.latex_generation.mystic_spheres.polymorph import polymorph
from rise.latex_generation.mystic_spheres.pyromancy import pyromancy
from rise.latex_generation.mystic_spheres.revelation import revelation
from rise.latex_generation.mystic_spheres.summon import summon
from rise.latex_generation.mystic_spheres.telekinesis import telekinesis
from rise.latex_generation.mystic_spheres.terramancy import terramancy
from rise.latex_generation.mystic_spheres.thaumaturgy import thaumaturgy
from rise.latex_generation.mystic_spheres.toxicology import toxicology
from rise.latex_generation.mystic_spheres.umbramancy import umbramancy
from rise.latex_generation.mystic_spheres.verdamancy import verdamancy
from rise.latex_generation.mystic_spheres.vivimancy import vivimancy
from rise.latex_generation.book_path import book_path
from rise.latex.util import latexify
import rise.statistics.rise_data as rise_data
from logging import getLogger, WARNING

# from pprint import pformat
logger = getLogger(__name__)


def log(*args):
    logger.log(*args)


def warn(*args):
    logger.log(WARNING, *args)


def generate_mystic_spheres():
    mystic_spheres = []

    mystic_spheres.append(aeromancy)
    mystic_spheres.append(aquamancy)
    mystic_spheres.append(astromancy)
    mystic_spheres.append(barrier)
    mystic_spheres.append(bless)
    mystic_spheres.append(channel_divinity)
    mystic_spheres.append(chronomancy)
    mystic_spheres.append(cryomancy)
    mystic_spheres.append(electromancy)
    mystic_spheres.append(enchantment)
    mystic_spheres.append(fabrication)
    mystic_spheres.append(photomancy)
    mystic_spheres.append(polymorph)
    mystic_spheres.append(pyromancy)
    mystic_spheres.append(revelation)
    mystic_spheres.append(summon)
    mystic_spheres.append(telekinesis)
    mystic_spheres.append(terramancy)
    mystic_spheres.append(thaumaturgy)
    mystic_spheres.append(toxicology)
    mystic_spheres.append(umbramancy)
    mystic_spheres.append(verdamancy)
    mystic_spheres.append(vivimancy)

    return sorted(mystic_spheres, key=lambda m: m.name)


def sanity_check(mystic_spheres):
    sphere_spells_by_rank = {}
    # Make sure that each sphere has reasonable spell counts
    for sphere in mystic_spheres:
        spells_by_rank = {}
        for spell in sphere.spells:
            spells_by_rank[spell.level] = spells_by_rank.get(spell.level, 0) + 1
        sphere_spells_by_rank[sphere.name] = spells_by_rank

    def spell_count(sphere_name):
        return sum(sphere_spells_by_rank[sphere_name].values())

    sphere_names = sorted(sphere_spells_by_rank.keys(), key=spell_count)
    sphere_names.reverse()
    for sphere_name in sphere_names:
        print(f"{sphere_name}: {spell_count(sphere_name)}")
        rank_texts = [
            f"{sphere_spells_by_rank[sphere_name].get(rank, 0)}"
            for rank in [1, 2, 3, 4, 5, 6, 7, 8]
        ]
        print(f"  {' | '.join(rank_texts)}")


def generate_mystic_sphere_latex(check=False):
    mystic_spheres = generate_mystic_spheres()
    if check:
        sanity_check(mystic_spheres)
    mystic_sphere_texts = []
    for mystic_sphere in mystic_spheres:
        try:
            mystic_sphere_texts.append(mystic_sphere.to_latex())
        except Exception as e:
            raise Exception(
                f"Error converting mystic sphere '{mystic_sphere.name}' to LaTeX"
            ) from e
    return latexify("\n\\newpage".join(mystic_sphere_texts))


def write_to_file(check=None):
    mystic_sphere_latex = generate_mystic_sphere_latex(check)
    with open(
        book_path("mystic_sphere_descriptions.tex"), "w"
    ) as mystic_sphere_descriptions_file:
        mystic_sphere_descriptions_file.write(mystic_sphere_latex)


@click.command()
@click.option("-c", "--check/--no-check", default=False)
@click.option("-o", "--output/--no-output", default=False)
def main(output, check):
    if output:
        write_to_file(check)
    else:
        print(generate_mystic_sphere_latex(check))


if __name__ == "__main__":
    main()
