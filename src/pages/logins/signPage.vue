<template>
  <q-page
    class="column flex flex-center bg-orange rounded-borders q-py-sm"
    v-if="(Loadingevent.main ?? false) || gpsStatus"
  >
    <template v-if="gpsStatus == 'permiting_gpsservice'">
      <dialogOne :isOpen="askForGPS" @emitClick0="allowGPS($event)">
        <div class="boxastyle text-orange bg-orange">
          <p class="text-white">Allow Location Access.</p>
          <div class="text-orange boxcstyle" style="max-width: 80vw">
            Would you like to
            <ul>
              <li>Get product before any one</li>
              <li>Get product near you</li>
            </ul>
            then, we need locations acccess to provide you with best exprience.
          </div>
          <div class="justify-end row">
            <q-btn flat color="green" @click="allowGPS(true)"> Allow </q-btn>
          </div>
        </div>
      </dialogOne>
    </template>
    <p v-else>
      {{ gpsStatus == "timezone" ? "Connection Error" : gpsStatus }}
    </p>
    <div>
      <q-spinner-rings style="color: lightyellow" size="10em">
      </q-spinner-rings>
    </div>

    <q-item-label
      style="color: lightyellow"
      class="fontdstyle"
      v-if="Loadingevent.main ?? false"
    >
      {{ Loadingpage.content ?? "..." }}
    </q-item-label>

    <p
      class="text-grey q-pa-sm"
      style="position: fixed; bottom: 5px; left: 5px"
    >
      Provided by mesh
    </p>
  </q-page>

  <q-page
    v-else-if="Loadingevent.continueform ?? false"
    class="flex flex-center"
  >
    <q-card class="col-auto boxbstyle">
      <q-card-actions class="text-dark">
        {{ Loadingpage.content ?? "..." }}
      </q-card-actions>
      <q-card-actions class="text-dark">
        <q-btn
          flat
          color="red"
          label="Cancel"
          @click.prevent="_this.phone = null"
        />
        <q-btn
          flat
          label="Continue..."
          @click.prevent="timerLoadevent({ loginform: 0 }, 0, '')"
        />
      </q-card-actions>
    </q-card>
  </q-page>

  <q-page persistent class="bg-white rounded-borders column" v-else>
    <div class="col flex flex-center column q-gutter-md">
      <!-- {{ getCountry() }}{{ _Country }}{{ _this.phoneCode }} {{ _debugObj }} -->
      <q-card
        style="min-width: 20%; max-width: 80vw"
        v-if="logStatus.login == 'init'"
        flat
      >
        <q-card-section class="q-pa-sm q-gutter-sm">
          <q-item-label class="text-weight-bold text-orange text-h5"
            >Continue to mesh</q-item-label
          >
          <q-item-label caption>For Trader & Buyer</q-item-label>
        </q-card-section>

        <q-card-section
          class="q-pa-md row q-gutter-sm column"
          v-if="_this.phoneCode?.length ?? false"
        >
          <q-select
            round
            outline
            color="orange"
            bottom-slots
            filled
            v-model="_this.phoneCode"
            :options="Object.values(countries)"
            :input="_validateThis('phoneCode', _this.phoneCode)"
            label="Country"
            :dense="true"
            class="col"
          >
            <template v-slot:prepend>
              <q-icon name="place" />
            </template>
          </q-select>

          <div class="row justify-evenly items-center">
            <q-icon name="phone" />+{{ _this.phoneCode[1] }}
            <input
              class="boxcstyle"
              type="Number"
              v-model="_this.phone"
              label="Phone Number"
              @input="_validateThis('phone', _this.phone)"
            />
          </div>

          <!-- <template
              v-slot:hint
              v-if="(_this?.phone ?? false) && _this.phone.length == 9"
            >
              Error Phone Format
            </template> -->
          <div class="warnMessage" v-if="_debugObj['phone']">
            {{ _debugObj["phone"] }}
          </div>
        </q-card-section>

        <div v-if="_debugObj.phone ?? false"></div>
        <q-card-section class="q-py-xs">
          <q-item-label caption>Sale & Buy </q-item-label>
        </q-card-section>

        <q-card-actions
          class="text-dark bg-orange"
          @click.prevent="_thisValidator()"
        >
          <!-- <q-btn flat label="Cancel" v-close-popup class="text-black" /> -->
          <q-btn class="fontastyle" flat label="Continue" />
        </q-card-actions>
      </q-card>
      <q-card
        style="min-width: 20%; max-width: 80vw"
        v-else-if="logStatus.login == 'create'"
        flat
      >
        <q-card-section class="q-pa-sm q-gutter-sm">
          <q-item-label class="text-weight-bold text-orange text-h5"
            >Joining mesh</q-item-label
          >
          <q-item-label caption>For Trader & Buyer</q-item-label>
        </q-card-section>

        <q-card-section
          class="q-pa-md row q-gutter-sm column"
          v-if="_this.phoneCode?.length ?? false"
        >
          <q-select
            round
            outline
            color="orange"
            bottom-slots
            filled
            v-model="_this.phoneCode"
            :options="Object.values(countries)"
            :input="_validateThis('phoneCode', _this.phoneCode)"
            label="Country"
            :dense="true"
            class="col"
          >
            <template v-slot:prepend>
              <q-icon name="place" />
            </template>
          </q-select>

          <div class="column justify-evenly items-center">
            <div>
              <q-icon name="phone" />
              <input
                class="boxcstyle"
                type="Number"
                v-model="_this.phone"
                label="Phone Number"
                @input="_validateThis('phone', _this.phone)"
              />
            </div>
            <div>
              <q-icon name="password" /> password
              <input
                class="boxcstyle"
                type="password"
                v-model="_this.password"
                label="Phone Number"
                @input="_validateThis('password', _this.password)"
              />
            </div>
          </div>
          <!-- <template
              v-slot:hint
              v-if="(_this?.phone ?? false) && _this.phone.length == 9"
            >
              Error Phone Format
            </template> -->
          <div class="warnMessage" v-if="_debugObj['phone']">
            {{ _debugObj["phone"] }}
          </div>
        </q-card-section>

        <div v-if="_debugObj.phone ?? false"></div>
        <q-card-section class="q-py-xs">
          <q-item-label caption>Sale & Buy </q-item-label>
        </q-card-section>

        <q-card-actions
          class="text-dark bg-orange"
          @click.prevent="_thisValidator()"
        >
          <!-- <q-btn flat label="Cancel" v-close-popup class="text-black" /> -->
          <q-btn class="fontastyle" flat label="Join" />
        </q-card-actions>
      </q-card>
      <q-card
        style="min-width: 20%; max-width: 80vw"
        v-else-if="logStatus.login == 'keyrequired'"
        flat
      >
        <q-card-section class="q-pa-sm q-gutter-sm">
          <q-item-label class="text-weight-bold text-orange text-h5"
            >Joining mesh</q-item-label
          >
          <q-item-label caption>For Traders Only</q-item-label>
        </q-card-section>

        <q-card-section
          class="q-pa-md row q-gutter-sm column"
          v-if="_this.phoneCode?.length ?? false"
        >
          <div class="column justify-evenly items-center">
            <div>
              <q-icon name="password" /> Log key
              <input
                class="boxcstyle"
                type="password"
                v-model="_this.enrollKey"
                label="Phone Number"
                @input="_validateThis('enrollKey', _this.enrollKey)"
              />
            </div>
          </div>
          <!-- <template
              v-slot:hint
              v-if="(_this?.phone ?? false) && _this.phone.length == 9"
            >
              Error Phone Format
            </template> -->
          <div class="warnMessage" v-if="_debugObj['phone']">
            {{ _debugObj["phone"] }}
          </div>
        </q-card-section>

        <div v-if="_debugObj.phone ?? false"></div>
        <q-card-section class="q-py-xs">
          <q-item-label caption>Contact us: +251 091232344 </q-item-label>
        </q-card-section>

        <q-card-actions
          class="text-dark bg-orange"
          @click.prevent="_thisValidator()"
        >
          <!-- <q-btn flat label="Cancel" v-close-popup class="text-black" /> -->
          <q-btn class="fontastyle" flat label="Login" />
        </q-card-actions>
      </q-card>

      <div
        class="col-auto q-pa-none row q-gutter-xs fontastyle text-grey justify-end"
      >
        <!-- <div v-if="Loadingevent.loginform ?? false">
          {{ Loadingpage.content ?? "" }}
        </div> -->
        <q-btn
          v-if="logStatus.login == 'init'"
          flat
          :dense="true"
          @click="logStatus.login = 'create'"
        >
          Create
        </q-btn>
        <q-btn v-else flat :dense="true" @click="logStatus.login = 'init'">
          Already Have Account ?
        </q-btn>
      </div>
    </div>
    <p class="text-grey q-pa-sm">Provided by mesh</p>
  </q-page>
</template>
<script setup>
import {
  ref,
  computed,
  watch,
  onUnmounted,
  onMounted,
  onBeforeMount,
} from "vue";
import axios from "axios";
import { toRaw } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { screenSize } from "src/services/utils";
import {
  getCountry,
  getState,
  getactiveService,
  countries,
} from "src/services/geotimezone";

//---------------------Login form
import { authenticatingStore } from "stores/authenticatedStore/authenticatingStore";
import { profileStore } from "stores/authenticatedStore/profileStore";
import { useRouter } from "vue-router";
import { useQuasar, useMeta } from "quasar";

import dialogOne from "src/components/dialogs/dialogOne.vue";

import _localStorage from "src/services/storeService";
import _thisPosition from "src/composables/mixins/geolocMixin";
const {
  askForGPS,
  _thislocation,
  gpsStatus,
  allowGPS,
  _initGeo,
  getCurrentPosition,
} = _thisPosition();
import useschemaValidator from "src/composables/utilServices/profileschemaValidator";
const {
  _debugObj,
  //-------
  _validateThis,
} = useschemaValidator();
// useschemaValidator
import useDebugMixin from "src/composables/mixins/debugMixin";
const {
  Loadingpage,
  Loadingevent,

  Loading,

  DoneMessage,
  KnowthisMessage,
  WarnthisMessage,
  //----------returning values
  //timerLoadpage,
  timerLoadevent,

  // timerLoad,

  timerDone,
  timerInformthis,
  timerError,
} = useDebugMixin();

const authService = authenticatingStore();
const profileService = profileStore();

//const $m = useMeta();
const metaData = {
  // sets document title
  title: "itService signing",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - LoginPage`,
  //icon:"/public/icons/asset.png",
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

const $q = useQuasar();
const router = useRouter();

//-------------UserInformations
var _this = ref({});
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

//-----------
let logStatus = ref({ login: "init", create: false });
let logButtonLabel = ref("Continue");
//_buildDataModel() ///is self-excutive or you can recall it
//--------------------------------------------------------------------UTILITIED_FUNCTIONS ( LocalStarage -- Profiling)
let createKey = "phone";
const _theService = profileService;
//ModalCrudOps
const Crud_ = {
  createData: async function () {
    let objParam = {};
    if (_this.value[createKey] == null) {
      return false;
    }
    //-----------Calling for Store Services
    return await _theService
      .createData(_this.value, objParam)
      .then((response) => {
        if (response.status ?? false) {
          return response.data;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  },
};
//--------------------------- reactive Variables

//------------------------authentications variables
async function _thisValidator() {
  let _isCompleted = Object.values(_debugObj.value).every(
    (value) => value == null
  );
  _isCompleted ? _manageStoreLogin() : "";
  return true;
}

let countLogs = ref(0);
let logKey = "phone";
var _manageStoreLogin = async function () {
  console.log(
    "\n\nFunction - _manageStoreLogin --STORE Authentication Initializing [Phone,Stored_ID]---- \n"
  );
  return await authService
    .useLogin(_this.value)
    .then(async (resp) => {
      var _userData = resp["data"] ?? false;
      console.log(`\n LoginStatus = ${resp.status} \n`);
      console.log(resp.data, Loadingevent.continueform ?? false);
      if (!(resp.status ?? false) || !_userData) {
        if (!(_this.value.phone ?? false) || logStatus.value.login == "init") {
          //   return timerLoadevent(
          //     { continueform: 0 },
          //     0,
          //     _this.value.phone
          //       ? "Create New Account ?"
          //       : "Auto Login Failed!" + (Loadingevent.continueform ?? false)
          //   );
          // logStatus.value.login = 'create';
          await timerLoadevent({ loginform: 0 }, 0, "Create New Account");
          return true;
        }
        // } else if (
        //   !(Loadingevent.continueform ?? false) &&
        //   (_this.value.phone ?? false)
        // ) {
        //   await timerLoadevent(
        //     { continueform: 0 },
        //     0,
        //     "Nor Registered, Create New ?"
        //   );
        //   return true;
        // }
        //------------1st is not loged, 2nd
        // _localStorage._clear();
        //------------Data Validations
        //----------- Loading Messages
        console.log(_this.value, "ceating new");
        logStatus.value.login = "create";
        await timerLoadevent({ loginform: 0 }, 0, "Creating New Account !");
        //------------ Create New User
        return Crud_.createData()
          .then(async (response) => {
            if (response && Object.keys(response).length) {
              logStatus.value.login = "init";
              // return timerLoadevent({ continueform: 0 }, 0, "Account Created ! Login to continue.");
              console.log(
                "\n\n</Function - _manageStoreLogin -- New Profile Created -- \n"
              );
              logButtonLabel.value = "Log to Continue";
              return timerLoadevent(
                { loginform: 0 },
                0,
                "Account Created ! Login to continue."
              );
            }
            _this.value.phone = null;
            return await timerLoadevent(
              { loginform: 0 },
              0,
              "Phone Number Error !"
            );
          })
          .catch((e) => {
            return timerLoadevent(
              { main: 0 },
              0,
              "Try Refreshing, please ?" + e
            );
          });
      }

      // /-----------if enrolled user
      if (_userData.enrollKey ?? false) {
        if (_userData.enrollKey != (_this.value.enrollKey ?? false)) {
          await timerLoadevent({ main: 5000 }, 0, "Use Correct key!");
          logStatus.value.login = "keyrequired";
          return true;
        }
      }
      //----------- Succefully Registered
      _this.value = Object.assign({}, _userData);
      console.log(`\n User Acctype = ${_this.value["acctype"]} \n`);
      //------------ Validate Acctype ?
      if (!(_this.value["acctype"] ?? false)) {
        await timerLoadevent({ main: 5000 }, 0, "Access Error, Retrying..");
        return false;
      }
      //----------- Loading Messages
      await timerLoadevent({ main: 0 }, 0, "....");
      await routeIt("Home", "Home", "saleit");
      return timerLoadevent(
        { loginform: 0 },
        0,
        "Routing Error. Check Connection Please ;"
      );
    })
    .catch(async (e) => {
      console.log("\n\n</Function - _manageStoreLogin - \n" + e);
      return await timerLoadevent({ main: 0 }, 0, "Error Connecting.." + e);
    });
};
//----------------------------------------------------------------------------- Warming UP(BIOS_Process.....POST)
let init_navObj = ref(false);
let _location = ref(null);
let _Country = ref([]); //computed(() => getCountry());
let _State = ref(null);
// let gpsStatus = ref(null);
//_thislocation
watch(gpsStatus, (_nowValue, ov) => {
  if (_nowValue == "finish" || _nowValue == null) {
    resetUserAddress();
  }
  return true;
});
watch(_thislocation, (_nowValue, ov) => {
  if (_nowValue) {
    _this.value.geolocation = _nowValue;
    _updateStorage("lat", toRaw(_nowValue.lat ?? null));
    _updateStorage("long", toRaw(_nowValue.long ?? null));
  }
  return true;
});
async function resetUserAddress() {
  //extract geoData
  console.log(
    "Setting Locations =<> GPS = ",
    Object.values(_this.value.geolocation ?? {}),
    " && timeZone = ",
    _State.value
  );
  if (!_State.value) {
    return false;
  }
  //---------------
  //------ If GPS is Active(GOOD), Else use the timezone GPSLocation
  if (!(_thislocation.value.lat ?? false)) {
    let geoLoc = (_State.value.loc ?? "").split(",");
    console.error(geoLoc, "GPS ACESS IS BLOCKED, timeZone API OPtions ....");
    if (geoLoc[1]) {
      _this.value.geolocation = { lat: geoLoc[0], long: geoLoc[1] };
    }
  } else {
    _this.value.geolocation = _thislocation.value;
  }
  //always use the timezone/apitime zone data to locationsInformations
  _this.value.phoneCode = _Country.value;
  _this.value.location["country"] = _State.value.country ?? ""; //
  _this.value.location["city"] = _State.value.city ?? ""; //
  _this.value.location["street"] = _State.value.city ?? ""; //
  _this.value.location["provinance"] = _State.value.region ?? ""; //

  //---------------------- for product tracking purpose only
  _this.value.currency =
    _Country.value[2] ?? _localStorage._get("currency", "ETB"); //
  //-------------

  //---------
  console.log(
    "Final =<> GPS = ",
    _this.value.geolocation,
    " && Locations = ",
    _this.value.location
  );
  gpsStatus.value == null ? "" : (gpsStatus.value = null);

  return true;
}

//------_clearLogs
// var positionInstance = new _thisPosition(); //constructorialize navigator class

async function _miningClientDevice() {
  console.log("Initiating the API or TimeZone Locations System");
  gpsStatus.value = "Checking.... Connection.";
  _Country.value = await getCountry();
  _State.value = await getState();
  gpsStatus.value = await getactiveService();

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(
        "Terminating the API or TimeZone Locations System, && INIT GeoData Mining using GPS or TimeZone GeoData !!! !"
      );
      _initGeo();
      resolve(true);
    }, 2000);
  });
}

//--------------------------
timerLoadevent({ main: 0 }, 0, "...");
onMounted(async () => {
  //--------------ON MOUNT
  console.log("\n\n<0 ---------Mining Client DATA ---- \n");
  await timerLoadevent({ main: 0 }, 0, "mesh "); //+ new Date().getFullYear());
  return await _miningClientDevice()
    .then(async (resp) => {
      //Extract Important data and Update the Build Basic
      console.log("\n\n<0 ---------Automatic Authentications Initiated---- \n");
      await _thisValidator();
      console.log("\n\n</0---------Automatic Authentications Terminated--- \n");
      return true; //if new Registered User Auto Login
    })
    .catch(async (e) => {
      return await timerLoadevent({ main: 0 }, 0, "Error Connecting.. " + e);
    }); //automatically grab user_data
});
onBeforeMount(async () => {
  //--------------ON MOUNT
  console.log("\n\n<---------Defaulting Profile <--this--> ---- \n");
  // await _thisDefaulting(); //Build Basic _this_default Schema ( same to columns)
  console.log(
    "\n\n---------Mining User Device Informations [Phones, GeoLocations]---- \n"
  );
});
_thisDefaulting();
//-------------------------------------------
import { iservicei_Menu } from "src/composables/constVariables";
let routeIt = async (_name = null, _path = null, _accModel = true) => {
  if (!_name || !(_this.value["acctype"] ?? false)) {
    return false;
  }
  if (iservicei_Menu[_name]._auth) {
    if (!(_this.value.enrolled ?? false)) {
      _thisOps.value = "createPermission";
      return false;
    }
  }
  // await timerLoadevent({ main: 3000 }, 3000, "Loading " + _path); //Message  [ wait 3 sec ] [reset]
  await timerLoadevent({ main: 0 }, 0, "Loading " + _name); //Message display for unlimited sec,but  wait && don reset it
  try {
    let routePath = Object.assign(
      { acctype: _this.value["acctype"][_accModel] ?? "" },
      _localStorage._reroute(_name, _path, screenSize.value == "Small")
    );
    _localStorage._set("path", toRaw(_path));
    await router.push(routePath);
    timerLoadevent({ main: 1 }, 1, "Ok, Loading " + _name); //Message display for 3sec,but don wait && reset it
    return true; //
  } catch (e) {
    console.log(
      `\n\n</Routing Functions of pathName = ${_name}  == >> ${e} == >>  \n`
    );
    timerLoadevent({ main: 3000 }, 3000, e);
    return false;
  }
};
//-------- Or Creating Role and Permission Tables...
</script>
