from math import ceil

def run_combat(blue, red):
    """Run a combat between two creatures until one of them reaches 0.

    Args:
        red (Creature): A creature to fight
        blue (Creature): A creature to fight

    Yields:
        object: Unknown
    """

    blue_survival_time = get_survival_time(red, blue)
    red_survival_time = get_survival_time(blue, red)

    winner = 'Blue' if blue_survival_time > red_survival_time else None
    winner = 'Red' if red_survival_time > blue_survival_time else winner
    winner = winner or 'Tie'

    return {
        'blue_time_to_kill': round(red_survival_time, 2),
        'red_time_to_kill': round(blue_survival_time, 2),
        'round_count': ceil(min(blue_survival_time, red_survival_time)),
        'winner': winner,
    }


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
