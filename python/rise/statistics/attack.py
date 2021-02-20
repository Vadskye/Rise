class Attack(object):
    def __init__(self, accuracy, damage, name, defense=None, action_point=False):
        self.accuracy = accuracy
        self.action_point = action_point
        self.damage = damage
        self._defense = defense
        self.name = name

    @property
    def defense(self):
        return self._defense or "Armor"

    def __str__(self):
        return (
            f"Attack({self.name}: +{self.accuracy} ({self.damage})"
            + f"{' (AP)' if self.action_point else ''})"
        )
