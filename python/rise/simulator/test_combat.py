#!/usr/bin/env python3

import click
import re
from rise.simulator.run_combat import run_combat
from rise.statistics.sample_creatures import get_sample_creatures

def format_combat_results(results):
    return f"{results['blue_time_to_kill']} vs {results['red_time_to_kill']} rounds, total {results['round_count']}."

@click.command()
@click.option('-b', '--blue-grep', default=None)
@click.option('-g', '--grep', default=None)
@click.option('-m', '--mix-levels/--no-mix-levels', default=False)
@click.option('-r', '--red-grep', default=None)
def main(blue_grep, grep, mix_levels, red_grep):
    test_samples = get_sample_creatures()['tests']

    sample_keys = sorted(test_samples.keys())
    if grep:
        sample_keys = list(filter(lambda key: re.search(grep, key), sample_keys))

    blue_keys = sample_keys
    if blue_grep:
        blue_keys = list(filter(lambda key: re.search(blue_grep, key), blue_keys))

    red_keys = sample_keys
    if red_grep:
        red_keys = list(filter(lambda key: re.search(red_grep, key), red_keys))

    for blue_key in blue_keys:
        blue = test_samples[blue_key]
        for red_key in red_keys:
            red = test_samples[red_key]
            # We normally want to avoid having fights across different levels.
            if blue.level == red.level or mix_levels:
                combat_results = run_combat(blue, red)
                print(f"'{blue_key}' vs '{red_key}': {combat_results['winner']}"
                      + f"\n    {format_combat_results(combat_results)}")


if __name__ == "__main__":
    main()
