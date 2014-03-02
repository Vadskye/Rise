import dice
import copy

d20 = dice.dx(20)

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
            victor, round_count = self.determine_victor()
            if victor.name == self.first_creature.name:
                first_creature_wins+=1
            elif victor.name == self.second_creature.name:
                second_creature_wins+=1
            else:
                return False
            round_count_total+=round_count
        return first_creature_wins/float(battle_count), second_creature_wins/float(battle_count), round_count_total/float(battle_count)

    def determine_victor(self):
        round_count = 0
        first_creature = copy.copy(self.first_creature)
        second_creature = copy.copy(self.second_creature)
        while first_creature.is_alive and second_creature.is_alive:
            first_creature.new_round()
            second_creature.new_round()
            damage = full_attack_damage(first_creature, second_creature)
            second_creature.take_damage(damage,
                    first_creature.attack_damage_types)
            if second_creature.is_alive:
                damage = full_attack_damage(second_creature, first_creature)
                first_creature.take_damage(damage,
                        second_creature.attack_damage_types)
            round_count+=1
        if first_creature.is_alive:
            return first_creature, round_count
        return second_creature, round_count

def full_attack_damage(attacker, defender):
    damage_dealt = 0
    for i in xrange(attack_count(attacker.attack_bonus.base_bonus)):
        if attack_hits(attacker.attack_bonus.total() - 5*i, defender.armor_class.normal()):
            damage_dealt += attacker.attack_damage.total(roll=True)
    return damage_dealt

def single_attack_damage(attacker, defender):
    if attack_hits(self.attack_bonus - 5*i, defender.armor_class.normal()):
        return attacker.attack_damage.total(roll=True)

def attack_hits(attack_bonus, ac):
    if d20.roll() + attack_bonus >= ac:
        return True
    return False

def apply_dr(damage, damage_reduction):
    
    return max(0, damage - damage_reduction)

#return probability that attack hits
def hit_probability(attack_bonus, ac):
    probability = (21+attack_bonus-ac)/20.0
    return min(0.95, max(0.05, probability))

#return number of attacks this base attack bonus grants
def attack_count(base_attack_bonus):
    return 1 + max(0,(base_attack_bonus-1)/5)

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
