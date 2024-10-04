import {
  ssrClose,
  ssrCreate,
  ssrListen,
  ssrRenderPreloadTag,
  ssrServeStaticContent,
} from "quasar/wrappers";

//================================================Defined...
import authenticate from "./middlewares/authenticate";
//1) Home & token authentication
import tokenApi from "./ssrAPIs/profileAPIs/tokenApi.js";
import rolePermissionApi from "./ssrAPIs/profileAPIs/permissionApi.js";
//2) Login (Authentications Users)
import profileApi from "./ssrAPIs/profileAPIs/profileApi.js";
//----------
import saleChatApi from "./ssrAPIs/chatAPIs/saleChatApi.js";
import publicChatApi from "./ssrAPIs/chatAPIs/publicChatApi.js";
//[[[[[3]]]]] ----Client_User content(Modeling)
import saleitApi from "./ssrAPIs/modalAPIs/saleitApi.js";
import saleitClientApi from "./ssrAPIs/modalAPIs/saleitClientApi.js";
/**
 * More info about this file:
 * https://v2.quasar.dev/quasar-cli-vite/developing-ssr/ssr-webserver
 *
 * Runs in Node context.
 */
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import dotenv from "dotenv"; //to use the .env file ?
dotenv.config(); //// Load environment variables
const appport = process.env.API_PORT || 8080;
const maxAge = process.env.DEV ? 0 : 1000 * 60 * 60 * 24 * 30;

export const create = ssrCreate((/* { ... } */) => {
  const app = express();
  // absolutely need to run before anything else
  if (process.env.PROD) {
    app.use(compression());
  }
  //-------------------Middleware to parse cookies
  app.use(cookieParser());
  app.set("view engine", "ejs");
  //------------------- Incoming request body data setting and organizations (bodyparser middleware)
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  //------------------Express Security Configurations
  if (cors) {
    app.use(
      cors({
        //prevent csrf request ( requesting from other than the serverIP)
        origin: "http://localhost:8080", // Allow requests from PWA
      })
    );
  }
  app.disable("x-powered-by"); // disable the engine informations on client
  //-------------------------serving statics
  //---------------serving statics
  app.use(express.static(path.join(__dirname, "public")));
  app.use("/css", express.static(__dirname + "public/css")); // /js == 'public/css
  app.use("/img", express.static(__dirname + "public/img")); // /js == 'public/img
  app.use("/js", express.static(__dirname + "public/js")); // /js == 'public/js
  app.use("/static", express.static("public")); //server static of pulic folder on virtual url_ of ip:port/static
  app.use(express.static("public")); //root_url/public/files_path&filenames
  app.use("/assets", express.static("src/assets")); //root_url/assets(..src/assets..)/files_path&filenames
  //--set browser handling static rules */
  app.use(
    "/public",
    express.static("public", {
      maxAge: "7d" /* Cache for 1 day,*/,
      etag: true /* Enable ETag headers..helps in efficient cache validation */,
      index: false /*disAllow express to  list directory contents.*/,
    })
  );
  //-----------Performance Boosting by compressing Response body
  /*this MWare reduce the size of the response body, boost performance. */
  app.use(compression());
  //---------Incoming Request &.. must to pass Middlewares (due, next() being used at end)
  app.use((req, res, next) => {
    //every request goes through here
    // Set common headers for all responses
    res.setHeader("X-Powered-By", "YitService");
    // res.setHeader("Content-Type", "application/json" ); //file MIMP type acceptable for response over  body
    //Accept: text/plain //Content-Types that are acceptable for the response
    //res.setHeader('Access-Control-Allow-Origin', '*') //Specifying which web sites can participate in cross-origin resource sharing
    // Set security headers
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN"); //Clickjacking protection:
    res.setHeader("X-XSS-Protection", "1; mode=allow"); //Cross-site scripting (XSS) filter
    // Prevent browser caching
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); //Tells all caching mechanisms from server to client whether they may cache this object. It is measured in seconds
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "4d");
    // Call the next middleware
    next();
    return true;
  });
  //----------------------------
  // Basic route
  app.get("/helps", (req, res) => {
    res.json({ message: "API is working!" });
    res.send("API is working!");
    res.status(200).json({ message: "API is working!" });
    res.status(200).send("API is working!");
  });
  //-------OR
  //import { Router } from "express";
  // const router = Router();
  // router.post('/api2', async (req, res) => {res.send('working')})
  //------authentication & authorizations middleware
  //app.use('/tc',verifyToken)
  //1) Home & token authentication
  app.use("/api", tokenApi);
  app.use("/permissionapi", rolePermissionApi);
  //2) Login (Authentications Users)
  app.use("/profileapi", profileApi);
  // //---------------Cats
  app.use("/publicchatapi", publicChatApi);
  //-----------
  // //app.use('/profilemetaapi', profileMetaApi);
  // //[[[[[1]]]]] ----Client_User profile(Modeling)
  app.use("/saleitapi", authenticate, saleitApi);
  app.use("/saleitClientapi", authenticate, saleitClientApi);
  //--------Chats
  app.use("/saleChatapi", authenticate, saleChatApi);
  //-------------------------serving statics
  //---since Now using quasar SRC-SSR Mode (Undefined url_path needs to routes into SRC_Routers for fetching page && i Need to disable this as end of routting
  //src_routers is end of routing for now)
  // app.use((req, res, next) => {
  //   res.status(404).json({ message: "Resource not found" });
  // });
  // app.use((err, req, res, next) => {
  //   console.error(err.stack);
  //   res.status(500).json({ message: "Internal server error" });
  // });
  return app;
});

export const listen = ssrListen(async ({ app, port, isReady }) => {
  await isReady();
  return app.listen(appport, () => {
    if (process.env.PROD) {
      console.log(
        "Server listening at port " + port + process.env.mongodAPI_URL
      );
    }
  });
});
// Start the server
// app.listen(appport, () => {
//   console.log(`Server is running on ${process.env.API}/${appport}`);
// });

export const close = ssrClose(({ listenResult }) => {
  console.log("Closing Server is Being Used", listenResult);
  return listenResult.close();
});
/**
 * Should return middleware that serves the indicated path
 * with static content. or use custom static_Service on :- app.use(express.static("/src/assets"))
 */
export const serveStaticContent = ssrServeStaticContent((path, opts) => {
  return express.static(path, {
    //default public_folder is in root....
    maxAge,
    ...opts,
  });
});
export const renderPreloadTag = ssrRenderPreloadTag((file) => {
  console.log("renderPreloadTag is Being Used", file);
  if (jsRE.test(file) === true) {
    return `<link rel="modulepreload" href="${file}" crossorigin>`;
  }

  if (cssRE.test(file) === true) {
    return `<link rel="stylesheet" href="${file}">`;
  }

  if (woffRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  }

  if (woff2RE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  }

  if (gifRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/gif">`;
  }

  if (jpgRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  }

  if (pngRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/png">`;
  }

  return "";
});
const jsRE = /\.js$/;
const cssRE = /\.css$/;
const woffRE = /\.woff$/;
const woff2RE = /\.woff2$/;
const gifRE = /\.gif$/;
const jpgRE = /\.jpe?g$/;
const pngRE = /\.png$/;

/**
 * Should return a String with HTML output
 * (if any) for preloading indicated file
 */
/**
 * Make sure to yarn add / npm install (in your project root)
 * anything you import here (except for express and compression).
 */
/*
    npm install -g express-generator
    npx express --view=ejs

    npm install

    npm install body-parser --save
    npm install express multer --save
    npm install mongoose
*/
/*Multer is a node.js middleware for handling multipart/form-data , 
  which is primarily used for uploading files. 
  It is written on top of busboy for maximum efficiency.
  */
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

// import { axios } from "axios";
// async function Update_RolePermission() {
//   var requestOptions = { method: "post", headers: {}, params: {} };
//   requestOptions.headers["Content-Type"] = "application/json";
//   requestOptions.params["timestamp"] = new Date();
//   axios.post(
//     process.env.API_IP_PORT + "/permissionapi/permission",
//     { roles: letRolePermissions, users: "" },
//     requestOptions
//   );
// }
