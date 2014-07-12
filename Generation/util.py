def generate_split_args(args):
    #Count the number of significant aspects
    aspect_count=0
    if args['damage']: aspect_count+=1
    if args['condition']: aspect_count+=len([x for x in args['condition'] if x!=0])
    if args['buff']: aspect_count+=len([x for x in args['buff'] if x!=0])
    new_args_list = list()
    keys = args.keys()
    for i in xrange(aspect_count):
        new_args = dict()
        for key in keys:
            if is_list(args[key]):
                if len(args[key])>1:
                    new_args[key]=args[key][i]
                else:
                    new_args[key]=args[key][0]
            else:
                new_args[key]=args[key]
        new_args_list.append(new_args)
    return new_args_list

def is_list(value):
    return type(value)==type(list())

def bool_parser(value):
    if value=='0' or value=='False' or value=='false' or value=='none':
        return False
    return True
