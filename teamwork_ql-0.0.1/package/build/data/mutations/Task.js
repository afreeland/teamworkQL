'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TaskType = require('../types/TaskType');

var _TaskType2 = _interopRequireDefault(_TaskType);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _humps = require('humps');

var _humps2 = _interopRequireDefault(_humps);

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $BASE = 'https://mhsystem.teamwork.com';
console.log('$base: ' + $BASE);

var key = 'twp_FkFHf9A8WMB0MJD1hGO0FWB5UmG3';
var base64 = new Buffer(key + ":xxx").toString("base64");
console.log(base64);
_axios2.default.defaults.headers.common['Authorization'] = 'BASIC ' + base64;

var mutation = {
    createTask: {
        type: _TaskType2.default,
        args: {
            tasklistId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
            content: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
            description: { type: _graphql.GraphQLString },
            parentTaskId: { type: _graphql.GraphQLInt },
            // TODO
            // Should only be from 0 to 90
            progress: { type: _graphql.GraphQLInt },

            notify: { type: _graphql.GraphQLBoolean },
            responsiblePartyId: { type: _graphql.GraphQLInt },
            // TODO
            // Format YYYYMMDD
            startDate: { type: _graphql.GraphQLString },
            dueDate: { type: _graphql.GraphQLString },

            // TODO
            // 'not set', 'low', 'medium', 'high'
            priority: { type: _graphql.GraphQLString },

            estimatedMinutes: { type: _graphql.GraphQLInt },

            // TODO
            // -2 Ignore, -1 Place top of list, 0 Place bottom of list
            positionAfterTask: { type: _graphql.GraphQLInt },

            tags: { type: _graphql.GraphQLString },
            commentFollowerIds: { type: _graphql.GraphQLString },
            changeFollowerIds: { type: _graphql.GraphQLString },
            private: { type: _graphql.GraphQLBoolean },
            grantAccessTo: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(source, args) {
            // All of the fields the user entered
            var task = Object.assign({}, args);

            // Used to help build out our URL
            var tasklistId = task.tasklistId;

            // We do not need to include the actual tasklistId in the payload
            delete task.tasklistId;

            var payload = {
                "todo-item": task
            };

            var createPromise = _axios2.default.post($BASE + ('/tasklists/' + tasklistId + '/tasks.json'), payload).then(function (res) {
                var data = res.data;
                var _id = data.id;
                var _affectedTaskIds = data.affectedTaskIds;
                task.id = _id;
                return task;
            }).catch(function (err) {
                console.log(err);
                return err;
            });

            return createPromise;
        }
    },

    markTaskComplete: {
        type: _TaskType2.default,
        args: {
            id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
        },
        resolve: function resolve(source, _ref) {
            var id = _ref.id;

            var createPromise = _axios2.default.put($BASE + ('/tasks/' + id + '/complete.json')).then(function (res) {
                var data = res.data;
                return {
                    id: id,
                    status: data.STATUS,
                    affectedTaskIds: data.affectedTaskIds
                };
            }).catch(function (err) {
                console.log(err);
                return err;
            });

            return createPromise;
        }
    },

    markTaskUncomplete: {
        type: _TaskType2.default,
        args: {
            id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
        },
        resolve: function resolve(source, _ref2) {
            var id = _ref2.id;

            var createPromise = _axios2.default.put($BASE + ('/tasks/' + id + '/uncomplete.json')).then(function (res) {
                var data = res.data;
                return {
                    id: id,
                    status: data.STATUS,
                    affectedTaskIds: data.affectedTaskIds
                };
            }).catch(function (err) {
                console.log(err);
                return err;
            });

            return createPromise;
        }
    },

    destroyTask: {
        type: _TaskType2.default,
        args: {
            id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
        },
        resolve: function resolve(source, _ref3) {
            var id = _ref3.id;

            var createPromise = _axios2.default.delete($BASE + ('/tasks/' + id + '.json')).then(function (res) {
                var data = res.data;
                return {
                    id: id,
                    status: data.STATUS,
                    affectedTaskIds: data.affectedTaskIds
                };
            }).catch(function (err) {
                console.log(err);
                return err;
            });

            return createPromise;
        }
    }
};

exports.default = mutation;