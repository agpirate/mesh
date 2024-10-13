import {
  profileModel,
  threeaModel,
} from "app/src-ssr/backendCore/models/profileModels";
import { mongoose } from "mongoose";
//var Schema = mongoose.Schema,
ObjectId = mongoose.Types.ObjectId;
const jwt = require("jsonwebtoken");

// Authentication middleware
async function authenticate(req, res, next) {
  // ... authentication logic ...
  //--SEARCHING tokens
  console.log(`\n\n Authentication Middlewares =========> Entering \n`);
  //----1) Tokens (cookies---- 2 options)
  const _thisCookies = req.cookies ?? false;
  let _cookie = _thisCookies ? _thisCookies?.["access_token"] ?? false : false; //Extract sessionID/Token from cookies
  console.log(`Cookies Finding ; Option 1 : Cookies = ${_cookie} \n`);
  //----2) Headers (Token Strings---)
  var _header = req.headers ?? false;
  //------------------Extract _token Values(inside Headers)
  // let _cookie = _thisCookies?.['access_token'] ?? false
  //------seterialize the Header_Contern
  if (typeof _header == "string") {
    let _iisTemp = _header; //.split('|')[1]
    try {
      _header = JSON.parse(_iisTemp);
    } catch {}
  } else {
  }
  let _authHeader = _header["authorization"] ?? false; //Extract sessionID/Token from Header
  let _cookieHeader = _header["cookie"] ?? false; //Extract sessionID/Token from Header
  //----------------Header way of Cookies Finding Require Further spliting and slicing
  if (!_cookie) {
    //if cookies exist (ignore bearToken), if _cookies=false, continues using bearToken_way & modify _cookie Value

    let bearer = "";
    if (_authHeader) {
      //check token inside the autorization Header
      _authHeader = _authHeader.split(" ") ?? null; // _authHeader=_authHeader.replace('Bearer', '') ?? null;
      bearer = _authHeader.length < 2 ? null : _authHeader[1];
      console.log(
        `Cookies Finding ; Option 2 : autorization Header-Cookies = ${bearer} \n`
      );
    } else {
      //check token inside the cookie Header
      bearer = _cookieHeader ? _cookieHeader.replace("access_token= ", "") : "";
      console.log(
        `Cookies Finding ; Option 2 : cookie Header-Cookies = ${_cookieHeader} \n`
      );
    }
    _cookie = bearer?.trim() ?? _cookie;
  } else {
  }

  //----------Check if Token Existing
  if (!_cookie) {
    console.log(`Cookies Finding Error ; No Cookie Founded : Exit!\n`);
    return res.status(401).send("Access forbidden ? _cookies failed");
  }
  console.log(`Cookies Finding Final Passed ;  = ${_cookie} \n`);
  //----------------------------------------------------------Cookkies Passed
  //-------optional userData
  let _userID = null; //_header['id'] ?? null
  var _issID = _header?.acckey ?? null; //_iss
  var _issrole = _header?._iss ?? null; //_iss
  var _issmodal = _header?._issmodal ?? null; //_issModal
  var _userQuery = _header?.acckey ?? null; //_iss

  //----------process.env.TOKEN_SECRET
  try {
    const decoded = jwt.verify(_cookie, process.env.TOKEN_SECRET);
    console.log(`Token Decoded For = \n`);
    console.log(decoded);
    //---------Embeding Generated_Data && Forwarding
    if (decoded) {
      _userID = decoded.userID ?? _userID;
      _issID = decoded["acckey"] ?? _issID;
    } else {
    }
  } catch {
    console.log(`Token Decoded Error = \n`);
  }

  //--------------Check User for REgisteration using user_id ? or return error
  if (_userID) {
    await profileModel
      .findOne({ _id: new ObjectId(_userID) })
      .then((_user) => {
        if (_user) {
          _issID = _user["acckey"] ?? false;
          _userQuery = _user["queryWeight"] ?? false;
        } else {
          return res.status(403).send("userID ; Access forbidden");
        }
      })
      .catch(() => {
        return res.status(403).send("userID ; Access forbidden");
      });
  } else {
    return res.status(401).send("Access forbidden ? userID failed");
  }
  //-----------------use Acckey for Permissions table

  try {
    //--------------------------------------------------------------------Authentication Ends//
    _issrole = null;
    _issmodal = _issmodal ?? "saleit";
    console.log(
      `== Role & Permission Acckey ${
        _issID ? "is OK" : "No"
      } && Target Modal is = ${_issmodal ?? "No Model_Specified"}  \n`
    );
    if (_issID && _issmodal) {
      await threeaModel
        .findOne({ _id: new ObjectId(_issID) })
        .then((_role_permission) => {
          if (_role_permission) {
            //if Permissions Founded
            _issrole = _role_permission[_issmodal] ?? null;
          } else {
          } //ifNot
          //next();
          return true;
        })
        .catch(() => {
          return true; //res.status(403).send('Access forbidden');
        });
    } else {
    }
    console.log(
      `== Role & Permission  = Null for Modal = ${
        _issmodal ?? "No Model ?"
      } && ${_issrole} \n`
    );
  } catch (e) {
    console.log(e);
    return true;
  }
  if (!_issrole) {
    return res.status(403).send("UserRole ; Access forbidden");
  }
  //-----------------IF...Not _iss_ID
  //-------------------------------
  req.userID = _userID;
  req.issId = _issID;
  req.issrole = _issrole;
  // req.role =_issrole
  req.queryWeight = _userQuery;
  //----- Other Neccessary Informations
  req.params["lat"] = _header.lat ?? "";
  req.params["long"] = _header.long ?? "";
  req.location = { lat: _header.lat ?? "", long: _header.long ?? "" };

  console.log(`Ending MWare UserID = ${_userID} && Acckey = ${_issID} \n`);
console.log('\n Lat : ',_header.lat ?? false)
  next();
  return true;
}

export default authenticate;
