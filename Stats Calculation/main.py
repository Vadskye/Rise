import argparse
from character import character

def initialize_argument_parser():
    parser = argparse.ArgumentParser(description='Calculate combat statistics for Rise characters')
    parser.add_argument('-c', '--character', dest='character', 
            help='the character file to load', default='brb-heavy')
    return vars(parser.parse_args())

if __name__ == "__main__":
    args = initialize_argument_parser()
    print 'character:', args['character']
    character_file = 'data/'+args['character']+'.txt'
    barbarian = character(character_file)
    print barbarian
