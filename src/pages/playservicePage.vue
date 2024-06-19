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
<dialogOne :isOpen="confirmObj" @emitClick0="confirmObj = $event">
    <confirmButton @confirmButton="confirmObj"
    :header=confirmMessage
    title="Yes" textcolor="black" background="green"
    title2="No" textcolor2="green" background2="red"/>
</dialogOne>

<!-----DEbug ( Action ) Informations-->
<template v-if="DoneMessage.length ?? false">
<debugCard :messages="DoneMessage ?? [] " @closeButton="DoneMessage =[]" />
</template>
<template v-if="WarnthisMessage.length ?? false">
<debugCard :messages="WarnthisMessage ?? [{}]" />
</template>


<!-----Status ( Store/Loading ) Informations-->
<template v-if="status_WarnthisMessage.length ?? false">
<statusCard :messages="status_WarnthisMessage ?? [{}]" />
</template>
<template v-if="status_KnowthisMessage.length ?? false">
<statusCard :messages="status_KnowthisMessage ?? [{}]" />
</template>
<template v-if="status_DoneMessage.length ?? false">
<statusCard :messages="status_DoneMessage ?? [{}]" />
</template>


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
  

{{ _this_clientColumns}} {{ columns}}
      </template>
      
  
<script setup>
//_____________________________________________Modules Definitions
//-------------------------------------------------------------Importing System Modules
import { ref,computed,watch,onUnmounted, onMounted,defineComponent } from "vue";
import {useQuasar, useMeta } from "quasar";
//import print from 'print-js';
import { useRouter } from "vue-router";
//import { storeToRefs } from "pinia";
import { saleitStore } from "stores/dataStores/saleitStore"; //saleit Store ( Main Store)
import { saleclientStore } from "stores/dataStores/saleclientStore"; //saleit Store ( Main Store)
import { salechatStore } from "stores/dataStores/salechatStore"; //saleit Store ( Main Store)
import { thisStore } from "stores/dataStores/thisStore"; //saleit Store ( Main Store)
import { genapiStore } from "src/stores/jstStores/genapiStore";

import { saleitSchema } from "src/composables/schemas/saleitSchemas";
import { saleitClientSchema } from "src/composables/schemas/saleitSchemas";
import { saleChatSchema } from "src/composables/schemas/chatSchemas";
// import { saleitSchema } from "src/composables/schemas/saleitSchemas";
import { _permission } from "src/composables/schemas/profileSchemas"; //acctype//userRole Schema

// import  {_isnull,_isempty,_isequ,_isgte,_islte,_isbtn} from "src/composables/validators" 

import statusCard from "src/components/statusCards.vue"

import buyButton from "src/components/buttons/buyButton.vue"
import closeButton from "src/components/buttons/closeButton.vue"

import confirmButton from "src/components/buttons/confirmButton.vue"
let confirmObj = ref(null);
let confirmMessage =ref('Are You Sure ?')

import dialogOne from "src/components/dialogs/dialogOne.vue"
const status_thisDetail = ref(null);


import useThisMixin from "src/composables/thisMixin"
var { 
_this_Rows,
_this_Details,
    _this_Query,
    _this_RowsStatus,
    //-----------//-- returning values
    _thisDefault,
    _this,
    //----------//-- settings
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
} = useThisMixin()

import debugCard from "src/components/debugCards.vue"
import useDebugMixin from "src/composables/debugMixin"
const { 
Loading,
    DoneMessage,
    KnowthisMessage,
    WarnthisMessage,
    //----------returning values
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
let {count,
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

    modal_iss,
    //------preparing the main default and table_design
    _model_Defaulting,

    //------preparing the foreign default and table_design
    modal_Columns_,
    _modal_Defaulting_,
    visible_clientColumns,
    
} = useDefaulMixin();

import usefileMixin from "src/composables/fileserviceMixin"
var { 
    _onPlayNavMedia,
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
    // Reset_this_foreign,
} = usefileMixin()
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

const clientService = saleclientStore();
const chatService = salechatStore();

const genapsaleitContentOps = genapiStore(); //import { genapiStore } from "src/stores/jstStores/genapiStore";
//-------
//////////////////////////////////////////--------------Axios Wrapper UUUUUUPPPPPPPPPPPP
//-------------USER PROFILE_Variables..
let Objprops = defineProps({
  //----General Informations
  _profile: { type: Object, default: () => ({}) }, //user Datas all there is...
  //----User Credentials and Unique ID.
  //-----------access Parameters
  _iss: { type: Object, default: () => ({}) },  ///Customized(is?)_ACCESS_Type of Per/User(for_all Models)..as 'saleit':[isUpgrade,isClient] Form
  _acctype: { type: Object, default: () => {}},   ///RAW_ACCESS_Type of Per/User (for_all Models)..as 'saleit':[true,'/plat','',[]]
  //---------
  _issModal: { type: Object, default: () => ({}) }, //(Every Models _Schema for ACCEss Type)
  //-------------------(layout tunnel for command datas(signal))
  lytCreatRow : { type: Boolean, default: false },
  //--------Search Button Signal  
  lytSearchRow : { type: String, default: '' },
  _onPlayNavMedia2 : { type: String, default: '' },
  //----------
  _pageSetting : { type: Object, default: () => ({}) }, 
});

Objprops_.value =Objprops ?? false
_onPlayNavMedia.value = Objprops._onPlayNavMedia2

//==============================================------------------------------------
let enableflscreen =ref(true)
//--------------
//==========================================DEfaulting && Scheam Generations====Start
//========<><><><><><==================Create Default Schemas
//---foreignKeyed Defaulting (Scheam)==== PreDefined Models
_thisModel.value = "saleit"; // the Vue_Page_DataModel (Listing Collection Name)
const _thisapiUrl='/saleitapi/saleit'
//==========-----------Generating====The Schematic Models
//---main Defaulting(Schema)------takes the model require table_view && filtering...
let columns = ref([]); //Actual Table_Columns ++Descriptions
let _this_clientColumns=ref([])
let _this_chatColumns=ref([])
//Columns to be Redefined
let _thisSchema=saleitSchema
_this_Schema.value = saleitSchema
let _this_clientSchema=saleitClientSchema
let _this_chatSchema=saleChatSchema

//----------models
let _thisModels = []
// let _this_clientModels = []
let _this_chatModels = []
//------column invisiblity on table_
//columns_filter()-------- which to displayOn REgisterations form
let lockedColumns = ref([ "userID","userName"]); //are blacklist of columns tobe not shown during the Registerations..form submitting
//let tableZooming =ref(1)
//------column invisiblity on table_
// visibleColumns = ref([]); //Hold List of In
invisibleColumns.value = [
//"financeStatus",
]; //defualt hidden columns
if ($q.screen.lt.md) {
//invisibleColumns.push("storeStatus");
}
if ($q.screen.lt.lg) {
//invisibleColumns.push("storeStatus");
}
//==================-----------Generating====The Schematic Models
//using above schema_models,schema build default values by the logedUser Roles (permission level)
let gen_modal_iss = computed(() => { return modal_iss() } )
//-------------Syncing Columns
columns = computed(() => { 
    //if (Object.values(Objprops).length === 0) { //is User_Fully_Authenticated &&  or Return Null_Columns
    //  return [{}];
    //} else {

      let _tableColumn = []; //HOLDING_  all the ---"Columns"--- of the Data_model ( TOTAL Columns)
      let _visibleColsName = [];  ////--HOLDING_ all the ---"Visible" Columns"---- of the Data_model ( TOTAL Columns)

      //-------<<<<>>>>-------Preparing this_model role_schemas
      let rolesWall = gen_modal_iss.value?.['role'] ?? false
      let modelRole = gen_modal_iss.value._isRoleof ?? []

      for (let schemaColumn in _thisSchema) {
        //----------------loging all columns_ as table columns_format
        let _col = { name: schemaColumn,schema: _thisSchema[schemaColumn], }; //the q-table format of Column Definitions... && Hold Every Columns
        _tableColumn.push(_col); 
        //----------------loging all columns name as normal list format
        _allColumnName(schemaColumn); 
        //---------------loging Visible Columns list(on table)
        invisibleColumns.value.includes(schemaColumn) ? "" : _visibleColsName.push(schemaColumn);
        //----
        //----------------loging Role Based  && whitelisted Columns-Start
        if (schemaColumn === "extraColumn" || lockedColumns.value.includes(schemaColumn)) { //if columns is locked(for not display or analysis).. passit.
          continue;
        } else {
          try{ 
                if(modelRole.includes('***')){  ///if user_ hass full access
                  _rolesColumn(_col);
                }
                else if(modelRole.includes('**')){ //use has semi_full access
                  _rolesColumn(_col);
                  }
                else if(modelRole.includes('*')){ //user has specified accesss with 1strickes ===['clientFlag','*'] 
                    if(rolesWall['enum'].includes(schemaColumn)){ //excludes specifed columns
                      // continue
                      _rolesColumn(_col)
                    }else{ _rolesColumn(_col);} //gives all other thatn specifiec columns
                  }
                else {
                    if(modelRole.includes(schemaColumn)){ // ===['clientFlag',"StatusFlag"] 
                      _rolesColumn(_col); 
                    }
                  }
          }catch{}                 
        }
        //------------------------roleBase Columns-End
      }
      // _model_Defaulting();
      _setDefaults()
      visibleColumn(_visibleColsName);
       //
      // _initialModal_defaults()
      return _tableColumn;
    //}
  });
  async function _setDefaults(){
    // _this_clientModels = ['phone',"userName","geolocation",'location','phoneCode'] //
    _thisModels = ['phone',"userName","geolocation",'location','userID','phoneCode'] //
    _thisDefault.value = await _model_Defaulting(_thisModels)
    _thisDefault.value['quantity']=1
    _thisDefault.value['userID']=Objprops._profile.id
    //------==== building columns of thisMoel
    return true
  }

  _this_clientColumns = computed( ()=>{
    let _col = columns.value ?? ''  //create the reactive behaviourse of this computing
    //-------<<<<>>>>-------Preparing this_model role_schemas
    // let _defaulting_client =  modal_Columns_(_this_clientSchema)
    let _schema = _this_clientSchema
    let _tableColumn = []; //HOLDING_  all the ---"Columns"--- of the Data_model ( TOTAL Columns)
        let _visibleColsName = [];  ////--HOLDING_ all the ---"Visible" Columns"---- of the Data_model ( TOTAL Columns)
        for (let schemaColumn in _schema) {
          //----------------loging all _this_clientColumns_ as table _this_clientColumns_format
          let _col = { name: schemaColumn,schema: _schema[schemaColumn], }; //the q-table format of Column Definitions... && Hold Every Columns
          _tableColumn.push(_col); 
          _visibleColsName.push(schemaColumn);
        }

    _clientDefaults(_visibleColsName)
    return _tableColumn
  })

async function _clientDefaults(_this_clientModels){
  visible_clientColumns.value.push('store')
_thisDefault_client.value = await _modal_Defaulting_(_this_clientModels)
_thisDefault_client.value['orderID']=await _genOrderID()
_thisDefault_client.value['userID']=Objprops._profile.id
_thisDefault_client.value['quantity']=1
_thisDefault_client.value['served']='Requesting'
_thisDefault_client.value['price']=0
//-------------------------(Defined Schema-1)
return true
}
//==========================================DEfaulting && Scheam Generations====End
///======
const _genOrderID = async()=>{
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  var result = ''
  for (let i = 0; i < 7; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result 
}

//---------form Validation_Rules
async function _valRules(val){
  let _colRules ={'usage':[null,''],'catagory':[null,'']}
  let _onplayCol =''//_colRules[column] ?? false
  let _val=false
  for(let [col,inx] in val){
    _val =_colRules[inx].includes(col)
     if(_val){
      return 'Please Complete Form'
     }
  }
  return _val
}

// const _null = ['',null,undefined,0]


// let _isnull = computed ((_value)=> _null.includes(_value))
let _isempty = computed ( (_value) => !!_value || 'Field is required')

let _isequ = async (_value,_value2)=> _value == _value2
let _isgte = async (_value,bottom)=>((_value >= bottom) || 'Please set value to maximum 60')
let _islte = async (_value,top)=>(_value <= top) || 'Please set value to maximum 60'
let _isbtn = async (_value,bottom,top)=>(_value >= bottom && val <= top) || 'Please set value to maximum 60'

//===============================================-----------------------------------
//-----------------------DATAs ROWs--------------
let _pageSettings=ref({})
_pageSettings.value['tableView'] = 'main'
_pageSettings.value['currency'] = 'Birr'
// Objprops._pageSettings['e']='r'
watch(Objprops._pageSetting,(_nowValue, ov) => {
  _pageSettings.value =Object.assign(_pageSettings.value,_nowValue)
  return true
})
let _contentingliveStatus=ref(20000)
//-----------------------Secondary DATAs ROWs--------------
//--------------------------
let _this_chatRows = ref([]); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
let _thisDefault_chat=ref({})
let _this_chatforeign = ref({}); //the selected row_actual_Data..as object

let _this_clientRows = ref([]); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
let _thisDefault_client=ref({})
let _this_clientforeign = ref({}); //the selected row_actual_Data..as object
//===============================================-----------------------------------------

//-------
let _is_thisOwner=ref(false)
let _is_clientOwner=ref(false)
let _is_chatOwner=ref(false)
//--------------------CONTENTING (CREATING  && EDITING....) ====STARTS
let _is_this_open =ref()
let _is_this_netPrice =ref()
//--------------------------------ROWS_SCHEMATIC FORMS 
let _n =0
const pageSize = 50
//const lastPage = Math.ceil(allRows.length / pageSize)
let pagination= ref({ rowsPerPage: 200 })
//-------------SyncDEBUGGER========1
_this_Rows = computed(() => { //Updating is comming
return _this_RowsCompute(saleitService.getDatas)
});
function _this_RowsCompute(_Datas) {
pagination.value.rowsPerPage=10
return _Datas
}
//-------------SyncDEBUGGER========2
let watch_Rows=ref(null) 
watch_Rows=computed(()=>{ //computer got problem with return value is not in applications
return saleitService.getstatus_Rows}) 
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
//----------------------------------

let syncInt=''
let synccliInt=''
//------------------Quering and SE_settings
//--------------clientQuery
//Init_set default query and setInterval of 1000(1sec)  
const saleCatagory = {"Households":'10',"Clothing":"25",
"Food":"35",
"Electronics":'50',"Vehicles":'75',"Land/House":'100',"Others":'1'}
const saleUsage = {"New":'100',"Used":'75',"Others":'1'}

var _this_Query_Meta={} //_trend:'', catagory:'',usage:'New',content:''

_this_Query.value={} //_trend:'', catagory:'',usage:'New',content:''
async function _thisRowSync(){ //Queries for LiveSyncing of Rows_One

  return await clientService.readFData(_clientQuery.value).then((res)=>{
            if(res.status){
              _this_clientRows.value=res.data //Object.assign(_this_clientRows.value,res)
            }__this_foreignBoxOpsStatus.value=false
            return true
          })
    return true
}

//--------------------2ndary
//-------instead of syncing secondary_data (use function)
let _clientQuery = ref({})
async function _this_clientSync(){
return await clientService.readFData(_clientQuery.value).then((res)=>{
            if(res.status){
              _this_clientRows.value=res.data //Object.assign(_this_clientRows.value,res)
            }__this_foreignBoxOpsStatus.value=false
            return true
          })
}
//--------------------3ndary
let _chatQuery = ref({})
async function _this_chatSync(){
return await chatService.readFData(_chatQuery.value).then((res)=>{
            if(res.status){
              _this_chatRows.value=res.data//Object.assign(_this_chatRows.value,res)
            }__this_foreignBoxOpsStatus.value=false
            return true
          })
}

//===============================QUERY_BUILDIMG+++START
//==============Q1
async function this_Query (_queKey=null,_value=null){
      //-----------Reseting Rows SEtting
      _this_Rows.value=[] 
      _this_Query.value={}
      // __this_foreignBoxsubOps.value = false
      //--------------------Building Queries
      _this_Query.value['id']=Objprops._profile.id

      // await saleitService.set_syncQuery(_this_Query.value)
      //----------------Fetching Queried Rows
      _thisRowSync()
      //-------------------- Preparing Default Rows ( New Row Skeltons)
      // ?

      return true
}

//==============Q1
async function _this_clientQuery (){
  _this_clientRows.value=[] 
  //-------------------- Reseting Rows
  await Reset_this_foreign('clients',null)
//---------Query Building
//Content Owner is on client_link(show all)
if(!_is_clientOwner.value){ 
            _clientQuery.value['userID']=Objprops._profile.id
          }

//-------------------- Fetching Queried Rows
_this_clientSync()
//-------------------- Preparing Default Rows ( New Row Skeltons)
return true
}

//==============Q3
async function _this_chatQuery (){
  //-----------------Reseting Rows
_this_clientRows.value=[] 
//-------------------- Reseting Rows
await Reset_this_foreign('comments',null)
//-----------Building Queries
if(!_is_chatOwner.value){ 
  _chatQuery.value['userID']=Objprops._profile.id
  }
_chatQuery.value['saleitID']=_this.value['id']
//-----------------Fetching Queried Rows
_this_chatSync()
 //----------------Preparing Default Rows (New Row Skelton)
return true
}

//==============================================

///-------------- _this_chatRows --
clearInterval(syncInt);
clientService.set_syncLock(true)
chatService.set_syncLock(true)
saleitService.set_syncLock(true)
//_this_clientSync()
//-----------------------
this_Query()

onUnmounted(async () => { 
  // Clear the interval when the component is destroyed to avoid memory leaks
  clearInterval(syncInt);
  clientService.set_syncLock(true)
  saleitService.set_syncLock(true)
  return true
});

//-----searaching on/off
let _enableRowFilter=ref(false)
//------------Setting up all the search attributes
const filter = computed(() => {
return {
  search: Objprops.lytSearchRow,
}});

//-------------the search Engine..
function _thisFiltering(rows, terms) {
  if(_enableRowFilter.value && rows.length){
    return rows
  }// rows contain the entire data

  //============Search Service_ONE(serach Box)
  let lowerSearch = terms.search ? terms.search.toLowerCase() : ""; //holding search bar...value
  //------Serialize search input_Value && iterate each row_against it.
  const filteredRows = rows.filter((row, i) => {

      let _group0 = true;
      //let _group2 = false;

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
      //--------------- filtering tech
      if(_group0){
        return true
      }
      //--------------------
      return false
  });
return filteredRows;
}
//-----POP_UP Box Controller Room
//_this_foreignOperation
//---------------------Byuers and related Data Schema
let _orderStep =ref(0)
///--------Order_Intiations Stage
let _orderDebuger=ref('Orders List..')
let _orderIntiatedID=ref('')

//---------Order_Confirmations Stage
let _orderConfirmDebuger=ref(false)
let _orderPayment=ref(false)
let _orderBox=ref([])

//---------------ACTIVE Operating on Row
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
        if (response) {
          timerDone(5000,_createTitle[1],'Succefully Updated')
          _this_Rows.value[__thisIndex.value]['_itServiceRating']++  
        }else{
          timerError(5000,_createTitle[1],'Succefully Updated')
        }
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
        if (response) { 
          timerDone(5000,_createTitle[1],'Succefully Updated')
          _this_Rows.value[_onplayrowIndex]['likes']['like']++// =Object.assign({},response); 
        }else{
          timerDone(5000,_createTitle[1],'Succefully Updated')
        }
        return true
      }).catch((error) => { return false; });
    },

    _delRow : async (confirm=null,_onplayrowIndex,itemId) =>{
      //--------------
      if(confirm ==null){//First (Null) Event -- Data Assigning && set confirmObj
        //-----------------------------
        _this.value = {'id':itemId} 
        //--------------
        confirmObj.value=_this_ActiveOperation._delRow;
        // console.log('eeeeeeeeeeeeee',confirmObj.value)
        return false;            
      }
      else{
        confirmObj.value=null;
        if(!confirm){return false} //Third (True) Event -- Go ahead
      }
      //--------waite for confirmation  
      return await Crud_this.deleteData()
      .then((response) => {
        if (response) {
          this_Query('userID',Objprops._profile.id)
        } 
        return true;
      }).catch((error) => { return false; });
    },
    //------------special Operations
      _toCart:async (tocartID=null) =>{

        _this.value={'id':tocartID,'clients':Object.assign({},_thisDefault_client.value ?? {})}//.push(_onplay); //or use below
        _this.value['clients']['store']= 'cart'

        _this.value['onplayOps']='clients'
        _this.value['onplaySubops'] = 'create'  

        let _clientResp = await clientService.createData(_this.value,{}) //[0],[1]
        // console.log('creating client',_clientResp,_this.value,_this_clientforeign.value)
        if(!_clientResp.status){timerError(500,'Error Creating','');return false}
        
        timerDone(5000,'Added','')
        _orderBox.value.push(_clientResp.data['id'] ?? null)
        await _this_clientQuery() 
        //----updating saleitcontent
        _this_Rows.value[__thisIndex.value] =_clientResp.data
        return true
    },

    //------------special Operations

}

//-------Listening for SideBox Operations & Visualizing
async function _this_chatActivator(_thisindex=null,_foreignIndex=null){

      let _existed_this = (__thisIndex.value == _thisindex)
      //------==if Selected is Existed...Close it.
      if((_thisindex ==null) || (_existed_this && __this_foreignBoxOps.value == 'comments')){ //reset_default if same_index and Ops occured
            await Reset_this_foreign('comments',null)
            await Reset_this(null,null);
            saleitService.set_syncLock(false); //and Continue Syncing
          return true     
        } 
        await Reset_this(null,_thisindex)
        saleitService.set_syncLock(true)
        //----== passing New Selections

        //---Hold Updating Row(_this) && Reset it
        // __thisIndex.value = _thisindex ;
        _is_chatOwner.value= _this.value['userID'] == Objprops._profile.id


        await _this_chatQuery()

        return true 
}
//-------Listening for SideBox Operations & Visualizing
async function _this_clientActivator(_thisindex=null,_foreignIndex=null){
      let _existed_this =(__thisIndex.value == _thisindex) 
      __this_foreignBoxsubOps.value ='view'

      //------==if Selected is Existed...Close it.
        if((_thisindex ==null) || (_existed_this && __this_foreignBoxOps.value == 'clients')){ //reset_default if same_index and Ops occured
          await Reset_this(null,null);
          await Reset_this_foreign('clients',null)
            saleitService.set_syncLock(false); //and Continue Syncing
          return true    
        } 
      await Reset_this(null,_thisindex)

        saleitService.set_syncLock(true)
        
        //----== passing New Selections
        // __thisIndex.value = _thisindex;
        _is_clientOwner.value= _this.value['userID'] == Objprops._profile.id
        _is_this_open.value= _this.value['quantity'] && _this.value['price']
        _is_this_netPrice.value = parseInt(_this.value['discount'] ? _this.value['discount'] : _this.value['price'])
        // == Objprops._profile.id
        //------foreign Operations
        //----------------------------
         _this_clientQuery()
        return true 
}
  //-------Listening for SideBox Operations & Visualizing
async function _this_clientDetailActivator(_thisindex=null,_foreignIndex=null){
      let _existed_this =(__thisIndex.value == _thisindex)
      __this_foreignBoxsubOps.value ='view'

      //------==if Selected is Existed...Close it.
        if((_thisindex ==null) || (_existed_this && __this_foreignBoxOps.value == 'clients')){ //reset_default if same_index and Ops occured
          await Reset_this(null,null);
          await Reset_this_foreign('clients',null)
            saleitService.set_syncLock(false); //and Continue Syncing
          return true    
        } 
      await Reset_this(null,_thisindex)

        saleitService.set_syncLock(true)
        
        //----== passing New Selections
        // __thisIndex.value = _thisindex;
        _is_clientOwner.value= _this.value['userID'] == Objprops._profile.id
        _is_this_open.value= _this.value['quantity'] && _this.value['price']
        _is_this_netPrice.value = parseInt(_this.value['discount'] ? _this.value['discount'] : _this.value['price'])

        //------foreign Operations
        //----------------------------
        //  _this_clientQuery()

        status_thisDetail.value=true
        _this_Details.value=null
        await saleitService.readFData({'id':_this.value['id']}).then((res)=>{if(res)_this_Details.value=res})
        await Reset_this_foreign('clients',null)
        return true 
} 
//------operations OVer POP_Up_Box
let _this_foreignOperation ={
    //--------------------------
_add:async ()=>{ //default_value for sideBox
  __this_foreignBoxIndex.value = null;
  if(__this_foreignBoxOps.value == 'clients'){
      _this_clientforeign.value=Object.assign({},_thisDefault_client.value)
    }else{
      _this_chatforeign.value=Object.assign({},_thisDefault_chat.value)
    }
    return true
},
  //---Enabling Array_Index_For Operations (Select_Index)_For ---Editing:Deleting--Applying--
_select_foreignIndex:async(_foreignIndex=null,foreignSuboperation=null)=>{ // activate give array for operations of below options --
  __this_foreignBoxIndex.value = (__this_foreignBoxIndex.value == _foreignIndex) ? null : _foreignIndex
  //  if(foreignSuboperation){ __this_foreignBoxsubOps.value =foreignSuboperation;return true}
  __this_foreignBoxsubOps.value =foreignSuboperation;

    if(__this_foreignBoxOps.value == 'clients'){
      Reset_this_foreign('clients',__this_foreignBoxIndex.value)
      _is_clientOwner.value= _this_clientforeign.value['userID'] == Objprops._profile.id
    }else{
      Reset_this_foreign('comments',__this_foreignBoxIndex.value)
      _is_chatOwner.value= _this_chatforeign.value['userID'] == Objprops._profile.id
    }
    //----Defaulting foreign Links for main
  return true;
},

//-----------Operations on selected array
_remove:async ()=>{
  if(__this_foreignBoxOps.value == 'comments'){
        _this.value ={'id':_this.value['id'],'comments':_this_chatforeign.value}
        _this.value['onplayOps']=__this_foreignBoxOps.value
        _this.value['onplaySubops'] = 'delete'  

        let _chatResp = await chatService.updateData(_this.value,{}) //[0],[1]
        if(!_chatResp.status){timerError(500,'Error Creating','');return false}
        timerDone(5000,'Removed','')

        await _this_chatQuery()
        //----updating saleitcontent
        _this_Rows.value[__thisIndex.value] =_chatResp.data  
     }else{
        _this.value ={'id':_this.value['id'],'clients':_this_clientforeign.value}
        _this.value['onplayOps']=__this_foreignBoxOps.value
        _this.value['onplaySubops'] = 'delete'  

        let _clientResp = await clientService.updateData(_this.value,{}) //[0],[1]
        console.log('creating client',_clientResp,_this.value,_this_clientforeign.value)

        if(!_clientResp.status){timerError(500,'Error Creating','');return false}
        timerDone(5000,'Removed','')

        _orderBox.value.push(_clientResp.data['id'] ?? null)
        await _this_clientQuery() 
        //----updating saleitcontent
        _this_Rows.value[__thisIndex.value] =_clientResp.data
     }

     return true

},
_update_foreign:async ()=>{
  if(__this_foreignBoxOps.value == 'comments'){
        _this.value ={'id':_this.value['id'],'comments':_this_chatforeign.value}
        _this.value['onplayOps']=__this_foreignBoxOps.value
        _this.value['onplaySubops'] = 'update'  

        let _chatResp = await chatService.updateData(_this.value,{}) //[0],[1]
        if(!_chatResp.status){timerError(500,'Error Creating','');return false}
        timerDone(5000,'updated','')

        await _this_chatQuery()
        //----updating saleitcontent
        _this_Rows.value[__thisIndex.value] =_chatResp.data  
     }else{
        _this.value ={'id':_this.value['id'],'clients':_this_clientforeign.value}
        _this.value['onplayOps']=__this_foreignBoxOps.value
        _this.value['onplaySubops'] = 'update'  

        let _clientResp = await clientService.updateData(_this.value,{}) //[0],[1]          

        if(!_clientResp.status){timerError(500,'Error Creating','');return false}
        timerDone(5000,'updated','')

        _orderBox.value.push(_clientResp.data['id'] ?? null)
        await _this_clientQuery() 
        //----updating saleitcontent
        _this_Rows.value[__thisIndex.value] =_clientResp.data
     }

     return true
},
_create_foreign:async ()=>{
     if(__this_foreignBoxOps.value == 'comments'){
        // _this_chatforeign.value['saleitID'] = _this.value['id']
        // _this_chatforeign.value['userID'] = Objprops._profile.id
        _this.value ={'id':_this.value['id'],'comments':_this_chatforeign.value}
        _this.value['onplayOps']=__this_foreignBoxOps.value
        _this.value['onplaySubops'] = 'create'  

        let _chatResp = await chatService.createData(_this.value,{}) //[0],[1]
        if(!_chatResp.status){timerError(500,'Error Creating','');return false}
        timerDone(5000,'updated','')

        await _this_chatQuery()
        //----updating saleitcontent
        _this_Rows.value[__thisIndex.value] =_chatResp.data  
     }else{
      // _this_clientforeign.value['saleitID'] = _this.value['id']
      // _this_clientforeign.value['userID'] = Objprops._profile.id
        _this.value ={'id':_this.value['id'],'clients':_this_clientforeign.value}
        _this.value['clients']['store']= 'buy'

        _this.value['onplayOps']=__this_foreignBoxOps.value
        _this.value['onplaySubops'] = 'create'  

        let _clientResp = await clientService.createData(_this.value,{}) //[0],[1]
        if(!_clientResp.status){timerError(500,'Error Creating','');return false}
        timerDone(5000,'updated','')

        _orderBox.value.push(_clientResp.data['id'] ?? null)
        await _this_clientQuery() 
        //----updating saleitcontent
        _this_Rows.value[__thisIndex.value] =_clientResp.data
     }

    return true
  },
//------special Operations=========
_newbuyer_foreign:async (_store ='buy',_isnewBuyer=true)=>{

      // _this_clientforeign.value['saleitID'] = _this.value['id']
      // _this_clientforeign.value['userID'] = Objprops._profile.id
        _this.value ={'id':_this.value['id'],'clients':_this_clientforeign.value}
        _this.value['clients']['store']= _store

        _this.value['onplayOps']=__this_foreignBoxOps.value
        _this.value['onplaySubops'] = 'create'  
        let _clientResp;
        if(_isnewBuyer){
          _clientResp = await clientService.createData(_this.value,{}) 
        }else{
          _clientResp = await clientService.updateData(_this.value,{}) //[0],[1]
        }
        
        if(!_clientResp.status){timerError(500,'Error Creating','');return false}
        timerDone(5000,_store == 'buy' ? 'Ordered' : 'ADD To Cart','')

        _orderBox.value.push(_clientResp.data['id'] ?? null)
        await _this_clientQuery() 
        //----updating saleitcontent
        _this_Rows.value[__thisIndex.value] =_clientResp.data
     

    return true
  },
}

//------------------
// Return data and methods
async function Reset_this(Ops,rowIndex){
  _fileAttributeName.value=null;
  _fileAsPathIndex.value=null
  
  __thisBox.value  = false; //OPen the Box
   _this.value = Object.assign({},rowIndex == null ? _thisDefault.value : _this_Rows.value[rowIndex]  
 ) //----assigning Onplay Row
   __thisIndex.value=rowIndex
   __thisOps.value =Ops
   __thisOpsStatus.value=false
   return true
 }

 async function Reset_this_foreign(foreignOps,_foreignIndex){ //Reset and Defaulting foreignBox
  _thisDefault_client.value['orderID'] = await _genOrderID()

  if(_foreignIndex){ //Reset Initiated from Array Selecting
      if(foreignOps =='clients'){
        _this_clientforeign.value = _this_clientRows.value[_foreignIndex]
        _this_clientforeign.value['saleitID']=_this.value?.['id'] ?? ''
        // _this_clientforeign.value['orderID']=await _genOrderID()
        // _clientQuery.value['saleitID']=_this.value['id'] ?? ''

      }else if(foreignOps =='comments'){
        _this_chatforeign.value = _this_chatRows.value[_foreignIndex]
        _this_chatforeign.value['saleitID']=_this.value?.['id'] ?? ''
      }
  }else{ //Reseting Default Foreign_Rows (null Index)
      __this_foreignBox.value= true //disasble sideBox
      __this_foreignBoxOpsStatus.value=false //turnofff active stauts
      __this_foreignBoxIndex.value =null

      __this_foreignBoxOps.value=foreignOps //diable andy operations
      if(foreignOps =='clients'){
          _this_clientforeign.value = _thisDefault_client.value
          // // _clientQuery.value['store']='buy'
          _this_clientforeign.value['saleitID']=_this.value['id'] ?? ''
        }else if(foreignOps =='comments'){
          _this_chatforeign.value = _thisDefault_chat.value
          _this_chatforeign.value['saleitID']=_this.value['id'] ?? ''
        }
  }

  return true
}

let __thisBox_CDialog = computed(() => { return Objprops.lytCreatRow}) //Layout_listening for pop_creator
watch(__thisBox_CDialog, async (cv, ov) => {
// _fileAttributeName.value=null;
 await Reset_this('CreateRowItem',null)
 __thisBox.value  = true; //OPen the Box
 return true
}); 
async function __thisBox_UDialog(_playrowIndex){
// _fileAttributeName.value=null;
  await Reset_this('UpdateRowItem',_playrowIndex)
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
        if (response) {
          timerDone(5000,_createTitle[2],'Succefully Created')
         __thisBox.value=false;
          return router.push('/play/playservice')
        }else{
          timerError(5000,_createTitle[2],_createTitle[0])
        }
        return true; 
      }).catch((error) => {
        timerError(5000,_createTitle[2],_createTitle[0])
        _fileAttributeName.value=null;
         __thisOpsStatus.value=false;
         __thisBox.value=false;
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
         _fileAttributeName.value=null;
         return false;
        });
}

//========
let _createTitle =["Creating Product & Services","Succefully Created","Please Try Again"]
let _updateTitle =["Updating Product & Services","Succefully Updated","Please Try Again"]
let _readTitle =["Fetching Product & Services","Done","No Data"]
let _deleteTitle =["Deleting Product & Services","Succefully Deleted","Please Try Again"]
//----=========================================================================---DATA ---/// ---ROW----CRUD
let createKey = "phone";
let updateKey = "id";
let delKey = "id";
//ModalCrudOps
const Crud_this = {
createData: async function (objParam={}) {
  //-------Check for Param_Requirents
  try {
    if (_this.value[createKey] == null) {return false; }
      //-----------Calling for Store Services  (_suburl, formData, objParam)
    return await _thisService.createData(_thisapiUrl,_this.value,objParam).then((response) => { 
          if (response[0]) {
            return response[1];
          } else {
            return false;
          }}).catch((error) => {return false;});
  } catch {return false; }
},
//----------------------------------------------------------------
updateData: async function (objParam={}) {
  //-------Check for Param_Requirments
  try {
    if (_this.value[updateKey] == null) {return false; }
    //-----------Calling for Store Services
    return await _thisService.updateData(_thisapiUrl,_this.value, objParam).then((response) => { //returning as [false,response_obj]
        if (response[0]) {
          return response[1];
        } else {
          return false;
        }
      }).catch((error) => {return false;});
  } catch {return false; }
},

readData: async function () {
  return await _thisService.readData(_thisapiUrl).then((response) => { //returning as ['data'][{},{},{data..}]
    if (response) {
        timerDone(5000,_readTitle[1],_readTitle[0]);return response;
      } else {
        timerError(5000,_readTitle[2],_readTitle[0]);return false;
      }
     }).catch((error) => {timerError(5000,_readTitle[2],_readTitle[0]);return false;});
},

//---------------------------------------------------------------
readFData: async function (objParam={}) {
  //-------Check for Param_Requirents
  try {
    if (Object.keys(objParam).length ==0) {return false; }
  //-----------Calling for Store Services
  return await _thisService.readFData(_thisapiUrl,objParam).then((response) => {
    if (response) {
        timerDone(5000,_readTitle[1],_readTitle[0]);return response;  
      } else {
        timerError(5000,_readTitle[2],_readTitle[0]);return false;
      }
    })
    .catch((error) => {timerError(5000,_readTitle[2],_readTitle[0]);return false;});
  } catch {return false; }
},

deleteData: async function () {
  //-------Check for Param_Requirents
  try {
    if (_this.value[delKey] == null) {return false; }
    //-----------------
    let objParam ={}
    objParam[delKey]=_this.value[delKey]
    //---------
    return await _thisService.deleteData(_thisapiUrl,objParam).then((response) => {
        if (response[0]) {
          timerDone(5000,_deleteTitle[1],_deleteTitle[0]);return response[1];
        } else {
          timerError(5000,_deleteTitle[2],_deleteTitle[0]);;return false;
        }
      }).catch((error) => {timerError(5000,_deleteTitle[2],_deleteTitle[0]);return false; });
    
    } catch {return false; }
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
//  watch(loaditwellcome, (currentValue, oldValue) => loadit.wellcome());

// //--------------------
let _fileAsPath =ref(0)//_file in Show_Mode (As_String)  
let _fileAsPathIndex =ref(null)//_fileAsPath_Array_index
let _fileAsPathSlide=ref(false)

let _fileAsPathOps = ref(false) //this is for selecting only


///_fileAsPathSlide
async function _fileAsPathOpsCall(StrIndex,index = null){ //calling for selections
 __thisIndex.value=index
 //__this_foreignBoxOps.value=null
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


var _cameraInstance = null
onMounted(()=>{
_cameraInstance = new _cameraDevice()
_cameraInstance._navigateDevice()
// console.error("Navigating mediaDevice.0ww");


})
//----------------------------Utilities Funtions
  </script>
  
  
    <style>

  </style>