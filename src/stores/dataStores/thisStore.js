import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import axios from "axios";
import { useLocalStorage, useSessionStorage } from "@vueuse/core";
import { toRaw } from "vue";
import { requestHeader, modalApi, procApiWrap } from "src/services/axiosApi.js";
const _apiUrl = "/saleitapi";
const _suburl = _apiUrl + "/this";
const API_URL = process.env.Client_IP_PORT + _suburl; //const API_URL = `${import.meta.env.API_URL}/users`;

//const $q = useQuasar();              //{[[[[   .get(   url,{params:{},headers:{}})  ]]]]}....received as obj_req.params || response.data/staus/

const STORE_NAME = "thisStore";
const SETTINGS_LOCAL_STORAGE_KEY = "settings";

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
