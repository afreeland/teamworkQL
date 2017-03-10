import PersonType from '../types/PeopleType';

import humps from 'humps';
import querystring from 'querystring';

import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLEnumType,
  GraphQLBoolean
} from 'graphql';

const getUrl =( type = 'people', id) => {

    let url = '';
    switch(type){
        case 'people' :
        url = `/people.json`;
        break;

        case 'projects':
        url = `/projects/${id}/people.json`;
        break;

        case 'companies':
        url = `/companies/${id}/people.json`;
        break;

        case 'person' :
        url = `/people/${id}.json`;
        break

        case 'me' :
        url = `/me.json`;
        break;
    }
    
    return url;
}

var peopleApiEnumTypes = new GraphQLEnumType({
    name: 'peopleApiTypes',
    values: {
        "people": { value: "people" },
        "projects" : { value: "projects" },
        "companies": { value: "companies" },
        "person": { value: "person" },
        "me": { value: "me" }
    }
})

const people = {
    type: new GraphQLList(PersonType),
    args: {
        apiType: { type: peopleApiEnumTypes },
        id: { type: GraphQLString }
    },
    resolve: (source, args, { axios }) => {
        let _url = getUrl(args.apiType, args.id);

        var requestUrl = $BASE + _url;
        

        const peoplePromise = axios.get(requestUrl)
            .then(function(res){
                console.log('people');
                var data = res.data;
                console.log(data);
                var people = (args.apiType == 'person' || args.apiType == 'me') ? [data.person] : data.people;
                console.log(people);
                people = humps.camelizeKeys(people);
                return people;
            })
            .catch(function(err){
                throw new Error(err);
            })
        return peoplePromise;
    }
};

export default people;