<template id="full-page" >
  <!-----------------------------Dialog Schema Form-----START--->
  <q-dialog v-model="__thisBox" v-if="_rolesColumns.length"
    transition-show="scale" transition-hide="scale"
    style="background: rgba(73, 255, 1, 0.342); border: 15px solid rgb(0, 0, 117)"
    persistent
  >
  <mainForm inputColor='white' :_blocedColumns=_blocedColumns :_rolesColumns=_rolesColumns :_this=_this :_thisDefault=_thisDefault :__thisOps=__thisOps 
  @close="__thisBox = $event" @update="Update_this()" @create="Create_this()"
  />

  </q-dialog>

  <dialogOne :isOpen="confirmObj" @emitClick0="confirmObj = $event">

    <confirmButton @confirmButton="confirmObj"
    :header=confirmMessage
    title="Yes" textcolor="black" background="green"
    title2="No" textcolor2="green" background2="red"/>

</dialogOne>

<q-dialog v-model="__setRole" 
    transition-show="scale" transition-hide="scale"
    style="background: rgba(73, 255, 1, 0.342); border: 15px solid rgb(0, 0, 117)"
    persistent
  >

  <div class="fontdstyle text-white column q-gutter-sm q-pa-sm">
        <div> Changing User Role & Permission </div>
        <div class="fontcstyle text-black">
          Select New RoleName
        </div>
        <div>
          <q-select
                    style="min-width: 7vw"
                    color="secondary"
                    outlined
                    dense
                    v-model="_this.group"
                    :options=" group.enum"
                    single
                    use-chips
                    stack-label
                    label-color="black"
                    class="col  text-weight-bold"
                  >
                </q-select>
        </div>
              <div class="row q-gutter-sm">
                 <q-btn label="confirm" @click="Update_this('updateRole')" />
                 <q-btn label="Cancel" color="red" @click="__setRole =false"/>
              </div>
      </div>
</q-dialog>

  <!-----------------------------Dialog Schema Form---END-->

  <div class="col row q-pa-xs q-gutter-xs row" style="height: 90vh">
    <div style="width:10vw">

    </div>
    <div  class="col column rounded q-pa-sm" style="height: 90vh" v-if="_pageSettings.vw_i"
    >  
   
      <q-card class="col dark bordered column q-pa-none q-ma-none">

      <q-expansion-item :label="_thisModel+ ' ' + 'More ...'"
      class="shadow-1 overflow-hidden"
      style="border-radius: 5px;text-transform: capitalize;"
      header-class="text-black-10 text-blue"
      expand-icon-class="text-blue"
      :dense="true"
    >
        <q-card-section class="col-auto row" style="text-transform: capitalize;">
          <div class="col text-bold">
            DashBoard Monitor @ {{ _thisModel }}
          </div>
          <div class="q-gutter-xs row items-top col" >
            <q-list class="row q-gutter-xs">
              <q-item-label class="text-bold text-green"
                >Access Privilges:-
              </q-item-label>
              <q-item-label
                class=" text-red-10" 
              >
                {{ _this_acctype?.group ?? '' }}:
              </q-item-label>
            </q-list>
          </div>

        </q-card-section>

    </q-expansion-item>


        <q-card-section
          class="q-pa-none col column bordered wrap scroll bg-white"
        >
          <!----------------------------------------- Table View...-->
          <div class="col row" v-if="Object.keys(_this_acctype ?? {}).length">
            <q-table color="white"
              class="col text-md text-weight-bold sticky-table transparent"
              :dense="true"
              :rows="_this_Rows"
              :columns="columns"

              row-key="id" 
              rowIndex="true"

              :selected-rows-label="getSelectedString"
              selection="multiple"

              
              v-model:selected="selected"
              @update:selected="updateSelected"

              :filterMethod="_thisFiltering"
              :filter="_thisfilter"
      
              :visible-columns="visibleColumns"
              no-data-label="Items doesn't Founded !"
           
            >
             
              <template v-slot:top-left>
                <div class=" row q-gutter-sm" style="font-family:Ubuntu;font-weight:bolder">
                      <div class="q-gutter-xs row" v-if="_this_acctype.capability ?? false">
                              
                                <q-btn
                                  dense
                                  outline
                                  class="col-auto"
                                  :label="_thisModel+' Managment'"
                                />
                                <q-btn
                                  dense
                                  color="secondary"
                                  class=""
                                  :label="'ADD  ' + _thisModel"
                                  @click="__thisBox_Dialog(null)"
                                  v-if="_this_acctype.capability[0] != '0'"
                                ></q-btn>
                              </div>

                      <div class="col row q-gutter-sm" style="border-radius: 5px;">
                      <div>   Days Filter : </div>
                        <q-range
                          class="q-mt-none"
                          v-model="filterDays"
                          :color="cp[Math.floor(Math.random() * 6) + 1]"
                          markers

                          :min="1"
                          :max="10"
                          :inner-min="2"
                          :inner-max="8"

                          marker-labels
                          switch-marker-labels-side
                          style="width:20vw"
                        >
                <template >
                  
                  <div
                    v-for="val in 10"
                    :key="val"
                style="width:20vw"
                  >{{ val }}</div>


                </template>
                        </q-range>

                  
                      </div>
                </div>
               
               

              </template>


              <template v-slot:top-right>
               
                <div class="col-3 q-mx-sm">
                  <q-input
                    standout="bg-green"
                   
                    style="min-width: 7vw;max-width:13vw;background: rgba(255, 255, 255, 0.589);border-radius: 5px;"
                    debounce="400"
                    color="black"
                    v-model="search"
                    label="Search"
                    stack-label
                    :dense="true"
                  >
                    <template v-slot:append>
                      <q-icon name="search"  />
                    </template>
                  </q-input>
                </div>
              </template>

              <template #header-cell="props">
                <q-th
                  style="text-align: left;text-transform: capitalize;"
                  class=""
                  :props="props"
                  ><!--q-icon name="lock_open" size="1.5em" /-->
                  {{
                    typeof props.col.label === "string"
                      ? props.col.label
                      : " "
            }}  
                </q-th>
              </template>

              <template v-slot:body="props" >
               
<!-- {{ _this_Rows}}  -->
                <q-tr
                  :props="props"
                  class="cursor-pointer text-bold text-weight-bolder" v-if="Object.keys(props.row).length"
                >
                <q-tooltip class="bg-white " :offset="[10, 10]">
         
                  {{props.row['_stage_']}}
                 
               </q-tooltip>
                  <!------------------ iterating _ body cell-->
                  <q-td auto-width>
                    <q-toggle dense v-model="props.selected" />
                  </q-td>

                  <td
                    :props="props"
                    style="font-size: 0.6em; text-align: justify"
                    class="col  text-bold text-center fontastyle"
                    :class="
                      object.name == 'name'
                        ? 'text-center text-weight-bolder'
                        : 'text-center '
                    "
                    v-for="object in props.cols"
                    :key="object.name"

                    
                  >
                 
                    <!-- is it single valued //// string or array of enum or .......-->
                    <template v-if="object.schema ?? false">
                        <div
                          v-if="object.schema.type ?? false"
                          >
                        
                          <!-- check if the object has type:"value" .. for string/array-->
                          <div v-if="object.name != 'actions'" class="text-black;fontastyle">
                            <q-badge v-if="object.name === 'gmStatus'" >
                                    <Label :class="props.row['gmStatus'] ? 'bg-green' : 'bg-red'"> &nbsp; </Label>
                            </q-badge>

                            <div  v-else class="fontbstyle" style="font-size:0.7rem">
                              <q-card  flat bordered   v-if="'textarea' in Object.keys(object.schema ?? {})"     :dense="true"  >

                                        <q-badge v-if="props.row[object.name] ?? false">
                                          <div v-html="props.row[object.name]"></div>
                                        </q-badge>

                                        <q-badge style="background:red" v-else> </q-badge>

                              </q-card>
                              
                              <q-card flat  bordered v-else-if="(['r_Time','d_Time']).includes(object.name)" :dense="true"
                              >
                                        <q-badge v-if="props.row[object.name] ?? false">
                                        {{ props.row[object.name].split('T')[1] }}
                                        </q-badge>
                                        <q-badge style="background:red" v-else> </q-badge>

                              </q-card>

                              <div v-else-if="props.row[object.name] ?? false"> 
                                {{ props.row[object.name] }} 
                              </div>
                            </div>

                          </div>

                          <div class="row q-gutter-xs text-dark" v-else-if="_this_acctype ?? false"  >  
                            <template v-if="_this_acctype.capability != '00000'">
                              <q-btn
                                color="blue"
                                label="Update"
                                @click="__thisBox_Dialog(props.rowIndex)"
                                class="fontastyle"

                                no-caps
                              v-if="_this_acctype.capability[1] != '0' && _this_acctype.accstage.includes(props.row._stage_)"
                              />
                              <q-btn
                                color="red-7"
                                label="Delete"
                                @click="_this_ActiveOperation._delRow(null,props.rowIndex,props.key)"
                                class="fontastyle"

                                :dense="true"
                              v-if="_this_acctype.capability[2] != '0' && _this_acctype.accstage.includes(props.row._stage_)"
                                no-caps
                              />
                              <q-btn
                                color="green"
                                label="Role"
                                @click="__thisBox_Dialog(props.rowIndex,'group')"
                                class="fontastyle"

                                :dense="true"
                                v-if="_this_acctype.capability[2] != '0' && _this_acctype.accstage.includes(props.row._stage_)"
                                no-caps
                              />
                            </template>
            
                          </div>

                        </div>


                        <div
                          v-else-if="Array.isArray(object.schema)"
                          color="grey-4"
                          text-color="black"
                        >
                                <q-badge v-if="props.row[object.name] ??false"
                                  
                                  >
                                    {{ props.row[object.name] }}
                                  </q-badge>
                              <q-badge style="background:red" v-else>

                              </q-badge>

                          
                            </div>

                        <div
                          v-else-if="Object.keys(object['schema']).length"
                          class=" text-primary row q-gutter-xs col-auto"
                        
                          :color="
                            props.row.status == 'Active'
                              ? 'green'
                              : props.row.status == 'Disable'
                              ? 'red'
                              : 'grey'
                          "
                          text-color="primary"
                        >
                          <!--- else it is objects...-->
                          <q-list
                            v-for="(columns, ky) in props.row[object.name]"
                            :key="ky"
                            class="column q-gutter-xs col-auto" style="font-size:0.7rem"
                          >
                            <q-item
                              clickable
                              v-ripple
                              class="rounded-borders col-auto row q-pa-none q-gutter-xs"
                              :class="$q.dark.isActive ? 'bg-red' : 'bg-white'"
                              v-if="'type' in object['schema'][ky]"
                              dense
                            >
                              <q-item-section
                                class="col-auto q-gutter-xs q-pa-none"
                              >
                                <q-item-label class="col-auto q-pa-none">
                                  {{ ky }}
                                  <q-badge v-if="columns ?? false"
                                    
                                  >
                                    {{ columns }}
                                  </q-badge>

                                  <q-badge style="background:red" v-else> </q-badge>
                                </q-item-label>
                              </q-item-section>

                              <q-item-section side> . </q-item-section>
                            </q-item>
                          </q-list>
                        </div>
                  </template>

                  </td>
                  <!------Ending------------ iterating _ body cell-->
                </q-tr>
              </template>

              <!----------------- top right utilities -->
            </q-table>

            <!------------------- Edit_/Add form box-->

            <!------------------- View form box-->
          </div>

          <!-- Table View ............Ending...-->
        </q-card-section>

      </q-card>
    </div>

    <!--- Profiling...-->
    <!----------------------------------VISUALITH-->
  </div>

</template>

<script setup>
//_____________________________________________Modules Definitions
import mainForm from "src/components/mainForm.vue"
// import BChart from "src/components/visualith/BChart.vue";
//-------------------------------------------------------------Importing System Modules
import { ref, reactive, computed, onMounted,onUnmounted, onBeforeMount, watch } from "vue";
import {  useQuasar, useMeta } from "quasar";

import _localStorage from "src/services/storeService"

//import print from 'print-js';
import { useRouter, useRoute } from "vue-router";
//import { storeToRefs } from "pinia";
// import  {_isnull,_isempty,_isequ,_isgte,_islte,_isbtn} from "src/composables/validators" 
import  {cp,
    _createTitle,_updateTitle,_readTitle,_deleteTitle,
    } from "src/composables/constVariables"

import {_startofthisYear,_endofthisYear,
  _startofthisMonth,_endofthisMonth } from "src/composables/utilServices/dateformats"


import { profileStore } from "stores/authenticatedStore/profileStore"; //empy Store ( Main Store)
import { thisStore } from "stores/dataStores/thisStore"; //Asset Store ( Main Store)
// import { genapiStore } from "src/stores/jstStores/genapiStore";

import { profileSchema } from "src/composables/schemas/profileSchemas";

import statusCard from "src/components/statusCards.vue"
import confirmButton from "src/components/buttons/confirmButton.vue"
let confirmObj = ref(null);
let confirmMessage =ref('Are You Sure ?')

import dialogOne from "src/components/dialogs/dialogOne.vue"
const status_thisDetail = ref(null);

import useThisMixin from "src/composables/thisMixin"
var { 
  _this_Rows,
  _this_Details,

        columns,
      _this_Query,
      _this_RowsStatus,
      //-----------//-- returning values
      _thisDefault,
      _this,
      //----------//-- settings
      _is_thisOwner,
       _is_this_netPrice ,
       _is_this_open ,
      // __thisBox_CDialog,
      __thisBox,
      //----------//-- 
      __thisIndex,
      __thisOps,
      __thisOpsStatus,
      //---------//-- functions
      // Reset_this,
      //====================
      __this_foreignBox ,
      //--------
      __this_foreignBoxIndex ,
      __this_foreignBoxOps ,
      __this_foreignBoxOpsStatus ,
      __this_foreignBoxsubOps ,
      //---
      // Reset_this_foreign,
      // __thisBox_UDialog,
      // Reset_this,

} = useThisMixin()

import debugCard from "@/components/debugCards.vue";
import useDebugMixin from "@/composables/debugMixin";
const { 
  Loadingpage,
      Loadingevent,
      Loading,

      DoneMessage,
      KnowthisMessage,
      WarnthisMessage,
      //----------returning values
      timerLoadpage,
      timerLoadevent,
      timerLoad,

      timerDone,
      timerInformthis,
      timerError
} = useDebugMixin()

import useStatusMixin from "src/composables/statusMixin"
const { 
  status_Loading,
      status_DoneMessage,
      status_KnowthisMessage,
      status_WarnthisMessage,
      //----------returning values
      staus_timerLoad,
      status_timerDone,
      status_timerInformthis,
      status_timerError
} = useStatusMixin()

import useDefaulMixin from "src/composables/myMixin"
// Import the mixin
// Use the mixin
let {
  count,
  //------------
      //----------returning values
      _allColumnNames,
      _rolesColumns,
      visibleColumns,

      //---------settings
      Objprops_,
      _thisModel,
      _this_acctype,
      _this_Schema,

      lockedColumns,
      invisibleColumns,
      //----------------functions
      _allColumnName,
      _rolesColumn,
      visibleColumn,

      _thisModels,
      // modal_iss,
      //------preparing the main default and table_design
      _this_Defaulting,

      //------preparing the foreign default and table_design
      foreign_Columns,
      _this_foreignDefaulting,

      //------
      visible_clientColumns,      
} = useDefaulMixin();

import {useAssetFilter} from "src/composables/filters/profilefilter"
var {
  _enableRowFilter, _thisFiltering
} = useAssetFilter()

const $q = useQuasar();
//const $m = useMeta();
const router = useRouter();

const metaData = {
  // sets document title
  title: "Admin DB Managment",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - DashBoard`,
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
//-------------------------------------------------------------Importing System Modules--------------END
//-------------------------------------------------------------Importing Defined Modules
//===-----_--------THE MODEL/ MAIN_DATA....
_thisModel.value = "profile"; // the Vue_Page_DataModel (Listing Collection Name)
var _thisModelHeader = ref(" Employees Managment"); // the Vue_Page_Data_Headers(Descriptions...)
_this_Schema.value = profileSchema

const profileService = profileStore();
// const genapiService = genapiStore(); //import { genapiStore } from "src/stores/jstStores/genapiStore";
const _theService = thisStore();
const _thisapiUrl ='/profileapi/profile'
//const authService = authStore();

var Objprops = defineProps({
  _profile: { type: Object, default: () => ({}) }, //user Datas all there is...

  _acctype: { type: Object, default: () => ({}) }, //is the loged_user has privileged_routes...defintions
  
  // _super: { type: Boolean, default: false }

  // _priviledgedFor: { type: Object, default: () => ({})},
    //----------------------empy model total privileges....
  // _modalPriviledges: { type: Object, default: () => ({}) }, //user's privileges on general....with object of privileges =>{'empy':'regAdmin'}
});

Objprops_.value = Objprops
_this_acctype =computed(()=>{
        if(Objprops._acctype ?? false){
          return Objprops._acctype[_thisModel.value] ?? null
        }
        else{return null}
        })   

let _pageSettings=ref({'vw_i':true,showForm:false})
watch(Objprops._pageSetting,(_nowValue, ov) => {
  _pageSettings.value =Object.assign(_pageSettings.value,_nowValue)
  return true
})  
//-------------------
let watch_Rows=ref(null) 
watch_Rows=computed(()=>{ //computer got problem with return value is not in applications
return profileService.getstatus_Rows}) 
watch(watch_Rows,(_nowRows, ov) => {
  // console.log('update founded 2',_nowRows)
  let information = _nowRows
  if(_nowRows == null){ information ='No Data'}
  else if(_nowRows == false){ information ='No Data'}
  else if(_nowRows == true){ information ='Loading New Data..'}
  else if (_nowRows == 'Error Connection'){
    status_timerError(9000,information+' ?','Product & Services')
    return true
  }
  status_timerInformthis(9000,information,'Product & Services')
   return true
  }); 

async function Reset_this(Ops,rowIndex){
    // _fileAttributeName.value=null;
    _fileAsPathIndex.value=null
    
    __thisIndex.value=rowIndex
   __thisOps.value =Ops
   __thisOpsStatus.value=false

    __thisBox.value  = false; //OPen the Box
    __setRole.value=false
    if(rowIndex == null){ _this.value = Object.assign({}, _thisDefault.value)
    }else{ _this.value = Object.assign({}, _this_Rows.value[rowIndex]  ) }
    //----assigning Onplay Row
    console.log(_this.value,'ppp', _this_Rows.value)

    return true
  }


//------------------------------------------------------------COLUMNs----------------

//columns_filter()-------- which to displayOn REgisterations form
 lockedColumns.value = [
  "userID",
  // "acckey",
  "profileMeta",
  "pension",
  "incomeTax",
  "pensionNet",
  //"profile",
  "pensionNet",
  "taxableSalary",
  "incomeTax",
  "incomeTax",
  "taxfreeSalary",
  "netSalary",
  "payDays",
]; //are blacklist of columns tobe not shown during the Registerations..form submitting
let _blocedColumns=ref(['companyID','userID'])
let takenControls = ref({
  istakenBy: "takenBy",
  Col: "storeStatus",
  Val: ["taken"],
}); //are blacklist of columns tobe not shown during the Registerations..form submitting
let returnControls = ref({
  isreturnedBy: "returnedBy",
  Col: "storeStatus",
  Val: ["Onstore"],
}); //are blacklist of columns tobe not shown during the Registerations..form submitting

// let visibleColumns = ref([]); //Hold List of In
 invisibleColumns.value = [
  "profile",
  "_stage_",
  "cover","profileMeta","phoneCode","location","geolocation","verified","cart",
  "queryWeight","acckey",""
]; //defualt hidden columns

if ($q.screen.lt.md) {
  invisibleColumns.value.push("storeStatus");
}

//==============================================------------------------------------

const pagination = ref({ rowsPerPage: 50 });
columns = computed(() => { 
  console.log(`\n\n Creating ${_thisModel.value}  Table Schema with AccTypeof ${_this_acctype.value}`);
  if (!_this_acctype.value) {
    return [{}];
  } else {

    // resetColumnDependent();
    let _tableColumn = []; //HOLDING_  all the Columns of the Data_model ( TOTAL Columns)
    let _visibleColsName = [];  ////--HOLDING_ all the "Visible" Columns of the Data_model ( TOTAL Columns)

    let rolesWall = _this_acctype.value.role ?? false
    let capabilityWall = _this_acctype.value.capability ?? false
    let modelRole = _this_acctype.value.roles ?? [] //accstage
    console.log(`\n User Role & Permissions:_ rolesWall = ${rolesWall} && capabilityWall = ${capabilityWall} && modelRole = ${modelRole}`);

    for (let schemaColumn in _this_Schema.value) {
      let _col = { 
        name: schemaColumn,
        schema: _this_Schema.value[schemaColumn],
        label: schemaColumn,
        //sortable: true,
        align: "left",
        //sort: (a, b) => a - b,
      };
      _tableColumn.push(_col); 
      //----------------loging all columns name as normal list format
      _allColumnName(schemaColumn); 
      //---------------loging Visible Columns list(on table)
      invisibleColumns.value.includes(schemaColumn) ? "" : _visibleColsName.push(schemaColumn);
      //----
      if (schemaColumn === "extraColumn" || lockedColumns.value.includes(schemaColumn)) {
              continue;
      } else { //Create and Write
              try{ 
                if ([capabilityWall[0], capabilityWall[2]].includes("2")) {
            ///if user_ hass full access
            if (modelRole.includes(schemaColumn)) {
              //excludes specifed columns
              _rolesColumn(_col);
              // continue;
            } else {
              _rolesColumn(_col);
            } //gives
          } else if (capabilityWall[0] == "1") {
            //Registererars (checking create digits will work for writing(updating too))
            if (modelRole.includes(schemaColumn)) {
              //excludes specifed columns
              continue;
            } else {
              _rolesColumn(_col);
            } //gives all other thatn specifiec columns
          } else if (capabilityWall[2] == "1") {
            //user has specified accesss with 1strickes ===['clientFlag','*']
            if (rolesWall.includes(schemaColumn)) {
              //excludes specifed columns
              _rolesColumn(_col);
            } else {
              continue;
            } //gives all other thatn specifiec columns
          } else {
            continue;
          }
              }catch{}   
      }
    }//grab the actions and it's permissions (create,update,delete) as label
    _tableColumn.push({name:'actions',schema:{type:'String',},label:'actions',value:capabilityWall[0]+capabilityWall[1]+capabilityWall[2]}); 
    _visibleColsName.push('actions')
    // _this_Defaulting();
    _setDefaults()
    visibleColumn(_visibleColsName);
    console.log(`\n\n ENDing ${_thisModel.value}  Table Schema with AccTypeof ${_this_acctype.value}`);
    // _this_foreignDefault()
    return _tableColumn;
    }
  });

async function _setDefaults(){
    // _this_clientModels = ['phone',"userName","geolocation",'location','phoneCode'] //
    // _thisModels.value.push('group') //
    _thisDefault.value = await _this_Defaulting(_thisModels.value)

    ///-----redefine values
    _thisDefault.value['userID']=Objprops._profile.id
    // _thisModels.value['group']=null
    //------==== building columns of thisMoel
    return true
  }

   //---------------------------------------------- Store Syncing === End
//------------------1ry ----Quering and SE_settings
//===============================QUERY_BUILDIMG+++START
//==============Q1
 async function this_Query (_queKey=null,_value=null){
  //-----------Reseting Rows SEtting
  console.log(`\n Profile Syncing is "Intitiated ====="\n`)
  _this_Rows.value=[] 
  //----------------Fetching Queried Rows
  _this_Query.value={}
  // _this_Rows_Sync()
  await Sync_this(profileService,_this_Query.value)
  //-------------------- Preparing Default Rows ( New Row Skeltons)
  // ?
  return true
}
//==Fetching Data ( Store_SyncFetch)
let sync_this=''
_this_Rows = computed(() => { //Updating is comming
  return _this_RowsCompute(profileService.getDatas)
});
function _this_RowsCompute(_Datas) {
  pagination.value.rowsPerPage=10// _pageSettings.value['tableView']=='cards' ? 0 : 3
  return _Datas
}
//syncSetting()

//------------------------------------------SYNCING DATA With Store

 //Operating without setting _this ( directlly calling for effect) === active _operations
 let  _this_ActiveOperation = {
      _delRow : async (confirm=null,_onplayrowIndex,itemId) =>{
        //--------------
        if(confirm ==null){//First (Null) Event -- Data Assigning && set confirmObj
          //-----------------------------
          _this.value = {'id':itemId} 
          // __thisIndex.value = _onplayrowIndex
          //--------------
          confirmObj.value=_this_ActiveOperation._delRow; //it carry the _delRow(,,,)... on button response it comes as
          //  _delRow(true/false)..parameter order is mattter.           
          return false;            
        }
        else{
          confirmObj.value=null;
          if(!confirm){return false} //Third (True) Event -- Go ahead or false(closed popup)
        }
        //--------waite for confirmation  
        return await Crud_this.deleteData()
        .then((response) => {
          if (response) {
            this_Query('userID',Objprops._profile.id)
            // _this_Row.splice(__thisIndex.value,1)
          } 
          return true;
        }).catch((error) => { return false; });
      },
      
      //------------special Operations

      //------------special Operations
}

//------------------
// Return data and methods
const  group={
    type:'String',enum:['admin','store','regAdmin','finance','sale','marketing','quality','marketing','others']
  }
let __setRole=ref(null)
async function __thisBox_Dialog(_playrowIndex,_setRole=null){
// _fileAttributeName.value=null;
console.log(_playrowIndex,_this.value,_setRole)
if(_setRole){
  await Reset_this('UpdateRowItem',_playrowIndex)
  _this.value['group'] = null
  __setRole.value = true
  return true
}
if(_playrowIndex == null){
  await Reset_this('CreateRowItem',null)
  __thisBox.value  = true; 
  return true
}
else{
  await Reset_this('UpdateRowItem',_playrowIndex)
  __thisBox.value  = true; //OPen the Box
  return true
}
}
//--------------------------------------METHODS & PROCESS
let _fileAttributeName =ref(null)
let _fileAsPathIndex =ref(null)
async function Create_this() {  //UpdateRowItem User DAta with no graphic to update
      //---set--loading row operation
      __thisOpsStatus.value=true
      //is File Encapsulated ( if so ) ... extract the file by choosing ( either it was from folder or from camera_directlly )
      let _fileExistance = _fileAttributeName.value ?? false
      if(_fileExistance){
          //_this.value['file_']={'files':_fileExistance}
          _this.value[_fileExistance]=_fileAsRaw.value
          if(typeof _fileAsRaw.value == 'object'){
            _this.value['file_']={'files':_fileExistance}
          }else{
            _this.value['file_']={'file':_fileExistance}
          }
        }
        //--------set Operational parameters
      _this.value['onplayOps']='CreateRowItem'
      _this.value['onplaySubops'] = 'new'   
      //---Creat the Content... which is with/out of file encapsulations
    return await Crud_this.createData()
        .then(async (response) => {
          if (response) {
            // timerDone(5000,_createTitle[2],'Succefully Created')
           __thisBox.value=false;
            return true
          }else{
            timerError(5000,_createTitle[2],_createTitle[0])
          }
          return true; 
        }).catch((error) => {
          timerError(5000,_createTitle[2],_createTitle[0])
          // _fileAttributeName.value=null;
           __thisOpsStatus.value=false;
           __thisBox.value=false;
           return false;
          });
}

async function Update_this(onplaySubops=false) { //UpdateRowItem User DAta with graphic to update or not
      //---set--loading row operation
      __thisOpsStatus.value=true
      //-------------
      let _fileExistance = _fileAttributeName.value ?? false
      if(_fileExistance){
          //_this.value['file_']={'files':_fileExistance}
          _this.value[_fileExistance]=_fileAsRaw.value
          if(typeof _fileAsRaw.value == 'object'){
            _this.value['file_']={'files':_fileExistance}
          }else{
            _this.value['file_']={'file':_fileExistance}
          }
        }
       //----------set Operational parameters 
      _this.value['onplayOps']='UpdateRowItem'
      _this.value['onplaySubops'] = onplaySubops
      //--------
      return await Crud_this.updateData()
        .then(async (response) => {
          if (response) {
            timerDone(5000,_createTitle[1],'Succefully Updated')
            _this_Rows.value[__thisIndex.value]=Object.assign({},response)
            Reset_this(null,null)
          }else{
            timerError(5000,_updateTitle[1],_updateTitle[0])
          }
            __thisOpsStatus.value=false;
          // _fileAttributeName.value=null;
          return true; 
        }).catch((error) => {
            timerError(5000,_updateTitle[2],_updateTitle[0])
           __thisOpsStatus.value=false;
           __thisBox.value=false;
          //  _fileAttributeName.value=null;
           return false;
          });
}
async function Update_RolePermission() {
  var requestOptions = { method: "post", headers: {}, params: {} };
  requestOptions.headers["Content-Type"] = "application/json";
  requestOptions.params["timestamp"] = new Date();
  axios.post(
    process.env.API_IP_PORT + "/permissionapi/permission",
    { roles: letRolePermissions, users: "" },
    requestOptions
  );
}
// init_RolePermission();

//----=========================================================================---DATA ---/// ---ROW----CRUD
let createKey = "";
let updateKey = "id";
let delKey = "id";

//----=========================================================================---DATA ---/// ---ROW----CRUD


const Crud_this = {
  createData: async function (objParam = {}) {
    //-------Check for Param_Requirents
    try {
      if (_this.value[createKey] == null) {
        return false;
      }
      //-----------Calling for Store Services  (_suburl, formData, objParam)
      return await _theService
        .createData( _this.value, objParam)
        .then((response) => {
          if (response.status) {
            return response.data;
          } else {
            timerLoadevent({ 'createData': 5000 }, 5000, 'Error'+response.data);
            return false;
          }
        })
        .catch((e) => {
          timerLoadevent({ 'createData': 5000 }, 5000, 'Error createData', '...'+e);
          return false;
        });
    } catch(e) {
      timerLoadevent({ 'createData': 5000 }, 5000, 'Error createData', '...'+e);
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
            timerLoadevent({ 'updateData': 5000 }, 5000, 'Error'+response.data);
            return false;
          }
        })
        .catch((e) => {
          timerLoadevent({ 'updateData': 5000 }, 5000, 'Error updateData', '...'+e);
          return false;
        });
    } catch(e) {
      timerLoadevent({ 'updateData': 5000 }, 5000, 'Error updateData', '...'+e);
      return false;
    }
  },

  readData: async function () {
    timerLoadevent({ 'readData': 0 }, 0, "Searching...");
    return await _theService
      .readData()
      .then((response) => {
        if (response.status) {
          return response.data;
        } else {
          timerLoadevent({ 'readData': 5000 }, 0, ' Error '+response.data);
          return false;
        }
      })
      .catch((e) => {
        timerLoadevent({ 'readData': 5000 }, 5000, 'Error Deleting', '...'+e);
        return false;
      });
  },
  //---------------------------------------------------------------
  readFData: async function (objParam = {}) {
    //-------Check for Param_Requirents
    timerLoadevent({ 'readFData': 0 }, 0, "Searching...");
    try {
      if (Object.keys(objParam ?? {}).length == 0) {
        return false;
      }
      //-----------Calling for Store Services
      return await _theService
        .readFData( objParam)
        .then((response) => {
          if (response.status) {
            return response.data;
          } else {
            timerLoadevent({ 'readFData': 5000 }, 0, ' Error'+response.data);
            return false;
          }
        })
        .catch((e) => {
          timerLoadevent({ 'readFData': 5000 }, 5000, 'Error Deleting', '...'+e);
          return false;
        });
    } catch(e) {
      timerLoadevent({ 'readFData': 5000 }, 5000, 'Error Deleting', '...'+e);
      return false;
    }
  },

  deleteData: async function () {
    //-------Check for Param_Requirents
    timerLoadevent({ 'deleteData': 0 }, 0, "Searching...");
    try {
      if (_this.value[delKey] == null) {
        return false;
      }
      //-----------------
      let objParam = {};
      objParam[delKey] = _this.value[delKey];
      //---------
      return await _theService
        .deleteData( objParam)
        .then((response) => {
          if (response.status) {
            // timerDone(5000, 'Deleted', '...');
            return response.data;
          } else {
            timerLoadevent({ 'deleteData': 5000 }, 0, ' Error'+response.data);
            return false;
          }
        })
        .catch((e) => {
            timerLoadevent({ 'deleteData': 5000 }, 5000, 'Error Deleting', '...'+e);
          return false;
        });
    } catch {
      timerLoadevent({ 'deleteData': 5000 }, 5000, 'Error Deleting', '...'+e);
      return false;
    }
  },
  //------------------filtering & searching for different Model
};
//-----------------End Data Functions
let _contentingliveStatus=ref(25000)
const Sync_this=async (service,query)=>{
  console.log(`\n Profile Syncing is "Active Final"\n`)
  clearInterval(sync_this)
  await service.set_syncQuery(query)
  //-----Fetching Data ( Store_SyncFetch)
  service.set_syncLock(false)
  service.asyncDatas()
  //--------
  setTimeout(function(){
    clearInterval(sync_this)
    sync_this = setInterval(service.asyncDatas, _contentingliveStatus.value)
  }, 5000);

  return true
}
const Fetch_this=async (service,objParam)=>{
    //-------Check for Param_Requirents
    try {
      if (Object.keys(objParam).length ==0) {return false; }
    //-----------Calling for Store Services
    return await service.readFData(objParam).then((response) => {
      if (response.status) {
          return response.data;  
        } else {
          return false;
        }
      })
      .catch((error) => {return false;});
    } catch {return false; }
}
//--------------------------------------------------------------------UTILITIED_FUNCTIONS ( LocalStarage -- Profiling)
//------------------------------------------------------------------------------ Warming UP(BIOS_Process.....POST)
onMounted(async () => {
  // clearInterval(sync_this);
  profileService.set_syncLock(true)
  //-------
  //---
  this_Query()
});
onUnmounted(async () =>{
    clearInterval(sync_this)
    return true
})
//------------------------------------------SYNCING DATA With Store
let searchResult = ref([{}]);
var latSearchResult = ref("");
var qserchResult = ref([]);
var nulQuickSearch = ref(false);
var latSearchDepth = ref(100);
var depthLabel = ref([]);

let searchWord = ref("");
let searchKey = ref([]);
let searchBy = ref([
  { label: "Name", value: "Name" },
  { label: "ID", value: "ID" },
]);

//---------.-------------------F--I---L--T--E--R-------------LOCAL SYSTEM Searching...
//1)-------------search box filter
var lockFilter=ref(true)
let search = ref("");
let filterDays = ref({
        min: 2,
        max: 8
      })
//2)------- filter latest_% & filter type

//3)--------------Quick_item Filter ( Simple Search/Quick)
let checkBoxLabel = {
  //items_value to be filtered..
  group_I: ["male", "female"],
};
//***************** ALTER THOSE ABOVE LABELS(OPTIONAL) &  THE sS1/2/3(must)*****/

let checkBoxValue = reactive({
  group_I: { male: true, female: true },
});
//-------------------------------Custome Filter ---Function
//const showALL=computed(()=>{})//with out return
const _thisfilter = computed(() => {
  return {
    search: search.value,
    male: checkBoxValue.group_I.male, //StoreStatusFilter
    female: checkBoxValue.group_I.female,
    //Issued: quickFilter.quickOOptions.Issued,
  };
}); //with out return

function filterMethod(rows, terms) {
  if(lockFilter.value){
    return rows
  }
  // rows contain the entire data
  let lowerSearch = terms.search ? terms.search.toLowerCase() : ""; //holding search bar...value
  const filteredRows = rows.filter((row, i) => {
    let ans = false;
    //Gather toggle conditions (Store Status)
    let sS1 = quickFilter.quickOOptions.male && row.gender == "male"; //holding toggle_quicx search
    let sS2 = quickFilter.quickOOptions.female && row.gender == "female";
    //let sS3 = true;//quickFilter.quickOOptions.Issued && row.storeStatus == "issued";
    //let c3 = filterToggle.dinner && row.storeStatus == "dinner";

    //Assume true in case there is no search
    let s1 = true; //If search term exists, convert to lower case and see which rows contain it

    if (lowerSearch != "") {
      s1 = false;
      let s1_values = Object.values(row);
      //list of all values in the row ( evenObjec,string,date,.....).. converting this pandora_values could lead to error..

      let s1_lower = s1_values.map((x) => {
        try {
          return x.toString().toLowerCase();
        } catch {
          return " ";
        }
      });
      for (let val = 0; val < s1_lower.length; val++) {
        if (s1_lower[val].includes(lowerSearch)) {
          s1 = true;
          break;
        }
      }
    }
    //assume row doesn't match
    ans = false;
    //check if any of the conditions match
    if ((sS1 && s1) || (sS2 && s1)) {
      // || (c3 && s1)) {
      ans = true;
    }
    return ans;
  });
  notifyit.simple(filteredRows.length + " - Items Founded")
  return filteredRows;
}

/////////////////////////////////////========================== DATA Reporting & Visualize
//---------------SELECTED---------- Displaying & Recording Table Data
let itemDetailColumns = reactive([
["name", "companyID", "department", "position"],
  [
    "Educations",
    "Expriences",
    "position",
    "department",
    "gender",
    "pension",
    "pensionRate",
    "loan",
    "incomeTax",
    "netSalary",
  ],
  ["address",  "employeedate", "salary", ],
]);
//---------------SELECTED---------- Displaying & Recording Table Data
let _reportReceipant= ref({})
var selected = ref([]); // it Holds rows LIst as they get selected....
var onselected = ref([_this]); // it Holds rows LIst as they get selected....
var rowSelected = reactive({}); //customezed_row Selected...
//-------Selected---------- Displaying & Recording Table Data
function getSelectedString() {
  //---listen to selected rows & listed in Objects array.
  if (Object.keys(selected.value[0]).length == 0 && selected.value[0] == _this) {
    selected.value.shift();
  }

  rowSelected = selected.value.length === 0 ? _this_Rows.value[0] : selected.value[0];
  return selected.value.length === 0
    ? ""
    : `# ${
        selected.value.length > 1 ? selected.value.length : ""
      } ,selected of ${_this_Rows.value.length}`;
}

function updateSelected() {
  // second ways of listing to selected_rows
  //////consol.log(selected, "Table Selection Happen...&Listening..");
}

//------EXPORT---SELECTED----Reporting Optionss
//------------- Filtered_Request (PAGINATION)
/////////////////////////////////////========================== DATA Visualization

//------Global Analysis Data
//-------------view Port One

</script>

<style>
.sticky-table {
  /* height or max-height is important */
  max-height: 100%;
}
.q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */ {
  background-color: rgb(227, 227, 228);
  color:black;
}

thead tr th {
  position: sticky;
  z-index: 1;
}

thead tr:first-child th {
  position: sticky;
  top: 0;
}
/* this is when the loading indicator appears */
.q-table--loading thead tr:last-child th {
  /* height of all previous header rows */
  top: 48px;
}

/* prevent scrolling behind sticky top row on focus */
tbody {
  /* height of all previous header rows */
  scroll-margin-top: 48px;
}


legend::first-letter {
    text-transform:capitalize;
}
</style>
