import TaskType from '../types/TaskType';

import humps from 'humps';

import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

const mutation = {
        createTask: {
            type: TaskType,
            args: {
                tasklistId: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                parentTaskId: { type: GraphQLInt },
                // TODO
                // Should only be from 0 to 90
                progress: { type: GraphQLInt },

                notify: { type: GraphQLBoolean },
                responsiblePartyId: { type: GraphQLInt },
                // TODO
                // Format YYYYMMDD
                startDate: { type: GraphQLString },
                dueDate: { type: GraphQLString },
                
                // TODO
                // 'not set', 'low', 'medium', 'high'
                priority: { type: GraphQLString },

                estimatedMinutes: { type: GraphQLInt },
                
                // TODO
                // -2 Ignore, -1 Place top of list, 0 Place bottom of list
                positionAfterTask: { type: GraphQLInt },

                tags: { type: GraphQLString },
                commentFollowerIds: { type: GraphQLString },
                changeFollowerIds: { type: GraphQLString },
                private: { type: GraphQLBoolean },
                grantAccessTo: { type: GraphQLString }
            },
            resolve: (source, args, { axios }) => {
                // All of the fields the user entered
                let task = Object.assign({}, args);
                
                // Used to help build out our URL
                var tasklistId = task.tasklistId;
                
                // We do not need to include the actual tasklistId in the payload
                delete task.tasklistId;

                let payload = {
                    "todo-item": task
                };

                var createPromise = 
                    axios.post($BASE + `/tasklists/${tasklistId}/tasks.json`, payload)
                        .then(function(res){
                            let data = res.data;
                            var _id = data.id;
                            var _affectedTaskIds = data.affectedTaskIds;
                            task.id = _id;
                            return task;
                        })
                        .catch(function(err){
                            console.log(err);
                            return err;
                        })


                return createPromise;
            }
        },

        markTaskComplete: {
            type: TaskType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (source, { id }, { axios}) => {
                var createPromise = 
                    axios.put($BASE + `/tasks/${id}/complete.json`)
                        .then(function(res){
                            var data = res.data;
                            return {
                                id: id,
                                status: data.STATUS,
                                affectedTaskIds: data.affectedTaskIds
                            }
                        })
                        .catch(function(err){
                            console.log(err);
                            return err;
                        })


                return createPromise;
            }
        },

        markTaskUncomplete: {
            type: TaskType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (source, { id }, { axios }) => {
                var createPromise = 
                    axios.put($BASE + `/tasks/${id}/uncomplete.json`)
                        .then(function(res){
                            var data = res.data;
                            return {
                                id: id,
                                status: data.STATUS,
                                affectedTaskIds: data.affectedTaskIds
                            }
                        })
                        .catch(function(err){
                            console.log(err);
                            return err;
                        })


                return createPromise;
            }
        },

        destroyTask: {
            type: TaskType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (source, { id }, { axios }) => {
                var createPromise = 
                    axios.delete($BASE + `/tasks/${id}.json`)
                        .then(function(res){
                            var data = res.data;
                            return {
                                id: id,
                                status: data.STATUS,
                                affectedTaskIds: data.affectedTaskIds
                            }
                        })
                        .catch(function(err){
                            console.log(err);
                            return err;
                        })


                return createPromise;
            }
        }
}


export default mutation;