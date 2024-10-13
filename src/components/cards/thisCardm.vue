<template>
<div class="overlay z-top" style="" @click="emitClose(null)" >
  <q-card
  style= 'max-width: 93vw;max-height:90vh;'
  v-if="Object.keys(_this_Up).length && _this_Schema" @click.stop>
    <!----HEADER-TOP Begin-->
    <!-- {{ _this_Up.currency }} {{ Objprops._profile.curreny }} -->
    <q-linear-progress :value="0.8" color="orange" />

    <q-card-section class="row items-center no-wrap q-pa-none">
      <div class="col q-pa-none q-ma-none">
        <q-img
          loading="lazy"
          class=""
 style= 'aspect-ratio: 2/1; max-width: 90vw;'

          :src="
            _fileAttributeName
              ? _fileAsSRC[_fileAsSRCIndex]
              : _this_Up[__thisFileAttribute][_fileAsSRCIndex]
          "
        >
          <div class="absolute-full transparent column justify-between">
            <div class="row q-ma-sm">
              <div
              class="justify-left col-auto"
              style="" v-if="_fileAsSRC && _fileAsSRC.length > 1"
            >

              <div class="row " style="width:100%;height:10px">
                <button style="border-radius:15px;width:30px" @click="_fileAsSRCOpsCall(index-1)" :key="index" v-for="index of _fileAsSRC.length">
        <p :style="_fileAsSRCOps ? 'color:red':''">  {{ index }} </p>
                </button>
              </div>

            </div>

              <div class="col  text-dark"></div>
              <div class="column col-auto q-gutter-xs" style="width: 5vw">
                <!-- <q-item-label class="text-orange">Upload Via </q-item-label> -->
                <input
                  type="file"
                  multiple
                  ref="openFolder"
                  style="display: none"
                  @change="_fileSourceFolder($event, __thisFileAttribute)"
                />

                <button

              stle="width:100px;height:100px;padding:0px;margin:0px;"
                  icon="folder"
                  @click="$refs.openFolder.click()"
                > <q-icon name="add_a_photo" style="width:100%;height:100%;padding:0px;margin:0px;"/>
              </button>

              <button

              stle="width:100px;height:100px;padding:0px;margin:0px;"
                  icon="folder"
                  @click="_fileAsSRCOps = !_fileAsSRCOps"
                > <q-icon name="delete" :style="_fileAsSRCOps ? 'color:red':''" />
              </button>
                <!-- <q-btn
                  class="bg-orange"
                  icon="add_a_photo"
                  @click="_cameraInstance._openCamera('saleitgr')"
                  :dense="true"
                /> -->
              </div>
            </div>

            <!-- <div class="flex fontestyle">
              <q-item-label> {{ _this_Up_Up["header"] }}</q-item-label>
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
                    flat
                    :label="_pageSettings.language ? 'Create' : 'Create'"
                    @click="_thisValidator('Create_this')"
                  >
                    <!--template v-slot:__thisOpsStatus>
                                                    uploading...
                                                    <q-spinner-radio class="on-left" />
                                                    uploading...
                                                  </template-->
                  </q-btn>
                </div>

                <div v-else class="font0astyle">
                  <q-btn
                    flat
                    :loading="__thisOpsStatus"
                    class="bg-orange shadow-7  q-pa-xs row flex-center"
                    color="white"

                    icon="upload"
                    @click="_thisValidator('Update_this')"
                  />
                  <p>   {{ _pageSettings.language ? 'Update' : 'Update' }} </p>

                </div>
              </div>


            </div>
          </div>
        </q-img>
      </div>
    </q-card-section>

    <q-card-section
      class="column text-dark bg-white fontbstyle"
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
              class="col  boxbstyle"
              v-model="_this_Up['quantity']"
              @update:model-value="
                _validateThis('quantity', _this_Up['quantity'])
              "
              style="max-width: 95%"

            />
          </fieldset>

          <fieldset class="col-auto" style="border: 0px solid black">
            <legend>
              Price

              <div v-if="_debugObj['price']" class="boxvalidStyle text-red">
                ( {{ _debugObj["price"] }})
              </div>
            </legend>
            <input
              type="Number"
              class="col fontestyle boxbstyle"
              v-model="_this_Up['price']"
              @input="_validateThis('price', _this_Up['price'])"
              @update:model-value="_validateThis('price', _this_Up['price'])"

            />
          </fieldset>

          <fieldset class="col-auto" style="border: 0px solid black">
            <legend>
              <p>{{ _pageSettings.language ? "ምድብ" : "currency" }}</p>

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
              style=""
              color="purple-12"
              v-model="_this_Up['currency']"
              @input="_validateThis('currency', _this_Up['currency'])"
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

        <div class="col">
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
              v-model="_this_Up['catagory']"
              @input="_validateThis('catagory', _this_Up['catagory'])"
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

        <div v-if="['Vehicles', 'Households'].includes(_this_Up['catagory'])">
          <q-radio
            keep-color
            left-label
            size="md"
            v-model="_this_Up['usage']"
            :val="usage"
            :label="usage"
            color="black"
            v-for="usage in _this_Schema['usage']['enum']"
            :key="usage"
            @update:model-value="_validateThis('usage', _this_Up['usage'])"
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
              v-model="_this_Up['quantity']"
              @update:model-value="
                _validateThis('quantity', _this_Up['quantity'])
              "
              style="max-width: 95%"
            />
          </fieldset>

          <fieldset class="col-auto" style="border: 0px solid black">
            <legend>
              Price

              <div v-if="_debugObj['price']" class="boxvalidStyle text-red">
                ( {{ _debugObj["price"] }})
              </div>
            </legend>
            <input
              type="Number"
              class="col fontestyle boxbstyle"
              v-model="_this_Up['price']"
              @input="_validateThis('price', _this_Up['price'])"
              @update:model-value="_validateThis('price', _this_Up['price'])"
              style="max-width: 95%"
            />
          </fieldset>
          <fieldset class="col-auto" style="border: 0px solid black">
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
              v-model="_this_Up['discount']"
              @input="_validateThis('discount', _this_Up['discount'])"
              @update:model-value="
                _validateThis('discount', _this_Up['discount'])
              "
              style="max-width: 95%"
            />
            <p>(Happy Hours Price)</p>
          </fieldset>
        </div>

        <q-separator inset />
        <div class="column q-gutter-sm">
          <q-input
            class="col-md col-xs q-pa-sm"
            style=""
            outlined
            v-model="_this_Up['header']"
            label="Name"
            @update:model-value="_validateThis('header', _this_Up['header'])"
            stack-label
          >
            <div v-if="_debugObj['header']" class="boxvalidStyle">
              {{ _debugObj["header"] }}
            </div>
          </q-input>
          <q-input
            outlined
            v-model="_this_Up['content']"
            @update:model-value="_validateThis('content', _this_Up['content'])"
            label="decscriptions"
            style=""
            filled
            autogrow
          >
            <div v-if="_debugObj['content']" class="boxvalidStyle">
              {{ _debugObj["content"] }}
            </div>
          </q-input>
        </div>
        <q-separator inset />
        <q-item-label caption> Notes to be displayed !</q-item-label>
        <q-separator inset />
      </fieldset>
    </q-card-section>
  </q-card>
</div>
</template>


<script setup>
import {
  defineEmits,
  ref,
  watch,
  reactive,
  onMounted,
  defineAsyncComponent,
  computed,
} from "vue";

import useschemaValidator from "@/composables/utilServices/schemaValidator";
var {
  thisSchemaPath,
  thisSchemaFile,
  //------------
  _debugObj,
  //-------
  _validateThis,
} = useschemaValidator();


import usefileMixin from "@/composables/mixins/fileserviceMixin";
var {
  _thisMedia,
  _fileAttributeName,
  //-------
  _cameraBox,
  _fileSourceFoCam,
  _fileAsSRC,
  _fileAsString,
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

const props = defineProps({
  _this: { type: Object, default: () => ({}) },
  _pageSettings:  { type: Object, default: () => ({}) },

  __thisOps: {type: String, required: true},
  __thisOpsStatus: {type: String},
  __thisFileAttribute: {type: String},


    //----------------=========  Validation Props and Values
    thisSchemaFile_Rec: {type: String},
    thisSchemaPath_Rec: {type: String },
});
// let fileName = 'saleitgr'

let _this_Schema=ref(null)
import dynamicModular from "@/composables/utilServices/dynamicModule.js";
dynamicModular(props.thisSchemaPath_Rec,props.thisSchemaFile_Rec).then((m)=>{
  if(m)  _this_Schema.value = m
})


var _this_Up = computed(() =>   props._this);
_fileAsString = computed(() =>   props._this[props.__thisFileAttribute]);
// var _this_UpOps = computed(() => props.__thisOps);
//------------
// _fileAttributeName = computed(() =>   props.fileAttributeName_Rec);
 thisSchemaPath = computed(() => props.thisSchemaPath_Rec);
 thisSchemaFile = computed(() => props.thisSchemaFile_Rec);

 watch(_fileAttributeName,(nv,ov)=>{
  if(nv){
    _this_Up.value[nv] =_fileAsRaw.value;
    if (typeof _fileAsRaw.value == "object") {
      _this_Up.value["file_"] = { files: nv };
    } else {
      _this_Up.value["file_"] = { file: nv};
    }
  }
  return true
 })

const emit = defineEmits(["Create_this", "Update_this", "close"]);
function _thisValidator(_action) {
  let _isCompleted = Object.values(_debugObj.value).every(
    (value) => value == null
  );
  if (!_isCompleted) {
    return false;
  } else if (!_this_Up.value.price) {
    return false;
  }
  //-----
  emit(_action);
  //data into parent is passing through reactive_behavioure(_this or injecting(fileName))
}

function emitClose() {
  emit("close", false);
}
</script>
<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: white;
  /* padding: 20px; */
  border-radius: 7px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
