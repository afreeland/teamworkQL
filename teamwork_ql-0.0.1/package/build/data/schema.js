'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var _Task = require('./queries/Task');

var _Task2 = _interopRequireDefault(_Task);

var _Task3 = require('./mutations/Task');

var _Task4 = _interopRequireDefault(_Task3);

var _People = require('./queries/People.js');

var _People2 = _interopRequireDefault(_People);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _graphql.GraphQLSchema({
    query: new _graphql.GraphQLObjectType({
        name: 'Query',
        fields: function fields() {
            return {
                tasks: _Task2.default,
                people: _People2.default
            };
        }
    }),

    mutation: new _graphql.GraphQLObjectType({
        name: 'Mutations',
        fields: function fields() {
            return Object.assign({}, _Task4.default);
        }
    })
});

exports.default = schema;