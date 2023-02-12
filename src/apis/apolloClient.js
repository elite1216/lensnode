import { ApolloClient, InMemoryCache, HttpLink, createHttpLink } from '@apollo/client/core/index.js';
import { QUERY_PROFILE_BY_ID, GET_PUBLICATIONS_QUERY } from './queries';
import fetch from 'cross-fetch';

const API_URL = 'https://api.lens.dev';
console.log(API_URL)

// `httpLink` our gateway to the Lens GraphQL API. It lets us request for data from the API and passes it forward
const httpLink = new HttpLink({ uri: API_URL, fetch });


const client = new ApolloClient({
    //link: authLink.concat(httpLink),
    link: httpLink,
    cache: new InMemoryCache()
});

const getProfile = async (handle) => {
    try {
        const { data } = await client.query({
            query: QUERY_PROFILE_BY_ID,
            variables: {
                profileRequest: { handle: handle }
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};



const getPublications = async () => {
  const { data } = await client.query({
    query: GET_PUBLICATIONS_QUERY,
  });
  return data.explorePublications.items;
};


export { getProfile, getPublications };