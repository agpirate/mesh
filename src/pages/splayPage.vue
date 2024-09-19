<template>
  <!----Detail View-->
  <!-- Dialog Windows and ... -->
  <template v-if="__thisOps == 'details' && __thisOpsStatus == 'selected'">
    <dialogOne :isOpen="__thisOpsStatus" @emitClick0="__thisOpsStatus = $event">
      <div v-if="_this" class="row q-pa-sm">
        <div class="col-grow cardPopDetails" style="">
          <div class="row no-wrap q-gutter-sm">
            <q-img
              loading="lazy "
              style="min-height: 20vh; aspect-ratio: 2/1"
              :src="
                _fileAsPathIndex
                  ? _this.saleitgr[_fileAsPathIndex]
                  : _this.saleitgr[0]
              "
              class=""
            >
            </q-img>
          </div>

          <div class="horizontalLineBlack"></div>

          <div class="row q-gutter-sm">
            <q-btn
              outline
              v-for="(item, fileIndx) in _this.saleitgr"
              @click="_fileAsPathIndex = fileIndx"
              :key="fileIndx"
              class="col-auto column transparent q-pa-none no-border"
              style="max-width: 7dvw"
            >
              <img
                :src="item"
                class="col-auto shadow-2 transparent rounded-borders q-pa-none"
                style="aspect-ratio: 2/1; width: 100%"
              />
            </q-btn>
          </div>
          <div class="horizontalLineBlack"></div>

          <div class="col-auto cardPopDetails-title">
            {{ _this.header }}
          </div>

          <div style="">
            <p class="col cardPopDetails-content bg-white">
              {{ _this.content }}
            </p>
          </div>

          <div class="row">
            <div>
              <div class="cardPopDetails-meta">
                <div class="fontdstyle">{{ _this.userName }}</div>

                <div>
                  Call Us:
                  <b v-if="_this.phoneCode ?? false"
                    >+{{ _this.phoneCode[1] }} {{ _this.phone }}
                  </b>
                  <b v-else> {{ _this.phone }} </b>
                </div>
                <div class="textStylea">
                  {{ _this.location.country + "/" }}
                  {{ _this.location.provinance + "/" }}
                  {{ _this.location.city + " /" }}
                  {{ _this.location.street + " /" }}
                </div>
                <div>
                  Created : {{ new Date(_this.createdAt).toLocaleString() }}
                </div>
              </div>

              <div
                style="
                  height: 1px;
                  width: 100%;
                  background-color: white;
                  padding: 2px;
                  margin: 2px;
                "
              ></div>

              <div class="row cardPopDetails-items">
                <!-- <div class="">
                <div>Price:</div>
                <div class=" bg-orange">{{ _this.price }}</div>
              </div> -->
                <div class="fontastyle">
                  <h2>Quantity (Store)</h2>
                  <div
                    class="boxbstyle row justify-center"
                    style="border-radius: 7%"
                  >
                    {{ _this.quantity }}
                  </div>
                </div>
                <div class="fontastyle">
                  <h2>Total Buyers</h2>
                  <div
                    class="boxbstyle row justify-center"
                    style="border-radius: 7%"
                  >
                    {{ _this.tClient }}
                  </div>
                </div>
              </div>

              <div class="cardPopDetails-items">
                <div class="fontcstyle">
                  <p>Likes</p>
                  <div class="boxbstyle">{{ _this.likes.like }}</div>
                </div>
                <div class="verticalLineBlack"></div>
                <div class="fontcstyle">
                  <p>Rating</p>
                  <div class="boxbstyle">{{ _this._itServiceRating }}</div>
                </div>
                <div class="verticalLine"></div>
                <div class="fontcstyle">
                  <p>trendScore</p>
                  <div class="boxbstyle">{{ _this.trendScore ?? 0 }}</div>
                </div>
              </div>
            </div>

            <div class="col boxbstyle column justify-center items-center">
              <h2>{{ _this.price }} {{ _pageSettings["currency"] }}</h2>
              <div>Unit Price</div>
              <q-tooltip class="bg-orange fontbstyle"> Unite Price</q-tooltip>
            </div>
          </div>
        </div>

        <div class="row justify-evenly q-gutter-sm q-py-sm fontcstyle">
          <q-btn
            v-if="_this.isOpen"
            color="orange"
            class="col"
            label=""
            @click="_this_foreignOperation._directBuyer('buy')"
            icon="shops"
          >
            <p>Direct Buy (Qty = 1)</p>
          </q-btn>
          <q-btn
            color="green"
            @click="_this_foreignOperation._directBuyer('cart')"
            icon="save"
          >
            <p>Add to cart</p>
          </q-btn>
        </div>
      </div>

      <div v-else class="fontestyle text-white">Loading ...</div>
    </dialogOne>
  </template>
  <templat v-if="__thisOpsStatus == 'loading'">
    <dialogOne :isOpen="__thisOpsStatus">
      <q-spinner color="primary" size="3em" :thickness="2" />
      <div style="font-weight: lighter; font-size: 12px">Loading</div>
    </dialogOne>
  </templat>

  <template
    v-if="__this_foreignBoxOps == 'clients' && __thisOpsStatus == 'selected'"
  >
    <dialogOne
      :isOpen="__this_foreignBoxOps"
      @emitClick0="__this_foreignBoxOps = false"
    >
      <div class="col column">
        <q-list class="column" style="width: 100%; height: 75svh">
          <div v-if="!_this.isOpen">
            <div v-if="!_this.netPrice" class="q-pa-sm text-red">
              Sorry, Price isn't fixed yet!
            </div>
            <div v-else class="q-pa-sm">Product is sold out!</div>
          </div>

          <div v-else class="q-px-sm">
            <q-card
              class="items-center q-pa-sm"
              style="background-color: whitesmoke"
            >
              <div
                v-if="_this_modelOneforeign['orderID'] ?? false"
                class="q-gutter-sm"
              >
                <!--q-item-label class="absolute-right q-px-sm fontastyle">Step - 1</q-item-label-->

                <div class="col row q-gutter-sm q-pa-none fit">
                  <div class="col column q-gutter-xs fontdstyle">
                    <div>Quantity</div>
                    <div class="row">
                      <q-btn
                        icon="remove"
                        size="sm"
                        @click="
                          _this_modelOneforeign['quantity'] =
                            parseFloat(_this_modelOneforeign['quantity']) > 1
                              ? parseFloat(_this_modelOneforeign['quantity']) -
                                1
                              : 1
                        "
                      />
                      <q-btn
                        color="orange"
                        size="md"
                        class="q-mx-xs"
                        :label="_this_modelOneforeign['quantity']"
                      />
                      <q-btn
                        size="sm"
                        icon="add"
                        @click="
                          _this_modelOneforeign['quantity'] =
                            parseFloat(_this_modelOneforeign['quantity'] ?? 1) +
                            1
                        "
                      />
                    </div>
                  </div>

                  <div
                    class="col column flex flex-center justify-center fontdstyle"
                  >
                    Total Prices
                    <q-btn
                      flat
                      class="fontestyle"
                      :label="
                        _this_modelOneforeign['quantity'] * _this.netPrice
                      "
                    />
                  </div>
                </div>

                <div class="q-gutter-sm row justify-end fontestyle">
                  <q-btn
                    rounded
                    color="orange"
                    no-caps
                    glossy
                    unelevated
                    @click="_this_foreignOperation._directBuyer('buy')"
                    :disable="__this_foreignBoxIndex == null ? false : true"
                    label="Order Now"
                    :dense="true"
                  />
                  <q-btn
                    rounded
                    color="green"
                    no-caps
                    glossy
                    unelevated
                    @click="_this_foreignOperation._directBuyer('cart')"
                    label="Add to Cart"
                    :dense="true"
                  />
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
          <div
            class="col column fit fontastyle"
            v-if="_this_modelOneRows ?? false"
          >
            <q-item class="col-auto q-pa-xs">
              <q-badge outline color="orange" class="fontastyle q-pa-xs"
                >You Have {{ _this_modelOneRows.length }} :
                {{ _orderDebuger }}</q-badge
              >
            </q-item>

            <div class="col scroll-area" style="overflow-y: auto">
              <q-item
                v-for="(item, index) in _this_modelOneRows"
                :key="index"
                class="col column"
              >
                <q-item-section>
                  <div class="row justify-between items-end q-gutter-sm">
                    <div class="q-py-sm" v-if="item?.['served'] ?? false">
                      <!-- <div
v-if="
  item['served'] == 'Requested' ?? false
"
class="row"
>
<div
  class="col-auto bg-orange q-px-xs"
  style="border-radius: 5%"
>
  Just Ordered
</div>
</div> -->

                      <q-item-label style="" class="fontastyle">
                        <q-avatar
                          v-if="item['served'] == 'Requested'"
                          size="14px"
                          color="red"
                        >
                          <template v-if="_is_modelOneOwner">
                            <q-icon name="phone" />
                          </template>
                        </q-avatar>
                        <q-avatar
                          v-else-if="item['served'] == 'Queed'"
                          size="14px"
                          color="orange"
                        >
                          <template v-if="_is_modelOneOwner">
                            <q-icon name="phone" />
                          </template>
                        </q-avatar>
                        <q-avatar v-else size="14px" color="green">
                          <template v-if="_is_modelOneOwner">
                            <q-icon name="phone" />
                          </template>
                        </q-avatar>

                        <!-- <template v-else>
  {{ item.fphone }}
</template> -->
                        <template v-if="_is_modelOneOwner">
                          + {{ item.phoneCode[1] }} {{ item.phone }}
                        </template>
                        <template v-else
                          >OID : <b class="fontastyle"> {{ item.orderID }} </b>
                        </template>
                        <q-tooltip class="font0astyle bg-black">
                          Serve Status : {{ item.served }}
                        </q-tooltip>
                      </q-item-label>
                    </div>
                    <!---- is current loged user/client  is Owner)-->
                    <div>
                      <template v-if="__this_foreignBoxIndex == index">
                        <q-btn
                          rounded
                          flat
                          size="sm"
                          color="red"
                          icon="close"
                          label="close"
                          @click="__this_foreignBoxIndex = null"
                        />
                        <q-btn
                          round
                          flat
                          size="sm"
                          :dense="true"
                          icon="done"
                          @click="_this_foreignOperation._update_foreign(false)"
                          v-if="_is_modelOneOwner"
                        />
                        <q-btn
                          rounded
                          flat
                          size="sm"
                          icon="delete"
                          @click="
                            _this_foreignOperation._remove(index, _this.id)
                          "
                        />
                      </template>
                      <template v-else>
                        <q-btn
                          rounded
                          flat
                          size="sm"
                          color="orange"
                          icon="edit"
                          label="edit"
                          @click="
                            _this_foreignOperation.selectedIndex_(
                              index,
                              'edit',
                              'clients'
                            )
                          "
                          v-if="__this_foreignBoxIndex != index"
                        >
                        </q-btn>
                      </template>
                    </div>
                  </div>

                  <div
                    class="justify-between row q-gutter-sm q-pa-xs"
                    v-if="__this_foreignBoxIndex == index && _is_modelOneOwner"
                  >
                    <div style="" class="col column">
                      <div>Short Notice ?</div>
                      <q-input
                        autogrow
                        outlined
                        class="col-grow fontastyle fit-height"
                        :shadow-text="textareaShadowText"
                        @keydown="processTextareaFill"
                        @focus="processTextareaFill"
                        v-model="_this_modelOneforeign['description']"
                        stack-label
                        :dense="true"
                      />
                    </div>

                    <div style="" class="col fontastyle">
                      <div>Change Status ?</div>
                      <q-select
                        :dense="true"
                        outlined
                        v-model="_this_modelOneforeign['served']"
                        :options="['Requested', 'Queed', 'Served']"
                        stack-label
                        class="col-grow fontastyle fit-height"
                      />
                    </div>
                  </div>

                  <div class="justify-between row q-gutter-sm" v-else>
                    <div
                      class="col column rounded-borders bg-grey-3 q-pa-xs"
                      v-for="k in ['quantity', 'price']"
                      :key="k"
                    >
                      {{ k }}
                      <q-item-label class="fontastyle">
                        {{ item[k] }}
                      </q-item-label>
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

                    <div class="fontcstyle">
                      <div
                        v-if="typeof item.fupdatedAt == 'object'"
                        class="fontastyle row q-gutter-xs q-mx-sm text-red"
                      >
                        <div v-if="item.fupdatedAt.days">
                          {{ item.fupdatedAt.days }} Days ago
                        </div>
                        <div v-else-if="item.fupdatedAt.hours">
                          {{ item.fupdatedAt.hours }} Hours ago
                        </div>
                        <div v-else-if="item.fupdatedAt.minutes">
                          {{ item.fupdatedAt.minutes }} Minutes ago
                        </div>
                        <div v-else>Just Now</div>
                      </div>
                      <div
                        v-else
                        class="fontastyle row q-gutter-xs q-py-xs text-orange"
                      >
                        {{ item.fupdatedAt }}
                      </div>
                    </div>
                  </div>
                </q-item-section>
              </q-item>
            </div>
          </div>

          <div class="col flex flex-center" v-else>
            <q-spinner
              color="blue"
              size="5em"
              :thickness="5"
              v-if="_this_modelOneRows == null"
            />
            <div v-else>Your Cart is Empty!</div>
          </div>
        </q-list>
      </div>
    </dialogOne>
  </template>

  <!-----DEbug ( Action ) Informations-->
  <template v-if="DoneMessage.length ?? false">
    <debugCard :messages="DoneMessage ?? []" @closeButton="DoneMessage = []" />
  </template>
  <template v-if="WarnthisMessage.length ?? false">
    <debugCard
      :messages="WarnthisMessage ?? [{}]"
      @closeButton="WarnthisMessage = []"
    />
  </template>

  <!-----Status ( Store/Loading ) Informations-->
  <!-- <template v-if="status_WarnthisMessage.length ?? false">
    <statusCard :messages="status_WarnthisMessage ?? [{}]" />
  </template> -->
  <template v-if="status_KnowthisMessage.length ?? false">
    <statusCard
      :messages="status_KnowthisMessage ?? [{}]"
      @closeButton="status_KnowthisMessage = []"
    />
  </template>
  <!-- <template v-if="status_DoneMessage.length ?? false">
    <statusCard :messages="status_DoneMessage ?? [{}]" />
  </template> -->
  <!-- <template v-if="status_Loading.length ?? false">
    <statusCard :messages="status_Loading ?? [{}]" />
  </template> -->
  <q-page v-if="Loadingevent.message ?? false">
    Seesion Error ! please wait to login.
  </q-page>

  <q-page class="column rounded-borders fontastyle" v-else>
    <!----------------                
                :filterMethod="_thisFiltering"
                :filter="filter"
                -------------- ioio ----->
    <div class="col q-pa-none column fit column" v-if="_this_Rows ?? false">
      <!-- <div   style="height: 20vh; min-width: 100vw; border: 0px">
      llllllll
      <q-btn> iiiiiiiii</q-btn>
      <q-btn> iiiiiiiii</q-btn>
      <q-btn> iiiiiiiii</q-btn>
     </div> -->
      <q-table
        v-if="_pageSettings['tableView'] == 'main'"
        :rows="_this_Rows"
        :columns="columns"
        :filterMethod="_thisFiltering"
        :filter="filter"
        :visible-columns="visibleColumns"
        virtual-scroll
        row-key="id"
        rowIndex="true"
        :inFullscreen="true"
        class="col-auto column transparent q-py-md"
        card-class="text-brown"
        color="white"
        hide-pagination
        hide-top
        hide-bottom
        style="min-width: 100vw; border: 0px; padding-top: 15vh"
        no-data-label="Data Error"
        :rows-per-page-options="[0]"
      >
        <template v-slot:header="props">
          <q-tr
            :props="props"
            class="col-auto column q-px-none q-gutter-xs"
            style="position: fixed; z-index: 99; height: 80px"
            :style="isScrolledUp ? 'top:0vh' : 'top:44px;padding-top:7px'"
          >
            <q-scroll-area
              class="col-grow column flex flex-center q-pa-none"
              style="
                width: 100vw;
                scrollbar-width: 30px;
                scrollbar-color: #888 #f1f1f1;
              "
            >
              <div
                class="col-grow row justify-between q-gutter-sm q-px-md no-wrap saleitMenu-Glass items-end"
                style="min-width: 100%; max-height: 100%"
              >
                <q-separator inset vertical class="q-py-sm" />

                <q-btn
                  size="sm"
                  no-caps
                  @click="this_Query(null, '', 16)"
                  class="col-auto fontdstyle"
                >
                  Show All
                </q-btn>

                <q-separator inset vertical class="q-py-sm" />
                <q-btn
                  rounded
                  no-caps
                  flat
                  :style="
                    ((_this_Query.qweight ?? false) &&
                      _this_Query.qweight[1]) == _qvalue0
                      ? 'background-color:grey;color:white'
                      : 'background-color:white;color:grey;'
                  "
                  size="xs"
                  v-for="(_qvalue0, _qgroup0) in saleCatagory"
                  @click="this_Query('catagory', _qgroup0, _qvalue0)"
                  :key="_qvalue0"
                  class="column col-auto q-my-xs"
                >
                  <div class="fontcstyle">{{ _qgroup0 }}</div>
                </q-btn>

                <q-separator inset vertical class="q-py-sm" />
              </div>
            </q-scroll-area>

            <q-scroll-area
              class="col-grow column transparent flex flex-center q-ma-xs"
              style="
                width: 100vw;
                scrollbar-width: 30px;
                scrollbar-color: #888 #f1f1f1;
                padding-left: 7px;
              "
            >
              <div class="row q-gutter-xs">
                <q-btn
                  :dense="true"
                  no-caps
                  :style="
                    ((_this_Query.qweight ?? false) &&
                      _this_Query.qweight[2]) == _qvalue1
                      ? 'background-color:orangered;color:white'
                      : 'background-color:white;color:orangered;'
                  "
                  size="sm"
                  v-for="(_qvalue1, _qgroup1) in saleUsage"
                  @click="this_Query('usage', _qgroup1, _qvalue1)"
                  :key="_qvalue1"
                  class="col-auto fontdstyle"
                  style="padding: 3px"
                >
                  {{ _qgroup1 }}
                </q-btn>

                <q-space />
              </div>
            </q-scroll-area>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <!--row Object [key(id=?)],row,_trClass,cols,sort,rowIndex,color,dark,dense,expand]-->
          <q-tr
            :props="props"
            class="column col-11 q-gutter-xs q-tr--no-hover fit fontbstyle"
            style="
              min-height: 50vh;
              border: 0px solid blue;
              padding: 0px;
              margin: 0px;
            "
            v-if="_this_Rows.length"
          >
            <!------------------ iterating _ body cell-->

            <!--   Content (if >sm)       --->
            <q-td
              class="column col-grow"
              style="overflow: hidden"
              v-if="props.row.saleitgr ?? false"
            >
              <div class="col row">
                <div style="width: 80vw" class="col column q-pa-none">
                  <q-img
                    loading="lazy"
                    :src="
                      __thisIndex == props.rowIndex && _fileAsPathIndex
                        ? props.row.saleitgr[_fileAsPathIndex]
                        : props.row.saleitgr[0]
                    "
                    spinner-color="orange"
                    class="column rounded-borders fit shadow-8"
                    style="
                      max-width: 100%;
                      border-radius: 12px;
                      aspect-ratio: 2/1;
                    "
                  >
                  </q-img>

                  <div
                    style="position: absolute; right: 3px; top: 20%"
                    class="column q-gutter-xs"
                  >
                    <!-- <q-btn :dense="true" @click="__thisIndex = props.rowIndex" icon="check" color="orange"> </q-btn> -->

                    <div
                      v-if="props.row.quantity && props.row.price"
                      class="text-orange fontbstyle"
                    >
                      <q-btn :dense="true" size="sm" color="green">
                        Open
                      </q-btn>
                    </div>
                    <div v-else class="text-red">
                      <q-item-label v-if="props.row.tClient ?? false">
                        <q-btn :dense="true" size="sm" color="red">
                          Sold
                        </q-btn>
                      </q-item-label>
                      <q-item-label v-else>
                        <q-btn :dense="true" size="sm" color="orange">
                          Closed
                        </q-btn>
                      </q-item-label>
                    </div>

                    <q-btn
                      size="sm"
                      :dense="true"
                      color="orange"
                      class="text-blue"
                      @click="_this_ActiveOperation._likes(props.rowIndex)"
                    >
                      <q-badge
                        class="bg-black text-black fontcstyle"
                        color="orange"
                        floating
                        v-if="props.row.likes ?? false"
                        >{{ props.row.likes.like }}</q-badge
                      >
                      <!--q-icon :name="matThumbUp" size="sm"/-->
                      <q-icon color="white" name="favorite" size="sm" />
                    </q-btn>

                    <q-btn
                      size="sm"
                      :dense="true"
                      color="orange"
                      icon="message"
                      @click="
                        _this_ActiveOperation.selectedRow_ForeignRows(
                          props.rowIndex,
                          'comments'
                        )
                      "
                    >
                      <!--q-tooltip :dense="true" class="bg-black text-white fontbstyle"  self="left middle">comments</q-tooltip-->
                    </q-btn>

                    <div
                      v-if="Objprops._profile.phone == props.row.phone"
                      class="column"
                    >
                      <q-btn
                        round
                        :dense="true"
                        flat
                        icon="edit"
                        @click="__thisBox_UDialog(props.rowIndex)"
                      >
                        <q-tooltip
                          class="bg-black text-white fontcstyle"
                          self="top middle"
                        >
                          edit
                        </q-tooltip>
                      </q-btn>

                      <q-btn
                        round
                        :dense="true"
                        flat
                        icon="delete"
                        @click="
                          _this_ActiveOperation._delRow(
                            null,
                            props.rowIndex,
                            props.key
                          )
                        "
                      >
                        <q-tooltip
                          class="bg-black text-white fontcstyle"
                          self="top middle"
                        >
                          delete
                        </q-tooltip>
                      </q-btn>
                    </div>

                    <div class="horizontalLine"></div>
                    <q-btn
                      :dense="true"
                      @click="
                        _this_ActiveOperation._detailView(
                          props.row.id,
                          props.rowIndex,
                          'details',
                          'hover'
                        )
                      "
                      icon="more"
                      color="orange"
                    >
                    </q-btn>
                  </div>

                  <div
                    v-if="props.rowIndex == __thisIndex"
                    class="col-grow floatTransparentBox"
                    style="height: 90%"
                  >
                    <q-list
                      class="column col fit fontbstyle q-pa-none"
                      :class="props.row.phone ? 'transparent' : 'transparent'"
                    >
                      <q-item
                        class="col row items-top q-px-none justify-between items-start"
                      >
                        <div class="col-auto q-pa-none fit-width q-gutter-xs">
                          <div
                            class="text-black"
                            @click="
                              this_Query('userID', props.row.userID ?? null)
                            "
                          >
                            <div class="row justify-between">
                              <div
                                class="items-end row q-mx-sm bg-white font0astyle text-black"
                              >
                                <q-icon name="phone" />{{ props.row.fphone }}
                              </div>
                            </div>
                            <div class="col row items-center">
                              <q-btn
                                flat
                                no-caps
                                :dense="true"
                                @click="
                                  _this_ActiveOperation._following(
                                    props.rowIndex
                                  )
                                "
                              >
                                <p>Follow</p></q-btn
                              >
                              |
                              <div
                                v-if="typeof props.row.fupdatedAt == 'object'"
                                class="col items-center row q-gutter-xs q-mx-sm"
                              >
                                <q-icon name="watch" />
                                <div
                                  class="col font0astyle items-end text-black"
                                >
                                  <div v-if="props.row.fupdatedAt.days">
                                    {{ props.row.fupdatedAt.days }} Days ago
                                  </div>
                                  <div v-else-if="props.row.fupdatedAt.hours">
                                    {{ props.row.fupdatedAt.hours }} Hours ago
                                  </div>
                                  <div v-else-if="props.row.fupdatedAt.minutes">
                                    {{ props.row.fupdatedAt.minutes }} Minutes
                                    ago
                                  </div>
                                  <div v-else>Just Now</div>
                                </div>
                                <div class="col-5"></div>
                              </div>
                              <div v-else class="font0astyle text-black">
                                {{ props.row.fupdatedAt }}
                              </div>
                            </div>
                          </div>

                          <div
                            class="col-auto row justify-start no-padding no-margine q-gutter-xs"
                            style="
                              border: 0px solid orange;
                              transform: rotateY(90);
                            "
                          >
                            <div
                              class="col-auto transparent row justify-end"
                              style="height: 70px; top: 0px; right: 0px"
                              v-if="props.row.saleitgr.length > 1"
                            >
                              <q-btn
                                flat
                                :dense="true"
                                color="red"
                                label="Back"
                                @click="
                                  _fileAsPathIndex =
                                    (_fileAsPathIndex -
                                      1 +
                                      props.row.saleitgr.length) %
                                    props.row.saleitgr.length
                                "
                                style="z-index: 99"
                              />

                              <q-btn
                                flat
                                size="sm"
                                :dense="true"
                                color="green"
                                icon="forward"
                                @click="
                                  _fileAsPathIndex =
                                    (_fileAsPathIndex + 1) %
                                    props.row.saleitgr.length
                                "
                                style="z-index: 99"
                              />
                            </div>

                            <!-- <q-btn
                              outline
                              v-for="(item, fileIndx) in props.row.saleitgr"
                              :key="fileIndx"
                              @mouseover="
                                _fileAsPathOpsCall(fileIndx, props.rowIndex)
                              "
                              class="col-1 column transparent q-pa-none no-border"
                              style="max-width: 3dvw"
                            >
                              <img
                                :src="item"
                                class="col fit shadow-2 transparent rounded-borders q-pa-none"
                                style="aspect-ratio: 1/1; width: 100%"
                              />
                            </q-btn> -->
                          </div>
                        </div>

                        <div class="row" style="padding-right: 5%">
                          <q-item-label
                            class="boxbstyle bg-cyan"
                            v-if="_orderBox.includes(props.row.id)"
                          >
                            <q-icon name="save" />
                          </q-item-label>
                          <!--div v-if="props.row.buy =='buy' ?? false" style="color:orange"> Already Bought </div>
                                                <div v-else> Added to cart </div-->
                        </div>
                      </q-item>

                      <q-item
                        class="col-auto row justify-between content-start q-px-none q-mx-none"
                      >
                      </q-item>

                      <q-item
                        class="col fontdstyle items-center q-gutter-sm row q-mx-xs"
                      >
                        <div class="col row justify-between">
                          <!---------------------Conteting While in NOT Mobile Screen-->
                          <q-item-section class="q-py-sm fontbstyle col">
                            <div>
                              <q-btn
                                color=""
                                rounded
                                :dense="true"
                                size="sm"
                                class="col-grow text-white fontdstyle"
                                style="backdrop-filter: blur(95px)"
                                no-caps
                                @click="
                                  _this_ActiveOperation._detailView(
                                    props.row.id,
                                    props.rowIndex,
                                    'details',
                                    'selected'
                                  )
                                "
                                >Show Details</q-btn
                              >
                            </div>
                          </q-item-section>

                          <q-item-section
                            class="row col-auto q-px-none saleitContentOps-Glass"
                          >
                            <!--  -->
                            <div
                              class="col-auto fontastyle row no-wrap q-gutter-sm"
                            >
                              <q-btn
                                size="xs"
                                no-caps
                                icon="shop"
                                v-if="
                                  (props.row?.price ?? false) &&
                                  (props.row?.quantity ?? false)
                                "
                                class="fontestyle bg-orange col-grow"
                                :label="_pageSettings.language ? 'ይዓድጉ' : 'Buy'"
                                @click="
                                  _this_ActiveOperation.selectedRow_ForeignRows(
                                    props.rowIndex,
                                    'clients'
                                  )
                                "
                              />

                              <q-btn
                                size="xs"
                                class="col-grow"
                                label="Save"
                                no-caps
                                color="black"
                                @click="
                                  _this_ActiveOperation._toCart(
                                    props.row.id,
                                    'clients'
                                  )
                                "
                              />
                            </div>

                            <div class="col column q-pa-sm">
                              <div
                                class="col-auto text-orange column justify-between"
                                v-if="props.row.discount ?? false"
                                color=""
                              >
                                <q-item-label
                                  class="text-strike text-red q-pa-sm"
                                  >{{ props.row.price }}</q-item-label
                                >{{ props.row.discount }}
                                {{ _pageSettings["currency"] }} (New Price)
                              </div>

                              <div
                                class="col-auto text-orange row justify-center fontestyle"
                                v-else
                              >
                                <h1 class="text-black">
                                  {{ props.row.price }}
                                  {{ _this.currency ?? " ETB " }} ( Price )
                                </h1>
                              </div>

                              <div
                                class="col-auto text-orange column justify-between"
                              >
                                <div class="fontdstyle row q-gutter-sm">
                                  <p>on store :</p>
                                  <h1>{{ props.row.quantity }}</h1>
                                </div>
                                <q-rating
                                  v-model="props.row._itServiceRating"
                                  :max="5"
                                  class="mobile text-orange"
                                  size="xs"
                                  @click="
                                    _this_ActiveOperation._rating(
                                      props.rowIndex
                                    )
                                  "
                                >
                                  <q-tooltip
                                    >Product Reliability Score</q-tooltip
                                  >
                                </q-rating>
                              </div>
                            </div>
                          </q-item-section>
                        </div>
                      </q-item>
                    </q-list>
                  </div>
                </div>
              </div>
            </q-td>

            <!---------Disktop----sideBox_show (comment & client) Ends-->

            <!---------Mobile----sideBox_show (comment & client) Ends-->
          </q-tr>

          <q-tr
            v-else
            class="column col-11 q-gutter-xs q-tr--no-hover fit fontbstyle"
            style="
              min-height: 50vh;
              border: 0px solid blue;
              padding: 0px;
              margin: 0px;
            "
          >
            Error Loading Product ...
          </q-tr>
        </template>
      </q-table>

      <q-table
        v-else-if="_pageSettings['tableView'] == 'cards'"
        flat
        bordered
        :rows="_this_Rows"
        :columns="columns"
        virtual-scroll
        row-key="id"
        rowIndex="true"
        grid
        grid-header
        :inFullscreen="true"
        class="col q-gutter-xs row justify-center"
        v-model:pagination="pagination"
        hide-pagination
        @request="onRequest"
        hide-top
        hide-bottoms
        style="min-width: 100vw; padding-top: 5vh"
        no-data-label=""
      >
        <template v-slot:top="props" v-if="false">
          <q-btn
            class="hidden"
            style="height: 0px; width: 0px"
            ref="togflscreen"
            :set="(enableflscreen = props.inFullscreen)"
            @click="props.toggleFullscreen()"
          />
        </template>

        <template v-slot:header="props">
          <q-tr
            :props="props"
            class="col-auto column q-pa-none q-ma-none"
            style="
              backdrop-filter: blur(55px);
              position: fixed;
              z-index: 99;
              height: 30px;
            "
            :style="isScrolledUp ? 'top:0vh' : 'top:50px;padding-top:3px'"
          >
            <q-scroll-area
              class="col-grow column transparent flex flex-center q-pa-none"
              style="
                width: 95vw;
                scrollbar-width: 30px;
                scrollbar-color: #888 #f1f1f1;
              "
            >
              <div
                class="col-grow flex flex-center q-gutter-sm q-px-md transparent no-wrap"
                style="min-width: 100%; max-height: 100%"
              >
                <q-separator inset vertical class="q-py-sm" />

                <q-btn
                  rounded
                  no-caps
                  color=""
                  @click="this_Query(null, '', 16)"
                  class="col-auto fontdstyle"
                  size="sm"
                >
                  Show All
                </q-btn>

                <q-separator inset vertical class="q-py-sm" />

                <q-btn
                  rounded
                  no-caps
                  v-for="(_qvalue0, _qgroup0) in saleCatagory"
                  @click="this_Query('catagory', _qgroup0, _qvalue0)"
                  :key="_qvalue0"
                  class="column col-auto q-py-xs fontdstyle"
                  style="color: orangered"
                  :class="
                    _this_Query['catagory'] == _qgroup0
                      ? 'bg-orange text-white'
                      : 'bg-white'
                  "
                  size="sm"
                >
                  {{ _qgroup0 }}
                </q-btn>

                <q-separator inset vertical class="q-py-sm" />

                <!-- <q-btn
                  rounded
                  outline
                  no-caps
                  size="sm"
                  v-for="(_qvalue1, _qgroup1) in saleUsage"
                  @click="this_Query('catagory', _qgroup1, _qvalue1)"
                  :key="_qvalue1"
                  class="col-auto fontestyle"
                  :class="_this_Query['usage'] == _qgroup1 ? '' : ''"
                >
                  {{ _qgroup1 }}
                </q-btn> -->

                <q-space />

                <!-- <q-btn
                  flat
                  round
                  dense
                  :icon="enableflscreen ? 'fullscreen_exit' : 'fullscreen'"
                  @click="$refs.togflscreen.click()"
                  class="q-ml-md"
                /> -->
              </div>
            </q-scroll-area>
          </q-tr>
        </template>

        <template v-slot:item="props">
          <q-tr
            :props="props"
            class="col-grow column q-tr--no-hover col-auto"
            style="padding: 5px; margin: 0px; min-width: 40vw"
          >
            <div class="column" v-if="props.row?.saleitgr ?? false">
              <q-img
                :src="props.row.saleitgr[0]"
                style="aspect-ratio: 1/2; min-width: 30vw; border-radius: 5px"
                class="img q-pa-none shadow-8"
                @mouseover="
                  _this_ActiveOperation._detailView(
                    props.row.id,
                    props.rowIndex,
                    'details',
                    'hover'
                  )
                "
              >
                <div
                  class="col-auto q-gutter-sm justify-center q-pa-none q-ma-none column"
                  style="
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0px;
                    z-index: 1;
                    backdrop-filter: blur(0.5px);
                  "
                  v-if="
                    typeof __thisIndex == 'number' &&
                    __thisIndex == props.rowIndex
                  "
                >
                  <div
                    v-if="__thisOpsStatus == 'hover'"
                    class="row q-gutter-sm"
                  >
                    <q-btn
                      :dense="true"
                      color="green"
                      size="sm"
                      @click="
                        _this_ActiveOperation._detailView(
                          props.row.id,
                          props.rowIndex,
                          'details',
                          'selected'
                        )
                      "
                      label="show Detail"
                    />
                    <q-btn
                      :dense="true"
                      color="orange"
                      size="sm"
                      v-if="props.row.isOpen"
                      label="BUY"
                      @click="
                        _this_ActiveOperation._detailView(
                          props.row.id,
                          props.rowIndex,
                          'clients',
                          'selected'
                        )
                      "
                    />
                  </div>
                  <!-- <div class="col-auto  row justify-end q-pa-sm">  
                              <q-btn color="red" size="xs" @click="__thisIndex = null" icon="close" flat :dense="true"> </q-btn>
                            </div> -->
                  <div
                    v-else-if="
                      __thisOpsStatus == 'selected' && __thisOps == 'clients'
                    "
                  >
                    <div
                      class="col-6 row justify-start q-px-sm"
                      v-if="_this.isOpen && _this_modelOneforeign"
                    >
                      <buyButton
                        style=""
                        :quantity="_this_modelOneforeign['quantity']"
                        :price="_this.netPrice"
                        :currency="_this.currency"
                        background2="white"
                        background="white"
                        @decreaseButton="
                          _this_modelOneforeign['quantity'] =
                            parseFloat(_this_modelOneforeign['quantity'] ?? 1) -
                            1
                        "
                        @increaseButton="
                          _this_modelOneforeign['quantity'] =
                            parseFloat(_this_modelOneforeign['quantity'] ?? 1) +
                            1
                        "
                      >
                      </buyButton>
                      <div class="col-auto row q-pa-xs q-gutter-xs">
                        <q-btn
                          class="col-5 bg-orange text-white"
                          :dense="true"
                          size="sm"
                          @click="_this_foreignOperation._directBuyer('buy')"
                          >Buy Now</q-btn
                        >
                        <q-btn
                          class="col-6 bg-green text-white"
                          :dense="true"
                          size="sm"
                          @click="_this_foreignOperation._directBuyer('cart')"
                          >Save</q-btn
                        >
                      </div>
                    </div>

                    <div v-else>Sale Closed !</div>
                  </div>
                </div>

                <div
                  class="transparent column q-pa-none justify-between"
                  style="
                    position: absolute;
                    width: 200px;
                    height: 100%;
                    top: 5px;
                    z-index: 1;
                  "
                  v-else
                >
                  <div class="col-auto">
                    <div
                      v-if="
                        (props.row?.price ?? false) &&
                        (props.row?.quantity ?? false)
                      "
                      class="col-auto fontastyle text-orange"
                    >
                      {{ _pageSettings.language ? "Selling" : "Open" }}
                    </div>
                    <div v-else style="color: orangered" class="fonte0astyle">
                      Closed
                      <q-icon name="lock" />
                    </div>

                    <div
                      v-if="_orderBox.includes(props.row.id)"
                      class="fontastyle"
                    >
                      <div class="fontastyle text-white">
                        {{ _pageSettings.language ? "Saved" : "Saved" }}
                        <q-icon name="save" />
                      </div>
                    </div>
                  </div>

                  <div class="col-grow column justify-end">
                    <div>
                      <q-btn
                        @click="
                          _this_ActiveOperation._detailView(
                            props.row.id,
                            props.rowIndex,
                            'details',
                            'hover'
                          )
                        "
                      >
                        <q-icon name="info" />
                      </q-btn>
                    </div>
                  </div>
                </div>
              </q-img>
            </div>
            <div v-else>Error Loading Image ..</div>
          </q-tr>
        </template>
      </q-table>

      <div v-else>No Data</div>
    </div>

    <!-- sckelton of single_content-->
    <div
      class="col q-py-md fit q-gutter-md transparent flex flex-center column"
      style=""
      v-else
    >
      <q-card style="width: 90%" class="col-1 q-gutter-xs transparent row">
        <q-skeleton class="col" square v-for="i in [1, 2, 3, 4, 5]" :key="i" />
      </q-card>

      <q-card style="width: 60%" class="col-grow q-pa-xs row q-gutter-xs">
        <q-skeleton class="col-grow" />
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
import {
  ref,
  computed,
  watch,
  onUnmounted,
  onMounted,
  defineComponent,
} from "vue";
import { useQuasar, useMeta } from "quasar";
//import print from 'print-js';
import { useRouter } from "vue-router";
//import { storeToRefs } from "pinia";
//---------------stores
import { thisStore } from "@/stores/dataStores/thisStore"; //saleit Store ( Main Store)

// import { saleitSchema } from "@/composables/schemas/saleitSchemas";

import _genOrderID from "@/composables/utilServices/idGenerator";
import useschemaValidator from "src/composables/utilServices/schemaValidator";
const {
  thisSchemaPath,
  thisSchemaFile,
  //------------
  _debugObj,
  //-------
  _validateThis,
} = useschemaValidator();
// useschemaValidator
// import  {_isnull,_isempty,_isequ,_isgte,_islte,_isbtn} from "@/composables/validators"
import {
  saleCatagory,
  saleUsage,
  _createTitle,
  _updateTitle,
  _readTitle,
  _deleteTitle,
} from "@/composables/constVariables";

import imageSlider from "src/components/imageSlider.vue";
import buyButton from "src/components/buttons/buyButton.vue";
import closeButton from "src/components/buttons/closeButton.vue";

import confirmButton from "src/components/buttons/confirmButton.vue";
let confirmObj = ref(null);
let confirmMessage = ref("Are You Sure ?");

import dialogOne from "src/components/dialogs/dialogOne.vue";

import debugCard from "@/components/debugCards.vue";
import useDebugMixin from "@/composables/debugMixin";
const {
  Loadingpage,
  Loadingevent,

  DoneMessage,
  WarnthisMessage,
  //----------returning values
  timerLoadevent,

  timerDone,
  timerError,
} = useDebugMixin();

import statusCard from "@/components/statusCards.vue";
import useStatusMixin from "@/composables/statusMixin";
const {
  status_KnowthisMessage,
  //----------returning values
  status_timerInformthis,
} = useStatusMixin();

import usefileMixin from "@/composables/fileserviceMixin";
var {
  _thisMedia,
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
  // set_this_foreign,
} = usefileMixin();

// import { saleitSchema } from "src/composables/schemas/saleitSchemas";
import _localStorage from "src/services/storeService";

const $q = useQuasar();
//const $m = useMeta();
const router = useRouter();

let Objprops = defineProps({
  //----General Informations
  _profile: { type: Object, default: () => ({}) }, //user Datas all there is...
  //----User Credentials and Unique ID.
  //-----------access Parameters
  // _iss: { type: Object, default: () => ({}) }, ///Customized(is?)_ACCESS_Type of Per/User(for_all Models)..as 'saleit':[isUpgrade,isClient] Form
  _acctype: { type: Object, default: () => {} }, ///RAW_ACCESS_Type of Per/User (for_all Models)..as 'saleit':[true,'/plat','',[]]
  // //---------
  // _threeaSchema: { type: Object, default: () => ({}) }, //(Every Models _Schema for ACCEss Type)
  //-------------------(layout tunnel for command datas(signal))
  lytCreatRow: { type: Boolean, default: false },
  //--------Search Button Signal
  lytSearchRow: { type: String, default: "" },
  //----------
  isScrolled: { type: Boolean, default: false }, //isScrolledUp
  isScrolledUp: { type: Boolean, default: false }, //isScrolledUp
  //--------------
  _pageSetting: { type: Object, default: () => ({}) },
});

import useThisMixin from "src/composables/thisMixin";
var {
  //----------//-- settings
  _is_modelOneOwner,
  _is_this_netPrice,
  _is_this_open,
  _is_this_currency,
  // __thisBox_CDialog,
  __thisBox,
  //----------//--
  __thisIndex,
  __thisOps,
  __thisOpsStatus,
  __thissubOps,
  __thissubOpsStatus,
  //---------//-- functions
  // set_this,
  //====================
  __this_foreignBox,
  __this_foreignBoxDialog,
  //--------
  __this_foreignBoxIndex,
  __this_foreignBoxOps,
  __this_foreignBoxOpsStatus,
  __this_foreignBoxsubOps,
  //---
  // set_this_foreign,
  // __thisBox_UDialog,
  // set_this,
} = useThisMixin();

import useDefaulMixin from "@/composables/myMixin";
let {
  Objprops_,
  //----------------functions
  _allColumnName,
  _rolesColumn,
  visibleColumn,

  modal_iss,
  //------preparing the main default and table_design.
  _this_Defaulting,

  //------preparing the foreign default and table_design
  foreign_Columns,
  _this_foreignDefaulting,
  //------
  // visible_clientColumns,
} = useDefaulMixin();

//===========================================================================////////////////////
//---------Main Model ( columns(visible_,all_),default_Values,),(thisRows,),(),
import useMainMixin from "@/composables/thisMainMixin";
let {
  count,
  //------------
  //----------returning values
  _allColumnNames,
  _rolesColumns,
  visibleColumns,

  //---------settings
  // Objprops_,
  _thisModel,
  _this_Schema,

  lockedColumns,
  invisibleColumns,
  //----------------functions

  _this_Rows,
  // status_thisDetail,
  _this,

  columns,
  _this_Query,
  _this_RowsStatus,
  //-----------//-- returning values
  _thisDefault,

  _thisModels,

  //------
  visible_clientColumns,
} = useMainMixin();

import useClientMixin from "@/composables/thisClientMixin";
var {
  _this_modelOneSchema,

  _this_modelOneColumns,
  visibleColumns_client,
  invisibleColumns_client,

  _modelOneQuery,

  _this_modelOneRows,
  status_modelOneDetails,
  _thisDefault_client,
  _this_modelOneforeign,
  _is_modelOneOwner,
} = useClientMixin();

import useChatMixin from "@/composables/thisChatMixin";
var {
  _this_chatSchema,

  _this_chatColumns,
  visibleColumns_chat,
  invisibleColumns_chat,

  _chatQuery,

  _this_modelTwoRows,
  _thisDefault_chat,
  _this_chatforeign,
  _is_chatOwner,
} = useChatMixin();

import { saleitStore } from "@/stores/dataStores/saleitStore"; //saleit Store ( Main Store)
import { saleitClientStore } from "@/stores/dataStores/saleitClientStore"; //saleit Store ( Main Store)
import { salechatStore } from "@/stores/dataStores/salechatStore"; //saleit Store ( Main Store)

import { useTableFilter } from "@/composables/tableMixin";
var { _enableRowFilter, _thisFiltering, _filteredRow } = useTableFilter();
//--- take care the paginations it affect the filtering and Index
//------------Setting up all the search attributes

const metaData = {
  // sets document title
  title: "sale_itService",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - `,
  // JS tags
  icon: "/icons/qimage.png",
  script: {},
};
useMeta(metaData);
//----STORE & SERVICES
thisSchemaPath.value = "saleitSchemas";
thisSchemaFile.value = "saleitSchema";
import("../composables/schemas/" + thisSchemaPath.value)
  .then((module) => {
    _this_Schema.value = module[thisSchemaFile.value];
  })
  .catch((e) => {
    console.error("Error importing schema:", e);
  });

//---foreignKeyed Defaulting (Scheam)==== PreDefined Models
_thisModel.value = "saleit"; // the Vue_Page_DataModel (Listing Collection Name)
var _thisModelHeader = ref(_thisModel.value + " Managment"); // the Vue_Page_Data_Headers(Descriptions...)
// _this_Schema.value = saleitSchema;

const _thisService = thisStore();
const _thisModelService = saleitStore();

const modelOneService = saleitClientStore();
const modelTwoService = salechatStore();

const _thisapiUrl = "/saleitapi/saleit";

//==========Global Variables for Data

let priceFilter = { gt: false, lt: false, eq: false };
const filter = computed(() => {
  return {
    search: Objprops.lytSearchRow,
    priceFilter,
  };
});

// const status_thisDetail = ref(null);

//================================================================================/////////////
//////////--------------Axios Wrapper UUUUUUPPPPPPPPPPPP
//-------------USER PROFILE_Variables..

// Objprops_.value =Objprops ?? false
let _this_acctype = ref({});
Objprops_.value = Objprops;
_this_acctype = computed(() => {
  if (Objprops._acctype ?? false) {
    return Objprops._acctype[_thisModel.value] ?? null;
  } else {
    return null;
  }
});

// _thisMedia.value = Objprops._thisMedia2;
//------- Objprops.lytSearchRow
let _pageSettings = ref({});
watch(Objprops._pageSetting, (_nowValue, ov) => {
  _pageSettings.value = Object.assign(_pageSettings.value, _nowValue);
  return true;
});
watch(_filteredRow, (_nowValue, ov) => {
  Objprops.lytSearchRow ?? false ? this_Query("lytSearchRow") : "";
  return true;
});
// let __thisBox_CDialogh =ref(false)
let __thisBox_CDialog = computed(() => {
  return Objprops.lytCreatRow;
});
watch(__thisBox_CDialog, async (cv, ov) => {
  await set_this("CreateRowItem", null);
  __thisBox.value = true;
  return true;
});
async function __thisBox_UDialog(_playrowIndex = null) {
  _fileAttributeName.value = null;
  await set_this("UpdateRowItem", _playrowIndex);
  __thisBox.value = true; //OPen the Box
  return true;
}
//-----------------Reactive Values
// let watch_this =computed(()=>{return _this.value})
watch(_this, (_nowRows, ov) => {
  if (__thisIndex.value == null) {
    return true;
  }
  // console.log('watching this',_nowRows,__thisIndex.value,__thisBox.value)
  try {
    _is_modelOneOwner.value = _nowRows["userID"] == Objprops._profile.id;
    ///--- is owner()
    _is_chatOwner.value = _nowRows["userID"] == Objprops._profile.id;
  } catch {
    [_is_modelOneOwner.value] = [false];
  }
  return true;
});

let watch_Rows = ref(null);
watch_Rows = computed(() => {
  return _thisModelService.getstatus_Rows;
});

watch(watch_Rows, async (StatusRows, ov) => {
  let information;
  if (StatusRows == null) {
    information = "No Data.";
  } else if (StatusRows == "noupdates") {
    information = "No Updates.";
  } else if (StatusRows == false) {
    information = "Locked";
  } else if (StatusRows == true) {
    information = "Loading ....";
  } else if (StatusRows == "BadConnection") {
    information = "Offline";
  } else {
    information = StatusRows;
    // await  timerLoadevent({ 'message': 1 }, 5000, "...Session Closed");
    StatusRows == "Unauthorized" ? _logOut() : "";
    return false;
  }
  status_timerInformthis(5000, information, "Product & Services");
  return true;
});

async function set_this(Ops = null, rowIndex = null, stopSync = null) {
  if (stopSync) {
    stopSync.set_syncLock(true);
  }
  //----------Must Reseting Variable _ In every calls
  _fileAttributeName.value = null;
  _fileAsPathIndex.value = null;
  __thisBox.value = false; //OPen the Box
  __thissubOps.value = false;
  __thissubOpsStatus.value = false;
  //------------Operational Variable Setting
  __thisIndex.value = rowIndex;
  __thisOps.value = Ops;
  //------------Operational Variable _ Status Managment
  if (rowIndex == null) {
    __thisOpsStatus.value = false; //turnofff active stauts
  } else {
    //------------ oprationa status ( new existing, set for existed value or default('selected'))
    __thisOpsStatus.value = __thisOpsStatus.value
      ? __thisOpsStatus.value
      : "selected";
  }

  try {
    _this.value = Object.assign(
      {},
      rowIndex == null ? _thisDefault.value : _this_Rows.value[rowIndex]
    );
  } catch {}
  //--------Injecting _Updating New Data   [[[ for Default / New Item]]]
  if (rowIndex == null) {
    _this.value["geolocation"] = Objprops._profile.geolocation;
    _this.value["location"] = Objprops._profile.location;
    _this.value["currency"] = Objprops._profile.currency ?? "";
    //--------
    _this.value["currency"] = Objprops._profile.currency; //
    _this.value["userID"] = Objprops._profile.id;
    _this.value["phoneCode"] = Objprops._profile.phoneCode;
  }
  return true;
}

async function set_this_foreign(foreignOps, _foreignIndex, stopSync = null) {
  if (stopSync) {
    stopSync.set_syncLock(true);
  }
  //----------Must Reseting Variable _ In every calls
  __this_foreignBox.value = true; //disasble sideBox
  __this_foreignBoxDialog.value = null;
  __this_foreignBoxsubOps.value = false;
  //------------Operational Variable Setting
  __this_foreignBoxIndex.value = _foreignIndex; //? _foreignIndex : null;
  __this_foreignBoxOps.value = foreignOps; //diable andy operations
  //------------Operational Variable _ Status Managment
  if (_foreignIndex == null) {
    __this_foreignBoxOpsStatus.value = false; //turnofff active stauts
  } else {
    //------------ oprationa status ( new existing, set for existed value or default('selected'))
    __this_foreignBoxOpsStatus.value = __this_foreignBoxOpsStatus.value
      ? __this_foreignBoxOpsStatus.value
      : "selected";
  }

  try {
    if (foreignOps == "comments") {
      //------------ Main Data Sckeltons
      _this_chatforeign.value = Object.assign(
        {},
        _foreignIndex == null
          ? _thisDefault_chat.value
          : _this_modelTwoRows.value[_foreignIndex]
      );
      //--------Injecting _Updating New Data   [[[ for Default / New Item]]]
      if (_foreignIndex == null) {
        _this_chatforeign.value["userID"] = Objprops._profile.id;
        _this_chatforeign.value["saleitID"] = _this.value?.["id"] ?? "";
      }
    } else {
      if (foreignOps == "clients") {
        //------------ Main Data Sckeltons
        _this_modelOneforeign.value = Object.assign(
          {},
          _foreignIndex == null
            ? _thisDefault_client.value
            : _this_modelOneRows.value[_foreignIndex]
        );
      } else if (foreignOps == "details") {
        //------------ Main Data Sckeltons
        _this_modelOneforeign.value = Object.assign(
          {},
          _thisDefault_client.value
        );
      }
      //--------Injecting _Updating New Data   [[[ for Default / New Item]]]
      if (_foreignIndex == null) {
        _this_modelOneforeign.value["userID"] = Objprops._profile.id;
        _this_modelOneforeign.value["phoneCode"] = Objprops._profile.phoneCode;
        //---------
        _this_modelOneforeign.value["currency"] = _this.value.currency;
        _this_modelOneforeign.value["location"] = _this.value.location;
        _this_modelOneforeign.value["geolocation"] = _this.value.geolocation;
        _this_modelOneforeign.value["saleitID"] = _this.value?.["id"] ?? "";
        _this_modelOneforeign.value["orderID"] = await _genOrderID();
      }
    }
  } catch {}
  return true;
}

const _resetBoth = async function (resetMainOps = null, resumeSync = null) {
  //reset_default if same_index and Ops occured
  if (resumeSync) {
    resumeSync.set_syncLock(false);
  }
  await set_this(resetMainOps, null);
  await set_this_foreign(resetMainOps, null);
  return true;
};
const _setBoth = async function (
  setMainOps = null,
  _thisindex = null,
  _foreignIndex = null,
  stopSync = null
) {
  //reset_default if same_index and Ops occured
  if (stopSync) {
    stopSync.set_syncLock(true);
  }
  await set_this(setMainOps, _thisindex);
  await set_this_foreign(setMainOps, _foreignIndex);
  return true;
};

const _setthis_Resetforeign = async function (
  setforeign = null,
  _thisindex = null,
  _foreignIndex = null,
  stopSync = null
) {
  //reset_default if same_index and Ops occured
  if (stopSync) {
    stopSync.set_syncLock(true);
  }

  await set_this(setforeign, _thisindex);
  await set_this_foreign(setforeign, _foreignIndex);

  return true;
};
//==============================================------------------------------------
let enableflscreen = ref(true);
//--------------

//------column invisiblity on table_
//columns_filter()-------- which to displayOn REgisterations form
lockedColumns = ref(["userID", "userName"]); //are blacklist of columns tobe not shown during the Registerations..form submitting
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
} //invisibleColumns.push("storeStatus");
// _this_Schema.value = saleitSchema
//-------------Syncing Columns
columns = computed(() => {
  //compute for _this_acctype.value
  console.log(
    `\n\n Creating ${_thisModel.value}  Table Schema with AccTypeof ${_this_acctype.value}`
  );
  if (!_this_acctype.value) {
    return [];
  } else {
    let _tableColumn = []; //HOLDING_  all the ---"Columns"--- of the Data_model ( TOTAL Columns)
    let _visibleColsName = []; ////--HOLDING_ all the ---"Visible" Columns"---- of the Data_model ( TOTAL Columns)

    //-------<<<<>>>>-------Preparing this_model role_schemas
    let rolesWall = _this_acctype.value.role ?? false;
    let capabilityWall = _this_acctype.value.capability ?? false;
    let modelRole = _this_acctype.value.roles ?? []; //accstage
    console.log(
      `\n\n User Role & Permissions:_ rolesWall = ${rolesWall} && capabilityWall = ${capabilityWall} && modelRole = ${modelRole}`
    );

    for (let schemaColumn in _this_Schema.value) {
      let _col = {
        name: schemaColumn,
        schema: _this_Schema.value[schemaColumn],
        label: schemaColumn,
        //sortable: true,
        align: "left",
        //sort: (a, b) => a - b,
      };
      _tableColumn.push(_col);
      //----------------loging all columns name as normal list format
      _allColumnName(schemaColumn);
      //---------------loging Visible Columns list(on table)
      invisibleColumns.value.includes(schemaColumn)
        ? ""
        : _visibleColsName.push(schemaColumn);
      //----
      if (
        schemaColumn === "extraColumn" ||
        lockedColumns.value.includes(schemaColumn)
      ) {
        continue;
      } else {
        //Create and Write
        try {
          if ([capabilityWall[0], capabilityWall[2]].includes("2")) {
            ///if user_ hass full access
            if (modelRole.includes(schemaColumn)) {
              //excludes specifed columns
              continue;
            } else {
              _rolesColumn(_col);
            } //gives
          } else if (capabilityWall[0] == "1") {
            //Registererars (checking create digits will work for writing(updating too))
            if (modelRole.includes(schemaColumn)) {
              //excludes specifed columns
              // _rolesColumn(_col);
              continue;
            } else {
              _rolesColumn(_col);
            } //gives all other thatn specifiec columns
          } else if (capabilityWall[2] == "1") {
            //user has specified accesss with 1strickes ===['clientFlag','*']
            if (rolesWall.includes(schemaColumn)) {
              //excludes specifed columns
              _rolesColumn(_col);
            } else {
              continue;
            } //gives all other thatn specifiec columns
          } else {
            continue;
          }
        } catch {}
      }
    } //grab the actions and it's permissions (create,update,delete) as label
    _tableColumn.push({
      name: "actions",
      schema: { type: "String" },
      label: "actions",
      value: capabilityWall[0] + capabilityWall[1] + capabilityWall[2],
    });
    _visibleColsName.push("actions");
    // _this_Defaulting();
    _setDefaults();
    visibleColumn(_visibleColsName);
    //
    _this_foreignDefault();
    return _tableColumn;
  }
});

async function _setDefaults() {
  // _this_modelOneModels = ['phone',"userName","geolocation",'location','phoneCode'] //
  // _thisModels = ['phone',"userName","geolocation",'location','userID','phoneCode'] //
  _thisDefault.value = await _this_Defaulting(_thisModels.value);
  _thisDefault.value["quantity"] = 1;
  _thisDefault.value["userID"] = Objprops._profile.id;
  _thisDefault.value["phoneCode"] = Objprops._profile.phoneCode;
  //------==== building columns of thisMoel
  return true;
}

const pageSize = 50;
let pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});
async function onRequest() {
  pagination.value.rowsPerPage = 10;
  pagination.value.rowsNumber = 10;
  return true;
}

//---------------------------------------------------==========================///////////////////
async function _this_foreignDefault() {
  //-------<<<<>>>>-------Preparing this_model role_schemas
  let _defaulting_client = await foreign_Columns(_this_modelOneSchema.value);
  _this_modelOneColumns.value = _defaulting_client[0];
  await _clientDefaults(_defaulting_client[1]);

  let _defaulting_chat = await foreign_Columns(_this_chatSchema.value);
  _this_chatColumns.value = _defaulting_chat[0];
  await _chatDefaults(_defaulting_chat[1]);

  return false;
}

async function _clientDefaults(_this_modelOneModels) {
  _thisDefault_client.value = await _this_foreignDefaulting(
    _this_modelOneModels
  );
  //-----redefine _values
  _thisDefault_client.value["orderID"] = await _genOrderID();
  _thisDefault_client.value["userID"] = Objprops._profile.id;
  _thisDefault_client.value["phoneCode"] = Objprops._profile.phoneCode;
  _thisDefault_client.value["quantity"] = 1;
  _thisDefault_client.value["served"] = "Requesting";
  _thisDefault_client.value["price"] = 0;
  //-------------------------(Defined Schema-1)
  return true;
}
async function _chatDefaults(_this_chatModels) {
  _thisDefault_chat.value = await _this_foreignDefaulting(_this_chatModels);
  _thisDefault_chat.value["userID"] = Objprops._profile.id;
  //-------------------------(Defined Schema-1)
  return true;
}
//=============QUERY BUILDER=============================DEfaulting && Scheam Generations====End
//---------------------------------------------- Store Syncing === End
var _this_Query_Meta = {}; //_trend:'', catagory:'',usage:'New',content:''
//====THIS_QUERY=====================(Syncing Fetch)
async function this_Query(queryKey = null, queryValue = null) {
  __thisOpsStatus.value = "loading";
  //------
  _thisModelService.set_syncLock(true);
  clearInterval(sync_thisInstante);
  //--------------------
  timerLoadevent({ this_Query: 0 }, 0, "Updating...");
  //-----------Reseting Rows SEtting
  _this_Rows.value = [];
  _this_Query_Meta = {};
  __this_foreignBoxsubOps.value = false;
  let _thisQuery_Old = _this_Query.value["qweight"] ?? [1, 1, 1, 1]; //show searchedQuery
  _this_Query.value = {};

  if (queryKey == "lytSearchRow") {
    //++Search Product by Filtering && Searching(Default)
    _pageSettings.value["tableView"] = "main";
    //------Build Query
    _this_Query.value["content"] = Objprops.lytSearchRow;
    if (_this_Query.value["qweight"]) {
      _this_Query.value["qweight"][3] = 3;
    }
  } else {
    //--------------------Building Queries
    if (queryKey) {
      //user_defined searchings
      _pageSettings.value["tableView"] = "main";
      if (["catagory", "usage", "trend"].includes(queryKey)) {
        // search for buttonFilters && use AND Operators(3)
        //------Build Query
        // search.value = ''
        _this_Query.value["qweight"] = [
          1,
          saleCatagory[queryValue] ?? _thisQuery_Old[1] ?? "1",
          saleUsage[queryValue] ?? 100,
          3,
        ];
      } else {
        //------Build Query
        _this_Query.value[queryKey] = queryValue ?? null; //queryKey == 'id' ? {'id':queryValue} :""
      }
    } else {
      if (queryValue) {
        _pageSettings.value["tableView"] = "main";
        __this_foreignBoxsubOps.value = "view";

        _this_Query.value["id"] = queryValue;
      } else {
        _pageSettings.value["tableView"] = "cards";
        //----Prepare Query
        let userWeight = _localStorage._getsession("qw") ?? false;
        userWeight = userWeight ? userWeight.split(",") : [1, 1, 1, 2];
        //------Build Query
        _this_Query.value["qweight"] = [1, userWeight[1], userWeight[2], 2];
      }
    }
  }
  //-------track Search Status
  _this_Query_Meta["catagory"] =
    saleCatagory[queryValue] ?? _this_Query.value[1] ?? "HouseHolds";
  _this_Query_Meta["usage"] =
    saleUsage[queryValue] ?? _thisQuery_Old[2] ?? "New";
  //----------------Fetching Queried Rows
  // _this_Rows_Sync()
  await Sync_this(_thisModelService, _this_Query.value);
  //-------------------- Preparing Default Rows ( New Row Skeltons)
  // ?
  return true;
}

let sync_thisInstante = "";
_this_Rows = computed(() => {
  //Updating is comming
  return _this_RowsCompute(_thisModelService.getDatas);
});
function _this_RowsCompute(_Datas) {
  // pagination.value.rowsPerPage =
  //   _pageSettings.value["tableView"] == "cards" ? 1 : 3;
  __thisOpsStatus.value = false;
  return Array.isArray(_Datas) ? _Datas : [];
}
//===CLIENT_QUERY=======================(Requesting Fetch)
async function _this_modelOneQuery() {
  _this_modelOneRows.value = null; //mean waiting result
  //-------------------- Reseting Rows
  set_this_foreign("clients", null);
  //---------Query Building
  //Content Owner is on client_link(show all)
  if (!_is_modelOneOwner.value) {
    _modelOneQuery.value["userID"] = Objprops._profile.id;
  }
  // _modelOneQuery.value['userID']=Objprops._profile.id
  _modelOneQuery.value["saleitID"] = _this.value["id"] ?? "";
  _modelOneQuery.value["store"] = "buy";
  //-------------------- Fetching Queried Rows
  // _this_modelOneRows_Sync()
  //-----Fetching Data ( DirectFetch)
  let _rows = await Fetch_this(modelOneService, _modelOneQuery.value);
  if (_rows) {
    _this_modelOneRows.value = _rows;
  }
  //-------------------- Preparing Default Rows ( New Row Skeltons)
  return true;
}

//===CHAT_QUERY=========================(Requesting Fetch)
async function _this_modelTwoQuery() {
  //-----------------Reseting Rows
  _this_modelOneRows.value = null; //mean waiting result
  //-------------------- Reseting Rows
  await set_this_foreign("comments", null);
  //-----------Building Queries
  if (!_is_chatOwner.value) {
    _chatQuery.value["userID"] = Objprops._profile.id;
  }
  _chatQuery.value["saleitID"] = _this.value["id"];
  //-----------------Fetching Queried Rows
  // _this_modelTwoRows_Sync()
  let _rows = await Fetch_this(modelTwoService, _chatQuery.value);
  if (_rows) {
    _this_modelTwoRows.value = _rows;
  }
  //----------------Preparing Default Rows (New Row Skelton)
  return true;
}

//====================ROW OPerations================
//__this_foreignBoxsubOps
const ifRowDoublePressed = async function (_thisindex, _thisOps) {
  let _existed_this = __thisIndex.value == _thisindex;
  if (
    _thisindex == null ||
    (_existed_this && __this_foreignBoxOps.value == _thisOps)
  ) {
    await set_this(_thisOps, null, _thisModelService);
    await set_this_foreign(_thisOps, null, modelOneService);
    return true;
  } else {
    return false;
  }
};
const ifForeignDoublePressed = async function (
  _foreignindex,
  _foreignOps,
  _thisOps
) {
  let _existed_this = __this_foreignBoxIndex.value == _foreignindex;
  if (
    _foreignindex == null ||
    (_existed_this && __this_foreignBoxsubOps.value == _foreignOps)
  ) {
    await set_this(_thisOps, null, _thisModelService);
    await set_this_foreign(_thisOps, null, modelOneService);
    return true;
  } else {
    return false;
  }
};
//-------Listening for SideBox Operations & Visualizing
///--------Order_Intiations Stage
let _orderDebuger = ref("Orders List..");
let _orderBox = ref([]);

//------operations OVer POP_Up_Box
//------operations OVer POP_Up_Box
let _this_foreignOperation = {
  //--------------------------
  _add: async () => {
    //default_value for sideBox
    __this_foreignBoxIndex.value = null;
    _this_modelOneforeign.value = Object.assign({}, _thisDefault_client.value);
    return true;
  },
  //---Enabling Array_Index_For Operations (Select_Index)_For ---Editing:Deleting--Applying--
  selectedIndex_: async (
    _foreignIndex = null,
    foreignSuboperation = null,
    _thisOps = null
  ) => {
    //---------- IS Duplicated Actions
    if (
      await ifForeignDoublePressed(_foreignIndex, foreignSuboperation, _thisOps)
    ) {
      return false;
    }
    //---------- IS Duplicated Actions
    _thisService.set_syncLock(true);
    await set_this_foreign(_thisOps, _foreignIndex, modelOneService);
    //---
    __this_foreignBoxsubOps.value = foreignSuboperation;
    return true;
  },
  //---Enabling Array_Index_For Operations (Select_Index)_For ---Editing:Deleting--Applying--
  selectedIndex_RowDetail: async (
    _thisID,
    _foreignIndex = null,
    foreignSuboperation = null
  ) => {
    let _thisOps = "clients";
    //---------- IS Duplicated Actions
    if (
      await ifForeignDoublePressed(_foreignIndex, foreignSuboperation, _thisOps)
    ) {
      return false;
    }
    //---------- IS Duplicated Actions
    __thisIndex.value = 0;
    await Fetch_this(_thisModelService, { id: _thisID }).then(async (res) => {
      if (res) {
        _this_Rows.value[__thisIndex.value] = res[__thisIndex.value];
        await set_this(_thisOps, __thisIndex.value);
        await set_this_foreign(_thisOps, _foreignIndex);
      } else {
      }
    });
    // __this_foreignBoxIndex.value = _foreignIndex;
    __this_foreignBoxsubOps.value = foreignSuboperation;
    //----Defaulting foreign Links for main
    return true;
  },
  //-----------Operations on selected array
  _remove: async () => {
    if (__this_foreignBoxOps.value == "comments") {
      let fthis = { id: _this.value["id"], comments: _this_chatforeign.value };
      fthis["onplayOps"] = __this_foreignBoxOps.value;
      fthis["onplaySubops"] = "delete";

      let _chatResp = await modelTwoService.deleteData(fthis, {}); //[0],[1]
      if (!_chatResp.status) {
        timerError(500, "Error Creating", "");
        return false;
      }
      timerDone(5000, "Removed", "");

      //----updating saleitcontent
      _this_Rows.value[__thisIndex.value] = _chatResp.data.data;
      _this_modelTwoRows.value.splice(__this_foreignBoxIndex.value, 1);
      //----updating saleitcontent
      set_this(__this_foreignBoxOps.value, null);
      set_this_foreign(__this_foreignBoxOps.value, null);
    } else {
      let fthis = {
        id: _this.value["id"],
        clients: _this_modelOneforeign.value,
      };
      fthis["onplayOps"] = __this_foreignBoxOps.value;
      fthis["onplaySubops"] = "delete";

      let _clientResp = await modelOneService.deleteData(fthis); //[0],[1]

      if (!_clientResp.status) {
        timerError(500, "Error Creating", "");
        return false;
      }
      timerDone(5000, "Removed", "");

      //----updating foreign content
      _this_Rows.value[__thisIndex.value] = _clientResp.data.data;
      _this_modelOneRows.value.splice(__this_foreignBoxIndex.value, 1);
      //----updating saleitcontent
      await set_this(__this_foreignBoxOps.value, __thisIndex.value);
      await set_this_foreign(__this_foreignBoxOps.value, null);
    }
    return true;
  },
  _update_foreign: async () => {
    if (__this_foreignBoxOps.value == "comments") {
      let fthis = { id: _this.value["id"], comments: _this_chatforeign.value };
      fthis["onplayOps"] = __this_foreignBoxOps.value;
      fthis["onplaySubops"] = "update";

      let _chatResp = await modelTwoService.updateData(fthis, {}); //[0],[1]
      if (!_chatResp.status) {
        timerError(500, "Error Updating", "");
        return false;
      }
      timerDone(5000, "updated", "");
      //---- Update saleit
      // _this_Rows.value[__thisIndex.value] = _chatResp.data.data;
      //----- Update saleitContent directlly
      _this_modelTwoRows.value[__this_foreignBoxIndex.value] =
        _chatResp.data.foreignData;
      //--------Reseting
      // await set_this(__this_foreignBoxOps.value, __thisIndex.value);
      await set_this_foreign(__this_foreignBoxOps.value, null);
      //----- Update saleitContent using sync
      // await _this_modelTwoQuery();
    } else {
      let fthis = {
        id: _this.value["id"],
        clients: _this_modelOneforeign.value,
      };
      fthis["onplayOps"] = __this_foreignBoxOps.value;
      fthis["onplaySubops"] = "update";

      let _clientResp = await modelOneService.updateData(fthis, {}); //[0],[1]
      console.log(
        _clientResp,
        "cliiiiiiiiiiiiiiiiiiiiiii",
        _this_modelOneforeign.value
      );
      if (!_clientResp.status) {
        timerError(500, "Error Updating", "");
        return false;
      }
      timerDone(5000, "updated", "");
      _orderBox.value.push(_clientResp.data.data["id"] ?? null);

      //---- Update saleit
      _this_Rows.value[__thisIndex.value] = _clientResp.data.data;
      //----- Update saleitContent directlly
      _this_modelOneRows.value[__this_foreignBoxIndex.value] =
        _clientResp.data.foreignData;
      //--------Reseting
      // await set_this(__this_foreignBoxOps.value, __thisIndex.value);
      await set_this_foreign(__this_foreignBoxOps.value, null);
      //----- Update saleitContent using sync
      // await _this_modelTwoQuery();
    }

    return true;
  },
  _create_foreign: async () => {
    if (__this_foreignBoxOps.value == "comments") {
      let fthis = { id: _this.value["id"], comments: _this_chatforeign.value };
      fthis["onplayOps"] = __this_foreignBoxOps.value;
      fthis["onplaySubops"] = "create";
      console.log("commenting", fthis);
      let _chatResp = await modelTwoService.createData(fthis, {}); //[0],[1]
      if (!_chatResp.status) {
        timerError(500, "Error Creating", "");
        return false;
      }
      timerDone(5000, "Created", "");

      // _this_Rows.value[__thisIndex.value] = _chatResp.data.data;

      // set_this_foreign("comments", null);
      await set_this(__this_foreignBoxOps.value, __thisIndex.value);
      await set_this_foreign(__this_foreignBoxOps.value, null);
      await _this_modelTwoQuery();
      //----updating saleitcontent
      // _this_Rows.value[__thisIndex.value] =_chatResp.data
    } else {
      let a = { id: _this.value["id"], clients: _this_modelOneforeign.value };
      a["clients"]["store"] = "buy";

      a["onplayOps"] = __this_foreignBoxOps.value;
      a["onplaySubops"] = "create";

      let _clientResp = await modelOneService.createData(a, {}); //[0],[1]
      if (!_clientResp.status) {
        timerError(500, "Error Creating", "");
        return false;
      }
      timerDone(5000, "Ordered", "");

      _orderBox.value.push(_clientResp.data.data["id"] ?? null);
      _this_Rows.value[__thisIndex.value] = _clientResp.data.data;

      await set_this(__this_foreignBoxOps.value, __thisIndex.value);
      await set_this_foreign(__this_foreignBoxOps.value, null);
      await _this_modelOneQuery();
      //----updating saleitcontent
    }

    return true;
  },
  //------special Operations=========
  _directBuyer: async (_store = "buy", _isnewBuyer = true) => {
    // _this_modelOneforeign.value['saleitID'] = _this.value['id']
    // _this_modelOneforeign.value['userID'] = Objprops._profile.id
    let fthis = { id: _this.value["id"], clients: _this_modelOneforeign.value };
    fthis["clients"]["store"] = _store;

    // fthis["onplayOps"] = __this_foreignBoxOps.value;
    // fthis["onplaySubops"] = "create";
    let _clientResp;
    if (_isnewBuyer) {
      _clientResp = await modelOneService.createData(fthis, {});
    } else {
      _clientResp = await modelOneService.updateData(fthis, {}); //[0],[1]
    }

    if (!_clientResp.status) {
      timerError(500, "Error Creating", "");
      return false;
    }
    timerDone(5000, _store == "buy" ? "Ordered" : "ADD To Cart", "");

    _orderBox.value.push(_clientResp.data.data["id"] ?? null);
    _this_Rows.value[__thisIndex.value] = _clientResp.data.data;

    await set_this("clients", __thisIndex.value);
    await set_this_foreign("clients", null);
    await _this_modelOneQuery();
    return true;
  },
};

//---------------ACTIVE Operating on Row
//Operating without setting onplayrowItem ( directlly calling for effect) === active _operations
let _this_ActiveOperation = {
  _removeItem: async function (_thisindex) {
    __thisIndex.value = null;
    delete _this_Rows.value[_thisindex];
    return true;
  },
  _detailView: async (
    _thisid = null,
    _thisindex = null,
    _thisOps = "clients",
    _thisOpsStatus = "hover"
  ) => {
    //---------- IS Duplicated Actions
    // if(await ifRowDoublePressed(_thisindex,_thisOps)) return false
    //---------- IS Duplicated Actions
    __thisOpsStatus.value = _thisOpsStatus;
    if (["hover", "", null, false].includes(_thisOpsStatus)) {
    } else {
      await set_this(_thisOps, _thisindex);
      await set_this_foreign(_thisOps, null);
      return true;
    }
    //----------------------------------- ;
    await set_this(_thisOps, _thisindex, _thisModelService);
    await set_this_foreign(
      _thisOps,
      null,
      _thisOps == "clients" ? modelOneService : modelTwoService
    );
    return true;
    await Fetch_this(_thisModelService, { id: _thisid }).then(async (res) => {
      if (res) {
        _this_Rows.value[_thisindex] = res[0];
        await set_this(_thisOps, _thisindex, _thisModelService);
      }
      return true;
    });
    return true;
  },
  selectedRow_ForeignRows: async (_thisindex = null, _thisOps = null) => {
    //---------- IS Duplicated Actions
    if (await ifRowDoublePressed(_thisindex, _thisOps)) return false;
    //---------- IS Duplicated Actions
    // _setBoth(_thisOps, _thisindex, null, _thisModelService);
    await set_this(_thisOps, _thisindex, _thisModelService);
    await set_this_foreign(
      _thisOps,
      null,
      _thisOps == "clients" ? modelOneService : modelTwoService
    );
    // _thisModelService.set_syncLock(true);
    // await set_this(null, _thisindex);
    __thissubOpsStatus.value = true;
    _thisOps == "clients" ? _this_modelOneQuery() : _this_modelTwoQuery();
    return true;
  },
  //===================
  _rating: async (_thisindex) => {
    //build dynamic object
    _this.value = {
      id: _this_Rows.value[_thisindex]["id"],
      _itServiceRating: _this_Rows.value[_thisindex]["_itServiceRating"],
    }; //DeepCopy Handle Reactivity

    //create object operational command
    _this.value["onplayOps"] = "_itServiceRating";
    _this.value["onplaySubops"] = "increase";
    //---set--loading row operation
    return await Crud_this.updateData()
      .then(async (response) => {
        console.log(response, "Rating....");
        if (response) {
          timerDone(5000, "You Rated", "Succefully Updated");
          _this_Rows.value[__thisIndex.value]["_itServiceRating"]++;
        } else {
          // timerDone(5000, "Connection Error", "Failed to connect");
        }
        return true;
      })
      .catch((error) => {
        return false;
      });
  },

  _likes: async (_thisindex) => {
    //build dynamic object
    _this.value = { id: _this_Rows.value[_thisindex]["id"] }; //DeepCopy Handle Reactivity
    //create object operational command
    _this.value["onplayOps"] = "likes";
    _this.value["onplaySubops"] = "increase";
    //---set--loading row operation

    return await Crud_this.updateData()
      .then(async (response) => {
        if (response) {
          timerDone(5000, "Liked", "Succefully Updated");
          _this_Rows.value[_thisindex]["likes"]["like"]++; // =Object.assign({},response);
        } else {
          // timerDone(5000, "Connection Error", "Failed to connect");
        }
        return true;
      })
      .catch((e) => {
        return false;
      });
  },
  _following: async (_thisindex) => {
    //build dynamic object
    _this.value = { id: _this_Rows.value[_thisindex]["id"] }; //DeepCopy Handle Reactivity
    //create object operational command
    _this.value["onplayOps"] = "following";
    _this.value["onplaySubops"] = "increase";
    //---set--loading row operation

    return await Crud_this.updateData()
      .then(async (response) => {
        if (response) {
          timerDone(5000, "You Following", "Succefully Updated");
          // Objprops._profile.contacts.push(response.data)
          // _this_Rows.value[_thisindex]["likes"]["like"]++; // =Object.assign({},response);
        } else {
          // timerDone(5000, "Connection Error", "Failed to connect");
        }
        return true;
      })
      .catch((error) => {
        return false;
      });
  },
  _delRow: async (confirm = null, _thisindex, itemId) => {
    //--------------
    if (confirm == null) {
      //First (Null) Event -- Data Assigning && set confirmObj
      //-----------------------------
      _this.value = { id: itemId };
      // __thisIndex.value = _thisindex
      //--------------
      confirmObj.value = _this_ActiveOperation._delRow; //it carry the _delRow(,,,)... on button response it comes as
      //  _delRow(true/false)..parameter order is mattter.
      return false;
    } else {
      confirmObj.value = null;
      if (!confirm) {
        return false;
      } //Third (True) Event -- Go ahead or false(closed popup)
    }
    //--------waite for confirmation
    return await Crud_this.deleteData()
      .then((response) => {
        if (response) {
          this_Query("userID", Objprops._profile.id);
          // _this_Row.splice(__thisIndex.value,1)
        }
        return true;
      })
      .catch((error) => {
        return false;
      });
  },
  //------------special Operations
  _toCart: async (tocartID = null) => {
    _this.value = {
      id: tocartID,
      clients: Object.assign({}, _thisDefault_client.value ?? {}),
    }; //.push(_onplay); //or use below
    _this.value["clients"]["store"] = "cart";

    _this.value["onplayOps"] = "clients";
    _this.value["onplaySubops"] = "create";

    let _clientResp = await modelOneService.createData(_this.value, {}); //[0],[1]
    // console.log('creating client',_clientResp,_this.value,_this_modelOneforeign.value)
    if (!_clientResp.status) {
      timerError(500, "Error Creating", "");
      return false;
    }

    timerDone(5000, "Product Saved", "");
    _orderBox.value.push(_clientResp.data.data["id"] ?? null);
    await _this_modelOneQuery();
    //----updating saleitcontent
    // _this_Rows.value[__thisIndex.value] = _clientResp.data.data;
    return true;
  },

  //------------special Operations
};

//==========================ROW OPerations==============

//==========================ROW Confirming &&& Submitting==============

//--------------------------------------METHODS & PROCESS
async function _thisValidator(formtype) {
  let _isCompleted = Object.values(_debugObj.value).every(
    (value) => value == null
  );
  if (!_isCompleted) {
    return false;
  }
  //-----
  formtype == "Create_this" ? Create_this() : Update_this();
  return true;
}

async function Create_this() {
  //UpdateRowItem User DAta with no graphic to update
  //---set--loading row operation
  __thisOpsStatus.value = true;
  //is File Encapsulated ( if so ) ... extract the file by choosing ( either it was from folder or from camera_directlly )
  let _fileExistance = _fileAttributeName.value ?? false;
  if (_fileExistance) {
    //_this.value['file_']={'files':_fileExistance}
    _this.value[_fileExistance] = _fileAsRaw.value;
    if (typeof _fileAsRaw.value == "object") {
      _this.value["file_"] = { files: _fileExistance };
    } else {
      _this.value["file_"] = { file: _fileExistance };
    }
  }
  //--------set Operational parameters
  _this.value["onplayOps"] = "CreateRowItem";
  _this.value["onplaySubops"] = "new";
  //---Creat the Content... which is with/out of file encapsulations
  return await Crud_this.createData()
    .then(async (response) => {
      timerLoadevent({ createData: 1 }, 1, "Updating...");
      if (response) {
        timerDone(5000, "Item Created", "Succefully Created");
        __thisBox.value = false;
        return this_Query("userID", Objprops._profile.id);
      } else {
      }
      __thisOpsStatus.value = false;
      // _fileAttributeName.value=null;
      return true;
    })
    .catch((e) => {
      timerError(5000, "Error Creating", "Error Creating" + e);
      _fileAttributeName.value = null;
      __thisOpsStatus.value = false;
      __thisBox.value = false;
      return false;
    });
}

async function Update_this() {
  //UpdateRowItem User DAta with graphic to update or not
  //---set--loading row operation
  __thisOpsStatus.value = true;
  //-------------
  let _fileExistance = _fileAttributeName.value ?? false;
  if (_fileExistance) {
    //_this.value['file_']={'files':_fileExistance}
    _this.value[_fileExistance] = _fileAsRaw.value;
    if (typeof _fileAsRaw.value == "object") {
      _this.value["file_"] = { files: _fileExistance };
    } else {
      _this.value["file_"] = { file: _fileExistance };
    }
  }
  //----------set Operational parameters
  _this.value["onplayOps"] = "UpdateRowItem";
  _this.value["onplaySubops"] = "update";
  //--------
  return await Crud_this.updateData()
    .then(async (response) => {
      timerLoadevent({ updateData: 1 }, 1, "Updating...");
      if (response) {
        timerDone(5000, "Item Updated", "Succefully Updated");
        _this_Rows.value[__thisIndex.value] = Object.assign({}, response);
        __thisBox.value = false;
        this_Query("id", Objprops._profile.id);
      } else {
      }
      __thisOpsStatus.value = false;
      // _fileAttributeName.value=null;
      return true;
    })
    .catch((e) => {
      timerError(5000, "Error Updating", "Error Updating" + e);
      __thisOpsStatus.value = false;
      __thisBox.value = false;
      _fileAttributeName.value = null;
      return false;
    });
}

//==========================ROW Confirming &&& Submitting==============

//----=========================================================================---DATA ---/// ---ROW----CRUD
let createKey = "phone";
let updateKey = "id";
let delKey = "id";
//ModalCrudOps
const Crud_this = {
  createData: async function (objParam = {}) {
    //-------Check for Param_Requirents
    timerLoadevent({ createData: 0 }, 0, "Updating...");
    try {
      if (_this.value[createKey] == null) {
        return false;
      }
      //-----------Calling for Store Services  (_suburl, formData, objParam)
      return await _thisService
        .createData(_thisapiUrl, _this.value, objParam)
        .then((response) => {
          if (response.status) {
            return response.data;
          } else {
            timerError(5000, "Error createData", "..." + response.data);
            return false;
          }
        })
        .catch((e) => {
          timerError(5000, "Error createData", "..." + e);
          return false;
        });
    } catch (e) {
      timerError(5000, "Error createData", "..." + e);
      return false;
    }
  },
  //----------------------------------------------------------------
  updateData: async function (objParam = {}) {
    //-------Check for Param_Requirments
    timerLoadevent({ updateData: 0 }, 0, "Updating...");
    try {
      if (_this.value[updateKey] == null) {
        return false;
      }
      //-----------Calling for Store Services  (_suburl, formData, objParam)
      return await _thisService
        .updateData(_thisapiUrl, _this.value, objParam)
        .then((response) => {
          if (response.status) {
            return response.data;
          } else {
            timerError(5000, "", "Error" + response.data);
            return false;
          }
        })
        .catch((e) => {
          timerError(5000, "Item Updated", "Succefully Updated" + e);
          return false;
        });
    } catch (e) {
      timerError(5000, "Error updateData", "..." + e);
      return false;
    }
  },

  readData: async function () {
    timerLoadevent({ readData: 0 }, 0, "Searching...");
    return await _thisService
      .readData(_thisapiUrl)
      .then((response) => {
        if (response.status) {
          return response.data;
        } else {
          timerError(5000, "", "Error" + response.data);
          return false;
        }
      })
      .catch((e) => {
        timerError(5000, "Error readData", "..." + e);
        return false;
      });
  },

  //---------------------------------------------------------------
  readFData: async function (objParam = {}) {
    //-------Check for Param_Requirents
    timerLoadevent({ readFData: 0 }, 0, "Searching...");
    try {
      if (Object.keys(objParam ?? {}).length == 0) {
        return false;
      }
      //-----------Calling for Store Services
      return await _thisService
        .readFData(_thisapiUrl, objParam)
        .then((response) => {
          if (response.status) {
            return response.data;
          } else {
            timerError(5000, "", "Error" + response.data);
            return false;
          }
        })
        .catch((e) => {
          timerError(5000, "Error readFData", "Succefully Updated" + e);
          return false;
        });
    } catch (e) {
      timerError(5000, "Error readFData", "..." + e);
      return false;
    }
  },

  deleteData: async function () {
    //-------Check for Param_Requirents
    timerLoadevent({ deleteData: 0 }, 0, "Searching...");
    try {
      if (_this.value[delKey] == null) {
        return false;
      }
      //-----------------
      let objParam = {};
      objParam[delKey] = _this.value[delKey];
      //---------
      return await _thisService
        .deleteData(_thisapiUrl, objParam)
        .then((response) => {
          if (response.status) {
            // timerDone(5000, 'Deleted', '...');
            return response.data;
          } else {
            timerError(5000, "", "Error" + response.data);
            return false;
          }
        })
        .catch((e) => {
          timerError(5000, "Error deleteData", "Succefully Updated" + e);
          return false;
        });
    } catch (e) {
      timerError(5000, "Error deleteData", "..." + e);
      return false;
    }
  },
  //------------------filtering & searching for different Model
};

let _contentingliveStatus = ref(25000);
const Sync_this = async (service, query) => {
  clearInterval(sync_thisInstante);
  await service.set_syncQuery(query);
  //-----Fetching Data ( Store_SyncFetch)
  service.set_syncLock(false);
  service.asyncDatas();
  //--------
  setTimeout(function () {
    clearInterval(sync_thisInstante);
    sync_thisInstante = setInterval(
      service.asyncDatas,
      _contentingliveStatus.value
    );
  }, 5000);

  return true;
};

const Fetch_this = async (service, query) => {
  return await service.readFData(query).then((res) => {
    if (res.status) {
      return res.data;
    }
    return false;
  });
};

//-----------------------------------Loading...process...showOFF
//  watch(loaditwellcome, (currentValue, oldValue) => loadit.wellcome());

// //--------------------
let _fileAsPath = ref(0); //_file in Show_Mode (As_String)
let _fileAsPathIndex = ref(null); //_fileAsPath_Array_index
let _fileAsPathSlide = ref(false);

let _fileAsPathOps = ref(false); //this is for selecting only

///_fileAsPathSlide
async function _fileAsPathOpsCall(StrIndex, index = null) {
  //calling for selections
  __thisIndex.value = index;
  //__this_foreignBoxOps.value=null
  _fileAsPathIndex.value = StrIndex;
  return true;
}

async function _fileAsPathSlideCall(_thisindex = null) {
  //calling for selections
  __thisIndex.value = _thisindex;
  //----------SET_ROW
  let _onplayRI = {};
  _onplayRI = _this_Rows.value[_thisindex]; //Object.assign({},_this_Rows.value[_thisindex])
  _this.value = Object.assign({}, _onplayRI); //DeepCopy Handle Reactivity
  //---------------
  _fileAsPathSlide.value = true;
  return true;
}

var _cameraInstance = new _cameraDevice();
onMounted(() => {
  // clearInterval(sync_thisInstante);
  modelOneService.set_syncLock(true);
  modelTwoService.set_syncLock(true);
  _thisModelService.set_syncLock(true);
  //-------
  _resetBoth();
});
this_Query();
onUnmounted(async () => {
  // Clear the interval when the component is destroyed to avoid memory leaks
  clearInterval(sync_thisInstante);
  _thisModelService.set_syncLock(true);
  modelOneService.set_syncLock(true);
  modelTwoService.set_syncLock(true);
  alert("Sure, Exiting Product Store Page ?");
  return true;
});

let _logOut = async () => router.push(_localStorage._clear());

//----------------------------Utilities Funtions
</script>

<style></style>
