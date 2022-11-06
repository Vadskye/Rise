import re


def join(*args):
    return "\n".join(filter(None, args))


newline_pattern = re.compile(r"\r?\n")
add_pattern = re.compile(r"[+] (\d)")
plus_pattern = re.compile(r"[+](\d)")
sub_pattern = re.compile(r"[-] (\d)")
minus_pattern = re.compile(r"[-](\d)([^e.])")


def latexify(text):
    """Convert the given text into relatively idiomatic LaTeX.
    This converts <> to {} and + to \\plus or \\add.
    This strips all SOL and EOL whitespace and removes blank lines.

    Args:
        text (string): The text to transform

    Yields:
        string: LaTeX code
    """

    text = text.replace("|", "\\")
    text = text.replace("<", "{").replace(">", "}")
    text = add_pattern.sub(r"\\add \1", text)
    text = plus_pattern.sub(r"\\plus\1", text)
    text = sub_pattern.sub(r"\\sub \1", text)
    text = minus_pattern.sub(r"\\minus\1\2", text)

    stripped_lines = [line.strip() for line in newline_pattern.split(text)]
    text = "\n".join([line for line in stripped_lines])
    return text


def tag_if(text, tag, test):
    if test:
        return f"|{tag}<{text}>"
    else:
        return text


# Using this fuction ensures consistent formatting of item longtables
def longtablify(text, include_type, wrapper_text=""):
    type_and_effects = "p<5em> p<20em>" if include_type else "p<26em>"
    return latexify(
        f"""
        \\begin<longtablewrapper>
            {wrapper_text}
            \\begin<longtable><p<17em> p<6em> {type_and_effects} p<3em>>
                {text.strip()}
            \\end<longtable>
        \\end<longtablewrapper>
    """
    )
