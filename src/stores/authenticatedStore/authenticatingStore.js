import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
//import qs from "qs"; //it format any_formated(obj,array) of params into url queriess....when there is params>
//const querystring = require("node:querystring"); //querystring.parse
import setDHeaders from "src/composables/setHeaders";

import axios from "axios";
import { useLocalStorage, useSessionStorage } from "@vueuse/core";
import { toRaw } from "vue";
//const $q = useQuasar();              //{[[[[   .get(   url,{params:{},headers:{}})  ]]]]}....received as obj_req.params || response.data/staus/

import _localStorage from "src/services/storeService"; //_localStorage._clear()

const API_URL = process.env.API_IP_PORT + "/api"; //const API_URL = `${import.meta.env.API_URL}/authenticatings`;
const modalApi = axios.create({ baseURL: API_URL, timeout: 7000 });

const STORE_NAME = "authenticatingStore";
const SETTINGS_LOCAL_STORAGE_KEY = "settings";

const procApiWrap = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  patch: request("PATCH"),
  delete: request("DELETE"),
};

function request(method) {
  return async (url, body = null, paramObj = {}) => {
    var requestOptions = {
      method: method,
      headers: await requestHeader(STORE_NAME),
      params: paramObj,
    };
    requestOptions.headers["Content-Type"] = "application/json";
    requestOptions.params["timestamp"] = new Date();

    if (body != null) {
      //---------------------------////API_GATEWAY {{{[[[[[[[[[[[---------]]]]]]]]]]]]]]]}}} e POST/PUT
      try {
        const response =
          method === "POST"
            ? await modalApi.post(url, body, requestOptions)
            : await modalApi.put(url, body, requestOptions); // axioscreate is best work if, the method(post/put) is givennn pricissly
        return await responseHandler(response)
          .then(
            (HandledRESP) => {
              return { status: true, data: HandledRESP };
            }, // Handling Friendly Errors of the response
            (error) => {
              console.log(error);
              return { status: false, data: error };
            }
          )
          .catch((error) => {
            console.log(error);
            return { status: false, data: error };
          });
      } catch (error) {
        console.log("API Response Error", error);
        return { status: false, data: error };
      }
    } else {
      try {
        const response =
          method === "GET"
            ? await modalApi.get(url, requestOptions)
            : await modalApi.delete(url, requestOptions);
        return await responseHandler(response)
          .then(
            (HandledRESP) => {
              return { status: true, data: HandledRESP };
            }, // Handling Friendly Errors of the response
            (error) => {
              console.log(error);
              return { status: false, data: error };
            }
          ) // the friendly errors
          .catch((error) => {
            console.log(error);
            return { status: false, data: error };
          });
      } catch (error) {
        console.log("API Response Error", error);
        return { status: false, data: error };
      }
    }
  };
}

let _okStatus = [200]; //201,202] //
let _serviceStatus = [400, 401, 402, 403, 404, 405]; //
let _serverokStatus = [500, 501, 502, 503, 504, 505]; //

async function responseHandler(response) {
  ////((((((((RESPONSE HANDLER  [.data / .statusText]))))))))
  console.log(
    response,
    "Response Data",
    _okStatus.includes(response.status ?? false),
    response.data ?? false
  );
  try {
    if (_okStatus.includes(response.status ?? false)) {
      let responseData = response.data;
      try {
        responseData = JSON.parse(responseData) ?? responseData;
      } catch {}
      const contentType = response.headers.get("Content-Type");
      const isJson = contentType.includes("application/json"); //if application/json(extract json file from res.data)
      console.log(
        "Response Data check 2 ;",
        isJson,
        responseData["acctype"] ?? false
      );
      if (isJson && (responseData["acctype"] ?? false)) {
        //------------------
        responseData["token"] = response.headers["token"] ?? "";
        //------
        let _setHeader = {};
        _setHeader["Authorization"] = `Bearer;` + responseData["token"] ?? "";
        _setHeader["acckey"] = responseData["acckey"] ?? "";
        // _setHeader['_iss']=responseData['acctype'] ?? ''
        _setHeader["acctype"] = responseData["acctype"] ?? "";
        _setHeader["id"] = responseData["id"] ?? "";
        _setHeader["phone"] = responseData["phone"] ?? "";
        _setHeader["keyID"] = responseData["keyID"] ?? "";
        //----------------------------------
        setDHeaders(_setHeader);
        //---------
        return responseData;
      }
    }
    return Promise.reject(response);
  } catch (e) {
    return Promise.reject(e);
  }
}

////((((((((AGGRESIVE ERROR HANDLER))))))))
async function ErrorHandler(error) {
  let Error = [];
  const errData = error.response;
  if (errData) {
    Error = [errData.data, errData.status, errData.headers];
  } else if (error.request) {
  } else {
    Error = [error.message];
  }

  return Error;
}

//--------------------------------------------Helpers
//-------------RequestHeader_Helper
//--------------------------------------------Helpers
async function requestHeader(modelName = "") {
  //Inject Header
  var _reqHeaders = {}; //_reqHeader.value ?? {}
  _reqHeaders["Test"] = "WooW";
  //_reqHeader['Accept']= ''//text/plain, Content types that are acceptable for the response {let it default}
  //_reqHeader['Content-Type']='' //gzip, deflate
  //_reqHeaders['Accept-Encoding']=''
  //------------------------ console.log(useLocalStorage('id'),'StorageID .....')
  _reqHeaders["_issModal"] = modelName;

  let _geolat = toRaw(useLocalStorage("geo.llat").value ?? false);
  let _geolong = toRaw(useLocalStorage("geo.llong").value ?? false);
  if (_geolat) {
    _reqHeaders["geo.lat"] = _geolat;
    _reqHeaders["geo.long"] = _geolong;
  }

  return _reqHeaders ?? {};
}

//-------------TimeBase Query_Helper
//////////////////////////////////////////--------------Axios Wrapper UUUUUUPPPPPPPPPPPP

var initialState = { _isRegistered: false, user: {}, cookies: "" };
export var authenticatingStore = defineStore(STORE_NAME, () => {
  //state
  //---------
  //---------------------------
  let logStatus = ref(initialState);
  let logUser = ref(null);
  let logisRegistered = ref(null);

  //======gett Data
  let getLogStatus = computed(() => logStatus.value);
  let getLogUser = computed(() => logUser.value);
  let getLogisREgistered = computed(() => logisRegistered.value);

  //---------------------------

  function set_reqHeader(_header = null) {
    //set from use_request or find cached data
    //logHeaders.value = _header ?? {}
    let _reqHeaders = {};
    //_reqHeader['Accept']= ''//text/plain, Content types that are acceptable for the response {let it default}
    //_reqHeader['Content-Type']='' //gzip, deflate
    //_reqHeaders['Accept-Encoding']=''
    //------------------------ console.log(useLocalStorage('id'),'StorageID .....')
    //console.log(Object.keys(useLocalStorage('id')),'idddddddddd log',useLocalStorage('id').value)

    return true;
  }

  //action
  async function setlogStatus(
    _isRegistered = null,
    user = null,
    cookies = null
  ) {
    //set from use_request or find cached data

    if (_isRegistered ?? false) {
      let _newisR = _isRegistered ?? logisRegistered.value ?? false;
      //logisRegistered.value=_newisR
      logisRegistered.value = useLocalStorage("_isRegistered", _newisR);
    } else {
    }
    console.log("loging UserData", user);
    //storage for fast usage
    if (user && Object.keys(user).length) {
      let _user = user; // useLocalStorage('user',user)
      //logStatus.value.user =user
      logUser.value = useLocalStorage("user", user, { mergeDefaults: true });

      try {
        //--
        useLocalStorage("userID", user["id"] ?? "");
        //localStorage.setItem('phone',(user.phone ?? null))
        // useLocalStorage('phone',user['phone']  ?? '')
        //localStorage.setItem('acctype',(user.acctype ?? null))
        useLocalStorage("acctype", user.acctype ?? "", { mergeDefaults: true });
        //-----------
        // useLocalStorage('geo.llat',user['geolocation'],{ mergeDefaults: true })
        // useLocalStorage('geo.llong',user['geolocation']?.['long'] ?? '',{ mergeDefaults: true });

        //------
        // useSessionStorage('_iss',user.acctype ?? '') //------------
        useSessionStorage("token", user["token"] ?? ""); //-------------
        useSessionStorage("qw", user["queryWeight"]["1"]); //-------------
        useSessionStorage("userID", user["id"] ?? ""); //-------------
      } catch (error) {
        console.log("Loging Error", error, user.acckey);
      }
    } else {
      //-------store logStatus.value
      logUser.value = useLocalStorage("user", logUser.value);
    }
    return true;
  }

  async function clearlogStatus() {
    _localStorage._clear();
    // //changing storage value--> update store_values
    useLocalStorage("_isRegistered", null);
    useLocalStorage("user", null);
    //storage for fast usage
    useLocalStorage("userID", null);
    _localStorage._clear("userID");

    useLocalStorage("phone", null);
    _localStorage._clear("phone");
    // useLocalStorage('keyID',null)
    useLocalStorage("_acctype", null);
    //----------
    return true;
  }
  ////////console.log('setLoges..........',logStatus.value)

  //  setlogStatus(false,null,'austore')//reinitialize the storage values on refresh

  //---------------------AUTHENTICATE-----------------
  let _rolingkey = ["phone", "id"]; //key for authenticating.. new Data
  async function useLogin(formData = {}) {
    formData = Object.assign(formData, (await _checkExistLogin()) ?? formData);
    console.log("((1)) Incoming User/Storage Data " + formData);
    if ((formData[_rolingkey[0]] ?? formData[_rolingkey[1]]) == null) {
      return { status: false, data: "LogIn Keys :" + formData };
    }
    //-------------Cleare Stores
    await clearlogStatus();
    // _localStorage._clear();
    console.error("Clearing Storage");
    try {
      return await procApiWrap
        .post("/login", formData)
        .then(async (resp) => {
          let models = resp.data["acctype"] ?? false;
          console.log("((2)) Response User/Storage Data " + resp.data);
          if (resp.status && models) {
            //Good Day....Data IS comings with .data .headers .Ok(200)_staus
            //-----
            resp.data["acctype"] = {};
            resp.data["group"] = models["group"] ?? "";
            resp.data["acctype"]["group"] = models["group"] ?? "";
            for (let key in models) {
              if (
                (models[key]["capability"] ?? false) &&
                models[key]["capability"] != "00000"
              ) {
                resp.data["acctype"][key] = Object.assign(
                  { group: models["group"] },
                  models[key]
                );
              }
            }
            await setlogStatus(true, resp.data, "true");
          } else {
            // await clearlogStatus();
          }
          return resp; //{ _isRegistered: false,user:null };
        })
        .catch((e) => {
          // clearlogStatus();
          return { status: false, data: e };
        }); //Handler NonFriendly Errors
    } catch (e) {
      // clearlogStatus();
      return { status: false, data: e };
    }
  }

  async function _checkExistLogin() {
    //---this would hold inherited reactivity(assigning variable with reactive =reactive)
    var _storageAuthenticated = Boolean(
      useLocalStorage("_isRegistered").value ?? false
    );
    let _checkid = useLocalStorage("userID").value ?? null;
    if (_storageAuthenticated && _checkid) {
      //_isRegistered
      return { id: _checkid };
    }
    return null;
    //---------use Storage id && phone to check for realUserData
  }

  return {
    getLogStatus,
    getLogisREgistered,
    getLogUser,
    //-----------
    set_reqHeader,
    setlogStatus,
    //--------------
    clearlogStatus,
    //asyncDatas,
    useLogin,
  };
  //getter
});
