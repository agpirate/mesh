<template>

  <q-dialog
      v-model="_onplayRowItemBox"
      transition-show="scale"
      transition-hide="scale"   
      :style="{ 'background-image': 'url('  + ')' }"
    >
    <q-card style="min-width: 50vw;" class="overlay-Glass " >
  
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
            <q-btn dense flat icon="close" @click="_onplayRowItemBoxset()">
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-bar -->
  
          <q-card-section class="row items-center no-wrap q-pa-none"  >
            
            <div class="col " style="max-height:80vh;" >
          <q-img            
              loading="lazy"
               style="max-height: 100%;"
                      :src="_fileAttributeName ? _fileAsSRC[_fileAsSRCIndex] : onplayRowItem['saleitgr'][_fileAsSRCIndex]">  
                  
                            <div class="absolute-full transparent column justify-between " >
                              
                              <div class="row" style="width:100%" >
                                    <div class="col">
                                      
                                    </div>
                                    <div class="column col-auto " style="width: 5vw;">                                        
                                            <q-item-label class="text-grey"> Via  </q-item-label>
                                            <input type="file" multiple ref="filep" style="display: none" @change="_fileSourceFolder($event,'saleitgr')" /> 
                                            <q-btn icon="folder" @click="$refs.filep.click()" :dense="true" />
                                            <q-btn icon="add_a_photo" @click="_cameraInstance._openCamera('saleitgr')" :dense="true"  />
                                      </div>
                              </div>
                             
                              
                             
                              <div class="col row justify-between">
                               

                                    <div class="self-end justify-left col-auto "> 
                                              <div v-if="_onplayRowItemOps == 'CreateRowItem'"  style="background-color:rgba(106, 93, 255,0.6)" >
                                            
                                                <q-btn  outline no-caps :dense="true" :loading="_onplayRowItemOpsStatus" class="q-px-sm "  color="warning" label="Upload"  icon="upload" 
                                                @click="_createRow(false)" v-if="_fileAsSRC?.length ?? false" >
                                                    <!--template v-slot:_onplayRowItemOpsStatus>
                                                      uploading...
                                                      <q-spinner-radio class="on-left" />
                                                      uploading...
                                                    </template-->
                                                    </q-btn>
                                                  <q-btn  outline rounded no-caps :dense="true" :loading="_onplayRowItemOpsStatus" class="" color="warning" label="saleIt"  icon="upload" 
                                                    @click="_createRow(true)" v-else />

                                              </div>   

                                              <div v-else  style="background-color:rgba(255, 165, 0,0.2)"  >                                    
                                               
                                                <q-btn  outline no-caps :dense="true" :loading="_onplayRowItemOpsStatus" class="" color="warning" label="saleIt"  icon="upload" 
                                                @click="_updateRow(true)" v-if="_fileAsSRC?.length ?? false" />
                                                <q-btn  outline no-caps :dense="true" :loading="_onplayRowItemOpsStatus" class="" color="black" label="saleIt"  icon="upload" 
                                                @click="_updateRow(false)" v-else/>
                                              </div>        
                                      
                                        </div>
                                        
                                        <div class="self-end justify-right col-grow column  q-pa-xs" v-if="_fileAsSRC?.length ?? false"  style="max-height:100%;" > 
                                          
                                              <div class="self-end justify-right col row  q-pa-xs">
                                                  <q-checkbox
                                                        left-label
                                                        v-model="_fileAsSRCOps"
                                                        label="Delete"
                                                        checked-icon="task_alt"
                                                        unchecked-icon="highlight_off"
                                                      />
                                              </div>
                                             
                                              <div  class="self-end justify-right col row shadow-5 q-pa-xs" style="max-height:100%;max-width: 100%;" v-if="_fileAttributeName ?? false">
                                                      <div v-for="item,fileIndx in _fileAsSRC" :key="fileIndx" class="col row inset-shadow q-px-xs" 
                                                    style="max-height:100%;" > {{  fileIndx }}                                           
                                                      
                                                          
                                                            <q-btn round @click="_fileAsSRCOpsCall(fileIndx)" class="col-auto">
                                                            <q-avatar size="42px">
                                                              <img :src="item">
                                                            </q-avatar>
                                                          </q-btn>

                                                    </div>

                                              </div>
                                              <div  class="self-end justify-right col row shadow-5 q-pa-xs" style="max-height:100%;max-width: 100%;" v-else>
                                                      <div v-for="item,fileIndx in onplayRowItem['saleitgr']" :key="fileIndx" class="col row inset-shadow q-px-xs" 
                                                    style="max-height:100%;" > {{  fileIndx }}                                       
                                                      
                                                          
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
     
          <q-card-section class="column text-dark bg-orange" >
           <fieldset class="col  q-gutter-xs" style="border-radius: 5px;border: 3px solid grey;"  >
  
            <legend @click="_formsMeta.description = ! _formsMeta.description" class=" text-weight-bolder">
                Descriptions
            </legend>
            <template v-if="_formsMeta.description">
            
            
              <div class="row  flex flex-center">
                <q-input class="col-md col-xs q-pa-sm" style="text-transform: capitalize;"  outlined v-model="onplayRowItem['header']" label="what you selling" stack-label :dense="true"  />
              <q-input class="col-md-4 col-xs-4" type="Number" style="text-transform: capitalize;"  outlined v-model="onplayRowItem['quantity']" label="quantity" stack-label :dense="true"  />
  
            </div>
          
      <q-separator inset  />
        <q-input
        outlined v-model="onplayRowItem['content']" label="decscriptions" style="text-transform: capitalize;" 
        filled  
        autogrow
      />  
    
      <fieldset class="col-grow row  q-pa-sm q-gutter-xs" style="text-transform: capitalize;border-radius: 5px;border: 0px solid grey;">
  
        <legend @click="_formsMeta.pricing = !_formsMeta.pricing" class=" text-weight-bolder">
            catagory
        </legend>
  
        <template v-if="_formsMeta.pricing ?? false" >
          <q-select outlined :dense="true"  class="col-md col-xs q-pa-sm" style="text-transform: capitalize;"  color="purple-12" v-model="onplayRowItem['catagory']" :options="saleitSchema['catagory']['enum']" label="catagory" />
          <q-select outlined :dense="true"  class="col-md col-xs q-pa-sm" style="text-transform: capitalize;"  color="purple-12" v-model="onplayRowItem['usage']" :options="saleitSchema['usage']['enum']" label="usage" />
          </template>
        
        </fieldset>
  
        <q-separator inset />
  
          <fieldset class="col-grow row q-pa-sm " style="text-transform: capitalize;border-radius: 5px;border: 0px solid grey;">
  
            <legend @click="_formsMeta.address = !_formsMeta.address" class=" text-weight-bolder">
                Address
            </legend>
            <template v-if="_formsMeta.address ?? false" >
              <q-input class="col-md-auto col-xs-12 q-px-sm text-weight-bold"  outlined v-model="onplayRowItem['location']['country']" label="Country" stack-label :dense="true" />
            <q-input class="col-md-auto col-xs-12 q-px-sm text-weight-bold"  outlined v-model="onplayRowItem['location']['city']" label="City" stack-label :dense="true" />
            <q-input class="col-md-auto col-xs-12"  outlined v-model="onplayRowItem['location']['street']" label="Street" stack-label :dense="true" />
           </template>
           
            </fieldset>
  
            </template>
          
   
           </fieldset>
  
  
      <fieldset class="col-grow   q-gutter-xs" style="text-transform: capitalize;border-radius: 05px;border: 0.01px solid grey;">
  
          <legend class=" text-weight-bolder">
              Set Price
          </legend>
          
            <q-input type="Number" class="col-md-auto col-xs-12" style="text-transform: capitalize;"  outlined v-model="onplayRowItem['price']" label="Normal" stack-label :dense="true" />
            <q-input type="Number" class="col-md-auto col-xs-12" style="text-transform: capitalize;"  outlined v-model="onplayRowItem['discount']" label="discount" stack-label :dense="true" />
              
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


  <q-page class="col column" style="" >
  
          <!------------------------------ ioio ----->
        <div class="col q-pa-none column " v-if="rows?.length ?? false"    style="height:70vh">
      
              <q-table 
              flat bordered

              :rows="rows"
              :columns="columns"
  
              virtual-scroll

              :filterMethod="filterMethod"
              :filter="filter"

              
              row-key="id" 
              rowIndex="true"

              :inFullscreen="true"
              class="col column  q-gutter-sm fit"

              hide-pagination
              hide-top
              hide-bottom
              style="height:70vh"
              >
            
                <template v-slot:top="props" v-if="false">
                    <q-btn class="hidden"  style="height:0px;width:0px"   ref="togflscreen" :set="enableflscreen = props.inFullscreen" @click="props.toggleFullscreen()" />
                </template>
               
                <template v-slot:header="props">
                  <q-tr :props="props" style="position:absolute;z-index:2;width:100vw;"  class="no-wrap col-1 transparent column " >
                    <q-scroll-area style="max-width:100vw;" class="col column transparent q-pa-xs">
                      <div class="col flex flex-center q-gutter-sm  q-py-xs  transparent no-wrap" style="max-width:100%;max-height: 100%;"> 
                                            <q-btn rounded no-caps size="sm"  @click="_itServiceSE('_trend','')" :key="_qgroup1" class="col-auto"  >
                                             Show All          
                                            </q-btn>
                                            <q-btn rounded no-caps size="sm"  v-for="_qgroup1 in ['New','Used']" @click="_itServiceSE('usage',_qgroup1)" :key="_qgroup1" class="col-auto"  >
                                              {{  _qgroup1 }}   
                                            </q-btn>  
                                            <q-separator inset vertical class='q-py-sm'  />

                                            <q-btn rounded no-caps size="sm" v-for="_qgroup0 in _thisSchema['catagory']['enum']" @click="_itServiceSE('catagory',_qgroup0)" :key="_qgroup0" class="col-auto q-py-xs"  >
                                              {{  _qgroup0 }}            
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

              <template v-slot:body="props"   >

                  <!--row Object [key(id=?)],row,_trClass,cols,sort,rowIndex,color,dark,dense,expand]-->
                  <q-tr
                    :props="props" :class="$q.screen.gt.sm ? 'row' : 'column'"
                    class="col-11 cursor-pointer text-bold text-weight-bolder q-gutter-sm"  
                    style="height:80vh;width:99vw;"                   
                  >
                              
                    <!------------------ iterating _ body cell-->
                    <q-td  auto-width class="col-2" v-if="$q.screen.gt.md">
                     
                    </q-td>
 
                    <q-td  :class="$q.screen.gt.md ? 'column col-6' :'col-grow column'  " v-if="props.row.saleitgr ?? false"  >

                          <div class="col row ">
  
                              <div class="col column" >
                              
                                  <q-img                                  
                                              loading="lazy"
                                              :src=" (_onplayRowIndex == props.rowIndex) && _fileAsStringIndex ? props.row.saleitgr[_fileAsStringIndex] : props.row.saleitgr[0]"
                                              spinner-color="white"
                                              class="column" style="max-width:100%;border-radius:20px;aspect-ratio: 2/1;"                                            
                                              >
                                     
                                        <q-list class="column col fit " :class="props.row.userName ? 'transparent': 'transparent'">
                                          <q-item class=" col-auto row items-top"> 

                                           <q-item-section class="col-auto " style="">
                                            <q-itel-label style=""  v-if="props.row.userName ?? false">
                                              <q-item-label class="q-pa-xs saleitHeader-Glass fit"> 
                                              
                                                <q-avatar size="xs">
                                                    <img src="/icons/itsVerified.png">
                                                  </q-avatar>                                              
                                                <q-badge >{{props.row.userName}}   </q-badge>
                                               </q-item-label>                                          
                                              
                                            </q-itel-label>
                                            <q-itel-label style="" v-else> 
                                               #saleit Service
                                             </q-itel-label>
                                             <div v-if="props.row.fupdatedAt?.hours ?? false" class="flex row q-gutter-sm"> 
                                                
                                                <div> Since </div>
                                                <div v-if="props.row.fupdatedAt?.days != 0 ?? false"> {{  props.row.fupdatedAt.days }} Days </div>
                                                <div v-if="props.row.fupdatedAt?.hours != 0 ?? false"> {{ props.row.fupdatedAt.hours}} Hours</div> 
                                             </div>
                                              <q-item-label v-else> Just Now  </q-item-label>

                                          

                                           </q-item-section>

                                           <q-item-section class="col columns row items-end" >
                                                  <q-item-label> {{ props.row.queryWeight}} </q-item-label>
                                                  <q-item-label> {{ Objprops._profile.queryWeight}} </q-item-label>
                                                  <q-item-label> {{ props.row['clients'].length }} / {{ props.row['tPrice'] }}</q-item-label>
                                           </q-item-section>
                                          </q-item>
                                          <q-item class="col-auto row justify-between content-start q-px-none q-mx-none">
                                            <div class="col-auto column">
                                              <q-btn outline v-for="item,fileIndx in props.row.saleitgr" @click="_fileAsStringOpsCall(fileIndx,props.rowIndex)" :key="fileIndx" class="col-auto q-gutter-xs">   
                                                                                                   
                                                  <q-avatar square >
                                                    <img :src="item">
                                                  </q-avatar>

                                              </q-btn>
                                            </div>

                                            <div class="col-auto q-px-none q-mx-none" v-if="$q.screen.lt.lg">

                                              <q-item  class="q-px-none">
                                                      <q-sticky expand position="right" class="q-px-none" >
                                                           <!--inseide_side_actions-->
                                                  <q-card class="q-px-none column" style="background-color: rgba(6, 93, 255, 0.212);" >
  
                                                      <q-btn round flat color="white" text-color="primary" label="Buy" @click="_onplayRowItemsideBoxcall(props.rowIndex,'clients')"

                                                        >
                                                        <q-badge color="orange"  floating v-if="props.row.clients?.length ?? false">                                                                     
                                                                  <q-item-label v-if="props.row.quantity == 0">sold </q-item-label>   
                                                                  <q-item-label v-else>Selling </q-item-label>   
                                                        </q-badge>                                          

                                                      </q-btn>

                                                      <q-btn round flat icon="message" @mouseover="message" @click="_onplayRowItemsideBoxcall(props.rowIndex,'comments')">
                                                        <q-tooltip anchor="top end" self="top middle">comments</q-tooltip>    
                                                      </q-btn>

                                                      <q-btn round flat color="white" @mouseover="message" text-color="primary" label="like" @click="_activeRowOperation._likes(props.rowIndex)">
                                                        <q-badge color="orange" floating v-if="props.row.likes ?? false">{{  props.row.likes.like }}</q-badge>
                                                      </q-btn>

                                                      <q-btn round flat icon="gps" @mouseover="message" @click="_onplayRowItemBoxcall(props.rowIndex)"> 
                                                        <q-tooltip anchor="top end" self="top middle">   map </q-tooltip>  
                                                      </q-btn>

                                                      <q-btn round flat icon="edit" @mouseover="message" @click="_onplayRowItemBoxcall(props.rowIndex)"> 
                                                        <q-tooltip anchor="top end" self="top middle">   edit </q-tooltip>  
                                                      </q-btn>

                                                      <q-btn round flat icon="delete" @mouseover="message"  @click="_activeRowOperation._delRow(props.rowIndex,props.key)"> 
                                                        <q-tooltip anchor="top end" self="top middle"> delete </q-tooltip>  
                                                      </q-btn>

                                                      <q-btn round flat icon="more_vert">

                                                            <q-menu anchor="top right" self="top left" flat  stack no-caps  class="row q-gutter-none" >
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
                                             

                                            
                                          </q-item>

                                         
                                        

                                          <q-item class="absolute-bottom text-subtitle2 text-end q-gutter-sm row items-end">

                                                <q-item-section class="q-py-sm" >  
                                                    
                                                    <div class="column flex flex-end justify-start q-pa-sm saleitContent-Glass" 
                                                    style="text-transform: capitalize;">
                                                      <q-itel-label class="flex flex-center justify-start q-pa-none saleitContent-Glass" >
                                                          {{ props.row.header }}  
                                                        </q-itel-label>
                                                      <q-itel-label v-if="$q.screen.gt.sm">  {{ props.row.content }}  </q-itel-label>
                                                    </div>                                                      

                                                </q-item-section>

                                                <q-item-section>
                                                  
                                                 
                                                </q-item-section>                                                
  
                                                <q-item-section class="row col-auto q-px-none text-sm">
                                                      <div v-if="typeof props.row.timer ?? false "> 
                                                         Price: {{  props.row.price  }}   
                                                        <q-item>
                                                          <q-item-section v-if="$q.screen.gt.sm" >                                                             
                                                            {{  showDate.split(':')[1] }}                                                             
                                                                {{ props.row.timer.hours }}
                                                                {{ props.row.timer.days }}
                                                          </q-item-section>

                                                          <q-item-section>
                                                            
                                                          </q-item-section>
                                                        </q-item>
                                                      </div> 
                                                      
                                                      <q-separator inset />
                                                      <div v-if="props.row.clients ?? false">Buyers : {{ props.row.clients.length}}</div>
                                                      <q-separator inset />
                                                      <div v-if="props.row.clients ?? false">Quantity : {{ props.row.quantity}}</div>

                                                      <q-badge class="q-pa-sm text-bold" v-if="props.row.discount ?? false" color="pink">
                                                        
                                                          Happy-Hour Price : <q-item-label class="text-strike text-orange">{{ props.row.price  }}</q-item-label>{{  props.row.discount }}
                                                                                                              
                                                      </q-badge>  
                                                      <q-badge class="q-pa-sm text-bold" v-else>                                                  
                                                      
                                                          Price: {{  props.row.price }}
                                                      </q-badge>  

                                                      <div class="text-orange"> 
                                                         <q-rating v-model="props.row._itServiceRating" :max="5" size="xs" @click="_activeRowOperation._rating(props.rowIndex)"/>                                                       
                                                     </div>                                                     
                                                        
                                                </q-item-section>
                                                
                                          </q-item>
                                        

                                        </q-list>
                                              
                                        


                                  </q-img>
  
                              </div>
                           
                              <div class="col-auto">
                                   <!--outside _side_actions-->
                                  <q-sticky v-if="$q.screen.gt.sm" expand position="left" class="q-px-xs">
  
                                        <q-card class="q-pa-none column" style="background-color: rgba(6, 93, 255, 0.212);" >
  
                                          <q-btn round flat color="white" text-color="primary" label="Buy" @click="_onplayRowItemsideBoxcall(props.rowIndex,'clients')"
                                        
                                            >
                                            <q-badge color="orange"  floating v-if="props.row.clients?.length ?? false">                                                                     
                                                                  <q-item-label v-if="props.row.quantity == 0">sold </q-item-label>   
                                                                  <q-item-label v-else>Selling </q-item-label>   
                                                        </q-badge>                                           

                                          </q-btn>

                                          <q-btn round flat icon="message" @mouseover="message" @click="_onplayRowItemsideBoxcall(props.rowIndex,'comments')">
                                            <q-tooltip anchor="top end" self="top middle">comments</q-tooltip>    
                                          </q-btn>

                                          <q-btn round flat color="white" @mouseover="message" text-color="primary" label="like" @click="_activeRowOperation._likes(props.rowIndex)">
                                            <q-badge color="orange" floating v-if="props.row.likes ?? false">{{  props.row.likes.like }}</q-badge>
                                          </q-btn>

                                          <q-btn round flat icon="gps" @mouseover="message" @click="_onplayRowItemBoxcall(props.rowIndex)"> 
                                            <q-tooltip anchor="top end" self="top middle">   map </q-tooltip>  
                                          </q-btn>

                                          <q-btn round flat icon="edit" @mouseover="message" @click="_onplayRowItemBoxcall(props.rowIndex)"> 
                                            <q-tooltip anchor="top end" self="top middle">   edit </q-tooltip>  
                                          </q-btn>                                         
                                          <q-btn round flat icon="delete" @mouseover="message"  @click="_activeRowOperation._delRow(props.rowIndex,props.key)"> 
                                            <q-tooltip anchor="top end" self="top middle"> delete </q-tooltip>  
                                          </q-btn>

                                          <q-btn round flat icon="more_vert">

                                                 <q-menu anchor="top right" self="top left" flat  stack no-caps  class="row q-gutter-none" >
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

                    <q-td :class="$q.screen.gt.md ? 'column col-6 q-ma-md q-pa-lg' :'col-6 column q-ma-md'" style="padding-top:8vh" v-else>
                  
                      <q-card  class="col row q-gutter-sm" >
                          <q-skeleton class="col" square />
                      </q-card>
                    </q-td>

                    <q-td  auto-width class="col column full-height q-pa-md"  v-if=" $q.screen.gt.md && _onplayRowIndex == props.rowIndex">
                    
                      <div class="col row" v-if="_onplayRowItemsideBoxOps == 'comments' && props.row.comments != null">                             
                                
                              

                                <q-list class="column" style="height:100%;width:100%">  

                                  <q-item class="col-auto column">
                                    <q-item-label> 
                                      Comments:    
                                      <q-btn style="background-color:white;" color="primary" :dense="true" size="sm" rounded flat @click="_passiveColumnOperation._add()"> add Comment</q-btn>                      
                                    </q-item-label>     

                                    <q-item-section v-if="_onplayRowItemsideBoxIndex == null" class="column q-pa-xs">
                                        <q-badge> New Comment</q-badge>
                                        <q-item-label style="text-transform: capitalize;" >
                                          <q-input  filled autogrow
                                                type="textarea"  v-model="defaultItem.comments[0].comment" 
                                                :label="cinfo" stack-label :dense="true"  />                                        
                                        </q-item-label> 
                                        <div class="col-auto q-pa-xs">
                                          <q-btn label="Add Comment" :dense="true" @click="_passiveColumnOperation._submitArray('comments')"  size="md"/>
                                        </div>     
                                     </q-item-section>

                                  </q-item> 
                                 
                                  <q-separator spaced inset />

          
                                  <q-scroll-area class="col column" v-if="props.row.comments?.length ?? false" >
                                    
                                  <q-item v-for="item,index in props.row.comments" :key="index"  class="col column">
                      
                                    <q-item-section v-if="_onplayRowItemsideBoxIndex == index">                                        
                                        <div class="justify-end  row "> <div  style="color:cyan"> Commenting..</div> </div>
                                        <q-item-label style="text-transform: capitalize;" >
                                          <q-input  filled autogrow
                                                type="textarea"  v-model="onplayRowItem['comments'][index]['comment']" 
                                                :label="cinfo" stack-label :dense="true"  />
                                        
                                        </q-item-label>      
                                        
                                     </q-item-section>
    
                                     <q-item-section v-else>
                                        <q-item-label style="text-transform: capitalize;" >
                                          {{props.row.comments[index].userName}}
                                       </q-item-label>      

                                        <q-item-label style="text-transform: capitalize;">
                                          <q-input  autogrow filled
                                                type="textarea"  v-model="props.row.comments[index].comment" 
                                                :label="cinfo" stack-label :dense="true" readonly />

                                       </q-item-label>    
                                     </q-item-section>
    
                                    <q-item-section >
                                      <q-item-label caption> {{  props.row.comments[index].time }}</q-item-label>
                                      <div class="text-orange">
                                        <q-icon name="star" />
                                        <q-icon name="star" />
                                        <q-icon name="star" />
                                        <q-btn round flat icon="edit" @click="_passiveColumnOperation._selectArray(_onplayRowItemsideBoxIndex)"> </q-btn>
                                        <q-btn round flat icon="done" @click="_updateRow()" v-if="_onplayRowItemsideBoxIndex == index"> </q-btn>
                                        <q-btn round flat icon="delete" @click="_passiveColumnOperation._remove(_onplayRowItemsideBoxIndex)" v-if="_onplayRowItemsideBoxIndex ==index "> </q-btn>
                                      
                                      </div>

                                    
                                    
                                    </q-item-section>
                                  </q-item>
    
                               
    
                                </q-scroll-area>
    
                                  <q-list v-else>
                                    No Comments ( New)
                                  </q-list>  

                                </q-list>                                           
                              
                              
                              
                          </div> 

                          <div class="col" v-else-if="_onplayRowItemsideBoxOps == 'clients' && (props.row.clients ?? false)">
                        
                            
                                <q-list class="column col" style="height:100%">   
                                  <q-item class="col-auto row">
                                    <q-list bordered class="col rounded-borders">
                                      <q-expansion-item
                                        icon="buy" :dense="true"   label="Counter" color="orange" style="background-color:orange"
                                        >
                                          <template v-slot:header>
                                         <q-item-section>
                                          payIt Service
                                        </q-item-section>

                                            <q-item-section>
                                             pay using telebirr                                          
                                          </q-item-section>
                                          </template>
                                          
                                          
                                         
                                        </q-expansion-item>
                                          <q-separator  inset />
                                        <q-expansion-item
                                        icon="buy" :dense="true"   label="Counter" color="orange" style="background-color:orange"
                                        >
                                          <template v-slot:header>
                                         <q-item-section>
                                          Easy-pay
                                        </q-item-section>

                                            <q-item-section>
                                              #buyers ; Add to your Cart                                           
                                          </q-item-section>
                                          </template>
                                          
                                          
                                          <q-card class="items-center" style="background-color:white;">     
                                            <q-card-section>                                              
                                              <div  v-if="(_orderStep == 0) &&  (defaultItem['clients']?.length ?? false)">
                                                <q-item-label class="absolute-right q-px-sm">Step - 1</q-item-label>                                            

                                                Your OrderID : {{ defaultItem['clients'][0]['orderID'] }}
                                                <div class="q-gutter-sm row items-start q-pa-sm">
                                                    <q-input filled v-model="defaultItem['clients'][0]['orderID']" class="col-grow" label="OrderID" stack-label :dense="true" readonly />
                                                    <q-input type='Number'  outlined bottom-slots v-model="defaultItem['clients'][0]['quantity']" class="col-4" label="Quantity" default="1" min='1' :prefix="'+'" :dense='true' >
                                                      <template v-slot:hint>
                                                      </template>
                                                    </q-input>
                                                    <q-input filled v-model="defaultItem['clients'][0]['phone']" class="col-7" label="Phone_#" stack-label :dense="true" />                                 
                                                   

                                                    <q-btn color="indigo" no-caps  glossy unelevated  @click="_activeColumnOperation._confirmOrder()" label="Sent Order" :dense="true"/>
                                                
                                                </div>                                            
                                              
                                              </div>                                              
                                              
                                              <fieldset class="q-gutter-md row items-center q-px-sm q-py-none" style="border-radius: 5px;border:0px" v-else>  

                                                <q-item-label class="absolute-top-right q-px-sm ">Just Ordered. <q-btn rounded size="sm" no-caps label="New Order"  @click="_activeColumnOperation._initiateOrder()"/>
                                                                                  
                                                </q-item-label>                                             
                                                <legend class="flex justify-start q-py-none">OrderID :<q-item-label caption> <q-badge>{{ _orderIntiatedID  }}  </q-badge>  </q-item-label> </legend>
                                                <q-badge color="green" v-if="_orderConfirmDebuger"> {{  _orderConfirmDebuger  }}   </q-badge>                                            
                                         
                                              </fieldset> 
                                            </q-card-section>
                                          </q-card>
                                        </q-expansion-item>
                                        </q-list>
                                  </q-item> 
                                  <q-item  class="col-auto q-pa-xs " >
                                    <q-badge outline color='green' > {{  _orderDebuger }}</q-badge>
                                  </q-item>

                                  <q-separator spaced inset />
                                     

                                      <q-scroll-area class="col column" v-if="props.row.clients?.length ?? false">                                
                                        <q-item v-for="item,index in props.row.clients" :key="index"  class="col column">  
                                                                            
                                              <q-item-section v-if="props.row.clients[index] ?? false">

                                                <div class="row justify-between items-end q-gutter-sm ">
                                                  <div class="q-py-sm" v-if="props.row.clients[index]['served'] ?? false">

                                                          <div v-if="props.row.clients[index]?.['served'] == 'Requested' ?? false " >
                                                            <q-badge color="red" size="sm">Pending..</q-badge></div> 
                                                      
                                                          <q-item-label style="text-transform: capitalize;" >
                                                            <q-avatar size="14px"  :color="props.row.clients[index]['served'] != 'Queed' ? 'orange' : 'green'"></q-avatar>
                                                              {{props.row.clients[index].phone}} #{{props.row.clients[index].orderID}}
                                                          </q-item-label>                                                   
                                                  </div>
                                                    <!---- is current loged user/client--> 
                                                    <div  v-if="props.row?.['userID'] == Objprops.userID"> 
                                                          <q-btn round color='blue' flat icon="edit" @click="_passiveColumnOperation._selectArray(index)"> </q-btn>
                                                          <q-btn round flat icon="done" @click="_updateRow(false)" v-if="_onplayRowItemsideBoxIndex  == index"> apply </q-btn>
                                                          <q-btn round flat icon="delete" @click="_passiveColumnOperation._remove(index)" v-if="_onplayRowItemsideBoxIndex == index "> </q-btn>
                                                    </div>
                                                    <div v-else-if="props.row.clients[index]?.['userID'] == Objprops.userID">
                                                      <q-btn round flat color='orange' icon="edit" @click="_passiveColumnOperation._selectArray(index)" > </q-btn>
                                                        <!--q-btn round flat icon="done" @click="_updateRow(false)" v-if="_onplayRowItemsideBoxIndex == index"> </q-btn-->
                                                        <q-btn round flat icon="delete" @click="_passiveColumnOperation._remove(index)" > </q-btn>                
                                              
                                                      </div>
                                                                                       

                                              </div>                                       
                                              
                                              <div class="row q-gutter-sm" v-if="_onplayRowItemsideBoxIndex == index " >
                                                        <q-item-label style="text-transform: capitalize;">
                                                            <q-input  autogrow filled clearable
                                                            :shadow-text="textareaShadowText"
                                                                  @keydown="processTextareaFill"
                                                                  @focus="processTextareaFill"
                                                                  type="Number"  v-model="props.row.clients[index]['description']" 
                                                                  label="Delivery Remark" stack-label :dense="true"  />
                                                                
                                                        </q-item-label>                                                
                                                        <q-item-label style="text-transform: capitalize;" class="col">
                                                          
                                                          <q-select
                                                          :dense="true"
                                                                filled
                                                                v-model="props.row.clients[index]['served']"
                                                                :options="['Requested','Queed','Served']"
                                                                use-chips
                                                                stack-label
                                                                label="Served Status"
                                                              />        
                                                              
                                                              
                                                        </q-item-label>   
                                                </div> 
                                                <div class="flex flex-center  q-gutter-sm" v-else >
                                                        <q-item-label style="text-transform: capitalize;" class="col">
                                                            <q-input  autogrow filled 
                                                                  type="Number"  v-model="props.row.clients[index].quantity" 
                                                                  label="Quantity" stack-label :dense="true" readonly />
                                                                
                                                        </q-item-label>
                                                        <q-item-label style="text-transform: capitalize;" class="col">
                                                            <q-input  autogrow filled
                                                                  type="Number"  v-model="props.row.clients[index].price" 
                                                                  label="Price" stack-label :dense="true" readonly />
                                                                
                                                        </q-item-label>   
                                                        <q-item-label style="text-transform: capitalize;" class="col">
                                                            <q-input  autogrow filled
                                                                  type="Number"  v-model="props.row.clients[index].paymentMethod" 
                                                                  label="Payment" stack-label :dense="true" readonly />                                                        
                                                        </q-item-label>                                                

                                                </div>    
                                              </q-item-section>
            
                                              <q-item-section v-if="props.row.clients?.length ?? false">                                     
                                                    <div class="text-orange"> 
                                                      <q-item-label caption> {{  props.row.clients[index].time.split(',')[0] ?? ' ' + props.row.clients[index].time.split(',')[1] ?? ' ' }}</q-item-label>
                                                      
                                                          <q-itm-label class="row justify-start items-center " > Delivery Remarkk: <q-item-label class="text-black q-px-sm" caption> {{props.row.clients[index]['description']   }} </q-item-label> </q-itm-label>

                                                        </div>                                                                     
                                                      
                                              </q-item-section>

                                          </q-item>

                      

                                        </q-scroll-area>
                                   
                                        <q-list v-else>
                                        No Clients ( Buyers)
                                      </q-list>  

                                    </q-list>

                          </div>
                    </q-td>

                    <div class="bg-red" style="position:absolute;width:100%;height:50%;bottom:0;z-index: 1;"  v-if=" $q.screen.lt.md && _onplayRowIndex == props.rowIndex">

                      <div class="col row" v-if="_onplayRowItemsideBoxOps == 'comments' && props.row.comments != null">                             
                                
                              

                                <q-list class="column" style="height:100%;width:100%">  

                                  <q-item class="col-auto column">
                                    <q-item-label> 
                                      Comments:    
                                      <q-btn style="background-color:white;" color="primary" :dense="true" size="sm" rounded flat @click="_passiveColumnOperation._add()"> add Comment</q-btn>                      
                                    </q-item-label>     

                                    <q-item-section v-if="_onplayRowItemsideBoxIndex == null" class="column q-pa-xs">
                                        <q-badge> New Comment</q-badge>
                                        <q-item-label style="text-transform: capitalize;" >
                                          <q-input  filled autogrow
                                                type="textarea"  v-model="defaultItem.comments[0].comment" 
                                                :label="cinfo" stack-label :dense="true"  />                                        
                                        </q-item-label> 
                                        <div class="col-auto q-pa-xs">
                                          <q-btn label="Add Comment" :dense="true" @click="_passiveColumnOperation._submitArray('comments')"  size="md"/>
                                        </div>     
                                     </q-item-section>

                                  </q-item> 
                                 
                                  <q-separator spaced inset />

          
                                  <q-scroll-area class="col column" v-if="props.row.comments?.length ?? false" >
                                    
                                  <q-item v-for="item,index in props.row.comments" :key="index"  class="col column">
                      
                                    <q-item-section v-if="_onplayRowItemsideBoxIndex == index">                                        
                                        <div class="justify-end  row "> <div  style="color:cyan"> Commenting..</div> </div>
                                        <q-item-label style="text-transform: capitalize;" >
                                          <q-input  filled autogrow
                                                type="textarea"  v-model="onplayRowItem['comments'][index]['comment']" 
                                                :label="cinfo" stack-label :dense="true"  />
                                        
                                        </q-item-label>      
                                        
                                     </q-item-section>
    
                                     <q-item-section v-else>
                                        <q-item-label style="text-transform: capitalize;" >
                                          {{props.row.comments[index].userName}}
                                       </q-item-label>      

                                        <q-item-label style="text-transform: capitalize;">
                                          <q-input  autogrow filled
                                                type="textarea"  v-model="props.row.comments[index].comment" 
                                                :label="cinfo" stack-label :dense="true" readonly />

                                       </q-item-label>    
                                     </q-item-section>
    
                                    <q-item-section >
                                      <q-item-label caption> {{  props.row.comments[index].time }}</q-item-label>
                                      <div class="text-orange">
                                        <q-icon name="star" />
                                        <q-icon name="star" />
                                        <q-icon name="star" />
                                        <q-btn round flat icon="edit" @click="_passiveColumnOperation._selectArray(_onplayRowItemsideBoxIndex)"> </q-btn>
                                        <q-btn round flat icon="done" @click="_updateRow()" v-if="_onplayRowItemsideBoxIndex == index"> </q-btn>
                                        <q-btn round flat icon="delete" @click="_passiveColumnOperation._remove(_onplayRowItemsideBoxIndex)" v-if="_onplayRowItemsideBoxIndex ==index "> </q-btn>
                                      
                                      </div>

                                    
                                    
                                    </q-item-section>
                                  </q-item>
    
                               
    
                                </q-scroll-area>
    
                                  <q-list v-else>
                                    No Comments ( New)
                                  </q-list>  

                                </q-list>                                           
                              
                              
                              
                          </div> 

                          <div class="col" v-else-if="_onplayRowItemsideBoxOps == 'clients' && (props.row.clients ?? false)">                       
                            
                                <q-list class="column col" style="height:100%">   
                                  <q-item class="col-auto row">
                                    <q-list bordered class="col rounded-borders">
                                      <q-expansion-item
                                        icon="buy" :dense="true"   label="Counter" color="orange" style="background-color:orange"
                                        >
                                          <template v-slot:header>
                                         <q-item-section>
                                          payIt Service
                                        </q-item-section>

                                            <q-item-section>
                                             pay using telebirr                                          
                                          </q-item-section>
                                          </template>
                                          
                                          
                                         
                                        </q-expansion-item>
                                          <q-separator  inset />
                                        <q-expansion-item
                                        icon="buy" :dense="true"   label="Counter" color="orange" style="background-color:orange"
                                        >
                                          <template v-slot:header>
                                         <q-item-section>
                                          Easy-pay
                                        </q-item-section>

                                            <q-item-section>
                                              #buyers ; Add to your Cart                                           
                                          </q-item-section>
                                          </template>
                                          
                                          
                                          <q-card class="items-center" style="background-color:white;">     
                                            <q-card-section>                                              
                                              <div  v-if="(_orderStep == 0) &&  (defaultItem['clients']?.length ?? false)">
                                                <q-item-label class="absolute-right q-px-sm">Step - 1</q-item-label>                                            

                                                Your OrderID : {{ defaultItem['clients'][0]['orderID'] }}
                                                <div class="q-gutter-sm row items-start q-pa-sm">
                                                    <q-input filled v-model="defaultItem['clients'][0]['orderID']" class="col-grow" label="OrderID" stack-label :dense="true" readonly />
                                                    <q-input type='Number'  outlined bottom-slots v-model="defaultItem['clients'][0]['quantity']" class="col-4" label="Quantity" min='1' :prefix="'+'" :dense='true' >
                                                      <template v-slot:hint>
                                                      </template>
                                                    </q-input>
                                                    <q-input filled v-model="defaultItem['clients'][0]['phone']" class="col-7" label="Phone_#" stack-label :dense="true" />                                 
                                                   

                                                    <q-btn color="indigo" no-caps  glossy unelevated  @click="_activeColumnOperation._confirmOrder()" label="Sent Order" :dense="true"/>
                                                
                                                </div>                                            
                                              
                                              </div>                                              
                                              
                                              <fieldset class="q-gutter-md row items-center q-px-sm q-py-none" style="border-radius: 5px;border:0px" v-else>  

                                                <q-item-label class="absolute-top-right q-px-sm ">Just Ordered. <q-btn rounded size="sm" no-caps label="New Order"  @click="_activeColumnOperation._initiateOrder()"/>
                                                                                  
                                                </q-item-label>                                             
                                                <legend class="flex justify-start q-py-none">OrderID :<q-item-label caption> <q-badge>{{ _orderIntiatedID  }}  </q-badge>  </q-item-label> </legend>
                                                <q-badge color="green" v-if="_orderConfirmDebuger"> {{  _orderConfirmDebuger  }}   </q-badge>                                            
                                         
                                              </fieldset> 
                                            </q-card-section>
                                          </q-card>
                                        </q-expansion-item>
                                        </q-list>
                                  </q-item> 
                                  <q-item  class="col-auto q-pa-xs " >
                                    <q-badge outline color='green' > {{  _orderDebuger }}</q-badge>
                                  </q-item>

                                  <q-separator spaced inset />
                                     

                                      <q-scroll-area class="col column" v-if="props.row.clients?.length ?? false">                                
                                        <q-item v-for="item,index in props.row.clients" :key="index"  class="col column">  
                                                                            
                                              <q-item-section v-if="props.row.clients[index] ?? false">

                                                <div class="row justify-between items-end q-gutter-sm ">
                                                  <div class="q-py-sm" v-if="props.row.clients[index]['served'] ?? false">

                                                          <div v-if="props.row.clients[index]?.['served'] == 'Requested' ?? false " >
                                                            <q-badge color="red" size="sm">Pending..</q-badge></div> 
                                                      
                                                          <q-item-label style="text-transform: capitalize;" >
                                                            <q-avatar size="14px"  :color="props.row.clients[index]['served'] != 'Queed' ? 'orange' : 'green'"></q-avatar>
                                                              {{props.row.clients[index].phone}} #{{props.row.clients[index].orderID}}
                                                          </q-item-label>                                                   
                                                  </div>
                                                    <!---- is current loged user/client--> 
                                                    <div  v-if="props.row?.['userID'] == Objprops.userID"> 
                                                          <q-btn round color='blue' flat icon="edit" @click="_passiveColumnOperation._selectArray(index)"> </q-btn>
                                                          <q-btn round flat icon="done" @click="_updateRow(false)" v-if="_onplayRowItemsideBoxIndex  == index"> apply </q-btn>
                                                          <q-btn round flat icon="delete" @click="_passiveColumnOperation._remove(index)" v-if="_onplayRowItemsideBoxIndex == index "> </q-btn>
                                                    </div>
                                                    <div v-else-if="props.row.clients[index]?.['userID'] == Objprops.userID">
                                                      <q-btn round flat color='orange' icon="edit" @click="_passiveColumnOperation._selectArray(index)" > </q-btn>
                                                        <!--q-btn round flat icon="done" @click="_updateRow(false)" v-if="_onplayRowItemsideBoxIndex == index"> </q-btn-->
                                                        <q-btn round flat icon="delete" @click="_passiveColumnOperation._remove(index)" > </q-btn>                
                                              
                                                      </div>
                                                                                       

                                              </div>                                       
                                              
                                              <div class="row q-gutter-sm" v-if="_onplayRowItemsideBoxIndex == index " >
                                                        <q-item-label style="text-transform: capitalize;">
                                                            <q-input  autogrow filled clearable
                                                            :shadow-text="textareaShadowText"
                                                                  @keydown="processTextareaFill"
                                                                  @focus="processTextareaFill"
                                                                  type="Number"  v-model="props.row.clients[index]['description']" 
                                                                  label="Delivery Remark" stack-label :dense="true"  />
                                                                
                                                        </q-item-label>                                                
                                                        <q-item-label style="text-transform: capitalize;" class="col">
                                                          
                                                          <q-select
                                                          :dense="true"
                                                                filled
                                                                v-model="props.row.clients[index]['served']"
                                                                :options="['Requested','Queed','Served']"
                                                                use-chips
                                                                stack-label
                                                                label="Served Status"
                                                              />                                                                                                      
                                                        </q-item-label>   
                                                </div> 
                                                <div class="flex flex-center  q-gutter-sm" v-else >
                                                        <q-item-label style="text-transform: capitalize;" class="col">
                                                            <q-input  autogrow filled 
                                                                  type="Number"  v-model="props.row.clients[index].quantity" 
                                                                  label="Quantity" stack-label :dense="true" readonly />
                                                                
                                                        </q-item-label>
                                                        <q-item-label style="text-transform: capitalize;" class="col">
                                                            <q-input  autogrow filled
                                                                  type="Number"  v-model="props.row.clients[index].price" 
                                                                  label="Price" stack-label :dense="true" readonly />
                                                                
                                                        </q-item-label>   
                                                        <q-item-label style="text-transform: capitalize;" class="col">
                                                            <q-input  autogrow filled
                                                                  type="Number"  v-model="props.row.clients[index].paymentMethod" 
                                                                  label="Payment" stack-label :dense="true" readonly />                                                        
                                                        </q-item-label>                                                

                                                </div>    
                                              </q-item-section>
            
                                              <q-item-section v-if="props.row.clients?.length ?? false">                                     
                                                    <div class="text-orange"> 
                                                      <q-item-label caption> {{  props.row.clients[index].time.split(',')[0] ?? ' ' + props.row.clients[index].time.split(',')[1] ?? ' ' }}</q-item-label>
                                                      
                                                          <q-itm-label class="row justify-start items-center " > Delivery Remarkk: <q-item-label class="text-black q-px-sm" caption> {{props.row.clients[index]['description']   }} </q-item-label> </q-itm-label>

                                                        </div>                                                                     
                                                      
                                              </q-item-section>

                                          </q-item>

                      

                                        </q-scroll-area>
                                   
                                        <q-list v-else>
                                        No Clients ( Buyers)
                                      </q-list>  

                                    </q-list>

                          </div>

                      </div>

                    <q-td v-else-if="props.row.saleitgr == null" auto-width class="col column  full-height" >
                        <q-card  class="col row q-gutter-sm" >
                          <q-skeleton class="col" square />
                        </q-card>

                    </q-td>

                    </q-tr>
  
                    </template>
              </q-table>
  
        </div>
   
<!-- sckelton of single_content-->
        <div class="col q-pa-md flex flex-center" style="height:90vh;" v-else>

          <q-card  style="height: 80vh;width:40%">

            <q-skeleton class="fit" square />

            </q-card>

            <q-separator inset />
         
        </div>
      <!----------------------LiveDATA Banner-->
  
     
  
          <!------------Zooming Level Adjuster Sticky-------------------------->
  
        
  
  
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
  import { _wiseDating } from "src/composables/utilServices/datePeriod"
  //----componenents..
  //------------------Global Variables [ uTILITIES..]
  const $q = useQuasar();
  //const $m = useMeta();  
  const router = useRouter();
  
  const metaData = {
    // sets document title
    title: "sale_itService",
    // optional; sets final title as "Index Page - My Website", useful for multiple level meta
    titleTemplate: (title) => `${title} - DashBoard`,
    // JS tags
    icon:"icons/favicon-32x32.png", 
  
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


  const genapsaleitContentOps = genapiStore(); //import { genapiStore } from "src/stores/jstStores/genapiStore";
  //-------
  let _thisDate=ref(new Date().toLocaleDateString())
  let nul = ref([undefined, "", null, false,"false",0,[],{},NaN]);
  function ArrayHaseem (base,items)  { //checking arrays within arrays
    return items.some(value => base.includes(value)) ? true : false };
  //let keyhasValue = (key) => reqData[key] != null && Object.keys(reqData[key]).length != 0 ? true : false;
  
  ////////////////////////
  const months = Array.from({ length: 12 }, (e, i) => {
    return new Date(null, i, null).toLocaleDateString("en", {
      month: "short",
    }); //short || long
  });
  

  //////////////////////////////////////////--------------Axios Wrapper UUUUUUPPPPPPPPPPPP
  //-------------USER PROFILE_Variables..
  
  let Objprops = defineProps({
    //----General Informations
    _profile: { type: Object, default: () => ({}) }, //user Datas all there is...
    //----User Credentials and Unique ID.
    //id: { type: String, default: "" }, //
    userID: { type: String, default: "" }, //
    userName: { type: String, default: "" }, //
    phone: { type: String, default: "" }, //phoneCode
    phoneCode: { type: String, default: "" }, //phoneCode
    location:{ type: Object, default: () => ({}) },
    geolocation:{ type: Object, default: () => ({}) },
    
    //-----------access Parameters
    //_anyAccess: { type: Object, default: () => ({})  },
    _isupgraded : { type: Boolean, default: false },
    _ispremium : { type: Boolean, default: false },
    _iss: { type: Object, default: () => ({}) }, //is the loged_user has privileged_routes...defintions

    _accessPackage: { type: Object, default: () => {}},  
    //----------------------empy model total privileges....
    _modalPriviledges: { type: Object, default: () => ({}) }, //user's privileges on general....with object of privileges =>{'empy':'regAdmin'}
  
    //-------------------(layout tunnel for command datas(signal))
    lytCreatRow : { type: Boolean, default: false },
    //--------Search Button Signal  
    lytSearchRow : { type: String, default: '' },
    _onPlayNavMedia : { type: String, default: '' },
  });
  //Objprops.lytCreatRow
  //===-----_--------THE MODEL/ MAIN_DATA....
  let _thisModel = "saleit"; // the Vue_Page_DataModel (Listing Collection Name)
  let _thisSchema=saleitSchema

  let _thisModelHeader = ref(_thisModel+" Managment"); // the Vue_Page_Data_Headers(Descriptions...)
  
  let acctypeStage = ref({

    'creator':[1,3,4,5], //who can create only & manage data with in ....the statu of not bought(chcked)
    //-----
    'isupgraded':[2,3], //who can buy only
    'isclient':[2,3],
    //-----
    'isgm':[1,2,3,4,5,6,7,8,10],
    //-----------
    'root':[1,2,3,4,5,6,7,8,10],  //outof stages_root
    })

//---current Modal Specific_privileges_analysis
let modalpriviledges = Objprops._modalPriviledges[_thisModel]['enum'] ?? Objprops._modalPriviledges[_thisModel]['venum']
let _thisModelPriviledges = ref(modalpriviledges); //current model's possible privileges list....objects ( .enum=[1,2,3])
let _thispriviledgedFor = ref(Objprops._accessPackage[_thisModel]); //user's priviledges on current model....string

let __isCreator =ref(false) //has it, creator(admin) [Group] or just_Columnist_access
try{
__isCreator =  computed(() => _thispriviledgedFor.value[2] ?? false ) //is admin/creator...
}catch{}

let __iss =ref([]) ;//is not admin/registrat.. but isstore,isfinance
try{
__iss =  computed(() => Objprops._iss[_thisModel] ?? false ) // ['isgm','issale']...take index_0 default
}catch{}

let __isStage = ref([])
try{
   __isStage = computed(()=>
  {
    let isStage = []
    for(let i in __iss.value){
    let sStage = acctypeStage.value[__iss.value[i]] == null ? false : __iss.value[i] 
    isStage =isStage.concat(acctypeStage.value[sStage])
    }
    return isStage;
  })
}catch{}
  

    //-----------------------  
  //------------------------------------------------------------COLUMNs----------------
//==============================================------------------------------------
let enableflscreen =ref(true)
async function _toggleflscreen (){ 
  enableflscreen.value = enableflscreen.value ? false : true;
  return true }
  //--------------
  let columns = ref([]); //Actual Table_Columns ++Descriptions
  let topLayerColumns = ref([]); //Actual OuterMost Table_Column_Names [Top(Layer_1] _Columns _Name_List]
  let authorizedColumns = ref([]); //Filtered/Authorized_Table_Columns ++Descriptions for Editing/Adding.... but not Viewing
  //------column invisiblity on table_
  const pagination = ref({ rowsPerPage: 50 });

  //columns_filter()-------- which to displayOn REgisterations form
  let lockedColumns = ref([ "userID","userName"]); //are blacklist of columns tobe not shown during the Registerations..form submitting
  let tableZooming =ref(1)
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

  //===============================================-----------------------------------
  //-----------------------DATAs ROWs--------------
  let rows = ref([{}]); //Data's projected with the Columns variable [ calling function.....Crud_.readDatas(top_100)]
  let rowsCount = ref(0);
    
  //===============================================-----------------------------------------
  //------------- MODAL ROWs_ MANAGMENT
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

  //inject filtering mechanism into store

rows = computed(() => {
  //let data = saleitService.getDatas;
  //let data = saleitService.Datas;
  //console.log(saleitService.Datas,'watching')
  //rows.value=data
  notifyit.info(('')+"New "+_thisModel + " Item Loaded..!");
  return saleitService.getDatas;

  let dataCount = data.length;
  if (data.length === 0) {
    setDLoading(true);
    return [{}];
  } else{
    notifyit.info((rowsCount.value - dataCount)+"New "+_thisModel + " Item Loaded..!");
    setCounter(dataCount);
    return saleitService.getDatas;
  }
});

function setCounter(num) {
  rowsCount.value = num;
}

  //===============================================-----------------------
  //-------------Syncing Columns
columns = computed(() => { 
  
    if (Object.values(Objprops).length === 0) {
      return [{}];
    } else {
      let tempColumns = []; //HOLDING_  all the Columns of the Data_model ( TOTAL Columns)
      let tempviewColumns = [];  ////--HOLDING_ all the "Visible" Columns of the Data_model ( TOTAL Columns)
  
      for (let schemaColumn in saleitSchema) {
        let _col = { 
          name: schemaColumn,
          schema: saleitSchema[schemaColumn],
        };
        tempColumns.push(_col);
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
  
      _buildDataModel();
      visibleColumn(tempviewColumns);
      return tempColumns;
    }
  });

  const topLayerColumn = async (schemaColumn) => topLayerColumns.value.push(schemaColumn); //Holding topLayer Name of Columns
  const authorizedColumn = async (_col) =>  authorizedColumns.value.push(_col);  //( Object List of author_columns Details)
  const visibleColumn = async (visibleCols) =>  visibleColumns.value = visibleCols; //.slice[0,topLayerColumns.value.length]

  async function _buildDataModel() {
    if (!authorizedColumns.value.length) {
      defaultItem.value={}
      logUser(); //
      return false;
    }    
     return await schemaSklt(authorizedColumns.value).then((_modelSkelton)=>{
      console.log('model Return',_modelSkelton)
      defaultItem.value=_modelSkelton
      logUser(); //
      return true
    }).catch((error)=>{
      defaultItem.value={}
      logUser(); //
    })
  }

let _defaultArray =ref({})
let _onplayDefaultColumn = ['phone',"userName","geolocation",'location','phoneCode']
async function logUser() { //should excute once on boot or on changing location(geolocation)
    for (let kkey of _onplayDefaultColumn) {
      try {
        defaultItem.value[kkey] = Objprops._profile[kkey];
      } catch {}
    }

    //defaultItem.value['comments']=[]
    defaultItem.value['userID']= Objprops.userID
    //defaultItem.value['clients']=[]
    let _thisDate=new Date().toLocaleString()
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    var result = ''
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    //defaultItem.value['clients'][0]={}
    defaultItem.value['clients'][0]['orderID']=result

    defaultItem.value['clients'][0]['userID'] = Objprops.userID ;//Object.assign(defaultItem.value['clients'][0],_client)
    defaultItem.value['clients'][0]['userName'] = Objprops.userName ;
    defaultItem.value['clients'][0]['phone'] = Objprops.phone ;
    defaultItem.value['clients'][0]['phoneCode'] = Objprops.phoneCode ;
    defaultItem.value['clients'][0]['confirmID'] = null ;
    defaultItem.value['clients'][0]['time'] = _thisDate ;

    defaultItem.value['clients'][0]['geolocation'] = Objprops.geolocation ;
    defaultItem.value['clients'][0]['location'] = Objprops.location ;
    //-----------
    //setted Comment (basic) information_ new Date().toLocaleString();
    defaultItem.value['comments'][0]['userID']=Objprops.userID;
    defaultItem.value['comments'][0]['time']=_thisDate;
    defaultItem.value['comments'][0]['userName']=Objprops.userName;
    //------------then re_assign to default too
    onplayRowItem.value = Object.assign({},defaultItem.value)
    console.log('logUser Out',onplayRowItem.value['clients'])
    return true
  }
  
async function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let _genNumber='st'//.append()
  for(let ii in [0,1,2,3,4,5,6,7,8]){
    _genNumber=_genNumber + String(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return _genNumber;
}

async function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  console.log(result,'result')
  return result;
}


//-------------filtering and Searching Methodss
//-----searaching on/off
let _enableRowFilter=ref(false)
//------------Setting up all the search attributes
const filter = computed(() => {
  return {
    search: Objprops.lytSearchRow,
  }});

  //-------------the search Engine..
function filterMethod(rows, terms) {

    if(_enableRowFilter.value){
      return rows
    }

    // rows contain the entire data
    let lowerSearch = terms.search ? terms.search.toLowerCase() : ""; //holding search bar...value
    const filteredRows = rows.filter((row, i) => {

      let _group0 = true;
      let _group2 = false;
      //let _group3 = true;
      
      //Assume true in case there is no search
     // let s1 = true; //If search term exists, convert to lower case and see which rows contain it

      if (lowerSearch != "") {
        _group0 = false;
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

  //let sS9 = quickFilter.quickOOptions.Issued && row.catagories == "RaWMatterial";


  //check if any of the conditions match..
  //console.log(_group0,lowerSearch,'grouppppppppp00000000000')
  if(_group0){
    return true
  }return false

  //return ans;
});
//filteredRows.length ? notifyit.simple(filteredRows.length + " - Asset Item Founded") : ""
return filteredRows;
}

var _querySE=ref({_trend:'', catagory:'',usage:'New',content:''})
//saleitService.set_syncQuery(_querySE.value)   
let syncInt = setInterval(saleitService.asyncDatas, 60000);
var _intSpeed=ref(300)
async function _itServiceSE(_queKey='usage',_value=''){

  _querySE.value={}
  _querySE.value[_queKey]=_value
  console.log(_querySE.value,_queKey,_value,'querrring..')
  saleitService.set_syncQuery(_querySE.value)   

   rows.value=[]
  _resetOnPlayRowItem()
  clearInterval(syncInt)
  syncInt = setInterval(saleitService.asyncDatas, 60000)
  return true
}
_itServiceSE()
//beforeDestroy() {
    // Clear the interval when the component is destroyed to avoid memory leaks
 //   clearInterval(this.intervalId);
 // },

//------------------------------------------SYNCING DATA With Store

  //---------------------Syncing.....DATA---controlle syncing (on || off)
  //-------forms
  let _formsMeta=ref({
    'updatorPop':true,
    //-----------------forms collapsing/show commands
    'pricing':true,
    'description':true,
    'location':true
    //------------------
  })

//---------------
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


    ///-----------------------File Operations and setting  UP(Folder) vs Down(Camera)
async function _fileAsSRCOpsCall(SRCIndex){
  //_onplayRowIndex.value=index
  if(_fileAsSRCOps.value){
    _SRCDelOps(SRCIndex)
  }else{
  _fileAsSRCIndex.value=SRCIndex
  }
  return true
}
async function _SRCDelOps(SRCIndex){
  _fileAsSRC.value.splice(SRCIndex,1)
  _fileAsRaw.value.splice(SRCIndex,1)
  return true
}

async function _fileAsStringOpsCall(StrIndex,index = null){
  _onplayRowIndex.value=index
  _fileAsStringIndex.value=StrIndex
  return true
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

  //_fileAsSRC.value = []
  //_fileAsRaw.value=[]

return true
}
    ///-----------------------File Operations and setting  UP(Folder) vs Down(Camera)

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

//---------------------------------------------
class _cameraDevice{
  //this._navigateDevice();

    constructor() { //_init_onPlayNavigator class
        console.error("ffffffffGeolocation is  supported by this browser.");
        try{      // Check if geolocation is supported by the browser

        }catch{    }   
      }
    async _navigateDevice  ()  {  //navigate_phone_function
        console.error("Navigating mediaDevice.");
              if (Objprops._onPlayNavMedia ?? false) {
                    _listNavDevices.value['getUserMedia'] = Objprops._onPlayNavMedia.getUserMedia ?? {}      
                    for(let mediaDevice of ['getUserMedia','webkitGetUserMedia','mozGetUserMedia','msGetUserMedia']){
                        var _doesCamera = navigator[mediaDevice] ?? false
                        if(_doesCamera){
                        _listNavDevices.value[mediaDevice] = _doesCamera
                        }
                    } //this._onPlayMediaDevice= _onPlayNavMedia.value.mediaDevices['getUserMedia']
                    console.error("Navigating mediaDevice.00000000",_listNavDevices.value);
                
                  } else { // Geolocation is not supported by the browser
                            console.error("MediaDevice is not supported by this browser.");
                            }    
            return true   
          }

        async _enumNavigateDevice  (){
            try {
            return await Objprops._onPlayNavMedia.enumerateDevices().then((_camDevices)=>{
                  _listCameraSource.value = []
                  for(let index in _camDevices){
                    let _camDevice = _camDevices[index]
                    //console.log('graphic device',_camDevice)
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
              console.log('Error No Camera Detected...Know this');
            }  
          return true
    }

    async _openCamera (_attributeName=''){

          if (_listNavDevices.value['getUserMedia'] ?? false) {  //in priority use ( this device_ for media_sources)
              await this._enumNavigateDevice()
              _resetFileSource()
              //------------
              _cameraBox.value=true
              //-------
              _fileAttributeName.value=_attributeName
              //------------------
              _fileSourceFoCam.value='camera'   
              //--------
              if(_selectedCameraById.value == ''){//if 'user'
                _liveFeedRawVidAttribute.value['facingMode']=_selectedCameraByface.value ? 'user':'environment'
              }
              else{
                _liveFeedRawVidAttribute.value['deviceId'] = { exact: _selectedCameraById.value };
                _liveFeedRawVidAttribute.value['facingMode'] = _selectedCameraByface.value ? 'user':'environment'
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
    async _operateDevice  (cmd) {

            if(cmd == 'pause'){ _liveFeedRawStreaming.value.pause()    }
            else if(cmd =='play'){_liveFeedRawStreaming.value.play()   }
            return true
          }
    async _saveScreenShoots (){
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
      //--------
      _saveFileSource()
      return true
    }
    async _screenShoot (_remove=false){

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
    //--------------setting camera_view & Mic
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
var _cameraInstance = new _cameraDevice()
_cameraInstance._navigateDevice()
//--------------------------------ROWS_SCHEMATIC FORMS

//-------------- POPUP_Box Controller functions
let _popRegisterDialogBox = computed(() => { return Objprops.lytCreatRow}) //Layout_listening for pop_creator
watch(_popRegisterDialogBox, async (cv, ov) => {
    onplayRowItem.value = Object.assign({}, defaultItem.value); //deep copy item_objects with deep reactivity ( reactivity could lost... after multiple copying b/n or due depth increasing)
    _onplayRowIndex.value = 0;//rows.value.indexOf(item); 
   return await _onplayRowItemBoxset('CreateRowItem');
  });  //POP_Controller From Parent Layout_For New Registration of RowItem

//POP_Controller From With (Side_Bar)_For UpdateRowItem_RowItem
async function _onplayRowItemBoxcall(_onplayrowIndex){
    onplayRowItem.value = Object.assign({},rows.value[_onplayrowIndex])
    _onplayRowIndex.value = _onplayrowIndex;
    return await _onplayRowItemBoxset('UpdateRowItem');
  }
//-----POP_UP Box Controller Room
  async function _onplayRowItemBoxset(_rowOps='') {
     //await _resetOnPlayRowItem()
    _onplayRowItemOps.value=_rowOps
    _onplayRowItemBox.value = !_onplayRowItemBox.value;
    return true;
  }

//------SIDE_Wise Operations and Applications
let saleitContentOps = ref();
saleitContentOps.value={
 'Buy':["Buying Options","market","buy",0],
 'Comment':["Comments","collections_bookmark","comment",0],
 'like':["likes","assistant","like",0],
 'edit':["edit Content","group","edit",0],
 'delete':["delete Content","delete","delete",0],
 //------more (option)
 'more':["Locate Your Need","more","more",0],
}

//-------Listening for SideBox Operations & Visualizing
async function _onplayRowItemsideBoxcall(_onplayrowIndex='',Ops=''){

    if(_onplayRowIndex.value == _onplayrowIndex && Ops == _onplayRowItemsideBoxOps.value){
      _onplayRowIndex.value = null;//rows.value.indexOf(item); 
    }else{
      await _resetOnPlayRowItem()
      //----------SET_ROW
      onplayRowItem.value = Object.assign({},rows.value[_onplayrowIndex])//reactive(rows.value.id[_onplayrowIndex])//Object.assign({}, item));
      _onplayRowIndex.value = _onplayrowIndex;//rows.value.indexOf(item); 
      //----------SET Columns
   //_setpopSideBox.value  = false; //true,..
      _onplayRowItemsideBox.value= true //default(main operations of pop_side box)
      _onplayRowItemsideBoxOps.value=Ops
    }
    return true;
  }

async function _resetOnPlayRowItem(){

      console.log('reseting onplayRow')
        //--------reset _onplayRowItem ( Big_Fish)
      _onplayRowItemOps.value  = null; //_is UpdateRowItem/Creating_New
      _onplayRowIndex.value = null; //_row_item_index..0/1/2
      
      _onplayRowItemBox.value  = false; //true...
      
      //--------reset _onplayRowItem-SideBox ( Little_Fish)
      _onplayRowItemsideBox.value  = false; //clients,...
      _onplayRowItemsideBoxOps.value = null; //editing,deleting,creating
      _onplayRowItemsideBoxIndex.value = null; //array_index_0/1/2/3
    return true
}

//------operations OVer POP_Up_Box
  let _passiveColumnOperation ={
    //---Enabling Array_Index_For Operations (Select_Index)_For ---Editing:Deleting--Applying--
  _selectArray:async(arrayIndex=null)=>{ // activate give array for operations of below options
    _onplayRowItemsideBoxIndex.value = (_onplayRowItemsideBoxIndex.value == arrayIndex) ? null : arrayIndex
    return true;
  },
  //-----------Operations on selected array
  _remove:async (arrayIndex=null) =>{
      _onplayRowItemsideBoxIndex.value= null; //which is null;;;
       onplayRowItem.value[_onplayRowItemsideBoxOps.value].splice(arrayIndex, 1);
    return await _updateRow().then((response)=>{
      return true
    })
  },
  
  //--------------------------
  _add:async ()=>{ //default_value for sideBox
      _onplayRowItemsideBoxIndex.value= null; //it would Create Default_Form(like )
      return true;
  },

  _submitArray:async ()=>{
    onplayRowItem.value[_onplayRowItemsideBoxOps.value].unshift(defaultItem.value[_onplayRowItemsideBoxOps.value][0]);
    return await _updateRow().then((response)=>{
      return true
    })
  },

}

//---------------------Byuers and related Data Schema
let _orderStep =ref(0)

///--------Order_Intiations Stage
let _orderDebuger=ref('Orders List..')//
let _orderIntiatedID=ref('')
let _orderIntiatedPhone=ref('')

//-----
let _orderConfirmationRespID=ref('')//

//---------Order_Confirmations Stage
let _orderConfirmDebuger=ref(false)//
let _orderConfirmationID=ref('')//
let _orderConfirmationQuantity=ref('')//

//--
let  _activeColumnOperation = { 
  _initiateOrder:async (arrayIndex=0) =>{ //Set_New OrderID ___For__DefaultRowItem
  
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      var result = ''
      for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      defaultItem.value['clients'][0]['orderID']=result

    _orderDebuger.value= 'Personal Orders'
    _orderStep.value=0
    ///-----------------------------
    //set New_orderID for defaultItem
    _onplayRowItemsideBoxIndex.value= null; //it would Create Default_Form(like )
    console.log(defaultItem.value['clients'],'reintiate order')
      return true
    
  },
  
  _confirmOrder:async () =>{
       _orderDebuger.value='Processing'
       _orderStep.value = 0
      //---------set custom value ( & wait as step_one)
      onplayRowItem.value[_onplayRowItemsideBoxOps.value].unshift(defaultItem.value[_onplayRowItemsideBoxOps.value][0]); //Inject the Data into_ OnplayRowItem & to be sented.
      console.log(defaultItem.value[_onplayRowItemsideBoxOps.value],'adding buyer')
   
      return await _updateRow().then(async (_confirmResult)=>{
          if(_confirmResult){
            _orderDebuger.value= 'Order Succeded.' //Confirmations message to wait for sms & re-enter
            _orderStep.value = 1
            //-------------grab Order_confirm Information (& enter into step_two)
            _orderIntiatedID.value= defaultItem.value[_onplayRowItemsideBoxOps.value][0]['orderID']; //Hold _Sent_OrderID & Whic is Confirmed
            _orderIntiatedPhone.value= defaultItem.value[_onplayRowItemsideBoxOps.value][0]['phone'] //Confirmations message to wait for sms & re-enter
            //------Ready for New Order
            return true          

          }else{}
            onplayRowItem.value[_onplayRowItemsideBoxOps.value].shift()
            _orderDebuger.value='Request Failed, Try New Order'
            //------Try with New Order
            return true         
      }).catch(async ()=>{ 
            onplayRowItem.value[_onplayRowItemsideBoxOps.value].shift()
            _orderDebuger.value='Try New'
            _orderStep.value = 1
            //------Try with New Order
            //defaultItem.value[_onplayRowItemsideBoxOps.value][0]['orderID']= _newID
            return true          
        })
  }}
//---------------Operating on Row
 //Operating without setting onplayrowItem ( directlly calling for effect) === active _operations
 let  _activeRowOperation = {

      _rating : async (_onplayrowIndex) =>{
        onplayRowItem.value = Object.assign({},rows.value[_onplayrowIndex])//reactive(rows.value.id[_onplayrowIndex])//Object.assign({}, item));
        _onplayRowIndex.value = _onplayrowIndex;//rows.value.indexOf(item);
        _onplayRowItemOps.value='UpdateRowItem'
        return await _updateRow()
      },

      _likes : async (_onplayrowIndex) =>{
        onplayRowItem.value = Object.assign({},rows.value[_onplayrowIndex])//reactive(rows.value.id[_onplayrowIndex])//Object.assign({}, item));
        _onplayRowIndex.value = _onplayrowIndex;//rows.value.indexOf(item); 
        _onplayRowItemOps.value='UpdateRowItem'
        //---------set Value
        if(onplayRowItem.value['likes'] == null){
          onplayRowItem.value['likes']={'like':1}
        }
        onplayRowItem.value['likes']['like'] =onplayRowItem.value['likes']['like']+1

        return await _updateRow()
      },

      _delRow : async (_onplayrowIndex,itemId) =>{

        return await Crud_.deleteData(itemId)
        .then((response) => {
          if (response) {
            notifyit.warn("", "bottom-left", null, 10000);
            rows.value.splice(_onplayrowIndex, 1);
          } else {   }
          return true;
        })
        .catch((error) => { return false; });
      } 
}
//--------------------------------------METHODS & PROCESS
async function _createRow(_isthereFileCapsulated = false) {  //UpdateRowItem User DAta with no graphic to update
      //---set--loading row operation
      _onplayRowItemOpsStatus.value=true
      //--------even defaultRowItem has clients & comments default_array_value ( ignore it while creating new)
      onplayRowItem.value['clients']=[]
      onplayRowItem.value['comments']=[]
      //is File Encapsulated ( if so ) ... extract the file by choosing ( either it was from folder or from camera_directlly )
      if(_fileAttributeName.value != null){
          //let _fileName = nul.value.includes(__fileAttrName) ? __filesAttrName : __fileAttrName
          onplayRowItem.value['upload']={'file':_fileAttributeName.value,'files':_fileAttributeName.value}
          onplayRowItem.value[_fileAttributeName.value]=_fileAsRaw.value
        }
      _fileAttributeName.value=null
      //---Creat the Content... which is with/out of file encapsulations
    return await Crud_.createData()
        .then(async (response) => {
        _onplayRowItemOpsStatus.value=false
          if (response) { 
            //---right after the content has been created change the mode from creating to UpdateRowItem
            onplayRowItem.value = response
            notifyit.succes("", null, null, 7000);
            _resetOnPlayRowItem()
            return true
          } else { }
          //--unset--loading row operation
          return false
        })
        .catch((error) => {//_popUpgrader.value = false;
          //--unset--loading row operation
          _onplayRowItemOpsStatus.value=false
          return false;
        });
}

async function _updateRow(_isthereFileCapsulated = false) { //UpdateRowItem User DAta with graphic to update or not
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

  //----=========================================================================---DATA ---/// ---ROW----CRUD
//----------------
let createKey = "";
let updateKey = "id";
let delKey = "id";

const _theService = saleitService
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
      .then((response) => { //returning as [false,response_obj]
        if (response[0]) { //
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

    console.log('crud_',onplayRowItem.value)
    return await _theService
      .updateData(onplayRowItem.value, objParam)
      .then((response) => { //returning as [false,response_obj]
        if (response[0]) {
          return response[1];
        } else {
          notifyit.warn("" + response[1]);
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

    return await genapsaleitContentOps
      .readData(modelUrl,objParam)
      .then((response) => { //returning as ['data'][{},{},{data..}]
      if (response) {return response;
        } else {f
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
    
    return await genapsaleitContentOps
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
        icon:'dislike',
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
        icon:'like',
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


let showDate = ref("")// curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
let showTime = "" //
let showDay = ref("") //
let breakTime = ref(false) //

var days =ref(0)
var hours =ref(0)
function _dateCounter(startDate) {
  var timeDifference = new Date() - new Date(startDate)
  // Calculate days and hours from milliseconds
  days.value = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  hours.value = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //var minutes = Math.floor(((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return true;
}

function _igniteDCounter(delay,startDate){
  setTimeout(function() {
  _dateCounter(startDate);
}, delay);
}



  //----color_Plate
  const cp =  ['red','black',"blue",'green','orange','yellow']
  //------------------------------------------------------------------------------ Warming UP(BIOS_Process.....POST)

  </script>
  
  
    <style>
  
  
  /*=====================  Fronted_Glass / Blur Styles as OverLay Background... */

  
  @keyframes myfirst /* Firefox */{
             50% {
                     opacity: 50;
                 }
  }
  </style>