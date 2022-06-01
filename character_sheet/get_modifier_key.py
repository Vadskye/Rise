from sheet_data import KNOWABLE_CONCEPTS

def generate_special_modifier_keys():
    keys = {}
    for a in KNOWABLE_CONCEPTS:
        parseable = a.lower().replace(' ', '_')
        keys[parseable] = parseable + '_known'
    # Defenses are tricky, since they may or may not have a "defense" suffix
    # in either the human-readable form or the key.
    keys['armor'] = 'armor_defense'
    keys['fortitude_defense'] = 'fortitude'
    keys['reflex_defense'] = 'reflex'
    keys['mental_defense'] = 'mental'
    return keys

SPECIAL_MODIFIER_KEYS = generate_special_modifier_keys()

# Given the human-readable version of a modifier, return the associated
# misc key used for that modifier. Most modifiers don't require special
# handling here, but there are tricky cases which are handled as part of
# `generate_special_modifier_keys`.
def get_modifier_key(name):
    parseable = name.lower().replace(' ', '_')
    return SPECIAL_MODIFIER_KEYS.get(parseable, parseable)
