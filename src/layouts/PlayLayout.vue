<template>

<q-dialog
    v-model="popUpgrader"
    transition-show="scale"
    transition-hide="scale"

    :style="{ 'background-image': 'url(' + onplayRowItem['graphicContent'] + ')' }"
  >
  <q-card style="min-width: 40vw;" class="overlay-Glass bg-white" >

    <q-stepper
      v-model="_stepUpgrader"
      vertical
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Contact Information"
        icon="settings"
        :done="_stepUpgrader > 1"
      >
       <q-item class="column q-px-md q-ma-sm">
        <q-item-section>
          Continue With
        </q-item-section>

        <q-item-section class="q-pa-sm col-auto">
          <q-input class="q-pa-sm col" standout v-model="onplayRowItem.phone" label="Phone Number ?" stack-label :dense="true" />

        </q-item-section>
       </q-item>
        <q-stepper-navigation>
          <q-btn @click="_stepUpgrader = 2" color="primary" label="Continue" :dense="true"/>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Confirmation"
        caption="we just sent, confirmation sms code !"
        icon="create_new_folder"
        :done="_stepUpgrader > 2"

      >
       
        <q-input class="q-pa-sm col" standout v-model="text" label="Code ?" stack-label :dense="true" />

        <q-stepper-navigation>
          <q-btn @click="_stepUpgrader = 3" color="primary" label="Continue" />
          <q-btn flat @click="_stepUpgrader = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Profiling"
        caption="registration form"
        icon="create_new_folder"
        :done="_stepUpgrader > 3"
      >
       <div class="q-gutter-sm row">

        <q-input class="q-pa-sm col" standout v-model="onplayRowItem.name" label="FirstName" stack-label :dense="true" />
        <q-input class="q-pa-sm col" standout v-model="onplayRowItem.lastName" label="LastName" stack-label :dense="true" />
        <q-separator inset />
        <q-input class="q-pa-sm col" standout v-model="onplayRowItem.userName" label="UserName" stack-label :dense="true" />
       </div>

       <div class="q-gutter-sm column">
        Address
        <div class="row">
        <q-input class="q-pa-sm col" standout v-model="onplayRowItem.address.Country" label="Country" stack-label :dense="true" />
        <q-input class="q-pa-sm col" standout v-model="onplayRowItem.address.Provinance" label="Provinance" stack-label :dense="true" />
        <q-separator inset />
        <q-input class="q-pa-sm col" standout v-model="onplayRowItem.address.City" label="City" stack-label :dense="true" />
      
        </div>
  </div>

        <q-stepper-navigation>
          <q-btn @click="_stepUpgrader = 4" color="primary" label="Continue" />
          <q-btn flat @click="_stepUpgrader = 2" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>

      </q-step>

      <q-step
        :name="4"
        title="Create an ad"
        icon="add_comment"
      >
      <div v-if="_isupgraded">
        Completing...
      </div>
      <div v-else>
        <div v-if="_isauthenticated">
          Succeffully Upgraded.
        </div>
        <div v-else>
          Please try again.
        </div>
      </div>

        <q-stepper-navigation>
          <q-btn color="primary" label="Finish" @click="upgradeMe()" />
          <q-btn flat @click="_stepUpgrader = 3" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>


      </q-card>


</q-dialog>


<q-dialog v-model="popGraphicBox" class="column overlay-Glass rounded-borders" >
      <!--CameraFeeds  @Picture-taken="imageSrc = $event" / -->
      <div class="column" style="background-color:whitesmoke;
        border: 1px dashed #d6d6d6;
        border-radius: 4px;
        padding: 2px; 
      " > 
     

       <div v-if="_graphicSource == 'folder'"> 


       </div>
        <div v-else-if="_graphicSource == 'camera'">
              <div  class="col bg-white row fit" >
                  <video  clas="col-2" ref="liveFeedStreaming"  autoplay  playsinline style="width:100%"></video>
                  <canvas id="graphicCanvas" ref="graphicCanvas"  width="200px" height="200px" style="display:none">                                 
                  </canvas>
                  <q-img :src="_fileSRC"  style="width:100px; height: 100px" />  
              </div>

              <div class="q-pa-sm q-gutter-sm row justify-between"> 
                <div>
                  <q-btn rounded  color="negative" size="sm" label="close" @click="_cameraModule._stopCamera()" />
                  <q-btn rounded  color="green" size="sm" label="save" @click="_cameraModule._saveScreenShoots()" />
                  <q-btn rounded  color="primary" size="sm" label="capture" icon="camera" @click="_cameraModule._screenShoot()"/>
                </div>
               
                <div size="col-auto row">
                 
                  <q-expansion-item 
        switch-toggle-side
        expand-separator
        icon="camera" size="xs"
      >
              <q-item v-for="camera in _listCameraSource" :key=camera class="row q-gutter-sm">  
                              <q-btn style="height:100%" no-caps size="sm" :dense="true" :color="_selectedCameraById == camera.deviceId ? 'blue':'black'" :label="camera.label.split('_')[1]" @click="_cameraModule._setCameraParam(camera.deviceId,false)" />
                              <q-btn style="height:100%" no-caps size="sm" :dense="true" :color="_selectedCameraById == camera.deviceId ? 'orange':'black'" :label="_selectedCameraByface ? 'Front Cam':'Back Cam'" @click="_cameraModule._setCameraParam(camera.deviceId,!_selectedCameraByface)" />
                           
                            </q-item>
              </q-expansion-item>

                   
                </div>
                <!--div size="col-auto row"> {{  _listMicSource }}
                    <q-item v-for="mic in _listMicSource" :key=mic class="column">                                                     
                      <q-btn style="height:100%" no-caps size="sm" :dense="true" :color="_selectedMicById == mic.deviceId ? 'blue':'black'" :label="mic.label.split('_')[1]" @click="_cameraModule._selectedMicId(mic.deviceId)" />
                    </q-item>
                </div-->
              </div>

        </div>
             
      
	       
	    </div>
</q-dialog>

<!--walls-->
<!--layOuts-->
   <q-layout view="hHh lpr fff"  class="shadow-3 " container="fit" :class="$q.dark.mode ? 'body--dark' : 'body--light'" >
 
     <!--Headers-->
     <q-header elevated class="text-grey-8 q-py-xs" height-hint="5" style="background-color:orange;">
       <!--toolBars-->
     <q-toolbar>
       <q-btn
         flat
         dense
         round
         @click="toggleLeftDrawer"
         aria-label="Menu"
         icon="menu"
       />
       <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs" shrink>
         <q-icon :name="fabYoutube" color="red" size="28px" />
         <q-toolbar-title shrink class="text-weight-bolder text-grey" style="color: rgb(218, 218, 218);text-shadow:0 1px 0 #3B3B3B;">
           saleIt 
         </q-toolbar-title>
       </q-btn>
          <q-btn  @click="popUpgrader = !popUpgrader" flat no-caps  v-if="_isauthenticated && !_isupgraded" >
              UpgradeMe
          </q-btn>
       <q-space />

       <!--- Searching/filtering Service-->
       <q-input rounded outlined dense class="" color="green" v-model="lytSearchRow" placeholder="Search "  >
           <template v-slot:prepend>            
             <q-icon name="clear"  class="cursor-pointer"  />
           </template>
         </q-input>
      <!--upload Button-->
       <q-btn v-if="$q.screen.gt.xs" flat dense no-wrap color="white" @click="lytCreatRow = !lytCreatRow" icon="cloud_upload" no-caps label="Create" class="q-ml-sm q-px-md" />
       <!---service Choosing Ddowns-->
       <q-btn-dropdown auto-close stretch flat v-if="$q.screen.gt.xs" size="md">
          <template v-slot:label>
            <div class="row q-px-sm">
              <div class="row justify-around items-center no-wrap q-px-sm">
                <q-icon name="add" />
              </div> 
              <div class="row text-grey-7  items-center no-wrap" style="text-transform: capitalize;">
                itServices
              </div>
            </div>
          </template>

          <q-list>
            <q-item aria-hidden="true">
               <q-item-section class="text-uppercase text-white" style="font-size: 0.7rem">select service</q-item-section>
             </q-item>

            <q-item clickable @click="tab = 'Saleit'">
              <q-item-section>Sale Service</q-item-section>
            </q-item>

            <q-item clickable @click="tab = 'Rentit'">
              <q-item-section>Renting Service</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
       <q-space />

       <div class="q-gutter-sm row items-center no-wrap text-white">
        <q-item-label v-if="$q.screen.gt.xs">
          {{  onplayRowItem.name }}
        </q-item-label>
         <q-btn round dense flat color="text-grey-7" icon="apps">
           <q-tooltip>itService Apps</q-tooltip>
         </q-btn>

         <!--q-btn round dense flat color="grey-8" icon="notifications">
           <q-badge color="red" text-color="white" floating>
             2
           </q-badge>
           <q-tooltip>Notifications</q-tooltip>
         </q-btn-->
         <q-btn round flat @click="toggleLeftDrawer">
           <q-avatar >
             <img :src="onplayRowItem.profile">
           </q-avatar>
           <q-tooltip>User</q-tooltip>
         </q-btn>
       </div>
     </q-toolbar>

   </q-header>
<!--drawer-Left-->

      <q-drawer
            v-model="leftDrawerOpen"
            bordered
            :breakpoint="0"
            side="left" overlay elevated
          >
         
          <q-scroll-area class="fit column" >
            <!----profile graphics/imaging-->
            <q-card class="my-card" flat bordered>             
        
            <q-img :src="_fileSRC && graphicColumn[0] =='cover' ? _fileSRC : onplayRowItem.cover"  class="column"  style="width: 100%;aspect-ratio: 2/1;">

              <div class="absolute-top transparent column items-start">
                    <div class=" transparent row">
                      <q-btn round flat icon="more_vert" class="col-auto" @click="onplayRowItemOps = 'covering'" >
                      <q-menu auto-close :offset="[2, 2]" anchor="bottom right" self="bottom left">
                            <input type="file" multiple ref="filec"  style="display: none" @change="_folderProfiling($event,'cover',0)" /> 

                            <q-btn icon="folder" @click="$refs.filec.click()" :dense="true" />
                            <q-btn icon="add_a_photo" @click="_cameraModule._openCamera('cover',0)" :dense="true"  />
                      </q-menu>
                      </q-btn>
                    </div>
              </div>
             
              <div class="absolute-center rounder-borders" style="width:5em;height: 5em;">
                <q-img :src="_fileSRC && graphicColumn[0] =='profile' ? _fileSRC : onplayRowItem.profile"   class="absolute-center fit" style="border: 1px solid white;"  />    
              </div>
              </q-img>
              <!---- for_Name -- -->
              </q-card>
              <q-card class="row justify-between items-center q-px-sm"> 
                <!---profile_update-->
            <div>            
            <input type="file" multiple ref="filep" style="display: none" @change="_folderProfiling($event,'profile',0)" /> 
            <q-btn icon="folder" @click="$refs.filep.click()" :dense="true" />
            <q-btn color="grey-4" text-color="purple" glossy  icon="camera_enhance" @click="_cameraModule._openCamera('profile',0)" :dense="true" />
            </div>
          
            <div> 
              <q-btn class="gt-xs" size="12px" flat dense round icon="done" @click="updateUser()"  />              
              (p)</div>
          
              </q-card>
            <!----profile basic informations-->
          <q-list padding class="col-2">
            <q-item-label class="row justify-between" header>
              
              <q-btn size="12px" flat dense  label="My Services"/>                        
              <q-btn size="12px" flat dense round icon="more_vert" @click="onplayRowItemOps = 'cgrap'"/>                        
            </q-item-label>

            <q-item>
              <q-item-section>
                <q-item-label overline>{{  onplayRowItem.username }}</q-item-label>
                <q-item-label>{{ onplayRowItem.name }} {{ onplayRowItem.lastName }}</q-item-label>
                <q-item-label caption> ....</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>Lup : {{  onplayRowItem.updatedAt }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator spaced />
            <q-separator spaced inset="item" />
<!----Personal Information  onplayRowItemOps -->
            <q-item-label header class="row justify-between">Client Information () 
              <div>                   
              <q-btn class="lt-xs" v-if="$q.screen.lt.xs && onplayRowItemOps == 'cinfo'" size="12px" flat dense round icon="done" @click="updateUser()" />          
              <q-btn size="12px" flat dense round icon="more_vert" @click="onplayRowItemOps = 'cinfo'"/>
              </div>
            </q-item-label>

            <q-item v-for="cinfo in ['name','lastName','userName','userID']" :key="cinfo">
              
                    <q-item-section>
                    <q-item-label style="text-transform: capitalize;" v-if="onplayRowItemOps == 'cinfo'">
                      <q-input standout v-model="onplayRowItem[cinfo]" :label="cinfo" stack-label :dense="true"  />
                    </q-item-label>      
                    <q-item-label style="text-transform: capitalize;" v-else>
                      <q-input standout v-model="onplayRowItem[cinfo]" :label="cinfo" stack-label :dense="true" readonly />
                    </q-item-label>    
                  </q-item-section>

                    <q-item-section side >
                      <div class="text-grey-8 q-gutter-xs" v-if="onplayRowItemOps == 'cinfo'">
                        <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="onplayRowItem[cinfo] = ''" />
                        <q-btn class="gt-xs" size="12px" flat dense round icon="done" @click="updateUser()" />
                      </div>
                    </q-item-section>
            </q-item>
              {{  _file  }}
              <!------Address Informa-->
              <q-separator spaced inset="item" />
            <q-item-label header>Better_Address ~ Effective Client Service</q-item-label>

            <q-item class="q-py-none q-my-none column" v-for="cinfo in ['address','__liveCord']" :key="cinfo">
              
                    <q-item-section>
                    <q-item-label style="text-transform: capitalize;">{{ cinfo }}</q-item-label>
                    <q-item-label caption class="q-pa-none q-ma-none row" v-if="!nul.includes(onplayRowItem[cinfo])">
                              <q-item v-for="cinfoo in Object.keys(onplayRowItem[cinfo])" :key="cinfoo" class="row q-px-xs">                                
                              {{ cinfoo }}:  {{onplayRowItem[cinfo][cinfoo] }}                       
;
                        </q-item> 

                    </q-item-label>
                    
                  </q-item-section>

                  

            </q-item>

            
            </q-list>

            <q-separator spaced inset="item" />

            <q-badge v-if="_isupgraded" class="justify-between q-pa-xs q-mx-md"> Upgraded</q-badge>
            <q-badge v-else class="justify-between q-ma-sm bg-red"> upgrade. to unleash our service!</q-badge>

          </q-scroll-area>

          <q-item-label header class="absolute-bottom row justify-between bg-grey-5 text-dark">
            itService V0.1
            <q-btn :dense="true" no-caps  class="q-pa-none" flat size="sm" :label="_languages[preferedLang]" @click="_setLanguages()" />
            <q-item-label>&copy;2023 </q-item-label> 

           </q-item-label>

      </q-drawer>

<!---drawer-Left-->

   <q-page-container style="" class="">
     <router-view 
            :_profile="onplayRowItem"
            :id="onplayRowItem.id"
            :userID="onplayRowItem.id"
            :userName="onplayRowItem.userName"

            :_anyAccess="_anyAccess"
            :_isupgraded="_isupgraded"
            :_ispremium="_ispremium"
            :_iss="_iss"

            :_priviledgedFor="_priviledgedFor"
          
            :_modalPriviledges="_modalPriviledges"
          
            :lytCreatRow = "lytCreatRow" 
            :lytSearchRow = "lytSearchRow" 
           
            />
     <!--sticky_icons---inside-containers-->

     <q-page-sticky v-if="$q.screen.gt.sm" expand position="left" class="q-px-xs">

       <q-card class="iserviceMenu-Glass q-pa-none column" >
      
         <q-btn :dense="true" :label="iservice[2]" :icon="iservice[1]" flat  stack no-caps  class=" " 
         @mouseover="iservice[3] = true" @mouseleave="iservice[3] = false"

         v-for="iservice in iservicei_Menu" :key="iservice">
         
         <q-menu anchor="top right"   v-model="iservice[3]"
         self="top left"  @mouseover="iservice[3] = true" @mouseleave="iservice[3] = false"
         flat  stack no-caps  class="row q-gutter-none" >
           <q-list style="min-width: 100px">
           <q-item clickable>
             <q-item-section>   
                 <div class="text-bold">{{  iservice[2] }}</div>
               </q-item-section>
           </q-item>

           <q-item >
             {{  iservice[0] }}
           </q-item>

           </q-list>
         </q-menu>
        
         </q-btn> 

         <q-btn round flat icon="message" />

         <q-btn round flat icon="more_vert">
q
           <q-menu auto-close :offset="[2, 2]" anchor="bottom right" self="bottom left">

             <q-list >
               <q-item clickable>
                 <q-item-section>New group</q-item-section>
               </q-item>
               <q-item>
                 <q-toggle
                   size="xs"
                   val="xs"
                   toggle-indeterminate
                   toggle-order="ft"
                   v-model="toglColor"
                   label="Mode"
                   color="blue"
                   :class="{
                     'text-black ': $q.dark.isActive,
                     'text-white': !$q.dark.isActive,
                   }"
                   @click="$q.dark.toggle()"
                 />
      

               </q-item>
             </q-list>
           </q-menu>
         </q-btn>

       </q-card>
     </q-page-sticky>


     <!--sticky-ends-->

   </q-page-container>

 </q-layout>


</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeMount, watch } from "vue";

import { exportFile, useQuasar, useMeta } from "quasar";

//import userProfile from "src/components/userProfile.vue"
import { timeStore } from "src/stores/jstStores/serviceStore.js";
import { useRouter } from "vue-router";

import { profileStore } from "src/stores/authenticatedStore/profileStore";
import { genapiStore } from "src/stores/jstStores/genapiStore";

//--------------
const $q = useQuasar();
//-----------Store & Service
const profileService = profileStore();
const genapiService = genapiStore(); //import { genapiStore } from "src/stores/jstStores/genapiStore";
const timeService = timeStore(); // intializes
const router = useRouter();

//const $m = useMeta()

const metaData = {
  // sets document title
  title: "iService",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - DashBoard`,

  icon:"/public/icons/favicon-32x32.jpg", 
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

let nul = ref([undefined, "", null, false, "false", 0,[],{},NaN]);
function ArrayHaseem (base,items)  { //checking arrays within arrays
  return items.some(value => base.includes(value)) ? true : false };
///var keyhasValue = (key) => !nul.value.includes(reqData[key]) && Object.keys(reqData[key]).length != 0 ? true : false;

//-----------------
let nowDate = new Date().getDate();
let todayImage = ref("bg-Image" + nowDate);

//$q.dark.toggle()

//-------
var lytSearchRow =ref('')

//------variables
var leftDrawerOpen =ref(false) //hide & show sideBar
var _stepUpgrader=ref(1)
var _popUpgrader =ref(false)

function upgradClient() { 
  _popUpgrader.value = !_popUpgrader.value
  return;}

var lytCreatRow =ref(false)
function NewContent() { 
  lytCreatRow.value = !lytCreatRow.value
  return;}


  //import CameraFeeds from "components/CameraFeeds.vue"
let popGraphicBox =ref(false)
let imageSrc =ref(null)
  //lytCreatRow
//-----------------------Local Varialbles
var iservicei_Menu = ref();
iservicei_Menu.value={
 'payIt':["pay Barcode,telebir","photo","payIt",false],
 'saleIt':["Anything To Sale ?","photo","saleIt",false],
 'rentIt':["Anything For Rent ?","collections_bookmark","rentIt",false],
 'market':["Show current Market Price","assistant","marketIt",false],
 'orderIt':["Looking Service you Like!","group","orderIt",false],
 'locateIt':["Locate Your Need","import_contacts","locateIt",false],
}

//-----Layout_Style & behaviors

//-------bots(littleService)
function toggleLeftDrawer () {
     leftDrawerOpen.value = !leftDrawerOpen.value
     return true;
   }

//-------

//------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2----ModalSkeltone [ profileSchema]
//-----user Schema
import { profileSchema } from "src/composables/schemas/profileSchemas";
import schemaSklt from "src/composables/schemaSklts";

let modals = nul.value.includes(profileSchema["acctype"]) ? {} : profileSchema["acctype"]
var _modalPriviledges = reactive(modals);

//===============================================-----------------------------------------
//------------- MODAL ROWs_ MANAGMENT

var columnss = ref([]); //Actual Table_Columns ++Descriptions
var topLayerColumns = ref([]); //Actual OuterMost Table_Column_Names [Top(Layer_1] _Columns _Name_List]
let authorizedColumns = ref([]); //Filtered/Authorized_Table_Columns ++Descriptions for Editing/Adding.... but not Viewing
//------column invisiblity on table_
var lockedColumns =ref([false,false])
//---
let defaultItem = ref({});
let onplayRowIndex = ref(-1); //the selected row_index_data...HOlding the lastIndex+1 ---temp index_value
let onplayRowItem = ref({}); //the selected row_actual_Data..as object
let onplayRowItemOps = ref(''); //the selected row_actual_Data..as object

//===============================================-----------------------
//-------------Syncing Columns
//
async function resetColumnDependent() {
  authorizedColumns.value = [];
  topLayerColumns.value = [];
  return true;
}

const topLayerColumn = async (schemaColumn) => topLayerColumns.value.push(schemaColumn); //Holding topLayer Name of Columns
const authorizedColumn = async (_col) =>  authorizedColumns.value.push(_col);  //( Object List of author_columns Details)

//after building the topLayerColumns/authorizedColumns/visibleColumns...build the schema_data_scheltons (for Crud)
async function _buildSchemaForm() {
  if (!authorizedColumns.value.length) {
    //return null;
  }

  onplayRowItem.value = await schemaSklt(authorizedColumns.value);
  console.log(onplayRowItem.value)
  //logUser(["userID"]); //
  defaultItem.value = reactive(onplayRowItem.value);
  return "";
}

async function logUser(userkeyList) {
  for (let kkey in userkeyList) {
    let ittem = userkeyList[kkey];
    try {
      //onplayRowItem.value[ittem] = Objprops._profile[ittem];
    } catch {}
  }
}

var columns = function () { 
  if (Object.values(profileSchema).length === 0) {
    return [{}];
  } else {
    resetColumnDependent();
    let tempColumns = []; //HOLDING_  all the Columns of the Data_model ( TOTAL Columns)

    for (let schemaColumn in profileSchema) {
      let _col = { 
        name: schemaColumn,
        schema: profileSchema[schemaColumn],
        label: schemaColumn,
      };

      topLayerColumn(schemaColumn); //---List Out topLayerColumns_NAME in ARRAY ( TOTAL topNames)
      tempColumns.push(_col);

      if (schemaColumn === "extraColumn" || lockedColumns.value.includes(schemaColumn)) {
        continue;
      } else {

        authorizedColumn(_col); //

      }
    }
    //_buildSchemaForm();
    return tempColumns;
  }
};
//columns()

//--------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-------USER PRofile and Privileges

//-------------USER PROFILE_Variables..
let _profile = reactive({}); //user Datas all there is...
//---
let _isRegistered = ref({});//
var _isauthenticated=ref(false)

//--
let id = ref("");
let userID = ref("");
let userName = ref("");
let _Modals = ref("");

let _phone = ref("");
let _address = ref("");
let __liveCord=ref({})

//--------
let _anyAccess = ref({});//_isRegistered
let _isupgraded = ref({});
let _ispremium = ref({});
let _iss = ref({});

let _priviledgedFor = ref({});

//----------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@22-------Operating with USER
//---------upgrading /creting account pop
let popUpgrader = ref(false); //prepare thepopup form
watch(popUpgrader, (currentValue, oldValue) => {
  currentValue ? false : _closeDialog();
});

//--------------
function _closeDialog() {
  popUpgrader.value = false;
  return;
}

//----------
var _graphicSource =ref()//
//var _fileSRC =ref('')//_fileSRC
var graphicColumn =ref(["",""]) //does give _image_attribute has single/multiple values of images ( sends it as 'file':name_attr, or 'files':name_attr)

var _file =ref()
var _fileSRC =ref()
//var _cov=document.getElementById('_fileSRC') 
function _folderProfiling(e,_graphicName,_graphicNameisArray) {
        //popGraphicBox.value=true
       _graphicSource.value='folder'
       graphicColumn.value=['','']
      // Check if file is selected
      _file.value= nul.value.includes(e.target.files) && e.target.files.length ==0 ? false : e.target.files;

      if (_file.value) {
        graphicColumn.value[_graphicNameisArray]=_graphicName
        var file = e.target.files[0]
        //_fileSRC.value['src'] = URL.createObjectURL(e.target.files[0])
        if (e.target.files[0]) {
          _fileSRC.value = URL.createObjectURL(file)
        } else {
          console.log("Invalid file");
        }
      }
    }


var liveFeedStreaming =ref({})
var liveFeed =ref('')

var _listDevices =ref({})

var _selectedCameraById =ref('')
var _selectedCameraByface =ref(true)

var _listCameraSource =ref([])

var _selectedMicById =ref('')
var _listMicSource =ref([])

var _liveFeedStreamingHeight =ref('')
var _liveFeedStreamingWidth =ref('')
//
const audioConstraints = ref(false)
const videoConstraints = ref({
    facingMode: 'user',
    aspectRatio: { min: 1, max: 1.7777777778 },
    width: {
      min: 1280,
    },
    height: {
      min: 720,
    }
  });


var graphicCanvas =ref({})
graphicCanvas.value['width']= 100;//window.innerWidth;
graphicCanvas.value['height']=100;//window.innerHeight;
//graphicCanvas.getContext('2d');
var graphicCanvasCtx =ref('')

//var graphicCanvasCtx =ref({})

//----------

var SCALAR=0.6
var SIZE = reactive({x:0,y:0,width:0,height:0})

var _cameraModule ={

    _init:async ()=>{

      try {
        _listDevices.value['getUserMedia'] = nul.value.includes(navigator.mediaDevices.getUserMedia) ? false : navigator.mediaDevices.getUserMedia         
        for(let mediaDevice of ['webkitGetUserMedia','mozGetUserMedia','msGetUserMedia']){
          var _doesCamera = nul.value.includes(navigator[mediaDevice]) ? false : navigator[mediaDevice]
          if(_doesCamera){
            _listDevices.value[mediaDevice] = _doesCamera
          }
        }
        
      } catch (error) {
        console.log('Error No Camera Detected...Know this');
      }       

      return true
    },

    _openCamera:async (_graphicName,_graphicNameisArray)=>{

          _graphicSource.value='camera'   
          popGraphicBox.value=true
          _fileSRC.value = ''
          graphicColumn.value[_graphicNameisArray]=_graphicName

          //------------------
          //--------
          if(_selectedCameraById.value == ''){//if 'user'
            videoConstraints.value['facingMode']=_selectedCameraByface.value ? 'user':'environment'
          }
          else{
            videoConstraints.value['deviceId'] = { exact: _selectedCameraById.value };
            videoConstraints.value['facingMode'] = _selectedCameraByface.value ? 'user':'environment'
          }
        
        if (_listDevices.value['getUserMedia']) {  //in priority use ( this device_ for media_sources)
        //booting the feed ( for streaming...)
        liveFeed.value = await navigator.mediaDevices.getUserMedia({video:videoConstraints.value,audio:audioConstraints.value})                                                        
                                                          
        //initialize the video streaming                                                                                                  
        liveFeedStreaming.value['srcObject']= liveFeed.value
        //liveFeedStreaming.value.play()
        liveFeedStreaming.value.onloadedmetadata = () => {  liveFeedStreaming.value.play(); };
      }
      navigator.mediaDevices.enumerateDevices().then((camList)=>{
        _listCameraSource.value = []
        for(let index in camList){
          let graphicDevice = camList[index]
          console.log('graphic device',graphicDevice)
          if (graphicDevice.kind === 'videoinput') {
              _selectedCameraById.value = graphicDevice['deviceId'] //default camera_id
              _listCameraSource.value.push(graphicDevice) //listing all available_camera media_device
          } 
          else{//for audio input
            _selectedMicById.value=graphicDevice['deviceId']  //default mic_id
            _listMicSource.value.push(graphicDevice) //listing all available_mic media_device
          }
        }
        })
        return true;
    },
    _stopCamera:async ()=>{
      liveFeed.value.getTracks().forEach(_streamTrack => {  
              _streamTrack.stop();
            })
      //------
      graphicColumn.value['','']
      liveFeedStreaming.value.src=null
      _fileSRC.value = ''
      popGraphicBox.value=false
      return true
    },
    _pauseCamera:async ()=>{liveFeedStreaming.value.pause()},
    _playCamera:async ()=>{liveFeedStreaming.value.play()},
    //liveFeedStreaming.value.pause();
    _saveScreenShoots:async ()=>{
      _file.value=graphicCanvas.value //uploadable content
      liveFeed.value.getTracks().forEach(_streamTrack => {  
              _streamTrack.stop();
            })
      
     graphicCanvas.value.toBlob((blob) => {
          _file.value = new File([blob], "fileName.jpg"+String(new Date()), { type: "image/jpeg" },0.9)
        
        }, 'image/jpeg')

      liveFeedStreaming.value.src=null
      popGraphicBox.value=false
      return true
    },
    _screenShoot:async ()=>{
     graphicCanvasCtx.value= graphicCanvas.value.getContext('2d');
     graphicCanvasCtx.value.drawImage(liveFeedStreaming.value, 0,0, graphicCanvas.value.width, graphicCanvas.value.height);
     //graphicColumn.value[0] =='profile'
     var photoDataUrl = ''
     try{
      photoDataUrl = graphicCanvas.value.toDataURL('image/png'); //jpeg
     }catch{
      photoDataUrl = graphicCanvas.value.toDataURL('image/jpeg'); //jpeg
     }

     _file.value=photoDataUrl;
     _fileSRC.value = photoDataUrl; //viewable content
      return true
    },
    //--------------setting camera_view & Mic
    _setCameraParam:async (cameraID='',_facetoggler=false)=>{  //switching camera
      _selectedCameraByface.value=_facetoggler     
      _selectedCameraById.value =cameraID      
      return await _cameraModule._openCamera()    
    },
    _setMicParam:async (audioID='')=>{
      _selectedMicById.value = _listMicSource.value['deviceId'][audioID]
      return await _cameraModule._openCamera()
    },
}
_cameraModule._init(); //initialize camera for listing_Device discoverable

//_cameraProfiling()
//---------------Automatically register all visitors (Basic Infor...Phone_)
//-----------

async function upgradeMe(what = "") {  //updating User DAta with no graphic to update
  onplayRowItem.value['acctype'] = {'profileMeta':'creator_rwx','profile':'creator_rwx','saleit':'upgraded'}

  return await Crud_.updateData()
    .then((response) => {
      if (response) { 
        onplayRowItem.value =response
        _isauthenticated.value=true
        _isupgraded.value=true
        _ispremium.value=true
        notifyit.succes("Registered Succefully", null, null, 7000);
      } else { }
      return true;
    })
    .catch((error) => {//_popUpgrader.value = false;
      _isupgraded.value=false
      return false;
    });
}

async function updateUser(_isFileCapsulated = false) { //updating User DAta with graphic to update
  
  //is File Encapsulated ( if so ) ... extract the file by choosing ( either it was from folder or from camera_directlly )
  var __fileAttrName =nul.value.includes(graphicColumn.value[0]) ? false : graphicColumn.value[0]
  var __filesAttrName =nul.value.includes(graphicColumn.value[1]) ? false : graphicColumn.value[1]
  graphicColumn.value=[false,false]

  if(__fileAttrName || __filesAttrName){
      onplayRowItem.value['upload']={'file':__fileAttrName,'files':__filesAttrName}
      //onplayRowItem.value[__fileAttrName]=_file.value[0]

      if(_graphicSource.value =='camera'){
        onplayRowItem.value[__fileAttrName]=_file.value
      }else{
       onplayRowItem.value[__fileAttrName]=_file.value[0]       
      }
    }

    //---uploading graphic content
    return await Crud_.updateData()
        .then((response) => {
          if (response) { 
            onplayRowItem.value =response
            notifyit.succes("Profile/Cover Updated Succefully", null, null, 7000);
          } else { }
          return true;
        })
        .catch((error) => {//_popUpgrader.value = false;
          return false;
        });
}

//-----------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---- authentication Auditors and Setup

//--------------------------------------------------------------------Profiling (CHECK AUTHENTICATIONS &&& USER INFORMATIONS)
var _profileInformation = async () => {
    id.value = nul.value.includes(_localStorage._get("id")) ? false : _localStorage._get("id"); // check if _it's authenticated_with it's user_id
    //userID.value = _localStorage._get("userID"); // rolling key of users
    _isRegistered.value = nul.value.includes(_localStorage._get("_isRegistered")) ? false : _localStorage._get("id"); // check if _it's authenticated_with it's user_id

    
    if(!id.value || !_isRegistered.value){
    return false
    }
    //-----------------   

    _anyAccess.value = reactive(_localStorage._get('_anyAccess')); // check if _it is Priviledges_box has options
   
    //---------
    _phone.value = _localStorage._get("phone"); // check if _it is Priviledges_box has options

    //-----------------
    if(_anyAccess.value){
      _iss.value = (_localStorage._get("_iss")); // check if _it is Priviledges_box has optionss
      _Modals.value = _localStorage._get("_Modals"); // check if _it is Priviledges_box has options
      _priviledgedFor.value = (_localStorage._get("_priviledgedFor")); // check if _it is Priviledges_box has options
      try{
        _isupgraded.value =  nul.value.includes(_localStorage._get("_isupgraded"))  ? false : _localStorage._get("_isupgraded")  //is admin/creator...
        _ispremium.value =  nul.value.includes(_localStorage._get("_ispremium"))  ? false : _localStorage._get("_ispremium")  //is admin/creator...
      }catch{}
    }

    var fetchService = {};
    //fetchService["returnWat"] = {};
    //fetchService["limits"] = 1;
    fetchService["phone"] = _phone.value;
 
    await Crud_.genapiFData('/profileapi/profile',fetchService).then((response) =>{
      //console.log(response[0],'RRRRRRRRRRR')
      onplayRowItem.value=response[0]
      return true
        if(response && response.length){     
           onplayRowItem.value = response[0]; 
           //onplayRowItem.value['id']=response[0]['id'] //id_skeltons_value wan't in
          _isauthenticated.value=true 
          //confirmKeyID.value = onplayRowItem.value.keyID
          return true
        }else{}

        return true

    }).catch((error)=>{
      return false
    })
    return true
  
};

//---------@@@@@@@@@@@@@@@@@@@@-------------General Functions and Service
var _languages =['English','Tigrigna']
var preferedLang =ref(0)
async function _setLanguages() {
  preferedLang.value = preferedLang.value ? 0 : 1
  return true
}
//------Local Storage___
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

//------logout
function logout() {
  _localStorage._clear();
  return router.push("/");
  //return true
}

//-------Redirecting Routes ------
async function redirectto(routes,key) {
return router.push({path:routes[1], name:key,query:{_request_id:"dblyt"+key},meta: {_user3A:_priviledgedFor.value[key],_isauthenticated:true},params: {_user3A:_priviledgedFor.value[key],id:id.value,id: id.value,_thisusertoken: "date-22-02-22"} } ); //is slim enter , it doesn't create loudness in router_gates 
}

const responsiveHxW = computed(() => ({  //computer Screen size on gowing
     height: $q.screen.height+'px',
     width: $q.screen.width + 'px'
   }))

//----------------
let createKey = "phone";
let updateKey = "id";
let delKey = "id";

const _theService = profileService
//ModalCrudOps
//---------------notifications services
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

//-----------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-----------ON-Mouted Operations and Authentications
var acctype_=false //is user annoymouse or priiledged ?
onMounted(async () => {  //--------------ON MOUNT
  //_localStorage._clear()
  //------
  return await _profileInformation()
    .then(async (resp) => {
      console.log(resp,'onmouted response..')
      if (!resp) {
          timerResponse(4000, "scrumbled privilege detected").then((response) => {
           return router.push({path:"/",name:'sign' } ); 
        });
      }
      notifyit.succes("Wellcome " + onplayRowItem.value["name"] + " @itService");
      acctype_=true
      return router.push({path:"/play", name:'playTrends',query:{_request_id:"gpg"+'nnpriv'},params: {} } );  //for authenticated, but not upgraded_user
    })
    .catch((respError) => {
        console.log(respError,'onmouted response..22')
        timerResponse(3000, "scrumbled privilege detected").then((response) => {
         return  router.push({path:"/",name:'sign' } ); 
      });
    });
});

async function timerResponse(period = 6000, message = "") {
  //pageLoadingNote.value = message;
    setTimeout(() => {
    //pageLoading.value = false;
    return true;
  }, period);
}

//--
timeService.timeMachine();

//------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@------------Modal CRUD_OPs

</script>

<style>



</style>
