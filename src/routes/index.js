import post from './post.js'
import newpost from './newpost.js'
import main from './main.js'

export default router => {
  newpost(router)
  post(router)
  main(router)
}