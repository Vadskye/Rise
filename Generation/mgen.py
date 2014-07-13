import argparse
import util

def initialize_argument_parser():
    parser = argparse.ArgumentParser(description='Monster information')
    parser.add_argument('-t', '--traits', dest='traits', type=int,
            help='Comma-separated trait tiers')
    parser.add_argument('-c', '--creature-type', dest='type', type=str,
            help='Creature type')
    parser.add_argument('-e', '--templates', dest='templates', type=str,
            help='Comma-separated templates')
