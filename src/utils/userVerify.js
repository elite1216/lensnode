import { parseCookies } from './index.js'
import { getProfileById } from '../apis/apolloClient.js'

const connections = {
    userConnection: async function (req, res, next) {
        const { cookies: { lensCurrentProfileId, accessToken } } = req
        const userId = parseCookies(res.get('Set-Cookie'))?.lensCurrentProfileId ?? lensCurrentProfileId
        const userDetails = await getProfileById(userId);
        res.locals.userId = userId;
        res.locals.userName = userDetails?.profile?.handle?.replace('.lens', "" );
        res.locals.userImg = userDetails?.profile?.picture?.original?.url;;
        next();
    },
    
  };

  export {connections}