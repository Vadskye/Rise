import random
import re

class Dice(object):
    def __init__(self, die_size, dice_count = 1, die_minimum=0):
        self.die_size = die_size
        self.dice_count = dice_count
        self.die_minimum = die_minimum
        self.average = self._get_average()

    #read a single collection of dice: '2d6' or '2d8m1'
    @classmethod
    def from_string(cls, die_name):
        #First check the number of dice 
        #http://stackoverflow.com/questions/3845423/remove-empty-strings-from-a-list-of-strings
        die_split = filter(bool, re.split('d', die_name))
        if len(die_split)>1:
            dice_count = int(die_split[0])
            die_split = die_split[1]
        else:
            dice_count = 1
            die_split = die_split[0]
        die_split = filter(bool, re.split('m', die_split))
        #Extract the die size 
        die_size = int(die_split[0])
        #Check for a die minimum
        if len(die_split)==2:
            die_minimum = int(die_split[1])
        else:
            die_minimum = 0
        return cls(die_size, dice_count, die_minimum)

    def increase_size(self):
        if self.die_size <4:
            self.die_size+=1
        elif self.die_size < 10:
            self.die_size+=2
        elif self.die_size == 10:
            self.die_size = 6
            self.dice_count*=2
        else:
            return False

    def roll(self):
        total = self._get_raw_roll()
        if total<=self.die_minimum:
            total = self._get_raw_roll()
        return total

    def _get_raw_roll(self):
        total = 0
        for i in xrange(self.dice_count):
            die_roll = random.randrange(1, self.die_size+1)
            #reroll once if at or below minimum
            total += die_roll
        return total

    def _get_average(self):
        total = 0
        for i in xrange(self.dice_count):
            total += (1 + self.die_size)/2.0
        #this formula only works for die count = 1 
        #it is inflated for larger dice counts
        chance_to_hit_min = (self.die_minimum+1-self.dice_count)/float(
                self.dice_count**2*self.die_size) 
        total += total*chance_to_hit_min
        return total

def dx(x):
    return Dice(x)

if __name__=="__main__":
    die = Dice.from_string('2d6m2')
    print die._get_average()
