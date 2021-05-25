#!/usr/bin/env python3

import click
import cgi_simple as cgi
import first_page
import active_abilities_page
import rolltemplate
import re
import second_page
import header_bar
import sheet_worker
import skills_page
import third_page
import reference_page
import status_page
from subprocess import call
import sys

try:
    if sys.argv[1] == 'pretty':
        cgi.is_pretty = True
except IndexError:
    pass

@click.command()
@click.option('-d', '--destination', default='paper')
def main(destination):

    cgi.DESTINATION = destination

    if destination == 'paper':
        with open('first_page.html', 'w') as fh:
            fh.write(''.join([
                debug_stylesheets('first_page', destination),
                debug_html_wrapper(
                    ''.join([
                        header_bar.create_page(destination),
                        first_page.create_page(destination)
                    ]),
                    destination,
                ),
            ]) + '\n')
        call(['lessc', 'first_page.less', 'first_page.css'])

        for (name, module) in [
                ['active_abilities_page', active_abilities_page],
                ['second_page', second_page],
                ['third_page', third_page],
                ['skills_page', skills_page],
                ['reference_page', reference_page],
                ['status_page', status_page],
        ]:
            with open(f'{name}.html', 'w') as fh:
                fh.write(''.join([
                    debug_stylesheets(name, destination),
                    debug_html_wrapper(module.create_page(destination), destination),
                ]) + '\n')
            call(['lessc', f'{name}.less', f'{name}.css'])
    else:
        with open('roll20.html', 'w') as fh:
            fh.write(sheet_worker.generate_script())
            fh.write(cgi.div({'class': 'full-sheet'}, [
                header_bar.create_page(cgi.DESTINATION),
                ''.join(header_bar.nav_row()),
                first_page.create_page(cgi.DESTINATION),
                active_abilities_page.create_page(cgi.DESTINATION),
                skills_page.create_page(cgi.DESTINATION),
                second_page.create_page(cgi.DESTINATION),
                third_page.create_page(cgi.DESTINATION),
                status_page.create_page(cgi.DESTINATION),
                reference_page.create_page(cgi.DESTINATION),
                rolltemplate.rolltemplate_html(),
            ]))

        class_pattern = re.compile(r'\.([a-z\-]+)\b')
        with open('roll20.less', 'w') as output_file:
            for filename in ['sheet', 'first_page', 'active_abilities_page', 'skills_page', 'second_page', 'third_page', 'roll20_custom', 'reference_page', 'status_page']:
                with open(filename + '.less', 'r') as input_file:
                    if filename not in ['sheet', 'roll20_custom']:
                        output_file.write(f"div.page.{filename.replace('_', '-')} {{\n")
                    for line in input_file:
                        output_file.write(line)
                    if filename not in ['sheet', 'roll20_custom']:
                        output_file.write("\n}")
                output_file.write('\n\n')
            output_file.write(rolltemplate.rolltemplate_css())
            output_file.write('\n')

        call(['lessc', 'roll20.less', 'roll20.css'])

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
    main(None)
