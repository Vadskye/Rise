from cgi_simple import (
    div,
    flex_col,
    flex_row,
    flex_wrapper,
    label,
    labeled_text_input,
    number_input,
    option,
    radio_input,
    select,
    span,
    underlabel_spaced,
    underlabel,
)


def create_page(destination):
    return flex_row(
        {"class": "header-bar"},
        [
            boring_stuff(destination),
        ],
    )

def boring_stuff(destination):
    return div(
        {"class": "boring-stuff"},
        [
            flex_row(
                {"class": "boring-row"},
                [
                    labeled_text_input(
                        "Character name", input_attributes={"name": "character_name"}
                    ),
                    labeled_text_input(
                        "Player name", input_attributes={"name": "player_name"}
                    ),
                    labeled_text_input("Concept", input_attributes={"name": "concept"}),
                    underlabel_spaced(
                        "Level",
                        number_input({"class": "fake-text", "name": "level"}),
                        attributes={"class": "level-input"},
                    ),
                    *(
                        [
                            underlabel_spaced(
                                "CR",
                                number_input(
                                    {"class": "fake-text", "name": "challenge_rating"}
                                ),
                                attributes={"class": "challenge-rating-input"},
                            ),
                            underlabel("Chat color", select(
                                {"class": "chat-color", "name": "chat_color"},
                                [
                                    option({"value": "black"}, "Black"),
                                    option({"value": "blue"}, "Blue"),
                                    option({"value": "bluegreen"}, "Bluegreen"),
                                    option({"value": "brown"}, "Brown"),
                                    option({"value": "gold"}, "Gold"),
                                    option({"value": "gray"}, "Gray"),
                                    option({"value": "green"}, "Green"),
                                    option({"value": "orange"}, "Orange"),
                                    option({"value": "purple"}, "Purple"),
                                ],
                            ))
                        ]
                        if destination == "roll20"
                        else []
                    ),
                ],
            ),
        ],
    )


def nav_row():
    return [
        # You'd think that this should be wrapping the nav buttons. And that
        # would be reasonable! But in fact the CSS that is used to omake the nav
        # buttons functional only works if they are technically children of the
        # main pages, so this div is empty and creatively styled with CSS to
        # make it look like it contains the nav buttons.
        div({"class": "nav-bar"}),
        radio_input(
            {
                "class": "nav-button nav-button-page1",
                "checked": "checked",
                "name": "navrow",
                "value": "page1",
            }
        ),
        span({"class": "nav-button-label"}, "Core"),
        radio_input(
            {"class": "nav-button nav-button-active", "name": "navrow", "value": "active"}
        ),
        span({"class": "nav-button-label"}, "Active"),
        radio_input(
            {"class": "nav-button nav-button-page2", "name": "navrow", "value": "page2"}
        ),
        span({"class": "nav-button-label"}, "Calcs"),
        radio_input(
            {"class": "nav-button nav-button-page3", "name": "navrow", "value": "page3"}
        ),
        span({"class": "nav-button-label"}, "Misc"),
        radio_input(
            {"class": "nav-button nav-button-page4", "name": "navrow", "value": "page4"}
        ),
        span({"class": "nav-button-label"}, "Status"),
        radio_input(
            {"class": "nav-button nav-button-page5", "name": "navrow", "value": "page5"}
        ),
        span({"class": "nav-button-label"}, "Ref"),
    ]
