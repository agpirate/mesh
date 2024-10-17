import { ref, reactive, computed } from "vue";
import axios from "axios";
import { useLocalStorage, useSessionStorage } from "@vueuse/core";

import {
  _getthismonth,
  _getthisyear,
  monthDataFilter,
  yearDataFilter,
} from "src/services/timeQuery";
import { httpStatusCodes } from "src/composables/constVariables";
import _localStorage from "src/services/storeService";

import { toRaw } from "vue";
import setDHeaders from "src/composables/setHeaders";
//const $q = useQuasar();              //{[[[[   .get(   url,{params:{},headers:{}})  ]]]]}....received as obj_req.params || response.data/staus/
const API_URL = process.env.Client_IP_PORT; //const API_URL = `${import.meta.env.API_URL}/users`;
const modalApi = axios.create({ baseURL: API_URL, timeout: 7000 });
// Set up interceptors to add headers or handle responses globally
modalApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assume you're storing JWT tokens in localStorage
    if (token) {
      // config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const procApiWrap = {
  get: request("GET",'getdelete'),
  post: request("POST",'postput'),
  put: request("PUT",'postput'),
  patch: request("PATCH"),
  delete: request("DELETE",'getdelete'),
};

 function request(method,methodGroup) {
  try{
  return async (url, body = null, paramObj = {},headerInstance={}) => {
    let _modelName = url.split("/")[2];

    var requestOptions = {
      method,
      headers:Object.assign(headerInstance,await requestHeader(_modelName)),
      params: { ...paramObj, timestamp: await _gettime() },
    };
    // await requestHeader(_modelName).then((h)=>requestOptions['headers'] =h)
    requestOptions.headers["Content-Type"] = "application/json";
    console.log(requestOptions,'methoddddddddddddddGGGGGGGG')
    if(methodGroup =='postput'){

      if (!(body ?? false)) {
        return {status:false,'data':null}
      }
      let fileObject = body["file_"] ?? false;
      requestOptions.data = body  //body required only for post,put,.... & prevent seding body=null to server
      if (fileObject) {
        requestOptions = await handleFormData(fileObject,requestOptions, body);
      }
      //---------------------------////API_GATEWAY {{{[[[[[[[[[[[---------]]]]]]]]]]]]]]]}}} e POST/PUT

    } else {    }

    try {
      const response = await modalApi(url, requestOptions);
      return await responseHandler(response)
      .then((HandledRESP) => {return { status: true, data: HandledRESP };},
        (e) => {return { status: false, data: e };}
      ).catch((e) => {return { status: false, data: e }; });
    } catch (error) {return { status: false, data: error }}
  };
}
  catch(e){
    console.log(e)
  }
}

let _okStatus = [200, 201, 202]; //
let _serviceStatus = [400, 401, 402, 403, 404, 405]; //
let _serverokStatus = [500, 501, 502, 503, 504, 505]; //
async function responseHandler(response) {
  ////((((((((RESPONSE HANDLER  [.data / .statusText]))))))))
  console.log('checking response............')
  try {
    if (
      _okStatus.includes(response.status ?? false) &&
      (response.data ?? false)
    ) {
      try {
        response.data = JSON.parse(response.data) ?? response.data;
      } catch {}
      const contentType = response.headers.get("Content-Type");
      const isJson = contentType.includes("application/json"); //if application/json(extract json file from res.data)
      if (isJson) {
        //------
        //----------------------------------
        // setDHeaders(_setHeader)
        //---------
        return response.data;
      }
    }
    return Promise.reject(response);
  } catch (e) {
    return Promise.reject(e);
  }
}
////((((((((AGGRESIVE ERROR HANDLER))))))))
async function ErrorHandler(e) {
  let Error = [];
  const errData = e.response;
  if (errData) {
    Error = [errData.data, errData.status, errData.headers];
  } else if (e.request) {
  } else {
    Error = [e.message];
  }

  return Error;
}
//--------------------------------------------Helpers
//--------------------------------------------Helpers
async function requestHeader(_model = "") {
  //Inject Header

  var _reqHeaders = {}; //_reqHeader.value ?? {}
  //_reqHeader['Accept']= ''//text/plain, Content types that are acceptable for the response {let it default}
  //_reqHeader['Content-Type']='' //gzip, deflate
  //_reqHeaders['Accept-Encoding']=''
  //------------------------ console.log(useLocalStorage('id'),'StorageID .....')
  _reqHeaders["_issModal"] = _model;
  // let _geolat = toRaw(useLocalStorage("geo.llat").value ?? false);
  let _geolat = _localStorage._get("lat") ?? false;
  let _geolong = _localStorage._get("long") ?? false;
  if (_geolat) {
    _reqHeaders["lat"] = _geolat;
    _reqHeaders["long"] = _geolong;
  }
  console.log(
    "\n Inject Headers Value as \n Model Name =",
    _reqHeaders
  );
  return _reqHeaders ?? {};
}

//-------------TimeBase Query_Helper
async function handleFormData(fileObject,requestOptions,body){
  var formData = new FormData();
  requestOptions.headers["Content-Type"] = "multipart/form-data"; // {'Content-Type':"multipart/form-data"}
  requestOptions.params["file_"] = fileObject; //holding the fileName as file:__ or files:___
  //------------
  //let file_ = [fileObject['file'] ?? null,fileObject['files'] ?? null]
  for (let key in body) {
    //if there is file_data duplicate all data into formData(format)...since file uploading is better as formData
    if (Object.values(fileObject).includes(key)) {
      //Detect the fileAsRaw file(actuall file key_)
      //-----------------------
      if (fileObject["files"] ?? false) {
        //is arrayed files
        for (let kkey in body[key]) {
          //if fileAsRaw is array(multiple file support)
          formData.append(key, body[key][kkey]);
        }
      } else if (fileObject["file"]) {
        //is single file
        formData.append(key, body[key][0]);
      } else {
        return false;
      }
      //---------------
    } else {
      //and nonFile Columns
      if (typeof body[key] != "object") {
        //it's hard to send object([]-{}) _ sending file_won't involve_object_data
        formData.append(key, body[key]); //and object(array specially has to be defined manually)
      }
    }
}
requestOptions.headers["Content-Type"] = "multipart/form-data";
requestOptions.data = formData;
return requestOptions
}
async function _gettime() {
  return new Date();
}
export { requestHeader, modalApi, procApiWrap };
