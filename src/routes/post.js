import { decodeJWT } from "../utils";
import { createPost } from '../lens/publications/post'
import { authenticate } from "../middlewares/authenticate";
import { parseCookies } from '../utils'

export default router => {
  router.get('/post', authenticate, async (req, res) => {
    // based on the 'authenticate' middleware:
    // we receive accessToken from req.cookies and from res['Set-Cookie']
    // if accessToken which comes from req.cookies is valid - we use it
    // if invalid, we generate new one and pass it to res['Set-Cookie']
    // this is done to keep user's token refreshed, so user does not need to login on UI
    // but in case user's refreshToken is outdated - we should redirect user to login page
    // this should be done for every secured route (routes with 'authenticate' middleware)

    const { cookies: { lensCurrentProfileId, lensCurrentProfileHandle, accessToken }, query } = req
    const token = parseCookies(res.get('Set-Cookie'))?.accessToken ?? accessToken
    const { id: address } = decodeJWT(token)

    const postData = {
      content: query.content,
      name: `Post by @${lensCurrentProfileHandle}`,
      // should build "/u" page/route and deploy application first to use "externalUrl"
      // externalUrl: `https://lensnode.xyz/u/${lensCurrentProfileHandle}`
    }

    console.log(postData, '<< POST DATA >>');

    try {
      await createPost(postData, {
        address,
        profileId: lensCurrentProfileId,
        accessToken: token
      })
      return res
        .status(201)
        .render('common/401', { connected: true })
    } catch (error) {
      console.log(error, '<< ERROR IN POST ROUTE >>');
      return res
        .status(500)
        .render('common/401', { connected: true })
    }
  });
}