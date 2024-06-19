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
import authenticate from "./middlewares/authenticate";

//import authorize from "./middlewares/authorize.js"
//const compression = import('compression');
import compression from "compression"
import cookieParser from "cookie-parser"
import bodyParser  from "body-parser"
import cors from "cors"

//import compression from "compression";
import {
  ssrClose,
  ssrCreate,
  ssrListen,
  ssrRenderPreloadTag,
  ssrServeStaticContent,
} from "quasar/wrappers";

//const http = require('http');
//const WebSocket = require('ws');

//const path = require('path');
//-----------
//================================================Defined...
/**
 * Create your webserver and return its instance.
 * If needed, prepare your webserver to receive
 * connect-like middlewares.
 *
 * Should NOT be async!
 */

  //const verifyToken = require('./middlewares/authMiddleware/verifyToken');

  //1) Home & token authentication
  import tokenApi from './ssrAPIs/profileAPIs/tokenApi.js'

  //2) Login (Authentications Users)
  import profileApi from './ssrAPIs/profileAPIs/profileApi.js'
  //----------
  import salechatApi from './ssrAPIs/chatAPIs/salechatApi.js'
  import publicChatApi from './ssrAPIs/chatAPIs/publicChatApi.js'

  //const profileMetaApi = require('./ssrAPIs/profileAPIs/profileMetaApi');

  //[[[[[3]]]]] ----Client_User content(Modeling)
  import saleitApi from './ssrAPIs/modalAPIs/saleitApi.js'
  import saleclientApi from './ssrAPIs/modalAPIs/saleclientApi.js'

  //const saleitMetaApi = require('./ssrAPIs/modalAPIs/saleitMetaApi');
  //[[[[[3]]]]] ----Client_User content(Modeling)

export const create = ssrCreate((/* { ... } */) => {
  const app = express();

  // useing for csrf possiblity
  if(cors){  
    app.use(cors());
   };

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
// place here any middlewares that
// absolutely need to run before anything else
if (process.env.PROD) { app.use(compression());  }
  //------------------------------------------setting headers as middleware for each response
// Middleware to parse cookies
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(bodyParser.json());
//-------------------------serving statics
app.use(bodyParser.urlencoded({ extended: true }));

  /*Multer is a node.js middleware for handling multipart/form-data , 
  which is primarily used for uploading files. 
  It is written on top of busboy for maximum efficiency.

  */

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
  maxAge: '7d', /* Cache for 1 day,*/
  etag: true, /* Enable ETag headers..helps in efficient cache validation */
 index: false /*By default, Express does not list directory contents, but it's important to ensure that this feature remains
 disabled to prevent information disclosure.*/
}));/* Optimizing the delivery of static files is crucial for performance. Express allows setting cache control
 headers to improve load times and reduce server load.    */
 app.use(compression());/*Using compression middleware can reduce the size of the response body, thereby increasing 
 the speed of a web application. */
//and serve static files from 'assets' directory tooo ('/..' required)
app.use("/assets",express.static('src/assets'));//

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

  //-------------------------------------------Defined

//const verifyToken = require('./middlewares/authMiddleware/verifyToken');
//app.use(verifyToken());

// Middleware for session management
const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

app.use((req, res, next) => { //every request goes through here
    // Set common headers for all responses
    res.setHeader('X-Powered-By', 'YitService');

    res.setHeader('Content-Type', 'text/x-sass'); //file MIMP type acceptable for response over  body
    //Accept: text/plain //Content-Types that are acceptable for the response
    
    //res.setHeader('Access-Control-Allow-Origin', '*') //Specifying which web sites can participate in cross-origin resource sharing

    // Set security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN'); //Clickjacking protection:
    res.setHeader('X-XSS-Protection', '1; mode=block'); //Cross-site scripting (XSS) filter
    
    // Prevent browser caching
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); //Tells all caching mechanisms from server to client whether they may cache this object. It is measured in seconds
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '4d');

    // Call the next middleware
    next();
    return true
});
    //----------------------------------Live Setup
   //const server = http.createServer(app);
   //const wss = new WebSocket.Server({ server });

   // wss.on('connection', function connection(ws) {
      //console.log('Client connected');
      // Handle messages from clients
   //   ws.on('message', function incoming(message={}) {
          //console.log('Received: %s', message);
   //   });
   // });



  //------authentication & authorizations middleware
  //app.use('/tc',verifyToken)

  //1) Home & token authentication
 
  app.use('/api', tokenApi); //routes to be run on first to check for user token(authorization)
  app.use('/permission', tokenApi); //routes to be run on first to check for user token(authorization)

  //2) Login (Authentications Users)
  app.use('/profileapi', profileApi); //routes to be run on first to check for user token(authorization)

  //---------------
  app.use('/publicchatapi', publicChatApi); //routes to be run on first to check for user token(authorization)
  //app.use('/profilemetaapi', profileMetaApi); //routes to be run on first to check for user token(authorization)

  //[[[[[1]]]]] ----Client_User profile(Modeling)

  app.use('/saleitapi',authenticate, saleitApi); //routes to be run on first to check for user token(authorization)
  app.use('/saleclientapi',authenticate, saleclientApi); //routes to be run on first to check for user token(authorization)
  app.use('/salechatapi',authenticate, salechatApi); //routes to be run on first to check for user token(authorization)
  //app.use('/saleitmetaapi', saleitMetaApi); //routes to be run on first to check for user token(authorization)

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
require('dotenv').config()
const dotenv = require('dotenv');
dotenv.config();

 //import { ssrAPI_PORT } from "./config";

 export const listen = ssrListen(async ({ app, port, isReady }) => {
   await isReady();
   return app.listen(process.env.API_PORT, () => {
     if (process.env.PROD) {
      console.log('Server listening at port ' + port+ process.env.mongodAPI_URL)
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
  ////console.log("Closing Server is Being Used",listenResult)

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
  //console.log("renderPreloadTag is Being Used",file)
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


