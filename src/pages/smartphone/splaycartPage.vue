<template>
  <template v-if="__thisBox && (_this ?? false)">
    <dialogOne
      :isOpen="__thisBox"
      @emitClick0="__thisBox = $event"
      class="fit shadow-5 column"
    >
      <q-card style="min-width: 30vw; width: 90vw" v-if="_this ?? false">
        <!----HEADER-TOP Begin-->
        <q-linear-progress :value="0.8" color="orange" />

        <q-card-section class="col column items-center no-wrap q-pa-none">
          <div class="col q-pa-none q-ma-none bg-green">
            <q-img
              loading="lazy"
              class=""
              style="aspect-ratio: 1/1; min-width: 80vw"
              :src="
                _fileAttributeName
                  ? _fileAsSRC[_fileAsSRCIndex]
                  : _this['saleitgr'][_fileAsSRCIndex]
              "
            >
              <div class="absolute-full transparent column justify-between">
                <div class="row q-ma-sm">
                  <div class="col fontdstyle text-dark"></div>
                  <div class="column col-auto q-gutter-xs" style="width: 5vw">
                    <q-item-label class="text-orange">Upload Via </q-item-label>
                    <input
                      type="file"
                      multiple
                      ref="openFolder"
                      style="display: none"
                      @change="_fileSourceFolder($event, 'saleitgr')"
                    />
                    <q-btn
                      class="bg-orange"
                      icon="folder"
                      @click="$refs.openFolder.click()"
                      :dense="true"
                    />
                    <q-btn
                      class="bg-orange"
                      icon="add_a_photo"
                      @click="_cameraInstance._openCamera('saleitgr')"
                      :dense="true"
                    />
                  </div>
                </div>

                <!-- <div class="flex fontestyle">
                <q-item-label> {{ _this["header"] }}</q-item-label>
              </div> -->

                <div class="col row justify-between q-py-sm">
                  <div
                    class="self-end justify-left col-auto"
                    style="max-width: 4vw"
                  >
                    <div v-if="__thisOps == 'CreateRowItem'">
                      <q-btn
                        no-caps
                        :dense="true"
                        :loading="__thisOpsStatus"
                        class="apple-button"
                        size="sm"
                        flat
                        :label="_pageSettings.language ? 'ሽጥ' : 'Create'"
                        @click="_thisValidator('Create_this')"
                      >
                        <!--template v-slot:__thisOpsStatus>
                                                      uploading...
                                                      <q-spinner-radio class="on-left" />
                                                      uploading...
                                                    </template-->
                      </q-btn>
                    </div>

                    <div v-else>
                      <q-btn
                        flat
                        :loading="__thisOpsStatus"
                        class="bg-orange shadow-7 fontbstyle q-pa-xs"
                        color="white"
                        size="sm"
                        :label="
                          _pageSettings.language
                            ? 'ሽጥ'
                            : 'Update Product & Service'
                        "
                        icon="upload"
                        @click="_thisValidator('Update_this')"
                      />
                    </div>
                  </div>

                  <div
                    class="self-end justify-right col-grow column q-pa-xs"
                    v-if="_fileAsSRC?.length ?? false"
                    style="max-height: 100%"
                  >
                    <div
                      class="self-end justify-right col row bg-orange fontastyle q-pa-xs"
                      v-if="_fileAsSRC.length > 1"
                    >
                      <q-checkbox
                        left-label
                        v-model="_fileAsSRCOps"
                        :label="_pageSettings.language ? 'መደምሰሲ' : 'Delete'"
                        checked-icon="task_alt"
                        unchecked-icon="highlight_off"
                        :dense="true"
                      />
                      <q-tooltip class="fontastyle bg-black text-white"
                        >Check Enable Delete & Click The Image ?</q-tooltip
                      >
                    </div>

                    <div
                      class="self-end justify-right col row shadow-1 q-pa-sm transparent"
                      style="
                        max-height: 100%;
                        max-width: 100%;
                        position: absolute;
                        top: 100px;
                        left: 25px;
                        width: 5vw;
                        height: 5vh;
                      "
                      v-if="_fileAttributeName ?? false"
                    >
                      <div
                        v-for="(item, fileIndx) in _fileAsSRC"
                        :key="fileIndx"
                        class="col row q-px-xs"
                        style="
                          position: absolute;
                          right: 2px;
                          width: 5vw;
                          height: 5vh;
                        "
                        :style="`bottom:${fileIndx * 25}px`"
                      >
                        <q-btn
                          round
                          @click="_fileAsSRCOpsCall(fileIndx)"
                          class="col-auto"
                        >
                          <q-avatar size="42px">
                            <img :src="item" />
                          </q-avatar>
                        </q-btn>
                      </div>
                    </div>
                    <div
                      class="self-end justify-right col row shadow-5 q-pa-xs"
                      style="max-height: 100%; max-width: 100%"
                      v-else
                    >
                      <div
                        v-for="(item, fileIndx) in _this['saleitgr']"
                        :key="fileIndx"
                        class="col row inset-shadow q-px-xs"
                        style="max-height: 100%"
                      >
                        <q-btn
                          round
                          @click="_fileAsSRCOpsCall(fileIndx)"
                          class="col-auto"
                        >
                          <q-avatar size="42px">
                            <img :src="item" />
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

        <q-card-section
          class="column text-dark fontbstyle"
          v-if="__thisOps == 'CreateRowItem'"
        >
          <fieldset
            class="col fontastyle q-gutter-xs column"
            style="border-radius: 5px; border: 0px solid white"
          >
            <div class="row q-gutter-md">
              <fieldset class="col" style="border: 0px solid black">
                <legend>
                  Quantity

                  <div
                    v-if="_debugObj['quantity']"
                    class="boxvalidStyle text-red"
                  >
                    ( {{ _debugObj["quantity"] }})
                  </div>
                </legend>
                <input
                  type="Number"
                  class="fontestyle boxbstyle"
                  v-model="_this['quantity']"
                  @update:model-value="
                    _validateThis('quantity', _this['quantity'])
                  "
                  style="max-width: 95%"
                />
              </fieldset>

              <fieldset class="col" style="border: 0px solid black">
                <legend>
                  Price

                  <div v-if="_debugObj['price']" class="boxvalidStyle text-red">
                    ( {{ _debugObj["price"] }})
                  </div>
                </legend>
                <input
                  type="Number"
                  class="col fontestyle boxbstyle"
                  v-model="_this['price']"
                  @input="_validateThis('price', _this['price'])"
                  @update:model-value="_validateThis('price', _this['price'])"
                  style="max-width: 95%"
                />
              </fieldset>

              <fieldset class="col" style="border: 0px solid black">
                <legend>
                  {{ _pageSettings.language ? "ምድብ" : "currency" }}

                  <div
                    v-if="_debugObj['currency']"
                    class="boxvalidStyle text-red"
                  >
                    ( {{ _debugObj["currency"] }})
                  </div>
                </legend>
                <select
                  outlined
                  class="col-md col-xs q-pa-none boxbstyle"
                  color="purple-12"
                  v-model="_this['currency']"
                  @input="_validateThis('currency', _this['currency'])"
                  style="max-width: 95%"
                >
                  <option
                    v-for="key in _this_Schema['currency']['enum']"
                    :key="key"
                  >
                    {{ key }}
                  </option>
                </select>
              </fieldset>
            </div>

            <div>
              <fieldset class="col" style="border: 0px solid black">
                <legend>
                  <p>{{ _pageSettings.language ? "ምድብ" : "catagory" }}</p>

                  <div
                    v-if="_debugObj['catagory']"
                    class="boxvalidStyle text-red"
                  >
                    ( {{ _debugObj["catagory"] }})
                  </div>
                </legend>
                <select
                  outlined
                  class="col-md col-xs q-pa-none boxbstyle"
                  style=""
                  color="purple-12"
                  v-model="_this['catagory']"
                  @input="_validateThis('catagory', _this['catagory'])"
                >
                  <option
                    v-for="key in _this_Schema['catagory']['enum']"
                    :key="key"
                  >
                    {{ key }}
                  </option>
                </select>
              </fieldset>
            </div>

            <div v-if="['Vehicles', 'Households'].includes(_this['catagory'])">
              <q-radio
                keep-color
                left-label
                size="md"
                v-model="_this['usage']"
                :val="usage"
                :label="usage"
                color="black"
                v-for="usage in _this_Schema['usage']['enum']"
                :key="usage"
                @update:model-value="_validateThis('usage', _this['usage'])"
              />
              <div v-if="_debugObj['usage']" class="boxvalidStyle">
                {{ _debugObj["usage"] }}
              </div>
            </div>

            <q-item-label caption> What are You Saling !</q-item-label>
            <q-separator inset />
          </fieldset>
        </q-card-section>

        <q-card-section class="column text-dark bg-white fontbstyle" v-else>
          <fieldset
            class="col fontastyle q-gutter-xs"
            style="border-radius: 5px; border: 0px solid white"
          >
            <!--legend @click="_formsMeta.description = ! _formsMeta.description" class=" text-weight-bolder">
                 Descriptions   :rules="[_valRules]"
             </legend -->
            <div class="row q-gutter-sm">
              <fieldset class="col" style="border: 0px solid black">
                <legend>
                  Quantity

                  <div
                    v-if="_debugObj['quantity']"
                    class="boxvalidStyle text-red"
                  >
                    ( {{ _debugObj["quantity"] }})
                  </div>
                </legend>
                <input
                  type="Number"
                  class="fontestyle boxbstyle"
                  v-model="_this['quantity']"
                  @update:model-value="
                    _validateThis('quantity', _this['quantity'])
                  "
                  style="max-width: 95%"
                />
              </fieldset>

              <fieldset class="col" style="border: 0px solid black">
                <legend>
                  Price

                  <div v-if="_debugObj['price']" class="boxvalidStyle text-red">
                    ( {{ _debugObj["price"] }})
                  </div>
                </legend>
                <input
                  type="Number"
                  class="col fontestyle boxbstyle"
                  v-model="_this['price']"
                  @input="_validateThis('price', _this['price'])"
                  @update:model-value="_validateThis('price', _this['price'])"
                  style="max-width: 95%"
                />
              </fieldset>
              <fieldset class="col" style="border: 0px solid black">
                <legend>
                  New Price

                  <div
                    v-if="_debugObj['discount']"
                    class="boxvalidStyle text-red"
                  >
                    ( {{ _debugObj["discount"] }})
                  </div>
                </legend>
                <input
                  type="Number"
                  class="col fontestyle boxbstyle"
                  v-model="_this['discount']"
                  @input="_validateThis('discount', _this['discount'])"
                  @update:model-value="
                    _validateThis('discount', _this['discount'])
                  "
                  style="max-width: 95%"
                />
                (Happy Hours Price)
              </fieldset>
            </div>

            <q-separator inset />
            <q-input
              class="col-md col-xs q-pa-sm"
              style=""
              outlined
              v-model="_this['header']"
              label="Name"
              @update:model-value="_validateThis('header', _this['header'])"
              stack-label
            >
              <div v-if="_debugObj['header']" class="boxvalidStyle">
                {{ _debugObj["header"] }}
              </div>
            </q-input>
            <q-input
              outlined
              v-model="_this['content']"
              @update:model-value="_validateThis('content', _this['content'])"
              label="decscriptions"
              style=""
              filled
              autogrow
            >
              <div v-if="_debugObj['content']" class="boxvalidStyle">
                {{ _debugObj["content"] }}
              </div>
            </q-input>

            <q-separator inset />
            <q-item-label caption> Notes to be displayed !</q-item-label>
            <q-separator inset />
          </fieldset>
        </q-card-section>
      </q-card>
    </dialogOne>
  </template>

  <template
    v-if="
      __thisOps == 'details' &&
      __thisOpsStatus == 'selected' &&
      !__this_foreignBoxDialog
    "
  >
    <dialogOne :isOpen="__thisOpsStatus" @emitClick0="__thisOpsStatus = $event">
      <div v-if="_this" class="row q-pa-sm">
        <div class="cardPopDetails" style="min-width: 90vw">
          <div class="row no-wrap q-gutter-sm">
            <q-img
              loading="lazy "
              style="
                min-height: 20vh;
                aspect-ratio: 2/1;
                border-radius: 5px;
                box-shadow: 5px;
              "
              :src="
                _fileAsPathIndex
                  ? _this.saleitgr[_fileAsPathIndex]
                  : _this.saleitgr[0]
              "
              class=""
            >
            </q-img>
            <div>
              <!-- <q-btn
                outline
                v-for="(item, fileIndx) in _this.saleitgr"
                @click="_fileAsPathIndex = fileIndx"
                :key="fileIndx"
                class="col-1 column transparent q-pa-none no-border"
                style="max-width: 6dvw"
              >
                <img
                  :src="item"
                  class="col fit shadow-2 transparent rounded-borders q-pa-none"
                  style="aspect-ratio: 2/1; width: 100%"
                />
              </q-btn> -->
            </div>
          </div>

          <div class="horizontalLineBlack"></div>
          <div class="horizontalLineBlack"></div>
          <div>
            <div
              class="col-auto row justify-start no-padding no-margine q-gutter-xs"
              style="border: 0px solid orange; max-height: 40px"
              v-if="_this.saleitgr.length > 1"
            >
              <div
                class="col-auto transparent row justify-end items-center"
                style="top: 0px; right: 0px"
              >
                <p style="color: grey; font-size: 0.6em">
                  {{ _this.saleitgr.length + "  Images :" }}
                </p>
                <q-btn
                  flat
                  :dense="true"
                  color="red"
                  label="Back"
                  @click="
                    _fileAsPathIndex =
                      (_fileAsPathIndex - 1 + _this.saleitgr.length) %
                      _this.saleitgr.length
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
                      (_fileAsPathIndex + 1) % _this.saleitgr.length
                  "
                  style="z-index: 99"
                />
              </div>
            </div>
          </div>

          <div style="height: 600px; width: 90vw; overflow-y: scroll">
            <div
              class="cardPopDetails-title"
              style="width: 50%; overflow: hidden"
            >
              {{ _this.header }}
            </div>

            <div style="">
              <p class="cardPopDetails-content bg-white">
                {{ _this.content }}
              </p>
            </div>

            <div class="row q-px-xs">
              <div class="col">
                <div class="cardPopDetails-meta">
                  <div class="fontcstyle">{{ _this.userName }}</div>

                  <div>
                    <b>Call Us: <q-icon name="phone" /></b>
                    <b
                      class="text-grey q-px-sm"
                      v-if="_this.phoneCode?.[1] ?? false"
                      >+{{ _this.phoneCode[1] }} {{ _this.phone }}
                    </b>
                    <b class="text-grey q-px-sm" v-else> {{ _this.phone }} </b>
                  </div>
                  <div class="textStylea" v-if="_this.location.country">
                    {{ _this.location.country + "  " }}
                    {{ _this.location.provinance + "  " }}
                    {{ _this.location.city + "  " }}
                    {{ _this.location.street + "  " }}
                  </div>
                  <div style="color: grey; font-size: 0.9em">
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
                  <div class="fontcstyle">
                    <div>Quantity</div>
                    <div
                      class="boxbstyle row justify-center"
                      style="border-radius: 7%"
                    >
                      {{ _this.isOpen ? _this.quantity : "Closed" }}
                    </div>
                  </div>
                  <div class="fontcstyle">
                    <div>Buyers #</div>
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
                    Likes
                    <div class="boxbstyle">{{ _this.likes.like }}</div>
                  </div>
                  <div class="verticalLineBlack"></div>
                  <div class="fontcstyle">
                    Buyer Rating
                    <div class="boxbstyle">{{ _this._itServiceRating }}</div>
                  </div>
                  <div class="verticalLine"></div>
                  <div class="fontcstyle">
                    trendScore
                    <div class="boxbstyle">{{ _this.trendScore ?? 0 }}</div>
                  </div>
                </div>
              </div>

              <div
                class="col-auto boxbstyle column justify-center items-center q-ma-sm"
              >
                <h2>{{ _this.price }} {{ _this["currency"] }}</h2>
                <div>Unit Price</div>
                <q-tooltip class="bg-orange fontbstyle"> Unite Price</q-tooltip>
              </div>
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

  <q-dialog v-model="_fileAsPathSlide" class="column saleitContentOps-Glass">
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
        <q-carousel-slide
          :name="imgindex"
          :img-src="imggr"
          v-for="(imggr, imgindex) in onplayRowItem['saleitgr']"
          :key="imgindex"
        />
        <template v-slot:control>
          <q-carousel-control position="bottom-right" :offset="[18, 18]">
            <q-btn
              push
              round
              dense
              color="white"
              text-color="primary"
              :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="slideFullscreen = !slideFullscreen"
            />
          </q-carousel-control>
        </template>
      </q-carousel>
    </div>
  </q-dialog>

  <!-- Dialog Windows and ... -->
  <dialogOne
    :isOpen="__this_foreignBoxDialog"
    @emitClick0="__this_foreignBoxDialog = $event"
  >
    <template v-if="__this_foreignBoxDialog == 'fromcart'">
      <div class="boxcstyle" style="padding: 3%; min-width: 30vw">
        <div>
          <div class="fontestyle">Editing on cart Item</div>
          <div class="fontdstyle">
            Order ID : {{ _this_modelOneforeign.orderID }}
          </div>
        </div>

        <div>
          set Quantity
          <buyButton
            style=""
            :quantity="_this_modelOneforeign['quantity']"
            :price="_this.netPrice"
            @decreaseButton="
              _this_modelOneforeign['quantity'] =
                parseFloat(_this_modelOneforeign['quantity'] ?? 1) - 1
            "
            @increaseButton="
              _this_modelOneforeign['quantity'] =
                parseFloat(_this_modelOneforeign['quantity'] ?? 1) + 1
            "
          >
          </buyButton>
        </div>

        <div></div>
      </div>
      <div class="row q-pa-sm fontestyle">
        <q-btn
          rounded
          class="col-grow bg-orange text-white fontestyle"
          @click="_this_foreignOperation._directBuyer('buy', false)"
          >Buy From Carts</q-btn
        >
        <!-- <q-btn rounded class="col-grow bg-green text-white"   @click="_this_foreignOperation._directBuyer('cart')">ADD to Cart</q-btn> -->
      </div>
    </template>

    <template v-else-if="__this_foreignBoxDialog == 'neworder'">
      <div
        class="boxastyle text-black"
        style="padding: 3%; min-width: 30vw"
        :set="(_this_modelOneforeign = _thisDefault_client)"
      >
        <div class="row justify-between items-center q-my-md">
          <div class="fontestyle">Setting New Order</div>
          <div class="fontbstyle">
            OrderID : {{ _this_modelOneforeign.orderID }}
          </div>
        </div>

        <div>
          <div>set Quantity</div>
          <buyButton
            style=""
            :quantity="_this_modelOneforeign['quantity']"
            :price="_this.netPrice"
            :currency="_this.currency ?? ''"
            :onstore="_this.quantity"
            @decreaseButton="
              _this_modelOneforeign['quantity'] =
                parseFloat(_this_modelOneforeign['quantity'] ?? 1) - 1
            "
            @increaseButton="
              _this_modelOneforeign['quantity'] =
                parseFloat(_this_modelOneforeign['quantity'] ?? 1) + 1
            "
          >
          </buyButton>
        </div>

        <div></div>
        <div class="boxbstyle q-my-md"></div>
      </div>

      <div class="row q-pa-sm fontestyle">
        <q-btn
          rounded
          class="col-grow bg-orange text-white fontestyle"
          @click="_this_foreignOperation._directBuyer('buy', true)"
          >Buy Now</q-btn
        >
        <!-- <q-btn rounded class="col-grow bg-green text-white"   @click="_this_foreignOperation._directBuyer('cart')">ADD to Cart</q-btn> -->
      </div>
    </template>
  </dialogOne>

  <dialogOne
    :isOpen="__this_foreignBoxFilter"
    @emitClick0="__this_foreignBoxFilter = $event"
  >
    <q-card-section
      class="column col-auto q-gutter-xs fontastyle shadow-1 bg-white q-my-sm"
    >
      <div>Search Date:</div>
      <div class="row justify-between q-gutter-sm q-px-xs">
        <div class="text-grey"></div>
        <input class="boxbstyle bg-orange" type="date" v-model="_recordDate" />
        <button @click="_recordDate = null" class="boxbstyle bg-red text-white">
          x
        </button>
        <!-- <q-btn label="Choose Date" :dense="true" color="blue" size="sm" @click="showDate = true"  ></q-btn> -->
      </div>
      <q-separator inset />
      <div>Show Store:</div>
      <div
        class="row justify-between q-gutter-sm q-px-xs"
        v-for="(item, kkey) in _storeStatus"
        :key="kkey"
      >
        <div class="text-black">{{ kkey }}</div>
        <div>
          <q-toggle size="xs" v-model="_storeStatus[kkey]" val="xs" />
        </div>
      </div>
    </q-card-section>

    <q-card-section
      class="column col-auto q-gutter-xs fontastyle shadow-1 bg-white"
    >
      <div>Serve Status:</div>
      <div
        class="row justify-between q-gutter-sm q-px-xs"
        v-for="(sstatus, kkey) in _serveStatus"
        :key="kkey"
      >
        <div class="text-black">{{ kkey }}</div>
        <div>
          <q-toggle size="xs" v-model="_serveStatus[kkey]" val="xs" />
        </div>
      </div>
    </q-card-section>
  </dialogOne>

  <templat
    v-if="
      __this_foreignBoxIndex != null &&
      __this_foreignBoxOps == 'view' &&
      !__this_foreignBoxDialog
    "
  >
    <dialogOne
      :isOpen="__this_foreignBoxOps"
      @emitClick0="__this_foreignBoxOps = $event"
      style="height: 100vh; overflow-y: auto"
    >
      <div
        class="col-grow column bg-white q-pa-md"
        style="height: 100vh"
        v-if="Object.keys(_this).length"
      >
        <div class="col-auto column" style="">
          <div class="">
            <button
              class="fontcstyle transparent"
              style="padding-right: 4px; margin: 0px; border: 0px"
              @click="__this_foreignBoxOps = null"
            >
              <b>&LeftArrow;</b>
            </button>
          </div>
          <q-item class="items-start">
            <q-item-section top avatar>
              <q-avatar color="orange" text-color="white" icon="phone" />
            </q-item-section>

            <q-item-section class="fontastyle">
              <q-item-label>{{ _this.fphone }}****</q-item-label>
              <q-item-label
                caption
                v-if="typeof _this.fupdatedAt == 'object'"
                class="text-grey row q-gutter-xs"
              >
                <div>Last Updated :</div>
                <div v-if="_this.fupdatedAt?.days ?? ''">
                  {{ _this.fupdatedAt.days }} D,
                </div>
                <div v-if="_this.fupdatedAt?.hours ?? ''">
                  {{ _this.fupdatedAt.hours }} H,
                </div>
                <div v-if="_this.fupdatedAt?.minutes ?? ''">
                  {{ _this.fupdatedAt.minutes }} M
                </div>
                <div>ago</div>
              </q-item-label>
              <q-item-label class="text-grey row q-gutter-xs" caption v-else>
                {{ _this.fupdatedAt }}
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption> </q-item-label>
              <q-badge
                class="q-pa-sm text-bold fontastyle transparent"
                v-if="_this.discount ?? false"
              >
                <q-item-label class="text-strike text-orange">{{
                  _this.price
                }}</q-item-label>
                <b>{{ _this.discount }} {{ _this.currency ?? "" }}</b>
              </q-badge>
              <q-badge class="q-pa-sm fontestyle" color="orange" v-else>
                {{ _this.price }} {{ _this.currency ?? "" }}
              </q-badge>
              <div class="text-orange">
                <q-rating v-model="_this._itServiceRating" :max="5" size="xs" />
              </div>
            </q-item-section>
          </q-item>
        </div>

        <div class="col-auto">
          <q-img
            loading="lazy"
            :src="
              _fileAsPathIndex
                ? _this.saleitgr[_fileAsPathIndex]
                : _this.saleitgr[0]
            "
            spinner-color="orange"
            class="column rounded-borders shadow-1"
            style="
              width: 90%;
              height: 20vh;
              border-radius: 5px;
              aspect-ratio: 2/1;
            "
          >
          </q-img>
        </div>

        <div class="col-grow row q-gutter-sm" style="">
          <q-item class="col-11 column q-gutter-sm">
            <div
              class="col-auto row justify-start"
              style="
                height: 40px;
                top: 0px;
                right: 0px;
                overflow-y: scroll;
                max-height: 20vh;
              "
              v-if="_this.saleitgr.length > 1"
            >
              <q-btn
                flat
                :dense="true"
                color="red"
                label="Back"
                @click="
                  _fileAsPathIndex =
                    (_fileAsPathIndex - 1 + _this.saleitgr.length) %
                    _this.saleitgr.length
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
                    (_fileAsPathIndex + 1) % _this.saleitgr.length
                "
                style="z-index: 99"
              />
            </div>

            <div
              class="col-auto column q-gutter-sm fontbstyle"
              style="overflow-y: scroll; max-height: 20vh"
            >
              <q-item-section style="color: blue">
                Item Details
              </q-item-section>

              <q-item-section class="rounded-borders q-pa-xs shadow-1">
                <q-item-label>{{ _this["header"] }}</q-item-label>
                <q-item-label caption>{{ _this["description"] }} </q-item-label>
              </q-item-section>
              <div class="q-gutter-xs row q-pa-sm">
                <q-item-section class="items-center rounded-borders shadow-1">
                  <q-item-label>Available Quantities</q-item-label>
                  <q-item-label class="text-grey">
                    {{ _this["quantity"] ? _this["quantity"] : "Sold Out" }}
                  </q-item-label>
                </q-item-section>

                <q-item-section class="items-center rounded-borders shadow-1">
                  <q-item-label>Total Buyers</q-item-label>

                  <q-item-label class="text-grey row justify-center">
                    {{ _this["tClient"] }}
                  </q-item-label>
                </q-item-section>
              </div>
            </div>
            <div
              class="col column q-gutter-sm"
              v-if="__this_foreignBoxIndex != null"
            >
              <q-separator inset />

              <div class="fontbstyle text-orange">Your Order Details</div>
              <div class="q-gutter-xs row">
                <q-item-section
                  class="fontbstyle items-center rounded-borders shadow-1"
                >
                  <q-item-label>Quantity</q-item-label>
                  <q-item-label caption>{{
                    _this_modelOneforeign["quantity"]
                  }}</q-item-label>
                </q-item-section>

                <q-item-section
                  class="fontbstyle items-center rounded-borders shadow-1"
                >
                  <q-item-label>Total Price</q-item-label>
                  <q-item-label caption>{{
                    _this_modelOneforeign["price"]
                  }}</q-item-label>
                </q-item-section>

                <q-item-section
                  class="fontbstyle column items-center rounded-borders shadow-1"
                >
                  <q-item-label></q-item-label>
                  <q-item-label>
                    {{ _this_modelOneforeign.fcreatedAt }}
                  </q-item-label>
                </q-item-section>
              </div>

              <q-item-section class="fontbstyle rounded-borders">
                <q-item-label>Serve Status</q-item-label>
                <q-item-label
                  caption
                  v-if="_this_modelOneforeign['served'] == 'Requested'"
                  >{{ _this_modelOneforeign["served"] }}</q-item-label
                >
                <q-item-label caption v-else style="color: orange">{{
                  _this_modelOneforeign["served"]
                }}</q-item-label>
              </q-item-section>
              <q-item-section class="boxbstyle rounded-borders">
                <q-item-label>Notes</q-item-label>
                <q-item-label caption>{{
                  _this_modelOneforeign["description"]
                }}</q-item-label>
              </q-item-section>
            </div>
          </q-item>

          <q-item
            class="row col justify-center q-gutter-sm"
            style="max-height: 5vh; width: 100%; overflow-y: scroll"
            v-if="_this_modelOneforeign?.quantity ?? false"
          >
            <q-btn icon="numbers" no-caps color="green"
              >Qts {{ _this_modelOneforeign["quantity"] }}
            </q-btn>
            <q-btn color="orange"
              >{{ _this_modelOneforeign["price"] }} {{ _this.currency }}</q-btn
            >
          </q-item>
        </div>

        <div
          class="flex flex-center q-gutter-sm q-pa-sm text-black"
          v-if="_this.isOpen"
        >
          <q-btn
            icon="edit"
            color="green"
            no-caps
            rounded
            @click="__this_foreignBoxDialog = 'fromcart'"
            :dense="true"
            v-if="_this_modelOneforeign.store == 'cart'"
          >
            Order Saved
            <q-tooltip> Edit On Cart Items !</q-tooltip>
          </q-btn>

          <template v-if="__this_foreignBoxOps == 'view'">
            <q-btn
              icon="add"
              color="orange"
              rounded
              :dense="true"
              @click="__this_foreignBoxDialog = 'neworder'"
              style="background-size: 5px"
            >
              New Order
            </q-btn>
          </template>
        </div>
      </div>
      <div class="col flex flex-center fontbstyle" v-else>
        <div v-if="__thisOpsStatus">
          <q-spinner color="primary" size="3em" :thickness="2" />
          <div style="font-weight: lighter; font-size: 12px">Loading</div>
        </div>
        <div v-else style="font-size: 43px; font-weight: bolder; color: red">
          Select Order for Details.
        </div>
      </div>
    </dialogOne>
  </templat>

  <templat
    v-if="__this_foreignBoxIndex != null && __this_foreignBoxOps == 'edit'"
  >
    <dialogOne
      :isOpen="__this_foreignBoxOps"
      @emitClick0="__this_foreignBoxOps = $event"
      style="height: 12vh; top: 83vh"
    >
      <b class="fontastyle text-white">
        Order Identification : {{ _this_modelOneforeign.orderID }}
      </b>

      <div class="col row q-gutter-sm" style="width: 80vw">
        <button class="col fontestyle" @click="__this_foreignBoxOps = null">
          close
        </button>
        <button
          class="col fontestyle text-red"
          @click="_this_foreignOperation._remove(__this_foreignBoxIndex)"
        >
          Delete
        </button>
      </div>
    </dialogOne>
  </templat>
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

  <q-page class="row rounded-borders fontastyle fit">
    <div
      class="col-auto q-gutter-xs fixed-bottom z-top column items-end"
      style="left: 90vw"
    >
      <!------------->
      <!--- No Data Founded, but keep listnening till we founde-->
      <div class="q-pa-sm" v-if="syncerrorData">
        {{ syncerrorData }}
      </div>
      <!---Rows is locked but, Update founded-->
      <div
        class="q-pa-sm text-bold rounded-borders fontastyle bg-blue"
        v-if="syncListenerSmsint"
      >
        <div>{{ syncListenerSmsint }}</div>
        <div>Update Now</div>
      </div>
      <!-------------------->
      <!------loading update/create items-->
      <div
        class="q-pa-sm text-bold rounded-borders fontastyle"
        v-if="_onplayRowItemOpsStatus"
      >
        Still Loading...
      </div>
      <!------loading comments/client Operation-->
      <div
        class="text-bold rounded-borders fontastyle"
        v-if="_onplayRowItemsideBoxOpsStatus"
      >
        {{ _onplayRowItemsideBoxOps == "comments" ? "commenting.." : "Buying" }}
      </div>

      <!---custome loading(operation status)-->
      <!-- <div class=" text-bold rounded-borders bg-grey" v-if='Loading'> {{Loading}}  </div>
          <div class=" text-bold rounded-borders bg-green" v-if='DoneMessag'>  {{ DoneMessag}}  </div>
          <div class="  text-bold rounded-borders bg-cyan" v-if='KnowthisMessage'> {{ KnowthisMessage}}  </div>
          <div class="  text-bold rounded-borders bg-red" v-if='WarnthisMessage'> {{ WarnthisMessage}}   </div> -->
    </div>

    <div
      class="col-grow column rounded-borders fontastyle q-gutter-xs q-pa-none q-ma-none bg-orange"
      style="height: 88svh"
    >
      <!---Quantity Tags-->
      <div
        class="col-auto q-gutter-sm row q-pa-xs justify-between transparent q-ma-none justify-between"
        style="backdrop-filter: blur(5000px)"
      >
        <div
          v-if="screenSize == 'Large'"
          class="col-auto row q-gutter-xs column justify-between items-center layout-Glass"
        >
          <div class="row q-gutter-none items-center">
            <q-avatar icon="phone" />
            <div>{{ Objprops._profile.phone }}</div>
          </div>
          <div class="text-white">
            <q-avatar>
              <img :src="Objprops._profile.profile[0]" />
            </q-avatar>
            <div class="fontastyle">
              # {{ Objprops._profile.name }} {{ Objprops._profile.lastName }}
            </div>
          </div>
          <div class="fontestyle text-white">
            <div>My Shops</div>
          </div>
        </div>

        <div class="col-auto column q-gutter-xs text-black">
          <!--q-date v-model="date" /-->
          <button class=" "><q-icon name="home" /></button>

          <button class="fontbstyle" @click="__this_foreignBoxFilter = true">
            <q-icon name="filter" />
          </button>
        </div>

        <div class="col q-gutter-xs row q-pa-none">
          <div class="col-auto box0style fontastyle q-gutter-xs">
            <div class="">Total Quantity</div>

            <div class="row q-gutter-none box01style rounded-borders">
              <div class="q-pa-xs">{{ storeItems["buy"] }}</div>
              <div class="col-grow q-pa-xs">Bought</div>
            </div>
            <div class="row row q-gutter-none box01style rounded-borders">
              <div class="q-pa-xs">{{ storeItems["cart"] }}</div>
              <div class="q-pa-xs">On Cart</div>
            </div>
          </div>

          <!---Price Tags-->
          <div class="col q-gutter-xs items-top row q-pa-none">
            <div class="col-auto box0style fontastyle q-gutter-xs">
              <div class="">Total Budget</div>
              <div class="row flex flex-center col-grow q-gutter-xs fontbstyle">
                <div>{{ totalPrice }}</div>
                <div>{{ _this?.currency ?? "" }}</div>
              </div>
            </div>
          </div>
          <div class="col q-gutter-xs items-center fontcstyle row q-pa-none">
            Your Order Lists
          </div>
        </div>
      </div>

      <div class="col column q-pa-none q-ma-none">
        <!-- For enabling common reactivity -->
        <!-- <q-table
                               style="height:0px;width: 0px;visibility: hidden;"
                               flat bordered
                              :rows="_this_modelOneRows"
                              :columns="columns"
                                      ></q-table>  {{  _this_modelOneRows.length }} -->

        <!------------------------------ ioio ----->
        <div
          class="col q-pa-none column bg-white"
          v-if="_this_modelOneRows && (_this_modelOneRows.length ?? false)"
        >
          <q-table
            flat
            bordered
            :rows="_this_modelOneRows"
            :columns="_this_modelOneColumns"
            :filterMethod="_thisFiltering"
            v-model:filter="filter"
            :inFullscreen="true"
            class="col column"
            card-class="text-brown"
            color="white"
            no-data-label=" "
            :rows-per-page-options="[0]"
            :visible-columns="visibleColumns_client"
            virtual-scroll
            row-key="id"
            rowIndex="true"
            style="
              background-color: whitesmoke;
              backdrop-filter: blur(1000px);
              max-width: 100vw;
            "
            hide-pagination
            hide-top
            hide-bottom
          >
            <template #header-cell="props">
              <q-td
                :props="props"
                class="q-pa-none"
                style="
                  background-color: orange;
                  backdrop-filter: blur(850px);
                  padding-left: 0px;
                  background-color: whitesmoke;
                  z-index: 100;
                "
              >
                <div
                  class="justify-center q-ma-sm row fontastyle bg-orange"
                  style="
                    backdrop-filter: blur(850px);
                    padding: 0px;
                    margin: 0px;
                  "
                >
                  <p>{{ props.col.name }}</p>
                </div>
              </q-td>
            </template>

            <template v-slot:body="props">
              <q-tr
                :props="props"
                class="q-gutter-sm col-shrink q-pa-none"
                style=""
                :style="
                  props.rowIndex == __this_foreignBoxIndex
                    ? 'background-color:orange'
                    : 'background-color:white'
                "
              >
                <td
                  :props="props"
                  style="font-size: 0.6em; text-align: justify"
                  class="text-bold text-start fontastyle q-mx-sm"
                  :class="
                    object.name == 'name' ? 'text-center' : 'text-center '
                  "
                  v-for="object in props.cols"
                  :key="object.name"
                >
                  <!--Styling Tabs-->
                  <div v-if="object.name == 'served'" class="fontcstyle">
                    <div
                      :style="
                        props.row[object.name] == 'Requested'
                          ? 'color:green'
                          : 'color:grey'
                      "
                    >
                      <p>{{ props.row[object.name] }}</p>
                    </div>
                  </div>
                  <!---------------Store columns-->
                  <div v-else-if="object.name == 'store'">
                    <q-badge
                      color="orange"
                      v-if="props.row[object.name] == 'buy'"
                    >
                      <p>Ordered</p></q-badge
                    >
                    <q-badge color="teal" v-else><p>Saved</p></q-badge>
                  </div>

                  <!---------------Descriptions columns-->
                  <div v-else-if="object.name == 'description'">
                    <q-btn
                      :dense="true"
                      rounded
                      class="fontastyle"
                      no-caps
                      size="xs"
                      color="blue"
                      icon="details"
                      @click="
                        _this_foreignOperation.selectedIndex_RowDetail(
                          props.row['saleitID'],
                          props.rowIndex,
                          'view'
                        )
                      "
                    />
                    <q-card
                      v-if="__this_foreignBoxIndex == props.row.id"
                      class="fixed-bottom z-top fontastyle flex flex-center"
                      style="max-width: 30vh; left: 1rem; bottom: 1rem"
                    >
                      <p>{{ props.row.description }}</p>
                    </q-card>
                  </div>

                  <!---------------time _this_modelOneColumns-->

                  <div
                    v-else-if="object.name == 'time'"
                    class="fontastyle text-grey"
                  >
                    <p>{{ props.row.fcreatedAt }}</p>
                  </div>
                  <div v-else-if="object.name == 'action'" class="q-gutter-xs">
                    <q-btn
                      size="sm"
                      :dense="true"
                      flat
                      icon="more_vert"
                      @click="
                        _this_foreignOperation.selectedIndex_RowDetail(
                          props.row.saleitID,
                          props.rowIndex,
                          'edit'
                        )
                      "
                    >
                    </q-btn>
                  </div>
                  <!---------------Others _this_modelOneColumns-->

                  <!---------------Others columns-->

                  <div v-else class="fontastyle">
                    <p>{{ props.row[object.name] }}</p>
                  </div>
                </td>
              </q-tr>
            </template>
          </q-table>
        </div>

        <!-- sckelton of single_content-->
        <div
          class="col q-py-md fit q-gutter-md flex flex-center column"
          style=""
          v-else
        >
          <div style="width: 80%" class="col-grow q-pa-xs row q-gutter-xs">
            <q-skeleton class="col-grow flex flex-center"
              >Searching for your shops
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

    <!----------------------LiveDATA Banner-->
    <!------------Zooming Level Adjuster Sticky-------------------------->
  </q-page>
</template>

<script setup>
//_____________________________________________Modules Definitions
//-------------------------------------------------------------Importing System Modules
import {
  ref,
  reactive,
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
// import { saleitClientSchema } from "@/composables/schemas/saleitSchemas";
// import { saleChatSchema } from "@/composables/schemas/chatSchemas";

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

import buyButton from "src/components/buttons/buyButton.vue";
import closeButton from "src/components/buttons/closeButton.vue";

import confirmButton from "src/components/buttons/confirmButton.vue";
let confirmObj = ref(null);
let confirmMessage = ref("Are You Sure ?");

import dialogOne from "src/components/dialogs/dialogOne.vue";

import debugCard from "@/components/debugCards.vue";
import useDebugMixin from "@/composables/mixins/debugMixin";
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
import useStatusMixin from "@/composables/mixins/statusMixin";
const {
  status_KnowthisMessage,
  //----------returning values
  status_timerInformthis,
} = useStatusMixin();

import usefileMixin from "@/composables/mixins/fileserviceMixin";
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
  //---
  //--------- main schema
  columnsM: { type: Object, default: () => ({}) },
  _thisDefaultM: { type: Object, default: () => ({}) },
  visibleColumnsM: { type: Object, default: () => ({}) },
});

import useThisMixin from "src/composables/mixins/thisAndForeignMixin";
var {
  //----------//-- settings
  _is_modelOneOwner,
  _is_this_netPrice,
  _is_this_open,
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
  __this_foreignBoxFilter,
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

import useDefaulMixin from "@/composables/mixins/schemaDefaultingMixin";
let {
  Objprops_,
  //----------------functions
  _allColumnName,
  _rolesColumn,
  visibleColumn,

  _allColumnNames,
  _rolesColumns,
  visibleColumns,

  // modal_iss,
  // //------preparing the main default and table_design.
  // _this_Defaulting,

  //------preparing the foreign default and table_design
  foreign_Columns,
  _this_foreignDefaulting,
  //------
  // visible_clientColumns,
} = useDefaulMixin();

//===========================================================================////////////////////
//---------Main Model ( columns(visible_,all_),default_Values,),(thisRows,),(),
import useMainMixin from "@/composables/mixins/thisMainMixin";
let {
  // visibleColumns,
  //---------settings
  // Objprops_,
  _thisModel,
  _this_Schema,

  _this_Rows,
  // status_thisDetail,
  _this,

  columns,
  _this_Query,
  _this_RowsStatus,
  //-----------//-- returning values
  _thisDefault,
  //------
} = useMainMixin();

import useClientMixin from "@/composables/mixins/thisClientMixin";
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

import useChatMixin from "@/composables/mixins/thisChatMixin";
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

import { useRowFilter } from "@/composables/filters/cartfilter";
import { screenSize } from "src/services/utils";
var {
  totalPrice,
  storeItems,
  serveItems,
  _enableRowFilter,
  _thisFiltering,
  _filteredRow,
} = useRowFilter();
_enableRowFilter.value = true;

const metaData = {
  // sets document title
  title: "cart",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - `,
  // JS tags
  icon: "/icons/qimage.png",
  script: {},
};
useMeta(metaData);
//----STORE & SERVICES
thisSchemaPath.value = "saleitSchemas";
thisSchemaFile.value = "saleitSchema";import dynamicModular from "../../composables/utilServices/dynamicModule.js";
dynamicModular(thisSchemaPath.value, thisSchemaFile.value).then((m)=>{
if(m) _this_Schema.value = m
  return true
})
//---foreignKeyed Defaulting (Scheam)==== PreDefined Models
_thisModel.value = "saleitClient"; // the Vue_Page_DataModel (Listing Collection Name)
var _thisModelHeader = ref(_thisModel.value + " Managment"); // the Vue_Page_Data_Headers(Descriptions...)
// _this_Schema.value = saleitSchema;

const _thisService = thisStore();
const _thisModelService = saleitStore();

const modelOneService = saleitClientStore();
const modelTwoService = salechatStore();

const _thisapiUrl = "/saleitapi/saleit";

//==========Global Variables for Data

let priceFilter = { gt: false, lt: false, eq: false };
let _serveStatus = reactive({ Requested: true, Queed: true, Served: true });
let _storeStatus = reactive({ cart: true, buy: true });
let _recordDate = ref(null);
//-----searaching on/off
//------------Setting up all the search attributes (is given to the table Data...)
//just list out all possible comparison logics against every row datas
const filter = computed(() => {
  console.log("searchig", Objprops.lytSearchRow);
  return {
    search: Objprops.lytSearchRow,
    //------(Served Columns(Options))
    //Requesting:_serveStatus.Requesting,
    Requested: _serveStatus.Requested,
    Queed: _serveStatus.Queed,
    Served: _serveStatus.Served,
    //-------store Columns (options)
    cart: _storeStatus.cart,
    buy: _storeStatus.buy,
    // //----------
    recordDate: _recordDate.value,
    //-------
    priceFilter,
  };
});

// let status_dialogBuyer = ref(false)
//================================================================================/////////////
// Objprops_.value =Objprops ?? false
let _this_acctype = ref({});
Objprops_.value = Objprops;
_this_acctype = computed(() => {
  if (Objprops._acctype ?? false) {
    //-----------
    return Objprops._acctype[_thisModel.value] ?? null;
  } else {
    return null;
  }
});
let columnswatcher = ref(null);
watch(columnswatcher, (_nowValue, ov) => {
  if (_nowValue ?? false) {
    //--------------
    columns.value = _nowValue ?? null;
    //-----------
    _this_foreignDefault();
    //---------------
    return true;
  } else {
    return null;
  }
});
columnswatcher.value = Objprops.columnsM;
// columns = computed(() => {
//   if (Objprops.columnsM ?? false) {
//     //-----------
//     _this_foreignDefault();
//     //--------------
//     return Objprops.columnsM ?? null;
//   } else {
//     return null;
//   }
// });
invisibleColumns_client.value.push(
  "orderID",
  "paymentMethod",
  "saleitID",
  "confirmID",
  "currency",
  "served"
);
async function _this_foreignDefault() {
  //-------<<<<>>>>-------Preparing this_model role_schemas
  _this_modelOneSchema.value["time"] = { default: "" };
  _this_modelOneSchema.value["action"] = { default: "" };
  let _defaulting_client = await foreign_Columns(
    _this_modelOneSchema.value,
    invisibleColumns_client.value
  );
  _this_modelOneColumns.value = _defaulting_client[0];
  visibleColumns_client.value = _defaulting_client[1];
  await _clientDefaults(_defaulting_client[1]);
  //--------------------------------
  return false;
}

async function _clientDefaults(_this_modelOneModels) {
  _thisDefault_client.value = await _this_foreignDefaulting(
    _this_modelOneModels
  );
  _thisDefault_client.value["orderID"] = await _genOrderID();
  _thisDefault_client.value["userID"] = Objprops._profile.id;
  _thisDefault_client.value["quantity"] = 1;
  _thisDefault_client.value["served"] = "Requesting";
  _thisDefault_client.value["price"] = 0;
  //-------------------------(Defined Schema-1)
  return true;
}

_thisDefault = computed(() => {
  if (Objprops._thisDefaultM ?? false) {
    return Objprops._thisDefaultM ?? null;
  } else {
    return null;
  }
});
visibleColumns = computed(() => {
  if (Objprops.visibleColumnsM ?? false) {
    return Objprops.visibleColumnsM ?? null;
  } else {
    return null;
  }
});
// _thisMedia.value = Objprops._thisMedia2;
//------- Objprops.lytSearchRow
let _pageSettings = ref({ geoSearch: { state: false, value: "off" } });

watch(Objprops._pageSetting, (_nowValue, ov) => {
  _pageSettings.value = Object.assign(_pageSettings.value, _nowValue);
  return true;
});
watch(_filteredRow, (_nowValue, ov) => {
  Objprops.lytSearchRow ?? false ? _this_modelOneQuery("lytSearchRow") : "";
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
    _is_chatOwner.value = _nowRows["userID"] == Objprops._profile.id;
    _is_this_open.value = _nowRows["quantity"] && _nowRows["price"];
    _is_this_netPrice.value = parseInt(
      _nowRows["discount"] ? _nowRows["discount"] : _nowRows["price"]
    );
  } catch {
    [_is_modelOneOwner.value, _is_this_open.value, _is_this_netPrice.value] = [
      false,
      false,
      false,
    ];
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

//==============================================------------------------------------
let enableflscreen = ref(true);
//--------------
//==========================================DEfaulting && Scheam Generations====Start
//========<><><><><><==================Create Default Schemas

//==========-----------Generating====The Schematic Models

watch(columns, (_nowRows, ov) => {
  return true;
}); // let _initCol = columns.value

//==========================================DEfaulting && Scheam Generations====End
///======

//---------form Validation_Rules
//===============================================-----------------------------------
//-----------------------DATAs ROWs--------------
// let _contentingliveStatus=ref(20000)
//-----------------------Secondary DATAs ROWs--------------
//--------------------------
//--------------------------------ROWS_SCHEMATIC FORMS

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

// _this_Query.value = {}; //_trend:'', catagory:'',usage:'New',content:''

//===============================QUERY_BUILDIMG+++START
//==============Q1
var sync_thisInstante = "";
//==============Q1
async function _this_modelOneQuery() {
  // clearInterval(sync_thisInstante);
  modelOneService.set_syncLock(true);

  //-------------------- Reseting Rows
  set_this_foreign(null, null);
  // __this_foreignBoxIndex.value = null;
  // __this_foreignBoxOpsStatus.value = true;
  // _this_modelOneRows.value = []; //mean waiting result
  // _clientQuery.value={}
  //---------Query Building
  //Content Owner is on client_link(show all)
  // if (!_is_modelOneOwner.value) {
  //   _modelOneQuery.value["userID"] = Objprops._profile.id;
  // }
  _modelOneQuery.value["userID"] = Objprops._profile.id;
  // _modelOneQuery.value["saleitID"] = _this.value["id"] ?? "";
  // _modelOneQuery.value["store"] = "buy";
  //-------------------- Fetching Queried Rows
  // _this_modelOneRows_Sync();
  // let _rows = await Fetch_this(modelOneService, _modelOneQuery.value);
  _modelOneQuery.value["queryOperator"] = "-and"; //_queryOperator

  // if (_rows) {
  //   // _this_modelOneRows.value = _rows;
  // }
  // await Sync_this(modelOneService, _modelOneQuery.value);
  let _rows = await Fetch_this(modelOneService, _modelOneQuery.value);
  if (_rows) {
    _this_modelOneRows.value = _rows;
  }
  //-------------------- Preparing Default Rows ( New Row Skeltons)
  _this_modelOneforeign.value = Object.assign({}, _thisDefault_client.value);
  // _this_modelOneforeign.value['saleitID']=_this.value['id']  //----------- contentIDs
  _this_modelOneforeign.value["orderID"] = await _genOrderID();
  return true;
}

//===CHAT_QUERY=========================(Requesting Fetch)
async function _this_modelTwoQuery() {
  //-----------------Reseting Rows
  _this_modelOneRows.value = null; //mean waiting result
  //-------------------- Reseting Rows
  // await set_this_foreign("comments", null);
  //-----------Building Queries
  if (!_is_modelTwoOwner.value) {
    // _chatQuery.value["userID"] = Objprops._profile.id;
  }
  _chatQuery.value["saleitID"] = _this.value["id"];
  //-----------------Fetching Queried Rows
  _chatQuery.value["queryOperator"] = "-and"; //_queryOperator

  // _this_modelTwoRows_Sync()
  let _rows = await Fetch_this(modelTwoService, _chatQuery.value);
  if (_rows) {
    _this_modelTwoRows.value = _rows;
    set_this_foreign(__this_foreignBoxOps.value, null);
  }
  //----------------Preparing Default Rows (New Row Skelton)
  return true;
}
//==============Q3

//---------------ACTIVE Operating on Row
//====================ROW OPerations================
async function set_this(Ops = null, rowIndex = null, stopSync = null) {
  if (stopSync) {
    stopSync.set_syncLock(true);
    // clearInterval()
  }
  //----------Must Reseting Variable _ In every calls
  // [
  _fileAttributeName.value = null;
  _fileAsPathIndex.value = null;
  __thisBox.value = null;
  __thissubOps.value = null;
  __thissubOpsStatus.value = null;
  // ] = null;
  //------------ oprationa status ( new existing, set for existed value or default('selected'))
  __thisOpsStatus.value = __thisOpsStatus.value ? __thisOpsStatus.value : null;
  //------------Operational Variable Setting
  __thisIndex.value = rowIndex;
  __thisOps.value = Ops;
  //------------Operational Variable _ Status Managment
  //--------Injecting _Updating New Data   [[[ for Default / New Item]]]
  if (rowIndex == null) {
    _this.value = Object.assign({}, _thisDefault.value);
    _this.value["geolocation"] = Objprops._profile.geolocation;
    _this.value["location"] = Objprops._profile.location;
    _this.value["currency"] = Objprops._profile.currency ?? "";
    //--------
    _this.value["userID"] = Objprops._profile.id;
    _this.value["phoneCode"] = Objprops._profile.phoneCode;
    _this.value["phone"] = Objprops._profile.phone;
  } else {
    try {
      _this.value = Object.assign({}, _this_Rows.value[rowIndex]);
    } catch {}
  }
  return true;
}

async function set_this_foreign(foreignOps, _foreignIndex, stopSync = null) {
  if (stopSync) {
    stopSync.set_syncLock(true);
  }
  //----------Must Reseting Variable _ In every calls
  // [
  __this_foreignBox.value = null;
  __this_foreignBoxDialog.value = null;
  __this_foreignBoxsubOps.value = null;
  // ] = [null, null, null];
  //------------ oprationa status ( new existing, set for existed value or default('selected'))
  __this_foreignBoxOpsStatus.value = __this_foreignBoxOpsStatus.value
    ? __this_foreignBoxOpsStatus.value
    : null;
  //------------Operational Variable Setting
  __this_foreignBoxIndex.value = _foreignIndex; //? _foreignIndex : null;
  __this_foreignBoxOps.value = foreignOps; //__thisOps.value; //diable andy operations
  //------------Operational Variable _ Status Managment
  try {
    if (__thisOps.value == "comments") {
      //------------ Main Data Sckeltons
      //--------Injecting _Updating New Data   [[[ for Default / New Item]]]
      if (_foreignIndex == null) {
        _this_chatforeign.value = Object.assign({}, _thisDefault_chat.value);
        _this_chatforeign.value["userID"] = Objprops._profile.id;
        _this_chatforeign.value["saleitID"] = _this.value?.["id"] ?? "";
      } else {
        _this_chatforeign.value = Object.assign(
          {},
          _this_modelTwoRows.value[_foreignIndex]
        );
      }
    } else {
      //--------Injecting _Updating New Data   [[[ for Default / New Item]]]
      if (_foreignIndex == null || __thisOps.value == "details") {
        _this_modelOneforeign.value = Object.assign(
          {},
          _thisDefault_client.value
        );

        _this_modelOneforeign.value["userID"] = Objprops._profile.id;
        _this_modelOneforeign.value["phoneCode"] = Objprops._profile.phoneCode;
        //---------
        _this_modelOneforeign.value["currency"] = _this.value.currency;
        _this_modelOneforeign.value["location"] = _this.value.location;
        _this_modelOneforeign.value["geolocation"] = _this.value.geolocation;
        _this_modelOneforeign.value["saleitID"] = _this.value?.["id"] ?? "";
        _this_modelOneforeign.value["orderID"] = await _genOrderID();
      } else {
        try {
          _this_modelOneforeign.value = Object.assign(
            {},
            _this_modelOneRows.value[_foreignIndex]
          );
        } catch {}
      }
    }
  } catch {}
  return true;
}

const _resetBoth = async function (
  resetforeign = null,
  resumeSync = null,
  resumeSync2 = null
) {
  //reset_default if same_index and Ops occured
  try {
    await set_this(resetforeign, null);
  } catch {}
  try {
    await set_this_foreign(resetforeign, null);
  } catch {}
  if (resumeSync) {
    resumeSync.set_syncLock(false);
  }
  if (resumeSync2) {
    resumeSync2.set_syncLock(true);
  }
  return true;
};
//__this_foreignBoxOps
const ifRowDoublePressed = async function (_thisindex, _thisOps) {
  let _existed_this = __thisIndex.value == _thisindex;
  if (_thisindex == null || (_existed_this && __thisOps.value == _thisOps)) {
    await set_this(_thisOps, null, _thisModelService);
    await set_this_foreign(
      null,
      null,
      _thisOps == "clients" ? modelOneService : ""
    );
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
    (_existed_this && __this_foreignBoxOps.value == _foreignOps)
  ) {
    await set_this(_thisOps, null, _thisModelService);
    await set_this_foreign(
      null,
      null,
      _thisOps == "clients" ? modelOneService : ""
    );
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
    _thisforeignOps = null,
    _thisOps = null
  ) => {
    __this_foreignBoxOpsStatus.value = _thisforeignOps;
    //---------- IS Duplicated Actions
    if (
      await ifForeignDoublePressed(_foreignIndex, _thisforeignOps, _thisOps)
    ) {
      return false;
    }
    //---------- IS Duplicated Actions
    _thisService.set_syncLock(true);
    await set_this_foreign(_thisforeignOps, _foreignIndex, modelOneService);
    //---
    __this_foreignBoxOps.value = _thisforeignOps;
    return true;
  },
  //---Enabling Array_Index_For Operations (Select_Index)_For ---Editing:Deleting--Applying--
  selectedIndex_RowDetail: async (
    _thisID,
    _foreignIndex = null,
    _thisforeignOps = null
  ) => {
    let _thisOps = "clients";
    __this_foreignBoxOps.value = _thisforeignOps;
    //---------- IS Duplicated Actions
    if (
      await ifForeignDoublePressed(_foreignIndex, _thisforeignOps, _thisOps)
    ) {
      return false;
    }
    //---------- IS Duplicated Actions
    __thisIndex.value = 0;
    await Fetch_this(_thisModelService, { id: _thisID }).then(async (res) => {
      if (res) {
        _this_Rows.value[__thisIndex.value] = res[__thisIndex.value];
        await set_this(_thisOps, __thisIndex.value);
        await set_this_foreign(_thisforeignOps, _foreignIndex);
      } else {
      }
    });
    // __this_foreignBoxIndex.value = _foreignIndex;
    //----Defaulting foreign Links for main
    return true;
  },
  //-----------Operations on selected array
  _remove: async () => {
    if (__thisOps.value == "comments") {
      let fthis = { id: _this.value["id"], comments: _this_chatforeign.value };
      fthis["thisOps"] = __thisOps.value;
      fthis["thisSubOps"] = "delete";

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
      set_this(__thisOps.value, __thisIndex.value);
      set_this_foreign(__thisOps.value, null);
    } else {
      let fthis = {
        id: _this.value["id"],
        clients: _this_modelOneforeign.value,
      };
      fthis["thisOps"] = __thisOps.value;
      fthis["thisSubOps"] = "delete";

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
      await set_this(__thisOps.value, __thisIndex.value);
      await set_this_foreign(null, null);
    }
    return true;
  },
  _update_foreign: async () => {
    __this_foreignBoxIndex.value = null;
    if (__thisOps.value == "comments") {
      let fthis = { id: _this.value["id"], comments: _this_chatforeign.value };
      fthis["thisOps"] = __thisOps.value;
      fthis["thisSubOps"] = "update";

      let _chatResp = await modelTwoService.updateData(fthis, {}); //[0],[1]
      if (!_chatResp.status) {
        timerError(500, "Error Updating", "");
        return false;
      }
      timerDone(5000, "updated", "");
      //---- Update saleit
      //---- Update saleit
      _this_Rows.value[__thisIndex.value] = _chatResp.data.data;
      //----- Update saleitContent directlly
      if (typeof __this_foreignBoxIndex.value == "number") {
        _this_modelTwoRows.value[__this_foreignBoxIndex.value] =
          _chatResp.data.foreignData;
        __this_foreignBoxIndex.value = null;
      } else {
      }
      //--------Reseting
      // await _this_modelOneQuery();
      // await set_this("clients", __thisIndex.value);
      await set_this_foreign("update", __this_foreignBoxIndex.value);
      return true;
    } else {
      let fthis = {
        id: _this.value["id"],
        clients: _this_modelOneforeign.value,
      };
      fthis["thisOps"] = __thisOps.value;
      fthis["thisSubOps"] = "update";

      let _clientResp = await modelOneService.updateData(fthis, {}); //[0],[1]
      if (!_clientResp.status) {
        timerError(500, "Error Updating", "");
        return false;
      }
      timerDone(5000, "updated", "");
      _orderBox.value.push(_clientResp.data.data["id"] ?? null);

      //---- Update saleit
      _this_Rows.value[__thisIndex.value] = _clientResp.data.data;
      //----- Update saleitContent directlly
      if (typeof __this_foreignBoxIndex.value == "number") {
        _this_modelOneRows.value[__this_foreignBoxIndex.value] =
          _clientResp.data.foreignData;
        __this_foreignBoxIndex.value = null;
      } else {
      }
      //--------Reseting
      await _this_modelOneQuery();
      await set_this("clients", __thisIndex.value);
      await set_this_foreign("update", __this_foreignBoxIndex.value);
      return true;
    }

    return true;
  },
  _create_foreign: async () => {
    if (__thisOps.value == "comments") {
      let fthis = { id: _this.value["id"], comments: _this_chatforeign.value };
      fthis["thisOps"] = __thisOps.value;
      fthis["thisSubOps"] = "create";
      console.log("commenting", fthis);
      let _chatResp = await modelTwoService.createData(fthis, {}); //[0],[1]
      if (!_chatResp.status) {
        timerError(500, "Error Creating", "");
        return false;
      }
      timerDone(5000, "Created", "");

      // _this_Rows.value[__thisIndex.value] = _chatResp.data.data;

      // set_this_foreign("comments", null);
      await set_this(__thisOps.value, __thisIndex.value);
      await set_this_foreign(null, null);
      await _this_modelTwoQuery();
      //----updating saleitcontent
      // _this_Rows.value[__thisIndex.value] =_chatResp.data
    } else {
      let a = { id: _this.value["id"], clients: _this_modelOneforeign.value };
      a["clients"]["store"] = "buy";

      a["thisOps"] = __thisOps.value;
      a["thisSubOps"] = "create";

      let _clientResp = await modelOneService.createData(a, {}); //[0],[1]
      if (!_clientResp.status) {
        timerError(500, "Error Creating", "");
        return false;
      }
      timerDone(5000, "Ordered", "");

      _orderBox.value.push(_clientResp.data.data["id"] ?? null);
      _this_Rows.value[__thisIndex.value] = _clientResp.data.data;

      await set_this(__thisOps.value, __thisIndex.value);
      await set_this_foreign(null, null);
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
    // fthis["thisOps"] = __thisOps.value;
    // fthis["thisSubOps"] = "create";
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
    //&&!__this_foreignBoxDialog.value
    if (
      typeof __this_foreignBoxIndex.value == "number" &&
      !__this_foreignBoxDialog.value
    ) {
      _this_modelOneRows.value[__this_foreignBoxIndex.value] =
        _clientResp.data.foreignData;
    } else {
      __this_foreignBoxIndex.value = null;
      await _this_modelOneQuery();
    }
    await set_this("clients", __thisIndex.value);
    await set_this_foreign(null, __this_foreignBoxIndex.value);
    return true;
  },
};

//---------------ACTIVE Operating on Row
//Operating without setting onplayrowItem ( directlly calling for effect) === active _operations
let _this_ActiveOperation = {
  _removeItem: async function (_thisindex = null, _thisOps = null) {
    __thisIndex.value = null;
    __thisOps.value = _thisOps;
    delete _this_Rows.value[_thisindex];
    return true;
  },
  _detailView: async (
    _thisid = null,
    _thisindex = null,
    _thisOps = null,
    _thisOpsStatus = null,
    _this_foreignBoxOps = null
  ) => {
    //---------- IS Duplicated Actions
    // if(await ifRowDoublePressed(_thisindex,_thisOps)) return false
    //---------- IS Duplicated Actions
    __thisOpsStatus.value = _thisOpsStatus;
    // __this_foreignBoxOpsStatus.value = _this_foreignBoxOpsStatus;
    if (["hover", "", null, false].includes(_thisOps)) {
    } else {
      await set_this(_thisOps, _thisindex);
      await set_this_foreign(_this_foreignBoxOps, null);
      return true;
    }
    //----------------------------------- ;
    await set_this(_thisOps, _thisindex, _thisModelService);
    // await set_this_foreign(
    //   _thisOps,
    //   null,
    //   _thisOps == "clients" ? modelOneService : modelTwoService
    // );
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
  selectedRow_ForeignRows: async (
    _thisindex = null,
    _thisOps = null,
    _this_foreignBoxOps = null
  ) => {
    //---------- IS Duplicated Actions
    if (await ifRowDoublePressed(_thisindex, _thisOps)) return false;
    //---------- IS Duplicated Actions
    // _setBoth(_thisOps, _thisindex, null, _thisModelService);
    await set_this(_thisOps, _thisindex, _thisModelService);
    await set_this_foreign(
      _this_foreignBoxOps,
      null,
      _thisOps == "clients" ? modelOneService : modelTwoService
    );
    // _thisModelService.set_syncLock(true);
    // await set_this(null, _thisindex);
    __this_foreignBoxOps.value = _this_foreignBoxOps;
    __thissubOpsStatus.value = true;
    if (_this_foreignBoxOps != "direct") {
      // for direct buy ( default) perparations
      _thisOps == "clients" ? _this_modelOneQuery() : _this_modelTwoQuery();
    }
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
    _this.value["thisOps"] = "_itServiceRating";
    _this.value["thisSubOps"] = "increase";
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
    _this.value["thisOps"] = "likes";
    _this.value["thisSubOps"] = "increase";
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
    _this.value["thisOps"] = "following";
    _this.value["thisSubOps"] = "increase";
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
  _toCart: async (tocartID = null, _thisOps = null) => {
    _this.value = {
      id: tocartID,
      clients: Object.assign({}, _thisDefault_client.value ?? {}),
    }; //.push(_onplay); //or use below
    _this.value["clients"]["store"] = "cart";

    _this.value["thisOps"] = _thisOps;
    _this.value["thisSubOps"] = "create";

    let _clientResp = await modelOneService.createData(_this.value, {}); //[0],[1]
    // console.log('creating client',_clientResp,_this.value,_this_modelOneforeign.value)
    if (!_clientResp.status) {
      timerError(500, "Error Creating", "");
      return false;
    }

    timerDone(5000, "Product Saved", "");
    _orderBox.value.push(_clientResp.data.data["id"] ?? null);
    // await _this_modelOneQuery();
    //----updating saleitcontent
    // _this_Rows.value[__thisIndex.value] = _clientResp.data.data;
    return true;
  },

  //------------special Operations
};
//------------------

//--------------------------------------METHODS & PROCESS
async function _thisValidator(formtype) {
  let _isCompleted = Object.values(_debugObj.value).every(
    (value) => value == null
  );
  if (!_isCompleted) {
    return false;
  } else if (!_this.value.price) {
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
  _this.value["thisOps"] = __thisOps;
  _this.value["thisSubOps"] = "new";
  //---Creat the Content... which is with/out of file encapsulations
  return await Crud_this.createData()
    .then(async (response) => {
      timerLoadevent({ createData: 1 }, 1, "Updating...");
      if (response) {
        // timerDone(5000, "Item Created", "Succefully Created");
        // __thisBox.value = false;
        // this_Query("userID", Objprops._profile.id);
       return router.push("/play/MyServices");
      } else {
      }
      __thisOpsStatus.value = false;
      _fileAttributeName.value = null;
      return true;
    })
    .catch((e) => {
      timerError(5000, "Error Creating", "Error Creating" + e);
      _fileAttributeName.value = null;
      // __thisOpsStatus.value = false;
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
  _this.value["thisOps"] = __thisOps;
  _this.value["thisSubOps"] = "update";
  //--------
  return await Crud_this.updateData()
    .then(async (response) => {
      timerLoadevent({ updateData: 1 }, 1, "Updating...");
      if (response) {
        timerDone(5000, "Item Updated", "Succefully Updated");
        _this_Rows.value[__thisIndex.value] = Object.assign({}, response);
        __thisBox.value = false;
        // this_Query("userID", Objprops._profile.id);
      } else {
      }
      __thisOpsStatus.value = false;
      _fileAttributeName.value = null;
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

let _contentingliveStatus = ref(250000);
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

// //--------------------
let _fileAsPath = ref(0); //_file in Show_Mode (As_String)
let _fileAsPathIndex = ref(null); //_fileAsPath_Array_index
let _fileAsPathSlide = ref(false);

let _fileAsPathOps = ref(false); //this is for selecting only

///_fileAsPathSlide
async function _fileAsPathOpsCall(StrIndex, index = null) {
  //calling for selections
  __thisIndex.value = index;
  //__thisOps.value=null
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
  clearInterval(sync_thisInstante);
  set_this(null, null, _thisModelService);
  set_this_foreign(null, null, modelOneService);
  set_this_foreign(null, null, modelTwoService);
  //-------
});
// this_Query();
_this_modelOneQuery();
onUnmounted(async () => {
  // Clear the interval when the component is destroyed to avoid memory leaks
  // clearInterval(sync_thisInstante);
  // alert("Sure, Exiing Main Page ?");
  set_this(null, null, _thisModelService);
  set_this_foreign(null, null, modelOneService);
  set_this_foreign(null, null, modelTwoService);
  return true;
});
//----------------------------Utilities Funtions
</script>

<style>
/*=====================  Fronted_Glass / Blur Styles as OverLay Background... */
@keyframes myfirst /* Firefox */ {
  50% {
    opacity: 50;
  }
}
</style>
