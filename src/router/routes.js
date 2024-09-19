
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
        component: () => import("pages/logins/signPage.vue"),
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
        name:"profile",
        meta: {
          _isauthenticated: false,
          _groups: false,
          //_resource3AWall:_acctype['saleit'],
        }, 
      },
      //-------------------------------

      //------------------------------
      //----Main Routes
      {
        path: "ssaleit", //page for smartphone V.
        component: () => import("pages/splayPage.vue"),
        name:"ssaleit",
        meta: {
          _isauthenticated: false,
          _groups: false,
          //_resource3AWall:_acctype['saleit'],
        }, 
      },
      {
        path: "saleit", //page for PCs V.
        component: () => import("pages/playPage.vue"),
        name:"saleit",
        meta: {
          _isauthenticated: false,
          _groups: false,
          //_resource3AWall:_acctype['saleit'],
        }, 
      },

      //------------------------------
      //Derivative Routes
      {
        path: "ssaleitclient",
        component: () => import("pages/splaycartPage.vue"),
        name:"ssaleitclient",
        meta: {
          _isauthenticated: false,
          _groups: false,
          //_resource3AWall:_acctype['saleit'],
        }, 
      },
      {
        path: "saleitclient",
        component: () => import("pages/playcartPage.vue"),
        name:"saleitclient",
        meta: {
          _isauthenticated: false,
          _groups: false,
          //_resource3AWall:_acctype['saleit'],
        }, 
      },
      //-----------------------------
      //Service Routes==============
      {
        path: "sstore",
        component: () => import("pages/splayservicePage.vue"),
        name:"sstore",
        meta: {
          _isauthenticated: false,
          _groups: false,
          //_resource3AWall:_acctype['saleit'],
        }, 
      },
      {
        path: "store",
        component: () => import("pages/playservicePage.vue"),
        name:"store",
        meta: {
          _isauthenticated: false,
          _groups: false,
          //_resource3AWall:_acctype['saleit'],
        }, 
      },

    ],
  },

  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "profile", component: () => import('pages/userPage.vue') },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it,
  //main for 
  
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

