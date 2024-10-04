import _acctype from "src/hooks/_acctype";
import { iservicei_Menu } from "src/composables/constVariables";

//employee-saleit-asset-rawmaterial-goods-supplier-customer-monpay-mispay-statment

const APIIPI = process.env.ApiIP;

const routes = [
  {
    path: "/",
    component: () => import("layouts/SignLayout.vue"),
    name: "signyt",
    meta: {
      _isauthenticated: false,
      _groups: false,
      _modelGACWall: _acctype["saleit"],
    },
    children: [
      //-------------------------------
      {
        path: "",
        component: () => import("pages/logins/signPage.vue"),
        name: "sign",
        meta: {
          _isauthenticated: false,
          _groups: false,
          _modelGACWall: _acctype["saleit"],
        },
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
      {
        path: "profile",
        component: () => import("pages/users/profilePage.vue"),
        name: "profile",
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
        path: "s" + iservicei_Menu["Home"]["path"], //page for smartphone V.
        component: () => import("src/pages/smartphone/splayPage.vue"),
        name: "s" + iservicei_Menu["Home"]["title"],
        meta: {
          _isauthenticated: false,
          _groups: false,
          //_resource3AWall:_acctype['saleit'],
        },
      },
      {
        path: iservicei_Menu["Home"]["path"], //page for smartphone V.
        component: () => import("pages/playPage.vue"),
        name: iservicei_Menu["Home"]["title"],
        meta: {
          _isauthenticated: false,
          _groups: false,
          //_resource3AWall:_acctype['saleit'],
        },
      },

      //------------------------------
      //Derivative Routes
      {
        path: "s" + iservicei_Menu["MyShops"]["path"], //page for smartphone V.
        component: () => import("src/pages/smartphone/splaycartPage.vue"),
        name: "s" + iservicei_Menu["MyShops"]["title"], //page for smartphone V.
        meta: {
          _isauthenticated: false,
          _groups: false,
          //_resource3AWall:_acctype['saleit'],
        },
      },
      {
        path: iservicei_Menu["MyShops"]["path"], //page for smartphone V.
        component: () => import("pages/playcartPage.vue"),
        name: iservicei_Menu["MyShops"]["title"], //page for smartphone V.
        meta: {
          _isauthenticated: false,
          _groups: false,
          //_resource3AWall:_acctype['saleit'],
        },
      },
      //-----------------------------
      //Service Routes==============
      {
        path: "s" + iservicei_Menu["MyServices"]["path"],
        component: () => import("src/pages/smartphone/splayservicePage.vue"),
        name: "s" + iservicei_Menu["MyServices"]["title"], //page for smartphone V.
        meta: {
          _isauthenticated: false,
          _groups: false,
          //_resource3AWall:_acctype['saleit'],
        },
      },
      {
        path: iservicei_Menu["MyServices"]["path"],
        component: () => import("pages/playservicePage.vue"),
        name: iservicei_Menu["MyServices"]["title"],
        meta: {
          _isauthenticated: false,
          _groups: false,
          //_resource3AWall:_acctype['saleit'],
        },
      },
    ],
  },

  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "profile", component: () => import("pages/logins/userPage.vue") },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it,
  //main for

  {
    path: "/:catchAll(.*)*",
    //name:'errorPage',
    component: () => import("src/pages/logins/ErrorNotFound.vue"),
  },
];

export default routes;

/*

Hyadrations:

close_terminal when updating router+layout,
& use single layout in single_path(children)


use history---createhistory on index.....
*/
