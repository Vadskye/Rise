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
            items(7),
            combat(8),
            resources(9),
            skills(10),
            background(11),
            description(12),
            alignment(13),
            div({"class": "page-number"}, "Page 5"),
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
        'Record a short phrase that describes your character concept on Page 2.',
    )

def motivation_and_goal(nth):
    return creation_step(
        nth,
        "Motivation and goals",
        'What is your character trying to achieve, and why? Record it on Page 2.',
    )

def species(nth):
    return creation_step(
        nth,
        "Species",
        """Record your character's species on Page 2. Record any numeric modifiers it gives you on Page 4 and any other abilities on Page 2.""",
    )

def attributes(nth):
    return creation_step(
        nth,
        "Attributes",
        """
            Record your starting attributes in the "Base" boxes in the "Attributes and Skills" section on Page 4. Then, copy your total attributes over to Page 1.
        """,
        """
            You have 8 points to distribute among your base attributes, to a maximum of 3 in each individual attribute.
        """,
    )

def base_class(nth):
    return creation_step(
        nth,
        "Base Class",
        """
            Record your base class, and any equipment proficiencies it gives you, on Page 2. Then, fill in all numeric effects of your base class in the "Resources" section on Page 2 and the "Defensive Statistics" section on Page 4. You don't need to record your skills yet.
        """,
        """
            If your base class has any special class abilities, such as a votive's soul pact, record their name and effects now in the "Abilities" section.
        """,
    )

def class_archetype(nth):
    return creation_step(
        nth,
        "Class Archetype",
        """
            Record your first class archetype on Page 2. Note that it is currently rank 1. If it modifies your statistics, record those modifiers in the appropriate boxes on the third and fourth pages. Recording more complicated abilities that you have to make decisions for, such as spells and maneuvers, can wait.
        """,
    )

def items(nth):
    return creation_step(
        nth,
        "Items and Equipment",
        """
            Choose from among the equipment offered to you by your base class.
            Record your items on Page 3.
        """,
    )

def combat(nth):
    return creation_step(
        nth,
        "Statistics and Resources",
        """
            Finish the calculations in the "Offensive Statistics" and "Defensive Statistics" sections on Page 4.
            Once that is done, fill in the "Core Statistics" and "Defenses" sections on Page 1.
            Then, finish the calculation for all of your resources in the "Resources" section, taking into account any resources granted by your class archetype.
            Spending your insight points can wait.
        """,
    )


def resources(nth):
    return creation_step(
        nth,
        "Insight Points and Abilities",
        """
            Now, choose any specific abilities that you have to make decisions for, such as spells and maneuvers. You can also spend insight points to gain more of those abilities. Record any abilities that you in gain in this way.
        """,
        """
            Recording your choices on Page 2 can help you keep track of them.
            Active abilities, like spells and maneuvers, should go on Page 1.
            If you learn a spell that you attune to, record that you are attuned to it on Page 3.
            You can save insight points to spend later instead of spending them now.
        """,
    )

def skills(nth):
    return creation_step(
        nth,
        "Skills",
        """
            Choose which skills you have trained and mark them as trained in the checkboxes on Page 4. Then, calculate your total modifier for those skills and copy those values to Page 1.
        """,
        """
        """,
    )

def background(nth):
    return creation_step(
        nth,
        "Background",
        """
            Decide your character's general background. Optionally, you can choose a specific character background benefit and background flaw. Record what you decide on Page 2.
        """,
        """
            The character sheet does not have room to hold a detailed background. However, don't let that restrict your ideas for your character! You can share your background with your GM separately.
        """,
    )

def description(nth):
    return creation_step(
        nth,
        "Character Description",
        """
            Decide additional details for your character. What is their general personality? What do they look like? Record a brief summary on Page 2.
        """,
        """
            As with your background, the character sheet doesn't have room for a detailed description, but you should still feel free to create one elsewhere.
        """,
    )

def alignment(nth):
    return creation_step(
        nth,
        "Alignment",
        """
            What is your character's general moral outlook? Record your alignment on Page 2.
        """,
        """
            Alignment has two dimensions: good/neutral/evil, and lawful/neutral/chaotic.
        """,
    )

def name(nth):
    return creation_step(
        nth,
        "Name",
        """
            Record your character's name at the top of Page 1 if you haven't done so already.
        """,
    )
