//const express = require('express');
import {
    saleitModel
  } from "app/src-ssr/backendCore/models/saleitModels";
  
  
import { Router } from "express";
import multer from "multer";

const path = require("path");

import compression from "compression";

//require('dotenv').config()
//const dotenv = require('dotenv');
//dotenv.config();

const router = Router();

const fs = require("fs");

//--------------------servicess
const nul = [null, undefined, false, "", [], {}, NaN];

let resHeader = {
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
// SET STORAGE//Where to save

  
  //====================  CREATING   ========================
  import compute_Saleit  from "app/src-ssr/services/modalServices/compute_saleit";
  const modelI = saleitModel
  const modelIName = "/saleit"
  var updateShaker = 1 //tree shaking...

  async function create_record(reqData,isxFile=true){
  
    var ErrorDepth = "Computing Processing.."
  
   // try {
        //-------------------------
      var empData =""
      if(isxFile){
        empData =reqData;// await compute_Saleit(reqData)
      }else{empData=reqData}
  
      ErrorDepth="_incomingData Computing Completed...withFile_;"+ isxFile
      
    //-----------Data Computing
      let Doc = new modelI(empData);
      return await Doc.save()
        .then((modelData) => {
          if (typeof modelData == 'object' && Object.keys(modelData).length) {
            return { status: 200, data: modelData };
          } else {
            ErrorDepth="_incomingData Saving Completed,but Null_Obj..withFile_;"+ isxFile
            return { status: 404, data:"(DBs)_up303:- " + modelData +"::"+ ErrorDepth};//return res.status(404).json({ error: "Error Alert"  });
        }
        })
        .catch((modelError) => {
          ErrorDepth="_incomingData ErrorSaving ...withFile_;"+ isxFile
          return { status: 404, data:"(DBs)_Cre404:- " + modelError +"::"+ ErrorDepth};//return res.status(404).json({ error: "Error Alert"  });
        })
 //     } catch  {   return { status: 505, data: '(Compute/DBs)_ambigiouse _upError' +"::"+ ErrorDepth };}
  }
  
  router.post(modelIName, async (req, res) => {
     // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  var ErrorDepth="Prameters and Data_incoming is checking"
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  //var reqParam =  req.query ? req.query : req.params;
  var uploadf_ = false
  var uploadfs_ = false

  if (nul.includes(reqParams)) {
    return res.status(404).send({ message: "_FindBy_Nul" });
  }
  const _uploading = nul.includes(reqParams['upload']) ? false : reqParams['upload']
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if(_uploading){
    uploadf_ =nul.includes(_uploading['file']) ? false : _uploading['file'];
    uploadfs_ =nul.includes(_uploading['files']) ? false : _uploading['files'];
  }

  ErrorDepth="(Srv);- FindBy_Passed..withFiling_"+ uploadf_

  console.log('updating..',req.files,'___________',req.file,_uploading)
    //------------request meta data_analysiss
    if(uploadf_){//upload_['files']
      multer(getFileOptions()).single(uploadf_)  (req, res, async (err) => {
        //check for file_requirements first
        if (req.fileValidationError) {
          return res.status(404).json("validation_Erro :-"+req.fileValidationError);
         } else if (!req.file) {
         return res.status(404).json("req.file is null."+ req.headers);
         } else if (err instanceof multer.MulterError) {
          return res.status(404).json("Error 01;"+err);
         } else if (err) {
          return res.status(404).json("Error 02;"+err);
         }
      
         ErrorDepth="(Srv);- Multer_Processing _incomingData..withFiling_"+ uploadf_

        
      //Extracting requestResource (Date)...
      let filetoUpload = nul.includes(req.file) ? false : req.file
      //Extracting requestResource (File)...

      let fileMeta ={}
      fileMeta = await extractFileMeta(filetoUpload)
      if(!nul.includes(fileMeta)){ 
          //reqData=Object.assign(reqData,filesMeta)
        }

        fileMeta['geoLocation']="YYYYY0000XXX"
        
        reqData[uploadf_] = fileMeta.thefilePath
        reqData[uploadf_+'Meta'] = fileMeta

        ErrorDepth="(Srv);- Multer_Processing _incomingData..Fileted_..withFiling_"+ uploadf_

      //Extracting requestResource...
      if (typeof reqData == 'object' && Object.keys(reqData).length == 0) {
        //return res.status(404).send({ message: "Form Filling Required." });
      }
        return await create_record(reqData,findBy,false).then((modelData) => {
          if (modelData.status == 200) {
            res.set(resHeader);
            res.cookie("access_token", "sessionsID", { httpOnly: true });
            return res.status(200).json(modelData['data']);
          } else {
            return res.status(404).json(modelData['data']);
          }
        }).catch((imodelData) =>{return res.status(404).json("Srv) ;- File Uploading and Data ambigiouse"+ imodelData)
        }); //wait for returning or let it modelData it'self

      })}

     else{
      //Extracting requestResource...
      if (typeof reqData == 'object' && Object.keys(reqData).length == 0) {
        //return res.status(404).send({ message: "Form Filling Required." });
      }

     return await create_record(reqData,findBy).then((modelData) => {
          //console.log('update employee returned with....',modelData)
          if (modelData.status == 200) {
            res.set(resHeader);
            res.cookie("access_token", "sessionsID", { httpOnly: true });
            return res.status(200).json(modelData['data']);
          } else {
            return res.status(404).json(modelData['data']);
          }
        }).catch((imodelData) =>{return res.status(404).json("Srv) ;- File Uploading and Data ambigiouse"+ imodelData)
        }); //wait for returning or let it modelData it'self
     }}
);
  
  async function update_record(reqData,findBy,isxFile=true){
  
    var ErrorDepth = "Computing Processing.."
  
   // try {
      var _incomingData =""
      if(isxFile){
        _incomingData = await compute_Saleit(reqData,false)
      }else{_incomingData=reqData}
  
      ErrorDepth="_incomingData Computing Completed...withFile_"+ isxFile
      //console.log('clients',_incomingData['clients'])
      return await modelI
        .findOne({ $or: findBy }, {})
        .sort({ _id: -1 })
        .limit(1)
        .then((modelQA) => {
         ErrorDepth="_incomingData is Unique..."
          Object.assign(modelQA, _incomingData);
         ErrorDepth="_incomingData Assignation Completed.....withFile_"+isxFile
          return  modelQA
            .save()
            .then((modelData) => {
             
              if (typeof modelData == 'object' && Object.keys(modelData).length) {
                //res.set(resHeader);
                return { status: 200, data: modelData };//return res.json(modelData);
              } else {
                ErrorDepth="_incomingData Saving Completed,but Null_Obj....withFile_"+isxFile
                return { status: 404, data:"(DBs)_up303:- " + modelData +"::"+ ErrorDepth};//return res.status(404).json({ error: "Error Alert"  });
              }
            })
            .catch((modelError) => {
              ErrorDepth="_incomingData Error_Saving,....withFile_"+isxFile
              return { status: 404, data: "(DBs)_up404:- " + modelError+"::"+ ErrorDepth};//return res.status(404).json({ error: "Error Alert" + modelError });
            });
        }
        ).catch((modelQAR)=>{
         ErrorDepth="_incomingData is NotUnique.......withFile_"+isxFile
       

          return { status:505, data:"(DBs)_up505:- " + modelQAR+"::"+ErrorDepth}
        })
    
  //} catch {   return { status: 505, data: '(Compute/DBs)_ambigiouse _upError' +"::"+ ErrorDepth };}
  }
  
  // return res.status(404).json("(Srv):- _del202;but, "+modelData["data"]);//return res.status(505).json("(Srv);- _del505");
  router.put(modelIName, async (req, res) => {
     // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  var ErrorDepth="Prameters and Data_incoming is checking"
  let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
  //var reqParam =  req.query ? req.query : req.params;
  var uploadf_ = false
  var uploadfs_ = false

  if (nul.includes(reqParams)) {
    return res.status(404).send({ message: "_FindBy_Nul" });
  }
  const _uploading = nul.includes(reqParams['upload']) ? false : reqParams['upload']
  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  if(_uploading){
    uploadf_ =nul.includes(_uploading['file']) ? false : _uploading['file'];
    uploadfs_ =nul.includes(_uploading['files']) ? false : _uploading['files'];
  }

  ErrorDepth="(Srv);- FindBy_Passed..withFiling_"+ uploadf_

  console.log('updating..',req.files,'___________',req.file)
    //------------request meta data_analysiss
    if(uploadf_){//upload_['files']
      multer(getFileOptions()).single(uploadf_)  (req, res, async (err) => {
        //check for file_requirements first
        if (req.fileValidationError) {
          return res.status(404).json("validation_Erro :-"+req.fileValidationError);
         } else if (!req.file) {
         return res.status(404).json("req.file is null."+ req.headers);
         } else if (err instanceof multer.MulterError) {
          return res.status(404).json("Error 01;"+err);
         } else if (err) {
          return res.status(404).json("Error 02;"+err);
         }
      
         ErrorDepth="(Srv);- Multer_Processing _incomingData..withFiling_"+ uploadf_

        
      //Extracting requestResource (Date)...
      let filetoUpload = nul.includes(req.file) ? false : req.file
      //Extracting requestResource (File)...

      let fileMeta ={}
      fileMeta = await extractFileMeta(filetoUpload)
      if(!nul.includes(fileMeta)){ 
          //reqData=Object.assign(reqData,filesMeta)
        }

        fileMeta['geoLocation']="YYYYY0000XXX"
        
        reqData[uploadf_] = fileMeta.thefilePath
        reqData[uploadf_+'Meta'] = fileMeta

        ErrorDepth="(Srv);- Multer_Processing _incomingData..Fileted_..withFiling_"+ uploadf_

      //Extracting requestResource...
      if (typeof reqData == 'object' && Object.keys(reqData).length == 0) {
        return res.status(404).send({ message: "Form Filling Required." });
      }
        return await update_record(reqData,findBy,false).then((modelData) => {
          if (modelData.status == 200) {
            res.set(resHeader);
            res.cookie("access_token", "sessionsID", { httpOnly: true });
            return res.status(200).json(modelData['data']);
          } else {
            return res.status(404).json(modelData['data']);
          }
        }).catch((imodelData) =>{return res.status(404).json("Srv) ;- File Uploading and Data ambigiouse"+ imodelData)
        }); //wait for returning or let it modelData it'self

      })}

     else{
      //Extracting requestResource...
      if (typeof reqData == 'object' && Object.keys(reqData).length == 0) {
        return res.status(404).send({ message: "Form Filling Required." });
      }

     return await update_record(reqData,findBy).then((modelData) => {
          //console.log('update employee returned with....',modelData)
          if (modelData.status == 200) {
            res.set(resHeader);
            res.cookie("access_token", "sessionsID", { httpOnly: true });
            return res.status(200).json(modelData['data']);
          } else {
            return res.status(404).json(modelData['data']);
          }
        }).catch((imodelData) =>{return res.status(404).json("Srv) ;-No File Uploading and Data ambigiouse"+ imodelData)
        }); //wait for returning or let it modelData it'self
     }}
);

  
  // Get all products
  router.get(modelIName+"s", async (req, res) => {
    let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
    let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
    if (!findBy) {
      return res.status(404).send({ message: "_FindBy_Nul" });
    }
  
    try {
      let modelData = await rOps(modelI, findBy, returnWat, limits);
      if (modelData.status == 200) {
        res.set(resHeader);
        return res.send(modelData["data"]);
      } else {
        return res.status(404).json("(Srv):- _read202;but, "+ modelData["data"]);
      }
    } catch (error) {
      return res.status(505).json("(Srv);- _read505");
    }
  });
  
  // Get a single product by ID                           
  router.get(modelIName, async (req, res) => {
    let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
    let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
    if (!findBy) {
      return res.status(404).send({ message: "_FindBy_Nul" });
    }
    try {
      let modelData = await rOp(modelI, findBy, returnWat, limits);
      //console.log(reqParams,findBy,'Record searching....',modelData)
  
      if (modelData.status == 200) {
        res.set(resHeader);
        return res.send(modelData["data"]);
      } else {
        return res.status(404).json("(Srv):- _readf202;but, "+ modelData["data"]);
      }
    } catch (error) {
      return res.status(505).json("(Srv);- _readf505");
    }
  });
  //---------------------------------------
  //let delKey = "_id";
  router.delete(modelIName, async (req, res) => {
    let [reqData, reqParams] = [req.body, req.query ? req.query : req.params];
    let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
    if (!findBy) {
      return res.status(404).send("(Srv);- _delFiBy_Null");
    }
    try {
      let modelData = await dOps(modelI, reqParams["id"]); //send Id_value only
      if (modelData.status == 200) {
        res.set(resHeader);
        return res.send(modelData["data"]);
      } else {
        return res.status(404).json("(Srv):- _del202;but, "+modelData["data"]);//return res.status(505).json("(Srv);- _del505");
      }
    } catch (error) {
      return res.status(505).json("(Srv);- _del505");
    }
  });
  
  //----------------------------------Query Builder
  // API
  
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
    
      console.log("Findby Record_DBs(Shared_)_GET/_",findBy)
  
  
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
  
      console.log("Findby Record_DBs(Shared_)_GET/_",findBy)
  
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
          console.log("Reading(S) Record_DBs(Shared_)")
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
    
      limits = updateShaker + limits //   updateShaker = updateShaker ?  0 : 2

      return await dbModel
        .find({ $or: findBy }, returnWat) //match findBy....if not find return "null"
        .sort({ _id: -1,updatedAt:1 })
        .limit(limits)
        .then((modelData) => {       
          console.log("Reading Record_DBs(Shared_)")
  
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
          console.log("Deleting Record_DBs(Shared_)")
          if (typeof modelData == 'object' && Object.keys(modelData).length) { return { status: 200, data: JSON.stringify(modelData) };
          } else { return { status: 404, data: "(DBs)_del303:- " +modelData }; //not found Error
          } }).catch((modelError) => {
          return { status: 404, data: "(DBs)_del404:- " + modelError }; //DBs_Schema or Rules_validations Error
        }); 
    } catch { return { status: 505, data: "(DBs)_del505 :-" };  } //DBs Connections or Configurations, modules Error
  };
  
    //if filtering findBy != {}...
    // { $or: [   { age: 28 }, { age: 1 } ],... }........instead of findBy { key:value,key:value }
    // { age: {{ $in:[ 28, 1] },  },... }........instead of findBy { key:value,key:value }
  