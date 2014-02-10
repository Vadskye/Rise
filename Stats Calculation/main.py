import argparse
from character import Character
import util

def initialize_argument_parser():
    parser = argparse.ArgumentParser(description='Calculate combat statistics for Rise characters')
    parser.add_argument('-c', '--character', dest='character', 
            help='the character file to load', default=None)
    parser.add_argument('-l', '--level', dest='level',
            help='the level of the character', default=None)
    return vars(parser.parse_args())

def compare_ac_to_reflex(character):
    return 'AC {0}, Reflex {1}, {2}'.format(
                    character.armor_class.get_normal(),
                    character.saves['reflex'].total(),
                    util.mstr(character.armor_class.get_normal() - (10 + character.saves['reflex'].total())))

if __name__ == "__main__":
    args = initialize_argument_parser()
    print 'character:', args['character']
    #If a specific level is given, show that level

    #this is the generic AC we assume for attack calculations
    #note that we assume overwhelm 2 since overwhelm penalties are so common 
    generic_ac_calc = range(15,35)
    #so actual character AC should be two higher
    generic_ac_real = range(17,37)

    if args['level']:
        character = Character.from_character_name(args['character'],
                int(args['level']))
        print character
    #Otherwise, show all levels
    elif args['character']:
        for i in xrange(20):
            character = Character.from_character_name(args['character'], i+1)
            print character
            #print i+1, util.mstr(character.attack_bonus.total()), 'vs', generic_ac_calc[i], ':', character.avg_hit_probability(generic_ac_calc[i])
            #print i+1, character.armor_class.get_normal(), 'vs', generic_ac_real[i], ':', util.mstr(character.armor_class.get_normal()-generic_ac_real[i])
    else:
        for i in xrange(20):
            barbarian = Character.from_character_name('brb-heavy', i+1)
            cleric = Character.from_character_name('cleric-warrior', i+1)
            fighter = Character.from_character_name('ftr-heavy', i+1)
            npc = Character.from_character_name('npc', i+1)
            rogue = Character.from_character_name('rogue-single', i+1)
            #print i+1, cleric.dpr(generic_ac_calc[i]), 'vs', npc.dpr(generic_ac_calc[i])
            print i+1, compare_ac_to_reflex(barbarian)
