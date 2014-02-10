import argparse
from creature import Creature
import util

def initialize_argument_parser():
    parser = argparse.ArgumentParser(description='Calculate combat statistics for Rise characters')
    parser.add_argument('-c', '--creature', dest='creature', 
            help='the creature file to load', default=None)
    parser.add_argument('-l', '--level', dest='level',
            help='the level of the creature', default=None)
    return vars(parser.parse_args())

def compare_ac_to_reflex(creature):
    return 'AC {0}, Reflex {1}, {2}'.format(
                    creature.armor_class.get_normal(),
                    creature.saves['reflex'].total(),
                    util.mstr(creature.armor_class.get_normal() - (10 + creature.saves['reflex'].total())))

if __name__ == "__main__":
    args = initialize_argument_parser()
    #If a specific level is given, show that level

    #this is the generic AC we assume for attack calculations
    #note that we assume overwhelm 2 since overwhelm penalties are so common 
    generic_ac_calc = range(15,35)
    #so actual character AC should be two higher
    generic_ac_real = range(17,37)

    if args['level']:
        creature = Creature.from_creature_name(args['creature'],
                int(args['level']))
        print creature
    #Otherwise, show all levels
    elif args['creature']:
        for i in xrange(20):
            creature = Creature.from_creature_name(args['creature'], i+1)
            print creature
            #print i+1, util.mstr(creature.attack_bonus.total()), 'vs', generic_ac_calc[i], ':', creature.avg_hit_probability(generic_ac_calc[i])
            #print i+1, creature.armor_class.get_normal(), 'vs', generic_ac_real[i], ':', util.mstr(creature.armor_class.get_normal()-generic_ac_real[i])
    else:
        for i in xrange(20):
            barbarian = Creature.from_creature_name('brb-heavy', i+1)
            cleric = Creature.from_creature_name('cleric-warrior', i+1)
            fighter = Creature.from_creature_name('ftr-heavy', i+1)
            npc = Creature.from_creature_name('npc', i+1)
            rogue = Creature.from_creature_name('rogue-single', i+1)
            #print i+1, cleric.dpr(generic_ac_calc[i]), 'vs', npc.dpr(generic_ac_calc[i])
            print i+1, compare_ac_to_reflex(barbarian)
