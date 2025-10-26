from cgi_simple import value_sum

ATTRIBUTES = "Strength Dexterity Constitution Intelligence Perception Willpower".split()
DEFENSES = "Armor Brawn Fortitude Mental Reflex".split()
ATTRIBUTE_SHORTHAND = {
    "strength": "Str",
    "dexterity": "Dex",
    "constitution": "Con",
    "intelligence": "Int",
    "perception": "Per",
    "willpower": "Wil",
    "other": "Other",
}
ATTRIBUTE_SKILLS = {
    "strength": "Climb Swim".split(),
    "dexterity": [
        "Balance",
        "Flexibility",
        "Perform",
        "Ride",
        "Sleight of Hand",
        "Stealth",
    ],
    "constitution": ["Endurance"],
    "intelligence": [
        "Craft",
        "Deduction",
        "Devices",
        "Disguise",
        "Knowledge",
        "Medicine",
    ],
    "perception": [
        "Awareness",
        "Creature Handling",
        "Deception",
        "Persuasion",
        "Social Insight",
        "Survival",
    ],
    "willpower": [],
    "other": [
        "Intimidate",
        "Profession",
    ],
}

KNOWABLE_CONCEPTS = [
    "Bardic performances",
    "Battle tactics",
    "Combat styles",
    "Hunting styles",
    "Ki manifestations",
    "Maneuvers",
    "Metamagic",
    "Mystic spheres",
    "Spells",
    "Wild aspects",
]

SUBSKILLS = [
    "Craft",
    "Knowledge",
    # TODO: fully support perform subskills
    # "Perform",
    "Profession",
]

ROLL20_CALC = {
    "armor_defense": value_sum(
        [
            "armor_scaling",
            "body_armor_defense_value",
            "shield_defense_value",
            "armor_misc",
        ]
    ),
    "base_speed": value_sum(
        [
            "speed_size",
            "speed_armor",
            "speed_misc",
        ]
    ),
    "insight_points": value_sum(
        [
            "insight_points_base",
            "insight_points_intelligence",
            "insight_points_misc",
        ]
    ),
    "recovery_ap": "(3 + floor((@{level}) / 7))",
    "reserve_ap": value_sum(
        [
            "action_points_base",
            "action_points_willpower",
            "action_points_misc",
        ]
    ),
    "strike_accuracy": value_sum(
        [
            "strike_accuracy_scaling",
            "strike_accuracy_misc",
        ]
    ),
}
