import random

class Dice(object):
    def __init__(self, die_sizes):
        self.die_sizes = die_sizes
        self.average = self._get_average()

    @classmethod
    def from_string(cls, die_name):
        die_name = die_name.split('d')
        #Assume multiple dice (2d6)
        die_sizes = list()
        try:
            for i in range(int(die_name[0])):
                die_sizes.append(int(die_name[1]))
            return cls(die_sizes)
        except:
            #Single die
            die_sizes = list()
            die_sizes.append(int(die_name[0]))
            return cls(die_sizes)
        
    def roll(self):
        total = 0
        for die_size in self.die_sizes:
            total += random.randrange(1, die_size+1)
        return total

    def _get_average(self):
        total = 0
        for die_size in self.die_sizes:
            total += (1 + die_size)/2.0
        return total

def dx(x):
    return Dice([x])
