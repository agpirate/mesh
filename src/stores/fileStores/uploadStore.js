import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
//import qs from "qs"; //it format any_formated(obj,array) of params into url queriess....when there is params>
//const querystring = require("node:querystring"); //querystring.parse

import axios from "axios";

//const $q = useQuasar();              //{[[[[   .get(   url,{params:{},headers:{}})  ]]]]}....received as obj_req.params || response.data/staus/

const API_URL = "http://192.168.1.13:9100/api"; //const API_URL = `${import.meta.env.API_URL}/users`;
const authApi = axios.create({ baseURL: API_URL, timeout: 7000 });

function request(method) {
  return async (url, body = null, paramObj = {}) => {
    paramObj["timestamp"] = new Date().getTime();//it would generate brand new request
    const requestOptions = { method:method, headers: await authHeader(url),enctype: "multipart/form-data" }; 
    requestOptions.headers["Content-Type"] = "application/json";

    if (body) {
      // any Object_values/ or extract key:value to reorganiz..
      requestOptions.params = paramObj; // 
      try {
        ////API_GATEWAY {{{[[[[[[[[[[[---------]]]]]]]]]]]]]]]}}}  POST/PUT
        const response =
          method === "POST"
            ? await authApi.post(url, body, requestOptions)
            : await authApi.put(url, body, requestOptions); // axioscreate is best work if, the method(post/put) is givennn pricissly
        return await respHandler(response).then(
          //////////API_SUCESS RESPONSE Handled on function
          (HandledRESP) => {
            return [true, HandledRESP];
          }, // Handling Friendly Errors of the response
          (error) => {     return [false, ErrHandle(error)]; //Friendly Error
          }
        ); // the friendly errors
      } catch (error) {   return [false, ErrHandle(error)];
      } finally {
        // Handling Aggressive Errors
      }
    } else {
      // when params_is object_values/nested_value paramSerialize would require to customize when creating the url_queries_form during request... & require to specified clear..
      requestOptions.params = paramObj; //{"id":paramObj["id"],"data":paramObj};  //  build axios_request of => (/get?id:12,headersOpt) or (url,{params:{k:v,},headersOpt)....& pa
      
      try {
        ////API_GATEWAY {{{[[[[[[[[[[[---------]]]]]]]]]]]]]]]}}}  GET/DELETE
       
        const response =
          method === "GET"
            ? await authApi.get(url, requestOptions)
            : await authApi.delete(url, requestOptions);
        return await respHandler(response).then(
          //////////API_SUCCESS RESPONSE Handled on function
          (HandledRESP) => {
            ////console.log("Handler RESPONSE", HandledRESP); //OK RESPONSE Handle
            console.log(
              method,
              "userStore@request :- RESPONSE(Ok)",
              HandledRESP['data'] + " -:PARAMeTERS:- " + paramObj
            );
            return [true, HandledRESP];
          }, // Handling Friendly Errors of the response
          (error) => {
            console.log(
              method,
              "store@request:- Friendly(404,505)",
              error + "Object:-" + paramObj
            );
            ////Friendly Error RESPONSE Handle
            return [false, ErrHandle(error)]; //Friendly Error
          }
        ); // the friendly errors
      } catch (error) {
        console.log(
          method,
          "userStore#request ;- Bad_Server_Response(Logic_Error)",
          ErrHandle(error)
        ); //////////// ////((((((((API_ERROR RESPONSE HANDLER))))))))

        return [false, ErrHandle(error)];
      } finally {
        // Handling Aggressive Errors
      }
    }
  };
}

const procApiWrap = {
  ////{[[[[ .post(  url,body,{params:{},headers:{}})  ]]]]}..received as obj_req.body/data || response.data/staus/
  // export it to use as module... or axios wrap instancesss...
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  patch: request("PATCH"),
  delete: request("DELETE"),
};

async function respHandler(response) {
  ////((((((((RESPONSE HANDLER  [.data / .statusText]))))))))
  try {
    const isJson = response.headers
      ?.get("content-type")
      ?.includes("application/json"); //res.headers['content-type']; :- if application/json(extract json file from res.data)
    let data = isJson ? response.data : null;
    ////console.log("responsHandlerrppp");
    if (response.statusText === "OK" && data) {
      //res.status(200) check....& return all the response(header,data,config)
      return response; // return all data++Headers
    } else {
      if ([401, 403, 404, 505].includes(response.status)) {
        //else return violence
        return Promise.reject(error); // or redirect it to ;- //logout();
      }
      const error = (data && data.msg) || response.status;
      return Promise.reject(error); // Promis.reject(reason)...break waiting status with friendly errors handling ( reasonable error given..)
    }
  } catch {
    return Promise.reject("error");
  }
}
////((((((((AGGRESIVE ERROR HANDLER))))))))
async function ErrHandle(error) {
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
// helper functions
async function authHeader(url) {
  //Inject Header
  const isauthenticated = true; //!!user?.token;
  if (isauthenticated) {
    return {
      Authorization: `Bearer`, // ${user.token}`,
      machine: "client-system",
      location: "mekelle",
      //Date: "12/12/12", //localStorage.getItem('dept'),
    };
  } else {
    return {};
  }
}

////////////////////////
const months = Array.from({ length: 12 }, (e, i) => {
  return new Date(null, i , null).toLocaleDateString("en", {
    month: "short",
  }); //short || long
});

const _thisDate = new Date();

const _thisYear = _thisDate.getFullYear(); //current_year_number
var _startofthisYear = new Date(_thisYear, 0, 1); //01,01 (Year(startMonth=01(_in_js:0),startDate=01(_in_js:1)))
var _endofthisYear = new Date(_thisYear, 11, 31); //12,31 (Year(endMonth=12(_in_js:11),endDate=31(_in_js:31)))

var _previouseYear = _thisYear - 1; //previouse_yearnumber

const _thisMonth = _thisDate.getMonth(); //current_month_number
const _startofthisMonth = new Date(_thisYear, _thisMonth, 1);
const _endofthisMonth = new Date(_thisYear, _thisMonth + 1, 0);

const monthDataFilter = ref({
  //{  date: { $gte: "2022-01-01", $lte: "2022-12-30" },}
  updatedAt: {
    $gte: _startofthisMonth,
    $lt: _endofthisMonth,
  },
});
const yearDataFilter = ref({
  //{  date: { $gte: "2022-01-01", $lte: "2022-12-30" },}
  updatedAt: {
    $gte: _startofthisYear,
    $lt: _endofthisYear,
  },
});
//////////////////////////////////////////--------------Axios Wrapper UUUUUUPPPPPPPPPPPP


const STORE_NAME = "fileStore";
const SETTINGS_LOCAL_STORAGE_KEY = "settings";

const user = process.browser ? localStorage.getItem("user") : "";
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const fileStore = defineStore(STORE_NAME, () => {
  //state


  //state
  let Datas = ref([{}]); //
  let DatasParam=ref({})

  //======gett Data

  const getLogStatus = computed(() => logStatus);
  const get_priviledgedFor = computed(() => {
    return _priviledgedFor;
  });
  //---------------------------
  const alertI = reactive({ status: false, sms: "" });
  const alertII = reactive({ status: false, sms: "" });

  //getter/ computed
  const getDatas = computed(() => Datas.value);

  //--------------------------------REGISTER-------------------------
  async function useReg(formData = null, objParam) {
    loadingStatus.value = true;
    //console.log(formData,"rrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    try {
      return await procApiWrap
        .post("/user", formData, objParam)
        .then((resp) => {
          ///loadingStatus.value = false;
          if (resp[0]) {
            //Good Day....Data IS comings with .data .headers .Ok(200)_staus
            try {
              let data = resp[1]["data"];
              asyncDatas(5000)
              return resp[1];
            } catch {}
          } else {
          } //Handler Friendly Errors (with Response of Respective_401,501,404)
          return false;
        })
        .catch((error) => {
          return false;
        }); //Handler NonFriendly Errors
    } catch (error) {} //Handler Supper Non_Friendly Errors
    loadingStatus.value = false;

    return false;
  }
  //updateData
  async function useUpd(formData = null, objParam = null) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //[Id_used to check if updating ided_item is already existed...and ready for update...take as _id:_id (normal)

    try {
      return await procApiWrap
        .put("/user", formData, objParam)
        .then((resp) => {
          ///loadingStatus.value = false;
          if (resp[0]) {
            //Good Day....Data IS comings with .data .headers .Ok(200)_staus

            try {
              let data = resp[1]["data"];
              asyncDatas(5000)
              return resp[1];
            } catch {}
          } else {
          } //Handler Friendly Errors (with Response of Respective_401,501,404)
          return false;
        })
        .catch((error) => {
          return false;
        }); //Handler NonFriendly Errors
    } catch (error) {} //Handler Supper Non_Friendly Errors
    loadingStatus.value = false;
    return false;
  }

  //readFilterData
  async function useFread(objParam = null) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    loadingStatus.value = true;
    //objParam[readFKey] = objParam[readFKey];
    try {
      return await procApiWrap
        .get("/user", null, objParam)
        .then((resp) => {
          ///loadingStatus.value = false;
          if (resp[0]) {
            //Good Day....Data IS comings with .data .headers .Ok(200)_staus

            try {
              let data = resp[1]["data"];
              return resp[1];
            } catch {}
          } else {
          } //Handler Friendly Errors (with Response of Respective_401,501,404)
          return false;
        })
        .catch((error) => {
          return false;
        }); //Handler NonFriendly Errors
    } catch (error) {} //Handler Supper Non_Friendly Errors
    loadingStatus.value = false;
    return false;
  }

  return {
    getDatas,
    getLogStatus,
    get_priviledgedFor,
    setDStore,
    asyncDatas,

    useLogin,
    useReg,
    useUpd,
    useFread,
    useDel,
  };
  //getter
});
