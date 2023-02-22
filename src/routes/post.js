import { decodeJWT } from "../utils/index.js";
import { createPost } from '../lens/publications/post.js'
import { authenticate } from "../middlewares/authenticate.js";
import { parseCookies } from '../utils/index.js'

export default router => {
  router.get('/post', authenticate, async (req, res) => {
    const { cookies: { lensCurrentProfileId, accessToken } } = req
    const token = parseCookies(res.get('Set-Cookie'))?.accessToken ?? accessToken
    const { id: address } = decodeJWT(token)

    try {
      await createPost(address, lensCurrentProfileId, token)
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