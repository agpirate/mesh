<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container style="" class="col-grow transparent row">
      <router-view
        :_profile="_this"
        :__permission="__permission"
        :_acctype="_this['acctype']"
        :lytCreatRow="lytCreatRow"
        :lytSearchRow="lytSearchRow"
        :_thisMedia2="_thisMedia"
        :_pageSetting="_pageSettings"
      />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeMount, watch } from "vue";
import { storeToRefs } from "pinia";
import { toRaw } from "vue";
import { useLocalStorage } from "@vueuse/core";
//import { notifyit } from "src/composables/transducer";

import { exportFile, useQuasar, useMeta } from "quasar";

//import userProfile from "src/components/userProfile.vue"
import { timeStore } from "src/stores/jstStores/serviceStore.js";
import { useRouter } from "vue-router";

import { profileStore } from "src/stores/authenticatedStore/profileStore";
//import {chatStore} from "src/stores/authenticatedStore/chatStore"
import { authenticatingStore } from "src/stores/authenticatedStore/authenticatingStore";

//---
import _localStorage from "src/services/storeService";
//var socket = new WebSocket('ws://127.0.0.1:9100');
import debugCard from "@/components/debugCards.vue";
import useDebugMixin from "@/composables/mixins/debugMixin";
const {
  Loadingpage,
  Loadingevent,

  Loading,

  DoneMessage,
  KnowthisMessage,
  WarnthisMessage,
  //----------returning values
  // timerLoadpage,
  timerLoadevent,

  timerLoad,

  timerDone,
  timerInformthis,
  timerError,
} = useDebugMixin();

import useStatusMixin from "@/composables/mixins/statusMixin";
const {
  status_Loading,
  status_DoneMessage,
  status_KnowthisMessage,
  status_WarnthisMessage,
  //----------returning values
  staus_timerLoad,
  status_timerDone,
  status_timerInformthis,
  status_timerError,
} = useStatusMixin();

import usefileMixin from "src/composables/mixins/fileserviceMixin";
var {
  _thisMedia,
  _fileAttributeName,
  //-------
  _cameraBox,
  _fileSourceFoCam,
  _fileAsSRC,
  _fileAsRaw,

  _liveFeedSRC,
  _fileAsSRCIndex,
  //---
  _cameraDevice,
  _listCameraSource,
  _selectedCameraById,
  _selectedCameraByface,
  _liveFeedRawStreaming,
  //--------
  _fileSourceFolder,
  //--------
  _fileAsSRCOps,
  _fileAsSRCOpsCall,
  //-----------
  _resetFileSource,
  //---
  // _resetfBox,
} = usefileMixin();

//--------------
const $q = useQuasar();
//-----------Store & Service

const profileService = profileStore();
//-----------
const _theService = profileService;
const authService = authenticatingStore(); //it(storeToRefs) is like computed_ reactive_variable

const timeService = timeStore(); // intializes
const router = useRouter();

//const $m = useMeta()

const metaData = {
  // sets document title
  title: "iService",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - DashBoard`,

  icon: "/public/icons/favicon-32x32.jpg",
  // JS tags
  script: {
    printJs: {
      type: "application/ld+json",
      innerHTML: `{  }`,
    },
    ldJson: {
      type: "application/ld+json",
      innerHTML: `{ }`,
    },
  },
};

useMeta(metaData);

//--------------------
//$q.dark.toggle()
//-------
var lytSearchRow = ref("");

//------variables
var leftDrawerOpen = ref(false); //hide & show sideBar
var _popUpgrader = ref(false);

var _Supports = ref(false);
var customerSupports = ref(false);
var deviceSupport = ref(false);

var lytCreatRow = ref(false);
//import CameraFeeds from "components/CameraFeeds.vue"
// let _cameraBox =ref(false)
//lytCreatRow
//-----------------------Local Varialbles
var iservicei_Menu = ref();
var showsideMenu = ref(false);
iservicei_Menu.value = {
  myStore: ["what did i bought ?", "shop", "Shop", false, "/play/playcart"],
  myService: [
    "what i'm saling ?",
    "store",
    "Service",
    false,
    "/play/playservice",
  ],
  //'saleIt':["Anything To Sale ?","photo","saleIt",false],
  //'rentIt':["Anything For Rent ?","collections_bookmark","rentIt",false],
  //'market':["Show current Market Price","assistant","marketIt",false],
  //'orderIt':["Looking Service you Like!","group","orderIt",false],
};

//-----Layout_Style & behaviors
//------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2----ModalSkeltone [ profileSchema]
//-----user Schema
// import { profileSchema } from "src/composables/schemas/profileSchemas";
import { _permission } from "src/schemas/profileSchemas";
//import { isArray } from "chart.js/dist/helpers/helpers.core";

let _thisModel = "profile";
let _profile_iss = ref(null);
var __permission = reactive(_permission ?? null);

//-------------USER PROFILE_Variables..
//===============================================-----------------------------------------
//------------- MODAL ROWs_ MANAGMENT
let _pageSettings = ref({});
_pageSettings.value["tableView"] = "main";
_pageSettings.value["currency"] = "ETB";
//------------User Settings
_pageSettings.value["language"] = 1;
_pageSettings.value["languageOptions"] = ["Tigrigna", "English"];

var _this = ref({});
let _thisOps = ref(null); //the selected row_actual_Data..as object

async function _thisDefaulting() {
  _this.value = {};
  try {
    _this.value.phone = null;
    _this.value.phoneCode = ["", ""];

    _this.value.geolocation = {};
    _this.value.geolocation = { lat: "", long: "" };

    _this.value.location = {};
    _this.value.location = { country: "", city: "", street: "" };
  } catch {}

  return true;
}
_thisDefaulting();
//===============================================-----------------------
watch(_this, async (_newV, _oldV) => {
  let _requestHeader = {};
  let _geoLoc = _newV?.["geolocation"] ?? false;
  if (_geoLoc) {
    localStorage.setItem("geo.clat", toRaw(_geoLoc.lat ?? ""));
    localStorage.setItem("geo.clong", toRaw(_geoLoc.long ?? ""));
  }
  //-----------
  profileService.set_reqHeader(_requestHeader);
  return true;
});

///-----------------------File Operations and setting  UP(Folder) vs Down(Camera)
//-------------------------------------------
let _listNavDevices = ref({});
//---------------Automatically register all visitors (Basic Infor...Phone_)
async function updateUser(_isFileCapsulated = false) {
  //updating User DAta with graphic to update
  //__thisOpsStatus.value=false
  let _fileExitance = _fileAttributeName.value ?? false;
  if (_fileExitance) {
    _this.value[_fileExitance] = _fileAsRaw.value;
    if (_fileExitance == "profile") {
      _this.value["file_"] = { files: _fileExitance }; //profile require multiple file
    } else {
      _this.value["file_"] = { file: _fileExitance }; //or cover it's (require single file)
    }
  }

  _fileAttributeName.value = null;
  return await Crud_this.updateData()
    .then((response) => {
      if (response) {
        timerDone(5000, "Item Updated", "Succefully Updated");
        _this.value = Object.assign({}, response);
        __thisOps.value = false;
      } else {
        timerDone(5000, "Error Updating", "Error Updating");
      }
      return true;
    })
    .catch((error) => {
      timerDone(5000, "Error Updating", "Error Updating");
      __thisOps.value = false;
      // __thisOpsStatus.value = false;
      return false;
    });
}

//----------
// let _thisMedia=ref(null)
let _onPlayNavGeo = ref(null);
let _location = ref(null);
class _locationDevices {
  constructor() {
    //_init_onPlayNavigator class
    ////console.error("ffffffffGeolocation is  supported by this browser.");
    try {
      // Check if geolocation is supported by the browser
      if (navigator?.mediaDevices ?? false) {
        _thisMedia.value = navigator.mediaDevices;
        Objprops__[_thisMedia] = navigator.mediaDevices;
      }
    } catch {}
    try {
      if (navigator?.geolocation ?? false) {
        _onPlayNavGeo.value = navigator.geolocation;
      }
    } catch {}
    return false;
    //this._navigatePhone()
  }
  //----------------Geo
  async _navigateGeo(params) {
    if (_onPlayNavGeo.value ?? false) {
      _onPlayNavGeo.value.watchPosition(
        (geodata) => {
          var _geolat = parseFloat(geodata.coords?.latitude ?? 0);
          var _geolong = parseFloat(geodata.coords?.longitude ?? 0);
          if (_geolat && _geolat != _this.value.geolocation.lat) {
            _this.value.geolocation = { lat: _geolat, long: _geolong };
            _location.value = { country: "", city: "", street: "" };
          }
          return this;
        },
        (error) => {
          return this;
        },
        { enableHighAccuracy: true, timeout: 100 * 60 * 24, maximumAge: 60000 }
      );
    } else {
      navigator.geolocation.value.watchPosition(
        (geodata) => {
          var _geolat = parseFloat(geodata.coords?.latitude ?? 0);
          var _geolong = parseFloat(geodata.coords?.longitude ?? 0);
          if (_geolat && _geolat != _this.value.geolocation.lat) {
            _this.value.geolocation = { lat: _geolat, long: _geolong };
            _location.value = { country: "", city: "", street: "" };
          }
          return this;
        },
        (error) => {
          return this;
        },
        { enableHighAccuracy: true, timeout: 100 * 60 * 24, maximumAge: 60000 }
      );
    }
    return this;
  }

  //---------navigate Device
  async _navigateDevice() {
    //navigate_phone_function
    if (_thisMedia.value ?? false) {
      _listNavDevices.value["getUserMedia"] =
        _thisMedia.value.getUserMedia ?? {};

      for (let mediaDevice of [
        "getUserMedia",
        "webkitGetUserMedia",
        "mozGetUserMedia",
        "msGetUserMedia",
      ]) {
        var _doesCamera = navigator[mediaDevice] ?? false;
        if (_doesCamera) {
          _listNavDevices.value[mediaDevice] = _doesCamera;
        }
      }
      //this._onPlayMediaDevice= _thisMedia.value.mediaDevices['getUserMedia']
    } else {
      // Geolocation is not supported by the browser
      ////console.error("MediaDevice is not supported by this browser.");
    }
    return this;
  }
  //------------------------
  async _enumNavigateDevice() {
    if (_thisMedia.value ?? false) {
      _thisMedia.value.enumerateDevices().then((camList) => {
        //////console.log('enumbera',camList)
        _listCameraSource.value = [];
        for (let index in camList) {
          let graphicDevice = camList[index];
          //////console.log('graphic device',graphicDevice)
          if (graphicDevice.kind === "videoinput") {
            _selectedCameraById.value = graphicDevice["deviceId"]; //default camera_id
            _listCameraSource.value.push(graphicDevice); //listing all available_camera media_device
          } else {
            //for audio input
            _selectedMicById.value = graphicDevice["deviceId"]; //default mic_id
            _listMicSource.value.push(graphicDevice); //listing all available_mic media_device
          }
        }
      });
    } else {
      ////console.error("MediaDevice is not supported by this browser.");
    }
    return this;
  }
  //------------------------------------------Operating with device
  async _operateDevice(cmd) {
    if (cmd == "pause") {
      _liveFeedRawStreaming.value.pause();
    } else if (cmd == "play") {
      _liveFeedRawStreaming.value.play();
    }
    return true;
  }
}
//  _thisMedia
//---------@@@@@@@@@@@@@@@@@@@@-------------General Functions and Service

const responsiveHxW = computed(() => ({
  //computer Screen size on gowing
  height: $q.screen.height + "px",
  width: $q.screen.width + "px",
}));

//----------------

//ModalCrudOps
//---------------notifications services
let createKey = "phone";
let updateKey = "id";
let delKey = "id";
//ModalCrudOps

const Crud_this = {
  createData: async function (objParam = {}) {
    //-------Check for Param_Requirents
    try {
      if (_this.value[createKey] == null) {
        return false;
      }
      //-----------Calling for Store Services  (_suburl, formData, objParam)
      return await _theService
        .createData(_this.value, objParam)
        .then((response) => {
          if (response.status) {
            return response.data;
          } else {
            timerLoadevent({ createData: 5000 }, 5000, "Error" + response.data);
            return false;
          }
        })
        .catch((e) => {
          timerLoadevent(
            { createData: 5000 },
            5000,
            "Error createData",
            "..." + e
          );
          return false;
        });
    } catch (e) {
      timerLoadevent({ createData: 5000 }, 5000, "Error createData", "..." + e);
      return false;
    }
  },
  //----------------------------------------------------------------
  updateData: async function (objParam = {}) {
    //-------Check for Param_Requirments
    try {
      if (_this.value[updateKey] == null) {
        return false;
      }
      //-----------Calling for Store Services
      return await _theService
        .updateData(_this.value, objParam)
        .then((response) => {
          if (response.status) {
            return response.data;
          } else {
            timerLoadevent({ updateData: 5000 }, 5000, "Error" + response.data);
            return false;
          }
        })
        .catch((e) => {
          timerLoadevent(
            { updateData: 5000 },
            5000,
            "Error updateData",
            "..." + e
          );
          return false;
        });
    } catch (e) {
      timerLoadevent({ updateData: 5000 }, 5000, "Error updateData", "..." + e);
      return false;
    }
  },

  readData: async function () {
    timerLoadevent({ readData: 0 }, 0, "Searching...");
    return await _theService
      .readData()
      .then((response) => {
        if (response.status) {
          return response.data;
        } else {
          timerLoadevent({ readData: 5000 }, 0, " Error " + response.data);
          return false;
        }
      })
      .catch((e) => {
        timerLoadevent({ readData: 5000 }, 5000, "Error Deleting", "..." + e);
        return false;
      });
  },
  //---------------------------------------------------------------
  readFData: async function (objParam = {}) {
    //-------Check for Param_Requirents
    timerLoadevent({ readFData: 0 }, 0, "Searching...");
    try {
      if (Object.keys(objParam ?? {}).length == 0) {
        return false;
      }
      //-----------Calling for Store Services
      return await _theService
        .readFData(objParam)
        .then((response) => {
          if (response.status) {
            return response.data;
          } else {
            timerLoadevent({ readFData: 5000 }, 0, " Error" + response.data);
            return false;
          }
        })
        .catch((e) => {
          timerLoadevent(
            { readFData: 5000 },
            5000,
            "Error Deleting",
            "..." + e
          );
          return false;
        });
    } catch (e) {
      timerLoadevent({ readFData: 5000 }, 5000, "Error Deleting", "..." + e);
      return false;
    }
  },

  deleteData: async function () {
    //-------Check for Param_Requirents
    timerLoadevent({ deleteData: 0 }, 0, "Searching...");
    try {
      if (_this.value[delKey] == null) {
        return false;
      }
      //-----------------
      let objParam = {};
      objParam[delKey] = _this.value[delKey];
      //---------
      return await _theService
        .deleteData(objParam)
        .then((response) => {
          if (response.status) {
            // timerDone(5000, 'Deleted', '...');
            return response.data;
          } else {
            timerLoadevent({ deleteData: 5000 }, 0, " Error" + response.data);
            return false;
          }
        })
        .catch((e) => {
          timerLoadevent(
            { deleteData: 5000 },
            5000,
            "Error Deleting",
            "..." + e
          );
          return false;
        });
    } catch {
      timerLoadevent({ deleteData: 5000 }, 5000, "Error Deleting", "..." + e);
      return false;
    }
  },
  //------------------filtering & searching for different Model
};
//--------------------------------------------------------------------UTILITIED_FUNCTIONS ( LocalStarage -- Profiling)
//_____________________________________________________Functions Definitions

//-----------------------------------Loading...process...showOFF

//-----------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---- authentication Auditors and Setup
var { getLogStatus, getLogUser, getLogisREgistered, clearlogStatus } =
  storeToRefs(authService); //is like making reactive(ref)_variable
//--------------------------------------------------------------------Profiling (CHECK AUTHENTICATIONS &&& USER INFORMATIONS)

var _manageStoreLogin = async function () {
  console.log(
    "\n\nFunction - _manageStoreLogin --STORE Authentication Initializing [Phone,Stored_ID]---- \n"
  );
  return await authService
    .useLogin(_this.value)
    .then(async (resp) => {
      console.log(`\n LoginStatus = ${resp.status} \n`);
      if (!(resp.status ?? false) || !(resp["data"] ?? false)) {
        //------------1st is not loged, 2nd
        await timerLoadevent({ main: 0 }, 5000, "Authentication Error");
        return router.push("/");
      }
      //----------- Succefully Registered
      _this.value = Object.assign({}, resp.data);
      console.log(`\n User Acctype = ${_this.value["acctype"]} \n`);
      //------------ Validate Acctype ?
      if (!(_this.value["acctype"] ?? false)) {
        await timerLoadevent({ main: 5000 }, 0, "Access Error, Retrying..");
        return router.push("/");
      }
      //----------- Loading Messages
      _profile_iss.value = _this.value["acctype"]["profile"] ?? null;
      return true;
    })
    .catch(async (e) => {
      return await timerLoadevent({ main: 0 }, 0, "Error Connecting.." + e);
    });
};

//-----------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-----------ON-Mouted Operations and Authentications
//-----------Intializing....first functions and required datas
var _navClass = new _locationDevices(); //constructorialize navigator class
var _cameraInstance = new _cameraDevice();
// let _informthis=ref(false)
timerLoadevent({ main: 0 }, 0, "Loading...");
onMounted(async () => {
  //onMounted
  // await timerLoadevent({ main: 7000 }, 0, "Please Wait..");
  // _cameraInstance = new _cameraDevice();
  console.log(`\n <==> Mining UserDevice Informations \n`);
  _cameraInstance._navigateDevice();
  console.log(
    `\n <==> Mining UserDevice Informations == _cameraInstance END ==\n`
  );
  // console.error("Navigating mediaDevice.0ww");
  //--------------ON MOUNT
  console.log(`\n <==> Mining UserDevice Informations \n`);
  await _navClass._navigateDevice();
  await _navClass._navigateGeo();
  console.log(`\n <==> Mining UserDevice Informations == _navClass END == \n`);

  return await _manageStoreLogin()
    .then(async (resp) => {
      return true;
    })
    .catch(async (e) => {
      await timerLoadevent({ main: 0 }, 5000, "scrumbled privilege detected");
      return router.push("/");
    });
});

// timerLoadpage(15000,"Loading...")
//Loadingpage.value = [{ content: "Loading..." }]; //it
onBeforeMount(async () => {
  //--------------ON MOUNT
  console.log("\n\n<---------Defaulting Profile <--this--> ---- \n");
  // await _thisDefaulting(); //Build Basic _this_default Schema ( same to columns)
  console.log(
    "\n\n---------Mining User Device Informations [Phones, GeoLocations]---- \n"
  );
});

//------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@------------Modal CRUD_OPs
</script>
