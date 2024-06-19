import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import axios from "axios";
import { useLocalStorage } from "@vueuse/core"
import { toRaw } from 'vue'

//import { _wiseDating } from "src/composables/utilServices/datePeriod";

//const $q = useQuasar();              //{[[[[   .get(   url,{params:{},headers:{}})  ]]]]}....received as obj_req.params || response.data/staus/
const API_URL = process.env.API_IP_PORT+"/publicchatapi"; //const API_URL = `${import.meta.env.API_URL}/users`;
const modalApi = axios.create({ baseURL: API_URL, timeout: 7000 });
const procApiWrap = {get: request("GET"), post: request("POST"), put: request("PUT"), patch: request("PATCH"), delete: request("DELETE")};

const _suburl="/publicchat"
const STORE_NAME ="profile2Store";

async function _gettime (){  return new Date() }

function request(method) {
  return async (url, body = null, paramObj = {}) => {

    var requestOptions = { method: method,headers: {}, params:paramObj, };
    requestOptions.headers['Content-Type'] ="application/json"; 
    requestOptions.headers['ab'] ="application/json"; 
    requestOptions.params["timestamp"]  = await _gettime();

    if (body != null) {
         console.log('publich chatttttttttttttttttttt',requestOptions)
      //---------------------------////API_GATEWAY {{{[[[[[[[[[[[---------]]]]]]]]]]]]]]]}}} e POST/PUT
      try {
        const response =  method === "POST" ? await modalApi.post(url, body, requestOptions) : await modalApi.put(url, body, requestOptions); // axioscreate is best work if, the method(post/put) is givennn pricissly
        return await responseHandler(response).then((HandledRESP) => { return [true, HandledRESP]; }, // Handling Friendly Errors of the response
                                                (error) => { return [false,error]; }); // the friendly errors
      } catch (error) {
        return [false, 'ooo(e)'];
      } finally { }

    } else {  
      try {
        const response = method === "GET" ? await modalApi.get(url, requestOptions) : await modalApi.delete(url, requestOptions);
        return await responseHandler(response).then((HandledRESP) => { return [true, HandledRESP];  }, // Handling Friendly Errors of the response
                                                (error) => {return [false,'failed to creat']; } ); // the friendly errors
      } catch (error) {
        return [false,'oooo(e)'];
      } finally { }
    }
  };
}

async function responseHandler(response) { ////((((((((RESPONSE HANDLER  [.data / .statusText]))))))))
  try {
    const isJson = response.headers ?.get("content-type") ?.includes("application/json"); //res.headers['content-type']; :- if application/json(extract json file from res.data)
    let data = response.data ?? false;
    const error = (data && data.msg) || response.status;
    if (response.statusText === "OK" && data) {  
      return response['data']; 
    } else {
      if ([401, 403, 404, 505].includes(response.status)) {
      }
    }
  } catch { }
  return Promise.reject('Api Response Error');
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
async function requestHeader(url='') {
  //Inject Header
  var _reqHeaders = {}//_reqHeader.value ?? {}
  _reqHeaders['Test']='WooW'
  //_reqHeader['Accept']= ''//text/plain, Content types that are acceptable for the response {let it default}
  //_reqHeader['Content-Type']='' //gzip, deflate
  //_reqHeaders['Accept-Encoding']=''
  //------------------------ console.log(useLocalStorage('id'),'StorageID .....')
  _reqHeaders['_issModal']='saleit'

  let _geolat = toRaw(useLocalStorage('geo.lat').value ?? false)
  let _geolong = toRaw(useLocalStorage('geo.long').value ?? false)
  if(_geolat){
    _reqHeaders['geo.lat']=_geolat
    _reqHeaders['geo.long']=_geolong
  }

  return _reqHeaders ?? {};
}

//-------------TimeBase Query_Helper
import { _getthismonth,_getthisyear } from "src/services/timeQuery";
const monthDataFilter = ref({ //{  date: { $gte: "2022-01-01", $lte: "2022-12-30" },}
  updatedAt: {
    $gte: _getthismonth.daya,
    $lt: _getthismonth.dayz,
  },
});
const yearDataFilter = ref({ //{  date: { $gte: "2022-01-01", $lte: "2022-12-30" },}
  updatedAt: {
    $gte: _getthisyear.daya,
    $lt: _getthisyear.dayz,
  },
});

//////////////////////////////////////////--------------Axios Wrapper UUUUUUPPPPPPPPPPPP

//let getuserID = async () => process.browser ? localStorage.getItem("userID") : "";

export const profile2Store = defineStore(STORE_NAME, () => {
  //state
  let Datas = ref([]); //
  let syncQuery = ref({limits:100});
  let yearDatas = ref({});
  let yearsyncQuery = ref({}); //
  let monthDatas = ref({}); //
  let monthsyncQuery = ref({}); //
  //---------------------------
  let loadingStatus = ref(false);
  let syncPeriod = ref(5000);

  const alertI = reactive({ status: false, sms: "" });
  const alertII = reactive({ status: false, sms: "" });

  //getter/ computed
  const getDatas = computed(() => Datas.value);
  const getyearDatas = computed(() => yearDatas.value);
  const getmonthDatas = computed(() => monthDatas.value);

  //action
  //action
function set_reqHeader(_header =null) { //set from use_request or find cached data
  //logHeaders.value = _header ?? {}
  //_reqHeader.value=_header ?? {}
  return true;
}

  async function set_syncQuery(objParams) {
    syncQuery.value = objParams;
    return true;
  }

  let _newsChecker = {}
  async function asyncDatas ()  { 
         //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          let paramObj = {}
          paramObj = syncQuery.value
          paramObj["timestamp"] = _gettime(); //timestamp create New Request & but could create autonomouse requests(due_ seconds updating ?)
          var requestOptions = {method:'GET',headers: await requestHeader(), params: {}, }; 
          requestOptions.headers["Content-Type"] = "application/json"; //The MIME type of the body of the request (used with POST and PUT requests)
          requestOptions.params = paramObj; //{"id":paramObj["id"],"data":paramObj}; //  build axios_request of => (/get?id:12,headersOpt) or (url,{params:{k:v,},headersOpt)....& pa
          
          try {
            return await modalApi.get(process.env.API_IP_PORT+"/publicchatapi/publicchat",requestOptions).then((response)=>{
              console.log('requestin pchat',response)
              if(response.status == 200) //array_Value Existed
              { 
                let _respData = response.data;
                let _diff = Datas.value.length  - _respData.length //has different in numbers
  
                if (_diff || (Datas.value[0] !== _respData[0])){//if has lengthDifference or firstIndex_Different push it
                  _newsChecker = _respData[0]
                   Datas.value = _respData;              
                } else { } 
              }
              else{Datas.value=[];}//if no_data push as empty array ()
              return false
            }).catch((error)=>{ 
              Datas.value=[];//Value Not Founded(as 404 Error)..push it as emptry array()
              return false}) 
          } catch (error) {  }
          return true
    };

  //createDataa
  async function createData(formData = null, objParam = null) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    console.log('SaleitStore@2',formData)
    try {
      return await procApiWrap
        .post(_suburl, formData, objParam)
        .then((resp) => {
          if (resp[0] && Object.keys(resp[1]).length) {
            try {return resp;
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
        .put(_suburl, formData, objParam)
        .then((resp) => {
          //console.log('profile2Store Updating--->',resp)
          if (resp[0] && Object.keys(resp[1]).length) {
            try {return resp;
            } catch {}
          } else {}
          return resp;
        })
        .catch((error) => {return [false,false]; }); //Handler NonFriendly Errors
    } catch (error) {return [false,false]} //Handler Supper Non_Friendly Errors
  }

  //readData
  async function readData() {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .get(_suburl+"s")
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
        .get(_suburl,null, objParam)
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
        .delete(_suburl, null, objParam)
        .then((resp) => {
          if (resp[0] && Object.keys(resp[1]).length) {
            try {return resp;
            } catch {}
          } else {}
          return resp;
        })
        .catch((error) => {return [false,false]; }); //Handler NonFriendly Errors
    } catch (error) {return [false,false]} //Handler Supper Non_Friendly Errors
  }
  
  
  return {
    //-----synchronize give (DATAs)
    asyncDatas,
    //------------getter(computed) porting
    getDatas,
    //------------------set client_controller setting..
    set_syncQuery,
    set_reqHeader,
    //--------------actions porting
    createData,
    readData,
    readFData,
    updateData,
    deleteData,
    //useLogin,
  };
});
