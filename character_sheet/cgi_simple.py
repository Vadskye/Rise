from __future__ import annotations
from collections.abc import Iterable, Callable
from typing import Literal, cast, Any

is_pretty = True
input_name_prefix: str | None = None

DESTINATION: Literal["paper", "roll20"] = "paper"


def html_separator() -> str:
    return "\n" if is_pretty and DESTINATION == "paper" else ""


# we're going to get really fancy and assert that attributes should always
# be a dict, and contents should always be in an array or None.
# If we get a non-dict attributes, those are actually attributes.
# This allows quickly nesting html tags
def ensure_valid_attributes_and_contents(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> tuple[dict[str, object], list[str]]:
    final_attributes: dict[str, object] = {}
    final_contents: list[str] = []

    if attributes is None:
        pass
    elif isinstance(attributes, dict):
        final_attributes = cast(dict[str, object], attributes)
    else:
        if contents is None:
            contents = attributes
        else:
            raise Exception(
                "Both attributes ({0}) and contents ({1}) are defined".format(
                    attributes, contents
                )
            )

    if contents is None:
        pass
    elif isinstance(contents, str):
        final_contents = [contents.strip()]
    elif isinstance(contents, list):
        final_contents = [str(c) for c in cast(list[object], contents)]
    else:
        final_contents = [str(contents)]

    return final_attributes, final_contents


def html_tag(
    tag_name: str,
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
    attr_dict, cont_list = ensure_valid_attributes_and_contents(attributes, contents)

    if DESTINATION == "roll20":
        if tag_name == "input" and "name" not in attr_dict:
            raise Exception("Input must have name")

        if "name" in attr_dict:
            # Standarize on lowercase
            name_str = str(attr_dict["name"])
            if name_str != name_str.lower():
                raise Exception("Name must be lowercase: " + name_str)

            # Standardize on only underscores
            if " " in name_str:
                raise Exception("Name must not have spaces: " + name_str)
            if "-" in name_str:
                raise Exception("Name must not have dashes: " + name_str)

    # An "attr_" prefix is required by roll20 for fields that are permanently
    # stored on the sheet. We explicitly avoid storing attributes that start
    # with "nostore_".
    if "name" in attr_dict:
        name_str = str(attr_dict["name"])
        if not name_str.startswith("nostore_") and not name_str.startswith("act_") and not name_str.startswith("attr_"):
            attr_dict["name"] = "attr_" + name_str

    is_self_closing_tag = tag_name in ["input"]

    if not cont_list or is_self_closing_tag:
        return "<{0}{1} />".format(
            tag_name,
            convert_html_attributes(attr_dict),
        )
    else:
        try:
            return "<{0}{1}>{2}{3}{4}</{0}>".format(
                tag_name,
                convert_html_attributes(attr_dict),
                html_separator(),
                html_separator().join(cont_list),
                html_separator(),
            )
        except TypeError as e:
            raise Exception(
                "{0}\n\tAttributes: {1}\n\tContents: {2}".format(
                    e,
                    attr_dict,
                    cont_list,
                )
            )


def convert_html_attributes(attributes: dict[str, object] | None = None) -> str:
    if attributes is None:
        return ""
    attributes_text = ""
    for attribute_name in sorted(attributes.keys()):
        if attributes.get(attribute_name) is not None:
            attributes_text += ' {0}="{1}"'.format(
                attribute_name, attributes.get(attribute_name)
            )
    return attributes_text


def button(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
    return html_tag("button", attributes, contents)


def subtlebutton(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
    return span({"class": "subtle-button"}, html_tag("button", attributes, contents))


def invisiblebutton(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
    return span({"class": "invisible-button"}, html_tag("button", attributes, contents))


def div(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
    return html_tag("div", attributes, contents)


def fieldset(attributes: dict[str, object], contents: str | list[str] | object | None = None) -> str:
    if not (attributes["class"] and "repeating" in str(attributes["class"])):
        raise Exception("Fieldset must have repeating class name")
    # oddity: the section name cannot have underscores. Not currently asserting.
    return html_tag("fieldset", attributes, contents)


def form(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
    return html_tag("form", attributes, contents)


def h1(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
    return html_tag("h1", attributes, contents)


def h2(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
    return html_tag("h2", attributes, contents)


def head(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
    return html_tag("head", attributes, contents)


def link(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
    return html_tag("link", attributes, contents)


def span(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
    return html_tag("span", attributes, contents)


def style(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
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
def table(
    attributes: dict[str, object] | object | None = None,
    contents: Iterable[Iterable[str | dict[str, object]]] | None = None,
) -> str:
    inner_html = ""
    if contents:
        for row in contents:
            inner_html += tr([td(col) for col in row])

    return html_tag("table", attributes, inner_html)


def td(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
    return html_tag("td", attributes, contents)


def tr(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
    return html_tag("tr", attributes, contents)


def card(attributes: dict[str, object], contents: str | list[str] | object | None) -> str:
    if "class" in attributes:
        attributes["class"] = str(attributes["class"]) + " card"
    else:
        attributes["class"] = "card"
    return div(attributes, contents)


def number_input(attributes: dict[str, object] | None = None) -> str:
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


def text_input(attributes: dict[str, object] | None = None) -> str:
    attributes = attributes or dict()
    attributes["autocomplete"] = "off"
    attributes["type"] = "text"
    attributes["size"] = attributes.get("size", "1")
    if DESTINATION == "paper" and "value" in attributes:
        # Hide "default" attributes from the paper sheet
        attributes["value"] = ""
    return html_tag("input", attributes)


def radio_input(attributes: dict[str, object] | None = None) -> str:
    attributes = attributes or dict()
    attributes["type"] = "radio"
    if DESTINATION == "paper" and "value" in attributes:
        # Hide "default" attributes from the paper sheet
        attributes["value"] = ""
    return html_tag("input", attributes)


def textarea(attributes: dict[str, object] | None = None) -> str:
    attributes = attributes or dict()
    attributes["rows"] = attributes.get("rows", "1")
    attributes["cols"] = attributes.get("cols", "10")
    if DESTINATION == "paper" and "value" in attributes:
        # Hide "default" attributes from the paper sheet
        attributes["value"] = ""
    return html_tag("textarea", attributes, str(attributes.get("value", "")))


# less simple


def space_join(values: Iterable[str | None]) -> str:
    return " ".join(filter(None, values))


def space_append(dictionary: dict[str, object], key: str, value: str | None) -> None:
    dictionary[key] = space_join([value, str(dictionary.get(key, ""))])


def flex_row(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
    attributes_dict, contents_list = ensure_valid_attributes_and_contents(attributes, contents)
    space_append(attributes_dict, "class", "flex-row")
    return div(attributes_dict, contents_list)


def flex_col(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
    attributes_dict, contents_list = ensure_valid_attributes_and_contents(attributes, contents)
    space_append(attributes_dict, "class", "flex-col")
    return div(attributes_dict, contents_list)


def flex_wrapper(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
    attributes_dict, contents_list = ensure_valid_attributes_and_contents(attributes, contents)
    space_append(attributes_dict, "class", "flex-wrapper")
    return div(attributes_dict, contents_list)


def labeled_text_input(
    label_name: str,
    attributes: dict[str, object] | None = None,
    input_attributes: dict[str, object] | None = None,
) -> str:
    attributes = attributes or dict()
    space_append(attributes, "class", "labeled-text-input")
    return flex_col(
        attributes,
        [
            text_input(input_attributes),
            span({"class": "under-label"}, label_name),
        ]
    )


def labeled_number_input(
    label_name: str,
    attributes: dict[str, object] | None = None,
    input_attributes: dict[str, object] | None = None,
) -> str:
    attributes = attributes or dict()
    space_append(attributes, "class", "labeled-text-input")
    return flex_col(
        attributes,
        [
            number_input(input_attributes),
            span({"class": "under-label"}, label_name),
        ]
    )


def labeled_textarea(
    label_name: str,
    attributes: dict[str, object] | None = None,
    input_attributes: dict[str, object] | None = None,
) -> str:
    attributes = attributes or dict()
    space_append(attributes, "class", "labeled-text-input")
    return flex_col(
        attributes,
        [
            textarea(input_attributes),
            span({"class": "under-label"}, label_name),
        ]
    )


def sidelabeled_number_input(
    label_name: str | object,
    attributes: dict[str, object] | None = None,
    input_attributes: dict[str, object] | None = None,
) -> str:
    attributes = attributes or dict()
    space_append(attributes, "class", "sidelabeled-number-input")

    return flex_row(
        attributes,
        [
            span({"class": "number-label"}, str(label_name)),
            number_input(input_attributes),
        ],
    )


def freeform_number_input(
    attributes: dict[str, object] | None = None,
    text_input_attributes: dict[str, object] | None = None,
    number_input_attributes: dict[str, object] | None = None
) -> str:
    attributes = attributes or dict()
    space_append(attributes, "class", "freeform-number-input")
    return flex_row(
        attributes,
        [
            text_input(text_input_attributes),
            number_input(number_input_attributes),
        ],
    )


def labeled_dual_input(label_name: str, text_input_name: str, number_input_name: str) -> str:
    return div(
        {"class": "labeled-dual-input"},
        [
            labeled_text_input(label_name, attributes={"nostore_text": text_input_name}),
            number_input(
                {
                    "name": number_input_name,
                }
            ),
        ],
    )


def value_sum(values: Iterable[str]) -> str:
    return "(" + "+".join(["@{" + value + "}" for value in values]) + ")"


def equation(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
    result_attributes: dict[str, object] | None = None,
    input_type: Callable[[dict[str, object] | None], str] | None = None,
    result_label: str = "Total",
    underlabel_attributes: dict[str, object] | None = None,
) -> str:
    attributes_dict, contents_list = ensure_valid_attributes_and_contents(attributes, contents)
    space_append(attributes_dict, "class", "equation")
    result_attributes = result_attributes or dict()
    underlabel_attributes = underlabel_attributes or dict()
    space_append(underlabel_attributes, "class", "equation-result")
    
    func: Callable[[dict[str, object] | None], str] = number_input if input_type is None else input_type
    
    return flex_row(
        attributes_dict,
        [
            underlabel(
                result_label, func(result_attributes), underlabel_attributes # type: ignore
            ),
            equals(),
            "".join(contents_list),
        ],
    )


def this_or_that(options: list[str]) -> str:
    return flex_row(
        {"class": "two-choices"},
        flex_col({"class": "equation-glue"}, "or").join(options), # join is not on string here, wait
    )


def equals() -> str:
    return flex_col({"class": "equation-glue"}, div({"class": "equation-math"}, "="))


def plus() -> str:
    return flex_col({"class": "equation-glue"}, div({"class": "equation-math"}, "+"))


def minus() -> str:
    return flex_col({"class": "equation-glue"}, div({"class": "equation-math"}, "-"))


def times() -> str:
    return flex_col({"class": "equation-glue"}, div({"class": "equation-math"}, "x"))


def half(text: str) -> str:
    return span({"class": "half"}, "&frac12 ") + text


def rise_title() -> str:
    return div({"class": "rise-title"}, "Rise")


def underlabel(
    label_name: str, input_html: str, attributes: dict[str, object] | None = None
) -> str:
    attributes = attributes or dict()
    space_append(attributes, "class", "underlabeled")

    return flex_col(
        attributes,
        [
            input_html,
            div({"class": "under-label"}, label_name),
        ],
    )


def underlabel_spaced(
    label_name: str, input_html: str, attributes: dict[str, object] | None = None
) -> str:
    attributes = attributes or dict()
    space_append(attributes, "class", "labeled-text-input")
    return flex_col(
        attributes,
        [
            input_html,
            span({"class": "under-label"}, label_name),
        ]
    )


def sidelabel(
    label_name: str, input_html: str, attributes: dict[str, object] | None = None
) -> str:
    attributes = attributes or dict()
    space_append(attributes, "class", "sidelabeled-number-input")

    return flex_row(
        attributes,
        [
            span({"class": "number-label"}, label_name),
            input_html,
        ],
    )


def select(
    attributes: dict[str, object] | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
    return html_tag("select", attributes, contents)


def option(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None,
) -> str:
    return html_tag("option", attributes, contents)


def checkbox(attributes: dict[str, object] | None = None) -> str:
    attributes = attributes or dict()
    attributes["type"] = "checkbox"
    attributes["value"] = "1"
    return html_tag("input", attributes)


def underlabeled_checkbox(
    label_text: str,
    attributes: dict[str, object] | None = None,
    input_attributes: dict[str, object] | None = None
) -> str:
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


def label(attributes: dict[str, object] | None, text: str) -> str:
    attributes = attributes or dict()
    return html_tag("label", attributes, text)


def ol(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None
) -> str:
    return html_tag("ol", attributes, contents)


def ul(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None
) -> str:
    return html_tag("ul", attributes, contents)


def li(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None
) -> str:
    return html_tag("li", attributes, contents)


def p(
    attributes: dict[str, object] | object | None = None,
    contents: str | list[str] | object | None = None
) -> str:
    return html_tag("p", attributes, contents)


def labeled_span(
    label_name: str,
    attributes: dict[str, object] | None = None,
    input_attributes: dict[str, object] | None = None
) -> str:
    attributes = attributes or dict()
    space_append(attributes, "class", "labeled-text-input")
    return flex_col(
        attributes,
        [
            span(input_attributes),
            span({"class": "under-label"}, label_name),
        ]
    )

def equation_misc(name: str, i: int = 0) -> str:
    return flex_col(
        [
            number_input(
                {
                    "class": "equation-misc",
                    "name": f"{name}_misc_{i}",
                }
            ),
            text_input(
                {
                    "class": "invisible-text-input",
                    "name": f"{name}_misc_label_{i}",
                }
            ),
        ]
    )

def equation_fraction(numerator: str | object, denominator: str | object) -> str:
    return div({"class": "calc-fraction"}, [
        div({"class": "calc-numerator"}, str(numerator)),
        div({"class": "calc-denominator"}, str(denominator)),
    ])


def bold(text: str) -> str:
    return html_tag("b", text)


def equation_misc_repeat(name: str, count: int = 1, joiner: Callable[[], str] = plus) -> str:
    sep = joiner()
    return sep.join([equation_misc(name, i) for i in range(count)])

def number_reminder(name: str) -> str:
    return text_input(
        {"class": "inline-number reminder", "readonly": True, "name": name}
    )
def text_reminder(name: str) -> str:
    return span(
        {"class": "reminder", "name": name}
    )
