<template>
  <template v-if="gpsStatus == 'permiting_gpsservice'">
    <dialogOne
      class="fit shadow-5 column"
      :isOpen="askForGPS"
      @emitClick0="allowGPS($event)"
    >
      <div class="boxastyle text-orange bg-orange">
        <p class="text-white">Allow Location Access.</p>
        <div class="text-orange boxcstyle" style="max-width: 80vw">
          Would you like to
          <ul>
            <li>Get product before any one</li>
            <li>Get product near you</li>
          </ul>
          then, we need locations acccess to provide you with best exprience.
        </div>
        <div class="justify-end row">
          <q-btn flat color="green" @click="allowGPS(true)"> Allow </q-btn>
        </div>
      </div>
    </dialogOne>
  </template>
  <!-- _thisOps -->
  <template
    v-if="
      ['customerSupport', 'cameraPermission', 'createPermission'].includes(
        _thisOps
      )
    "
  >
    <dialogOne
      :isOpen="_thisOps"
      @emitClick0="_thisOps = $event"
      class="column"
    >
      <q-card
        v-if="_thisOps == 'customerSupport'"
        class="fontbstyle flex column"
      >
        <q-card-section>
          <div class="fontdstyle">Service Usage Manual</div>
        </q-card-section>

        <q-separator />

        <q-card-section
          style="max-height: 50vh; min-width: 20vw"
          class="scroll"
        >
          <p v-for="n in 100" :key="n">
            {{ n }} Notices dslkff sodkfw pwef wp fpweof pefwepf pwope.
          </p>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <!--q-btn flat label="Decline" color="primary" v-close-popup /-->
          <q-btn flat label="Ok" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>

      <q-card v-else-if="_thisOps == 'cameraPermission'">
        Please Allow GPS && Camera Device, on Your Device
      </q-card>

      <q-card
        v-else-if="_thisOps == 'createPermission'"
        class="column boxbstyle fontestyle q-pa-md q-gutter-sm text-white justify-between"
        style="
          background-color: rgb(255, 8, 0);
          color: white;
          border-radius: 10px;
          box-shadow: 5px;
          min-width: 40vw;
          min-height: 30vh;
        "
      >
        <h2 class="fontcstyle text-white">For Safety Reasons</h2>
        <h2 class="fontcstyle text-white">Please, Login with key, to sell</h2>
        <div class="row q-gutter-sm">
          <input
            style="border-radius: 5px"
            type="password"
            v-model="_this.enrollKey"
          />
          <button class="text-red" @click="_enroll()">Login</button>
        </div>
        <div class="text-white fontbstyle">
          <hr style="height: 0px; border: 0.1px solid orangered" />

          <p class="text-white">For Registration Or Reseting ?</p>
          Contact us : On
          <p class="text-white"><q-icon name="phone" /> +251 91232342424</p>
          <p class="text-white"><q-icon name="phone" /> +251 91232342424</p>
          <hr style="height: 0px; border: 0.1px solid orangered" />
        </div>
        <div
          class="text-orange fontbstyle row justify-end items-center q-px-md bg-black"
        >
          <q-icon name="telegram" /> t.me/mesh | <q-icon name="facebook" /> mesh
          | <q-icon name="whatsapp" /> mesh
        </div>
      </q-card>
    </dialogOne>
  </template>

  <q-dialog v-model="_cameraBox" class="column overlay-Glass rounded-borders">
    <!--CameraFeeds  @Picture-taken="imageSrc = $event" / -->
    <div
      class="column"
      style="
        background-color: whitesmoke;
        border: 1px dashed #d6d6d6;
        border-radius: 4px;
        padding: 2px;
      "
    >
      <div v-if="_fileSourceFoCam == 'folder'"></div>
      <div v-else-if="_fileSourceFoCam == 'camera'">
        <div v-if="_thisMedia">
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
                v-if="_listCameraSource.length"
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
                    :label="camera.label ? camera.label.split('_')[1] : 'cam'"
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
                      _selectedCameraById == camera.deviceId
                        ? 'orange'
                        : 'black'
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
            <!--div size="col-auto row"> {{  _listMicSource }}
                    <q-item v-for="mic in _listMicSource" :key=mic class="column">
                      <q-btn style="height:100%" no-caps size="sm" :dense="true" :color="_selectedMicById == mic.deviceId ? 'blue':'black'" :label="mic.label.split('_')[1]" @click="_cameraModule._selectedMicId(mic.deviceId)" />
                    </q-item>
                </div-->
          </div>
        </div>
        <div v-else class="col bg-white row fit">
          Error Connecting to Camera
        </div>
      </div>
      <div v-else>
        Error Accessing System, please allow on settting for Location and Media
        Devices
      </div>
    </div>
  </q-dialog>

  <!-- Debug Component and Mixing Values -->
  <!-----DEbug ( Action ) Informations-->
  <template v-if="DoneMessage.length ?? false">
    <debugCard :messages="DoneMessage ?? []" @closeButton="DoneMessage = []" />
  </template>
  <template v-if="WarnthisMessage.length ?? false">
    <debugCard :messages="WarnthisMessage ?? [{}]" />
  </template>
  <!-----Status ( Store/Loading ) Informations-->
  <!-- <template v-if="status_WarnthisMessage.length ?? false">
      <statusCard :messages="status_WarnthisMessage ?? [{}]" />
    </template>
    <template v-if="status_KnowthisMessage.length ?? false">
      <statusCard :messages="status_KnowthisMessage ?? [{}]" />
    </template>
    <template v-if="status_DoneMessage.length ?? false">
      <statusCard :messages="status_DoneMessage ?? [{}]" />
    </template> -->
  <!-- Debug Component and Mixing Values -->

  <div
    class="fixed-right z-top q-px-sm q-gutter-sm"
    style="top: 15vh; bottom: 55vh; max-height: 5vh"
  >
    <div class="row justify-end"></div>

    <q-card
      class="column q-gutter-sm q-pa-sm"
      v-if="_openpubChat"
      style="
        min-width: 5vw;
        min-height: 50vh;
        margin-bottom: 50px;
        background-color: whitesmoke;
      "
    >
      <div class="fontdstyle row justify-between">
        public Chatting
        <!-- <q-badge color="green" :dense="true" v-if="_chatWatch"> live</q-badge> -->
        <div>
          <input type="checkbox" v-model="_setpublicchat" />
          <!-- <button @click="_liveChatting(6000)">On</button>
          <button @click="_liveChatting(false)">Off</button> -->
          <q-btn @click="_openpubChat = false" icon="close" flat />
        </div>
      </div>
      <div class="bg-white q-pa-sm row">
        <div>
          <label class="fontastyle">Your session</label>
          <div><q-icon name="phone"> </q-icon> {{ _this.phone }}</div>
        </div>
        <hr />
        <div>
          <label class="fontastyle">Active Users</label>
          <div>
            <q-icon name="phone"> </q-icon>
            {{ publicchatService.getDatas.length }}
          </div>
        </div>
      </div>

      <q-card-section
        class="col-grow shadow-7 bg-white"
        style="max-height: 50vh; overflow-y: scroll"
      >
        <div
          v-for="(chats, index) in publicchatService.getDatas"
          class="q-gutter-xs column boxastyle q-my-sm"
          :key="index"
        >
          <div
            class="col-auto row fontastyle q-gutter-sm"
            :class="
              _this.id == chats.userID
                ? 'justify-end text-green'
                : 'justify-start text-orange'
            "
          >
            <q-icon
              name="phone"
              style="background-color: white; border-radius: 50%"
            >
            </q-icon>
            <label class="q-ma-none"> {{ chats.phone }} </label>
          </div>
          <div
            class="col-grow fontbstyle text-grey"
            style="max-width: 15vw; overflow-y: auto; text-overflow: ellipsis"
          >
            {{ chats.content }}
          </div>
        </div>
      </q-card-section>

      <div class="col-auto row q-pa-xs q-gutter-xs bg-white">
        <q-input outlined :dense="true" size="sm" v-model="_chatting.content">
        </q-input>
        <q-btn :dense="true" size="md" icon="send" @click="openpubChat()" />
      </div>
    </q-card>
  </div>
  <!-- Debug Component and Mixing Values -->
  <!-----DEbug ( Action ) Informations-->
  <template v-if="DoneMessage.length ?? false">
    <debugCard :messages="DoneMessage ?? []" @closeButton="DoneMessage = []" />
  </template>
  <template v-if="WarnthisMessage.length ?? false">
    <debugCard :messages="WarnthisMessage ?? [{}]" />
  </template>
  <!-----Status ( Store/Loading ) Informations-->
  <div
    v-if="Loading.length ?? false"
    class="fixed-bottom-right q-pa-md z-top q-gutter-sm column fontestyle"
  >
    <div class="fit bg-orange text-bold text-white">
      {{ Loading[0].content }}
    </div>
  </div>

  <!-- Debug Component and Mixing Values -->

  <!--walls-->
  <!--layOuts-->

  <!--  :style="{ 'background-image': 'url(' + _this['cover'] ?? 'white' + ')' }"  -->
  <div
    class="fixed fit column"
    :style="{ 'background-image': 'url(' + _this['cover'] ?? 'white' + ')' }"
    style="background-repeat: no-repeat; background-size: cover"
  >
    <div class="col-grow layout-Glass"></div>
  </div>

  <q-layout
    v-if="Loadingevent.main ?? false"
    class="column"
    style="background-color: rgb(255, 8, 0)"
  >
    <div
      style="position: fixed; top: 50%; left: 50%"
      class="fontestyle text-white"
    >
      <!-- <div>{{ _pageSettings.path }}</div> -->
      <!-- <p class="fontastyle">mesh</p> -->
      ....
    </div>
  </q-layout>

  <q-layout
    v-else
    view="hHh lpr lFF"
    class="no-padding no-margine"
    style="max-width: 100svw; height: 100svh"
  >
    <div
      style="position: fixed; top: 82vh; left: 86vw; z-index: 100"
      class="fontbstyle text-white text-orange"
    >
      <div
        v-if="
          (_pageSettings.geoSearch ?? false) && _pageSettings.path != 'MyShops'
        "
      >
        <div style="display: flex; flex-flow: column nowrap">
          Find Near ?
          <select v-model="_pageSettings.geoSearch.value">
            <option selected>off</option>
            <option>nearMe</option>
            <option>myCity</option>
            <option>myCountry</option>
          </select>
        </div>
        <!-- <button @click="_pageSettings.geoSearch.state = true">
          Find Near You.
        </button> -->
      </div>
      <!-- <div>{{ _pageSettings.path }}</div> -->
      <!-- <p class="fontastyle">mesh</p> -->
      ....
      <q-btn
        @click="openpubChat(true)"
        icon="chat"
        :dense="true"
        flat
        class="text-white"
        ><q-tooltip>Join Public Chats</q-tooltip>
      </q-btn>
      <div class="fontastyle row"><q-icon name="phone" />{{ _this.phone }}</div>
    </div>

    <!--Headers-->
    <q-header
      v-if="!isScrolledUp"
      :dense="true"
      id="navbar"
      elevated
      style="min-height: 30px"
      class="transparent"
    >
      <!--toolBars-->
      <q-toolbar
        class=" "
        v-if="screenSize == 'Small'"
        style="backdrop-filter: blur(500px)"
      >
        <q-btn
          round
          color="orange"
          size="xs"
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="more_vert"
        />

        <q-space />

        <div
          class="boxastyle row items-center"
          style="width: 60vw; height: 40px; border-radius: 5px"
        >
          <q-icon
            name="clear"
            style="color: rgb(255, 8, 0)"
            class="col-auto cursor-pointer q-pa-xs"
            size="xs"
            @click="lytSearchRow = null"
          />
          <input
            class="col font0astyle"
            type="text"
            v-model="lytSearchRow"
            placeholder="search"
            style="border-radius: 5px; height: 100%; border: 1px solid white"
          />
        </div>

        <!-- <q-input
          outlined
          :dense="true"
          size="xs"
          class="bg-white"
          style="border-radius:10px"
          color="white"
          v-model="lytSearchRow"
          placeholder="Search"
        >
          <template v-slot:prepend>
            <q-icon name="clear" class="cursor-pointer" size="xs" />
          </template>
        </q-input> -->
        <!--upload Button-->
        <!---service Choosing Ddowns-->

        <q-space />

        <q-btn
          flat
          dense
          no-wrap
          @click="
            lytCreatRow = lytCreatRow == 'Create0' ? 'Create1' : 'Create0'
          "
          icon="upload"
          no-caps
          class="q-ml-sm q-px-md fontastyle text-white"
          style="background-color: rgb(255, 8, 0)"
          v-if="_this?.enrolled ?? false"
        >
        </q-btn>
      </q-toolbar>

      <q-toolbar class="fontastyle" style="backdrop-filter: blur(900px)" v-else>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          class="bg-orange q-pa-md"
          style="color: rgb(255, 8, 0)"
          no-caps
          label=" mesh "
        />

        <!-- <label>saleIt </label>  -->
        <div class="q-gutter-xs row">
          <q-btn
            :dense="true"
            flat
            stack
            no-caps
            class="row font0astyle"
            :style="
              _pageSettings['path'] == iservice.path
                ? 'color:orangered'
                : 'color:grey'
            "
            v-for="(iservice, key) in iservicei_Menu"
            :key="key"
            @click="routeIt(iservice.title, iservice.path, iservice.model)"
          >
            <q-icon size="sm" :name="iservice.icon" />
            <p style="color: grey">{{ key }}</p>
            {{ iservice.path }}
            <q-tooltip
              style="background-color: black; color: white; font-weight: bolder"
            >
              {{ iservice.title }}
            </q-tooltip>
          </q-btn>
        </div>

        <!--div v-if="_profile_iss?.['group'] ?? false ">
              <q-btn  @click="popUpgrader = !popUpgrader" flat no-caps  v-if="_profile_iss['group'] == 'client'" class="fontastyle" >
                 <q-item-label> UpgradeMe </q-item-label>
               </q-btn>
               <q-btn v-else class="lt-sm"> Create</q-btn>
        </div-->

        <q-space />

        <!--- Searching/filtering Service-->
        <!-- <div class="row transparent">
          <button
            class="row justify-around items-center no-wrap q-pa-none q-ma-none transparent"
          >
            <q-icon name="filter" size="xs" />
          </button>
        </div> -->

        <q-input
          rounded
          :dense="true"
          class=""
          outlined
          color="orange"
          v-model="lytSearchRow"
          placeholder="Search"
        >
          <template v-slot:prepend>
            <q-icon
              color="red"
              name="clear"
              class="cursor-pointer"
              size="xs"
              @click="lytSearchRow = ''"
            />
          </template>
        </q-input>
        <!--upload Button-->
        <!---service Choosing Ddowns-->

        <q-space />

        <q-btn
          flat
          dense
          no-wrap
          @click="
            lytCreatRow = lytCreatRow == 'Create0' ? 'Create1' : 'Create0'
          "
          icon="upload"
          no-caps
          label="Create Content"
          class="q-ml-sm q-px-md fontastyle text-white"
          style="background-color: rgb(255, 8, 0)"
          v-if="_this?.enrolled ?? false"
        >
        </q-btn>

        <div class="q-gutter-sm row items-center no-wrap">
          <!-- <q-item-label>
            {{ _this.userName }}
          </q-item-label> -->
          <!--q-btn round dense flat color="text-grey-7" icon="apps">
           <q-tooltip>mesh Apps</q-tooltip>
         </q-btn-->

          <!--q-btn round dense flat color="grey-8" icon="notifications">
           <q-badge color="red" text-color="white" floating>
             2
           </q-badge>
           <q-tooltip>Notifications</q-tooltip>
         </q-btn-->
          <q-btn round flat @click="leftDrawerOpen = !leftDrawerOpen">
            <q-avatar>
              <img :src="_this.profile" />
            </q-avatar>
            <q-tooltip>{{ _this.name }}</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!--drawer-Left-->

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="0"
      side="left"
      overlay
      elevated
      class="row q-pa-none q-ma-none"
      style="height: 100%; width: 100vw; background-color: orange"
    >
      <div class="col bg-orange" style="height: 100%">
        <q-scroll-area
          v-if="screenSize == 'Large'"
          class="column"
          style="
            height: 100%;
            scrollbar-width: 0px;
            scrollbar-color: green;
            width: 100%;
          "
          color="green"
        >
          <!----profile graphics/imaging-->
          <q-card class="fontastyle q-pa-none q-ma-none" flat bordered style="">
            <q-img
              :src="
                _fileAttributeName == 'cover'
                  ? _fileAsSRC[_fileAsSRCIndex]
                  : _this.cover ?? ''
              "
              class="column fontastyle"
              style="aspect-ratio: 2/1; width: 100%"
            >
            </q-img>

            <div
              style="position: absolute; top: 0px; height: 100%"
              class="column justify-between q-pa-sm"
            >
              <div class="transparent column items-start">
                <div class="row">
                  <q-btn
                    flat
                    icon="more_vert"
                    color="green"
                    label="Cover"
                    class="col-auto"
                    @click="_thisOps = 'covering'"
                  >
                    <q-menu
                      auto-close
                      :offset="[2, 2]"
                      class="q-pa-sm transparent"
                    >
                      <input
                        type="file"
                        ref="filec"
                        style="display: none"
                        @change="_fileSourceFolder($event, 'cover')"
                      />
                      <q-btn
                        icon="folder"
                        class="text-dark"
                        @click="$refs.filec.click()"
                        :dense="true"
                      />
                      <q-btn
                        icon="add_a_photo"
                        class="text-dark"
                        @click="_cameraInstance._openCamera('cover')"
                        :dense="true"
                      />
                    </q-menu>
                  </q-btn>
                </div>
              </div>

              <!-- <div
                class=""
                style="width: 5em; height: 5em; border-radius: 0.6rem"
                v-if="_this?.profile ?? false"
              >
                <q-img
                  :src="
                    _fileAttributeName == 'profile'
                      ? _fileAsSRC[_fileAsSRCIndex]
                      : _this.profile[_fileAsSRCIndex] ?? ''
                  "
                  class="fit"
                  style="border: 1px solid white; border-radius: 0.6rem"
                />
              </div> -->
            </div>
            <!---- for_Name -- -->
          </q-card>

          <div class="row q-gutter-sm">
            <div
              class="col-2 q-mx-sm"
              style="position: relative; top: -20px; left: 10px; max-width: 3vw"
            >
              <img
                :src="_this.profile[0]"
                style="width: 100%; aspect-ratio: 2/2; border-radius: 15px"
              />
            </div>

            <q-card
              class="col row justify-between items-center q-px-sm"
              flat
              v-if="_thisOps ?? false"
            >
              <!---profile_update-->
              <div class="q-gutter-xs justify-end">
                <input
                  type="file"
                  multiple
                  ref="filep"
                  style="display: none"
                  @change="_fileSourceFolder($event, 'profile')"
                />
                <q-btn
                  icon="folder"
                  class=""
                  size="md"
                  flat
                  @click="$refs.filep.click()"
                  :dense="true"
                />
                <q-btn
                  color="grey-4"
                  class=""
                  size="md"
                  flat
                  text-color="purple"
                  icon="camera"
                  @click="_cameraInstance._openCamera('profile')"
                  :dense="true"
                />
              </div>

              <div>
                <q-btn
                  class=""
                  icon="done"
                  no-caps
                  size="sm"
                  flat
                  :dense="true"
                  @click="updateUser()"
                >
                  <p>Apply</p>
                </q-btn>
              </div>
            </q-card>
          </div>

          <!----profile basic informations-->
          <q-list padding class="col-9 column" style="min-height: 60vh">
            <q-item>
              <q-item-section>
                <q-item-label overline>{{ _this.username }}</q-item-label>
                <q-item-label
                  >{{ _this.name }} {{ _this.lastName }}</q-item-label
                >
                <!-- <q-item-label caption>Since : {{  _this.updatedAt }}</q-item-label> -->
              </q-item-section>

              <q-item-section side top>
                <q-item-label class="row justify-between fontastyle">
                  <q-btn
                    flat
                    class="fontastyle text-red"
                    round
                    label="Cancel"
                    :dense="true"
                    @click="_thisOps = _thisOps ? false : 'cinfo'"
                    v-if="_thisOps"
                  />
                  <div v-else>
                    <q-btn
                      flat
                      class="fontastyle text-orange"
                      :dense="true"
                      label="MyStore"
                    />
                    <q-btn
                      flat
                      class="fontastyle text-black"
                      round
                      label="Edit Profile"
                      :dense="true"
                      @click="_thisOps = _thisOps ? false : 'cinfo'"
                    />
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator spaced />
            <!----Personal Information  _thisOps -->

            <q-item
              v-for="cinfo in ['name', 'lastName', 'userName']"
              :key="cinfo"
            >
              <q-item-section>
                <q-item-label
                  style="text-transform: capitalize"
                  v-if="_thisOps == 'cinfo'"
                >
                  <q-input
                    standout
                    v-model="_this[cinfo]"
                    :label="cinfo"
                    stack-label
                    :dense="true"
                  />
                </q-item-label>
                <q-item-label style="text-transform: capitalize" v-else>
                  <q-input
                    standout
                    v-model="_this[cinfo]"
                    :label="cinfo"
                    stack-label
                    :dense="true"
                    readonly
                  />
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="text-grey-8 q-gutter-xs" v-if="_thisOps == 'cinfo'">
                  <q-btn
                    class="gt-xs"
                    size="12px"
                    flat
                    dense
                    round
                    icon="clear"
                    @click="_this[cinfo] = ''"
                  />
                  <!-- <q-btn class="gt-xs" size="12px" flat dense round icon="done" @click="updateUser()" /> -->
                </div>
              </q-item-section>
            </q-item>

            <!------Address Informa-->
            <q-separator spaced inset="item" />
            <div class="col-auto q-px-sm row justify-between row">
              <div class="fontcstyle">Contacts</div>

              <!-- <q-item-label>
                <q-btn icon="add" :dense="true">Contact</q-btn>

                <q-tooltip style="background-color: black">
                  Add Contacts to follow</q-tooltip
                >
              </q-item-label> -->
            </div>
            <q-separator spaced inset="item" />
            <q-scroll-area class="col-grow column">
              <q-item class="col-grow column">
                <q-item-section
                  class="fontastyle"
                  v-for="(contact, index) in _this.contacts"
                  :key="index"
                >
                  <q-btn flat :dense="true" class="fontastyle text-bold"
                    >+{{ contact }}</q-btn
                  >
                </q-item-section>
              </q-item>
            </q-scroll-area>
          </q-list>

          <q-separator spaced inset="item" />
          <q-list class="col-2">
            <q-item class="items-center q-gutter-sm justify-between">
              <div>
                Language:
                <q-btn
                  :dense="true"
                  no-caps
                  class="q-pa-none"
                  flat
                  size="sm"
                  :label="_pageSettings.languageOptions[_pageSettings.language]"
                  @click="
                    _pageSettings.language = _pageSettings.language ? 0 : 1
                  "
                />
              </div>
              <q-btn color="red" size="sm" @click="_logOut()" :dense="true"
                >Logout
              </q-btn>
            </q-item>

            <q-item class="row">
              <q-item-label
                class="col boxastyle q-pa-sm row justify-between bg-grey text-dark"
              >
                mesh
                <p>{{ _this.enrollKey ?? false }}</p>
                <q-item-label
                  >&copy;{{ new Date().getFullYear() }}
                </q-item-label>
              </q-item-label>
            </q-item>
          </q-list>
          <!-- <q-badge
          v-if="_profile_iss != 'client'"
          class="justify-between q-pa-xs q-mx-md"
        >
          Upgraded</q-badge
        >
        <q-badge v-else class="justify-left q-mx-md" color="dark">
          <q-item-label style="color: red">Un Upgraded</q-item-label>
          <q-tooltip class="q-pa-xs"
            >Upgrading enables to sale and buy !</q-tooltip
          >
        </q-badge>
        <q-badge class="justify-between q-pa-xs q-mx-md"> </q-badge> -->
        </q-scroll-area>

        <q-scroll-area
          v-else
          class="column justify-between bg-white"
          style="height: 100%; scrollbar-width: 0px; scrollbar-color: green"
        >
          <!----profile graphics/imaging-->

          <div class="row q-gutter-sm">
            <div>
              <div
                class="col-2 q-mx-sm shadow-10"
                style="
                  border-radius: 35px;
                  overflow: hidden;
                  position: relative;
                  top: 05px;
                  left: 10px;
                  max-width: 15vw;
                "
              >
                <img
                  :src="_this.profile[0]"
                  style="width: 100%; aspect-ratio: 2/2"
                />
              </div>
            </div>

            <q-card
              class="col row justify-between items-center q-px-md transparent"
              flat
              v-if="_thisOps ?? false"
            >
              <!---profile_update-->
              <div class="q-gutter-xs justify-end text-black">
                <div>
                  <input
                    type="file"
                    multiple
                    ref="filep"
                    style="display: none"
                    @change="_fileSourceFolder($event, 'profile')"
                  />
                  <q-btn
                    icon="folder"
                    class=""
                    color="grey"
                    size="md"
                    flat
                    @click="$refs.filep.click()"
                    :dense="true"
                  />
                  <q-btn
                    color=""
                    class=""
                    size="md"
                    flat
                    text-color="purple"
                    icon="camera"
                    @click="_cameraInstance._openCamera('profile')"
                    :dense="true"
                  />
                </div>
                <div>Editing Profile</div>
              </div>

              <div>
                <q-btn
                  class=""
                  icon="done"
                  no-caps
                  size="sm"
                  flat
                  :dense="true"
                  @click="updateUser()"
                >
                  <h1 class="text-black fontastyle text-green">Apply</h1>
                </q-btn>
              </div>
            </q-card>
          </div>

          <!----profile basic informations-->
          <q-list padding class="col-9 column" style="min-height: 50vh">
            <q-item class="row justify-between">
              <q-item-section
                style="
                  max-width: 100px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                "
              >
                <q-item-label overline>{{ _this.username }}</q-item-label>
                <q-item-label
                  >{{ _this.name }} {{ _this.lastName }}</q-item-label
                >
                <!-- <q-item-label caption>Since : {{  _this.updatedAt }}</q-item-label> -->
              </q-item-section>

              <q-item-section side top>
                <q-item-label class="row justify-between fontastyle">
                  <q-btn
                    flat
                    class="fontastyle text-red"
                    round
                    label="Cancel"
                    size="sm"
                    :dense="true"
                    @click="_thisOps = _thisOps ? false : 'cinfo'"
                    v-if="_thisOps"
                  />
                  <div v-else>
                    <q-btn
                      flat
                      class="fontastyle text-orange"
                      size="sm"
                      :dense="true"
                      label="MyStore"
                    />
                    <q-btn
                      flat
                      class="fontastyle text-black"
                      round
                      size="sm"
                      label="Edit Profile"
                      :dense="true"
                      @click="_thisOps = _thisOps ? false : 'cinfo'"
                    />
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator spaced />
            <!----Personal Information  _thisOps -->
            <div class="col-auto column q-gutter-xs">
              <div
                v-for="cinfo in ['name', 'lastName', 'userName']"
                :key="cinfo"
                class="q-pa-none q-ma-none q-pa-sm"
              >
                <q-item-section class="q-pa-none q-ma-none q-px-sm fontastyle">
                  <q-item-label
                    style="text-transform: capitalize"
                    v-if="_thisOps == 'cinfo'"
                  >
                    <q-input
                      standout
                      v-model="_this[cinfo]"
                      :label="cinfo"
                      stack-label
                      size="xs"
                      class="fontastyle"
                      :dense="true"
                    />
                  </q-item-label>
                  <div
                    style="text-transform: capitalize"
                    class="row q-gutter-sm"
                    v-else
                  >
                    <p>{{ cinfo }}</p>
                    <h1>{{ _this[cinfo] }}</h1>
                  </div>
                </q-item-section>

                <q-item-section side>
                  <div
                    class="text-grey-8 q-gutter-xs"
                    v-if="_thisOps == 'cinfo'"
                  >
                    <q-btn
                      class="gt-xs"
                      size="12px"
                      flat
                      dense
                      round
                      icon="clear"
                      @click="_this[cinfo] = ''"
                    />
                    <!-- <q-btn class="gt-xs" size="12px" flat dense round icon="done" @click="updateUser()" /> -->
                  </div>
                </q-item-section>
              </div>
            </div>

            <!------Address Informa-->
            <q-separator spaced inset="item" />
            <div class="col-auto q-px-sm row justify-between row">
              <div class="fontastyle">Contacts</div>

              <!-- <q-item-label>
                <q-btn icon="add" size="xs" :dense="true">Contact</q-btn>
                <q-tooltip style="background-color: black">
                  Add Contacts to follow</q-tooltip
                >
              </q-item-label> -->
            </div>
            <q-separator spaced inset="item" />
            <q-scroll-area class="col-grow column">
              <q-item class="col-grow column">
                <q-item-section
                  class="fontastyle"
                  v-for="(contact, index) in _this.contacts"
                  :key="index"
                >
                  <q-btn flat :dense="true" class="fontastyle text-bold"
                    >+{{ contact }}</q-btn
                  >
                </q-item-section>
              </q-item>
            </q-scroll-area>
          </q-list>

          <q-separator spaced inset="item" />
          <q-list class="col bg-white">
            <q-item class="items-center q-gutter-sm justify-between">
              <div>
                Language:
                <q-btn
                  :dense="true"
                  no-caps
                  class="q-pa-none"
                  flat
                  size="sm"
                  :label="_pageSettings.languageOptions[_pageSettings.language]"
                  @click="
                    _pageSettings.language = _pageSettings.language ? 0 : 1
                  "
                />
              </div>
              <q-btn color="red" size="sm" @click="_logOut()" :dense="true"
                >Logout
              </q-btn>
            </q-item>

            <q-item class="row">
              <q-item-label
                class="col boxbstyle row justify-between text-dark"
                style="background-color: whitesmoke"
              >
                mesh
                <p>{{ _this.enrollKey ?? false }}</p>
                <q-item-label
                  >&copy;{{ new Date().getFullYear() }}
                </q-item-label>
              </q-item-label>
            </q-item>
          </q-list>
          <!-- <q-badge
          v-if="_profile_iss != 'client'"
          class="justify-between q-pa-xs q-mx-md"
        >
          Upgraded</q-badge
        >
        <q-badge v-else class="justify-left q-mx-md" color="dark">
          <q-item-label style="color: red">Un Upgraded</q-item-label>
          <q-tooltip class="q-pa-xs"
            >Upgrading enables to sale and buy !</q-tooltip
          >
        </q-badge>
        <q-badge class="justify-between q-pa-xs q-mx-md"> </q-badge> -->
        </q-scroll-area>
        <!-- <div class="col-5 bg-green" @click="leftDrawerOpen = false">
        sssssssssssssssss
      </div> -->
      </div>
      <!-- <div class="col-grow" @click="leftDrawerOpen = false">sdd</div> -->
    </q-drawer>

    <!---drawer-Left-->
    <!-- :userID="_this.id"

            :userName="_this.userName"
            :phone="_this.phone"

            :phoneCode="_this.phoneCode"
            :location="_this.location"
            :geolocation="_this.geolocation" -->

    <q-page-container
      style=""
      class="col-grow transparent row"
      v-if="(_this['acctype'] ?? false) && (_this.id ?? false)"
    >
      <router-view
        :_profile="_this"
        :_acctype="_this.acctype ?? {}"
        :lytCreatRow="lytCreatRow"
        :lytSearchRow="lytSearchRow"
        :isScrolled="isScrolled"
        :isScrolledUp="isScrolledUp"
        :_thisMedia="_thisMedia"
        :_pageSetting="_pageSettings"
        :columnsM="columns ?? {}"
        :_thisDefaultM="_thisDefault ?? {}"
        :visibleColumnsM="visibleColumns ?? {}"
      />
    </q-page-container>
    <!--sticky_icons---inside-containers-->
    <div class="leftmidBox q-pa-none q-ma-none">
      <q-card
        class="q-py-xs column transparent fontastyle"
        style=""
        v-if="showsideMenu"
      >
        <!-- <q-btn flat icon="home" @click="router.push('/play/trend')" /> -->

        <q-separator inset horizontal />

        <q-btn
          :dense="true"
          size="sm"
          flat
          stack
          no-caps
          class="fontdstyle"
          @mouseover="iservice[3] = true"
          @mouseleave="iservice[3] = false"
          v-for="(iservice, index) in iservicei_Menu"
          :key="iservice"
          @click="routeIt(iservice.title, iservice.path, iservice.model)"
        >
          {{ index }}
          <!--q-item-label v-if="iservice[3]" caption >{{ iservice.title }} </q-item-label-->
          <q-icon size="xs" :name="iservice.icon" />
          <div>My</div>
        </q-btn>

        <q-btn
          flat
          label="?"
          @click="[_Supports, customerSupport] = [true, true]"
        />

        <q-separator inset horizontal />

        <!--q-btn  flat icon="more_vert"  @mouseover="showsideMenu =true">
      <q-menu auto-close :offset="[2, 2]"  self="bottom left">
        <q-list >
          <q-item clickable>
            <q-item-section>New group</q-item-section>
          </q-item>
          <q-item>
            <q-toggle
              size="xs"
              val="xs"
              toggle-indeterminate
              toggle-order="ft"
              v-model="toglColor"
              label="Mode"
              color="blue"
              :class="{
                'text-black ': $q.dark.isActive,
                'text-white': !$q.dark.isActive,
              }"
              @click="$q.dark.toggle()"
            />

          </q-item>
        </q-list>
      </q-menu>
    </q-btn-->
      </q-card>

      <!-- <q-btn  flat icon="more_vert"   @mouseover="showsideMenu = !showsideMenu" /> -->
    </div>

    <!--sticky-ends-->

    <!----Footers _null-->

    <q-footer
      class="col-auto row justify-evenly q-px-sm"
      style="background-color: black"
      v-if="$q.screen.lt.sm ? true : false"
    >
      <!-- <market-value /> -->
      <div v-if="Loadingevent.main ?? false">
        <div
          :style="Loadingevent.main ? 'width:80%;background-color:orange' : ''"
        ></div>
      </div>
      <div
        v-for="(iservice, key) in iservicei_Menu"
        :key="key"
        class="col-grow q-py-xs q-ma-none"
      >
        <q-btn
          :dense="true"
          flat
          stack
          no-caps
          class="row col-grow q-ma-none q-pa-none"
          @click="routeIt(iservice.title, iservice.path, iservice.model)"
        >
          <q-icon size="xs" :name="iservice.icon" />
          <h1>{{ key }}</h1>
          <q-tooltip
            style="background-color: black; color: white; font-weight: bolder"
          >
            {{ iservice.title }}
          </q-tooltip>
        </q-btn>

        <div
          :class="_pageSettings.path == iservice.path ? 'horizontalLine ' : ''"
        ></div>
      </div>

      <q-btn
        :dense="true"
        flat
        stack
        no-caps
        class="row col-grow q-ma-none q-pa-none"
        style="max-width: 30px"
        @click="leftDrawerOpen = !leftDrawerOpen"
      >
        <img
          :src="_this.profile[0]"
          style="width: 100%; aspect-ratio: 2/2; border-radius: 15px"
        />
      </q-btn>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeMount, watch } from "vue";
import { storeToRefs } from "pinia";
import { toRaw } from "vue";
import { useLocalStorage } from "@vueuse/core";
//import { notifyit } from "src/composables/transducer";
import { getCountry, getState, countries } from "src/services/geotimezone";

import { iservicei_Menu } from "src/composables/constVariables";
var showsideMenu = ref(false);

import { exportFile, useQuasar, useMeta } from "quasar";
import { screenSize } from "src/services/utils";
//import userProfile from "src/components/userProfile.vue"
import { timeStore } from "src/stores/jstStores/serviceStore.js";
import { useRouter } from "vue-router";

import { profileStore } from "src/stores/authenticatedStore/profileStore";
import { publicchatStore } from "src/stores/chatStores/publicchatStore";
//import {chatStore} from "src/stores/authenticatedStore/chatStore"
import { authenticatingStore } from "src/stores/authenticatedStore/authenticatingStore";

import _localStorage from "src/services/storeService";
//---
import { useScroll } from "@/composables/scrollEvent";
const { isScrolled, isScrolledUp } = useScroll(1000); // Adjust threshold as needed

// import _localStorage from "src/services/storeService"; //_localStorage._clear()
//var socket = new WebSocket('ws://127.0.0.1:9100');
import dialogOne from "src/components/dialogs/dialogOne.vue";

import debugCard from "src/components/debugCards.vue";
import useDebugMixin from "src/composables/mixins/debugMixin";
const {
  Loading, //
  Loadingevent,

  DoneMessage,
  KnowthisMessage,
  WarnthisMessage,
  //----------returning values
  // timerLoadpage,
  timerLoadevent,

  timerLoad,

  timerDone,
  timerInformthis,
  timerError,
} = useDebugMixin();

import useStatusMixin from "@/composables/mixins/statusMixin";
const {
  status_Loading,
  status_DoneMessage,
  status_KnowthisMessage,
  status_WarnthisMessage,
  //----------returning values
  staus_timerLoad,
  status_timerDone,
  status_timerInformthis,
  status_timerError,
} = useStatusMixin();

import usefileMixin from "src/composables/mixins/fileserviceMixin";
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
  // _resetfBox,
} = usefileMixin();

//--------------
const $q = useQuasar();
//-----------Store & Service

const profileService = profileStore();
const publicchatService = publicchatStore();
//-----------
const _theService = profileService;
const authService = authenticatingStore(); //it(storeToRefs) is like computed_ reactive_variable

const router = useRouter();

//const $m = useMeta()

const metaData = {
  // sets document title
  title: "iService",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - DashBoard`,

  icon: "/public/icons/favicon-32x32.jpg",
  // JS tags
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
//--------------------
//$q.dark.toggle()

//-------
var lytSearchRow = ref("");

//------variables
var leftDrawerOpen = ref(false); //hide & show sideBar
var _popUpgrader = ref(false);

var _Supports = ref(false);
var customerSupports = ref(false);
var deviceSupport = ref(false);

var lytCreatRow = ref(false);
//import CameraFeeds from "components/CameraFeeds.vue"
// let _cameraBox =ref(false)
//lytCreatRow
//-----------------------Local Varialbles

//-----Layout_Style & behaviors
let _profile_iss = ref(null);
let _mainModal_iss = ref(null);
//-------------USER PROFILE_Variables..
//===============================================-----------------------------------------
//------------- MODAL ROWs_ MANAGMENT

var _this = ref({});
let _thisOps = ref(null); //the selected row_actual_Data..as object

async function _thisDefaulting() {
  _this.value = {};
  try {
    _this.value.phone = null;
    _this.value.phoneCode = ["", ""];

    _this.value.geolocation = {};
    _this.value.geolocation = { lat: "", long: "" };

    _this.value.location = {};
    _this.value.location = { country: "", city: "", street: "" };
  } catch {}

  return true;
}

//===============================================-----------------------
watch(_this, async (_newV, _oldV) => {
  let _requestHeader = {};
  let _geoLoc = _newV?.["geolocation"] ?? false;
  if (_geoLoc) {
    _updateStorage("lat", toRaw(_geoLoc.lat ?? null));
    _updateStorage("long", toRaw(_geoLoc.long ?? null));
  }
  //-----------
  try {
    _localStorage._set("currency", _newV.phoneCode[2] ?? null);
  } catch {}
  _setPageSetting();
  return true;
});

///-----------------------File Operations and setting  UP(Folder) vs Down(Camera)
//-------------------------------------------
//---------------Automatically register all visitors (Basic Infor...Phone_)
async function updateUser(_isFileCapsulated = false) {
  //updating User DAta with graphic to update
  //_thisOpsStatus.value=false
  let _fileExitance = _fileAttributeName.value ?? false;
  if (_fileExitance) {
    _this.value[_fileExitance] = _fileAsRaw.value;
    if (_fileExitance == "profile") {
      _this.value["file_"] = { files: _fileExitance }; //profile require multiple file
    } else {
      _this.value["file_"] = { file: _fileExitance }; //or cover it's (require single file)
    }
  }

  _fileAttributeName.value = null;
  return await Crud_this.updateData()
    .then((response) => {
      if (response) {
        _this.value = Object.assign(_this.value, response); //is creating error on _page(routerView)
        _thisOps.value = false;
        timerDone(5000, "Item Updated", "Succefully Updated");
      } else {
        timerError(5000, "Error Updating", "Error Updating" + response);
      }
      return true;
    })
    .catch((e) => {
      _thisOps.value = false;
      timerError(5000, "Error Updating", "Error Updating" + e);
      return false;
    });
}

//----------------
let createKey = "phone";
let updateKey = "id";
let delKey = "id";

//ModalCrudOps

const Crud_this = {
  createData: async function (objParam = {}) {
    //-------Check for Param_Requirents
    try {
      if (_this.value[createKey] == null) {
        return false;
      }
      //-----------Calling for Store Services  (_suburl, formData, objParam)
      return await _theService
        .createData(_this.value, objParam)
        .then((response) => {
          if (response.status) {
            return response.data;
          } else {
            timerLoadevent({ createData: 5000 }, 5000, "Error" + response.data);
            return false;
          }
        })
        .catch((e) => {
          timerLoadevent(
            { createData: 5000 },
            5000,
            "Error createData",
            "..." + e
          );
          return false;
        });
    } catch (e) {
      timerLoadevent({ createData: 5000 }, 5000, "Error createData", "..." + e);
      return false;
    }
  },
  //----------------------------------------------------------------
  updateData: async function (objParam = {}) {
    //-------Check for Param_Requirments
    try {
      if (_this.value[updateKey] == null) {
        return false;
      }
      //-----------Calling for Store Services
      return await _theService
        .updateData(_this.value, objParam)
        .then((response) => {
          if (response.status) {
            return response.data;
          } else {
            timerLoadevent({ updateData: 5000 }, 5000, "Error" + response.data);
            return false;
          }
        })
        .catch((e) => {
          timerLoadevent(
            { updateData: 5000 },
            5000,
            "Error updateData",
            "..." + e
          );
          return false;
        });
    } catch (e) {
      timerLoadevent({ updateData: 5000 }, 5000, "Error updateData", "..." + e);
      return false;
    }
  },

  readData: async function () {
    timerLoadevent({ readData: 0 }, 0, "Searching...");
    return await _theService
      .readData()
      .then((response) => {
        if (response.status) {
          return response.data;
        } else {
          timerLoadevent({ readData: 5000 }, 0, " Error " + response.data);
          return false;
        }
      })
      .catch((e) => {
        timerLoadevent({ readData: 5000 }, 5000, "Error Deleting", "..." + e);
        return false;
      });
  },

  //---------------------------------------------------------------
  readFData: async function (objParam = {}) {
    //-------Check for Param_Requirents
    timerLoadevent({ readFData: 0 }, 0, "Searching...");
    try {
      if (Object.keys(objParam).length == 0) {
        return false;
      }
      //-----------Calling for Store Services
      return await _theService
        .readFData(objParam)
        .then((response) => {
          if (response.status) {
            return response.data;
          } else {
            timerLoadevent({ readFData: 5000 }, 0, " Error" + response.data);
            return false;
          }
        })
        .catch((e) => {
          timerLoadevent(
            { readFData: 5000 },
            5000,
            "Error Deleting",
            "..." + e
          );
          return false;
        });
    } catch (e) {
      timerLoadevent({ readFData: 5000 }, 5000, "Error Deleting", "..." + e);
      return false;
    }
  },

  deleteData: async function () {
    //-------Check for Param_Requirents
    timerLoadevent({ deleteData: 0 }, 0, "Searching...");
    try {
      if (Object.keys(objParam).length == 0) {
        // notifyit.warn("Incompleted Form ?");
        return false;
      }
      //-----------------
      let objParam = {};
      objParam[delKey] = _this.value[delKey];
      //---------
      return await _theService
        .deleteData(objParam)
        .then((response) => {
          if (response.status) {
            // timerDone(5000, 'Deleted', '...');
            return response.data;
          } else {
            timerLoadevent({ deleteData: 5000 }, 0, " Error" + response.data);
            return false;
          }
        })
        .catch((e) => {
          timerLoadevent(
            { deleteData: 5000 },
            5000,
            "Error Deleting",
            "..." + e
          );
          return false;
        });
    } catch {
      timerLoadevent({ deleteData: 5000 }, 5000, "Error Deleting", "..." + e);
      return false;
    }

    return await _theService
      .deleteData(objParam)
      .then((response) => {
        if (response[0]) {
          return response[1];
        } else {
          // notifyit.warn("Store Return False" + response[1]);
          return false;
        }
      })
      .catch(() => {
        // notifyit.info("Try to reconnect...");
        return false;
      });
  },
};
//--------------------------------------------------------------------UTILITIED_FUNCTIONS ( LocalStarage -- Profiling)
//_____________________________________________________Functions Definitions

//-----------------------------------Loading...process...showOFF
let init_navObj = ref(false);
let _location = ref(null);
let _Country = ref([]); //computed(() => getCountry());
let _State = ref(null);
// let gpsStatus = ref(null);
//_thislocation
import _thisPosition from "src/composables/mixins/geolocMixin";
const {
  askForGPS,
  _thislocation,
  gpsStatus,
  allowGPS,
  _initGeo,
  getCurrentPosition,
} = _thisPosition();

watch(gpsStatus, (_nowValue, ov) => {
  if (_nowValue == "finish" || _nowValue == null) {
    resetUserAddress();
  }
  return true;
});
watch(_thislocation, (_nowValue, ov) => {
  console.log(_nowValue, "updating thisloc");
  if (_nowValue) {
    _this.value.geolocation = _nowValue;
    _updateStorage("lat", toRaw(_nowValue.lat ?? null));
    _updateStorage("long", toRaw(_nowValue.long ?? null));
  }
  return true;
});

async function resetUserAddress() {
  //extract geoData
  console.log(
    "Setting Locations =<> GPS = ",
    Object.values(_this.value.geolocation ?? {}),
    " && timeZone = ",
    _State.value
  );
  if (!_State.value) {
    return false;
  }
  //---------------
  //------ If GPS is Active(GOOD), Else use the timezone GPSLocation
  if (!(_thislocation.value ?? false)) {
    let geoLoc = (_State.value.loc ?? "").split(",");
    console.error(geoLoc, "GPS ACESS IS BLOCKED, timeZone API OPtions ....");
    if (geoLoc[1]) {
      _this.value.geolocation = { lat: geoLoc[0], long: geoLoc[1] };
    }
  } else {
    _this.value.geolocation = _thislocation.value;
  }
  _localStorage._set("lat", _this.value.geolocation.lat);
  _localStorage._set("long", _this.value.geolocation.long);
  //always use the timezone/apitime zone data to locationsInformations
  _this.value.phoneCode = _Country.value;
  _this.value.location["country"] = _State.value.country ?? ""; //
  _this.value.location["city"] = _State.value.city ?? ""; //
  _this.value.location["street"] = _State.value.city ?? ""; //
  _this.value.location["provinance"] = _State.value.region ?? ""; //

  //---------------------- for product tracking purpose only
  _this.value.currency =
    _Country.value[2] ?? _localStorage._get("currency", "ETB"); //
  //-------------

  //---------
  console.log(
    "Final =<> GPS = ",
    _this.value.geolocation,
    " && Locations = ",
    _this.value.location
  );
  gpsStatus.value == null ? "" : (gpsStatus.value = null);
  return true;
}
//-----------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---- authentication Auditors and Setup
var { getLogStatus, getLogUser, getLogisREgistered, clearlogStatus } =
  storeToRefs(authService); //is like making reactive(ref)_variable
watch(getLogisREgistered, async (_newV, _oldV) => {
  if (_newV) console.log("user Loged");
  return true;
});
//--------------------------------------------------------------------Profiling (CHECK AUTHENTICATIONS &&& USER INFORMATIONS)
var _manageStoreLogin = async function () {
  console.log(
    "\n\nFunction - _manageStoreLogin --STORE Authentication Initializing [Phone,Stored_ID]---- \n"
  );
  return await authService
    .useLogin(_this.value)
    .then(async (resp) => {
      console.log(`\n LoginStatus = ${resp.status} \n`);
      if (!(resp.status ?? false) || !(resp["data"] ?? false)) {
        //------------1st is not loged, 2nd
        await timerLoadevent({ main: 0 }, 5000, "Authentication Error");
        return router.push("/");
      }
      //----------- Succefully Registered
      _this.value = Object.assign({}, resp.data);
      console.log(`\n User Acctype` + _this.value["acctype"] + ` \n`);
      //------------ Validate Acctype ?
      if (!(_this.value["acctype"] ?? false)) {
        await timerLoadevent({ main: 5000 }, 0, "Access Error, Retrying..");
        return router.push("/");
      }
      //----------- Loading Messages
      _profile_iss.value = _this.value["acctype"]["profile"] ?? null;
      _mainModal_iss.value = _this.value["acctype"]["saleit"] ?? null;

      await timerLoadevent({ main: 5000 }, 4000, "Ok");
      return true;
    })
    .catch(async (e) => {
      return await timerLoadevent({ main: 0 }, 0, "Error Connecting.." + e);
    });
};

//-----------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-----------ON-Mouted Operations and Authentications
//-----------Intializing....first functions and required datas
// var positionInstance = new _locationDevices(); //constructorialize navigator class
var _cameraInstance = new _cameraDevice();
// var positionInstance = new _thisPosition(); //constructorialize navigator class
// let _informthis=ref(false)
timerLoadevent({ main: 0 }, 0, "Loading...");
onMounted(async () => {
  //onMounted
  // await timerLoadevent({ main: 7000 }, 0, "Please Wait..");
  //----------------onMoute Listen for scroll actions
  // window.addEventListener('scroll', handleScroll);
  return await _manageStoreLogin()
    .then(async (resp) => {
      //--------------ON MOUNT
      console.log(`\n<Loged IN> <==> Mining UserDevice Informations \n`);
      console.log("Initiating the API or TimeZone Locations System");
      _Country.value = await getCountry();
      console.log(_Country.value, "GET COUNTRY");
      _State.value = await getState();
      console.log(_State.value, "GET State");
      console.error(
        "Terminating the API or TimeZone Locations System, && INIT GeoData Mining using GPS or TimeZone GeoData !!! !"
      );
      _initGeo();
      //-----------------------
      console.log(
        `\n <==> Mining UserDevice Informations == positionInstance END, with Object == \n`,
        init_navObj.value
      );

      return true;
    })
    .catch(async (e) => {
      console.log("Loging IN Error <>", e);
      await timerLoadevent({ main: 0 }, 5000, "scrumbled privilege detected");
      return _logIn();
    });
});

// timerLoadpage(15000,"Loading...")
//Loadingpage.value = [{ content: "Loading..." }]; //it
onBeforeMount(async () => {
  //--------------ON MOUNT
  console.log("\n\n<---------Defaulting Profile <--this--> ---- \n");
  // await _thisDefaulting(); //Build Basic _this_default Schema ( same to columns)
  console.log(
    "\n\n---------Mining User Device Informations [Phones, GeoLocations]---- \n"
  );
});
_thisDefaulting();
//----------------------------------------
let excludedModals = ["user", "group", null, "", "home"];

let routeIt = async (_name = null, _path = null, _accModel = true) => {
  if (!_name || !(_this.value["acctype"] ?? false)) {
    return false;
  }
  if (iservicei_Menu[_name]._auth) {
    if (!(_this.value.enrolled ?? false)) {
      _thisOps.value = "createPermission";
      return false;
    }
  }
  // await timerLoadevent({ main: 3000 }, 3000, "Loading " + _path); //Message  [ wait 3 sec ] [reset]
  await timerLoadevent({ main: 0 }, 0, "Loading " + _name); //Message display for unlimited sec,but  wait && don reset it
  try {
    let routePath = Object.assign(
      { acctype: _this.value["acctype"][_accModel] ?? "" },
      _localStorage._reroute(_name, _path, screenSize.value == "Small")
    );
    _updateStorage("path", _path);
    await router.push(routePath);
    timerLoadevent({ main: 1 }, 1, "Ok, Loading " + _name); //Message display for 3sec,but don wait && reset it
    return true; //
  } catch (e) {
    console.log(
      `\n\n</Routing Functions of pathName = ${_name}  == >> ${e} == >>  \n`
    );
    timerLoadevent({ main: 3000 }, 3000, e);
    return false;
  }
};

let _logOut = async () => router.push(_localStorage._clear());
let _logIn = async () => router.push("/");
let _enroll = async (key = null) => {
  if (_this.value.enrollKey ?? false) {
    let isregistered = await Crud_this.readFData({
      enrollKey: _this.value.enrollKey,
      phone: _this.value.phone,
      queryOperator: "-and",
    });
    if (isregistered && isregistered.length) {
      _this.value.enrolled = true;
      _thisOps.value = null;
      routeIt("MyServices", "MyServices", "saleitClient");
      return true;
    } else {
      _this.value.enrollKey = null;
      _this.value.enrolled = null;
    }
  }
  timerDone(5000, "Incorrect keys", "Incorrect keys");
  return false;
};
//----------
let _opengeoSearch = ref(false);
let _pageSettings = ref({});
async function _setPageSetting(currency) {
  _pageSettings.value["tableView"] = _localStorage._get("tableView", "main");
  _pageSettings.value["currency"] = _localStorage._get("currency", "");
  //------------User Settings
  _pageSettings.value["language"] = _localStorage._get("language", 1);
  _pageSettings.value["languageOptions"] = ["Tigrigna", "English"];
  //-------------
  // _pageSettings.value['screenSize'] =screenSize.value
  //---
  _pageSettings.value["path"] = _localStorage._get("path", "saleit");
  //-----
  _pageSettings.value["geoSearch"] = {
    state: "off",
    value: await _localStorage._get("geoSearch", "off"),
  };
}

async function _updateStorage(key, value) {
  if (value) {
    _pageSettings.value[key] = value;
    _localStorage._set(key, toRaw(value));
  }
  return true;
}
//------------------------
let _openpubChat = ref(false);
let _chatting = ref({
  userID: _this.value.id,
  phone: _this.value.phone ?? 0,
  content: "",
});
async function openpubChat(_set = null) {
  _chatting.value.userID = _this.value.id;
  _chatting.value.phone = _this.value.phone;

  if (_set) {
    //-----enable box
    _openpubChat.value = !_openpubChat.value;
    return true;
  }
  return await publicchatService
    .createData(_chatting.value, { id: _this.value.id })
    .then((resp) => {
      if (resp) {
        _chatting.value.content = "";
      }
      return true;
    });
}

let _publiclive = ref("");
let _setpublicchat = ref(false);
let _chatWatch = ref(true);
watch(_setpublicchat, (_nowValue, ov) => {
  _nowValue ? _liveChatting(2000) : _liveChatting(false);
  return true;
});

_chatWatch = computed(() => {
  let a = ""; //_setpublicchat.value;
  if (a) {
    _liveChatting(2000);
  } else {
    clearInterval(_publiclive.value);
    publicchatService.set_syncLock(true);
    // _liveChatting(60000);
  }
  return a;
});
async function _liveChatting(period) {
  clearInterval(_publiclive.value);
  if (period) {
    _publiclive.value = setInterval(publicchatService.asyncDatas, period);
  } else {
    publicchatService.set_syncLock(true);
  }
  return true;
}
//
//------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@------------Modal CRUD_OPs

// let _this_acctype = ref({});
// // Objprops_.value = Objprops;
// _this_acctype = computed(() => {
//   if (_mainModal_iss.value ?? false) {
//     return _mainModal_iss ?? null;
//   } else {
//     return null;
//   }
// });
//----STORE & SERVICES
import useMainMixin from "@/composables/mixins/thisMainMixin";
let {
  count,
  //------------
  //----------returning values
  // _allColumnNames,
  // _rolesColumns,
  // visibleColumns,
  lockedColumns,
  invisibleColumns,
  // //----------------functions

  //---------settings
  // Objprops_,
  _thisModel,
  _this_Schema,

  // _this_Rows,
  // status_thisDetail,
  // _this,

  columns,
  // _this_Query,
  // _this_RowsStatus,
  //-----------//-- returning values
  _thisDefault,

  _thisModels,

  //------
  // visible_clientColumns,
} = useMainMixin();

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
  //----------------functions

  modal_iss,
  //------preparing the main default and table_design.
  _this_Defaulting,
  //------preparing the foreign default and table_design
  foreign_Columns,
  _this_foreignDefaulting,
  //------
  // visible_clientColumns,
} = useDefaulMixin();

import useschemaValidator from "src/composables/utilServices/schemaValidator";
const {
  thisSchemaPath,
  thisSchemaFile,
  //------------
} = useschemaValidator();

Objprops_.value = { _profile: _this.value, _acctype: _this.value.acctype };

thisSchemaPath.value = "saleitSchemas";
thisSchemaFile.value = "saleitSchema";
import dynamicModular from "../composables/utilServices/dynamicModule.js";
_this_Schema.value = dynamicModular(thisSchemaPath.value, thisSchemaFile.value);

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
let rolesWall = null;
let capabilityWall = null;
let modelRole = null;
//-------------Syncing Columns
columns = computed(() => {
  //compute for _this_acctype.value
  console.log(
    `\n\n Creating 'Saleit' Table Schema with AccTypeof ${_mainModal_iss.value}`
  );
  if (!_mainModal_iss.value) {
    return [];
  } else {
    let _tableColumn = []; //HOLDING_  all the ---"Columns"--- of the Data_model ( TOTAL Columns)
    let _visibleColsName = []; ////--HOLDING_ all the ---"Visible" Columns"---- of the Data_model ( TOTAL Columns)

    //-------<<<<>>>>-------Preparing this_model role_schemas
    rolesWall = _mainModal_iss.value.role ?? false;
    capabilityWall = _mainModal_iss.value.capability ?? false;
    modelRole = _mainModal_iss.value.roles ?? []; //accstage
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
    // _this_foreignDefault();
    return _tableColumn;
  }
});

async function _setDefaults() {
  // _this_modelOneModels = ['phone',"userName","geolocation",'location','phoneCode'] //
  // _thisModels = ['phone',"userName","geolocation",'location','userID','phoneCode'] //
  _thisDefault.value = await _this_Defaulting(_thisModels.value);
  _thisDefault.value["quantity"] = 1; //
  _thisDefault.value["phoneCode"] = _this.value.phoneCode; //
  _thisDefault.value["phoneCode"] = _this.value.phone; //
  //------==== building columns of thisMoel
  return true;
}

//-------------PWA Features
var deferredPrompt = null; // Holds the beforeinstallprompt event
var canInstallPWA = false; // Flag to show/hide install button
// Listen for the beforeinstallprompt event
try {
  window.addEventListener("beforeinstallprompt", (event) => {
    // Prevent the mini-infobar from appearing on mobile
    // event.preventDefault();
    // Store the event for later use
    deferredPrompt = event;
    // Show the install button
    canInstallPWA = true;
  });
} catch {}
async function installPWA() {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // Reset the deferredPrompt variable, since it can only be used once.
    deferredPrompt = null;
    // Hide the install button
    canInstallPWA = false;
  }
}
</script>

<style></style>
