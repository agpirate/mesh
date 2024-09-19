

import {
  profileModel,threeaModel
} from "../../backendCore/models/profileModels.js";
import authenticate from "../../middlewares/authenticate.js";
import authorize from "../../middlewares/authorize.js"

import { mongoose } from "mongoose";
var ObjectId = mongoose.Types.ObjectId;

import jwt  from "jsonwebtoken";
import { Router } from "express"
import { rOp,rOps,dOps } from "app/src-ssr/services/apiServices/documentRead.js";//
import { _getdeleteParams } from "app/src-ssr/services/apiServices/queryBuilder.js";//

import {createRolePermissions} from "app/src-ssr/hooks/createThreea.js"
createRolePermissions()

const router = Router()
//====================  CREATING   ========================
//import compute_profile  from "../../services/modalServices/compute_profile";
const modelI = threeaModel
const modelIName = "/permission"
//--------------------servicess
let _setResponseHeader = {
  "Content-Type": "application/json", //  modelData.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "5050",
  ETag: "Roaw",
  "Set-Cookie": ["type=ninja", "language=javascript"],
  };

// Protected route
let _checkQuery='phone'
router.post("/add",authorize, async (req, res) => {
      //---------------------Grap User Data of Request_Header + Body
      let findBy={}
      let reqData= req.body ?? {}
      if (reqData[_checkQuery] ?? false) {findBy[_checkQuery] = reqData[_checkQuery] ?? false
      }else{ 
        return res.status(303).send("req.body is null")
      }

      //reqData['upgrade'] ?? 'creator'
      let _role_permission =await threeaModel.findOne({'group':reqData['upgrade'] ?? 'creator'})
      if(_role_permission){modelQA['acckey']= _role_permission._id }
      else{return { status: 303, data: "Permission Assign Error" };}

      //-------------Finde User On Database
      try {
        return await profileModel.findOne(findBy).then(async (modelData) => {
            if (modelData && Object.keys(modelData).length) {
               //------user Already Registered..Then Check for Roles use acckey
               let queryID = new ObjectId(modelData.acckey)
               //--------------Search For Role and Permissions----Start
               return await threeaModel.findOne({'_id':queryID}).then((_rolePermisions)=>{
                if(_rolePermisions){
                  //generate Token
                  const token = jwt.sign({ userID: modelData['id'],'acckey':_rolePermisions['id'] }, process.env.TOKEN_SECRET, { expiresIn: '1h' }); 
                  //---set Token as Response
                  res.setHeader('Authorization', `Bearer ${token}`)//To send the token in the Authorization header, the client needs to include it in subsequent requests:
                  res.cookie('access_token', token, { maxAge: 900000, httpOnly: true,secure:false,signed:false }); //this Would Inject token into [cookie_storage && cookie_Header]
                  //---------Including Other Response Data
                  
                  //--------Injecting Permission and UserDatas
                  res.setHeader('threea',JSON.stringify(_rolePermisions)) //Injecting new_attribute into mongodb(findOne or Obj)_ data is not good..best...In Header
                  res.setHeader('token',JSON.stringify(token)) //Injecting new_attribute into mongodb(findOne or Obj)_ data is not good..best...In Header
                  res.setHeader('role',_rolePermisions.profile.group) //Injecting new_attribute into mongodb(findOne or Obj)_ data is not good..best...In Header
                  ///console.log('User is Authenticated && Has Permissions of ===>',_rolePermisions)
                  
                return res.status(200).send(JSON.stringify(modelData)); 
                }
                return  res.status(404).json('Permission Error')
               }).catch(()=>{ return res.status(404).json({})})
               //--------------------Permission Operation---Ends

            } else { return res.status(202).send(null ); }
          }).catch((modelError) => {return res.status(404).send(modelError ); }); // return modelError
      } catch (error) {  return  res.status(505).send(error);  }
    });
 
// router.post(modelIName, async (req, res) => {
//       //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
//       let [_issrole,userID,_qW] = [req._issrole ?? false, req.userID ?? false,req.queryWeight ?? false]
//       if(!userID){ 
//         //return res.status(404).send({ message: "NullData(P +token) Received." });    
//       }
//       //--------------------
//       // let reqParams = req.query ? req.query : req.params;
//       //-------------------------- is there form_Data
//       // var file_ = (reqParams?.['file_'] ?? false)
//       //----------
//       let reqData= {};

//         //-----------Extracting Request_Body & Validate
//         reqData= req.body ?? {};
//         if (Object.keys(reqData).length == 0) {return res.status(404).send("");}
//         //------
//         reqData['userID']=userID
//         //----------------SET FILE ATTributes
//         let letRolePermissions =reqData.roles
//         return await documentCupdate(threeaModel,letRolePermissions,'group').then(async (modelData)=>{
//           console.log(modelData,'Creating Permissiions Available RP <>')
//           //---and Create sample users
//           let _sampleRole =null
//           if(modelData.status == 200){
//              _sampleRole= modelData.data.admin ?? false
//           }
//           const letProfiles = [
//             {name:'root',lastName:'root',phone:'123456789',companyID:'00028','acckey':_sampleRole ? new ObjectId(_sampleRole.id) : null},
//             {name:'admin3',lastName:'12345',phone:'12345899',companyID:'00029','acckey':_sampleRole ? new ObjectId(_sampleRole.id) : null},
//           ]
//           let modelData2 = await documentCupdate(profileModel,letProfiles,'phone')
//           console.log(modelData2,'Creating Permissiions Available')
//           //-----
//           res.set(_setResponseHeader)
//           return res.status(modelData2 ? 200 : 201).send(modelData2);                 
//         })         
//     });
let updateKey ='group'
router.put(modelIName,authenticate, async (req, res) => {
  //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
  let [_issrole,userID,_qW] = [req._issrole ?? false, req.userID ?? false,req.queryWeight ?? false]
  if(!userID){ return res.status(404).send({ message: "NullData(P +token) Received." }); }
  //--------------------
  //--------------------------is there form_Data =>{'upload':{'files':'fileNames','file':fileName}}
  // let reqParams = req.query ? req.query : req.params;
  //-------------------------- is there form_Data
  // var file_ = (reqParams?.['file_'] ?? false) 
  //NBBBB:===formData with fileInside won't let you see the body/file content untill reaches first into multer
  // console.log("is File ?",file_)
  //--------------------------
  let reqData= {};

      reqData= req.body ?? {};
      if (Object.keys(reqData).length == 0 && (reqData[updateKey] ?? true)) {return res.status(404).send("");}
      //---
      // reqData['userID']=userID
      //----------------SET FILE ATTributes
      reqData['userID']=userID
      return documentCupdate(threeaModel,[reqData],'group').then((modelData)=>{
        res.set(_setResponseHeader)
        return res.status(modelData.status).send(modelData.data);                 
      })
    
  });

// Get all products
router.get(modelIName+"s",authenticate, async (req, res) => {
//-----------Authentications and Authorizations Params
let [_issrole,userID,_qW] = [req._issrole ?? false, req.userID ?? false,req.queryWeight ?? false]
if(!userID){ 
  //return res.status(404).send({ message: "NullData(P) Received." });  
  }
//--------------------
let reqParams = req.query ?? (req.params ?? {})
if (Object.keys(reqParams).length == 0) {
  //return res.status(404).send({ message: "NullData(P) Received." });
}
 //------------------------
 let [findBy={}, returnWat=[], limits=100] = await _getdeleteParams(reqParams);
try {
  let modelData = await rOps(modelI, findBy, returnWat, limits);
  if (modelData.status == 200) {
    res.set(_setResponseHeader);
    return res.status(modelData.status).send(modelData["data"]);
  } else {return res.status(404).send("(Srv):- _read303;but, "+ modelData["data"]); }
} catch (error) {return res.status(505).send("(Srv);- _read505");}
});

// Get a single product by ID                           
router.get(modelIName,authenticate, async (req, res) => {
//-----------Authentications and Authorizations Params
let [_issrole,userID,_qW] = [req._issrole ?? false, req.userID ?? false,req.queryWeight ?? false]
if(!userID){ 
  //return res.status(404).send({ message: "NullData(P) Received." });   
 }
//--------------------
let reqParams = req.query ?? (req.params ?? {})
if (Object.keys(reqParams).length == 0) {
  //return res.status(404).send({ message: "NullData(P) Received." });
}
 //------------------------
 let [findBy={}, returnWat=[], limits=100] = await _getdeleteParams(reqParams);

try {
  let modelData = await rOp(modelI, findBy, returnWat, limits);
  if (modelData.status == 200) {
    res.set(_setResponseHeader);
    return res.status(modelData.status).send(modelData["data"]);
  } else {return res.status(404).send("(Srv):- _readf202;but, "+ modelData["data"]); }
} catch (error) {return res.status(505).send("(Srv);- _readf505"); }
});
//---------------------------------------
//let delKey = "_id";
router.delete(modelIName,authenticate, async (req, res) => {
//-----------Authentications and Authorizations Params
let [_issrole,userID,_qW] = [req._issrole ?? false, req.userID ?? false,req.queryWeight ?? false]
if(!userID){ return res.status(404).send({ message: "NullData(P) Received." });    }
//--------------------
let reqParams = req.query ?? (req.params ?? {})
if (Object.keys(reqParams).length == 0) {
  //return res.status(404).send({ message: "NullData(P) Received." });
}
 //------------------------
// let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);

try {
  let modelData = await dOps(modelI, reqParams["id"]); //send Id_value only
  if (modelData.status == 200) {res.set(_setResponseHeader);
    return res.status(modelData.status).send(modelData["data"]);
  } else {return res.status(404).send("(Srv):- _del202;but, "+modelData["data"]);}
} catch (error) {return res.status(505).send("(Srv);- _del505");}
});
//----------------------------------Query Builder
// API
export default router;

  