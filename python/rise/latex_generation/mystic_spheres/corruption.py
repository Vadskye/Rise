from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects



# Primary: debuff
# Secondary: damage
# None: buff, utility
corruption=MysticSphere(
    name="Corruption",
    short_description="Weaken the life force of foes, reducing their combat prowess",
    cantrips=[],
    lists=['Arcane', 'Divine', 'Nature', 'Pact'],
    spells=[
    ],
    rituals=[
    ],
    category='debuff, combat',
)
