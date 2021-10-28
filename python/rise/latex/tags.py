valid_tags = set(
    [
        "Attune (ritual)",
        "Attune (ritual; see text)",
        "Attune (self)",
        "Attune (target)",
        "Auditory",
        "Compulsion",
        "Creation",
        "Curse",
        "Detection",
        "Emotion",
        "Healing",
        "Manifestation",
        "Physical",
        "Scrying",
        "(see text)",
        "Sensation",
        "Speech",
        "Subtle",
        "Sustain (standard)",
        "Sustain (minor)",
        "Sustain (free)",
        "Swift",
        "Swift (see text)",
        "Visual",
    ]
)


def glosstermify(tag):
    if tag == "(see text)":
        return tag
    elif " " in tag:
        split_tag = tag.split()
        return f"\\glossterm<{split_tag[0]}> {' '.join(split_tag[1:])}"
    else:
        return f"\\glossterm<{tag}>"


def is_valid_tag(tag):
    return tag in valid_tags


def to_latex_tags(tags):
    tags = filter(bool, tags)
    tags = filter(lambda t: t != "AP", tags)
    return "[" + ", ".join([glosstermify(tag) for tag in sorted(tags)]) + "]"
