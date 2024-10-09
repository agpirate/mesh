import { defineStore } from "pinia";
import { ref, reactive, computed, handleError } from "vue";
import axios from "axios";
import { useLocalStorage, useSessionStorage } from "@vueuse/core";
import { toRaw } from "vue";
import { requestHeader, modalApi, procApiWrap } from "src/services/axiosApi.js";

const _apiUrl = "/saleitClientapi";
const _suburl = _apiUrl + "/saleitClient";
const API_URL = process.env.Client_IP_PORT + _suburl; //const API_URL = `${import.meta.env.API_URL}/users`;

const STORE_NAME = "saleitClientStore";
const SETTINGS_LOCAL_STORAGE_KEY = "settings";

async function _gettime() {
  return new Date();
}

//-------------TimeBase Query_Helper
import {
  _getthismonth,
  _getthisyear,
  monthDataFilter,
  yearDataFilter,
} from "src/services/timeQuery";
import { httpStatusCodes } from "src/composables/constVariables";

//////////////////////////////////////////--------------Axios Wrapper UUUUUUPPPPPPPPPPPP
export const saleitClientStore = defineStore(STORE_NAME, () => {
  //state
  let Datas = ref([]); //
  let status_Rows = ref("");
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
  const getstatus_Rows = computed(() => status_Rows.value);

  const getyearDatas = computed(() => yearDatas.value);
  const getmonthDatas = computed(() => monthDatas.value);
  const getloadingStatus = computed(() => loadingStatus.value);

  //action

  async function set_syncQuery(objParams) {
    status_Rows.value = "Loading..."; //for new Searching set status ='loading'
    syncQuery.value = objParams;
    // syncNew.value = objParams != syncQuery.value
    Datas.value = [];

    return true;
  }
  async function set_syncLock(locker) {
    syncLock.value = locker;
    return true;
  }

  async function asyncDatas() {
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (syncLock.value) {
      // Allow(false) or Block(true) Syncing
      // status_Rows.value = false;
      return true;
    }

    let paramObj = Object.assign({}, syncQuery.value);
    paramObj["timestamp"] = toRaw(await _gettime()); //timestamp create New Request & but could create autonomouse requests(due_ seconds updating ?)
    var requestOptions = {
      method: "GET",
      headers: await requestHeader("saleitClient"),
      params: {},
    };
    requestOptions.headers["Content-Type"] = "application/json"; //The MIME type of the body of the request (used with POST and PUT requests)
    requestOptions.params = paramObj; //{"id":paramObj["id"],"data":paramObj}; //  build axios_request of => (/get?id:12,headersOpt) or (url,{params:{k:v,},headersOpt)....& pa
    console.log("Sale it Store \n", paramObj);

    try {
      return await modalApi
        .get(API_URL, requestOptions)
        .then((response) => {
          console.log("Sale it Store \n", response.data);
          if (response.status == 200) {
            //array_Value Existed
            if (response.data.length ?? false) {
              //|| (Datas.value[0].updatedAt!== _respData[0].updatedAt)){//if has lengthDifference or firstIndex_Different push it
              let _diff = Datas.value.length - response.data.length; //has different in numbers
              if (_diff || status_Rows.value == "Loading...") {
                Datas.value = response.data;
                status_Rows.value = true;
                return true;
              } else if (status_Rows.value != "noupdates") {
              } //incoming same data  //status_Rows.value=noupdates
              status_Rows.value = true;
              return true;
            } else if (status_Rows.value != null) {
              Datas.value = [];
              status_Rows.value = null;
            } //no result  //status_Rows.value=null
          } else {
            status_Rows.value =
              httpStatusCodes[response.status] || "Unknown Status Code";
          } //no result
          return true;
        })
        .catch((e) => {
          status_Rows.value =
            httpStatusCodes[e.response.status] || "Unknown Status Code"; //null founded
          return true;
        });
    } catch (e) {
      status_Rows.value = "BadConnection";
    }
    return true;
  }

  //createDataa
  async function createData(formData = {}, objParam = {}) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .post(_suburl, formData, objParam)
        .then((resp) => {
          //console.log('creating New profile..',resp)
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
  async function updateData(formData = {}, objParam = {}) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .put(_suburl, formData, objParam)
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
  async function readData() {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .get(_suburl + "s")
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
  async function readFData(objParam = null) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .get(_suburl, null, objParam)
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
  async function deleteData(objParam) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    try {
      return await procApiWrap
        .delete(_suburl, null, objParam)
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
