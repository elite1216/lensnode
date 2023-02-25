import moment from 'moment'
import linkifyHtml from "linkify-html";
import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'
import { getProfile, getPublications, getPublication, getComments, getTags, getNotificationsCount, getProfileFeed } from '../apis/apolloClient.js'
import { getCleanedProfile } from '../utils/index.js';
import truncate from 'truncate';

// all you need to do now to protect any route and make use of it inside of ejs part:
// 1. add "authenticate" as a middleware for your route
// 2. add "connected: true" to "res.render" options

export default router => {
	router.get('/', async (req, res) => {
		const data = await getPublications("LATEST","POST");
		//const notices = await getNotificationsCount();
		//console.log(notices)

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
			res.render('profile', 
			{ 
				user: profileData,
				profileFeed: profileFeed,
				truncate: truncate,
				moment: moment,
				linkifyHtml: linkifyHtml
			});
		} else {
			res.status(404).render('common/404');
		}
	})

	router.get('/profile/:name/replies', async (req, res) => {
		const name = req.params.name;
		const handleName = `${name}.lens`
		const data = await getProfile(handleName);
		if (data && data.profile) {
			const profileData = getCleanedProfile(data.profile);
			const profileReplies =  await getProfileFeed(profileData.id,["COMMENT"]);
			res.render('profile', 
			{ 
				user: profileData,
				profileReplies: profileReplies,
				truncate: truncate,
				moment: moment,
				linkifyHtml: linkifyHtml
			});
		//console.log(profileReplies)
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

	router.get('/notifications', async (req, res) => {
		res.render('notifications')
	})

	router.get('/explore', async (req, res) => {
		res.render('explore')
	})

	router.use(async (req, res) => {
		res.status(404).render('common/404');
	})
}