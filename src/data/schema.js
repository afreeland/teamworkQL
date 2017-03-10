import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

import Tasks from './queries/Task';
import TaskMutation from './mutations/Task';

import People from './queries/People.js';

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () =>  ({
            tasks: Tasks,
            people: People
        })
    }),

    mutation: new GraphQLObjectType({
        name: 'Mutations',
        fields: () => (Object.assign({}, TaskMutation))
    })
})

export default schema;