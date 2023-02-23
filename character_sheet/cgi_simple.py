is_pretty = True
input_name_prefix = None

DESTINATION = "paper"


def html_separator():
    return "\n" if is_pretty and DESTINATION == "paper" else ""


# we're going to get really fancy and assert that attributes should always
# be a dict, and contents should always be in an array or None.
# If we get a non-dict attributes, those are actually attributes.
# This allows quickly nesting html tags
def ensure_valid_attributes_and_contents(attributes=None, contents=None):
    if attributes is None:
        attributes = dict()
    if not isinstance(attributes, dict):
        if contents is None:
            contents = attributes
            attributes = dict()
        else:
            # if we have both contents and attributes, something has gone wrong
            raise Exception(
                "Both attributes ({0}) and contents ({1}) are defined".format(
                    attributes, contents
                )
            )
    if contents is None:
        contents = list()
    if isinstance(contents, str):
        contents = [contents.strip()]
    return attributes, contents


def html_tag(tag_name, attributes=None, contents=None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)

    if DESTINATION == "roll20":
        if tag_name == "input" and "name" not in attributes:
            raise Exception("Input must have name")

        if "name" in attributes:
            # Standarize on lowercase
            if attributes["name"] != attributes["name"].lower():
                raise Exception("Name must be lowercase: " + attributes["name"])

            # Standardize on only underscores
            if " " in attributes["name"]:
                raise Exception("Name must not have spaces: " + attributes["name"])
            if "-" in attributes["name"]:
                raise Exception("Name must not have dashes: " + attributes["name"])

    # An "attr_" prefix is required by roll20 for fields that are permanently
    # stored on the sheet. We explicitly avoid storing attributes that start
    # with "nostore_".
    if "name" in attributes and not attributes["name"].startswith("nostore_"):
        attributes["name"] = "attr_" + attributes["name"]

    is_self_closing_tag = tag_name in ["input"]

    if contents is None or is_self_closing_tag:
        return "<{0}{1} />".format(
            tag_name,
            convert_html_attributes(attributes),
        )
    else:
        try:
            return "<{0}{1}>{2}{3}{4}</{0}>".format(
                tag_name,
                convert_html_attributes(attributes),
                html_separator(),
                html_separator().join(contents),
                html_separator(),
            )
        except TypeError as e:
            raise Exception(
                "{0}\n\tAttributes: {1}\n\tContents: {2}".format(
                    e,
                    attributes,
                    contents,
                )
            )


def convert_html_attributes(attributes=None):
    if attributes is None:
        return ""
    attributes_text = ""
    for attribute_name in sorted(attributes.keys()):
        if attributes.get(attribute_name) is not None:
            attributes_text += ' {0}="{1}"'.format(
                attribute_name, attributes.get(attribute_name)
            )
    return attributes_text


def button(attributes=None, contents=None):
    return html_tag("button", attributes, contents)


def subtlebutton(attributes=None, contents=None):
    return span({"class": "subtle-button"}, html_tag("button", attributes, contents))


def invisiblebutton(attributes=None, contents=None):
    return span({"class": "invisible-button"}, html_tag("button", attributes, contents))


def div(attributes=None, contents=None):
    return html_tag("div", attributes, contents)


def fieldset(attributes, contents=None):
    if not (attributes["class"] and "repeating" in attributes["class"]):
        raise Exception("Fieldset must have repeating class name")
    # oddity: the section name cannot have underscores. Not currently asserting.
    return html_tag("fieldset", attributes, contents)


def form(attributes=None, contents=None):
    return html_tag("form", attributes, contents)


def h1(attributes=None, contents=None):
    return html_tag("h1", attributes, contents)


def h2(attributes=None, contents=None):
    return html_tag("h2", attributes, contents)


def head(attributes=None, contents=None):
    return html_tag("head", attributes, contents)


def link(attributes=None, contents=None):
    return html_tag("link", attributes, contents)


def span(attributes=None, contents=None):
    return html_tag("span", attributes, contents)


def style(attributes=None, contents=None):
    return html_tag("style", attributes, contents)


# input:
# [
#   [
#     col_attributes, col_content
#   ],
#   [
#     col_attributes, col_content
#   ],
#   ...
# ],
def table(attributes=None, contents=None):
    inner_html = ""
    for row in contents:
        inner_html += tr([td(col) for col in row])

    return html_tag("table", attributes, inner_html)


def td(attributes=None, contents=None):
    return html_tag("td", attributes, contents)


def tr(attributes=None, contents=None):
    return html_tag("tr", attributes, contents)


def card(attributes, contents):
    if "class" in attributes:
        attributes["class"] += "card"
    else:
        attributes["class"] = "card"
    return div(attributes, contents)


def hidden_input(attributes=None):
    attributes = attributes or dict()
    attributes["type"] = "hidden"
    return html_tag("input", attributes)


def number_input(attributes=None):
    attributes = attributes or dict()
    attributes["type"] = "number"
    if DESTINATION == "roll20" and "value" not in attributes:
        attributes["value"] = "0"
    elif (
        DESTINATION == "paper"
        and "value" in attributes
        and not attributes.get("disabled")
    ):
        # Hide "default" attributes from the paper sheet
        attributes["value"] = ""
    return html_tag("input", attributes)


def text_input(attributes=None):
    attributes = attributes or dict()
    attributes["type"] = "text"
    attributes["size"] = attributes.get("size", "1")
    if DESTINATION == "paper" and "value" in attributes:
        # Hide "default" attributes from the paper sheet
        attributes["value"] = ""
    return html_tag("input", attributes)


def radio_input(attributes):
    attributes = attributes or dict()
    attributes["type"] = "radio"
    if DESTINATION == "paper" and "value" in attributes:
        # Hide "default" attributes from the paper sheet
        attributes["value"] = ""
    return html_tag("input", attributes)


def textarea(attributes=None):
    attributes = attributes or dict()
    attributes["rows"] = attributes.get("rows", "1")
    attributes["cols"] = attributes.get("cols", "10")
    if DESTINATION == "paper" and "value" in attributes:
        # Hide "default" attributes from the paper sheet
        attributes["value"] = ""
    return html_tag("textarea", attributes, attributes.get("value", None))


# less simple


def space_join(values):
    return " ".join(filter(None, values))


def space_append(dictionary, key, value):
    dictionary[key] = space_join([value, dictionary.get(key)])


def flex_row(attributes=None, contents=None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)
    space_append(attributes, "class", "flex-row")
    return div(attributes, contents)


def flex_col(attributes=None, contents=None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)
    space_append(attributes, "class", "flex-col")
    return div(attributes, contents)


def flex_wrapper(attributes=None, contents=None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)
    space_append(attributes, "class", "flex-wrapper")
    return div(attributes, contents)


def labeled_text_input(label_name, attributes=None, input_attributes=None):
    attributes = attributes or dict()
    space_append(attributes, "class", "labeled-text-input")
    return flex_col(
        attributes,
        [
            text_input(input_attributes),
            span({"class": "under-label"}, label_name),
        ]
    )


def labeled_number_input(label_name, attributes=None, input_attributes=None):
    attributes = attributes or dict()
    space_append(attributes, "class", "labeled-text-input")
    return flex_col(
        attributes,
        [
            number_input(input_attributes),
            span({"class": "under-label"}, label_name),
        ]
    )


def labeled_textarea(label_name, attributes=None, input_attributes=None):
    attributes = attributes or dict()
    space_append(attributes, "class", "labeled-text-input")
    return flex_col(
        attributes,
        [
            textarea(input_attributes),
            span({"class": "under-label"}, label_name),
        ]
    )


def sidelabeled_number_input(label_name, attributes=None, input_attributes=None):
    attributes = attributes or dict()
    space_append(attributes, "class", "sidelabeled-number-input")

    return flex_row(
        attributes,
        [
            span({"class": "number-label"}, label_name),
            number_input(input_attributes),
        ],
    )


def freeform_number_input(
    attributes=None, text_input_attributes=None, number_input_attributes=None
):
    attributes = attributes or dict()
    space_append(attributes, "class", "freeform-number-input")
    return flex_row(
        attributes,
        [
            text_input(text_input_attributes),
            number_input(number_input_attributes),
        ],
    )


def labeled_dual_input(label_name, text_input_name, number_input_name):
    return div(
        {"class": "labeled-dual-input"},
        [
            labeled_text_input(label_name, text_input_name),
            number_input(
                {
                    "name": number_input_name,
                }
            ),
        ],
    )


def value_sum(values):
    return "(" + "+".join(["@{" + value + "}" for value in values]) + ")"


def equation(
    attributes=None,
    contents=None,
    result_attributes=None,
    input_type=None,
    result_label="Total",
    underlabel_attributes=None,
):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)
    space_append(attributes, "class", "equation")
    result_attributes = result_attributes or dict()
    underlabel_attributes = underlabel_attributes or dict()
    space_append(underlabel_attributes, "class", "equation-result")
    input_type = input_type or number_input

    return flex_row(
        attributes,
        [
            underlabel(
                result_label, input_type(result_attributes), underlabel_attributes
            ),
            equals(),
            "".join(contents),
        ],
    )


def this_or_that(options):
    return flex_row(
        {"class": "two-choices"},
        flex_col({"class": "equation-glue"}, "or").join(options),
    )


def equals():
    return flex_col({"class": "equation-glue"}, div({"class": "equation-math"}, "="))


def plus():
    return flex_col({"class": "equation-glue"}, div({"class": "equation-math"}, "+"))


def minus():
    return flex_col({"class": "equation-glue"}, div({"class": "equation-math"}, "-"))


def times():
    return flex_col({"class": "equation-glue"}, div({"class": "equation-math"}, "x"))


def half(text):
    return span({"class": "half"}, "&frac12 ") + text


def rise_title():
    return div({"class": "rise-title"}, "Rise")


def underlabel(label_name, input_html, attributes=None):
    attributes = attributes or dict()
    space_append(attributes, "class", "underlabeled")

    return flex_col(
        attributes,
        [
            input_html,
            div({"class": "under-label"}, label_name),
        ],
    )


def underlabel_spaced(label_name, input_html, attributes=None):
    attributes = attributes or dict()
    space_append(attributes, "class", "labeled-text-input"),
    return flex_col(
        attributes,
        [
            input_html,
            span({"class": "under-label"}, label_name),
        ]
    )


def sidelabel(label_name, input_html, attributes=None):
    attributes = attributes or dict()
    space_append(attributes, "class", "sidelabeled-number-input")

    return flex_row(
        attributes,
        [
            span({"class": "number-label"}, label_name),
            input_html,
        ],
    )


def select(attributes=None, contents=None):
    return html_tag("select", attributes, contents)


def option(attributes=None, contents=None):
    return html_tag("option", attributes, contents)


def checkbox(attributes=None):
    attributes = attributes or dict()
    attributes["type"] = "checkbox"
    attributes["value"] = "1"
    return html_tag("input", attributes)


def underlabeled_checkbox(label_text, attributes=None, input_attributes=None):
    attributes = attributes or dict()
    space_append(attributes, "class", "underlabeled-checkbox")
    return flex_col(
        attributes,
        [
            checkbox(input_attributes),
            span(
                {"class": "under-label"},
                label_text,
            ),
        ],
    )


def label(attributes, text):
    attributes = attributes or dict()
    return html_tag("label", attributes, text)


def ol(attributes=None, contents=None):
    return html_tag("ol", attributes, contents)


def ul(attributes=None, contents=None):
    return html_tag("ul", attributes, contents)


def li(attributes=None, contents=None):
    return html_tag("li", attributes, contents)


def p(attributes=None, contents=None):
    return html_tag("p", attributes, contents)


def labeled_span(label_name, attributes=None, input_attributes=None):
    attributes = attributes or dict()
    space_append(attributes, "class", "labeled-text-input")
    return flex_col(
        attributes,
        [
            span(input_attributes),
            span({"class": "under-label"}, label_name),
        ]
    )
