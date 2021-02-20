#!/usr/bin/env python3
from rise.statistics.sample_creatures import get_sample_creatures, parse_creature


import click
import re


@click.command()
@click.option("-g", "--grep", default=None)
@click.option("-m", "--modifiers", default=None)
def main(grep, modifiers):
    sample_info = get_sample_creatures()

    sample_keys = sorted(
        list(sample_info["characters"].keys()) + list(sample_info["monsters"].keys())
    )
    if grep:
        sample_keys = list(filter(lambda key: re.search(grep, key), sample_keys))

    for key in sample_keys:
        creature = parse_creature(
            sample_info, f"{key} {modifiers}" if modifiers else key
        )
        print(key, creature)
        print()


if __name__ == "__main__":
    main()
