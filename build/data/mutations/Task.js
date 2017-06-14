'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TaskType = require('../types/TaskType');

var _TaskType2 = _interopRequireDefault(_TaskType);

var _humps = require('humps');

var _humps2 = _interopRequireDefault(_humps);

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        resolve: function resolve(source, args, _ref) {
            var axios = _ref.axios;

            // All of the fields the user entered
            var task = Object.assign({}, args);

            // Used to help build out our URL
            var tasklistId = task.tasklistId;

            // We do not need to include the actual tasklistId in the payload
            delete task.tasklistId;

            // Handle date field formats with hyphen
            if (task.dueDate) task['due-date'] = task.dueDate;
            if (task.startDate) task['start-date'] = task.startDate;

            var payload = {
                "todo-item": task
            };

            var createPromise = axios.post('/tasklists/' + tasklistId + '/tasks.json', payload).then(function (res) {
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
        resolve: function resolve(source, _ref2, _ref3) {
            var id = _ref2.id;
            var axios = _ref3.axios;

            var createPromise = axios.put('/tasks/' + id + '/complete.json').then(function (res) {
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
        resolve: function resolve(source, _ref4, _ref5) {
            var id = _ref4.id;
            var axios = _ref5.axios;

            var createPromise = axios.put('/tasks/' + id + '/uncomplete.json').then(function (res) {
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
        resolve: function resolve(source, _ref6, _ref7) {
            var id = _ref6.id;
            var axios = _ref7.axios;

            var createPromise = axios.delete('/tasks/' + id + '.json').then(function (res) {
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