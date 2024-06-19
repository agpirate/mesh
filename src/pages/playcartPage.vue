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


  <!-- Dialog Windows and ... -->
  <dialogOne :isOpen="status_dialogBuyer" @emitClick0="status_dialogBuyer = $event">

    <template v-if="status_dialogBuyer == 'fromcart'">
              <div class="boxastyle" style="padding:3%;min-width:30vw;">
                <div >
                  <div class="fontestyle"> Editing on cart Item</div>
                  <div class="fontdstyle"> Order ID : {{ _this_clientforeign.orderID }}</div>
                </div>

                <div> Quantity
                  <buyButton style="" :quantity="_this_clientforeign['quantity']" :price="_is_this_netPrice" 
                                                @decreaseButton="_this_clientforeign['quantity'] = parseFloat(_this_clientforeign['quantity'] ?? 1) -1" 
                                                @increaseButton="_this_clientforeign['quantity'] = parseFloat(_this_clientforeign['quantity'] ?? 1) +1" 
                                                 >

                      </buyButton>
                </div>

                 <div>

                 </div>
              </div>
              <div class="row q-pa-sm fontestyle">
                <q-btn rounded class="col-grow bg-orange text-white fontestyle"  @click="_this_foreignOperation._newbuyer_foreign('buy',false)">Buy Now</q-btn>
                <!-- <q-btn rounded class="col-grow bg-green text-white"   @click="_this_foreignOperation._newbuyer_foreign('cart')">ADD to Cart</q-btn> -->
                                          
              </div>
    </template>

    <template v-else >
              <div class="boxastyle" style="padding:3%;min-width:30vw;"  :set="_this_clientforeign = _thisDefault_client">
                <div class="row justify-between items-center q-my-md">
                  <div class="fontestyle">Setting New Order </div>
                  <div class="fontbstyle"> OrderID : {{ _this_clientforeign.orderID }}</div>
                </div>

                <div> Quantity
                  <buyButton style="" :quantity="_this_clientforeign['quantity']" :price="_is_this_netPrice" 
                                                @decreaseButton="_this_clientforeign['quantity'] = parseFloat(_this_clientforeign['quantity'] ?? 1) -1" 
                                                @increaseButton="_this_clientforeign['quantity'] = parseFloat(_this_clientforeign['quantity'] ?? 1) +1" 
                                                 >

                      </buyButton>
                </div>

                 <div>

                 </div>
              <div class="boxbstyle q-my-md"> </div>

              </div>

              <div class="row q-pa-sm fontestyle">
                <q-btn rounded class="col-grow bg-orange text-white fontestyle"  @click="_this_foreignOperation._newbuyer_foreign('buy',false)">Buy Now</q-btn>
                <!-- <q-btn rounded class="col-grow bg-green text-white"   @click="_this_foreignOperation._newbuyer_foreign('cart')">ADD to Cart</q-btn> -->
                                          
              </div>
    </template>


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


<!-- <template v-if="DoneMessag">
      <debugCard :title="DoneMessag.title" :content="DoneMessag.content" :color="DoneMessag.color"></debugCard>
    </template>
    <template v-if="WarnthisMessage">
      <debugCard :title="WarnthisMessage.title" :content="WarnthisMessage.content" :color="WarnthisMessage.color"></debugCard>
    </template> -->


<!-- <div v-if="__this_foreignBoxsubOps =='buy'" class="flex flex-center column items-end" style="position: fixed;top:0%;left:0%;z-index:3;
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
                                                  <q-btn flat no-caps class="col-grow fontestyle bg-grey" label="Buy" @click="_this_clientforeignOperation._create_foreign()" />    
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
</div> -->


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
                               <!-- For enabling common reactivity -->
                               <!-- <q-table  
                               style="height:0px;width: 0px;visibility: hidden;"
                               flat bordered
                              :rows="_this_clientRows"
                              :columns="columns"
                                      ></q-table>  {{  _this_clientRows.length }} -->
                                   
                              <!------------------------------ ioio ----->
                              <div class="col q-pa-none column " v-if="_this_clientRows && (_this_clientRows.length ?? false)"    >
                                    <q-table 
                                      
                                    flat bordered
                                      
                                      :rows="_this_clientRows"
                                      :columns="_this_clientColumns"

                                      :visible-columns="visible_clientColumns"

                                      virtual-scroll

                                      :filterMethod="_thisFiltering"
                                      :filter="filter"

                                      row-key="id" 
                                      rowIndex="true"
                                      

                                      :inFullscreen="true"
                                      class="col-auto q-gutter-xs row q-pa-none justify-end" style="background-color:whitesmoke;backdrop-filter: blur(250px);"
                                    
                                      hide-pagination
                                      :pagination="pagination"

                                    

                                      hide-top
                                      hide-bottom
                                      >

                                      <template #header-cell="props">
                                        <q-td
                                          :props="props" style="background-color: orange;backdrop-filter: blur(250px);" 
                                          >
                                           {{ props.col.name }}
                                        </q-td>
                                      </template>
                          
                                      <template v-slot:body="props">

                                          <q-tr :props="props" class="q-gutter-sm  col-shrink q-pa-none  fontestyle"    
                                                :class="(props.rowIndex == __this_foreignBoxIndex) ? 'bg-white text-white':''"   >
                                          
                                            <td
                                          :props="props"
                                          style="font-size: 0.6em; text-align: justify"
                                          class="text-bold text-start fontestyle"
                                          :class="
                                            object.name == 'name'
                                              ? 'text-start'
                                              : 'text-start '
                                          "
                                          v-for="object in props.cols"
                                          :key="object.name"
                                        >
                                        
                                         <!--Styling Tabs-->
                                         <div v-if="object.name == 'served'" class="fontestyle">    
                                                      <div :style="props.row[object.name] == 'Requested' ? 'color:green':'color:grey'">
                                                        {{ props.row[object.name] }}

                                                      </div>
                                                      
                                                </div>
                                          <!---------------Store columns-->
                                              <div v-else-if="object.name == 'store'">    
                                                    <q-badge color="orange" v-if="props.row[object.name] == 'buy'"> Ordered</q-badge>
                                                    <q-badge color="teal" v-else>Carted</q-badge>
                                            
                                              </div>

                                          <!---------------Descriptions columns-->
                                          <div v-else-if="object.name == 'description'">    
                                                      <q-btn :dense="true" rounded class="fontbstyle"  no-caps color="blue" label="Show Detail" icon="more"  @click="_this_clientDetailActivator(props.row['saleitID'],props.rowIndex)"  />
                                                      <q-card v-if="__this_foreignBoxIndex == props.row.id" class="fixed-bottom z-top fontastyle flex flex-center"  style="max-width:30vh;left:1rem;bottom:1rem" > {{ props.row.description }} </q-card>
                                              </div>

                                        <!---------------time _this_clientColumns-->

                                                <div v-else-if="object.name == 'time'" class="fontastyle text-grey">    
                                                       <div v-if="typeof props.row.fupdatedAt == 'object'" class="fontcstyle row q-gutter-xs"> 
                                                          <div  v-if="props.row.fupdatedAt?.days ?? ''" > {{props.row.fupdatedAt.days}} D :</div> 
                                                          <div v-if="props.row.fupdatedAt?.hours ?? ''" > {{props.row.fupdatedAt.hours}} H :</div> 
                                                          <div v-if="props.row.fupdatedAt?.minutes ?? ''" > {{props.row.fupdatedAt.minutes}} M </div>
                                                          <div v-if="props.row.fupdatedAt?.minutes ?? ''">ago</div>
                                                          <div v-else>Just Now</div>
                                                          
                                                      </div>
                                                       <div v-else> {{props.row.fupdatedAt}} </div>
                                                </div>
                                                <div v-else-if="object.name == 'action'" class="q-gutter-xs">      
                                                  <template v-if="(__this_foreignBoxIndex == props.rowIndex) && (__this_foreignBoxsubOps == 'edit')">
                                                          <div class="q-gutter-xs row">
                                                            <div class="column q-gutter-xs">
                                                              <q-btn  size="sm" color='orange' :dense="true" icon="close"  @click="__this_foreignBoxIndex = null" label="close" > </q-btn>                                                             
                                                              <q-btn color="red" size="xs" :dense="true" icon="delete" @click="_this_foreignOperation._remove(props.rowIndex)" label="delete"  />                                    
                                                            </div>
                                                        
                                                          </div>
                                                  </template>
                                                  <template v-else>
                                                      <q-btn size="sm" :dense="true" color="orange"  icon="edit"  @click="_this_foreignOperation._select_foreignIndex(props.row.saleitID,props.rowIndex,'edit')" > </q-btn>
                                                  </template>
                                                       
                                                </div>
                                            <!---------------Others _this_clientColumns-->

                                          <!---------------Others columns-->

                                              <div v-else class="fontdstyle ">
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

      <div class="col-grow boxastyle q-pa-xs" v-if="_this_Details && _this_Details.length">

            <div class="col boxastyle" style=""> 
             
                    <q-item class="items-start">
                        <q-item-section top avatar>
                          <q-avatar color="primary" text-color="white" icon="phone" />
                        </q-item-section>

                        <q-item-section>
                          <q-item-label>{{(_this_Details[0].fphone)}}****</q-item-label>
                          <q-item-label caption v-if="typeof _this_Details[0].fupdatedAt == 'object'" class="text-grey row q-gutter-xs"> 
                            <div> Last Updated :</div>
                                                          <div  v-if="_this_Details[0].fupdatedAt?.days ?? ''" > {{_this_Details[0].fupdatedAt.days}} D,</div> 
                                                          <div v-if="_this_Details[0].fupdatedAt?.hours ?? ''" > {{_this_Details[0].fupdatedAt.hours}} H,</div> 
                                                          <div v-if="_this_Details[0].fupdatedAt?.minutes ?? ''" > {{_this_Details[0].fupdatedAt.minutes}} M</div>
                                                          <div>ago</div>
                                                      </q-item-label>
                                <q-item-label class="text-grey row q-gutter-xs" caption v-else> {{_this_Details[0].fupdatedAt}} </q-item-label>
                                    

                        </q-item-section>

                        <q-item-section side top>
                          <q-item-label caption>
                                        
                          </q-item-label>
                                            <q-badge class="q-pa-sm text-bold" v-if="_this_Details[0].discount ?? false" color="pink">
                                                              
                                                              HH Price : <q-item-label class="text-strike text-orange">{{ _this_Details[0].price  }}</q-item-label>{{  _this_Details[0].discount }} {{  currency }}
                                                                                                                  
                                                          </q-badge>  
                                                          <q-badge class="q-pa-sm fontestyle" color="orange" v-else>                                               
                                                          
                                                              {{  _this_Details[0].price }} {{  currency }} (Price)
                                              </q-badge>  
                                              <div class="text-orange"> 
                                                              <q-rating v-model="_this_Details[0]._itServiceRating" :max="5" size="xs"/>                                                       
                                              </div>                                                     
                        </q-item-section>
                    </q-item>
                  </div>

         <div> 
                                        <q-img                                  
                                                    loading="lazy"
                                                    :src=" _fileAsPathIndex ? _this_Details[0].saleitgr[_fileAsPathIndex] : _this_Details[0].saleitgr[0]"
                                                    spinner-color="orange"
                                                    class="column  rounded-borders fit shadow-1" style="max-width:100%;border-radius:5px;aspect-ratio: 2/1;"                                            
                                                    >
                                          
                                              <q-list class="column col fit fontbstyle q-px-none" :class="_this_Details[0].phone ? 'transparent': 'transparent'">
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
                                                                <q-item-label>D_QueryW {{ _this_Details[0].queryWeight}} </q-item-label>
                                                                <q-item-label>Prof_W {{ Objprops._profile.queryWeight}} </q-item-label>
                                                                <q-item-label> Revenu:- {{ _this_Details[0]['tPrice'] }}</q-item-label>
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
                                                                {{ _this_Details[0].header }}  
                                                              </div>
                                                            </div>
                                                            
                                                          </div>                                                      

                                                      </q-item-section>
                                                    
                                                      <q-item-section class="row col-auto q-px-none text-sm saleitContentOps-Glass">
                                                      
                                                            <div > 
                                                              Revenue: {{  _this_Details[0].tPrice  }}   
                                                              <q-item v-if="typeof _this_Details[0].timer ?? false ">                                                         

                                                                <q-item-section>                                                            
                                                                </q-item-section>
                                                              </q-item>
                                                            </div> 
                                                            
                                                            <q-separator inset />
                                                            <div v-if="_this_Details[0].clients ?? false">Buyers : {{ _this_Details[0].tClient}}</div>
                                                            <q-separator inset />
                                                            <div v-if="_this_Details[0].clients ?? false">Quantity : {{ _this_Details[0].quantity}}</div>                                                   
                                                        
                                                      </q-item-section>
                                                  </div>
                                                </q-item>
                                              </q-list>
                                        </q-img>

                </div>

                <div class="row q-gutter-sm"> 

                  <q-item class="col column q-gutter-sm" >
                    <div class="col row no-padding no-margine q-gutter-xs " style="border:0px solid orange;">

                    <q-btn outline v-for="item,fileIndx in _this_Details[0].saleitgr" @click="_fileAsPathOpsCall(fileIndx,)" :key="fileIndx" 
                    class="col-1 column  transparent q-pa-none no-border " style="max-width:6dvw">   
                          <img :src="item" class="col fit shadow-2 transparent rounded-borders q-pa-none" style="aspect-ratio: 2/1;width:100%;" >
            
                    </q-btn>                                              

                    </div>

                      <div class="col-auto column q-gutter-sm">
                          <q-item-section style="color:blue"> Item  Details
                        </q-item-section>   

                        <q-item-section class="boxbstyle rounded-borders shadow-1">   
                          <q-item-label >{{  _this_Details[0]['header'] }}</q-item-label>
                          <q-item-label caption>{{  _this_Details[0]['description'] }} </q-item-label>
                        </q-item-section>
                        <div class="q-gutter-xs row">
                        <q-item-section class="boxbstyle rounded-borders shadow-1">   
                          <q-item-label >Available Quantities</q-item-label>
                          <q-item-label class="text-grey"> {{  _this_Details[0]['quantity'] }} </q-item-label>
                        </q-item-section>

                        <q-item-section class="boxbstyle rounded-borders shadow-1">   
                          <q-item-label >Total Buyers</q-item-label>    {{  __this_foreignBoxsubOps ?? false}} {{  __this_foreignBoxIndex ?? false }}
                          <q-item-label class="text-grey"> {{  _this_Details[0]['tClient'] }} </q-item-label>
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
                              <q-item-label caption v-if="_this_clientforeign['served'] == 'Requested'">{{  _this_clientforeign['served'] }}</q-item-label>
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

          <div class="flex flex-center q-gutter-sm q-pa-sm" v-if="_is_this_open"> 

            <q-btn icon="edit" color="green" rounded  @click="status_dialogBuyer = 'fromcart'" :dense="true" v-if="_this_clientforeign.store == 'cart'">
              <q-tooltip> Edit On Cart Items !</q-tooltip>
            </q-btn>

              <template v-if="__this_foreignBoxsubOps == 'view' " >
                
                <q-btn icon="add" color="green" rounded :dense="true"  @click="status_dialogBuyer = 'buy'" style="background-size:5px;">
                  New Order
                </q-btn>
                
              </template>
          
          </div>

      </div>
      <div class="col flex flex-center fontbstyle" v-else>
        {{ _this_Details}}
                  <div v-if="__thisOpsStatus" > 
                    <q-spinner color="primary" size="3em" :thickness="2"  />
                    <div style="font-weight:lighter;font-size:12px"> Loading </div>
                  </div>
                  <div v-else style="font-size:43px;font-weight:bolder;color:red;"> Product doesn't founded. </div>
      </div>  
      <!----------------------LiveDATA Banner-->
{{ _this_clientforeign}}  =={{ _this}}
      <!------------Zooming Level Adjuster Sticky-------------------------->
</q-page>

    </template>
    
 
<script setup>
//_____________________________________________Modules Definitions
//-------------------------------------------------------------Importing System Modules
import { ref,reactive,computed,watch,onUnmounted, onMounted,defineComponent } from "vue";
import {useQuasar, useMeta } from "quasar";
//import print from 'print-js';
import { useRouter } from "vue-router";
//import { storeToRefs } from "pinia";
import { saleitStore } from "stores/dataStores/saleitStore"; //saleit Store ( Main Store)
import { saleclientStore } from "stores/dataStores/saleclientStore"; //saleit Store ( Main Store)
// import { salechatStore } from "stores/dataStores/salechatStore"; //saleit Store ( Main Store)
import { thisStore } from "stores/dataStores/thisStore"; //saleit Store ( Main Store)
import { genapiStore } from "src/stores/jstStores/genapiStore";

import { saleitSchema } from "src/composables/schemas/saleitSchemas";
import { saleitClientSchema } from "src/composables/schemas/saleitSchemas";
// import { saleitSchema } from "src/composables/schemas/saleitSchemas";
import { _permission } from "src/composables/schemas/profileSchemas"; //acctype//userRole Schema

import statusCard from "src/components/statusCards.vue"

import buyButton from "src/components/buttons/buyButton.vue"
import closeButton from "src/components/buttons/closeButton.vue"

import confirmButton from "src/components/buttons/confirmButton.vue"
let confirmObj = ref(null);
let confirmMessage =ref('Are You Sure ?')

import dialogOne from "src/components/dialogs/dialogOne.vue"
const status_dialogBuyer = ref(null);
const status_dialogEditBuyer = ref(null);
// const status_dialogBuyer = ref(null);

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
  //Columns to be Redefined
let _thisSchema=saleitSchema
_this_Schema.value = saleitSchema
let _this_clientSchema=saleitClientSchema
_this_clientSchema['time']={default:''}
_this_clientSchema['action']={default:''}
//----------models
let _thisModels = []
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
    let _col = columns.value ?? ''
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
  try{
     _val = !val || 'filled required ?'
  }catch{  }

  return _val
}

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
let _this_clientRows = ref([]); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
let _thisDefault_client=ref({})
let _this_clientforeign = ref({}); //the selected row_actual_Data..as object
//===============================================-----------------------------------------

//-------
let _is_thisOwner=ref(false)
let _is_clientOwner=ref(false)
//--------------------CONTENTING (CREATING  && EDITING....) ====STARTS
  let _is_this_open =ref()
  let _is_this_netPrice =ref()

//--------------------------------ROWS_SCHEMATIC FORMS 
let _n =0
const pageSize = 50
//const lastPage = Math.ceil(allRows.length / pageSize)
let pagination= ref({ rowsPerPage: 200 })
//-------------SyncDEBUGGER========1

//----------------------------------
let syncInt=''
let synccliInt=''
//------------------Quering and SE_settings
//--------------clientQuery
//Init_set default query and setInterval of 1000(1sec)  

_this_Query.value={} //_trend:'', catagory:'',usage:'New',content:''

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
// 

//===============================QUERY_BUILDIMG+++START
//==============Q1

//==============Q1
async function _this_clientQuery (){
  //-------------------- Reseting Rows
  __this_foreignBoxIndex.value=null
  __this_foreignBoxOpsStatus.value=true
  // _clientQuery.value={}
//---------Query Building
//Content Owner is on client_link(show all)
// if(!_is_thisOwner.value){ 
//             _clientQuery.value['userID']=Objprops._profile.id
//           }
_clientQuery.value['userID']=Objprops._profile.id

// _clientQuery.value['saleitID']=_this.value['id'] ?? ''
// _clientQuery.value['store']='buy'
//-------------------- Fetching Queried Rows
_this_clientSync()
//-------------------- Preparing Default Rows ( New Row Skeltons)
_this_clientforeign.value=Object.assign({},_thisDefault_client.value)
// _this_clientforeign.value['saleitID']=_this.value['id']  //----------- contentIDs
_this_clientforeign.value['orderID']=await _genOrderID()
return true
}

//==============Q3
//==============================================

///-------------- _this_chatRows --
clearInterval(syncInt);
clientService.set_syncLock(true)
saleitService.set_syncLock(true)
//_this_clientSync()
//-----------------------
// this_Query()
_this_clientQuery()

onUnmounted(async () => { 
  // Clear the interval when the component is destroyed to avoid memory leaks
  clearInterval(syncInt);
  clientService.set_syncLock(true)
  saleitService.set_syncLock(true)
  return true
});

//-----searaching on/off
//------------Setting up all the search attributes
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
async function _this_clientActivator(_thisindex=null,_foreignIndex=null){
        let _existed_this =(__thisIndex.value == _thisindex) 
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
async function _this_clientDetailActivator(_thisID=null,_foreignIndex=null){
            __this_foreignBoxsubOps.value ='view'
          __this_foreignBoxIndex.value = (__this_foreignBoxIndex.value == _foreignIndex) ? null : _foreignIndex
          if(!__this_foreignBoxIndex.value){return true}

          // status_thisDetail.value=true
          _this_Details.value=null
          await saleitService.readFData({'id':_thisID}).then((res)=>{if(res)_this_Details.value=res})
          _this_Rows.value =_this_Details.value
          // let _existed_this =(__thisIndex.value == _thisindex) 
          //------==if Selected is Existed...Close it.
          await Reset_this('clients',0)

          // saleitService.set_syncLock(true)
          
          //----== passing New Selections
          _is_clientOwner.value= _this.value['userID'] == Objprops._profile.id
          _is_this_open.value= _this.value['quantity'] && _this.value['price']
          _is_this_netPrice.value = parseInt(_this.value['discount'] ? _this.value['discount'] : _this.value['price'])

          //------foreign Operations
          //----------------------------
          //  _this_clientQuery()
          await Reset_this_foreign('clients',__this_foreignBoxIndex.value)
          return true 
  } 

  __this_foreignBoxOps.value='clients'
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
  _select_foreignIndex:async(_thisID,_foreignIndex=null,foreignSuboperation=null)=>{ // activate give array for operations of below options --
    __this_foreignBoxsubOps.value =foreignSuboperation;
    __this_foreignBoxIndex.value = (__this_foreignBoxIndex.value == _foreignIndex) ? null : _foreignIndex
    if(!__this_foreignBoxIndex.value){return true}
    //  if(foreignSuboperation){ __this_foreignBoxsubOps.value =foreignSuboperation;return true}

    //----------------------------------   Update Row VAlues

          // status_thisDetail.value=true
          _this_Details.value=null
          await saleitService.readFData({'id':_thisID}).then((res)=>{if(res)_this_Details.value=res})
          _this_Rows.value =_this_Details.value
          // let _existed_this =(__thisIndex.value == _thisindex) 
          //------==if Selected is Existed...Close it.
          await Reset_this('clients',0)

          // saleitService.set_syncLock(true)
          //----== passing New Selections
          _is_clientOwner.value= _this.value['userID'] == Objprops._profile.id
          _is_this_open.value= _this.value['quantity'] && _this.value['price']
          _is_this_netPrice.value = parseInt(_this.value['discount'] ? _this.value['discount'] : _this.value['price'])

          //------foreign Operations

    //--------------------------------
      //default _client
      await Reset_this_foreign('clients',__this_foreignBoxIndex.value)
      
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
async function Reset_this(Ops,rowIndex){
    _fileAttributeName.value=null;
    _fileAsPathIndex.value=null
    
    __thisBox.value  = false; //OPen the Box
     _this.value = Object.assign({},rowIndex == null ? 
            _thisDefault.value : 
            (_this_Rows.value[rowIndex] ?? _thisDefault.value ) 
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
        }
    }else{ //Reseting Default Foreign_Rows (null Index)
        __this_foreignBox.value= true //disasble sideBox
        __this_foreignBoxOpsStatus.value=false //turnofff active stauts
        __this_foreignBoxIndex.value =null

        __this_foreignBoxOps.value=foreignOps //diable andy operations
        if(foreignOps =='clients'){
            _this_clientforeign.value = _thisDefault_client.value
            _this_clientforeign.value['saleitID']=_this.value?.['id'] ?? ''
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
  
  
  /*=====================  Fronted_Glass / Blur Styles as OverLay Background... */
  @keyframes myfirst /* Firefox */{
             50% {
                     opacity: 50;
                 }
  }
  </style>