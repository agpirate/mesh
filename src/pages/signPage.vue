<template>
    <q-page class="column flex flex-center bg-orange rounded-borders q-py-sm"  v-if="_loging__spin">
      <div>
        <q-spinner-rings
        style="color:lightyellow"
          size="10em"
        > </q-spinner-rings>
      </div>
      <q-item-label style="color:lightyellow">
        {{  _loging__message }}
      </q-item-label>
      </q-page>
     
    <q-page  persistent class="bg-orange rounded-borders column"  v-else>
      
        <div class="col flex flex-center column q-gutter-md" v-if="_phoneBox">

        <q-card  class="text-weight-bold text-h4 text-white transparent q-pa-sm" hidden>

            <q-item-label>
                itService
            </q-item-label>          

          </q-card>

        <q-card style="min-width: 20%" >
            <q-card-section class="q-pa-sm q-gutter-sm">
              <q-item-label class="text-weight-bold text-orange text-h5">Create 'My Store'</q-item-label>
              <q-item-label caption>Enter Phone Number, to Join Saler and Buyer</q-item-label>
            </q-card-section>
       
            <q-card-section class="q-pa-md row  q-gutter-sm column " v-if="onplayRowItem.phoneCode?.length ?? false">      
                  <q-select rounded outline color="orange" bottom-slots filled v-model="onplayRowItem.phoneCode" :options="Object.values(countries)" label="Country" :dense='true' class="col">  
                    <template v-slot:prepend>
                      <q-icon name="place" />
                    </template>              
                  </q-select>                  
                  <q-input type='Number' rounded outlined bottom-slots v-model="onplayRowItem.phone" label="Phone Number" 
                  lazy-rules
                  :rules="[
                    val => val !== null && val !== '' || 'phone required',
                    val => val.length === 9 || '9 digits Numbers',
                  ]"
                  :prefix="'+'+onplayRowItem.phoneCode[1]+'-'" :dense='true' counter>
                    <template v-slot:hint v-if="(onplayRowItem?.phone ?? false) && onplayRowItem.phone.length == 9">
                      {{ _phoneDebug }}
                    </template>
                  </q-input>

            </q-card-section>

            <q-card-section class="q-py-xs">
              <q-item-label caption>Free to Sale & Buy</q-item-label>
            </q-card-section>

            <q-card-actions class="text-dark bg-orange">
              <q-btn flat label="Cancel" v-close-popup class="text-black"/>
              <q-btn flat label="Create Store" @click.prevent="_manageStoreLogin()" />
            </q-card-actions>
      </q-card>

        </div>
        <div class="col flex flex-center column q-gutter-md fontastyle" v-else>
          {{  _loging__message }}
        </div>
    </q-page>

  </template>
  
  <script setup>
  import { ref,computed,watch,onUnmounted, onMounted, onBeforeMount } from "vue";
  import { toRaw } from 'vue'
  import { useLocalStorage } from '@vueuse/core'
  //---------------------Login form
  import { authenticatingStore } from "stores/authenticatedStore/authenticatingStore";
  import { profileStore } from "stores/authenticatedStore/profileStore";
  import {getCountry,getState,countries } from "src/services/geotimezone"
  import { useRouter } from "vue-router";
  import {useQuasar, useMeta } from "quasar";
  
  const authService = authenticatingStore();
//var {getLogStatus} = storeToRefs(authService) //is like making reactive(ref)_variable
//Use ;= getLogStatus.value

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

  var router = useRouter();
  
  //-------------UserInformations
var onplayRowItem =ref({})
//(async  () => { })();

async function _buildOnplay (){
  onplayRowItem.value={}
  try{
  onplayRowItem.value.phone =  null
  onplayRowItem.value.phoneCode = _ccode.value ?? ['','']

  onplayRowItem.value.geolocation={}
  onplayRowItem.value.geolocation={'lat':'','long':''}

  onplayRowItem.value.location={}
  onplayRowItem.value.location ={'country':'','city':'','street':''};
  }catch{ }

  return true
}


let _ccode = ref(['',''])
_ccode = computed(() => {
  return getCountry()});

var _phoneBox =ref(false)
var _openBox = (openbox=false) =>{
if(openbox){_phoneBox.value=true; _loging__spin.value=false}
return true
}
var _phoneDebug =ref('Local Phone Format')

//_buildDataModel() ///is self-excutive or you can recall it
  //--------------------------------------------------------------------UTILITIED_FUNCTIONS ( LocalStarage -- Profiling)
let createKey = "phone";
let updateKey = "id";
let delKey = "id";

const _theService = profileService
//ModalCrudOps
const Crud_ = {
  createData: async function () {
    let objParam = {};
    objParam[createKey] = onplayRowItem.value[createKey] ?? null;
    //-------Check for Param_Requirents
    try {
      if (objParam[createKey] == null) {return false; }
    } catch {return false; }
    //-----------Calling for Store Services
  return await _theService.createData(onplayRowItem.value, objParam).then((response) => { //returning as [false,response]
        if (response[0] ?? false) {return response[1];
        } else {return false;}
      }).catch(() => {return false;});
  },
}
  //--------------------------- reactive Variables
  //const profileStore={};
  let siteLoading = ref(true);
  let _loging__spin = ref(false);
  var _loging__message =ref("")
  //------------------------authentications variables
  async function storeLogin() { 
          return await authService.useLogin({'phone':onplayRowItem.value['phone']}).then(async (response) => {
            if(response){
              var _isRegistered = response._isRegistered ?? false
              if(!(_isRegistered)){return false }            
              var user = response["user"] ?? false 
              if(user){    }
              return true
            }else{return false}
          }).catch(()=>{return false})
}

//----------------------------------------------------------------------------- Warming UP(BIOS_Process.....POST)
let _onPlayNavGeo = ref(null)
let _location=ref(null)

var _navgatorMeta = function (){
    return {
            _init: async function (){
              try{
                if(navigator?.geolocation ?? false){ _onPlayNavGeo.value = navigator.geolocation  
                    }
              }catch{  }

              return true
            },
            _navPhone: async function (){
                    let _clientPhone = null
                    onplayRowItem.value.phone = _clientPhone ?? null
                    onplayRowItem.value.phoneCode = _ccode.value ?? ['','']
                    //--------------               
                    return true
            },
            _navGeo: async function (){
              if(_onPlayNavGeo.value ?? false){
                        _onPlayNavGeo.value.watchPosition((geodata)=>{   //this will iterate for location every minutes & it's would affect reactive elements
                        var _geolat = geodata.coords?.latitude ?? false
                        if(_geolat && (_geolat != onplayRowItem.value.geolocation.lat)){
                          onplayRowItem.value.geolocation['lat'] = parseFloat(geodata.coords.latitude)// this._clientGeolocation
                          onplayRowItem.value.geolocation['long'] = parseFloat(geodata.coords.longitude)// this._clientGeolocatio
                          //check locations using coordinates and overwrite the existing locationn
                          _location.value={'country':'','city':'','street':''}
                        }
                        return this
                      },(error) => { return this    
                    },{ enableHighAccuracy: true, timeout: 1000*60*24, maximumAge: 60000 })
              }else{  
                      navigator.geolocation.value.watchPosition((geodata)=>{   
                      var _geolat = geodata.coords?.latitude ?? false

                      if(_geolat && (_geolat != onplayRowItem.value.geolocation.lat)){
                          onplayRowItem.value.geolocation['lat'] = parseFloat(geodata.coords.latitude)// this._clientGeolocation
                          onplayRowItem.value.geolocation['long'] = parseFloat(geodata.coords.longitude)// this._clientGeolocatio
                        //check locations using coordinates and overwrite the existing locationn
                        _location.value={'country':'','city':'','street':''}
                      }
                      return this
                      },(error) => { return this    
                    },{ enableHighAccuracy: true, timeout: 1000*60*24, maximumAge: 60000 })

                  }
              return true
            }
  }
}

//------_clearLogs
async function _clearLogs() {
  sessionStorage.clear();
  localStorage.clear()
  //authService.getLogStatus={'_isRegistered':false,'user':null,'cookie':'false'}
  //_localStorage._clear()
  //await authService.clearlogStatus()
  //return router.push({path:'/'});
}

var _navClass = new _navgatorMeta() //constructorialize navigator class
_navClass._init()

async function _miningClientDevice(){
  //--------reintiate_navigation)class
    await _navClass._navPhone()
    await _navClass._navGeo()
    //console.log('returing........')
    if(_location.value ?? false){
      onplayRowItem.value.location['country'] =_location.value['country'] ?? _ccode.value?.[0] // 
      onplayRowItem.value.location['city'] =_location.value['city']// 
      onplayRowItem.value.location['street'] =_location.value['street']; // 
    }else{
      onplayRowItem.value.location['country'] =_ccode.value?.[0] ?? '' // 
      onplayRowItem.value.location['city'] ='' // 
      onplayRowItem.value.location['street'] =''; // 
    }
    //--------------
    if(onplayRowItem.value.phone ?? false  ){ return true;  } //_is phone ExtractAutomatic from Device or
    else{
      let _checkPhone= toRaw(useLocalStorage('phone').value ?? null)
      let _checkId= toRaw(useLocalStorage('id').value ?? null)
      onplayRowItem.value['phone']= _checkPhone ?? false
      onplayRowItem.value['id']=_checkId ?? false

      if((_checkPhone)&&(_checkId)){return true //_is phone Extracted From Storages
      }else{ _openBox(true); return false   }
    }
}

async function _manageStoreLogin(){
  //------clearLog
      _clearLogs();
  //-----------
  let _phoneCov = parseFloat(onplayRowItem.value.phone)
  if(isNaN(_phoneCov) || (String(_phoneCov).length != 9)){
    return false
  }
  onplayRowItem.value.phone=_phoneCov
  //------------- for name[]
  _phoneBox.value=false //wait for user_input
  //---
  return await storeLogin()
    .then(async (resp) => {
       if (!resp) {
           _loging__message.value='Exploring..'
            return Crud_.createData().then(async (response) => {
              console.log(response,'Profile New Created',onplayRowItem.value.phone)
              if(response && Object.keys(response).length){
                    authService.setlogStatus(true,response,false)
                  return router.push({path:"/play/tr", name:'playTrends',query:{_request_id:"sit"+'nnpriv'},params: {} } );  //for authenticated, but not upgradeduser
                }

              _loging__message.value='Connection Error or Try With Other Phone #';
              _openBox(true); 
              return true;
            }).catch((error)=>{
               _loging__spin.value=false;
               _loging__message.value='Connection Error or Try With Other Phone #';
               _openBox(true); 
               return true;
            })

      }
      console.log(resp,'already registereduser & authenticate as client')
      _loging__spin.value=false
      return router.push({path:"/play/tr", name:'playTrends',query:{_request_id:"sit"+'nnpriv'},params: {} } );  //for authenticated, but not upgradeduser
    })
    .catch((cerr) => {
      _loging__message.value='Please Try Refresh!'+cerr
      _loging__spin.value=false
      return false;
    });
}

//-- form name
async function timerResponse(period = 15000, message = "") {  //put inside code to wait for given time... as timer++
  _loging__message.value = message;
  _loging__spin.value = true;
  ////console.log('waiting...',period)
  return setTimeout(async() => {
    ////console.log('retruring...')
    _loging__spin.value = false;
    _loging__message.value = 'Connection timeOut !';
    return true
  }, period);
}

//--------------------------
timerResponse(20000,'...itServices-'+ new Date().getFullYear())//isn't act like normal function for async and await

onMounted(async () => {  //--------------ON MOUNT
   //await _clearLogs()
   await _buildOnplay()

   return await _miningClientDevice().then(async (resp)=>{
    //console.log(onplayRowItem.value.phone ,'ManageStoreLogin()-check Phone')
    if(resp){
     _manageStoreLogin()
    }else{  } //wait for user_input and button
    return true
   }).catch(()=>{ _openBox(true); return false
   }) //automatically grab user_data
});

  </script>
  