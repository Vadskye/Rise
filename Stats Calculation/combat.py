import creature
import dice

d20 = dice.dx(20)

class CombatCreature(creature.Creature):

    #http://stackoverflow.com/questions/7629556/python-super-and-init-vs-init-self
    def __init__(self, raw_stats, raw_attributes, level, verbose=False):
        super(CombatCreature, self).__init__(raw_stats, raw_attributes,
                level, verbose)
        self.current_hit_points = self.max_hit_points
        self.critical_damage = 0
        self.is_alive = True

    def take_damage(self, damage_dealt):
        if self.current_hit_points>0:
            self.current_hit_points = max(0, self.current_hit_points-damage_dealt)
        else:
            self.critical_damage+=damage_dealt
            self.is_alive = self._check_if_alive()
    
    def _check_if_alive(self):
        if self.critical_damage > self.attributes.constitution:
            return False
        return True

    def full_attack(self, enemy):
        for i in xrange(self.get_attack_count()):
            if attack_hits(self.attack_bonus.total() - 5*i, enemy.armor_class.normal()):
                self._deal_damage(enemy)

    def single_attack(self, enemy):
        if attack_hits(self.attack_bonus - 5*i, enemy.armor_class.normal()):
            self._deal_damage(enemy)

    def _deal_damage(self, enemy):
        damage = self.attack_damage.total(roll=True)
        enemy.take_damage(damage)

    def get_attack_count(self):
        return attack_count(self.attack_bonus.base_bonus)

    def damage_per_round(self, ac):
        return full_attack_damage_dealt(self.attack_bonus.total(),
                ac, self.attack_bonus.base_bonus, self.attack_damage.total())

    def hits_per_round(self, ac):
        return combat.full_attack_hits(self.attack_bonus.total(),
                ac, self.attack_bonus.base_bonus)

    def avg_hit_probability(self, ac):
        return combat.avg_hit_probability(self.attack_bonus.total(),
                ac, self.attack_bonus.base_bonus)

class Battle(object):
    #At first, assume two creatures
    def __init__(self, first_creature, second_creature):
        self.first_creature = first_creature
        self.second_creature = second_creature

    def determine_victor(self):
        round_count = 0
        first_creature = self.first_creature
        second_creature = self.second_creature
        while first_creature.is_alive and second_creature.is_alive:
            first_creature.full_attack(second_creature)
            if second_creature.is_alive:
                second_creature.full_attack(first_creature)
            round_count+=1
        if first_creature.is_alive:
            return first_creature, round_count
        return second_creature, round_count

def attack_hits(attack_bonus, ac):
    if d20.roll() + attack_bonus >= ac:
        return True
    return False

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
