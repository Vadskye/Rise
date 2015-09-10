# we're going to get really fancy and assert that attributes should always
# be a dict, and contents should always be iterable.
# If we get a non-dict attributes, those are actually attributes.
# This allows quickly nesting html tags
def html_tag(tag_name, attributes = None, contents = None):
    if type(attributes) != type(dict()):
        if contents is None:
            contents = attributes
            attributes = None
        else:
            # if we have both contents and attributes, something has gone wrong
            raise Exception("Both attributes ({0}) and contents ({1}) are defined".format(attributes, contents))
    if contents is None:
        return '<{0}{1} />'.format(
            tag_name,
            convert_html_attributes(attributes),
        )
    else:
        try:
            return '<{0}{1}>\n  {2}\n</{0}>'.format(
                tag_name,
                convert_html_attributes(attributes),
                contents if isinstance(contents, basestring)
                    else '\n  '.join(contents)
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

def input(attributes = None, contents = None):
    return html_tag('input', attributes, contents)

def link(attributes = None, contents = None):
    return html_tag('link', attributes, contents)

def span(attributes = None, contents = None):
    return html_tag('span', attributes, contents)

def style(attributes = None, contents = None):
    return html_tag('style', attributes, contents)

def card(attributes, contents):
    if attributes.has_key('class'):
        attributes['class'] += 'card'
    else:
        attributes['class'] = 'card'
    return div(attributes, contents)

def text_input(attributes):
    attributes['type'] = 'text'
    return input(attributes)

def number_input(attributes):
    attributes['type'] = 'number'
    return input(attributes)
