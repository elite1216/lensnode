import { parseCookies } from './index.js'
import { getProfileById, getRecommendedProfiles, getTrendingTags } from '../apis/apolloClient.js'
import axios from 'axios';

const IPFS_GATEWAY = 'https://gateway.ipfscdn.io/ipfs/';
const connections = {
    userConnection: async function (req, res, next) {
        const { cookies: { lensCurrentProfileId, accessToken } } = req
        const userId = parseCookies(res.get('Set-Cookie'))?.lensCurrentProfileId ?? lensCurrentProfileId
        res.locals.userId = userId;
        const userDetails = await getProfileById(userId);
        res.locals.userName = userDetails?.profile?.handle?.replace('.lens', "");
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

function cleanChainURI(str) {
    const uri = str.split('/').pop();
    const isArweaveHash = uri?.length === 43;
    const isIPFSHash = uri?.length === 46 || uri?.length === 59;
    let uris;
    if (isIPFSHash) {
        uris = uri.replace(uri, IPFS_GATEWAY + uri)
    }
    else if (isArweaveHash) {
        uris = uri.replace(uri, `https://arweave.net/` + uri)
    } else { uris = uri }

    return uris
}


const getNotificationType = () => {
    switch (feedType) {
        case NotificationType.All:
            return;
        case NotificationType.Mentions:
            return [NotificationTypes.MentionPost, NotificationTypes.MentionComment];
        case NotificationType.Comments:
            return [NotificationTypes.CommentedPost, NotificationTypes.CommentedComment];
        case NotificationType.Likes:
            return [NotificationTypes.ReactionPost, NotificationTypes.ReactionComment];
        case NotificationType.Collects:
            return [NotificationTypes.CollectedPost, NotificationTypes.CollectedComment];
        default:
            return;
    }
};

const NotificationTypes = 
{
    mentionsNotifications: ["MENTION_POST", "MENTION_COMMENT"],
    followerNotifications: ["FOLLOWED"],
    collectNotifications: ["COLLECTED_POST","COLLECTED_COMMENT"],
    likesNotifications: ["REACTION_POST","REACTION_COMMENT"],
    commentNotifications: ["COMMENTED_POST","COMMENTED_COMMENT"],
}
const allNotifications = ["MENTION_POST", "MENTION_COMMENT", "FOLLOWED", "COMMENTED_POST", "COMMENTED_COMMENT", "REACTION_POST", "REACTION_COMMENT", "COLLECTED_POST", "COLLECTED_COMMENT"]

export { connections, recommendedProfiles, trendingTags, allNotifications, NotificationTypes }