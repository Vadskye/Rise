import creature
import util
from classes import CharacterClass, GOOD, AVERAGE, POOR

class Monster(creature.Creature):
    
    def __init__(self, raw_stats, level):
        self.level = level
        self._init_core_statistics()
        self._interpret_raw_stats(raw_stats)

        self._interpret_types(raw_stats)
        self._calculate_class_stats()

        self._interpret_raw_attributes(util.parse_stats_from_file('data/attributes/warrior.txt'))

        self._calculate_derived_statistics()

    @classmethod
    def from_monster_name(cls, monster_name, level):
        monster_filename = 'data/monsters/'+monster_name+'.txt'
        raw_stats = util.parse_stats_from_file(monster_filename)
        return cls(raw_stats, level)

    def _interpret_types(self, raw_stats):
        self.class_calculator = {
                'aberration': Aberration,
                'animal': Animal
                }[raw_stats['creature type']](self.level)
        self.archetype = {
                'brute': Brute,
                'scout': Scout
                }[raw_stats['archetype']](self.class_calculator)

class Aberration(CharacterClass):
    bab_progression = AVERAGE
    save_progressions = {'fortitude': AVERAGE, 'reflex':POOR, 'will':AVERAGE}
    hit_value = 5

class Animal(CharacterClass):
    bab_progression = AVERAGE
    save_progressions = {'fortitude': AVERAGE, 'reflex':AVERAGE, 'will':POOR}
    hit_value = 6

class Archetype(object):
    def __init__(self, creature_type):
        self.creature_type = creature_type
        self.perform_improvements()

    def improve_bab(self):
        if self.creature_type.bab_progression == POOR:
            self.creature_type.bab_progression = AVERAGE
        else:
            self.creature_type.bab_progression = GOOD

    def improve_save(self, save_name):
        if self.creature_type.save_progressions[save_name] == POOR:
            self.creature_type.save_progressions[save_name] = AVERAGE
        else:
            self.creature_type.save_progressions[save_name] = GOOD

    def improve_hv(self, times_to_improve=1):
        for i in xrange(times_to_improve):
            self.creature_type.hit_value+=1
        self.creature_type.hit_value = max(7, self.creature_type.hit_value)

    #Override with specific archetypes
    def perform_improvements(self):
        pass

class Brute(Archetype):
    def perform_improvements(self):
        self.improve_bab()
        self.improve_hv(2)
        self.improve_save('fortitude')

class Scout(Archetype):
    def perform_improvements(self):
        self.improve_save('reflex')

if __name__=="__main__":
    monster = Monster.from_monster_name('brown_bear', 4)
    print monster
