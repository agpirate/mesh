import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import axios from "axios";
import { useLocalStorage,useSessionStorage } from "@vueuse/core"
import { toRaw } from 'vue'

//const $q = useQuasar();              //{[[[[   .get(   url,{params:{},headers:{}})  ]]]]}....received as obj_req.params || response.data/staus/

const API_URL = process.env.API_IP_PORT+"/saleitapi"; //const API_URL = `${import.meta.env.API_URL}/users`;
const modalApi = axios.create({ baseURL: API_URL, timeout: 7000 });
const procApiWrap = {get: request("GET"), post: request("POST"), put: request("PUT"), patch: request("PATCH"), delete: request("DELETE")};

const _suburl="/saleit"
const STORE_NAME ="saleitStore";
const SETTINGS_LOCAL_STORAGE_KEY = "settings";

async function _gettime (){  return new Date() }

function request(method) {
  return async (url, body = null, paramObj = {}) => {
   
    var requestOptions = { method: method,headers: await requestHeader(''), params:paramObj };
    requestOptions.headers['Content-Type'] ="application/json"; 
    requestOptions.params["timestamp"]  = await _gettime();
    //console.log(requestOptions,'thisclirequestOps')

    if (body != null) {
        let fileObject = body['file_'] ?? false 
        if (fileObject) {
            var _formData = new FormData()
            requestOptions.headers['Content-Type'] ="multipart/form-data"// {'Content-Type':"multipart/form-data"}
            requestOptions.params['file_'] = fileObject //holding the fileName as file:__ or files:___
            //------------
            //let file_ = [fileObject['file'] ?? null,fileObject['files'] ?? null]
            for(let key in body){ //if there is file_data duplicate all data into formData(format)...since file uploading is better as formData
                if(Object.values(fileObject).includes(key)){    //Detect the fileAsRaw file(actuall file key_)
                      //-----------------------
                    if(fileObject['files'] ?? false){//is single file
                         for(let kkey in body[key]){    //if fileAsRaw is array(multiple file support)
                          _formData.append(key,body[key][kkey])
                      }
                    }else{//is arrayed files
                      _formData.append(key,body[key][0])
                    }
                  //---------------
                }else{//and nonFile Columns
                      if(typeof body[key] != 'object'){ //it's hard to send object([]-{}) _ sending file_won't involve_object_data
                        _formData.append(key,body[key])  //and object(array specially has to be defined manually)
                      }
                  }
            }
            body=_formData
         }
      //---------------------------////API_GATEWAY {{{[[[[[[[[[[[---------]]]]]]]]]]]]]]]}}} e POST/PUT
      try {
        const response =  method === "POST" ? await modalApi.post(url, body, requestOptions) : await modalApi.put(url, body, requestOptions); // axioscreate is best work if, the method(post/put) is givennn pricissly
        return await responseHandler(response).then((HandledRESP) => { return [true, HandledRESP]; }, // Handling Friendly Errors of the response
                                                (error) => { return [false,error]; }); // the friendly errors
      } catch (error) {
        return [false, ''];
      } finally { }

    } else {  
      try {
        const response = method === "GET" ? await modalApi.get(url, requestOptions) : await modalApi.delete(url, requestOptions);
        return await responseHandler(response).then((HandledRESP) => { return [true, HandledRESP];  }, // Handling Friendly Errors of the response
                                                (error) => {return [false,'failed to creat']; } ); // the friendly errors
      } catch (error) {
        return [false,''];
      } finally { }
    }
  };
}

function request(method) {
  return async (url, body = null, paramObj = {}) => {
   
    var requestOptions = { method: method,headers: await requestHeader(''), params:paramObj };
    requestOptions.headers['Content-Type'] ="application/json"; 
    requestOptions.params["timestamp"]  = await _gettime();
    //console.log(requestOptions,'saleitclirequestOps')

    if (body != null) {
        let fileObject = body['file_'] ?? false 
        if (fileObject) {
            var _formData = new FormData()
            requestOptions.headers['Content-Type'] ="multipart/form-data"// {'Content-Type':"multipart/form-data"}
            requestOptions.params['file_'] = fileObject //holding the fileName as file:__ or files:___
            //------------
            //let file_ = [fileObject['file'] ?? null,fileObject['files'] ?? null]
            for(let key in body){ //if there is file_data duplicate all data into formData(format)...since file uploading is better as formData
                if(Object.values(fileObject).includes(key)){    //Detect the fileAsRaw file(actuall file key_)
                      //-----------------------
                    if(fileObject['files'] ?? false){//is single file
                         for(let kkey in body[key]){    //if fileAsRaw is array(multiple file support)
                          _formData.append(key,body[key][kkey])
                      }
                    }else if(fileObject['file']){//is single file 
                        _formData.append(key,body[key][0])
                      }else{return false}
                  //---------------
                }else{//and nonFile Columns
                      if(typeof body[key] != 'object'){ //it's hard to send object([]-{}) _ sending file_won't involve_object_data
                        _formData.append(key,body[key])  //and object(array specially has to be defined manually)
                      }
                  }
            }
            body=_formData
         }
      //---------------------------////API_GATEWAY {{{[[[[[[[[[[[---------]]]]]]]]]]]]]]]}}} e POST/PUT
      try {
        const response =  method === "POST" ? await modalApi.post(url, body, requestOptions) : await modalApi.put(url, body, requestOptions); // axioscreate is best work if, the method(post/put) is givennn pricissly
        return await responseHandler(response).then((HandledRESP) => { return [true, HandledRESP]; }, // Handling Friendly Errors of the response
                                                (error) => { return [false,error]; }); // the friendly errors
      } catch (error) {
        return [false, ''];
      } finally { }

    } else {  
      try {
        const response = method === "GET" ? await modalApi.get(url, requestOptions) : await modalApi.delete(url, requestOptions);
        return await responseHandler(response).then((HandledRESP) => { return [true, HandledRESP];  }, // Handling Friendly Errors of the response
                                                (error) => {return [false,'failed to creat']; } ); // the friendly errors
      } catch (error) {
        return [false,''];
      } finally { }
    }
  };
}

async function responseHandler(response) { ////((((((((RESPONSE HANDLER  [.data / .statusText]))))))))
  try {
    const isJson = response.headers ?.get("content-type") ?.includes("application/json"); //res.headers['content-type']; :- if application/json(extract json file from res.data)
    if(isJson){
      let data = response.data ?? false;
      const error = (data && data.msg) || response.status;
      ////console.log('SaleitStore@',response.status))
      if (response.statusText === "OK" && data) {  
        return response['data']; 
      } else {
        if ([401, 403, 404, 505].includes(response.status)) {
        }
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
var _reqHeader = ref({})
//-------------RequestHeader_Helper
async function requestHeader(url='') {
  //Inject Header
  var _reqHeaders = {}//_reqHeader.value ?? {}
  //_reqHeader['Accept']= ''//text/plain, Content types that are acceptable for the response {let it default}
  //_reqHeader['Content-Type']='' //gzip, deflate
  //_reqHeaders['Accept-Encoding']=''
  //------------------------ //console.log(useLocalStorage('id'),'StorageID .....')
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
export const saleitStore = defineStore(STORE_NAME, () => {
  //state
  let Datas = ref([]); //
  let status_Rows = ref('');
  let syncLock = ref(false);
  let syncQuery = ref({});

  let yearDatas = ref({});
  let yearsyncQuery = ref({}); //
  let monthDatas = ref({}); //
  let monthsyncQuery = ref({}); //
  //---------------------------
  let loadingStatus = ref(false);
  let syncPeriod = ref(5000);

  let logHeaders = ref(null);

  const alertI = reactive({ status: false, sms: "" });
  const alertII = reactive({ status: false, sms: "" });

  //getter/ computed
  const getDatas = computed(() => Datas.value  );
  const getstatus_Rows = computed(() => status_Rows.value );

  const getyearDatas = computed(() => yearDatas.value);
  const getmonthDatas = computed(() => monthDatas.value);
  const getloadingStatus = computed(() => loadingStatus.value);

//action

async function set_syncQuery(objParams) {
    status_Rows.value='Loading...' //for new Searching set status ='loading'
    syncQuery.value = objParams;
    return true;
  }
async function set_syncLock(locker) {
    syncLock.value = locker;
    return true;
  }

let _newsChecker = {}
async function asyncDatas ()  { 
       //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
       if(syncLock.value){ // Allow(false) or Block(true) Syncing
          status_Rows.value=true;
          return true
        }

        let paramObj = Object.assign({},syncQuery.value)
        paramObj["timestamp"] =  toRaw(await _gettime()); //timestamp create New Request & but could create autonomouse requests(due_ seconds updating ?)
        var requestOptions = {method:'GET',headers: await requestHeader(), params: {}, }; 
        requestOptions.headers["Content-Type"] = "application/json"; //The MIME type of the body of the request (used with POST and PUT requests)
        requestOptions.params = paramObj; //{"id":paramObj["id"],"data":paramObj}; //  build axios_request of => (/get?id:12,headersOpt) or (url,{params:{k:v,},headersOpt)....& pa
        
        try {
          return await modalApi.get(process.env.API_IP_PORT+"/saleitapi/saleit",requestOptions).then((response)=>{
            if(response.status == 200) //array_Value Existed
            { 
              // let _diff = Datas.value[0] != response.data[0] //has different in numbers
              if (response.data.length ?? false ){//|| (Datas.value[0].updatedAt!== _respData[0].updatedAt)){//if has lengthDifference or firstIndex_Different push it
                let _diff = Datas.value.length  - response.data.length //has different in numbers
                if(_diff){
                    Datas.value = response.data;
                    status_Rows.value= true
                    return true
                }
                else if(status_Rows.value != false){status_Rows.value=false } //incoming same data

              } else if(status_Rows.value != null) {status_Rows.value=null} //no result
            }
            else {status_Rows.value='Error Connection'} //no result
            return true
          }).catch((error)=>{status_Rows.value='Error Connection' ;//null founded
            return true}) 
        } catch (error) { status_Rows.value='Error Connection'}
        return true
  };

  //createDataa
  async function createData(formData = {}, objParam = {}) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .post(_suburl, formData, objParam)
        .then((resp) => {//console.log('creating New profile..',resp)
          if (resp[0] && Object.keys(resp[1]).length) {
            return resp
          } else {}
          [false,false];
        })
        .catch((error) => {return [false,false]; }); //Handler NonFriendly Errors
    } catch (error) {return [false,false]} //Handler Supper Non_Friendly Errors
  }

  //updateData
  async function updateData(formData = {}, objParam = {}) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .put(_suburl, formData, objParam)
        .then((resp) => {
          //console.log('creating New profile..',resp)
          if (resp[0] && Object.keys(resp[1]).length) {
            return resp;
          } else {}
          return [false,false];
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
    //asyncAnualData,
    //asyncMonthData,
    asyncDatas,
    //------------getter(computed) porting
    //getyearDatas,
    //getmonthDatas,
    getDatas,
    status_Rows,
    getstatus_Rows,
    Datas,
    //------------------set client_controller setting..
    set_syncQuery,
    set_syncLock,
    //set_alertI,
    //set_alertII,
    //--------------actions porting
    createData,
    readData,
    readFData,
    updateData,
    deleteData,
    //useLogin,
  };
});
