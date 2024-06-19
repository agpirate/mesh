//const express = require('express');
import {
  profileModel,acctypeModel
} from "../../backendCore/models/profileModels.js";

import authenticate from "../../middlewares/authenticate.js";
import authorize from "../../middlewares/authorize.js"
import { Router } from "express";
import multer from "multer";

import { mongoose } from "mongoose";
//var Schema = mongoose.Schema,
var ObjectId = mongoose.Types.ObjectId;

import { _filesMeta} from "../../services/fileServices/fileMetas.js" 
import { _fileMeta} from "../../services/fileServices/fileMetas.js" //_thefilePath
import { rOp,rOps,dOps } from "app/src-ssr/services/apiServices/documentRead.js";//
import { _getdeleteParams } from "app/src-ssr/services/apiServices/queryBuilder.js";//


const router = Router();

//====================  CREATING   ========================
//import compute_profile  from "../../services/modalServices/compute_profile";
const modelI = profileModel
const modelIName = "/profile"
//--------------------servicess

let _setResponseHeader = {
"Content-Type": "application/json", //  modelData.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
"Content-Length": "5050",
ETag: "Roaw",
"Set-Cookie": ["type=ninja", "language=javascript"],
};

let setCookies = {
"Content-Type": "application/json", //  modelData.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
"Content-Length": "5050",
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
  var newName =  ""
  return {
    storage: multer.diskStorage({
      filename: (req, file, cb) => {
        let extension = supportedMimes[file.mimetype];
        let _originalName = file.originalname.split(".")[0];
        newName =_originalName.split(" ")[0] + "-" + new Date().getTime() + "." + extension;
        cb(null, newName);
      },
      destination: (req, file, cb) => {cb(null, "./public/"+ file.fieldname)},
      path:        (req, file, cb) => {cb(null, "/"+file.fieldname +"/"+newName)},
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
async function create_content(reqData){
  try {
    let findBy={}
    if(reqData['id'] ?? false){
      findBy['_id']=new ObjectId(reqData['id'])
    }else{  
      findBy['updatedAt']=null //Existing_columns(for Null O/P)
      //return res.status(303).send({ message: "NullData(P) Received." });
    }
    //------------------is there to compute
    //--------------------
    return await modelI
      .findOne(findBy) //findeOne returns :--- Object or null values (while find returns [],[values,....])
      .then(async(modelQA) => { ///if findby is null it returns index_0 item
          if(modelQA==null){   //while Creating-- if null(create)..else(special update)     
            modelQA = new modelI(reqData)            
          }else{//Updating(Special _Content)
            modelQA=Object.assign(modelQA, reqData);
          }
          
        //----------Permission Computing
        let _role_permission =await acctypeModel.findOne({'group':reqData['upgrade'] ?? 'creator'})
        if(_role_permission){modelQA['acckey']= _role_permission._id }
        else{return { status: 303, data: "Permission Assign Error" };}

        //-------------------------Saving Model_START
        return  await modelQA.save().then((modelData) => {
          if (modelData && Object.keys(modelData).length) {return { status: 200, data: modelData };
          } else {return { status: 303, data: modelData}; }
        }).catch((modelError) => {return { status: 303, data: modelError}; });
      //-------------------------Saving Model_END
    }).catch((modelQAR)=>{return { status:303, data:modelQAR}
    }) //------------
} catch { return { status: 303, data: 'Fatal DATABASE ERROR'};}
}

let _updateKey='_v'
async function update_content(reqData){
  try {
    let findBy={} 
    if (reqData['id'] ?? false) {findBy['_id']=new ObjectId(reqData['id']) //updating by id
    }else{ 
      return { status: 303, data:"body.null data" } //updating by id
    }
    //-----------------is there to compute
    //let _computIt = reqData['onplayOps'] ?? true
    //-----------------
    return await modelI
      .findOne(findBy) //if findby is null it returns index_0 item
      .then(async(modelQA) => {
        if(modelQA==null){  //while Updating-- Only Existing Record          
          return { status: 303, data:"Record Doesn't Found." }
        }else{
          //if(_computIt){modelQA = await compute_Saleit(modelQA,reqData,_computIt)
          //}else{ modelQA=Object.assign(modelQA, reqData);}
          modelQA=Object.assign(modelQA, reqData);
        }
        //modelQA['queryWeight']['1']=[1,1,1,1]
        //-------------------------Saving Model_START
        return  await modelQA.save().then((modelData) => {
          if (modelData && Object.keys(modelData).length) {return { status: 200, data: modelData };
          } else {return { status: 303, data: modelData}; }
        }).catch((modelError) => {return { status: 303, data: modelError}; });
      //-------------------------Saving Model_END
    }).catch((modelQAR)=>{return { status:303, data:modelQAR}
    }) //------------
} catch { return { status: 303, data: 'Fatal DATABASE ERROR'};}
}

router.post(modelIName, async (req, res) => {
          //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
          let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
          if(!userId){ 
            //return res.status(404).send({ message: "NullData(P +token) Received." });    
          }
          //--------------------
          let reqParams = req.query ? req.query : req.params;
          //-------------------------- is there form_Data
          var file_ = (reqParams?.['file_'] ?? false)
          //----------
          let reqData= {};
          if(file_){
            if(file_.files ?? false){
              multer(getFileOptions()).fields([{name:file_.files,maxCount:4}])(req, res, async (multerError) => {
                  //-----------Extracting Request_Body & Validate
                  reqData= req.body ?? {};
                  //-----------------------FileMeta Injecting
                  if(multerError){
                    return res.status(303).send({ message: "Uploading Error" +multerError })
                  }else{
                    let filesMeta = req.files ?? false
                    if(filesMeta){
                      let _fileMeta = await _filesMeta(filesMeta)
                      reqData[file_.files] =_fileMeta[file_.files] //{'profile':['filepat',]}
                      //reqData[file_.files+'Meta'] = _fileMeta[file_.files+'Meta']
                    }
                  }
                  //----------------SET FILE ATTributes
                  //------------------
                  reqData['userId']=userId
                
                return await create_content(reqData).then((modelData)=>{
                  return res.status(modelData.status).send(modelData.data);                 
                })
                })}
          }
     else{
            //-----------Extracting Request_Body & Validate
            reqData= req.body ?? {} 
            reqData['userId']=userId
            //----------------SET FILE ATTributes
            return await create_content(reqData).then((modelData)=>{
              return res.status(modelData.status).send(modelData.data);                 
            })         
        }
      });

router.put(modelIName,authenticate, async (req, res) => {
      //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
      let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
      if(!userId){ return res.status(404).send({ message: "NullData(P +token) Received." }); }
      //--------------------
      //--------------------------is there form_Data =>{'upload':{'files':'fileNames','file':fileName}}
      let reqParams = req.query ? req.query : req.params;
      //-------------------------- is there form_Data
      var file_ = (reqParams?.['file_'] ?? false) 
      //NBBBB:===formData with fileInside won't let you see the body/file content untill reaches first into multer
      //--------------------------
      let reqData= {};
      if(file_){
        if(file_.files ?? false){
          multer(getFileOptions()).fields([{name:file_.files,maxCount:4}])(req, res, async (multerError) => {
            //-----------Extracting Request_Body & Validate
            reqData= req.body ?? {};
            //-----------------------FileMeta Injecting
            if(multerError){
              return res.status(303).send({ message: "Uploading Error" +multerError })
            }else{
              let filesMeta = req.files ?? false
              if(filesMeta){
                let _fileMeta = await _filesMeta(filesMeta)
                reqData[file_.files] =_fileMeta[file_.files] //{'profile':['filepat',]}
                //reqData[file_.files+'Meta'] = _fileMeta[file_.files+'Meta']
              }
            }
            //----------------SET FILE ATTributes
            //------------------
            reqData['userId']=userId
            return await update_content(reqData).then((modelData)=>{
              return res.status(modelData.status).send(modelData.data);                 
            })
        })}
        else if(file_.file ?? false){ 
          multer(getFileOptions()).single(file_.file)(req, res, async (multerError) => {
            //-----------Extracting Request_Body & Validate
            reqData= req.body ?? {} 
            //--------------------------
            if(multerError){
              return res.status(303).send({ message: "Uploading Error" +multerError })
            }else{
              let fileMeta = req.file ?? false
              if(fileMeta){
                let _Meta = await _fileMeta(fileMeta)
                reqData[file_.file] =_Meta[file_.file] //{'profile':['filepat',]}
                //reqData[file_.file+'Meta'] = _Meta[file_.file+'Meta']
              }
            }
            //------------------
            reqData['userId']=userId
            return await update_content(reqData).then((modelData)=>{
              return res.status(modelData.status).send(modelData.data);                 
            })
        })}
      }
   else{
          reqData= req.body ?? {} 
          reqData['userId']=userId
          //----------------SET FILE ATTributes
          return await update_content(reqData).then((modelData)=>{
            return res.status(modelData.status).send(modelData.data);                 
          })
        }
      });

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
     let [findBy={}, returnWat=[], limits=100] = await _getdeleteParams(reqParams);
    try {
      let modelData = await rOps(modelI, findBy, returnWat, limits);
      if (modelData.status == 200) {res.set(_setResponseHeader);
        return res.send(modelData["data"]);
      } else {return res.status(404).send("(Srv):- _read303;but, "+ modelData["data"]); }
    } catch (error) {return res.status(505).send("(Srv);- _read505");}
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
     let [findBy={}, returnWat=[], limits=100] = await _getdeleteParams(reqParams);

    try {
      let modelData = await rOp(modelI, findBy, returnWat, limits);
      if (modelData.status == 200) {res.set(_setResponseHeader);
        return res.send(modelData["data"]);
      } else {return res.status(404).send("(Srv):- _readf202;but, "+ modelData["data"]); }
    } catch (error) {return res.status(505).send("(Srv);- _readf505"); }
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
    } catch (error) {return res.status(505).send("(Srv);- _del505");}
  });
//----------------------------------Query Builder
// API
export default router;

//----------------------------------Query Builder
