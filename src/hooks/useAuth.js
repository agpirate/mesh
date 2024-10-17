import { useLocalStorage, useSessionStorage } from "@vueuse/core";
import _localStorage from "src/services/storeService"; //_localStorage._clear()

//----------------
async function _setBrowserLogin_Data(user,enrollInformation){
  try {
    //--
    _localStorage._set("userID", user["id"] ?? "");
    _localStorage._set("token", user["token"] ?? "");
    _localStorage._set("acctype", user.acctype ?? "");
    //------EnrollMent Storage Updating
    if(user.enrolled ?? false){
    _localStorage._set("enrolled", String(user.enrolled ?? false) );
    }else {
      _localStorage._clear("enrolled")
    }
    // useSessionStorage('_iss',user.acctype ?? '') //------------
    useSessionStorage("token", user["token"] ?? ""); //-------------
    useSessionStorage("qw", user["queryWeight"]["1"]); //-------------
    useSessionStorage("userID", user["id"] ?? ""); //-------------
  } catch (e) {
  }

}
//-----------
async function _clearLogin(){_localStorage._clear()}
//-----------------------
 function _checkLogin(){
  return Boolean(_localStorage._get("_isRegistered") ?? false );
}
async function _checkEnrollment(){
  return useLocalStorage('enrolled').value ?? false
}
 async function _checkLogedCredentials(formData) {
  //---this would hold inherited reactivity(assigning variable with reactive =reactive)
  if ( _checkLogin) {
    let _checkid = _localStorage._get("userID") ?? null;
    let _checktoken = _localStorage._get("token") ?? null;
    if(_checkid){
      formData['id']=_checkid
      formData['token']=_checktoken
    }
    return formData;
  }
  return formData;
  //---------use Storage id && phone to check for realUserData
}

    // Get user info from token (assuming it's a JWT or similar)
  function  getUserFromToken (token)  {
      // Decode the token to get user data (use a JWT library if needed)
      const userData = JSON.parse(atob(token.split('.')[1]));  // Basic JWT decode
      return userData;
  }

  // Simulate logout
  function logout() {
      // Optionally make a logout API request
  }
export {_setBrowserLogin_Data, _checkLogedCredentials,_checkEnrollment,_checkLogin,_clearLogin}
