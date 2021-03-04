import re

re.IGNORECASE = 1

evil_patterns = [
    r"(\bdata:\b|eval|cookie|\bwindow\b|\bparent\b|\bthis\b)",  # suspicious javascript-type words
    r"behaviou?r|expression|moz-binding|@import|@charset|javascript|vbscript|[\<]|\\\w",
    r"//[\<>]",  # back slash, html tags,
    r"[\x7f-\xff]",  # high bytes -- suspect
    r"[\x00-\x08\x0B\x0C\x0E-\x1F]",  # low bytes -- suspect
    r"&\#/",  # bad charset
]

with open("roll20.css") as css_file:
    for line in css_file:
        # print line
        for pattern in evil_patterns:
            if re.search(pattern, line):
                print "Line is EVIL!"
                print line
                print pattern


print "nothing found?"
