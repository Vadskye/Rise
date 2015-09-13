is_pretty = False

def set_pretty(new_pretty):
    is_pretty = new_pretty

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
    if isinstance(contents, basestring):
        contents = [contents]
    return attributes, contents

def html_tag(tag_name, attributes = None, contents = None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)
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
            print '{0}\n\tAttributes: {1}\n\tContents: {2}'.format(
                e,
                attributes,
                contents,
            )

def convert_html_attributes(attributes = None):
    if attributes is None:
        return ''
    attributes_text = ''
    for attribute_name in attributes:
        attributes_text += ' {0}="{1}"'.format(
            attribute_name,
            attributes.get(attribute_name)
        )
    return attributes_text

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

def text_input(attributes = None):
    attributes = attributes or dict()
    attributes['type'] = 'text'
    attributes['size'] = attributes.get('size', '1')
    return html_tag('input', attributes)

def number_input(attributes = None):
    attributes = attributes or dict()
    attributes['type'] = 'number'
    return html_tag('input', attributes)

# less simple

def flex_row(attributes = None, contents = None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)
    attributes['class'] = 'flex-row ' + attributes.get('class', '')
    return div(attributes, contents)

def flex_col(attributes = None, contents = None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)
    attributes['class'] = 'flex-col ' + attributes.get('class', '')
    return div(attributes, contents)

def flex_wrapper(attributes = None, contents = None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)
    attributes['class'] = 'flex-wrapper ' + attributes.get('class', '')
    return div(attributes, contents)

def labeled_text_input(label_name, input_name, attributes = None):
    attributes = attributes or dict()
    attributes['class'] = 'labeled-text-input ' + attributes.get('class', '')
    return div(attributes, flex_col([
        text_input({
            'name': input_name,
        }),
        span(
            {'class': 'under-label'},
            label_name
        ),
    ]))

def labeled_number_input(label_name, input_name = None, attributes = None):
    attributes = attributes or dict()
    attributes['class'] = 'labeled-number-input ' + attributes.get('class', '')
    input_name = input_name or label_name.lower()

    return flex_row(attributes, [
        span(
            {'class': 'number-label'},
            label_name
        ),
        number_input({
            'name': input_name,
        }),
    ])

def unlabeled_number_input(attributes = None):
    attributes = attributes or dict()
    attributes['class'] = 'unlabeled-number-input ' + attributes.get('class', '')
    return flex_row(attributes, [
        text_input(),
        number_input(),
    ])

def underlabeled_number_input(label_name, input_name, attributes = None):
    attributes = attributes or dict()
    if attributes.has_key('class'):
        attributes['class'] += ' underlabeled-number-input'
    else:
        attributes['class'] = 'underlabeled-number-input'

    return flex_col(attributes, [
        number_input({
            'name': input_name,
        }),
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
