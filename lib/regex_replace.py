import argparse
import os
import re
import fileinput

#This relies on a config file with patterns and replacements, delimited by two sequential pipes: '||'.
#For now we assume the file has less than 100 entities.
#This breaks if the file has more than that, but that is something that can be dealt with later.

def find_files(file_matcher):
    file_pattern = re.compile(file_matcher)
    #from http://stackoverflow.com/questions/13031989/regular-expression-using-in-glob-glob-of-python
    return [file for file in os.listdir('.') if file_pattern.search(file)]
    
def generate_substitutions(config_file):
    substitution_list=[]
    replacement_count=0
    remove_eol_pattern = re.compile(ur'[\r\n]+')
    for line in config_file:
        #ignore comments and blank lines
        if(line[0]=='#' or line=='\n'):
            continue
        line_without_newline = remove_eol_pattern.sub('',line)
        line_split = line_without_newline.split("||")
        substitution_list.append((line_split[0],line_split[1].decode('utf-8')))
        replacement_count+=1
        if replacement_count>99:
            print 'No more room for regular expressions in the config file'
            break
    #Perform all of the matchings at once
    #regex_pattern = re.compile('|'.join('({0})'.format(re.escape(p) for p, s in substitution_list)))
    regex_pattern_string = '|'.join('(%s)' % re.escape(p) for p, s in substitution_list)
    replacement_list = [s for p, s in substitution_list]
    replacement_func = lambda m: replacement_list[m.lastindex - 1]
    regex_pattern = re.compile(regex_pattern_string)
    return {'pattern':regex_pattern,'replacement':replacement_func}
    
def perform_substitutions(file_list, substitutions):
    pattern = substitutions['pattern']
    replacement = substitutions['replacement']
    
    for file_name in file_list:
        print 'Replacements in file', file_name, ':',
        count=0
        for line in fileinput.input(file_name,inplace=True):
            #fileinput redirects stdout to the file
            #the comma suppresses the newline
            if pattern.search(line):
                count+=1
            print pattern.sub(replacement, line),
        print count

if __name__=='__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('file_matcher', help='a regex that matches the files to parse')
    parser.add_argument('-c', dest='config_file', help='config file listing the regex to apply', default='regex_replace_config.txt')
    args = vars(parser.parse_args())
    config = open(args['config_file'],'r')
    
    file_list = find_files(args['file_matcher'])
    config_file = open(args['config_file'],'r')
    substitutions = generate_substitutions(config_file)
    perform_substitutions(file_list, substitutions)
    #for file in file_list: