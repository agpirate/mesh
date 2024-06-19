
import _acctype from "src/hooks/_acctype"
//employee-saleit-asset-rawmaterial-goods-supplier-customer-monpay-mispay-statment

const APIIPI = process.env.ApiIP

const routes = [

  {
    path: "/",
    component: () => import("layouts/SignLayout.vue"),
    name:"signyt",
    meta: {
      _isauthenticated: false,
      _groups: false,
      _modelGACWall:_acctype['saleit'],
    }, 
    children: [
      //-------------------------------
      { path: "", 
        component: () => import("pages/signPage.vue"),
        name:"sign",
        meta: {
          _isauthenticated: false,
          _groups: false,
          _modelGACWall:_acctype['saleit'],
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
          _resource3AWall:_acctype['saleit'],
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
          _resource3AWall:_acctype['saleit'],
        }, 
      },
      //------------------------------
      //-------------------------------
      {
        path: "strend", //page for smartphone V.
        component: () => import("pages/playsPage.vue"),
        name:"playsTrends",
        meta: {
          _isauthenticated: false,
          _groups: false,
          _resource3AWall:_acctype['saleit'],
        }, 
      },
      {
        path: "trend", //page for PCs V.
        component: () => import("pages/playPage.vue"),
        name:"playTrends",
        meta: {
          _isauthenticated: false,
          _groups: false,
          _resource3AWall:_acctype['saleit'],
        }, 
      },

      //------------------------------
      //-----------------------------
      {
        path: "playcart",
        component: () => import("pages/playcartPage.vue"),
        name:"playcart",
        meta: {
          _isauthenticated: false,
          _groups: false,
          _resource3AWall:_acctype['saleit'],
        }, 
      },
      {
        path: "playservice",
        component: () => import("pages/playservicePage.vue"),
        name:"playservice",
        meta: {
          _isauthenticated: false,
          _groups: false,
          _resource3AWall:_acctype['saleit'],
        }, 
      },
    ],
  },

  {
    path: '/itservices',
    component: () => import('layouts/PlayLayout.vue'),
    children: [
      { path: 'user', component: () => import('pages/user.vue') },
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

