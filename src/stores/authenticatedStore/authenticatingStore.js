import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
//import qs from "qs"; //it format any_formated(obj,array) of params into url queriess....when there is params>
//const querystring = require("node:querystring"); //querystring.parse
import _acctype from "src/hooks/_acctype";

import { ssrAPI } from "../../srcenv";
//import { databaseAPI_URL } from "../../config";
import axios from "axios";
//import { modelNames } from "mongoose";

//const $q = useQuasar();              //{[[[[   .get(   url,{params:{},headers:{}})  ]]]]}....received as obj_req.params || response.data/staus/

const API_URL = ssrAPI+"/api"; //const API_URL = `${import.meta.env.API_URL}/authenticatings`;
const authApi = axios.create({ baseURL: API_URL, timeout: 7000 });

const STORE_NAME = "authenticatingStore";
const SETTINGS_LOCAL_STORAGE_KEY = "settings";

const nul = [null, undefined, false, "", [], {},NaN];

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
            requestOptions.headers = { 'Content-Type': 'multipart/form-data' }
            requestOptions.params['upload'] = tobeUpload
         }
         console.log('posting',body)
      //---------------------------
      try {
        ////API_GATEWAY {{{[[[[[[[[[[[---------]]]]]]]]]]]]]]]}}}  POST/PUT
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

const user = process.browser ? localStorage.getItem("user") : "";
const initialState = user
  ? { _isRegistered: { loggedIn: true }, user }
  : { _isRegistered: { loggedIn: false }, user: null };


export const authenticatingStore = defineStore(STORE_NAME, () => {
  //state
  let Datas = ref([]); //
  let DatasParam = ref({});
  let yearDatas = ref({});
  let yearDatasParam = ref({}); //
  let monthDatas = ref({}); //
  let monthDatasParam = ref({}); //
  //---------------------------
  let logStatus = reactive(initialState);
  let _priviledgedFor = reactive({});
  let loadingStatus = ref(false);
  let syncPeriod = ref(5000);
  //======gett Data

  const getLogStatus = computed(() => logStatus);
  const get_priviledgedFor = computed(() => {
    return _priviledgedFor;
  });
  //---------------------------
  const alertI = reactive({ _isRegistered: false, sms: "" });
  const alertII = reactive({ _isRegistered: false, sms: "" });

  //getter/ computed
  const getDatas = computed(() => Datas.value);
  const getyearDatas = computed(() => yearDatas.value);
  const getmonthDatas = computed(() => monthDatas.value);
  const getloadingStatus = computed(() => loadingStatus.value);

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

//----
function ArrayHaseem (base,items)  {
  return items.some(value => base.includes(value)) ? true : false };

async function wrapDataPriviledge(userData){
  //-----------------access computing
  var access = nul.includes(userData.acctype)  ?  {} : userData.acctype

  //
 // //console.log(acces,userData,'modalaccess0')
 userData['_anyAccess'] = false; //has any access level
 userData['_isupgraded'] = false; //has specific access level(upgraded)
 userData['_ispremium'] = false; //has specific access level(primium)
 userData['_iss'] = {};
 userData.acctype =access//{'saleit':['saleit','/dbs/sit',true,[b/list_column],[Origi_list_column],]}
 //console.log("IIIIIIIII",access,userData)

  if(Object.keys(access).length !==0 ){
      for(let keyy in userData.acctype){ //for each_dataModel the user has(iterated)

        var acces = ""
        //console.log('authentication Store...U',userData.acctype)

        if(Array.isArray(userData.acctype[keyy])){ //check if the data_model allows multiple_access type 
          acces = nul.includes(userData.acctype[keyy][0]) ? false : userData.acctype[keyy] // and check if the user_has any and load all
        }else{ //check if the data_model allows single type 
          acces = nul.includes(userData.acctype[keyy]) ? false : userData.acctype[keyy] //and check if user has any access
        }

        if(acces){ //if there is any accccc?
                  //------------user_has_privileges Accesss...[there is access privileges....]
          userData['_anyAccess'] = true; 
          //------initializing_iss ['isstore','issale',.....]
          userData['_iss'][keyy]=[]
          var Modalacces = nul.includes(_acctype[keyy]) ? "" : _acctype[keyy] //the modalAccess priV

          if(typeof acces != 'object'){
              acces=[acces]
          }

          var _issuper0 = (['root','admin']).some(value => acces.includes(value)) ? 'root' : false;
          var _issuper1 = (['registrar' , 'creator','creator_rw','creator_rwx' ]).some(value => acces.includes(value)) ? 'creator' : false;
          var newaccess =[]
          //console.log(_issuper1,'net vvvvvvvvvvvvvvvvvvvv-------',acces,Modalacces,(['regAdmin' ,'regO2' ,"regCo2" ,"regC2h2", 'registrar' , 'creator' ]).some(value => acces.includes(value)) )
          var iscreator = _issuper1 ? _issuper1 : _issuper0

          if(iscreator){ //check if priviledges is columnSpecific && if mixed...extract supper_privileges...
            var nulsuper = ['regAdmin','registrar','creator','creator_rw','creator_rwx','root','admin',""," ",null,undefined].concat(acces)
           // console.log('net accessssssssssssssssssssUUUUUUU------------',Modalacces)

           var maccess= "";//nul.includes(Modalacces.enum) ? Modalacces.venum : Modalacces.enum

           if(Modalacces['type'] == Array){
             maccess= Modalacces.venum
           }
           else{ maccess=  Modalacces.enum }
           // console.log(maccess,'net accessssssssssssssssssss-------',acces)

            for (var i in maccess){          
              if(!nulsuper.includes(maccess[i])){
                  newaccess.push(maccess[i]) //is superprivileged you can't access thes values
              }
            }

          userData['_iss'][keyy].push(iscreator)// log_if user is admin/root
          userData['_isupgraded'] = true; //is upgraded
          userData['_ispremium'] = true;//also has creator moodes
          }else{ //is_flag_powereddd
          newaccess = acces
          //--------
          } //if your are not superpriviledged

          var _iisOpts=ref({})
          _iisOpts.value['isgm'] = computed(() => {
             return ArrayHaseem(acces,["gm"]) ;//acces.includes("storeStatus");
           });

           _iisOpts.value['isupgraded'] = computed(() => {
            var _chupgrade = ArrayHaseem(acces,["upgraded"])
            if(_chupgrade){
              userData['_isupgraded'] = true;
            }
             return  _chupgrade //acces.includes("financeStatus" || 'financeApStatus');
           });

           _iisOpts.value['isclient'] = computed(() => {
             return  ArrayHaseem(acces,["public","user","client"])//acces.includes("financeStatus" || 'financeApStatus');
           });

           for(let _iss in _iisOpts.value){
            if(!nul.includes(_iisOpts.value[_iss])){
              ////console.log(keyy,"authentication store",acces,_iisOpts.value,_iss)   ...log all privileges
              userData['_iss'][keyy].push(_iss)
                              //'saleit':['isclient','isupgrade']
            }
          }
        userData.acctype[keyy] = [keyy,'/play/'+keyy,iscreator,newaccess,acces] //0-4
                        //'saleit':['saleit','/db/saleit',false,[w/list_columns],[privileges_original]]
        }else{
        delete userData.acctype[keyy];// = acces
        }
      }
  }
  return userData
}
//---------------------AUTHENTICATE-----------------
let _rolingkey = "phone"; //key for authenticating.. new Data
async function useLogin(formData) {

    try {
    if (!formData[_rolingkey]) {
    return false;
    }
    } catch {
    return false;
    }

let objParam = {'phone':formData[_rolingkey] }; //[name_ used to check if adding named_items is already existed/not...let's assume _id:_name_value paired for convetional

try {
return await procApiWrap
.post("/login", formData, objParam)
.then( async (resp) => {
if (resp[0]) {
  //Good Day....Data IS comings with .data .headers .Ok(200)_staus

  var _userData = await wrapDataPriviledge(resp[1]);
  var __anyAccess = nul.includes(_userData._anyAccess) ? false : _userData._anyAccess;
  logStatus = { _isRegistered: true,user: _userData };
  return logStatus;

} else {
} //Handler Friendly Errors (with Response of Respective_401,501,404)

logStatus ={ _isRegistered: false, user: null,_anyAccess:false } ;
return logStatus;
// return false;
})
.catch((error) => {}); //Handler NonFriendly Errors
} catch (error) {} //Handler Supper Non_Friendly Errors

logStatus = { ...logStatus, ...{ _isRegistered: false, user: null,_anyAccess:false } };

return logStatus;

//return false;
}
  //--------------------------------REGISTER-------------------------
//--------------------------------REGISTER-------------------------

  //intialize..async lates_data fetching..

  return {

    //asyncDatas,
    useLogin
  };
  //getter
});