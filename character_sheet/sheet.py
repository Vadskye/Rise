from cgi_simple import *
import first_page
import second_page

DESTINATION = 'paper'

def main():
    with open('first_page.html', 'w') as fh:
        fh.write(''.join([
            '<!DOCTYPE html>',
            debug_stylesheets('first_page'),
            debug_html_wrapper(first_page.create_page()),
        ]) + '\n')
    with open('second_page.html', 'w') as fh:
        fh.write(''.join([
            '<!DOCTYPE html>',
            debug_stylesheets('second_page'),
            debug_html_wrapper(second_page.create_page()),
        ]) + '\n')

def debug_stylesheets(page_name):

    return head([
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

def debug_html_wrapper(html):
    return div(
        {
            'class': 'dialog characterdialog ui-dialog ui-dialog-content ui-widget-content',
        },
        div(
            {'id': 'root', 'class': 'charsheet tab-pane'},
            html
        )
    )

if __name__ == "__main__":
    main()
