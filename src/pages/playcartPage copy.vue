<template>


<q-dialog v-model="_fileAsPathSlide" class="column saleitContentOps-Glass ">
    <div class="col" v-if="onplayRowItem?.['saleitgr'] ?? false">
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
        <q-carousel-slide :name="imgindex" :img-src="imggr" v-for="imggr,imgindex in onplayRowItem['saleitgr']" :key="imgindex" />
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


<template v-if="DoneMessag">
      <debugCard :title="DoneMessag.title" :content="DoneMessag.content" :color="DoneMessag.color"></debugCard>
    </template>
    <template v-if="WarnthisMessage">
      <debugCard :title="WarnthisMessage.title" :content="WarnthisMessage.content" :color="WarnthisMessage.color"></debugCard>
    </template>


<div v-if="__this_foreignBoxsubOps =='buy'" class="flex flex-center column items-end" style="position: fixed;top:0%;left:0%;z-index:3;
width:100vw;height:100vh;background-color:black;">
  <div class="q-pa-sm  text-white " style="display: flex;flex-flow:column nowrap;gap:5px 5px;">
                                                <div class="fontestyle q-py-sm"> Quantity to Buy </div>

                                                <div class="row q-py-xs">
                                                  <q-btn rounded  size="sm" @click="_this_clientforeign['quantity'] = parseFloat(_this_clientforeign['quantity'] ?? 1) -1" > -</q-btn>
                                                  <q-btn color="orange" size="md" class="q-mx-xs"  :label="_this_clientforeign['quantity']"   />
                                                  <q-btn rounded size="sm"  icon="add" @click="_this_clientforeign['quantity'] = parseFloat(_this_clientforeign['quantity'] ?? 1)+1"   />

                                                </div>

                                                <div class="fontestyle text-white flex flex-center q-py-md"> {{  _this_clientforeign['quantity'] * _this.price +' '+ currency }}  </div>
                                                <div class="col-auto row items-end fontdstyle">   
                                                  <q-btn flat no-caps class="col-grow fontestyle bg-grey" label="Buy" @click="_this_clientforeignOperation._submitArray()" />    
                                                </div>
                                                <q-btn :dense="true" class="fontestyle row text-red" style="width:100%;" @click="__this_foreignBoxsubOps ='selected'">
                                                  <div class="col-grow"> Cancel</div>
                                                </q-btn>

  </div>

</div>
<div v-if="__this_foreignBoxsubOps =='cart'" class="flex flex-center column items-end" style="position: fixed;top:0%;left:0%;z-index:3;
width:100vw;height:100vh;">
  <div class="boxastyle q-pa-sm  text-white " style="display: flex;flex-flow:column nowrap;gap:5px 5px;">
                                                <div class="fontestyle q-py-sm">  Quantity to Buy    </div>

                                                <div class="row q-py-xs">
                                                  <q-btn rounded  size="sm" @click="_this_clientforeign['quantity'] = parseFloat(_this_clientforeign['quantity'] ?? 1) -1" > -</q-btn>
                                                  <q-btn color="orange" size="md" class="q-mx-xs"  :label="_this_clientforeign['quantity']"   />
                                                  <q-btn rounded size="sm"  icon="add" @click="_this_clientforeign['quantity'] = parseFloat(_this_clientforeign['quantity'] ?? 1)+1"   />

                                                </div>
                                                <div class="fontestyle text-white flex flex-center q-py-md"> {{  _this_clientforeign['quantity'] * _this.price +' '+ currency }}  </div>
                                                <div class="col-auto row items-end fontdstyle">   
                                                  <q-btn flat no-caps class="col-grow fontestyle bg-grey" label="Buy"  />    
                                                </div>
                                                <q-btn :dense="true" class="fontestyle row text-red" style="width:100%;" @click="__this_foreignBoxsubOps ='selected'">
                                                  <div class="col-grow"> Cancel</div>
                                                </q-btn>

  </div>
</div>


  <q-page class=" row rounded-borders fontastyle q-py-xs fit boxastyle"  >
    
      <div class="col-auto q-gutter-xs fixed-bottom z-top column q-ma-md items-end" style="left:70vw;"> 
          <!------------->
          <!--- No Data Founded, but keep listnening till we founde-->
          <div class="q-pa-sm" v-if='syncerrorData' > 
            {{ syncerrorData}} 
          </div> 
          <!---Rows is locked but, Update founded-->
          <div class="q-pa-sm text-bold rounded-borders fontastyle bg-blue" v-if='syncListenerSmsint' > 
              <div> {{ syncListenerSmsint}}</div>
              <div>Update Now</div>
          </div>
          <!-------------------->
          <!------loading update/create items-->
          <div class="q-pa-sm  text-bold rounded-borders fontastyle" v-if="_onplayRowItemOpsStatus">Still Loading... </div>
          <!------loading comments/client Operation--> 
          <div class=" text-bold rounded-borders fontastyle" v-if='_onplayRowItemsideBoxOpsStatus'>{{  _onplayRowItemsideBoxOps == 'comments' ? 'commenting..' : 'Buying' }}  </div>

          <!---custome loading(operation status)-->
          <!-- <div class=" text-bold rounded-borders bg-grey" v-if='Loading'> {{Loading}}  </div>
          <div class=" text-bold rounded-borders bg-green" v-if='DoneMessag'>  {{ DoneMessag}}  </div>
          <div class="  text-bold rounded-borders bg-cyan" v-if='KnowthisMessage'> {{ KnowthisMessage}}  </div>
          <div class="  text-bold rounded-borders bg-red" v-if='WarnthisMessage'> {{ WarnthisMessage}}   </div> -->
        </div>


      <div class="col-auto column rounded-borders fontastyle q-gutter-xs  boxbstyle" style="height:93svh;"> 
                        <!---Quantity Tags-->
                  <div class="col-auto q-gutter-sm row q-pa-xs justify-between boxastyle bg-orange"> 

                    <div class="col-auto row q-gutter-xs column justify-between items-center layout-Glass ">
  
                      <div class="row q-gutter-none items-center">
                        <q-avatar icon="phone"/><div> {{  Objprops._profile.phone }}</div>
                      </div>
                      <div class="text-white"> 
                        <q-avatar >
                          <img :src="Objprops._profile.profile[0]">
                        </q-avatar>
                        <div class=" fontastyle">#  {{  Objprops._profile.name }} {{  Objprops._profile.lastName }}</div>
                      </div>    
                      <div class="fontestyle text-white "> 
                        <div>My Shops</div>
                        </div>             

                    </div>
                    <div class="col-auto row q-gutter-xs" >
                      <!--q-date v-model="date" /-->

                          <q-card-section class="column col-auto q-gutter-xs fontastyle  shadow-1">
                              
                                <div> Search Date:</div>
                                  <div class="row justify-between q-gutter-sm q-px-xs" > 
                                      <div class="text-grey"></div>
                                      <q-btn label="Choose Date" :dense="true" color="blue" size="sm" @click="true"  ></q-btn>
                                    </div>
                                    <q-separator inset />
                                 <div> Show Store:</div>
                                <div class="row justify-between q-gutter-sm q-px-xs" v-for="item,kkey in _storeStatus" :key="kkey" > 
                                    <div class="text-black">{{  kkey }}</div>
                                    <div><q-toggle size="xs" v-model="_storeStatus[kkey]" val="xs"/></div>
                                  </div>
                           </q-card-section>

                           <q-card-section class="column col-auto q-gutter-xs fontastyle  shadow-1">
                              
                              <div> Serve Status:</div>
                              <div class="row justify-between q-gutter-sm q-px-xs" v-for="sstatus,kkey in _serveStatus" :key="kkey"> 
                                  <div class="text-black">{{  kkey }}</div>
                                  <div><q-toggle size="xs" v-model="_serveStatus[kkey]" val="xs"/></div>
                                </div>

                          </q-card-section>

                    </div>

                    <div class="col-auto q-gutter-xs row q-pa-none ">
                        <q-card-section class="shadow-1 col-auto fontastyle q-gutter-xs">
                            Total Quantity
                              <div class="row q-gutter-none bg-white rounded-borders">
                                  <div class="q-pa-xs text-grey">{{  storeItems['buy'] }}</div>
                                  <div class="col-grow q-pa-xs">Bought</div>   
                              </div>
                              <div class="row row q-gutter-none bg-white rounded-borders">
                                <div class="q-pa-xs ">{{  storeItems['cart'] }}</div>
                                <div class=" q-pa-xs">On Cart</div>                     
                              </div>
                        </q-card-section>

                        <!---Price Tags-->
                        <q-card-section class="shadow-1 col-auto boxastyle column">
                            <div class="fontdstyle">Total Budget</div>
                            <div class="row  flex flex-center col-grow q-gutter-xs">
                                <div>{{ totalPrice }}</div>
                                <div>{{ currency }}</div>
                            </div>
                        </q-card-section>
                    </div>

                  </div>

                  <div class="col column q-pa-sm q-ma-none " > 
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
                                          :props="props" style="background-color: orange;"
                                          ><!--q-icon name="lock_open" size="1.5em" /-->
                                           {{ props.col.name }}
                                        </q-th>
                                      </template>
                          
                                      <template v-slot:body="props">

                                          <q-tr :props="props" class="q-gutter-sm  col-shrink  fontbstyle"    :class="(props.rowIndex == __this_foreignBoxIndex) ? 'bg-white text-white':''"   >
                                          
                                            <td
                                          :props="props"
                                          style="font-size: 0.6em; text-align: justify"
                                          class="text-bold text-center fontdstyle"
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
                                                      <q-btn :dense="true" size="sm" no-caps color="blue" label="View"  @click="_this_foreignActivator('selected',props.rowIndex)"  />
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
                                                              <q-btn color="red" size="xs" :dense="true" icon="delete" @click="_this_clientforeignOperation._remove(props.rowIndex)" label="delete"  />                                    
                                                            </div>
                                                        
                                                          </div>
                                                  </template>
                                                  <template v-else>
                                                      <q-btn size="sm" :dense="true" color="orange"  icon="edit"  @click="_this_clientforeignOperation._selectArray('selected',props.rowIndex)" > </q-btn>
                                                  </template>
                                                       
                                                </div>
                                            <!---------------Others _this_clientColumns-->

                                          <!---------------Others columns-->

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
  
                                <div  style="width:80%" class="col-grow q-pa-xs row q-gutter-xs">

                                  <q-skeleton class="col-grow flex flex-center"  >Searching for your shops
                                    </q-skeleton>

                                  </div>

                                  <q-separator inset />
                                  <div class="row items-center q-gutter-sm">
                                    <div></div>
                                      <div class="fontastyle text-red">No shops Detected, so far</div>
                                  </div>
                                
                                  
                              </div>  

                    </div>

      </div>

      <div class="col-grow boxastyle q-pa-xs" v-if="_this_Rows && Object.keys(_this_Rows).length">

            <div class="col boxastyle" style=""> 
             
                    <q-item class="items-start">
                        <q-item-section top avatar>
                          <q-avatar color="primary" text-color="white" icon="phone" />
                        </q-item-section>

                        <q-item-section>
                          <q-item-label>{{(_this_Rows.fphone)}}****</q-item-label>
                          <q-item-label caption v-if="typeof _this_Rows.fupdatedAt == 'object'" class="text-grey row q-gutter-xs"> 
                            <div> Last Updated :</div>
                                                          <div  v-if="_this_Rows.fupdatedAt?.days ?? ''" > {{_this_Rows.fupdatedAt.days}} D,</div> 
                                                          <div v-if="_this_Rows.fupdatedAt?.hours ?? ''" > {{_this_Rows.fupdatedAt.hours}} H,</div> 
                                                          <div v-if="_this_Rows.fupdatedAt?.minutes ?? ''" > {{_this_Rows.fupdatedAt.minutes}} M</div>
                                                          <div>ago</div>
                                                      </q-item-label>
                                <q-item-label class="text-grey row q-gutter-xs" caption v-else> {{_this_Rows.fupdatedAt}} </q-item-label>
                                    

                        </q-item-section>

                        <q-item-section side top>
                          <q-item-label caption>
                                        
                          </q-item-label>
                                            <q-badge class="q-pa-sm text-bold" v-if="_this_Rows.discount ?? false" color="pink">
                                                              
                                                              HH Price : <q-item-label class="text-strike text-orange">{{ _this_Rows.price  }}</q-item-label>{{  _this_Rows.discount }} {{  currency }}
                                                                                                                  
                                                          </q-badge>  
                                                          <q-badge class="q-pa-sm fontestyle" color="orange" v-else>                                               
                                                          
                                                              {{  _this_Rows.price }} {{  currency }} (Price)
                                              </q-badge>  
                                              <div class="text-orange"> 
                                                              <q-rating v-model="_this_Rows._itServiceRating" :max="5" size="xs"/>                                                       
                                              </div>                                                     
                        </q-item-section>
                    </q-item>
                  </div>

         <div> 
                                        <q-img                                  
                                                    loading="lazy"
                                                    :src=" _fileAsPathIndex ? _this_Rows.saleitgr[_fileAsPathIndex] : _this_Rows.saleitgr[0]"
                                                    spinner-color="orange"
                                                    class="column  rounded-borders fit shadow-1" style="max-width:100%;border-radius:5px;aspect-ratio: 2/1;"                                            
                                                    >
                                          
                                              <q-list class="column col fit fontbstyle q-px-none" :class="_this_Rows.phone ? 'transparent': 'transparent'">
                                                <q-item class=" col-auto row items-top q-px-none justify-between items-start"> 

                                                <div class="col-sm-5 col-md-3   q-py-none fit-width q-gutter-xs" style="">
                                                          <q-btn flat  :dense="true" icon="zoom_in" @click="_fileAsPathSlideCall()"> 
                                                            <q-tooltip>Look Closer</q-tooltip>
                                                          </q-btn>
                                                  </div>

                                                <div class="col-auto q-px-none q-mx-none " v-if="$q.screen.lt.sm">
                                                        <q-item  class="q-px-none">
                                                            
                                                              </q-item>
                                                        </div>

                                                        <!--q-item-section class="col columns row items-end float" >
                                                                <q-item-label>D_QueryW {{ _this_Rows.queryWeight}} </q-item-label>
                                                                <q-item-label>Prof_W {{ Objprops._profile.queryWeight}} </q-item-label>
                                                                <q-item-label> Revenu:- {{ _this_Rows['tPrice'] }}</q-item-label>
                                                        </q-item-section--->

                                                </q-item>
                                            
                                                <q-item class="col-auto row justify-between content-start q-px-none q-mx-none">
                                              
                                                </q-item>

                                                <q-item class="absolute-bottom fontdstyle items-center  q-gutter-sm row items-end ">
                                                  <div class="col row " v-if="$q.screen.gt.sm">  <!---------------------Conteting While in NOT Mobile Screen-->
                                                  

                                                  </div>

                                                  <div class="col row" v-else>   <!---------------------Conteting While in Mobile Screen-->
                                                    <q-item-section class="q-py-sm fontbstyle col row"  >                                                      
                                                          <div class="col-auto column  justify-start q-pa-sm" >
                                                            <div class="col-auto row q-pa-xs q-ma-none">
                                                              <div class="col-auto justify-right q-py-none saleitContentOps-Glass" >
                                                                {{ _this_Rows.header }}  
                                                              </div>
                                                            </div>
                                                            
                                                          </div>                                                      

                                                      </q-item-section>
                                                    
                                                      <q-item-section class="row col-auto q-px-none text-sm saleitContentOps-Glass">
                                                      
                                                            <div > 
                                                              Revenue: {{  _this_Rows.tPrice  }}   
                                                              <q-item v-if="typeof _this_Rows.timer ?? false ">                                                         

                                                                <q-item-section>                                                            
                                                                </q-item-section>
                                                              </q-item>
                                                            </div> 
                                                            
                                                            <q-separator inset />
                                                            <div v-if="_this_Rows.clients ?? false">Buyers : {{ _this_Rows.tClient}}</div>
                                                            <q-separator inset />
                                                            <div v-if="_this_Rows.clients ?? false">Quantity : {{ _this_Rows.quantity}}</div>                                                   
                                                        
                                                      </q-item-section>
                                                  </div>
                                                </q-item>
                                              </q-list>
                                        </q-img>

                </div>

                <div class="row q-gutter-sm"> 

                  <q-item class="col column q-gutter-sm" >
                    <div class="col row no-padding no-margine q-gutter-xs " style="border:0px solid orange;">

                    <q-btn outline v-for="item,fileIndx in _this_Rows.saleitgr" @click="_fileAsPathOpsCall(fileIndx,)" :key="fileIndx" 
                    class="col-1 column  transparent q-pa-none no-border " style="max-width:6dvw">   
                          <img :src="item" class="col fit shadow-2 transparent rounded-borders q-pa-none" style="aspect-ratio: 2/1;width:100%;" >
            
                    </q-btn>                                              

                    </div>

                      <div class="col-auto column q-gutter-sm">
                          <q-item-section style="color:blue"> Item  Details
                        </q-item-section>   

                        <q-item-section class="boxbstyle rounded-borders shadow-1">   
                          <q-item-label >{{  _this_Rows['header'] }}</q-item-label>
                          <q-item-label caption>{{  _this_Rows['description'] }} </q-item-label>
                        </q-item-section>
                        <div class="q-gutter-xs row">
                        <q-item-section class="boxbstyle rounded-borders shadow-1">   
                          <q-item-label >Available Quantities</q-item-label>
                          <q-item-label class="text-grey"> {{  _this_Rows['quantity'] }} </q-item-label>
                        </q-item-section>

                        <q-item-section class="boxbstyle rounded-borders shadow-1">   
                          <q-item-label >Total Buyers</q-item-label>    {{  __this_foreignBoxsubOps ?? false}} {{  __this_foreignBoxIndex ?? false }}
                          <q-item-label class="text-grey"> {{  _this_Rows['tClient'] }} </q-item-label>
                        </q-item-section>

                        </div>
                    
                        </div>

                            <div class="col-grow column q-gutter-sm" v-if="__this_foreignBoxIndex != null">

                            <q-separator inset />

                            <div class="fontestyle text-orange"> Your  Order Details
                            </div>   
                            <div class="q-gutter-xs row">
                                <q-item-section class="boxbstyle rounded-borders shadow-1">   
                                  <q-item-label>Quantity</q-item-label>
                                  <q-item-label caption>{{  _this_clientforeign['quantity'] }}</q-item-label>
                                </q-item-section>

                                <q-item-section class="boxbstyle rounded-borders shadow-1">   
                                  <q-item-label>Total Price</q-item-label>
                                  <q-item-label caption>{{  _this_clientforeign['price'] }}</q-item-label>
                                </q-item-section>

                                <q-item-section class="boxbstyle rounded-borders shadow-1">   
                                  <q-item-label>Order Date</q-item-label>
                                  <q-item-label caption v-if="typeof _this_clientforeign.fupdatedAt == 'object'" class="text-grey row q-gutter-xs"> 
                                                          <div  v-if="_this_clientforeign.fupdatedAt?.days ?? ''" > {{_this_clientforeign.fupdatedAt.days}} D,</div> 
                                                          <div v-if="_this_clientforeign.fupdatedAt?.hours ?? ''" > {{_this_clientforeign.fupdatedAt.hours}} H,</div> 
                                                          <div v-if="_this_clientforeign.fupdatedAt?.minutes ?? ''" > {{_this_clientforeign.fupdatedAt.minutes}} M</div>
                                                          <div>ago</div>
                                                      </q-item-label>
                                    <q-item-label v-else> {{_this_clientforeign.fupdatedAt}} </q-item-label>
                                </q-item-section>

                            </div>


                            <q-item-section class="boxbstyle rounded-borders">   
                              <q-item-label>Serve Status</q-item-label>
                              <q-item-label caption v-if="_this_clientforeign['served'] = 'Requested'">{{  _this_clientforeign['served'] }}</q-item-label>
                              <q-item-label caption v-else style="color:orange;">{{  _this_clientforeign['served'] }}</q-item-label>
                            </q-item-section>
                            <q-item-section class="boxbstyle rounded-borders">   
                              <q-item-label>Notes</q-item-label>
                              <q-item-label caption >{{  _this_clientforeign['description'] }}</q-item-label>
                            </q-item-section>

                            </div>

                    </q-item>

                      <q-item class="column col-auto justify-center q-gutter-sm" v-if="_this_clientforeign?.quantity ?? false">
                        <q-btn icon="numbers" no-caps>Qts {{  _this_clientforeign['quantity'] }} </q-btn>
                        <q-btn >{{  _this_clientforeign['price'] }} {{  currency }}</q-btn>
                      </q-item>

          </div>

          <div class="flex flex-center q-gutter-sm q-pa-sm" v-if="_this_clientforeign?.store ?? false"> 
sss
            <q-btn icon="edit" color="green" rounded :dense="true" v-if="_this_clientforeign.store == 'cart'">
              <q-tooltip> Edit On Cart Items !</q-tooltip>
              </q-btn>
              <template v-if="_this['quantity'] && _this['price']" >
                
                <q-btn icon="add" color="green" rounded :dense="true"  @click="_this_clientforeignOperation._selectArray('buy',null)" style="background-size:5px;">
                  New Order
                </q-btn>
                
              </template>
          
          </div>

      </div>
      <div class="col flex flex-center fontbstyle" v-else>
                  
                  <div v-if="__thisOpsStatus" > 
                    <q-spinner color="primary" size="3em" :thickness="2"  />
                    <div style="font-weight:lighter;font-size:12px"> Loading </div>
                  </div>
                  <div v-else style="font-size:43px;font-weight:bolder;color:red;"> Product doesn't founded. </div>
      </div>  
      <!----------------------LiveDATA Banner-->

      <!------------Zooming Level Adjuster Sticky-------------------------->
</q-page>

    </template>
    
    <script setup>
  
      //_____________________________________________Modules Definitions
  //-------------------------------------------------------------Importing System Modules
  import { ref,reactive,computed,watch,onUnmounted, onMounted } from "vue";
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

  // import {schemaSklt} from "src/composables/schemaSklts";
  import { _wiseDating } from "src/composables/utilServices/datePeriod"

import debugCard from "src/components/debugCards.vue"
import useThisMixin from "src/composables/thisMixin"
var { 
  _this_Rows,
      _this_Query,
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
      // _resetBox,
      //====================
      __this_foreignBox ,
      //--------
      __this_foreignBoxIndex ,
      __this_foreignBoxOps ,
      __this_foreignBoxOpsStatus ,
      __this_foreignBoxsubOps ,
      //---
      // _resetfBox,
} = useThisMixin()

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

import useDefaulMixin from "src/composables/myMixin"
// Import the mixin
// Use the mixin
var {count,
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

      _model_Defaulting,
      _modal_Defaulting_,

      modalColumns,
      modal_iss,
} = useDefaulMixin();


import usefileMixin from "src/composables/fileserviceMixin"
var { 
  _fileAttributeName,
  _fileAsSRC,
        _fileAsRaw,

        _fileAsSRCIndex,
      //---
      _cameraDevice,
      _fileSourceFolder,
      //--------
      _fileAsSRCOpsCall,
      //-----------
      _resetFileSource,
      //---
      // _resetfBox,
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
const saleitcliService = saleitcliStore();

  const genapsaleitContentOps = genapiStore(); //import { genapiStore } from "src/stores/jstStores/genapiStore";
  //-------
  //////////////////////////////////////////--------------Axios Wrapper UUUUUUPPPPPPPPPPPP
  //-------------USER PROFILE_Variables..
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
  
  Objprops_.value=Objprops ?? false

//---------------------------
//===-----_--------THE MODEL/ MAIN_DATA....
 _thisModel = "saleit"; // the Vue_Page_DataModel (Listing Collection Name)
let _this_clientSchema=saleitClientSchema
_this_clientSchema['time']={default:''}
_this_clientSchema['action']={default:''}

_this_Schema.value = _this_clientSchema

const _thisapiUrl='/saleitapi/saleit'
const _thisiiapiUrl='/saleitcliapi/saleitcli'
//---current Modal Specific_privileges_analysis

//---current Modal Specific_privileges_analysis (SALEIT Role and Responsiblities ++ Stages)

//=======================================Loged User Role && Permission===Start
let gen_modal_iss = computed(() => { return modal_iss() } )
//==============================================------------------------------------
  let enableflscreen =ref(true)
  //--------------
  let _this_clientModels =[]
  let _thisModels =[]

  let _this_clientColumns = ref([]); //Actual Table_Columns ++Descriptions
  // let _allColumnNames = ref([]); //Actual OuterMost Table_Column_Names [Top(Layer_1] _Columns _Name_List]
  // let _rolesColumns = ref([]); //Filtered/Authorized_Table_Columns ++Descriptions for Editing/Adding.... but not Viewing

  //_this_clientColumns_filter()-------- which to displayOn REgisterations form
  let lockedColumns = ref([ "userID","userName",'time','action']); //are blacklist of _this_clientColumns tobe not shown during the Registerations..form submitting
  //let tableZooming =ref(1)
  //------column invisiblity on table_
  // let visibleColumns = ref([]); //Hold List of In
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
//===============================================-----------------------
//-----add require custom columns

//-------------Syncing Columns
_this_clientColumns = computed(() => { 
    //if (Object.values(Objprops).length === 0) { //is User_Fully_Authenticated &&  or Return Null_Columns
    //  return [{}];
    //} else {

      //--------------Preparing this_model role_schemas
      let rolesWall = gen_modal_iss.value['enum']//?.['role'] ?? false

      //------==== building columns of thisMoel
      let _tableColumn = []; //HOLDING_  all the ---"Columns"--- of the Data_model ( TOTAL Columns)
      let _visibleColsName = [];  ////--HOLDING_ all the ---"Visible" Columns"---- of the Data_model ( TOTAL Columns)
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
      //--------------------------build other columns_set by roleBase or just Listing
      _setDefaults()
      visibleColumn(_visibleColsName);
      console.log(_tableColumn,'column builduuuup',_visibleColsName)
      return _tableColumn;
    //}
  });

  async function _setDefaults(){
    // _this_clientModels = ['phone',"userName","geolocation",'location','phoneCode'] //
    _thisModels = ['orderID',"saleitID",'userName','phone',
      'confirmID','served','phoneCode','geolocation','location'] //
    // _thisModels = ['phone',"userName","geolocation",'location','userID','phoneCode'] //
    _thisDefault.value = await _modal_Defaulting_(_thisModels)
    _thisDefault.value['quantity']=1
    _thisDefault.value['userID']=Objprops._profile.id
    //------==== building columns of thisMoel

    //------==== building columns of thisMoel (Defined Schema-0)
    _this_clientModels = ["saleitID",'userName','phone',
      'confirmID','phoneCode','geolocation','location'] 
    // _this_clientModels = ['phone',"userName","geolocation",'location','phoneCode'] //
    _thisDefault_client.value = await _model_Defaulting(_this_clientModels)
    _thisDefault_client.value['orderID']=await _genOrderID()
    _thisDefault_client.value['userID']=Objprops._profile.id
    _thisDefault_client.value['quantity']=1
    _thisDefault_client.value['served']='Requesting'
    _thisDefault_client.value['price']=0
    //-------------------------(Defined Schema-1)
    // _commentModels = ['saleitID',"userID","phone",'userName','time'] //
    // _thisDefault_chat.value = await _modal_Defaulting_(_commentModels)
    // _thisDefault_chat.value['userID']=Objprops._profile.id

    // console.log(_thisDefault.value,_thisDefault_client.value,_thisDefault_chat.value,'loging default======')
    return true
  }
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
  //-----------------------DATAs ROWs--------------
  let _contenting=ref('main')//handle two tables

  let _contentingliveStatus=ref(20000)
  let _contentingcliliveStatus=ref(20000)
  var currency=ref('Birr') 
  //--------------------------
  //--------------------------
  // let _this_Rows = ref([]); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
  let _this_chatRows = ref([]); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
  let _this_clientRows = ref([]); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
  //===============================================-----------------------------------------
  //-------------------secondary && thrisiary models Default 
  let _thisDefault_chat=ref({})
  let _thisDefault_client=ref({})
  let _this_clientforeign = ref({}); //the selected row_actual_Data..as object
  let _this_chatforeign = ref({}); //the selected row_actual_Data..as object
  //------------- MODAL ROWs_ MANAGMENT
  //-------
  let _is_thisOwner=ref(false)
  let _is_clientOwner=ref(false)
  let _is_chatOwner=ref(false)
  //--------------------CONTENTING (CREATING  && EDITING....) ====STARTS
//------------------
    // Return data and methods
    async function _resetBox(Ops,rowIndex){
    _fileAttributeName.value=null;
    _fileAsPathIndex.value=null
    // console.log('mixing Response',_this.value,_this_Rows.value,rowIndex)
    
    __thisBox.value  = false; //OPen the Box
     _this.value = Object.assign({},
     rowIndex == null ? _thisDefault.value : _this_Rows.value[rowIndex]  
     
   ) //----assigning Onplay Row
  //  console.log('mixing Response2',_this.value,rowIndex)

     __thisIndex.value=rowIndex
     __thisOps.value =Ops
     __thisOpsStatus.value=false
     return true
   }

   async function _resetfBox(foreignOps){
    __this_foreignBox.value= true //disasble sideBox
    __this_foreignBoxOpsStatus.value=false //turnofff active stauts
    __this_foreignBoxOps.value=foreignOps //diable andy operations
    return true
  }

let __thisBox_CDialog = computed(() => { return Objprops.lytCreatRow}) //Layout_listening for pop_creator
watch(__thisBox_CDialog, async (cv, ov) => {
  // _fileAttributeName.value=null;
   await _resetBox('CreateRowItem',null)
   __thisBox.value  = true; //OPen the Box
   return true
  }); 
async function __thisBox_UDialog(_playrowIndex){
  // _fileAttributeName.value=null;
    await _resetBox('UpdateRowItem',_playrowIndex)
   __thisBox.value  = true; //OPen the Box
    return true
  }

//--------------------------------------------------
//----------------------------------
let pagination= ref({ rowsPerPage: 200 })
//--------------clientQuery
//Init_set default query and setInterval of 1000(1sec)  
//--------------------2ndary
//  _this_Query = ref({})
async function _thisRowSync(){
  return await saleitService.readFData(_this_Query.value).then((res)=>{
              if(res){
                _this_Rows.value=Object.assign({},res[0])
                _this.value=Object.assign({},res[0])

                //-----
              _this_clientforeign.value['saleitID']=_this.value['id']  //----------- contentIDs
                
              }__thisOpsStatus.value=false
              return true
            })
}

let _clientQuery = ref({})
async function _this_clientSync(){
  return await saleitcliService.readFData(_clientQuery.value).then((res)=>{
              if(res){
                _this_clientRows.value=res //Object.assign(_this_clientRows.value,res)
              }__this_foreignBoxOpsStatus.value=false
              
              //--------
              this_Query('id',_this_clientRows.value[0]['saleitID'])
              return true
            })
}

//-------instead of syncing secondary_data (use function)
//--------------------3ndary
///-------------- _chatRows --
_this_clientQuery()
//-----------------------
onUnmounted(async () => { 
    return true
 });

async function this_Query (_queKey=null,_value=null,_qvalue=null){
    _this_Query.value={}
    _this_Query.value[_queKey]=_value
    _thisRowSync()
return true
}

async function _this_clientQuery (){
  _clientQuery.value={'userID':Objprops._profile.id}

  //_clientQuery.value['saleitID']=_this.value['id']
  //_clientQuery.value['store']='buy'
  _this_clientSync()
  //await saleitService.set_syncQuery(_this_Query)
  __this_foreignBoxIndex.value=null
  __this_foreignBoxOpsStatus.value=true

  _this_clientforeign.value=Object.assign({},_thisDefault_client.value)
  _this_clientforeign.value['orderID']=await _genOrderID()
  return true
}

 //-----searaching on/off
//---------------fetching local data
let totalPrice=ref(0)
let storeTime=reactive(0)
let storeItems=ref({'cart':0,'buy':0})
let serveItems=ref({'Requesting':0,'Requested':0,'Queed':0,'Served':0})

//-------------filtering and Searching Methods
const _setDate = ref(false)

let _orderDate=reactive('')
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
  }});

  //-------------the search Engine..
function _thisFiltering(rows, terms) {
    if(_enableRowFilter.value){
      return rows
    }// rows contain the entire data
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
        let _serveStatus = row.served ?? null
        _serveStatus =terms[_serveStatus] ?? true 

        let _storeStatus = row.store ?? null
        _storeStatus =terms[_storeStatus] ?? true 
        //--------
        if(_group0 && _serveStatus  && _storeStatus){
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
//-----POP_UP Box Controller Room
//_this_clientforeignOperation
//---------------------Byuers and related Data Schema
//---------------ACTIVE Operating on Row
 //Operating without setting onplayrowItem ( directlly calling for effect) === active _operations

//-------Listening for SideBox Operations & Visualizing
async function _this_foreignActivator(subOps,_foreignIndex=null){
          //------------------------------- RESEting Values
          console.log('subops index',_foreignIndex)

          if(_foreignIndex && (__this_foreignBoxIndex.value == _foreignIndex) ){
            __this_foreignBoxIndex.value=null
            __this_foreignBoxsubOps.value=null
            return true}
          __this_foreignBoxIndex.value = _foreignIndex
          __this_foreignBoxsubOps.value=subOps
          //----------------------------------
          //_this_clientService.set_syncLock(false)
           //------disable status
          __thisOpsStatus.value=false
          // __this_foreignBoxStatus.value=true
          //showDescription.value = _foreignIndex
          //-------create current Row Object

          //--------------------loading is on fetchData or do something
          if(_foreignIndex ==null){
            _this_clientforeign.value=Object.assign({},_thisDefault_client.value)  
          }else{
            _this_clientforeign.value=Object.assign({},_this_clientRows.value[_foreignIndex])
          }
          //--------assign current operations
          __this_foreignBoxIndex.value = _foreignIndex;
          __this_foreignBoxOps.value='clients'
          __this_foreignBoxOps.value= true

            //await _clientSync()
        
          //----------------
          await this_Query('id',_this_clientforeign.value['saleitID'])

          return true 
          //------------
  }
//------operations OVer POP_Up_Box
let _this_clientforeignOperation ={
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
        _this_foreignActivator('selected',arrayIndex)        
      } 
      __this_foreignBoxsubOps.value=subOps
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
//--------------------
let _fileAsPath =ref(0)//_file in Show_Mode (As_String)  
let _fileAsPathIndex =ref(null)//_fileAsPath_Array_index
let _fileAsPathSlide=ref(false)

//--------------------
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