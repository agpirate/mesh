import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import axios from "axios";
import { useLocalStorage, useSessionStorage } from "@vueuse/core";
import { toRaw } from "vue";

//const $q = useQuasar();              //{[[[[   .get(   url,{params:{},headers:{}})  ]]]]}....received as obj_req.params || response.data/staus/

const API_URL = process.env.Client_IP_PORT; //+"/profileapi"; //const API_URL = `${import.meta.env.API_URL}/users`;
const modalApi = axios.create({ baseURL: API_URL, timeout: 7000 });
const procApiWrap = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  patch: request("PATCH"),
  delete: request("DELETE"),
};

const _suburl = "/profile";
const STORE_NAME = "genapiStore";

async function _gettime() {
  return new Date();
}

function request(method) {
  return async (url, body = null, paramObj = {}) => {
    var requestOptions = {
      method: method,
      headers: await requestHeader(""),
      params: paramObj,
    };
    requestOptions.headers["Content-Type"] = "application/json";
    requestOptions.params["timestamp"] = await _gettime();

    if (body != null) {
      var _formData = new FormData();
      let tobeUpload = body["upload"] ?? false;
      if (tobeUpload) {
        requestOptions.headers["Content-Type"] = "multipart/form-data"; // {'Content-Type':"multipart/form-data"}
        requestOptions.params["upload"] = tobeUpload; //holding the fileName as file:__ or files:___
        //------------
        let file_ = [tobeUpload["file"], tobeUpload["files"]];
        for (let key in body) {
          //if there is file_data duplicate all data into formData(format)...since file uploading is better as formData
          if (file_.includes(key)) {
            ///if file_data embed it as ('key',_value) and if multiple file_ iterate them
            for (let kkey in body[key]) {
              //to support uploading multiple_file of sameName...
              _formData.append(key, body[key][kkey]);
            }
          } else {
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
        return await responseHandler(response).then(
          (HandledRESP) => {
            return [true, HandledRESP];
          }, // Handling Friendly Errors of the response
          (error) => {
            return [false, error];
          }
        ); // the friendly errors
      } catch (error) {
        return [false, "ooo(e)"];
      } finally {
      }
    } else {
      try {
        const response =
          method === "GET"
            ? await modalApi.get(url, requestOptions)
            : await modalApi.delete(url, requestOptions);
        return await responseHandler(response).then(
          (HandledRESP) => {
            return [true, HandledRESP];
          }, // Handling Friendly Errors of the response
          (error) => {
            return [false, "failed to creat"];
          }
        ); // the friendly errors
      } catch (error) {
        return [false, "oooo(e)"];
      } finally {
      }
    }
  };
}

async function responseHandler(response) {
  ////((((((((RESPONSE HANDLER  [.data / .statusText]))))))))
  try {
    const isJson = response.headers
      ?.get("content-type")
      ?.includes("application/json"); //res.headers['content-type']; :- if application/json(extract json file from res.data)
    let data = response.data ?? false;
    const error = (data && data.msg) || response.status;
    console.log("genStore@", response.status, data);
    if (response.statusText === "OK" && data) {
      return response["data"];
    } else {
      if ([401, 403, 404, 505].includes(response.status)) {
      }
    }
  } catch {}
  return Promise.reject("Api Response Error");
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
//--------------------------------------------Helpers
async function requestHeader(url = "") {
  //Inject Header
  var _reqHeaders = {}; //_reqHeader.value ?? {}
  _reqHeaders["Test"] = "WooW";
  //_reqHeader['Accept']= ''//text/plain, Content types that are acceptable for the response {let it default}
  //_reqHeader['Content-Type']='' //gzip, deflate
  //_reqHeaders['Accept-Encoding']=''
  //------------------------ console.log(useLocalStorage('id'),'StorageID .....')
  //_reqHeaders['_issModal']='saleit'

  let _geolat = toRaw(useLocalStorage("geo.lat").value ?? false);
  let _geolong = toRaw(useLocalStorage("geo.long").value ?? false);
  if (_geolat) {
    _reqHeaders["geo.lat"] = _geolat;
    _reqHeaders["geo.long"] = _geolong;
  }

  return _reqHeaders ?? {};
}
//////////////////////////////////////////--------------Axios Wrapper UUUUUUPPPPPPPPPPPP

let getuserID = async () =>
  process.browser ? localStorage.getItem("userID") : "";

export const genapiStore = defineStore(STORE_NAME, () => {
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

  //action
  function set_reqHeader(_header = null) {
    //set from use_request or find cached data
    //logHeaders.value = _header ?? {}
    //_reqHeader.value=_header ?? {}
    return true;
  }

  const getFDatas = (filterOps) => {
    yearDatas.value;
    return "";
  };
  const getalert = {
    alertI: computed(() => alertI),
    alertII: computed(() => alertII),
  };
  //action
  async function readData(modalUrl = "") {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .get(modalUrl + "s")
        .then((resp) => {
          if (resp[0] && resp[1].length) {
            try {
              return resp[1];
            } catch {}
          } else {
          }
          return false;
        })
        .catch((error) => {
          return false;
        }); //Handler NonFriendly Errors
    } catch (error) {} //Handler Supper Non_Friendly Errors
    return false;
  }

  //readFilterData
  async function readFData(modalUrl = "", objParam = null) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .get(modalUrl, null, objParam)
        .then((resp) => {
          if (resp[0] && resp[1].length) {
            try {
              return resp[1];
            } catch {}
          } else {
          }
          return false;
        })
        .catch((error) => {
          return false;
        }); //Handler NonFriendly Errors
    } catch (error) {} //Handler Supper Non_Friendly Errors
    return false;
  }

  return {
    //-----synchronize give (DATAs)
    //--------------actions porting
    set_reqHeader,
    //------------
    readData,
    readFData,
  };
});
