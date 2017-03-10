'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TaskType = require('../types/TaskType');

var _TaskType2 = _interopRequireDefault(_TaskType);

var _humps = require('humps');

var _humps2 = _interopRequireDefault(_humps);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUrl = function getUrl(type, id) {
    console.log('building url');
    var url = '';
    switch (type) {
        case 'projects':
            url += '/projects/' + id + '/tasks.json';
            break;

        case 'tasklist':
            url += '/tasklists/' + id + '/tasks.json';
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
var apiType = new _graphql.GraphQLEnumType({
    name: 'apiTypes',
    values: {
        "projects": { value: "projects" },
        "tasklist": { value: "tasklist" }
    }
});

var filterType = new _graphql.GraphQLEnumType({
    name: 'filters',
    values: {
        "all": { value: "all" },
        "anytime": { value: "anytime" },
        "overdue": { value: "overdue" },
        "today": { value: "today" },
        "tomorrow": { value: "tomorrow" },
        "thisweek": { value: "thisweek" },
        "within7": { value: "within7" },
        "within14": { value: "within14" },
        "within30": { value: "within30" },
        "within365": { value: "within365" },
        "nodate": { value: "nodate" },
        "nostartdate": { value: "nostartdate" },
        "completed": { value: "completed" }
    }
});

var includeType = new _graphql.GraphQLEnumType({
    name: 'includes',
    values: {
        "nodate": { value: "nodate" },
        "nostartdate": { value: "nostartdate" },
        "noduedate": { value: "noduedate" },
        "overdue": { value: "overdue" }
    }
});

var sortType = new _graphql.GraphQLEnumType({
    name: 'sorting',
    values: {
        "duedate": { value: "duedate" },
        "startdate": { value: "startdate" },
        "dateadded": { value: "dateadded" },
        "priority": { value: "priority" },
        "project": { value: "project" },
        "company": { value: "company" }
    }
});

var tasks = {
    type: new _graphql.GraphQLList(_TaskType2.default),
    args: {
        apiType: { type: apiType },
        id: { type: _graphql.GraphQLString },
        filter: { type: filterType },
        include: { type: includeType },
        sort: { type: sortType },
        "tagIds": { type: _graphql.GraphQLString },
        getSubTasks: { type: _graphql.GraphQLBoolean }
    },
    resolve: function resolve(result, args, _ref) {
        var axios = _ref.axios;

        console.log('resolving tasks');
        var _url = getUrl(args.apiType, args.id);

        if (args.apiType && !args.id) {
            console.log('no id declared');
            throw new Error('The field "id" is required when an "apiType" is declared.');
        }

        var _queryArgs = Object.assign({}, args);

        // Remove these as they do not need serialized and sent
        if (_queryArgs.apiType) delete _queryArgs.apiType;
        if (_queryArgs.id) delete _queryArgs.id;

        // GraphQL does dig - or _ in the arg name so we need to
        // alter it back to how Teamwork expects it eg: 'tag-ids'
        if (_queryArgs.tagIds) {
            _queryArgs["tag-ids"] = _queryArgs.tagIds;
            delete _queryArgs.tagIds;
        }

        // Stringify our query object
        var qs = _querystring2.default.stringify(_queryArgs);

        _url = _url + '?' + qs;
        console.log('url: ' + _url);

        var taskPromise = axios.get(_url).then(function (res) {
            var data = res.data;
            var tasks = data["todo-items"];
            tasks = _humps2.default.camelizeKeys(tasks);
            return tasks;
        }).catch(function (err) {
            console.log('error fetching tasks');
            console.log(err);
            return err;
        });
        return taskPromise;
        //return [{ task: 'hello' }];
    }

};

exports.default = tasks;