valid_tags = set(
    [
        "Attune",
        "Attune (deep)",
        "Attune (target)",
        "Auditory",
        "Compulsion",
        "Creation",
        "Curse",
        "Detection",
        "Emotion",
        "Manifestation",
        "Physical",
        "Scrying",
        "(see text)",
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
        # this fixes dumb type issues because python's type system is weird
        return f"{tag}"
    elif " " in tag:
        split_tag = tag.split()
        return f"\\abilitytag<{split_tag[0]}> {' '.join(split_tag[1:])}"
    else:
        return f"\\abilitytag<{tag}>"


def is_valid_tag(tag):
    return tag in valid_tags


def to_latex_tags(tags):
    filtered_tags = filter(bool, tags)
    filtered_tags = filter(lambda t: t != "AP", tags)
    return "[" + ", ".join([glosstermify(tag) for tag in sorted(filtered_tags)]) + "]"

def add_attune_tag(tags):
    tags = tags or []
    has_attune = False
    for tag in tags:
        if "Attune" in tag:
            has_attune = True
            break
    if not has_attune:
        tags += ["Attune"]
    return tags
