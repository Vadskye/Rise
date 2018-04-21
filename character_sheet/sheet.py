#!/usr/bin/env python3

import cgi_simple as cgi
import first_page
import second_page
import third_page
import ability_cards
from subprocess import call
import sys

DESTINATION = 'paper'

try:
    if sys.argv[1] == 'pretty':
        cgi.is_pretty = True
except IndexError:
    pass

if DESTINATION == 'roll20':
    cgi.input_name_prefix = 'attr_'

def compile_less():
    call(['lessc', 'ability_cards.less', 'ability_cards.css'])
    call(['lessc', 'first_page.less', 'first_page.css'])
    call(['lessc', 'second_page.less', 'second_page.css'])
    call(['lessc', 'third_page.less', 'third_page.css'])
    call(['lessc', 'sheet.less', 'sheet.css'])
    call(['lessc', 'paper_sheet.less', 'paper_sheet.css'])
    call(['lessc', 'roll20.less', 'roll20.css'])

def main():
    compile_less()

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

    with open('ability_cards.html', 'w') as fh:
        fh.write(''.join([
            debug_stylesheets('ability_cards'),
            debug_html_wrapper(ability_cards.create_page()),
        ]) + '\n')

def debug_stylesheets(page_name):

    if DESTINATION == 'paper':
        return '<!DOCTYPE html>' + cgi.head([
            cgi.link({
                'rel': 'stylesheet',
                'href': 'sheet.css',
            }),
            cgi.link({
                'rel': 'stylesheet',
                'href': page_name + '.css',
            }),
            cgi.link({
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
        return cgi.div(
            {
                'class': 'dialog characterdialog ui-dialog ui-dialog-content ui-widget-content',
            },
            cgi.div(
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
