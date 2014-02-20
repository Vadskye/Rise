import argparse
import re


def initialize_argument_parser():
    parser = argparse.ArgumentParser(description='Convert LaTeX into BBcode')
    parser.add_argument('-i', '--inputfile', dest='inputfile', 
            help='the LaTeX file to load', default='latex.txt')
    parser.add_argument('-o', '--outputfile', dest='outputfile',
            help='Where to store the outout', default='bbcode.txt') 
    return vars(parser.parse_args())

def find_recursive_parens(text):
    paren_pattern = re.compile(r'(\\\w+\{.*\})')
    paren_search =  paren_pattern.search(text)
    all_parens = list()
    while paren_search:
        paren_section = paren_search.group(1)
        all_parens.append(identify_components(paren_section))
        paren_search =  paren_pattern.search(all_parens[-1]['content'])
    return all_parens
        
        
def identify_components(paren_section):
    #the name of the LaTeX tag
    label = re.match(r'(.*?){', paren_section).group(1)
    content = re.search('{(.+)}', paren_section).group(1)
    return {'label': label, 'content': content}

def generate_tags(tag_name):
    return ['[{0}]'.format(tag_name), '[/{0}]'.format(tag_name)]

def combine_tags(tag_name, content):
    tags = generate_tags(tag_name)
    return ''.join([tags[0], content, tags[1]])

def translate_label(label, content):
    return {
            '\\parhead': combine_tags('b', content+':'),
            '\\textbf': combine_tags('b', content),
            '\\textit': combine_tags('i', content)
            }[label]
            
def create_sub(pattern, replacement):
    return lambda x: re.sub(pattern, replacement, x)

def generate_subs():
    all_subs = list()
    sub_file = open('substitutions.txt', 'r')
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
    substitutions = generate_subs()
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
        #m = re.findall(r'(\{.*\})', line)
        #all_parens = find_recursive_parens(line)
        
        #print all_parens
        #for element in all_parens:
        #    print translate_label(element['label'], element['content'])
