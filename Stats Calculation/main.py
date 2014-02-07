import argparse
from character import character

def initialize_argument_parser():
    parser = argparse.ArgumentParser(description='Calculate combat statistics for Rise characters')
    parser.add_argument('-c', dest='character_class', help='the character class', default='brb-heavy')
    return vars(parser.parse_args())

if __name__ == "__main__":
    args = initialize_argument_parser()
    file_input = 'data/'+args["character_class"]+'.txt'
    barbarian = character(file_input)
    print barbarian
