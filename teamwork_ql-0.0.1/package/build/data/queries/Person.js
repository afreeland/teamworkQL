'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _PersonType = require('../types/PersonType');

var _PersonType2 = _interopRequireDefault(_PersonType);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _humps = require('humps');

var _humps2 = _interopRequireDefault(_humps);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $BASE = 'https://mhsystem.teamwork.com';
console.log('$base: ' + $BASE);

var key = 'twp_FkFHf9A8WMB0MJD1hGO0FWB5UmG3';
var base64 = new Buffer(key + ":xxx").toString("base64");
console.log(base64);
_axios2.default.defaults.headers.common['Authorization'] = 'BASIC ' + base64;

var people = {
    type: new _graphql.GraphQLList(_PersonType2.default),
    args: {},
    resolve: function resolve(source, args) {
        var url = $BASE + '/people.json';

        var peoplePromise = _axios2.default.get(url).then(function (res) {
            console.log('people');
            var data = res.data;
            console.log(data);
            var people = data.people;
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