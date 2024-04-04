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
 //console.log('calling get file options')
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
async function extractFilesMeta(files){
 var filesMetaF =[]
 let filesMeta ={}
  for(let _fileObjKy in files){

    filesMeta[_fileObjKy]=[]
    filesMeta[_fileObjKy+"Meta"]=[]

    var fileList = files[_fileObjKy]
  
  //  console.log(fileList,'extractedfile')

    for(let _listInx in fileList)
    {

    try{
      var file = fileList[_listInx]
      //var fieldname = file.fieldname

      var newFileName = `${Date.now()}-${Math.round(Math.random() * 1e2)}${path.extname(file.originalname)}`; //save file_name as buffere
      var dbName = fs.readFileSync(file.path); //save file_name as buffere
      var encode_dbName = dbName.toString("base64");
      var _thefilePath = "/"+file.fieldname+"/"+file.filename
  
      var fileMeta = {
        //contentType: files.mimetype,
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
        //dbName: encode_dbName,
        geoLocation:"0000000000xyz"
      };
      //console.log('request with UploadFile_Detected [Files]',fileMeta)
    
      filesMeta[_fileObjKy][_listInx]=fileMeta.thefilePath
      filesMeta[_fileObjKy+"Meta"][_listInx]=fileMeta

    }catch{ 
      return false
       }

  }
    //filesMetaF.append(filesMeta)
  }
  return filesMeta
}
// SET STORAGE//Where to save

  //====================  CREATING   ========================
  import compute_Saleit  from "app/src-ssr/services/modalServices/compute_saleit";
  const modelI = saleitModel
  const modelIName = "/saleit"
  var updateShaker = 1 //tree shaking...
const _enumCat = {"Vehicles":'25', "Households":'50',"Phones":'75',"Displays":'100'}
const _enumUsage = {"":'25', "?":'50',"Used":'75',"New":'100'}

  async function create_record(reqData,findBy,isxFile=false){
  
    var ErrorDepth = "Computing Processing.."
  
   // try {
        //-------------------------
      var incmdata =""
      if(isxFile){
        incmdata =await compute_Saleit(reqData)
      }else{incmdata=reqData}
  
      ErrorDepth="incmdata Computing Completed...withFile_;"+ isxFile
      //incmdata['queryWeight']=(_enumCat[incmdata['catagory']] ?? '0') + '-'+(_enumUsage[incmdata['usage']] ?? '0')+'-'+'1'
    //-----------Data Computings
      let Doc = new modelI(incmdata);
      return await Doc.save()
        .then((modelData) => {
          if (typeof modelData == 'object' && Object.keys(modelData).length) {
            return { status: 200, data: modelData };
          } else {
            ErrorDepth="incmdata Saving Completed,but Null_Obj..withFile_;"+ isxFile
            return { status: 404, data:"(DBs)_up303:- " + modelData +"::"+ ErrorDepth};//return res.status(404).json({ error: "Error Alert"  });
        }
        })
        .catch((modelError) => {
          ErrorDepth="incmdata ErrorSaving ...withFile_;"+ isxFile
          return { status: 404, data:"(DBs)_Cre404:- " + modelError +"::"+ ErrorDepth};//return res.status(404).json({ error: "Error Alert"  });
        })
 //     } catch  {   return { status: 505, data: '(Compute/DBs)_ambigiouse _upError' +"::"+ ErrorDepth };}
  }
  
  router.post(modelIName, async (req, res) => {
     // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  let reqParams = req.query ? req.query : req.params;
  if (!(reqParams ?? false) || (Object.keys(reqParams).length == 0)) {
    return res.status(404).send({ message: "Form Filling Required." });
  }

  var ErrorDepth="Prameters and Data_incoming is checking"
  //var uploadfs_ = false
  var uploadfs_ = false

  const _uploading = nul.includes(reqParams['upload']) ? false : reqParams['upload']
  if(_uploading){
    //uploadfs_ =nul.includes(_uploading['file']) ? false : _uploading['file'];
    uploadfs_ =nul.includes(_uploading['files']) ? false : _uploading['files'];
  }

  let [findBy, returnWat, limits] = await _postputParams(reqParams);

  ErrorDepth="(Srv);- FindBy_Passed..withFiling_"+ uploadfs_

    //------------request meta data_analysiss
    if(uploadfs_){//upload_['files']
        //multer(getFileOptions()).single(uploadfs_)(req, res, async (err) => {
        multer(getFileOptions()).fields([{name:uploadfs_,maxCount:4}])(req, res, async (err) => {
        //check for file_requirements first     
        if (req.fileValidationError) {
          return res.status(404).json("validation_Erro :-"+ req.fileValidationError);
         } else if (!req.files) {
         return res.status(404).json("req.file is null."+ req.headers);
         } else if (err instanceof multer.MulterError) {
          return res.status(404).json("Error 01;"+err);
         } else if (err) {
          return res.status(404).json("Error 02;"+err);
         }
         
      let reqData= req.body
      //Extracting requestResource...
      if (!(reqData ?? false) || (Object.keys(reqData).length == 0)) {
        return res.status(404).send({ message: "Form Filling Required." });
      }

      //Extracting requestResource (Date)...
      let filetoUpload = nul.includes(req.files) ? false : req.files
      //Extracting requestResource (File)...

      let filesMeta ={}
      filesMeta = await extractFilesMeta(filetoUpload)
      //console.log('files list fffinside',fileMeta)

      if(filesMeta){ 
        reqData[uploadfs_] =filesMeta[uploadfs_]
        reqData[uploadfs_+'Meta'] =filesMeta[uploadfs_+'Meta']
          //reqData=Object.assign(reqData,filesMeta)
        }else{
          reqData[uploadfs_]=''
          reqData[uploadfs_+'Meta'] =''
        }

        //let [findBy, returnWat, limits] = await _postputParams(reqParams);
        ErrorDepth="(Srv);- Multer_Processing incmdata..withFiling_"+ uploadfs_

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

      })
    }
     
     else{
      //Extracting requestResource...
      let reqData= req.body
      //Extracting requestResource...
      if (!(reqData ?? false) || (Object.keys(reqData).length == 0)) {
        return res.status(404).send({ message: "Form Filling Required." });
      }

      //let [findBy, returnWat, limits] = await _postputParams(reqParams);

     return await create_record(reqData,findBy,true).then((modelData) => {
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
  
  async function update_record(reqData,findBy,isxFile=false){
  
    var ErrorDepth = "Computing Processing.."
    //----------------

     // try {
    //-------------------------
      var incmdata ={}
      if(isxFile){
        incmdata =await compute_Saleit(reqData)
      }else{incmdata=reqData}
  
      ErrorDepth="incmdata Computing Completed...withFile_;"+ isxFile
      
      //console.log('clients',incmdata['clients'])
      //let _cctweight=parseFloat(incmdata['queryWeight'].split('-')[2])
      //incmdata['queryWeight']=(_enumCat[incmdata['catagory']] ?? '0') + '-'+(_enumUsage[incmdata['usage']] ?? '0')+'-'+(_cctweight+1)
      return await modelI
        .findOne({ $or: findBy }, {})
        //.sort({ _id: -1 })
        //.limit(1)
        .then((modelQA) => {
         ErrorDepth="incmdata is Unique..."
        Object.assign(modelQA, incmdata);
         ErrorDepth="incmdata Assignation Completed.....withFile_"+isxFile
          return  modelQA
            .save()
            .then((modelData) => {
             
              if (typeof modelData == 'object' && Object.keys(modelData).length) {
                //res.set(resHeader);
                return { status: 200, data: modelData };//return res.json(modelData);
              } else {
                ErrorDepth="incmdata Saving Completed,but Null_Obj....withFile_"+isxFile
                return { status: 404, data:"(DBs)_up303:- " + modelData +"::"+ ErrorDepth};//return res.status(404).json({ error: "Error Alert"  });
              }
            })
            .catch((modelError) => {
              ErrorDepth="incmdata Error_Saving,....withFile_"+isxFile
              return { status: 404, data: "(DBs)_up404:- " + modelError+"::"+ ErrorDepth};//return res.status(404).json({ error: "Error Alert" + modelError });
            });
        }
        ).catch((modelQAR)=>{
         ErrorDepth="incmdata is NotUnique.......withFile_"+isxFile      

          return { status:505, data:"(DBs)_up505:- " + modelQAR+"::"+ErrorDepth}
        })
    
  //} catch {   return { status: 505, data: '(Compute/DBs)_ambigiouse _upError' +"::"+ ErrorDepth };}
  }
  
  // return res.status(404).json("(Srv):- _del202;but, "+modelData["data"]);//return res.status(505).json("(Srv);- _del505");
  router.put(modelIName, async (req, res) => {
      // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
        // await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
        let reqParams = req.query ? req.query : req.params;
        if (!(reqParams ?? false) || (Object.keys(reqParams).length == 0)) {
          return res.status(404).send({ message: "Form Filling Required." });
        }

        var ErrorDepth="Prameters and Data_incoming is checking"
        //var uploadfs_ = false
        var uploadfs_ = false

        const _uploading = nul.includes(reqParams['upload']) ? false : reqParams['upload']
        if(_uploading){
          //uploadfs_ =nul.includes(_uploading['file']) ? false : _uploading['file'];
          uploadfs_ =nul.includes(_uploading['files']) ? false : _uploading['files'];
        }

      let [findBy, returnWat, limits] = await _postputParams(reqParams);

        ErrorDepth="(Srv);- FindBy_Passed..withFiling_"+ uploadfs_
        console.log('incoming',uploadfs_)
        //------------request meta data_analysiss
        if(uploadfs_){//upload_['files']
          //multer(getFileOptions()).single(uploadfs_)(req, res, async (err) => {
          multer(getFileOptions()).fields([{name:uploadfs_,maxCount:4}])(req, res, async (err) => {
          //check for file_requirements first

          if (req.fileValidationError) {
            return res.status(404).json("validation_Erro :-"+ req.fileValidationError);
          } else if (!req.files) {
          return res.status(404).json("req.file is null."+ req.headers);
          } else if (err instanceof multer.MulterError) {
            return res.status(404).json("Error 01;"+err);
          } else if (err) {
            return res.status(404).json("Error 02;"+err);
          }
          
          let reqData= req.body
          //Extracting requestResource...
          if (!(reqData ?? false) || (Object.keys(reqData).length == 0)) {
            return res.status(404).send({ message: "Form Filling Required." });
          }

        //Extracting requestResource (Date)...
        let filetoUpload = nul.includes(req.files) ? false : req.files
        //Extracting requestResource (File)...

        let filesMeta ={}
        filesMeta = await extractFilesMeta(filetoUpload)
        //console.log('files list fffinside',fileMeta)
        reqData[uploadfs_] = reqData[uploadfs_]?.[0] ?? []
        reqData[uploadfs_+'Meta'] = reqData[uploadfs_+'Meta']?.[0] ?? []
        if(filesMeta){ 
            reqData[uploadfs_].push(...filesMeta[uploadfs_])
            reqData[uploadfs_+'Meta'].push(...filesMeta[uploadfs_+'Meta'])
            //reqData=Object.assign(reqData,filesMeta)
          }
          
        //let [findBy,returnWat, limits] = await _postputParams(reqParams);
        ErrorDepth="(Srv);- Multer_Processing incmdata..withFiling_"+ uploadfs_
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
      let reqData= req.body
      //Extracting requestResource...
      if (!(reqData ?? false) || (Object.keys(reqData).length == 0)) {
        return res.status(404).send({ message: "Form Filling Required." });
      }

      //let [findBy,returnWat, limits] = await _postputParams(reqParams);

     return await update_record(reqData,findBy,true).then((modelData) => {
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
    let reqParams = req.query ? req.query : req.params;
    let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
    console.log('gettting(s)',findBy,reqParams)
    
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
    let reqParams = req.query ? req.query : req.params;
    let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
   //console.log('gettting',findBy,reqParams)
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
    let reqParams = req.query ? req.query : req.params;

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
  
  async function _getdeleteParams(reqParams = {}) {
    if (!reqParams) {
      return [false,false,false];
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

    let findBy =[{}];
    if(Object.keys(_newParam).length){
      findBy = await _queryParams(_newParam,1)
      //_computContentWeights(findBy)
    }

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
  
async function rOps (
    dbModel,
    findBy = [],
    returnWat = {},
    limits = 0
  ) {

    if((findBy[0] ?? false) && (Object.keys(findBy[0]).length)){

    console.log("Reading(S999999) Record_DBs(Shared_)",findBy[0])

      try {
    return await dbModel
        .find({ $or: findBy }, returnWat)
        .sort({updatedAt:-1 })
        .limit(limits) //return the latest(updateAt:1) of 100
        .then((modelData) => {  
          //console.log(modelData.length+'_Read(s)_Data')
          console.log("Havvvvvvvvvvvving DAtasssssssss.",modelData.length,Object.keys(findBy[0]).length)
          if (modelData.length) {return { status: 200, data: JSON.stringify(modelData) };
          } else { return { status: 404, data: "(DBs)_read303:- " +modelData }; //not found Error
        } }).catch((modelError) => {
        return { status: 404, data: "(DBs)_read404:- " + modelError }; //DBs_Schema or Rules_validations Error
      }); 
  } catch (error) { return { status: 505, data: "(DBs)_read505 :-" };  } //DBs Connections or Configurations, modules Error
    }
  };
  
  async function rOp (
    dbModel,
    findBy = [{}],
    returnWat = {},
    limits = 0
  ) {
    if((findBy[0] ?? false) && (Object.keys(findBy[0]).length)){

    try {
      //limits = 1 + limits //   updateShaker = updateShaker ?  0 : 2
     // _computuserWeights
      //---------
      return await dbModel
        .find({ $or: findBy }, returnWat) //match findBy....if not find return "null"
        .sort({updatedAt:-1 })
        .limit(limits)
        .then((modelData) => {       
          console.log("Reading Record_DBs(Shared_)........VVVVVV...Rop",modelData.length,findBy)
          if (modelData.length) {
            // _computContentWeights
            return { status: 200, data:modelData };
          } else { return { status: 404, data: "(DBs)_readf303:- " +modelData }; //not found Error
        } }).catch((modelError) => {
        return { status: 404, data: "(DBs)_readf404:- " + modelError }; //DBs_Schema or Rules_validations Error
      }); 
  } catch (error) { return { status: 505, data: "(DBs)_readf505 :-" };  } //DBs Connections or Configurations, modules Error

  }
  return false
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
    async function _computContentWeights(findBy,){
      return await modelI
        .find({ $or: findBy }, {})
        //.sort({ _id: -1 })
        //.limit(1)
        .then((modelQA) => {
          for(let _doc in modelQA){
            let _modelQA=modelQA[_doc]
            //--------
            let incmdata ={'queryWeight':''}
            let _qweight=_modelQA['queryWeight'].split('-')
            _modelQA['queryWeight']=_qweight[0] + '-'+_qweight[1]+'-'+ String(Number(_qweight[2])+1)

            console.log(_modelQA,'model saveing contee')
            //----------
            //ErrorDepth="incmdata is Unique..."
            //Object.assign(_modelQA, incmdata);
             //ErrorDepth="incmdata Assignation Completed.....withFile_"+isxFile
             // return  _modelQA
             //   .save()
             //   .then((modelData) => {
    
    
             //   })
          }
          })
    }

    //_computUserWeights(){};