import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
//import qs from "qs"; //it format any_formated(obj,array) of params into url queriess....when there is params>
//const querystring = require("node:querystring"); //querystring.parse
import setDHeaders from "src/composables/setHeaders";
import { useLocalStorage, useSessionStorage } from "@vueuse/core";
//const $q = useQuasar();              //{[[[[   .get(   url,{params:{},headers:{}})  ]]]]}....received as obj_req.params || response.data/staus/

import { requestHeader, procApiWrap } from "src/services/axiosApi.js";
const _apiUrl = "/api";
var _suburl = _apiUrl + "/login";
var API_URL = process.env.Client_IP_PORT + _suburl; //const API_URL = `${import.meta.env.API_URL}/users`;

import _localStorage from "src/services/storeService"; //_localStorage._clear()

const STORE_NAME = "authenticatingStore";
const SETTINGS_LOCAL_STORAGE_KEY = "settings";
//--------------------------------------------Helpers
//-------------RequestHeader_Helper
//--------------------------------------------Helpers
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
      } catch (e) {
        console.log("Loging e", e, user.acckey);
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
    console.log(formData);
    try {
      return await procApiWrap
        .post(_suburl, formData)
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
