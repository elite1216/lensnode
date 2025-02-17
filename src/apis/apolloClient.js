import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink, createHttpLink } from '@apollo/client/core/index.js';
import {
    QUERY_PROFILE_BY_ID,
    GET_PUBLICATIONS_QUERY,
    GET_SINGLE_POST,
    GET_POST_COMMENTS,
    HAS_TX_HASH_BEEN_INDEXED,
    GET_TAGS,
    GET_TRENDING_TAGS,
    GET_NOTIFICATIONS_COUNT,
    GET_PROFILE_BY_ID,
    GET_PROFILE_FEED,
    RecommendedProfiles,
    GET_NOTIFICATIONS,
    checkDispatcher
} from './queries.js';

import { REFRESH_TOKEN_MUTATION, CREATE_POST_TYPED_DATA,CreatePostViaDispatcher, Broadcast } from './mutations.js';


const API_URL = 'https://api-mumbai.lens.dev'
//const API_URL = 'https://api.lens.dev'

// `httpLink` our gateway to the Lens GraphQL API. It lets us request for data from the API and passes it forward
const httpLink = new HttpLink({ uri: API_URL, fetch });

const client = new ApolloClient({
    //link: authLink.concat(httpLink),
    link: httpLink,
    cache: new InMemoryCache()
});

// QUERIES

const getProfile = async (handle) => {
    //try {
        const { data } = await client.query({
            query: QUERY_PROFILE_BY_ID,
            variables: {
                profileRequest: { handle: handle }
            }
        });
        return data;
    //} catch (error) {
    //    console.log(error);
    //    return null;
    //}
};
const getProfileById = async (id) => {
    try {
        const { data } = await client.query({
            query: GET_PROFILE_BY_ID,
            variables: {
                profileRequest: { profileId: id }
            }
        });
        return data;
    } catch (error) {
        //console.log(error);
        return null;
    }
};

const getPublications = async (query,type,collects) => {
    const { data } = await client.query({
        query: GET_PUBLICATIONS_QUERY,
        variables: {
            request: { 
                sortCriteria: query,
                publicationTypes: type,
                limit: 50,
                collectedBy: collects
            }
        },
        fetchPolicy: 'network-only',
    });
    return data.explorePublications.items;
};

const explorePublications = async (query,type,pubFocus) => {
    const { data } = await client.query({
        query: GET_PUBLICATIONS_QUERY,
        variables: {
            request: { 
                sortCriteria: query,
                publicationTypes: type,
                limit: 50,
                metadata: {
                    mainContentFocus: pubFocus
                }
            }
        },
        fetchPolicy: 'network-only',
    });
    return data.explorePublications.items;
};

const getPublication = async (id) => {
    const { data } = await client.query({
        query: GET_SINGLE_POST,
        variables: { id: id }
    });
    //console.log(data.publication)
    return data.publication;
};

const hasTxHashBeenIndexed = async (request, options = {}) => {
    try {
        const { data } = await client.query({
            query: HAS_TX_HASH_BEEN_INDEXED,
            variables: {
                request,
            },
            fetchPolicy: 'network-only',
            ...options
        });
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getComments = async (id) => {
    const { data } = await client.query({
        query: GET_POST_COMMENTS,
        variables: {
            publicationsRequest: { commentsOf: id, limit: 50 }
        }
    });
    return data.publications.items;
};

const getTags = async (query) => {
    const { data } = await client.query({
        query: GET_TAGS,
        variables: {
            request: { query: query, type: 'PUBLICATION', limit: 10}
        }
    });
    return data.search.items;
};

const getTrendingTags = async () => {
    const { data } = await client.query({
        query: GET_TRENDING_TAGS,
        variables: {
            request: { sort: "MOST_POPULAR", limit: 6}
        }
    });
    const tg = data.allPublicationsTags.items;
    const tagsArr = [...tg];
    tagsArr.splice(0,1)
    return tagsArr;
};

const getNotificationsCount = async (id,accessToken) => {
    const { data } = await client.query({
        query: GET_NOTIFICATIONS_COUNT,
        variables: {
            request: { profileId: id}
        },
        context: {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
    });
    //console.log(data.notifications)
    return data.notifications;
};

const getNotifications = async (id,type,accessToken) => {
    const { data } = await client.query({
        query: GET_NOTIFICATIONS,
        variables: {
            request: { profileId: id, notificationTypes: type, limit: 20}
        },
        context: {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
    });
    //console.log(data.notifications.items)
    return data.notifications.items;
};

const getProfileCollects = async (id) => {
    const { data } = await client.query({
        query: GET_PROFILE_FEED,
        variables: {
            publicationsRequest: 
            { 
                publicationTypes: ["POST", "COMMENT"], collectedBy: id, limit: 30
            }
        }
    });
    //console.log(data.publications.items)
    return data.publications.items;
};

const getProfileFeed = async (id,type,pubFocus,collected) => {
    const { data } = await client.query({
        query: GET_PROFILE_FEED,
        variables: {
            publicationsRequest: 
            { 
                profileId: id, publicationTypes: type, limit: 30,
                metadata: {
                    mainContentFocus: pubFocus
                }
            }
        }
    });
    //console.log(data.publications.items)
    return data.publications.items;
};

const getRecommendedProfiles = async () => {
    const { data } = await client.query({
        query: RecommendedProfiles,
        variables: {
            options: { shuffle: true } 
        }
    });
    //console.log(data?.recommendedProfiles.length)
    return data?.recommendedProfiles?.slice(0,5);
};

const getDispatcherStatus = async (id) => {
    const { data } = await client.query({
        query: checkDispatcher,
        variables: {
            profileRequest: { profileId: id}
        },
    });
    //console.log(data.profile)
    return data.profile;
};


// MUTATIONS

const refresh = async refreshToken => {
    try {
        const { data } = await client.mutate({
            mutation: REFRESH_TOKEN_MUTATION,
            variables: {
                request: { refreshToken }
            }
        })
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}

const createPostTypedData = async (request, options = {}) => {
    try {
        const { data } = await client.mutate({
            mutation: CREATE_POST_TYPED_DATA,
            variables: {
                request
            },
            ...options
        })
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}

const createPostViaDispatcherRequest = async (request, token) => {
    const { data } = await client.mutate({
        mutation: CreatePostViaDispatcher,
        variables: {
            request: request
        },
        context: {
            headers: {
            Authorization: `Bearer ${token}`
            }
        }
    })
    //console.log(data.createPostViaDispatcher)
    return data.createPostViaDispatcher;
}

const broadcastRequest = async (request, token) => {
    const { data } = await client.mutate({
        mutation: CreatePostViaDispatcher,
        variables: {
            request: request
        },
        context: {
            headers: {
            Authorization: `Bearer ${token}`
            }
        }
    })
    console.log(data.broadcast)
    return data.broadcast;
}

export {
    // QUERIES
    getProfile,
    getPublications,
    getPublication,
    getComments,
    hasTxHashBeenIndexed,
    getTags,
    getTrendingTags,
    getNotificationsCount,
    getProfileById,
    getProfileFeed,
    getRecommendedProfiles,
    getProfileCollects,
    explorePublications,
    getNotifications,
    getDispatcherStatus,
    // MUTATIONS
    refresh,
    createPostTypedData,
    createPostViaDispatcherRequest,
    broadcastRequest
};
