#!/usr/bin/env python3

import click
import cgi_simple as cgi
import first_page
import active_abilities_page
import rolltemplate
import re
import identity_page
import paper_calculation_page
import paper_creation_page
import creation_page
import header_bar
import sheet_worker
import paper_skills_page
import items_page
import calculation_page
import reference_page
import status_page
from subprocess import call
import sys

try:
    if sys.argv[1] == "pretty":
        cgi.is_pretty = True
except IndexError:
    pass


@click.command()
@click.option("-d", "--destination", default="paper")
def main(destination):

    cgi.DESTINATION = destination

    if destination == "paper":
        call(["lessc", f"sheet.less", f"paper_sheet/sheet.css"])
        call(["lessc", f"paper_sheet.less", f"paper_sheet/paper_sheet.css"])
        for i, (name, module) in enumerate(
            [
                ["first_page", first_page],
                ["paper_creation_page", paper_creation_page],
                ["paper_skills_page", paper_skills_page],
                ["items_page", items_page],
                ["paper_calculation_page", paper_calculation_page],
            ]
        ):
            page = i + 1
            with open(f"paper_sheet/page{page}.html", "w") as fh:
                fh.write(
                    "".join(
                        [
                            debug_stylesheets(page, destination),
                            debug_html_wrapper(
                                module.create_page(destination), destination
                            ),
                        ]
                    )
                    + "\n"
                )
            call(["lessc", f"{name}.less", f"paper_sheet/page{page}.css"])
    else:
        with open("roll20.html", "w") as fh:
            fh.write(sheet_worker.generate_script())
            fh.write(
                cgi.div(
                    {"class": "full-sheet"},
                    [
                        "".join(header_bar.nav_row()),
                        first_page.create_page(cgi.DESTINATION),
                        active_abilities_page.create_page(cgi.DESTINATION),
                        creation_page.create_page(cgi.DESTINATION),
                        status_page.create_page(cgi.DESTINATION),
                        items_page.create_page(cgi.DESTINATION),
                        identity_page.create_page(cgi.DESTINATION),
                        calculation_page.create_page(cgi.DESTINATION),
                        reference_page.create_page(cgi.DESTINATION),
                        rolltemplate.rolltemplate_html(),
                    ],
                )
            )

        class_pattern = re.compile(r"\.([a-z\-]+)\b")
        with open("roll20.less", "w") as output_file:
            for filename in [
                "sheet",
                "first_page",
                "active_abilities_page",
                "creation_page",
                "status_page",
                "items_page",
                "identity_page",
                "calculation_page",
                "reference_page",
                "roll20_custom",
            ]:
                with open(filename + ".less", "r") as input_file:
                    if filename not in ["sheet", "roll20_custom"]:
                        output_file.write(f"div.page.{filename.replace('_', '-')} {{\n")
                    for line in input_file:
                        output_file.write(line)
                    if filename not in ["sheet", "roll20_custom"]:
                        output_file.write("\n}")
                output_file.write("\n\n")
            output_file.write(rolltemplate.rolltemplate_css())
            output_file.write("\n")

        call(["lessc", "roll20.less", "roll20.css"])


def debug_stylesheets(page_number, destination):

    if destination == "paper":
        return "<!DOCTYPE html>" + cgi.head(
            [
                cgi.link(
                    {
                        "rel": "stylesheet",
                        "href": "sheet.css",
                    }
                ),
                cgi.link(
                    {
                        "rel": "stylesheet",
                        "href": f"page{page_number}.css",
                    }
                ),
                cgi.link(
                    {
                        "rel": "stylesheet",
                        "href": destination + "_sheet.css",
                    }
                ),
            ]
        )
    elif destination == "roll20":
        return ""
    else:
        raise Exception("Unknown destination '" + destination + "'")


def debug_html_wrapper(html, destination):
    if destination == "paper":
        return cgi.div(
            {
                "class": "dialog characterdialog ui-dialog ui-dialog-content ui-widget-content"
            },
            cgi.div(
                {"id": "root", "class": "charsheet tab-pane"},
                cgi.div({"class": "paper full-sheet"}, html),
            ),
        )
    elif destination == "roll20":
        return html
    else:
        raise Exception("Unknown destination '" + destination + "'")


if __name__ == "__main__":
    main(None)
