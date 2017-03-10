'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var People = new _graphql.GraphQLObjectType({
    name: 'People',
    description: 'Represents a user',
    fields: function fields() {
        return {
            "id": { type: _graphql.GraphQLString },
            "firstName": { type: _graphql.GraphQLString },
            "lastName": { type: _graphql.GraphQLString },
            "emailAddress": { type: _graphql.GraphQLString },
            "userType": { type: _graphql.GraphQLString },
            "userName": { type: _graphql.GraphQLString },
            "password": { type: _graphql.GraphQLString },
            "companyId": { type: _graphql.GraphQLString },
            "title": { type: _graphql.GraphQLString },
            "phoneNumberMobile": { type: _graphql.GraphQLString },
            "phoneNumberOffice": { type: _graphql.GraphQLString },
            "phoneNumberOfficeExt": { type: _graphql.GraphQLString },
            "phoneNumberFax": { type: _graphql.GraphQLString },
            "phoneNumberHome": { type: _graphql.GraphQLString },
            "imHandle": { type: _graphql.GraphQLString },
            "imService": { type: _graphql.GraphQLString },
            "dateFormat": { type: _graphql.GraphQLString },
            "sendWelcomeEmail": { type: _graphql.GraphQLBoolean },
            "welcomeEmailMessage": { type: _graphql.GraphQLString },
            "receiveDailyReports": { type: _graphql.GraphQLBoolean },
            "autoGiveProjectAccess": { type: _graphql.GraphQLBoolean },
            "openID": { type: _graphql.GraphQLString },
            "privateNotes": { type: _graphql.GraphQLString },
            "userLanguage": { type: _graphql.GraphQLString },
            "administrator": { type: _graphql.GraphQLBoolean },
            "canAddProjects": { type: _graphql.GraphQLBoolean },
            "timezoneId": { type: _graphql.GraphQLString },
            "notifyOnTaskComplete": { type: _graphql.GraphQLBoolean },
            "userReceiveNotifyWarnings": { type: _graphql.GraphQLBoolean },
            "notifyonAddedAsFollower": { type: _graphql.GraphQLBoolean },
            "notifyonStatusUpdate": { type: _graphql.GraphQLBoolean }
        };
    }
});

exports.default = People;