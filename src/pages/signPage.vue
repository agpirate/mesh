<template>

    <q-page class="q-px-sm q-gutter-sm column justify-center items-center bg-orange"  v-if="_loging__spin">

      <div v-if="_loging__spin" >
        <q-spinner-rings
          color="blue"
          size="10em"
        />
        <q-tooltip :offset="[0, 8]">QSpinnerRings</q-tooltip>
      </div>

      <div class="q-mt-sm"  v-else>

        <div class="text-white">
              {{  _loging__message }}
        </div>
      </div>
        
      </q-page>

    <q-page v-model="_confirmPhone._dialog" persistent class="bg-orange column" v-else-if="_confirmPhone._dialog">
      
      <div class="col flex flex-center column q-gutter-md">

        <q-card  class="text-weight-bold text-h4 text-white transparent q-pa-sm" hidden>

            <q-item-label>
                itService
            </q-item-label>          

          </q-card>

        <q-card style="min-width: 350px" class="bg-dark">
        <q-card-section class="q-pa-sm q-gutter-sm">
          <q-item-label class="text-weight-bold text-orange text-h5">Create 'My Store'</q-item-label>
          <q-item-label caption>Enter Phone Number, to Join Saler and Buyer</q-item-label>
        </q-card-section>
       
        <q-card-section class="q-pa-md row  q-gutter-sm column ">      
               <q-select rounded outline color="orange" bottom-slots filled v-model="onplayRowItem.phoneCode" :options="Object.values(countries)" label="Country" :dense='true' class="col">  
                <template v-slot:prepend>
                  <q-icon name="place" />
                </template>              
              </q-select>
              
              <q-input type='Number' rounded outlined bottom-slots v-model="onplayRowItem.phone" label="Phone Number" :prefix="'+'+onplayRowItem.phoneCode[1]+'-'" :dense='true' counter>
                <template v-slot:hint>
                  {{ _phoneDebug }}
                </template>
              </q-input>

        </q-card-section>
        <q-card-section class="q-py-xs">
          <q-item-label caption>Free to Sale & Buy</q-item-label>
        </q-card-section>
        <q-card-actions class="text-dark bg-orange">
          <q-btn flat label="Cancel" v-close-popup class="text-black"/>
          <q-btn flat label="Create Store" @click="_manageStoreLogin()" />
        </q-card-actions>
      </q-card>

      <q-card class="q-py-md">

        {{  _loging__message  }}
      </q-card>

        </div>
    </q-page>


 
  </template>
  
  <script setup>
  import { ref, reactive, onMounted,onBeforeMount } from "vue";
  
  //---------------------Login form
  import { authenticatingStore } from "stores/authenticatedStore/authenticatingStore";
  import { profileStore } from "stores/authenticatedStore/profileStore";

  import {getCountry,getState,countries } from "src/services/geotimezone"
  import { useRouter } from "vue-router";
  import { LocalStorage, useQuasar, useMeta } from "quasar";
import { computed } from "vue";
  
  const authenticateService = authenticatingStore();
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
var onplayRowItem =ref({})
const _buildDataModel = () =>{
  onplayRowItem.value.geolocation={}
  onplayRowItem.value.geolocation={'lat':'','long':''}

  onplayRowItem.value.location={}
  onplayRowItem.value.location ={'country':'','city':'','street':''};

  return true
}
_buildDataModel()
  //--------------------------- reactive Variables
  //const profileStore={};
  let siteLoading = ref(true);
  let message = ref("Please write you correct keys..");
  let _loging__spin = ref(true);
  var _loging__message =ref("")
  
  //------------------------authentications variables
 
  //--------Uitlities
  let nul = ref([undefined, "", null, false, "false", 0,[],{}]);
  
  //----------------------------authentications Logics
  async function storeLogin() {

    if(onplayRowItem.value.phone ?? false){

        _loging__spin.value = true;
        //-----------------------embed dynamic userData
          return await authenticateService.useLogin(onplayRowItem.value).then( (response) => {
            var _isRegistered = response['_isRegistered'] ?? false//is authenticated
            var _Userdata = response["user"] ?? false 

            if (!(_isRegistered && _Userdata)) {
              notifyit.info("wrong keys !");
              return false;
            }
              let toStore=[['_isRegistered',true],
              ['id',_Userdata['id'] ?? null],['phone',_Userdata['phone'] ?? null],
              ['_userData',_Userdata],
              ['_hasAccess',_Userdata['_hasAccess'] ?? null],['_iss',_Userdata['_iss'] ?? null],
              ['_isupgraded',_Userdata['_isupgraded'] ?? null],['_ispremium',_Userdata['_ispremium'] ?? null],
              ['_accessPackage',_Userdata['acctype']?.length ?? null],
            ]
              for (let i = 0; i < toStore.length; i++) {
                console.log('storing',toStore[i])
                _storageClass._setstore(toStore[i][0],toStore[i][1]);
              }
              _loging__message.value='HHave Nice Stay!'
              _loging__spin.value=false
              //--------------------------------------      
              return true
          }).catch(()=>{
            return false
          })
    }
    else{      
      return false
    }

}

  //--------------------------------------------------------------------UTILITIED_FUNCTIONS ( LocalStarage -- Profiling)
  //--------------
  const loadit = {
    process: async function (notes = "wellcom", period = 3000) {
      $q.loading.show({
        message: notes,
        boxClass: "transparent text-h5 text-weight-bolder ",
        spinnerColor: "green",
      });
      // hiding in 3s
      let timer = setTimeout(() => {
        $q.loading.hide();
        siteLoading.value = false;
        timer = void 0;
        return "terminating";
      }, period);
    },
  };
  //----------------------------------------------Notifier (pos,act,notes)
  const notifyit = {
    info: (notes = "", position = "bottom-right", actions = "", period = 700) => {
      $q.notify({
        type: "info",
        message: notes,
        position,
        actions: actions
          ? [
              {
                label: actions,
                color: "black",
                handler: () => {
                  return true;
                },
              },
            ]
          : null,
        timeout: period,
        html: true,
        caption: "",
        spinner: false,
        group: "my-group", //identical messages with of same group..with show label_count..
        progress: true,
      });
    },
  };

  //----------------
let createKey = "phone";
let updateKey = "id";
let delKey = "id";

const _theService = profileService
//ModalCrudOps
const Crud_ = {
  createData: async function () {
    let objParam = {};
    objParam[createKey] = onplayRowItem.value[createKey];

    try {
      if (!onplayRowItem.value?.[createKey] ?? true) {
        notifyit.warn("Error Phone Number?");
        return false;
      }
    } catch {
       notifyit.warn("Refresh It Please ?");
       return false;
    }
    console.log(onplayRowItem.value,'creating new')
  return await _theService
    .createData(onplayRowItem.value, objParam)
      .then((response) => { //returning as [false,response]
        if (response[0] ?? false) {
          return response[1];
        } else {
          //notifyit.warn("Error ! .." + response[1]);
          return false;
        }
      })
      .catch(() => {
        //notifyit.info("Try to reconnect...");
        return false;
      });
  },
}


//------------------------------------------------------------------------------ Warming UP(BIOS_Process.....POST)
var _confirmPhone=ref({
  _dialog:false,
  _phone:0,
  _phoneCode:['',''],
})

let _ccode = ref(null)
_ccode = computed(() => {
  return getCountry()});

let _onPlayNavGeo = ref(null)
var _navgatorMeta = function (){
    return {
            _init: async function (){
              try{
                if(navigator?.geolocation ?? false){     
                      _onPlayNavGeo.value = navigator.geolocation  
                      console.log(_onPlayNavGeo.value,'navigat....')       
                    }
              }catch{  }
              return true
            },
            _navPhone: async function (){
                    let _clientPhone = null
                    onplayRowItem.value.phone = _clientPhone ?? null
                    onplayRowItem.value.phoneCode = _ccode.value ?? ['','']
                    onplayRowItem.value.location ={'country':_ccode.value?.[0] ?? '','city':'','street':''}; // 
                    return true
            },
            _navGeo: async function (){
              if(_onPlayNavGeo.value ?? false){
                        _onPlayNavGeo.value.watchPosition((geodata)=>{   
                        if(geodata.coords.latitude != onplayRowItem.value.geolocation.lat){
                          onplayRowItem.value.geolocation['lat'] = geodata.coords.latitude// this._clientGeolocation
                          onplayRowItem.value.geolocation['long'] = geodata.coords.longitude// this._clientGeolocatio
                        }
                        console.error("Error getting user location:", geodata);
                        return this
                      },(error) => {  // Handle errors, e.g. user denied location sharing permissions
                        console.error("Error getting user location:", error);
                        return this    
                    },{ enableHighAccuracy: true, timeout: 1000*60*24, maximumAge: 60000 })
              }else{  
                navigator.geolocation.value.watchPosition((geodata)=>{   
                        if(geodata.coords.latitude != onplayRowItem.value.geolocation.lat){
                          
                          onplayRowItem.value.geolocation['lat'] = geodata.coords.latitude// this._clientGeolocation
                          onplayRowItem.value.geolocation['long'] = geodata.coords.longitude// this._clientGeolocatio
                        }
                        console.error("Error getting user location:", geodata);
                        return this
                      },(error) => {  // Handle errors, e.g. user denied location sharing permissions
                        console.error("Error getting user location:", error);
                        return this    
                    },{ enableHighAccuracy: true, timeout: 1000*60*24, maximumAge: 60000 })

                  }
              return true
            }
  }
}

var _storageMeta = function (){
  return {
    _storageapi : $q.localStorage,
    _getstore : function (_item) {
      return this._storageapi.getItem(_item);
    },
    _setstore : function (_key, _item) {
      return this._storageapi.set(_key, _item);
    },
    _clearstore : function (_key, _item)  {
      return this._storageapi.clear();
    }

  }
}

var _navClass = new _navgatorMeta() //constructorialize navigator class
_navClass._init()
var _storageClass =new _storageMeta() //constructorialize stre class
//var _clientCcode=ref(getCountry() ? getCountry() : ['',''])

async function _miningClientDevice(){
  //--------reintiate_navigation)class
    await _navClass._navPhone()
    await _navClass._navGeo()

    if(onplayRowItem.value.phone ?? false  ){ //ask for user to enter phone
      return true;
    }else{
      let _checkstore= _storageClass._getstore('phone') ?? false
      if(_checkstore){
            onplayRowItem.value.phone = _checkstore
            return true
      }else{
        _confirmPhone.value._dialog=true //wait for user_input
        _loging__spin.value=false

      }
      return false
    }

    console.log('waitingooooooooooo')
  //-----------------------------------re intiate_class_computing
  
}

onMounted(async () => {
})
onBeforeMount(async () => {  //--------------ON MOUNT

    console.log('New registered_user & authenticate as client',onplayRowItem.value)
    //---------constructorialize onplayrowItem
    //_localStorage._clear()
   return await _miningClientDevice().then(async (resp)=>{
    if(resp){
     _manageStoreLogin()
    }
    else{  } //wait for user_input and button
    return true
   }) //automatically grab user_data
});

async function _manageStoreLogin(){
  _confirmPhone.value._dialog=false //wait for user_input
  //---------
  return await storeLogin()
    .then(async (resp) => {
       if (!resp) {
           _loging__message.value='Exploring..'
    
            return Crud_.createData().then((response) => {
            console.log('New registered_user & authenticate as RRRRRRRRr',onplayRowItem.value)

              if(response && Object.keys(response).length){
                 _loging__message.value='success..'
                 _loging__spin.value=false
                 //------then reauthenticate
                 console.log(response,'New registered_user & authenticate as client')
                //----><
                let toStore=[['_isRegistered',true],['id',response['id']],['phone',response['phone']],['_userData',response]]
                  for (let i = 0; i < toStore.length; i++) {
                    _storageClass._setstore(toStore[i][0],toStore[i][1]);
                  }
                    return router.push({path:"/play", name:'playTrends',query:{_request_id:"sit"+'nnpriv'},params: {} } );  //for authenticated, but not upgraded_user
                }else{
                  //there is problem with that number on server/dbs
                _loging__message.value='You Have Connectiity Problems..GPS/Cell..refresh it please'
              }
              _loging__spin.value=false
              return router.push({path:"/",name:'sign' } ); 
            }).catch((error)=>{
           _loging__message.value='You Have Connectiity Problems..GPS/Cell..try with other device(creating)'
           _loging__spin.value=false
            return true;
            })
      }
      console.log(resp,'already registered_user & authenticate as client')
      router.push({path:"/play", name:'playTrends',query:{_request_id:"sit"+'nnpriv'},params: {} } );  //for authenticated, but not upgraded_user
    })
    .catch((cerr) => {
      _loging__message.value='You Have Connectiity Problems..GPS/Cell..try with other device(auth)'
      _loging__spin.value=false
      return false;
    });
}

//-- form name
async function timerResponse(period = 15000, message = "") {  //put inside code to wait for given time... as timer++
  _loging__message.value = message;
  return setTimeout(() => {
    _loging__spin.value = false;
    return true;
  }, 8000);
}

  </script>
  