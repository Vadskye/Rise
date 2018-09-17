#!/usr/bin/env python3
from rise.statistics.sample_creatures import get_sample_creatures


def main():
    test_samples = get_sample_creatures()['tests']

    for key in test_samples:
        print(key, test_samples[key])
        print()


if __name__ == "__main__":
    main()
