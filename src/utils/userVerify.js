import { parseCookies } from './index'
import { getProfileById } from '../apis/apolloClient'

const connections = {
    userConnection: function (req, res, next) {
        const { cookies: { lensCurrentProfileId, accessToken } } = req
        const userId = parseCookies(res.get('Set-Cookie'))?.lensCurrentProfileId ?? lensCurrentProfileId
        //const userDetails = await getProfileById(userId);
        res.locals.userId = userId
        next();
    },
    
  };

  export {connections}