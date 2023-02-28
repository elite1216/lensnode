import moment from 'moment';
import linkifyHtml from "linkify-html";
import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'
import { getProfile, getPublications, getPublication, getComments, getTags, getNotificationsCount, getProfileFeed, getProfileCollects, explorePublications } from '../apis/apolloClient.js'
import { getCleanedProfile } from '../utils/index.js';
import truncate from 'truncate';
import {authenticate} from '../middlewares/authenticate.js'
import {allNotifications, NotificationTypes} from '../utils/functions.js';
import { parseCookies } from '../utils/index.js'
import { decodeJWT } from "../utils/index.js";
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

	router.get('/notifications', authenticate, async (req, res) => {
		const { cookies: { lensCurrentProfileId, accessToken } } = req
    	const token = parseCookies(res.get('Set-Cookie'))?.accessToken ?? accessToken
		console.log(token)
		//console.log(token)
		//const notices = await getNotificationsCount(token);
		//console.log(notices)
		res.render('notifications')
	})

	router.get('/explore', async (req, res) => {
		const data = await explorePublications("TOP_COMMENTED",["POST","MIRROR"]);
		const exploreImages = await explorePublications("TOP_COMMENTED",["POST","MIRROR"],["IMAGE"]);
		const exploreVideo = await explorePublications("TOP_COMMENTED",["POST","MIRROR"],["VIDEO"]);
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