import argparse
from character import Character
import util

def initialize_argument_parser():
    parser = argparse.ArgumentParser(description='Calculate combat statistics for Rise characters')
    parser.add_argument('-c', '--character', dest='character', 
            help='the character file to load', default='brb-heavy')
    parser.add_argument('-l', '--level', dest='level',
            help='the level of the character', default=None)
    return vars(parser.parse_args())

if __name__ == "__main__":
    args = initialize_argument_parser()
    print 'character:', args['character']
    character_filename = 'data/'+args['character']+'.txt'
    #If a specific level is given, show that level

    #this is the generic AC we assume for attack calculations
    #note that we assume overwhelm 2 since overwhelm penalties are so common 
    generic_ac_calc = range(15,35)
    #so actual character AC should be two higher
    generic_ac_real = range(17,37)

    if args['level']:
        character = Character.from_filename(character_filename,
                int(args['level']))
        print character
    #Otherwise, show all levels
    else:
        for i in xrange(20):
            character = Character.from_filename(character_filename, i+1)
            #print i+1, util.mstr(character.attack_bonus.total()), 'vs', generic_ac_calc[i], ':', character.avg_hit_probability(generic_ac_calc[i])
            print i+1, character.armor_class.get_normal(), 'vs', generic_ac_real[i], ':', util.mstr(character.armor_class.get_normal()-generic_ac_real[i])
