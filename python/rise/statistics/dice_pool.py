import random
import re


class DicePool(object):
    def __init__(self, size, count=1):
        self.count = count
        self.size = size

    def average(self):
        return self.count * (1 + self.size) / 2

    def maximum(self):
        return self.size * self.count

    def roll(self):
        total = 0
        for i in range(self.count):
            total += random.randint(1, self.size)
        return total

    def roll_explosion(self):
        if self.size != 10:
            raise Exception("This only works for d10s")
        total = 0
        roll = random.randint(1, self.size)
        total += roll
        while roll == self.size:
            roll = random.randint(1, self.size)
            total += roll
        return total

    def probability_of_at_least(self, value, iterations=1000):
        # Math is hard so just roll 1000 times to get the probability
        times = 0
        for i in range(iterations):
            if self.roll() >= value:
                times += 1
        return times / iterations

    # adding and subtracting from a DicePool increases the die size
    # this includes wrapping at d10 into 2d6
    def __add__(self, value):
        new_die = DicePool(size=self.size, count=self.count)
        # value is the number of size changes
        if value >= 0:
            for i in range(value):
                new_die.increase_size()
        else:
            for i in range(-value):
                new_die.decrease_size()
        return new_die

    def __sub__(self, value):
        new_die = DicePool(size=self.size, count=self.count)
        # value is the number of size decreases
        if value >= 0:
            for i in range(value):
                new_die.decrease_size()
        else:
            for i in range(-value):
                new_die.increase_size()
        return new_die

    def increase_size(self, increments=1):
        for i in range(increments):
            if self.size <= 3:
                self.size += 1
            elif self.size < 10:
                self.size += 2
            elif self.size == 10:
                if self.count >= 4:
                    self.count += 1
                else:
                    self.size = 6
                    self.count *= 2
            else:
                raise Exception("Impossible die size")

    def decrease_size(self, increments=1):
        for i in range(increments):
            if self.count > 4:
                self.count -= 1
            elif self.size <= 1:
                pass
            elif self.size <= 4 and self.count == 1:
                self.size -= 1
            elif self.size == 6 and self.count > 1:
                self.size = 10
                self.count //= 2
            elif self.size <= 10:
                self.size -= 2
            else:
                raise Exception("Impossible die size")

    def resize(self, increments):
        new = self + increments
        self.count = new.count
        self.size = new.size

    # Read a single collection of dice, like '2d6'
    @classmethod
    def from_string(cls, die_name):
        # First check the number of dice
        # http://stackoverflow.com/questions/3845423/remove-empty-strings-from-a-list-of-strings
        die_split = list(filter(bool, re.split("d", die_name)))
        if len(die_split) > 1:
            count = int(die_split[0])
            size = int(die_split[1])
        else:
            count = 1
            size = int(die_split[0])
        # Extract the die size
        return cls(size=size, count=count)

    def __repr__(self):
        text = "DicePool({0}d{1})".format(self.count, self.size)
        return text

    def __str__(self):
        text = "{0}d{1}".format(self.count, self.size)
        return text

    def __eq__(self, die):
        return self.size == die.size and self.count == die.count


def standard_damage(statistic):
    return DicePool(8) + statistic // 2
