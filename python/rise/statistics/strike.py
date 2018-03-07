class Strike(object):
    def __init__(self, accuracy, damage, name, defense=None):
        self.accuracy = accuracy
        self.damage = damage
        self.defense = defense
        self.name = name
