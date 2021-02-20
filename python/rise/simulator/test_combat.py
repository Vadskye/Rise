#!/usr/bin/env python3

import click
from rise.simulator.run_combat import format_combat_results, run_iterated_combat
from rise.simulator.creature_parsing import parse_leveled_creature_groups


def output_combat(blue_descriptions, red_descriptions, levels=None, iterations=None):
    creature_groups = parse_leveled_creature_groups(
        blue_descriptions, red_descriptions, levels
    )
    for group in creature_groups:
        results = run_iterated_combat(group["blue"], group["red"], iterations)
        print(
            f'"{blue_descriptions}" vs "{red_descriptions}"'
            + f"\n    {format_combat_results(results)}"
        )


@click.command()
@click.option("-b", "--blue-grep", default=None)
@click.option("-g", "--grep", default=None)
@click.option("-i", "--iterations", default=None, type=int)
@click.option("-l", "--levels", default=None)
@click.option("-m", "--modifiers", default=None)
@click.option("-r", "--red-grep", default=None)
def main(blue_grep, grep, iterations, levels, modifiers, red_grep):

    blue_descriptions = (blue_grep or grep).split(", ")
    red_descriptions = (red_grep or grep).split(", ")
    if modifiers:
        blue_descriptions = [d + f" {modifiers}" for d in blue_descriptions]
        red_descriptions = [d + f" {modifiers}" for d in red_descriptions]
    output_combat(
        blue_descriptions, red_descriptions, levels=levels, iterations=iterations
    )


if __name__ == "__main__":
    main()
