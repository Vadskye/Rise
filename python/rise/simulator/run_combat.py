from math import ceil

def run_combat(blue, red):
    """Run a combat between two creatures until one of them reaches 0.

    Args:
        red (Creature): A creature to fight
        blue (Creature): A creature to fight

    Yields:
        object: Unknown
    """

    blue_defenses = get_defenses(blue)
    red_defenses = get_defenses(red)

    blue_attack = find_best_attack(blue.attacks, red_defenses)
    red_attack = find_best_attack(red.attacks, blue_defenses)

    blue_average_damage = get_average_damage(blue_attack, red_defenses)
    red_average_damage = get_average_damage(red_attack, blue_defenses)

    blue_survival_time = blue.hit_points / red_average_damage
    red_survival_time = red.hit_points / blue_average_damage

    winner = 'Blue' if blue_survival_time > red_survival_time else None
    winner = 'Red' if red_survival_time > blue_survival_time else winner
    winner = winner or 'Tie'

    return {
        'blue_survival_time': round(blue_survival_time, 2),
        'red_survival_time': round(red_survival_time, 2),
        'round_count': ceil(min(blue_survival_time, red_survival_time)),
        'winner': winner,
    }


def get_defenses(creature):
    """Convert a creature's defenses into a more convenient object"""
    return {
        'Armor': creature.armor_defense,
        'Fortitude': creature.fortitude_defense,
        'Reflex': creature.reflex_defense,
        'Mental': creature.mental_defense,
    }


def find_best_attack(attacks, target):
    """Given a set of attacks, return the optimal attack to attack with"""
    best_average_damage = 0
    best_attack = None
    for attack in attacks:
        average_damage = get_average_damage(attack, target)
        if average_damage > best_average_damage:
            best_average_damage = average_damage
            best_attack = attack
    if best_attack is None:
        raise Exception("Unable to find best attack against target")
    return best_attack


def get_average_damage(attack, defenses):
    """Given a attack and a set of defenses, return the average damage for that attack"""
    return attack.damage.average() * hit_chance(attack.accuracy, defenses[attack.defense])


def hit_chance(accuracy, defense):
    """Given an accuracy against a defense, return the chance to hit (range 0-1)"""
    return min(1, max(0, (accuracy - defense + 11) / 10))
