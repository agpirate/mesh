

import {
  profileModel,threeaModel
} from "../../backendCore/models/profileModels.js";

import { mongoose } from "mongoose";
var ObjectId = mongoose.Types.ObjectId;

import jwt  from "jsonwebtoken";
import { Router } from "express"

const router = Router()

let _setResponseHeader = {
  "Content-Type": "application/json", //  modelData.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  "Content-Length": "5000",
  ETag: "Roaw",
};


// Protected route
let _checkQuery='phone'
let createKey=['phone','id']
router.post("/login", async (req, res) => {
  //---------------------Grap User Data of Request_Header + Body
  let reqData= req.body ?? {}
  console.log(`\n\n  User Authentication LogKeys FAiled ?  ${(reqData[createKey[0]] ?? reqData[createKey[1]]) == null  }\n`)
  // console.log(reqData)
  //createKey_parameters at leastOne Existance ?
  if (((reqData[createKey[0]] ?? reqData[createKey[1]]) == null  )) {return res.status(404).send('createKey','is Null'); }

  let findBy={}
  //createKey_parameters casting and build findQuery
  if(reqData[createKey[0]] ?? false){ findBy[createKey[0]] = reqData[createKey[0]]}
  else{findBy['_id'] = new ObjectId(reqData[createKey[1]])}

  //-------------Find User On Database
  try {
    return await profileModel.findOne(findBy).then(async (modelData) => {
        console.log(`\n\n User Authentication Profile == ${modelData ?? null  },, for userID = \n`)
        console.log(findBy)
        // changing mondodb object(.toObject() ; .lean()) will not redefine the << _id key to id >> automatic    
        if (modelData && Object.keys(modelData).length) {
          console.log(`\n User Acckey  == ${(modelData.acckey ?? false)}  <= ${(modelData.acckey ?? false) ? 'Yes' : 'No'} < == >User Already Existed ?\n`)
           //------user Already Registered..Then Check for Roles use acckey
           let queryID = new ObjectId(modelData.acckey)
           //--------------Search For Role and Permissions----Start
           return await threeaModel.findOne({'_id':queryID}).then((_rolePermisions)=>{
           console.log(`\n Checked :_ User Acckey / ID == ${(_rolePermisions?.id ?? false)}  <= < == >User Already Existed ?\n`)

            if(_rolePermisions){
              modelData = modelData.toObject() ?? false//lean()
              //generate Token
              var token = null
              try{token = jwt.sign({ id: modelData['_id'],userID: modelData['_id'],'acckey':_rolePermisions['id'] }, process.env.TOKEN_SECRET, { expiresIn: '1d' });}
              catch{}
              if(!token) {return res.status(501).json({'data':'Token Generating Error'}) }
              // Function to generate refresh token
              // const generateRefreshToken = jwt.sign({ id: modelData['_id'],userId: modelData['_id'], }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
              //---set Token as Response
              const maxAge_ = 24*60*60*1000; // this need to match Token "expiresIn"
              res.setHeader('authorization', `Bearer ${token}`)//To send the token in the Authorization header, the client needs to include it in subsequent requests:
              res.cookie('access_token', token, { maxAge:86400000, httpOnly: true,
                domain: req.hostname,     // Dynamically set the domain to the current hostname/IP
                // path: '/', 
                secure:false,signed:false,sameSite: 'lax' }); //this Would Inject token into [cookie_storage && cookie_Header]
              //---------Including Other Response Data
              
              //--------Injecting Permission and UserDatas
              res.setHeader('acctype',JSON.stringify(_rolePermisions)) //Injecting new_attribute into mongodb(findOne or Obj)_ data is not good..best...In Header
              res.setHeader('token',token) //Injecting new_attribute into mongodb(findOne or Obj)_ data is not good..best...In Header
              res.setHeader('role',_rolePermisions.profile.group ?? null) //Injecting new_attribute into mongodb(findOne or Obj)_ data is not good..best...In Header
              ///console.log('User is Authenticated && Has Permissions of ===>',_rolePermisions)
              modelData['acctype']=_rolePermisions 
              modelData['id']=modelData['_id']  // changing mondodb object(.toObject() ; .lean()) will not redefine the << _id key to id >> automatic               
              console.log(req.hostname,`\n Final Checked :  == ${(modelData.id ?? false)}  <= < == >User Authenticated ? with token \n ${token}`)
              
              res.set(_setResponseHeader);
              return res.status(200).send(modelData); 
            }
            return  res.status(501).json(_rolePermisions)
           }).catch((e)=>{console.log(`\n ${e}`); return res.status(501).send(e)})
           //--------------------Permission Operation---Ends
        } else { return res.status(202).send(modelData ); }
      }).catch((e) => {return res.status(404).send(e); }); // return modelError
  } catch (e) {  return  res.status(505).send(e);  }
});
  //----------------------------------Query Builder

  // API
  export default router;

  