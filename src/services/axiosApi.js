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

const procApiWrap = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  patch: request("PATCH"),
  delete: request("DELETE"),
};
async function _gettime() {
  return new Date();
}

function request(method) {
  return async (url, body = null, paramObj = {}) => {
    let _modelName = url.split("/")[2];

    console.log("API Request ", url, _modelName);

    var requestOptions = {
      method: method,
      headers: await requestHeader(_modelName),
      params: paramObj,
    };
    requestOptions.headers["Content-Type"] = "application/json";
    requestOptions.params["timestamp"] = await _gettime();
    //console.log(requestOptions,'thisclirequestOps')

    if (body != null) {
      let fileObject = body["file_"] ?? false;
      if (fileObject) {
        var _formData = new FormData();
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
                _formData.append(key, body[key][kkey]);
              }
            } else if (fileObject["file"]) {
              //is single file
              _formData.append(key, body[key][0]);
            } else {
              return false;
            }
            //---------------
          } else {
            //and nonFile Columns
            if (typeof body[key] != "object") {
              //it's hard to send object([]-{}) _ sending file_won't involve_object_data
              _formData.append(key, body[key]); //and object(array specially has to be defined manually)
            }
          }
        }
        body = _formData;
      }
      //---------------------------////API_GATEWAY {{{[[[[[[[[[[[---------]]]]]]]]]]]]]]]}}} e POST/PUT
      try {
        const response =
          method === "POST"
            ? await modalApi.post(url, body, requestOptions)
            : await modalApi.put(url, body, requestOptions); // axioscreate is best work if, the method(post/put) is givennn pricissly
        console.log(url, method + "  This_Store", response);
        return await responseHandler(response)
          .then(
            (HandledRESP) => {
              return { status: true, data: HandledRESP };
            }, // Handling Friendly Errors of the response
            (e) => {
              console.log(e);
              return { status: false, data: e };
            }
          )
          .catch((e) => {
            console.log(e);
            return { status: false, data: e };
          });
      } catch (e) {
        console.log("API Response Error", e);
        return { status: false, data: e };
      }
    } else {
      try {
        const response =
          method === "GET"
            ? await modalApi.get(url, requestOptions)
            : await modalApi.delete(url, requestOptions);
        console.log(url, method + " Axios API", response);
        return await responseHandler(response)
          .then(
            (HandledRESP) => {
              return { status: true, data: HandledRESP };
            }, // Handling Friendly Errors of the response
            (e) => {
              console.log(e);
              return { status: false, data: e };
            }
          ) // the friendly errors
          .catch((e) => {
            console.log(e);
            return { status: false, data: e };
          });
      } catch (e) {
        console.log("API Response Error", e);
        return { status: false, data: e };
      }
    }
  };
}

let _okStatus = [200, 201, 202]; //
let _serviceStatus = [400, 401, 402, 403, 404, 405]; //
let _serverokStatus = [500, 501, 502, 503, 504, 505]; //
async function responseHandler(response) {
  ////((((((((RESPONSE HANDLER  [.data / .statusText]))))))))
  console.log(response, "Response Data");
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
  console.log(
    "\n Inject Headers Value as \n Model Name =",
    _model ?? "No Model Name"
  );
  var _reqHeaders = {}; //_reqHeader.value ?? {}
  _reqHeaders["Test"] = "WooW";
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
  console.log(_geolat, _geolong);
  return _reqHeaders ?? {};
}

//-------------TimeBase Query_Helper
// import { _getthismonth,_getthisyear } from "src/services/timeQuery";
// const monthDataFilter = ref({ //{  date: { $gte: "2022-01-01", $lte: "2022-12-30" },}
//   updatedAt: {
//     $gte: _getthismonth.daya,
//     $lt: _getthismonth.dayz,
//   },
// });
// const yearDataFilter = ref({ //{  date: { $gte: "2022-01-01", $lte: "2022-12-30" },}
//   updatedAt: {
//     $gte: _getthisyear.daya,
//     $lt: _getthisyear.dayz,
//   },
// });

//-------------TimeBase Query_Helper

export { requestHeader, modalApi, procApiWrap };
