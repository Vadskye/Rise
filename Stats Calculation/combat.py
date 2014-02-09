#return estimated number of hits (effectively probability)
def attack_hits(attack_bonus, ac):
    probability = (21+attack_bonus-ac)/20.0
    return min(0.95, max(0.05, probability))

#return estimated number of hits
def full_attack_hits(primary_attack_bonus, ac, base_attack_bonus):
    total_hits=0
    attack_count=0
    while 5*attack_count<base_attack_bonus:
        total_hits+=attack_hits(primary_attack_bonus-attack_count*5, ac)
        attack_count+=1
    return total_hits

def attack_damage_dealt(attack_bonus, ac, avg_damage):
    return attack_hits(attack_bonus, ac)*avg_damage

def full_attack_damage_dealt(primary_attack_bonus, ac, base_attack_bonus,
        avg_damage):
    return avg_damage * full_attack_hits(primary_attack_bonus, ac,
            base_attack_bonus)

if __name__ == "__main__":
    print full_attack_damage_dealt(10, 21, 6, 4.5)
