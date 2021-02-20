from os.path import abspath, dirname, join


def book_dir():
    script_dir = dirname(abspath(__file__))
    return join(script_dir, "../../../core_book/generated/")


def book_path(path):
    return join(book_dir(), path)
