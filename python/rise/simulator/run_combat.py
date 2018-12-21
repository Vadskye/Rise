def run_combat(blue_creatures, red_creatures):
    """Run a combat between two creatures until one of them reaches 0.

    Args:
        blue_creatures (Creature[]): A list of creatures to fight
        red_creatures (Creature[]): A list of creatures to fight

    Yields:
        object: Unknown
    """

    total_survival_time = 0

    blue_living = blue_creatures
    red_living = red_creatures

    while len(blue_living) > 0 and len(red_living) > 0:
        red_defender, red_survival_time, red_damage_taken_per_round = find_best_defender(blue_living, red_living)
        blue_defender, blue_survival_time, blue_damage_taken_per_round = find_best_defender(red_living, blue_living)

        rounds_elapsed = min(red_survival_time, blue_survival_time)
        total_survival_time += rounds_elapsed

        # The blue defender took damage proportional to the time elapsed.
        # If red survived for 1 round and blue survived for 4, blue should
        # have taken 25% of its HP in damage.
        blue_defender.damage_taken += blue_damage_taken_per_round * rounds_elapsed
        red_defender.damage_taken += red_damage_taken_per_round * rounds_elapsed

        blue_living = list(filter(lambda c: c.hit_points > 0, blue_living))
        red_living = list(filter(lambda c: c.hit_points > 0, red_living))

    winner = 'Blue' if len(blue_living) > 0 else None
    winner = 'Red' if len(red_living) > 0 else winner
    winner = winner or 'Tie'

    return {
        'blue_hp_remaining': sum([max(c.hit_points, 0) for c in blue_creatures]) / sum([c.max_hit_points for c in blue_creatures]),
        'red_hp_remaining': sum([max(c.hit_points, 0) for c in red_creatures]) / sum([c.max_hit_points for c in red_creatures]),
        'blue_living_count': len(blue_living),
        'red_living_count': len(red_living),
        'combat_length': total_survival_time,
        'winner': winner,
    }


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
    max_damage_per_round = None
    # We use best_survival_time to find the defender to ensure that we
    # prioritize low HP targets.
    best_survival_time = None
    best_defender = None
    for defender in defenders:
        survival_times = [get_survival_time(attacker, defender) for attacker in attackers]
        combined_damage_per_round = sum([defender.hit_points / time for time in survival_times])
        survival_time = defender.hit_points / combined_damage_per_round
        if best_survival_time is None or survival_time < best_survival_time:
            max_damage_per_round = combined_damage_per_round
            best_survival_time = survival_time
            best_defender = defender

    return best_defender, best_survival_time, max_damage_per_round


def get_survival_time(attacker, target):
    defenses = get_defenses(target)
    best_attack = find_best_attack(attacker.attacks, defenses, allow_action_points=True)
    average_damage = get_average_damage(best_attack, defenses, target.damage_reduction)
    if average_damage == 0:
        return 100000
    survival_time = target.hit_points / average_damage

    # If we're using an AP spender and the combat lasts too long, we have to
    # switch our attack.
    if best_attack.action_point and survival_time > attacker.recovery_action_points:
        hp_after_ap = target.hit_points - average_damage * attacker.recovery_action_points
        best_attack = find_best_attack(attacker.attacks, get_defenses(target), allow_action_points=False)
        average_damage = get_average_damage(best_attack, defenses, target.damage_reduction)
        if average_damage == 0:
            return 50000
        survival_time = attacker.recovery_action_points + hp_after_ap / average_damage

    return survival_time


def get_defenses(creature):
    """Convert a creature's defenses into a more convenient object"""
    return {
        'Armor': creature.armor_defense,
        'Fortitude': creature.fortitude_defense,
        'Reflex': creature.reflex_defense,
        'Mental': creature.mental_defense,
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
    return max(0, (
        damage_on_hit * hit_chance(attack.accuracy, defenses[attack.defense])
        # Ignore damage reduction when calculating extra damage from a crit
        + attack.damage.average() * crit_chance(attack.accuracy, defenses[attack.defense])
    ))


def hit_chance(accuracy, defense):
    """Given an accuracy against a defense, return the chance to hit (range 0-1)"""
    accuracy = min(1, max(0, (accuracy - defense + 11) / 10))
    explosions = 1
    while accuracy == 0:
        # Take into account explosion
        accuracy = min(1, max(0, (accuracy + 10 * explosions - defense + 11) / (10 * (10 ** explosions))))
        explosions += 1
    return accuracy


def crit_chance(accuracy, defense):
    return hit_chance(accuracy, defense + 10)


def percent(val):
    return f"{int(round(val * 100))}%"


def format_combat_results(results):
    combat_length = round(results['combat_length'], 2)
    return (
        f"{results['winner']} wins: time {combat_length}, {results['blue_living_count']} vs {results['red_living_count']} alive,"
        + f" {percent(results['blue_hp_remaining'])} vs {percent(results['red_hp_remaining'])} HP"
    )
