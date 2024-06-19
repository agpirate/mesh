//const express = require('express');
import {
  publicChatModel
} from "../../backendCore/models/chatModels.js";

import authenticate from "../../middlewares/authenticate.js";
import authorize from "../../middlewares/authorize.js"

import { Router } from "express";
import multer from "multer";

import { mongoose } from "mongoose";
//var Schema = mongoose.Schema,
var ObjectId = mongoose.Types.ObjectId;

import path from "path";
import fs from "fs";
//require('dotenv').config()
//const dotenv = require('dotenv');
//dotenv.config();
import { rOp,rOps,dOps } from "app/src-ssr/services/apiServices/documentRead.js";//
import { _getdeleteParams } from "app/src-ssr/services/apiServices/queryBuilder.js";//

const router = Router();
//====================  CREATING   ========================
//import compute_profile  from "../../services/modalServices/compute_profile";
const modelI = publicChatModel
const modelIName = "/publicchat"
var updateShaker = 1 //tree shaking...

//--------------------servicess
const nul = [null, undefined, false, "", [], {}, NaN];

let _setResponseHeader = {
"Content-Type": "application/json", //  modelData.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
"Content-Length": "5000",
ETag: "Roaw",
"Set-Cookie": ["type=ninja", "language=javascript"],
};

let setCookies = {
"Content-Type": "application/json", //  modelData.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
"Content-Length": "5000",
ETag: "Roaw",
"Set-Cookie": ["type=ninja", "language=javascript"],
};

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
  //////////////////////////////console.log('request with UploadFile_Detected - FileUptions -Multer Happening')
  var _fileName =  ""
  var _originalName=  ""
  var _fieldName = ""
 ////////////////////////////console.log('calling get file options')
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
      //timestamp:new Date()

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

// SET STORAGE//Where to save
let _postKey_new ='phone'
async function create_content(reqData){
  try {
    let findBy={} 
    findBy[_postKey_new]=false //Existing_columns(for Null O/P)
    //----------------
    return await modelI.findOne(findBy, {}).then(async(modelQA) => {
            if(modelQA==null){  //is't New or Exited
              modelQA = new modelI(reqData)            
            }else{return { status: 404, data:"Dubplication Occured" }}
  console.log('------------------------------------------>Existed Profile',modelQA)
          
            //-----------Saving Model_START
            return  await modelQA.save().then((modelData) => {
              if (modelData && Object.keys(modelData).length) {return { status: 200, data: modelData };
              } else {return { status: 404, data: modelData}; }
            }).catch((modelError) => {return { status: 404, data: modelError}; });
          //-------------------------Saving Model_END
        }).catch((modelQAR)=>{return { status:404, data:modelQAR}
        }) //------------
  } catch { return { status: 404, data: 'Fatal DATABASE ERROR'};}
}

async function update_content(reqData){
  console.log('------------------------------------------>Existed Profile')
  try {
    let findBy={} 
    if (reqData['id'] ?? false) {findBy['_id']=new ObjectId(reqData['id']) //updating by id
    }else{ 
      findBy[_postKey_new]=false //Existing_columns(for Null O/P)
      //return res.status(404).send({ message: "NullData(P) Received." });
    }
    //----------------
    return await modelI.findOne({ $or: findBy }, {}).then(async(modelQA) => {
            if(modelQA==null){  //is't New or Exited            
              return { status: 404, data:"Not REgistered" }
            }else{ modelQA=Object.assign(modelQA, reqData);}
            //-----------Saving Model_START
            return  await modelQA.save().then((modelData) => {
              if (modelData && Object.keys(modelData).length) {return { status: 200, data: modelData };
              } else {return { status: 404, data: modelData}; }
            }).catch((modelError) => {return { status: 404, data: modelError}; });
          //-------------------------Saving Model_END
        }).catch((modelQAR)=>{return { status:404, data:modelQAR}
        }) //------------
  } catch { return { status: 404, data: 'Fatal DATABASE ERROR'};}
}

router.post(modelIName, async (req, res) => {
        //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
        let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
        if(!userId){ 
          //return res.status(404).send({ message: "NullData(P +token) Received." });    
        }
        //--------------------
        let reqData= req?.body ?? false
        if (!reqData || (Object.keys(reqData).length == 0)) {
          return res.status(404).send({ message: "NullData Body Received." });
        }//---------
      //-----------Extracting Request_Body & Validate
      return await create_content(reqData).then((modelData) => {
        if (modelData.status == 200) {res.set(_setResponseHeader);
          return res.status(modelData.status).json(modelData.data);
        } else {return res.status(modelData.status).send(modelData.data);}
      }).catch((imodelData) =>{return res.status(404).send( imodelData)}); 
    }
);
// return res.status(404).send("(Srv):- _del202;but, "+modelData["data"]);//return res.status(500).send("(Srv);- _del500");
router.put(modelIName,authenticate, async (req, res) => {
        //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
        let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
        if(!userId){ 
          //return res.status(404).send({ message: "NullData(P +token) Received." });    
        }
        //--------------------
        let reqData= req?.body ?? false
        if (!reqData || (Object.keys(reqData).length == 0)) {
          return res.status(404).send({ message: "NullData Body Received." });
        }//---------
      return await update_content(reqData).then((modelData) => {
        if (modelData.status == 200) {res.set(_setResponseHeader);
          return res.status(modelData.status).json(modelData.data);
        } else {return res.status(modelData.status).send(modelData.data);}
      }).catch((imodelData) =>{return res.status(404).send( imodelData)}); 
    }
);
  // Get all products
  router.get(modelIName+"s",authenticate, async (req, res) => {
    //-----------Authentications and Authorizations Params
    let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
    if(!userId){ 
      //return res.status(404).send({ message: "NullData(P) Received." });  
      }
    //--------------------
    let reqParams = req.query ?? req.params
    if (!(reqParams ?? false) || (Object.keys(reqParams).length == 0)) {
      //return res.status(404).send({ message: "NullData(P) Received." });
    }
     //------------------------
     let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

    try {
      let modelData = await rOps(modelI, findBy, returnWat, limits);
      if (modelData.status == 200) {res.set(_setResponseHeader);
        return res.send(modelData["data"]);
      } else {return res.status(404).send("(Srv):- _read404;but, "+ modelData["data"]); }
    } catch (error) {return res.status(500).send("(Srv);- _read500");}
  });
  
  // Get a single product by ID                           
  router.get(modelIName,authenticate, async (req, res) => {
    //-----------Authentications and Authorizations Params
    let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
    if(!userId){ 
      //return res.status(404).send({ message: "NullData(P) Received." });   
     }
    //--------------------
    let reqParams = req.query ?? req.params
    if (!(reqParams ?? false) || (Object.keys(reqParams).length == 0)) {
      //return res.status(404).send({ message: "NullData(P) Received." });
    }
     //------------------------
     let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

    try {
      let modelData = await rOp(modelI, findBy, returnWat, limits);
      console.log('reading public hatts==>>',modelData.data.length,findBy)
      if (modelData.status == 200) {res.set(_setResponseHeader);
        return res.send(modelData["data"]);
      } else {return res.status(404).send("(Srv):- _readf202;but, "+ modelData["data"]); }
    } catch (error) {return res.status(500).send("(Srv);- _readf500"); }
  });
  //---------------------------------------
  //let delKey = "_id";
  router.delete(modelIName,authenticate, async (req, res) => {
    //-----------Authentications and Authorizations Params
    let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
    if(!userId){ return res.status(404).send({ message: "NullData(P) Received." });    }
    //--------------------
    let reqParams = req.query ?? req.params
    if (!(reqParams ?? false) || (Object.keys(reqParams).length == 0)) {
      //return res.status(404).send({ message: "NullData(P) Received." });
    }
     //------------------------
    // let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

    try {
      let modelData = await dOps(modelI, reqParams["id"]); //send Id_value only
      if (modelData.status == 200) {res.set(_setResponseHeader);
        return res.send(modelData["data"]);
      } else {return res.status(404).send("(Srv):- _del202;but, "+modelData["data"]);}
    } catch (error) {return res.status(500).send("(Srv);- _del500");}
  });
//----------------------------------Query Builder
// API
export default router;
//----------------------------------Query Builder
