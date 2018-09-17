#!/usr/bin/env python3
from rise.simulator.run_combat import run_combat
from rise.statistics.sample_creatures import get_sample_creatures

def main():
    test_samples = get_sample_creatures()['tests']

    for key in test_samples:
        combat_results = run_combat(test_samples[key], test_samples[key])
        print(key, combat_results)
        print()


if __name__ == "__main__":
    main()
