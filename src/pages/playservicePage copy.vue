<template>

  <q-dialog
        v-model="__thisBox"
        transition-show="scale"
        transition-hide="scale"   
        :style="{ 'background-image': 'url(' +  _this?.saleitgr ?? '' + ')' }"
        class="fit shadow-5 column"
      >  
  
      <!--div class="q-gutter-none column" style="width: 100vw;height: 50vh;">
      <div style="width: 20vw;height: 50vh;overflow: hidden;position: relative;" :style="{'transform':'rotateY(' + movementX * 0.5+'deg)'}"
               
                      @mousedown="handleMouseDown"
                      @mouseup="handleMouseUp"
                      @mousemove="handleMouseMove"
                      @mouseleave="handleMouseLeave"
              >
              <img style="position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              transition: transform 0.5s ease;" :src="_fileAttributeName ? _fileAsSRC[_fileAsSRCIndex] : _this['saleitgr'][_fileAsSRCIndex]"
               alt="360 view"   />
              
             </div>
  
             <div style="width: 20vw;height: 50vh;overflow: hidden;" :style="{'transform':'rotateY(' + movementX2 * 0.5+'deg)'}"
               
               @mousedown="handleMouseDown"
               @mouseup="handleMouseUp"
               @mousemove="handleMouseMove"
               @mouseleave="handleMouseLeave"
       >
       <img style="position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       transition: transform 0.5s ease;" :src="_fileAttributeName ? _fileAsSRC[_fileAsSRCIndex+1] : _this['saleitgr'][_fileAsSRCIndex]"
        alt="360 view"   />
       
      </div>
  
      </div-->
      
  
  
      
      <q-card style="min-width:30vw;" class="overlay-Glass   " v-if="_this ?? false">
    
        <!----HEADER-TOP Begin--> 
        
            <q-linear-progress :value="0.8" color="orange" />
  
            <!--q-bar style='font-weight: bold;'>
              <div>{{  new Date().toDateString() }}</div>
              <q-space />
              <q-btn dense flat  v-close-popup>
                Post
                <q-tooltip>Post</q-tooltip>
              </q-btn>
              <q-btn dense flat  v-close-popup>
                Save
                <q-tooltip>Save</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="close" @click="__thisBoxset()">
                <q-tooltip>Close</q-tooltip>
              </q-btn>
            </q-bar -->
           
  
            <q-card-section class="row items-center no-wrap q-pa-none"  >
             
  
  
              <div class="col " style="max-height:80vh;" >
            <q-img            
                loading="lazy"
                 style="min-height: 50vh;aspect-ratio: 2/1;"
                        :src="_fileAttributeName ? _fileAsSRC[_fileAsSRCIndex] : _this['saleitgr']?.[_fileAsSRCIndex] ?? ''">  
                    
                              <div class="absolute-full transparent column justify-between " >
                                
                                <div class="row" style="min-width:10vw" >
                                      <div class="col fontdstyle text-dark">
                                        <q-btn round icon="add" color="orange" @click="_this['quantity'] = parseFloat(_this['quantity'])+1" />  
                                        Quantity                                   
                                      </div>
                                      <div class="column col-auto q-gutter-xs  " style="width: 5vw;">                                        
                                              <q-item-label class="text-orange">Upload Via  </q-item-label>
                                              <input type="file" multiple ref="filep" style="display: none" @change="_fileSourceFolder($event,'saleitgr')" /> 
                                              <q-btn class="bg-orange" icon="folder" @click="$refs.filep.click()" :dense="true" />
                                              <q-btn class="bg-orange" icon="add_a_photo" @click="_cameraInstance._openCamera('saleitgr')" :dense="true"  />
                                        </div>
                                  </div>
                               
                                  <!--q-slider 
                                  v-model="movementX" @change="_rotor()"
                                  :min="0"
                                  :max="720"
                                  :step="1"
                                  color="green"
                                  thumb-size="35px"
                                  markers
                                /-->
                                      <div class="flex  fontestyle">
                                        <q-item-label> {{_this['header'] }}</q-item-label>
  
                                      </div>
  
  
                                <div class="col row justify-between">
                                 
                                      <div class="self-end justify-left col-auto "> 
                                                <div v-if="__thisOps == 'CreateRowItem'"  style="background-color:rgba(106, 93, 255,0.6)" >
                                              
                                                  <q-btn     :loading="__thisOpsStatus" class="bg-white fontestyle shadow-7  q-pa-xs" color="orange" :label="Objprops._onPlayLanguage ? 'ሽጥ' :'Create Sale'"  icon="upload" 
                                                  @click="Create_this()"  >
                                                      <!--template v-slot:__thisOpsStatus>
                                                        uploading...
                                                        <q-spinner-radio class="on-left" />
                                                        uploading...
                                                      </template-->
                                                      </q-btn>                                                
  
                                                </div>   
  
                                                <div v-else   >                                    
                                                
                                                  <q-btn  rounded   :loading="__thisOpsStatus" class="bg-black shadow-7  fontestyle q-pa-xs" color="green" :label="Objprops._onPlayLanguage ? 'ሽጥ' :'Update Sale'"  icon="upload" 
                                                  @click="Update_this()" />
                                                 
                                                </div>        
                                        
                                          </div>
                                          
                                          <div class="self-end justify-right col-grow column  q-pa-xs" v-if="_fileAsSRC?.length ?? false"  style="max-height:100%;" > 
                                            
                                                <div class="self-end justify-right col row bg-orange fontastyle q-pa-xs" v-if="_fileAsSRC.length > 1">
                                                    <q-checkbox
                                                          left-label
                                                          v-model="_fileAsSRCOps"
                                                          :label="Objprops._onPlayLanguage ? 'መደምሰሲ' :'Enable Delete'"
                                                          checked-icon="task_alt"
                                                          unchecked-icon="highlight_off"
                                                          :dense="true"
                                                        />
                                                        <q-tooltip>Check Enable Delete & Click The Image ?</q-tooltip>
                                                </div>
                                               
                                                <div  class="self-end justify-right col row shadow-5 q-pa-xs" style="max-height:100%;max-width: 100%;" v-if="_fileAttributeName ?? false">
                                                        <div v-for="item,fileIndx in _fileAsSRC" :key="fileIndx" class="col row inset-shadow q-px-xs" 
                                                      style="max-height:100%;" >                                         
                                                        
                                                            
                                                              <q-btn round @click="_fileAsSRCOpsCall(fileIndx)" class="col-auto">
                                                              <q-avatar size="42px">
                                                                <img :src="item">
                                                              </q-avatar>
                                                            </q-btn>
  
                                                      </div>
  
                                                </div>
                                                <div  class="self-end justify-right col row shadow-5 q-pa-xs" style="max-height:100%;max-width: 100%;" v-else>
                                                        <div v-for="item,fileIndx in _this['saleitgr']" :key="fileIndx" class="col row inset-shadow q-px-xs" 
                                                      style="max-height:100%;" >                                 
                                                        
                                                            
                                                              <q-btn round @click="_fileAsSRCOpsCall(fileIndx)" class="col-auto">
                                                              <q-avatar size="42px">
                                                                <img :src="item">
                                                              </q-avatar>
                                                            </q-btn>
  
                                                      </div>
  
                                                </div>
                                          
                                                
                                            </div>
                                    </div>                                                         
                                  
                                  </div>
                                                          
                                </q-img>
                            </div>
    
            </q-card-section>
  
            <q-card-section class="column text-dark bg-orange fontbstyle" v-if="__thisOps == 'CreateRowItem'" >
              
             <fieldset class="col fontastyle  q-gutter-xs" style="border-radius: 5px;border: 0px solid white;"  >
  
              <div class="row q-gutter-sm  " > 
                <q-input type="Number" class="col fontestyle" :rules="[_valRules]"   outlined v-model="_this['quantity']" :label="Objprops._onPlayLanguage ? 'በዝሒ' :'Quantity'"  stack-label   />
                <q-input type="Number" class="col fontestyle "   outlined v-model="_this['price']"  :label="Objprops._onPlayLanguage ? 'ዋጋ' :'Price'" stack-label  />
              </div>
      
              <q-select outlined   class="col-md col-xs q-pa-none" style=""  color="purple-12" v-model="_this['catagory']" :options="saleitSchema['catagory']['enum']"  :label="Objprops._onPlayLanguage ? 'ምድብ' :'catagory'" />
              <div v-if="['Vehicles','Households'].includes(_this['catagory'])" >
              <q-radio keep-color left-label size="md" v-model="_this['usage']" :val="usage" :label="usage" color="black" v-for="usage in saleitSchema['usage']['enum']" :key="usage"/>
              </div>
              <q-item-label caption> What are You Saling !</q-item-label>        
          <q-separator inset />
     
             </fieldset>
            </q-card-section>
    
            <q-card-section class="column text-dark bg-orange fontbstyle" v-else >
              
              <fieldset class="col fontastyle  q-gutter-xs" style="border-radius: 5px;border: 0px solid white;"  >
     
               <!--legend @click="_formsMeta.description = ! _formsMeta.description" class=" text-weight-bolder">
                   Descriptions
               </legend -->
                 <div class="row q-gutter-sm  " > 
                  <q-input type="Number" class="col fontestyle" :rules="[_valRules]"   outlined v-model="_this['quantity']" :label="Objprops._onPlayLanguage ? 'በዝሒ' :'Quantity'"  stack-label   />
                <q-input type="Number" class="col fontestyle "   outlined v-model="_this['price']"  :label="Objprops._onPlayLanguage ? 'ዋጋ' :'Price'" stack-label  />
               <q-input type="Number" class="col fontestyle "   outlined v-model="_this['discount']" label="Discount Price ?" stack-label  />
     
               </div>
             
         <q-separator inset  />
            <q-input class="col-md col-xs q-pa-sm" style=""  outlined v-model="_this['header']" label="Name" stack-label  />
            <q-input outlined v-model="_this['content']" label="decscriptions" style="" filled  autogrow   />  
   
         <q-separator inset />
               <q-item-label caption> Notes to be displayed !</q-item-label>        
           <q-separator inset /> 
      
  
              </fieldset>
    
     
             </q-card-section>
  
          </q-card>
    
    </q-dialog>
  
    <q-dialog v-model="_cameraBox" class="column overlay-Glass rounded-borders" >
        <!--CameraFeeds  @Picture-taken="imageSrc = $event" / -->
        <div class="column" style="background-color:orange;
          border: 1px dashed #d6d6d6;
          border-radius: 4px;
          padding: 2px; 
        " > 
       
          <div v-if="_fileSourceFoCam == 'camera'">
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
          icon="camera" size="xs"
        >
                <q-item v-for="camera in _listCameraSource" :key=camera class="row q-gutter-sm">  
                                <q-btn style="height:100%" no-caps size="sm" :dense="true" :color="_selectedCameraById == camera.deviceId ? 'blue':'black'" :label="camera.label.split('_')[1]" @click="_cameraInstance._setCameraParam(camera.deviceId,false)" />
                                <q-btn style="height:100%" no-caps size="sm" :dense="true" :color="_selectedCameraById == camera.deviceId ? 'orange':'black'" :label="_selectedCameraByface ? 'Front Cam':'Back Cam'" @click="_cameraInstance._setCameraParam(camera.deviceId,!_selectedCameraByface)" />
                             
                              </q-item>
                </q-expansion-item>
  
                  </div>
               
                </div>
  
          </div>
               
        
           
        </div>
  </q-dialog>
  
  <q-dialog v-model="_fileAsPathSlide" class="column saleitContentOps-Glass ">
      <div class="col" v-if="_this?.['saleitgr'] ?? false">
        <q-carousel
          animated
          swipeable
          loading="lazy"
          v-model="slideIndex"
          navigation
          infinite
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
          control-color="amber"
          v-model:fullscreen="slideFullscreen"
          class="bg-grey-9 shadow-2 rounded-borders"
        >
          <q-carousel-slide :name="imgindex" :img-src="imggr" v-for="imggr,imgindex in _this['saleitgr']" :key="imgindex" />
          <template v-slot:control>
          <q-carousel-control
            position="bottom-right"
            :offset="[18, 18]"
          >
            <q-btn
              push round dense color="white" text-color="primary"
              :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="slideFullscreen = !slideFullscreen"
            />
          </q-carousel-control>
        </template>
  
        </q-carousel>
      </div>
  
  </q-dialog>
  
  <!----date input pop up-->
  <dialog class="dialogb z-top  fontestyle" v-if="false" >
   
            <div class="col-auto column">
              <div class="col row q-py-md items-center q-gutter-sm" >    
                <q-avatar icon="phone" style="background-color:orange;"> </q-avatar>
                <label>+23441341</label>
              </div>
  
              <div class="col row" v-for="pr in [1,2,3]" :key="pr">    
                  <div class="col">lllllll</div>
                  <div class="col">lllllll</div>
                  <div class="col">lllllll</div>
              </div>
  
              <div style="font-weight: bold;min-height:15px;min-width:100%;" > </div>
              <div class="col-auto column q-gutter-xs" >    
                <q-btn class="col" color="red" @click="true" label="close" />
                <q-btn class="col" color="red" @click="true" label="delete" />
              </div>
  
            </div>
  
  </dialog>
  
  <dialog class="dialogConfirm z-top column flex flex-center fontestyle" v-if="true">
        <div style="min-width:20vw;" class="column items-center text-white q-gutter-md product-card">
  
          <div>
              <div> Are You Sure ?</div>
              <div> Content </div>
          </div>
           
          <div class="column fontestyle" style="width:100%;">
            <q-btn class="product-card button" rounded color="green" flat label="Yes" @click="dialogConfirm = 'yes'"  />
            <q-btn class="fontestyle" flat color="red" label="No" @click="dialogConfirm = false" />
          </div>
  <button> ooo </button>
        </div>
  
    
      
  </dialog>
  <!----form submitting pop up-->
  <dialog class="dialoga z-top " v-if="!dialoga">
            <div class="row fontestyle text-white justify-between q-my-md">
              <div>Editing</div>
              <q-btn :dense="true" size="sm" color="red"   @click="__thissideBoxIndex = null" icon="close"  >
                <q-tooltip>close</q-tooltip>
                </q-btn>
            </div>
  
    <div class="transparent q-ma-md  column q-gutter-sm">
  
              <q-input  outlined type="text" standout="bg-teal-2 text-white"
                    autogrow 
                        stack-label :dense="true"  placeholder="commenting..." />   
  
                        <q-input  outlined type="text" standout="bg-teal-2 text-white"
                    autogrow
                        stack-label :dense="true"  placeholder="commenting..." />  
  
    </div>
  
  
          <div class="column q-gutter-xs fontestyle ">
                <q-btn label="Update" color="orange"/>
                <q-btn label="Delete"  color="blue" />
            </div>
  </dialog>
  
  <!----date   input pop up-->
  <dialog class="dialogb z-top fontestyle" v-if="dialogb" >
  
                          <div> Choose Date</div>
  
                          <div class="q-gutter-sm column">
  
                              <q-input outlined :dense="true" size="xs" v-model="_orderDate" mask="date" style="max-width:10vw" >
                                
                              </q-input>
  
                              <q-date v-model="_orderDate">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat @click="dialogb = false" />
                                        </div>
                                </q-date>
  
                            </div>
  
                            <div class="transparent">  
                            <button @click="dialogb = false" style="width:100%;color:red"> Close </button>
                          </div>
  </dialog>
  
    <q-page class=" row rounded-borders fontastyle q-py-xs fit boxastyle"  >
     
        <div class="col-auto q-gutter-xs fixed-bottom z-top column q-ma-md items-end" style="left:70vw;"> 
            <!----------------->
            <!--- No Data Founded, but keep listnening till we founde-->
            <div class="q-pa-sm" v-if='syncerrorData' > 
              {{ syncerrorData}} 
            </div> 
            <!---Rows is locked but, Update founded-->
            <div class="q-pa-sm text-bold rounded-borders q-pa-xs fontastyle bg-blue" v-if='syncListenerSmsint' > 
                <div> {{ syncListenerSmsint}}</div>
            </div>
            <!-------------------->
            <!------loading update/create items-->
            <div class="q-pa-sm  text-bold rounded-borders fontastyle q-pa-sx" v-if='__thisOpsStatus'>Still Loading... </div>
            <!------loading comments/client Operation--> 
            <div class=" text-bold rounded-borders fontastyle q-pa-sx" v-if='__thissideBoxOpsStatus'>{{  __thissideBoxOps == 'comments' ? 'commenting..' : 'Buying' }}  </div>
  
            <!---custome loading(operation status)-->
            <div class=" rounded-borders bg-grey fontdstyle q-pa-sx" v-if='Loading'> {{Loading}}  </div>
            <div class=" rounded-borders bg-green fontdstyle q-pa-xs" v-if='DoneMessag'>  {{ DoneMessag}}  </div>
            <div class=" rounded-borders bg-cyan fontdstyle q-pa-xs" v-if='KnowthisMessage'> {{ KnowthisMessage}}  </div>
            <div class="rounded-borders bg-red fontdstyle q-pa-xs" v-if='WarnthisMessage'> {{ WarnthisMessage}}   </div>
          </div>
  
        <div class="col-auto column rounded-borders fontastyle q-gutter-xs  boxbstyle" style="height:93svh;"> 
                            <!---Quantity Tags-->
                       <div class="column q-gutter-xs q-ma-none">
  
                        <div class="col-auto row justify-between q-gutter-xs q-ma-sm">
                          <div>
                              Client Information
                          </div> 
  
                          <div> 
                            <q-btn :dense="true" color="black" size="xs" flat @click="barSize=false" icon="minimize" />
                          <q-btn :dense="true" color="blue" size="xs"  @click="barSize ='max'" icon="maximize" />
                          <q-btn :dense="true" color="red" size="xs"  @click="barSize ='close'" icon="close" />
                          </div> 
                          
                        </div>
  
                        <div class="col-auto q-gutter-sm row q-pa-xs justify-between boxastyle" v-if="barSize =='max'">   
                        
                        <div class="col-auto row q-gutter-xs column justify-between items-center">
    
                          <div class="col-auto q-gutter-sm row q-pa-xs justify-between boxastyle"> 
  
                              <div class="col-auto row q-gutter-xs column justify-between items-center">
                             
                                <div class=" row q-gutter-none items-center">
  
                                  <div> <q-avatar icon="phone"/> {{  Objprops._profile.phone }}</div>
                                </div>
  
                                <div class="text-red"> 
                                  <q-avatar style="border-radius:9%">
                                    <img :src="Objprops._profile.profile[0]">
                                  </q-avatar>
                                  <div class="text-grey fontastyle">#  {{  Objprops._profile.name }} {{  Objprops._profile.lastName }}</div>
                                </div>    
                                
                                <div class="fontestyle text-grey"> 
                                  <div>My Service and Product</div>
                                    <div>Dashboard</div>
                                  </div>             
  
                              </div>
                               </div>             
                          
                        </div>
  
                        <div class="col-auto row q-gutter-xs shadow-1" >
                          <!--q-date v-model="date" /-->
    
                              <q-card-section class="column q-gutter-xs fontastyle  ">
                           
                                    <div> Search By Date:</div>
                                    <div class="">
                                        <q-input outlined :dense="true" size="xs" v-model="_orderDate" mask="date" style="max-width:10vw" >
                                          <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-date v-model="_orderDate">
                                                  <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                                  </div>
                                                </q-date>
                                              </q-popup-proxy>
                                            </q-icon>
                                          </template>
                                        </q-input>
                                      </div>
                                      <div>Search Date</div>
                                      <div v-if="_orderDate" class="fontastyle col-grow  column flex-center">
                                        {{new Date(_orderDate)?.toLocaleString() ?? ''}}
                                      </div>
                                    
                                      
                               </q-card-section>                            
    
                               <q-card-section class="column col-auto q-gutter-xs fontastyle  ">
                                  
                                  <div> Serve Status:</div>
                                  <div class="row justify-between q-gutter-sm q-px-xs" v-for="sstatus,kkey in _serveStatus" :key="kkey"> 
                                      <div class="text-grey">{{  kkey }}</div>
                                      <div><q-toggle size="xs" v-model="_serveStatus[kkey]" val="xs"/></div>
                                    </div>
    
                              </q-card-section>
    
                        </div>
    
                        <div class="col-auto q-gutter-xs row boxastyle q-pa-none ">
                            <q-card-section class="shadow-1 col-auto boxastyle q-gutter-xs column">                            
                               
                                  <div class="fontdstyle">Total Orders</div>
                                <div class="row  flex flex-center col-grow q-gutter-xs">
                                    <div>{{  storeItems['buy'] }}</div>
                                </div>
  
                            </q-card-section>
    
                            <!---Price Tags-->
                            <q-card-section class="shadow-1 col-auto boxastyle column">
                                <div class="fontdstyle">Expected Income</div>
                                <div class="row  flex flex-center col-grow q-gutter-xs">
                                    <div >{{ totalPrice }}</div>
                                    <div>{{ currency }}</div>
                                </div>
                            </q-card-section>
                        </div>
                     
    
                      </div>
  
                       </div>
                     
  
                      <div class="col column q-pa-sm q-ma-none " style="min-width:50vw" v-if="barSize != 'close'" > 
                     
                                  <!------------------------------ ioio ----->
                                  <div class="col q-pa-none column " v-if="(_this_clientRows.length ?? false)"    >
                                        
                                  
                                    <q-table 
                                        
                                        flat bordered
                                          
                                          :rows="_this_clientRows"
                                          :columns="_this_clientColumns"
    
                                          virtual-scroll
    
                                          :filterMethod="_thisFiltering"
                                          :filter="filter"
    
                                          row-key="id" 
                                          rowIndex="true"
                                          
    
                                          :inFullscreen="true"
                                          class="col-auto q-gutter-xs row q-pa-none justify-end" style="background-color: whitesmoke;"
    
                                          hide-pagination
                                          :pagination="pagination"
    
                                          :visible-columns="visibleColumns"
    
                                          hide-top
                                          hide-bottom
                                          >
    
                                          <template #header-cell="props">
                                            <q-th
                                              :props="props" style="background-color: orange;text-align:left;"
                                              
                                              ><!--q-icon name="lock_open" size="1.5em" /-->
                                               {{ props.col.name }}
                                            </q-th>
                                          </template>
                              
                                          <template v-slot:body="props">
                                            
                                              <q-tr :props="props"  v-if="__thissideBoxIndex == props.rowIndex " >
                                                <q-td  colspan="100%">
                                                   <!-----editng Serve status-->
                                                   <div class="row justify-end q-gutter-xs items-center">
                                                      <div class="q-px-md fontastyle">Editing Order 
                                                          <div><q-icon name="phone" style="background-color:white;border-radius:50%;padding:1px;"/> {{  props.row.phone }}</div>
  
                                                      </div>
                                                       <q-item-label style="" class="col-auto fontastyle">
                                                                  
                                                                  <q-select
                                                                  :dense="true" size="sm"
                                                                        filled
                                                                        v-model="props.row['served']"
                                                                        :options="['Queed','Served']"                                                                  
                                                                        
                                                                      />                                                                           
                                                                      
                                                                </q-item-label>   
                                                  <!----editing the description status-->
                                                        <q-item-label style="" >
                                                                    <q-input  autogrow filled class="col fontastyle" 
                                                                    :shadow-text="textareaShadowText"
                                                                          @keydown="processTextareaFill"
                                                                          @focus="processTextareaFill" 
                                                                           v-model="props.row['description']" 
                                                                          label="Delivery Remark" stack-label :dense="true"  />                                                                      
                                                                </q-item-label>   
                                                    <!-----actions-->
                                                            <div class="q-gutter-xs row">
                                                              <div class="column q-gutter-xs">
                                                              <q-btn color="green" size="xs" :dense="true" icon="done" @click="_this_foreignOperation._submitArray(props.rowIndex)" label="apply"  />                                    
                                                                <q-btn color="red" size="xs" :dense="true" icon="delete" @click="_this_foreignOperation._remove(props.rowIndex)" label="delete"  />                                    
                                                              </div>
                                                              <q-btn  size="sm" color='red' :dense="true"  @click="__thissideBoxIndex = null" label="close" > </q-btn>
                                                          
                                                            </div>
                                                   </div>
                                             
                                                </q-td>
                                               
                                              </q-tr>
                                              <q-tr :props="props" class="q-gutter-sm q-tr--no-hover col-shrink  fontbstyle"  v-else>
                                              
                                                <td
                                              :props="props"
                                              style="font-size: 0.6em; text-align: justify"
                                              class="text-bold text-center fontbstyle"
                                              :class="
                                                object.name == 'name'
                                                  ? 'text-center'
                                                  : 'text-center '
                                              "
                                              v-for="object in props.cols"
                                              :key="object.name"
                                            >
                                            
                                              <!--Styling Tabs-->
                                           <div v-if="object.name == 'served'" class="fontbstyle">    
                                                        <div :style="props.row[object.name] == 'Requested' ? 'color:green':'color:grey'">
                                                          {{ props.row[object.name] }}
  
                                                        </div>
                                                        
                                                  </div>
                                            <!---------------Store columns-->
                                                <div v-else-if="object.name == 'store'">    
                                                      <q-badge color="orange" v-if="props.row[object.name] == 'buy'">{{  props.row[object.name] }} </q-badge>
                                                      <q-badge color="teal" v-else>{{ props.row[object.name] }} </q-badge>
                                              
                                                </div>
  
                                            <!---------------Descriptions columns-->
                                            <div v-else-if="object.name == 'description'">    
                                                        <q-btn :dense="true" size="sm" no-caps color="blue" label="View"  @click="_this_foreignOperation._selectArray('selected',props.rowIndex)"  />
                                                        <q-card v-if="__this_foreignBoxIndex == props.row.id" class="fixed-bottom z-top fontastyle flex flex-center"  style="max-width:30vh;left:1rem;bottom:1rem" > {{ props.row.description }} </q-card>
                                                </div>
  
                                          <!---------------time _this_clientColumns-->
                                                  <div v-else-if="object.name == 'time'" class="fontbstyle text-grey">    
                                                         <div v-if="typeof props.row.fupdatedAt == 'object'" class="fontbstyle row q-gutter-xs"> 
                                                            <div  v-if="props.row.fupdatedAt?.days ?? ''" > {{props.row.fupdatedAt.days}} D,</div> 
                                                            <div v-if="props.row.fupdatedAt?.hours ?? ''" > {{props.row.fupdatedAt.hours}} H,</div> 
                                                            <div v-if="props.row.fupdatedAt?.minutes ?? ''" > {{props.row.fupdatedAt.minutes}} M </div>
                                                            <div v-if="props.row.fupdatedAt?.minutes ?? ''">ago</div>
                                                            <div v-else>Just Now</div>                                                          
                                                          </div>
                                                          <div v-else> {{props.row.fupdatedAt}} </div>
                                                  </div>
                                                  <div v-else-if="object.name == 'action'" class="q-gutter-xs">       
                                                    <template v-if="(__this_foreignBoxIndex == props.rowIndex) && __this_foreignBoxsubOps">
                                                            <div class="q-gutter-xs row">
                                                              <div class="column q-gutter-xs">
                                                                <q-btn  size="sm" color='orange' :dense="true" icon="close"  @click="__this_foreignBoxIndex = null" label="close" > </q-btn>                                                             
                                                                <q-btn color="red" size="xs" :dense="true" icon="delete" @click="_this_foreignOperation._remove(props.rowIndex)" label="delete"  />                                    
                                                              </div>
                                                          
                                                            </div>
                                                    </template>
                                                    <template v-else>
                                                        <q-btn size="sm" :dense="true" color="orange"  icon="edit"  @click="_this_foreignOperation._selectArray('selected',props.rowIndex)" > </q-btn>
                                                    </template>
                                                         
                                                  </div>
                                              <!---------------Others _this_clientColumns-->
    
                                                  <div v-else class="fontastyle text-grey-8">
                                                      {{  props.row[object.name] }}
                                                  </div>
                                                </td>
    
  
  
                                                </q-tr>
    
                                            </template>
    
                                          </q-table >
                                        
                                  </div>
    
                                  <!-- sckelton of single_content-->
                                  <div class="col q-py-md fit q-gutter-md flex flex-center column" style="" v-else>
    
                                    <!-- <q-table 
                                        
                                        flat bordered
                                          
                                          :rows="_this_clientRows"
                                          :columns="_this_clientColumns"
                                          /> -->
  
                                    <div  style="width:80%" class="col-grow q-pa-xs column q-gutter-xs">
                                      <q-skeleton class="col-grow flex flex-center text-grey">Listening For Buyers
                                        </q-skeleton>
                                      <q-skeleton class="col-grow flex flex-center"  v-for="i in 15" :key="i">
                                        </q-skeleton>
                                       
    
                                      </div>
    
                                      <q-separator inset />
                                      <div class="row items-center q-gutter-sm">
                                         <div></div>
                                          <div class="fontastyle text-red">No Buyer Detected, so far</div>
                                      </div>
                                     
                                       
                                  </div>  
                        </div>  
          </div>
  
          <div class="col q-gutter-xs column  boxastyle q-pa-xs" >
  
                <div class="col column q-gutter-xs">
                    <div class="col-auto q-pa-sm items-center fontestyle justify-between row "> 
                        <div class="row q-ma-xs"><div>Your Service and Products  </div> </div>
                     
                        <div class="items-center fontastyle text-blue row" v-if="_this_Rows?.length ?? true"> 
                          <div class="items-center q-px-xs fontdstyle  "> # {{  _this_Rows?.length ?? '' }} Items </div>
                          <div>Enable Live Orders</div>
                          </div>
                        
                    </div>
                    <div class="col-grow row q-gutter-sm no-overflow scroll-area" style="max-height: 72vh;" v-if="_this_Rows?.length ?? false">
  
                    <div class="col-auto q-gutter-sm column " v-for="_rows,thisindex in _this_Rows" :key="thisindex">
                      <div class="col-auto  q-gutter-sm  row" v-if="_rows?.saleitgr ?? false">
                                    <q-card class="col-auto column fontbstyle" flat bordered>
                                        <q-img :src="_rows.saleitgr[0]"
                                          style="aspect-ratio: 1/1;width:100%;" class="col q-pa-xs">
                                            <div class="q-gutter-xs transparent">
                                                <div style="border-radius:50%;width:1vw;height:1vw;background-color:red;" v-if="__thisIndex == thisindex"> </div>
                                                <q-btn no-caps class="fontdstyle" color="green" :dense="true" size="sm" :label="_onPlayLanguage? 'liveBuyers' : 'Live Buyers'"
                                                @click="_this_foreignActivator(thisindex)"
                                                />                                            
                                            </div>
                                          </q-img>
  
                                        <q-card-section class="col-auto q-gutter-xs  fontastyle" style="background-color:white">                                  
                                          <div class="row q-gutter-xs no-wrap justify-between fontdstyle">
  
                                            <div class="col-auto row justify-start">
                                              <div class="q-gutter-xs">
                                                 <q-btn size="sm" no-caps color="white" class="text-black" :dense="true" @click="__thisBox_UDialog(thisindex)"  icon="edit"  />                                    
                                              <q-btn size="sm" no-caps color="red" class="text-black" :dense="true" @click="_this_ActiveOperation._delRow(thisindex,_rows.id)" icon="delete"  />                                    
                                              <q-btn size="sm" no-caps color="orange" class="text-black" :dense="true" @click="setRowsync(null,_rows.id)"  label="Details" />                                    
                                              
                                              </div>
                                             
                                            </div>
                                          
                                            <div class="col-grow  column items-end q-gutter-xs fontastyle "> Price: {{_rows.price}} <div >Quantity: {{ _rows.quantity}}</div></div>
                                                
                                          </div>
  
                                          <div class="row no-wrap items-center q-py-sm q-gutter-md fontastyle justify-between">
                                            <div>                                      
  
                                                <q-item-label> 
                                                  <q-rating v-model="_rows._itServiceRating" :max="5" size="xs" @click="_this_ActiveOperation._rating(thisindex)"/>
                                                  <q-tooltip class="bg-black">Product Reliability Score</q-tooltip>
                                                </q-item-label>
                                                <q-item-label>{{ _rows.catagory }} ({{ _rows.usage }})</q-item-label>
                                            </div>
                                          
                                            <div class="col-grow column fontestyle flex boxastyle flex-center">
                                                    <div>{{ _rows.tClient}}</div>
                                                    <div class="fontastyle">Buyers</div>
  
                                            </div>
                                            </div>
                                        
                                        </q-card-section>
  
                                  </q-card>
                          </div>
                      
  
  
                    </div>
                        </div>
  
                      <div class="col-grow column justify-center items-center text-grey" v-else> No Data</div>
              </div>
          
    
          </div>
    
          <!----------------------LiveDATA Banner-->
    
          <!------------Zooming Level Adjuster Sticky-------------------------->
    </q-page>
    
  
    <q-input v-mode="count" label="c"  />
  <q-btn @click="count =45" label="i"  />
    {{  count ?? false}}
  
        </template>
        
        <script setup>
    
        //_____________________________________________Modules Definitions
    //-------------------------------------------------------------Importing System Modules
    import { ref,reactive,computed,watch,onUnmounted,onMounted } from "vue";
    import {useQuasar, useMeta } from "quasar";
    //import print from 'print-js';
    import { useRouter } from "vue-router";
    //import { storeToRefs } from "pinia";
    import { saleitStore } from "stores/dataStores/saleitStore"; //saleit Store ( Main Store)
    import { saleitcliStore } from "stores/dataStores/saleitcliStore"; //saleit Store ( Main Store)
    //import { chatStore } from "stores/dataStores/chatStore"; //saleit Store ( Main Store)
    import { thisStore } from "stores/dataStores/thisStore"; //saleit Store ( Main Store)
    import { genapiStore } from "src/stores/jstStores/genapiStore";
    
    import { saleitSchema } from "src/composables/schemas/saleitSchemas";
    import { saleitClientSchema } from "src/composables/schemas/saleitSchemas"; //
    import { _permission } from "src/composables/schemas/profileSchemas"; //acctype//userRole Schema
  
    import {schemaSklt} from "src/composables/schemaSklts";
    import { _wiseDating } from "src/composables/utilServices/datePeriod"
  
  
  import useDebugMixin from "src/composables/debugMixin"
  const { 
    Loading,
        DoneMessag,
        KnowthisMessage,
        WarnthisMessage,
        //----------returning values
        timerLoad,
        timerDone,
        timerInformthis,
        timerError
  } = useDebugMixin()
  let dialoga =ref(true)
  let dialogb =ref(true)
  
  let dialogConfirm=ref(false)
  import useDefaulMixin from "src/composables/myMixin"
  // Import the mixin
  // Use the mixin
  const {count,
    //------------
    //----------returning values
    _allColumnNames,
    _rolesColumns,
    visibleColumns,
    //---------settings
    Objprops_,
    _thisModel,
    _this_Schema,
    invisibleColumns,
    //----------------functions
    _allColumnName,
    _rolesColumn,
    visibleColumn,
    modalColumns,
  
    _model_Defaulting,
        _modal_Defaulting_,
  
    modal_iss,
    increment,
    decrement
  } = useDefaulMixin();
  
  // Apply the mixin using the `use` function
    //----componenents..
    //------------------Global Variables [ uTILITIES..]
    const $q = useQuasar();
    //const $m = useMeta();  
    const router = useRouter();
    
    const metaData = {
      // sets document title
      title: "sale_itService",
      // optional; sets final title as "Index Page - My Website", useful for multiple level meta
      titleTemplate: (title) => `${title} - `,
      // JS tags
      icon:"/icons/qimage.png", 
      script: { },
    };
    useMeta(metaData);
  
  //----STORE & SERVICES
  
  const _thisService = thisStore()
  const saleitService = saleitStore();
  const saleitcliService = saleitcliStore();
  
  const genapsaleitContentOps = genapiStore(); //import { genapiStore } from "src/stores/jstStores/genapiStore";
    //-------         
    //////////////////////////////////////////--------------Axios Wrapper UUUUUUPPPPPPPPPPPP
  let  Objprops = defineProps({
      //----General Informations
      _profile: { type: Object, default: () => ({}) }, //user Datas all there is...
      //----User Credentials and Unique ID.
      userID: { type: String, default: "" }, //
      userName: { type: String, default: "" }, //
      //-----------access Parameters
      _iss: { type: Object, default: () => ({}) },  ///Customized(is?)_ACCESS_Type of Per/User(for_all Models)..as 'saleit':[isUpgrade,isClient] Form
      _acctype: { type: Object, default: () => {}},   ///RAW_ACCESS_Type of Per/User (for_all Models)..as 'saleit':[true,'/plat','',[]]
      //---------
      _issModal: { type: Object, default: () => ({}) }, //(Every Models _Schema for ACCEss Type)
      //---
      phone: { type: String, default: "" }, //phoneCode
      phoneCode: { type: String, default: "" }, //phoneCode
      location:{ type: Object, default: () => ({}) },
      geolocation:{ type: Object, default: () => ({}) },
      //-------------------(layout tunnel for command datas(signal))
      lytCreatRow : { type: Boolean, default: false },
      //--------Search Button Signal  
      lytSearchRow : { type: String, default: '' },
      _onPlayNavMedia : { type: String, default: '' },
      //----------
      _onPlayLanguage : { type: String, default: '' },
    });
    Objprops_.value=Objprops ?? false
    //-----------------utitlies definitions
    let barSize=ref(true)
  //---------------------------
  //===-----_--------THE MODEL/ MAIN_DATA....
  //let _thisModel = "saleit"; // the Vue_Page_DataModel (Listing Collection Name)
  _thisModel.value='saleit'
  const _thisapiUrl='/saleitapi/saleit'
  
  const _thisiiapiUrl='/saleitcliapi/saleitcli'
  //---current Modal Specific_privileges_analysis
  
  //---current Modal Specific_privileges_analysis (SALEIT Role and Responsiblities ++ Stages)
  //=======================================Loged User Role && Permission===Start
  let gen_modal_iss = computed(() => { return modal_iss() } )
  
  //===========================================Loged User Role && Permission===End
  //==========================================DEfaulting && Scheam Generations====Start
  //========<><><><><><==================Create Default Schemas
  //---foreignKeyed Defaulting (Scheam)==== PreDefined Models
  let _thisModels =[]
  //==========-----------Generating====The Schematic Models
  //---main Defaulting(Schema)------takes the model require table_view && filtering...
  let _this_clientSchema=saleitClientSchema
  _this_clientSchema['time']={default:''} //-----add require custom columns
  _this_clientSchema['action']={default:''}
  
  _this_Schema.value=_this_clientSchema
  
  let _this_clientModels =[]
  let _this_clientColumns = ref([]); //Actual Table_Columns ++Descriptions
    ///-----setting variable to hold main_schema Values
    let lockedColumns = ref([ "userID","userName",'time','action']); //are blacklist of _this_clientColumns tobe not shown during the Registerations..form submitting
    // let visibleColumns = ref([]); //column invisiblity on table_
    
    invisibleColumns.value = [
      //"financeStatus",
      'saleitID','userID','confirmID','phoneCode','geolocation','paymentMethod'
    ]; //defualt hidden _this_clientColumns
    if ($q.screen.lt.md) {
      //invisibleColumns.push("storeStatus");
    }
    if ($q.screen.lt.lg) {
      //invisibleColumns.push("storeStatus");
    }
  //==================-----------Generating====The Schematic Models
  //using above schema_models,schema build default values by the logedUser Roles (permission level)
  _this_clientColumns = computed(() => { 
      //if (Object.values(Objprops).length === 0) { //is User_Fully_Authenticated &&  or Return Null_Columns
      //  return [{}];
      //} else {
        //_setParameters()
        //--------------Preparing this_model role_schemas
        let rolesWall = gen_modal_iss.value?.['role'] ?? false
        //------==== building columns of thisMoel
        let _tableColumn = []; //HOLDING_  all the ---"Columns"--- of the Data_model ( TOTAL Columns)
        let _visibleColsName = [];  ////--HOLDING_ all the ---"Visible" Columns"---- of the Data_model ( TOTAL Columns)
        //let a = modalColumns()
        for (let schemaColumn in _this_clientSchema) {
          //----------------loging all _this_clientColumns_ as table _this_clientColumns_format
          let _col = { name: schemaColumn,schema: _this_clientSchema[schemaColumn], }; //the q-table format of Column Definitions... && Hold Every Columns
          _tableColumn.push(_col); 
          //----------------loging all _this_clientColumns name as normal list format
          _allColumnName(schemaColumn); 
          //---------------loging Visible Columns list(on table)
          invisibleColumns.value.includes(schemaColumn) ? "" : _visibleColsName.push(schemaColumn);
          //----
          //----------------loging Role Based  && whitelisted Columns-Start
          if (schemaColumn === "extraColumn" || lockedColumns.value.includes(schemaColumn)) { //if _this_clientColumns is locked(for not display or analysis).. passit.
            continue;
          } else {
            _rolesColumn(_col)
          }
          //------------------------roleBase Columns-End
        }
        //-------------------------
        _setDefaults(); 
        visibleColumn(_visibleColsName);
        return _tableColumn;
      //}
    });
  
    async function _setDefaults(){
      _this_clientModels = ['phone',"userName","geolocation",'location','phoneCode'] //
      _thisDefault_client.value = await _model_Defaulting(_this_clientModels)
  
      //------==== building columns of thisMoel
      // _this_Schema.value=saleitSchema
      _thisModels = ['orderID',"quantity","saleitID",'userID','userName','phone',
      'confirmID','served','phoneCode','geolocation','location','saleitgr'] //
      _thisDefault.value = await _modal_Defaulting_(_thisModels)
      _thisDefault.value['quantity']=1
      _thisDefault.value['userID']=Objprops._profile.id
      return true
    }
   // _this_clientColumns;
    // _setDefaults(); 
  async function _initDefaulting2 (){
    let _initCol = _this_clientColumns.value;
    console.log(_initCol,'default initiator.....',_thisDefault)
    return true;
  }
  //==========================================DEfaulting && Scheam Generations====End
  
  //---------form Validation_Rules
  //Columns to be Redefined
  const _genOrderID = async()=>{
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      var result = ''
      for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result 
    }
  
   async function _valRules(val){
      let _colRules ={'usage':[null,''],'catagory':[null,'']}
      let _onplayCol =''//_colRules[column] ?? false
      let _val=false
      try{
         _val = !val || 'filled required ?'
      }catch{  }
  
      return _val
    }
  
  //===============================================-----------------------------------
  let _contenting=ref('main')//handle two tables
  
  let syncInt=''
  let synccliInt=''
  
  let _contentingliveStatus=ref(20000)
  let _contentingcliliveStatus=ref(20000)
  var currency=ref('Birr') 
  //-----------------------DATAs ROWs--------------
    //--------------------------
    //===============================================-----------------------------------------
    //-------------------secondary && thrisiary models Default 
    let _this_chatRows = ref([]); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
    let _thisDefault_chat=ref({})
  
    let _this_clientRows = ref([]); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
    let _thisDefault_client=ref({})
    let _this_clientforeign = ref({}); //the selected row_actual_Data..as object
  
    let _this_chatforeign = ref({}); //the selected row_actual_Data..as object
    //------------- MODAL ROWs_ MANAGMENT
    let _this_Rows = ref([]); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
    let _thisDefault = ref({});
    let _this = ref(null); //the selected row_actual_Data..as object
  
    //------- Original/_UpdateRowItem:CreateRowItem _Commands
    let __thisBox = ref(null); //true...
    //-------
    let __thisIndex = ref(null); //_row_item_index..0/1/2
    let __thisOps = ref(null); //_is UpdateRowItem/Creating_New
    let __thisOpsStatus =ref(null)
    
    //==-----tabular side_box ( Pop_by_Id and tell the Operation)
    let __this_foreignBox = ref(null); //clients,...
    //--------
    let __this_foreignBoxIndex = ref(null); //array_index_0/1/2/3
    let __this_foreignBoxsubOps = ref(null); //editing,deleting,creating
    let __this_foreignBoxOpsStatus =ref(null)
  
    let __this_foreignBoxOps = ref(null); //editing,deleting,creating
  
    //-------
    let _is_thisOwner=ref(false)
    let _is_clientOwner=ref(false)
    let _is_chatOwner=ref(false)
  //--------------------------------------------------
  
  //----------------------------------
  _initDefaulting2()
  let pagination= ref({ rowsPerPage: 200 })
  //--------------clientQuery
  //================SYNC DEBUGER=====1
  _this_clientRows = computed(() => { //Updating is comming
    return _computeRows(saleitcliService.getDatas)
  });
  function _computeRows(_Datas) {
    pagination.value.rowsPerPage=10//_Datas.length/3
    _this_RowsDebug(8000,'Data updating...');
    return _Datas
  }
  let syncListenerSmsint=ref(false)  //Blocked Data Listners
  async function _this_RowsDebug(period = 6000, message = "") {
    syncListenerSmsint.value=message
    setTimeout(() => {syncListenerSmsint.value=false;return false;}, period);
  }
  //-------------------------------------------------------------
  //------------Uitilities Functions and Plugs
  //================SYNC DEBUGER=====2
  let syncerrorData=ref(true) //No Data Founded..... Listners  ( untill there is Data Founded)
  syncerrorData = computed(()=>{
  let _checkfound= saleitcliService.getresultFounded ?? false
  let _message=_checkfound ? null : 'No Updates.';
  return _message})  //true()/false
  //----------------------------------
  
  ///======================================ROW SYNCING=====Remote Controller====START
  //Init_set default query and setInterval of 1000(1sec)  
  //================SYNC DEBUGER=====2
  let _thisQuery = ref({})
  //==============Q2
  async function _this_Query (_queKey=null,_value=null,_qvalue=null){
      _thisQuery.value={}
      //-----------building the query
      _thisQuery.value[_queKey]=_value
      //------------async init and query setups
      //----sync the data
      _thisRowSync()
    
  return true
  }
  async function _thisRowSync(){
    return await saleitService.readFData(_thisQuery.value).then((res)=>{
                if(res){
                  _this_Rows.value=Object.assign([],res)
                  _this.value=Object.assign({},res[0])
                  //-----
                _this_clientforeign.value['saleitID']=_this.value['id']  //----------- contentIDs
                _this_clientQuery('id',_this.value['saleitID'])
                }__thisOpsStatus.value=false
                return true
              })
  }
  
  let _clientQuery = ref({})
  //==============Q1
  async function _this_clientQuery (){
    _clientQuery.value={}
     //-----------building the query
    _clientQuery.value['saleitID']=_this.value['id']  ?? false
    _clientQuery.value['store']='buy'
    //------------async init and query setups
    saleitcliService.set_syncQuery(_clientQuery.value)
    //----sync the data
    _this_clientSync()
  //--------redefine setting and params
    __this_foreignBoxIndex.value=null
    __this_foreignBoxOpsStatus.value=true
     //----setting default values
    _this_clientforeign.value=Object.assign({},_thisDefault_client.value)
    _this_clientforeign.value['orderID']=await _genOrderID()
    return true
  }
  async function _this_clientSync(){
    //------------switching view
    clearInterval(synccliInt)
    //-----------turning on the sync and start syncing
    saleitcliService.set_syncLock(false)
    saleitcliService.asyncDatas()
    //-------redefine timer of sync
    setTimeout(function(){
      clearInterval(synccliInt)
      synccliInt = setInterval(saleitcliService.asyncDatas, _contentingliveStatus.value)
    }, 5000);
  }
  ///======================================ROW SYNCING=====Remote Controller====END
  //-------default Row_sync
  _this_Query('userID',Objprops._profile.id)
  //-----------------------
  onUnmounted(async () => { 
    clearInterval(synccliInt)
    //-----------turning on the sync and start syncing
    saleitcliService.set_syncLock(false)
      return true
   });
  
  //===============================QUERY_BUILDIMG+++START
  //===============================QUERY_BUILDIMG+++END
   //-----searaching on/off
  
  //=======================================FILTERING OVER SyncRows (Main Table)
  //---------------fetching local data
  let totalPrice=ref(0)
  let storeTime=reactive(0)
  let storeItems=ref({'cart':0,'buy':0})
  let serveItems=ref({'Requesting':0,'Requested':0,'Queed':0,'Served':0})
  //-------------filtering and Searching Methods
  const _setDate = ref(false)
  let _orderDate=ref(null)
  let _serveStatus=reactive({'Requested':true,'Queed':true,'Served':true})
  let _storeStatus=reactive({'cart':true,'buy':true})
  //-----searaching on/off
  let _enableRowFilter=ref(false)
  //------------Setting up all the search attributes (is given to the table Data...)
  //just list out all possible comparison logics against every row datas
  const filter = computed(() => {
    return {
      search: Objprops.lytSearchRow,
      //------(Served Columns(Options))
      //Requesting:_serveStatus.Requesting,
      Requested:_serveStatus.Requested,
      Queed:_serveStatus.Queed,
      Served:_serveStatus.Served,
      //-------store Columns (options)
      cart:_storeStatus.cart,
      buy:_storeStatus.buy,
      //----------
      date:_orderDate.value
    }});
  
    //-------------the search Engine..
  function _thisFiltering(rows, terms) {
      if(_enableRowFilter.value){
        return rows
      }// rows contain the entire data
      //and terms is holding all the searching parameters && thier values(inc. search_box)
      //-------intialize Data
      totalPrice.value =0
      let totalPrice_= 0
      let storeItems_= {'cart':0,'buy':0}
      let serveItems_= {'Requesting':0,'Requested':0,'Queed':0,'Served':0}
      //-----------------
      //============Search Service_ONE(serach Box)
      let lowerSearch = terms.search ? terms.search.toLowerCase() : ""; //holding search bar...value
      //------Serialize search input_Value && iterate each row_against it.
      const filteredRows = rows.filter((row, i) => {
  
          let _group0 = true;
          //-----------------------Search field specific matching
          if (lowerSearch != "") {
            _group0 = false;
            let s1_values = Object.values(row);//row_all_values
  
            let s1_lower = s1_values.map((x) => {//iterate row_Values &&serialize each
              try {return x.toString().toLowerCase();
                } catch {return " ";  }
            });
  
            for (let val = 0; val < s1_lower.length; val++) { //matching row_values agains serch_term
              if (s1_lower[val].includes(lowerSearch)) {
                _group0 = true;
                break;
              }
            }
          }
          let _serveStatus = row.served ?? null//(gives the content served_value(:-Requested))
          _serveStatus =terms[_serveStatus] ?? true //(then we check if the Request_key of terms is true/false)
  
          let _storeStatus = row.store ?? null
          _storeStatus =terms[_storeStatus] ?? true 
  
          let _updateDate = row.updatedAt ?? null //compare dates
          // if(terms[date] ?? false){
          //     _updateDate = new Date(terms[date]) < new Date(_updateDate)
          // }else{_updateDate=false}
          //--------
          if(_group0 && _serveStatus  && _storeStatus && _updateDate){
            //Operating Over Filterd Rows            //-------compute Values
            storeItems_[row.store] ++ ?? false
            serveItems_[row.served] ++ ?? false
            totalPrice_ = totalPrice_ + parseFloat(row.price ?? 0)
            return true
          }
          //--------------End Comp.
          return false
  
      });
      totalPrice.value=totalPrice_
      storeItems.value=storeItems_
      serveItems.value=serveItems_
    //============Search Service_TWO(serach XY)
  
    //----------Founded Final Rows
    //filteredRows.length ? notifyit.simple("search found!") : ""  ////BAD ways of displaying...
    return filteredRows;
  }
  function __chooseDate(_val){
  }
  //=======================================FILTERING OVER SyncRows (Main Table)
   
  //---------------ACTIVE Operating on Main_Row
   //Operating without setting onplayrowItem ( directlly calling for effect) === active _operations
   let  _this_ActiveOperation = {
        _rating : async (_onplayrowIndex) =>{
           //build dynamic object
          _this.value = {'id':_this_Rows.value[_onplayrowIndex]['id'],
          '_itServiceRating':_this_Rows.value[_onplayrowIndex]['_itServiceRating']} //DeepCopy Handle Reactivity
          //create object operational command
          _this.value['onplayOps']='_itServiceRating'
          _this.value['onplaySubops'] = 'increase'   
          //---set--loading row operation
  
          return await Crud_this.updateData()
          .then(async (response) => {
            if (response) { _this_Rows.value[__thisIndex.value]['_itServiceRating']++  }
            return true
          }).catch((error) => { return false; });
        },
  
        _likes : async (_onplayrowIndex) =>{
           //build dynamic object
          _this.value = {'id':_this_Rows.value[_onplayrowIndex]['id']} //DeepCopy Handle Reactivity
          //create object operational command
          _this.value['onplayOps']='likes'
          _this.value['onplaySubops'] = 'increase'   
          //---set--loading row operation  
  
          return await Crud_this.updateData()
          .then(async (response) => {
            if (response) { _this_Rows.value[_onplayrowIndex]['likes']['like']++// =Object.assign({},response); 
            }
            return true
          }).catch((error) => { return false; });
        },
  
        _delRow : async (_onplayrowIndex,itemId) =>{
          //---set--loading row operation        
          return await Crud_this.deleteData(itemId)
          .then((response) => {
            if (response) {
              _this_Query('userID',Objprops._profile.id)
            } 
            return true;
          }).catch((error) => { return false; });
        },
        //------------special Operations
          _toCart:async (tocartID=null) =>{
          _this.value={}
          _this.value['clients']=Object.assign({},_thisDefault_client.value ?? {})//.push(_onplay); //or use below
          _this.value['clients']['store']= 'cart'
          _this.value['id']= tocartID
          //_this.value['userID']=Objprops._profile.id
  
          _this.value['onplayOps']='clients'    
          _this.value['onplaySubops'] = 'create'   
          //--------Set Options Paramers
          return await Crud_this.updateData()
          .then(async (response) => {
            if (response) { 
              //response['buy'] ='buy' //flage to show bought item
              _this_Rows.value[__thisIndex.value] = response
              //_this_Rows.value[__thisIndex.value]['buy']='cart'
              _orderBox.value.push(response['id'] ?? null)
              if(__this_foreignBoxOps.value == 'clients'){
                  //_this_clientRows.value.unshift(_this_foreign.value) //temporarlly filling
                  await _this_clientQuery()                  
              }
              timerDone(5000,'Succefully Submitted')
            } return false
        }).catch(async ()=>{
          timerError(5000,'Order Error.')
          return true })
    },
  }
  //-------Listening for SideBox Operations & Visualizing and Init_sideBox Operations
  async function _this_foreignActivator(_thisindex=null,_foreignIndex=null){
      //------------------------------- 
            if((__thisIndex.value == _thisindex) ){
              __thisIndex.value = null;//close sideBox
              //_fileAsPathIndex.value= null
              saleitcliService.set_syncLock(false) //enable syncing
              return true    
            }
            saleitcliService.set_syncLock(true) //stop syncing
            //--------assing current indexes
            __thisIndex.value = _thisindex ?? __thisIndex.value;
            __this_foreignBoxIndex.value = _foreignIndex;
            //  //------disable status
            // __thisOpsStatus.value=false
            // __this_foreignBoxOpsStatus.value=true
            // //--------assign current operations
            // __this_foreignBoxOps.value=Ops
            // __this_foreignBox.value= true
  
            await _resetBox(_this_Rows.value[_thisindex],null)
            await _resetfBox(null,'clients')
            //----------_this_owner
            //----------------
            await _this_clientQuery('saleitID',_this.value['id'])
            return true 
            //------------
    }
  //------operations OVer POP_Up_Box
  let _this_foreignOperation ={
        //--------------------------
    _add:async ()=>{ //default_value for sideBox
      __this_foreignBoxIndex.value = null;
        _this_clientforeign.value=Object.assign({},_thisDefault_client.value)
  
        return true
    },
      //---Enabling Array_Index_For Operations (Select_Index)_For ---Editing:Deleting--Applying--
    _selectArray:async(subOps=null,arrayIndex=null)=>{ // activate give array for operations of below options --
        if(arrayIndex == null){///use existed Index(but Operations differs)
          _this_clientforeign.value=Object.assign({},_thisDefault_client.value)
        }else{
          _this_clientforeign.value=Object.assign({},_this_clientRows.value[arrayIndex])
          //_this_foreignActivator(null,'selected',arrayIndex)        
        } 
        __this_foreignBoxsubOps.value=subOps
        __this_foreignBoxIndex.value=arrayIndex
      return true;
    },
    //-----------Operations on selected array
    _remove:async ()=>{
      //---set loads (main packages)
      _this.value ={'id':_this.value['id'],'clients':_this_clientforeign.value}
       //-----set parameters
      _this.value['onplayOps']='clients'
      _this.value['onplaySubops'] = 'delete'
  
      //--initiate seting Boxes
      return await Crud_this.updateData()
      .then(async (response) => {
        if (response) { 
              //----updating saleitcontent
              _this_Rows.value[__thisIndex.value] =response
              await _this_clientQuery() 
              timerDone(5000,'Succefully Removed');
            } 
            return true
            //return await _thisRowSync()//await _this_foreignActivator(null,__this_foreignBoxOps.value,null).then(()=>{return true })
      })
    },
    _updateArray:async (arrayIndex=null)=>{
                   //preparing main packages
         _this.value ={'id':_this.value['id'],'clients':_this_clientforeign.value}
          //---set main package parameters
          _this.value['onplayOps']='clients'
          _this.value['onplaySubops'] = 'update'   
          //--initiate seting Boxes
          return await Crud_this.updateData()
          .then(async (response) => {
            if (response) { 
              //----updating saleitcontent
              _this_Rows.value[__thisIndex.value] =response
              await _this_clientQuery()
              timerDone(5000,'Succefully Updated.')
            } 
            return true
          })
    },
    _submitArray:async ()=>{
            //preparing main packages
           _this.value ={'id':_this.value['id'],'clients':_this_clientforeign.value}
  
          _this.value['onplayOps']='clients'
          _this.value['onplaySubops'] = 'create'  
          //--initiate seting Boxes
          return await Crud_this.updateData()
          .then(async (response) => {
            if (response) { 
              //----updating saleitcontent
              _this_Rows.value[__thisIndex.value] =response
              //_this_clientRows.value.unshift(_this_clientforeign.value) //temporarlly filling
              //_this_clientRows.value=[]
              _orderBox.value.push(response['id'] ?? null)
                await _this_clientQuery()         
  
              timerDone(5000,'Succefully Submitted')
              return true
            } 
            }).catch(async ()=>{
            timerError(5000,'Order Error.')
            return true })
          },
    //------special Operations=========
    _toBuy:async (tocartID=null) =>{
          //---generate NewID
          _this.value['clients']=Object.assign({},_this_clientforeign.value)//.push(_onplay); //or use below
          _this.value['clients']['store']= 'buy'
          //----
  
          _this.value['onplayOps']='clients'    
          _this.value['onplaySubops'] = 'create'   
          //--------Set Options Paramers
          console.log(_this_clientforeign.value,'buying newwwwwwwwwwwwwwwwwwwwww')
          return await Crud_this.updateData()
          .then(async (response) => {
            if (response) {
              //response['buy'] ='buy' //flage to show bought item
              _this_Rows.value[__thisIndex.value] =response
              //_this_Rows.value[__thisIndex.value]['buy']='cart'
              _orderBox.value.push(response['id'] ?? null)
              await _this_clientQuery()                  
              timerDone(5000,'Succefully Submitted')
            } return false
        }).catch(async ()=>{
          timerError(5000,'Order Error.')
          return true })
    },
  }
  
  //--------------------CONTENTING (CREATING  && EDITING....)====ENDS
  async function _resetBox(_rows,onplayOps,_thisindex){
      _this.value = Object.assign({},_rows) //----assigning Onplay Row
      __thisOps.value =onplayOps
      __thisOpsStatus.value=false
      //__this_foreignBoxOps.value='clients'
      return true
    }
    async function _resetfBox(_rows,onplayOps,_foreignIndex){
      __this_foreignBox.value= true
      __this_foreignBoxOpsStatus.value=true
      //__this_foreignBoxOps.value='clients'
      __this_foreignBoxOpsStatus.value=false
      return true
    }
    //--------------------CONTENTING (CREATING  && EDITING....) ====STARTS
    let __thisBox_CDialog = computed(() => { return Objprops.lytCreatRow}) //Layout_listening for pop_creator
  watch(__thisBox_CDialog, async (cv, ov) => {
     await _resetBox(_thisDefault.value,'CreateRowItem',null)
     __thisBox.value  = true; //OPen the Box
     return true
    }); 
  async function __thisBox_UDialog(_playrowIndex){
      await _resetBox(_this_Rows.value[_playrowIndex],'UpdateRowItem',_playrowIndex)
      __thisBox.value  = true; //OPen the Box
      return true
    }
  //--------------------------------------METHODS & PROCESS
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
            console.log(response,'responssssssssssssss')
            if (response) {
             __thisBox.value=false;
              return router.push('/play/playservice')
            }
            return true; 
          }).catch((error) => {
             __thisOpsStatus.value=false;
             __thisBox.value=false;
             _fileAttributeName.value=null;
             return false;
            });
  }
  
  async function Update_this() { //UpdateRowItem User DAta with graphic to update or not
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
        _this.value['onplaySubops'] = 'update'
        //--------
        return await Crud_this.updateData()
          .then(async (response) => {
            if (response) { 
              _this_Rows.value[__thisIndex.value]=Object.assign({},response)
              __thisOpsStatus.value=false;
              __thisBox.value=false;
              _fileAttributeName.value=null;
            }__thisOpsStatus.value=false;
            return true; 
          }).catch((error) => {
             __thisOpsStatus.value=false;
             __thisBox.value=false;
             _fileAttributeName.value=null;
             return false;
            });
  }
  //----=========================================================================---DATA ---/// ---ROW----CRUD
  let createKey = "phone";
  let updateKey = "id";
  let delKey = "id";
  //ModalCrudOps
  const Crud_this = {
    createData: async function () {
      let objParam = {};
      objParam[createKey] = _this.value[createKey] ?? null;
      //-------Check for Param_Requirents
      try {
        if (objParam[createKey] == null) {return false; }
      } catch {return false; }
      //-----------Calling for Store Services  (_suburl, formData, objParam)
    return await _thisService.createData(_thisapiUrl,_this.value, objParam).then((response) => { 
          if (response[0]) {timerDone(5000,'Created.');return response[1];
          } else {timerError(5000,'Error Creating');return false;
          }})
        .catch(() => {timerError(5000,'Error Creating');return false;});
    },
    //---------------------------------------------------------
    updateData: async function () {
      let objParam = {};
      objParam[updateKey] = _this.value[updateKey] ?? undefined;
      //-------Check for Param_Requirents
      try {
        if (objParam[updateKey] == null) {return false; }
      } catch {return false; }
      //-----------Calling for Store Services
  
      return await _thisService.updateData(_thisapiUrl,_this.value, objParam).then((response) => { //returning as [false,response_obj] (arrays of status & object)
          if (response[0]) {timerDone(5000,'Updating...'); return response[1];
          } else {timerError(5000,'Error Reading');return false;}
        })
        .catch(() => {timerError(5000,'Error Creating');return false;});
    },
  
    readData: async function () {
      return await _thisService.readData(_thisapiUrl).then((response) => { //returning as ['data'][{},{},{data..}] (arrays of object)
        if (response) {timerDone(5000,'Updating..');return response;
          } else {timerError(5000,'Creating Error');return false;}
        })
        .catch(() => {timerError(5000,'Error Reading');return false;});
    },
  
    //---------------------------------------------------------------
    readFData: async function (objParam) {
      //-------Check for Param_Requirents
      try {
        if (Object.keys(objParam).length ==0) {
          timerError(5000,'Read Error');return false;
         }
      } catch {timerError(5000,'Read Error');return false; }
      //-----------Calling for Store Services
      return await _thisService.readFData(_thisapiUrl,objParam).then((response) => { //return true/false
          if (response) {timerDone(5000,'Data Found');return response;
          } else {timerError(5000,'Read Error');return false;}
        })
        .catch(() => {timerError(5000,'Read Error');return false;});
    },
    deleteData: async function (ItemId) {
      let objParam = {};
      objParam[delKey] = ItemId;
      //-----------------
      try {
        if (Object.keys(objParam).length == 0) {
          timerError(5000,'Read Error');return false;
        }
      } catch {timerError(5000,'Read Error');return false;}
      //-----------Calling for Store Services
      return await _thisService.deleteData(_thisapiUrl,objParam).then((response) => {
          if (response[0]) {timerDone(5000,'Deleted.');return response[1];
          } else {timerError(5000,'Read Error');return false;}
  
        }).catch(() => {timerError(5000,'Deleting Error');return false; });
    },
     //------------------filtering & searching for different Model
  };
  //------_clearLogs
  async function _clearLogs() {
    localStorage.clear()
    return router.push({path:'/'});
  }
    //-----------------------------------Loading...process...showOFF
    let loaditwellcome = ref(false);
    watch(loaditwellcome, (currentValue, oldValue) => loadit.wellcome());
  
  //-------------fileing and Datas
  //---------------------
  //-------------fileing and Datas
  //---------------------
  let _cameraBox =ref(false)
  //---
  let _fileAttributeName =ref(null) //does give _image_attribute has single/multiple values of images ( sends it as 'file':name_attr, or 'files':name_attr)
  let _fileSourceFoCam =ref(null)//is folder or camera file source
  //----------------------
  let _fileAsRaw =ref([]) //_file in Upload_Mode
  //---------------------
  let _fileAsSRC =ref([])//_file in Show_Mode (Non_String / As_SRC)
  let _fileAsSRCIndex =ref(0)///_fileAsSRC_Array_index
  //--------------------
  let _fileAsPath =ref(0)//_file in Show_Mode (As_String)  
  let _fileAsPathIndex =ref(null)//_fileAsPath_Array_index
  let _fileAsPathSlide=ref(false)
  let slideIndex=ref(0)
  let slideFullscreen=ref(true)
  //--------------------
  let _fileAsSRCOps = ref(false) //tis could for deleting/
  //let _fileAsPathOps = ref(false) //this is for selecting only
  async function _resetFileSource(){
    _fileAttributeName.value=null
  
    _fileSourceFoCam.value=null  
  
    _cameraBox.value=false
  
    _fileAsSRC.value = []
    _fileAsRaw.value=[]
  
    _fileAsSRCIndex.value = 0///_fileAsSRC_Array_index
     _fileAsSRCOps.value = false
  return true
  }
  
  //let _cov=document.getElementById('_fileAsSRC') 
  async function _fileSourceFolder(e,_attributeName) {
        // Check if file is selected
        let _isthereFiles = e.target.files == null || e.target.files.length == 0 ? false : e.target.files;
        ///--------------
        //_file.value[_attributeName]=[]
        if (_isthereFiles) {
          await _resetFileSource()
        //---------reset _file_setting(params)   
         _fileAttributeName.value=_attributeName
         //--------
         _fileSourceFoCam.value='folder'
        ////////console.log(_file.value[_attributeName],'foldering0000')      
        for(let i = 0; i < _isthereFiles.length; i++){
          _fileAsRaw.value.push(_isthereFiles[i])
          _fileAsSRC.value.push(URL.createObjectURL(_isthereFiles[i])) 
        }
        }
      }
  
  ///-----------------------File Operations and setting  UP(Folder) vs Down(Camera)
  async function _fileAsSRCOpsCall(SRCIndex){
    //__thisIndex.value=index
    if(_fileAsSRCOps.value ?? false){ //if delete operations is checked(or calling for selecting)
      await _SRCDelOps(SRCIndex)
    }else{_fileAsSRCIndex.value=SRCIndex
    }
    return true
  }
  
  async function _SRCDelOps(SRCIndex){
    _fileAsSRC.value.splice(SRCIndex,1) //remove from display
    _fileAsRaw.value.splice(SRCIndex,1)//remove from file_tobe uploaded
    return true
  }
  
   ///_fileAsPathSlide
  async function _fileAsPathOpsCall(StrIndex,index = null){ //calling for selections
     __thisIndex.value=index
     //__this_foreignOps.value=null
    _fileAsPathIndex.value=StrIndex
    return true
  }
  
  async function _fileAsPathSlideCall(_thisindex = null){ //calling for selections
     __thisIndex.value=_thisindex
      //----------SET_ROW
      let _onplayRI = {}
      _onplayRI = _this_Rows.value[_thisindex]//Object.assign({},_this_Rows.value[_thisindex])
      _this.value = Object.assign({},_onplayRI) //DeepCopy Handle Reactivity
      //---------------
     _fileAsPathSlide.value=true
    return true
  }
  
  //-------------------------------------------
  let _listNavDevices =ref({})
  
  let _listCameraSource =ref([])
  let _listMicSource =ref([])
  
  let _selectedCameraById =ref(false)
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
  
  //---------------------------------------------
  class _cameraDevice{
    //_navigateDevice();
  
      constructor() { //_init_onPlayNavigator class
          //////console.error("Init.. Device Naviator");
          try{      // Check if geolocation is supported by the browser
  
          }catch{    }   
        }
      async _navigateDevice  ()  {  //navigate_phone_function
                ////////console.error("Navigating mediaDevice.");
                if (Objprops._onPlayNavMedia ?? false) {
                      _listNavDevices.value['getUserMedia'] = Objprops._onPlayNavMedia.getUserMedia ?? {}      
                      for(let mediaDevice of ['getUserMedia','webkitGetUserMedia','mozGetUserMedia','msGetUserMedia']){
                          var _doesCamera = navigator[mediaDevice] ?? false
                          if(_doesCamera){
                          _listNavDevices.value[mediaDevice] = _doesCamera
                          }
                      } //_onPlayMediaDevice= _onPlayNavMedia.value.mediaDevices['getUserMedia']
                      //////console.error("Navigating mediaDevice.00000000",_listNavDevices.value);
                  
                    } else { // Geolocation is not supported by the browser
                              //////console.error("MediaDevice is not supported by this browser.");
                              }    
              return true   
            }
  
          async _enumNavigateDevice  (){
              try {
              return await Objprops._onPlayNavMedia.enumerateDevices().then((_camDevices)=>{
                    _listCameraSource.value = []
                    for(let index in _camDevices){
                      let _camDevice = _camDevices[index]
                      ////////console.log('graphic device',_camDevice)
                      if (_camDevice.kind === 'videoinput') {
                          _selectedCameraById.value = _camDevice['deviceId'] //default camera_id
                          _listCameraSource.value.push(_camDevice) //listing all available_camera media_device
                      } 
                      else{//for audio input
                        _selectedMicById.value=_camDevice['deviceId']  //default mic_id
                        _listMicSource.value.push(_camDevice) //listing all available_mic media_device
                      }
                    }
                  return true
                  })
                } catch (error) {
                //////console.log('Error No Camera Detected...Know this');
              }  
            return true
      }
      //-----------------------------------------
      async _openCamera (_attributeName=''){
            if (_listNavDevices.value['getUserMedia'] ?? false) {  //in priority use ( this device_ for media_sources)
                await _enumNavigateDevice()
                await _resetFileSource()
                //------------
                _cameraBox.value=true
                //-------
                _fileAttributeName.value=_attributeName
                //------------------
                _fileSourceFoCam.value='camera'   
                //--------
                if(_selectedCameraById.value ?? false){//if 'user'
                    _liveFeedRawVidAttribute.value['deviceId'] = { exact: _selectedCameraById.value };
                  _liveFeedRawVidAttribute.value['facingMode'] = _selectedCameraByface.value ? 'user':'environment'
                }
                else{
                  _liveFeedRawVidAttribute.value['facingMode']=_selectedCameraByface.value ? 'user':'environment' 
                }
              //booting the feed ( for streaming...)
              _liveFeedRaw.value = await Objprops._onPlayNavMedia.getUserMedia({video:_liveFeedRawVidAttribute.value,audio:_liveFeedRawAudAttribute.value})                                                             
              //initialize the video streaming                                                                                                  
              _liveFeedRawStreaming.value['srcObject']= _liveFeedRaw.value
              //_liveFeedRawStreaming.value.play()
              _liveFeedRawStreaming.value.onloadedmetadata = () => {  _liveFeedRawStreaming.value.play(); };
            }
          return true;
      }
      async _stopCamera (){
            //----shutdown camera RawFeed_& displaying
            await _resetFileSource()
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
            _liveFeedRawStreaming.value.src=null
            //------
            return true
      }
  
      async _operateDevice  (cmd) {
              if(cmd == 'pause'){ _liveFeedRawStreaming.value.pause()    }
              else if(cmd =='play'){_liveFeedRawStreaming.value.play()   }
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
      async _screenShoot (_reset=false){
                if(_reset ){
                    _fileAsRaw.value=[];
                    _fileAsSRC.value=[]; //viewable content
                  return true
                }
                //_save screenshoots _for_canvas_display(if needed ? )
                _liveFeedSRCStreaming.value= _liveFeedSRC.value.getContext('2d');
                _liveFeedSRCStreaming.value.drawImage(_liveFeedRawStreaming.value, 0,0, _liveFeedSRC.value.width, _liveFeedSRC.value.height);
                try{     //_save screenshoots _for_SRC_display ( being used method__now!) as [PNG]____as primary choice
                  _fileAsSRC.value.push( _liveFeedSRC.value.toDataURL('image/png')); //_save as jpeg
                  //_save screeshots _As_Raw_for_uploading
                _liveFeedSRC.value.toBlob((blob) => {
                    _fileAsRaw.value.push( new File([blob], "fileName.png"+String(new Date()), { type: "image/png" },0.9))        
                    }, 'image/png')
                }catch{    //_save screenshoots _for_SRC_display ( being used method__now!) as [JPEG]__if Not
                  _fileAsSRC.value.push( _liveFeedSRC.value.toDataURL('image/jpeg')); //or _save as jpeg
                  //_save screeshots _As_Raw_for_uploading
                _liveFeedSRC.value.toBlob((blob) => {
                  _fileAsRaw.value.push( new File([blob], "fileName.jpeg"+String(new Date()), { type: "image/jpeg" },0.9))        
                    }, 'image/jpeg')
                }
            return true
      }
      //--------------setting camera_view & Mic
      async _setCameraParam (cameraID='',_facetoggler=false){  //switching camera
        _selectedCameraByface.value=_facetoggler     
        _selectedCameraById.value =cameraID      
        return await _openCamera()    
      }
  
      async _setMicParam (audioID=''){
        _selectedMicById.value = _listMicSource.value['deviceId'][audioID]
        return await _openCamera()
      }
  }
  var _cameraInstance = new _cameraDevice()
  
  _cameraInstance._navigateDevice()
  </script>
    
    <style>
      
      
      /*=====================  Fronted_Glass / Blur Styles as OverLay Background... */

      @keyframes myfirst /* Firefox */{
                 50% {
                         opacity: 50;
                     }
      }
      </style>