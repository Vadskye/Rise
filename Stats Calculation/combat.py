import dice
import util
import copy

class CombatCreature(object):
    def __init__(self):
        #default to full attack for now
        self.attack_mode = 'full attack'
        self.critical_damage = 0
        self.is_alive = True

    def new_round(self):
        self.damage_reduction.refresh()

    def take_damage(self, damage, damage_types):
        damage = self.damage_reduction.reduce_damage(damage, damage_types)
        if self.current_hit_points>0:
            self.current_hit_points = max(0, self.current_hit_points-damage)
        else:
            self.critical_damage+=damage
            self.is_alive = self._check_if_alive()

    def _check_if_alive(self):
        if self.critical_damage > self.attributes.constitution.get_total():
            return False
        return True

    def default_attack(self, enemy):
        return {
                'full attack': self.full_attack(enemy),
                'damage spell': self.damage_spell(enemy),
                'special attack': self.special_attack(enemy),
                }[self.attack_mode]

    def full_attack(self, enemy, deal_damage = True):
        damage_dealt = 0
        for i in xrange(util.attack_count(self.attack_bonus.base_attack_bonus)):
            damage_dealt += self.single_attack(enemy, self.attack_bonus.get_total() - 5*i, deal_damage)
        return damage_dealt

    def single_attack(self, enemy, attack_bonus = None,
            deal_damage = True):
        damage_dealt = 0
        if attack_bonus is None:
            attack_bonus = self.attack_bonus.get_total()
        is_hit, is_threshold_hit = util.attack_hits(attack_bonus, 
                enemy.armor_class.normal(), threshold=5)
        if is_hit:
            damage_dealt += self.weapon_damage.get_total(roll=True)
        if is_threshold_hit:
            damage_dealt += self.offhand_weapon_damage.get_total(roll=True)
        if deal_damage:
            enemy.take_damage(damage_dealt, self.weapon.damage_types)
        return damage_dealt

    def damage_spell(self, enemy):
        #Use highest-level, no optimization, no save spell
        damage_die = dice.Dice.from_string('{0}d10'.format(max(1,self.level/2)))
        damage_dealt = damage_die.roll()
        enemy.take_damage(damage_dealt, ['spell'])
        return damage_dealt

    def damage_per_round(self, ac):
        return full_weapon_damage_dealt(self.attack_bonus.get_total(),
                ac, self.attack_bonus.base_attack_bonus, self.weapon_damage.get_total())

    def hits_per_round(self, ac):
        return combat.full_attack_hits(self.attack_bonus.get_total(),
                ac, self.attack_bonus.base_attack_bonus)

    def avg_hit_probability(self, ac):
        return combat.avg_hit_probability(self.attack_bonus.get_total(),
                ac, self.attack_bonus.base_attack_bonus)

    def roll_initiative(self):
        return util.d20.roll()+self.initiative.get_total()

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
        return combat_creature

class Battle(object):
    #At first, assume two creatures
    def __init__(self, first_creature, second_creature):
        self.first_creature = first_creature
        self.second_creature = second_creature
        #If two creatures with the same name battle, we can't tell who wins
        if self.first_creature.name == self.second_creature.name:
            self.second_creature.name += '_2'

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
