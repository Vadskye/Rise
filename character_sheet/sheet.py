#!/usr/bin/env python3

import click
import cgi_simple as cgi
import first_page
import second_page
import third_page
import ability_cards as generate_ability_cards
from subprocess import call
import sys

try:
    if sys.argv[1] == 'pretty':
        cgi.is_pretty = True
except IndexError:
    pass

def compile_less():
    call(['lessc', 'ability_cards.less', 'ability_cards.css'])
    call(['lessc', 'first_page.less', 'first_page.css'])
    call(['lessc', 'second_page.less', 'second_page.css'])
    call(['lessc', 'third_page.less', 'third_page.css'])
    call(['lessc', 'sheet.less', 'sheet.css'])
    call(['lessc', 'paper_sheet.less', 'paper_sheet.css'])
    call(['lessc', 'roll20.less', 'roll20.css'])


@click.command()
@click.option('-a', '--ability-cards/--no-ability-cards', default=False)
@click.option('-d', '--destination', default='paper')
def main(ability_cards, destination):
    compile_less()

    if destination == 'roll20':
        cgi.input_name_prefix = 'attr_'

    with open('first_page.html', 'w') as fh:
        fh.write(''.join([
            debug_stylesheets('first_page', destination),
            debug_html_wrapper(first_page.create_page(), destination),
        ]) + '\n')

    with open('second_page.html', 'w') as fh:
        fh.write(''.join([
            debug_stylesheets('second_page', destination),
            debug_html_wrapper(second_page.create_page(), destination),
        ]) + '\n')

    with open('third_page.html', 'w') as fh:
        fh.write(''.join([
            debug_stylesheets('third_page', destination),
            debug_html_wrapper(third_page.create_page(), destination),
        ]) + '\n')

    if ability_cards:
        with open('ability_cards.html', 'w') as fh:
            fh.write(''.join([
                debug_stylesheets('ability_cards', destination),
                debug_html_wrapper(generate_ability_cards.create_page(), destination),
            ]) + '\n')

def debug_stylesheets(page_name, destination):

    if destination == 'paper':
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
                'href': destination + '_sheet.css',
            }),
        ])
    elif destination == 'roll20':
        return ""
    else:
        raise Exception("Unknown destination '" + destination + "'")

def debug_html_wrapper(html, destination):
    if destination == 'paper':
        return cgi.div(
            {
                'class': 'dialog characterdialog ui-dialog ui-dialog-content ui-widget-content',
            },
            cgi.div(
                {'id': 'root', 'class': 'charsheet tab-pane'},
                html
            )
        )
    elif destination == 'roll20':
        return html
    else:
        raise Exception("Unknown destination '" + destination + "'")

if __name__ == "__main__":
    main()
