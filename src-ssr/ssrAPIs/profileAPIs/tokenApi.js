

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

 const verifyToken = require("../../middlewares/authMiddleware")

 //-------------------
 var _rolingkey='phone'
// Protected route
router.post("/login", async (req, res) => {
    var ErrorDepth="Prameters and Data_incoming is checking"
    let [reqData, reqParams] = [req.body, req.query ?? req.params];
    if (!(reqParams ?? false) && Object.keys(reqParams).length) {
      return res.status(404).send({ message: "Form Filling Required." });
    }

    let [findBy, returnWat, limits] = await _postputParams(reqParams);
    returnWat = {}; 
      //----
      ErrorDepth="(Srv);- FindBy_Passed..withFiling_"+ findBy
      //console.log('findby',findBy)
      try {
        return await profileModel //"Autherizations.keyID" : value
          .findOne({ $or: findBy }, returnWat) //return null if empty
          .sort({ _id: 1 })
          .limit(limits)
          .then((modelData) => {
            if (typeof modelData == 'object' && Object.keys(modelData).length) { //can'n parse null object  ...if not foundede
              console.log('authentication APii_')
      
              //-----------------put session_value
              // Generate JWT token
              const token = 'oooo'//jwt.sign({ userId: 'yourUserId' }, 'yourSecretKey', { expiresIn: '1h' }); 
              res.setHeader('Authorization', `Bearer ${token}`);
              res.cookie('myCookie', 'cookieValue', { maxAge: 900000, httpOnly: true }); // Adjust options as per your requirement

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
  var _blackArray=['returnWat','limits','upload','timestamp']
  var _newParam ={}
  let returnWat = {};
  let limits = 0;
  try {
    for (let _k of Object.keys(reqParams)){
      if(_blackArray.includes(_k)){
      }else{
        if(['phone'].includes(_k)){ //query_ to be converted into number(since query_param are sent as string)
          _newParam[_k]=Number(reqParams[_k])
        }else{
          _newParam[_k]=reqParams[_k]
        }
      }
    }
  } catch {}
  let findBy = Object.keys(_newParam).length  ? await _queryParams(_newParam,) : [{}];
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
  var _val = parseQuery[paramKey] ?? ''
  //it(param)
  let obj = {};
  let keyTranslating = paramKey;
  if (["id", "Id", "ID"].includes(keyTranslating)) {
    keyTranslating = "_id";
  } //if param_key ..is id ( it'would reassing into _id(which mongoose use_ to identifie_id(column))
  if(isget && !['object','number'].includes(typeof _val) ){
     obj[keyTranslating] = {$regex : _val.toString(), "$options": "i" }
    //N:B:- this filtering won't work with id_filtering parametrs or with complex queries
  }else{
      obj[keyTranslating] = _val; //if  param_key != id , use as it's.... & resolve the incoming :key:value
  }
  theQuery.push(obj);
}
if (theQuery.length) { 
  theQuery = theQuery.filter(
    (obj) => (Object.keys(obj).length)
  );
} else {theQuery = [{}];  }

  console.log("Quering Parsing Service..", theQuery);
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
  