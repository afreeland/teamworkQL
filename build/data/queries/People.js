'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _PeopleType = require('../types/PeopleType');

var _PeopleType2 = _interopRequireDefault(_PeopleType);

var _humps = require('humps');

var _humps2 = _interopRequireDefault(_humps);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUrl = function getUrl() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'people';
    var id = arguments[1];


    var url = '';
    switch (type) {
        case 'people':
            url = '/people.json';
            break;

        case 'projects':
            url = '/projects/' + id + '/people.json';
            break;

        case 'companies':
            url = '/companies/' + id + '/people.json';
            break;

        case 'person':
            url = '/people/' + id + '.json';
            break;

        case 'me':
            url = '/me.json';
            break;
    }

    return url;
};

var peopleApiEnumTypes = new _graphql.GraphQLEnumType({
    name: 'peopleApiTypes',
    values: {
        "people": { value: "people" },
        "projects": { value: "projects" },
        "companies": { value: "companies" },
        "person": { value: "person" },
        "me": { value: "me" }
    }
});

var people = {
    type: new _graphql.GraphQLList(_PeopleType2.default),
    args: {
        apiType: { type: peopleApiEnumTypes },
        id: { type: _graphql.GraphQLString }
    },
    resolve: function resolve(source, args, _ref) {
        var axios = _ref.axios;

        var _url = getUrl(args.apiType, args.id);

        var requestUrl = $BASE + _url;

        var peoplePromise = axios.get(requestUrl).then(function (res) {
            console.log('people');
            var data = res.data;
            console.log(data);
            var people = args.apiType == 'person' || args.apiType == 'me' ? [data.person] : data.people;
            console.log(people);
            people = _humps2.default.camelizeKeys(people);
            return people;
        }).catch(function (err) {
            throw new Error(err);
        });
        return peoplePromise;
    }
};

exports.default = people;