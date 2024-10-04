//const express = require('express');
import {
  saleitModel,
  saleitClientModel,
} from "../../backendCore/models/saleitModels.js";
import { profileModel } from "../../backendCore/models/profileModels.js";
import { mongoose } from "mongoose";
//var Schema = mongoose.Schema,ss
var ObjectId = mongoose.Types.ObjectId;

import { Router } from "express";
import {
  rOrp, //OR Operator ( with query Must)
  rOp, //AND Operator
  rOps, //OR Operator ( with query Optional)
  dOps,
} from "app/src-ssr/services/apiServices/documentRead.js"; //
import { _getdeleteParams } from "app/src-ssr/services/apiServices/queryBuilder.js"; //

const router = Router();

//--------------------servicess
const nul = [null, undefined, false, "", [], {}, NaN];
//====================  CREATING   ========================
// import compute_Saleit  from "../../services/apiServices/compute_saleit.js";
import {
  createSaleit,
  updateSaleit,
} from "../../services/modalServices/saleitServices.js";

const modelI = saleitClientModel;
const modelIName = "/saleitClient";
var updateShaker = 1; //tree shaking...

let operation = "clients";

let updateOperation = "update";
let createOperation = "create";
let deleteOperation = "delete";
//------------
let createKey = "id";
let updateKey = "id";
let delKey = "id";
//------------
let _setResponseHeader = {
  "Content-Type": "application/json", //  modelData.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "5050",
  ETag: "Roaw",
};

router.post(modelIName, async (req, res) => {
  //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
  let [_issrole, userID, _qW] = [
    req._issrole ?? false,
    req.userID ?? false,
    req.queryWeight ?? false,
  ];
  if (!userID) {
    return res.status(401).send({ message: "UserID is Null" });
  }
  //--------------------
  //--------------------------is there form_Data =>{'upload':{'files':'fileNames','file':fileName}}
  // let reqParams = req.query ? req.query : req.params;
  // //---------------------------is there form_Data
  // var file_ = (reqParams?.['file_'] ?? false)
  // //--------------------------
  //-----------------------------
  let reqData = {};
  //-----------Extracting Request_Body & Validate
  reqData = req.body ?? {};
  if ((reqData[createKey] ?? null) == null) {
    return res.status(404).send("Uppdate Key Null");
  }
  //------------
  reqData["userID"] = userID;
  return await updateSaleit(reqData, operation, createOperation).then(
    (modelData) => {
      console.log(modelData.status, "\nClients Response Creating New\n");
      res.set(_setResponseHeader);
      return res.status(modelData.status).send(modelData);
    }
  );
});

// return res.status(404).send("(Srv):- _del202;but, "+modelData["data"]);//return res.status(505).send("(Srv);- _del505");
router.put(modelIName, async (req, res) => {
  //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
  let [_issrole, userID, _qW] = [
    req._issrole ?? false,
    req.userID ?? false,
    req.queryWeight ?? false,
  ];
  if (!userID) {
    return res.status(401).send({ message: "UserID is Null." });
  }
  //--------------------
  //--------------------------is there form_Data =>{'upload':{'files':'fileNames','file':fileName}}
  // let reqParams = req.query ? req.query : req.params;
  // //---------------------------is there form_Data
  // var file_ = (reqParams?.['file_'] ?? false)
  // //--------------------------
  //-------------------------------
  let reqData = {};
  //-----------Extracting Request_Body & Validate
  reqData = req.body ?? {};
  if ((reqData[updateKey] ?? null) == null) {
    return res.status(404).send("Uppdate Key Null");
  }
  //------------
  reqData["userID"] = userID;
  return await updateSaleit(reqData, operation, updateOperation).then(
    (modelData) => {
      console.log(modelData.data, "\nClients Response Creating New\n");
      res.set(_setResponseHeader);
      return res.status(modelData.status).send(modelData);
    }
  );
});

// Get all products
router.get(modelIName + "s", async (req, res) => {
  //-----------Authentications and Authorizations Params
  let [_issrole, userID, _qW] = [
    req._issrole ?? false,
    req.userID ?? false,
    req.queryWeight ?? false,
  ];
  if (!userID) {
    //return res.status(401).send({ message: "NullData(P) Received." });
  }
  //--------------------
  //--------------------
  let reqParams = req.query ?? req.params;
  //------------------------
  let [
    findBy = {},
    returnWat = [],
    limits = 100,
    sortBy = { createdAt: -1 },
    skips = 0,
  ] = await _getdeleteParams(reqParams);
  if (!Object.keys(findBy).length) {
    // return res.status(404).send({ message: "NullData(P) Received." });
  }
  //-----------
  let searchType = (reqParams["queryOperator"] ?? "-or").split("-");
  //---
  // findBy.push({'createdAt':{$gt:(new Date().getFullYear)-1}})  //Searching Queries (Period) ++
  //---------
  try {
    let modelData =
      searchType[1] == "and" //queries Combinations ( ored or anded)
        ? await rOp(modelI, findBy, returnWat, limits, sortBy)
        : await rOps(modelI, findBy, returnWat, limits, sortBy);
    // let modelData = await rOrp(modelI, findBy, returnWat, limits,sortBy);ZZ
    res.set(_setResponseHeader);
    return res.status(modelData.status).json(modelData["data"]);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Get a single product by ID
router.get(modelIName, async (req, res) => {
  //-----------Authentications and Authorizations Params
  let [_issrole, userID, _qW] = [
    req._issrole ?? false,
    req.userID ?? false,
    req.queryWeight ?? false,
  ];
  if (!userID) {
    //return res.status(401).send({ message: "NullData(P) Received." });
  }
  //--------------------
  //--------------------
  let reqParams = req.query ?? req.params;
  //------------------------
  let [
    findBy = {},
    returnWat = [],
    limits = 100,
    sortBy = { createdAt: -1 },
    skips = 0,
  ] = await _getdeleteParams(reqParams);
  if (!Object.keys(findBy).length) {
    return res.status(404).send({ message: "NullData(P) Received." });
  }
  //-----------
  let searchType = (reqParams["queryOperator"] ?? "-or").split("-");
  //---
  // findBy.push({'createdAt':{$gt:(new Date().getFullYear)-1}})  //Searching Queries (Period) ++
  //---------

  try {
    let modelData =
      searchType[1] == "and" //queries Combinations ( ored or anded)
        ? await rOp(modelI, findBy, returnWat, limits, sortBy)
        : await rOrp(modelI, findBy, returnWat, limits, sortBy);
    res.set(_setResponseHeader);
    return res.status(modelData.status).json(modelData["data"]);
  } catch (error) {
    return res.status(500).send(error);
  }
});
//---------------------------------------
//let delKey = "_id";
router.delete(modelIName, async (req, res) => {
  //-----------Authentications and Authorizations Params
  let [_issrole, userID, _qW] = [
    req._issrole ?? false,
    req.userID ?? false,
    req.queryWeight ?? false,
  ];
  if (!userID) {
    //return res.status(404).send({ message: "NullData(P) Received." });
  }
  //---------------
  //-----------Extracting Request_Body & Validate
  //--------------------

  let reqParams = req.query ?? req.params ?? {};

  if (Object.keys(reqParams).length == 0) {
    return res.status(404).send("Body is null ?");
  }
  //------------
  // reqData['userID']=userID
  console.log("\nClients Response Creating New\n");
  reqParams["userID"] = userID;
  try {
    return await updateSaleit(reqParams, operation, deleteOperation).then(
      (modelData) => {
        console.log(modelData.status, "\nClients Response Creating New\n");
        res.set(_setResponseHeader);
        return res.status(modelData.status).send(modelData);
      }
    );
  } catch (e) {
    return res.status(500).send(e);
  }
});
//----------------------------------Query Builder
// API
export default router;

//_computUserWeights(){};
