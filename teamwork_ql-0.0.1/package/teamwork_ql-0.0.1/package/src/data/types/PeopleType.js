import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLBoolean 
} from 'graphql';

const People = new GraphQLObjectType({
    name: 'People',
    description: 'Represents a user',
    fields: () => ({
        "id": { type: GraphQLString },
        "firstName": { type: GraphQLString },
        "lastName": { type: GraphQLString },
        "emailAddress": { type: GraphQLString },
        "userType": { type: GraphQLString },
        "userName": { type: GraphQLString },
        "password": { type: GraphQLString },
        "companyId": { type: GraphQLString },
        "title": { type: GraphQLString },
        "phoneNumberMobile": { type: GraphQLString },
        "phoneNumberOffice": { type: GraphQLString },
        "phoneNumberOfficeExt": { type: GraphQLString },
        "phoneNumberFax": { type: GraphQLString },
        "phoneNumberHome": { type: GraphQLString },
        "imHandle": { type: GraphQLString },
        "imService": { type: GraphQLString },
        "dateFormat": { type: GraphQLString },
        "sendWelcomeEmail": { type: GraphQLBoolean },
        "welcomeEmailMessage": { type: GraphQLString },
        "receiveDailyReports": { type: GraphQLBoolean },
        "autoGiveProjectAccess": { type: GraphQLBoolean },
        "openID": { type: GraphQLString },
        "privateNotes": { type: GraphQLString },
        "userLanguage": { type: GraphQLString },
        "administrator": { type: GraphQLBoolean },
        "canAddProjects": { type: GraphQLBoolean },
        "timezoneId" : { type: GraphQLString },
        "notifyOnTaskComplete": { type: GraphQLBoolean },
        "userReceiveNotifyWarnings": { type: GraphQLBoolean },
        "notifyonAddedAsFollower": { type: GraphQLBoolean },
        "notifyonStatusUpdate": { type: GraphQLBoolean }
    })
})

export default People;