#!/usr/bin/env python3

import click
from rise.latex_generation.mystic_spheres.aeromancy import aeromancy
from rise.latex_generation.mystic_spheres.aquamancy import aquamancy
from rise.latex_generation.mystic_spheres.astromancy import astromancy
from rise.latex_generation.mystic_spheres.barrier import barrier
from rise.latex_generation.mystic_spheres.bless import bless
from rise.latex_generation.mystic_spheres.channel_divinity import channel_divinity
from rise.latex_generation.mystic_spheres.chronomancy import chronomancy
from rise.latex_generation.mystic_spheres.compel import compel
from rise.latex_generation.mystic_spheres.corruption import corruption
from rise.latex_generation.mystic_spheres.cryomancy import cryomancy
from rise.latex_generation.mystic_spheres.delusion import delusion
from rise.latex_generation.mystic_spheres.electromancy import electromancy
from rise.latex_generation.mystic_spheres.fabrication import fabrication
from rise.latex_generation.mystic_spheres.glamer import glamer
from rise.latex_generation.mystic_spheres.polymorph import polymorph
from rise.latex_generation.mystic_spheres.photomancy import photomancy
from rise.latex_generation.mystic_spheres.pyromancy import pyromancy
from rise.latex_generation.mystic_spheres.revelation import revelation
from rise.latex_generation.mystic_spheres.summon import summon
from rise.latex_generation.mystic_spheres.telekinesis import telekinesis
from rise.latex_generation.mystic_spheres.terramancy import terramancy
from rise.latex_generation.mystic_spheres.thaumaturgy import thaumaturgy
from rise.latex_generation.mystic_spheres.verdamancy import verdamancy
from rise.latex_generation.mystic_spheres.vivimancy import vivimancy
from rise.latex_generation.mystic_spheres.weaponcraft import weaponcraft
from rise.latex_generation.book_path import book_path
from rise.latex.effects import Effects
from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
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
    mystic_spheres.append(compel)
    mystic_spheres.append(corruption)
    mystic_spheres.append(cryomancy)
    mystic_spheres.append(delusion)
    mystic_spheres.append(electromancy)
    mystic_spheres.append(fabrication)
    mystic_spheres.append(glamer)
    mystic_spheres.append(polymorph)
    mystic_spheres.append(photomancy)
    mystic_spheres.append(pyromancy)
    mystic_spheres.append(revelation)
    mystic_spheres.append(summon)
    mystic_spheres.append(telekinesis)
    mystic_spheres.append(terramancy)
    mystic_spheres.append(thaumaturgy)
    mystic_spheres.append(verdamancy)
    mystic_spheres.append(vivimancy)
    mystic_spheres.append(weaponcraft)

    return sorted(mystic_spheres, key=lambda m: m.name)


def sanity_check(spells):
    # Make sure that the right kinds of spells exist

    # Every spell source should have one spell of each category
    for category in rise_data.categories:
        has_spell = {source: False for source in rise_data.spell_sources}
        for spell in spells:
            if spell.category == category:
                for source in spell.lists:
                    if source in has_spell:
                        has_spell[source] = True
        for source in rise_data.spell_sources:
            if not has_spell[source]:
                warn(f"Source {source} has no spell for {category}")

    # Every spell source should have both single target and multi damage spells
    # that target every defense
    for defense in rise_data.defenses:
        has_damage = {source: False for source in rise_data.spell_sources}
        # Every source should also have debuffs against every defense
        has_debuff = {source: False for source in rise_data.spell_sources}
        for spell in spells:
            if spell.effects.attack and spell.effects.attack.defense == defense:
                if spell.category == 'damage':
                    for source in spell.lists:
                        if source in rise_data.spell_sources:
                            has_damage[source] = True
                elif spell.category[:6] == 'debuff':
                    for source in spell.lists:
                        if source in rise_data.spell_sources:
                            has_debuff[source] = True

        for source in rise_data.spell_sources:
            if not has_damage[source]:
                warn(f"Source {source} has no damage spell against {defense}")
            if not has_debuff[source]:
                warn(f"Source {source} has no debuff spell against {defense}")


def generate_mystic_sphere_latex(check=False):
    mystic_spheres = generate_mystic_spheres()
    if check:
        sanity_check(mystic_spheres)
    mystic_sphere_texts = []
    for mystic_sphere in mystic_spheres:
        try:
            mystic_sphere_texts.append(mystic_sphere.to_latex())
        except Exception as e:
            raise Exception(f"Error converting mystic sphere '{mystic_sphere.name}' to LaTeX") from e
    return latexify('\n\\newpage'.join(mystic_sphere_texts))


def write_to_file(check=None):
    mystic_sphere_latex = generate_mystic_sphere_latex(check)
    with open(book_path('mystic_sphere_descriptions.tex'), 'w') as mystic_sphere_descriptions_file:
        mystic_sphere_descriptions_file.write(mystic_sphere_latex)


@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output/--no-output', default=False)
def main(output, check):
    if output:
        write_to_file(check)
    else:
        print(generate_mystic_sphere_latex(check))

if __name__ == "__main__":
    main()
