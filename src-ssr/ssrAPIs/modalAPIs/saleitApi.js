//const express = require('express');
import {
    saleitModel,saleClientModel
  } from "../../backendCore/models/saleitModels.js";
import { profileModel } from "../../backendCore/models/profileModels.js";
import { mongoose } from "mongoose";
//var Schema = mongoose.Schema,
var ObjectId = mongoose.Types.ObjectId;

import { Router } from "express";
import multer from "multer";
import path from "path";

const router = Router();

const fs = require("fs");

//---middlewares
import authenticate from "app/src-ssr/middlewares/authenticate.js";

//-------------------api services
import { _filesMeta} from "../../services/fileServices/fileMetas.js" 
import { _fileMeta} from "../../services/fileServices/fileMetas.js" //_thefilePath
import { rOrp,rOp,rOps,dOps } from "app/src-ssr/services/apiServices/documentRead.js";//
import { _getdeleteParams } from "app/src-ssr/services/apiServices/queryBuilder.js";//

//---------saleit_computing services
// import compute_Saleit  from "../../services/apiServices/compute_saleit.js";
import {createSaleit,updateSaleit} from "../../services/modalServices/saleitServices.js"

//--------------------servicess
//====================  CREATING   ========================
const modelI = saleitModel
const modelIName = "/saleit"

let _setResponseHeader = {
  "Content-Type": "application/json", //  modelData.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "5000",
  ETag: "Roaw",
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
//NB: foreign key will automatically changed into _ObjectID(by Mongodb) just valide_assign 24 charactor as string_Value
//but on searching(format id as objectID)
router.post(modelIName,authenticate, async (req, res) => {
          //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
          let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
          if(!userId){ 
            //return res.status(401).send({ message: "NullData(P +token) Received." });    
          }
          //--------------------------is there form_Data =>{'upload':{'files':'fileNames','file':fileName}}
          let reqParams = req.query ? req.query : req.params;
          //-------------------------- is there form_Data
          var file_ = (reqParams?.['file_'] ?? false)
          //-------------------------- 
          let reqData= {};
          if(file_){
            if(file_.files ?? false){ //Multiple file Uploading
              multer(getFileOptions()).fields([{name:file_.files,maxCount:4}])(req, res, async (multerError) => {
                    //-----------Extracting Request_Body & Validate
                    reqData= req.body ?? {};
                    //-----------------------FileMeta Injecting
                    if(multerError){
                      return res.status(404).send({ message: "Uploading Error" +multerError })
                    }else{
                      let filesMeta = req.files ?? false
                      if(filesMeta){
                        let _fileMeta = await _filesMeta(filesMeta)
                        reqData[file_.files] =_fileMeta[file_.files] //{'profile':['filepat',]}
                        //reqData[file_.files+'Meta'] = _fileMeta[file_.files+'Meta']
                      }
                    }
                    //----------------SET FILE ATTributes
                    reqData['userId']=userId
                    //----------------
                    return await createSaleit(reqData,reqData['onplayOps'] ?? 'CreateRowItem').then((modelData)=>{
                      res.set(_setResponseHeader)
                      return res.status(modelData.status).send(modelData.data);                 
                    })
              })
            }
            else{} //Single file uploading
            }
     else{
        //-----------Extracting Request_Body & Validate
        reqData= req.body ?? {} 
        reqData['userId']=userId
        //----------------
        return await createSaleit(reqData,reqData['onplayOps'] ?? 'CreateRowItem').then((modelData)=>{
          res.set(_setResponseHeader)
          return res.status(modelData.status).send(modelData.data);                 
        })
       }      
      }
  );

router.put(modelIName,authenticate, async (req, res) => {
      //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params 
      let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
      if(!userId){ return res.status(401).send({ message: "NullData(P + token) Received." }); }
      //--------------------
      //--------------------------is there form_Data =>{'upload':{'files':'fileNames','file':fileName}}
      let reqParams = req.query ? req.query : req.params;
      //---------------------------is there form_Data
      var file_ = (reqParams?.['file_'] ?? false)
      //--------------------------
      //console.log('fileExisted',file_)
      //-------------------------------
      let reqData= {};
      if(file_){ //there is fileCarried
        if(file_.files ?? false){ //is? file for multiple(array) of files
          multer(getFileOptions()).fields([{name:file_.files,maxCount:4}])(req, res, async (multerError) => {
            //-----------Extracting Request_Body & Validate
            reqData= req.body ?? {};
            //-----------------------FileMeta Injecting
            if(multerError){
              return res.status(404).send({ message: "Uploading Error" +multerError })
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
            return await updateSaleit(reqData,reqData['onplayOps'] ?? 'UpdateRowItem').then((modelData)=>{
              res.set(_setResponseHeader)
              return res.status(modelData.status).send(modelData.data);                 
            })
          })
        }
        else{ //three is single file upload
          //-----------Extracting Request_Body & Validate
          reqData= req.body ?? {};
          reqData['userId']=userId
          return await updateSaleit(reqData,reqData['onplayOps'] ?? 'UpdateRowItem').then((modelData)=>{
            res.set(_setResponseHeader)
            return res.status(modelData.status).send(modelData.data);                 
          })
        }
      }
     else{
        //-----------Extracting Request_Body & Validate
         reqData= req.body ?? {};
         reqData['userId']=userId
         return await updateSaleit(reqData,reqData['onplayOps'] ?? 'UpdateRowItem').then((modelData)=>{
          res.set(_setResponseHeader)
          return res.status(modelData.status).send(modelData.data);                 
        })
    }
  }
);
  
  // Get all products
  router.get(modelIName+"s", async (req, res) => {
    //-----------Authentications and Authorizations Params
    let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
    if(!userId){ 
      //return res.status(401).send({ message: "NullData(P) Received." });    
    }
    //--------------------
    let reqParams = req.query ?? req.params
    if ((reqParams ?? false) && (Object.keys(reqParams).length)) {
    }else{}
    //------------------------
    let [findBy=[], returnWat=[], limits=10] = await _getdeleteParams(reqParams);
    // findBy.push({'createdAt':{$gt:(new Date().getFullYear)-1}})  //Searching Queries (Period) ++
    //------------
    let sortBy={}
    if(reqParams['trend'] ?? false){  //sorting By ( createdDate / TrendScore)
       sortBy = {trendScore:-1} 
    }else{ sortBy = {createdAt:-1} }
    //-----------
    try {
      let modelData =( reqParams['qweight']?.[3] == 3 ?? false) ? //queries Combinations ( ored or anded)
           await rOps(modelI, findBy, returnWat, limits,sortBy):
           await rOrp(modelI, findBy, returnWat, limits,sortBy)
      res.set(_setResponseHeader)
      return res.status(modelData.status).json(modelData['data']);
    } catch (error) {return res.status(500).send(error); }
  });
  
  // Get a single product by ID                           
  router.get(modelIName, async (req, res) => {
    //-----------Authentications and Authorizations Params
    let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
    if(!userId){ 
      //return res.status(401).send({ message: "NullData(P) Received." });    
    }
    //--------------------
    let reqParams = req.query ?? req.params
    if ((reqParams ?? false) && (Object.keys(reqParams).length)) {
    }else{return res.status(404).send("Search Query is null ?");}
    //------------------------
    let [findBy=[], returnWat=[], limits=10] = await _getdeleteParams(reqParams);
    // findBy.push({'createdAt':{$gt:(new Date().getFullYear)-1}})  //Searching Queries (Period) ++
    //------------
    let sortBy={}
    if(reqParams['trend'] ?? false){  //sorting By ( createdDate / TrendScore)
       sortBy = {trendScore:-1} 
    }else{ sortBy = {createdAt:-1} }
    //-----------
    try {
      let modelData =( reqParams['qweight']?.[3] == 3 ?? false) ? //queries Combinations ( ored or anded)
           await rOp(modelI, findBy, returnWat, limits,sortBy):
           await rOrp(modelI, findBy, returnWat, limits,sortBy)
      res.set(_setResponseHeader)
      return res.status(modelData.status).json(modelData['data']);
    } catch (error) {return res.status(500).send(error); }
  });
  //---------------------------------------
  //let delKey = "_id";
  router.delete(modelIName, async (req, res) => {
    //-----------Authentications and Authorizations Params
    let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
    if(!userId){ 
      //return res.status(401).send({ message: "NullData(P) Received." });    
    }
    //--------------------
    let reqParams = req.query ?? req.params
    if ((reqParams ?? false) && (Object.keys(reqParams).length)) {
    }else{return res.status(501).send("Search Query is null ?");}

    try {
      let modelData = await dOps(modelI, reqParams["id"]); //send Id_value only
      res.set(_setResponseHeader)
      return res.status(modelData.status).json(modelData['data']);
    } catch (error) {return res.status(500).send(error);}
  });

  //-----------------------------------------
  export default router
