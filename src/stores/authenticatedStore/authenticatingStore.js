import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
//import qs from "qs"; //it format any_formated(obj,array) of params into url queriess....when there is params>
//const querystring = require("node:querystring"); //querystring.parse
import setDHeaders from "src/composables/setHeaders";
import { useLocalStorage, useSessionStorage } from "@vueuse/core";
import {_setBrowserLogin_Data,
  _checkEnrollment,_checkLogedCredentials,_checkLogin,_clearLogin} from "src/hooks/useAuth"

//const $q = useQuasar();              //{[[[[   .get(   url,{params:{},headers:{}})  ]]]]}....received as obj_req.params || response.data/staus/

import { requestHeader, procApiWrap } from "src/services/axiosApi.js";
const _apiUrl = "/api";
var _suburl = _apiUrl + "/login";

import _localStorage from "src/services/storeService"; //_localStorage._clear()

const STORE_NAME = "authenticatingStore";
//--------------------------------------------Helpers
//-------------RequestHeader_Helper
//--------------------------------------------Helpers
//-------------TimeBase Query_Helper
//////////////////////////////////////////--------------Axios Wrapper UUUUUUPPPPPPPPPPPP

var initialState = { _isRegistered: false, user: {}, cookies: "",enrolled: false };
export var authenticatingStore = defineStore(STORE_NAME, () => {
  //state
  //---------
  //---------------------------
  let logStatus = ref(initialState);
  let logUser = ref(null);
  let logisRegistered = ref(null);
  let logisEnrolled = ref(null);

  //======gett Data
  let getLogStatus = computed(() => logStatus.value);
  let getLogUser = computed(() => logUser.value);
  let getLogisREgistered = computed(() => logisRegistered.value);

  //---------------------------
  function set_reqHeader(_header = null) {
    return true;
  }

  //action
  async function _setStoreLogin_Data(_isRegistered = null,user = null ) {
    //set from use_request or find cached data
    if (_isRegistered ?? false) {
      let updatValue = _isRegistered ?? (false);
      logisRegistered.value = useLocalStorage("_isRegistered", updatValue);
    } else {
    }
    //- even any store_pinia variable persiste it's value even on refresh && for more solid
    //persistance use, the browser storage watched,updated from store_storage & variables
    //useLocalStorage ( update,create new value in browsr store)
    // && store_storage watch the key_browser_change && the variable too watch
    if (user && Object.keys(user).length) {
      logUser.value = useLocalStorage("user", user, { mergeDefaults: true });
    } else {
      logUser.value = useLocalStorage("user", logUser.value);
    }
    return true;
  }

  async function clearlogStatus() {
    //----- clear browser Data
    await _clearLogin()
    //----- clear the store_linked browser stores(that react to the variables too !!)
    useLocalStorage("_isRegistered", null)
    useLocalStorage("user", null)
    return true;
  }
  //---------------------AUTHENTICATE-----------------
  let _rolingkey = ["phone", "token",'id']; //key for authenticating.. new Data
  async function useLogin(formData = {}) {
    formData = await _checkLogedCredentials(formData)
    console.log("((1)) Incoming User/Storage Data 2" + formData);

    if ((formData[_rolingkey[0]] ?? formData[_rolingkey[1]]) == null) {
      return { status: false, data: "LogIn Keys :" + formData };
    }
    let enrollInformation =await _checkEnrollment()
    //-------------Cleare Stores
    await _clearLogin();
    try {
      return await procApiWrap
        .post(_suburl, formData)
        .then(async (resp) => {
          let models = resp.data["acctype"] ?? false;
          console.log("((2)) Response User/Storage Data " + resp.data);
          if (resp.status && models) {
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
            //---------
            console.log(enrollInformation,'stored Infor Enroll')
            if(enrollInformation){
              resp.data.enrolled = true
            }
            await _setStoreLogin_Data(true, resp.data, "true");
            await _setBrowserLogin_Data(resp.data,enrollInformation)
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



  return {
    getLogStatus,
    getLogisREgistered,
    getLogUser,
    //-----------
    set_reqHeader,
    _setStoreLogin_Data,
    //--------------
    clearlogStatus,
    //asyncDatas,
    useLogin,
  };
  //getter
});
