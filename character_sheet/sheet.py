import cgi_simple
from cgi_simple import *
import first_page
import second_page
import third_page
import sys

DESTINATION = 'paper'

try:
    if sys.argv[1] == 'pretty':
        cgi_simple.is_pretty = True
except IndexError:
    pass

if DESTINATION == 'roll20':
    cgi_simple.input_name_prefix = 'attr_'

def main():
    with open('first_page.html', 'w') as fh:
        fh.write(''.join([
            debug_stylesheets('first_page'),
            debug_html_wrapper(first_page.create_page()),
        ]) + '\n')

    with open('second_page.html', 'w') as fh:
        fh.write(''.join([
            debug_stylesheets('second_page'),
            debug_html_wrapper(second_page.create_page()),
        ]) + '\n')

    with open('third_page.html', 'w') as fh:
        fh.write(''.join([
            debug_stylesheets('third_page'),
            debug_html_wrapper(third_page.create_page()),
        ]) + '\n')

def debug_stylesheets(page_name):

    if DESTINATION == 'paper':
        return '<!DOCTYPE html>' + head([
            #link({
            #    'rel': 'stylesheet',
            #    'href': 'roll20.css',
            #}),
            #link({
                #'rel': 'stylesheet',
                #'href': 'roll20_editor.css',
            #}),
            link({
                'rel': 'stylesheet',
                'href': 'sheet.css',
            }),
            link({
                'rel': 'stylesheet',
                'href': page_name + '.css',
            }),
            link({
                'rel': 'stylesheet',
                'href': DESTINATION + '_sheet.css',
            }),
        ])
    elif DESTINATION == 'roll20':
        return ""
    else:
        raise Exception("Unknown destination '" + DESTINATION + "'")

def debug_html_wrapper(html):
    if DESTINATION == 'paper':
        return div(
            {
                'class': 'dialog characterdialog ui-dialog ui-dialog-content ui-widget-content',
            },
            div(
                {'id': 'root', 'class': 'charsheet tab-pane'},
                html
            )
        )
    elif DESTINATION == 'roll20':
        return html
    else:
        raise Exception("Unknown destination '" + DESTINATION + "'")

if __name__ == "__main__":
    main()
