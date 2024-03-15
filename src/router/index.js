import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
const nul = [null, undefined, false, "", [], {},NaN];


export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  
  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath    
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  
  //will check if incoming(routes has matched informations(meta,params,name...) as already defined routes)
  //then it would tell use if any match is founded inside out definitions of route and require params(privileges)
  Router.beforeEach((to, from, next) => {

    const _thisusertoken = nul.includes(from.params._thisusertoken) ? false : from.params._thisusertoken 
    const _user_id = nul.includes(from.params._user_id) ? false : from.params._user_id

    const toMatched = nul.includes(to.matched) ? [] : to.matched //do we have..matched routes for coming 
    const LastmatchedMeta = toMatched.length > 1 ? toMatched[toMatched.length-1] : false

    if (LastmatchedMeta && LastmatchedMeta.meta._isauthenticated) { //is this route require authentications _usercompanyID _user_id
      const requestype = `${ process.env.VUE_APP_TITLE } - ${to.name}-${to.query._request_id}`
      const privAccess = LastmatchedMeta.meta._user3A
      if(privAccess.enum.length >1 ){
      //  console.log('yaaa routing incoming with matched privileges of to this route')
      }
      try{  //extrac privileges &&& check if true, unless, go to catch
      //  console.log(to.meta._isauthenticated,_thisusertoken,'Routing into Authenticated, && Priviledged Pages..')
        return next()
      }catch{ //if authenticated but, to privileged tasks
    //    console.log(to.meta._isauthenticated,to,'Routing into Authenticated, but Unpriviledged Pages..')
        return next()
      }
      
    }else{
    //  console.log(to.meta._isauthenticated,from,to,'Routing into Non Authenticated Pages..')
     // Router.push({  name: 'login', });
     return  next()
     
    }
  })


  return Router

})
