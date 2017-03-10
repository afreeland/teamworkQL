import TaskType from '../types/TaskType';

import humps from 'humps';
import querystring from 'querystring';


import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLEnumType,
  GraphQLBoolean
} from 'graphql';


const getUrl = (type, id) => {
    console.log('building url');
    let url = ''
    switch(type){
        case 'projects':
            url += `/projects/${id}/tasks.json`;
        break;

        case 'tasklist':
            url += `/tasklists/${id}/tasks.json`;
        break;

        default:
            url += '/tasks.json';
        break;
    }
    console.log(url);
    return url;
};

/**
 * Used to determine what the scope of tasks that are being retrieved
 */
var apiType = new GraphQLEnumType({
    name: 'apiTypes',
    values: {
        "projects" : { value: "projects" },
        "tasklist": { value: "tasklist" }
    }
})


var filterType = new GraphQLEnumType({
    name: 'filters',
    values: {
        "all": { value: "all"},
        "anytime": { value: "anytime"},
        "overdue": { value: "overdue"},
        "today": { value: "today"},
        "tomorrow": { value: "tomorrow"},
        "thisweek": { value: "thisweek"},
        "within7": { value: "within7"},
        "within14": { value: "within14"},
        "within30": { value: "within30"},
        "within365": { value: "within365"},
        "nodate": { value: "nodate"},
        "nostartdate": { value: "nostartdate"},
        "completed": { value: "completed"},
    }
});

var includeType = new GraphQLEnumType({
    name: 'includes',
    values: {
        "nodate": { value: "nodate" },
        "nostartdate": { value: "nostartdate" },
        "noduedate": { value: "noduedate" },
        "overdue": { value: "overdue" },
    }
})

var sortType = new GraphQLEnumType({
    name: 'sorting',
    values: {
        "duedate": { value: "duedate" },
        "startdate": { value: "startdate" },
        "dateadded": { value: "dateadded" },
        "priority": { value: "priority" },
        "project": { value: "project" },
        "company": { value: "company" },
    }
})

const tasks = {
    type: new GraphQLList(TaskType),
    args: {
        apiType: {type: apiType },
        id: { type: GraphQLString },
        filter: { type: filterType },
        include: { type: includeType },
        sort: { type: sortType },
        "tagIds": { type: GraphQLString },
        getSubTasks: { type: GraphQLBoolean }
    },
    resolve: function(result, args, { axios }){
        console.log('resolving tasks');
        var _url = getUrl(args.apiType, args.id);
        
        if(args.apiType && !args.id){
            console.log('no id declared');
            throw new Error('The field "id" is required when an "apiType" is declared.');
        }


        var _queryArgs = Object.assign({}, args);
        
        // Remove these as they do not need serialized and sent
        if(_queryArgs.apiType) delete _queryArgs.apiType;
        if(_queryArgs.id) delete _queryArgs.id;

        // GraphQL does dig - or _ in the arg name so we need to
        // alter it back to how Teamwork expects it eg: 'tag-ids'
        if(_queryArgs.tagIds){
            _queryArgs["tag-ids"] = _queryArgs.tagIds;
            delete _queryArgs.tagIds;
        }

        // Stringify our query object
        var qs = querystring.stringify(_queryArgs);

        _url = _url + '?' + qs;
        console.log('url: ' + _url);


        const taskPromise = axios.get(_url)
            .then(function(res){
                var data = res.data;
                var tasks = data["todo-items"];
                tasks = humps.camelizeKeys(tasks);
                return tasks;
            })
            .catch(function(err){
                console.log('error fetching tasks');
                console.log(err);
                return err;
            });
        return taskPromise;
        //return [{ task: 'hello' }];
    }
    
}



export default tasks;