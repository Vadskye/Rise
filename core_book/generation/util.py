import re

def join(*args):
    return '\n'.join(filter(None, args))

newline_pattern = re.compile(r'[\r\n]+')
add_pattern = re.compile(r'[+] (\d)')
plus_pattern = re.compile(r'[+](\d)')
sub_pattern = re.compile(r'[-] (\d)')
minus_pattern = re.compile(r'[-](\d)')
def latexify(text):
    """Convert the given text into relatively idiomatic LaTeX.
    This converts <> to {} and + to \\plus or \\add.
    This strips all SOL and EOL whitespace and removes blank lines.

    Args:
        text (string): The text to transform

    Yields:
        string: LaTeX code
    """

    text = text.replace('<', '{').replace('>', '}')
    text = add_pattern.sub(r'\\add \1', text)
    text = plus_pattern.sub(r'\\plus\1', text)
    text = sub_pattern.sub(r'\\sub \1', text)
    text = minus_pattern.sub(r'\\minus\1', text)

    stripped_lines = [
        line.strip()
        for line in newline_pattern.split(text)
    ]
    # strip blank lines
    text = '\n'.join([
        line for line in stripped_lines if line != ""
    ])
    return text
