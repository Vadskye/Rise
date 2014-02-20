import argparse
import re


def initialize_argument_parser():
    parser = argparse.ArgumentParser(description='Convert LaTeX into BBcode')
    parser.add_argument('-i', '--inputfile', dest='inputfile', 
            help='The LaTeX file to load', default='latex.txt')
    parser.add_argument('-s', '--subfile', dest='subfile',
            help='The file containing the substitutions made',
            default = 'substitutions.txt')
    parser.add_argument('-o', '--outputfile', dest='outputfile',
            help='Where to store the output', default='bbcode.txt') 
    return vars(parser.parse_args())

def create_sub(pattern, replacement):
    return lambda x: re.sub(pattern, replacement, x)

def generate_subs(subfile):
    all_subs = list()
    sub_file = open(subfile, 'r')
    group_pattern = re.compile(r'{\*}')
    eol_pattern = re.compile(r'\n')
    for line in sub_file:
        #Use # as comment
        if line[0]=='#':
            continue
        line = eol_pattern.sub('', line)
        #Allow use of {*} in place of the more complicated and often used
        #{(.*?)}
        line = group_pattern.sub(r'{(.*?)}', line)
        line = line.split('|')
        #checking length allows blank lines
        if len(line)==2:
            all_subs.append(create_sub(line[0], line[1]))
    return all_subs

if __name__=="__main__":
    args = initialize_argument_parser()
    inputfile = open(args['inputfile'], 'r')
    outputfile = open(args['outputfile'], 'w')
    substitutions = generate_subs(args['subfile'])
    begin_comment_pattern = re.compile(r'\\begin{comment}')
    end_comment_pattern = re.compile(r'\\end{comment}')
    is_comment = False
    for line in inputfile:
        line = line.strip(' ')
        if line=='\n':
            continue
        elif begin_comment_pattern.match(line):
            is_comment=True
        elif end_comment_pattern.match(line):
            is_comment=False
        elif not line[0]=='=' and not is_comment:
            for sub in substitutions:
                line = sub(line)

            if re.search(r'\\', line):
                print "Uncaught LaTeX",  line
                break
            outputfile.write(line)
