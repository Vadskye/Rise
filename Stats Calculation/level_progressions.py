import util
from strings import *
from abilities import abilities
import equipment

class LevelProgression(object):
    
    def __init__(self, name, bab, fortitude, reflex, will, 
            hit_value, natural_armor_progression,
            apply_modifications = lambda x: None):
        self.name = name
        self.bab_progression = bab
        self.save_progressions = {
            FORT: fortitude,
            REF: reflex,
            WILL: will,
            }
        self.hit_value = hit_value
        self.natural_armor_progression = natural_armor_progression
        self.apply_modifications = apply_modifications

    def improve_progression(self, progression_name):
        setattr(self, progression_name, util.improved_progression(
            getattr(self, progression_name)))

classes = dict()

def barbarian_modifications(base_creature):
    base_creature.add_ability(abilities.rage)
    base_creature.add_ability(abilities.barbarian_damage_reduction)
    if base_creature.meta[LEVEL]>=2:
        base_creature.add_ability(abilities['danger sense'])
    if base_creature.meta[LEVEL]>=7:
        abilities.larger_than_life(base_creature)
    if base_creature.meta[LEVEL]>=17:
        abilities.larger_than_belief(base_creature)

classes[BARBARIAN] = LevelProgression(BARBARIAN, GOOD, GOOD,
        AVERAGE, POOR, 7, NONE, barbarian_modifications)

def cleric_modifications(base_creature):
    base_creature.attack_mode='damage spell'

classes[CLERIC] = LevelProgression(CLERIC, AVERAGE, AVERAGE, POOR, GOOD,
        5, NONE, cleric_modifications)


classes[DRUID] = LevelProgression(DRUID, AVERAGE, GOOD, POOR, AVERAGE,
        NONE, 5)


def fighter_modifications(base_creature):
    #armor discipline
    armor_discipline_count = (base_creature.meta[LEVEL]+5)/6
    base_creature.defenses[AC].dodge.add_competence(
            armor_discipline_count)
    for i in xrange(1, armor_discipline_count):
        base_creature.items[ARMOR].encumbrance = util.lower_encumbrance(
                base_creature.items[ARMOR].encumbrance)

    #weapon discipline
    ab = 0
    ab += 1 if base_creature.meta[LEVEL]>=3 else 0
    ab += 1 if base_creature.meta[LEVEL]>=9 else 0
    base_creature.attacks[ATTACK_BONUS].add_competence(ab)

    if base_creature.meta[LEVEL]>=15:
        pass
        #add critical changes

classes[FIGHTER] = LevelProgression(FIGHTER, GOOD, GOOD, POOR, AVERAGE,
        6, NONE, fighter_modifications)


classes[AVERAGE] = LevelProgression(AVERAGE, AVERAGE, AVERAGE, AVERAGE,
        AVERAGE, 5, NONE)

def monk_modifications(base_creature):
    #wisdom is used often, so make it quick to access
    wisdom = base_creature.attributes[WIS].get_total()

    #enlightened defense
    if base_creature.items[ARMOR] is None:
        base_creature.defenses[AC].misc.add_inherent(wisdom)
    else:
        base_creature.printverb('Monk is wearing armor? %s' %
                base_creature.items[ARMOR])

    #unarmed strike
    if base_creature.items[WEAPON_PRIMARY] is None:
        unarmed_weapon = equipment.Weapon.from_weapon_name('unarmed')
        #make the weapon deal monk damage
        for i in xrange(2):
            unarmed_weapon.damage_die.increase_size(increase_min=True)
        base_creature.items[WEAPON_PRIMARY] = unarmed_weapon
        base_creature.attacks[WEAPON_DAMAGE_PRIMARY].add_die(
                unarmed_weapon)

    #wholeness of body

    #improved ki strike
    if base_creature.meta[LEVEL]>=10:
        base_creature.attacks[DAMAGE][WEAPON_PRIMARY].add_inherent(wisdom/2)

classes[MONK] = LevelProgression(MONK, GOOD, AVERAGE, AVERAGE, AVERAGE,
        5, NONE)


classes[PALADIN] = LevelProgression(PALADIN, GOOD, GOOD, POOR, GOOD,
        6, NONE)


def rogue_modifications(base_creature):
    base_creature.add_ability('danger sense')

classes[ROGUE] = LevelProgression(ROGUE, AVERAGE, POOR, GOOD, AVERAGE,
        5, NONE, rogue_modifications)


classes[SPELLWARPED] = LevelProgression(SPELLWARPED, AVERAGE, AVERAGE,
        AVERAGE, AVERAGE, 5, NONE)


classes[SORCERER] = LevelProgression(SORCERER, POOR, POOR, POOR, GOOD, 4, NONE)

classes[WARRIOR] = LevelProgression(WARRIOR, GOOD, GOOD, POOR, POOR, 6, NONE)

classes[WIZARD] = LevelProgression(WIZARD, POOR, POOR, POOR, GOOD, 4, NONE)

monster_types = dict()

def aberration_modifications(base_creature):
    base_creature.add_ability('darkvision', by_name=True)
monster_types[ABERRATION] = LevelProgression(ABERRATION, AVG,
        AVG, POOR, AVG, 5, AVERAGE, aberration_modifications)

def animal_modifications(base_creature):
    base_creature.attributes[INT].add_inherent(-8)
    base_creature.add_abilities(('low-light vision', 'scent'), by_name=True)
monster_types[ANIMAL] = LevelProgression(ANIMAL, AVG, AVG, 
        AVG, POOR, 6, POOR, animal_modifications)

def construct_modifications(base_creature):
    base_creature.add_abilities(('darkvision', 'construct'),
            by_name=True)
monster_types[CONSTRUCT] = LevelProgression(CONSTRUCT, AVG, AVG, POOR, POOR,
    5, GOOD, construct_modifications)

def dragon_modifications(base_creature):
    base_creature.add_abilities(('darkvision', 'low-light vision'),
            by_name=True)
monster_types[DRAGON] = LevelProgression(DRAGON, AVG, AVG, 
        AVG, AVG, 6, GOOD, dragon_modifications)

def fey_modifications(base_crreature):
    base_creature.add_ability('low-light vision', by_name=True)
monster_types[FEY] = LevelProgression(FEY, POOR, POOR, AVG, AVG, 5,
        POOR, fey_modifications)

monster_types[HUMANOID] = LevelProgression(HUMANOID, POOR, POOR, POOR,
        POOR, 4, NONE)

def magical_beast_modifications(base_creature):
    base_creature.add_ability('low-light vision', by_name=True)
monster_types[MAGICAL_BEAST] = LevelProgression(MAGICAL_BEAST, AVG,
        AVG, AVG, POOR, 6, AVG, magical_beast_modifications)

monster_types[MONSTROUS_HUMANOID] = LevelProgression(MONSTROUS_HUMANOID,
        AVG, AVG, POOR, AVG, 5, AVG)

def ooze_modifications(base_creature):
    base_creature.add_ability('ooze', by_name=True)
monster_types[OOZE] = LevelProgression(OOZE, POOR, AVG, POOR, POOR, 6,
        NONE, ooze_modifications)

monster_types[OUTSIDER] = LevelProgression(OUTSIDER, AVG, AVG, AVG, AVG,
        5, AVG)

def plant_modifications(base_creature):
    base_creature.add_ability('plant', by_name=True)
monster_types[PLANT] = LevelProgression(PLANT, POOR, AVG, POOR, POOR, 5,
        AVG, plant_modifications)

def undead_modifications(base_creature):
    base_creature.add_ability('undead', by_name=True)
monster_types[UNDEAD] = LevelProgression(UNDEAD, AVG, AVG, POOR, AVG, 5,
        AVG, undead_modifications)

#modify the creature so it matches the ideal target AC and other stats
def ideal_modifications(base_creature):
    #compensate for AC bonus from BAB
    base_creature.defenses[AC].dodge.add_bonus(-(base_creature.meta[LEVEL]/2),
    #base_creature.defenses[AC].dodge.add_bonus(-((base_creature.meta[LEVEL]*3)/8),
            'babfix')
    #compensate for AC bonus from Dex
    base_creature.defenses[AC].dodge.add_bonus(
            -(base_creature.attributes[DEX].get_total()), 'dexfix')
    #this overrides the base 10 because it has the same type
    base_creature.defenses[AC].misc.add_bonus(base_creature.meta[LEVEL]+15,
            BASE)
    #add magic bonus to attack and damage
monster_types[IDEAL] = LevelProgression(IDEAL, GOOD, POOR, POOR, POOR,
        5, NONE, ideal_modifications)
