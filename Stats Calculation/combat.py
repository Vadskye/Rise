import dice
import util
import copy
from strings import *

class Battle(object):
    #At first, assume two creatures
    def __init__(self, first_creature, second_creature):
        self.first_creature = first_creature
        self.second_creature = second_creature
        #If two creatures with the same name battle, we can't tell who wins
        if self.first_creature.meta[NAME] == self.second_creature.meta[NAME]:
            self.second_creature.meta[NAME] += '_2'

    def iterated_battles(self, battle_count):
        first_creature_wins = 0
        second_creature_wins = 0
        round_count_total = 0
        for i in xrange(battle_count):
            order = get_initiative_order([self.first_creature,
                    self.second_creature])
            battle_creature_1 = order[0]
            battle_creature_2 = order[1]
            victor, round_count = determine_victor(battle_creature_1,
                    battle_creature_2)
            if victor.meta[NAME] == self.first_creature.meta[NAME]:
                first_creature_wins+=1
            elif victor.meta[NAME] == self.second_creature.meta[NAME]:
                second_creature_wins+=1
            else:
                raise Exception("iterated battle had mysterious victor")
            self.first_creature.reset_combat()
            self.second_creature.reset_combat()
            round_count_total+=round_count
        return first_creature_wins/float(battle_count), second_creature_wins/float(battle_count), round_count_total/float(battle_count)

def determine_victor(first_creature, second_creature):
    round_count = 0
    while first_creature.is_alive() and second_creature.is_alive():
        first_creature.new_round()
        second_creature.new_round()
        first_creature.attack(second_creature)
        if second_creature.is_alive():
            second_creature.attack(first_creature)
        round_count+=1
    if first_creature.is_alive():
        return first_creature, round_count
    return second_creature, round_count

"""
#return estimated number of hits
def full_hit_probability(primary_attack_bonus, ac, base_attack_bonus):
    total_hits=0
    for i in xrange(attack_count(base_attack_bonus)):
        total_hits+=hit_probability(primary_attack_bonus-i*5, ac)
    return total_hits
"""

def get_initiative_order(creatures):
    order = sorted(creatures, key = lambda creature: creature.roll_initiative())
    #order is normally from lowest to highest
    order.reverse()
    return order
