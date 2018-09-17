#!/usr/bin/env python3

import click
import re
from rise.simulator.run_combat import run_combat
from rise.statistics.sample_creatures import get_sample_creatures

def format_combat_results(results):
    return f"{results['blue_survival_time']} vs {results['red_survival_time']} rounds, total {results['round_count']}."

@click.command()
@click.option('-b', '--blue-grep', default=None)
@click.option('-g', '--grep', default=None)
@click.option('-r', '--red-grep', default=None)
def main(blue_grep, grep, red_grep):
    test_samples = get_sample_creatures()['tests']

    sample_keys = sorted(test_samples.keys())
    if grep:
        sample_keys = list(filter(lambda key: re.match(grep, key), sample_keys))

    for i, blue_key in enumerate(sample_keys):
        if blue_grep and not re.match(blue_grep, blue_key):
            continue
        blue = test_samples[blue_key]
        for red_key in sample_keys[i:]:
            if red_grep and not re.match(red_grep, red_key):
                continue
            red = test_samples[red_key]
            if blue.level == red.level:
                combat_results = run_combat(blue, red)
                print(f"'{blue_key}' vs '{red_key}': {combat_results['winner']}"
                      + f"\n    {format_combat_results(combat_results)}")


if __name__ == "__main__":
    main()
