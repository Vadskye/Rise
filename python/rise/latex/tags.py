valid_tags = set([
    'Acid',
    'Air',
    'Attune',
    'Attune (multiple)',
    'Attune (shared)',
    'Auditory',
    'Cold',
    'Compulsion',
    'Creation',
    'Curse',
    'Death',
    'Emotion',
    'Detection',
    'Earth',
    'Electricity',
    'Figment',
    'Fire',
    'Flesh',
    'Glamer',
    'Life',
    'Light',
    'Manifestation',
    'Mind',
    'Mystic',
    'Physical',
    'Planar',
    'Poison',
    'Scrying',
    '(see text)',
    'Shaping',
    'Shielding',
    'Sizing',
    'Speech',
    'Subtle',
    'Sustain (standard)',
    'Sustain (minor)',
    'Telekinesis',
    'Teleportation',
    'Temporal',
    'Trap',
    'Visual',
    'Water',
])

def glosstermify(tag):
    if tag == '(see text)':
        return tag
    elif ' ' in tag:
        split_tag = tag.split()
        if len(split_tag) != 2:
            raise Exception(f"Unable to parse tag {tag}")
        return f"\\glossterm<{split_tag[0]}> {split_tag[1]}"
    else:
        return f"\\glossterm<{tag}>"

def is_valid_tag(tag):
    return tag in valid_tags
