'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _People = require('../queries/People');

var _People2 = _interopRequireDefault(_People);

var _PeopleType = require('./PeopleType');

var _PeopleType2 = _interopRequireDefault(_PeopleType);

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Task = new _graphql.GraphQLObjectType({

    name: 'Task',
    description: 'Represents a task',
    fields: function fields() {
        return {
            "projectId": { type: _graphql.GraphQLString },
            "order": { type: _graphql.GraphQLString },
            "commentsCount": { type: _graphql.GraphQLString },
            "createdOn": { type: _graphql.GraphQLString },
            "canEdit": { type: _graphql.GraphQLBoolean },
            "hasPredecessors": { type: _graphql.GraphQLString },
            "id": { type: _graphql.GraphQLString },
            "completed": { type: _graphql.GraphQLBoolean },
            "position": { type: _graphql.GraphQLString },
            "estimatedMinutes": { type: _graphql.GraphQLString },
            "description": { type: _graphql.GraphQLString },
            "progress": { type: _graphql.GraphQLString },
            "harvestEnabled": { type: _graphql.GraphQLBoolean },
            "responsiblePartyLastname": { type: _graphql.GraphQLString },
            "parentTaskId": { type: _graphql.GraphQLString },
            "companyId": { type: _graphql.GraphQLString },
            "creatorAvatarUrl": { type: _graphql.GraphQLString },
            "creatorId": { type: _graphql.GraphQLString },
            "projectName": { type: _graphql.GraphQLString },
            "startDate": { type: _graphql.GraphQLString },
            "tasklistPrivate": { type: _graphql.GraphQLString },
            "lockdownId": { type: _graphql.GraphQLString },
            "canComplete": { type: _graphql.GraphQLBoolean },
            "responsiblePartyId": { type: _graphql.GraphQLString },
            "creatorLastname": { type: _graphql.GraphQLString },
            "hasReminders": { type: _graphql.GraphQLBoolean },
            "todoListName": { type: _graphql.GraphQLString },
            "hasUnreadComments": { type: _graphql.GraphQLBoolean },
            "dueDateBase": { type: _graphql.GraphQLString },
            "private": { type: _graphql.GraphQLString },
            "content": { type: _graphql.GraphQLString },
            "responsiblePartySummary": { type: _graphql.GraphQLString },
            "status": { type: _graphql.GraphQLString },
            "todoListId": { type: _graphql.GraphQLString },
            "person": {
                type: _PeopleType2.default,
                resolve: function resolve(task) {
                    return _People2.default.resolve(null, { apiType: 'person', id: task.creatorId }).then(function (people) {
                        if (people.length > 0) return people[0];

                        return null;
                    }).catch(function (err) {
                        throw new Error(err);
                    });
                }
            }

        };
    }

});

exports.default = Task;