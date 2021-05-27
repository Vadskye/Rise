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


def nav_row():
    return [
        # You'd think that this should be wrapping the nav buttons. And that
        # would be reasonable! But in fact the CSS that is used to make the nav
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
        span({"class": "nav-button-label"}, "Skills"),
        radio_input(
            {"class": "nav-button nav-button-page3", "name": "navrow", "value": "page3"}
        ),
        span({"class": "nav-button-label"}, "Calcs"),
        radio_input(
            {"class": "nav-button nav-button-page4", "name": "navrow", "value": "page4"}
        ),
        span({"class": "nav-button-label"}, "Identity"),
        radio_input(
            {"class": "nav-button nav-button-page5", "name": "navrow", "value": "page5"}
        ),
        span({"class": "nav-button-label"}, "Items"),
        radio_input(
            {"class": "nav-button nav-button-page6", "name": "navrow", "value": "page6"}
        ),
        span({"class": "nav-button-label"}, "Status"),
        radio_input(
            {"class": "nav-button nav-button-page7", "name": "navrow", "value": "page7"}
        ),
        span({"class": "nav-button-label"}, "Ref"),
    ]
