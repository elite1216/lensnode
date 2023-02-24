import moment from 'moment'
import linkifyHtml from "linkify-html";
import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'
import { getProfile, getPublications, getPublication, getComments, getTags, getTrendingTags, getNotificationsCount } from '../apis/apolloClient.js'
import { getCleanedProfile } from '../utils/index.js';
import truncate from 'truncate';
import { authenticate } from '../middlewares/authenticate.js';
import { parseCookies } from '../utils/index.js'

// all you need to do now to protect any route and make use of it inside of ejs part:
// 1. add "authenticate" as a middleware for your route
// 2. add "connected: true" to "res.render" options

export default router => {
	router.get('/', async (req, res) => {
		const { cookies: { lensCurrentProfileId, accessToken } } = req
		const token = parseCookies(res.get('Set-Cookie'))?.accessToken ?? accessToken
		const userId = parseCookies(res.get('Set-Cookie'))?.lensCurrentProfileId ?? lensCurrentProfileId
		const data = await getPublications("LATEST","POST");
		const topTags = await getTrendingTags();
		//const notices = await getNotificationsCount();
		//console.log(notices)

		res.render('index', {
			articles: data,
			moment: moment,
			linkifyHtml: linkifyHtml,
			truncate: truncate,
			topTags: topTags,
			userId: userId
			//connected: true
		})
	});

	router.get('/profile/:name', async (req, res) => {
		const name = req.params.name;
		const handleName = `${name}.lens`
		const data = await getProfile(handleName);
		const topTags = await getTrendingTags();
		if (data && data.profile) {
			const profileData = getCleanedProfile(data.profile);
			res.render('profile', { user: profileData, topTags: topTags });
		} else {
			res.status(404).render('common/404');
		}
	})

	router.get('/hashtag/:name', async (req, res) => {
		const name = req.params.name;
		const data = await getTags(name);
		const topTags = await getTrendingTags();
		if (data) {
			res.render('hashtag', { 
				articles: data,
				moment: moment,
				linkifyHtml: linkifyHtml,
				truncate: truncate,
				topTags: topTags
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
		const topTags = await getTrendingTags();
		if (data) {
			res.render('post', {
				post: data,
				moment: moment,
				comments: comments,
				linkifyHtml: linkifyHtml,
				truncate: truncate,
				topTags: topTags
			});
		} else {
			res.status(404).render('common/404');
		}
	})

	router.get('/trending', async (req, res) => {
		const data = await getPublications("TOP_COLLECTED","POST");
		const topTags = await getTrendingTags();
		res.render('trending', {
			articles: data,
			moment: moment,
			linkifyHtml: linkifyHtml,
			truncate: truncate,
			topTags: topTags
		})
	})

	router.get('/notifications', async (req, res) => {
		res.render('notifications')
	})

	router.get('/explore', async (req, res) => {
		const topTags = await getTrendingTags();
		//const cont = initWalletConnect();
		res.render('explore')
	})

	router.use(async (req, res) => {
		const topTags = await getTrendingTags();
		res.status(404).render('common/404',{topTags:topTags});
	})
}