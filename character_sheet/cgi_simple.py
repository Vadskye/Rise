is_pretty = False
input_name_prefix = None

DESTINATION = 'paper'

def html_separator():
    return '\n' if is_pretty else ''

# we're going to get really fancy and assert that attributes should always
# be a dict, and contents should always be in an array or None.
# If we get a non-dict attributes, those are actually attributes.
# This allows quickly nesting html tags
def ensure_valid_attributes_and_contents(attributes = None, contents = None):
    if type(attributes) != type(dict()):
        if contents is None:
            contents = attributes
            attributes = dict()
        else:
            # if we have both contents and attributes, something has gone wrong
            raise Exception("Both attributes ({0}) and contents ({1}) are defined".format(attributes, contents))
    if contents is None:
        contents = list()
    if isinstance(contents, str):
        contents = [contents]
    return attributes, contents

def html_tag(tag_name, attributes = None, contents = None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)

    if input_name_prefix and attributes.get('name'):
        attributes['name'] = input_name_prefix + attributes['name']

    if contents is None:
        return '<{0}{1} />'.format(
            tag_name,
            convert_html_attributes(attributes),
        )
    else:
        try:
            return '<{0}{1}>{2}{3}{4}</{0}>'.format(
                tag_name,
                convert_html_attributes(attributes),
                html_separator(),
                html_separator().join(contents),
                html_separator(),
            )
        except TypeError as e:
            print('{0}\n\tAttributes: {1}\n\tContents: {2}'.format(
                e,
                attributes,
                contents,
            ))

def convert_html_attributes(attributes = None):
    if attributes is None:
        return ''
    attributes_text = ''
    for attribute_name in attributes:
        if attributes.get(attribute_name) is not None:
            attributes_text += ' {0}="{1}"'.format(
                attribute_name,
                attributes.get(attribute_name)
            )
    return attributes_text

def button(attributes = None, contents = None):
    return html_tag('button', attributes, contents)

def div(attributes = None, contents = None):
    return html_tag('div', attributes, contents)

def form(attributes = None, contents = None):
    return html_tag('form', attributes, contents)

def h1(attributes = None, contents = None):
    return html_tag('h1', attributes, contents)

def h2(attributes = None, contents = None):
    return html_tag('h2', attributes, contents)

def head(attributes = None, contents = None):
    return html_tag('head', attributes, contents)

def link(attributes = None, contents = None):
    return html_tag('link', attributes, contents)

def span(attributes = None, contents = None):
    return html_tag('span', attributes, contents)

def style(attributes = None, contents = None):
    return html_tag('style', attributes, contents)

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
def table(attributes = None, contents = None):
    inner_html = ''
    for row in contents:
        inner_html += tr([td(col) for col in row])

    return html_tag('table', attributes, inner_html)

def td(attributes = None, contents = None):
    return html_tag('td', attributes, contents)

def tr(attributes = None, contents = None):
    return html_tag('tr', attributes, contents)

def card(attributes, contents):
    if attributes.has_key('class'):
        attributes['class'] += 'card'
    else:
        attributes['class'] = 'card'
    return div(attributes, contents)

def hidden_input(attributes = None):
    attributes = attributes or dict()
    attributes['type'] = 'hidden'
    return html_tag('input', attributes)

def number_input(attributes = None):
    attributes = attributes or dict()
    attributes['type'] = 'number'
    if DESTINATION == 'roll20' and not attributes.has_key('value'):
        attributes['value'] = '0'
    return html_tag('input', attributes)

def text_input(attributes = None):
    attributes = attributes or dict()
    attributes['type'] = 'text'
    attributes['size'] = attributes.get('size', '1')
    return html_tag('input', attributes)

# less simple

def space_join(values):
    return ' '.join(filter(None, values))

def space_append(dictionary, key, value):
    dictionary[key] = space_join([value, dictionary.get(key)])

def flex_row(attributes = None, contents = None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)
    space_append(attributes, 'class', 'flex-row')
    return div(attributes, contents)

def flex_col(attributes = None, contents = None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)
    space_append(attributes, 'class', 'flex-col')
    return div(attributes, contents)

def flex_wrapper(attributes = None, contents = None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)
    space_append(attributes, 'class', 'flex-wrapper')
    return div(attributes, contents)

def labeled_text_input(label_name, input_name, attributes = None):
    attributes = attributes or dict()
    space_append(attributes, 'class', 'labeled-text-input')
    return div(attributes, flex_col([
        text_input({
            'name': input_name,
        }),
        span(
            {'class': 'under-label'},
            label_name
        ),
    ]))

def labeled_number_input(label_name, input_name = None, attributes = None, input_attributes = None):
    attributes = attributes or dict()
    space_append(attributes, 'class', 'labeled-number-input')
    input_name = input_name or label_name.lower()

    if input_attributes is None:
        input_attributes = {'name': input_name}
    else:
        input_attributes['name'] = input_attributes.get('name') or input_name

    return flex_row(attributes, [
        span(
            {'class': 'number-label'},
            label_name
        ),
        number_input(input_attributes),
    ])

def unlabeled_number_input(attributes = None, number_input_attributes = None, text_input_attributes = None):
    attributes = attributes or dict()
    space_append(attributes, 'class', 'unlabeled-number-input')
    return flex_row(attributes, [
        text_input(attributes = text_input_attributes),
        number_input(attributes = number_input_attributes),
    ])

def underlabeled_number_input(label_name, input_name = None, attributes = None, input_attributes = None):
    attributes = attributes or dict()
    space_append(attributes, 'class', 'underlabeled-number-input')

    if input_attributes is None:
        input_attributes = {'name': input_name}
    else:
        input_attributes['name'] = input_attributes.get('name') or input_name

    return flex_col(attributes, [
        number_input(input_attributes),
        div(
            {'class': 'under-label'},
            label_name
        ),
    ])

def labeled_dual_input(label_name, text_input_name, number_input_name):
    return div({'class': 'labeled-dual-input'}, [
        labeled_text_input(label_name, text_input_name),
        number_input({
            'name': number_input_name,
        }),
    ])

def value_sum(values):
    return '(' + '+'.join(['@{'+value+'}' for value in values]) + ')'

def equation(attributes = None, contents = None, result_attributes = None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)
    space_append(attributes, 'class', 'equation')
    result_attributes = result_attributes or {'name': 'eq-total'}

    return flex_row(attributes, [
        underlabeled_number_input(
            'Total',
            input_attributes = result_attributes
        ),
        equals(),
        ''.join(contents),
    ])

def this_or_that(options):
    return flex_row(
        {'class': 'two-choices'},
        flex_col({'class': 'equation-glue'}, 'or').join(options)
    )

def equals():
    return flex_col({'class': 'equation-glue'}, div({'class': 'equation-math'}, '='))

def plus():
    return flex_col({'class': 'equation-glue'}, div({'class': 'equation-math'}, '+'))

def times():
    return flex_col({'class': 'equation-glue'}, div({'class': 'equation-math'}, 'x'))

def half(text):
    return span({'class': 'half'}, '&frac12 ') + text

def rise_title():
    return div(
        {'class': 'rise-title'},
        'Rise'
    )
