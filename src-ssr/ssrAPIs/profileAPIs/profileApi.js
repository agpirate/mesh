//const express = require('express');
import {
  profileModel,
  threeaModel,
} from "../../backendCore/models/profileModels.js";

import authenticate from "../../middlewares/authenticate.js";
import authorize from "../../middlewares/authorize.js";
import { Router } from "express";
import multer from "multer";

import { mongoose } from "mongoose";
//var Schema = mongoose.Schema,
var ObjectId = mongoose.Types.ObjectId;

import { _filesMeta } from "../../services/fileServices/fileMetas.js";
import { _fileMeta } from "../../services/fileServices/fileMetas.js"; //_thefilePath
import {
  rOrp, //OR Operator ( with query Must)
  rOp, //AND Operator
  rOps, //OR Operator ( with query Optional)
  dOps,
} from "app/src-ssr/services/apiServices/documentRead.js"; //
import { _getdeleteParams } from "app/src-ssr/services/apiServices/queryBuilder.js"; //

const router = Router();

//====================  CREATING   =========================
//import compute_profile  from "../../services/modalServices/compute_profile";
const modelI = profileModel;
const modelIName = "/profile";
//--------------------services

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
  var newName = "";
  return {
    storage: multer.diskStorage({
      filename: (req, file, cb) => {
        let extension = supportedMimes[file.mimetype];
        let _originalName = file.originalname.split(".")[0];
        newName =
          _originalName.split(" ")[0] +
          "-" +
          new Date().getTime() +
          "." +
          extension;
        cb(null, newName);
      },
      destination: (req, file, cb) => {
        cb(null, "./public/" + file.fieldname);
      },
      path: (req, file, cb) => {
        cb(null, "/" + file.fieldname + "/" + newName);
      },
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

let _nullKey = { updatedAt: null };

let createKey = "phone";
let updateKey = "id";
let delKey = "id";
// SET STORAGE//Where to save
router.post(modelIName, async (req, res) => {
  //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
  let [_issrole, userID, _qW] = [
    req._issrole ?? false,
    req.userID ?? false,
    req.queryWeight ?? false,
  ];
  if (!userID) {
    //return res.status(404).send({ message: "NullData(P +token) Received." });
  }
  //--------------------
  let reqParams = req.query ? req.query : req.params;
  //-------------------------- is there form_Data
  var file_ = reqParams?.["file_"] ?? false;
  //----------
  let reqData = {};
  console.log(
    `\n<==> Profile API Creating New User == Parameters => ${reqParams}`
  );
  try {
    if (file_) {
      if (file_.files ?? false) {
        multer(getFileOptions()).fields([{ name: file_.files, maxCount: 4 }])(
          req,
          res,
          async (multerError) => {
            //-----------Extracting Request_Body & Validate
            reqData = req.body ?? {};
            //-----------------------FileMeta Injecting
            if (multerError) {
              return res
                .status(303)
                .send({ message: "Uploading Error" + multerError });
            } else {
              let filesMeta = req.files ?? false;
              if (filesMeta) {
                let _fileMeta = await _filesMeta(filesMeta);
                reqData[file_.files] = _fileMeta[file_.files]; //{'profile':['filepat',]}
                //reqData[file_.files+'Meta'] = _fileMeta[file_.files+'Meta']
              }
            }
            //----------------SET FILE ATTributes
            //------------------
            reqData["userID"] = userID;

            return await create_content(reqData).then((modelData) => {
              return res.status(modelData.status).send(modelData.data);
            });
          }
        );
      }
    } else {
      //-----------Extracting Request_Body & Validate
      reqData = req.body ?? {};
      if ((reqData[createKey] ?? null) == null) {
        return res.status(404).send("");
      }
      //------
      //----------------SET FILE ATTributes
      reqData["userID"] = userID;
      return await create_content(reqData).then((modelData) => {
        console.log(`\nCreating Status == ${modelData.data}\n\n`, reqData);
        res.set(_setResponseHeader);
        return res.status(modelData.status).send(modelData.data);
      });
    }
  } catch (e) {
    return res.status(401).send(e);
  }
});

router.put(modelIName, authenticate, async (req, res) => {
  //-----------------Sender Meta (Header ++ Token)--Authentications and Authorizations Params
  let [_issrole, userID, _qW] = [
    req._issrole ?? false,
    req.userID ?? false,
    req.queryWeight ?? false,
  ];
  if (!userID) {
    return res.status(404).send({ message: "NullData(P +token) Received." });
  }
  //--------------------
  //--------------------------is there form_Data =>{'upload':{'files':'fileNames','file':fileName}}
  let reqParams = req.query ? req.query : req.params;
  //-------------------------- is there form_Data
  var file_ = reqParams?.["file_"] ?? false;
  //NBBBB:===formData with fileInside won't let you see the body/file content untill reaches first into multer
  //--------------------------
  let reqData = {};
  try {
    if (file_) {
      if (file_.files ?? false) {
        multer(getFileOptions()).fields([{ name: file_.files, maxCount: 4 }])(
          req,
          res,
          async (multerError) => {
            //-----------Extracting Request_Body & Validate
            reqData = req.body ?? {};
            //-----------------------FileMeta Injecting
            if (multerError ?? false) {
              return res
                .status(303)
                .send({ message: "Uploading Error" + multerError });
            } else {
              let filesMeta = req.files ?? false;
              console.log(
                "\n(Multiple) File Existed as ",
                filesMeta,
                multerError
              );
              if (filesMeta) {
                let _fileMeta = await _filesMeta(filesMeta);
                reqData[file_.files] = _fileMeta[file_.files]; //{'profile':['filepat',]}
                //reqData[file_.files+'Meta'] = _fileMeta[file_.files+'Meta']
              } else {
                return res.status(303).send({ message: "Uploading Error" });
              }
            }
            //----------------SET FILE ATTributes
            if ((reqData[updateKey] ?? null) == null) {
              return res.status(404).send("");
            }
            //------------------
            reqData["userID"] = userID;
            return await update_content(reqData).then((modelData) => {
              res.set(_setResponseHeader);
              return res.status(modelData.status).send(modelData.data);
            });
          }
        );
      } else if (file_.file ?? false) {
        multer(getFileOptions()).single(file_.file)(
          req,
          res,
          async (multerError) => {
            //-----------Extracting Request_Body & Validate
            reqData = req.body ?? {};
            //--------------------------
            if (multerError ?? false) {
              return res
                .status(303)
                .send({ message: "Uploading Error" + multerError });
            } else {
              let fileMeta = req.file ?? false;
              console.log("\n(Single) File Existed as ", fileMeta, multerError);
              if (fileMeta) {
                let _Meta = await _fileMeta(fileMeta);
                reqData[file_.file] = _Meta[file_.file]; //{'profile':['filepat',]}
                //reqData[file_.file+'Meta'] = _Meta[file_.file+'Meta']
              } else {
                return res.status(303).send({ message: "Uploading Error" });
              }
            }

            if ((reqData[updateKey] ?? null) == null) {
              return res.status(404).send("");
            }
            //------------------
            reqData["userID"] = userID;
            return await update_content(reqData).then((modelData) => {
              res.set(_setResponseHeader);
              return res.status(modelData.status).send(modelData.data);
            });
          }
        );
      }
    } else {
      reqData = req.body ?? {};
      if ((reqData[updateKey] ?? null) == null) {
        return res.status(404).send("");
      }
      //---
      //----------------SET FILE ATTributes
      reqData["userID"] = userID;
      return await update_content(
        reqData,
        "UpdateRowItem",
        reqData["onplaySubops"] ?? false
      ).then((modelData) => {
        res.set(_setResponseHeader);
        return res.status(modelData.status).send(modelData.data);
      });
    }
  } catch (e) {
    return res.status(401).send(e);
  }
});

// Get all products
router.get(modelIName + "s", authenticate, async (req, res) => {
  //-----------Authentications and Authorizations Params
  let [_issrole, userID, _qW] = [
    req._issrole ?? false,
    req.userID ?? false,
    req.queryWeight ?? false,
  ];
  if (!userID) {
    //return res.status(404).send({ message: "NullData(P) Received." });
  }
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
  try {
    let modelData =
      searchType[1] == "and" //queries Combinations ( ored or anded)
        ? await rOp(modelI, findBy, returnWat, limits, sortBy)
        : await rOps(modelI, findBy, returnWat, limits, sortBy);
    if (modelData.status == 200) {
      // res.set(_setResponseHeader);
      return res.status(modelData.status).send(modelData["data"]);
    } else {
      return res.status(404).send("(Srv):- _read303;but, " + modelData["data"]);
    }
  } catch (error) {
    return res.status(505).send("(Srv);- _read505");
  }
});

// Get a single product by ID
router.get(modelIName, authenticate, async (req, res) => {
  //-----------Authentications and Authorizations Params
  let [_issrole, userID, _qW] = [
    req._issrole ?? false,
    req.userID ?? false,
    req.queryWeight ?? false,
  ];
  if (!userID) {
    //return res.status(404).send({ message: "NullData(P) Received." });
  }
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
  try {
    let modelData =
      searchType[1] == "and" //queries Combinations ( ored or anded)
        ? await rOp(modelI, findBy, returnWat, limits, sortBy)
        : await rOrp(modelI, findBy, returnWat, limits, sortBy);
    if (modelData.status == 200) {
      res.set(_setResponseHeader);
      return res.send(modelData["data"]);
    } else {
      return res
        .status(404)
        .send("(Srv):- _readf202;but, " + modelData["data"]);
    }
  } catch (error) {
    return res.status(505).send("(Srv);- _readf505");
  }
});
//---------------------------------------
//let delKey = "_id";
router.delete(modelIName, authenticate, async (req, res) => {
  //-----------Authentications and Authorizations Params
  let [_issrole, userID, _qW] = [
    req._issrole ?? false,
    req.userID ?? false,
    req.queryWeight ?? false,
  ];
  if (!userID) {
    return res.status(404).send({ message: "NullData(P) Received." });
  }
  //--------------------
  let reqParams = req.query ?? req.params;
  if (!(reqParams ?? false) || Object.keys(reqParams).length == 0) {
    return res.status(404).send("NullData(P) Received.");
  }
  //------------------------
  // let [findBy, returnWat, limits] = await _getdeleteParams(reqParams);
  try {
    let modelData = await dOps(modelI, reqParams["id"]); //send Id_value only
    if (modelData.status == 200) {
      res.set(_setResponseHeader);
      return res.send(modelData["data"]);
    } else {
      return res.status(404).send("(Srv):- _del202;but, " + modelData["data"]);
    }
  } catch (error) {
    return res.status(505).send("(Srv);- _del505");
  }
});
//----------------------------------Query Builder
// API
export default router;

//----------------------------------Query Builder

// SET STORAGE//Where to save
// let _createKey =''
async function create_content(reqData) {
  try {
    //------------Preparing finding Query
    let findBy = {}; //Edit Existing
    if (reqData[createKey] ?? false) {
      findBy[createKey] = reqData[createKey]; //updating by id
    } else {
      //creatNew
      findBy = _nullKey; //Existing_columns(for Null O/P)
      //return res.status(404).send({ message: "NullData(P) Received." });
    }
    //------------------is there to compute
    console.log(
      `\n<==>CreateContent Profile Service 0=> Check Existances of Params \n`
    );
    //--------------------
    return await modelI
      .findOne(findBy) //findeOne returns :--- Object or null values (while find returns [],[values,....])
      .then(async (modelQA) => {
        ///if findby is null it returns index_0 item

        if (modelQA == null) {
          //while Creating-- if null(create)..else(special update)
          modelQA = new modelI(reqData);
          console.log(`\n == New User Profile Created !\n`);
        } else {
          //Updating(Special _Content)
          modelQA = Object.assign(modelQA, reqData);
          console.log(
            `\n == Exising User --> Updating User Profile With Incoming Data !\n`
          );
        }

        //----------Permission Computing (set Default or Given Name)
        let _defaultRole = reqData["group"] ?? "client";
        let _role_permission = "";
        console.log(`\n == Assing Role & Permission !\n`);
        try {
          _role_permission = await threeaModel.findOne({ group: _defaultRole });
          console.log(
            `\n == Role & Permission Acckey = ${
              _role_permission._id ?? null
            } == ${_defaultRole}!\n`
          );
        } catch (e) {
          _defaultRole = e;
        }

        if (_role_permission) {
          modelQA["acckey"] = _role_permission._id;
        } else {
          return { status: 303, data: "Permission Assign Error" };
        }
        if (modelQA["phone"].length == 10) {
          modelQA["phone"] = modelQA["phone"].slice(1, 9);
        }
        console.log("oooooooooooooo\n", modelQA["phone"], "pppppppppp");
        //-------------------------Saving Model_START
        return await modelQA
          .save()
          .then((modelData) => {
            if (modelData && Object.keys(modelData).length) {
              return { status: 200, data: modelData };
            } else {
              return { status: 303, data: modelData };
            }
          })
          .catch((modelError) => {
            return { status: 303, data: modelError };
          });
        //-------------------------Saving Model_END
      })
      .catch((modelQAR) => {
        return { status: 303, data: modelQAR };
      }); //------------
  } catch {
    return { status: 303, data: "Fatal DATABASE ERROR" };
  }
}

let _updateKey = "id";
async function update_content(
  reqData,
  columnOperation = null,
  columnsubOperation = null
) {
  console.log("\n\n Updating Profile \n");
  try {
    let findBy = {};
    if (reqData["id"] ?? false) {
      findBy["_id"] = new ObjectId(reqData[_updateKey]); //updating by id
    } else {
      return { status: 303, data: "body.null data" }; //updating by id
    }
    //-----------------is there to compute
    console.log(
      `\n<==>UpdatingContent Profile Service 0=> Check Existances of Params \n`
    );
    console.log(findBy);
    //-----------------
    return await modelI
      .findOne(findBy) //if findby is null it returns index_0 item
      .then(async (modelQA) => {
        console.log(
          `\n<==> Acckey = ${
            modelQA.acckey ?? " No User"
          } && subOps = ${columnsubOperation} \n`
        );
        if (modelQA == null) {
          //while Updating-- Only Existing Record
          return { status: 303, data: "Record Doesn't Found." };
        } else {
          //if(_computIt){modelQA = await compute_Saleit(modelQA,reqData,_computIt)
          //}else{ modelQA=Object.assign(modelQA, reqData);}
          if (
            columnsubOperation == "updateRole" &&
            (reqData["group"] ?? false)
          ) {
            console.log(
              `\n == Updating Role & Permission New Group = ${
                reqData["group"] ?? false
              }`
            );
            let newacckey = await threeaModel.findOne({
              group: reqData["group"],
            });
            if (newacckey) {
              console.log(
                `\n == Profile Role Updating  acckey = ${
                  newacckey.id ?? null
                } && RoleGroup =${reqData["group"]}`
              );
              modelQA = Object.assign(modelQA, {
                acckey: new ObjectId(newacckey.id),
              });
            } else {
              console.log(
                `\n == Updating Role & Permission ;- Creating New Group = ${
                  reqData["group"] ?? false
                } ; Failed`
              );
            }
          } else {
            modelQA = Object.assign(modelQA, reqData);
          }
        }
        //modelQA['queryWeight']['1']=[1,1,1,1]
        //-------------------------Saving Model_START
        return await modelQA
          .save()
          .then((modelData) => {
            if (modelData && Object.keys(modelData).length) {
              return { status: 200, data: modelData };
            } else {
              return { status: 303, data: modelData };
            }
          })
          .catch((modelError) => {
            return { status: 303, data: modelError };
          });
        //-------------------------Saving Model_END
      })
      .catch((modelQAR) => {
        return { status: 303, data: modelQAR };
      }); //------------
  } catch {
    return { status: 303, data: "Fatal DATABASE ERROR" };
  }
}
