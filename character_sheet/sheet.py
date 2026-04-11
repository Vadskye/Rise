#!/usr/bin/env python3
from __future__ import annotations
import click
import cgi_simple as cgi
import first_page
import active_abilities_page
import rolltemplate
import header_bar
import sheet_worker
import items_page
import calculation_page
import reference_page
import status_page
import identity_page
import attribute_page
import paper_creation_page
import paper_creation_reference
import creation_page
from subprocess import call
import sys
import os
import shutil
from typing import Literal

if len(sys.argv) > 1 and sys.argv[1] == "pretty":
    cgi.is_pretty = True
    _ = sys.argv.pop(1)


@click.command()
@click.option("-d", "--destination", type=click.Choice(["paper", "roll20"]), default="paper")
def main(destination: Literal["paper", "roll20"] = "paper") -> None:

    cgi.DESTINATION = destination

    if destination == "paper":
        os.makedirs("paper_sheet", exist_ok=True)
        run_lessc("sheet.less", "paper_sheet/sheet.css")
        run_lessc("paper_sheet.less", "paper_sheet/paper_sheet.css")
        for i, (name, module) in enumerate(
            [
                ("first_page", first_page),
                ("paper_creation_page", paper_creation_page),
                ("items_page", items_page),
                ("attribute_page", attribute_page),
                ("paper_creation_reference", paper_creation_reference),
            ]
        ):
            page = i + 1
            with open(f"paper_sheet/page{page}.html", "w", encoding="utf-8") as fh:
                _ = fh.write(
                    "".join(
                        [
                            debug_stylesheets(page, destination),
                            debug_html_wrapper(
                                module.create_page(destination), destination # type: ignore
                            ),
                        ]
                    )
                    + "\n"
                )
            _ = run_lessc(f"{name}.less", f"paper_sheet/page{page}.css")
    else:
        with open("roll20.html", "w", encoding="utf-8") as fh:
            _ = fh.write(sheet_worker.generate_script())
            _ = fh.write(
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

        with open("roll20.less", "w", encoding="utf-8") as output_file:
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
                with open(filename + ".less", "r", encoding="utf-8") as input_file:
                    if filename not in ["sheet", "roll20_custom"]:
                        _ = output_file.write(f"div.page.{filename.replace('_', '-')} {{\n")
                    for line in input_file:
                        _ = output_file.write(line)
                    if filename not in ["sheet", "roll20_custom"]:
                        _ = output_file.write("\n}")
                _ = output_file.write("\n\n")
            _ = output_file.write(rolltemplate.rolltemplate_css())
            _ = output_file.write("\n")

        run_lessc("roll20.less", "roll20.css")


def run_lessc(input_file: str, output_file: str) -> None:
    # Try finding lessc in PATH
    lessc = shutil.which("lessc")
    if lessc:
        _ = call([lessc, input_file, output_file])
    else:
        # Fallback to npx lessc
        # shell=True is often required on Windows for npx/npm since they are cmd/batch files
        _ = call(["npx", "-p", "less", "lessc", input_file, output_file], shell=(os.name == "nt"))


def debug_stylesheets(page_number: int, destination: str) -> str:

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


def debug_html_wrapper(html: str, destination: str) -> str:
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
    main()  # type: ignore
