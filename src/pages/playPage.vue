<template>

  <q-dialog
      v-model="_setpopDialogBox"
      transition-show="scale"
      transition-hide="scale"   
      :style="{ 'background-image': 'url('  + ')' }"
    >
    <q-card style="min-width: 20vw;" class="overlay-Glass " >
  
      <!----HEADER-TOP Begin-->
      
          <q-linear-progress :value="0.8" color="orange" />
  
          <q-bar style='font-weight: bold;'>
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
            <q-btn dense flat icon="close" @click="_closeDialog()">
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-bar>
  
          <q-card-section class="row items-center no-wrap q-pa-none"  >
            
            <div class="col " >
                        
                    <q-img  :src="_fileSRC && graphicColumn[0] =='saleitgr' ? _fileSRC : onplayRowItem['saleitgr'][0]"   style="min-height:20vw;aspect-ratio: 2/1;">  
                    
                            <div class="absolute-full transparent column justify-between " >
                              
                              <div class="row" style="width:100%" >
                                <div class="col">
                                     {{ onplayRowItem.header}} 
                                </div>
                                <div class="column col-auto " style="width: 5vw;">                                        
                                        <q-item-label class="text-grey"> Via</q-item-label>
                                        <input type="file" multiple ref="filep" style="display: none" @change="_folderProfiling($event,'saleitgr',0)" /> 
                                        <q-btn icon="folder" @click="$refs.filep.click()" :dense="true" />
                                        <q-btn icon="add_a_photo" @click="_cameraModule._openCamera('saleitgr',0)" :dense="true"  />
                                    </div>
                              </div>
                              <div v-if="_filePreview">
                                <q-img :src="_filePreview"   />
                              </div>
                             
                              <div>
                                    <div class="self-end justify-left col "> 
                                      <div v-if="onplayRowItemOps == 'CreateRowItem'" style="color:blue;" >
                                     
                                        <q-btn no-caps :dense="true" :loading="_rowOpsLoadingStatus" class="gt-xs" color="warning" label="saleIt"  icon="done" @click="_createRow(false)" v-if="typeof onplayRowItem.saleitgr[0] == 'string'" >

                                            <template v-slot:_rowOpsLoadingStatus>
                                              uploading...
                                              <q-spinner-radio class="on-left" />
                                              uploading...
                                            </template>
                                            </q-btn>

                                            <q-btn no-caps :dense="true" :loading="_rowOpsLoadingStatus" class="gt-xs" color="warning" label="saleIt"  icon="done" @click="_createRow(true)" v-else >
                                              uploading...
                                            <template v-slot:_rowOpsLoadingStatus>
                                              <q-spinner-radio class="on-left" />
                                              uploading...
                                            </template>
                                            </q-btn>

                                      </div>   

                                      <div v-else>                                       
                                        <q-btn no-caps :dense="true" :loading="_rowOpsLoadingStatus" class="gt-xs" color="warning" label="saleIt"  icon="done" @click="_updateRow(false)" v-if="typeof onplayRowItem.saleitgr[0] == 'string'" >

                                          <template v-slot:_rowOpsLoadingStatus>
                                            uploading...
                                            <q-spinner-radio class="on-left" />
                                            uploading...
                                          </template>
                                        </q-btn>

                                        <q-btn no-caps :dense="true" :loading="_rowOpsLoadingStatus" class="gt-xs" color="warning" label="saleIt"  icon="done" @click="_updateRow(true)" v-else >
      
                                          <template v-slot:_rowOpsLoadingStatus>
                                            uploading...
                                            <q-spinner-radio class="on-left" />
                                            uploading...
                                          </template>
                                        </q-btn>


                                      </div>        
                                      
                                                          </div>
                                                          </div>
                                                          
                                
                                                        </div>
                                                        
                              </q-img>
                                    </div>
  
          </q-card-section>
     
          <q-card-section class="column bg-orange text-dark">
           <fieldset class="col  q-gutter-xs" style="border-radius: 5px;border: 1px solid grey;"  >
  
            <legend @click="_formsMeta.description = ! _formsMeta.description">
                Descriptions
            </legend>
            <template v-if="_formsMeta.description">
            
            
              <div class="row  flex flex-center">
                <q-input class="col-md-auto col-xs-auto q-pa-sm"  outlined v-model="onplayRowItem['header']" label="what you selling" stack-label :dense="true"  />
              <q-input class="col-md-auto col-xs-auto"  outlined v-model="onplayRowItem['quantity']" label="quantity" stack-label :dense="true"  />
  
            </div>
          
      <q-separator inset  />
        <q-input
        outlined v-model="onplayRowItem['content']" label="decscriptions"
        filled  
        autogrow
      />  
    
      <fieldset class="col-grow row  q-pa-sm q-gutter-xs" style="text-transform: capitalize;border-radius: 5px;border: 1px solid grey;">
  
        <legend @click="_formsMeta.pricing = !_formsMeta.pricing">
            type
        </legend>
  
        <template v-if="_formsMeta.pricing" >
          <q-select :dense="true"  class="col-md col-xs q-pa-sm"  color="purple-12" v-model="onplayRowItem['catagory']" :options="saleitSchema['catagory']['enum']" label="catagory" />
          <q-select :dense="true"  class="col-md col-xs q-pa-sm"  color="purple-12" v-model="onplayRowItem['usage']" :options="saleitSchema['usage']['enum']" label="usage" />
          </template>
        
        </fieldset>
  
        <q-separator inset />
  
          <fieldset class="col-grow row q-pa-sm " style="text-transform: capitalize;border-radius: 5px;border: 1px solid grey;">
  
            <legend @click="_formsMeta.address = !_formsMeta.address">
                Address
            </legend>
            <template v-if="_formsMeta.address" >
            <q-input class="col-md-auto col-xs-12 q-px-sm"  outlined v-model="onplayRowItem['location']['city']" label="City" stack-label :dense="true" />
            <q-input class="col-md-auto col-xs-12"  outlined v-model="onplayRowItem['location']['street']" label="Street" stack-label :dense="true" />
           </template>
           
            </fieldset>
  
            </template>
          
   
           </fieldset>
  
  
      <fieldset class="col-grow   q-gutter-xs" style="text-transform: capitalize;border-radius: 05px;border: 0.01px solid grey;">
  
          <legend>
              Set Price
          </legend>
          
            <q-input type="Number" class="col-md-auto col-xs-12"  outlined v-model="onplayRowItem['price']" label="Pricing" stack-label :dense="true" />
              
          </fieldset>
  
          </q-card-section>
  
        </q-card>
  
  </q-dialog>
  <q-dialog v-model="popGraphicBox" class="column overlay-Glass rounded-borders" >
      <!--CameraFeeds  @Picture-taken="imageSrc = $event" / -->
      <div class="column" style="background-color:orange;
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
             
              </div>

        </div>
             
      
	       
	    </div>
</q-dialog>


 
  <q-page class="column q-pa-none" >
  
          <!------------------------------ ioio ----->
        <div class="col q-pa-none column" style="max-height:90vh;">
              <q-table 
  
              :rows="rows"
              :columns="columns"
  
              virtual-scroll

              flat bordered

              :filterMethod="filterMethod"
              :filter="filter"

              
              row-key="id" 
              rowIndex="true"

              class="col column  q-gutter-sm"

              hide-pagination
              hide-header
              hide-bottom
              >

              <template v-slot:body="props"  v-if="rows.length">
                  <!--row Object [key(id=?)],row,_trClass,cols,sort,rowIndex,color,dark,dense,expand]-->
                  <q-tr
                    :props="props" :class="$q.screen.gt.sm ? 'row' : 'column'"
                    class="cursor-pointer text-bold text-weight-bolder  q-gutter-sm"  
                     style="height: 85vh"
                  >
             
                    <!------------------ iterating _ body cell-->
                    <q-td  auto-width class="col-2" v-if="$q.screen.gt.md">
                      
                    </q-td>
  
                    <q-td  class="column col-6  "   >

                  
                          <div class="col row ">
  
                              <div class="col column fit" >
                              
                                  <q-img
                                              :src="props.row.saleitgr"
                                              spinner-color="white"
                                              class="rounded-borders col column" style="height:100%;border-radius: 20px;"
                                            
                                              >
                                     
                                        <q-list class="column col fit " :class="props.row.userName ? 'transparent': 'transparent'">
                                          <q-item class=" col-auto row">                                          
                                           <q-item-section class="col-auto " style="">
                                            <q-itel-label style=""  v-if="props.row.userName">
                                              <q-item-label class="q-pa-xs saleitHeader-Glass"> Creator :                                                 
                                                <q-badge >{{props.row.userName}}   </q-badge>
                                               </q-item-label>                                              
                                              <q-item-label caption> {{  props.row.updatedAt }}</q-item-label>

                                            </q-itel-label>
                                            <q-itel-label style="" v-else>  #saleit Service </q-itel-label>

                                           </q-item-section>
                                           <q-item-section class="col  columns" >

                                           </q-item-section>
                                          </q-item>
                                          <q-item  v-if="$q.screen.lt.lg" class="q-px-none">
                                            <q-sticky expand position="left" >
  
                                                  <q-card class="q-pa-none column" style="background-color: rgba(6, 93, 255, 0.212);" >

                                                        <q-btn round flat icon="message" />

                                                        <q-btn round flat icon="more_vert">
                                                      

                                                        </q-btn>


                                                  </q-card>

                                                  
                                                </q-sticky>
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
                                                      <div v-if="!nul.includes(props.row.timer)"> 
                                                         Price: {{  props.row.price  }}   
                                                        <q-item>
                                                          <q-item-section v-if="$q.screen.gt.sm" >                                                             
                                                            {{  showDate.split(':')[1] }}                                                             
                                                                {{ props.row.timer.hours }}
                                                                {{ props.row.timer.days }}
                                                          </q-item-section>

                                                          <q-item-section>
                                                            {{ onplayRowItem.timer.actions }}
                                                          </q-item-section>
                                                        </q-item>
                                                      </div> 
                                                      <q-separator inset />
                                                      <div v-if="!nul.includes(props.row.clients)">Buyers : {{ props.row.clients.length}}</div>
                                                      <q-separator inset />
                                                      <div v-if="!nul.includes(props.row.clients)">Quantity : {{ props.row.quantity}}</div>
                                                      <q-badge class="q-pa-sm text-bold" >Price: {{  props.row.price }}</q-badge>                                                      
                                                      <div class="text-orange"> 
                                                         R <q-rating v-model="props.row._itServiceRating" :max="5" size="xs" @click="_activeRowOperation._rating(props.rowIndex,props.key)"/>                                                       
                                                     </div>
                                                      
                                                        
                                                </q-item-section>
                                                
                                          </q-item>
                                        

                                        </q-list>
                                              
                                  </q-img>
  
                              </div>
  
                              <div class="col-auto">
                                  
                                  <q-sticky v-if="$q.screen.gt.sm" expand position="left" class="q-px-xs">
  
                                        <q-card class="q-pa-none column" style="background-color: rgba(6, 93, 255, 0.212);" >
  
                                          <q-btn round flat color="white" text-color="primary" label="Buy" @click="_popSideBox(props.rowIndex,props.key,'clients',false)"
                                        
                                            >
                                            <q-badge color="orange"  floating v-if="!nul.includes(props.row.clients)">
                                             sold      
                                            </q-badge>                                          

                                          </q-btn>

                                          <q-btn round flat icon="message" @mouseover="message" @click="_popSideBox(props.rowIndex,props.key,'comments',false)">
                                            <q-tooltip anchor="top end" self="top middle">comments</q-tooltip>    
                                          </q-btn>

                                          <q-btn round flat color="white" @mouseover="message" text-color="primary" label="like" @click="_activeRowOperation._likes(props.rowIndex,props.key)">
                                            <q-badge color="orange" floating v-if="!nul.includes(props.row.likes)">{{  props.row.likes.like }}</q-badge>
                                          </q-btn>

                                          <q-btn round flat icon="gps" @mouseover="message" @click="_popUpdateDialogBox(props.rowIndex,props.key)"> 
                                            <q-tooltip anchor="top end" self="top middle">   map </q-tooltip>  
                                          </q-btn>

                                          <q-btn round flat icon="edit" @mouseover="message" @click="_popUpdateDialogBox(props.rowIndex,props.key)"> 
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

                    <q-td  auto-width class="col column" style="height:100%;width:100%" v-if="onplayRowIndex == props.rowIndex">
                    
                      <div class="col row" v-if="_popSideBoxOps == 'comments'">                             
                                
                                <q-list v-if="nul.includes(props.row.comments)">
                                  No Comments ( New)
                                </q-list>  

                                <q-list v-else class="column" style="height:100%;width:100%">  

                                  <q-item class="col-auto column">
                                    <q-item-label> 
                                      Comments:    
                                      <q-btn style="background-color:white;" color="primary" :dense="true" size="sm" rounded flat @click="_passiveColumnOperation._add()"> add Comment</q-btn>                      
                                    </q-item-label>     

                                    <q-item-section v-if="_popSideBoxsubIndex == -1" class="column q-pa-xs">
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

                                  <q-scroll-area class="col column" >
                                    
                                  <q-item v-for="item,index in props.row.comments" :key="index"  class="col column">
                      
                                    <q-item-section v-if="_popSideBoxsubIndex == index">                                        
                                        <div class="justify-end  row "> <div color="blue"> Commenting..</div> </div>
                                        <q-item-label style="text-transform: capitalize;" >
                                          <q-input  filled autogrow
                                                type="textarea"  v-model="onplayRowItem['comments'][index]['comment']" 
                                                :label="cinfo" stack-label :dense="true"  />
                                        
                                        </q-item-label>      
                                        
                                     </q-item-section>
    
                                     <q-item-section v-else>
                                        <q-item-label style="text-transform: capitalize;" >
                                          {{props.row.comments[index].userID}}
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
                                        <q-btn round flat icon="edit" @click="_passiveColumnOperation._selectArray('comments',index)"> </q-btn>
                                        <q-btn round flat icon="done" @click="_updateRow()" v-if="_popSideBoxsubIndex == index"> </q-btn>
                                        <q-btn round flat icon="delete" @click="_passiveColumnOperation._remove('comments',index)" v-if="_popSideBoxsubIndex ==index "> </q-btn>
                                      
                                      </div>

                                    
                                    
                                    </q-item-section>
                                  </q-item>
    
                               
    
                                </q-scroll-area>
    
                                </q-list>                                           
                              
                              
                              
                          </div> 

                          <div class="col" v-else-if="_popSideBoxOps == 'clients'">

                        
                                <q-list v-if="nul.includes(props.row.clients)">
                                  No Clients ( Buyers)
                                </q-list>  

                                <q-list v-else class="column col" style="height:100%">   
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
                                              <div  v-if="_orderStep == 0">
                                                <q-item-label class="absolute-right q-px-sm">Step - 1</q-item-label>                                            

                                                Your OrderID : {{ defaultItem['clients'][0]['orderID'] }}
                                                <div class="q-gutter-md row items-start q-pa-sm">
                                                    <q-input filled v-model="defaultItem['clients'][0]['orderID']" class="col-grow" label="OrderID" stack-label :dense="true" />
                                                    <q-input filled v-model="defaultItem['clients'][0]['phone']" class="col-6" label="Phone_#" stack-label :dense="true" />
                                                <q-btn color="indigo" no-caps  glossy unelevated  @click="_activeColumnOperation._sendMeConfirmation('clients',0)" label="Confirmation Request" :dense="true"/>
                                                
                                                </div>                                            
                                              
                                              </div>                                              
                                              
                                              <fieldset class="q-gutter-md row items-center q-px-sm q-py-none" style="border-radius: 5px;border:0px" v-else>  
                                                <q-item-label class="absolute-top-right q-px-sm ">Step - 2 </q-item-label>                                             
                                                <legend class="flex justify-start q-py-none">Code Sent to # :<q-item-label caption> <q-badge>{{ _orderIntiatedPhone  }}  </q-badge>  </q-item-label> </legend>
                                                <q-item-label caption class="col-12 q-my-none">  OrderID : {{ _orderIntiatedID }} </q-item-label> 
                                                <q-input filled v-model="_orderConfirmationQuantity" class="col-12" :dense="true" type="Number" stack-label label="Order Quantity" />
                                                <q-input filled v-model="_orderConfirmationID" class="col" :dense="true" type="string" prefix="itS" />
                                                <q-btn color="green" no-caps  glossy unelevated @click="_activeColumnOperation._confirmBuyer('clients',0)" label="Confirm" :dense="true"/>
                                                <q-btn color="blue" no-caps  glossy unelevated @click="_activeColumnOperation._reIntiatOrder('clients',-1)" label="ReOrder" :dense="true"/>
                                              </fieldset> 
                                              <q-badge color="green" v-if="_orderConfirmDebuger"> {{  _orderConfirmDebuger  }}   </q-badge>                                             
                                            </q-card-section>
                                          </q-card>
                                        </q-expansion-item>
                                        </q-list>
                                  </q-item> 
                                  <q-item  class="col-auto q-pa-xs " >
                                    <q-badge outline color='green' > {{  _orderDebuger }}</q-badge>
                                  </q-item>

                                  <q-separator spaced inset />
                                  <q-scroll-area class="col column" >
                                    <q-item v-for="item,index in props.row.clients" :key="index"  class="col column">
                                   
                                     <q-item-section >
                                      <div class="row justify-between q-gutter-sm">
                                          <div>
                                                  <div v-if="onplayRowItem['clients'][index]['quantity'] == 0 && _orderStep == 0" ><q-badge color="red" size="sm">Unconfirmed,</q-badge></div> 
                                              
                                                  <q-item-label style="text-transform: capitalize;" >
                                                    {{props.row.clients[index].userName}} #{{props.row.clients[index].orderID}}
                                                  </q-item-label>                                                   
                                          </div>

                                          <div>
                                            <div class="text-orange" v-if="onplayRowItem['clients'][index]['userID'] == Objprops.userID" >
                                                <q-btn round flat icon="edit" @click="_passiveColumnOperation._selectArray('clients',index)" v-if="onplayRowItem['clients'][index]['quantity'] == 0"> </q-btn>
                                                <!--q-btn round flat icon="done" @click="_updateRow(false)" v-if="_popSideBoxsubIndex == index"> </q-btn-->
                                                <q-btn round flat icon="delete" @click="_passiveColumnOperation._remove('clients',index)" v-if="_popSideBoxsubIndex == index "> </q-btn>
          
                                            </div> {{  Objprops.userName }} {{  Objprops.userID }}
                                            <div class="text-orange" v-if="onplayRowItem['userID'] == Objprops.userID" >
                                                <q-btn round flat icon="edit" @click="_passiveColumnOperation._selectArray('clients',index)"> </q-btn>
                                                <q-btn round flat icon="done" @click="_updateRow(false)" v-if="_popSideBoxsubIndex == index"> </q-btn>
                                                <q-btn round flat icon="delete" @click="_passiveColumnOperation._remove('clients',index)" v-if="_popSideBoxsubIndex == index "> </q-btn>
          
                                            </div>   

                                          </div>

                                      </div>  
                                     

                                        <div class="flex flex-center q-gutter-sm">
                                           <q-item-label style="text-transform: capitalize;">
                                          <q-input  autogrow filled 
                                                type="Number"  v-model="props.row.clients[index].quantity" 
                                                label="Quantity" stack-label :dense="true" readonly />
                                               
                                       </q-item-label>
                                       
                                       <q-item-label style="text-transform: capitalize;">
                                          <q-input  autogrow filled
                                                type="Number"  v-model="props.row.clients[index].paymentMethod" 
                                                label="Payment" stack-label :dense="true" readonly />
                                               
                                       </q-item-label>   
                                        </div>                                       

                                     </q-item-section>
    
                                    <q-item-section >
                                      <q-item-label caption> {{  props.row.clients[index].time }}</q-item-label>
                                      <div class="text-orange"> 
                                        <q-itm-label class="row justify-start items-center " > Delivery Remark: <q-item-label class="text-black q-px-sm" caption> {{props.row.clients[index]['description']   }} </q-item-label> </q-itm-label>

                                      </div>                                                                     
                                             
                                    </q-item-section>

                                      </q-item>

                   

                                    </q-scroll-area>

                                    </q-list>

                          </div>
                    </q-td>

                    </q-tr>
  
                    </template>
              </q-table>
  
        </div>
   
      <!----------------------LiveDATA Banner-->
      
      <div class="col-auto q-gutter-none justify-center items-center bg-red row fit">
         
          <div class="col content-center text-weight-bolder text-h6 bg-dark text-blue">
          <marquee behavior="scroll" scrollamount="2" direction="left">
              <span class="marquee">
               <div class="row flex flex-center "  style="border: 1px solid white;border-radius:10px;">
               
                  <q-item-label class="triShape triShapeU" > </q-item-label> %5
                  <q-item-label class="triShape triShapeD " /> %0.1 
                 Toguamino 
               
               </div>
              </span>
          </marquee>
          </div>
  
  
      </div>
  
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
  
  //----componenents..
  //------------------Global Variables [ uTILITIES..]
  import { ssrAPI } from "../srcenv";
import { Tooltip } from "chart.js";
  
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
  const genapsaleitContentOps = genapiStore(); //import { genapiStore } from "src/stores/jstStores/genapiStore";
  
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
  
  var Objprops = defineProps({
    //----General Informations
    _profile: { type: Object, default: () => ({}) }, //user Datas all there is...
    //----User Credentials and Unique ID.
    id: { type: String, default: "" }, //
    userID: { type: String, default: "" }, //
    userName: { type: String, default: "" }, //
    
    //-----------access Parameters
    _anyAccess: { type: Object, default: () => ({})  },
    _isupgraded : { type: Boolean, default: false },
    _ispremium : { type: Boolean, default: false },
    _iss: { type: Object, default: () => ({}) }, //is the loged_user has privileged_routes...defintions

    _priviledgedFor: { type: Object, default: () => {}},  
    //----------------------empy model total privileges....
    _modalPriviledges: { type: Object, default: () => ({}) }, //user's privileges on general....with object of privileges =>{'empy':'regAdmin'}
  
    //-------------------(layout tunnel for command datas(signal))
    lytCreatRow : { type: Boolean, default: false },
    //--------Search Button Signal
    lytSearchRow : { type: String, default: '' },
  });
  //Objprops.lytCreatRow
  //===-----_--------THE MODEL/ MAIN_DATA....
  let _thisModel = "saleit"; // the Vue_Page_DataModel (Listing Collection Name)
  var _thisModelHeader = ref(_thisModel+" Managment"); // the Vue_Page_Data_Headers(Descriptions...)
  
  var acctypeStage = ref({

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
let modalpriviledges = nul.value.includes(Objprops._modalPriviledges[_thisModel]['enum']) ? Objprops._modalPriviledges[_thisModel]['enum'] : Objprops._modalPriviledges[_thisModel]['venum']
let _thisModelPriviledges = ref(modalpriviledges); //current model's possible privileges list....objects ( .enum=[1,2,3])
let _thispriviledgedFor = ref(Objprops._priviledgedFor[_thisModel]); //user's priviledges on current model....string

var __isCreator =ref(false) //has it, creator(admin) [Group] or just_Columnist_access
try{
__isCreator =  computed(() => nul.value.includes(_thispriviledgedFor.value[2]) ? false : _thispriviledgedFor.value[2] ) //is admin/creator...
}catch{}

var __iss =ref([]) ;//is not admin/registrat.. but isstore,isfinance
try{
__iss =  computed(() => nul.value.includes(Objprops._iss[_thisModel]) ? false : Objprops._iss[_thisModel]) // ['isgm','issale']...take index_0 default
}catch{}

var __isStage = ref([])
try{
   __isStage = computed(()=>
  {
    var isStage = []
    for(let i in __iss.value){
    var sStage = nul.value.includes(acctypeStage.value[__iss.value[i]]) ? false : __iss.value[i] 
    isStage =isStage.concat(acctypeStage.value[sStage])
    }
    return isStage;
  })
}catch{}
  

    //-----------------------  
  //------------------------------------------------------------COLUMNs----------------
    //==============================================------------------------------------
  
  
  var columns = ref([]); //Actual Table_Columns ++Descriptions
  var topLayerColumns = ref([]); //Actual OuterMost Table_Column_Names [Top(Layer_1] _Columns _Name_List]
  let authorizedColumns = ref([]); //Filtered/Authorized_Table_Columns ++Descriptions for Editing/Adding.... but not Viewing
  //------column invisiblity on table_
  const pagination = ref({ rowsPerPage: 50 });

  //columns_filter()-------- which to displayOn REgisterations form
  let lockedColumns = ref([ "userID",]); //are blacklist of columns tobe not shown during the Registerations..form submitting
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
  var rows = ref([{}]); //Data's projected with the Columns variable [ calling function.....Crud_.readDatas(top_100)]
  
  //===============================================-----------------------------------------
  //------------- MODAL ROWs_ MANAGMENT
  let defaultItem = ref({});
  let onplayRowItem = ref({}); //the selected row_actual_Data..as object
  let onplayRowIndex = ref(-1); //_row_item_index..0/1/2

  //------- Original/_UpdateRowItem:CreateRowItem _Commands
  let onplayRowItemOps = ref(false); //_is UpdateRowItem/Creating_New
  let _setpopDialogBox = ref(false); //true...
  
  //==-----tabular side_box ( Pop_by_Id and tell the Operation)
  //let _setpopSideBox = ref(false); //true,..
  let _popSideBoxOps = ref(false); //clients,...

  //---Editing/_....arrays manupulating
  let _popSideBoxsubOps = ref(false); //editing,deleting,creating
  let _popSideBoxsubIndex = ref(-1); //array_index_0/1/2/3

let rowsCount = ref(0);
rows = computed(() => {
  let data = saleitService.getDatas;
  let dataCount = data.length;

  if (data.length === 0) {
    setDLoading(true);
    return [{}];
  } else{
    notifyit.info((rowsCount.value - dataCount)+"New "+_thisModel + " Item Loaded..!");
    setCounter(dataCount);
    return data;
  }
});

function setCounter(num) {
  rowsCount.value = num;
}

  //===============================================-----------------------
  //-------------Syncing Columns
  async function _resetOnPlayColumnItem() {
    authorizedColumns.value = [];
    visibleColumns.value = [];
    topLayerColumns.value = [];
  }

columns = computed(() => { 
  
    if (Object.values(Objprops).length === 0) {
      return [{}];
    } else {

      _resetOnPlayColumnItem();

      let tempColumns = []; //HOLDING_  all the Columns of the Data_model ( TOTAL Columns)
      let tempviewColumns = [];  ////--HOLDING_ all the "Visible" Columns of the Data_model ( TOTAL Columns)
  
      for (let schemaColumn in saleitSchema) {
        let _col = { 
          name: schemaColumn,
          schema: saleitSchema[schemaColumn],
          //label: schemaColumn,
          //sortable: true,
          //align: "left",
          //sort: (a, b) => a - b,
        };
  
        //topLayerColumn(schemaColumn); //---List Out topLayerColumns_NAME in ARRAY ( TOTAL topNames)
        tempColumns.push(_col);
        //invisibleColumns.includes(schemaColumn) ? "" : tempviewColumns.push(schemaColumn);
  
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

  async function _buildSchemaForm() {
    if (!authorizedColumns.value.length) {
      //return null;
    }
    
    onplayRowItem.value = await schemaSklt(authorizedColumns.value);
    logUser(); //
    return true;
  }

var _onplayDefaultColumn = ["userID",'phone',"userName"]
  async function logUser() {
    for (let kkey in _onplayDefaultColumn) {
      var _columnName=_onplayDefaultColumn[kkey]
      try {
        onplayRowItem.value[kkey] = Objprops._profile[_columnName];
      } catch {}
    }
    //populate arrayed_value_columns
    //setted Buy(basic) information_
    onplayRowItem.value['clients'][0]['userID']=Objprops.userID;
    onplayRowItem.value['clients'][0]['userName']=Objprops.userName;
    onplayRowItem.value['clients'][0]['phone']= Objprops._profile.phone;
    onplayRowItem.value['clients'][0]['orderID']= getRandomInt(0,9);
    onplayRowItem.value['clients'][0]['confirmID']='';
    //setted Comment (basic) information_
    onplayRowItem.value['comments'][0]['userID']=Objprops.userID;

    defaultItem.value =onplayRowItem.value;

    return true;
  }
  
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let _genNumber='st'//.append()
  for(let ii in [1,2,3,4,5,6,7]){
    _genNumber=_genNumber + String(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return _genNumber;
}


//-------------filtering and Searching Methodss
//-----searaching on/off
var lockFilter=ref(false)
//-----seraching attributes
//---1
//var search = ref(""); //sarchBar From Lyt
//search = computed(() => { return Objprops.lytSearchRow}) //Layout_listening for pop_creator
//--2

//------------Setting up all the search attributes
const filter = computed(() => {
  return {
    search: Objprops.lytSearchRow,
  }});

  //-------------the search Engine..
function filterMethod(rows, terms) {

if(lockFilter.value){
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


  //------------------------------------------SYNCING DATA With Store

  //---------------------Syncing.....DATA---controlle syncing (on || off)
  //-------forms
  let _formsMeta=ref({
    'updatorPop':true,
    //-----------------forms collapsing/show commands
    'pricing':true,
    'description':true,
    'address':true
    //------------------
  })
  
//---------------
let popGraphicBox =ref(false)
let imageSrc =ref(null)
  //lytCreatRow

//----------
var _graphicSource =ref()//
//var _fileSRC =ref('')//_fileSRC
var graphicColumn =ref(["",""]) //does give _image_attribute has single/multiple values of images ( sends it as 'file':name_attr, or 'files':name_attr)

var _file =ref()
var _fileSRC =ref()
//var _cov=document.getElementById('_fileSRC') 
function _folderProfiling(e,_graphicName,_graphicNameisArray) {
      _graphicSource.value='folder'   

       graphicColumn.value=['','']
      // Check if file is selected
      _file.value= nul.value.includes(e.target.files) && e.target.files.length ==0 ? false : e.target.files;
      if (_file.value) {
        graphicColumn.value[_graphicNameisArray]=_graphicName
        var file = e.target.files[0]
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

    _openCamera:async (_graphicName='',_graphicNameisArray=0)=>{

          _graphicSource.value='camera'   
          popGraphicBox.value=true
          _fileSRC.value = ''
          if(_graphicName){
            graphicColumn.value[_graphicNameisArray]=_graphicName
          }

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

//--------------------------------ROWS_SCHEMATIC FORMS
//-------------- POPUP_Box Controller functions
var _popRegisterDialogBox = computed(() => { return Objprops.lytCreatRow}) //Layout_listening for pop_creator
watch(_popRegisterDialogBox, async (cv, ov) => {
    onplayRowItem.value = Object.assign({}, defaultItem.value); //deep copy item_objects with deep reactivity ( reactivity could lost... after multiple copying b/n or due depth increasing)
    onplayRowIndex.value = 0;//rows.value.indexOf(item); 
   return await _closeDialog('CreateRowItem');
  });  //POP_Controller From Parent Layout_For New Registration of RowItem

//POP_Controller From With (Side_Bar)_For UpdateRowItem_RowItem
  async function _popUpdateDialogBox(_rowIndex,itemkey){
    onplayRowItem.value = Object.assign({},rows.value[_rowIndex])
    onplayRowIndex.value = _rowIndex;
    return await _closeDialog('UpdateRowItem');
  }
//-----POP_UP Box Controller Room
  async function _closeDialog(_rowOps='') {
     //await _resetOnPlayRowColumns()
     onplayRowItemOps.value=_rowOps
    _setpopDialogBox.value = !_setpopDialogBox.value;
    return true;
  }

//------SIDE_Wise Operations and Applications
var saleitContentOps = ref();
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
async function _popSideBox(_rowIndex='',itemkey='',Ops=''){

    if(onplayRowIndex.value == _rowIndex && Ops == _popSideBoxOps.value){
      onplayRowIndex.value = -1;//rows.value.indexOf(item); 
    }else{
      await _resetOnPlayRowColumns()
      //----------SET_ROW
      onplayRowItem.value = Object.assign({},rows.value[_rowIndex])//reactive(rows.value.id[_rowIndex])//Object.assign({}, item));
      onplayRowIndex.value = _rowIndex;//rows.value.indexOf(item); 

      //-------

      //----------SET Columns
   //_setpopSideBox.value  = false; //true,..
      _popSideBoxOps.value= Ops //default(main operations of pop_side box)
      //------
      _popSideBoxsubOps.value = false; //editing,deleting,creating
      _popSideBoxsubIndex.value= -2; //Nothing Will Activated as SideBox Ops

    }
    return true;
  }

async function _resetOnPlayRowColumns(){
   
   onplayRowItem.value = Object.assign({},defaultItem.value)
   onplayRowIndex.value = -1; //_row_item_index..0/1/2

  //------- Original/_UpdateRowItem:CreateRowItem _Commands
   onplayRowItemOps.value  = false; //_is UpdateRowItem/Creating_New
   _setpopDialogBox.value  = false; //true...
  
  //==-----tabular side_box ( Pop_by_Id and tell the Operation)
   //_setpopSideBox.value  = false; //true,..
   _popSideBoxOps.value  = false; //clients,...

  //---Editing/_....arrays manupulating
   _popSideBoxsubOps.value = false; //editing,deleting,creating
   _popSideBoxsubIndex.value = -1; //array_index_0/1/2/3
  return true
}

//------operations OVer POP_Up_Box
  var _passiveColumnOperation ={
    //---Enabling Array_Index_For Operations (Select_Index)_For ---Editing:Deleting--Applying--
  _selectArray:async(arrayCols,arrayIndex)=>{ // activate give array for operations of below options
    _popSideBoxsubIndex.value=arrayIndex
    return true;
  },
  //-----------Operations on selected array
  _remove:async (arrayCols,arrayIndex='') =>{
      _popSideBoxsubIndex.value= -1; //which is -1;;;
      //if(onplayRowItem.value[arrayCols].length != 1){    onplayRowItem.value[arrayCols].splice(arrayIndex, 1);     }
      onplayRowItem.value[arrayCols].splice(arrayIndex, 1);
    return await _updateRow().then((response)=>{
      return true
    })
  },
  _submitArray:async (arrayCols)=>{
    onplayRowItem.value[arrayCols].unshift(defaultItem.value[arrayCols][0]);
    return await _updateRow().then((response)=>{
      return true
    })
  },
  //--------------------------
  _add:async ()=>{
      //---------set custom value
      _popSideBoxsubIndex.value= -1; //it would Create Default_Form(like )
      return true;
  },
}

//---------------------Byuers and related Data Schema
var _orderStep =ref(0)

///--------Order_Intiations Stage
var _orderDebuger=ref('Orders List..')//
var _orderIntiatedID=ref('')
var _orderIntiatedPhone=ref('')


//-----
var _orderConfirmationRespID=ref('')//

//---------Order_Confirmations Stage
var _orderConfirmDebuger=ref(false)//
var _orderConfirmationID=ref('')//
var _orderConfirmationQuantity=ref('')//

//--
var  _activeColumnOperation = { 
  _reIntiatOrder:async (arrayCols,arrayIndex=0) =>{
     //onplayRowItem.value[arrayCols].shift()
     defaultItem.value[arrayCols][0]['orderID']=  getRandomInt(0,100) //Set_New OrderID ___For__DefaultRowItem
    _orderIntiatedID.value=''
    _orderIntiatedPhone.value=''

    _orderDebuger.value= 'Personal Orders'
    _orderStep.value=0
    return true
  },

  _reSetOrder:async (arrayCols,arrayIndex=0) =>{
     onplayRowItem.value[arrayCols].shift()

    _orderIntiatedID.value=''
    _orderIntiatedPhone.value=''

    _orderDebuger.value=''
    return true
  },
  _sendMeConfirmation:async (arrayCols,arrayIndex=0) =>{
       _orderDebuger.value='Processing'
       _orderStep.value = 0
      //---------set custom value
      if(_orderIntiatedID.value == defaultItem.value[arrayCols][0]['orderID']){ //Check if Similar OrderID is Submitted_ & tell Then to Generate New or Refresh..
        notify.info('Confirmation is Already Sent'+ defaultItem.value[arrayCols][0]['phone'])
        return true
      } else{
        onplayRowItem.value[arrayCols].unshift(defaultItem.value[arrayCols][0]); //Inject the Data into_ OnplayRowItem & to be sented.
      }
      //console.log(onplayRowItem.value[arrayCols][0],'UUUUUUUUUU')
      return await _updateRow().then(async (done)=>{
        if(done){
        //------hold the sent code(Secretlly)
         _orderConfirmationRespID.value= onplayRowItem.value[arrayCols][0]['confirmID']
          if(_orderConfirmationRespID.value){
         //Set_Flag The Has Been Confirmed
         _orderIntiatedID.value= defaultItem.value[arrayCols][0]['orderID']; //Hold _Sent_OrderID & Whic is Confirmed
         _orderIntiatedPhone.value= defaultItem.value[arrayCols][0]['phone'] //Confirmations message to wait for sms & re-enter

         _orderDebuger.value='Enter SMS-Code to Confirm ?'
         _orderStep.value = 1
         return true
          }
          else{ }
        }else{}
        onplayRowItem.value[arrayCols].shift()
        _orderDebuger.value='Request Failed, Try New Order'
        return false
      }).catch(()=>{ 
         onplayRowItem.value[arrayCols].shift()
        _orderDebuger.value='Try New'
         return false
        })
  },

  _confirmBuyer:async (arrayCols,arrayIndex=0)=>{ //xyxy
    
      _orderDebuger.value='Confirming..., wait sec.'
    
      if(nul.value.includes(_orderConfirmationID.value) || _orderConfirmationID.value != _orderConfirmationRespID.value){
        return false
      }   
      //onplayRowItem.value[arrayCols][arrayIndex]['locked'] = 'Yes'     //
      onplayRowItem.value[arrayCols][arrayIndex]['quantity'] = _orderConfirmationQuantity.value   //_orderConfirmationQuantity
      //---------------
      return await _updateRow().then(async (done)=>{
        //console.log(_orderConfirmationRespID.value,_orderConfirmationID.value,'Responserrrrrrrrrrr22')

        if(done){
        defaultItem.value[arrayCols][0]['orderID']=  getRandomInt(0,100) //Set_New OrderID ___For__DefaultRowItem
        //------------
        _orderConfirmationID.value=''
        //------
        _orderIntiatedID.value =''
        //_orderConfirmDebuger.value='Succe ! , Delivery time ; sunday afternoon'
        _orderDebuger.value= 'Order Succeded.' //Confirmations message to wait for sms & re-enter
        _orderStep.value = 0

        }else{

        }
        //console.log(_orderDebuger.value,_orderIntiatedID.value,_orderConfirmationID.value,_orderConfirmationRespID.value,'conf')
      return true
      }).catch(()=>{ return true })
  }

}

async function _resetOrders(){
  _orderDebuger.value=false
  return true
}
//---------------Operating on Row
 //Operating without setting onplayrowItem ( directlly calling for effect) === active _operations
 var  _activeRowOperation = {

_rating : async (_rowIndex,key) =>{
  onplayRowItem.value = Object.assign({},rows.value[_rowIndex])//reactive(rows.value.id[_rowIndex])//Object.assign({}, item));
  onplayRowIndex.value = _rowIndex;//rows.value.indexOf(item); 

  onplayRowItemOps.value='UpdateRowItem'

  return await _updateRow()
},

 _likes : async (_rowIndex,key) =>{
  onplayRowItem.value = Object.assign({},rows.value[_rowIndex])//reactive(rows.value.id[_rowIndex])//Object.assign({}, item));
  onplayRowIndex.value = _rowIndex;//rows.value.indexOf(item); 
  onplayRowItemOps.value='UpdateRowItem'
  if(nul.value.includes(onplayRowItem.value['likes'])){
    onplayRowItem.value['likes']={'like':1}
  }
  onplayRowItem.value['likes']['like'] =onplayRowItem.value['likes']['like']+1

  return await _updateRow()
},

_delRow : async (_rowIndex,itemId) =>{

  return await Crud_.deleteData(itemId)
  .then((response) => {
    if (response) {
      notifyit.warn("Deleted...", "bottom-left", null, 10000);
      rows.value.splice(_rowIndex, 1);
    } else {   }
    return true;
  })
  .catch((error) => { return false; });
} 
}
  //--------------------------------------METHODS & PROCESS
var _rowOpsLoadingStatus =ref(false)
async function _createRow(_isFileCapsulated = false) {  //UpdateRowItem User DAta with no graphic to update
  //---set--loading row operation
  _rowOpsLoadingStatus.value=true
  onplayRowItem.value['clients']=[]
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
  //---------Encapsulated file Extraction Completed...

  //---Creat the Content... which is with/out of file encapsulations
return await Crud_.createData()
    .then((response) => {
  _rowOpsLoadingStatus.value=false
      if (response) { 
        //---right after the content has been created change the mode from creating to UpdateRowItem
        //onplayRowItemOps.value='UpdateRowItem'
        //rows.value[arrayCols].unshift(response); //Inject the Data into_ OnplayRowItem & to be sented.
        onplayRowItem.value =response
        notifyit.succes("Content Created.", null, null, 7000);
        return true
      } else { }
      //--unset--loading row operation
      return false;
    })
    .catch((error) => {//_popUpgrader.value = false;
      //--unset--loading row operation
  _rowOpsLoadingStatus.value=false
      return false;
    });
}

async function _updateRow(_isFileCapsulated = false) { //UpdateRowItem User DAta with graphic to update or not
  //---set--loading  row operation
  _rowOpsLoadingStatus.value=true

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
  //---------Encapsulated file Extraction Completed...

  //---uploading the Content... which is with/out of file encapsulations
  onplayRowItem.value['phone']=Objprops._profile.phone;//always send the _loged phone along all content
    return await Crud_.updateData()
        .then((response) => {
          _rowOpsLoadingStatus.value=false

          if (response) { 
            rows.value[onplayRowIndex.value] = response; 
            onplayRowItem.value =response
            notifyit.succes("Content Updated.", null, null, 7000);
            //_resetRowItem()
            return true
          } else { }
           //--unset--loading row operation
          return false;
        })
        .catch((error) => {//_popUpgrader.value = false;
              //--unset--loading row operation
  _rowOpsLoadingStatus.value=false
          return false;
        });
}


  //--Perform_Delete Operations
  //-------------------------------------------------------------------------------------[3] [ Delete Crud_INIT]
  //----------------------------------------------------------SEARCHING

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

    return await genapsaleitContentOps
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


var showDate = ref("")// curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
var showTime = "" //
var showDay = ref("") //
var breakTime = ref(false) //

 function startTime() {
    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var ap = (hr < 12) ? "AM" : "PM";
    hr = (hr == 0) ? 12 : hr;
    hr = (hr > 12) ? hr - 12 : hr;
    //Add a zero in front of numbers<10
    hr = hr < 10  ? '0'+ hr : hr
    min = min < 10  ? '0'+ min : min
    sec = sec < 10  ? '0'+ sec : sec

    //document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap;
    showDate.value = hr + ":" + min + ":" + sec + " " + ap;
    if(hr == 12 && min > 30 && min < 31 ){breakTime.value=true}

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();

    showDay.value = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;

    showTime = setTimeout(function(){ startTime() }, 500);
}
startTime();

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