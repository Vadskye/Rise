import dice
import util
import copy
from strings import *

class CombatCreature(object):
    def __init__(self):
        #default to full attack for now
        self.attack_mode = 'full attack'
        self.critical_damage = 0
        self.is_alive = True
        self.current_hit_points = 0

    def new_round(self):
        self.defenses[DR].refresh()

    def take_damage(self, damage, damage_types):
        damage = self.defenses[DR].reduce_damage(damage, damage_types)
        if self.current_hit_points>0:
            self.current_hit_points = max(0, self.current_hit_points-damage)
        else:
            self.critical_damage+=damage
            self.is_alive = self._check_if_alive()

    def _check_if_alive(self):
        if self.critical_damage > self.attributes[CON].get_total():
            return False
        return True

    def default_attack(self, enemy):
        return {
                'full attack': self.full_attack(enemy),
                'damage spell': self.damage_spell(enemy),
                'special attack': self.special_attack(enemy),
                }[self.attack_mode]

    def full_attack(self, enemy, deal_damage = True):
        damage_dealt_total = 0
        hit_count = 0
        for i in xrange(util.attack_count(self.attacks[ATTACK_BONUS].base_attack_bonus)):
            is_hit, damage_dealt = self.single_attack(enemy, self.attacks[ATTACK_BONUS].get_total() - 5*i, deal_damage)
            damage_dealt_total += damage_dealt
            hit_count += 1 if is_hit else 0
        return hit_count, damage_dealt

    def single_attack(self, enemy, attack_bonus = None,
            deal_damage = True):
        damage_dealt = 0
        if attack_bonus is None:
            attack_bonus = self.attacks[ATTACK_BONUS].get_total()
        try:
            is_hit, is_threshold_hit = util.attack_hits(
                    attack_bonus, enemy.armor_class.normal(),
                    threshold=5)
        except:
            is_hit, is_threshold_hit = util.attack_hits(
                    attack_bonus, enemy, threshold=5)
        if is_hit:
            damage_dealt += self.attacks[WEAPON_DAMAGE_PRIMARY].get_total(roll=True)
        if is_threshold_hit:
            damage_dealt += self.offhand_weapon_damage.get_total(roll=True)
        if deal_damage:
            enemy.take_damage(damage_dealt, self.items[WEAPON_PRIMARY].damage_types)
        return is_hit, damage_dealt

    def damage_spell(self, enemy):
        #Use highest-level, no optimization, no save spell
        damage_die = dice.Dice.from_string('{0}d10'.format(max(1,self.meta[LEVEL]/2)))
        damage_dealt = damage_die.roll()
        enemy.take_damage(damage_dealt, ['spell'])
        return damage_dealt

    def damage_per_round(self, ac):
        return full_weapon_damage_dealt(self.attacks[ATTACK_BONUS].get_total(),
                ac, self.attacks[ATTACK_BONUS].base_attack_bonus, self.attacks[WEAPON_DAMAGE_PRIMARY].get_total())

    def avg_hit_probability(self, ac):
        attack_count = util.attack_count(
                self.attacks[ATTACK_BONUS].base_attack_bonus)
        hit_chance_total = 0 
        for i in xrange(attack_count):
            hit_chance_total += hit_probability(
                    self.attacks[ATTACK_BONUS].get_total() - i*5, ac)
        return hit_chance_total/attack_count

    def roll_initiative(self):
        return util.d20.roll()+self.core[INITIATIVE].get_total()

    def special_attack(self, enemy):
        pass

    @classmethod
    def from_creature(cls, creature):
        combat_creature = cls()
        for attribute in dir(creature):
            try:
                if not hasattr(combat_creature, attribute):
                    setattr(combat_creature, attribute, getattr(creature,
                        attribute))
            except AttributeError:
                pass
        combat_creature.current_hit_points = combat_creature.core[HIT_POINTS]
        return combat_creature

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
            battle_creature_1 = copy.copy(order[0])
            battle_creature_2 = copy.copy(order[1])
            victor, round_count = determine_victor(battle_creature_1,
                    battle_creature_2)
            if victor.meta[NAME] == self.first_creature.meta[NAME]:
                first_creature_wins+=1
            elif victor.meta[NAME] == self.second_creature.meta[NAME]:
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

"""
#return estimated number of hits
def full_hit_probability(primary_attack_bonus, ac, base_attack_bonus):
    total_hits=0
    for i in xrange(attack_count(base_attack_bonus)):
        total_hits+=hit_probability(primary_attack_bonus-i*5, ac)
    return total_hits
"""

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
