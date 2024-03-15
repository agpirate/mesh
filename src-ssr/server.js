/**
 * More info about this file:
 * https://v2.quasar.dev/quasar-cli-vite/developing-ssr/ssr-webserver
 *
 * Runs in Node context.
 */

/**
 * Make sure to yarn add / npm install (in your project root)
 * anything you import here (except for express and compression).
 */
import express from "express";
import compression from "compression";
import {
  ssrClose,
  ssrCreate,
  ssrListen,
  ssrRenderPreloadTag,
  ssrServeStaticContent,
} from "quasar/wrappers";

  //---------------------------------------------------Custome Routes
  //1) Home & token authentication
  const tokenApi = require('./ssrAPIs/profileAPIs/tokenApi');

  //2) Login (Authentications Users)
  const profileApi = require('./ssrAPIs/profileAPIs/profileApi');
  const profileMetaApi = require('./ssrAPIs/profileAPIs/profileMetaApi');

  //[[[[[3]]]]] ----Client_User content(Modeling)
  const saleitApi = require('./ssrAPIs/modalAPIs/saleitApi');
  const saleitMetaApi = require('./ssrAPIs/modalAPIs/saleitMetaApi');
  //[[[[[3]]]]] ----Client_User content(Modeling)
  
const bodyParser = require("body-parser");
//const path = require('path');
const fs = require("fs");
const multer = require("multer");
//const mongoose = require("mongoose");
//var imageModel = require('../models/imageModel');

//-------------------------------------------------
//is used to parse request.body datas to be visible as json form when..thier are requesting as json_content_type
// create application/json parser ///// none global parsing usage
//var jsonParser = bodyParser.json(); // or we can use this on each request_paths
//import fs from "fs";
//import path from "path";
// create application/x-www-form-urlencoded parser //// non global parsing usage
//var urlencodedParser = bodyParser.urlencoded({ extended: false });

//-----------

const nul = [null, undefined, false, "", [], {},NaN];


let doNotCache={"Cache-Control": "no-cache"}
let cacheIndefinitely={"Cache-Control":"public, max-age=31557600"}
let cacheForOneDay={"Cache-Control":"public, max-age=86400"}

///////-----------Headers Response
//Session Configuration

async function computeSession(key){

  const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false,
  };
  return session
}

let resHeader = {
  "Content-Type": "application/json", //  response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "123",
  yrgrequest: "12345",
  "Set-Cookie": ["type=ninja", "language=javascript","SameSite=None",],

  doNotCache //
};

let staticHeader = {
  "Content-Type": "application/json", //  response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "123",
  yrgrequest: "12345",
  "Set-Cookie": ["type=ninja", "language=javascript","SameSite=None",],
  "SameSite": "None",
  cacheForOneDay,
};

//if (app.get("env") === "production") {
// Serve secure cookies, requires HTTPS
//  session.cookie.secure = true;
//}

//================================================Defined...
/**
 * Create your webserver and return its instance.
 * If needed, prepare your webserver to receive
 * connect-like middlewares.
 *
 * Should NOT be async!
 */
export const create = ssrCreate((/* { ... } */) => {
  const app = express();

  // ADD THIS
  try {
    var cors = require("cors");
    app.use(cors());
  } catch {}

  // attackers can use this header to detect apps running Express
  // and then launch specifically-targeted attacks
  app.disable("x-powered-by");

  //--------------------------------------------Definde
  /*
    npm install -g express-generator
    npx express --view=ejs

    npm install

    npm install body-parser --save
    npm install express multer --save
    npm install mongoose
*/
  /*
Node.js request body parsing middleware which parses the incoming request body 
before your handlers, and make it available under req.body property. 
In other words, it simplifies the incoming request.
*/
app.set("view engine", "ejs");


  app.use(bodyParser.json());

  //---------------serving statics
// Serving static files from 'public' directory
//app.use(express.static("public")); //server static of public_folder on hardcoded_path as ip:port/public [this way is vulnerable for accessing other project folders..use virtual path]
app.use(express.static('public')); 
//enables to access--childs of public_folder..using_appending </> or </public> to ( foldername/file or file)_ inside
app.use("virtualPath",express.static('public')); //or you can use alias_name for the </> or </public>_appending ( /virtualPath/foldername/file or justFile)
//this way it will serve every file inside public_folder (even with no proper_path_of_folder)

// Serving static files from 'public' directory at a virtual path '/static'
app.use('/static', express.static('public'));//server static of pulic folder on virtual url_ of ip:port/static

app.use("/css", express.static(__dirname+"public/css"));
app.use("/img", express.static(__dirname+"public/img"));
app.use("/js", express.static(__dirname+"public/js"));

// Serving static files with cache control
app.use('/public',express.static('public', {
  maxAge: '1d', /* Cache for 1 day,*/
  etag: true, /* Enable ETag headers..helps in efficient cache validation */
 index: false /*By default, Express does not list directory contents, but it's important to ensure that this feature remains
 disabled to prevent information disclosure.*/
}));/* Optimizing the delivery of static files is crucial for performance. Express allows setting cache control
 headers to improve load times and reduce server load.    */
 const compression = require('compression');
 app.use(compression());/*Using compression middleware can reduce the size of the response body, thereby increasing 
 the speed of a web application. */


//and serve static files from 'assets' directory tooo
app.use("assets",express.static('src/assets'));//
//enables to access--childs of assets_folder..using_appending </> or </assets> to ( foldername/file or file)_ inside
app.use("virtualPath",express.static('public')); //or you can use alias_name for the </> or </assets>_appending ( /virtualPath/foldername/file or justFile)


/*  // Custom middleware for handling 404 for static files {{{{NB: client first check for api_urls then for vue_routers...
if this api is enabled(it grab all non_api routes and display this Error_Message..)}}}}
app.use((req, res, next) => {
  res.status(404).send('Sorry, file not found!');
});
*/

// Example of setting Cache-Control header for browser caching..ordering browser cache static resources reduces server load and improves load times.
//res.setHeader('Cache-Control', 'public, max-age=31536000');//This header instructs browsers to cache the resource for one year.

//-------------------------serving statics

app.use(bodyParser.urlencoded({ extended: true }));

  /*Multer is a node.js middleware for handling multipart/form-data , 
  which is primarily used for uploading files. 
  It is written on top of busboy for maximum efficiency.

  */

  //-------------------------------------------Defined
  // place here any middlewares that
  // absolutely need to run before anything else
  if (process.env.PROD) {
    app.use(compression());
    
  }

  //------------------------------------------

  //-------------------------------------------Custome Routes

  //1) Home & token authentication

  app.use('/api', tokenApi); //routes to be run on first to check for user token(authorization)

  //2) Login (Authentications Users)
  app.use('/profileapi', profileApi); //routes to be run on first to check for user token(authorization)
  app.use('/profilemetaapi', profileMetaApi); //routes to be run on first to check for user token(authorization)

  //[[[[[1]]]]] ----Client_User profile(Modeling)

  app.use('/saleitapi', saleitApi); //routes to be run on first to check for user token(authorization)
  app.use('/saleitmetaapi', saleitMetaApi); //routes to be run on first to check for user token(authorization)

  // place here any middlewares that
  // absolutely need to run before anything else
//-----------------------------------------------------Configure Node +++ Expresss


//-------------------------serving statics
  return app
})


/**
 * You need to make the server listen to the indicated port
 * and return the listening instance or whatever you need to
 * close the server with.
 *
 * The "listenResult" param for the "close()" definition below
 * is what you return here.
 *;
 * For production, you can instead export your
 * handler for serverless use or whatever else fits your needs.
 */

 import { ssrAPI_PORT } from "./config";

 export const listen = ssrListen(async ({ app, port, isReady }) => {
   await isReady();
   return app.listen(ssrAPI_PORT, () => {
     if (process.env.PROD) {
       //console.log('Server listening at port ' + port)
     }
   });
 });

/**
 * Should close the server and free up any resources.
 * Will be used on development only when the server needs
 * to be rebooted.
 *
 * Should you need the result of the "listen()" call above,
 * you can use the "listenResult" param.
 *
 * Can be async.
 */

export const close = ssrClose(({ listenResult }) => {
  //console.log("Closing Server is Being Used",listenResult)

  return listenResult.close()
})

const maxAge = process.env.DEV
  ? 0
  : 1000 * 60 * 60 * 24 * 30

/**
 * Should return middleware that serves the indicated path
 * with static content. or use custom static_Service on :- app.use(express.static("/src/assets"))
 */
export const serveStaticContent = ssrServeStaticContent((path, opts) => {
  return express.static(path, {//default public_folder is in root....
    maxAge,
    ...opts
  })
})

//serveStaticContent('src/assets')

const jsRE = /\.js$/
const cssRE = /\.css$/
const woffRE = /\.woff$/
const woff2RE = /\.woff2$/
const gifRE = /\.gif$/
const jpgRE = /\.jpe?g$/
const pngRE = /\.png$/

/**
 * Should return a String with HTML output
 * (if any) for preloading indicated file
 */

export const renderPreloadTag = ssrRenderPreloadTag((file) => {
  console.log("renderPreloadTag is Being Used",file)
  if (jsRE.test(file) === true) {
    return `<link rel="modulepreload" href="${file}" crossorigin>`
  }

  if (cssRE.test(file) === true) {
    return `<link rel="stylesheet" href="${file}">`
  }

  if (woffRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  }

  if (woff2RE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  }

  if (gifRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/gif">`
  }

  if (jpgRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/jpeg">`
  }

  if (pngRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/png">`
  }

  return ''
})


