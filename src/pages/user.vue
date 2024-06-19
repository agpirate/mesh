<template>

  <q-page class="fit column rounded-borders" style="" >
          <!------------------------------ ioio ----->
        <div class="col q-pa-none column fit" v-if="rows?.length ?? false"    style="height:100svh;">
      
              <q-table 
              flat 
              bordered

              :rows="rows"
              :columns="columns"
  
              virtual-scroll

              :filterMethod="filterMethod"
              :filter="filter"

              row-key="id" 
              rowIndex="true"

              :inFullscreen="true"
              class="col column q-py-md  fit"

              hide-pagination
              hide-top
              hide-bottom
              style="min-width:100vw"
              >
                <template v-slot:top="props" v-if="false">
                    <q-btn class="hidden"  style="height:0px;width:0px"   ref="togflscreen" :set="enableflscreen = props.inFullscreen" @click="props.toggleFullscreen()" />
                </template>  

                <template v-slot:header="props">
                  <q-tr :props="props"  class="col-auto column" style="position:fixed;z-index:1;top:8vh" >
                    <q-scroll-area  class="col column transparent q-px-xs fit" style="min-width:100vw;height:1px;">
                      <div class="col flex flex-center q-gutter-sm  q-py-xs  transparent no-wrap " style="max-width:100%;max-height:100%;"> 
                                            <q-btn rounded no-caps  @click="_itServiceSE('_trend','')"  class="col-auto fontcstyle"  >
                                             Show All       
                                            </q-btn>
                                            <q-separator inset vertical class='q-py-sm'  />
                                            <q-btn rounded no-caps size="sm"  v-for="_qgroup1 in ['New','Used']" 
                                            @click="_itServiceSE('usage',_qgroup1)" :key="_qgroup1" class="col-auto fontcstyle"  :class="_querySE['usage'] == _qgroup1 ? 'bg-grey text-white' : ''">
                                              {{  _qgroup1 }} 
                                            </q-btn>  
                                            <q-separator inset vertical class='q-py-sm'  />
                                            <q-btn rounded no-caps size="sm" v-for="_qgroup0 in _thisSchema['catagory']['enum']" 
                                            @click="_itServiceSE('catagory',_qgroup0)" :key="_qgroup0" class="col-auto q-py-xs fontcstyle" :class="_querySE['catagory'] == _qgroup0 ? 'bg-grey text-white' : ''" >
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
                  <q-tr flat
                    :props="props" :class="!$q.screen.lt.sm ? 'row' : 'column'"
                    class="col-11 q-py-lg q-gutter-xs q-tr--no-hover fit fontbstyle"  
                    style="min-height:75vh;width:98vw;"                   
                  >
                              
                    <!------------------ iterating _ body cell-->
                    <q-td  auto-width class="col-2 " v-show="!$q.screen.lt.sm">                     
                    </q-td>
 
                    <q-td  :class="$q.screen.lt.sm ? 'col-grow column' : 'column col-6'  " v-if="props.row.profilegr ?? false"  >

                          <div class="col row ">
  
                              <div class="col column" >
                              
                                  <q-img                                  
                                              loading="lazy"
                                              :src=" (_onplayRowIndex == props.rowIndex) && _fileAsStringIndex ? props.row.profilegr[_fileAsStringIndex] : props.row.profilegr[0]"
                                              spinner-color="orange"
                                              class="column fit shadow-8" style="max-width:100%;border-radius:20px;aspect-ratio: 2/1;"                                            
                                              >
                                     
                                        <q-list class="column col fit fontbstyle" :class="props.row.userName ? 'transparent': 'transparent'">
                                          <q-item class=" col-auto row items-top q-px-none justify-between items-start"> 

                                           <q-item-section class="col-3  q-py-none fit-width q-gutter-xs" style="">
                                            <q-item-label style=""  v-if="props.row.userName ?? false">
                                              <q-item-label class="profileHeader-Glass fit row justify-between"> 
                                                                                           
                                                <q-badge class="transparent " >{{props.row.userName}}   </q-badge>
                                                <q-icon name="check_circle" size="xs" />

                                               </q-item-label>                                          
                                              
                                            </q-item-label>
                                            <q-item-label class="profileHeader-Glass" v-else> 
                                               #profile Service 
                                             </q-item-label>

                                             <div v-if="props.row.fupdatedAt?.hours ?? false" class="flex row q-gutter-sm q-py-none fontcstyle">                                                 
                                               
                                                <div v-if="props.row.fupdatedAt?.hours != 0 ?? false" class="text-dark row q-gutter-xs">
                                                      <div > Since </div>
                                                      <div v-if="props.row.fupdatedAt.days < 2 " >
                                                        <!--div v-if="props.row.fupdatedAt?.days != 0 ?? false"> {{  props.row.fupdatedAt.days }} Days </div-->
                                                        <div v-if="props.row.fupdatedAt?.hours != 0 ?? false"> {{ props.row.fupdatedAt.hours}} Hours</div> 
                                                      </div>
                                                      <div v-else>{{  props.row.updatedAt }}
                                                      </div>
                                                </div>
                                               
                                             </div>
                                              <q-item-label v-else class="fontcstyle justify-right text-dark"> Just Now  </q-item-label>


                                              <div class="col-auto column no-padding no-margine" style="border:0px solid orange;">

                                                  <q-btn outline v-for="item,fileIndx in props.row.profilegr" @click="_fileAsStringOpsCall(fileIndx,props.rowIndex)" :key="fileIndx" 
                                                  class="col-auto q-gutter-xs transparent q-pa-none no-border flex flex-center" >   
                                                                                                      
                                                      <q-avatar square class=" q-pa-none" style="border:1px solid orange" >
                                                        <img :src="item" >
                                                      </q-avatar>

                                                  </q-btn>
                                                  </div>


                                           </q-item-section>

                                           <div class="col-auto q-px-none q-mx-none" v-if="$q.screen.lt.sm">

                                                  <q-item  class="q-px-none">
                                                          <q-sticky expand position="right" class="q-px-none" >
                                                              <!--inseide_side_actions-->
                                                      <q-card class="q-px-none column" style="background-color: rgba(6, 93, 255, 0.212);" >

                                                          <q-btn round flat class="fontbstyle" label="Buy" @click="_onplayRowItemsideBoxcall(props.rowIndex,'clients')"

                                                            >
                                                            <q-badge color="orange fontcstyle" left floating v-if="props.row.clients?.length ?? false">                                                                     
                                                                      <q-item-label v-if="props.row.quantity == 0">sold </q-item-label>   
                                                                      <q-item-label v-else>saling </q-item-label>   
                                                            </q-badge>                                          

                                                          </q-btn>
                                                          <q-btn   :dense="true" flat class="text-blue"  label="Like" @mouseover="message"   @click="_activeRowOperation._likes(props.rowIndex)">
                                                            <q-badge class="bg-black text-white fontcstyle" color="orange" floating v-if="props.row.likes ?? false">{{  props.row.likes.like }}</q-badge>
                                                          </q-btn>

                                                          <q-btn   flat :dense="true"  icon="message" @mouseover="message" @click="_onplayRowItemsideBoxcall(props.rowIndex,'comments')">
                                                            <!--q-tooltip :dense="true" class="bg-black text-white fontbstyle" anchor="top end" self="left middle">comments</q-tooltip-->    
                                                          </q-btn>

                                                      

                                                          <q-btn  flat icon="map"  :dense="true"  @mouseover="message" @click="_onplayRowItemBoxcall(props.rowIndex)"> 
                                                            <q-tooltip class="bg-black text-white fontcstyle" anchor="top end" self="top middle">   map </q-tooltip>  
                                                          </q-btn>

                                                          <q-btn round  :dense="true" flat icon="edit" @mouseover="message" @click="_onplayRowItemBoxcall(props.rowIndex)"> 
                                                            <q-tooltip class="bg-black text-white fontcstyle" anchor="top end" self="top middle">   edit </q-tooltip>  
                                                          </q-btn>

                                                          <q-btn round  :dense="true" flat icon="delete" @mouseover="message"  @click="_activeRowOperation._delRow(props.rowIndex,props.key)">  
                                                            <q-tooltip class="bg-black text-white fontcstyle" anchor="top end" self="top middle"> delete </q-tooltip>  
                                                          </q-btn>

                                                          <q-btn  :dense="true" round flat icon="more_vert">

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

                                                  <q-item-section class="col columns row items-end" >
                                                          <q-item-label>D_QueryW {{ props.row.queryWeight}} </q-item-label>
                                                          <q-item-label>Prof_W {{ Objprops._profile.queryWeight}} </q-item-label>
                                                          <q-item-label> Revenu:- {{ props.row['tPrice'] }}</q-item-label>
                                                  </q-item-section>

                                          </q-item>
                                      
                                          <q-item class="col-auto row justify-between content-start q-px-none q-mx-none">
                                        
                                          </q-item>

                                         
                                        

                                          <q-item class="absolute-bottom fontdstyle items-center  q-gutter-sm row items-end ">

                                                <q-item-section class="q-py-sm fontbstyle col row"  >                                                      
                                                    <div class="col-auto column  justify-start q-pa-sm" >
                                                      <div class="col-auto row q-pa-xs q-ma-none">
                                                        <div class="col-auto justify-right q-py-none profileHeader-Glass" >
                                                          {{ props.row.header }}  
                                                        </div>
                                                      </div>
                                                      
                                                      <q-item v-if="!$q.screen.lt.sm" style="word-wrap: break-word;max-width:5vw" >  {{ props.row.content }}  </q-item>
                                                    </div>                                                      

                                                </q-item-section>

                                                                                            
  
                                                <q-item-section class="row col-auto q-px-none text-sm profileHeader-Glass">
                                                      <div v-if="typeof props.row.timer ?? false "> 
                                                         Price: {{  props.row.price  }}   
                                                        <q-item>
                                                          <q-item-section v-if="!$q.screen.lt.sm" >                                                             
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
                                                        
                                                          HH Price : <q-item-label class="text-strike text-orange">{{ props.row.price  }}</q-item-label>{{  props.row.discount }}
                                                                                                              
                                                      </q-badge>  
                                                      <q-badge class="q-pa-sm text-bold" color="orange" v-else>                                                  
                                                      
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
                                  <q-sticky v-if="!$q.screen.lt.sm" expand position="left" class="q-px-xs">
  
                                        <q-card class="q-pa-none column" style="background-color: rgba(6, 93, 255, 0.212);" >
  
                                          <q-btn round flat class="fontbstyle" label="Buy" @click="_onplayRowItemsideBoxcall(props.rowIndex,'clients')"

                                                            >
                                                            <q-badge color="orange fontcstyle" left floating v-if="props.row.clients?.length ?? false">                                                                     
                                                                      <q-item-label v-if="props.row.quantity == 0">sold </q-item-label>   
                                                                      <q-item-label v-else>saling </q-item-label>   
                                                            </q-badge>                                          

                                                          </q-btn>
                                                          <q-btn   :dense="true" flat class="text-blue"  label="Like" @mouseover="message"   @click="_activeRowOperation._likes(props.rowIndex)">
                                                            <q-badge class="bg-black text-white fontcstyle" color="orange" floating v-if="props.row.likes ?? false">{{  props.row.likes.like }}</q-badge>
                                                          </q-btn>

                                                          <q-btn   flat :dense="true"  icon="message" @mouseover="message" @click="_onplayRowItemsideBoxcall(props.rowIndex,'comments')">
                                                            <!--q-tooltip :dense="true" class="bg-black text-white fontbstyle" anchor="top end" self="left middle">comments</q-tooltip-->    
                                                          </q-btn>

                                                      

                                                          <q-btn  flat icon="map"  :dense="true"  @mouseover="message" @click="_onplayRowItemBoxcall(props.rowIndex)"> 
                                                            <q-tooltip class="bg-black text-white fontcstyle" anchor="top end" self="top middle">   map </q-tooltip>  
                                                          </q-btn>

                                                          <q-btn round  :dense="true" flat icon="edit" @mouseover="message" @click="_onplayRowItemBoxcall(props.rowIndex)"> 
                                                            <q-tooltip class="bg-black text-white fontcstyle" anchor="top end" self="top middle">   edit </q-tooltip>  
                                                          </q-btn>

                                                          <q-btn round  :dense="true" flat icon="delete" @mouseover="message"  @click="_activeRowOperation._delRow(props.rowIndex,props.key)">  
                                                            <q-tooltip class="bg-black text-white fontcstyle" anchor="top end" self="top middle"> delete </q-tooltip>  
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
                   
                    <q-td :class="!$q.screen.lt.sm ? 'column col-6 q-ma-md q-pa-lg' :'col-6 column q-ma-md'" style="padding-top:8vh" v-else>
                      <q-card  class="col row q-gutter-sm" >
                          <q-skeleton class="col" square />
                      </q-card>
                    </q-td>

                      <!------Image Display Ends (with 1:Normal ; 2:sckelton)-->
                    <q-td  auto-width class="col fit column q-pa-md"  style="min-height:75vh;" v-if="!$q.screen.lt.sm && (_onplayRowIndex == props.rowIndex)">
                            <q-card class="col column q-pa-sm " v-if="_onplayRowItemsideBoxOps ?? false">
                                <div class="col column" v-if="_onplayRowItemsideBoxOps == 'comments' && (props.row.comments ?? false)">                             
                                      <q-list class="col column  " style="height:100%;width:100%">  
                                        <q-item class="col-auto column">
                                          <q-item-label> 
                                            Comments:                                              
                                            <q-btn style="background-color:white;" color="primary" :dense="true" size="sm" rounded flat @click="_passiveColumnOperation._add()"> Create Comment</q-btn>                      
                                          </q-item-label>     

                                          <q-item-section v-if="_onplayRowItemsideBoxIndex == null" class="column q-pa-sm">                                            
                                              <q-item-label style="" >                                              
                                                      <q-input  v-model="_onplayComment['comment']" label="comment" stack-label :dense="true"   > </q-input>                                   
                                              </q-item-label> 
                                              <div class="col-auto q-pa-xs text-bold">
                                                  <q-btn color="blue" outline no-caps size="sm" label="Comment " :dense="true" @click="_passiveColumnOperation._submitArray('comments')" />
                                              </div>     
                                          </q-item-section>
                                        </q-item> 
                                      
                                        <q-separator spaced inset />
                                        <q-scroll-area class="col column fit" v-if="props.row.comments?.length ?? false" >
                                      
                                        <q-item v-for="item,index in props.row.comments" :key="index"  class="col column">
                                      {{  _onplayRowItemsideBoxIndex }}-{{  index }}
                                          <q-item-section v-if="(_onplayRowItemsideBoxIndex == index) ">  
                                                                                  
                                              <div class="justify-end  row ">  <div  style="color:teal"> Commenting..</div> </div>
                                              <q-item-label style="" >
                                                <q-input  
                                                      type="textarea"  v-model="onplayRowItem['comments'][index]['comment']" 
                                                     stack-label :dense="true"  />                                              
                                              </q-item-label>   
                                              
                                          </q-item-section>
          
                                          <q-item-section  v-else>
                                              <q-item-label style="" >
                                                {{item.userName}}# {{item.phone}}
                                              </q-item-label>      
                                           
                                            {{ props.row.comments[index].comment}}
                                            
                                          </q-item-section>
          
                                          <div class=" row justify-between" >
                                            <div class="text-orange">
                                              <q-icon name="star" />
                                              <q-icon name="star" />
                                              <q-icon name="star" />
                                              <q-btn round flat icon="edit" size="sm" @click="_passiveColumnOperation._selectArray(index)"> </q-btn>
                                              <q-btn round flat icon="done" size="sm" @click="_updateRow()" v-if="_onplayRowItemsideBoxIndex == index"> </q-btn>
                                              <q-btn round flat icon="delete" size="sm" @click="_passiveColumnOperation._remove(index)" v-if="_onplayRowItemsideBoxIndex ==index "> </q-btn>
                                            
                                            </div>                                         
                                            <q-item-label caption> {{  item.time }}</q-item-label>
                                          
                                          </div>
                                        </q-item>
          
                                    
          
                                      </q-scroll-area>
          
                                        <q-list v-else>
                                          No Comments ( New)
                                        </q-list>  

                                      </q-list>                                           
                           
                                </div> 

                                <div class="col column" v-else-if="_onplayRowItemsideBoxOps == 'clients' && (props.row.clients ?? false)">   
                                    <q-list class="column col fit" style="height:100%">   
                                        <q-item class="col-auto row ">
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

                                                      Your OrderID : {{ _onplayClient['orderID'] }}
                                                      <div class="q-gutter-sm row items-start q-pa-sm">
                                                          <q-input filled v-model="_onplayClient['orderID']" class="col-grow" label="OrderID" stack-label :dense="true" readonly />
                                                          <q-input type='Number'  outlined bottom-slots v-model="_onplayClient['quantity']" class="col-4" label="Quantity" default="1" min='1' :prefix="'+'" :dense='true' >
                                                            <template v-slot:hint>
                                                            </template>
                                                          </q-input>
                                                          <q-input filled v-model="_onplayClient['phone']" class="col-7" label="Phone_#" stack-label :dense="true" />                                 
                                                        

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
                                        <q-scroll-area class="col column fit" v-if="props.row.clients?.length ?? false">      
                                                                     
                                              <q-item v-for="item,index in props.row.clients" :key="index"  class="col column">  
                                                            
                                                    <q-item-section v-if="props.row.clients[index] ?? false">

                                                      <div class="row justify-between items-end q-gutter-sm ">
                                                        <div class="q-py-sm" v-if="props.row.clients[index]['served'] ?? false">

                                                                <div v-if="props.row.clients[index]?.['served'] == 'Requested' ?? false " >
                                                                  <q-badge color="red" size="sm">Pending..</q-badge></div> 
                                                            
                                                                <q-item-label style="" >
                                                                  <q-avatar size="14px"  :color="props.row.clients[index]['served'] != 'Queed' ? 'orange' : 'green'"></q-avatar>
                                                                    {{props.row.clients[index].phone}} #{{props.row.clients[index].orderID}}
                                                                </q-item-label>                                                   
                                                        </div>
                                                          <!---- is current loged user/client--> 
                                                          <div  v-if="props.row?.['userID'] == Objprops.userID"> 
                                                                <q-btn round color='blue' size="sm" flat icon="edit" @click="_passiveColumnOperation._selectArray(index)"> </q-btn>
                                                                <q-btn round flat size="sm" icon="done" @click="_updateRow(false)" v-if="_onplayRowItemsideBoxIndex  == index"> apply </q-btn>
                                                                <q-btn round flat size="sm" icon="delete" @click="_passiveColumnOperation._remove(index)" v-if="_onplayRowItemsideBoxIndex == index "> </q-btn>
                                                          </div>
                                                          <div v-else-if="props.row.clients[index]?.['userID'] == Objprops.userID">
                                                            <q-btn round flat color='orange' icon="edit" @click="_passiveColumnOperation._selectArray(index)" > </q-btn>
                                                              <!--q-btn round flat icon="done" @click="_updateRow(false)" v-if="_onplayRowItemsideBoxIndex == index"> </q-btn-->
                                                              <q-btn round flat icon="delete" @click="_passiveColumnOperation._remove(index)" > </q-btn>                
                                                    
                                                            </div>
                                                                                            

                                                    </div>                                       
                                                    
                                                    <div class="row q-gutter-sm" v-if="_onplayRowItemsideBoxIndex == index " >
                                                              <q-item-label style="">
                                                                  <q-input  autogrow filled clearable
                                                                  :shadow-text="textareaShadowText"
                                                                        @keydown="processTextareaFill"
                                                                        @focus="processTextareaFill"
                                                                        type="Number"  v-model="props.row.clients[index]['description']" 
                                                                        label="Delivery Remark" stack-label :dense="true"  />                                                                      
                                                              </q-item-label>                                                
                                                              <q-item-label style="" class="col">
                                                                
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
                                                      <div class="justify-between row q-gutter-sm" v-else >
                                                        <q-fieldset class="col rounded-borders bg-grey-4 q-pa-xs" v-for="k in ['quantity','price','paymentMethod']" :key="k"  >

                                                          <legend class="text-caption"> {{ k}}</legend>
                                                         <q-item-label class="text-caption" caption> {{ props.row.clients[index][k]}} </q-item-label> 

                                                        </q-fieldset>                                                                                                          

                                                      </div>    
                                                    </q-item-section>
                  
                                                    <q-item-section v-if="props.row.clients?.length ?? false">                                     
                                                          <div class="text-orange row justify-between"> 
                                                            <q-item-label class="row justify-start items-center " > Delivery Remarkk: <q-item-label class="text-black q-px-sm" caption> {{props.row.clients[index]['description']   }} </q-item-label>
                                                             </q-item-label>
                                                            <q-item-label caption> {{  props.row.clients[index].time.split(',')[0] ?? ' ' + props.row.clients[index].time.split(',')[1] ?? ' ' }}</q-item-label>
                                                            
                                                              </div>                                                                     
                                                            
                                                    </q-item-section>

                                                </q-item>

                            

                                              </q-scroll-area>
                                        
                                              <q-list v-else>
                                              No Clients ( Buyers)
                                            </q-list>  

                                          </q-list>

                                </div>

                            </q-card>
                    </q-td>
                   
                    <!---------Disktop----sideBox_show (comment & client) Ends-->
                    <q-card class="" style="position:fixed;width:100%;height:80%;bottom:0;z-index: 1;"  v-if="$q.screen.lt.sm && _onplayRowIndex == props.rowIndex">

                            <q-btn @click="_onplayRowItemsideBoxcall(null,'')" icon="close" color="orange" class="absolute-top transparent" style="z-index:1"  />

                            <q-img :src=" (_onplayRowIndex == props.rowIndex) && _fileAsStringIndex ? props.row.profilegr[_fileAsStringIndex] : props.row.profilegr[0]"
                            />
                              <q-card-section class="q-pa-none q-ma-none">
                                <q-item>
                                    <q-item-section class="col-grow">
                                      <q-item-label overline>{{ props.row.userName}}</q-item-label>
                                      <q-item-label>{{ props.row.header}}</q-item-label>
                                      <div class="row  q-gutter-sm">                                                
                                          <q-rating v-model="props.row._itServiceRating" :max="5" size="xs" @click="_activeRowOperation._rating(props.rowIndex)"/>
                                          <div >Price : {{ props.row.price}}</div>
                                          <div >Quantity: {{ props.row.quantity}}</div>
                                      </div>
                                     </q-item-section>

                                    <q-item-section side top v-if="props.row.fupdatedAt?.minutes ?? false" >
                                      
                                            <q-item v-if="props.row.fupdatedAt.days < 2 " class="row justify-between items-center ">
                                                            <div v-if="props.row.fupdatedAt?.days != 0 ?? false"> {{  props.row.fupdatedAt.days }} D : </div>
                                                            <div v-if="props.row.fupdatedAt?.hours != 0 ?? false"> {{ props.row.fupdatedAt.hours}} H :</div> 
                                                            <div> {{ props.row.fupdatedAt.minutes}} M</div> 
                                                          
                                              </q-item>

                                              <q-item-label v-else>
                                                {{  props.row.updatedAt }}
                                              </q-item-label>
                                    
                                    </q-item-section>
                                  </q-item>

                      
                              </q-card-section>

                              <q-tabs v-model="_onplayRowItemsideBoxOps" class="text-orange " :dense="true">
                                <q-tab label="Comments" name="comments" />
                                <q-tab label="Shoping" name="clients" />
                              </q-tabs>

                              <q-separator />

                              <q-tab-panels v-model="_onplayRowItemsideBoxOps" animated>
                                <q-tab-panel name="comments">
                                      commenting
                                </q-tab-panel>

                                <q-tab-panel name="clients">
                
                                      clients
                                </q-tab-panel>

                              </q-tab-panels>

                        </q-card>
                    <!---------Mobile----sideBox_show (comment & client) Ends-->
                    </q-tr>
  
                    </template>
              </q-table>
  
        </div>
   
<!-- sckelton of single_content-->
        <div class="col q-py-md fit flex flex-center" style="" v-else>

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
  import { ref,computed,watch,onUnmounted, onMounted } from "vue";
  
  import {useQuasar, useMeta } from "quasar";
  
  //import print from 'print-js';
  import { useRouter } from "vue-router";
  //import { storeToRefs } from "pinia";
  import { profileStore } from "stores/dataStores/profileStore"; //profile Store ( Main Store)
  import { genapiStore } from "src/stores/jstStores/genapiStore";
  
  import { profileSchemas } from "src/composables/schemas/profileSchemas";
  import {schemaSklt} from "src/composables/schemaSklts";
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
  const _ltsmDevice=ref($q.screen.lt.sm ? true : false)
  const _ltmdDevice=ref($q.screen.lt.md ? true : false)
  const _ltlgDevice=ref($q.screen.lt.lg ? true : false)
  //-------------------------------------------------------------Importing Defined Modules
  const profileService = profileStore();

  const genapprofileContentOps = genapiStore(); //import { genapiStore } from "src/stores/jstStores/genapiStore";
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

    //-----------access Parameters
    _iss: { type: Object, default: () => ({}) },  ///Customized(is?)_ACCESS_Type of Per/User(for_all Models)..as 'profile':[isUpgrade,isClient] Form
    _acctype: { type: Object, default: () => {}},   ///RAW_ACCESS_Type of Per/User (for_all Models)..as 'profile':[true,'/plat','',[]]
    //---------
    _modalPriviledges: { type: Object, default: () => ({}) }, //(Every Models _Schema for ACCEss Type)
    
    //----User Credentials and Unique ID.
    userID: { type: String, default: "" }, //
    userName: { type: String, default: "" }, //
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
  });

  //===-----_--------THE MODEL/ MAIN_DATA....
let _thisModel = "profile"; // the Vue_Page_DataModel (Listing Collection Name)
let _thisSchema=profileSchemas
let _thisModelHeader = ref(_thisModel+" Managment"); // the Vue_Page_Data_Headers(Descriptions...)

//---current Modal Specific_privileges_analysis
//let ext_modal_acctype = Objprops._modalPriviledges[_thisModel]['enum'] ?? Objprops._modalPriviledges[_thisModel]['venum']
//let org_modal_acctype = ref(ext_modal_acctype); //current model's possible privileges list....objects ( .enum=[1,2,3])
//let gen_modal_acctype = ref(Objprops._acctype[_thisModel]); //user's priviledges on current model....string
let gen_modal_iss = ref(Objprops._iss[_thisModel]); //user's priviledges on current model....string

let _isGroupof =ref(false) //has it, creator(admin) [Group] or just_Columnist_access
try{
_isGroupof =  computed(() => gen_modal_iss.value?.['group'] ?? false ) //is admin/creator...
}catch{}

let __isStage = ref([])
try{
   __isStage = computed(()=>
  { 
    return  gen_modal_iss.value?.['accstage'] ?? []
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

  //===============================================-----------------------
  //-------------Syncing Columns
columns = computed(() => { 
    if (Object.values(Objprops).length === 0) {
      return [{}];
    } else {
      let tempColumns = []; //HOLDING_  all the Columns of the Data_model ( TOTAL Columns)
      let tempviewColumns = [];  ////--HOLDING_ all the "Visible" Columns of the Data_model ( TOTAL Columns)
  
      for (let schemaColumn in profileSchemas) {
        let _col = { 
          name: schemaColumn,
          schema: profileSchemas[schemaColumn],
        };


        tempColumns.push(_col);
        if (schemaColumn === "extraColumn" || lockedColumns.value.includes(schemaColumn)) {
          continue;
        } else {
          let _roles = gen_modal_iss.value?.['role'] ?? false
          console.log('authomatio',_roles)
          try{ //gen_modal_iss.value['role'] ?? false
          if(_roles.includes('***')){
            authorizedColumn(_col);
          }
          else if(_roles.includes('**')){
            authorizedColumn(_col);
            }
            else if(_roles.includes('*')){
              if(_roles.includes(schemaColumn)){
                continue
              }else{   //authorizedColumn(_col); //
              }
            }
            else {
              if(_roles.includes(schemaColumn)){
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
      defaultItem={}
      logUser(); //
      return false;
    }    
    

     return await schemaSklt(authorizedColumns.value).then((_modelSkelton)=>{
      ////console.log('model Return',_modelSkelton)
      defaultItem=_modelSkelton
      logUser(); //
      return true
    }).catch((error)=>{
      defaultItem={}
      logUser(); //
      return true
    })
  }

let _defaultArray =ref({})
let _onplayDefaultColumn = ['phone',"userName","geolocation",'location','phoneCode']
async function logUser() { //should excute once on boot or on changing location(geolocation)
    for (let kkey of _onplayDefaultColumn) {
      try {
        defaultItem[kkey] = Objprops._profile[kkey];
      } catch {}
    }

    //defaultItem['comments']=[]
    defaultItem['userID']= Objprops.userID
    //defaultItem['clients']=[]
    let _thisDate=new Date().toLocaleString()
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    var result = ''
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    //defaultItem['clients'][0]={}
    defaultItem['clients'][0]['orderID']=result

    defaultItem['clients'][0]['userID'] = Objprops.userID ;//Object.assign(defaultItem['clients'][0],_client)
    defaultItem['clients'][0]['userName'] = Objprops.userName ;
    defaultItem['clients'][0]['phone'] = Objprops.phone ;
    defaultItem['clients'][0]['phoneCode'] = Objprops.phoneCode ;
    defaultItem['clients'][0]['confirmID'] = null ;
    defaultItem['clients'][0]['time'] = _thisDate ;

    defaultItem['clients'][0]['geolocation'] = Objprops.geolocation ;
    defaultItem['clients'][0]['location'] = Objprops.location ;
    //-----------
    //setted Comment (basic) information_ new Date().toLocaleString();
    defaultItem['comments'][0]['userID']=Objprops.userID;
    defaultItem['comments'][0]['time']=_thisDate;
    defaultItem['comments'][0]['userName']=Objprops.userName;
    //------------then re_assign to default too
    const onplay = Object.assign({},defaultItem)
    onplayRowItem.value = Object.assign({},onplay)
    onplayRowItemArray.value = Object.assign({},onplay) //will be used 

    _onplayComment.value=Object.assign({},onplay['comments'][0])
    _onplayClient.value=Object.assign({},onplay['clients'][0])

    ////console.log('logUser Out',onplayRowItem.value['clients'])
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

  ////console.log(result,'result')
  return result;
}

  //===============================================-----------------------------------
  //-----------------------DATAs ROWs--------------
  let rows = ref([{}]); //Data's projected with the Columns variable [ calling function.....Crud_.readDatas(top_100)]
  let rowsCount = ref(0);
    
  //===============================================-----------------------------------------
  //------------- MODAL ROWs_ MANAGMENT
  let defaultItem = {};
  let onplayRowItem = ref({}); //the selected row_actual_Data..as object
  let onplayRowItemArray = ref({}); //the selected row_actual_Data..as object

  var _onplayComment=ref({})
  var _onplayClient=ref({})

  //------- Original/_UpdateRowItem:CreateRowItem _Commands
  let _onplayRowItemBox = ref(false); //true...
  //-------
  let _onplayRowIndex = ref(null); //_row_item_index..0/1/2
  let _onplayRowItemOps = ref(false); //_is UpdateRowItem/Creating_New
  let _onplayRowItemOpsStatus =ref(false)
  
  //==-----tabular side_box ( Pop_by_Id and tell the Operation)
  let _onplayRowItemsideBox = ref(false); //clients,...
  //--------
  let _onplayRowItemsideBoxIndex = ref(null); //array_index_0/1/2/3
  let _onplayRowItemsideBoxOps = ref(null); //editing,deleting,creating
  let _onplayRowItemsideBoxOpsStatus =ref(false)


async function _resetOnPlayRowItem(){
////console.log('reseting onplayRow')
  //onplayRowItem.value = Object.assign({},onplay)
  //--------reset _onplayRowItem ( Big_Fish)
_onplayRowItemBox.value  = false; //true...

_onplayRowIndex.value = null; //_row_item_index..0/1/2
_onplayRowItemOps.value  = false; //_is UpdateRowItem/Creating_New
_onplayRowItemOpsStatus.value=false

//--------reset _onplayRowItem-SideBox ( Little_Fish)
_onplayRowItemsideBox.value  = false; //clients,...
//------------
_onplayRowItemsideBoxIndex.value = null; //array_index_0/1/2/3
_onplayRowItemsideBoxOps.value = null; //editing,deleting,creating
return true
}

  //inject filtering mechanism into store

rows = computed(() => {
  notifyit.info(('')+"New "+_thisModel + " Item Loaded..!");
  return profileService.getDatas;

  let dataCount = data.length;
  if (data.length === 0) {
    setDLoading(true);
    return [{}];
  } else{
    notifyit.info((rowsCount.value - dataCount)+"New "+_thisModel + " Item Loaded..!");
    setCounter(dataCount);
    return profileService.getDatas;
  }
});

function setCounter(num) {
  rowsCount.value = num;
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
  //////console.log(_group0,lowerSearch,'grouppppppppp00000000000')
  if(_group0){
    return true
  }return false

  //return ans;
});
//filteredRows.length ? notifyit.simple(filteredRows.length + " - Asset Item Founded") : ""
return filteredRows;
}


//------------------Quering and SE_settings
let _reqheader =ref({})
var cat_ =ref({usage:'',catagory:''})
var _querySE={} //_trend:'', catagory:'',usage:'New',content:''
let syncInt=''
//Init_set default query and setInterval of 1000(1sec)  
//profileService.set_syncQuery(_querySE.value) 

var _intSpeed=ref(6000)
//_querySE.value={}
async function _itServiceSE(_queKey=null,_value=''){
  //---------
  clearInterval(syncInt)
  //----------
  if(_queKey){
   // cat_.value[_queKey] = _value
    _querySE[_queKey] = _value 
  }
  profileService.set_syncQuery(_querySE) 
  //console.log(_querySE[_queKey],_value,'querrring..')

  _intSpeed.value=7000
  syncInt = setInterval(profileService.asyncDatas,_intSpeed.value);
  //console.log("Fast Down..",_intSpeed.value,_querySE);

   //rows.value=[]
  //_resetOnPlayRowItem()
  //---------
  setTimeout(function(){
    _intSpeed.value=10000
    //console.log("SLOWING Down..",_intSpeed.value,_querySE);
    clearInterval(syncInt)
    syncInt = setInterval(profileService.asyncDatas, _intSpeed.value)
    profileService.set_syncQuery(_querySE) 
  }, 8000);

  return true
}
_itServiceSE()
onUnmounted(async () => { 
    // Clear the interval when the component is destroyed to avoid memory leaks
    ////console.log("Destroyed...");
    clearInterval(syncInt);
    return true
 });
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
let _fileAsStringIndex =ref(0)//_fileAsString_Array_index
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
      //////console.log(_file.value[_attributeName],'foldering0000')      
      for(let i = 0; i < _isthereFiles.length; i++){
        _fileAsRaw.value.push(_isthereFiles[i])
        _fileAsSRC.value.push(URL.createObjectURL(_isthereFiles[i])) 
      }
      }
    }

///-----------------------File Operations and setting  UP(Folder) vs Down(Camera)
async function _fileAsSRCOpsCall(SRCIndex){
  //_onplayRowIndex.value=index
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

async function _fileAsStringOpsCall(StrIndex,index = null){ //calling for selections
   _onplayRowIndex.value=index
  _fileAsStringIndex.value=StrIndex
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
  //this._navigateDevice();

    constructor() { //_init_onPlayNavigator class
        ////console.error("Init.. Device Naviator");
        try{      // Check if geolocation is supported by the browser

        }catch{    }   
      }
    async _navigateDevice  ()  {  //navigate_phone_function
              //////console.error("Navigating mediaDevice.");
              if (Objprops._onPlayNavMedia ?? false) {
                    _listNavDevices.value['getUserMedia'] = Objprops._onPlayNavMedia.getUserMedia ?? {}      
                    for(let mediaDevice of ['getUserMedia','webkitGetUserMedia','mozGetUserMedia','msGetUserMedia']){
                        var _doesCamera = navigator[mediaDevice] ?? false
                        if(_doesCamera){
                        _listNavDevices.value[mediaDevice] = _doesCamera
                        }
                    } //this._onPlayMediaDevice= _onPlayNavMedia.value.mediaDevices['getUserMedia']
                    ////console.error("Navigating mediaDevice.00000000",_listNavDevices.value);
                
                  } else { // Geolocation is not supported by the browser
                            ////console.error("MediaDevice is not supported by this browser.");
                            }    
            return true   
          }

        async _enumNavigateDevice  (){
            try {
            return await Objprops._onPlayNavMedia.enumerateDevices().then((_camDevices)=>{
                  _listCameraSource.value = []
                  for(let index in _camDevices){
                    let _camDevice = _camDevices[index]
                    //////console.log('graphic device',_camDevice)
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
              ////console.log('Error No Camera Detected...Know this');
            }  
          return true
    }
    //-----------------------------------------
    async _openCamera (_attributeName=''){
          if (_listNavDevices.value['getUserMedia'] ?? false) {  //in priority use ( this device_ for media_sources)
              await this._enumNavigateDevice()
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
//-------------- POPUP_Box Controller functions (2way pop up ( for New Reg or Updating Row))
watch(Objprops,async()=>{
  let _requestHeader ={}
  _requestHeader['id']=Objprops?.['userID'] ?? ''
  _requestHeader['phone']=Objprops?.['phone'] ?? ''

  let _iss = Objprops?.['_iss'] ?? false

  if(_iss){
  _requestHeader['_iss']=_iss
  _requestHeader['_issModal']=_iss[_thisModel] //_issModal
  }else{
  }

  let _geoLoc = Objprops?.['geolocation'] ?? false
  if(_geoLoc){
    _requestHeader['loclat']=_geoLoc?.['lat'] ?? ''
    _requestHeader['loclaong']=_geoLoc?.['long'] ?? ''
    _requestHeader['loclaong']=_geoLoc?.['long'] ?? ''
  }

  profileService.set_reqHeader(_requestHeader)
  console.log('setting Header',Objprops.phone)
  return true
})

let _popRegisterDialogBox = computed(() => { return Objprops.lytCreatRow}) //Layout_listening for pop_creator
watch(_popRegisterDialogBox, async (cv, ov) => {
    await _resetOnPlayRowItem()
    const onplay = Object.assign({}, defaultItem); //deep copy item_objects with deep reactivity ( reactivity could lost... after multiple copying b/n or due depth increasing)
     onplayRowItem.value=onplay
    _onplayRowIndex.value = null;//rows.value.indexOf(item);
    _onplayRowItemOps.value='CreateRowItem'

    _onplayRowItemBox.value  = true; //true...

   return true
  });  //POP_Controller From Parent Layout_For New Registration of RowItem

//POP_Controller From With (Side_Bar)_For UpdateRowItem_RowItem
async function _onplayRowItemBoxcall(_onplayrowIndex){
    await _resetOnPlayRowItem()
    const onplay = Object.assign({},rows.value[_onplayrowIndex])
    onplayRowItem.value = Object.assign({},onplay)
    _onplayRowIndex.value = _onplayrowIndex;
    _onplayRowItemOps.value='UpdateRowItem'

    _onplayRowItemBox.value  = true; //true...

    return true
  }
//-----POP_UP Box Controller Room
//------SIDE_Wise Operations and Applications
let profileContentOps = ref();
profileContentOps.value={
 'Buy':["Buying Options","market","buy",0],
 'Comment':["Comments","collections_bookmark","comment",0],
 'like':["likes","assistant","like",0],
 'edit':["edit Content","group","edit",0],
 'delete':["delete Content","delete","delete",0],
 //------more (option)
 'more':["Locate Your Need","more","more",0],
}

//-------Listening for SideBox Operations & Visualizing
async function _onplayRowItemsideBoxcall(_onplayrowIndex=null,Ops=''){
    if(_onplayRowIndex.value == _onplayrowIndex && Ops == _onplayRowItemsideBoxOps.value){
      _onplayRowIndex.value = null;//rows.value.indexOf(item); 
    }else{
      await _resetOnPlayRowItem()
      //----------SET_ROW
      const onplay = Object.assign({},rows.value[_onplayrowIndex])//reactive(rows.value.id[_onplayrowIndex])//Object.assign({}, item));
      onplayRowItem.value= Object.assign({},onplay)
      _onplayRowIndex.value = _onplayrowIndex;//rows.value.indexOf(item); 
      //----------SET Columns
   //_setpopSideBox.value  = false; //true,..
      _onplayRowItemsideBox.value= true //default(main operations of pop_side box)
      _onplayRowItemsideBoxOps.value=Ops
    }
    return true;
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
      //_onplayRowItemsideBoxIndex.value= null; //which is null;;;
    onplayRowItem.value[_onplayRowItemsideBoxOps.value].splice(arrayIndex, 1);
    return await _updateRow().then((response)=>{
      const onplaycom=  Object.assign({},defaultItem['comments'][0])
      _onplayComment.value=onplaycom
      _resetOnPlayRowItem()
      return true
    })
  },
  //--------------------------
  _add:async ()=>{ //default_value for sideBox
      _onplayRowItemsideBoxIndex.value= null; //it would Create Default_Form(like )...use -1 as index ??????? of newlly creat
      //onplayRowItem.value={}
      return true;
  },
  _submitArray:async ()=>{
    onplayRowItem.value['comments'].unshift(_onplayComment.value); //or use below
    //onplayRowItem.value[_onplayRowItemsideBoxOps.value].unshift(_onplayComment.value);
    return await _updateRow().then((response)=>{
      var onplaycom=  Object.assign({},defaultItem['comments'][0])
      _onplayComment.value=onplaycom
      _resetOnPlayRowItem()
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
//-----
let  _activeColumnOperation = { 
  _initiateOrder:async (arrayIndex=0) =>{ //Set_New OrderID ___For__DefaultRowItem
  
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      var result = ''
      for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      //defaultItem['clients'][0]['orderID']=result
      var onplaycli=  Object.assign({},defaultItem['clients'][0])
      _onplayClient.value=onplaycli
      _resetOnPlayRowItem()

      _onplayClient.value['orderID']=result
      _orderDebuger.value= 'New Order'
      _orderStep.value=0
       return true
  },
  
  _confirmOrder:async () =>{
       _orderDebuger.value='Processing Order'
      onplayRowItem.value['clients'].unshift(_onplayClient.value);
      return await _updateRow().then(async (_confirmResult)=>{
          if(_confirmResult){
            _orderDebuger.value= 'Order Succeded.' //Confirmations message to wait for sms & re-enter
            _orderStep.value = 1
            //-------------grab Order_confirm Information (& enter into step_two)
            _orderIntiatedID.value= _onplayClient.value['orderID']; //Hold _Sent_OrderID & Whic is Confirmed
            _orderIntiatedPhone.value= _onplayClient.value['phone'] //Confirmations message to wait for sms & re-enter
            //------Ready for New Order
            return true          

          }else{}
            onplayRowItem.value['clients'].shift()
            _orderDebuger.value='Request Failed, Try New Order'
            //------Try with New Order
            _orderStep.value = 1
            return true         
      }).catch(async ()=>{ 
            onplayRowItem.value['clients'].shift()
            _orderDebuger.value='Request Failed, Try New Order'
            //------Try with New Order
            _orderStep.value = 1
            //defaultItem[_onplayRowItemsideBoxOps.value][0]['orderID']= _newID
            return true          
        })
  }}
//---------------Operating on Row
 //Operating without setting onplayrowItem ( directlly calling for effect) === active _operations
 let  _activeRowOperation = {
      _rating : async (_onplayrowIndex) =>{
        //_onplayRowItemsideBoxOps.value='rates'
        const onplay = Object.assign({},rows.value[_onplayrowIndex])//reactive(rows.value.id[_onplayrowIndex])//Object.assign({}, item));
        onplayRowItem.value = Object.assign({},onplay)
        _onplayRowIndex.value = _onplayrowIndex;//rows.value.indexOf(item);
        //_onplayRowItemOps.value='UpdateRowItem'
        return await _updateRow().then((response)=>{
            //_resetOnPlayRowItem()
        return true
        })
      },

      _likes : async (_onplayrowIndex) =>{
        //_onplayRowItemsideBoxOps.value='likes'
        const onplay = Object.assign({},rows.value[_onplayrowIndex])//reactive(rows.value.id[_onplayrowIndex])//Object.assign({}, item));
        onplayRowItem.value = Object.assign({},onplay)
        _onplayRowIndex.value = _onplayrowIndex;//rows.value.indexOf(item); 
        //_onplayRowItemOps.value='UpdateRowItem'
        //---------set Value
        if(onplayRowItem.value['likes'] == null){
          onplayRowItem.value['likes']={'like':1}
        }
        onplayRowItem.value['likes']['like'] =onplayRowItem.value['likes']['like']+1
        return await _updateRow().then((response)=>{
            //_resetOnPlayRowItem()
        return true
        })
      },

      _delRow : async (_onplayrowIndex,itemId) =>{
        return await Crud_.deleteData(itemId)
        .then((response) => {
          if (response) {
            //notifyit.warn("", "bottom-left", null, 10000);
            rows.value.splice(_onplayrowIndex, 1);
          } else {   }
          _resetOnPlayRowItem()
          return true;
        })
        .catch((error) => { return false; });
      } 
}
//--------------------------------------METHODS & PROCESS
async function _createRow(_isthereFilesCapsulated = false) {  //UpdateRowItem User DAta with no graphic to update
      //---set--loading row operation
      _onplayRowItemOpsStatus.value=true
      //--------even defaultRowItem has clients & comments default_array_value ( ignore it while creating new)
      //onplayRowItem.value['clients']=[]
      //onplayRowItem.value['comments']=[]
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
        //_onplayRowItemOpsStatus.value=false
        if (response) { 
            //---right after the content has been created change the mode from creating to UpdateRowItem
            //onplayRowItem.value = response
            notifyit.succes("", null, null, 7000);
            _resetOnPlayRowItem()
            rows.value.unshift(response)
            //const onplay = Object.assign({},defaultItem)
            //onplayRowItem.value = Object.assign({},onplay)
            return true
          } else { }
          //--unset--loading row operation
          _onplayRowItemOpsStatus.value=false
          return false
        })
        .catch((error) => {//_popUpgrader.value = false;
          //--unset--loading row operation
          _resetOnPlayRowItem()
          //_onplayRowItemOpsStatus.value=false
          return false;
        });
}

async function _updateRow(_isthereFilesCapsulated = false) { //UpdateRowItem User DAta with graphic to update or not
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
          if (response) { 
            //_onplayRowItemOpsStatus.value=false
            notifyit.succes("", null, null, 7000);
            //////console.log(rows.value[_onplayRowIndex.value][_onplayRowItemsideBoxOps.value] ,response[_onplayRowItemsideBoxOps.value],'response')
            rows.value[_onplayRowIndex.value] = response;
            _resetOnPlayRowItem()
            return true
          } else { }
           //--unset--loading row operation
        _onplayRowItemOpsStatus.value=false
          return false;
        })
        .catch((error) => {//_popUpgrader.value = false;
              //--unset--loading row operation
            _resetOnPlayRowItem()
          //_onplayRowItemOpsStatus.value=false
          return false;
        });
}

  //----=========================================================================---DATA ---/// ---ROW----CRUD
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
    //objParam[createKey] = onplayRowItem.value[createKey];
    try {
      if (Object.keys(objParam).length == 0) {
        //notifyit.warn("Incompleted Form ?");
       // return false;
      }
    } catch {
      //notifyit.warn("Refresh It Please ?");
     // return false;
    }
    //console.log(onplayRowItem.value,'creating content...')
  return await _theService
    .createData(onplayRowItem.value, objParam)
      .then((response) => { //returning as [false,response_obj]
        if (response[0]) { //
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

    //////console.log('crud_',onplayRowItem.value)
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
          notifyit.warn("Store Return False" + response);
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

    return await genapprofileContentOps
      .readData(modelUrl,objParam)
      .then((response) => { //returning as ['data'][{},{},{data..}]
      if (response) {return response;
        } else {f
          notifyit.warn("Store Return False" + response);
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
    
    return await genapprofileContentOps
      .readFData(modelUrl,objParam)
      .then((response) => {
        if (response) {
          return response;
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
          notifyit.warn("Store Return False" + response[1]);
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
      timeout: period,
      html:true,
      actions: actions ? [{label: actions,color:"green",handler: () => { return true; },},] : null,
      caption: "<div class='transparent' style='border-radius:10px;'>" + notes+" </div>",
      spinner:true,
      group: "my-group", //identical messages with of same group..with show label_count..
      progress: true,
      classes:'flat rounded-borders bg-light-page text-dark'
    });
  },
  warn: (notes = "", position = "bottom-right", actions = "", period = 700) => {
    $q.notify({
      type: "negative",
      message: notes,
      position,
      actions: actions ? [{label: actions,color:"red",handler: () => { return true; },},] : null,
      caption: "<div class='transparent' style='border-radius:10px;'>" + notes+" </div>",
      timeout: period,
      html: true,
      classes:'flat rounded-borders bg-light-page text-dark'
    });
  },
  succes: (
    notes = "",
    position = "bottom-left",
    actions = "",
    period = 900,
    head=''
  ) => {
    $q.notify({
      //type: "orange",
      message: head,
      position,
      actions: actions ? [{label: actions,color:"green",handler: () => { return true; },},] : null,
      caption: "<div class='transparent' style='border-radius:10px;'>" + notes+" </div>",
      timeout: period,
      html: true,
      classes:'flat rounded-borders bg-light-page text-dark'
    });
  },
  simple: (notes = "", position = "top-center", actions = "Ok", period = 1000) => {
    $q.notify({
      type: "info",
      color:"black",
      textColor:"white",
      message: "",
      position:"top",
      actions: actions ? [{label: actions,color:"green",handler: () => { return true; },},] : null,
      caption: "<div class='transparent' style='border-radius:10px;'>" + notes+" </div>",
      timeout: period,
      html:true,
      group: "my-group", //identical messages with of same group..with show label_count..
      progress: true,
      classes:'flat rounded-borders bg-light-page text-dark'
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

//------logout
async function logout() {
  sessionStorage.clear();
  //authService.getLogStatus={'_isRegistered':false,'user':null,'cookie':'false'}
  localStorage.clear()
  //await authService.clearlogStatus()
  return router.push({path:'/'});
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

onMounted(()=>{

  return true
})
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