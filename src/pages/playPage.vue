<template> 
<q-dialog v-model="__thisBox"       
:style="{ 'background-image': 'url(' +  _this?.saleitgr ?? '' + ')' }"
      class="fit shadow-5 column" >
    
    <q-card style="min-width:30vw;" class="overlay-Glass   " v-if="_this ?? false">
  
      <!----HEADER-TOP Begin--> 
      
          <q-linear-progress :value="0.8" color="orange" />

          <q-card-section class="row items-center no-wrap q-pa-none"  >
            <div class="col " style="max-height:50vh;" >
          <q-img            
              loading="lazy"
               style="min-height: 50vh;aspect-ratio: 2/1.5;"
                      :src="_fileAttributeName ? _fileAsSRC[_fileAsSRCIndex] : _this['saleitgr'][_fileAsSRCIndex]">  
                  
                            <div class="absolute-full transparent column justify-between " >
                              
                              <div class="row" style="min-width:10vw" >
                                    <div class="col fontdstyle text-dark">
                                      <q-btn round icon="add" color="orange" @click="_this['quantity'] = parseFloat(_this['quantity'])+1" />  
                                      Quantity                                   
                                    </div>
                                    <div class="column col-auto q-gutter-xs  " style="width: 5vw;">                                        
                                            <q-item-label class="text-orange">Upload Via  </q-item-label>
                                            <input type="file" multiple ref="openFolder" style="display: none" @change="_fileSourceFolder($event,'saleitgr')" /> 
                                            <q-btn class="bg-orange" icon="folder" @click="$refs.openFolder.click()" :dense="true" />
                                            <q-btn class="bg-orange" icon="add_a_photo" @click="_cameraInstance._openCamera('saleitgr')" :dense="true"  />
                                      </div>
                                </div>
               
                                    <div class="flex  fontestyle">
                                      <q-item-label> {{_this['header'] }}</q-item-label>

                                    </div>


                              <div class="col row justify-between">
                               
                                    <div class="self-end justify-left col-auto "> 
                                              <div v-if="__thisOps == 'CreateRowItem'"  style="background-color:rgba(106, 93, 255,0.6)" >
                                            
                                                <q-btn     :loading="__thisOpsStatus" class="bg-white fontestyle shadow-7  q-pa-xs" color="orange" :label="_pageSettings.language ? 'ሽጥ' :'Create Sale'"  icon="upload" 
                                                @click="Create_this()"  >
                                                    <!--template v-slot:__thisOpsStatus>
                                                      uploading...
                                                      <q-spinner-radio class="on-left" />
                                                      uploading...
                                                    </template-->
                                                    </q-btn>                                                

                                              </div>   

                                              <div v-else   >                                    
                                              
                                                <q-btn  rounded   :loading="__thisOpsStatus" class="bg-black shadow-7  fontestyle q-pa-xs" color="green" :label="_pageSettings.language ? 'ሽጥ' :'Update Sale'"  icon="upload" 
                                                @click="Update_this()" />
                                               
                                              </div>        
                                      
                                        </div>
                                        
                                        <div class="self-end justify-right col-grow column  q-pa-xs" v-if="_fileAsSRC?.length ?? false"  style="max-height:100%;" > 
                                          
                                              <div class="self-end justify-right col row bg-orange fontastyle q-pa-xs" v-if="_fileAsSRC.length > 1">
                                                  <q-checkbox
                                                        left-label
                                                        v-model="_fileAsSRCOps"
                                                        :label="_pageSettings.language ? 'መደምሰሲ' :'Enable Delete'"
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
              <q-input type="Number" class="col fontestyle" :min="1"    outlined v-model="_this['quantity']" :label="_pageSettings.language ? 'በዝሒ' :'Quantity'"  stack-label   />
              <q-input type="Number" class="col fontestyle " :min="1"   outlined v-model="_this['price']"  :label="_pageSettings.language ? 'ዋጋ' :'Price'" stack-label  />
            </div>
    
            <q-select outlined   class="col-md col-xs q-pa-none" style=""  color="purple-12" v-model="_this['catagory']" :options="saleitSchema['catagory']['enum']"  :label="_pageSettings.language ? 'ምድብ' :'catagory'" />
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
                 Descriptions   :rules="[_valRules]" 
             </legend -->
               <div class="row q-gutter-sm  " > 
                <q-input type="Number" class="col fontestyle" :min="1"  outlined v-model="_this['quantity']" :label="_pageSettings.language ? 'በዝሒ' :'Quantity'"  stack-label   />
                <q-input type="Number" class="col fontestyle " :min="1"  outlined v-model="_this['price']"  :label="_pageSettings.language ? 'ዋጋ' :'Price'" stack-label  />
                <q-input type="Number" class="col fontestyle " :min="1"  outlined v-model="_this['discount']" label="Discount Price ?" stack-label  />
   
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

  <dialogOne :isOpen="_cameraBox" @emitClick0="_cameraBox = $event" class="column overlay-Glass rounded-borders bg-orange " >
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
</dialogOne>

<q-dialog v-model="_fileAsPathSlide" class="column saleitContentOps-Glass bg-orange ">
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

<!----Detail View-->
<!-- Dialog Windows and ... -->
<dialogOne :isOpen="status_thisDetail" @emitClick0="status_thisDetail = $event">
          <div v-if="_this_Details" class=" " :set="_details = _this_Details[0]">
            <div class="cardPopDetails" style="">

              <div class="row no-wrap q-gutter-sm">
                        <q-img   loading="lazy"  style="min-height:20vh;aspect-ratio: 2/1;"
                            :src="_details['saleitgr'][0]">    
                            
                            </q-img>

                            <div class="col-1 column q-gutter-xs ">

                          
                                <q-img :src="immg"  class="shadow-3" v-for="immg in _details.saleitgr" :key="immg" >
                                    

                                  </q-img>


                            
                            </div>
              </div>

              <div class="boxastyle"></div>

              <div class="cardPopDetails-title">
                  {{ _details.header}}
              </div>
              <div style="" >
                <p class="cardPopDetails-content">
                  {{ _details.content}}
                </p>
              </div>            

              <div class="row">
                  <div >

                    <div class="cardPopDetails-meta">
                      <div class="fontdstyle">{{ _details.userName}}</div>
                      <div>Call Us: <b>{{_details.phone}}</b></div>
                      <div >{{_details.location.country}} {{_details.location.provinance+' '}} {{_details.location.city+' '}} {{_details.location.street+' '}}</div>
                      <div> {{_details.createdAt}}</div>               
                    </div>
          
                <div class="boxastyle"></div>

                <div class=" row cardPopDetails-items">
                  <div class=""> <div>Price:</div><div class="boxastyle bg-orange">{{  _details.price}} </div>   </div>
                  <div class=""> <div>Quantity:</div><div class="boxastyle bg-orange">{{  _details.quantity }} </div>  </div>
                  <div class=""><div>#Buyers:</div><div class="boxastyle bg-orange">{{  _details.tClient }} </div>   </div>
                </div>

                <div class="cardPopDetails-items">
                  <div class=""> Likes: <div class="boxbstyle">{{  _details.likes.like }} </div>  </div>
                  <div class=" "> Rating:<div class="boxbstyle">{{  _details._itServiceRating }} </div>   </div>
                  <div class=""> trendScore:<div class="boxbstyle">{{  _details.trendScore ?? 0 }} </div>  </div>
                </div>

                  </div>
                
                  <div class="col boxbstyle  column justify-center items-center">
                      <h2>{{ _details.price}} {{   _pageSettings['currency']}} </h2>
                      <q-tooltip class="bg-orange fontbstyle"> Unite Price</q-tooltip>

                  </div>
              </div>

            </div>
          
            <div class="row justify-evenly q-gutter-sm q-py-sm">
                <q-btn v-if="_is_this_open"  color="orange" class="col"  label="Direct Buy (Qty = 1)" @click="_this_foreignOperation._newbuyer_foreign('buy')" icon="shops" />
                <q-btn color="green"  label="Add to cart" @click="_this_foreignOperation._newbuyer_foreign('cart')" icon="save" />
            </div>

          </div>

          <div v-else class="fontestyle text-white">
            Loading ...
          </div>

</dialogOne>


<!-- //-------------------------- -->
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

  <q-page class="fit column rounded-borders fontastyle    "  >
          <!------------------------------ ioio ----->     
        <div class="col q-pa-none column fit" v-if="(_this_Rows ?? false)"    >

              <q-table  v-if="_pageSettings['tableView'] == 'main'"
             
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
                  <q-tr :props="props"  class="col-auto column q-px-md transparent" 
                  style="position:fixed;z-index:1;" :style="$q.screen.lt.sm ? 'top:8vh' : 'top:7vh'"  >
                   
                    <q-scroll-area  class="col-grow column transparent flex flex-center" style="min-width:95vw;">
                      <div class="col-grow row justify-between q-gutter-sm q-px-md  no-wrap saleitHeader-Glass " style="min-width:100%;max-height:100%;"> 
                                            <div class="row q-gutter-sm ">
                                              <q-separator inset vertical class='q-py-sm'  />

                                            <q-btn rounded  size="sm" no-caps  @click="this_Query(null,'',16)"  class="col-auto fontdstyle"  >
                                             Show All  
                                            </q-btn>

                                            <q-separator inset vertical class='q-py-sm'  />
                                            <q-btn rounded no-caps :class="((_this_Query.qweight ?? false) && _this_Query.qweight[1]) == _qvalue0 ? 'bg-orange-3 text-white' : ''"  
                                            size="sm" v-for="_qvalue0,_qgroup0 in saleCatagory"  
                                            @click="this_Query('catagory',_qgroup0,_qvalue0)" :key="_qvalue0" class="column col-auto q-py-xs" >

                                                <div class='fontastyle'>       {{  _qgroup0 }}   </div>
                                                     


                                            </q-btn>  

                                            <q-separator inset vertical class='q-py-sm'  />
                                            </div>
                                            <div>

                                                <q-btn rounded outline no-caps :class="((_this_Query.qweight ?? false) && _this_Query.qweight[2]) == _qvalue1 ? 'bg-grey-5 text-white' : ''"   
                                            size="md"  v-for="_qvalue1,_qgroup1 in saleUsage" 
                                            @click="this_Query('usage',_qgroup1,_qvalue1)" :key="_qvalue1" class="col-auto" >
                                            <div class='fontdstyle'>       {{  _qgroup1 }}   </div>
                                            </q-btn>                                                               
                                           
                                            <q-space />  
                                            </div>
                                                                                                
                                          
                      </div>

                      
                  </q-scroll-area>             
                    <lable class="row justify-center fontastyle" v-if="!_this_Rows.length">
                      No Data
                    </lable>
                  </q-tr>
                 
                </template>

                <template v-slot:body="props"  >
                     
                  <!--row Object [key(id=?)],row,_trClass,cols,sort,rowIndex,color,dark,dense,expand]-->
                 
                  <q-tr    
                    :props="props" :class="!$q.screen.lt.sm ? 'row' : 'column'"
                    class="col-11 q-gutter-xs q-tr--no-hover fit transparent fontbstyle"  
                    style="min-height:75vh;width:98vw;padding-top:5vh;border:0px solid blue;"
                  >
                              
                    <!------------------ iterating _ body cell-->
                   
                    <q-td  auto-width class="col-2 " v-if="__this_foreignBoxsubOps != 'view'">  
                                  
                    </q-td>
                    <!--   Content (if >sm)       --->
                    <q-td  :class="$q.screen.lt.sm ? 'col-6 column' : 'column col-6'  " v-if="props.row.saleitgr ?? false"  >

                          <div class="col row ">
  
                              <div class="col column" >
                              
                                  <q-img                                 
                                              loading="lazy"
                                              :src=" (__thisIndex == props.rowIndex) && _fileAsPathIndex ? props.row.saleitgr[_fileAsPathIndex] : props.row.saleitgr[0]"
                                              spinner-color="orange"
                                              class="column  rounded-borders fit shadow-8" style="max-width:100%;border-radius:12px;aspect-ratio: 2/1;"                                            
                                              >
                                              
                                        <q-list class="column col fit fontbstyle q-px-none" :class="props.row.phone ? 'transparent': 'transparent'">
                                          <q-item class=" col-auto row items-top q-px-none justify-between items-start"> 

                                           <div class="col-sm-5 col-md-3   q-py-none fit-width q-gutter-xs" style="">
                                                <q-btn v-if="props.row.fphone ?? false" class="col-auto q-pa-none" @click="this_Query('userID',props.row.userID ?? null)">

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
                                                          {{ _fileAsPathIndex ?? 'ff'}}
                                                          </div>
                                                <div v-else> {{props.row.fupdatedAt}} </div>

                                              <div class="col-auto column no-padding no-margine q-gutter-xs " style="border:0px solid orange;">

                                                  <q-btn outline v-for="item,fileIndx in props.row.saleitgr" @click="_fileAsPathOpsCall(fileIndx,props.rowIndex)" :key="fileIndx" 
                                                  @mouseover="_fileAsPathOpsCall(fileIndx,props.rowIndex)"
                                                  class="col-1 column  transparent q-pa-none no-border " style="max-width:6dvw">   
                                                        <img :src="item" class="col fit shadow-2 transparent rounded-borders q-pa-none" style="aspect-ratio: 1/1;width:100%;" >
                                                      
                                                  </q-btn>                                              

                                                  
                                              </div>
                                                    <q-btn flat  :dense="true" icon="zoom_in" @click="_fileAsPathSlideCall(props.rowIndex)" @mouseover="_fileAsPathSlideCall(props.rowIndex)"> 
                                                      <q-tooltip>Look Closer</q-tooltip>
                                                    </q-btn>
                                            </div>

                                            <div v-if="_orderBox.includes(props.row.id)" class="fontastyle ">     Added to cart                                         
                                                  <!--div v-if="props.row.buy =='buy' ?? false" style="color:orange"> Already Bought </div>
                                                  <div v-else> Added to cart </div-->
                                            </div>
                                                  <!--q-item-section class="col columns row items-end float" >
                                                          <q-item-label>D_QueryW {{ props.row.qweight}} </q-item-label>
                                                          <q-item-label>Prof_W {{ Objprops._profile.qweight}} </q-item-label>
                                                          <q-item-label> Revenu:- {{ props.row['tPrice'] }}</q-item-label>
                                                  </q-item-section--->

                                          </q-item>
                                      
                                          <q-item class="col-auto row justify-between content-start q-px-none q-mx-none">
                                        
                                          </q-item>

                                          <q-item class="absolute-bottom fontdstyle items-center  q-gutter-sm row items-end ">
                                            <div class="col row " >  <!---------------------Conteting While in NOT Mobile Screen-->
                                              <q-item-section class="q-py-sm fontbstyle col row"  >                                                      
                                                    <div class="col-auto column  justify-start q-pa-sm" >

                                                      <div class="col-auto row q-pa-xs q-ma-none">
                                                        <div class="col-auto justify-right q-py-none saleitContentOps-Glass fontbstyle" >
                                                          {{ props.row.header }}
                                                          <!--   {{ props.row.catagoryScore }}/{{ props.row.usageScore }} /{{ props.row.trendScore }}   -->
                                                        </div>
                                                      </div>
                                                      <div style="width:90%;">
                                                       
                                                        <pre style="overflow:scroll;text-overflow: ellipsis;" class="fontdstyle">     
                                                          {{ props.row.content }} 
                                                        </pre>

                                                      </div>
                                                    </div>                                                      

                                                </q-item-section>
                                             
                                                <q-item-section class="row col-auto q-px-none  saleitContentOps-Glass">
                                              <!--  -->
                                                    <div class="col-auto fontastyle row no-wrap q-gutter-sm"> 
                                                            <q-btn size="md" no-caps icon="shop" v-if="(props.row?.price ?? false) && (props.row?.quantity ?? false)"  
                                                            class="fontestyle bg-orange col-grow" :label="_pageSettings.language ? 'ይዓድጉ' :'Buy'" 
                                                            @click="_this_clientActivator(props.rowIndex)"/>

                                                            <q-btn class="col-grow" label="Add to Cart" no-caps color="black"  @click="_this_ActiveOperation._toCart(props.row.id,'clients')" />
                                                            
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
                                                              <q-item-label class="text-strike text-red q-pa-sm">{{ props.row.price  }}</q-item-label>{{  props.row.discount }} {{    _pageSettings['currency'] }} (New Price)
                                                          </div>  

                                                          <div class="col-grow q-gutter-md  flex-center fontestyle row" v-else> 
                                                            
                                                            
                                                            {{  props.row.price }} {{    _pageSettings['currency'] }} ( Price )
                                                                
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

                                                          <q-btn flat size="sm" :dense="true" class="flex-center row" icon="shop"   @click="_this_clientActivator(props.rowIndex)"
                                                            />
                                                          <q-btn  flat size="sm" :dense="true"  class="text-blue"    @click="_this_ActiveOperation._likes(props.rowIndex)">
                                                            <q-badge class="bg-black text-white fontcstyle" color="orange" floating v-if="props.row.likes ?? false">{{  props.row.likes.like }}</q-badge>
                                                            <!--q-icon :name="matThumbUp" size="sm"/-->
                                                            <q-icon color="red" name="favorite" size="sm"/>
                                                          </q-btn>

                                                          <q-btn   flat size="sm" :dense="true"  icon="message"  @click="_this_chatActivator(props.rowIndex)">
                                                            <!--q-tooltip :dense="true" class="bg-black text-white fontbstyle"  self="left middle">comments</q-tooltip-->    
                                                          </q-btn>

                                                      

                                                          <!--q-btn  flat icon="map"  :dense="true"  @click="__thisBox_UDialog(props.rowIndex)"> 
                                                            <q-tooltip class="bg-black text-white fontcstyle"  self="top middle">   map </q-tooltip>  
                                                          </q-btn -->
                                                          <div v-if="Objprops._profile.phone == props.row.phone" class="column">                   
                                                                <q-btn round  :dense="true" flat icon="edit" 
                                                                @click="__thisBox_UDialog(props.rowIndex)" > 
                                                                <q-tooltip class="bg-black text-white fontcstyle"  self="top middle">   edit </q-tooltip>  
                                                              </q-btn>

                                                              <q-btn round  :dense="true" flat icon="delete"  
                                                              @click="_this_ActiveOperation._delRow(null,props.rowIndex,props.key)" >  
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
                    <q-td  auto-width class="col fit column q-pa-md no-borders"  style="min-height:75vh;" >

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
                                                  <q-btn color="blue"  no-caps size="sm" label="Add Comment " :dense="true" @click="_this_foreignOperation._create_foreign('comments')" />
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
                                                    <div class="text-orange" v-if="(item.userID == Objprops._profile.id)"> 
                                                          <q-btn rounded flat icon="edit" label="Edit" size="sm" @click="_this_foreignOperation._select_foreignIndex(index)"> </q-btn>                       
            
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
                                                    <q-btn round flat icon="done" size="sm" @click="_this_foreignOperation._update_foreign()" > </q-btn>
                                                    <q-btn round flat icon="delete" size="sm" @click="_this_foreignOperation._remove()"> </q-btn>
                                                                             
                                        </div>
                                </div> 

                              </q-card>

                              <q-card class="col column q-pa-sm " v-if="__this_foreignBoxOps == 'clients' ?? false">
                                <div class="col column" v-if="_this_clientRows ?? false">   

                                    <q-list class=" column" style="width:100%;height:75svh">                       
                                                  <div v-if="!_is_this_open"> 
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
                                                                        <q-btn flat class="fontestyle" :label="_this_clientforeign['quantity'] * _is_this_netPrice"  />
                                                                      </div>
                                                                  

                                                                  </div>

                                                                  <div class="q-gutter-sm row justify-end fontestyle"> 
                                                                      <q-btn rounded color="orange" no-caps  glossy unelevated  @click="_this_foreignOperation._newbuyer_foreign('buy')" label="Order Now" :dense="true"/>
                                                                      <q-btn rounded color="green" no-caps  glossy unelevated   @click="_this_foreignOperation._newbuyer_foreign('cart')" label="Add to Cart" :dense="true"/>
                                                                
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
                                                                    <template v-if="_is_clientOwner || item?.['userID'] == Objprops._profile.id" >{{item.phone}}
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
                                                                  <q-btn round flat size="sm" :dense="true" icon="done" @click="_this_foreignOperation._update_foreign(false)" v-if="_is_clientOwner"/>                                                                  
                                                                  <q-btn rounded flat size="sm" icon="delete" @click="_this_foreignOperation._remove(index,_this.id)" />            
                                                        
                                                                </template>
                                                                <template v-else>
                                                                <q-btn rounded flat size="sm" color='orange' icon="edit" label="edit" @click="_this_foreignOperation._select_foreignIndex(index,_this.id)"  v-if="__this_foreignBoxIndex != index "> </q-btn>

                                                                </template>
                                                        </div>
                                                                                                                                                     

                                                        </div>                                    

                                                        <div class="justify-between row q-gutter-sm q-pa-xs"  v-if="__this_foreignBoxIndex == index && _is_clientOwner" >
                                                        
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
                 
                    <!---------Mobile----sideBox_show (comment & client) Ends-->
                    </q-tr>

                  </template>
              </q-table>
  
              <q-table v-else-if="_pageSettings['tableView'] == 'cards'"
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

                  <q-tr :props="props"  class="col-auto column q-px-md transparent" 
                  style="backdrop-filter:blur(55px);position:fixed;z-index:1;" :style="$q.screen.lt.sm ? 'top:8vh' : 'top:7vh'"  >
                   
                    <q-scroll-area  class="col-grow column transparent flex flex-center" style="min-width:95vw;">
                      <div class="col-grow flex flex-center q-gutter-sm q-px-md transparent no-wrap " style="min-width:100%;max-height:100%;"> 

                                          <q-separator inset vertical class='q-py-sm'  />

                                            <q-btn rounded no-caps color="orange"  @click="this_Query(null,'',16)"  class="col-auto fontdstyle"  >
                                             Show All       
                                            </q-btn>
                                              
                                            <q-separator inset vertical class='q-py-sm'  />

                                            <q-btn rounded no-caps size="sm" v-for="_qvalue0,_qgroup0 in saleCatagory"  
                                            @click="this_Query('catagory',_qgroup0,_qvalue0)" :key="_qvalue0" class="column col-auto q-py-xs fontestyle" :class="_this_Query['catagory'] == _qgroup0 ? 'bg-orange text-white' : ''" >
                                                 
                                            {{  _qgroup0 }}
                                            </q-btn>                    

                                            <q-separator inset vertical class='q-py-sm'  />
                                            <q-btn rounded outline no-caps size="sm"  v-for="_qvalue1,_qgroup1 in saleUsage" 
                                            @click="this_Query('catagory',_qgroup1,_qvalue1)" :key="_qvalue1" class="col-auto fontestyle"  :class="_this_Query['usage'] == _qgroup1 ? '' : ''">
                                            {{  _qgroup1 }}
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
                    <q-tr :props="props" class="q-gutter-sm transparent column  q-tr--no-hover col-shrink  fontbstyle" 
                    style="min-width:15vw;"                           
                  >
                    <div class="col  q-gutter-sm  column" v-if="props.row?.saleitgr ?? false">
                              <div class="cardPL col-auto column fontbstyle" >
                                 
                                <q-img :src="props.row.saleitgr[0]"
                                    style="aspect-ratio: 1/1;" class="cardPL img q-pa-xs">

                                      <div class="transparent column" style="width:100%;height:100%;">                                          
                                          
                                              <div class="col  column q-gutter-sm" v-if="(__thisIndex == props.rowIndex) && _is_this_open" style="width:100%;">
                                                <closeButton title="Add Quantity to buy.." textcolor="green"  @click="__thisIndex = null"   />
                                               
                                                <div class="col row  justify-around" >
                                                
                                                <buyButton style="" :quantity="_this_clientforeign['quantity']" :price="_is_this_netPrice" 
                                                @decreaseButton="_this_clientforeign['quantity'] = parseFloat(_this_clientforeign['quantity'] ?? 1) -1" 
                                                @increaseButton="_this_clientforeign['quantity'] = parseFloat(_this_clientforeign['quantity'] ?? 1) +1" 
                                                 >
                                                </buyButton>

                                                <!-- <div class="col column  justify-center q-px-md" style="height:100%;width:100%;" >
                                                  <- <q-btn flat no-caps class="fontestyle" :label="_this_clientforeign['quantity'] * props.row.price +' '+ currency"  />     ->
                                                    
                                                  <p style="width:90%;text-overflow:ellipsis;overflow: hidden;" class="fontestyle boxastyle"> {{ _this_clientforeign['quantity'] * props.row.price +'  '+   _pageSettings['currency']}}</p>
                                                  
                                                </div> -->

                                                </div>
                                               
                                            </div>
                                            
                                            <div  class="q-gutter-sm" v-else>
                                                <q-btn v-if="(props.row?.price ?? false) && (props.row?.quantity ?? false)" no-caps class="fontdstyle" color="orange" :dense="true" size="sm" label="Buy Option"
                                                  @click="_this_clientActivator(props.rowIndex)"
                                                  />
                                                  <div v-if="_orderBox.includes(props.row.id)" class="fontastyle ">
                                                  <!--div v-if="props.row.buy =='buy' ?? false" style="color:orange"> Already Bought </div>
                                                  <div v-else> Added to cart </div-->
                                                  </div>
                                                  <q-btn v-else no-caps class="fontdstyle" color="teal" :dense="true" size="sm" :label="_pageSettings.language ? 'Zembile' : 'ADD To My Cart'"
                                                  @click="_this_ActiveOperation._toCart(props.row.id,'clients')"
                                                  />
                                            </div>

                                      <!--   
                                          <q-card class="col relative-top z-top q-pa-sm items-end column" v-if="__thisIndex == props.rowIndex" style="min-width:10vw">
                                            <div class="col-grow row q-gutter-xs fontdstyle">
                                                < <div>
                                                  Quantity
                                                </div> >

                                                <div class="row no-wrap">
                                                  <q-btn rounded  size="sm" @click="_this_clientforeign['quantity'] = parseFloat(_this_clientforeign['quantity'] ?? 1) -1" > -</q-btn>
                                                  <q-btn color="orange" size="md" class="q-mx-xs"  :label="_this_clientforeign['quantity']"   />
                                                  <q-btn rounded size="sm"  icon="add" @click="_this_clientforeign['quantity'] = parseFloat(_this_clientforeign['quantity'] ?? 1)+1"   />

                                                </div>

                                                <div class="col-auto row items-end fontdstyle">   
                                                  <q-btn flat no-caps class="fontestyle" :label="_this_clientforeign['quantity'] * props.row.price +' '+ currency"  />    
                                                </div>
                                            </div>    

                                              <div class="col-grow z-top q-pa-none row justify-end">
                                                <q-btn :dense="true" size="sm" color="orange" class="fontestyle" label="Buy Now" @click="_this_foreignOperation._create_foreign()"  /> 
                                              </div>

                                          </q-card> -->


                                      </div>

                                    </q-img>

                                  <q-card-section class="col q-gutter-xs fontastyle q-pa-xs" style="background-color:whitesmoke">   

                                    <div class="row q-gutter-xs no-wrap justify-between fontdstyle">

                                      <q-btn class="col-grow" flat :dense="true" size="sm" @click="this_Query('userID',props.row.userID ?? null)">
                                        <div class="col row items-center fontastyle"><q-icon name="phone"  /> {{props.row.fphone}}</div>
                                        <q-tooltip>More Product of {{props.row.userName}}</q-tooltip>
                                      </q-btn>

                                      <div class="col-grow column items-end q-gutter-xs fontastyle "> Price: {{props.row.price}} 
                                        <div class="text-green">On Store: {{ props.row.quantity}}</div></div>
                                          
                                    </div>

                                    <div class="row no-wrap items-center q-pa-sm q-gutter-md fontastyle">
                                          
                                          <!--div>                                   
                                              <q-item-label> 
                                                <q-rating v-model="props.row._itServiceRating" :max="5" size="xs" @click="_this_ActiveOperation._rating(props.rowIndex)"/>
                                                <q-tooltip class="bg-black">Product Reliability Score</q-tooltip>
                                              </q-item-label>
                                              <q-item-label>{{ props.row.catagory }} ({{ props.row.usage }})</q-item-label>
                                          </div-->                                       
                                          <!-- <q-btn no-caps color="orange" class="text-black" :dense="true" @click="this_Query(null,props.row.id)"  label="View" />                                     -->
                                          
                                    
                                          <template v-if="__thisIndex == props.rowIndex">
                                            <q-btn rounded class="col-grow bg-orange text-white"  v-if="_is_this_open" @click="_this_foreignOperation._newbuyer_foreign('buy')">Buy Now</q-btn>
                                          <q-btn rounded class="col-grow bg-green text-white"   @click="_this_foreignOperation._newbuyer_foreign('cart')">ADD to Cart</q-btn>
                                          
                                          </template>
                                          <template v-else>
                                            <q-btn color="cyan"  class="col-grow" no-caps   @click="_this_clientDetailActivator(props.rowIndex)" >Details</q-btn>
                                            <q-btn  class="col-grow" no-caps @click="this_Query(null,props.row.id)" >Explore Now</q-btn>

                                          </template>

                                      </div>
                                  
                                  </q-card-section>

                                </div>
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
      {{ _this_clientforeign}} {{ _this_chatforeign}}
  
</q-page>

  <!-- <div>
    <button @click="toggle_dialogOne">Open Popup</button>
  </div> -->

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
      _initialModal_defaults()
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

async function _initialModal_defaults(){
    //-------<<<<>>>>-------Preparing this_model role_schemas
    let _defaulting_client = await modal_Columns_(_this_clientSchema)
    await _clientDefaults(_defaulting_client[1])
    let _defaulting_chat = await modal_Columns_(_this_chatSchema)
    await _chatDefaults(_defaulting_chat[1])
    return false
}
async function _clientDefaults(_this_clientModels){
_thisDefault_client.value = await _modal_Defaulting_(_this_clientModels)
_thisDefault_client.value['orderID']=await _genOrderID()
_thisDefault_client.value['userID']=Objprops._profile.id
_thisDefault_client.value['quantity']=1
_thisDefault_client.value['served']='Requesting'
_thisDefault_client.value['price']=0
//-------------------------(Defined Schema-1)
return true
}
async function _chatDefaults(_this_chatModels){
_thisDefault_chat.value = await _modal_Defaulting_(_this_chatModels)
_thisDefault_chat.value['userID']=Objprops._profile.id
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

  //await _resetOnPlayRowItem()
  __thisIndex.value=null
  __thisOps.value=null
  //------------switching view
  //-----------------------Building Query
  saleitService.set_syncLock(false)
  saleitService.asyncDatas()

  clearInterval(syncInt)
  //-------------Building Query
  //_this_Query.value=  _buildQuery(_queKey,_value)
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
  _this_Query_Meta={}
  __this_foreignBoxsubOps.value = false
  //--------------------Building Queries
  let _thisQuery_Old =(_this_Query.value['qweight'] ?? [1,1,1,1]) //show searchedQuery
  _this_Query.value={}
if(_queKey){ //user_defined searchings
      // _contenting.value='main'
      _pageSettings.value['tableView']='main'
      if(['catagory','usage','trend'].includes(_queKey)){
        _this_Query.value['qweight']=[1,(saleCatagory[_value] ?? (_thisQuery_Old[1] ?? '1')),
        (saleUsage[_value] ?? (_thisQuery_Old[2] ?? '1')),3]

          _this_Query_Meta['catagory']=saleCatagory[_value] ?? (_this_Query.value[1] ?? '1')
          _this_Query_Meta['usage']= saleUsage[_value] ?? (_thisQuery_Old[2] ?? '1')

      }else{
        // _pageSettings.value['tableView']='card'
        _this_Query.value[_queKey]=_value ?? null//_queKey == 'id' ? {'id':_value} :"" 
      }
  }else{ //searching by id or profileSearch
    // _this_Query.value={}
    if(_value){ //if _value(with no key, but item_ID),.. show only userSpecific data
      _this_Query.value['id']=_value
      // _contenting.value = 'main'
      _pageSettings.value['tableView']='main'
      __this_foreignBoxsubOps.value = 'view' 

    }else{ //show trend OR _userWeights(from history)
      // _contenting.value='cards'
      _pageSettings.value['tableView']='cards'
      let _history= sessionStorage.getItem('qw').split(',') ?? [1,1,1,2]
          _this_Query.value['qweight']=[1, _history[1] ,_history[2] , 2]
    }
  }
  await saleitService.set_syncQuery(_this_Query.value)
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