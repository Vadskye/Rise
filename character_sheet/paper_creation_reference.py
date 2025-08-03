from cgi_simple import (
    bold,
    checkbox,
    div,
    equation,
    fieldset,
    flex_col,
    flex_row,
    flex_wrapper,
    labeled_textarea,
    labeled_text_input,
    labeled_number_input,
    li,
    minus,
    number_input,
    ol,
    option,
    p,
    plus,
    select,
    sidelabel,
    span,
    textarea,
    text_input,
    ul,
    underlabel,
    underlabeled_checkbox,
)

def create_page(_destination):
    return flex_col(
        {"class": "page creation-reference-page"},
        flex_row([
            div({"class": "section-header"}, "Character Creation Guide"),
            concept(1),
            motivation_and_goal(2),
            species(3),
            attributes(4),
            base_class(5),
            class_archetype(6),
            combat(7),
            items(8),
            resources(9),
            skills(10),
            background(11),
            description(12),
            alignment(13),
        ]),
    )

def creation_step(i, title, short_description, extra_detail=None):
    if extra_detail:
        extra_detail = span({"class": "extra-detail"}, extra_detail)
    else:
        extra_detail = ""
    return flex_col(
        {"class": "creation-reference-step"},
        [
            span({"class": "short-description"}, [
                bold(f"Step {i}: {title}. "),
                short_description,
            ]),
            extra_detail,
        ],
    )

def concept(nth):
    return creation_step(
        nth,
        "Concept",
        'Think of a short phrase that describes your character concept. Record it above "Concept" on the second page.',
    )

def motivation_and_goal(nth):
    return creation_step(
        nth,
        "Motivation and goal",
        'What is your character trying to achieve, and why? Record it above "Motivation and Goal" on the second page.',
    )

def species(nth):
    return creation_step(
        nth,
        "Species",
        """Record your character's species above "Species" on the second page. You don't need to write down any of the specific effects of your species yet.""",
        """
            The common species are humans, dwarves, elves, gnomes, half-elves, half-orcs, halflings, and orcs.
            At the GM's discretion, you could also be a more unusual species.
        """,
    )

def attributes(nth):
    return creation_step(
        nth,
        "Attributes",
        """
            Fill in your starting attributes into the "Base" boxes in the "Attributes and Skills" section on the fourth page. Then, fill in any attribute modifiers from your species into the "Species" boxes in the same section. Copy your total attributes over to the front page.
        """,
        """
            You have 8 points to distribute among your base attributes, to a maximum of 3.
            As a reminder, the common attribute arrays are:
            <ul>
                <li>Standard: 3, 2, 2, 1, 0, 0</li>
                <li>Specialized: 3, 3, 2, 0, 0, 0</li>
                <li>Balanced: 2, 2, 2, 1, 1, 0</li>
            </ul>
        """,
    )

def base_class(nth):
    return creation_step(
        nth,
        "Base Class",
        """
            Record your base class above "Base Class" on the second page. Record its weapon and armor proficiencies in the "Equipment Proficiencies" box in the same section. Then, fill in all numeric effects of your base class in the "Resources" and "Defensive Statistics" sections on the fourth page. You don't need to record your class skills yet.
        """,
        """
            There are eleven normal classes: barbarian, cleric, druid, fighter, monk, paladin, ranger, rogue, sorcerer, votive, and wizard.
            If you are an uncommon species, your base class might be the base class from your species instead.
            If your base class has any special class abilities, such as a votive's soul pact, record their name and effects now in the "Abilities" section.
        """,
    )

def class_archetype(nth):
    return creation_step(
        6,
        "Class Archetype",
        """
            Record your first class archetype in the "Archetypes" box on the second page. Note that it is currently rank 1. If it modifies your statistics, record those modifiers in the appropriate boxes on the third and fourth pages. Recording more complicated abilities, such as spells and maneuvers, can wait.
        """,
        """
            Each normal class has five archetypes.
            You choose one of those archetypes.
            If you are an uncommon species, your first archetype might be from your species class instead.
        """,
    )

def combat(nth):
    return creation_step(
        7,
        "Calculate Combat Statistics",
        """
            Finish the calculations in the "Offensive Statistics" and "Defensive Statistics" sections on the fourth page.
            Once that is done, fill in the "Core Statistics" and "Defenses" sections on the first page.
        """,
    )


def items(nth):
    return creation_step(
        8,
        "Items and Equipment",
        """
            Choose from among the equipment offered to you by your base class.
            Record your items on the third page.
        """,
    )

def resources(nth):
    return creation_step(
        9,
        "Calculate Resources",
        """
            Finalize the calculation for all of your resources in the "Resources" section, taking into account any resources granted by your first archetype. You can spend your insight points now to gain more abilities, such as spells or maneuvers. Record any abilities that you in gain in this way.
        """,
        """
            Recording your choices in the "Combat styles and mystic spheres" box in "Character Creation" can help you keep track of them.
            Other abilities that you have to choose, like metamagic and hunting styles, can be recorded in the "Other chosen abilities" box.
            Active abilities, like spells and maneuvers, can go in the "Attacks and Abilities" section.
            If you learn a spell that you attune to, record it in the "Attunement Abilities and Equipment" section on the third page, and record its effects on the first page or fourth page appropriately.
        """,
    )

def skills(nth):
    return creation_step(
        10,
        "Skills",
        """
            Choose which skills you have trained and mark them as trained in the checkboxes on the fourth page. Then, calculate your total modifier for those skills and copy those values to the first page.
        """,
        """
        """,
    )

def background(nth):
    return creation_step(
        11,
        "Background",
        """
            Decide your character's general background. Optionally, you can choose a specific character background benefit and background flaw. Record what you decide in the "Background" box on the second page.
        """,
        """
            The character sheet does not have room to hold a detailed background. However, don't let that restrict your ideas for your character! You can share your background with your GM separately.
        """,
    )

def description(nth):
    return creation_step(
        12,
        "Character Description",
        """
            Decide additional details for your character. What is their general personality? What do they look like? Record a brief summary in the "Description" box on the second page.
        """,
        """
            As with your background, the character sheet doesn't have room for a detailed description, but you should still feel free to create one.
        """,
    )

def alignment(nth):
    return creation_step(
        13,
        "Alignment",
        """
            What is your character's general moral outlook? Record your alignment above "Alignment" on the second page.
        """,
        """
            Your alignment has two dimensions: good/neutral/evil, and lawful/neutral/chaotic.
        """,
    )

def name(nth):
    return creation_step(
        14,
        "Name",
        """
            Record your character's name at the top of the first page if you haven't done so already.
        """,
    )
