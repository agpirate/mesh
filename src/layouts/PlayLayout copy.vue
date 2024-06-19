<template>


<q-dialog  v-model="_Supports" class="column" >

      <q-card v-if="customerSupport" class="fontbstyle flex column">
        <q-card-section>
          <div class="fontdstyle">Service Usage Manual</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh;min-width:20vw" class="scroll">
          <p v-for="n in 100" :key="n">
          {{ n }} Notices dslkff sodkfw pwef wp fpweof pefwepf pwope.</p>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <!--q-btn flat label="Decline" color="primary" v-close-popup /-->
          <q-btn flat label="Ok" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>

      <q-card v-else-if="deviceSupport">
            Please Allow GPS && Camera Device, on Your Device wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
        </q-card>

</q-dialog>

<q-dialog
    v-model="popUpgrader"
    transition-show="scale"
    transition-hide="scale"
    :style="{ 'background-image': 'url(' + _this['profile'] + ')' }"
  >
  
  <q-card style="min-width: 30vw;" class="overlay-Glass fontastyle">
    <q-stepper
      v-model="_stepUpgrader"
      vertical
      color="orange"
      animated
    >
      <q-step
        :name="1"
        title="Contact Information"
        icon="settings"
        color="orange"
        style="color:orange"
        :done="_stepUpgrader > 1"
      >
       <q-item class="column q-pa-none q-ma-sm">
        <q-item-section>
          Continue With
        </q-item-section>

        <q-item-section class="q-pa-none col-auto">
          <q-input class="q-pa-sm col" standout v-model="_this.phone" label="Phone Number ?" stack-label :dense="true" readonly />
        </q-item-section>
       </q-item>

        <q-stepper-navigation class="q-pa-none col-auto">
          <q-btn @click="_stepUpgrader = 2" color="primary" label="Continue" size="sm" :dense="true"/>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        color="orange"
        title="Confirmation"
        caption="we just sent, confirmation sms code !"
        icon="create_new_folder"
        :done="_stepUpgrader > 2"
      >
       
        <q-input class="q-pa-sm col" standout v-model="text" label="Code ?" stack-label :dense="true" />

        <q-stepper-navigation class="q-pa-none col-auto">
          <q-btn @click="_stepUpgrader = 3" color="primary" :dense="true" size="sm" label="Continue" />
          <q-btn flat @click="_stepUpgrader = 1" color="primary" :dense="true" size="sm"  label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Profiling"
        color="orange"

        caption="registration form"
        icon="create_new_folder"
        :done="_stepUpgrader > 3"
      >
       <div class="q-gutter-xs row">

        <q-input class=" col-6" standout v-model="_this.name" label="FirstName" stack-label :dense="true" />
        <q-input class=" col-5" standout v-model="_this.lastName" label="LastName" stack-label :dense="true" />
        <q-input class=" col-auto" standout v-model="_this.userName" label="UserName" stack-label :dense="true" />


       </div>
       <q-separator inset />

       <div class="q-gutter-sm column q-py-sm">
         <q-item-label>Address </q-item-label> 
        <!--q-input class="q-pa-sm col" standout v-model="_this.location.country" label="Country" stack-label :dense="true" /-->
        <q-input class=" col-grow" standout v-model="_this.location.provinance" label="Provinance" stack-label :dense="true" />
        <q-input class=" col-grow" standout v-model="_this.location.city" label="City" stack-label :dense="true" />
        <q-separator inset />
    
      </div>

        <q-stepper-navigation class="q-pa-none col-auto">
          <q-btn @click="_stepUpgrader = 4" color="primary" :dense="true" size="sm" label="Continue" />
          <q-btn flat @click="_stepUpgrader = 2" color="primary" :dense="true" size="sm" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>

      </q-step>

      <q-step
        :name="4"
        title="Final"
        color="green"
        icon="add_comment"
      >
      <div v-if="(_profile_iss?.['group'] ?? '') != 'client'">
        Completing...
      </div>
      <div v-else>
        <div v-if="(_profile_iss?.['group'] ?? '') != 'upgraded'">
          Succeffully Upgraded.
        </div>
        <div v-else>
          Please try again.
        </div>
      </div>

        <q-stepper-navigation class="q-pa-none col-auto">
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
                  <canvas id="_liveFeedSRC" ref="_liveFeedSRC"  width="200px" height="200px" style="display:none">                                 
                  </canvas>
                  <q-list  class="row q-gutter-xs" >                  
                      <q-item v-for="_src in _fileAsSRC" :key="_src" >                        
                          <q-img :src="_src"  style="width:100px; height: 100px" />  
                      </q-item>
                  </q-list>
              </div>

              <div class="q-pa-sm q-gutter-sm row justify-between"> 
                <div>
                  <q-btn rounded  color="negative" size="sm" label="close" @click="_cameraInstance._stopCamera()" />
                  <q-btn rounded  color="green" size="sm" label="save" @click="_cameraInstance._saveScreenShoots()" />
                  <q-btn rounded  color="primary" size="sm" label="capture" icon="camera" @click="_cameraInstance._screenShoot()"/>
                </div>
               
                <div size="col-auto row">
                 
                  <q-expansion-item 
        switch-toggle-side
        expand-separator
        icon="camera" size="xs" v-if="_listCameraSource.length"
      >
              <q-item v-for="camera in _listCameraSource" :key=camera class="row q-gutter-sm"> 
               
                              <q-btn style="height:100%" no-caps size="sm" :dense="true" :color="_selectedCameraById == camera.deviceId ? 'blue':'black'" :label="camera.label ? camera.label.split('_')[1] : 'cam'" @click="_cameraInstance._setCameraParam(camera.deviceId,false)" />
                              <q-btn style="height:100%" no-caps size="sm" :dense="true" :color="_selectedCameraById == camera.deviceId ? 'orange':'black'" :label="_selectedCameraByface ? 'Front Cam':'Back Cam'" @click="_cameraInstance._setCameraParam(camera.deviceId,!_selectedCameraByface)" />
                           
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


<!-- Debug Component and Mixing Values -->
   <!-----DEbug ( Action ) Informations-->
   <template v-if="DoneMessage.length ?? false">
      <debugCard :messages="DoneMessage ?? [] " @closeButton="DoneMessage =[]" />
    </template>
    <template v-if="WarnthisMessage.length ?? false">
      <debugCard :messages="WarnthisMessage ?? [{}]" />
    </template>
  <!-----Status ( Store/Loading ) Informations-->
    <!-- <template v-if="status_WarnthisMessage.length ?? false">
      <statusCard :messages="status_WarnthisMessage ?? [{}]" />
    </template>
    <template v-if="status_KnowthisMessage.length ?? false">
      <statusCard :messages="status_KnowthisMessage ?? [{}]" />
    </template>
    <template v-if="status_DoneMessage.length ?? false">
      <statusCard :messages="status_DoneMessage ?? [{}]" />
    </template> -->
<!-- Debug Component and Mixing Values -->


<div class="fixed-right z-top q-px-sm q-gutter-sm " style="top:15vh;bottom:55vh;max-height:5vh;">

  <div class="row justify-end">
  </div>



  <q-card class="column q-gutter-sm q-pa-sm" v-if="_openpubChat"  style="min-width:5vw;min-height:50vh;margin-bottom:50px;background-color: whitesmoke;">
 
    <div class="fontdstyle row justify-between"> 
      public Chatting 
      <q-badge color="green" :dense="true" v-if="_chatWatch" > live</q-badge> 
      <div>
        <q-toggle size="xs" v-model="_setpublicchat" val="xs"/> 
      <q-btn @click="_openpubChat=false"  icon="close" flat />
      </div>
      
    </div>
    <div class="bg-white  q-pa-sm">
        <label class="fontastyle">current session</label>
        <div><q-icon name='phone'> </q-icon> {{  _this.phone }}</div>
        
    </div>

    <q-card-section class="col-grow shadow-7 bg-white" style="max-height: 50vh;overflow-y: scroll;" >

            <div v-for="chats,index in publicchatService.getDatas"  class="q-gutter-xs column boxastyle q-my-sm" :key="index" >
                <div class="col-auto row  fontastyle q-gutter-sm">
                  <q-icon name='phone' style="background-color:white;border-radius:50%;"> </q-icon> 
                  <label class="q-ma-none"> {{  chats.phone }} </label>                  
                </div>
                <div class="col-grow fontbstyle ">{{ chats.content }} </div>
            </div>
            
      </q-card-section>


    <div class="col-auto row q-pa-xs q-gutter-xs bg-white">
      <q-input outlined :dense="true" size="sm" v-model="_chatting.content"> </q-input>   <q-btn :dense="true" size="md" icon="send" @click="openpubChat()"  />
    </div>


    
  </q-card>


</div>
<!--walls-->
<!--layOuts-->
<div class="fixed fit column" style="background-repeat:no-repeat;background-size: cover;" :style="{ 'background-image': 'url(' + _this['cover'] + ')' }" >
<div class="col-grow layout-Glass"> </div>
</div>

<q-layout v-if="Loadingpage.length ?? false" class="column ">
  <div class=" fit bg-orange text-bold text-white"> {{  Loadingpage[0]['message']  }}</div>
</q-layout>

<q-layout v-else view="hHh lpr lFF"   class="  no-padding no-margine    "   
  style="max-width:100vw;max-height:100vh;" 
>

  <!--Headers-->
    <q-header :dense="true" id="navbar" elevated class="col-1 text-grey-10 q-py-sm saleitHeader-Glass" style="min-height:3vh;"  >
       <!--toolBars-->
     <q-toolbar  v-if="$q.screen.gt.sm" class="fontastyle">
 
       <q-btn
         flat
         dense
         round
         @click="leftDrawerOpen = !leftDrawerOpen"
         aria-label="Menu"
         icon="menu"
       />
       
       <label>ITservices </label>
     <div class="q-gutter-xs row">
      <q-btn :dense="true" flat icon="home"   @click="router.push('/play/trend')" />
      <q-btn :dense="true" :icon="iservice[1]" flat  stack no-caps  class="row"  v-for="iservice in iservicei_Menu" 
      :key="iservice"  @click="router.push(iservice[4])">
      <q-tooltip style="background-color:black;color:white;font-weight:bolder"> {{ iservice[2] }} </q-tooltip>
      <div class="bottomtip"> pppp</div> 
      </q-btn> 
     </div>

       <!--div v-if="_profile_iss?.['group'] ?? false "> 
              <q-btn  @click="popUpgrader = !popUpgrader" flat no-caps  v-if="_profile_iss['group'] == 'client'" class="fontastyle" >   
                 <q-item-label> UpgradeMe </q-item-label>           
               </q-btn>               
               <q-btn v-else class="lt-sm"> Create</q-btn>
        </div-->

       <q-space />

       <!--- Searching/filtering Service-->
       <q-input rounded :dense="true" class="fontdstyle " outlined  color="green" v-model="lytSearchRow" placeholder="Search"  >
           <template v-slot:prepend>            
             <q-icon name="clear"  class="cursor-pointer" size="xs"  />
           </template>
        </q-input>
      <!--upload Button-->
       <!---service Choosing Ddowns-->
       <q-btn-dropdown auto-close  flat class="fontastyle">
          <template v-slot:label>
            <div class="row q-px-sm">
              <div class="row justify-around items-center no-wrap q-px-sm">
                <q-icon name="add" size="xs" />
              </div> 
              <div class="row text-grey-10  items-center no-wrap" style="text-transform: capitalize;">
                itServices
              </div>
            </div>
          </template>

          <q-list class="fontastyle ">
            <q-item aria-hidden="true">
               <q-item-section class="" style="font-size: 0.7rem">select service</q-item-section>
             </q-item>

            <q-item clickable @click="tab = 'Saleit'">
              <q-item-section>Sale Service</q-item-section>
            </q-item>

            <q-item clickable @click="tab = 'Rentit'" >
              <q-item-section>Renting Service</q-item-section>
            </q-item>
            <q-separator inset/>
            <q-item clickable @click="[_Supports,customerSupport] = [true,true]" >
              <q-item-section>How To Use ?</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

       <q-space />

       <q-btn  flat dense no-wrap @click="lytCreatRow = !lytCreatRow"
        icon="upload" no-caps label="Create Content" class="q-ml-sm q-px-md fontastyle" >
      </q-btn>
      <q-btn @click="openpubChat(true)" icon="chat" :dense="true" flat  class=" text-white"><q-tooltip>Join Public Chats</q-tooltip>
      </q-btn>

       <div class="q-gutter-sm row items-center no-wrap text-white">
        <q-item-label >
          {{  _this.name }}
        </q-item-label>
         <!--q-btn round dense flat color="text-grey-7" icon="apps">
           <q-tooltip>itService Apps</q-tooltip>
         </q-btn-->

         <!--q-btn round dense flat color="grey-8" icon="notifications">
           <q-badge color="red" text-color="white" floating>
             2
           </q-badge>
           <q-tooltip>Notifications</q-tooltip>
         </q-btn-->
         <q-btn round flat @click="leftDrawerOpen = !leftDrawerOpen">
           <q-avatar >
             <img :src="_this.profile">
           </q-avatar>
           <q-tooltip>{{  _this.name }}</q-tooltip>
         </q-btn>
       </div>
     </q-toolbar>

      <q-toolbar v-else class="fontastyle">
        <q-btn
         flat
         dense
         round
         @click="leftDrawerOpen = !leftDrawerOpen"
         aria-label="Menu"
         icon="menu"
       />
     
       <!--div v-if="_profile_iss?.['group'] ?? false "> 
              <q-btn  @click="popUpgrader = !popUpgrader" flat no-caps  v-if="_profile_iss['group'] == 'client'" class="fontastyle" >   
                 <q-item-label> UpgradeMe </q-item-label>           
               </q-btn>               
               <q-btn  flat dense no-wrap @click="lytCreatRow = !lytCreatRow"
                icon="upload" no-caps label="" class="q-ml-sm q-px-md fontastyle" v-else>
              </q-btn>
        </div-->

       <!--- Searching/filtering Service-->
       <q-input rounded :dense="true"  outlined  class="fontdstyle" color="green" v-model="lytSearchRow" placeholder="Search"  >
           <template v-slot:prepend>            
             <q-icon name="clear"  class="cursor-pointer" size="xs"  />
           </template>
        </q-input>
      <!--upload Button-->
       <!---service Choosing Ddowns-->
       <q-space />

       <div class="q-gutter-sm row items-center no-wrap text-white">
        <q-item-label v-if="$q.screen.gt.xs">
          {{  _this.name }}
        </q-item-label>
         <q-btn round dense flat color="text-grey-7" icon="apps">
           <q-tooltip>itService Apps</q-tooltip>
         </q-btn>

         <q-btn round dense flat  icon="notifications" class="fontastyle">
           <q-badge color="red" text-color="white" floating>
             2
           </q-badge>
           <q-tooltip>Notifications</q-tooltip>
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
            class="column fontastyle"
          >
         
          <q-scroll-area class="col column fontastyle" >
            <!----profile graphics/imaging-->
            <q-card class="fontastyle" flat bordered >             
 
            <q-img :src="_fileAttributeName =='cover' ? _fileAsSRC[_fileAsSRCIndex]: (_this.cover ?? '')" 
             class="column fontastyle"  style="width: 100%;aspect-ratio: 2/1;">

              <div class="absolute-top transparent column items-start">
                    <div class=" transparent row">
                      <q-btn round flat icon="more_vert" class="col-auto transparent" @click="_thisOps = 'covering'" >
                      <q-menu auto-close :offset="[2, 2]"  class="q-pa-sm transparent">
                            <input type="file"  ref="filec"  style="display: none" @change="_fileSourceFolder($event,'cover')" /> 
                            <q-btn icon="folder" class="text-dark" @click="$refs.filec.click()" :dense="true" />
                            <q-btn icon="add_a_photo" class="text-dark" @click="_cameraInstance._openCamera('cover')" :dense="true"  />
                      </q-menu>
                      </q-btn>
                    </div>
              </div>
             
              <div class="absolute-center" style="width:5em;height: 5em;border-radius: 0.6rem;" v-if="_this?.profile ?? false">
                
                <q-img :src="_fileAttributeName =='profile' ? _fileAsSRC[_fileAsSRCIndex] : (_this.profile[_fileAsSRCIndex] ?? '')"
                   class="absolute-center fit" style="border: 1px solid white;border-radius:0.6rem;"  />    
              </div>
              </q-img>
              <!---- for_Name -- -->
              </q-card>  
            
             <q-card class="row justify-between items-center q-px-sm fontastyle" flat> 
                <!---profile_update-->
            <div class="q-gutter-xs justify-end">            
            <input type="file" multiple ref="filep" style="display: none" @change="_fileSourceFolder($event,'profile')" /> 
            <q-btn icon="folder" class="fontastyle" flat @click="$refs.filep.click()" :dense="true" />
            <q-btn color="grey-4" class="fontastyle" flat text-color="purple" glossy  icon="camera" @click="_cameraInstance._openCamera('profile')" :dense="true" />
            change profile  
          </div>
            
            <div> 
              <q-btn class="fontcstyle bg-grey-3" no-caps size="12px" flat :dense="true"  @click="updateUser()" v-if="_thisOps ?? false">
                apply Changes
                </q-btn>
              
            </div>
          
              </q-card>
              
            <!----profile basic informations-->
            <q-list padding class="col-2 column">
          

            <q-item>
              <q-item-section>
                <q-item-label overline>{{  _this.username }}</q-item-label>
                <q-item-label>{{ _this.name }} {{ _this.lastName }}</q-item-label>
                <q-item-label caption>Since : {{  _this.updatedAt }}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label class="row justify-between fontastyle">              
                  <q-btn flat class="fontastyle text-orange "   :dense="true"  label="MyStore"/>   
                  <q-btn flat class="fontastyle"  round  label="Edit" :dense="true" @click="_thisOps = 'cinfo'"/>

            </q-item-label>

              </q-item-section>
            </q-item>

            <q-separator spaced />
<!----Personal Information  _thisOps -->


            <q-item v-for="cinfo in ['name','lastName','userName']" :key="cinfo">
              
                    <q-item-section>
                    <q-item-label style="text-transform: capitalize;" v-if="_thisOps == 'cinfo'">
                      <q-input standout v-model="_this[cinfo]" :label="cinfo" stack-label :dense="true"  />
                    </q-item-label>      
                    <q-item-label style="text-transform: capitalize;" v-else>
                      <q-input standout v-model="_this[cinfo]" :label="cinfo" stack-label :dense="true" readonly />
                    </q-item-label>    
                  </q-item-section>

                    <q-item-section side >
                      <div class="text-grey-8 q-gutter-xs" v-if="_thisOps == 'cinfo'">
                        <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="_this[cinfo] = ''" />
                        <q-btn class="gt-xs" size="12px" flat dense round icon="done" @click="updateUser()" />
                      </div>
                    </q-item-section>
            </q-item>
            
              <!------Address Informa-->
              <q-separator spaced inset="item" />

            <q-item-label class="fontastyle q-px-sm row justify-end" v-if="_this.location?.city == '' ?? true">Incomplete Profile
              <q-tooltip> completed profile, create Moderate Content</q-tooltip>
            </q-item-label>

            <q-item class="fontastyle " v-for="cinfo in ['location','geolocation']" :key="cinfo">              
                    <q-item-section class="fontastyle">
                    <q-item-label class="fontastyle text-bold">{{ cinfo }}</q-item-label>
                    <q-item-label caption class="fontastyle column" v-if="_this[cinfo] ?? false">
                              <q-item v-for="cinfoo in Object.keys(_this[cinfo])" :key="cinfoo" class="row  flex flex-centerq-px-xs col-auto">                                
                              
                                  <q-item-label> {{ cinfoo }} : {{_this[cinfo][cinfoo] }}</q-item-label>
                        </q-item> 

                    </q-item-label>
                    
                  </q-item-section>
            </q-item>

            
            </q-list>

            <q-separator spaced inset="item" />
            
              <q-badge v-if="(_profile_iss !='client')" class="justify-between q-pa-xs q-mx-md"> Upgraded</q-badge>
              <q-badge v-else class="justify-left  q-mx-md " color="dark"> 
                <q-item-label style="color:red;">Un Upgraded</q-item-label>
                <q-tooltip class="q-pa-xs">Upgrading enables to sale and buy !</q-tooltip>
              </q-badge>           
              <q-badge  class="justify-between q-pa-xs q-mx-md">
               
              </q-badge>

          </q-scroll-area>

          <q-item-label class="col-auto q-pa-sm row justify-between bg-orange text-dark">
            itService V0.1  [{{  _this.phone  }}]
            <q-btn :dense="true" no-caps  class="q-pa-none" flat size="sm" 
              :label="_thisSettings.languages.options[_thisSettings.languages.selected]" 
              @click="_thisSettings.languages.selected = _thisSettings.languages.selected ? 0 : 1" />
            <q-item-label>&copy;2023 </q-item-label> 
           </q-item-label>
          
      </q-drawer>

<!---drawer-Left-->
            <!-- :userID="_this.id"

            :userName="_this.userName"
            :phone="_this.phone"

            :phoneCode="_this.phoneCode"
            :location="_this.location"
            :geolocation="_this.geolocation" -->
   <q-page-container style="" class="col-grow transparent row "  >
     <router-view 
            :trigger="trigger"
            :_profile="_this"
            
            :_issModal="_issModal"
            :_iss="_iss"
            :_acctype="_acctype"
          
            :lytCreatRow = "lytCreatRow" 
            :lytSearchRow = "lytSearchRow" 
            :_onPlayNavMedia="_onPlayNavMedia"

            :_onPlayLanguage="_thisSettings.languages.selected"
            />

            <div class="fixed-bottom-right q-pa-md z-top q-gutter-sm column fontestyle"  >
                    <div v-if="Loading" style="background-color:whitesmoke;border-radius: 5px;padding:.8rem;" > {{ Loading }}</div> 
            </div>


   </q-page-container>

<!--sticky_icons---inside-containers-->
<div v-if="$q.screen.gt.sm"  class="leftmidBox q-pa-none q-ma-none" >
 
  <q-card class="q-py-xs column transparent fontastyle" style=""  v-if="showsideMenu">
 
    <q-btn  flat icon="home"   @click="router.push('/play/trend')" />

   <q-separator inset horizontal />

    <q-btn :dense="true" size="sm"   flat  stack no-caps  class="fontdstyle" 
    @mouseover="iservice[3] = true" @mouseleave="iservice[3] = false" v-for="iservice in iservicei_Menu" 
    :key="iservice"  @click="router.push(iservice[4])">
          <!--q-item-label v-if="iservice[3]" caption >{{ iservice[2] }} </q-item-label-->
        <q-icon size="xs" :name="iservice[1]"/>
          <div>My </div>
    </q-btn> 

    <q-btn  flat label="?"  @click="[_Supports,customerSupport] = [true,true]" />

   <q-separator inset horizontal />

    <!--q-btn  flat icon="more_vert"  @mouseover="showsideMenu =true">
      <q-menu auto-close :offset="[2, 2]"  self="bottom left">
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
    </q-btn-->

  </q-card>

      <q-btn  flat icon="more_vert"   @mouseover="showsideMenu = !showsideMenu">
    </q-btn>

 </div>

    <!--sticky-ends-->

    <!----Footers _null-->

    <q-footer class="col-auto transparent">
      <market-value />
    </q-footer>

 </q-layout>

</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeMount, watch } from "vue";
import { storeToRefs } from 'pinia'
import { toRaw } from 'vue'
import { useLocalStorage } from '@vueuse/core'
//import { notifyit } from "src/composables/transducer";

import { exportFile, useQuasar, useMeta } from "quasar";

//import userProfile from "src/components/userProfile.vue"
import { timeStore } from "src/stores/jstStores/serviceStore.js";
import { useRouter } from "vue-router";

import { profileStore } from "src/stores/authenticatedStore/profileStore";
import { profile2Store } from "src/stores/authenticatedStore/profile2Store";
//import {chatStore} from "src/stores/authenticatedStore/chatStore"
import { authenticatingStore } from "src/stores/authenticatedStore/authenticatingStore";
import { genapiStore } from "src/stores/jstStores/genapiStore";

//var socket = new WebSocket('ws://127.0.0.1:9100');
import debugCard from "src/components/debugCards.vue"
import useDebugMixin from "src/composables/debugMixin"
const { 

  Loading, //
  Loadingevent,
  Loadingpage,

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

import usefileMixin from "src/composables/fileserviceMixin"
var { 
  Objprops__,
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
} = usefileMixin()

//--------------
const $q = useQuasar();
//-----------Store & Service

const profileService = profileStore();
const publicchatService = profile2Store();
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
//$q.dark.toggle()
//-------
var lytSearchRow =ref('')

//------variables
var leftDrawerOpen =ref(false) //hide & show sideBar
var _stepUpgrader=ref(1)
var _popUpgrader =ref(false)

var _Supports=ref(false)
var customerSupports=ref(false)
var deviceSupport=ref(false)

function upgradClient() { 
  _popUpgrader.value = !_popUpgrader.value
  return;}

var lytCreatRow =ref(false)
function NewContent() { 
  lytCreatRow.value = !lytCreatRow.value
  return;}
  lytSearchRow
  //import CameraFeeds from "components/CameraFeeds.vue"
// let _cameraBox =ref(false)
let imageSrc =ref(null)
  //lytCreatRow
//-----------------------Local Varialbles
var iservicei_Menu = ref();
var showsideMenu=ref(false)
iservicei_Menu.value={
 'myStore':["what did i bought ?","shop","Shop",false,'/play/playcart'],
 'myService':["what i'm saling ?","store","Service",false,'/play/playservice'],
 //'saleIt':["Anything To Sale ?","photo","saleIt",false],
 //'rentIt':["Anything For Rent ?","collections_bookmark","rentIt",false],
 //'market':["Show current Market Price","assistant","marketIt",false],
 //'orderIt':["Looking Service you Like!","group","orderIt",false],
}

//-----Layout_Style & behaviors
//------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2----ModalSkeltone [ profileSchema]
//-----user Schema
import { profileSchema } from "src/composables/schemas/profileSchemas";
import { _permission } from "src/composables/schemas/profileSchemas";
//import { isArray } from "chart.js/dist/helpers/helpers.core";

var trigger =ref(false)

let modals = _permission ?? null
let _profile_iss=ref(null)
let _acctype=ref({})
var _issModal = reactive(modals);

//-------------USER PROFILE_Variables..
//--------
let _hasAccess = ref({});//_isRegistered
let _iss = ref([]);
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

//===============================================-----------------------------------------
//------------- MODAL ROWs_ MANAGMENT
let defaultItem = ref({});
let onplayRowIndex = ref(-1); //the selected row_index_data...HOlding the lastIndex+1 ---temp index_value
let _this = ref({}); //the selected row_actual_Data..as object
let _thisOps = ref(null); //the selected row_actual_Data..as object

let _thisSettings =ref({})

async function _buildDataModel(){
  _this.value.geolocation={}
  _this.value.geolocation={'lat':0,'long':0}

  _this.value.location={}
  _this.value.location ={'country':'','city':'','street':''};

  return true
}
_buildDataModel()

//===============================================-----------------------
watch(_this,async(_newV,_oldV)=>{
  let _requestHeader ={}
  _requestHeader['id']=_newV?.['userID'] ?? ''
  _requestHeader['phone']=_newV?.['phone'] ?? ''

  let _iss = _newV?.['_iss'] ?? false
  //let cookie = sessionStorage.getItem('token') ?? null
  if(_iss){
  _requestHeader['_iss']=_iss['id']
  _requestHeader['_issModal']=_thisModel //_issModal
  }else{  }

  let _geoLoc = _newV?.['geolocation'] ?? false
  if(_geoLoc){
    _requestHeader['loclat']=_geoLoc.lat ?? ''
    _requestHeader['loclong']= _geoLoc.long ?? ''
    //--------------
    //useLocalStorage('id',_newV?.['userID'] ?? '')
    //useLocalStorage('phone',_this.value?.['phone'] ?? '')
    localStorage.setItem('geo.clat', toRaw(_geoLoc.lat ?? ''))
    localStorage.setItem('geo.clong',toRaw( _geoLoc.long ?? ''))
  }

  //-----------

  profileService.set_reqHeader(_requestHeader)
  //console.log('setting Header',cookie,_this.value.phone)
  return true
})

//------------User Settings
_thisSettings.value['languages']={'options':['Tigrigna','English'],'selected':1}


//---------------
// let _fileAttributeName =ref(null) //does give _image_attribute has single/multiple values of images ( sends it as 'file':name_attr, or 'files':name_attr)

// let _fileSourceFoCam =ref(null)//is folder or camera file source

// let _fileAsRaw =ref([]) //_file in Upload_Mode
// let _fileAsSRC =ref([])//_file in Show_Mode (Non_String / As_SRC)
// let _fileAsSRCIndex =ref(0)///_fileAsSRC_Array_index
// let _fileAsSRCOps = ref(false)

// let _fileAsString =ref(0)//_file in Show_Mode (As_String)  
// let _fileAsStringIndex =ref(0)//_fileAsString_Array_index
// //-----------------


//let _cov=document.getElementById('_fileAsSRC') 

///-----------------------File Operations and setting  UP(Folder) vs Down(Camera)
//-------------------------------------------
let _listNavDevices =ref({})

// let _listCameraSource =ref([])
// let _listMicSource =ref([])

// let _selectedCameraById =ref(false)
// let _selectedCameraByface =ref(true)

// let _selectedMicById =ref('')

// let _liveFeedRaw =ref('')
// let _liveFeedRawStreaming =ref({})

// let __liveFeedRawStreamingHeight =ref('')
// let __liveFeedRawStreamingWidth =ref('')
// const _liveFeedRawAudAttribute = ref(false)
// const _liveFeedRawVidAttribute = ref({ facingMode: 'user', aspectRatio: { min: 1, max: 1.7777777778 },
//                                         width: { min: 1280, },
//                                         height: { min: 720,  }
//                                       });

// let _liveFeedSRC =ref({})
// let _liveFeedSRCStreaming =ref('')

// _liveFeedSRC.value['width']= 100;//window.innerWidth;
// _liveFeedSRC.value['height']=100;//window.innerHeight;

//_cameraProfiling()
//---------------Automatically register all visitors (Basic Infor...Phone_)
async function upgradeMe(what = "") {  //updating User DAta with no graphic to update
  _this.value['upgrade'] = 'creator'// {'profileMeta':'upgraded','profile':'upgraded','saleit':'upgraded'}

  return await Crud_.createData()
    .then((response) => {
      if (response) { 
        return router.push('/')
      } else { }
      return true;
    })
    .catch((error) => {//_popUpgrader.value = false;
      //_isWhatDefault.value=false
      return false;
    });
}

async function updateUser(_isFileCapsulated = false) { //updating User DAta with graphic to update
  //__thisOpsStatus.value=false
  let _fileExitance = _fileAttributeName.value ?? false
      if(_fileExitance){
          //_this.value['file_']={'files':_fileExitance}
          _this.value[_fileExitance]=_fileAsRaw.value
          if(_fileExitance == 'profile'){ //profile require multiple file
            _this.value['file_']={'files':_fileExitance}
          }else{ //or cover it's (require single file)
            _this.value['file_']={'file':_fileExitance}
          }
        }

    _fileAttributeName.value=null   
    console.log(_this.value,'-------')
    //---file_ing graphic content
    //--
    return await Crud_.updateData()
        .then((response) => {
          if (response) { 
            _this.value =response
            notifyit.succes("Profile/Cover Updated Succefully", null, null, 7000);
            _thisOps.value=null
            //profileService.setlogStatus(true,response,'true')
          } else { }
          return true;
        })
        .catch((error) => {//_popUpgrader.value = false;
         // __thisOpsStatus.value=false
        return false;
        });
}

//--------
var _askdeviceUse =ref(false)
var _pageLoading=ref(true)
// var Loadingpage=ref('')
// let Objprops__ =ref({})
//----------
let _onPlayNavMedia=ref(null)
let _onPlayNavGeo=ref(null)
let _location=ref(null)

class _navgatorMeta{
      constructor() { //_init_onPlayNavigator class
        ////console.error("ffffffffGeolocation is  supported by this browser.");
        try{      // Check if geolocation is supported by the browser
            if (navigator?.mediaDevices ?? false) { 
              _onPlayNavMedia.value = navigator.mediaDevices
              Objprops__[_onPlayNavMedia]= navigator.mediaDevices
              }
        }catch{    }    
        try{
            if(navigator?.geolocation ?? false){  _onPlayNavGeo.value = navigator.geolocation    
              }
            }catch{  }
        return false
        //this._navigatePhone()
      }
//----------------Geo
    async _navigateGeo(params) {
              if(_onPlayNavGeo.value ?? false){
                        _onPlayNavGeo.value.watchPosition((geodata)=>{  
                          var _geolat = parseFloat(geodata.coords?.latitude ?? 0)
                          var _geolong = parseFloat(geodata.coords?.longitude ?? 0)
                        if(_geolat && (_geolat != _this.value.geolocation.lat)){
                          _this.value.geolocation ={}
                          _this.value.geolocation['lat'] = parseFloat(geodata.coords.latitude)// this._clientGeolocation
                          _this.value.geolocation['long'] = parseFloat(geodata.coords.longitude)// this._clientGeolocatio
                       
                          //let _geo = _this.value.geolocation
                          _location.value={'country':'','city':'','street':''}
                         
                        }   console.error("Error getting user location:", _geolat,_geolong);                       
                      
                        return this
                      },(error) => {   return this    
                    },{ enableHighAccuracy: true, timeout: 100*60*24, maximumAge: 60000 })
              }else{  
                navigator.geolocation.value.watchPosition((geodata)=>{  
                  var _geolat = parseFloat(geodata.coords?.latitude ?? 0)
                          var _geolong = parseFloat(geodata.coords?.longitude ?? 0)
                        if(_geolat && (_geolat != _this.value.geolocation.lat)){
                          _this.value.geolocation ={}                        
                          _this.value.geolocation['lat'] = parseFloat(geodata.coords.latitude)// this._clientGeolocation
                          _this.value.geolocation['long'] = parseFloat(geodata.coords.longitude)// this._clientGeolocatio
    
                          _location.value={'country':'','city':'','street':''}
                        
                        } //////console.error("Error getting user location:", geodata);
                      
                        return this
                      },(error) => {  return this    
                    },{ enableHighAccuracy: true, timeout: 100*60*24, maximumAge: 60000 })
                  }
    return this    
    }

  //---------navigate Device
    async _navigateDevice() {  //navigate_phone_function
          if (_onPlayNavMedia.value ?? false) {
              _listNavDevices.value['getUserMedia'] = _onPlayNavMedia.value.getUserMedia ?? {}      
              
              for(let mediaDevice of ['getUserMedia','webkitGetUserMedia','mozGetUserMedia','msGetUserMedia']){
                  var _doesCamera = navigator[mediaDevice] ?? false
                  if(_doesCamera){
                  _listNavDevices.value[mediaDevice] = _doesCamera
                  }
              }
              //this._onPlayMediaDevice= _onPlayNavMedia.value.mediaDevices['getUserMedia']
          } else { // Geolocation is not supported by the browser
                      ////console.error("MediaDevice is not supported by this browser.");
                      }
          return this   
          }
    //------------------------
    async _enumNavigateDevice() {  
      if (_onPlayNavMedia.value ?? false) {
            _onPlayNavMedia.value.enumerateDevices().then((camList)=>{ //////console.log('enumbera',camList)
                _listCameraSource.value = []
                for(let index in camList){
                    let graphicDevice = camList[index]
                    //////console.log('graphic device',graphicDevice)
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
            else{ ////console.error("MediaDevice is not supported by this browser.");
              }
            return this    
        }
    //------------------------------------------Operating with device
    async _openCamera(_graphicName){
          //await this._enumNavigateDevice()
          //_resetFileSource()
          //--------
          _cameraBox.value=true
          _liveFeedSRC.value = null
          ///----------
          _fileAttributeName.value=_graphicName
          //------------------
          _fileSourceFoCam.value='camera' 
          //-----------
          if(_selectedCameraById.value ?? false){//if 'user'
              _liveFeedRawVidAttribute.value['deviceId'] = { exact: _selectedCameraById.value };
            _liveFeedRawVidAttribute.value['facingMode'] = _selectedCameraByface.value ? 'user':'environment'
          }
          else{
            _liveFeedRawVidAttribute.value['facingMode']=_selectedCameraByface.value ? 'user':'environment' 
          }
        
        //if (_listNavDevices.value['getUserMedia']) {  //in priority use ( this device_ for media_sources)
          var _onplayDevice = _listNavDevices.value['getUserMedia'] ?? false 
         _liveFeedRaw.value = await _onPlayNavMedia.value.getUserMedia({video:_liveFeedRawVidAttribute.value,audio:_liveFeedRawAudAttribute.value})                                                             
        //initialize the video streaming                                                                                                  
        _liveFeedRawStreaming.value['srcObject']= _liveFeedRaw.value
        //_liveFeedRawStreaming.value.play()
        _liveFeedRawStreaming.value.onloadedmetadata = () => {  _liveFeedRawStreaming.value.play(); };
      //}
      return true
    }

    async _screenShoot (_reset=false){
        if(_reset ){
            _fileAsRaw.value=[];
            _fileAsSRC.value=[]; //viewable content
          return true
        }
     _liveFeedSRCStreaming.value= _liveFeedSRC.value.getContext('2d');
     _liveFeedSRCStreaming.value.drawImage(_liveFeedRawStreaming.value, 0,0, _liveFeedSRC.value.width, _liveFeedSRC.value.height);
     //_fileAttributeName.value[0] =='profile'
     try{
      ////console.log('saving image...')
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
    async _saveScreenShoots (){
      //----shutdown camera RawFeed_& displaying
      _cameraBox.value=false
      //--------
      try{
            _liveFeedRaw.value.getTracks().forEach(_streamTrack => {  
              _streamTrack.stop();
              _streamTrack=false
            })
          }catch{
            _liveFeedRaw.value.getVideoTracks().forEach(_streamTrack => {  
                _streamTrack.stop();
                _streamTrack=false
          }) }
          //---------
      _liveFeedRawStreaming.value.src=null
      //--------
      return true
    }

    async _stopCamera (){
      //----shutdown camera RawFeed_& displaying
      _liveFeedRaw.value.getTracks().forEach(_streamTrack => {  
              _streamTrack.stop();
              _streamTrack=false

            })
      _liveFeedRaw.value.getVideoTracks().forEach(_streamTrack => {  
            _streamTrack.stop();
            _streamTrack=false
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
    //--------------setting camera_view & Mic
    async _setCameraParam (cameraID='',_facetoggler=false){  //switching camera
      _selectedCameraByface.value=_facetoggler     
      _selectedCameraById.value =cameraID      
      return await this._openCamera()    
    }
    async  _setMicParam (audioID=''){
      _selectedMicById.value = _listMicSource.value['deviceId'][audioID]
      return await this._openCamera()
    }
 }

//---------@@@@@@@@@@@@@@@@@@@@-------------General Functions and Service
//------Local Storage___o

const _storageapi = $q.localStorage
const _localStorage = {
  _get: (_item) => {
    return _storageapi.getItem(_item);
  },
  _set: (_key, _item) => {
    return _storageapi.set(_key, _item);
  },
  _clear: (_key, _item) => {
    return _storageapi.clear();
  },
};

//------_clearLogs
async function _clearLogs() {
  sessionStorage.clear();
  localStorage.clear()
  //authService.getLogStatus={'_isRegistered':false,'user':null,'cookie':'false'}
  //_localStorage._clear()
  //await authService.clearlogStatus()
  return router.push(await _routingPath('/'));
}
//-------Redirecting Routes ------
async function _routingPath(_pathUrl='/',_pathName='') {
      return  {
        path:_pathUrl,name:_pathName,query:{userid:_this.value.id ?? ''},params: {} 
      };
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
  createData: async function (objParam={}) {

  if (_this.value[createKey] ?? false) {
  }else{
  //notifyit.warn("Incompleted Form ?");
    return false;
  }

  return await _theService
    .createData(_this.value,objParam)
      .then((response) => { //returning as [false,response]

        if (response[0]) {
          return response[1];
        } else {
          notifyit.warn("Store Return False" + response[1]);
          return false;
        }
      })
      .catch(() => {
        notifyit.info("Try to reconnect...");
        return false;
      });
  },

    //------------------------------------------------------------------------
    updateData: async function (objParam={}) {

    if (_this.value[updateKey] ?? false) {
    }else{
    //notifyit.warn("Incompleted Form ?");
      return false;
    }

    return await _theService
      .updateData(_this.value, objParam)
      .then((response) => {
        if (response[0]) {
          return response[1];
        } else {
          notifyit.warn("Store Return False" + response[1]);
          return false;
        }
      })
      .catch(() => {
        notifyit.info("Try to reconnect...");
        return false;
      });
  },

  readData: async function (objParam={}) {
    return await _theService
      .readData(objParam)
      .then((response) => { //returning as ['data'][{},{},{data..}]
      if (response) {return response;
        } else {
          notifyit.warn("Store Return False" + response);
          return false;
        }
      })
      .catch(() => {
        notifyit.info("Try to reconnect...");
        return false;
      });
  },

  //---------------------------------------------------------------
  readFData: async function (objParam={}) {
    try {
      if (Object.keys(objParam).length == 0) {
        return false;
      }
    } catch { return false; }

    return await _theService
      .readFData(objParam)
      .then((response) => {
        if (response) {return response[0];
        } else {
          // notifyit.warn("Store Return False" + response);
          return false;
        }
      }).catch(() => {
        // notifyit.info("Try to reconnect...");
        return false;
      });
  },

  //------------------filtering & searching for different Model
 //------------------filtering & searching for different Model
 genapiData: async function (modelUrl,objParam={}) {
  try {
      if (Object.keys(objParam).length == 0) {
        // notifyit.warn("Incompleted Form ?");
        return false;
      }
    } catch {
      // notifyit.warn("Refresh It Please ?");
      return false;
    }

    return await genapiService
      .readData(modelUrl,objParam)
      .then((response) => { //returning as ['data'][{},{},{data..}]
      if (response) {return response;
        } else {
          // notifyit.warn("Store Return False" + response);
          return false;
        }
      })
      .catch(() => {
        // notifyit.info("Try to reconnect...");
        return false;
      });
  },

  genapiFData: async function (modelUrl,objParam={}) {
    try {
      if (Object.keys(objParam).length == 0) {
        // notifyit.warn("Incompleted Form ?");
        return false;
      }
    } catch {
      // notifyit.warn("Refresh It Please ?");
      return false;
    }
    
    return await genapiService
      .readFData(modelUrl,objParam)
      .then((response) => {
        if (response) {
          return response;
        } else {
          // notifyit.warn("Store Return False" + response);
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
        // notifyit.warn("Incompleted Form ?");
        //return false;
      }
    } catch {
      // notifyit.warn("Refresh It Please ?");
      return false;
    }
    
    return await _theService
      .deleteData(objParam)
      .then((response) => {
        if (response[0]) {
          return response[1];
        } else {
          // notifyit.warn("Store Return False" + response[1]);
          return false;
        }
      })
      .catch(() => {
        // notifyit.info("Try to reconnect...");
        return false;
      });
  },
};
//--------------------------------------------------------------------UTILITIED_FUNCTIONS ( LocalStarage -- Profiling)
//_____________________________________________________Functions Definitions

//-----------------------------------Loading...process...showOFF

//-----------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---- authentication Auditors and Setup
const authService =authenticatingStore() //it(storeToRefs) is like computed_ reactive_variable
var {getLogStatus,getLogUser,getLogisREgistered,clearlogStatus} = storeToRefs(authService) //is like making reactive(ref)_variable
//--------------------------------------------------------------------Profiling (CHECK AUTHENTICATIONS &&& USER INFORMATIONS)
var _profileInformation = async () => {
  //---this would hold inherited reactivity(assigning variable with reactive =reactive)
    var _storeAuthenticated = getLogisREgistered.value ?? false // for already registered (but it get_overrun by this function)
    var _storageAuthenticated =Boolean(_localStorage._get('_isRegistered')  ?? false )//for auto registere(new)
    if(!(_storeAuthenticated.value || _storageAuthenticated)){//_isRegistered
    return false    }
    
    //---------use Storage id && phone to check for realUserData
    let _checkid= useLocalStorage('id').value ?? null;
    let _checkphone=  useLocalStorage('phone').value ?? null;

    if(_checkphone && _checkid){
          var fetchService = {'phone': Number(_checkphone)};
           //-----------------------embed dynamic userData
           return await authService.useLogin(fetchService).then(async (response) => {
                    console.log('Checking Phone Existance ---WithIn StoreLogin()',response,Object.keys(response),response._isRegistered,authService.getLogStatus._isRegistered)
                    var _reAuthenticated = response._isRegistered ?? false//is authenticated
                    var _userData = response["user"] ?? false 

                    //var _newRegister = authService.getLogStatus._isRegistered ?? false//is authenticated
                    trigger.value = !trigger.value     

                    if(!(_reAuthenticated || _userData )){ return false }

                      _this.value =Object.assign({},_userData)

                      let _issexist = _userData['acctype'] ?? false //toRaw(sessionStorage.getItem("_iss") ?? null) 
                      if(_issexist){
                        _iss.value=JSON.parse(_issexist)
                        _profile_iss.value = _iss.value['saleit'] 
                      }
      
                      return true
                }).catch(()=>{ return true })
    }

    return false;   
};

//-----------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-----------ON-Mouted Operations and Authentications
//-----------Intializing....first functions and required datas
var _navClass = new _navgatorMeta() //constructorialize navigator class
// let _informthis=ref(false)
Loadingpage.value=[{'message':'Loading...'}]
onBeforeMount(async () => {  //--------------ON MOUNT
  console.log('PlayLayout - Checking For Sessions & Stored User ??')
  
  //await _buildDataModel()
  await _navClass._navigateGeo()
  // await _navClass._enumNavigateDevice()
  await _navClass._navigateDevice()
 
  return await _profileInformation()
    .then(async (resp) => {
      // return true
      if(resp){
        //----
          let _ismobile = $q.screen.lt.sm ? ["/play/strend",'playsTrends' ]: ["/play/trend",'playTrends'];
          console.log('ismobile........',_ismobile)
          //timerLoadpage
          await timerLoadpage(4000,"Loading...")
          await timerLoad(4000,"Loged As"+_this.value.phone)
          // bottomRtresponse(7000,"Loged as : " + _this.value.phone)
          return router.push(await _routingPath(_ismobile[0],_ismobile[1]));  

          return await timerResponse(2000, "Loading...").then(async (response) => {
                        bottomRtresponse(7000,"Loged as : " + _this.value.phone)
                        return router.push(await _routingPath(_ismobile[0],_ismobile[1]));  
                  });  
      }

      // return await timerResponse(3000, "Access Error").then((response) => {return  _clearLogs();});     
      return await timerLoad(3000, "Access Error").then((response) => {return  _clearLogs();});     
    }).catch((respError) => {

        timerLoad(3000, "scrumbled privilege detected").then((response) => {return  _clearLogs();});
    });
});

var _cameraInstance = null
onMounted(()=>{
  _cameraInstance = new _cameraDevice()
  _cameraInstance._navigateDevice()
  // console.error("Navigating mediaDevice.0ww");
})

//------------Uitilities Functions and Plugs
async function timerResponse(period = 6000, message = "") {
    Loadingpage.value = message;
    setTimeout(() => {_pageLoading.value=false;Loadingpage.value=null;return true;
  }, period);
}
//----------page messages
async function bottomRtresponse(period = 6000, message = "") {
    // _informthis.value = message;return setTimeout(() => {_informthis.value=false;return false;},period);
}


  //----------
  let _openpubChat=ref(false)
  let _chatting=ref({'userID':_this.value.id,'phone':_this.value.phone ?? 0,'content':''})
  async function openpubChat(_set){

    _chatting.value.userID=_this.value.id
    _chatting.value.phone=_this.value.phone

    if(_set){
    //-----enable box
      _openpubChat.value=!_openpubChat.value
      return true
    }
    return await publicchatService.createData(_chatting.value,{'id':_this.value.id}).then((resp)=>{
      if(resp){
        _chatting.value.content=''
      }
      return true
    })
  }

  let _publiclive=ref('')
  let _setpublicchat=ref(false)
  let _chatWatch=ref(true)
  _chatWatch=computed(()=>{
    let a= _setpublicchat.value
    if(a){
      _liveChatting(2000)
    }else{_liveChatting(60000) }
  return a
})
async function _liveChatting(period){
  clearInterval(_publiclive.value)
  _publiclive.value= setInterval(publicchatService.asyncDatas,period);return true;}
 //
//------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@------------Modal CRUD_OPs

</script>

<style>



</style>
