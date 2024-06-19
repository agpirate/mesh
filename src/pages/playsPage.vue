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
                      :src="_fileAttributeName ? _fileAsSRC[_fileAsSRCIndex] : _this['saleitgr'][_fileAsSRCIndex]">  
                  
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
  <q-dialog v-model="_cameraBox" class="column overlay-Glass rounded-borders bg-red" >
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

<q-dialog v-model="_fileAsStringSlide" class="column saleitContentOps-Glass bg-red ">
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

  <q-page class="fit column rounded-borders fontastyle    "  >

      <div class="col-auto q-gutter-xs fixed-bottom z-top column q-ma-md  items-end" > 
          <!------------->
          <!--- No Data Founded, but keep listnening till we founde-->
          <div class="q-pa-sm" v-if="syncerrorData" > 
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
          <div class=" text-bold rounded-borders fontastyle q-pa-sx" v-if='__this_foreignBoxOpsStatus'>{{  __this_foreignBoxOps == 'comments' ? 'commenting..' : 'Buying' }}  </div>

          <!---custome loading(operation status)-->
          <div class=" rounded-borders bg-grey fontdstyle q-pa-sx" v-if='Loading'> {{Loading}}  </div>
          <div class=" rounded-borders bg-green fontdstyle q-pa-xs" v-if='DoneMessag'>  {{ DoneMessag}}  </div>
          <div class=" rounded-borders bg-cyan fontdstyle q-pa-xs" v-if='KnowthisMessage'> {{ KnowthisMessage}}  </div>
          <div class="rounded-borders bg-red fontdstyle q-pa-xs" v-if='WarnthisMessage'> {{ WarnthisMessage}}   </div>
        </div>

          <!------------------------------ ioio ----->
        <div class="col q-pa-none column fit" v-if="(_this_Rows ?? false)"    >
      
              <q-table  v-if="_contenting == 'main'"
             
              :rows="_this_Rows"
              :columns="columns"
  
              virtual-scroll

              :filterMethod="_thisFiltering"
              :filter="filter"

              row-key="id" 
              rowIndex="true"

              :inFullscreen="true"
              class="col column transparent q-py-md"
              card-class="text-brown"
              color="white"

              hide-pagination
              :pagination="pagination"

              hide-top
              hide-bottom
              style="min-width:100vw;border:0px;"
              >
      

                <template v-slot:header="props">
                  <q-tr :props="props"  class="col-auto column q-px-md transparent" style="backdrop-filter:blur(5px);position:fixed;z-index:1;" :style="$q.screen.lt.sm ? 'top:8vh' : 'top:7vh'"  >
                   
                    <q-scroll-area  class="col-grow column transparent flex flex-center" style="min-width:95vw;">
                      <div class="col-grow flex flex-center q-gutter-sm q-px-md transparent no-wrap " style="min-width:100%;max-height:100%;"> 

                                              <q-separator inset vertical class='q-py-sm'  />

                                            <q-btn rounded no-caps  @click="_this_Query(null,'',16)"  class="col-auto "  >
                                             Show All  
                                            </q-btn>
                                            <q-separator inset vertical class='q-py-sm'  />
                                            <q-btn rounded no-caps color="orange" size="sm" v-for="_qvalue0,_qgroup0 in saleCatagory"  
                                            @click="_this_Query('catagory',_qgroup0,_qvalue0)" :key="_qvalue0" class="column col-auto q-py-xs fontcstyle" >
                               
                                              <div v-if="(_thisQuery?.queryWeight?? false) == _qvalue0" class="col fit fontdstyle text-light"> {{  _qgroup0 }}  </div> 
                                              <div class="col text-dark" v-else> {{  _qgroup0 }}   </div>

                                            </q-btn>  
                                            <q-separator inset vertical class='q-py-sm'  />
                                            <q-btn rounded no-caps  size="sm"  v-for="_qvalue1,_qgroup1 in saleUsage" 
                                            @click="_this_Query('usage',_qgroup1,_qvalue1)" :key="_qvalue1" class="col-auto fontcstyle" >

                                              <div v-if="(_thisQuery?.queryWeight ?? false) == _qvalue1" class="col fit fontdstyle"> {{  _qgroup1 }}  </div>     
                                              <div class="col" v-else> {{  _qgroup1 }}   </div>

                                            </q-btn>                                                               
                                           
                                            <q-space />                                                        
                                          
                      </div>

                      
                  </q-scroll-area>             
                 
                  </q-tr>
                </template>

                <template v-slot:body="props"  >
                     
                  <!--row Object [key(id=?)],row,_trClass,cols,sort,rowIndex,color,dark,dense,expand]-->
                  <q-tr flat   
                    :props="props" :class="!$q.screen.lt.sm ? 'row' : 'column'"
                    class="col-11 q-gutter-xs q-tr--no-hover fit transparent fontbstyle"  
                    style="min-height:75vh;width:98vw;padding-top:5vh;border:0px solid blue;"
                  >
                              
                    <!------------------ iterating _ body cell-->
                    <q-td  auto-width class="col-2 " v-show="!$q.screen.lt.sm">                     
                    </q-td>
                    <!--   Content (if >sm)       --->
                    <q-td  :class="$q.screen.lt.sm ? 'col-6 column' : 'column col-6'  " v-if="props.row.saleitgr ?? false"  >

                          <div class="col row ">
  
                              <div class="col column" >
                              
                                  <q-img                                  
                                              loading="lazy"
                                              :src=" (__thisIndex == props.rowIndex) && _fileAsStringIndex ? props.row.saleitgr[_fileAsStringIndex] : props.row.saleitgr[0]"
                                              spinner-color="orange"
                                              class="column  rounded-borders fit shadow-8" style="max-width:100%;border-radius:12px;aspect-ratio: 2/1;"                                            
                                              >
                                     
                                        <q-list class="column col fit fontbstyle q-px-none" :class="props.row.phone ? 'transparent': 'transparent'">
                                          <q-item class=" col-auto row items-top q-px-none justify-between items-start"> 

                                           <div class="col-sm-5 col-md-3   q-py-none fit-width q-gutter-xs" style="">
                                                <q-btn v-if="props.row.fphone ?? false" class="col-auto q-pa-none" @click="_this_Query(null,props.row.userID)">

                                                  <q-item-label style=""  >
                                                        <q-item-label class="saleitHeader-Glass fit row justify-between">                                                        
                                                                                                    
                                                          <div class="transparent items-end row fontastyle">  <q-icon name="phone" size="xs" />{{(props.row.fphone)}}</div>
                                                          <q-icon name="check_circle" size="xs" />

                                                        </q-item-label>                                          
                                                        
                                                      </q-item-label>

                                                </q-btn>                                                
                                                <q-item-label class="saleitHeader-Glass" v-else> 
                                                  #saleit Service 
                                                </q-item-label>


                                                <div v-if="typeof props.row.fupdatedAt == 'object'" class="fontastyle row q-gutter-xs q-mx-sm"> 
                                                          <div  v-if="props.row.fupdatedAt.days " > {{props.row.fupdatedAt.days}} Days ago</div> 
                                                          <div v-else-if="props.row.fupdatedAt.hours " > {{props.row.fupdatedAt.hours}} Hours ago</div> 
                                                          <div v-else-if="props.row.fupdatedAt.minutes" > {{props.row.fupdatedAt.minutes}} Minutes ago</div>
                                                          <div v-else>Just Now</div>
                                                         
                                                          </div>
                                                <div v-else> {{props.row.fupdatedAt}} </div>

                                              <div class="col-auto column no-padding no-margine q-gutter-xs " style="border:0px solid orange;">

                                                  <q-btn outline v-for="item,fileIndx in props.row.saleitgr" @click="_fileAsStringOpsCall(fileIndx,props.rowIndex)" :key="fileIndx" 
                                                  @mouseover="_fileAsStringOpsCall(fileIndx,props.rowIndex)"
                                                  class="col-1 column  transparent q-pa-none no-border " style="max-width:6dvw">   
                                                        <img :src="item" class="col fit shadow-2 transparent rounded-borders q-pa-none" style="aspect-ratio: 2/1;width:100%;" >
                                                      
                                                  </q-btn>                                              

                                                  
                                              </div>
                                                    <q-btn flat  :dense="true" icon="zoom_in" @click="_fileAsStringSlideCall(props.rowIndex)" @mouseover="_fileAsStringSlideCall(props.rowIndex)"> 
                                                      <q-tooltip>Look Closer</q-tooltip>
                                                    </q-btn>
                                            </div>

                                           <div class="col-auto q-px-none q-mx-none " v-if="$q.screen.lt.sm">
                                                  <q-item  class="q-px-none">
                                                          <q-sticky expand position="right" class="q-px-none " >
                                                              <!--inseide_side_actions-->
                                                          <q-card flat class="q-pa-none column transparent" style="background-color: rgba(6, 93, 255, 0.212);" >
  
                                                              <q-badge color="orange" class="fontcstyle text-bold" v-if="props.row.quantity != 0">Saleing </q-badge>

                                                              <q-btn    class="fontastyle text-bold" :label="Objprops._onPlayLanguage ? 'ይዓድጉ' :'Buy'"  @click="_this_RowActivator(props.rowIndex,'clients')"

                                                                >
                                                                <q-badge color="orange" left floating v-if="props.row.clients?.length ?? false">                                                                     
                                                                          <q-item-label v-if="props.row.quantity == 0">sold </q-item-label>                                                                        
                                                                </q-badge>                                          

                                                              </q-btn>
                                                              <q-btn  size="xs" :dense="true" flat class="text-blue"    @click="_this_ActiveOperation._likes(props.rowIndex)">
                                                                <q-badge class="bg-black text-white fontcstyle" color="orange" floating v-if="props.row.likes ?? false">{{  props.row.likes.like }}</q-badge>
                                                                 <q-icon :name="matThumbUp" size="xs" />
                                                              </q-btn>

                                                              <q-btn   flat size="sm" :dense="true"  icon="message"  @click="_this_RowActivator(props.rowIndex,'comments')">
                                                                <!--q-tooltip :dense="true" class="bg-black text-white fontbstyle"  self="left middle">comments</q-tooltip-->    
                                                              </q-btn>



                                                              <!--q-btn  flat icon="map"  size="sm" :dense="true"  @click="__thisBox_UDialog(props.rowIndex)"> 
                                                                <q-tooltip class="bg-black text-white fontcstyle"  self="top middle">   map </q-tooltip>  
                                                              </q-btn-->
                                                              <q-btn round  size="sm" :dense="true" flat icon="edit" @click="__thisBox_UDialog(props.rowIndex)"  v-if="true"> 
                                                                <q-tooltip class="bg-black text-white fontcstyle"  self="top middle">   edit </q-tooltip>  
                                                              </q-btn>

                                                              <q-btn round  size="sm" :dense="true" flat icon="delete" @click="_this_ActiveOperation._delRow(props.rowIndex,props.key)" v-if="Objprops.phone == props.row.phone">  
                                                                <q-tooltip class="bg-black text-white fontcstyle"  self="top middle"> delete </q-tooltip>  
                                                              </q-btn>
                                                              

                                                            <q-btn round flat icon="more_vert">
                                                            <q-menu  self="top left" flat  stack no-caps  class="row q-gutter-none" >
                                                            <q-list style="min-width: 100px">
                                                            <q-item clickable>
                                                            <q-input  filled  type="textarea" :label="cinfo" stack-label :dense="true"  />

                                                            </q-item>

                                                            <q-item >
                                                                      more infos
                                                            </q-item>

                                                            </q-list>
                                                            </q-menu>

                                                            </q-btn>

                                                            </q-card>

                                                                
                                                              </q-sticky>
                                                        </q-item>
                                                  </div>

                                                  <!--q-item-section class="col columns row items-end float" >
                                                          <q-item-label>D_QueryW {{ props.row.queryWeight}} </q-item-label>
                                                          <q-item-label>Prof_W {{ Objprops._profile.queryWeight}} </q-item-label>
                                                          <q-item-label> Revenu:- {{ props.row['tPrice'] }}</q-item-label>
                                                  </q-item-section--->

                                          </q-item>
                                      
                                          <q-item class="col-auto row justify-between content-start q-px-none q-mx-none">
                                        
                                          </q-item>

                                          <q-item class="absolute-bottom fontdstyle items-center  q-gutter-sm row items-end ">
                                            <div class="col row " v-if="$q.screen.gt.sm">  <!---------------------Conteting While in NOT Mobile Screen-->
                                              <q-item-section class="q-py-sm fontbstyle col row"  >                                                      
                                                    <div class="col-auto column  justify-start q-pa-sm" >
                                                      <div class="col-auto row q-pa-xs q-ma-none">
                                                        <div class="col-auto justify-right q-py-none saleitContentOps-Glass" >
                                                          {{ props.row.header }}  {{ props.row.catagoryScore }}/{{ props.row.usageScore }} /{{ props.row.trendScore }}  
                                                        </div>
                                                      </div>
                                                      
                                                      <q-item style="word-wrap: break-word;max-width:5vw" >     {{ props.row.content }}  </q-item>
                                                    </div>                                                      

                                                </q-item-section>
                                             
                                                <q-item-section class="row col-auto q-px-none  saleitContentOps-Glass">
                                              
                                                    <div class="col-auto fontastyle q-gutter-sm">
                                                            <q-btn size="md" no-caps icon="shop"  class="fontestyle bg-orange" :label="Objprops._onPlayLanguage ? 'ይዓድጉ' :'Buy'" 
                                                        @click="_this_RowActivator(props.rowIndex,'clients')"/>
                                                            <q-btn label="Add to Cart" no-caps color="black"  @click="_this_ActiveOperation._toCart(props.row.id,'clients')" />
                                                            
                                                          <!--div class="fontdstyle q-gutter-sm column">   

                                                                <div>
                                                                      Revenue: {{  props.row.tPrice  }}
                                                                    <q-item v-if="typeof props.row.timer ?? false ">
                                                                      <--q-item-section>                                         
                                                                            {{ props.row.timer.hours }}
                                                                            {{ props.row.timer.days }}
                                                                      </q-item-section ->
                                                                      <q-item-section>
                                                                      </q-item-section>

                                                                      </q-item>
                                                                      <q-item v-else>
                                                                          Normal Market
                                                                      </q-item>
                                                                </div> 
                                                          
                                                                <q-separator inset />

                                                                <div class="">Buyers : {{ props.row.tClient}}</div>

                                                                <q-separator inset />

                                                                <div  > Available Quantity : {{ props.row.quantity}}   </div>

                                                            </div-->                                                      

                                                    
                                                       </div>
                                                       <div class="col-grow column q-pa-sm" style="min-height:10vh">

                                                          <div class="col-grow row  flex-center fontestyle" v-if="props.row.discount ?? false" color="">                                                        
                                                              <q-item-label class="text-strike text-red q-pa-sm">{{ props.row.price  }}</q-item-label>{{  props.row.discount }} {{  currency }} (New Price)
                                                          </div>  

                                                          <div class="col-grow q-gutter-md  flex-center fontestyle row" v-else> 
                                                            
                                                            
                                                            {{  props.row.price }} {{  currency }} ( Price )
                                                                
                                                          </div>  

                                                          <div class="col-auto text-orange row justify-between"> 
                                                            <q-rating v-model="props.row._itServiceRating" :max="5" size="xs" @click="_this_ActiveOperation._rating(props.rowIndex)">
                                                              <q-tooltip>Product Reliability Score</q-tooltip>
                                                              </q-rating>
                                                            <div class="fontdstyle">Quantity :  {{ props.row.quantity}} </div>                                                       
                                                        </div>    
                                                       </div>
                                                                                                     
                                                        
                                                </q-item-section>


                                             </div>

                                             <div class="col row" v-else>   <!---------------------Conteting While in Mobile Screen-->
                                              <q-item-section class="q-py-sm fontbstyle col row"  >                                                      
                                                    <div class="col-auto column  justify-start q-pa-sm" >
                                                      <div class="col-auto row q-pa-xs q-ma-none">
                                                        <div class="col-auto justify-right q-py-none saleitContentOps-Glass" >
                                                          {{ props.row.header }}  
                                                        </div>
                                                      </div>
                                                      
                                                     </div>                                                      

                                                </q-item-section>
                                               
                                                <q-item-section class="row col-auto q-px-none text-sm saleitContentOps-Glass">
                                                  <q-btn size="md" no-caps icon="shop"  class="fontastyle" :label="Objprops._onPlayLanguage ? 'ይዓድጉ' :'Buy'" @click="_this_RowActivator(props.rowIndex,'clients')"
/>
                                                      <div > 
                                                        Revenue: {{  props.row.tPrice  }}   
                                                        <q-item v-if="typeof props.row.timer ?? false ">                                                         

                                                          <q-item-section>                                                            
                                                          </q-item-section>
                                                        </q-item>
                                                      </div> 
                                                      
                                                      <q-separator inset />
                                                      <div v-if="props.row.clients ?? false">Buyers : {{ props.row.tClient}}</div>
                                                      <q-separator inset />
                                                      <div v-if="props.row.clients ?? false">Quantity : {{ props.row.quantity}}</div>

                                                      <q-badge class="q-pa-sm text-bold" v-if="props.row.discount ?? false" color="pink">
                                                        
                                                          HH Price : <q-item-label class="text-strike text-orange">{{ props.row.price  }}</q-item-label>{{  props.row.discount }} {{  currency }}
                                                                                                              
                                                      </q-badge>  
                                                      <q-badge class="q-pa-sm fontestyle" color="orange" v-else>                                               
                                                      
                                                          {{  props.row.price }} {{  currency }} (Price)
                                                      </q-badge>  

                                                      <div class="text-orange"> 
                                                         <q-rating v-model="props.row._itServiceRating" :max="5" size="xs" @click="_this_ActiveOperation._rating(props.rowIndex)"/>                                                       
                                                     </div>                                                     
                                                        
                                                </q-item-section>

                                             
                                           
                                             </div>
                                          </q-item>
                                        

                                        </q-list>
                                              
                                        


                                  </q-img>
  
                              </div>
                           
                              <div class="col-auto">
                                   <!--outside _side_actions-->
                                  <q-sticky v-if="$q.screen.gt.sm" expand position="left" class=" q-px-xs">
  
                                        <q-card class="q-pa-none column transparent" style="" >

                                                          <q-badge color="orange" class="fontastyle text-bold " v-if="props.row.quantity != 0">Open </q-badge>
                                                              <q-badge color="orange" left floating v-else>                                                                     
                                                                        <q-item-label v-if="props.row.tClient ?? false">sold </q-item-label>                                                                        
                                                                        <q-item-label v-else>sold </q-item-label>                                                                        
                                                              </q-badge> 

                                                          <q-btn flat size="sm" :dense="true" class="flex-center row" icon="shop"   @click="_this_RowActivator(props.rowIndex,'clients')"
                                                            />
                                                          <q-btn  flat size="sm" :dense="true"  class="text-blue"    @click="_this_ActiveOperation._likes(props.rowIndex)">
                                                            <q-badge class="bg-black text-white fontcstyle" color="orange" floating v-if="props.row.likes ?? false">{{  props.row.likes.like }}</q-badge>
                                                            <!--q-icon :name="matThumbUp" size="sm"/-->
                                                            <q-icon color="red" name="favorite" size="sm"/>
                                                          </q-btn>

                                                          <q-btn   flat size="sm" :dense="true"  icon="message"  @click="_this_RowActivator(props.rowIndex,'comments')">
                                                            <!--q-tooltip :dense="true" class="bg-black text-white fontbstyle"  self="left middle">comments</q-tooltip-->    
                                                          </q-btn>

                                                      

                                                          <!--q-btn  flat icon="map"  :dense="true"  @click="__thisBox_UDialog(props.rowIndex)"> 
                                                            <q-tooltip class="bg-black text-white fontcstyle"  self="top middle">   map </q-tooltip>  
                                                          </q-btn -->
                                                          <div v-if="Objprops.phone == props.row.phone" class="column">                   
                                                                <q-btn round  :dense="true" flat icon="edit" 
                                                                @click="__thisBox_UDialog(props.rowIndex)" > 
                                                                <q-tooltip class="bg-black text-white fontcstyle"  self="top middle">   edit </q-tooltip>  
                                                              </q-btn>

                                                              <q-btn round  :dense="true" flat icon="delete"  
                                                              @click="_this_ActiveOperation._delRow(props.rowIndex,props.key)" >  
                                                                <q-tooltip class="bg-black text-white fontcstyle"  self="top middle"> delete </q-tooltip>  
                                                              </q-btn>
                                                          </div>
                                       
                                                          

                                          <q-btn round flat icon="more_vert">
                                                 <q-menu  self="top left" flat  stack no-caps  class="row q-gutter-none" >
                                                      <q-list style="min-width: 100px">
                                                      <q-item clickable>
                                                        <q-input  filled  type="textarea" :label="cinfo" stack-label :dense="true"  />
                                        
                                                      </q-item>

                                                      <q-item >
                                                                  more infos
                                                      </q-item>

                                                      </q-list>
                                                    </q-menu>

                                          </q-btn>

                                          </q-card>
                                  </q-sticky>
          
                              </div>
                          </div>
                    </q-td>

                   <!---- else mobile-->
                    <q-td :class="$q.screen.gt.sm ? 'column col-4 q-ma-md q-pa-lg' :'col-6 column q-ma-md'" style="padding-top:8vh" v-else>
                      <q-card  class="col row q-gutter-sm" >
                          <q-skeleton class="col" square />
                      </q-card>
                    </q-td>
                      <!------Image Display Ends (with 1:Normal ; 2:sckelton)-->

                       <!---------Disktop----sideBox_show (comment & client) Begin-->
                    <q-td  auto-width class="col fit column q-pa-md no-borders"  style="min-height:75vh;" v-if="$q.screen.gt.sm ">

                            <div  class="col column" v-if="__thisIndex == props.rowIndex"> 

                              <q-card class="col column q-pa-sm " v-if="__this_foreignBoxOps == 'comments' ?? false">

                                <div class="col column fit" v-if="_this_chatRows ?? false">    
                                      <q-list class="" style="width:100%;height:70svh;overflow: hidden;">  
                                        <q-item class="col-auto column">
                                          <q-item-label> 
                                            Comments:                                              
                                            <q-btn style="background-color:white;" color="primary" :dense="true" size="sm" rounded flat @click="_this_foreignOperation._add('comments')"> Create Comment</q-btn>                      
                                          </q-item-label>     
                                          <q-item-section v-if="__this_foreignBoxIndex == null" class="column q-pa-sm">                                       
                                              <q-item-label style="" v-if="Object.keys(_this_chatforeign).length" >                                                                                              
                                                      <q-input outlined  v-model="_this_chatforeign['comment']" label="comment" stack-label :dense="true"   > </q-input>                                   
                                              </q-item-label> 
                                              <div class="col-auto q-pa-xs text-bold justify-end row">
                                                  <q-btn color="blue"  no-caps size="sm" label="Add Comment " :dense="true" @click="_this_foreignOperation._submitArray('comments')" />
                                              </div>     
                                          </q-item-section>
                                        </q-item> 
                                        <!--q-item v-for="item,index in _showOpsValue" :key="index"  class="col column fontastyle">
                                          {{   _showOpsValue.length }} --      {{ item }}
                                      </q-item-->
                                        <q-separator spaced inset /> 
                                        <div class="col column fit fontastyle" v-if="_this_chatRows.length ?? false" >                                           

                                            <div class="col scroll-area" style="overflow-y: auto;" >                                                
                                                <q-item v-for="item,index in _this_chatRows" :key="index"  class="col column">  
                                                  <q-item-section   class="q-gutter-xs fontastyle ">
                                                    <div class="col q-gutter-xs column items-left shadow-1 rounded-borders " v-if="item.phone == props.row.phone" > 
                                                       
                                                        <div class="transparent items-end row ">  <q-icon name="phone" size="xs" />{{ String(item.phone ?? '') }}</div>

                                                       <div class="fit q-py-xs q-px-sm text-grey " > {{  item.comment ?? '' }}</div>                                                      

                                                    </div>

                                                    <div class="col q-gutter-xs column items-between rounded-borders" style="background-color:whitesmoke" v-else > 
                                                        
                                                        <div class="transparent items-end row fontbstyle">  <q-icon name="phone" size="xs" />{{ String(item.phone ?? '') }}</div>

                                                        <div class="fit q-py-none q-px-sm text-grey-7" > {{  item.comment ?? '' }}</div>   
                                                  </div>
                                                  </q-item-section>

                                                  <div class=" row justify-between fontastyle text-grey-7 flex-center">
                                                    <div class="text-orange" v-if="(item.userID == Objprops.userID)"> 
                                                          <q-btn rounded flat icon="edit" label="Edit" size="sm" @click="_this_foreignOperation._selectArray(index)"> </q-btn>                       
            
                                                    </div> 

                                                    <div v-else style="width:2px;"></div>                                        
                                                    <div  class="fontcstyle"> 
                                                             
                                                          <div v-if="typeof item.fupdatedAt == 'object'" class="fontcstyle row q-gutter-xs q-mx-sm"> 
                                                          <div  v-if="item.fupdatedAt.days " > {{item.fupdatedAt.days}} Days ago</div> 
                                                          <div v-else-if="item.fupdatedAt.hours " > {{item.fupdatedAt.hours}} Hours ago</div> 
                                                          <div v-else-if="item.fupdatedAt.minutes" > {{item.fupdatedAt.minutes}} Minutes ago</div>
                                                          <div v-else>Just Now</div>
                                                         
                                                          </div>
                                                           <div v-else> {{item.fupdatedAt}} </div>
                                                    
                                                    </div>
                                                  
                                                  </div>
                                                
                                                </q-item>
                  

                                              </div>
                                          </div>   

                                        <div v-else class="flex flex-center fit text-grey">
                                          No Comments [ADD New]
                                        </div>  
                                      </q-list>     

                                      <div v-if="__this_foreignBoxIndex != null" class="shadow-1 q-pa-xs">                                                                                            
                                                    <div class="justify-end  row ">  <div  style="color:teal"> Commenting..</div> </div>
                                                    <div style="min-height:1vh;" class="column " >
                                                      <q-input size="sm" outlined type="text" standout="bg-teal-2 text-white"
                                                      autogrow v-model="_this_chatforeign['comment']" 
                                                          stack-label :dense="true"  placeholder="commenting..." />                                              
                                                    </div>      
                                                    <q-btn rounded flat size="sm" color='red' icon="close" label="close" @click="__this_foreignBoxIndex = null" > </q-btn>
                                                    <q-btn round flat icon="done" size="sm" @click="_this_foreignOperation._updateArray()" > </q-btn>
                                                    <q-btn round flat icon="delete" size="sm" @click="_this_foreignOperation._remove()"> </q-btn>
                                                                             
                                        </div>
                                </div> 

                              </q-card>

                              <q-card class="col column q-pa-sm " v-if="__this_foreignBoxOps == 'clients' ?? false">
                                <div class="col column" v-if="props.row?.clients ?? false">   

                                    <q-list class=" column" style="width:100%;height:75svh">                       
                                                  <div v-if="(props.row.quantity == 0) || (props.row.price == 0)"> 
                                                          <div v-if="props.row.price == 0" class="q-pa-sm text-red"> Sorry, Price isn't fixed yet!</div>
                                                          <div v-else class="q-pa-sm"> Product is sold out!</div>
                                                  </div>  

                                                  <div v-else class="q-px-sm"> 
                                                 
                                                        

                                                          <q-card class="items-center q-pa-sm " style="background-color:whitesmoke;" > 
                                                                <div  v-if="(_this_clientforeign['orderID'] ?? false)" class="q-gutter-sm">
                                                                <!--q-item-label class="absolute-right q-px-sm fontastyle">Step - 1</q-item-label-->                                        

                                                               
                                                                  <div class="col row q-gutter-sm  q-pa-none fit">
                                                                      <div class="col column q-gutter-xs fontdstyle">
                                                                        <div>
                                                                          Quantity
                                                                        </div>
                                                                        <div class="row">
                                                                          <q-btn  icon="remove"  size="sm" @click="_this_clientforeign['quantity'] = parseFloat(_this_clientforeign['quantity']) > 1 ? parseFloat(_this_clientforeign['quantity'])-1 : 1 "/>
                                                                          <q-btn color="orange" size="md" class="q-mx-xs"  :label="_this_clientforeign['quantity']"   />
                                                                          <q-btn  size="sm"  icon="add" @click="_this_clientforeign['quantity'] = parseFloat(_this_clientforeign['quantity'] ?? 1)+1"   />

                                                                        </div>
                                                                      </div>

                                                                      <div class="col column flex flex-center justify-center fontdstyle">
                                                                        Total Prices
                                                                        <q-btn flat class="fontestyle" :label="_this_clientforeign['quantity'] * props.row.price"  />
                                                                      </div>
                                                                  

                                                                  </div>

                                                                  <div class="q-gutter-sm row justify-end fontestyle"> 
                                                                      <q-btn rounded color="orange" no-caps  glossy unelevated  @click="_this_foreignOperation._submitArray()" label="Order Now" :dense="true"/>
                                                                      <q-btn rounded color="green" no-caps  glossy unelevated   @click="_this_ActiveOperation._toCart(props.row.id,'clients')" label="Add to Cart" :dense="true"/>
                                                                
                                                                  </div>                                                                  
                                                                                                     
                                                              
                                                              </div>     
                                                          </q-card>
                                                        
                                                                                                       
                                                              
                                                              <!--fieldset class="q-gutter-md row items-center fontastyle q-px-sm q-py-none" style="border-radius: 5px;border:0px" v-else>  

                                                                <q-item-label class="absolute-top-right q-px-md  ">Just Ordered. <q-btn rounded size="sm" no-caps label="New Order"  @click="_thisClientOperation._initiateOrder()"/>
                                                                                                  
                                                                </q-item-label>                                             
                                                                <legend class="flex justify-start q-py-none fontastyle">Your OrderID :<q-item-label caption> <q-badge >{{ _orderIntiatedID  }}  </q-badge>  </q-item-label> </legend>
                                                                <q-badge color="green" v-if="_orderConfirmDebuger"> {{  _orderConfirmDebuger  }}   </q-badge>                                            
                                                        
                                                              </fieldset--> 
                                                  </div>
                                             
                                            <q-separator spaced inset />
                                           <div class="col column fit fontastyle" v-if="_this_clientRows.length ?? false" >  

                                                  <q-item  class="col-auto q-pa-xs" > 
                                                    <q-badge outline color='orange'  class="fontastyle q-pa-xs">you Have {{ _this_clientRows.length }} : {{  _orderDebuger }}</q-badge>
                                                  </q-item>

                                                  <div class="col scroll-area" style="overflow-y: auto;" >                                                
                                                      <q-item v-for="item,index in _this_clientRows" :key="index"  class="col column">  
                                                            
                                                        <q-item-section >

                                                        <div class="row justify-between items-end q-gutter-sm ">
                                                          <div class="q-py-sm" v-if="item?.['served'] ?? false">
                                                              <div v-if="item['served'] == 'Requested' ?? false " class="row">                                                                
                                                                    <div class="col-auto bg-orange q-px-xs" style="border-radius:5%;">
                                                                      Just Ordered</div>
                                                                </div> 
                                                            
                                                                <q-item-label style="" class="fontastyle" >
                                                                  <q-avatar size="14px"  :color="item['served'] != 'Queed' ? 'orange' : 'green'"></q-avatar>
                                                                    <template v-if="_is_thisOwner || item?.['userID'] == Objprops.userID" >{{item.phone}}
                                                                    </template> 

                                                                    <template v-else> {{item.fphone}}
                                                                    </template> 

                                                                    #{{item.orderID}}
                                                                    <q-tooltip> Serve Status : {{ item.served }} </q-tooltip>

                                                                </q-item-label>                                                    
                                                          </div>
                                                            <!---- is current loged user/client  is Owner)--> 
                                                            <div> 
                                                              <template v-if="__this_foreignBoxIndex == index">
                                                                  <q-btn rounded flat size="sm" color='red' icon="close" label="close" @click="__this_foreignBoxIndex = null"  /> 
                                                                  <q-btn round flat size="sm" :dense="true" icon="done" @click="_this_foreignOperation._updateArray(false)" v-if="_is_thisOwner"/>                                                                  
                                                                  <q-btn rounded flat size="sm" icon="delete" @click="_this_foreignOperation._remove(index,_this.id)" />            
                                                        
                                                                </template>
                                                                <template v-else>
                                                                <q-btn rounded flat size="sm" color='orange' icon="edit" label="edit" @click="_this_foreignOperation._selectArray(index,_this.id)"  v-if="__this_foreignBoxIndex != index "> </q-btn>

                                                                </template>
                                                        </div>
                                                                                                                                                     

                                                        </div>                                    

                                                        <div class="justify-between row q-gutter-sm q-pa-xs"  v-if="__this_foreignBoxIndex == index && _is_thisOwner" >
                                                        
                                                                <div style="" class="col" >
                                                                    <div>Descriptions ?</div>
                                                                    <q-input  autogrow outlined class="col fontastyle" 
                                                                    :shadow-text="textareaShadowText"
                                                                          @keydown="processTextareaFill"
                                                                          @focus="processTextareaFill" 
                                                                          v-model="_this_clientforeign['description']" 
                                                                          stack-label :dense="true"  />                                                                      
                                                                </div>   

                                                                <div style="" class="col-auto fontastyle">
                                                                  <div>Change Status ?</div>                                                                  
                                                                  <q-select
                                                                  :dense="true" 
                                                                  outlined
                                                                        v-model="_this_clientforeign['served']"
                                                                        :options="['Requested','Queed','Served']"                                                                      
                                                                        stack-label
                                                                        class="fontcstyle text-grey"
                                                                      />                                                                           
                                                                      
                                                                </div>   
                                                        </div> 

                                                        <div class="justify-between row q-gutter-sm" v-else >
                                                          <div class="col column rounded-borders bg-grey-3 q-pa-xs " v-for="k in ['quantity','price']" :key="k"  >
                                                           {{ k}}
                                                              <q-item-label class="fontastyle"> {{ item[k]}} </q-item-label> 
                                                          </div>                                                                                                          
                                                        </div>    
                                                        </q-item-section>


                                                        <q-item-section>                                     
                                                              <div class="text-orange row justify-between fontastyle"> 
                                                                    <!--q-item-label class="row justify-start items-center " >Remark: <q-item-label class="text-grey " > 
                                                                      {{item['description']   }} </q-item-label>
                                                                    </q-item-label-->
                                                                    <div></div>
                                                                    <!--q-item-label > {{  item.time?.split(',')[0] ?? ' ' + item.time?.split(',')[1] ?? ' ' }}</q-item-label-->
                                                                                                                                    
                                   
                                                                      <div  class="fontcstyle"> 
                                                                              
                                                                            <div v-if="typeof item.fupdatedAt == 'object'" class="fontcstyle row q-gutter-xs q-mx-sm"> 
                                                                            <div  v-if="item.fupdatedAt.days " > {{item.fupdatedAt.days}} Days ago</div> 
                                                                            <div v-else-if="item.fupdatedAt.hours " > {{item.fupdatedAt.hours}} Hours ago</div> 
                                                                            <div v-else-if="item.fupdatedAt.minutes" > {{item.fupdatedAt.minutes}} Minutes ago</div>
                                                                            <div v-else>Just Now</div>
                                                                          
                                                                            </div>
                                                                            <div v-else> {{item.fupdatedAt}} </div>
                                                                      
                                                                      </div>
                                                                    
                                                              </div>                                                                     
                                                                
                                                        </q-item-section>

                                                    </q-item>
                                                </div>

                                            </div>
                                            
                                              <div class="col flex flex-center " v-else>
                                                    <q-spinner color="blue" size="5em" :thickness="5" v-if="__this_foreignBoxOpsStatus" />
                                                    <div v-else> Your Cart is Empty! </div>
                                              </div>  
                                    </q-list>

                                </div>

                            </q-card>
                          </div>
                    </q-td>
                   
                    <!---------Disktop----sideBox_show (comment & client) Ends-->
                    <q-card class="" style="position:fixed;width:100%;height:80svh;bottom:0;z-index: 1;"  v-if="$q.screen.lt.sm && (__this_foreignBoxOps ?? false)">

                            <q-btn @click="__this_foreignBoxOps = null" size="xs" icon="close" color="orange" class="absolute-top" style="z-index:1"  />

                              <q-card-section class="q-pa-none  row q-ma-none fontastyle" v-if="_this.saleitgr ?? false">

                                <q-item class="col-3 column bg-grey-3 rounded-borders">
                                  <q-img :src="_fileAsStringIndex ? _this.saleitgr[_fileAsStringIndex] : _this.saleitgr[0]"
                                    style="aspect-ratio: 2/1;width:100%;" class="col q-pa-none fit"> 
                                  </q-img>

                                </q-item>
                              
                                <q-item class="col">
                                    <q-item-section class="col-grow">
                                      <div overline>{{ _this.userName}}</div>
                                      <q-item-label>{{ _this.header}}</q-item-label>

                                      <div class="row  q-gutter-sm">                                                
                                          <div >Price : {{ _this.price}}</div>
                                          <div >Quantity: {{ _this.quantity}}</div>
                                          <q-rating v-model="_this._itServiceRating" :max="5" size="xs" @click="_this_ActiveOperation._rating(__thisIndex)"/>

                                      </div>
                                     </q-item-section>

                                   
                                  </q-item>

                              </q-card-section>

                              <q-tabs v-model="__this_foreignBoxOps" class="text-orange " :dense="true">
                                <q-tab label="Comments" name="comments" />
                                <q-tab label="Shoping" name="clients" />
                              </q-tabs>

                              <q-separator />

                              <q-tab-panels v-model="__this_foreignBoxOps" animated class="fit column">

                                <q-tab-panel name="comments" class="col fit  no-margine no-padding">
                               
                                <div class="col column fit no-padding no-margine q-pa-none" v-if="_this.comments ?? false">                             
                                    <q-list class="fit q-px-sm" style="width:100%;max-height:70svh;overflow: hidden;">  
                                        <q-item class="col-auto column">
                                          <q-item-label> 
                                            Comments:                                              
                                            <q-btn style="background-color:white;" color="primary" :dense="true" size="sm" rounded flat @click="_this_foreignOperation._add('comments')"> Create Comment</q-btn>                      
                                          </q-item-label>   
                                            
                                          <q-item-section v-if="__this_foreignBoxIndex == null" class="column q-pa-sm">                                       
                                              <q-item-label style="" v-if="Object.keys(_this_chatforeign).length" >                                                                                              
                                                      <q-input  v-model="_this_hatforeign['comment']" label="comment" stack-label :dense="true"   > </q-input>                                   
                                              </q-item-label> 
                                              <div class="col-auto q-pa-xs text-bold justify-end row">
                                                  <q-btn color="blue"  no-caps size="sm" label="Add Comment " :dense="true" @click="_this_foreignOperation._submitArray('comments')" />
                                              </div>     
                                          </q-item-section>
                                        </q-item> 
                                        <!--q-item v-for="item,index in _showOpsValue" :key="index"  class="col column fontastyle">
                                          {{   _showOpsValue.length }} --      {{ item }}
                                      </q-item-->
                                        <q-separator spaced inset /> 
                                        <div class="col column fit q-py-sm" v-if="_this.comments?.length ?? false"   >      
                                              <div class="col scroll-area" style="overflow-y: auto;" >                                                
                                                  <q-item v-for="item,index in _this.comments" :key="index"  class="col column">  
                                                
                                                    <q-item-section v-if="(__this_foreignBoxIndex == index) ">  
                                                                                          
                                                          <div class="justify-end  row ">  <div  style="color:teal"> Commenting..</div> </div>
                                                                <div style="min-height:1vh;" class="column " >
                                                                  <q-input  outlined type="text" standout="bg-teal-2 text-white"
                                                                  autogrow v-model="_this['comments'][index]['comment']" 
                                                                      stack-label :dense="true"  placeholder="Chating..." />                                              
                                                                </div>                                                         
                                                              </q-item-section>
                                                            
                                                            <q-item-section   class="q-gutter-xs fontbstyle" v-else>
                                                              <q-badge class="col q-gutter-xs column items-left bg-orange" v-if="item.phone == props.row.phone" > 
                                                              <div class="fit  fontastyle row justify-left"> 
                                                                <div class="col-auto">@{{ item.userName ?? ''}} </div>                                          
                                                                <div> : {{ String(item.phone ?? '') }}</div>                                       
                                                              
                                                              </div>
                                                              <div class="fit q-py-xs"> {{  item.comment ?? '' }}</div>                                              
                                                            </q-badge>
          
                                                            <q-badge class="col q-gutter-xs column items-between bg-grey-3" v-else> 
                                                              <div class="fit  fontastyle row justify-left"> 
                                                                <div class="col-auto">@{{ item.userName ?? ''}} </div>                                          
                                                                <div v-if="item.phone == props.row.phone" > : {{ String(item.phone ?? '') }}</div>                                       
                                                              
                                                              </div>
                                                              <div class="fit q-py-xs text-grey-9"> {{  item.comment ?? '' }}</div>    
                                                            </q-badge>
                                                                  <!-- q-chat-message 
                                                                  :name="(item.userName ?? '')+'.'+ String(item.phone ?? '')"
          
                                                                    
                                                                    
                                                                    :text="[item.comment ?? '']"
                                                                  
                                                                    :size="$q.screen.lt.sm ? '12' : '12'"
                                                                    text-color="dark"
                                                                    bg-color="orange"
                                                                    class="fontastyle transparent"
                                                                    -->
                                                            </q-item-section>

                                                  <div class=" row justify-between flex-center" >
                                                    <div class="text-orange">
                                                      <!--q-icon name="star"  /-->                                             
                                                      <q-btn round flat icon="edit" size="sm" @click="_this_foreignOperation._selectArray(index)"> </q-btn>
                                                      <q-btn round flat icon="done" size="sm" @click="_this_foreignOperation._updateArray(index)" v-if="__this_foreignBoxIndex == index"> </q-btn>
                                                      <q-btn round flat icon="delete" size="sm" @click="_this_foreignOperation._remove(index)" v-if="__this_foreignBoxIndex ==index "> </q-btn>
                                                    
                                                    </div>                                         
                                                    <q-item-label caption> {{  item.time ?? '' }}</q-item-label>
                                                  
                                                  </div>
                                                
                                                </q-item>
                  

                                              </div>
                                          
                                    
          
                                          </div>
          
                                        <q-list v-else >
                                          No Chats ( New) ll
                                        </q-list>  
op
                                      </q-list>                                           
                           
                                </div> 
                             
                                </q-tab-panel>

                                <q-tab-panel name="clients" class="col fit  no-margine no-padding">
                
                                <div class="col column q-pa-sm" v-if="_this_clientRows ?? false">   
                                    <q-list class="" style="width:100%;height:75svh">   
                                        <q-item class="col-auto row ">
                                          <q-list bordered class="col rounded-borders fontbstyle">
                                            <q-item style="background-color: orange;" class="column q-pa-none fontbstyle">
                                              <q-btn class="col justify-between q-pa-none"  >
                                                  <q-item-section class="fontastyle">
                                                    payIt Service
                                                  </q-item-section>
                                                  <q-item-section class="fontcstyle">
                                                    pay using telebirr                                          
                                                  </q-item-section>
                                                </q-btn>
                                              <q-btn class="col" > 
                                                    <q-item-section class="fontastyle">
                                                        Easy-pay
                                                      </q-item-section>

                                                      <q-item-section class="fontcstyle">
                                                        OnDelivery Payment                                         
                                                      </q-item-section>
                                                </q-btn>
                                            </q-item>

                                                <q-separator  inset />
                                                <q-card class="items-center" style="background-color:white;" v-if="_orderPayment =='ondelivery'">     
                                                  <q-card-section>                                              
                                                    <div  v-if="(_orderStep == 0) &&  (_this_clientforeign['orderID'] ?? false)" class="q-gutter-sm">
                                                      <q-item-label class="absolute-right q-px-sm fontastyle">Step - 1</q-item-label>                                            
                                                       
                                                     
                                                      <div class="fontcstyle" >  New OrderID : {{ _this_clientforeign['orderID'] }} </div>
                                                      <div class="q-gutter-sm q-gutter-sm row items-start q-pa-sm" >
                                                          <q-input filled v-model="_this_clientforeign['orderID']" class="col-auto" label="OrderID" stack-label :dense="true" readonly />
                                                        
                                                          <q-input filled v-model="_this_clientforeign['phone']" class="col-6" label="Phone_#" stack-label :dense="true" />                                 
                                                        
                                                          <q-btn color="indigo" no-caps  glossy unelevated  @click="_this_foreignOperation._submitArray()" label="Sent Order" :dense="true"/>
                                                      
                                                      </div>                                            
                                                    
                                                    </div>                                              
                                                    
                                                    <fieldset class="q-gutter-md row items-center q-px-sm q-py-none" style="border-radius: 5px;border:0px" v-else>  

                                                      <q-item-label class="absolute-top-right q-px-md  ">Just Ordered. <q-btn rounded size="sm" no-caps label="New Order" />
                                                                                        
                                                      </q-item-label>                                             
                                                      <legend class="flex justify-start q-py-none fontastyle">Your OrderID :<q-item-label caption> <q-badge >{{ _orderIntiatedID  }}  </q-badge>  </q-item-label> </legend>
                                                      <q-badge color="green" v-if="_orderConfirmDebuger"> {{  _orderConfirmDebuger  }}   </q-badge>                                            
                                              
                                                    </fieldset> 
                                                  </q-card-section>
                                                </q-card>

                                              
                                              </q-list>
                                        </q-item> 
    

                                        <q-separator spaced inset />
                                           <div class="col column fit" v-if="_this_clientRows?.length ?? false"   >  

                                              <q-item  class="col-auto q-pa-xs" >
                                                <q-badge outline color='green' > {{ _this_clientRows.length }} : {{  _orderDebuger }}</q-badge>
                                              </q-item>

                                              <div class="col scroll-area" style="overflow-y: auto;" >                                                
                                                  <q-item v-for="item,index in _this_clientRows" :key="index"  class="col column">  
                                                         
                                                    <q-item-section >

                                                      <div class="row justify-between items-end q-gutter-sm ">
                                                        <div class="q-py-sm" v-if="item?.['served'] ?? false">

                                                                <div v-if="item['served'] == 'Requested' ?? false " >
                                                                  <q-badge color="red" size="sm" >Ordered.</q-badge>
                                                                </div> 
                                                            
                                                                <q-item-label style="" class="fontastyle" >
                                                                  <q-avatar size="14px"  :color="item['served'] != 'Queed' ? 'orange' : 'green'"></q-avatar>
                                                                    <template v-if="_is_thisOwner || item?.['userID'] == Objprops.userID" >{{item.phone}}
                                                                    </template> 
                                                                    <template v-else> {{item.fphone}}
                                                                    </template> 
                                                                    #{{item.orderID}}
                                                                    <q-tooltip> Serve Status : {{ item.served }} </q-tooltip>
                                                                </q-item-label>                                                   
                                                        </div>
                                                          <!---- is current loged user/client--> 
                                                          <div  v-if="_is_thisOwner"> 
                                                                <q-btn round color='blue' size="sm" flat icon="edit" @click="_this_foreignOperation._selectArray(index)"> </q-btn>
                                                                <q-btn round flat size="sm" icon="done" @click="_this_foreignOperation._updateArray(index)" v-if="__this_foreignBoxIndex  == index"> apply </q-btn>
                                                                <q-btn round flat size="sm" icon="delete" @click="_this_foreignOperation._remove(index)" v-if="__this_foreignBoxIndex == index "> </q-btn>
                                                          </div>
                                                          <div v-else-if="item?.['userID'] == Objprops.userID">
                                                            <q-btn round flat color='orange' icon="edit" @click="_this_foreignOperation._selectArray(index)" > </q-btn>
                                                              <!--q-btn round flat icon="done" @click="Update_this(false)" v-if="__this_foreignBoxIndex == index"> </q-btn-->
                                                              <q-btn round flat icon="delete" @click="_this_foreignOperation._remove(index)" > </q-btn>                
                                                    
                                                            </div>
                                                                                            

                                                    </div>               
                                                    <div class="row q-gutter-sm " v-if="__this_foreignBoxIndex == index " >
                                                              <q-item-label style="" >
                                                                  <q-input  autogrow filled class="col fontastyle" 
                                                                  :shadow-text="textareaShadowText"
                                                                        @keydown="processTextareaFill"
                                                                        @focus="processTextareaFill" 
                                                                         v-model="item['description']" 
                                                                        label="Delivery Remark" stack-label :dense="true"  />                                                                      
                                                              </q-item-label>   

                                                              <q-item-label style="" class="col fontastyle">
                                                                
                                                                <q-select
                                                                :dense="true"
                                                                      filled
                                                                      v-model="item['served']"
                                                                      :options="['Requested','Queed','Served']"
                                                                      use-chips
                                                                      stack-label
                                                                      label="Served Status"
                                                                    />                                                                           
                                                                    
                                                              </q-item-label>   
                                                      </div> 
                                                      <div class="justify-between row q-gutter-sm" v-else >
                                                        <div class="col column rounded-borders bg-grey-3 q-pa-xs " v-for="k in ['quantity','price','paymentMethod']" :key="k"  >

                                                        {{ k}}
                                                            <q-item-label class="fontastyle"> {{ item[k]}} </q-item-label> 

                                                        </div>                                                                                                          

                                                      </div>    
                                                    </q-item-section>
                  
                                                    <q-item-section>                                     
                                                          <div class="text-orange row justify-between fontastyle"> 
                                                                <q-item-label class="row justify-start items-center " >Remark: <q-item-label class="text-black q-px-sm" caption> {{item['description']   }} </q-item-label>
                                                                </q-item-label>

                                                                <q-item-label caption> {{  item.time.split(',')[0] ?? ' ' + item.time.split(',')[1] ?? ' ' }}</q-item-label>
                                                                
                                                          </div>                                                                     
                                                            
                                                    </q-item-section>

                                                </q-item>
                                             </div>
                                             </div>
                                            
                                              <q-list v-else>
                                              No Clients ( Buyers)
                                            </q-list>  

                                      </q-list>

                                </div>

                          
                                </q-tab-panel>

                              </q-tab-panels>

                        </q-card>
                    <!---------Mobile----sideBox_show (comment & client) Ends-->
                    </q-tr>
                  </template>
              </q-table>
  
              <q-table v-else-if="_contenting == 'cards'"
                flat 
                bordered
                
                :rows="_this_Rows"
                :columns="columns"
    
                virtual-scroll

                :filterMethod="_thisFiltering"
                :filter="filter"

                row-key="id" 
                rowIndex="true"

                grid
                grid-header

                :inFullscreen="true"
                class="col q-gutter-xs row q-px-md justify-end"

                hide-pagination
                :pagination="pagination"

                hide-top
                hide-bottom
                style="min-width:100vw;padding-top:5vh;"
                >

                <template v-slot:top="props" v-if="false">
                    <q-btn class="hidden"  style="height:0px;width:0px"   ref="togflscreen" :set="enableflscreen = props.inFullscreen" @click="props.toggleFullscreen()" />
                </template>  

                <template v-slot:header="props">
                  <q-tr :props="props"  class="col-auto column q-px-md transparent" style="backdrop-filter:blur(5px);position:fixed;z-index:1;" :style="$q.screen.lt.sm ? 'top:8vh' : 'top:7vh'"  >
                   
                    <q-scroll-area  class="col-grow column transparent flex flex-center" style="min-width:95vw;">
                      <div class="col-grow flex flex-center q-gutter-sm q-px-md transparent no-wrap " style="min-width:100%;max-height:100%;"> 

                                              <q-separator inset vertical class='q-py-sm'  />

                                            <q-btn rounded no-caps color="orange"  @click="_this_Query(null,'',16)"  class="col-auto fontdstyle"  >
                                             Show All       
                                            </q-btn>
                                              
                                            <q-separator inset vertical class='q-py-sm'  />
                                            <q-btn rounded no-caps size="sm" v-for="_qvalue0,_qgroup0 in saleCatagory"  
                                            @click="_this_Query('catagory',_qgroup0,_qvalue0)" :key="_qvalue0" class="column col-auto q-py-xs fontcstyle" :class="_thisQuery['catagory'] == _qgroup0 ? 'bg-orange text-white' : ''" >
                                                 
                                              <div v-if="_thisQuery['catagory'] == _qgroup0" class="col fit fontastyle"> {{  _qgroup0 }}  </div>     
                                              <div class="col" v-else> {{  _qgroup0 }}   </div>
                                            </q-btn>                    
                                            <q-separator inset vertical class='q-py-sm'  />
                                            <q-btn rounded no-caps size="sm"  v-for="_qvalue1,_qgroup1 in saleUsage" 
                                            @click="_this_Query('catagory',_qgroup1,_qvalue1)" :key="_qvalue1" class="col-auto fontcstyle"  :class="_thisQuery['usage'] == _qgroup1 ? '' : ''">
                                            <div v-if="_thisQuery['usage'] == _qgroup1" class="col fit fontastyle"> {{  _qgroup1 }}  </div>     
                                              <div class="col" v-else> {{  _qgroup1 }}   </div>
                                            </q-btn> 

                                            <q-space />                                                        
                                            <q-btn
                                                flat round dense
                                                :icon="enableflscreen ? 'fullscreen_exit' : 'fullscreen'"
                                                @click="$refs.togflscreen.click()"
                                                class="q-ml-md"
                                              />
                      </div>

                      
                  </q-scroll-area>             
                 
                  </q-tr>
                </template>
              
                   <template v-slot:item="props">

                    <q-tr :props="props" class="q-gutter-sm transparent  column  q-tr--no-hover col-shrink  fontbstyle"                            
                  >
                    <div class="col  q-gutter-sm  column" v-if="props.row?.saleitgr ?? false">
                              <q-card class="col-auto column fontbstyle" flat bordered>
                                  <q-img :src="props.row.saleitgr[0]"
                                    style="aspect-ratio: 1/1;width:100%;" class="col q-pa-xs">

                                      <div class="q-gutter-xs transparent">
                                          <q-btn v-if="(props.row?.price ?? false) && (props.row?.quantity ?? false)" no-caps class="fontdstyle" color="orange" :dense="true" size="sm" label="Buy Now"
                                          @click="_this_RowActivator(props.rowIndex,'clients')"
                                          />
                                          <q-btn no-caps class="fontdstyle" color="teal" :dense="true" size="sm" :label="_onPlayLanguage? 'Zembile' : 'ADD To My Cart'"
                                          @click="_this_ActiveOperation._toCart(props.row.id,'clients')"
                                          />
                                          <q-card class="col relative-top z-top q-pa-sm items-end column" v-if="__thisIndex == props.rowIndex" style="min-width:10vw">
                                            <div class="col-grow row q-gutter-xs fontdstyle">
                                                <div>
                                                  Quantity
                                                </div>

                                                <div class="row">
                                                  <q-btn rounded  size="sm" @click="_this_clientforeign['quantity'] = parseFloat(_this_clientforeign['quantity'] ?? 1) -1" > -</q-btn>
                                                  <q-btn color="orange" size="md" class="q-mx-xs"  :label="_this_clientforeign['quantity']"   />
                                                  <q-btn rounded size="sm"  icon="add" @click="_this_clientforeign['quantity'] = parseFloat(_this_clientforeign['quantity'] ?? 1)+1"   />

                                                </div>

                                                <div class="col-auto row items-end fontdstyle">   
                                                  <q-btn flat no-caps class="fontestyle" :label="_this_clientforeign['quantity'] * props.row.price +' '+ currency"  />    
                                                </div>
                                            </div>
                                            
                                         

                                              <div class="col-grow z-top q-pa-none row justify-end">
                                                <q-btn :dense="true" size="sm" color="orange" class="fontestyle" label="Buy Now" @click="_this_foreignOperation._submitArray()"  /> 
                                              </div>

                                          </q-card>

                                      </div>
                                    </q-img>

                                  <q-card-section class="col-auto q-gutter-xs  fontastyle" style="background-color:whitesmoke">                                  
                                    <div class="row q-gutter-xs no-wrap justify-between fontdstyle">

                                      <div class="col row items-center fontastyle"><q-icon name="phone" /> {{props.row.fphone}}   {{props.row.userName}}</div>
                                     
                                      <div class="col-grow column items-end q-gutter-xs fontastyle "> Price: {{props.row.price}} <div >Quantity: {{ props.row.quantity}}</div></div>
                                          
                                    </div>

                                    <div class="row no-wrap items-center q-py-sm q-gutter-md fontastyle justify-between">
                                      <div>                                      

                                          <q-item-label> 
                                            <q-rating v-model="props.row._itServiceRating" :max="5" size="xs" @click="_this_ActiveOperation._rating(__thisIndex)"/>
                                            <q-tooltip class="bg-black">Product Reliability Score</q-tooltip>
                                          </q-item-label>
                                          <q-item-label>{{ props.row.catagory }} ({{ props.row.usage }})</q-item-label>
                                      </div>
                                     
                                      <q-btn no-caps color="orange" class="text-black" :dense="true" @click="_this_Query('id',props.row.id)"  label="View" />                                    
                                       
                                      </div>
                                  
                                  </q-card-section>

                            </q-card>
                    </div>
                

                  </q-tr>

                  </template>

                </q-table >
                
                <q-table v-else  >
                </q-table>
        </div>
   
      <!-- sckelton of single_content-->
        <div class="col q-py-md fit q-gutter-md transparent flex flex-center column" style="" v-else>

          <q-card  style="width:90%" class="col-1 q-gutter-xs transparent row">
            <q-skeleton class="col" square v-for="i in [1,2,3,4,5]" :key="i"/>
          </q-card>

          <q-card  style="width:60%" class="col-grow q-pa-xs row q-gutter-xs">

            <q-skeleton class="col-grow"  />
            <q-skeleton class="col-4" square />

            </q-card>

            <q-separator inset />
            please wait, while fetching data....
        </div>


      <!----------------------LiveDATA Banner-->

      <!------------Zooming Level Adjuster Sticky-------------------------->
  
</q-page>

    </template>
    
    <script setup>
  //_____________________________________________Modules Definitions
  //-------------------------------------------------------------Importing System Modules
  import { ref,computed,watch,onUnmounted, onMounted } from "vue";
  import { toRaw } from 'vue'
  import { refAutoReset, useLocalStorage } from '@vueuse/core'
  import { matThumbUp } from '@quasar/extras/material-icons'

  import {useQuasar, useMeta } from "quasar";
  //import print from 'print-js';
  import { useRouter } from "vue-router";
  //import { storeToRefs } from "pinia";
  import { saleitStore } from "stores/dataStores/saleitStore"; //saleit Store ( Main Store)
  import { saleitcliStore } from "stores/dataStores/saleitcliStore"; //saleit Store ( Main Store)
  import { chatStore } from "stores/dataStores/chatStore"; //saleit Store ( Main Store)
  import { thisStore } from "stores/dataStores/thisStore"; //saleit Store ( Main Store)
  import { genapiStore } from "src/stores/jstStores/genapiStore";
  
  import { saleitSchema } from "src/composables/schemas/saleitSchemas";
  import { _permission } from "src/composables/schemas/profileSchemas"; //acctype//userRole Schema

  import {schemaSklt} from "src/composables/schemaSklts";

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
  const chatService = chatStore();
  const genapsaleitContentOps = genapiStore(); //import { genapiStore } from "src/stores/jstStores/genapiStore";
  //-------
  //////////////////////////////////////////--------------Axios Wrapper UUUUUUPPPPPPPPPPPP
  //-------------USER PROFILE_Variables..
  let Objprops = defineProps({
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
    //--------------
    //-------------------(layout tunnel for command datas(signal))
    lytCreatRow : { type: Boolean, default: false },
    //--------Search Button Signal  
    lytSearchRow : { type: String, default: '' },
    _onPlayNavMedia : { type: String, default: '' },
    //----------
    _onPlayLanguage : { type: String, default: '' },
  });
//---------------------------
var Loading=ref(false)
var DoneMessag=ref(false)
var KnowthisMessage=ref(false)
var WarnthisMessage=ref(false)
//------DIALOGS  
  async function timerLoading(period = 6000, message = "") {Loading.value=message;setTimeout(() => {
    Loading.value=false
  return false;}, period);
}
async function timerDone(period = 6000, message = "") {DoneMessag.value=message;setTimeout(() => {
  DoneMessag.value=false
  return false;}, period);
}
async function timerInformthis(period = 6000, message = "") {KnowthisMessage.value=message;setTimeout(() => {
  KnowthisMessage.value=false
  return false;}, period);
}
async function timerError(period = 6000, message = "") {WarnthisMessage.value=message;setTimeout(() => {
  WarnthisMessage.value=false
  return false;}, period);
}

//===-----_--------THE MODEL/ MAIN_DATA....
let _thisModel = "saleit"; // the Vue_Page_DataModel (Listing Collection Name)
const _thisapiUrl='/saleitapi/saleit'
let _thisSchema=saleitSchema

//---current Modal Specific_privileges_analysis (SALEIT Role and Responsiblities ++ Stages)
let _isGroupof = ref(null)
let _isRoleof = ref([])
let _isCapabelof=ref([])
let _isStageeof = ref([])
let gen_modal_iss = computed(() => {
    //------------------All Groups && Permission && Roles
    let _modal_iss= Objprops._issModal[_thisModel] ?? false
    //------------------This Modal GroupName && Permission && Role
    let _thisIss= Objprops._iss[_thisModel] ?? false
    if(_thisIss){
      let group= _thisIss['group'] ?? false
      let stage= _thisIss['accstage'] ?? false
      let role= _thisIss['role'] ?? false
      let capability= _thisIss['capability'] ?? false
      //-------setup the users permissions_sets
      _set_iss(group,stage,role,capability)
      //-----Return Total Roles of Model
      return _modal_iss['role'][0]
    }
    return _modal_iss['role'][0]
  } )
async function _set_iss(group,stage,role,capability){
    _isGroupof.value=group ?? null;
    _isStageeof.value=stage ?? null
    //------------------All Groups && Permission && Roles
    _isRoleof.value=role ?? null
    _isCapabelof.value=capability ?? null
    return true
  }

//==============================================------------------------------------
  let enableflscreen =ref(true)
  //--------------
  let columns = ref([]); //Actual Table_Columns ++Descriptions
  let _allColumnNames = ref([]); //Actual OuterMost Table_Column_Names [Top(Layer_1] _Columns _Name_List]
  let _rolesColumns = ref([]); //Filtered/Authorized_Table_Columns ++Descriptions for Editing/Adding.... but not Viewing
  //------column invisiblity on table_
  //columns_filter()-------- which to displayOn REgisterations form
  let lockedColumns = ref([ "userID","userName"]); //are blacklist of columns tobe not shown during the Registerations..form submitting
  //let tableZooming =ref(1)
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
//===============================================-----------------------
//Columns to be Redefined
let _thisModels = []
let _clientModels = []
let _commentModels = []
//-------------Syncing Columns
columns = computed(() => { 
    //if (Object.values(Objprops).length === 0) { //is User_Fully_Authenticated &&  or Return Null_Columns
    //  return [{}];
    //} else {

      let _tableColumn = []; //HOLDING_  all the ---"Columns"--- of the Data_model ( TOTAL Columns)
      let _visibleColsName = [];  ////--HOLDING_ all the ---"Visible" Columns"---- of the Data_model ( TOTAL Columns)

      //-------<<<<>>>>-------Preparing this_model role_schemas
      let rolesWall = gen_modal_iss.value['enum']//?.['role'] ?? false
      for (let schemaColumn in _thisSchema) {
        //----------------loging all columns_ as table columns_format
        let _col = { name: schemaColumn,schema: _thisSchema[schemaColumn], }; //the q-table format of Column Definitions... && Hold Every Columns
        _tableColumn.push(_col); 
        //----------------loging all columns name as normal list format
        _allColumnName(schemaColumn); 
        //---------------loging Visible Columns list(on table)
        invisibleColumns.includes(schemaColumn) ? "" : _visibleColsName.push(schemaColumn);
        //----
        //----------------loging Role Based  && whitelisted Columns-Start
        if (schemaColumn === "extraColumn" || lockedColumns.value.includes(schemaColumn)) { //if columns is locked(for not display or analysis).. passit.
          continue;
        } else {
          try{ 
                if(_isRoleof.value.includes('***')){  ///if user_ hass full access
                  _rolesColumn(_col);
                }
                else if(_isRoleof.value.includes('**')){ //use has semi_full access
                  _rolesColumn(_col);
                  }
                else if(_isRoleof.value.includes('*')){ //user has specified accesss with 1strickes ===['clientFlag','*'] 
                    if(rolesWall.includes(schemaColumn)){ //excludes specifed columns
                      continue
                    }else{ _rolesColumn(_col);} //gives all other thatn specifiec columns
                  }
                else {
                    if(_isRoleof.value.includes(schemaColumn)){ // ===['clientFlag',"StatusFlag"] 
                      _rolesColumn(_col); 
                    }
                  }
          }catch{}                 
        }
        //------------------------roleBase Columns-End
      }
      //------<<<>>>-------------------
      //--------------------------build other columns_set by roleBase or just Listing
      //------==== building columns of thisMoel (with customizable columns listing)
      _thisModels = ['phone',"userName","geolocation",'location','phoneCode'] //

       //------==== building columns of thisMoel (Defined Schema-0)
       _clientModels = ['orderID',"quantity","saleitID",'userID','userName','phone',
      'confirmID','served','phoneCode','geolocation','location'] //
      //-------------------------(Defined Schema-1)
      _commentModels = ['saleitID',"userID","phone",'userName','time'] //

      _model_Defaulting();
      visibleColumn(_visibleColsName);
      return _tableColumn;
    //}
  });
  const _allColumnName = async (schemaColumn) => _allColumnNames.value.push(schemaColumn); //Holding topLayer Name of Columns
  const _rolesColumn = async (_col) =>  _rolesColumns.value.push(_col);  //( Object List of author_columns Details)
  const visibleColumn = async (visibleCols) =>  visibleColumns.value = visibleCols; //.slice[0,_allColumnNames.value.length]
  //------------------------------------------
  async function _model_Defaulting() {
    if (!_rolesColumns.value.length) {
      _thisDefault.value={};      
      return false;
    }    
    return await schemaSklt(_rolesColumns.value).then(async (_this_Sckelton)=>{
      _thisDefault.value= await _modal_Defaulting(_this_Sckelton);
      console.log('defaultitems',_thisDefault.value,_thisDefault_client,_thisDefault_chat)
      return true
    }).catch((error)=>{_thisDefault.value={};return true })
  }


const _genOrderID = async()=>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    var result = ''
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result 
  }
async function _modal_Defaulting(_this_Sckelton) { //should excute once on boot or on changing location(geolocation)
    //------------------------Useable Values
     //-------------Primary Data Model  (primary _this_)
    for (let kkey of _thisModels) { //modify column's updateable data
    _this_Sckelton[kkey] = Objprops._profile[kkey] ?? ''
    }
    //--------------Client_Data  Model (Secondary _this_)
    for (let kkey of _clientModels) { //modify column's updateable data
    _thisDefault_client.value[kkey] = Objprops._profile[kkey] ?? ''
    }
    _thisDefault_client.value['orderID']=await _genOrderID()
    _thisDefault_client.value['quantity']=1
    _thisDefault_client.value['userID']=Objprops.userID
    _thisDefault_client.value['served'] = 'Requesting' ; //Requesting.... is let'us know it's new Order

    //-------------Primary Data Model  (primary _this_)
    for (let kkey of _commentModels) { //modify column's updateable data
    _thisDefault_chat.value[kkey] = Objprops._profile[kkey] ?? ''
    }
    _thisDefault_chat.value['userID']=Objprops.userID
    //_thisDefault_chat.value['time']=new Date().toLocaleString();
    //------------Exiting Default(primary data Model)
    return _this_Sckelton
  }

//---------form Validation_Rules
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
  //-----------------------DATAs ROWs--------------
  let _contenting=ref('main')//handle two tables

  let _contentingliveStatus=ref(20000)
  let _contentingcliliveStatus=ref(20000)
  var currency=ref('Birr') 
  //--------------------------
  let _this_Rows = ref([]); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
  let _this_chatRows = ref([]); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
  let _this_clientRows = ref([]); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
  //===============================================-----------------------------------------
    //-------------------secondary && thrisiary models Default 
  let _thisDefault_chat=ref({})
  let _thisDefault_client=ref({})
  let _this_clientforeign = ref({}); //the selected row_actual_Data..as object
  let _this_chatforeign = ref({}); //the selected row_actual_Data..as object

  //------------- MODAL ROWs_ MANAGMENT
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
  let __this_foreignBoxOps = ref(null); //editing,deleting,creating
  let __this_foreignBoxOpsStatus =ref(null)

  //-------
  let _is_thisOwner=ref(false)
  let _is_clientOwner=ref(false)
  let _is_chatOwner=ref(false)
  //--------------------CONTENTING (CREATING  && EDITING....) ====STARTS
let __thisBox_CDialog = computed(() => { return Objprops.lytCreatRow}) //Layout_listening for pop_creator
watch(__thisBox_CDialog, async (cv, ov) => {
   await _resetBox(_thisDefault.value,'CreateRowItem',null)
   return true
  }); 
async function __thisBox_UDialog(_playrowIndex){
    await _resetBox(_this_Rows.value[_playrowIndex],'UpdateRowItem',_playrowIndex)
    return true
  }
async function _resetBox(_rows,onplayOps,_playrowIndex){
    _this.value = Object.assign({},_rows) //----assigning Onplay Row
    __thisIndex.value = _playrowIndex;//------------assigning Onplay Row Index
    __thisOps.value =onplayOps
    __thisOpsStatus.value=false

    //__this_foreignBoxOps.value='clients'
    __this_foreignBoxOpsStatus.value=false

    __thisBox.value  = true; //OPen the Box

    return true
  }

//--------------------------------ROWS_SCHEMATIC FORMS 
let _n =0
const pageSize = 50
//const lastPage = Math.ceil(allRows.length / pageSize)
let pagination= ref({ rowsPerPage: 200 })
//--------------------------------------------------
_this_Rows = computed(() => { //Updating is comming
  return _computeRows(saleitService.getDatas)
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
let syncerrorData=ref(true) //No Data Founded..... Listners  ( untill there is Data Founded)
syncerrorData = computed(()=>{
let _checkfound= saleitService.getstatus_Rows ?? false
let _message=_checkfound ? null : 'No Updates.';
return _message})  //true()/false
//----------------------------------


let syncInt=''
let synccliInt=''
//------------------Quering and SE_settings
var _thisQuery={} //_trend:'', catagory:'',usage:'New',content:''
var _thisQuery_Meta={} //_trend:'', catagory:'',usage:'New',content:''
var _buttonQueries={} //_trend:'', catagory:'',usage:'New',content:''
//--------------clientQuery
//Init_set default query and setInterval of 1000(1sec)  
const saleCatagory = {"Households":'10',"Clothing":"25",
"Food":"35",
"Electronics":'50',"Vehicles":'75',"Land/House":'100',"Others":'1'}
const saleUsage = {"New":'100',"Used":'75',"Others":'1'}

async function _thisRowSync(){ //Queries for LiveSyncing of Rows_One
  
  //await _resetOnPlayRowItem()
  __thisIndex.value=null
  __thisOps.value=null
  //------------switching view
  clearInterval(syncInt)
  //-------------Building Query
  //_thisQuery =  _buildQuery(_queKey,_value)
  //-----------------------Building Query
   saleitService.set_syncLock(false)
   saleitService.asyncDatas()

  setTimeout(function(){
    clearInterval(syncInt)
    syncInt = setInterval(saleitService.asyncDatas, _contentingliveStatus.value)
  }, 5000);
  return true
}

//--------------------2ndary
//-------instead of syncing secondary_data (use function)
let _clientQuery = ref({})
async function _this_clientSync(){
  return await saleitcliService.readFData(_clientQuery.value).then((res)=>{
              
              if(res){
                _this_clientRows.value=res //Object.assign(_this_clientRows.value,res)
              }__this_foreignBoxOpsStatus.value=false
              return true
            })
}
//--------------------3ndary
let _chatQuery = ref({})
async function _this_chatSync(){
  return await chatService.readFData(_chatQuery.value).then((res)=>{
              _this_chatRows.value=[]
              if(res){
                _this_chatRows.value=res//Object.assign(_this_chatRows.value,res)
              }__this_foreignBoxOpsStatus.value=false
              return true
            })
}
///-------------- _this_chatRows --
clearInterval(syncInt);
saleitcliService.set_syncLock(true)
chatService.set_syncLock(true)
saleitService.set_syncLock(true)
//_this_clientSync()
//-----------------------
_this_Query()

onUnmounted(async () => { 
    // Clear the interval when the component is destroyed to avoid memory leaks
    clearInterval(syncInt);
    saleitcliService.set_syncLock(true)
    saleitService.set_syncLock(true)
    return true
 });

 async function _this_Query (_queKey=null,_value=null,_qvalue=null){
_thisQuery_Meta={}

if(_queKey){ //user_defined searchings
      let _thisQuery_Old =(_thisQuery['qweight'] ?? [1,1,1,1])
      _thisQuery={}
      if(['catagory','usage','trend'].includes(_queKey)){

        _thisQuery['qweight']=[1,(saleCatagory[_value] ?? (_thisQuery_Old[1] ?? '1')),
        (saleUsage[_value] ?? (_thisQuery_Old[2] ?? '1')),3]

        console.log((_thisQuery,_thisQuery_Old[1] ?? '1'),'catagory.......',_thisQuery_Old)

          // _thisQuery['qweight']=1 +'-'+ (saleCatagory[_value] ?? (_thisQuery_Old[1] ?? '1')) +'-'+
          //   (saleUsage[_value] ?? (_thisQuery_Old[2] ?? '1'))+'-'+ 3
            
          _thisQuery_Meta['catagory']=saleCatagory[_value] ?? (_thisQuery[1] ?? '1')
          _thisQuery_Meta['usage']= saleUsage[_value] ?? (_thisQuery_Old[2] ?? '1')

      }else{
        _thisQuery[_queKey]=_value//_queKey == 'id' ? {'id':_value} :"" 
      }
  }else{ //searching by id or profileSearch
    _thisQuery={}
    if(_value){ //if _value(with no key),.. show only userSpecific data
      _thisQuery['id']=_value
    }else{ //show trend && _userWeights
      let _history= sessionStorage.getItem('qw').split(',') ?? [1,1,1,2]
          //_thisQuery['qweight']=1+ '-' + _history[1] +'-'+_history[2] +'-'+ 2
          _thisQuery['qweight']=[1, _history[1] ,_history[2] , 2]
    }
  }
await saleitService.set_syncQuery(_thisQuery)
_contenting.value = _queKey ? 'main' : 'cards'
 _thisRowSync()
return true
}

async function _this_clientQuery (){
  if(!_is_thisOwner.value){ //Content Owner is on client_link(show all)
              //_clientQuery.value['userID']=Objprops.userID
            }
  _clientQuery.value['saleitID']=_this.value['id']
  _clientQuery.value['store']='buy'
  _this_clientSync()
  //await saleitService.set_syncQuery(_thisQuery)
  _this_clientforeign.value=Object.assign({},_thisDefault_client.value)  
  _this_clientforeign.value['saleitID']=_this.value['id']  //----------- contentIDs

  __this_foreignBoxIndex.value=null
  __this_foreignBoxOpsStatus.value=true
  return true
}

async function _this_chatQuery (){
  _chatQuery.value['saleitID']=_this.value['id']
  _this_chatSync()
  //await saleitService.set_syncQuery(_thisQuery)
  _this_chatforeign.value=Object.assign({},_thisDefault_chat.value)  
  _this_chatforeign.value['saleitID']=_this.value['id']  //----------- contentIDs
  
  __this_foreignBoxIndex.value=null
  __this_foreignBoxOpsStatus.value=true
  return true
}
 //-----searaching on/off
let _enableRowFilter=ref(false)
//------------Setting up all the search attributes
const filter = computed(() => {
  return {
    search: Objprops.lytSearchRow,
  }});

  //-------------the search Engine..
function _thisFiltering(rows, terms) {
    if(_enableRowFilter.value){
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
let _orderDebuger=ref('Orders List..')//
let _orderIntiatedID=ref('')

//---------Order_Confirmations Stage
let _orderConfirmDebuger=ref(false)
let _orderPayment=ref(false)
//----- --
//---------------ACTIVE Operating on Row
 //Operating without setting onplayrowItem ( directlly calling for effect) === active _operations
 let  _this_ActiveOperation = {
      _rating : async (_onplayrowIndex) =>{

        _this.value = {'id':_this_Rows.value[_onplayrowIndex]['id'],
        '_itServiceRating':_this_Rows.value[_onplayrowIndex]['_itServiceRating']} //DeepCopy Handle Reactivity

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

        _this.value = {'id':_this_Rows.value[_onplayrowIndex]['id']} //DeepCopy Handle Reactivity

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
            _this_Query(null,Objprops.userID)
          } 
          return true;
        }).catch((error) => { return false; });
      },
      //------------special Operations
        _toCart:async (tocartID=null) =>{
        _this.value={}
        let _onplay = _thisDefault_client.value ?? {}
        _this.value['clients']=_onplay//.push(_onplay); //or use below
        _this.value['clients']['store']= 'cart'

        _this.value['id']= tocartID
        //_this.value['userID']=Objprops.userID

        _this.value['onplayOps']='clients'    
        _this.value['onplaySubops'] = 'create'   
        //--------Set Options Paramers
        return await Crud_this.updateData()
        .then(async (response) => {
          if (response) { 
            __this_foreignBoxIndex.value=null
            _this_Rows.value[__thisIndex.value]=response//Object.assign({},response)
            //_orderDebuger.value='Ordered'
            //----Timer Done
            timerDone(5000,'Succefully Added.')
          } return await _this_clientSync()
      }).catch(async (error)=>{
        timerError(5000,'Order Error.'+error)
        return true })
  } 
}
//-------Listening for SideBox Operations & Visualizing
async function _this_RowActivator(_thisindex=null,Ops=null,_foreignIndex=null){
    //------------------------------- 
    if((__thisIndex.value == _thisindex) && (Ops == __this_foreignBoxOps.value)){
          __thisIndex.value = null;//close sideBox
          saleitService.set_syncLock(false)
          return true    }
          saleitService.set_syncLock(true)
          //--------assing current indexes
          __thisIndex.value = _thisindex ?? __thisIndex.value;
           //------disable status
          __thisOpsStatus.value=false
          __this_foreignBoxOpsStatus.value=true
          //-------create current Row Object
          let _onplayRI = Object.assign({},_this_Rows.value[_thisindex])
          _this.value = _onplayRI//Object.assign({},_onplayRI) //DeepCopy Handle Reactivity
          _is_thisOwner.value= _onplayRI['userID'] == Objprops.userID
          //--------------------loading is on fetchData or do somethingg
          if(Ops == 'clients'){
            _this_clientRows.value=[] 
              _this_clientQuery()
          }else{
            _this_chatRows.value=[] 
               _this_chatQuery() 
            }

            __this_foreignBoxOpsStatus.value = !_this_chatRows.value.length
            _fileAsStringIndex.value=null
          //--------assign current operations
          __this_foreignBoxIndex.value = _foreignIndex;
          __this_foreignBoxOps.value=Ops
          __this_foreignBox.value= true
          return true 
          //------------
  }
//------operations OVer POP_Up_Box
let _this_foreignOperation ={
      //--------------------------
  _add:async ()=>{ //default_value for sideBox
    __this_foreignBoxIndex.value = null;
    if(__this_foreignBoxOps.value == 'clients'){
        _this_clientforeign.value=Object.assign({},_thisDefault_client.value)
        _is_clientOwner.value= _this_clientforeign.value['userID'] == Objprops.userID
      }else{
        _this_chatforeign.value=Object.assign({},_thisDefault_chat.value)
        _is_chatOwner.value= _this_chatforeign.value['userID'] == Objprops.userID
      }
      return true
  },
    //---Enabling Array_Index_For Operations (Select_Index)_For ---Editing:Deleting--Applying--
  _selectArray:async(arrayIndex=null)=>{ // activate give array for operations of below options --
      __this_foreignBoxIndex.value = (__this_foreignBoxIndex.value == arrayIndex) ? null : arrayIndex
     
      if(__this_foreignBoxOps.value == 'clients'){
        _this_clientforeign.value=__this_foreignBoxIndex.value ? 
        Object.assign({},_thisDefault_client.value):
        Object.assign({},_this_clientRows.value[arrayIndex])        
        _is_clientOwner.value= _this_clientforeign.value['userID'] == Objprops.userID
      }else{
        _this_chatforeign.value=__this_foreignBoxIndex.value ==null ? 
        Object.assign({},_thisDefault_chat.value):
        Object.assign({},_this_chatRows.value[arrayIndex])       
        _is_chatOwner.value= _this_chatforeign.value['userID'] == Objprops.userID
      }
      //----Defaulting foreign Links for main
    return true;
  },
  //-----------Operations on selected array
  _remove:async (arrayIndex=null)=>{
    //---set loads
    if(__this_foreignBoxOps.value == 'comments'){
      _this.value ={'id':_this.value['id'],'comments':_this_chatforeign.value}
    }else{
      _this.value ={'id':_this.value['id'],'clients':_this_clientforeign.value}
    }
     //-----set parameters
    _this.value['onplayOps']=__this_foreignBoxOps.value
    _this.value['onplaySubops'] = 'delete'

    //--initiate seting Boxes
    return await Crud_this.updateData()
    .then(async (response) => {
      if (response) { 
            //----updating saleitcontent
            _this_Rows.value[__thisIndex.value] =response

            if(__this_foreignBoxOps.value == 'clients'){
               await _this_clientQuery() 
            }else{
              await _this_chatQuery() 
            } //----updating clientData
          } 
          return true
          //return await _this_Sync()//await _this_RowActivator(null,__this_foreignBoxOps.value,null).then(()=>{return true })
    })
  },
  _updateArray:async (arrayIndex=null)=>{
       //--------updating Content ()---
        if(__this_foreignBoxOps.value == 'comments'){
            _this.value ={'id':_this.value['id'],'comments':_this_chatforeign.value}
        }else{
            _this.value ={'id':_this.value['id'],'clients':_this_clientforeign.value}
        }
        _this.value['onplayOps']=__this_foreignBoxOps.value
        _this.value['onplaySubops'] = 'update'   
        //--initiate seting Boxes
        console.log(_this.value,'updating foreight data=====')
        return await Crud_this.updateData()
        .then(async (response) => {
          if (response) { 
            //----updating saleitcontent
            _this_Rows.value[__thisIndex.value] =response
            if(__this_foreignBoxOps.value == 'clients'){              
               await _this_clientQuery()
            }else{
              await _this_chatQuery() 
            }
            timerDone(5000,'Succefully Submitted')
          } 
          return true
        })
  },
  _submitArray:async ()=>{
       if(__this_foreignBoxOps.value == 'comments'){
          _this.value ={'id':_this.value['id'],'comments':_this_chatforeign.value}
       }else{
          _this.value ={'id':_this.value['id'],'clients':_this_clientforeign.value}
       }

        _this.value['onplayOps']=__this_foreignBoxOps.value
        _this.value['onplaySubops'] = 'create'  
        //--initiate seting Boxes
        return await Crud_this.updateData()
        .then(async (response) => {
          if (response) { 
            //----updating saleitcontent
            _this_Rows.value[__thisIndex.value] =response
            if(__this_foreignBoxOps.value == 'clients'){
                //_this_clientRows.value.unshift(_this_foreign.value) //temporarlly filling
                //_this_clientRows.value=[]
                 await _this_clientQuery()               
            }else{
                //_this_chatRows.value.unshift(_this_foreign.value) //temporarlly filling
                //_this_clientRows.value=[]
                await _this_chatQuery()
            }
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
        let _onplay = _this_clientforeign.value
        _this.value[__this_foreignBoxOps.value]=_onplay//.push(_onplay); //or use below
        _this.value['clients']['store']= 'buy'
        //----
        _this_clientforeign.value['orderID']=await _genOrderID()

        _this.value['onplayOps']='clients'    
        _this.value['onplaySubops'] = 'create'   
        //--------Set Options Paramers
        return await Crud_this.updateData()
        .then(async (response) => {
          if (response) { 
            _this_Rows.value[__thisIndex.value] =response
            if(__this_foreignBoxOps.value == 'clients'){
                //_this_clientRows.value.unshift(_this_foreign.value) //temporarlly filling
                await _this_clientQuery()                  
            }
            timerDone(5000,'Succefully Submitted')
            _thisDefault_client.value['orderID']=await _genOrderID()

          } return false
      }).catch(async ()=>{
        timerError(5000,'Order Error.')
        return true })
  },
}
//--------------------CONTENTING (CREATING  && EDITING....)====ENDS
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
  //----------------------------------------------------------------
  updateData: async function () {
    let objParam = {};
    objParam[updateKey] = _this.value[updateKey] ?? undefined;
    //-------Check for Param_Requirents
    try {
      if (objParam[updateKey] == null) {return false; }
    } catch {return false; }
    //-----------Calling for Store Services

    return await _thisService.updateData(_thisapiUrl,_this.value, objParam).then((response) => { //returning as [false,response_obj]
        if (response[0]) {timerDone(5000,'Updating...'); return response[1];
        } else {timerError(5000,'Error Reading');return false;}
      })
      .catch(() => {timerError(5000,'Error Creating');return false;});
  },

  readData: async function () {
    return await _thisService.readData(_thisapiUrl).then((response) => { //returning as ['data'][{},{},{data..}]
      if (response) {timerDone(5000,'Updating..');return response;
        } else {timerError(5000,'Creating Error');return false;}
      })
      .catch(() => {timerError(5000,'Error Reading');return false;});
  },

  //---------------------------------------------------------------
  readFData: async function (objParam) {
    //-------Check for Param_Requirents
    try {
      if (Object.keys(objParam).length ==0) {return false; }
    } catch {return false; }
    //-----------Calling for Store Services

    return await _thisService.readFData(_thisapiUrl,objParam).then((response) => {
        if (response) {timerDone(5000,'Data Found');return response[0];
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
        //return false;
      }
    } catch {timerError(5000,'Read Error');return false;}
    return await _thisService.deleteData(_thisapiUrl,objParam).then((response) => {
        if (response[0]) {timerDone(5000,'Deleted.');return response[1];
        } else {timerError(5000,'Read Error');return false;}

      }).catch((error) => {timerError(5000,'Read Error');console.log('deleting.....',error);return false; });
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
let _fileAsString =ref(0)//_file in Show_Mode (As_String)  
let _fileAsStringIndex =ref(null)//_fileAsString_Array_index
let _fileAsStringSlide=ref(false)
let slideIndex=ref(0)
let slideFullscreen=ref(true)
//--------------------
let _fileAsSRCOps = ref(false) //tis could for deleting/
//let _fileAsStringOps = ref(false) //this is for selecting only
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

 ///_fileAsStringSlide
async function _fileAsStringOpsCall(StrIndex,index = null){ //calling for selections
   __thisIndex.value=index
   //__this_foreignBoxOps.value=null
  _fileAsStringIndex.value=StrIndex
  return true
}

async function _fileAsStringSlideCall(_thisindex = null){ //calling for selections
   __thisIndex.value=_thisindex
    //----------SET_ROW
    let _onplayRI = {}
    _onplayRI = _this_Rows.value[_thisindex]//Object.assign({},_this_Rows.value[_thisindex])
    _this.value = Object.assign({},_onplayRI) //DeepCopy Handle Reactivity
    //---------------
   _fileAsStringSlide.value=true
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

  //----------------------------Utilities Funtions
    </script>
    
    
      <style>
  
    </style>