import dice
import copy

class Battle(object):
    #At first, assume two creatures
    def __init__(self, first_creature, second_creature):
        self.first_creature = first_creature
        self.second_creature = second_creature

    def iterated_battles(self, battle_count):
        first_creature_wins = 0
        second_creature_wins = 0
        round_count_total = 0
        for i in xrange(battle_count):
            order = get_initiative_order([self.first_creature,
                    self.second_creature])
            battle_creature_1 = copy.copy(order[0])
            battle_creature_2 = copy.copy(order[1])
            victor, round_count = determine_victor(battle_creature_1,
                    battle_creature_2)
            if victor.name == self.first_creature.name:
                first_creature_wins+=1
            elif victor.name == self.second_creature.name:
                second_creature_wins+=1
            else:
                return False
            round_count_total+=round_count
        return first_creature_wins/float(battle_count), second_creature_wins/float(battle_count), round_count_total/float(battle_count)

def determine_victor(first_creature, second_creature):
    round_count = 0
    while first_creature.is_alive and second_creature.is_alive:
        first_creature.new_round()
        second_creature.new_round()
        first_creature.default_attack(second_creature)
        if second_creature.is_alive:
            second_creature.default_attack(first_creature)
        round_count+=1
    if first_creature.is_alive:
        return first_creature, round_count
    return second_creature, round_count

#return probability that attack hits
def hit_probability(attack_bonus, ac):
    probability = (21+attack_bonus-ac)/20.0
    return min(0.95, max(0.05, probability))

#return estimated number of hits
def full_hit_probability(primary_attack_bonus, ac, base_attack_bonus):
    total_hits=0
    for i in xrange(attack_count(base_attack_bonus)):
        total_hits+=hit_probability(primary_attack_bonus-i*5, ac)
    return total_hits

#return average probability that each attack will hit 
def avg_hit_probability(primary_attack_bonus, ac, base_attack_bonus):
    return full_attack_hits(primary_attack_bonus, ac, base_attack_bonus)/attack_count(base_attack_bonus)

def attack_damage_dealt(attack_bonus, ac, avg_damage):
    return hit_probability(attack_bonus, ac)*avg_damage

def full_attack_damage_dealt(primary_attack_bonus, ac, base_attack_bonus,
        avg_damage):
    return avg_damage * full_attack_hits(primary_attack_bonus, ac,
            base_attack_bonus)

def rounds_survived(primary_attack_bonus, ac, base_attack_bonus, avg_damage, hp):
    total_damage=0
    round_count=0
    while total_damage<=hp:
        total_damage+=full_attack_damage_dealt(primary_attack_bonus, ac, base_attack_bonus, avg_damage)
        round_count+=1
    return round_count

def get_initiative_order(creatures):
    order = sorted(creatures, key = lambda creature: creature.roll_initiative())
    #order is normally from lowest to highest
    order.reverse()
    return order
