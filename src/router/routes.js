
import _acctype from "src/hooks/_acctype"
//employee-attendance-asset-rawmaterial-goods-supplier-customer-monpay-mispay-statment

const APIIPI = process.env.ApiIP

const routes = [

  {
    path: "/",
    component: () => import("layouts/SignLayout.vue"),
    name:"signyt",
    meta: {
      _isauthenticated: false,
      _groups: false,
      _modelGACWall:_acctype['attendance'],
    }, 
    children: [
      //-------------------------------
      { path: "", 
        component: () => import("pages/signPage.vue"),
        name:"sign",
        meta: {
          _isauthenticated: false,
          _groups: false,
          _modelGACWall:_acctype['attendance'],
        }
     },

      //-----------------------------
      //-----------------------------
    ],
  },

  //-----------------------------
    //HomePage.....Admin(root),RegisterEmployee & Blog_Page
  {
    path: "/play",
    component: () => import("layouts/PlayLayout.vue"),
    children: [
      //-------------------------------
      { path: "profile",   
        component: () => import("pages/profilePage.vue"), 
        name:"play",
        meta: {
          _isauthenticated: false,
          _groups: false,
          _resource3AWall:_acctype['attendance'],
        }, 
      },
      //-------------------------------
      {
        path: "resource",
        component: () => import("pages/resourcePage.vue"),
        name:"resource",
        meta: {
          _isauthenticated: false,
          _groups: false,
          _resource3AWall:_acctype['attendance'],
        }, 
      },
      //------------------------------
      //-------------------------------
      {
        path: "",
        component: () => import("pages/playPage.vue"),
        name:"playTrends",
        meta: {
          _isauthenticated: false,
          _groups: false,
          _resource3AWall:_acctype['attendance'],
        }, 
      },
      //------------------------------
      //-----------------------------
    ],
  },

  {
    path: '/itservices',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/itservices.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it,
  {
    path: "/:catchAll(.*)*",
    //name:'errorPage',
    component: () => import("pages/ErrorNotFound.vue"),
  },


];

export default routes;

/*

Hyadrations:

close_terminal when updating router+layout,
& use single layout in single_path(children)


use history---createhistory on index.....
*/

