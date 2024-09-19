<template>
  <q-dialog
    v-model="__thisBox"
    transition-show="scale"
    transition-hide="scale"
    :style="{ 'background-image': 'url(' + _this?.saleitgr ?? '' + ')' }"
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

    <q-card style="min-width: 30vw" class="overlay-Glass" v-if="_this ?? false">
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

      <q-card-section class="row items-center no-wrap q-pa-none">
        <div class="col" style="max-height: 80vh">
          <q-img
            loading="lazy"
            style="min-height: 50vh; aspect-ratio: 2/1"
            :src="
              _fileAttributeName
                ? _fileAsSRC[_fileAsSRCIndex]
                : _this['saleitgr']?.[_fileAsSRCIndex] ?? ''
            "
          >
            <div class="absolute-full transparent column justify-between">
              <div class="row" style="min-width: 10vw">
                <div class="col fontdstyle text-dark">
                  <q-btn
                    round
                    icon="add"
                    color="orange"
                    @click="
                      _this['quantity'] = parseFloat(_this['quantity']) + 1
                    "
                  />
                  Quantity
                </div>
                <div class="column col-auto q-gutter-xs" style="width: 5vw">
                  <q-item-label class="text-orange">Upload Via </q-item-label>
                  <input
                    type="file"
                    multiple
                    ref="filep"
                    style="display: none"
                    @change="_fileSourceFolder($event, 'saleitgr')"
                  />
                  <q-btn
                    class="bg-orange"
                    icon="folder"
                    @click="$refs.filep.click()"
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

              <!--q-slider 
                                  v-model="movementX" @change="_rotor()"
                                  :min="0"
                                  :max="720"
                                  :step="1"
                                  color="green"
                                  thumb-size="35px"
                                  markers
                                /-->
              <div class="flex fontestyle">
                <q-item-label> {{ _this["header"] }}</q-item-label>
              </div>

              <div class="col row justify-between">
                <div class="self-end justify-left col-auto">
                  <div
                    v-if="__thisOps == 'CreateRowItem'"
                    style="background-color: rgba(106, 93, 255, 0.6)"
                  >
                    <q-btn
                      :loading="__thisOpsStatus"
                      class="bg-white fontestyle shadow-7 q-pa-xs"
                      color="orange"
                      :label="Objprops._onPlayLanguage ? 'ሽጥ' : 'Create Sale'"
                      icon="upload"
                      @click="Create_this()"
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
                      rounded
                      :loading="__thisOpsStatus"
                      class="bg-black shadow-7 fontestyle q-pa-xs"
                      color="green"
                      :label="Objprops._onPlayLanguage ? 'ሽጥ' : 'Update Sale'"
                      icon="upload"
                      @click="Update_this()"
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
                      :label="
                        Objprops._onPlayLanguage ? 'መደምሰሲ' : 'Enable Delete'
                      "
                      checked-icon="task_alt"
                      unchecked-icon="highlight_off"
                      :dense="true"
                    />
                    <q-tooltip
                      >Check Enable Delete & Click The Image ?</q-tooltip
                    >
                  </div>

                  <div
                    class="self-end justify-right col row shadow-5 q-pa-xs"
                    style="max-height: 100%; max-width: 100%"
                    v-if="_fileAttributeName ?? false"
                  >
                    <div
                      v-for="(item, fileIndx) in _fileAsSRC"
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
        class="column text-dark bg-orange fontbstyle"
        v-if="__thisOps == 'CreateRowItem'"
      >
        <fieldset
          class="col fontastyle q-gutter-xs"
          style="border-radius: 5px; border: 0px solid white"
        >
          <div class="row q-gutter-sm">
            <q-input
              type="Number"
              class="col fontestyle"
              :rules="[_valRules]"
              outlined
              v-model="_this['quantity']"
              :label="Objprops._onPlayLanguage ? 'በዝሒ' : 'Quantity'"
              stack-label
            />
            <q-input
              type="Number"
              class="col fontestyle"
              outlined
              v-model="_this['price']"
              :label="Objprops._onPlayLanguage ? 'ዋጋ' : 'Price'"
              stack-label
            />
          </div>

          <q-select
            outlined
            class="col-md col-xs q-pa-none"
            style=""
            color="purple-12"
            v-model="_this['catagory']"
            :options="_this_Schema['catagory']['enum']"
            :label="Objprops._onPlayLanguage ? 'ምድብ' : 'catagory'"
          />
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
            />
          </div>
          <q-item-label caption> What are You Saling !</q-item-label>
          <q-separator inset />
        </fieldset>
      </q-card-section>

      <q-card-section class="column text-dark bg-orange fontbstyle" v-else>
        <fieldset
          class="col fontastyle q-gutter-xs"
          style="border-radius: 5px; border: 0px solid white"
        >
          <!--legend @click="_formsMeta.description = ! _formsMeta.description" class=" text-weight-bolder">
                   Descriptions
               </legend -->
          <div class="row q-gutter-sm">
            <q-input
              type="Number"
              class="col fontestyle"
              :rules="[_valRules]"
              outlined
              v-model="_this['quantity']"
              :label="Objprops._onPlayLanguage ? 'በዝሒ' : 'Quantity'"
              stack-label
            />
            <q-input
              type="Number"
              class="col fontestyle"
              outlined
              v-model="_this['price']"
              :label="Objprops._onPlayLanguage ? 'ዋጋ' : 'Price'"
              stack-label
            />
            <q-input
              type="Number"
              class="col fontestyle"
              outlined
              v-model="_this['discount']"
              label="Discount Price ?"
              stack-label
            />
          </div>

          <q-separator inset />
          <q-input
            class="col-md col-xs q-pa-sm"
            style=""
            outlined
            v-model="_this['header']"
            label="Name"
            stack-label
          />
          <q-input
            outlined
            v-model="_this['content']"
            label="decscriptions"
            style=""
            filled
            autogrow
          />

          <q-separator inset />
          <q-item-label caption> Notes to be displayed !</q-item-label>
          <q-separator inset />
        </fieldset>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="_cameraBox" class="column overlay-Glass rounded-borders">
    <!--CameraFeeds  @Picture-taken="imageSrc = $event" / -->
    <div
      class="column"
      style="
        background-color: orange;
        border: 1px dashed #d6d6d6;
        border-radius: 4px;
        padding: 2px;
      "
    >
      <div v-if="_fileSourceFoCam == 'camera'">
        <div class="col bg-white row fit">
          <video
            clas="col-2"
            ref="_liveFeedRawStreaming"
            autoplay
            playsinline
            style="width: 100%"
          ></video>
          <canvas
            id="_liveFeedSRC"
            ref="_liveFeedSRC"
            width="200px"
            height="200px"
            style="display: none"
          >
          </canvas>

          <q-list class="row q-gutter-xs">
            <q-item v-for="_src in _fileAsSRC" :key="_src">
              <q-img :src="_src" style="width: 100px; height: 100px" />
            </q-item>
          </q-list>
        </div>

        <div class="q-pa-sm q-gutter-sm row justify-between">
          <div>
            <q-btn
              rounded
              color="negative"
              size="sm"
              label="close"
              @click="_cameraInstance._stopCamera()"
            />
            <q-btn
              rounded
              color="green"
              size="sm"
              label="save"
              @click="_cameraInstance._saveScreenShoots()"
            />
            <q-btn
              rounded
              color="primary"
              size="sm"
              label="capture"
              icon="camera"
              @click="_cameraInstance._screenShoot()"
            />
          </div>

          <div size="col-auto row">
            <q-expansion-item
              switch-toggle-side
              expand-separator
              icon="camera"
              size="xs"
            >
              <q-item
                v-for="camera in _listCameraSource"
                :key="camera"
                class="row q-gutter-sm"
              >
                <q-btn
                  style="height: 100%"
                  no-caps
                  size="sm"
                  :dense="true"
                  :color="
                    _selectedCameraById == camera.deviceId ? 'blue' : 'black'
                  "
                  :label="camera.label.split('_')[1]"
                  @click="
                    _cameraInstance._setCameraParam(camera.deviceId, false)
                  "
                />
                <q-btn
                  style="height: 100%"
                  no-caps
                  size="sm"
                  :dense="true"
                  :color="
                    _selectedCameraById == camera.deviceId ? 'orange' : 'black'
                  "
                  :label="_selectedCameraByface ? 'Front Cam' : 'Back Cam'"
                  @click="
                    _cameraInstance._setCameraParam(
                      camera.deviceId,
                      !_selectedCameraByface
                    )
                  "
                />
              </q-item>
            </q-expansion-item>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>

  <q-dialog v-model="_fileAsPathSlide" class="column saleitContentOps-Glass">
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
        <q-carousel-slide
          :name="imgindex"
          :img-src="imggr"
          v-for="(imggr, imgindex) in _this['saleitgr']"
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

  <!----date input pop up-->
  <dialogOne :isOpen="confirmObj" @emitClick0="confirmObj = $event">
    <confirmButton
      @confirmButton="confirmObj"
      :header="confirmMessage"
      title="Yes"
      textcolor="black"
      background="green"
      title2="No"
      textcolor2="green"
      background2="red"
    />
  </dialogOne>

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

  <q-page class="row rounded-borders fontastyle q-py-xs fit boxastyle">
    <div
      class="col-auto q-gutter-xs fixed-bottom z-top column q-ma-md items-end"
      style="left: 70vw"
    >
      <!----------------->
      <!--- No Data Founded, but keep listnening till we founde-->
      <div class="q-pa-sm" v-if="syncerrorData">
        {{ syncerrorData }}
      </div>
      <!---Rows is locked but, Update founded-->
      <div
        class="q-pa-sm text-bold rounded-borders q-pa-xs fontastyle bg-blue"
        v-if="syncListenerSmsint"
      >
        <div>{{ syncListenerSmsint }}</div>
      </div>
      <!-------------------->
      <!------loading update/create items-->
      <div
        class="q-pa-sm text-bold rounded-borders fontastyle q-pa-sx"
        v-if="__thisOpsStatus"
      >
        Still Loading...
      </div>
      <!------loading comments/client Operation-->
      <div
        class="text-bold rounded-borders fontastyle q-pa-sx"
        v-if="__thissideBoxOpsStatus"
      >
        {{ __thissideBoxOps == "comments" ? "commenting.." : "Buying" }}
      </div>

      <!---custome loading(operation status)-->
      <div class="rounded-borders bg-grey fontdstyle q-pa-sx" v-if="Loading">
        {{ Loading }}
      </div>
      <div
        class="rounded-borders bg-green fontdstyle q-pa-xs"
        v-if="DoneMessag"
      >
        {{ DoneMessag }}
      </div>
      <div
        class="rounded-borders bg-cyan fontdstyle q-pa-xs"
        v-if="KnowthisMessage"
      >
        {{ KnowthisMessage }}
      </div>
      <div
        class="rounded-borders bg-red fontdstyle q-pa-xs"
        v-if="WarnthisMessage"
      >
        {{ WarnthisMessage }}
      </div>
    </div>

    <div
      class="col-auto column rounded-borders fontastyle q-gutter-xs boxbstyle"
      style="height: 93svh"
    >
      <!---Quantity Tags-->
      <div class="column q-gutter-xs q-ma-none">
        <div class="col-auto row justify-between q-gutter-xs q-ma-sm">
          <div>Client Information</div>

          <div>
            <q-btn
              :dense="true"
              color="black"
              size="xs"
              flat
              @click="toolBarSetting = false"
              icon="minimize"
            />
            <q-btn
              :dense="true"
              color="blue"
              size="xs"
              @click="toolBarSetting = 'max'"
              icon="maximize"
            />
            <q-btn
              :dense="true"
              color="red"
              size="xs"
              @click="toolBarSetting = 'close'"
              icon="close"
            />
          </div>
        </div>

        <div
          class="col-auto q-gutter-sm row q-pa-xs justify-between boxastyle"
          v-if="toolBarSetting == 'max'"
        >
          <div
            class="col-auto row q-gutter-xs column justify-between items-center"
          >
            <div
              class="col-auto q-gutter-sm row q-pa-xs justify-between boxastyle"
            >
              <div
                class="col-auto row q-gutter-xs column justify-between items-center"
              >
                <div class="row q-gutter-none items-center">
                  <div>
                    <q-avatar icon="phone" /> {{ Objprops._profile.phone }}
                  </div>
                </div>

                <div class="text-red">
                  <q-avatar style="border-radius: 9%">
                    <img :src="Objprops._profile.profile[0]" />
                  </q-avatar>
                  <div class="text-grey fontastyle">
                    # {{ Objprops._profile.name }}
                    {{ Objprops._profile.lastName }}
                  </div>
                </div>

                <div class="fontestyle text-grey">
                  <div>My Service and Product</div>
                  <div>Dashboard</div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-auto row q-gutter-xs shadow-1">
            <!--q-date v-model="date" /-->

            <q-card-section class="column q-gutter-xs fontastyle">
              <div>Search By Date:</div>
              <div class="">
                <q-input
                  outlined
                  :dense="true"
                  size="xs"
                  v-model="_orderDate"
                  mask="date"
                  style="max-width: 10vw"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="_orderDate">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div>Search Date</div>
              <div
                v-if="_orderDate"
                class="fontastyle col-grow column flex-center"
              >
                {{ new Date(_orderDate)?.toLocaleString() ?? "" }}
              </div>
            </q-card-section>

            <q-card-section class="column col-auto q-gutter-xs fontastyle">
              <div>Serve Status:</div>
              <div
                class="row justify-between q-gutter-sm q-px-xs"
                v-for="(sstatus, kkey) in _serveStatus"
                :key="kkey"
              >
                <div class="text-grey">{{ kkey }}</div>
                <div>
                  <q-toggle size="xs" v-model="_serveStatus[kkey]" val="xs" />
                </div>
              </div>
            </q-card-section>
          </div>

          <div class="col-auto q-gutter-xs row boxastyle q-pa-none">
            <q-card-section
              class="shadow-1 col-auto boxastyle q-gutter-xs column"
            >
              <div class="fontdstyle">Total Orders</div>
              <div class="row flex flex-center col-grow q-gutter-xs">
                <div>{{ storeItems["buy"] }}</div>
              </div>
            </q-card-section>

            <!---Price Tags-->
            <q-card-section class="shadow-1 col-auto boxastyle column">
              <div class="fontdstyle">Expected Income</div>
              <div class="row flex flex-center col-grow q-gutter-xs">
                <div>{{ totalPrice }}</div>
                <div>{{ currency }}</div>
              </div>
            </q-card-section>
          </div>
        </div>
      </div>

      <div
        class="col column q-pa-sm q-ma-none"
        style="min-width: 50vw"
        v-if="toolBarSetting != 'close'"
      >
        <!------------------------------ ioio ----->
        <div
          class="col q-pa-none column"
          v-if="_this_modelOneRows.length ?? false"
        >
          <q-table
            flat
            bordered
            :rows="_this_modelOneRows"
            :columns="_this_modelOneColumns"
            virtual-scroll
            :filterMethod="_thisFiltering"
            :filter="filter"
            row-key="id"
            rowIndex="true"
            :inFullscreen="true"
            class="col-auto q-gutter-xs row q-pa-none justify-end"
            style="background-color: whitesmoke"
            hide-pagination
            :pagination="pagination"
            :visible-columns="visibleColumns_client"
            hide-top
            hide-bottom
          >
            <template #header-cell="props">
              <q-th
                :props="props"
                style="background-color: orange; text-align: left"
                ><!--q-icon name="lock_open" size="1.5em" /-->
                {{ props.col.name }}
              </q-th>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props" v-if="__thissideBoxIndex == props.rowIndex">
                <q-td colspan="100%">
                  <!-----editng Serve status-->
                  <div class="row justify-end q-gutter-xs items-center">
                    <div class="q-px-md fontastyle">
                      Editing Order
                      <div>
                        <q-icon
                          name="phone"
                          style="
                            background-color: white;
                            border-radius: 50%;
                            padding: 1px;
                          "
                        />
                        {{ props.row.phone }}
                      </div>
                    </div>
                    <q-item-label style="" class="col-auto fontastyle">
                      <q-select
                        :dense="true"
                        size="sm"
                        filled
                        v-model="props.row['served']"
                        :options="['Queed', 'Served']"
                      />
                    </q-item-label>
                    <!----editing the description status-->
                    <q-item-label style="">
                      <q-input
                        autogrow
                        filled
                        class="col fontastyle"
                        :shadow-text="textareaShadowText"
                        @keydown="processTextareaFill"
                        @focus="processTextareaFill"
                        v-model="props.row['description']"
                        label="Delivery Remark"
                        stack-label
                        :dense="true"
                      />
                    </q-item-label>
                    <!-----actions-->
                    <div class="q-gutter-xs row">
                      <div class="column q-gutter-xs">
                        <q-btn
                          color="green"
                          size="xs"
                          :dense="true"
                          icon="done"
                          @click="
                            _this_foreignOperation._submitArray(props.rowIndex)
                          "
                          label="apply"
                        />
                        <q-btn
                          color="red"
                          size="xs"
                          :dense="true"
                          icon="delete"
                          @click="
                            _this_foreignOperation._remove(props.rowIndex)
                          "
                          label="delete"
                        />
                      </div>
                      <q-btn
                        size="sm"
                        color="red"
                        :dense="true"
                        @click="__thissideBoxIndex = null"
                        label="close"
                      >
                      </q-btn>
                    </div>
                  </div>
                </q-td>
              </q-tr>
              <q-tr
                :props="props"
                class="q-gutter-sm q-tr--no-hover col-shrink fontbstyle"
                v-else
              >
                <td
                  :props="props"
                  style="font-size: 0.6em; text-align: justify"
                  class="text-bold text-center fontbstyle"
                  :class="
                    object.name == 'name' ? 'text-center' : 'text-center '
                  "
                  v-for="object in props.cols"
                  :key="object.name"
                >
                  <!--Styling Tabs-->
                  <div v-if="object.name == 'served'" class="fontbstyle">
                    <div
                      :style="
                        props.row[object.name] == 'Requested'
                          ? 'color:green'
                          : 'color:grey'
                      "
                    >
                      {{ props.row[object.name] }}
                    </div>
                  </div>
                  <!---------------Store columns-->
                  <div v-else-if="object.name == 'store'">
                    <q-badge
                      color="orange"
                      v-if="props.row[object.name] == 'buy'"
                      >{{ props.row[object.name] }}
                    </q-badge>
                    <q-badge color="teal" v-else
                      >{{ props.row[object.name] }}
                    </q-badge>
                  </div>

                  <!---------------Descriptions columns-->
                  <div v-else-if="object.name == 'description'">
                    <q-btn
                      :dense="true"
                      size="sm"
                      no-caps
                      color="blue"
                      label="View"
                      @click="
                        _this_foreignOperation._selectArray(
                          'selected',
                          props.rowIndex
                        )
                      "
                    />
                    <q-card
                      v-if="__this_foreignBoxIndex == props.row.id"
                      class="fixed-bottom z-top fontastyle flex flex-center"
                      style="max-width: 30vh; left: 1rem; bottom: 1rem"
                    >
                      {{ props.row.description }}
                    </q-card>
                  </div>

                  <!---------------time _this_modelOneColumns-->
                  <div
                    v-else-if="object.name == 'time'"
                    class="fontbstyle text-grey"
                  >
                    <div
                      v-if="typeof props.row.fupdatedAt == 'object'"
                      class="fontbstyle row q-gutter-xs"
                    >
                      <div v-if="props.row.fupdatedAt?.days ?? ''">
                        {{ props.row.fupdatedAt.days }} D,
                      </div>
                      <div v-if="props.row.fupdatedAt?.hours ?? ''">
                        {{ props.row.fupdatedAt.hours }} H,
                      </div>
                      <div v-if="props.row.fupdatedAt?.minutes ?? ''">
                        {{ props.row.fupdatedAt.minutes }} M
                      </div>
                      <div v-if="props.row.fupdatedAt?.minutes ?? ''">ago</div>
                      <div v-else>Just Now</div>
                    </div>
                    <div v-else>{{ props.row.fupdatedAt }}</div>
                  </div>
                  <div v-else-if="object.name == 'action'" class="q-gutter-xs">
                    <template
                      v-if="
                        __this_foreignBoxIndex == props.rowIndex &&
                        __this_foreignBoxsubOps
                      "
                    >
                      <div class="q-gutter-xs row">
                        <div class="column q-gutter-xs">
                          <q-btn
                            size="sm"
                            color="orange"
                            :dense="true"
                            icon="close"
                            @click="__this_foreignBoxIndex = null"
                            label="close"
                          >
                          </q-btn>
                          <q-btn
                            color="red"
                            size="xs"
                            :dense="true"
                            icon="delete"
                            @click="
                              _this_foreignOperation._remove(props.rowIndex)
                            "
                            label="delete"
                          />
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <q-btn
                        size="sm"
                        :dense="true"
                        color="orange"
                        icon="edit"
                        @click="
                          _this_foreignOperation._selectArray(
                            'selected',
                            props.rowIndex
                          )
                        "
                      >
                      </q-btn>
                    </template>
                  </div>
                  <!---------------Others _this_modelOneColumns-->

                  <div v-else class="fontastyle text-grey-8">
                    {{ props.row[object.name] }}
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
          <!-- <q-table 
                                        
                                        flat bordered
                                          
                                          :rows="_this_modelOneRows"
                                          :columns="_this_modelOneColumns"
                                          /> -->

          <div style="width: 80%" class="col-grow q-pa-xs column q-gutter-xs">
            <q-skeleton class="col-grow flex flex-center text-grey"
              >Listening For Buyers
            </q-skeleton>
            <q-skeleton
              class="col-grow flex flex-center"
              v-for="i in 15"
              :key="i"
            >
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

    <div class="col q-gutter-xs column boxastyle q-pa-xs">
      <div class="col column q-gutter-xs">
        <div
          class="col-auto q-pa-sm items-center fontestyle justify-between row"
        >
          <div class="row q-ma-xs"><div>Your Service and Products</div></div>

          <div
            class="items-center fontastyle text-blue row"
            v-if="_this_Rows?.length ?? true"
          >
            <div class="items-center q-px-xs fontdstyle">
              # {{ _this_Rows.length }} Items
            </div>
            <div>Enable Live Orders</div>
          </div>
        </div>

        <div
          class="col-grow row q-gutter-sm no-overflow scroll-area"
          style="max-height: 72vh"
          v-if="_this_Rows?.length ?? false"
        >
          <div
            class="col-auto q-gutter-sm column"
            v-for="(_rows, thisindex) in _this_Rows"
            :key="thisindex"
          >
            <div
              class="col-auto q-gutter-sm row"
              v-if="_rows?.saleitgr ?? false"
            >
              <q-card class="col-auto column fontbstyle" flat bordered>
                <q-img
                  :src="_rows.saleitgr[0]"
                  style="aspect-ratio: 1/1; width: 100%"
                  class="col q-pa-xs"
                >
                  <div class="q-gutter-xs transparent">
                    <div
                      style="
                        border-radius: 50%;
                        width: 1vw;
                        height: 1vw;
                        background-color: red;
                      "
                      v-if="__thisIndex == thisindex"
                    ></div>
                    <q-btn
                      no-caps
                      class="fontdstyle"
                      color="green"
                      :dense="true"
                      size="sm"
                      :label="_onPlayLanguage ? 'liveBuyers' : 'Live Buyers'"
                      @click="
                        _this_ActiveOperation.selectedRow_ForeignRows(
                          thisindex,
                          'clients'
                        )
                      "
                    />
                  </div>
                </q-img>

                <q-card-section
                  class="col-auto q-gutter-xs fontastyle"
                  style="background-color: white"
                >
                  <div
                    class="row q-gutter-xs no-wrap justify-between fontdstyle"
                  >
                    <div class="col-auto row justify-start">
                      <div class="q-gutter-xs">
                        <q-btn
                          size="sm"
                          no-caps
                          color="white"
                          class="text-black"
                          :dense="true"
                          @click="__thisBox_UDialog(thisindex)"
                          icon="edit"
                        />
                        <q-btn
                          size="sm"
                          no-caps
                          color="red"
                          class="text-black"
                          :dense="true"
                          @click="
                            _this_ActiveOperation._delRow(thisindex, _rows.id)
                          "
                          icon="delete"
                        />
                        <q-btn
                          size="sm"
                          no-caps
                          color="orange"
                          class="text-black"
                          :dense="true"
                          @click="setRowsync(null, _rows.id)"
                          label="Details"
                        />
                      </div>
                    </div>

                    <div
                      class="col-grow column items-end q-gutter-xs fontastyle"
                    >
                      Price: {{ _rows.price }}
                      <div>Quantity: {{ _rows.quantity }}</div>
                    </div>
                  </div>

                  <div
                    class="row no-wrap items-center q-py-sm q-gutter-md fontastyle justify-between"
                  >
                    <div>
                      <q-item-label>
                        <q-rating
                          v-model="_rows._itServiceRating"
                          :max="5"
                          size="xs"
                          @click="_this_ActiveOperation._rating(thisindex)"
                        />
                        <q-tooltip class="bg-black"
                          >Product Reliability Score</q-tooltip
                        >
                      </q-item-label>
                      <q-item-label
                        >{{ _rows.catagory }} ({{ _rows.usage }})</q-item-label
                      >
                    </div>

                    <div
                      class="col-grow column flex boxastyle text-orange flex-center"
                    >
                      <div>{{ _rows.tClient }}</div>
                      <div class="fontcstyle">Buyers</div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>

        <div
          class="col-grow column justify-center items-center text-grey"
          v-else
        >
          No Data {{ _this_Rows }}
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

// import { _this_Schema } from "@/composables/schemas/_this_Schemas";
// import { saleitClientSchema } from "@/composables/schemas/_this_Schemas";
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
const status_thisDetail = ref(null);

import useThisMixin from "src/composables/thisMixin";
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
  //---------//-- functions
  // Default_this,
  //====================
  __this_foreignBox,
  __this_foreignBoxDialog,
  //--------
  __this_foreignBoxIndex,
  __this_foreignBoxOps,
  __this_foreignBoxOpsStatus,
  __this_foreignBoxsubOps,
  //---
  // Default_this_foreign,
  // __thisBox_UDialog,
  // Default_this,
} = useThisMixin();

import useDefaulMixin from "@/composables/myMixin";
let {
  count,
  //------------
  //----------returning values
  _allColumnNames,
  _rolesColumns,
  visibleColumns,

  //---------settings
  Objprops_,
  _thisModel,
  _this_Schema,

  lockedColumns,
  invisibleColumns,
  //----------------functions
  _allColumnName,
  _rolesColumn,
  visibleColumn,

  _this_Rows,
  _this_Details,

  _this,

  columns,
  _this_Query,
  _this_RowsStatus,
  //-----------//-- returning values
  _thisDefault,

  _thisModels,
  modal_iss,

  //functionsssss
  //------preparing the main default and table_design.
  _this_Defaulting,
  //------preparing the foreign default and table_design
  foreign_Columns,
  _this_foreignDefaulting,

  //------
  visible_clientColumns,
} = useDefaulMixin();

import useClientMixin from "@/composables/thisClientMixin";
var {
  _this_modelOneSchema,

  _this_modelOneColumns,
  visibleColumns_client,
  invisibleColumns_client,

  _modelOneQuery,

  _this_modelOneRows,
  _this_modelOneDetails,
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
  // Default_this_foreign,
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

//===========================================================================////////////////////

import { saleitStore } from "@/stores/dataStores/saleitStore"; //saleit Store ( Main Store)
import { saleitClientStore } from "@/stores/dataStores/saleitClientStore"; //saleit Store ( Main Store)
import { salechatStore } from "@/stores/dataStores/salechatStore"; //saleit Store ( Main Store)

import { useRowFilter } from "@/composables/filters/cartfilter";
var {
  totalPrice,
  storeItems,
  serveItems,
  _enableRowFilter,
  _thisFiltering,
  _filteredRow,
} = useRowFilter();
_enableRowFilter.value = false;
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
  .catch((error) => {
    console.error("Error importing schema:", error);
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
let _serveStatus = reactive({ Requested: true, Queed: true, Served: true });
let _storeStatus = reactive({ cart: true, buy: true });
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
    priceFilter,
  };
});

let toolBarSetting = ref(false);
//================================================================================/////////////

//-------------USER PROFILE_Variables..
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
  await Default_this("CreateRowItem", null);
  __thisBox.value = true;
  return true;
});
async function __thisBox_UDialog(_playrowIndex = null) {
  _fileAttributeName.value = null;
  await Default_this("UpdateRowItem", _playrowIndex);
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

//-----while selecting different saleit Content
async function Default_this(Ops, rowIndex) {
  //---reset Image Related
  _fileAttributeName.value = null;
  _fileAsPathIndex.value = null;
  //-----Reset Data Creating
  __thisBox.value = false; //OPen the Box
  //----Reseting the current Row Values ( ad default, choosen Row)

  _this.value = Object.assign(
    {},
    rowIndex == null ? _thisDefault.value : _this_Rows.value[rowIndex]
  );

  //----assigning Onplay Row
  //------Meta Data relating to current Row values
  __thisIndex.value = rowIndex;
  __thisOps.value = Ops;
  __thisOpsStatus.value = false;
  return true;
}

async function Default_this_foreign(foreignOps, _foreignIndex) {
  console.log("Foreign index initialized with ", _foreignIndex);
  //Reseting Default Foreign_Rows (null Index)
  __this_foreignBoxIndex.value = _foreignIndex; //? _foreignIndex : null;
  __this_foreignBox.value = true; //disasble sideBox
  __this_foreignBoxDialog.value = null;
  __this_foreignBoxOps.value = foreignOps; //diable andy operations
  __this_foreignBoxOpsStatus.value = false; //turnofff active stauts
  __this_foreignBoxsubOps.value = false;

  //Reset Initiated from Array Selecting
  if (foreignOps == "clients") {
    _thisDefault_client.value["orderID"] = await _genOrderID();
    _this_modelOneforeign.value = Object.assign(
      {},
      _foreignIndex == null
        ? _thisDefault_client.value
        : _this_modelOneRows.value[_foreignIndex]
    );
  } else if (foreignOps == "comments") {
  }
  _this_modelOneforeign.value["saleitID"] = _this.value?.["id"] ?? "";

  return true;
}
const _resetBoth = async function (resetforeign = null, resumeSync = null) {
  //reset_default if same_index and Ops occured
  try {
    await Default_this(resetforeign, null);
  } catch {}
  try {
    await Default_this_foreign(resetforeign, null);
  } catch {}
  if (resumeSync) {
    resumeSync.set_syncLock(false);
  }
  return true;
};
const _setBoth = async function (
  setforeign = null,
  _thisindex,
  _foreignIndex = null,
  stopSync = null
) {
  //reset_default if same_index and Ops occured
  try {
    await Default_this(setforeign, _thisindex);
  } catch {}
  try {
    await Default_this_foreign(setforeign, _foreignIndex);
  } catch {}
  if (stopSync) {
    stopSync.set_syncLock(true);
  }
  return true;
};

//==============================================------------------------------------

//==========-----------Generating====The Schematic Models
invisibleColumns.value = []; //defualt hidden columns
if ($q.screen.lt.md) {
} //invisibleColumns.push("storeStatus");
if ($q.screen.lt.lg) {
} //invisibleColumns.push("storeStatus");
// _this_Schema.value = saleitSchema
invisibleColumns_client.value.push("currency", "paymentMethod", "confirmID");
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

watch(columns, (_nowRows, ov) => {
  return true;
}); // let _initCol = columns.value

async function _setDefaults() {
  // _thisModels = ['phone',"userName","geolocation",'location','userID','phoneCode'] //
  _thisDefault.value = await _this_Defaulting(_thisModels.value);
  _thisDefault.value["quantity"] = 1;
  _thisDefault.value["userID"] = Objprops._profile.id;
  //------==== building columns of thisMoel
  return true;
}

async function _this_foreignDefault() {
  //-------<<<<>>>>-------Preparing this_model role_schemas
  let _defaulting_client = await foreign_Columns(
    _this_modelOneSchema.value,
    invisibleColumns_client.value
  );
  console.log(
    _defaulting_client,
    "defaulcting client========245",
    _this_modelOneSchema.value
  );
  _this_modelOneColumns.value = _defaulting_client[0];
  visibleColumns_client.value = _defaulting_client[1];
  await _clientDefaults(_defaulting_client[1]);
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

//==========================================DEfaulting && Scheam Generations====End
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
//----------------------------------
var _this_Query_Meta = {}; //_trend:'', catagory:'',usage:'New',content:''
//===============================QUERY_BUILDIMG+++START
//==============Q1
async function this_Query(_queKey = null, _value = null) {
  //-----------Reseting Rows SEtting
  _this_Rows.value = [];
  _this_Query.value = {};
  // __this_foreignBoxsubOps.value = false
  //--------------------Building Queries
  _this_Query.value["userID"] = Objprops._profile.id;
  // await _thisModelService.set_syncQuery(_this_Query.value)
  //----------------Fetching Queried Rows
  // _this_Rows_Sync()

  let _rows = await Fetch_this(_thisModelService, _this_Query.value);
  if (_rows) {
    _this_Rows.value = _rows; //Object.assign(_this_modelOneRows.value,res)
  }
  __this_foreignBoxOpsStatus.value = false;
  return true;
}
//==============Q1
async function _this_modelOneQuery(userID = null, _saleitID = null) {
  _this_modelOneRows.value = [];
  //-------------------- Reseting Rows
  Default_this_foreign("clients", null);
  //---------Query Building
  //Content Owner is on client_link(show all)
  // if(!_is_thisOwner.value){
  //             _modelOneQuery.value['userID']=Objprops._profile.id
  //           }
  // _modelOneQuery.value['userID']=Objprops._profile.id //searching users_shops
  _modelOneQuery.value["saleitID"] = _this.value["id"] ?? ""; /// searching for specific_product
  _modelOneQuery.value["store"] = "buy";
  //-------------------- Fetching Queried Rows
  await Sync_this(modelOneService, _modelOneQuery.value);
  //-------------------- Preparing Default Rows ( New Row Skeltons)
  // ?
  return true;
}

let sync_thisInstante = "";
_this_modelOneRows = computed(() => {
  //Updating is comming
  return _this_RowsCompute(modelOneService.getDatas);
});

function _this_RowsCompute(_Datas) {
  pagination.value.rowsPerPage =
    _pageSettings.value["tableView"] == "cards" ? 1 : 3;
  return Array.isArray(_Datas) ? _Datas : [];
}

let _orderBox = ref([]);

const isRowDoublePressed = async function (_thisindex, _thisOps) {
  let _existed_this = __thisIndex.value == _thisindex;
  if (
    _thisindex == null ||
    (_existed_this && __this_foreignBoxOps.value == _thisOps)
  ) {
    _resetBoth(_thisOps, _thisModelService);
    return true;
  } else {
    return false;
  }
};
const isForeignDoublePressed = async function (
  _foreignindex,
  _foreignOps,
  _thisOps
) {
  let _existed_this = __this_foreignBoxIndex.value == _foreignindex;
  if (
    _foreignindex == null ||
    (_existed_this && __this_foreignBoxsubOps.value == _foreignOps)
  ) {
    _resetBoth(_thisOps, _thisModelService);
    return true;
  } else {
    return false;
  }
};

//-------Listening for SideBox Operations & Visualizing

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
    foreignOps = null
  ) => {
    //---------- IS Duplicated Actions
    if (
      await isForeignDoublePressed(
        _foreignIndex,
        foreignSuboperation,
        foreignOps
      )
    )
      return false;
    //---------- IS Duplicated Actions
    // await Default_this('clients',__thisIndex.value);
    await Default_this_foreign(foreignOps, _foreignIndex);
    //---
    __this_foreignBoxIndex.value = _foreignIndex;
    __this_foreignBoxsubOps.value = foreignSuboperation;
    __this_foreignBoxOps.value = foreignOps;
    //----Defaulting foreign Links for main
    return true;
  },
  //---Enabling Array_Index_For Operations (Select_Index)_For ---Editing:Deleting--Applying--
  selectedIndex_RowDetail: async (
    _thisID,
    _foreignIndex = null,
    foreignSuboperation = null
  ) => {
    //---------- IS Duplicated Actions
    if (
      await isForeignDoublePressed(
        _foreignIndex,
        foreignSuboperation,
        "clients"
      )
    )
      return false;
    //---------- IS Duplicated Actions
    // alert(_foreignIndex)

    // __thisIndex.value = 0
    await Fetch_this(_thisModelService, { id: _thisID }).then(async (res) => {
      if (res) {
        _this_Rows.value = res; //[__thisIndex.value];
        await Default_this("clients", 0);
        await Default_this_foreign("clients", _foreignIndex);
      } else {
      }
    });
    __this_foreignBoxIndex.value = _foreignIndex;
    __this_foreignBoxsubOps.value = foreignSuboperation;
    //----Defaulting foreign Links for main
    return true;
  },

  //-----------Operations on selected array
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
      // Default_this("comments", __thisIndex.value);
      Default_this_foreign("comments", null);
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
      //  _resetBoth("clients",null)
      Default_this_foreign("clients", null);
    }

    return true;
  },
  _update_foreign: async () => {
    if (__this_foreignBoxOps.value == "comments") {
      let fthis = { id: _this.value["id"], comments: _this_chatforeign.value };
      fthis["onplayOps"] = "comments";
      fthis["onplaySubops"] = "update";

      let _chatResp = await modelTwoService.updateData(fthis, {}); //[0],[1]
      if (!_chatResp.status) {
        timerError(500, "Error Updating", "");
        return false;
      }
      timerDone(5000, "updated", "");

      _this_Rows.value[__thisIndex.value] = _chatResp.data.data;
      Default_this("comments", __thisIndex.value);
      await _this_modelTwoQuery();
      //----updating saleitcontent
      // _this_Rows.value[__thisIndex.value] =_chatResp.data
    } else {
      let fthis = {
        id: _this.value["id"],
        clients: _this_modelOneforeign.value,
      };
      fthis["onplayOps"] = __this_foreignBoxOps.value;
      fthis["onplaySubops"] = "update";

      let _clientResp = await modelOneService.updateData(fthis, {}); //[0],[1]

      if (!_clientResp.status) {
        timerError(500, "Error Updating", "");
        return false;
      }
      timerDone(5000, "updated", "");

      _orderBox.value.push(_clientResp.data.data["id"] ?? null);
      _this_Rows.value[__thisIndex.value] = _clientResp.data.data;

      Default_this("clients", __thisIndex.value);
      await _this_modelOneQuery();
      //----updating saleitcontent
      // _this_Rows.value[__thisIndex.value] =_clientResp.data
    }

    return true;
  },
  _create_foreign: async () => {
    if (__this_foreignBoxOps.value == "comments") {
      // _this_chatforeign.value['saleitID'] = _this.value['id']
      // _this_chatforeign.value['userID'] = Objprops._profile.id
      let fthis = { id: _this.value["id"], comments: _this_chatforeign.value };
      fthis["onplayOps"] = "comments";
      fthis["onplaySubops"] = "create";

      let _chatResp = await modelTwoService.createData(fthis, {}); //[0],[1]
      if (!_chatResp.status) {
        timerError(500, "Error Creating", "");
        return false;
      }
      timerDone(5000, "Created", "");

      _this_Rows.value[__thisIndex.value] = _chatResp.data.data;

      Default_this("clients", __thisIndex.value);
      await _this_modelTwoQuery();
      //----updating saleitcontent
      // _this_Rows.value[__thisIndex.value] =_chatResp.data
    } else {
      // _this_modelOneforeign.value['saleitID'] = _this.value['id']
      // _this_modelOneforeign.value['userID'] = Objprops._profile.id
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

      Default_this("clients", __thisIndex.value);
      await _this_modelOneQuery();
      //----updating saleitcontent
    }

    return true;
  },
  //------special Operations=========
  _newbuyer_foreign: async (_store = "buy", _isnewBuyer = true) => {
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
    Default_this("clients", __thisIndex.value);
    await _this_modelOneQuery();
    return true;
  },
};

let _this_ActiveOperation = {
  _detailView: async (_thisindex = null, _foreignIndex = null) => {
    //---------- IS Duplicated Actions
    if (await isRowDoublePressed(_thisindex, "clients")) return false;
    //---------- IS Duplicated Actions
    await _setBoth("clients", _thisindex, _foreignIndex, _thisModelService);
    __this_foreignBoxsubOps.value = "view";
    //  _this_clientQuery()
    status_thisDetail.value = true;
    await Fetch_this(_thisModelService, { id: _this.value["id"] }).then(
      (res) => {
        if (res) {
          _this.value = res[0];
          status_thisDetail.value = true;
        }
      }
    );
    return true;
  },
  selectedRow_ForeignRows: async (_thisindex = null, _thisOps = null) => {
    //---------- IS Duplicated Actions
    if (await isRowDoublePressed(_thisindex, _thisOps)) return false;
    //---------- IS Duplicated Actions

    _thisModelService.set_syncLock(true);
    await Default_this(null, _thisindex);

    _thisOps == "clients"
      ? await _this_modelOneQuery()
      : await _this_modelTwoQuery();
    return true;
  },
  //===================
  _rating: async (_onplayrowIndex) => {
    //build dynamic object
    _this.value = {
      id: _this_Rows.value[_onplayrowIndex]["id"],
      _itServiceRating: _this_Rows.value[_onplayrowIndex]["_itServiceRating"],
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

  _likes: async (_onplayrowIndex) => {
    //build dynamic object
    _this.value = { id: _this_Rows.value[_onplayrowIndex]["id"] }; //DeepCopy Handle Reactivity
    //create object operational command
    _this.value["onplayOps"] = "likes";
    _this.value["onplaySubops"] = "increase";
    //---set--loading row operation

    return await Crud_this.updateData()
      .then(async (response) => {
        if (response) {
          timerDone(5000, "You Liked", "Succefully Updated");
          _this_Rows.value[_onplayrowIndex]["likes"]["like"]++; // =Object.assign({},response);
        } else {
          // timerDone(5000, "Connection Error", "Failed to connect");
        }
        return true;
      })
      .catch((error) => {
        return false;
      });
  },
  _following: async (_onplayrowIndex) => {
    //build dynamic object
    _this.value = { id: _this_Rows.value[_onplayrowIndex]["id"] }; //DeepCopy Handle Reactivity
    //create object operational command
    _this.value["onplayOps"] = "following";
    _this.value["onplaySubops"] = "increase";
    //---set--loading row operation

    return await Crud_this.updateData()
      .then(async (response) => {
        if (response) {
          timerDone(5000, "You Following", "Succefully Updated");
          // Objprops._profile.contacts.push(response.data)
          // _this_Rows.value[_onplayrowIndex]["likes"]["like"]++; // =Object.assign({},response);
        } else {
          // timerDone(5000, "Connection Error", "Failed to connect");
        }
        return true;
      })
      .catch((error) => {
        return false;
      });
  },
  _delRow: async (confirm = null, _onplayrowIndex, itemId) => {
    //--------------
    if (confirm == null) {
      //First (Null) Event -- Data Assigning && set confirmObj
      //-----------------------------
      _this.value = { id: itemId };
      // __thisIndex.value = _onplayrowIndex
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

    timerDone(5000, "Added", "");
    _orderBox.value.push(_clientResp.data.data["id"] ?? null);
    await _this_modelOneQuery();
    //----updating saleitcontent
    _this_Rows.value[__thisIndex.value] = _clientResp.data.data;
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

// var _cameraInstance = new _cameraDevice();
onMounted(() => {
  // clearInterval(sync_thisInstante);
  // modelOneService.set_syncLock(true);
  // modelTwoService.set_syncLock(true);
  // _thisModelService.set_syncLock(true);
  //-------
  _resetBoth();
});
// this_Query();
this_Query();
onUnmounted(async () => {
  // Clear the interval when the component is destroyed to avoid memory leaks
  // clearInterval(sync_thisInstante);
  modelOneService.set_syncLock(true);
  _thisModelService.set_syncLock(true);
  return true;
});
//----------------------------Utilities Funtions
</script>

<style></style>
