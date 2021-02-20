from rise.statistics.dice_pool import DicePool

d10 = DicePool(10)


def run_iterated_combat(blue_creatures, red_creatures, iterations=None):
    iterations = iterations or 200
    average_results = {
        "blue_vital_wounds": 0,
        "red_vital_wounds": 0,
        "blue_living_count": 0,
        "red_living_count": 0,
        "combat_length": 0,
        "blue win %": 0,
        "red win %": 0,
        "tie %": 0,
    }
    auto_keys = [
        "blue_vital_wounds",
        "red_vital_wounds",
        "blue_living_count",
        "red_living_count",
        "combat_length",
    ]
    for i in range(iterations):
        results = run_combat(blue_creatures, red_creatures)
        for c in blue_creatures:
            c.reset_combat()
        for c in red_creatures:
            c.reset_combat()
        for key in auto_keys:
            average_results[key] += results[key] / iterations
        if results["winner"] == "Blue":
            average_results["blue win %"] += 1 / iterations
        elif results["winner"] == "Red":
            average_results["red win %"] += 1 / iterations
        elif results["winner"] == "Tie":
            average_results["tie %"] += 1 / iterations
        else:
            raise Exception(results["winner"])

    for key in average_results.keys():
        average_results[key] = round(average_results[key], 1)
    return average_results


def run_combat(blue_creatures, red_creatures):
    """Run a combat between two creatures until one of them reaches 0.

    Args:
        blue_creatures (Creature[]): A list of creatures to fight
        red_creatures (Creature[]): A list of creatures to fight

    Yields:
        object: Unknown
    """

    total_round_count = 0

    blue_living = blue_creatures
    red_living = red_creatures

    while len(blue_living) > 0 and len(red_living) > 0:
        total_round_count += 1

        temp = resolve_attacks(red_living, blue_living)
        red_living = resolve_attacks(blue_living, red_living)
        blue_living = temp

        if total_round_count > 100:
            break

    winner = "Blue" if len(blue_living) > 0 else None
    winner = "Red" if len(red_living) > 0 else winner
    winner = winner or "Tie"

    return {
        "blue_vital_wounds": sum([c.vital_wounds for c in blue_creatures]),
        "red_vital_wounds": sum([c.vital_wounds for c in red_creatures]),
        "blue_living_count": len(blue_living),
        "red_living_count": len(red_living),
        "combat_length": total_round_count,
        "winner": winner,
    }


def resolve_attacks(attackers, defenders):
    defender = find_best_defender(attackers, defenders)
    attacks = find_best_attacks(attackers, defender)

    for attack in attacks:
        attack_result = d10.roll_explosion() + attack.accuracy
        damage = attack.damage.roll()
        if attack_result - 10 >= get_defenses(defender)[attack.defense]:
            damage += attack.damage.roll()
        if attack_result >= get_defenses(defender)[attack.defense]:
            defender.take_damage(damage)

    return get_still_living(defenders)


def get_still_living(creatures):
    return list(filter(lambda c: c.is_conscious, creatures))


def find_best_defender(attackers, defenders):
    """Find the best defender for the attackers to attack.
    This name is slightly misleading; it means the optimal target from the attackers' perspective,
    not the creature most skilled at defending.

    Args:
        attackers (Creature[]): Attacking creatures
        defenders (Creature[]): Defending creatures

    Yields:
        Creature, int: Creature to attack, and how many rounds it survived
    """
    # We use best_survival_time to find the defender to ensure that we
    # prioritize low HP targets.
    best_survival_time = None
    best_defender = None
    for defender in defenders:
        survival_times = [
            get_survival_time(attacker, defender) for attacker in attackers
        ]
        combined_damage_per_round = sum(
            [defender.current_wound_threshold / time for time in survival_times]
        )
        survival_time = defender.current_wound_threshold / combined_damage_per_round
        if best_survival_time is None or survival_time < best_survival_time:
            best_survival_time = survival_time
            best_defender = defender

    return best_defender


def find_best_attacks(attackers, defender):
    return sorted(
        [
            find_best_attack(
                attacker.attacks, get_defenses(defender), allow_action_points=True
            )
            for attacker in attackers
        ],
        key=lambda a: a.damage.average(),
    )


def get_survival_time(attacker, target):
    defenses = get_defenses(target)
    best_attack = find_best_attack(attacker.attacks, defenses, allow_action_points=True)
    average_damage = get_average_damage(best_attack, defenses, target.damage_reduction)
    if average_damage == 0:
        return 100000
    survival_time = target.current_wound_threshold / average_damage

    # If we're using an AP spender and the combat lasts too long, we have to
    # switch our attack.
    if best_attack.action_point and survival_time > attacker.recovery_action_points:
        hp_after_ap = (
            target.current_wound_threshold
            - average_damage * attacker.recovery_action_points
        )
        best_attack = find_best_attack(
            attacker.attacks, get_defenses(target), allow_action_points=False
        )
        average_damage = get_average_damage(
            best_attack, defenses, target.damage_reduction
        )
        if average_damage == 0:
            return 50000
        survival_time = attacker.recovery_action_points + hp_after_ap / average_damage

    return survival_time


def get_defenses(creature):
    """Convert a creature's defenses into a more convenient object"""
    return {
        "Armor": creature.armor_defense,
        "Fortitude": creature.fortitude_defense,
        "Reflex": creature.reflex_defense,
        "Mental": creature.mental_defense,
    }


def find_best_attack(attacks, target, allow_action_points):
    """Given a set of attacks, return the optimal attack to attack with"""
    best_average_damage = 0
    best_attack = None
    for attack in attacks:
        if attack.action_point and not allow_action_points:
            continue

        average_damage = get_average_damage(attack, target)
        if average_damage > best_average_damage:
            best_average_damage = average_damage
            best_attack = attack
    if best_attack is None:
        raise Exception("Unable to find best attack against target")
    return best_attack


# Damage reduction is not always required; it's irrelevant when calculating
# which attack is the best attack, for example.
def get_average_damage(attack, defenses, damage_reduction=0):
    """Given a attack and a set of defenses, return the average damage for that attack"""
    # For convenience, ignore the possibility of double crits.
    # We subtract damage reduction directly from attack damage instead of
    # applying it to the result of this calculation. This slightly overstates
    # the value of damage reduction, since it ignores that some DR is wasted on
    # low-damage attacks.
    damage_on_hit = attack.damage.average() - damage_reduction
    return max(
        0,
        (
            damage_on_hit * hit_chance(attack.accuracy, defenses[attack.defense])
            # Ignore damage reduction when calculating extra damage from a crit
            + attack.damage.average()
            * crit_chance(attack.accuracy, defenses[attack.defense])
        ),
    )


def hit_chance(accuracy, defense):
    """Given an accuracy against a defense, return the chance to hit (range 0-1)"""
    accuracy = min(1, max(0, (accuracy - defense + 11) / 10))
    explosions = 1
    while accuracy == 0:
        # Take into account explosion
        accuracy = min(
            1,
            max(
                0,
                (accuracy + 10 * explosions - defense + 11) / (10 * (10 ** explosions)),
            ),
        )
        explosions += 1
    return accuracy


def crit_chance(accuracy, defense):
    return hit_chance(accuracy, defense + 10)


def percent(val):
    return f"{int(round(val * 100))}%"


def format_combat_results(results):
    return (
        f"{percent(results['blue win %'])} blue vs {percent(results['red win %'])} red:"
        + f" time {results['combat_length']}, {results['blue_living_count']} vs {results['red_living_count']} alive,"
        + f" {results['blue_vital_wounds']} vs {results['red_vital_wounds']} wounds"
    )
