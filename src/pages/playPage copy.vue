<template>

<q-dialog
    v-model="_popUploadLocal"
    transition-show="scale"
    transition-hide="scale"   
    :style="{ 'background-image': 'url('  + ')' }"
  >
  <q-card style="min-width: 20vw;" class="overlay-Glass" >

    <!----HEADER-TOP Begin-->
    
        <q-linear-progress :value="0.6" color="pink" />

        <q-bar>
      
          <div>9:34</div>

          <q-space />
          <q-btn dense flat  v-close-popup>
            Post
            <q-tooltip>Post</q-tooltip>
          </q-btn>
          <q-btn dense flat  v-close-popup>
            Save
            <q-tooltip>Save</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" @click="_closeDialog()">
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="row items-center no-wrap q-pa-none"  >
          
          <div class="col " >
                        <q-img :src="onplayRowItem['graphicContent'][0]" style="min-width:30vw;">

                          <div class="absolute-full transparent column justify-between " >
                            
                            <div class="row" >
                              <div class="col">

                                pppppppp
                                .....  for name


                              </div>
                         <div class="column col-atuo" style="width: 5vw;">

                              <q-file color="teal" filled v-model="model" :dense="true"  class="col-auto">
                              <template v-slot:prepend>
                                <q-icon name="folder" />
                              </template>
                            </q-file>


                              <q-btn round  flat icon="camera" @click="onplayRowItem.graphicContent()" />
                              <q-btn round flat icon="more_vert">
                                    <q-menu auto-close :offset="[2, 2]" anchor="bottom right" self="bottom left">
                                      <q-list >
                                      </q-list>
                                    </q-menu>
                                    </q-btn>


                            </div>
                            </div>
                            <div>
<div class="self-end justify-left col">
      {{  onplayRowItem['graphicContent'].length }} Content ; <q-btn :dense="true" no-caps @click="_uploadIt()"> upload</q-btn>
                            </div>
                            </div>
                            
   
                          </div>
                          
                        </q-img>
      </div>

        </q-card-section>
   
        <q-card-section class="column transparent">
         <fieldset class="col  q-gutter-xs" style="border-radius: 20px;border: 1px solid blue;"  >

          <legend @click="_formsMeta.description = ! _formsMeta.description">
              Descriptions
          </legend>
          <template v-if="_formsMeta.description">
          
          
            <div class="row">
            <q-input class="col-md-auto col-xs-auto"  outlined v-model="onplayRowItem['header']" label="Header" stack-label :dense="true"  />

          </div>
        
    <q-separator inset  />
      <q-input
      outlined v-model="onplayRowItem['Content']" label="Content"
      filled  
      autogrow
    />

  
    <fieldset class="col-grow row  q-pa-sm q-gutter-xs" style="text-transform: capitalize;border-radius: 20px;border: 1px solid blue;">

      <legend @click="_formsMeta.pricing = !_formsMeta.pricing">
          type
      </legend>

      <template v-if="_formsMeta.pricing">
        <q-select :dense="true" clearable class="col-md col-xs"  color="purple-12" v-model="onplayRowItem['catagory']" :options="saleitSchema['catagory']['enum']" label="catagory" />
      <q-select :dense="true" clearable class="col-md col-xs"  color="purple-12" v-model="onplayRowItem['usage']" :options="saleitSchema['usage']['enum']" label="usage" />
        </template>
      
      </fieldset>

      <q-separator inset />

        <fieldset class="col-grow row q-pa-sm " style="text-transform: capitalize;border-radius: 20px;border: 1px solid blue;">

          <legend @click="_formsMeta.address = !_formsMeta.address">
              Address
          </legend>
          <template v-if="_formsMeta.address">
          <q-input class="col-md-auto col-xs-12"  outlined v-model="onplayRowItem['location']['city']" label="City" stack-label :dense="true" />
          <q-input class="col-md-auto col-xs-12"  outlined v-model="onplayRowItem['location']['street']" label="Street" stack-label :dense="true" />
         </template>
         
          </fieldset>

          </template>
        
 
         </fieldset>


    <fieldset class="col-grow   q-gutter-xs" style="text-transform: capitalize;border-radius: 20px;border: 0.01px solid blue;">

        <legend>
            Pricing
        </legend>
        
          <q-input type="Number" class="col-md-auto col-xs-12"  outlined v-model="onplayRowItem['price']" label="Pricing" stack-label :dense="true" />
            
        </fieldset>

        </q-card-section>

      </q-card>

</q-dialog>
{{  onplayRowItem }}
    <q-page class="column q-pa-none">
        <!----------------------------------->
      <div class="q-pa-none col column ">
            <q-table 

            :rows="rows"
            :columns="columns"

            virtual-scroll
     
            row-key="name"
            class="col column  q-gutter-sm bg-dark"

            hide-pagination
            hide-header
            hide-bottom
            >

            <template v-slot:body="props">
              
                <q-tr
                  :props="props" :class="$q.screen.gt.sm ? 'row' : 'column'"
                  class="cursor-pointer text-bold text-weight-bolder  q-gutter-sm row "  style="height:85vh;" 
                >
                  <!------------------ iterating _ body cell-->
                  <q-td  auto-width class="col-2">
                    <q-toggle dense  />
                  </q-td>

                  <q-td  class="column col"  style="height:85vh;" >
                        <div class="col row">

                            <div class="col fit">

                                <q-img
                                            src="https://cdn.quasar.dev/img/parallax2.jpg"
                                            spinner-color="white"
                                            img-class="my-custom-image"
                                            class="rounded-borders fit"
                                            >
                                            <div class="absolute-bottom text-subtitle1 text-center q-gutter-sm row">
                                                
                                                <q-sticky v-if="$q.screen.lt.sm" expand position="left" class="q-px-xs">

                                                  <q-card class="q-pa-none row" style="background-color: rgba(6, 93, 255, 0.212);" >

                                                        <q-btn round flat icon="message" />

                                                        <q-btn round flat icon="more_vert">

                                                        </q-btn>

                                                  </q-card>

                                                  </q-sticky>

                                                  

                                            </div>


                                           


                                </q-img>

                            </div>

                            <div class="col-auto">
                                
                                <q-sticky v-if="$q.screen.gt.sm" expand position="left" class="q-px-xs">

                                        <q-card class="q-pa-none column" style="background-color: rgba(6, 93, 255, 0.212);" >

                                        <q-btn round flat icon="message" />

                                        <q-btn round flat icon="more_vert">

                                        </q-btn>

                                        </q-card>
                                </q-sticky>
                               
                            </div>

                        </div>
   
                  </q-td>

                  <q-td  style="" class="col-1">
                           
                  </q-td >

                  </q-tr>

                  </template>
            </q-table>

      </div>
    
    <!----------------------LiveDATA Banner-->
    
    <div class="col-1 q-gutter-none justify-center items-center bg-red row fit">
        <q-list class="col row">

        <div class="col q-pa-sm content-center text-weight-bolder text-h6 bg-dark text-blue">
        <marquee behavior="scroll" scrollamount="2" direction="left">
            <span class="marquee">..........Live..........Data   Banner</span>
        </marquee>
        </div>

        </q-list>

    </div>

        <!------------Zooming Level Adjuster Sticky-------------------------->

        <div v-if="$q.screen.gt.sm" expand position="left" class="q-px-xs absolute-bottom" size="sm">

                <q-card class="q-pa-none row" style="background-color: rgba(34, 35, 36, 0.212);" >

                

                </q-card>

              </div>


    </q-page>
  </template>
  

  <script setup>
//_____________________________________________Modules Definitions
//-------------------------------------------------------------Importing System Modules
import { ref, reactive, computed, onMounted, onBeforeMount, watch } from "vue";

import { exportFile, useQuasar, useMeta } from "quasar";

//import print from 'print-js';
import { useRouter, useRoute } from "vue-router";
//import { storeToRefs } from "pinia";
import { saleitStore } from "stores/dataStores/saleitStore"; //saleit Store ( Main Store)
import { genapiStore } from "src/stores/jstStores/genapiStore";

import { saleitSchema } from "src/composables/schemas/saleitSchemas";
import schemaSklt from "src/composables/schemaSklts";

//----componenents..
//------------------Global Variables [ uTILITIES..]
import { ssrAPI } from "../srcenv";

const $q = useQuasar();
//const $m = useMeta();

const router = useRouter();

const metaData = {
  // sets document title
  title: "sale_itService",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - DashBoard`,
  // JS tags
  icon:"/public/icons/favicon-32x32.jpg", 

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
const saleitService = saleitStore();
const genapiService = genapiStore(); //import { genapiStore } from "src/stores/jstStores/genapiStore";

//-------
let nul = ref([undefined, "", null, false, "false",0,[],{},NaN]);
function ArrayHaseem (base,items)  { //checking arrays within arrays
  return items.some(value => base.includes(value)) ? true : false };
var keyhasValue = (key) => !nul.value.includes(reqData[key]) && Object.keys(reqData[key]).length != 0 ? true : false;


////////////////////////
const months = Array.from({ length: 12 }, (e, i) => {
  return new Date(null, i, null).toLocaleDateString("en", {
    month: "short",
  }); //short || long
});

var todday = () => new Date("12/26/2023, 11:47:20 PM"); //.split('T')[0];

const _thisDate = new Date();

const _thisYear = _thisDate.getFullYear(); //current_year_number
var _startofthisYear = new Date(_thisYear, 0, 1); //01,01 (Year(startMonth=01(_in_js:0),startDate=01(_in_js:1)))
var _endofthisYear = new Date(_thisYear, 11, 31); //12,31 (Year(endMonth=12(_in_js:11),endDate=31(_in_js:31)))
var _previouseYear = _thisYear - 1; //previouse_yearnumber
const _thisMonth = _thisDate.getMonth(); //current_month_number
const _startofthisMonth = new Date(_thisYear, _thisMonth, 1);
const _endofthisMonth = new Date(_thisYear, _thisMonth + 1, 0);

const monthDataFilter = ref({
  updatedAt: {$gte: _startofthisMonth,$lt: _endofthisMonth},
});
const yearDataFilter = ref({
  updatedAt: {$gte: _startofthisYear,$lt: _endofthisYear},
});

//////////////////////////////////////////--------------Axios Wrapper UUUUUUPPPPPPPPPPPP
//-------------USER PROFILE_Variables..

const Objprops = defineProps({
  _who: { type: Object, default: () => ({}) }, //user Datas all there is...
  userID: { type: String, default: "" }, //(isPowered(logStatus,root,regAdmin))
  id: { type: String, default: "" }, //(isPowered(logStatus,root,regAdmin))
  
  _iss: { type: Object, default: () => ({}) }, //is the loged_user has privileged_routes...defintions
  _super: { type: Object, default: () => ({})  },
  _priviledgedFor: { type: Object, default: () => {}},

    //----------------------empy model total privileges....
  _modalPriviledges: { type: Object, default: () => ({}) }, //user's privileges on general....with object of privileges =>{'empy':'regAdmin'}

  //-------------------
  _popUpload : { type: Boolean, default: false },
});
//Objprops._popUpload
//===-----_--------THE MODEL/ MAIN_DATA....
let _thisModel = "saleit"; // the Vue_Page_DataModel (Listing Collection Name)
var _thisModelHeader = ref(_thisModel+" Managment"); // the Vue_Page_Data_Headers(Descriptions...)

var acctypeStage = ref({
  
  'isfinance':[1,6],
  'isquality':[2],
  'isstore':[3],
  'istaken':[4],
  'issale':[5],
  //'isfinanceAp':[6],
  //-----
  'isgm':[1,2,3,4,5,6,7,8],
  //-----------
  'root':[1,2,3,4,5,6,7,8],  //outof stages_root
  'creator':[1],
})

//---current Modal Specific_privileges_analysis
let modalpriviledges = nul.value.includes(Objprops._modalPriviledges[_thisModel]['enum']) ? Objprops._modalPriviledges[_thisModel]['enum'] : Objprops._modalPriviledges[_thisModel]['venum']
let _thisModelPriviledges = ref(modalpriviledges); //current model's possible privileges list....objects ( .enum=[1,2,3])
let _thispriviledgedFor = ref(Objprops._priviledgedFor[_thisModel]); //user's priviledges on current model....string

var __iss =ref("") ;//is not admin/registrat.. but isstore,isfinance
try{
  __iss =  computed(() => nul.value.includes(Objprops._iss[_thisModel]) ? false : Objprops._iss[_thisModel][0]) // ['isgm','issale']...take index_0 default
}catch{}

var __isSSuper =ref("")
try{
  __isSSuper =  computed(() => nul.value.includes(_thispriviledgedFor.value[2]) ? false : _thispriviledgedFor.value[2] ) //is admin/creator...
}catch{}

var __isStage = []
try{
  __isStage =  computed(() => nul.value.includes(acctypeStage.value[__iss.value]) ? false : acctypeStage.value[__iss.value] ) //is admin/creator...
  //if(__isStage.includes(item.stage))
}catch{}

  //-----------------------


//------------------------------------------------------------COLUMNs----------------

//columns_filter()-------- which to displayOn REgisterations form
let lockedColumns = ref([ "userID","companyID"]); //are blacklist of columns tobe not shown during the Registerations..form submitting

//------column invisiblity on table_
let visibleColumns = ref([]); //Hold List of In
let invisibleColumns = [
  //"financeStatus",
]; //defualt hidden columns
if ($q.screen.lt.md) {
  //invisibleColumns.push("storeStatus");
}
if ($q.screen.lt.lg) {
  //invisibleColumns.push("storeStatus");
}

visibleColumns.value = invisibleColumns;
//inject_actions columns to add controls...
//==============================================------------------------------------

const pagination = ref({ rowsPerPage: 50 });

var columns = ref([]); //Actual Table_Columns ++Descriptions
var topLayerColumns = ref([]); //Actual OuterMost Table_Column_Names [Top(Layer_1] _Columns _Name_List]
let authorizedColumns = ref([]); //Filtered/Authorized_Table_Columns ++Descriptions for Editing/Adding.... but not Viewing
//------column invisiblity on table_

//===============================================-----------------------------------
//-----------------------DATAs ROWs--------------
var rows = ref([{}]); //Data's projected with the Columns variable [ calling function.....Crud_.readDatas(top_100)]

//===============================================-----------------------------------------
//------------- MODAL ROWs_ MANAGMENT
let defaultItem = ref({});
let onplayRowIndex = ref(-1); //the selected row_index_data...HOlding the lastIndex+1 ---temp index_value
let onplayRowItem = ref({}); //the selected row_actual_Data..as object

//===============================================-----------------------
//-------------Syncing Columns
async function resetColumnDependent() {
  authorizedColumns.value = [];
  visibleColumns.value = [];
  topLayerColumns.value = [];
}

columns = computed(() => { 

  if (Object.values(saleitSchema).length === 0) {
    return [{}];
  } else {
    resetColumnDependent();
    let tempColumns = []; //HOLDING_  all the Columns of the Data_model ( TOTAL Columns)
    let tempviewColumns = [];  ////--HOLDING_ all the "Visible" Columns of the Data_model ( TOTAL Columns)

    for (let schemaColumn in saleitSchema) {
      let _col = { 
        name: schemaColumn,
        schema: saleitSchema[schemaColumn],
        label: schemaColumn,
        //sortable: true,
        align: "left",
        //sort: (a, b) => a - b,
      };

      topLayerColumn(schemaColumn); //---List Out topLayerColumns_NAME in ARRAY ( TOTAL topNames)
      tempColumns.push(_col);
      invisibleColumns.includes(schemaColumn) ? "" : tempviewColumns.push(schemaColumn);

      if (schemaColumn === "extraColumn" || lockedColumns.value.includes(schemaColumn)) {
        continue;
      } else {

        try{
          if(_thispriviledgedFor.value[2]){
          if(_thispriviledgedFor.value[3].includes(schemaColumn)){
            continue
          }else{
            //authorizedColumn(_col); //
          }
        }else{
          if(_thispriviledgedFor.value[3].includes(schemaColumn)){
            //authorizedColumn(_col); //
          }
        }
        }catch{}

        authorizedColumn(_col); //

      }
    }

    _buildSchemaForm();
    visibleColumn(tempviewColumns);
    return tempColumns;
  }
});

const topLayerColumn = async (schemaColumn) => topLayerColumns.value.push(schemaColumn); //Holding topLayer Name of Columns
const authorizedColumn = async (_col) =>  authorizedColumns.value.push(_col);  //( Object List of author_columns Details)
const visibleColumn = async (visibleCols) =>  visibleColumns.value = visibleCols; //.slice[0,topLayerColumns.value.length]

//after building the topLayerColumns/authorizedColumns/visibleColumns...build the schema_data_scheltons (for Crud)
async function _buildSchemaForm() {
  if (!authorizedColumns.value.length) {
    //return null;
  }

  onplayRowItem.value = await schemaSklt(authorizedColumns.value);
  logUser(["userID"]); //
  defaultItem.value = reactive(onplayRowItem.value);
  return "";
}

async function logUser(userkeyList) {
  for (let kkey in userkeyList) {
    let ittem = userkeyList[kkey];
    try {
      onplayRowItem.value[ittem] = Objprops._who[ittem];
    } catch {}
  }
}

//------------------------------------------SYNCING DATA With Store
var qserchResult = ref([]);
var nulQuickSearch = ref(false);
var latSearchDepth = ref(100);

let searchWord = ref("");
let searchKey = ref([]);
let searchBy = ref([
  { label: "Name", value: "Name" },
  { label: "ID", value: "ID" },
]);

let rowsCount = ref(0);
rows = computed(() => {
  let data = saleitService.getDatas;
  let dataCount = data.length;

  if (data.length === 0) {
    setDLoading(true);
    return [{}];
  } else{
    notifyit.info((rowsCount.value - dataCount)+" New "+_thisModel + " Item Loaded..!");
    setCounter(dataCount);
    return data;
  }

  try {
    if (rowsCount.value == 0) {
      notifyit.info("Loading... "+_thisModel + " ");
    }else{ 
      if (dataCount != rowsCount.value) {
      notifyit.info("New "+_thisModel + " Item Recorded..!");
      setCounter(dataCount);
      //setDLoading(false);
      //data.forEach((row, index) => { row.index = index;   });
    }   }
  } catch {}
  return data;
});

function setCounter(num) {
  rowsCount.value = num;
}

//---------------------Syncing.....DATA---controlle syncing (on || off)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//REFRESH____BUTTON
function syncSetting() {
  searchKey.value = [];
  latSearchDepth.value = getRandomInt(2, 8);
  deepSearch();
  return true;
}

//syncSetting()
//------------------------------------------SYNCING DATA With Store

//----------Visible/Filter Rows
//---------.-------------------F--I---L--T--E--R-------------LOCAL SYSTEM Searching...
//1)-------------search box filter
var lockFilter=ref(true)
let search = ref("");
let filterDays = ref({
        min: 2,
        max: 9
      })
//2)------- filter latest_% & filter typee
//3)--------------Quick_item Filter ( Simple Search/Quick)
let quickFilterOptions = {  //items_value to be filtered..
  quickOOptions: ["Machines", "Consumable", "Acce", "Tools","Spares","Sanitary","Raws","---","Issued","Stored"],
};

//***************** ALTER THOSE ABOVE LABELS(OPTIONAL) &  THE sS1/2/3(must)*****/
let quickFilter = reactive({
  quickOOptions: { Machines: true, Consumable: true, Acce: true, Tools: true ,Spares: true,Sanitary:true,Raws:true,Issued:false,Stored:true },
});
//-------------------------------Custome Filter ---Function
//const showALL=computed(()=>{})//with out return
const filter = computed(() => {
  return {
    search: search.value,
    Machines: quickFilter.quickOOptions.Machines, //StoreStatusFilter
    Consumable: quickFilter.quickOOptions.Consumable,
    Acce: quickFilter.quickOOptions.Acce,
    Tools: quickFilter.quickOOptions.Tools,
    Spares: quickFilter.quickOOptions.Spares,
    Sanitary: quickFilter.quickOOptions.Sanitary,
    Raws: quickFilter.quickOOptions.Raws,
   // Issued: quickFilter.quickOOptions.Issued,
  };
}); //with out return

function filterMethod(rows, terms) {

  if(lockFilter.value){
    return rows
  }
  
    // rows contain the entire data
    let lowerSearch = terms.search ? terms.search.toLowerCase() : ""; //holding search bar...value
    const filteredRows = rows.filter((row, i) => {

  let _group0 = false;

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
        _group0 = true;
        break;
      }
    }
  }

    //Gather toggle conditions (Store Status)
    _group0 = quickFilter.quickOOptions.Machines && row.catagories == "Machinery" ? true : _group0; //holding toggle_quicx search
    _group0 = quickFilter.quickOOptions.Consumable && row.catagories == "Consumable" ? true : _group0;
    _group0 = quickFilter.quickOOptions.Acce && row.catagories == "Accessory" ? true : _group0;
    _group0 = quickFilter.quickOOptions.Tools && row.catagories == "Tools" ? true : _group0;
    _group0 = quickFilter.quickOOptions.Spares && row.catagories == "Spares" ? true : _group0;
    _group0 = quickFilter.quickOOptions.Sanitary && row.catagories == "Sanitary" ? true : _group0;
    _group0 = quickFilter.quickOOptions.Raws && row.catagories == "RaWMatterial" ? true : _group0;
    //let sS9 = quickFilter.quickOOptions.Issued && row.catagories == "RaWMatterial";
    
    let _group1 = false;
    let Issued = false;
    if (!nul.value.includes(row.storeStatus)) {
      Issued = nul.value.includes(row.storeStatus["status"]) ? true : false;
    } //is sold(onStore zero) ? no or yes
    _group1 = !quickFilter.quickOOptions.Issued || Issued ? true : _group1;

    let stored = false;
    if (!nul.value.includes(row.storeStatus)) {
      stored = nul.value.includes(row.storeStatus["taken"]) ? true : false;
    } //is sold(onStore zero) ? no or yes
    _group1 = !quickFilter.quickOOptions.Issued || stored ? true : _group1;

    let daypass = false;
    if (!nul.value.includes(row.updatedAt)) {

      const _thisNumDayOfmonth = _thisDate.getDate(); 
      //const todayy = new Date(_thisYear, _thisMonth, _thisNumDayOfmonth);
      let startd= _thisNumDayOfmonth - filterDays.value.max
      const enddayy = new Date(_thisYear, _thisMonth, startd);

        if(enddayy <= new Date(row.updatedAt) ){
          daypass =true
        }

        if(filterDays.value.max == 2){
          daypass=true

        }
    } //is sold(onStore zero) ? no or yes
    
    //assume row doesn't match
    ans = false;
    if( _group0 && _group1 && daypass){

        return true
    }return false
    
  });
  filteredRows.length ? notifyit.simple(filteredRows.length + " - saleit Item Founded") : ""
  return filteredRows;
}

//4)------- live_data_fetching...Searching filter (build In)

let depthLevel = computed(() => {
  return String(latSearchDepth.value * 100 + ".");
});
let searchService = ref("saleits");

let searchProfile = ref({});
let searchProfileKey = ref([]);

let fetchService = reactive({});
let searchDate = ref("");
//fetchService=ref({returnWat:{},limits:100,updatedAt: {$gte: _startofthisMonth, $lt: _endofthisMonth, }})
let speciResult = [];

//-------------------
async function deepSearch() {
  let objParam = {};
  for (let item of searchKey.value) {
    let kkey = "saleit" + item;
    if (searchWord.value) {
      objParam[kkey] = searchWord.value;
    } else {
      objParam[kkey] = "";
    }
  }
  objParam["limits"] = latSearchDepth.value;
  if (!nul.value.includes(searchDate.value)) {
    objParam["updatedAt"] = { $gte: _startofthisYear, $lt: searchDate.value };
    objParam["returnWat"] = {};
  }
  return await saleitService.asyncDatas(5000, objParam).then((response) => {
    return;
  });
}

async function speciSearch(modelUrl = "", modelName = "", paramObj = {}) {
  nulQuickSearch.value = "...searching";
  searchService.value = modelName;
  var profiles = {
    saleits: { Name: "saleitName", ID: "saleitID" },
    Employees: { Name: "name", ID: "companyID" },
    Customers: { Name: "customerName", ID: "customerID" },
    Suppliers: { Name: "supplierName", ID: "supplierID" },
  };

  //searchProfile.value=profiles[modelName]
  qserchResult.value = [];
  let profilName = profiles[modelName];
  searchProfileKey.value = Object.values(profilName); //extract the 'saleits' object... as list of values as ['saleitName','saleitID']
  let seaKey = searchWord.value;
  if (searchKey.value.length && seaKey.length) {
    fetchService = {};
    for (let item in searchKey.value) {
      let skey = searchKey.value[item];
      let kkey = profilName[skey];
      if (seaKey.length) {
        fetchService[kkey] = seaKey;
      } else {
        //fetchService[kkey] ='';
      }
    }
  } else {
    nulQuickSearch.value = "please select search key..";
    return;
  }
  ////console.log("name employee", profilName, fetchService, searchKey.value);

  if (Object.keys(fetchService).length) {
    fetchService["updatedAt"] = {
      $gte: _startofthisYear,
      $lt: searchDate.value,
    };
    fetchService["returnWat"] = {};
    return await Crud_.genapiFData(modelUrl,fetchService).then((response) => {
   
        if(response && response.length){
          qserchResult.value = response;       
        }else{
          nulQuickSearch.value = "no Records";
        }
        return true;
    }).catch((error)=>{
      nulQuickSearch.value = "no Records";
      return true;
    })
  }
  return true;
}

//==========================================--------------------------------DATA API_Locals

//-------forms

let _formsMeta=ref({
  'updatorPop':true,
  //-----------------forms collapsing/show commands
  'pricing':true,
  'description':true,
  'address':true
  //------------------

})

//--------------------------------ROWS_SCHEMATIC FORMS
let _popUploadLocal = ref(false); //prepare thepopup form
var _popup = ref(false)
_popup = computed(() => { return Objprops._popUpload})
watch(_popup, (cv, ov) => {
 _closeDialog(cv);
});
//--------------
function _closeDialog(cv) {
  _popUploadLocal.value = !_popUploadLocal.value;
  return;
}
//-----------------

let _NeworUpdate = ref(""); // & which is in operations
//--------------------------------------METHODS & PROCESS

//-----------------Trigger creat & Update Crud_oprations.....============= Preparing Data for CREATE & REGISTER Operations...
async function _addRecords(columnname, schema) {
  onplayRowItem.value[columnname].push(defaultItem.value[columnname][0]);
  return true;
}
async function _removeRecords(columnname, index) {
  onplayRowItem.value[columnname].splice(index, 1);
  return true;
}

//-----------------------------------
function _NeworUpdateNew() {
  onplayRowItem.value = Object.assign({}, defaultItem.value); //deep copy item_objects with deep reactivity ( reactivity could lost... after multiple copying b/n or due depth increasing)
  _popUploadLocal.value = true;
  _NeworUpdate.value = "Reg";
  return true;
}

function _NeworUpdateUpdate(item) {
  onplayRowItem.value = reactive(Object.assign({}, item));
  onplayRowIndex.value = rows.value.indexOf(item);

  _popUploadLocal.value = true;
  _NeworUpdate.value = "_updates";
}

//--Perform_Delete Operations
//-------------------------------------------------------------------------------------[3] [ Delete Crud_INIT]
async function _removeIt(_item) {
  ////consol.log("delete Presse", item["id"]);
  let _itemID = _item["id"]; //rows.value[index]["id"]
  var _itemIndex = rows.value.indexOf(_item);
  if (!_itemID) {
    if (_itemIndex) { rows.value.splice(_itemIndex);    }
    notifyit.warn("Already Deleted. [F5]", "bottom-left", null, 10000);
    return false;
  }
  return Crud_.deleteData(_itemID)
    .then((response) => {
      if (response) {
        notifyit.warn("Succefully Deleted.", "bottom-left", null, 10000);
        rows.value.splice(_itemIndex, 1);
      } else {   }
      return true;
    })
    .catch((error) => { return false; });
}

//----Operate Create Or Update Cruds
async function _uploadIt() { //when Ok is Pressed it apply chnge into local Arrays....Storage
  if (_NeworUpdate.value == "_updates") {
    return await Crud_.updateData()
      .then((response) => {
        if (response) { 
          _popUploadLocal.value = false;
          rows.value[onplayRowIndex.value] = response; //showloading('sucess')
          notifyit.succes("Updated Succefully", null, null, 7000);
        } else { }
        return true;
      })
      .catch((error) => {//_popUploadLocal.value = false;
        return false;
      });

    //-------------------------------------------------------------------------------------[2] [ Create Crud_INIT]
  } else {
    //consol.log("Creating Items of ", onplayRowIndex.value);
    return await Crud_.createData()
      .then((response) => {
        if (response) {
          _popUploadLocal.value = false;
          rows.value.splice(rows.value.length -1, 1);
          //rows.value.unshift(onplayRowItem);  //showloading('sucess')
          notifyit.succes("Created Succefully", null, null, 7000);
        } else {  }
        return true;
      })
      .catch((error) => { return false;   });
  }
}

//----------------------------------------------------------SEARCHING
let profileColumns = reactive([
  ["date", "userID", "createdAt", "id"],
  ["model", "saleitName", "tags", "ItemQs", "cost", "UoM", "userID"],
  ["financeStatus", "storeStatus", "takenBy", "returnedBy", "supplier"],
]);
/////////////////////////////////////========================== DATA Reporting & Visualize
//---------------SELECTED---------- Displaying & Recording Table Data
//---------------SELECTED---------- Displaying & Recording Table Data
var selected = ref([]); // it Holds rows LIst as they get selected....
var onselected = ref([onplayRowItem.value]); // it Holds rows LIst as they get selected....
var rowSelected = reactive({}); //customezed_row Selected...
//-------Selected---------- Displaying & Recording Table Data
var showForm =ref(false)
function getSelectedString() {
  //---listen to selected rows & listed in Objects array.
  if (Object.keys(selected.value[0]).length == 0 && selected.value[0] == onplayRowItem.value) {
    selected.value.shift();
  }

  rowSelected = selected.value.length === 0 ? rows.value[0] : selected.value[0];
  return selected.value.length === 0
    ? ""
    : `# ${
        selected.value.length > 1 ? selected.value.length : ""
      } ,selected of ${rows.value.length}`;
}

function updateSelected() {
  // second ways of listing to selected_rows
  //////consol.log(selected, "Table Selection Happen...&Listening..");
}

//------EXPORT---SELECTED----Reporting Optionss
//=---------------------------------------------------------------------

//------------- Filtered_Request (PAGINATION)
/////////////////////////////////////========================== DATA Visualization

//------Global Analysis Data
//-------------view Port One

//----=========================================================================---DATA ---/// ---ROW----CRUD
let createKey = "";
let updateKey = "id";
let delKey = "id";

const _theService = saleitService
//ModalCrudOps

const Crud_ = {
  createData: async function () {
    let objParam = {};
    objParam[createKey] = onplayRowItem.value[createKey];

    try {
      if (Object.keys(objParam).length == 0) {
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
          notifyit.warn("Error ! .." + response[1]);
          return false;
        }
      })
      .catch(() => {
        notifyit.info("Try to reconnect...");
        return false;
      });
  },

    //------------------------------------------------------------------------
    updateData: async function () {
    let objParam = {};
    objParam[updateKey] = onplayRowItem.value[updateKey];
    try {
      if (Object.keys(objParam).length == 0) {
        notifyit.warn("Incompleted Form ?");
        return false;
      }
    } catch {
      notifyit.warn("Refresh It Please ?");
      return false;
    }

    return await _theService
      .updateData(onplayRowItem.value, objParam)
      .then((response) => {
        if (response[0]) {
          return response[1];
        } else {
          notifyit.warn("Error ! .." + response[1]);
          return false;
        }
      })
      .catch(() => {
        notifyit.info("Try to reconnect...");
        return false;
      });
  },

  readData: async function () {
    // null
    //////consol.log("readData Requested with")
    return await _theService
      .readData()
      .then((response) => { //returning as ['data'][{},{},{data..}]
      if (response) {return response;
        } else {
          notifyit.warn("Error ! .." + response);
          return false;
        }
      })
      .catch(() => {
        notifyit.info("Try to reconnect...");
        return false;
      });
  },

  //---------------------------------------------------------------
  readFData: async function (objParam) {
    try {
      if (Object.keys(objParam).length == 0) {
        notifyit.warn("Incompleted Form ?");
        return false;
      }
    } catch {
      notifyit.warn("Refresh It Please ?");
      return false;
    }

    return await _theService
      .readFData(objParam)
      .then((response) => {
        if (response) {return response[0];
        } else {
          notifyit.warn("Error ! .." + response);
          return false;
        }
      }).catch(() => {
        notifyit.info("Try to reconnect...");
        return false;
      });
  },

  //------------------filtering & searching for different Model
 //------------------filtering & searching for different Model
 genapiData: async function (modelUrl,objParam) {
  try {
      if (Object.keys(objParam).length == 0) {
        notifyit.warn("Incompleted Form ?");
        return false;
      }
    } catch {
      notifyit.warn("Refresh It Please ?");
      return false;
    }

    return await genapiService
      .readData(modelUrl,objParam)
      .then((response) => { //returning as ['data'][{},{},{data..}]
      if (response) {return response;
        } else {
          notifyit.warn("Error ! .." + response);
          return false;
        }
      })
      .catch(() => {
        notifyit.info("Try to reconnect...");
        return false;
      });
  },

  genapiFData: async function (modelUrl,objParam) {
    try {
      if (Object.keys(objParam).length == 0) {
        notifyit.warn("Incompleted Form ?");
        return false;
      }
    } catch {
      notifyit.warn("Refresh It Please ?");
      return false;
    }
    
    return await genapiService
      .readFData(modelUrl,objParam)
      .then((response) => {
        if (response) {
          return response;
        } else {
          notifyit.warn("Error ! .." + response);
          return false;
        }
      })
      .catch(() => {
        notifyit.info("Try to reconnect...");
        return false;
      });
  },

  deleteData: async function (ItemId) {
    let objParam = {};
    objParam[delKey] = ItemId;

    try {
      if (Object.keys(objParam).length == 0) {
        notifyit.warn("Incompleted Form ?");
        //return false;
      }
    } catch {
      notifyit.warn("Refresh It Please ?");
      return false;
    }
    
    return await _theService
      .deleteData(objParam)
      .then((response) => {
        if (response[0]) {
          return response[1];
        } else {
          notifyit.warn("Error ! .." + response[1]);
          return false;
        }
      })
      .catch(() => {
        notifyit.info("Try to reconnect...");
        return false;
      });
  },
};
//-----------------End Data Functions
//--------------------------------------------------------------------UTILITIED_FUNCTIONS ( LocalStarage -- Profiling)
//_____________________________________________________Functions Definitions
//-----------------------------------Loading...process...showOFF
let loaditwellcome = ref(false);
watch(loaditwellcome, (currentValue, oldValue) => loadit.wellcome());
async function setDLoading(status) {
  //handle qtable data-loading---flags
  //rowsLoading.value = ref(status);
}

//watch(warningDisplay, (currentValue, oldValue) => _confirmDialog());
const notifyit = {
  info: (notes = "", position = "bottom-right", actions = "", period = 700) => {
    $q.notify({
      //type: "info",
      message: "",
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
      spinner: false,
      html:true,
      caption: "<div style='background:transparent;color:white;width:15vw;'><p style='border-radius:10px;border:1.3px solid blue;padding:5px;margine-left:5px;background-grey'>...</p>" + notes+" </div>",
      spinner: false,
      group: "my-group", //identical messages with of same group..with show label_count..
      progress: true,
      classes:'flat'
    });
  },
  warn: (notes = "", position = "bottom-right", actions = "", period = 700) => {
    $q.notify({
      type: "negative",
      message: notes,
      position,
      actions: actions
        ? [
            {
              label: actions,
              color: "orange",
              handler: () => {
                return true;
              },
            },
          ]
        : null,
      timeout: period,
      html: true,
      caption: "",
    });
  },
  succes: (
    notes = "",
    position = "bottom-right",
    actions = "",
    period = 700
  ) => {
    $q.notify({
      type: "positive",
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
    });
  },
  simple: (notes = "", position = "top-center", actions = "Ok", period = 1000) => {
    $q.notify({
      //type: "info",
      color:"black",
      textColor:"white",
      message: "",
      position:"top",
      actions: actions
        ? [
            {
              label: actions,
              color: "red",
              handler: () => {
                return true;
              },
            },
          ]
        : null,
      timeout: period,
      spinner: false,
      html:true,
      caption: "<p style='border-radius:10px;border:1.3px solid blue;padding:5px;margine-left:5px;font-size:1rem'>" + notes+ "</p>" ,
      spinner: false,
      group: "my-group", //identical messages with of same group..with show label_count..
      progress: true,
     // classes:'flat'
    });
  },
};
//------DIALOGS
let dialogAlert = ref(false);
let confirmationRequire = ref(false);
let dialogPrompt = ref(false);

//watch(confirmationRequire, (currentValue, oldValue) => _confirmDialog());
const dialog = {
  alert: async function (message) {
    $q.dialog({
      title: "Alert",
      message: message,
    })
      .onOk(() => {
        // ////consol.log('OK')
      })
      .onCancel(() => {
        // ////consol.log('Cancel')
      })
      .onDismiss(() => {
        // ////consol.log('I am triggered on both OK and Cancel')
      });
  },

  confirm: async function (message) {
    //consol.log("confirmation dialog is up");
    $q.dialog({
      title: "Confirm",
      message: message,
      cancel: true,
      persistent: true,
    })
      .onOk(() => {
        confirmationRequire.value = true;
        ////consol.log(">>>> OK");
        return "ok";
      })
      .onOk(() => {
        ////consol.log(">>>> second OK catcher");
        return "ok2";
      })
      .onCancel(() => {
        confirmationRequire.value = false;
        ////consol.log(">>>> Cancel");
        return "cancel";
      })
      .onDismiss(() => {
        ////consol.log("I am triggered on both OK and Cancel");
        return "dismiss";
      });
  },

  prompt: async function (message) {
    $q.dialog({
      title: "",
      message: message,
      prompt: {
        model: "",
        type: "text", // optional
      },
      cancel: true,
      persistent: true,
    })
      .onOk((data) => {
        // ////consol.log('>>>> OK, received', data)
      })
      .onCancel(() => {
        // ////consol.log('>>>> Cancel')
      })
      .onDismiss(() => {
        // ////consol.log('I am triggered on both OK and Cancel')
      });
  },
};
//----- & Loading (InnerLoading)
let loaditwellcometimer = 50;
const loadit = {
  wellcome: async function (notes = "Loading...Weblog....!", period = 9000) {
    $q.loading.show({
      message: notes,
      boxClass: "bg-secondary",
      spinnerColor: "orange",
      boxClass: "transparent",
      spinnerColor: "white",
      messageColor: "black",
      backgroundColor: "black",
    });
    // hiding in 3s
    let loaditwellcometimer = setTimeout(() => {
      $q.loading.hide();
      loaditwellcometimer = void 0;
    }, period);
    return " ";
  },
  process: async function (notes = "wellcom", period = 5000) {
    $q.loading.show({
      message: notes,
      boxClass: "transparent",
      spinnerColor: "orange",
    });
    // hiding in 3s
    let timer = setTimeout(() => {
      $q.loading.hide();
      //siteLoading.value = false;
      timer = void 0;
      return "terminating";
    }, period);
  },
};

//----------------------------Utilities Funtions
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


//----logout
function logout() {
  _localStorage._clear();
  return router.push("/login");
  //return true
}
//----color_Plate
const cp =  ['red','black',"blue",'green','orange','yellow']
//------------------------------------------------------------------------------ Warming UP(BIOS_Process.....POST)
onMounted(async () => {
  saleitService.asyncAnualData().then((response) => {
    if (response) {
      //asyncAnualDatas = reactive({ a: 12 });
    }
    return true;
  });
});
</script>


  <style>


/*=====================  Fronted_Glass / Blur Styles as OverLay Background... */
.overlay-Glass {
  backdrop-filter: blur(15px);
  background-color: rgba(0, 110, 255, 0.158);
  color: rgb(0, 0, 255);
}
.overlay-Glass:before {
  background: inherit;
}
.overlay-GlassDark {
  background: inherit;
}


.marquee {
   animation:myfirst 1.5s linear infinite;
   -webkit-animation: rightThenLeft 20s linear;
}

@keyframes myfirst /* Firefox */{
           50% {
                   opacity: 50;
               }
}
</style>