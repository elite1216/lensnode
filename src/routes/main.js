import moment from 'moment';
import linkifyHtml from "linkify-html";
import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'
import { getCleanedProfile } from '../utils/index.js';
import truncate from 'truncate';
import {authenticate} from '../middlewares/authenticate.js'
import {allNotifications, NotificationTypes, cleanText} from '../utils/functions.js';
import { parseCookies } from '../utils/index.js'
import { decodeJWT } from "../utils/index.js";
import 
{ 
	getProfile, 
	getPublications, 
	getPublication, 
	getComments, 
	getTags, 
	getNotificationsCount, 
	getProfileFeed,
	getProfileCollects, 
	explorePublications,
	getNotifications
} from '../apis/apolloClient.js'
import { truncate as truncateETH } from 'truncate-ethereum-address';

// all you need to do now to protect any route and make use of it inside of ejs part:
// 1. add "authenticate" as a middleware for your route
// 2. add "connected: true" to "res.render" options

export default router => {
	router.get('/', async (req, res) => {
		const data = await getPublications("LATEST","POST");
		res.render('index', {
			articles: data,
			moment: moment,
			linkifyHtml: linkifyHtml,
			truncate: truncate
		})
	});

	router.get('/profile/:name', async (req, res) => {
		const name = req.params.name;
		const handleName = `${name}.lens`
		const data = await getProfile(handleName);
		if (data && data.profile) {
			const profileData = getCleanedProfile(data.profile);
			const profileFeed =  await getProfileFeed(profileData.id,["POST"]);
			const profileReplies =  await getProfileFeed(profileData.id,["COMMENT"]);
			const profileMedia =  await getProfileFeed(profileData.id,["POST"],["IMAGE","VIDEO","AUDIO"]);
			const profileCollects =  await getProfileCollects(profileData.ownedBy);
			res.render('profile', 
			{ 
				user: profileData,
				profileFeed: profileFeed,
				profileReplies: profileReplies,
				profileMedia: profileMedia,
				profileCollects: profileCollects,
				truncate: truncate,
				moment: moment,
				linkifyHtml: linkifyHtml
			});
		} else {
			res.status(404).render('common/404');
		}
	})


	router.get('/hashtag/:name', async (req, res) => {
		const name = req.params.name;
		const data = await getTags(name);
		if (data) {
			res.render('hashtag', { 
				articles: data,
				moment: moment,
				linkifyHtml: linkifyHtml,
				truncate: truncate
			});
		} else {
			res.status(404).render('common/404');
		}
	})

	router.get('/:name/status/:link', async (req, res) => {
		const name = req.params.name
		const link = req.params.link
		const data = await getPublication(link);
		const comments = await getComments(link)
		if (data) {
			res.render('post', {
				post: data,
				moment: moment,
				comments: comments,
				linkifyHtml: linkifyHtml,
				cleanText: cleanText,
				truncate: truncate
			});
		} else {
			res.status(404).render('common/404');
		}
	})

	router.get('/trending', async (req, res) => {
		const data = await getPublications("TOP_COLLECTED","POST");
		res.render('trending', {
			articles: data,
			moment: moment,
			linkifyHtml: linkifyHtml,
			truncate: truncate
		})
	})
	router.get('/foryou', async (req, res) => {
		const data = await getPublications("CURATED_PROFILES","POST");
		res.render('foryou', {
			articles: data,
			moment: moment,
			linkifyHtml: linkifyHtml,
			truncate: truncate
		})
	})

	router.get('/notifications', authenticate, async (req, res) => {
		const { cookies: { lensCurrentProfileId, accessToken } } = req
    	const token = parseCookies(res.get('Set-Cookie'))?.accessToken ?? accessToken
		//console.log(token)
		//const notices = await getNotificationsCount(lensCurrentProfileId,token);
		const likesNotices = await getNotifications(lensCurrentProfileId,NotificationTypes.likesNotifications,token)
		const collectsNotices = await getNotifications(lensCurrentProfileId,NotificationTypes.collectNotifications,token)
		const commentNotices = await getNotifications(lensCurrentProfileId,NotificationTypes.commentNotifications,token)
		const mentionNotices = await getNotifications(lensCurrentProfileId,NotificationTypes.mentionsNotifications,token)
		const allNotices = await getNotifications(lensCurrentProfileId,allNotifications,token)
		//console.log(collectsNotices.__typename)
		//console.log(allNotices)
		res.render('notifications',
		{
			likesNotices:likesNotices,
			collectsNotices: collectsNotices,
			allNotices: allNotices,
			commentNotices: commentNotices,
			mentionNotices: mentionNotices,
			truncate: truncate,
			linkifyHtml: linkifyHtml,
			truncateETH: truncateETH,
			moment: moment
		})
	})

	router.get('/explore', async (req, res) => {
		const data = await explorePublications("TOP_COMMENTED",["POST"]);
		const exploreImages = await explorePublications("TOP_COMMENTED",["POST"],["IMAGE"]);
		const exploreVideo = await explorePublications("TOP_COMMENTED",["POST"],["VIDEO"]);
		const exploreAudio = await explorePublications("TOP_COMMENTED",["POST"],["AUDIO"]);
		//console.log(exploreAudio)
		res.render('explore', {
			articles: data,
			exploreImages: exploreImages,
			exploreVideo: exploreVideo,
			exploreAudio: exploreAudio,
			moment: moment,
			linkifyHtml: linkifyHtml,
			truncate: truncate
		})
	})

	router.use(async (req, res) => {
		res.status(404).render('common/404');
	})
}