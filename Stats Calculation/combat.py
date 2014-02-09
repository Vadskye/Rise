#return estimated number of hits (effectively probability)
def attack_hits(attack_bonus, ac):
    probability = (21+attack_bonus-ac)/20.0
    return min(0.95, max(0.05, probability))

#return number of attacks this base attack bonus grants
def attack_count(base_attack_bonus):
    return 1 + (base_attack_bonus-1)/5

#return estimated number of hits
def full_attack_hits(primary_attack_bonus, ac, base_attack_bonus):
    total_hits=0
    for i in xrange(attack_count(base_attack_bonus)):
        total_hits+=attack_hits(primary_attack_bonus-i*5, ac)
    return total_hits

#return average probability that each attack will hit 
def avg_hit_probability(primary_attack_bonus, ac, base_attack_bonus):
    return full_attack_hits(primary_attack_bonus, ac, base_attack_bonus)/attack_count(base_attack_bonus)

def attack_damage_dealt(attack_bonus, ac, avg_damage):
    return attack_hits(attack_bonus, ac)*avg_damage

def full_attack_damage_dealt(primary_attack_bonus, ac, base_attack_bonus,
        avg_damage):
    return avg_damage * full_attack_hits(primary_attack_bonus, ac,
            base_attack_bonus)

if __name__ == "__main__":
    print full_attack_damage_dealt(10, 21, 6, 4.5)
