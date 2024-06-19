

import {
  profileModel
} from "app/src-ssr/backendCore/models/profileModels";
import { mongoose } from "mongoose";
//var Schema = mongoose.Schema,
ObjectId = mongoose.Types.ObjectId;
const jwt = require('jsonwebtoken');

// Authentication middleware
async function authenticate(req, res, next) { // ... authentication logic ...
    //-----------Extract the Token and Header Values
    var _thisCookies= (req.cookies ?? req.headers.cookie) ?? false 
    //req.headers.cookie (if cookies in Header-- they comes as string_not Objec) !! (require split & indexing first)
    var _header = req.headers ?? false
     //------------------Extract _token Values(inside Headers)
    let _cookie = _thisCookies?.['access_token'] ?? false
    //------seterialize the Header_Contern
    if(typeof _header == 'string'){
        let _iisTemp = _header//.split('|')[1]
        try{
          _header= JSON.parse(_iisTemp)
        }catch{}
     }

     let _bearToken = _header['authorization'] ?? false
     if(_bearToken && !_cookie) {
        let bearer =''
        if(_bearToken.split('"').length == 1){
          bearer = _bearToken.split('"');//Trying to Split Bearer by ("")
        }else{
          bearer = _bearToken.split(";")//Trying to Split Bearer by (;)
        }
        _cookie = bearer[1]?.trim() ?? _cookie;
     }else{}

    //----------Check if Token Existing
    if(!(_cookie)){
      return res.status(401).send('Access forbidden ? _cookies failed');
    }
    //----------------------------------------------------------Cookkies Passed
    //-------optional userData
     let _userID = _header['id'] ?? null
     var _issID= _header?.acckey ?? null  //_iss
     var _issrole= _header?._iss ?? null  //_iss
     var _issmodal= _header?._issmodal ?? null  //_issModal 
     var _userQuery= _header?.acckey ?? null  //_iss

     //----------process.env.TOKEN_SECRET
     try{
       const decoded = jwt.verify(_cookie, process.env.TOKEN_SECRET);
        //---------Embeding Generated_Data && Forwarding
        if(!_userID || decoded){
          _userID = decoded.userId ?? _userID;
          _issID=decoded['acckey'] ?? _issID
        }else{}
      console.log(_userID,'bearToken-------------->')
     }catch{          }

    //--------------Check User for REgisteration using user_id ? or return error
    if(_userID){
      await profileModel.findOne({'_id':new ObjectId(_userID)}).then((_user) =>{
            if(_user){
              _issID=_user['acckey'] ?? false
              _userQuery=_user['queryWeight'] ?? false
            }else{return res.status(403).send('Access forbidden');}
        }).catch(()=>{return res.status(403).send('Access forbidden');})
    }else{return res.status(401).send('Access forbidden ? userID failed');}
    //-----------------use Acckey for Permissions table




    //-------------------------------
    req.userId=_userID
    req.issId=_issID
    req.issrole=_issrole
    
    req.queryWeight=_userQuery
    //----- Other Neccessary Informations
    req.location={'lat':_header.lat ?? '','long':_header.long ?? ''}

    //-------------------
    next()
    return true
  }
  
 export default authenticate;
