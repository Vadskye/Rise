#!/usr/bin/env python3
from rise.statistics.sample_creatures import get_sample_creatures


import click
import re

@click.command()
@click.option('-g', '--grep', default=None)
def main(grep):
    test_samples = get_sample_creatures()['tests']

    sample_keys = sorted(test_samples.keys())
    if grep:
        sample_keys = list(filter(lambda key: re.search(grep, key), sample_keys))

    for key in sample_keys:
        print(key, test_samples[key])
        print()


if __name__ == "__main__":
    main()
