

import {
  profileModel,
} from "app/src-ssr/backendCore/models/profileModels";

import { Router } from "express";
import multer from "multer";

const path = require("path");

//require('dotenv').config()
//const dotenv = require('dotenv');
//dotenv.config();

const router = Router();

const fs = require("fs");

//--------------------servicess
const nul = [null, undefined, false, "", [], {}, NaN,0];

let resHeader = {
  "Content-Type": "application/json", //  modelData.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "5050",
  ETag: "Roaw",
  "Set-Cookie": ["type=ninja", "language=javascript"],
};

let staticHeader = {
  "Content-Type": "application/json", //  response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "123",
  ETag: "12345",
  "Set-Cookie": ["type=ninja", "language=javascript"],
  cacheForOneDay,
};

// SET STORAGE//Where to save

let doNotCache={"Cache-Control": "no-cache"}
let cacheIndefinitely={"Cache-Control":"public, max-age=31557600"}
let cacheForOneDay={"Cache-Control":"public, max-age=86400"}

let setCookies = {
  "Content-Type": "application/json", //  modelData.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "5050",
  ETag: "Roaw",
  "Set-Cookie": ["type=ninja", "language=javascript"],
};

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
///////-----------Headers modelData
const supportedMimes = {
  "application/pdf": "pdf",
  "application/zip": "zip",

  "text/csv": "csv",
  "text/pdf": "pdf",
  "text/json": "json",

  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/svg+xml": "svg+xml",
  "image/webp": "webp",

  "video/mp4": "mp4",
  "video/mkv": "mkv",
};

const getFileOptions = () => {
  ////console.log('request with UploadFile_Detected - FileUptions -Multer Happening')
  var _fileName =  ""
  var _originalName=  ""
  var _fieldName = ""

  return {
    storage: multer.diskStorage({

      filename: (req, file, cb) => {
        
        let extension = supportedMimes[file.mimetype];
        _originalName = file.originalname.split(".")[0];
        //`${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
        _fileName =_originalName.split(" ")[0] + "-" + new Date().getTime() + "." + extension;
        _fieldName =file.fieldname

        cb(null, _fileName);
      },
      //path: "/"+ _fieldName + _fileName,
      destination: (req, file, cb) => {cb(null, "./public/"+ file.fieldname)},
      path:        (req, file, cb) => {cb(null, "/"+file.fieldname +"/"+_fileName)},
      //destination: "./public/"+_fieldName, //directory (folder) setting
      //--------additional meta(drived)
      timestamp:new Date()
    }),
    limits: { fileSize: 1000000 * 5 },
    fileFilter: (req, file, cb) => {
      let extension = supportedMimes[file.mimetype];
      if (!extension) {
        return cb(null, false);
      } else {
        cb(null, true);
      }
    },
  };
};

async function extractFileMeta(file){
  if(file){
    let fileMeta ={}
    try{
      var dbName = fs.readFileSync(file.path); //save file_name as buffere
      var encode_dbName = dbName.toString("base64");
      var _thefilePath = "/"+file.fieldname+"/"+file.filename
  
      fileMeta = {
        contentType: file.mimetype,
        mimetype:file.mimetype,
        encoding:file.encoding,
        originalname:file.originalname,
        destination:file.destination,
        fieldname:file.fieldname,
        filename:file.filename,
        path:file.path,
        size:file.size,
        //----------
        thefilePath:_thefilePath,
        dbName: encode_dbName,
        geoLocation:"0000000000xyz"
      };
    }catch{ }
    return fileMeta

  }
  else{
    return ""
  }
  
}

async function extractFilesMeta(files){

  let filesMeta ={}
  for(let it in files){

    try{
      var file = files[it]
      //var fieldname = file.fieldname
      filesMeta[fieldname]={}
      filesMeta[fieldname+"Meta"]={}
    
      var newFileName = `${Date.now()}-${Math.round(Math.random() * 1e2)}${path.extname(file.originalname)}`; //save file_name as buffere
      var dbName = fs.readFileSync(file.path); //save file_name as buffere
      var encode_dbName = dbName.toString("base64");
      var _thefilePath = "/"+file.fieldname+"/"+file.filename
    
      var fileMeta = {
        //contentType: files.mimetype,
        mimetype:file.mimetype,
        encoding:file.encoding,
        originalname:file.originalname,
        destination:file.destination,
        fieldname:file.fieldname,
        filename:newFileName,//file.filename,
        path:file.path,
        size:file.size,
        //-------------
        thefilePath:_thefilePath,
        dbName: encode_dbName,
      };
    
      filesMeta[fieldname]="/public/uploads/"+ fileMeta.originalname
      filesMeta[fieldname+"Meta"]=fileMeta

    }catch{    }
  }
  ////console.log('request with UploadFile_Detected [Files]',filesMeta)
  return filesMeta
}

 const verifyToken = require("../../middlewares/authMiddleware")

 //-------------------
 var _rolingkey='phone'
// Protected route
router.post("/login", async (req, res) => {
    var ErrorDepth="Prameters and Data_incoming is checking"
  

    let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
    if (nul.includes(Object.keys(reqData))) {
      return res.status(404).send({ message: "findBy Null." });
    }

    let [findBy, returnWat, limits] = await _postputParams(reqParams);
    returnWat = {}; 
      //----
      ErrorDepth="(Srv);- FindBy_Passed..withFiling_"+ findBy

      try {
        return await profileModel //"Autherizations.keyID" : value
          .findOne({ $or: findBy }, returnWat) //return null if empty
          .sort({ _id: 1 })
          .limit(limits)
          .then((modelData) => {
            if (typeof modelData == 'object' && Object.keys(modelData).length) { //can'n parse null object  ...if not foundede
            console.log('authentication APii_')
              res.set(resHeader);
              return res.send(JSON.stringify(modelData) );
            } else { return res.status(404).json("(Srv):- _read202;but, (DBs) _read303 "+ modelData ); }
          }).catch((modelError) => {return res.status(404).json("(Srv):- _read202;but, (DBs) _read404 "+modelError ); }); // return modelError
      } catch (error) {  return  res.status(505).json("(Srv);- _readf505_ "+error);  }
    });

//----------

async function _postputParams(reqParams = {}) {
    if (Object.keys(reqParams).length === 0) {
      return [false];
    }
    let returnWat = {};
    let limits = 100;
    try {
      if (reqParams["returnWat"]) {
        returnWat = reqParams["returnWat"];
        delete reqParams["returnWat"];
      }
    } catch {}
    try {
      if (reqParams["limits"]) {
        limits = reqParams["limits"];
        delete reqParams["limits"];
      }
    } catch {}
  
    try{
      delete reqParams["upload"];
      delete reqParams["timestamp"];
    }catch{}
  
    //.... doing data manipulating for mongoodb
    let findBy = Object.keys(reqParams).length
      ? await _queryParams(reqParams)
      : [{}];
    
      console.log("Findby Profile_DBs(Shared_)_GET/_",findBy)
  
  
    return [findBy, returnWat, limits];
  }
  
  async function _getdeleteParams(reqParams = {}) {
    if (Object.keys(reqParams).length === 0) {
      //return [false];
    }
  
    let returnWat = {};
    let limits = 100;
    try {
     
      if (reqParams["returnWat"]) {
        returnWat = reqParams["returnWat"];
        delete reqParams["returnWat"];
      }
    } catch {}
  
    try {
      if (reqParams["limits"]) {
        limits = reqParams["limits"];
        delete reqParams["limits"];
      }
    } catch {}
  
    try{
      delete reqParams["upload"];
      delete reqParams["timestamp"];
    }catch{}
  
  
    //.... doing data manipulating for mongoodb
    let findBy = Object.keys(reqParams).length
      ? await _queryParams(reqParams,1)
      : [{}];
  
      console.log("Findby Profile_DBs(Shared_)_GET/_",findBy)
  
    return [findBy, returnWat, limits];
  }
  
  async function _queryParams(params = {},isget=0) {
  
    try {
      parseQuery = JSON.parse(params);
    } catch {
      parseQuery = params;
    }
  
    let theQuery = []; //the last query is return_filter & the other is filter
    //$or: [   { age: 28 }, { age: 1 } ]
    for (let paramKey in parseQuery) {
      //it(param)
      let obj = {};
      let keyTranslating = paramKey;
      if (["id", "Id", "ID"].includes(keyTranslating)) {
        keyTranslating = "_id";
      } //if param_key ..is id ( it'would reassing into _id(which mongoose use_ to identifie_id(column))
      if(isget && typeof parseQuery[paramKey] !== 'object' ){
        obj[keyTranslating] = {$regex : parseQuery[paramKey].toString(), "$options": "i" }
  
      }else{
      obj[keyTranslating] = parseQuery[paramKey]; //if  param_key != id , use as it's.... & resolve the incoming :key:value
      }
  theQuery.push(obj);
    }
    if (!theQuery.length) {
      theQuery = [{}];
    } else {
      theQuery = theQuery.filter(
        (obj) => !(obj && Object.keys(obj).length === 0)
      );
    }
    ////console.log("Quering Parsing Service..", theQuery);
    return theQuery;
  }
  //----------------------------------Query Builder
  // API
  module.exports = router;
  
  const rOps = async function (
    dbModel,
    findBy = [{}],
    returnWat = {},
    limits = 10000
  ) {
    try {
      return await dbModel
        .find({ $or: findBy }, returnWat)
        .sort({ _id: -1,updatedAt:1 })
        .limit(limits) //return the latest of 100
        .then((modelData) => {  
          console.log(modelData.length+'_Read(s)_Data')
          console.log("Reading(S) Profile_DBs(Shared_)")
          if (modelData.length) {return { status: 200, data: JSON.stringify(modelData) };
          } else { return { status: 404, data: "(DBs)_read303:- " +modelData }; //not found Error
        } }).catch((modelError) => {
        return { status: 404, data: "(DBs)_read404:- " + modelError }; //DBs_Schema or Rules_validations Error
      }); 
  } catch (error) { return { status: 505, data: "(DBs)_read505 :-" };  } //DBs Connections or Configurations, modules Error
  };
  
  const rOp = async function (
    dbModel,
    findBy = [{}],
    returnWat = {},
    limits = 20
  ) {
    try {
      return await dbModel
        .find({ $or: findBy }, returnWat) //match findBy....if not find return "null"
        .sort({ _id: -1,updatedAt:1 })
        .limit(limits)
        .then((modelData) => {       
          console.log("Reading Profile_DBs(Shared_)")
  
          if (modelData.length) {return { status: 200, data:modelData };
          } else { return { status: 404, data: "(DBs)_readf303:- " +modelData }; //not found Error
        } }).catch((modelError) => {
        return { status: 404, data: "(DBs)_readf404:- " + modelError }; //DBs_Schema or Rules_validations Error
      }); 
  } catch (error) { return { status: 505, data: "(DBs)_readf505 :-" };  } //DBs Connections or Configurations, modules Error
  };
  
  const dOps = async function (dbModel, itemId, returnWat = {}, limits = 100) {
    try {
      return await dbModel
        .findByIdAndDelete(itemId) //or simply >>--  findBy['id']
        .then((modelData) => {
          console.log("Deleting Profile_DBs(Shared_)")
          if (typeof modelData == 'object' && Object.keys(modelData).length) { return { status: 200, data: JSON.stringify(modelData) };
          } else { return { status: 404, data: "(DBs)_del303:- " +modelData }; //not found Error
          } }).catch((modelError) => {
          return { status: 404, data: "(DBs)_del404:- " + modelError }; //DBs_Schema or Rules_validations Error
        }); 
    } catch { return { status: 505, data: "(DBs)_del505 :-" };  } //DBs Connections or Configurations, modules Error
  };
  