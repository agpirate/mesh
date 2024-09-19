import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import axios from "axios";
import { useLocalStorage, useSessionStorage } from "@vueuse/core";
import { toRaw } from "vue";

//const $q = useQuasar();              //{[[[[   .get(   url,{params:{},headers:{}})  ]]]]}....received as obj_req.params || response.data/staus/

const API_URL = process.env.API_IP_PORT; //const API_URL = `${import.meta.env.API_URL}/users`;
const modalApi = axios.create({ baseURL: API_URL, timeout: 7000 });
const procApiWrap = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  patch: request("PATCH"),
  delete: request("DELETE"),
};

const _suburl = "/this";
const STORE_NAME = "thisStore";
const SETTINGS_LOCAL_STORAGE_KEY = "settings";

async function _gettime() {
  return new Date();
}

function request(method) {
  return async (url, body = null, paramObj = {}) => {
    let _modelName = url.split("/")[2];
    var requestOptions = {
      method: method,
      headers: await requestHeader(_modelName),
      params: paramObj,
    };
    requestOptions.headers["Content-Type"] = "application/json";
    requestOptions.params["timestamp"] = new Date();

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
        console.log(url, method + " GET/Delete This_Store", response);
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
async function requestHeader(modelName = "") {
  //Inject Header
  var _reqHeaders = {}; //_reqHeader.value ?? {}
  _reqHeaders["Test"] = "WooW";
  //_reqHeader['Accept']= ''//text/plain, Content types that are acceptable for the response {let it default}
  //_reqHeader['Content-Type']='' //gzip, deflate
  //_reqHeaders['Accept-Encoding']=''
  //------------------------ console.log(useLocalStorage('id'),'StorageID .....')
  _reqHeaders["_issModal"] = modelName;

  let _geolat = toRaw(useLocalStorage("lat").value ?? false);
  let _geolong = toRaw(useLocalStorage("long").value ?? false);
  if (_geolat) {
    _reqHeaders["lat"] = _geolat;
    _reqHeaders["long"] = _geolong;
  }

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
import {
  _getthismonth,
  _getthisyear,
  monthDataFilter,
  yearDataFilter,
} from "src/services/timeQuery";

//////////////////////////////////////////--------------Axios Wrapper UUUUUUPPPPPPPPPPPP
export const thisStore = defineStore(STORE_NAME, () => {
  //state
  let Datas = ref([]); //
  let resultFounded = ref("");
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
  const getDatas = computed(() => Datas.value);
  const getresultFounded = computed(() => resultFounded.value);

  const getyearDatas = computed(() => yearDatas.value);
  const getmonthDatas = computed(() => monthDatas.value);
  const getloadingStatus = computed(() => loadingStatus.value);

  //action

  async function set_syncQuery(objParams) {
    syncQuery.value = objParams;
    return true;
  }
  async function set_syncLock(locker) {
    syncLock.value = locker;
    return true;
  }

  //createDataa
  async function createData(apiUrl, formData = {}, objParam = {}) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .post(apiUrl, formData, objParam)
        .then((resp) => {
          return resp;
        })
        .catch((e) => {
          return { status: false, data: e };
        }); //Handler NonFriendly Errors
    } catch (e) {
      return { status: false, data: e };
    } //Handler Supper Non_Friendly Errors
  }

  //updateData
  async function updateData(apiUrl, formData = {}, objParam = {}) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .put(apiUrl, formData, objParam)
        .then((resp) => {
          return resp;
        })
        .catch((e) => {
          return { status: false, data: e };
        }); //Handler NonFriendly Errors
    } catch (e) {
      return { status: false, data: e };
    } //Handler Supper Non_Friendly Errors
  }

  //readData
  async function readData(apiUrl) {
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .get(apiUrl + "s")
        .then((resp) => {
          return resp;
        })
        .catch((e) => {
          return { status: false, data: e };
        }); //Handler NonFriendly Errors
    } catch (e) {
      return { status: false, data: e };
    } //Handler Supper Non_Friendly Errors
  }

  //readFilterData
  async function readFData(apiUrl, objParam = null) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .get(apiUrl, null, objParam)
        .then((resp) => {
          return resp;
        })
        .catch((e) => {
          return { status: false, data: e };
        }); //Handler NonFriendly Errors
    } catch (e) {
      return { status: false, data: e };
    } //Handler Supper Non_Friendly Errors
  }

  //deleteData
  async function deleteData(apiUrl, objParam) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .delete(apiUrl, null, objParam)
        .then((resp) => {
          return resp;
        })
        .catch((e) => {
          return { status: false, data: e };
        }); //Handler NonFriendly Errors
    } catch (e) {
      return { status: false, data: e };
    } //Handler Supper Non_Friendly Errors
  }

  return {
    //-----synchronize give (DATAs)
    //asyncAnualData,
    //asyncMonthData,
    // asyncDatas,
    //------------getter(computed) porting
    //getyearDatas,
    //getmonthDatas,
    getDatas,
    resultFounded,
    getresultFounded,
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
