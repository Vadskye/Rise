class Attack(object):
    def __init__(self, accuracy, damage, name, defense=None):
        self.accuracy = accuracy
        self.damage = damage
        self._defense = defense
        self.name = name

    @property
    def defense(self):
        return self._defense or 'Armor'
