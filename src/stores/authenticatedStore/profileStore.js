import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
//import qs from "qs"; //it format any_formated(obj,array) of params into url queriess....when there is params>
//const querystring = require("node:querystring"); //querystring.parse

import { ssrAPI } from "../../srcenv";
//import { databaseAPI_URL } from "../../config";
import axios from "axios";

//const $q = useQuasar();              //{[[[[   .get(   url,{params:{},headers:{}})  ]]]]}....received as obj_req.params || response.data/staus/

const API_URL = ssrAPI+"/profileapi"; //const API_URL = `${import.meta.env.API_URL}/users`;
const _model_mainURL="/profile"
const STORE_NAME ="profileStore";
//

const SETTINGS_LOCAL_STORAGE_KEY = "settings";

const authApi = axios.create({ baseURL: API_URL, timeout: 7000 });

const nul = [null, undefined, false, "", [], {}];

const procApiWrap = {get: request("GET"), post: request("POST"), put: request("PUT"), patch: request("PATCH"), delete: request("DELETE")};

function request(method) {
  return async (url, body = null, paramObj = {}) => {
    var StoreDebug = "Entering Store.."
    paramObj["timestamp"] = new Date().getTime(); //it would generate brand new request..dur the timestamp of new time
    const requestOptions = { method: method,headers: await authHeader(url), params: {}, }; 
    requestOptions.headers["Content-Type"] = "application/json";
    requestOptions.params = paramObj; //{"id":paramObj["id"],"data":paramObj};  //  build axios_request of => (/get?id:12,headersOpt) or (url,{params:{k:v,},headersOpt)....& pa
    
    StoreDebug = "Store Parameters and Header Setted Up..."

    if (body) {

        let tobeUpload = nul.includes(body.upload) ? false : body.upload  
        if (tobeUpload) {
            requestOptions.headers = {'Content-Type':"multipart/form-data"}
            requestOptions.params['upload'] = tobeUpload
         }
         console.log(requestOptions,'post/put_store.....')
      //---------------------------
      try {
        ////API_GATEWAY {{{[[[[[[[[[[[---------]]]]]]]]]]]]]]]}}} e POST/PUT
        StoreDebug = "Store Requesting Setted Up...#"+method
        const response =  method === "POST" ? await authApi.post(url, body, requestOptions) : await authApi.put(url, body, requestOptions); // axioscreate is best work if, the method(post/put) is givennn pricissly
        StoreDebug = "Store Showing BackEnd Debug :- ...#"+method+response
        return await respHandler(response).then((HandledRESP) => { return [true, HandledRESP]; }, // Handling Friendly Errors of the response
                                                (error) => {//console.log(StoreDebug)
                                                   return [false,error]; }); // the friendly errors
      } catch (error) {
        StoreDebug = "Request_aborted_OnStore :-Axios_Error "+method+tobeUpload+error
        console.log(StoreDebug)
        return [false, error];
      } finally {}

    } else {  
      try {
        StoreDebug = "Store Requesting Setted Up...#"+method
        const response = method === "GET" ? await authApi.get(url, requestOptions) : await authApi.delete(url, requestOptions);
        StoreDebug = "Store Showing BackEnd Debug :- ...#"+method+response
        return await respHandler(response).then((HandledRESP) => { return [true, HandledRESP];  }, // Handling Friendly Errors of the response
                                                (error) => {//console.log(StoreDebug)
                                                  return [false,error]; } ); // the friendly errors
      } catch (error) {
        StoreDebug = "Request_aborted_OnStore :-Axios_Error "+method+tobeUpload+error
        //console.log(StoreDebug)
        return [false,error];
      } finally {  }
    }
  };
}

async function respHandler(response) {
  ////((((((((RESPONSE HANDLER  [.data / .statusText]))))))))
  try {
    const isJson = response.headers ?.get("content-type")  ?.includes("application/json"); //res.headers['content-type']; :- if application/json(extract json file from res.data)
    let resData = isJson ? response.data : null;
    if (response.statusText === "OK" && resData) { return response['data']; // return all data++Headers
    } else {
      const error = (resData && resData.msg) || response.status;
      if ([401, 403, 404, 505].includes(response.status)) { return Promise.reject("please try again"); // or redirect it to ;- //logout();
      }
      return Promise.reject('Uncoded Status/Data Response Or Non_Json'); // Promis.reject(reason)...brek waiting status with friendly errors handling ( reasonable error given..)
    }
  } catch {  return Promise.reject("Response unHandled Error"); }
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

///////////////////////
const _thisDate = new Date(); //Tue Dec 26 2023 17:51:01 GMT+0300 (East Africa Time) (as of--- ToDay)
const __thatDate = new Date("12/26/2023, 11:47:20 PM"); //.toLocaleString();getDay()[for days of that week] ;
const _numDaysofMonth = (y, m) => new Date(y, m, 0).getDate(); //given of year# and month#

const _thisYear = _thisDate.getFullYear(); //2023
var _startofthisYear = new Date(_thisYear, 0, 1); //01,01 (Year(startMonth=01(_in_js:0),startDate=01(_in_js:1)))
var _endofthisYear = new Date(_thisYear, 11, 31); //12,31 (Year(endMonth=12(_in_js:11),endDate=31(_in_js:31)))

var _previouseYear = _thisYear - 1; //previouse_yearnumber

const _thisNumMonthOfyear = _thisDate.getMonth(); //11 => NumberOf(Dec)

const _startofthisMonth = new Date(_thisYear, _thisNumMonthOfyear, 1);
const _endofthisMonth = new Date(_thisYear, _thisNumMonthOfyear + 1, 0);
const numDaysofMonth = (y, m) => new Date(y, m, 0).getDate(); //given of year# and month#
/*
const _thisNumDayOfmonth = _thisDate.getDate(); //26 => day# of this month

const _thisNumDayOfWeek = _thisDate.getDay(); //2 => day# of this Week

const getHours = _thisDate.getHours(); //17 => of 17:51:01 ( the time)
const getMinutes = _thisDate.getMinutes(); //51 => of the time
//const getSeconds = _thisDate.getSeconds()(); //01 => of the time
*/
//toLocaleString ( 12/26/2023, 6:10:34 PM)
//toLocaleString('en-us',{month:'short/long', year:'numeric'})
//toLocaleDateString (12/26/2023)
//toDateString(Tue Dec 26 2023)
//toJSON(2023-12-26T15:09:59.598Z)
//toLocaleTimeString ( 6:16:26 PM )

const months = Array.from({ length: 12 }, (e, i) => {
  return new Date(null, i, null).toLocaleDateString("en", {
    month: "short",
  }); //short || long
});

const monthDataFilter = ref({ //{  date: { $gte: "2022-01-01", $lte: "2022-12-30" },}
  updatedAt: {
    $gte: _startofthisMonth,
    $lt: _endofthisMonth,
  },
});

const yearDataFilter = ref({ //{  date: { $gte: "2022-01-01", $lte: "2022-12-30" },}
  updatedAt: {
    $gte: _startofthisYear,
    $lt: _endofthisYear,
  },
});

//////////////////////////////////////////--------------Axios Wrapper UUUUUUPPPPPPPPPPPP

let getuserID = async () =>
  process.browser ? localStorage.getItem("userID") : "";

export const profileStore = defineStore(STORE_NAME, () => {
  //state
  let Datas = ref([]); //
  let DatasParam = ref({});
  let yearDatas = ref({});
  let yearDatasParam = ref({}); //
  let monthDatas = ref({}); //
  let monthDatasParam = ref({}); //
  //---------------------------
  let loadingStatus = ref(false);
  let syncPeriod = ref(5000);

  const alertI = reactive({ status: false, sms: "" });
  const alertII = reactive({ status: false, sms: "" });

  //getter/ computed
  const getDatas = computed(() => Datas.value);
  //const getFDatas = computed((filterOps) => Datas.value);
  const getyearDatas = computed(() => yearDatas.value);
  const getmonthDatas = computed(() => monthDatas.value);
  const getloadingStatus = computed(() => loadingStatus.value);

  const getFDatas = (filterOps) => {

    yearDatas.value;
    return ""
  }
  const getalert = {
    alertI: computed(() => alertI),
    alertII: computed(() => alertII),
  };
  //action
  function set_DatasParam(objParams) {
    //set user_controllable alerts
    DatasParam.value = objParams;
    //alertI.sms = message;
    return;
  }

  function set_alertI(logic, message) {
    //set user_controllable alerts
    alertI.status = logic;
    alertI.sms = message;
    return;
  }

  function set_alertII(logic, message) {
    //set user_controllable alerts
    alertII.status = logic;
    alertII.sms = message; //
    return;
  }

  const asyncAnualData = async function (objParam = null) {
    //+++++++++++++++++++...
    loadingStatus.value = true;
    objParam = yearDataFilter.value;
    try {
      return await procApiWrap
        .get(_model_mainURL+"s", null, objParam)
        .then((resp) => {
          if (resp[0]) {
            try {
              let yearlyData = resp[1];
              let monthsData = { 1: [], 2: [],3: [],4: [],5: [], 6: [],7: [],8: [],9: [],10: [],11: [],12: []};

              for (let items of yearlyData) {
              console.log(items["updatedAt"],"Annual Data Date Format")
               let monthIndex = items["updatedAt"].split("/")[0];

                monthIndex = Number(monthIndex);

                monthsData[monthIndex].push(items);
              }
              yearDatas.value = monthsData; //{'apr':[{},{}],'jun':[{},{}]}
            

              return true;
            } catch {}
          } else {
            //returns.......data [False,'Error...']
          } //Handler Friendly Errors (with Response of Respective_401,501,404)
          return false;
        })
        .catch((error) => {
          return false;
        }); //Handler NonFriendly Errors
    } catch (error) {} //Handler Supper Non_Friendly Errors

    return false;
  };

  asyncAnualData();

  const asyncMonthData = async function (objParam = null) {
    //+++++++++++++++++++...
    loadingStatus.value = true;
    objParam = monthDataFilter.value;

    try {
      return await procApiWrap
        .get(_model_mainURL, null, objParam)
        .then((resp) => {
          if (resp[0]) {
            try {
              let monthData = resp[1]["data"];
              let monthsData = {
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                6: [],
                7: [],
                8: [],
                9: [],
                10: [],
                11: [],
                12: [],
              };
              for (let items of monthData) {
                let monthIndex = items["updatedAt"].split("-")[1];
                monthIndex = Number(monthIndex);

                monthsData[monthIndex].push(items);
              }
              monthDatas.value = monthsData; //{'apr':[{},{}],'jun':[{},{}]}
              ////console.log(yearDatas.value,'uuuuuuuuuuuuuuuuuuuuuuuu')
              return true;
            } catch {}
          } else {
            //returns.......data [False,'Error...']
          } //Handler Friendly Errors (with Response of Respective_401,501,404)
          return false;
        })
        .catch((error) => {
          return false;
        }); //Handler NonFriendly Errors
    } catch (error) {} //Handler Supper Non_Friendly Errors

    return false;
  };

  let counter = 0;

  const asyncDatas = async (syncState = 60000, reqParams = {}) => {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    syncPeriod.value = syncState;
    if (typeof reqParams != 'object') {
      reqParams = {};
    } 

    let asyncing = setInterval(async () => {
      ////console.log(DatasParam.value,syncPeriod.value,"authStore#asyncDatas New Arrived....YO");
      try {
        return await procApiWrap
          .get(_model_mainURL+"s", null, reqParams)
          .then((resp) => {
            if (resp[0]) {
              let users = resp[1];
              try {
                if (Datas.value.length !== users.length) {
                  //console.log("_Update Detected...#profile@store",syncPeriod.value)
                  Datas.value = resp[1];
                  counter = 0;
                  syncPeriod.value = 30000;
                  //clearInterval(asyncing);
                  return true;
                } else {
                  //console.log("No_Update Detected...#profile@store",syncPeriod.value)
                  counter = counter + 1;
                  if (counter === 5) {
                    syncPeriod.value = 20000;
                    syncState = 20000;
                  }
                  return true;
                }
              } catch {return true; }
            } else {  } //Handler Friendly Errors (with Response of Respective_401,501,404)
            return false;
          })
          .catch((error) => { return false;  }); //Handler NonFriendly Errors
      } catch (error) { return true;  } //Handler Supper Non_Friendly Errors
    }, syncPeriod.value); //set it to zero/# to stop/Synchronizing...
  };
  //asyncDatas(5000);

  //createDataa
  async function createData(formData = null, objParam = null) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .post(_model_mainURL, formData, objParam)
        .then((resp) => {
          if (resp[0] && Object.keys(resp[1]).length) {
            try {
              //asyncDatas(700);
              return resp;
            } catch {}
          } else {}
          return resp;
        })
        .catch((error) => {return [false,false]; }); //Handler NonFriendly Errors
    } catch (error) {return [false,false]} //Handler Supper Non_Friendly Errors
  }

  //updateData
  async function updateData(formData = null, objParam = null) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .put(_model_mainURL, formData, objParam)
        .then((resp) => {
          console.log('Updating Response',formData,resp[1])
          if (resp[0] && Object.keys(resp[1]).length) {
            try {
              //asyncDatas(1000);
              return resp;
            } catch {}
          } else {}
          return resp;
        })
        .catch((error) => {return [false,false]; }); //Handler NonFriendly Errors
    } catch (error) {return [false,false]} //Handler Supper Non_Friendly Errors
   // return false;
  }

  //readData
  async function readData() {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .get(_model_mainURL+"s")
        .then((resp) => {
          if (resp[0] && resp[1].length) {
            try {  return resp[1];
            } catch {}
          } else { } 
          return false;
        }).catch((error) => { return false; }); //Handler NonFriendly Errors
    } catch (error) {} //Handler Supper Non_Friendly Errors
    return false;
  }

  //readFilterData
  async function readFData(objParam = null) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .get(_model_mainURL, null, objParam)
        .then((resp) => {
          if (resp[0] && resp[1].length) {
            try {  return resp[1];
            } catch {}
          } else { } 
          return false;
        }).catch((error) => { return false; }); //Handler NonFriendly Errors
    } catch (error) {} //Handler Supper Non_Friendly Errors
    return false;
  }

  //deleteData
  async function deleteData(objParam) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .delete(_model_mainURL, null, objParam)
        .then((resp) => {
          if (resp[0] && Object.keys(resp[1]).length) {
            try {
              //asyncDatas(1000);
              return resp;
            } catch {}
          } else {}
          return resp;
        })
        .catch((error) => {return [false,false]; }); //Handler NonFriendly Errors
    } catch (error) {return [false,false]} //Handler Supper Non_Friendly Errors
   // return false;
  }
  


  return {
    //-----synchronize give (DATAs)
    asyncAnualData,
    asyncMonthData,
    asyncDatas,
    //------------getter(computed) porting
    getyearDatas,
    getmonthDatas,
    getDatas,
    //------------------set client_controller setting..
    set_DatasParam,
    set_alertI,
    set_alertII,
    //--------------actions porting
    createData,
    readData,
    readFData,
    updateData,
    deleteData,
    //useLogin,
  };
});
