<template>
    <q-page class="q-px-sm q-gutter-sm column justify-center items-center bg-dark" >

 
      <div v-if="_loging__spin" >
        <q-spinner-rings
          color="blue"
          size="2em"
        />
        <q-tooltip :offset="[0, 8]">QSpinnerRings</q-tooltip>
      </div>

      <div class="q-mt-sm"  v-else>

        <div class="text-white">

        {{  _loging__message }}

        </div>
      </div>
        
    </q-page>
 
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from "vue";
  
  //---------------------Login form
  import { authenticatingStore } from "stores/authenticatedStore/authenticatingStore";
  import { profileStore } from "stores/authenticatedStore/profileStore";
  import { useRouter } from "vue-router";
  import { LocalStorage, useQuasar, useMeta } from "quasar";
  
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
var _clientData =ref({})

  //--------------------------- reactive Variables
  //const profileStore={};
  let siteLoading = ref(true);
  let message = ref("Please write you correct keys..");
  let _loging__spin = ref(false);
  var _loging__message =ref("")
  
  //------------------------authentications variables
 
  //--------Uitlities
  let nul = ref([undefined, "", null, false, "false", 0,[],{}]);
  
  //----------------------------authentications Logics
  async function storeLogin() {
  //response is applied as keyword,..when it is async_await function... but not if it really deep
  _loging__spin.value = true;
   localStorage.clear();
  //-----------------------embed dynamic userData
  //onplayRowItem.value.value.phone = _clientData.phone //__liveCord
  //onplayRowItem.value.value.__liveCord = _clientData.__liveCord //__liveCord
  //--------------
    return await authenticateService.useLogin(onplayRowItem.value).then( (response) => {

      var _isRegistered = response['_isRegistered'] //is authenticated
      //----><
      _localStorage._set("_isRegistered",_isRegistered); ////does it'has any priviledge in any model
      //-------
      var _Userdata = nul.value.includes(response["user"])  ? false   : response["user"];
      //-------------

      if (!(_isRegistered)) {
        notifyit.info("wrong keys !");
        return false;
      }
        //Extracting Meta_Datas [[  personal Infomation Logged]]
        var id = ref(_Userdata["id"]);
        var userID =ref(_Userdata["userID"]);
         //---><
        //_localStorage._set("id", String(id.value));
        _localStorage._set("userID", String(id.value));
        //--------
        var _anyAccess = ref(_Userdata['_anyAccess'])  //does  Upgrade/unUpgraded
        //----><
          _localStorage._set("_anyAccess",_anyAccess); ////does it'has any priviledge in any model
       
        //------------------------------------------->>
        //_localStorage._set("phone", _Userdata["phone"]); //['enginerring']
        //_localStorage._set("userName", _Userdata["userName"]); //['enginerring']
        //_localStorage._set("address",_Userdata["address"]); //['enginerring'] 
        //_localStorage._set("__liveCord",_Userdata["__liveCord"]); //['enginerring'] 
        //----------------------
        //-----------------Register_User_Info(Datails) into LocalStorage
        let blacklist = ["phone","address","acctype",'_isupgraded','_ispremium','_iss']; //what_to_not_Store
        for (let key in _Userdata) {
          if (blacklist.includes(key)) {
            continue;
          }
          _localStorage._set(key, _Userdata[key]); //session|local|cookies ---- removeItem,getItem,setItem
        }
     

        //--------------------------------------    
        if(_anyAccess.value){ //&& !nul.value.includes(_Userdata["acctype"])
            //----------------------
            _localStorage._set("_iss",_Userdata["_iss"]); ////does it'has any priviledge in any model
            _localStorage._set("_isupgraded", _Userdata["_isupgraded"])
            _localStorage._set("_ispremium", _Userdata["_ispremium"])
      
            var _priviledgedFor =Object.keys(_Userdata["acctype"]).length ? _Userdata["acctype"] : false;
            if(_priviledgedFor){ //superpriviledged...
                  var modalNames=Object.keys(_priviledgedFor)
                  
                  _localStorage._set("_priviledgedFor", _priviledgedFor); //['asset':[1,2,3],'raw':[2,3]]
                  _localStorage._set("_Modals", modalNames); //['asset':[1,2,3],'raw':[2,3]]
                  //--
                  _loging__message.value='HHave Nice Stay!'
                  _loging__spin.value=false
                  
                  return true
            }
            return true

        }
        else{   
          return true        
         // return router.push({path:"/play", name:'playTrends',query:{_request_id:"gpg"+'nnpriv'},params: {} } ); //is slim enter , it doesn't create loudness in router_gates 
        }
    });
}

  //--------------------------------------------------------------------UTILITIED_FUNCTIONS ( LocalStarage -- Profiling)
  //----Local Storage___
  const _localStorage = {
    _get: (_item) => {
      return $q.localStorage.getItem(_item);
    },
    _set: (_key, _item) => {
      return $q.localStorage.set(_key, _item);
    },
    _clear: (_key, _item) => {
      return $q.localStorage.clear();
    },
  };

    //---- console.log .. as non proxy_contents...
    function _log(data) {
    console.log(JSON.parse(JSON.stringify(data)));
  } 

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



async function _dataExtractionsystem(){

  onplayRowItem.value.phone="091410414240"; //
  onplayRowItem.value.phoneCode="251"; //
  onplayRowItem.value.__liveCord={
    'lat':"12323",
    'long':'2342312'
  }
  return true;
}
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
      if (Object.keys(objParam).length ==0) {
        //notifyit.warn("Incompleted Form ?");
       // return false;
      }
    } catch {
      //notifyit.warn("Refresh It Please ?");
     // return false;
    }
    
  return await _theService
    .createData(onplayRowItem.value, objParam)
      .then((response) => { //returning as [false,response]
        if (response[0]) {
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
  onMounted(async () => {  //--------------ON MOUNT
    _localStorage._clear()
   _dataExtractionsystem() //automatically grab user_data

  return await storeLogin()
    .then(async (resp) => {
      console.log(resp,'responsesssssssssrtrtssssssssssss')

      if (!resp) {
           _loging__message.value='Exploring..'
            return Crud_.createData().then((response) => {
              if(response && Object.keys(response).length){
                 _loging__message.value='success..'
                 _loging__spin.value=false
                 return router.push({path:"/play", name:'playTrends',query:{_request_id:"gpg"+'nnpriv'},params: {} } ); 
                }else{
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

      // return router.push({path:_priviledgedFor[_defaultName][1],query:{_request_id:"gpg"+'nnpriv'},params: {_accetype:_priviledgedFor[_defaultName],id:id.value,userID: userID.value,_thisusertoken: 1} } ); //is slim enter , it doesn't create loudness in router_gates 

      return router.push({path:"/play", name:'playTrends',query:{_request_id:"gpg"+'nnpriv'},params: {} } );  //for authenticated, but not upgraded_user
      //enter for already registered client_, but unupgraded
    })
    .catch((cerr) => {
      _loging__message.value='You Have Connectiity Problems..GPS/Cell..try with other device(auth)'
      _loging__spin.value=false
      console.log(cerr,'responsesssssssssssssshhhhhhhssssssssss22222')
      return false;
    });
});

var timerResponse_=ref(500)
//-- form name
async function timerResponse(period = 6000, message = "") {  //put inside code to wait for given time... as timer++
  _loging__message.value = message;
  setTimeout(() => {
    _loging__spin.value = false;
    return true;
  }, period);
}


  </script>
  