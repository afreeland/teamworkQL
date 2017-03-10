import People from '../queries/People';
import PeopleType from './PeopleType';
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

const Task = new GraphQLObjectType({

    name: 'Task',
    description: 'Represents a task',
    fields: () => ({
        "projectId": { type: GraphQLString },
        "order": { type: GraphQLString },
        "commentsCount": { type: GraphQLString },
        "createdOn": { type: GraphQLString },
        "canEdit": { type: GraphQLBoolean },
        "hasPredecessors": { type: GraphQLString },
        "id": { type: GraphQLString },
        "completed": { type: GraphQLBoolean },
        "position": { type: GraphQLString },
        "estimatedMinutes": { type: GraphQLString },
        "description": { type: GraphQLString },
        "progress": { type: GraphQLString },
        "harvestEnabled": { type: GraphQLBoolean },
        "responsiblePartyLastname": { type: GraphQLString },
        "parentTaskId": { type: GraphQLString },
        "companyId": { type: GraphQLString },
        "creatorAvatarUrl": { type: GraphQLString },
        "creatorId": { type: GraphQLString },
        "projectName": { type: GraphQLString },
        "startDate": { type: GraphQLString },
        "tasklistPrivate": { type: GraphQLString },
        "lockdownId": { type: GraphQLString },
        "canComplete": { type: GraphQLBoolean },
        "responsiblePartyId": { type: GraphQLString },
        "creatorLastname": { type: GraphQLString },
        "hasReminders": { type: GraphQLBoolean },
        "todoListName": { type: GraphQLString },
        "hasUnreadComments": { type: GraphQLBoolean },
        "dueDateBase": { type: GraphQLString },
        "private": { type: GraphQLString },
        "content": { type: GraphQLString },
        "responsiblePartySummary": { type: GraphQLString },
        "status": { type: GraphQLString },
        "todoListId": { type: GraphQLString },
        "person": {
            type: PeopleType,
            resolve: (task) => {
                return People.resolve(null, { apiType: 'person', id: task.creatorId})
                    .then(function(people){
                        if(people.length > 0)
                            return people[0];
                        
                        return null;
                    })
                    .catch(function(err){
                        throw new Error(err);
                    });
            }
        }

    })

});


export default Task;