import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
//import qs from "qs"; //it format any_formated(obj,array) of params into url queriess....when there is params>
//const querystring = require("node:querystring"); //querystring.parse
import setDHeaders from "src/composables/setHeaders"
import _acctype from "src/hooks/_acctype";
import { ssrAPI } from "../../srcenv";
//import { databaseAPI_URL } from "../../config";
import axios from "axios";
import { useLocalStorage,useSessionStorage } from "@vueuse/core"
import { toRaw } from 'vue'
//const $q = useQuasar();              //{[[[[   .get(   url,{params:{},headers:{}})  ]]]]}....received as obj_req.params || response.data/staus/

const API_URL = process.env.API_IP_PORT+"/api"; //const API_URL = `${import.meta.env.API_URL}/authenticatings`;
const modalApi = axios.create({ baseURL: API_URL, timeout: 7000 });

const STORE_NAME = "authenticatingStore";
const SETTINGS_LOCAL_STORAGE_KEY = "settings";

const nul = [null, undefined, false, "", [], {},NaN];
const procApiWrap = {get: request("GET"), post: request("POST"), put: request("PUT"), patch: request("PATCH"), delete: request("DELETE")};

async function _gettime (){  return new Date() }

function request(method) {
  return async (url, body = null, paramObj = {}) => {

    var requestOptions = { method: method,headers: await requestHeader(''), params: paramObj };
    requestOptions.headers['Content-Type'] ="application/json"; 
    requestOptions.params["timestamp"]  = await _gettime();

    if (body == null) {
          try {
            const response = method === "GET" ? await modalApi.get(url, requestOptions) : await modalApi.delete(url, requestOptions);
            return await responseHandler(response).then((HandledRESP) => { return [true, HandledRESP];  }, // Handling Friendly Errors of the response
                                                    (error) => {return [false,'failed to creat']; } ); // the friendly errors
          } catch (error) {
            return [false,'oooo(e)'];            
          } finally { }

    } else {  

          var _formData = new FormData()
          let tobeUpload = body['upload'] ?? false 
          if (tobeUpload) {
              requestOptions.headers['Content-Type'] ="multipart/form-data"// {'Content-Type':"multipart/form-data"}
              requestOptions.params['upload'] = tobeUpload //holding the fileName as file:__ or files:___
              //------------
              let file_ = [tobeUpload['file'],tobeUpload['files']]
              for(let key in body){ //if there is file_data duplicate all data into formData(format)...since file uploading is better as formData
                  if(file_.includes(key)){    ///if file_data embed it as ('key',_value) and if multiple file_ iterate them 
                    for(let kkey in body[key]){    //to support uploading multiple_file of sameName...
                    _formData.append(key,body[key][kkey])
                    }
                  }else{
                      if(typeof body[key] != 'object'){ //it's hard to send object([]-{}) _ sending file_won't involve_object_data
                        _formData.append(key,body[key])  //and object(array specially has to be defined manually)
                      }
                    }
              }
              body=_formData
          }

          //---------------------------////API_GATEWAY {{{[[[[[[[[[[[---------]]]]]]]]]]]]]]]}}} e POST/PUT
          try {
            const response =  method === "POST" ? await modalApi.post(url, body, requestOptions) : await modalApi.put(url, body, requestOptions); // axioscreate is best work if, the method(post/put) is givennn pricissly
            return await responseHandler(response).then((HandledRESP) => { return [true, HandledRESP]; }, // Handling Friendly Errors of the response
                                                    (error) => { return [false,error]; }); // the friendly errors
          } catch (error) {
            return [false, 'ooo(e)'];
          } finally { }
        
      
    }
  };
}

async function responseHandler(response) { ////((((((((RESPONSE HANDLER  [.data / .statusText]))))))))
  try {
    const isJson = response.headers ?.get("content-type") ?.includes("application/json"); 
    if (response.statusText === "OK") {
      let respData = response.data ?? false;
      respData['acctype']=response.headers['acctype']
      respData['token']=response.headers['token']
      //------
      let _setHeader ={}  
      _setHeader['Authorization']=  `Bearer;`+respData['token']
      _setHeader['acckey']=respData['acckey']
      _setHeader['_iss']=respData['acctype']
      _setHeader['id']=respData['id']
      _setHeader['phone']=respData['phone']
      //----------------------------------
      setDHeaders(_setHeader)  
      //---------
      return respData; 
    } else {
      if ([401, 403, 404, 505].includes(response.status)) {
      }
    }
  } catch { }
  return Promise.reject('Api Response Error');
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
//-------------RequestHeader_Helper
//--------------------------------------------Helpers
async function requestHeader(url='') {
  //Inject Header
  var _reqHeaders = {}//_reqHeader.value ?? {}
  _reqHeaders['Test']='WooW'
  //_reqHeader['Accept']= ''//text/plain, Content types that are acceptable for the response {let it default}
  //_reqHeader['Content-Type']='' //gzip, deflate
  //_reqHeaders['Accept-Encoding']=''
  //------------------------ console.log(useLocalStorage('id'),'StorageID .....')
  _reqHeaders['_issModal']='saleit'

  let _geolat = toRaw(useLocalStorage('geo.llat').value ?? false)
  let _geolong = toRaw(useLocalStorage('geo.llong').value ?? false)
  if(_geolat){
    _reqHeaders['geo.lat']=_geolat
    _reqHeaders['geo.long']=_geolong
  }

  return _reqHeaders ?? {};
}

//-------------TimeBase Query_Helper
import { _getthismonth,_getthisyear } from "src/services/timeQuery";
const monthDataFilter = ref({ //{  date: { $gte: "2022-01-01", $lte: "2022-12-30" },}
  updatedAt: {
    $gte: _getthismonth.daya,
    $lt: _getthismonth.dayz,
  },
});
const yearDataFilter = ref({ //{  date: { $gte: "2022-01-01", $lte: "2022-12-30" },}
  updatedAt: {
    $gte: _getthisyear.daya,
    $lt: _getthisyear.dayz,
  },
});


//////////////////////////////////////////--------------Axios Wrapper UUUUUUPPPPPPPPPPPP
var user =false
let getuserID =false
let getuserSession =false

//getuserID = async () => _localStorage.value.getItem("userID") ?? ''// _localStorage.value.getItem("userID") : "";
//user = async () => _localStorage.value.getItem("user") ?? ''// _localStorage.value.getItem("user") : "";

var initialState = { _isRegistered: false, user: {},cookies:'' }
  //? { _isRegistered: null, user:{},cookies:'' }
 // : { _isRegistered: null, user: {},cookies:'' };

export var authenticatingStore = defineStore(STORE_NAME, () => {
  //state
  let Datas = ref([]); //
  let DatasParam = ref({});
  let yearDatas = ref({});
  let yearDatasParam = ref({}); //
  let monthDatas = ref({}); //
  let monthDatasParam = ref({}); //
  //---------
  //---------------------------
  let logStatus = ref(initialState);
  let logUser = ref(null);
  let logisRegistered = ref(null);
  let accessType = reactive({});

  let loadingStatus = ref(false);
  let syncPeriod = ref(5000);
  //======gett Data
  let getLogStatus = computed(() => logStatus.value);
  let getLogUser = computed(() => logUser.value);
  let getLogisREgistered = computed(() => logisRegistered.value);

  let getaccessType = computed(() => {
    return accessType;
  });

  //---------------------------
  const alertI = reactive({ _isRegistered: false, sms: "" });
  const alertII = reactive({ _isRegistered: false, sms: "" });

  function set_reqHeader(_header =null) { //set from use_request or find cached data
    //logHeaders.value = _header ?? {}
  let  _reqHeaders =  {}
  //_reqHeader['Accept']= ''//text/plain, Content types that are acceptable for the response {let it default}
  //_reqHeader['Content-Type']='' //gzip, deflate
  //_reqHeaders['Accept-Encoding']=''
  //------------------------ console.log(useLocalStorage('id'),'StorageID .....')
  //console.log(Object.keys(useLocalStorage('id')),'idddddddddd log',useLocalStorage('id').value)

    return true;
  }

  //action
  async function setlogStatus(_isRegistered=null,user=null,cookies=null) { //set from use_request or find cached data
    //set user_controllable alerts

        if(_isRegistered ?? false){
          let _newisR = _isRegistered ??  (logisRegistered.value ?? false)
          //logisRegistered.value=_newisR
          logisRegistered.value = useLocalStorage('_isRegistered',_newisR)
        }else{   }

         //storage for fast usage
         if(user && Object.keys(user).length){
         let _user = user// useLocalStorage('user',user) 
         //logStatus.value.user =user
         logUser.value = useLocalStorage('user',user,{ mergeDefaults: true } ) 

         try{//--
         useLocalStorage('id',_user['id'] ?? null)
         //localStorage.setItem('phone',(user.phone ?? null))
          useLocalStorage('phone',_user['phone']  ?? null)
         //localStorage.setItem('acctype',(user.acctype ?? null))
          useLocalStorage('acctype',_user['acctype'] ?? null,{ mergeDefaults: true })
          //-----------
          useLocalStorage('geo.llat',_user['geolocation']['lat'] ?? null,{ mergeDefaults: true })
          useLocalStorage('geo.llong',_user['geolocation']['long'] ?? null,{ mergeDefaults: true });

          //------
          useSessionStorage('_iss',_user['acctype']) //-------------
          useSessionStorage('token',_user['token']) //-------------
          useSessionStorage('qw',_user['queryWeight']['1']) //-------------
          useSessionStorage('id',_user['id']) //-------------     
         }catch{ }

         }else{
          //-------store logStatus.value
          logUser.value = useLocalStorage('user',logUser.value) 
         }
    return true;
  }

  async function clearlogStatus() { // //changing storage value--> update store_values
        
         useLocalStorage('_isRegistered',null)
         useLocalStorage('user', 'null') 
         //storage for fast usage
         useLocalStorage('id',null)
          useLocalStorage('phone',null)
          useLocalStorage('_acctype',null)
          console.log('sclearLoges..........')
    return true;
  }
  ////////console.log('setLoges..........',logStatus.value)

//  setlogStatus(false,null,'austore')//reinitialize the storage values on refresh

  function setLocalSession(objParams) {
    //set user_controllable alerts
    DatasParam.value = objParams;
    //alertI.sms = message;
    return;
  }

  function set_alertI(logic, message) {
    //set user_controllable alerts
    alertI.status = logic;
    alertI.sms = message;
    return;
  }

  function set_alertII(logic, message) {
    //set user_controllable alerts
    alertII.status = logic;
    alertII.sms = message; //
    return;
  }

//----------
function ArrayHaseem (base,items)  {
  return items.some(value => base.includes(value)) ? true : false };

  const _acctype ={
    profile: {
      type: String,
       default: "client",
       role:{'client':[''],'creator':['rwx'],'admin':['rwx']},
       enum: ["client","creator","admin"],
     },
     profileMeta: {
      type: String,
       default: "client",
       role:{'client':['client','like','comment']},
       enum: ["upgraded", "client","creator","admin"], 
     },
     saleit: {
      type: String,
       default: "client",
       role:{'xrole':[],'client':['like','comment'],'upgraded':['client','like','comment'],'creatorrw':['rw'],'creator':['rwx'],'admin':['rwx']},
       enum: ["upgraded","client","creatorrw","creator","admin","xrole"],
     },
  }

let acctypeStage = ref({ //when there is Event that allow/block users to excercise all the permissions(accesstype assigned to them)
  'creator':[1,3,4,5],
  //-----
  'upgraded':[2,3],
  'client':[2,3],
  //-----------
  'admin':[1,2,3,4,5,6,7,8,10],  //outof stages_root
  })

async function wrapDataPriviledge(userData={}){
  //-----------------access computing
  var access = userData['acctype'] ?? false

  //console.log(acces,userData,'modalaccess0')
  userData['_hasAccess'] = false; 
  userData['_iss'] = {};
  userData['_acctype'] =access//{'saleit':['saleit','/dbs/sit',true,[b/list_column],[Origi_list_column],]}

  if(access && Object.keys(access).length){

      for(let keyy in access){ //for each_dataModel the user has(iterated)

        //access =
        var acces = ""
        //console.log('authentication Store...U',userData.acctype)

        if(Array.isArray(access[keyy])){ //check if the data_model allows multiple_access type 
          acces = access[keyy][0] ?? false ? access[keyy] : false // and check if the user_has any and load all
        }else{ //check if the data_model allows single type 
          acces = access[keyy] ?? false//and check if user has any access
        }

        if(acces){ //if there is any accccc?
                  //------------user_has_privileges Accesss...[there is access privileges....]
          userData['_hasAccess'] = true; 
          //------initializing_iss ['isstore','issale',.....]
          userData['_iss'][keyy]=[]
          var Modalacces = _acctype[keyy] ?? '' //the modalAccess priV

          if(typeof acces != 'object'){
              acces=[acces]
          }

          var _issuper0 = (['root','admin']).some(value => acces.includes(value)) ? 'admin' : false;
          var _issuper1 = (['registrar' , 'creator']).some(value => acces.includes(value)) ? 'creator' : false;
          var newaccess =[]
          ////////console.log(_issuper1,'net vvvvvvvvvvvvvvvvvvvv-------',acces,Modalacces,(['regAdmin' ,'regO2' ,"regCo2" ,"regC2h2", 'registrar' , 'creator' ]).some(value => acces.includes(value)) )
          var iscreator = _issuper0 ? _issuper0 : _issuper1

          if(iscreator){ //check if priviledges is columnSpecific && if mixed...extract supper_privileges...
            var nulsuper = ['regAdmin','registrar','creator','creator_rw','creator_rwx','root','admin',""," ",null,undefined].concat(acces)
           // //////console.log('net accessssssssssssssssssssUUUUUUU------------',Modalacces)
           var maccess= "";//nul.includes(Modalacces.enum) ? Modalacces.venum : Modalacces.enum
           if(Modalacces['type'] == Array){
             maccess= Modalacces.venum
           }
           
           else{ maccess=  Modalacces.enum }
           // //////console.log(maccess,'net accestype-------',acces) //file
          for (var i in maccess){          
            if(!nulsuper.includes(maccess[i])){
                newaccess.push(maccess[i]) //is superprivileged you can't access thes values
            }
          }

          userData['_iss'][keyy].push(iscreator)// log_if user is admin/root
          //userData['_isupgraded'] = true; //is upgraded
          //userData['_iscreator'] = true;//also has creator moodes
          }else{ //is_flag_powereddd
          newaccess = acces
          //--------
          } //if your are not superpriviledged

          var _iisOpts=ref({})
           _iisOpts.value['upgraded'] = computed(() => {
             return  ArrayHaseem(acces,["upgraded"]) //acces.includes("financeStatus" || 'financeApStatus');
           });
           _iisOpts.value['client'] = computed(() => {
             return  ArrayHaseem(acces,["client"])//acces.includes("financeStatus" || 'financeApStatus');
           });

           //let _accStage =''
           let  _accStage = []//isStage.concat(acctypeStage.value[sStage])
           for(let _iss in _iisOpts.value){
            _accStage.concat(acctypeStage.value[_iss])
            if(_iisOpts.value[_iss] ?? false){
              //////////console.log(keyy,"authentication store",acces,_iisOpts.value,_iss)   ...log all privileges
              userData['_iss'][keyy].push(_iss)//'saleit':['client','upgrade']
            }
          }
          userData['_iss'][keyy].push(_accStage)
          //------------------------------------
        userData._acctype[keyy] = [keyy,'/play/'+keyy,iscreator,newaccess,acces] //0-4
        //'saleit':['saleit','/db/saleit',false,[w/list_columns],[privileges_original]]
        }else{
        delete userData._acctype[keyy];// = acces
        }
      }
  }
  return userData
}

//---------------------AUTHENTICATE-----------------
let _rolingkey = "phone"; //key for authenticating.. new Data
async function useLogin(formData) {
    await clearlogStatus()

    if (!(formData[_rolingkey]) ?? true) {
    return false;
    }

    try {
        return await procApiWrap
        .post("/login",formData)
        .then( async (resp) => {
        console.log('authStoreFinal@',resp)
        if (resp[0]) {  //Good Day....Data IS comings with .data .headers .Ok(200)_staus
          let respData = resp[1]
          //let resCookie= _data['cookies'] ?? false
          //console.log('authStoreFinal@2',respData)
          await setlogStatus(true,respData,'true');
          return { _isRegistered: true,user: respData};

        } else { } 
        //await clearlogStatus()
        return  { _isRegistered: false,user:null };
        }).catch((error) => {}); //Handler NonFriendly Errors
    } catch (error) {}

    //await clearlogStatus()
    return  { _isRegistered: false,user:null};
}

//intialize..async lates_data fetching..
  return {
    getLogStatus,
    getLogisREgistered,
    getLogUser,
    //-----------
    set_reqHeader,
    setlogStatus,
    clearlogStatus,
    //asyncDatas,
    useLogin
  };
  //getter
});