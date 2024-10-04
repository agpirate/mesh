<template id="full-page">
  <!-----------------------------Dialog Schema Form-----START--->
  <!-----------------------------Dialog Schema Form-----START--->
  <q-dialog
    v-model="__thisBox"
    v-if="_rolesColumns.length"
    transition-show="scale"
    transition-hide="scale"
    style="
      background: rgba(73, 255, 1, 0.342);
      border: 15px solid rgb(0, 0, 117);
    "
    persistent
  >
    <mainForm
      inputColor="white"
      :_xDisplayDefaulted="_xDisplayDefaulted"
      :_rolesColumns="_rolesColumns"
      :_this="_this"
      :_thisDefault="_thisDefault"
      :__thisOps="__thisOps"
      :thisSchemaFile="thisSchemaFile"
      :thisSchemaPath="thisSchemaPath"
      @close="__thisBox = $event"
      @update="Update_this()"
      @create="Create_this()"
    />
  </q-dialog>

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

  <q-dialog
    v-model="__setRole"
    transition-show="scale"
    transition-hide="scale"
    style="
      background: rgba(73, 255, 1, 0.342);
      border: 15px solid rgb(0, 0, 117);
    "
    persistent
  >
    <div class="fontdstyle text-white column q-gutter-sm q-pa-sm">
      <div>Changing User Role & Permission</div>
      <div class="fontcstyle text-black">Select New RoleName</div>
      <div>
        <q-select
          style="min-width: 7vw"
          color="secondary"
          outlined
          dense
          v-model="_this.group"
          :options="group.enum"
          single
          use-chips
          stack-label
          label-color="black"
          class="col text-weight-bold"
        >
        </q-select>
      </div>
      <div class="row q-gutter-sm">
        <q-btn label="confirm" @click="Update_this('updateRole')" />
        <q-btn label="Cancel" color="red" @click="__setRole = false" />
      </div>
    </div>
  </q-dialog>

  <!-----------------------------Dialog Schema Form---END-->

  <div class="col row q-pa-xs q-gutter-xs" style="height: 90vh">
    <div class="col column rounded q-pa-sm" style="height: 90vh">
      <q-card class="col dark bordered column q-pa-none q-ma-none">
        <q-expansion-item
          :label="_thisModel + ' ' + 'More ...'"
          class="shadow-1 overflow-hidden"
          style="border-radius: 5px; text-transform: capitalize"
          header-class="text-black-10 text-blue"
          expand-icon-class="text-blue"
          :dense="true"
        >
          <q-card-section
            class="col-auto row"
            style="text-transform: capitalize"
          >
          </q-card-section>
        </q-expansion-item>

        <q-card-section
          class="q-pa-none col column bordered wrap scroll bg-orange"
        >
          <!----------------------------------------- Table View...-->
          <div class="col row" v-if="Object.keys(_this_acctype ?? {}).length">
            <q-table
              color="white"
              class="col text-md text-weight-bold sticky-table transparent"
              :dense="true"
              :rows="_this_Rows"
              :columns="columns"
              row-key="id"
              rowIndex="true"
              :selected-rows-label="getSelectedString"
              selection="multiple"
              v-model:selected="selected"
              @update:selected="updateSelected"
              :filterMethod="_thisFiltering"
              :filter="_thisfilter"
              :visible-columns="visibleColumns"
              no-data-label="Items doesn't Founded !"
              v-model:pagination="pagination"
            >
              <template v-slot:top-left>
                <div
                  class="row q-gutter-sm"
                  style="font-family: Ubuntu; font-weight: bolder"
                >
                  <div
                    class="q-gutter-xs row"
                    v-if="_this_acctype.capability ?? false"
                  >
                    <q-btn
                      dense
                      outline
                      class="col-auto"
                      :label="_thisModel + ' Managment'"
                    />
                    <q-btn
                      dense
                      color="orange"
                      class=""
                      :label="'Create  ' + _thisModel"
                      @click="__thisBox_Dialog(null)"
                      v-if="_this_acctype.capability[0] != '0'"
                    ></q-btn>
                  </div>
                </div>
              </template>

              <template v-slot:top-right>
                <div class="col-3 q-mx-sm">
                  <q-input
                    standout="bg-green"
                    style="
                      min-width: 7vw;
                      max-width: 13vw;
                      background: rgba(255, 255, 255, 0.589);
                      border-radius: 5px;
                    "
                    debounce="400"
                    color="black"
                    v-model="search"
                    label="Search"
                    stack-label
                    :dense="true"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
              </template>

              <template #header-cell="props">
                <q-th
                  style="text-align: left; text-transform: capitalize"
                  class=""
                  :props="props"
                  ><!--q-icon name="lock_open" size="1.5em" /-->
                  {{
                    typeof props.col.label === "string" ? props.col.label : " "
                  }}
                </q-th>
              </template>

              <template v-slot:body="props">
                <!-- {{ _this_Rows}}  -->
                <q-tr
                  :props="props"
                  class="cursor-pointer text-bold text-weight-bolder"
                  v-if="Object.keys(props.row).length"
                >
                  <q-tooltip class="bg-white" :offset="[10, 10]">
                    {{ props.row["_stage_"] }}
                  </q-tooltip>
                  <!------------------ iterating _ body cell-->
                  <q-td auto-width>
                    <q-toggle dense v-model="props.selected" />
                  </q-td>

                  <td
                    :props="props"
                    style="font-size: 0.6em; text-align: justify"
                    class="col text-bold text-center fontastyle"
                    :class="
                      object.name == 'name'
                        ? 'text-center text-weight-bolder'
                        : 'text-center '
                    "
                    v-for="object in props.cols"
                    :key="object.name"
                  >
                    <!-- is it single valued //// string or array of enum or .......-->
                    <template v-if="object.schema ?? false">
                      <div v-if="object.schema.type ?? false">
                        <!-- check if the object has type:"value" .. for string/array-->
                        <div
                          v-if="object.name != 'actions'"
                          class="text-black;fontastyle"
                        >
                          <q-badge v-if="object.name === 'gmStatus'">
                            <Label
                              :class="
                                props.row['gmStatus'] ? 'bg-green' : 'bg-red'
                              "
                            >
                              &nbsp;
                            </Label>
                          </q-badge>

                          <div
                            v-else
                            class="fontbstyle"
                            style="font-size: 0.7rem"
                          >
                            <q-card
                              flat
                              bordered
                              v-if="
                                'textarea' in Object.keys(object.schema ?? {})
                              "
                              :dense="true"
                            >
                              <q-badge v-if="props.row[object.name] ?? false">
                                <div v-html="props.row[object.name]"></div>
                              </q-badge>

                              <q-badge style="background: red" v-else>
                              </q-badge>
                            </q-card>

                            <q-card
                              flat
                              bordered
                              v-else-if="
                                ['r_Time', 'd_Time'].includes(object.name)
                              "
                              :dense="true"
                            >
                              <q-badge v-if="props.row[object.name] ?? false">
                                {{ props.row[object.name].split("T")[1] }}
                              </q-badge>
                              <q-badge style="background: red" v-else>
                              </q-badge>
                            </q-card>

                            <div v-else-if="props.row[object.name] ?? false">
                              {{ props.row[object.name] }}
                            </div>
                          </div>
                        </div>

                        <div
                          class="row q-gutter-xs text-dark"
                          v-else-if="_this_acctype ?? false"
                        >
                          <template v-if="_this_acctype.capability != '00000'">
                            <q-btn
                              color="orange"
                              label="Update"
                              @click="__thisBox_Dialog(props.rowIndex)"
                              class="fontastyle"
                              no-caps
                              v-if="
                                _this_acctype.capability[1] != '0' &&
                                _this_acctype.accstage.includes(
                                  props.row._stage_
                                )
                              "
                            />
                            <q-btn
                              color="red-7"
                              label="Delete"
                              @click="
                                _this_ActiveOperation._delRow(
                                  null,
                                  props.rowIndex,
                                  props.key
                                )
                              "
                              class="fontastyle"
                              :dense="true"
                              v-if="
                                _this_acctype.capability[2] != '0' &&
                                _this_acctype.accstage.includes(
                                  props.row._stage_
                                )
                              "
                              no-caps
                            />
                            <q-btn
                              color="green"
                              label="Role"
                              @click="__thisBox_Dialog(props.rowIndex, 'group')"
                              class="fontastyle"
                              :dense="true"
                              v-if="
                                _this_acctype.capability[2] != '0' &&
                                _this_acctype.accstage.includes(
                                  props.row._stage_
                                )
                              "
                              no-caps
                            />
                          </template>
                        </div>
                      </div>

                      <div
                        v-else-if="Array.isArray(object.schema)"
                        color="grey-4"
                        text-color="black"
                      >
                        <q-badge v-if="props.row[object.name] ?? false">
                          {{ props.row[object.name] }}
                        </q-badge>
                        <q-badge style="background: red" v-else> </q-badge>
                      </div>
                      <div
                        v-else-if="
                          Object.keys(object['schema']).includes('ref')
                        "
                        class="text-primary row q-gutter-xs col-auto"
                        :color="
                          props.row.status == 'Active'
                            ? 'green'
                            : props.row.status == 'Disable'
                            ? 'red'
                            : 'grey'
                        "
                        text-color="primary"
                      >
                        {{ props.row[object.name] }}
                      </div>
                      <div
                        v-else-if="Object.keys(object['schema']).length"
                        class="text-primary row q-gutter-xs col-auto"
                        :color="
                          props.row.status == 'Active'
                            ? 'green'
                            : props.row.status == 'Disable'
                            ? 'red'
                            : 'grey'
                        "
                        text-color="primary"
                      >
                        <!--- else it is objects...-->
                        <q-list
                          v-for="(columns, ky) in props.row[object.name]"
                          :key="ky"
                          class="column q-gutter-xs col-auto"
                          style="font-size: 0.7rem"
                        >
                          <q-item
                            clickable
                            v-ripple
                            class="rounded-borders col-auto row q-pa-none q-gutter-xs"
                            :class="$q.dark.isActive ? 'bg-red' : 'bg-white'"
                            v-if="'type' in object['schema'][ky]"
                            dense
                          >
                            <q-item-section
                              class="col-auto q-gutter-xs q-pa-none"
                            >
                              <q-item-label class="col-auto q-pa-none">
                                {{ ky }}
                                <q-badge v-if="columns ?? false">
                                  {{ columns }}
                                </q-badge>

                                <q-badge style="background: red" v-else>
                                </q-badge>
                              </q-item-label>
                            </q-item-section>

                            <q-item-section side> . </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                    </template>
                  </td>
                  <!------Ending------------ iterating _ body cell-->
                </q-tr>
              </template>

              <!----------------- top right utilities -->
            </q-table>

            <!------------------- Edit_/Add form box-->

            <!------------------- View form box-->
          </div>

          <!-- Table View ............Ending...-->
        </q-card-section>
      </q-card>
    </div>

    <!--- Profiling...-->
    <!----------------------------------VISUALITH-->
  </div>
</template>

<script setup>
//_____________________________________________Modules Definitions
import mainForm from "src/components/mainForm.vue";
// import BChart from "src/components/visualith/BChart.vue";
//-------------------------------------------------------------Importing System Modules
import {
  ref,
  reactive,
  computed,
  onMounted,
  onUnmounted,
  onBeforeMount,
  watch,
} from "vue";
import { useQuasar, useMeta } from "quasar";

import _localStorage from "src/services/storeService";

//import print from 'print-js';
import { useRouter, useRoute } from "vue-router";
//import { storeToRefs } from "pinia";
// import  {_isnull,_isempty,_isequ,_isgte,_islte,_isbtn} from "src/composables/validators"
import {
  cp,
  _createTitle,
  _updateTitle,
  _readTitle,
  _deleteTitle,
} from "src/composables/constVariables";

import {
  _startofthisYear,
  _endofthisYear,
  _startofthisMonth,
  _endofthisMonth,
} from "src/composables/utilServices/dateformats";

import { profileStore } from "stores/authenticatedStore/profileStore"; //empy Store ( Main Store)
import { thisStore } from "stores/dataStores/thisStore"; //Asset Store ( Main Store)
// import { genapiStore } from "src/stores/jstStores/genapiStore";

// import { profileSchema } from "src/composables/schemas/profileSchemas";

import statusCard from "src/components/statusCards.vue";

import confirmButton from "src/components/buttons/confirmButton.vue";
let confirmObj = ref(null);
let confirmMessage = ref("Are You Sure ?");

import dialogOne from "src/components/dialogs/dialogOne.vue";
const status_thisDetail = ref(null);

import debugCard from "src/components/debugCards.vue";
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

import useStatusMixin from "src/composables/mixins/statusMixin";
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

  modal_iss,
  //------preparing the main default and table_design.
  _this_Defaulting,
  //------preparing the foreign default and table_design
  foreign_Columns,
  _this_foreignDefaulting,
  //------
  // visible_clientColumns,
} = useDefaulMixin();

import useThisMixin from "src/composables/mixins/thisAndForeignMixin";
var {
  thisOps,
  thissubOpsStatus,
  //----------//------- settings
  // _is_this_netPrice,
  // _is_this_open,
  // _is_this_currency,
  // __thisBox_CDialog,
  __thisBox,
  //----------//-------
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

import useMainMixin from "@/composables/mixins/thisMainMixin";
let {
  count,
  //------------
  //----------returning values
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
  // _this_RowsStatus,
  //-----------//-- returning values
  _thisDefault,

  _thisModels,

  //------
  // visible_clientColumns,
} = useMainMixin();

import { useTableFilter } from "@/composables/mixins/tableMixin";
var { _enableRowFilter, _thisFiltering, _filteredRow } = useTableFilter();

import { useAssetFilter } from "src/composables/filters/profilefilter";
var { _enableRowFilter, _thisFiltering } = useAssetFilter();

const $q = useQuasar();
//const $m = useMeta();
const router = useRouter();

const metaData = {
  // sets document title
  title: "Admin DB Managment",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - DashBoard`,
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
//-------------------------------------------------------------Importing System Modules--------------END
//-------------------------------------------------------------Importing Defined Modules
import useschemaValidator from "src/composables/utilServices/schemaValidator";
const {
  thisSchemaPath,
  thisSchemaFile,
  //------------
} = useschemaValidator();

// Objprops_.value = { _profile: _this.value, _acctype: _this.value.acctype };

thisSchemaPath.value = "profileSchemas";
thisSchemaFile.value = "profileSchema";
import("../../composables/schemas/" + thisSchemaPath.value)
  .then((module) => {
    _this_Schema.value = module[thisSchemaFile.value];
  })
  .catch((e) => {
    console.error("Error importing schema:", e);
  });

//===-----_--------THE MODEL/ MAIN_DATA....
_thisModel.value = "profile"; // the Vue_Page_DataModel (Listing Collection Name)

// const genapiService = genapiStore(); //import { genapiStore } from "src/stores/jstStores/genapiStore";
const _thisService = thisStore();
const _thisModelService = profileStore();
const _thisapiUrl = "/profileapi/profile";
//const authService = authStore();

var Objprops = defineProps({
  _profile: { type: Object, default: () => ({}) }, //user Datas all there is...

  _acctype: { type: Object, default: () => ({}) }, //is the loged_user has privileged_routes...defintions

  // _super: { type: Boolean, default: false }

  // _priviledgedFor: { type: Object, default: () => ({})},
  //----------------------empy model total privileges....
  // _modalPriviledges: { type: Object, default: () => ({}) }, //user's privileges on general....with object of privileges =>{'empy':'regAdmin'}
});

Objprops_.value = Objprops;
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

//------- Objprops.lytSearchRow
let _pageSettings = ref({ geoSearch: { state: false, value: "off" } });
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

  return true;
});

let watch_Rows = ref(null);
watch_Rows = computed(() => {
  return _thisModelService.getstatus_Rows;
});

watch(watch_Rows, async (StatusRows, ov) => {
  let information;
  __thisOpsStatus.value = false;

  if (StatusRows == null) {
    information = "No Data.";
    return true;
  } else if (StatusRows == "noupdates") {
    information = "No Updates.";
  } else if (StatusRows == false) {
    information = "Locked";
  } else if (StatusRows == true) {
    information = "Loading ....";
    return true;
  } else if (StatusRows == "BadConnection") {
    information = "Offline";
  } else {
    information = StatusRows;
    await timerLoadevent({ message: 1 }, 2000, "...Session Closed");
    StatusRows == "Unauthorized" ? _logOut() : "";
    return false;
  }
  status_timerInformthis(5000, information, "Product & Services");
  return true;
});

async function Reset_this(Ops, rowIndex) {
  // _fileAttributeName.value=null;
  _fileAsPathIndex.value = null;

  __thisIndex.value = rowIndex;
  __thisOps.value = Ops;
  __thisOpsStatus.value = false;

  __thisBox.value = false; //OPen the Box
  __setRole.value = false;
  if (rowIndex == null) {
    _this.value = Object.assign({}, _thisDefault.value);
  } else {
    _this.value = Object.assign({}, _this_Rows.value[rowIndex]);
  }
  //----assigning Onplay Row
  console.log(_this.value, "ppp", _this_Rows.value);

  return true;
}

//------------------------------------------------------------COLUMNs----------------
//columns_filter()-------- which to displayOn REgisterations form
lockedColumns.value = [
  "userID",
  // "acckey",
  "profileMeta",
  "pension",
  "incomeTax",
  "pensionNet",
  //"profile",
  "pensionNet",
  "taxableSalary",
  "incomeTax",
  "incomeTax",
  "taxfreeSalary",
  "netSalary",
  "payDays",
]; //are blacklist of columns tobe not shown during the Registerations..form submitting
let _xDisplayDefaulted = ref(["companyID", "userID"]);
let takenControls = ref({
  istakenBy: "takenBy",
  Col: "storeStatus",
  Val: ["taken"],
}); //are blacklist of columns tobe not shown during the Registerations..form submitting
let returnControls = ref({
  isreturnedBy: "returnedBy",
  Col: "storeStatus",
  Val: ["Onstore"],
}); //are blacklist of columns tobe not shown during the Registerations..form submitting

// let visibleColumns = ref([]); //Hold List of In

invisibleColumns.value = [
  "profile",
  "_stage_",
  "cover",
  "profileMeta",
  "phoneCode",
  "location",
  "geolocation",
  "verified",
  "cart",
  "queryWeight",
  "contacts",
  "",
  "",
]; //defualt hidden columns

if ($q.screen.lt.md) {
  invisibleColumns.value.push("");
}

//==============================================------------------------------------

columns = computed(() => {
  console.log(
    `\n\n Creating ${_thisModel.value}  Table Schema with AccTypeof ${_this_acctype.value}`
  );
  if (!_this_acctype.value) {
    return [{}];
  } else {
    // resetColumnDependent();
    let _tableColumn = []; //HOLDING_  all the Columns of the Data_model ( TOTAL Columns)
    let _visibleColsName = []; ////--HOLDING_ all the "Visible" Columns of the Data_model ( TOTAL Columns)

    let rolesWall = _this_acctype.value.role ?? false;
    let capabilityWall = _this_acctype.value.capability ?? false;
    let modelRole = _this_acctype.value.roles ?? []; //accstage
    console.log(
      `\n User Role & Permissions:_ rolesWall = ${rolesWall} && capabilityWall = ${capabilityWall} && modelRole = ${modelRole}`
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
              _rolesColumn(_col);
              // continue;
            } else {
              _rolesColumn(_col);
            } //gives
          } else if (capabilityWall[0] == "1") {
            //Registererars (checking create digits will work for writing(updating too))
            if (modelRole.includes(schemaColumn)) {
              //excludes specifed columns
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
    console.log(
      `\n\n ENDing ${_thisModel.value}  Table Schema with AccTypeof ${_this_acctype.value}`
    );
    // _this_foreignDefault()
    return _tableColumn;
  }
});

async function _setDefaults() {
  // _this_clientModels = ['phone',"userName","geolocation",'location','phoneCode'] //
  // _thisModels.value.push('group') //
  _thisDefault.value = await _this_Defaulting(_thisModels.value);

  ///-----redefine values
  _thisDefault.value["userID"] = Objprops._profile.id;
  // _thisModels.value['group']=null
  //------==== building columns of thisMoel
  return true;
}

//---------------------------------------------- Store Syncing === End

//==============================================------------------------------------
let enableflscreen = ref(true);
//--------------

//---------------------------------------------------==========================///////////////////
const pageSize = 50;
let pagination = ref({
  // page: 1,
  rowsPerPage: 0,
  // rowsNumber: 3,
});
let loading = ref(false);
let paginationCard = ref({
  page: 1,
  rowsNumber: 2,
  rowsPerPage: 2,
});

// watch(isScrolledDown, (_nowValue, ov) => {
//   console.log(
//     "paginat #",
//     pagination.value.rowsNumber,
//     pagination.value.rowsNumber
//   );

//   if (_this_Rows.value.length > 2) {
//     try {
//       paginationId.value = _this_Rows.value[2].id;
//       this_Query("paginationID", true);
//       return true;
//     } catch {}
//   }
//   paginationId.value = null;
//   return true;
// });
async function onRequest() {
  alert("ddddd");
  // pagination.value.rowsPerPage = 10;
  // pagination.value.rowsNumber = 10;
  return true;
}

//=============QUERY BUILDER=============================DEfaulting && Scheam Generations====End
//---------------------------------------------- Store Syncing === End
var _this_Query_Meta = {}; //_trend:'', catagory:'',usage:'New',content:''
var paginationId = ref(null); //_trend:'', catagory:'',usage:'New',content:''
//====THIS_QUERY=====================(Syncing Fetch)
async function this_Query(queryKey = null, queryValue = null) {
  __thisOpsStatus.value = "loading";
  _thisModelService.set_syncLock(true);
  clearInterval(sync_thisInstante);
  //--------------------
  timerLoadevent({ this_Query: 0 }, 0, "Updating...");
  //-----------------  Keep Track of History
  let _thisQuery_Old = _this_Query.value; //["qweight"] ?? [1, 1, 1, 1]; //show searchedQuery
  //-----------Reseting Rows SEtting
  _this_Rows.value = [];
  _this_Query_Meta = {};
  _this_Query.value = {};
  __this_foreignBoxOps.value = false;
  ///----------- Paginations and Limitter Data
  _this_Query.value["limits"] = 100;
  _this_Query.value["skips"] = 0;
  // _this_Query.value["sortBy"] = { _id: 1 };
  //------------------------------
  if (paginationId.value ?? false) {
    _this_Query.value["skips"] = _thisQuery_Old["skips"] ?? 0;
    _this_Query.value["limits"] = _thisQuery_Old["skips"] ?? 0;

    _this_Query.value["qweight"] = [
      1,
      10 ?? (_this_Query.value["qweight"] ?? [1, 1, 1, 1])[1],
      saleUsage[queryValue] ?? 1,
      3,
    ];
    // _this_Query.value["paginationID"] = paginationId.value;
    pagination.value.rowsNumber += 2;
    // pagination.value.rowsPerPage += 2;
    _this_Query.value["limits"] += 2; //pagination.value.rowsNumber; //pagination.value.rowsPerPage;
    _this_Query.value["skips"] += 2;
    paginationId.value = null;
  } else if (queryKey == "lytSearchRow") {
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
      if (["catagory", "usage", "trend", "paginationID"].includes(queryKey)) {
        // search for buttonFilters && use AND Operators(3)
        //------Build Query   saleCatagory[queryValue]
        _this_Query.value["qweight"] = [
          1,
          saleCatagory[queryValue] ??
            (_thisQuery_Old["qweight"] ?? [1, 1, 1, 1])[1],
          saleUsage[queryValue] ?? 1,
          3,
        ];
      } else {
        //------Build Query
        _this_Query.value[queryKey] = queryValue ?? null; //queryKey == 'id' ? {'id':queryValue} :""
      }
    } else {
      if (queryValue) {
        _pageSettings.value["tableView"] = "main";
        __this_foreignBoxOps.value = "view";

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
  // set_this(null, null);
  return Array.isArray(_Datas) ? _Datas : [];
}
//===CLIENT_QUERY=======================(Requesting Fetch)

//===CHAT_QUERY=========================(Requesting Fetch)

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
//__this_foreignBoxsubOps
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

//-------Listening for SideBox Operations & Visualizing
///--------Order_Intiations Stage
let _orderDebuger = ref("Orders List..");
let _orderBox = ref([]);

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
// Return data and methods
const group = {
  type: "String",
  enum: ["upgraded", "client", "creator", "admin", "xrole"],
};
let __setRole = ref(null);
async function __thisBox_Dialog(_playrowIndex, _setRole = null) {
  // _fileAttributeName.value=null;
  console.log(_playrowIndex, _this.value, _setRole);
  if (_setRole) {
    await Reset_this("UpdateRowItem", _playrowIndex);
    _this.value["group"] = null;
    __setRole.value = true;
    return true;
  }
  if (_playrowIndex == null) {
    await Reset_this("CreateRowItem", null);
    __thisBox.value = true;
    return true;
  } else {
    await Reset_this("UpdateRowItem", _playrowIndex);
    __thisBox.value = true; //OPen the Box
    return true;
  }
}
//--------------------------------------METHODS & PROCESS
let _fileAttributeName = ref(null);
let _fileAsPathIndex = ref(null);
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
      if (response) {
        // timerDone(5000,_createTitle[2],'Succefully Created')
        __thisBox.value = false;
        return true;
      } else {
        timerError(5000, _createTitle[2], _createTitle[0]);
      }
      return true;
    })
    .catch((error) => {
      timerError(5000, _createTitle[2], _createTitle[0]);
      // _fileAttributeName.value=null;
      __thisOpsStatus.value = false;
      __thisBox.value = false;
      return false;
    });
}

async function Update_this(onplaySubops = false) {
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
  _this.value["onplaySubops"] = onplaySubops;
  //--------
  return await Crud_this.updateData()
    .then(async (response) => {
      if (response) {
        timerDone(5000, _createTitle[1], "Succefully Updated");
        _this_Rows.value[__thisIndex.value] = Object.assign({}, response);
        Reset_this(null, null);
      } else {
        timerError(5000, _updateTitle[1], _updateTitle[0]);
      }
      __thisOpsStatus.value = false;
      // _fileAttributeName.value=null;
      return true;
    })
    .catch((error) => {
      timerError(5000, _updateTitle[2], _updateTitle[0]);
      __thisOpsStatus.value = false;
      __thisBox.value = false;
      //  _fileAttributeName.value=null;
      return false;
    });
}
// import { axios } from "axios";
// async function Update_RolePermission() {
//   var requestOptions = { method: "post", headers: {}, params: {} };
//   requestOptions.headers["Content-Type"] = "application/json";
//   requestOptions.params["timestamp"] = new Date();
//   axios.post(
//     process.env.API_IP_PORT + "/permissionapi/permission",
//     { roles: letRolePermissions, users: "" },
//     requestOptions
//   );
// }
// init_RolePermission();

//----=========================================================================---DATA ---/// ---ROW----CRUD
let createKey = "";
let updateKey = "id";
let delKey = "id";

//----=========================================================================---DATA ---/// ---ROW----CRUD

const Crud_this = {
  createData: async function (objParam = {}) {
    //-------Check for Param_Requirents
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
      //-----------Calling for Store Services  (_suburl, formData, objParam)
      return await _thisService
        .updateData(_thisapiUrl, _this.value, objParam)
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
    return await _thisService
      .readData(_thisapiUrl)
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
  },
  //------------------filtering & searching for different Model
};
//-----------------End Data Functions
let _contentingliveStatus = ref(25000);
const Sync_this = async (service, query) => {
  console.log(`\n Profile Syncing is "Active Final"\n`);
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
const Fetch_this = async (service, objParam) => {
  //-------Check for Param_Requirents
  try {
    if (Object.keys(objParam).length == 0) {
      return false;
    }
    //-----------Calling for Store Services
    return await service
      .readFData(objParam)
      .then((response) => {
        if (response.status) {
          return response.data;
        } else {
          return false;
        }
      })
      .catch((error) => {
        return false;
      });
  } catch {
    return false;
  }
};
//--------------------------------------------------------------------UTILITIED_FUNCTIONS ( LocalStarage -- Profiling)
//------------------------------------------------------------------------------ Warming UP(BIOS_Process.....POST)
onMounted(async () => {
  // clearInterval(sync_thisInstante);
  _thisModelService.set_syncLock(true);
  //-------
  //---
  this_Query();
});
onUnmounted(async () => {
  clearInterval(sync_thisInstante);
  return true;
});
//------------------------------------------SYNCING DATA With Store
let searchResult = ref([{}]);
var latSearchResult = ref("");
var qserchResult = ref([]);
var nulQuickSearch = ref(false);
var latSearchDepth = ref(100);
var depthLabel = ref([]);

let searchWord = ref("");
let searchKey = ref([]);
let searchBy = ref([
  { label: "Name", value: "Name" },
  { label: "ID", value: "ID" },
]);

//---------.-------------------F--I---L--T--E--R-------------LOCAL SYSTEM Searching...
//1)-------------search box filter
var lockFilter = ref(true);
let search = ref("");
let filterDays = ref({
  min: 2,
  max: 8,
});
//2)------- filter latest_% & filter type

//3)--------------Quick_item Filter ( Simple Search/Quick)
let checkBoxLabel = {
  //items_value to be filtered..
  group_I: ["male", "female"],
};
//***************** ALTER THOSE ABOVE LABELS(OPTIONAL) &  THE sS1/2/3(must)*****/

let checkBoxValue = reactive({
  group_I: { male: true, female: true },
});
//-------------------------------Custome Filter ---Function
//const showALL=computed(()=>{})//with out return
const _thisfilter = computed(() => {
  return {
    search: search.value,
    male: checkBoxValue.group_I.male, //StoreStatusFilter
    female: checkBoxValue.group_I.female,
    //Issued: quickFilter.quickOOptions.Issued,
  };
}); //with out return

function filterMethod(rows, terms) {
  if (lockFilter.value) {
    return rows;
  }
  // rows contain the entire data
  let lowerSearch = terms.search ? terms.search.toLowerCase() : ""; //holding search bar...value
  const filteredRows = rows.filter((row, i) => {
    let ans = false;
    //Gather toggle conditions (Store Status)
    let sS1 = quickFilter.quickOOptions.male && row.gender == "male"; //holding toggle_quicx search
    let sS2 = quickFilter.quickOOptions.female && row.gender == "female";
    //let sS3 = true;//quickFilter.quickOOptions.Issued && row.storeStatus == "issued";
    //let c3 = filterToggle.dinner && row.storeStatus == "dinner";

    //Assume true in case there is no search
    let s1 = true; //If search term exists, convert to lower case and see which rows contain it

    if (lowerSearch != "") {
      s1 = false;
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
          s1 = true;
          break;
        }
      }
    }
    //assume row doesn't match
    ans = false;
    //check if any of the conditions match
    if ((sS1 && s1) || (sS2 && s1)) {
      // || (c3 && s1)) {
      ans = true;
    }
    return ans;
  });
  notifyit.simple(filteredRows.length + " - Items Founded");
  return filteredRows;
}

/////////////////////////////////////========================== DATA Reporting & Visualize
//---------------SELECTED---------- Displaying & Recording Table Data
let itemDetailColumns = reactive([
  ["name", "companyID", "department", "position"],
  [
    "Educations",
    "Expriences",
    "position",
    "department",
    "gender",
    "pension",
    "pensionRate",
    "loan",
    "incomeTax",
    "netSalary",
  ],
  ["address", "employeedate", "salary"],
]);
//---------------SELECTED---------- Displaying & Recording Table Data
let _reportReceipant = ref({});
var selected = ref([]); // it Holds rows LIst as they get selected....
var onselected = ref([_this]); // it Holds rows LIst as they get selected....
var rowSelected = reactive({}); //customezed_row Selected...
//-------Selected---------- Displaying & Recording Table Data
function getSelectedString() {
  //---listen to selected rows & listed in Objects array.
  if (
    Object.keys(selected.value[0]).length == 0 &&
    selected.value[0] == _this
  ) {
    selected.value.shift();
  }

  rowSelected =
    selected.value.length === 0 ? _this_Rows.value[0] : selected.value[0];
  return selected.value.length === 0
    ? ""
    : `# ${
        selected.value.length > 1 ? selected.value.length : ""
      } ,selected of ${_this_Rows.value.length}`;
}

function updateSelected() {
  // second ways of listing to selected_rows
  //////consol.log(selected, "Table Selection Happen...&Listening..");
}

//------EXPORT---SELECTED----Reporting Optionss
//------------- Filtered_Request (PAGINATION)
/////////////////////////////////////========================== DATA Visualization

//------Global Analysis Data
//-------------view Port One
</script>

<style>
.sticky-table {
  /* height or max-height is important */
  max-height: 100%;
}
.q-table__top,
    .q-table__bottom,
    thead tr:first-child th
      /* bg color is important for th; just specify one */ {
  background-color: rgb(227, 227, 228);
  color: black;
}

thead tr th {
  position: sticky;
  z-index: 1;
}

thead tr:first-child th {
  position: sticky;
  top: 0;
}
/* this is when the loading indicator appears */
.q-table--loading thead tr:last-child th {
  /* height of all previous header rows */
  top: 48px;
}

/* prevent scrolling behind sticky top row on focus */
tbody {
  /* height of all previous header rows */
  scroll-margin-top: 48px;
}

legend::first-letter {
  text-transform: capitalize;
}
</style>
