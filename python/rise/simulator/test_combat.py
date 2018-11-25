#!/usr/bin/env python3

import click
from copy import copy
import re
from rise.simulator.run_combat import run_combat
from rise.statistics.sample_creatures import get_sample_creatures, parse_creature

def format_combat_results(results):
    return f"{results['blue_time_to_kill']} vs {results['red_time_to_kill']} rounds, total {results['round_count']}."


def output_combat(sample_info, blue_text, red_text):
    blue = parse_creature(sample_info, blue_text)
    red = parse_creature(sample_info, red_text)

    combat_results = run_combat(blue, red)
    print(f"'{blue_text}' vs '{red_text}': {combat_results['winner']}"
          + f"\n    {format_combat_results(combat_results)}")

@click.command()
@click.option('-b', '--blue-grep', default=None)
@click.option('-g', '--grep', default=None)
@click.option('-l', '--levels', default=None)
@click.option('-m', '--modifiers', default=None)
@click.option('-r', '--red-grep', default=None)
def main(blue_grep, grep, levels, modifiers, red_grep):
    sample_info = get_sample_creatures()

    blue_text = (blue_grep or grep) + (f" {modifiers}" if modifiers else "")
    red_text = (red_grep or grep) + (f" {modifiers}" if modifiers else "")

    if levels:
        if levels == 'all':
            levels = ' '.join(str(n) for n in range(1, 21))
        if levels == 'odd':
            levels = ' '.join(str(n) for n in range(1, 21, 2))
        if levels == 'even':
            levels = ' '.join(str(n) for n in range(2, 21, 2))
        if levels == 'std':
            levels = ' '.join(str(n) for n in range(2, 21, 5))
        for level in sorted(int(n) for n in levels.split(' ')):
            leveled_blue_text = blue_text + f" l{level}"
            leveled_red_text = red_text + f" l{level}"
            output_combat(sample_info, leveled_blue_text, leveled_red_text)
    else:
        output_combat(sample_info, blue_text, red_text)


if __name__ == "__main__":
    main()
