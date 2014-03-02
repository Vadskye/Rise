import random
import re

class Dice(object):
    def __init__(self, die_sizes, die_minimums):
        self.die_sizes = die_sizes
        self.die_minimums = die_minimums
        self.average = self._get_average()

    #read a single collection of dice: '2d6' or '2d8m1'
    @classmethod
    def from_string(cls, die_name):
        #First check the number of dice 
        die_split = filter(bool, re.split('d', die_name))
        if len(die_split)>1:
            die_count = int(die_split[0])
            die_split = re.split('m', die_split[1])
        else:
            die_count = 1
            die_split = re.split('m', die_split[0])
        #Then create the appropriate number of dice 
        die_sizes = [int(die_split[0]) for i in range(die_count)]
        #Check for die minimums
        if len(die_split)==2:
            die_minimums = [int(die_split[1]) for i in range(die_count)]
        else:
            die_minimums = [0 for i in range(die_count)]
        return cls(die_sizes, die_minimums)
        
    def roll(self):
        total = 0
        for i, die_size in enumerate(self.die_sizes):
            die_roll = random.randrange(1, die_size+1)
            #reroll once if at or below minimum
            if die_roll <= self.die_minimums[i]:
                die_roll = random.randrange(1, die_size+1)
            total += die_roll
        return total

    def _get_average(self):
        total = 0
        for die_size in self.die_sizes:
            total += (1 + die_size)/2.0
        return total

def dx(x):
    return Dice([x], [None])

die = Dice.from_string("1d2m1") 
