import { parseCookies } from './index.js'
import { getProfileById, getRecommendedProfiles, getTrendingTags } from '../apis/apolloClient.js'

const connections = {
    userConnection: async function (req, res, next) {
        const { cookies: { lensCurrentProfileId, accessToken } } = req
        const userId = parseCookies(res.get('Set-Cookie'))?.lensCurrentProfileId ?? lensCurrentProfileId
        res.locals.userId = userId;
        const userDetails = await getProfileById(userId);
        res.locals.userName = userDetails?.profile?.handle?.replace('.lens', "" );
        res.locals.userImg = userDetails?.profile?.picture?.original?.url;
        next();
    },
    
};

const trendingTags = {
    tags: async function (req, res, next) {
        const tTags = await getTrendingTags();
        res.locals.topTags = tTags;
        next();
    },
    
};
 
const recommendedProfiles = {
    suggestedProfiles: async function (req, res, next) {
        //const { cookies: { lensCurrentProfileId, accessToken } } = req
        //const userId = parseCookies(res.get('Set-Cookie'))?.lensCurrentProfileId ?? lensCurrentProfileId
        const profileSuggestion = await getRecommendedProfiles();
        res.locals.profilesToFollow = profileSuggestion;
        //res.locals.userId = userId;
        //res.locals.userName = userDetails?.profile?.handle?.replace('.lens', "" );
        //res.locals.userImg = userDetails?.profile?.picture?.original?.url;
        
        next();
    },
    
};

export {connections, recommendedProfiles, trendingTags}