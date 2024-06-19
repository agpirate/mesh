//const express = require('express');
import {saleChatModel} from "../../backendCore/models/chatModels.js";
import { profileModel } from "../../backendCore/models/profileModels.js";

import { mongoose } from "mongoose";
//var Schema = mongoose.Schema,ss
var ObjectId = mongoose.Types.ObjectId;

import { Router } from "express";
import multer from "multer";

import path from "path";
import fs from "fs";

import { rOrp,rOp,rOps,dOps } from "app/src-ssr/services/apiServices/documentRead.js";//

import { _getdeleteParams } from "app/src-ssr/services/apiServices/queryBuilder.js";//

const router = Router();

//--------------------servicess
  //====================  CREATING   ========================
  // import compute_Saleit  from "../../services/apiServices/compute_saleit.js";
  import {updateSaleit} from "../../services/modalServices/saleitServices.js"

  const modelI = saleChatModel
  const modelIName = "/salechat"
  var updateShaker = 1 //tree shaking...

  let operation='comments'
  let updateOperation='update'
  let createOperation='create'
  //------------
let _setResponseHeader = {
  "Content-Type": "application/json", //  modelData.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "5050",
  ETag: "Roaw",
};

///////-----------Headers modelData

router.post(modelIName, async (req, res) => {
      //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params 
      let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
      if(!userId){ return res.status(404).send({ message: "NullData(P +token) Received." }); }
      //--------------------
      //--------------------------is there form_Data =>{'upload':{'files':'fileNames','file':fileName}}
      // let reqParams = req.query ? req.query : req.params;
      // //---------------------------is there form_Data
      // var file_ = (reqParams?.['file_'] ?? false)
      // //--------------------------
      //-----------------------------
      let reqData= {};
        //-----------Extracting Request_Body & Validate
        reqData= req.body ?? {};
        reqData['userId']=userId
        return await updateSaleit(reqData,operation,createOperation).then((modelData)=>{
        console.log('creating buyers',modelData)
         res.set(_setResponseHeader)
         return res.status(modelData.status).send(modelData.data);                 
       })
    });
  
  // return res.status(404).send("(Srv):- _del202;but, "+modelData["data"]);//return res.status(505).send("(Srv);- _del505");
  router.put(modelIName, async (req, res) => {
      //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params 
      let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
      if(!userId){ return res.status(404).send({ message: "NullData(P +token) Received." }); }
      //--------------------
      //--------------------------is there form_Data =>{'upload':{'files':'fileNames','file':fileName}}
      // let reqParams = req.query ? req.query : req.params;
      // //---------------------------is there form_Data
      // var file_ = (reqParams?.['file_'] ?? false)
      // //--------------------------
      //-------------------------------
      let reqData= {};
      //-----------Extracting Request_Body & Validate
      reqData= req.body ?? {};
      reqData['userId']=userId
      return await updateSaleit(reqData,operation,updateOperation).then((modelData)=>{
        res.set(_setResponseHeader)
        return res.status(modelData.status).send(modelData.data);                 
      })
  });

  // Get all products
  router.get(modelIName+"s", async (req, res) => {
    //-----------Authentications and Authorizations Params
    let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
    if(!userId){ 
      //return res.status(404).send({ message: "NullData(P) Received." });    
    }
    //--------------------
    let reqParams = req.query ?? req.params
    if ((reqParams ?? false) && (Object.keys(reqParams).length)) {
    }else{}
    //------------------------
    let [findBy=[], returnWat=[], limits=10] = await _getdeleteParams(reqParams);
    // findBy.push({'createdAt':{$gt:(new Date().getFullYear)-1}})  //Searching Queries (Period) ++
    //---------
    let sortBy={createdAt:-1}
    //-----------
    try {
      let modelData = await rOps(modelI, findBy, returnWat, limits,sortBy);
      // let modelData = await rOrps(modelI, findBy, returnWat, limits,sortBy);
      res.set(_setResponseHeader)
      return res.status(modelData.status).json(modelData['data']);
    }catch (error) {
      return res.status(500).send(error); 
    }
  });
  
  // Get a single product by ID                           
  router.get(modelIName, async (req, res) => {
    //-----------Authentications and Authorizations Params
    let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
    if(!userId){ 
      //return res.status(404).send({ message: "NullData(P) Received." });    
    }
    //--------------------
    let reqParams = req.query ?? req.params
    if ((reqParams ?? false) && (Object.keys(reqParams).length)) {
    }else{return res.status(400).send("Search Query is null ?");}
    //------------------------
    let [findBy=[], returnWat=[], limits=10] = await _getdeleteParams(reqParams);
    // findBy.push({'createdAt':{$gt:(new Date().getFullYear)-1}})  //Searching Queries (Period) ++
    //---------
    let sortBy={createdAt:-1}
    //-----------
    try {
      let modelData = await rOp(modelI, findBy, returnWat, limits,sortBy);
      // let modelData = await rOrps(modelI, findBy, returnWat, limits,sortBy);
      res.set(_setResponseHeader)
      return res.status(modelData.status).json(modelData['data']);
    }catch (error) {
      return res.status(500).send(error); 
    }
  });
  //---------------------------------------
  //let delKey = "_id";
  router.delete(modelIName, async (req, res) => {
    //-----------Authentications and Authorizations Params
    let [_issrole,userId,_qW] = [req._issrole ?? false, req.userId ?? false,req.queryWeight ?? false]
    if(!userId){ 
      //return res.status(404).send({ message: "NullData(P) Received." });    
    }
    //--------------------
    let reqParams = req.query ?? req.params
    if (!(reqParams ?? false) || (Object.keys(reqParams).length == 0)) {
      return res.status(401).send("Search Query is null ?");
    }

    try {
      let modelData = await dOps(modelI, reqParams["id"]); //send Id_value only
      res.set(_setResponseHeader)
      return res.status(modelData.status).json(modelData['data']);
    } catch (error) {return res.status(404).send(error);}
  });
  //----------------------------------Query Builder
  // API
   export default router;
  


    //_computUserWeights(){};