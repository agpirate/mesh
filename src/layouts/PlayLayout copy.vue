<template>

<q-dialog
    v-model="popUpgrader"
    transition-show="scale"
    transition-hide="scale"

    :style="{ 'background-image': 'url(' + onplayRowItem['graphicContent'] + ')' }"
  >

      <q-card>


      </q-card>

  </q-dialog>
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
        <q-input class="q-pa-sm col" standout v-model="onplayRowItem.location.country" label="Country" stack-label :dense="true" />
        <q-input class="q-pa-sm col" standout v-model="onplayRowItem.location.provinance" label="Provinance" stack-label :dense="true" />
        <q-separator inset />
        <q-input class="q-pa-sm col" standout v-model="onplayRowItem.location.city" label="City" stack-label :dense="true" />
      
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
        <div v-if="getLogStatus._isRegistered">
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


<q-dialog v-model="_cameraBox" class="column overlay-Glass rounded-borders" >
      <!--CameraFeeds  @Picture-taken="imageSrc = $event" / -->
      <div class="column" style="background-color:whitesmoke;
        border: 1px dashed #d6d6d6;
        border-radius: 4px;
        padding: 2px; 
      " > 
     
       <div v-if="_fileSourceFoCam == 'folder'"> 
       </div>
        <div v-else-if="_fileSourceFoCam == 'camera'">
              <div  class="col bg-white row fit" >
                  <video  clas="col-2" ref="_liveFeedRawStreaming"  autoplay  playsinline style="width:100%"></video>
                  <canvas id="graphicCanvas" ref="graphicCanvas"  width="200px" height="200px" style="display:none">                                 
                  </canvas>
                  <q-img :src="_fileSRC"  style="width:100px; height: 100px" />  
              </div>

              <div class="q-pa-sm q-gutter-sm row justify-between"> 
                <div>
                  <q-btn rounded  color="negative" size="sm" label="close" @click="_navClass._stopCamera()" />
                  <q-btn rounded  color="green" size="sm" label="save" @click="_navClass._saveScreenShoots()" />
                  <q-btn rounded  color="primary" size="sm" label="capture" icon="camera" @click="_navClass._screenShoot()"/>
                </div>               
                <div size="col-auto row">
                 
                  <q-expansion-item 
        switch-toggle-side
        expand-separator
        icon="camera" size="xs" v-if="_listCameraSource.length"
      >
              <q-item v-for="camera in _listCameraSource" :key=camera class="row q-gutter-sm"> 
               
                              <q-btn style="height:100%" no-caps size="sm" :dense="true" :color="_selectedCameraById == camera.deviceId ? 'blue':'black'" :label="camera.label ? camera.label.split('_')[1] : 'cam'" @click="_navClass._setCameraParam(camera.deviceId,false)" />
                              <q-btn style="height:100%" no-caps size="sm" :dense="true" :color="_selectedCameraById == camera.deviceId ? 'orange':'black'" :label="_selectedCameraByface ? 'Front Cam':'Back Cam'" @click="_navClass._setCameraParam(camera.deviceId,!_selectedCameraByface)" />
                           
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
     <q-header :dense="true"  elevated class="text-grey-8 q-py-xs bg-orange" height-hint="3" >
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
          <q-btn  @click="popUpgrader = !popUpgrader" flat no-caps  v-if="getLogStatus._isRegistered && !_isupgraded" >
              UpgradeMe
          </q-btn>
       <q-space />

       <!--- Searching/filtering Service-->
       <q-input rounded :dense="true" size="sm" outlined  class="" color="green" v-model="lytSearchRow" placeholder="Search"  >
           <template v-slot:prepend>            
             <q-icon name="clear"  class="cursor-pointer" size="sm"  />
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
        
            <q-img :src="_fileAttributeName == 'cover' ? _fileAsSRC[_fileAsSRCIndex] : onplayRowItem['cover'][_fileAsSRCIndex]"  class="column"  style="width: 100%;aspect-ratio: 2/1;">

              <div class="absolute-top transparent column items-start">
                    <div class=" transparent row">
                      <q-btn round flat icon="more_vert" class="col-auto" @click="onplayRowItemOps = 'covering'" >
                      <q-menu auto-close :offset="[2, 2]" anchor="bottom right" self="bottom left">
                            <input type="file" multiple ref="filec"  style="display: none" @change="_fileSourceFolder($event,'cover')" /> 

                            <q-btn icon="folder" @click="$refs.filec.click()" :dense="true" />
                            <q-btn icon="add_a_photo" @click="_navClass._openCamera('cover')" :dense="true"  />
                      </q-menu>
                      </q-btn>
                    </div>
              </div>
             
              <div class="absolute-center rounder-borders" style="width:5em;height: 5em;">
                <q-img :src="_fileAttributeName == 'profile' ? _fileAsSRC[_fileAsSRCIndex] : onplayRowItem['profile'][_fileAsSRCIndex]"   class="absolute-center fit" style="border: 1px solid white;"  />    
              </div>
              </q-img>
              <!---- for_Name -- -->
              </q-card>
              <q-card class="row justify-between items-center q-px-sm"> 
                <!---profile_update-->
            <div>            
            <input type="file" multiple ref="filep" style="display: none" @change="_fileSourceFolder($event,'profile')" /> 
            <q-btn icon="folder" @click="$refs.filep.click()" :dense="true" />
            <q-btn color="grey-4" text-color="purple" glossy  icon="camera_enhance" @click="_navClass._openCamera('profile')" :dense="true" />
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

            <q-item v-for="cinfo in ['name','lastName','userName']" :key="cinfo">
              
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
            
              <!------Address Informa-->
              <q-separator spaced inset="item" />
            <q-item-label header>Better_Address ~ Effective Client Services</q-item-label>
            <q-item class="q-py-none q-my-none column" v-for="cinfo in ['location','geolocation']" :key="cinfo">              
                    <q-item-section>
                    <q-item-label style="text-transform: capitalize;">{{ cinfo }}</q-item-label>
                    <q-item-label caption class="q-pa-none q-ma-none row" v-if="onplayRowItem[cinfo] ?? false">
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

   <q-page-container style="" class="col">
     <router-view 
            :_profile="onplayRowItem"
          
            :userID="onplayRowItem.id"

            :userName="onplayRowItem.userName"
            :phone="onplayRowItem.phone"
            :phoneCode="onplayRowItem.phoneCode"
            :location="onplayRowItem.location"
            :geolocation="onplayRowItem.geolocation"
           
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

import { storeToRefs } from 'pinia'

import { exportFile, useQuasar, useMeta } from "quasar";

//import userProfile from "src/components/userProfile.vue"
import { timeStore } from "src/stores/jstStores/serviceStore.js";
import { useRouter } from "vue-router";

import { profileStore } from "src/stores/authenticatedStore/profileStore";
import { authenticatingStore } from "src/stores/authenticatedStore/authenticatingStore";

import { genapiStore } from "src/stores/jstStores/genapiStore";

//--------------
const $q = useQuasar();
//------


//-----------Store & Service

const profileService = profileStore();
const genapiService = genapiStore(); //import { genapiStore } from "src/stores/jstStores/genapiStore";
//-----------
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
///var keyhasValue = (key) => !reqData[key]) && Object.keys(reqData[key]).length != 0 ? true : false;

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

let modals = profileSchema["acctype"] == null ? {} : profileSchema["acctype"]
var _modalPriviledges = reactive(modals);

//===============================================-----------------------------------------
//------------- MODAL ROWs_ MANAGMENT
//---
let defaultItem = ref({});
  let onplayRowItem = ref({}); //the selected row_actual_Data..as object

  //------- Original/_UpdateRowItem:CreateRowItem _Commands
  let _onplayRowItemBox = ref(false); //true...
  let _onplayRowIndex = ref(null); //_row_item_index..0/1/2
  let _onplayRowItemOps = ref(false); //_is UpdateRowItem/Creating_New
  let _onplayRowItemOpsStatus =ref(false)
  
  //==-----tabular side_box ( Pop_by_Id and tell the Operation)
  //let _setpopSideBox = ref(false); //true,..
  //---Editing/_....arrays manupulating
  let _onplayRowItemsideBox = ref(false); //clients,...
  let _onplayRowItemsideBoxOps = ref(false); //editing,deleting,creating
  let _onplayRowItemsideBoxIndex = ref(null); //array_index_0/1/2/3

//===============================================-----------------------
//-------------Syncing Columns
//columns()

//--------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-------USER PRofile and Privileges

//-------------USER PROFILE_Variables..
//--
let id = ref("");
let _phone = ref("");
let _Modals = ref("");

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
let _cameraBox =ref(false)

let _fileAttributeName =ref(null) //does give _image_attribute has single/multiple values of images ( sends it as 'file':name_attr, or 'files':name_attr)

let _fileSourceFoCam =ref()//is folder or camera file source

let _fileAsRaw =ref([]) //_file in Upload_Mode
let _fileAsSRC =ref([])//_file in Show_Mode (Non_String / As_SRC)
let _fileAsSRCIndex =ref(0)///_fileAsSRC_Array_index
let _fileAsSRCOps = ref(false)

let _fileAsString =ref(0)//_file in Show_Mode (As_String)  
let _fileAsStringIndex =ref(0)//_fileAsString_Array_index

//let _cov=document.getElementById('_fileAsSRC') 
function _fileSourceFolder(e,_attributeName) {
      // Check if file is selected
      let _isthereFile = e.target.files == null || e.target.files.length == 0 ? false : e.target.files;
      ///--------------
      //_file.value[_attributeName]=[]
      if (_isthereFile) {
        _resetFileSource()
      //---------reset _file_setting(params)   
       _fileAttributeName.value=_attributeName
       //--------
       _fileSourceFoCam.value='folder'
      //console.log(_file.value[_attributeName],'foldering0000')      
      for(let i = 0; i < _isthereFile.length; i++){
        _fileAsRaw.value.push(_isthereFile[i])
        _fileAsSRC.value.push(URL.createObjectURL(_isthereFile[i])) 
      }
      }
    }

//_cameraProfiling()
//---------------Automatically register all visitors (Basic Infor...Phone_)
async function upgradeMe(what = "") {  //updating User DAta with no graphic to update
  onplayRowItem.value['acctype'] = {'profileMeta':'creator_rwx','profile':'creator_rwx','saleit':'upgraded'}

  return await Crud_.updateData()
    .then((response) => {
      if (response) { 
          onplayRowItem.value =response
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

async function updateUser(_isthereFileCapsulated = false) { //UpdateRowItem User DAta with graphic to update or not
  //---set--loading row operation
  _onplayRowItemOpsStatus.value=true
  //is File Encapsulated ( if so ) ... extract the file by choosing ( either it was from folder or from camera_directlly )
  if(_fileAttributeName.value != null){
          //let _fileName = nul.value.includes(__fileAttrName) ? __filesAttrName : __fileAttrName
          onplayRowItem.value['upload']={'file':_fileAttributeName.value,'files':_fileAttributeName.value}
          onplayRowItem.value[_fileAttributeName.value]=_fileAsRaw.value
        }
      _fileAttributeName.value=null    
    //onplayRowItem.value['phone']=Objprops._profile.phone;//always send the _loged phone along all content
    return await Crud_.updateData()
        .then(async (response) => {
          _onplayRowItemOpsStatus.value=false

          if (response) { 
            rows.value[_onplayRowIndex.value] = response; 
            onplayRowItem.value =response
            notifyit.succes("", null, null, 7000);
            return true
          } else { }
           //--unset--loading row operation
          return false;
        })
        .catch((error) => {//_popUpgrader.value = false;
              //--unset--loading row operation
          _onplayRowItemOpsStatus.value=false
          return false;
        });
}

//-----------------
async function _resetFileSource(){
  _fileAttributeName.value=null
  _fileSourceFoCam.value=null  
  _cameraBox.value=false

  _fileAsSRC.value = []
  _fileAsRaw.value=[]

return true
}
async function _saveFileSource(){
  //_fileAttributeName.value=null
  //_fileSourceFoCam.value=null  
  _cameraBox.value=false

  _fileAsSRC.value = []
  //_fileAsRaw.value=[]

return true
}
//-------------------------------------------
//-------------------------------------------
let _listNavDevices =ref({})

let _listCameraSource =ref([])
let _listMicSource =ref([])

let _selectedCameraById =ref('')
let _selectedCameraByface =ref(true)

let _selectedMicById =ref('')

let _liveFeedRaw =ref('')
let _liveFeedRawStreaming =ref({})

let __liveFeedRawStreamingHeight =ref('')
let __liveFeedRawStreamingWidth =ref('')
const _liveFeedRawAudAttribute = ref(false)
const _liveFeedRawVidAttribute = ref({ facingMode: 'user', aspectRatio: { min: 1, max: 1.7777777778 },
                                        width: { min: 1280, },
                                        height: { min: 720,  }
                                      });

let _liveFeedSRC =ref({})
let _liveFeedSRCStreaming =ref('')

_liveFeedSRC.value['width']= 100;//window.innerWidth;
_liveFeedSRC.value['height']=100;//window.innerHeight;

//----------
class _navgatorMeta{

       constructor() { //_init_onPlayNavigator class
        let _priVar=''
        this._onPlayNavigator=''
        this._onPlaygeoNavigator=''
        //-----------
        console.error("ffffffffGeolocation is  supported by this browser.");
        try{
          // Check if geolocation is supported by the browser
          if ("mediaDevices" in navigator) {
              console.error("Geolocation is  supported by this browser.");
              this._onPlayNavigator = navigator.mediaDevices
              //this._enumNavigateDevice()
              //this._navigateDevice()
            }
            else { // Geolocation is not supported by the browser
            console.error("Geolocation is not supported by this browser.");
            }
            if('geolocation' in navigator){
              this._onPlaygeoNavigator = navigator.mediaDevices
            }else { // Geolocation is not supported by the browser
            console.error("Geolocation is not supported by this browser.");
            }

        }catch{
          return false
        }    
        //this._navigatePhone()
  }

//----------------Geo
    async _navigateGeo() {
      console.error("getting Fine????:");
      navigator.geolocation.watchPosition((geodata)=>{
        if(geodata.coords.latitude != onplayRowItem.value.geolocation['lat'] )
          {
            onplayRowItem.value.geolocation['lat'] =geodata.coords.latitude
            onplayRowItem.value.geolocation['long'] =geodata.coords.longitude
          }
          console.error("getting Fine:");

      },(error) => {  // Handle errors, e.g. user denied location sharing permissions
        console.error("getting Error:", error);
        // Handle errors, if any
    },{ enableHighAccuracy: true, timeout: 600000, maximumAge: 600000 })
    return this    
    }
  //---------navigate Device
    async _navigateDevice() {  //navigate_phone_function
          if ("mediaDevices" in navigator) {
              _listNavDevices.value['getUserMedia'] = navigator.mediaDevices.getUserMedia ?? null                 
              for(let mediaDevice of ['getUserMedia','webkitGetUserMedia','mozGetUserMedia','msGetUserMedia']){
                  var _doesCamera = navigator[mediaDevice] ?? false
                  if(_doesCamera){
                  _listNavDevices.value[mediaDevice] = _doesCamera
                  }
              }
              //this._onPlayMediaDevice= navigator.mediaDevices['getUserMedia']
          } else { // Geolocation is not supported by the browser
                      console.error("MediaDevice is not supported by this browser.");
                      }

          return this   
          }
    //------------------------
    async _enumNavigateDevice() {  
            if ("mediaDevices" in navigator) {
                navigator.mediaDevices.enumerateDevices().then((camList)=>{
                  //console.log('enumbera',camList)
                _listCameraSource.value = []
                for(let index in camList){
                    let graphicDevice = camList[index]
                    //console.log('graphic device',graphicDevice)
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
            }
            else{ console.error("MediaDevice is not supported by this browser.");
              }
            return this    
        }
    //----------
    async _openCamera(_attributeName){
          await this._enumNavigateDevice()
          _resetFileSource()
          //------------
          _cameraBox.value=true
          //-------
          _fileAttributeName.value=_attributeName
          //------------------
          _fileSourceFoCam.value='camera'  
          //------------------
          //--------
          if(_selectedCameraById.value == ''){//if 'user'
            _liveFeedRawVidAttribute.value['facingMode']=_selectedCameraByface.value ? 'user':'environment'
          }
          else{
            _liveFeedRawVidAttribute.value['deviceId'] = { exact: _selectedCameraById.value };
            _liveFeedRawVidAttribute.value['facingMode'] = _selectedCameraByface.value ? 'user':'environment'
          }
        //booting the feed ( for streaming...)
        _liveFeedRaw.value = await navigator.mediaDevices.getUserMedia({video:_liveFeedRawVidAttribute.value,audio:_liveFeedRawAudAttribute.value})                                                             
        //initialize the video streaming                                                                                                  
        _liveFeedRawStreaming.value['srcObject']= _liveFeedRaw.value
        //_liveFeedRawStreaming.value.play()
        _liveFeedRawStreaming.value.onloadedmetadata = () => {  _liveFeedRawStreaming.value.play(); };
      
        return true;
    }
     _pauseCamera () {_liveFeedRawStreaming.value.pause()}
     _playCameraa  () {_liveFeedRawStreaming.value.play()}
    //_liveFeedRawStreaming.value.pause();
    _saveScreenShoots (){
      //----shutdown camera RawFeed_& displaying
      _liveFeedRaw.value.getTracks().forEach(_streamTrack => {  
              _streamTrack.stop();
            })
      _liveFeedRawStreaming.value.src=null
      //--------
      _saveFileSource()
      return true
    }

    _screenShoot  (_remove=false){
      if(_remove && _fileAsSRC.value.length){
          _fileAsRaw.value.pop();
          _fileAsSRC.value.pop(); //viewable content
        return true
      }
            //_save screenshoots _for_canvas_display(if needed ? )
            _liveFeedSRCStreaming.value= _liveFeedSRC.value.getContext('2d');
            _liveFeedSRCStreaming.value.drawImage(_liveFeedRawStreaming.value, 0,0, _liveFeedSRC.value.width, _liveFeedSRC.value.height);
            try{
            //_save screenshoots _for_SRC_display ( being used method__now!) as [PNG]____as primary choice
              _fileAsSRC.value.push( _liveFeedSRC.value.toDataURL('image/png')); //_save as jpeg
              //_save screeshots _As_Raw_for_uploading
            _liveFeedSRC.value.toBlob((blob) => {
              _fileAsRaw.value.push( new File([blob], "fileName.png"+String(new Date()), { type: "image/png" },0.9))        
                }, 'image/png')
            }catch{
            //_save screenshoots _for_SRC_display ( being used method__now!) as [JPEG]__if Not
              _fileAsSRC.value.push( _liveFeedSRC.value.toDataURL('image/jpeg')); //or _save as jpeg
              //_save screeshots _As_Raw_for_uploading
            _liveFeedSRC.value.toBlob((blob) => {
              _fileAsRaw.value.push( new File([blob], "fileName.jpeg"+String(new Date()), { type: "image/jpeg" },0.9))        
                }, 'image/jpeg')
            }
        return true
      }
//----
    async _stopCamera (){
      //----shutdown camera RawFeed_& displaying
      _liveFeedRaw.value.getTracks().forEach(_streamTrack => {  _streamTrack.stop();
            })
      _liveFeedRawStreaming.value.src=null
      //------
      _resetFileSource()
      return true
    }

    async _operateDevice(cmd){

      if(cmd == 'pause'){ _liveFeedRawStreaming.value.pause()    }
      else if(cmd =='play'){_liveFeedRawStreaming.value.play()   }
      return true
    }

    async _setCameraParam (cameraID='',_facetoggler=false){  //switching camera
      _selectedCameraByface.value=_facetoggler     
      _selectedCameraById.value =cameraID      
      return await this._openCamera()    
    }

    async _setMicParam (audioID=''){
      _selectedMicById.value = _listMicSource.value['deviceId'][audioID]
      return await this._openCamera()
    }
 }

//-----------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---- authentication Auditors and Setup
const authService =authenticatingStore()
var {getLogStatus} = storeToRefs(authService) //is like making reactive(ref)_variable
//watch(getLogStatus, (data) => {
    //_isRegistered.value=true;
 //   console.log('isLoggedIn ref changed, do something!',data)
 // })
//--------------------------------------------------------------------Profiling (CHECK AUTHENTICATIONS &&& USER INFORMATIONS)
var _profileInformation = async () => {
    var _registered = getLogStatus.value._isRegistered ?? false // for already registered
    var _newRegister = _localStorage._get('_isRegistered') ?? false //for auto registere(new)
    console.log('starting')

    if(!(_registered || _newRegister)){//_isRegistered
    return false    }

    if(_registered && (getLogStatus.value?.user ?? false)){
        id.value = getLogStatus.value.user.id ?? null; // check if _it's authenticated_with it's user_id
       _phone.value = getLogStatus.value.user.phone ?? null // check if _it's authenticated_with it's user_id
    }else{
         id.value = _localStorage._get("id") ?? null; // check if _it is Priviledges_box has options
        _phone.value = _localStorage._get("phone") ?? null; // check if _it is Priviledges_box has options
    }
    //-----------------   
    _anyAccess.value = _localStorage._get('_anyAccess') ?? null; // check if _it is Priviledges_box has options
    //-----------------
    if(_anyAccess.value){
      _iss.value = _localStorage._get("_iss"); // check if _it is Priviledges_box has optionss
      //_Modals.value = _localStorage._get("_Modals"); // check if _it is Priviledges_box has options
      _priviledgedFor.value = _localStorage._get("_priviledgedFor"); // check if _it is Priviledges_box has options

      _isupgraded.value =  _localStorage._get("_isupgraded") ?? false  //is admin/creator...
      _ispremium.value =  _localStorage._get("_ispremium") ?? false  //is admin/creator...
    }
    var fetchService = {};
    fetchService["phone"] = _phone.value;
    return await Crud_.genapiFData('/profileapi/profile',fetchService).then((response) =>{        
        if(response ){     
           onplayRowItem.value = response[0]; 
          return true
        }else{
          return onplayRowItem.value = _localStorage._get("_userData") ?? false
        }
    }).catch((error)=>{ //newlly registered use storage_profile or if network down
       return onplayRowItem.value= _localStorage._get("_userData") ?? false
    })
};

//---------@@@@@@@@@@@@@@@@@@@@-------------General Functions and Service
var _languages =['English','Tigrigna']

var preferedLang =ref(0)

async function _setLanguages() {
  preferedLang.value = preferedLang.value ? 0 : 1
  return true
}
//------Local Storage___
const _storageapi = ref($q.localStorage)
const _localStorage = {
  _get: (_item) => {
    return _storageapi.value.getItem(_item);
  },
  _set: (_key, _item) => {
    return _storageapi.value.set(_key, _item);
  },
  _clear: (_key, _item) => {
    return _storageapi.value.clear();
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
return router.push({path:routes[1], name:key,query:{_request_id:"dblyt"+key},meta: {_user3A:_priviledgedFor.value[key],_isauthenticated:true},params: {_user3A:_priviledgedFor.value[key],id: id.value,_thisusertoken: "date-22-02-22"} } ); //is slim enter , it doesn't create loudness in router_gates 
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

//-----------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-----------ON-Mouted Operations and Authentications
var acctype_=false //is user annoymouse or priiledged ?
var _navClass =new _navgatorMeta()
_resetFileSource()

onMounted(async () => {  //--------------ON MOUNT
  console.log('starting @mount@@@@@@@@@@@@@@@@@@@@@@@@@@')

  //--------reintiate_navigation_class
  await _navClass._navigateDevice()
  await _navClass._navigateGeo()
  await _navClass._enumNavigateDevice()
  console.log('starting @mount')

  return await _profileInformation()
    .then(async (resp) => {
      console.log(resp,'onmouted response..3333333333333')
      if(resp){
          notifyit.succes("Wellcome " + onplayRowItem.value["name"] + " @itService");
          acctype_=true
          return router.push({path:"/play", name:'playTrends',query:{_request_id:"gpg"+'nnpriv'},params: {} } ); 
      }
      timerResponse(4000, "scrumbled privilege detected").then((response) => {

                        return router.push({path:"/",name:'sign' } ); 
                  });     
      //for authenticated, but not upgraded_user
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
    clearTimeout(pageLoading.value)
    return true;
  }, period);
}

//--
timeService.timeMachine();

//------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@------------Modal CRUD_OPs

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

</script>

<style>



</style>
