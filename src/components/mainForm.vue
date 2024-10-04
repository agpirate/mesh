<template>
  <q-card style="min-width: 60vw">
    <!----HEADER-TOP Begin-->
    <q-card-section
      style="
        background: rgb(15, 59, 0);
        border: 1px solid rgb(1, 58, 163);
        font-family: Sans-serif;
        min-width: 50vh;
      "
      class="text-bold"
    >
      <div class="text-h6 text-weight-bold row justify-between">
        <div class="row text-grey-3 text-weight-bold text-h5">
          <!-- <div class="text-green" style="text-transform: capitalize;">{{ _thisModel }} -</div> -->
          {{ __thisOps == "CreateRowItem" ? "Registeration" : "Update" }} Form
        </div>
        <div class="text-green rounded-borders text-weight-bolder">YGP</div>
      </div>
    </q-card-section>
    <!---Header-TOP ENDs-->

    <q-separator />

    <q-card-section
      class="scroll shadow-5 text-white"
      style="max-height: 60vh; background: rgb(233, 231, 231)"
    >
      <fieldset class="q-px-md no-border text-secondary">
        <!-------Header_Bottom Begins-->
        <!-------Header_Bottom Begins-->

        <q-separator inset></q-separator>

        <q-list class="row" style="width: 50vw">
          <!--------Iterate_Over_ Authorized -->

          <q-item
            v-for="(tier_0obj, index) in _rolesColumnss"
            :key="index"
            class="col-grow row"
          >
            <div
              :set="(tier_0schema = tier_0obj.schema)"
              style="width: 100%"
              class="col-grow row"
              v-if="!_xDisplayDefaulted.includes(tier_0obj.name)"
            >
              <!-----------------BASICS Forms-->
              <q-item-section
                v-if="tier_0obj.schema.type ?? false"
                class="column q-gutter-xs col-12 text-wight-bold"
              >
                <fieldset
                  style="border-radius: 4px 4px"
                  class="rounded-borders"
                >
                  <legend
                    class="text-weight-bold"
                    style="color: rgb(0, 23, 85); text-transform: capitalize"
                  >
                    {{ tier_0obj.name }}
                  </legend>

                  <!---setting field set & legend---End-->

                  <div :style="inputColor">
                    <!--- is the TYPE_ it ARRAY -->
                    <template v-if="tier_0obj.schema.type == 'Array'">
                      <!--- is the TYPE_ it ARRAY_is Enumuratable -->
                    </template>

                    <!---final Data(Basic Data_format)-->
                    <template v-else>
                      <template v-if="tier_0obj.schema.enum ?? false">
                        <q-select
                          style="min-width: 7vw"
                          color="secondary"
                          outlined
                          dense
                          v-model="_thiss[tier_0obj.name]"
                          :options="tier_0obj.schema.enum"
                          single
                          use-chips
                          stack-label
                          label-color="black"
                          class="col text-weight-bold"
                        >
                        </q-select>
                      </template>
                      <!-- This Vtype is used for Date formate type -->
                      <template v-else-if="tier_0obj.schema.vtype ?? false">
                        <div
                          style="backdrop-filter: blur(15px); width: 80%"
                          class="text-weight-bold text-red"
                          v-show="_debugObj[tier_0obj.name] ?? false"
                        >
                          {{ _debugObj[tier_0obj.name] }}
                        </div>
                        <q-input
                          style="min-width: 7vw"
                          dense
                          outlined
                          v-model="_thiss[tier_0obj.name]"
                          :type="tier_0obj.schema['vtype']"
                          @update:model-value="_validateThis(tier_0obj.name)"
                          capture="user"
                          class="col text-weight-bold"
                        >
                        </q-input>
                      </template>
                      <template v-else-if="tier_0obj.schema.textarea ?? false">
                        <q-editor
                          dense
                          outlined
                          v-model="_thiss[tier_0obj.name]"
                          filled
                          autogrow
                          :label="tier_0obj.name"
                          class="col text-weight-bold"
                        >
                        </q-editor>
                      </template>
                      <template v-else>
                        <div
                          style="backdrop-filter: blur(15px); width: 80%"
                          class="text-weight-bold text-red"
                          v-show="_debugObj[tier_0obj.name] ?? false"
                        >
                          {{ _debugObj[tier_0obj.name] }}
                        </div>
                        <q-input
                          style="min-width: 7vw"
                          dense
                          outlined
                          v-model="_thiss[tier_0obj.name]"
                          :type="tier_0obj.schema['type']"
                          class="col text-weight-bold"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'Please type something',
                          ]"
                          @update:model-value="_validateThis(tier_0obj.name)"
                        >
                        </q-input>
                      </template>
                    </template>
                  </div>
                </fieldset>
              </q-item-section>
              <!-----------------BASICS Forms-->

              <q-item-section
                v-else-if="Array.isArray(tier_0obj.schema)"
                class="column q-gutter-xs col-12"
                style="min-width: 30vw"
              >
                <!------ARRAY SPecific-->
                <!------ Manage the Array ADD-->
                <q-item-section>
                  <div class="fontdstyle">{{ tier_0obj.name }}</div>
                  <div class="row q-gutter-sm">
                    <q-btn
                      unelevated
                      size="sm"
                      round
                      outline
                      :dense="true"
                      rounded
                      color="purple"
                      :label="'# ' + _thiss[tier_0obj.name].length"
                    />

                    <q-btn
                      flat
                      size="sm"
                      class="col"
                      :dense="true"
                      color="white"
                      icon="add"
                      :label="'Create ' + tier_0obj.name"
                      @click="
                        _thiss[tier_0obj.name].push(
                          _thisDefaultt[tier_0obj.name][0]
                        )
                      "
                    />
                  </div>
                </q-item-section>

                <q-scroll-area
                  class="bg-grey-12 row"
                  style="height: 40vh; width: 100%"
                  v-if="_thiss[tier_0obj.name].length"
                >
                  <q-list>
                    <q-item
                      v-for="(_thism, index) in _thiss[tier_0obj.name]"
                      :key="index"
                      class="col q-gutter-xs column"
                    >
                      <div class="col-shrink column" v-if="index >= 1">
                        <div class="fontastyle">{{ index }}</div>
                        <div>
                          <q-btn
                            @click="_thiss[tier_0obj.name].splice(index, 1)"
                            dense="true"
                            label="remove"
                          />
                        </div>
                      </div>

                      <!------ARRAY SPecific-->

                      <!---- Object Speciicccc -->
                      <q-list class="row q-gutter-sm">
                        <q-item
                          v-for="(tier_1schema, tier_1name) in tier_0obj
                            .schema[0]"
                          :key="tier_1name"
                          class="col-auto q-pa-none"
                        >
                          <!---- Object Speciicccc -->

                          <!-----------------BASICS Forms-->
                          <q-item-section
                            v-if="tier_1schema.type ?? false"
                            class="col text-wight-bold"
                          >
                            <!---setting field set & legend -->
                            <fieldset
                              style="border-radius: 4px 4px"
                              class="rounded-borders"
                            >
                              <legend
                                class="text-weight-bold"
                                style="
                                  color: rgb(0, 23, 85);
                                  text-transform: capitalize;
                                "
                              >
                                {{ tier_1name }}
                              </legend>

                              <!---setting field set & legend---End-->

                              <div :style="inputColor">
                                <!--- is the TYPE_ it ARRAY -->
                                <template v-if="tier_1schema.type == 'Array'">
                                  <!--- is the TYPE_ it ARRAY_is Enumuratable -->
                                </template>

                                <!---final Data(Basic Data_format)-->
                                <template v-else>
                                  <template v-if="tier_1schema.enum ?? false">
                                    <q-select
                                      style="min-width: 6vw"
                                      color="secondary"
                                      outlined
                                      dense
                                      v-model="
                                        _thiss[tier_0obj.name][index][
                                          tier_1name
                                        ]
                                      "
                                      :options="tier_1schema.enum"
                                      single
                                      use-chips
                                      stack-label
                                      label-color="black"
                                      class="col text-weight-bold"
                                    >
                                    </q-select>
                                  </template>
                                  <template
                                    v-else-if="tier_1schema.vtype ?? false"
                                  >
                                    <q-input
                                      style="min-width: 5vw"
                                      dense
                                      outlined
                                      v-model="
                                        _thiss[tier_0obj.name][index][
                                          tier_1name
                                        ]
                                      "
                                      :type="tier_1schema['vtype']"
                                      capture="user"
                                      class="col text-weight-bold"
                                    >
                                    </q-input>
                                  </template>
                                  <template
                                    v-else-if="tier_1schema.textarea ?? false"
                                  >
                                    <q-editor
                                      dense
                                      style="min-width: 5vw"
                                      outlined
                                      v-model="
                                        _thiss[tier_0obj.name][index][
                                          tier_1name
                                        ]
                                      "
                                      filled
                                      autogrow
                                      :label="tier_1name"
                                      class="col text-weight-bold"
                                    >
                                    </q-editor>
                                  </template>
                                  <template v-else>
                                    <q-input
                                      style="min-width: 5vw"
                                      dense
                                      outlined
                                      v-model="
                                        _thiss[tier_0obj.name][index][
                                          tier_1name
                                        ]
                                      "
                                      :type="tier_1schema['type']"
                                      class="col text-weight-bold"
                                      lazy-rules
                                      :rules="[
                                        (val) =>
                                          (val && val.length > 0) ||
                                          'Please type something',
                                      ]"
                                    >
                                    </q-input>
                                  </template>
                                </template>
                              </div>
                            </fieldset>
                          </q-item-section>
                          <!-----------------BASICS Forms-->
                        </q-item>
                      </q-list>
                    </q-item>
                  </q-list>
                </q-scroll-area>
              </q-item-section>

              <!--- or is it Object _valued TOP columnss-->
              <q-item-section
                v-else
                class="row q-gutter-xs col-12"
                style="width: 100%"
              >
                <!---- Object Speciicccc -->
                <fieldset
                  style="border-radius: 4px 4px"
                  class="rounded-borders"
                >
                  <legend
                    class="text-weight-bold"
                    style="color: rgb(0, 23, 85); text-transform: capitalize"
                  >
                    {{ tier_0obj.name }}
                  </legend>
                  <q-list class="row items-top q-gutter-sm q-pa-xs">
                    <q-item
                      v-for="(tier_1schema, tier_1name) in tier_0obj.schema"
                      :key="tier_1name"
                      class="col-grow q-gutter-xs row"
                      style="min-width: 3vw"
                    >
                      <div class="col q-gutter-xs row">
                        <!---- Object Speciicccc -->

                        <!----- Basic Form --->
                        <q-item-section
                          v-if="tier_1schema.type ?? false"
                          class="text-wight-bold"
                        >
                          <fieldset
                            style="border-radius: 4px 4px"
                            class="rounded-borders"
                          >
                            <legend
                              class="text-weight-bold"
                              style="
                                color: rgb(0, 23, 85);
                                text-transform: capitalize;
                              "
                            >
                              {{ tier_1name }}
                            </legend>

                            <!---setting field set & legend---End-->

                            <div :style="inputColor">
                              <!--- is the TYPE_ it ARRAY -->
                              <template v-if="tier_1schema.type == 'Array'">
                                <!--- is the TYPE_ it ARRAY_is Enumuratable -->
                              </template>

                              <!---final Data(Basic Data_format)-->
                              <template v-else>
                                <template v-if="tier_1schema.enum ?? false">
                                  <q-select
                                    style="min-width: 7vw"
                                    color="secondary"
                                    outlined
                                    dense
                                    v-model="_thiss[tier_0obj.name][tier_1name]"
                                    :options="tier_1schema.enum"
                                    single
                                    use-chips
                                    stack-label
                                    label-color="black"
                                    class="col text-weight-bold"
                                  >
                                  </q-select>
                                </template>

                                <template
                                  v-else-if="tier_1schema.textarea ?? false"
                                >
                                  <q-editor
                                    dense
                                    outlined
                                    v-model="_thiss[tier_0obj.name][tier_1name]"
                                    filled
                                    autogrow
                                    :label="tier_1name"
                                    class="col text-weight-bold"
                                  >
                                  </q-editor>
                                </template>

                                <template
                                  v-else-if="tier_1schema.vtype ?? false"
                                >
                                  <q-input
                                    style="min-width: 7vw"
                                    dense
                                    outlined
                                    v-model="_thiss[tier_0obj.name][tier_1name]"
                                    :type="tier_1schema.vtype"
                                    class="col text-weight-bold"
                                    lazy-rules
                                  >
                                  </q-input>
                                </template>
                                <template v-else>
                                  <q-input
                                    style="min-width: 7vw"
                                    dense
                                    outlined
                                    v-model="_thiss[tier_0obj.name][tier_1name]"
                                    :type="tier_1schema['type']"
                                    class="col text-weight-bold"
                                    lazy-rules
                                  >
                                  </q-input>
                                </template>
                              </template>
                            </div>
                          </fieldset>
                        </q-item-section>

                        <!----- Basic Form -->

                        <q-item-section v-else>
                          <b>{{ tier_1name }}</b>
                          <q-list>
                            <q-item
                              v-for="(tier_2schema, tier_2name) in tier_1schema"
                              :key="tier_2name"
                              class="col q-gutter-xs row"
                              style="min-width: 7vw"
                            >
                              <div class="col q-gutter-xs row">
                                <!-----------------BASICS Forms-->

                                <q-item-section
                                  v-if="tier_2schema.type ?? false"
                                  class="text-wight-bold"
                                >
                                  <!---setting field set & legend-->
                                  <fieldset
                                    style="border-radius: 4px 4px"
                                    class="rounded-borders"
                                  >
                                    <legend
                                      class="text-black text-weight-bold"
                                      style="
                                        color: rgb(0, 23, 85);
                                        text-transform: capitalize;
                                      "
                                    >
                                      {{ tier_2name }}
                                    </legend>
                                    <!---setting field set & legend---End-->

                                    <div :style="inputColor">
                                      <!--- is the TYPE_ it ARRAY -->
                                      <template
                                        v-if="tier_2schema.type == 'Array'"
                                      >
                                        <!--- is the TYPE_ it ARRAY_is Enumuratable -->
                                      </template>

                                      <!---final Data(Basic Data_format)-->
                                      <template v-else>
                                        <template
                                          v-if="tier_2schema.enum ?? false"
                                        >
                                          <q-select
                                            style="min-width: 7vw"
                                            color="secondary"
                                            outlined
                                            dense
                                            v-model="
                                              _thiss[tier_0obj.name][
                                                tier_1name
                                              ][tier_2name]
                                            "
                                            :options="tier_2schema.enum"
                                            single
                                            use-chips
                                            stack-label
                                            label-color="black"
                                            class="col text-weight-bold"
                                          >
                                          </q-select>
                                        </template>
                                        <template
                                          v-else-if="
                                            tier_2schema.vtype ?? false
                                          "
                                        >
                                          <q-input
                                            style="min-width: 7vw"
                                            dense
                                            outlined
                                            v-model="
                                              _thiss[tier_0obj.name][
                                                tier_1name
                                              ][tier_2name]
                                            "
                                            :type="tier_2schema['vtype']"
                                            capture="user"
                                            class="col text-weight-bold"
                                          >
                                          </q-input>
                                        </template>
                                        <template
                                          v-else-if="
                                            tier_2schema.textarea ?? false
                                          "
                                        >
                                          <q-editor
                                            dense
                                            outlined
                                            v-model="
                                              _thiss[tier_0obj.name][
                                                tier_1name
                                              ][tier_2name]
                                            "
                                            filled
                                            autogrow
                                            :label="tier_2name"
                                            class="col text-weight-bold"
                                          >
                                          </q-editor>
                                        </template>
                                        <template v-else>
                                          <q-input
                                            style="min-width: 7vw"
                                            dense
                                            outlined
                                            v-model="
                                              _thiss[tier_0obj.name][
                                                tier_1name
                                              ][tier_2name]
                                            "
                                            :type="tier_2schema['type']"
                                            class="col text-weight-bold"
                                            lazy-rules
                                          >
                                          </q-input>
                                        </template>
                                      </template>
                                    </div>
                                  </fieldset>
                                </q-item-section>

                                <!-----------------BASICS Forms-->
                              </div>
                            </q-item>
                          </q-list>
                        </q-item-section>
                      </div>
                    </q-item>
                  </q-list>
                </fieldset>
              </q-item-section>
            </div>
          </q-item>
        </q-list>
      </fieldset>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn outlined label="CANCEL" color="red" @click="emitClose(false)" />

      <q-btn
        outlined
        label="Create"
        color="green"
        @click="emitSubmit('create')"
        v-if="__thisOps == 'CreateRowItem'"
      />
      <q-btn
        outlined
        label="Update"
        color="orange"
        @click="emitSubmit('update')"
        v-else
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import {
  defineEmits,
  ref,
  reactive,
  onMounted,
  defineAsyncComponent,
  computed,
} from "vue";
// import { ref, reactive, computed, onMounted, onBeforeMount, watch } from "vue";
import useschemaValidator from "src/composables/utilServices/profileschemaValidator";
const {
  _debugObj,
  //-------
  _validateThis,
} = useschemaValidator();

var props = defineProps({
  _xDisplayDefaulted: { type: Object, default: () => ({}) },
  _rolesColumns: { type: Object, default: () => ({}) },

  _this: { type: Object, default: () => ({}) },
  _thisDefault: { type: Object, default: () => ({}) },
  __thisOps: { type: String, default: "" },

  inputColor: { type: String, default: "" },

  //----------------=========  Validation Props and Values
  thisSchemaFile: {
    type: String,
    required: true,
  },
  thisSchemaPath: {
    type: String,
    required: true,
  },
});
// var _xDisplayDefaulted =ref(['companyID','userID'])
var _rolesColumnss = computed(() => {
  return props._rolesColumns;
});
var _thiss = computed(() => {
  return props._this;
});
var _thisDefaultt = computed(() => {
  return props._thisDefault;
});

let inputColor = computed(() => {
  return { "background-color": props.inputColor ?? "white" };
});

async function removeList(name, index) {
  console.log(_thiss.value[name], index, "pppp");
  return _thiss.value[name].splice(index, 1);
}

//-------------------------------------- The Schematic Values
//======================================== the Form Submitting

const emit = defineEmits(["create", "update", "close"]);
function emitSubmit(_action) {
  let _isCompleted = Object.values(_debugObj.value).every(
    (value) => value == null
  );
  if (!_isCompleted) {
    return false;
  }
  //-----
  emit(_action, _thiss.value);
}
// function emitSubmit(_action) {
//   emit('update', _thiss.value);
// }
function emitClose() {
  emit("close", false);
}

///////////===========

// var schemaPath = "../../composables/schemas/"+props.thisSchemaPath
let schematoValidate;
import("../composables/schemas/" + props.thisSchemaPath)
  .then((module) => {
    schematoValidate = module[props.thisSchemaFile];
  })
  .catch((error) => {
    console.error("Error importing schema:", error);
  });

//------------------------------------  submittting and Checking Forms
// New data types and rules
let _inputCharacter = {
  numbericInteger: /^\d+$/,
  numbericFloat: /^-?\d*(\.?\d+)?$/,
  alphanumericString: /^[a-z0-9]+$/,
  alphaString: /^[a-zA-Z]+$/,
};
//-----------------------

// async function _validateThis(field) {
//   let _fieldRule = schematoValidate[field]["rules"] ?? false; // Changed from 'rule' to 'rules'
//   if (!(_fieldRule ?? false)) {
//     console.log("No Validator Set; For", schematoValidate[field] ?? false);
//     return true;
//   }
//   _debugObj.value[field] = null;
//   let value = _thisReturn.value[field];
//   //------------------
//   for (let rule of _fieldRule) {
//     let _check = await _isThisRule210(rule, value);
//     if (!_check) {
//       _debugObj.value[field] = _getErrorMessage(rule); // Improved error message handling
//       break;
//     }
//   }
//   return true;
// }
// Helper function to get error messages based on rule type
function _getErrorMessage(rule) {
  switch (rule.type) {
    case "required":
      return "Field is required";
    case "minLength":
      return `Minimum length is ${rule.value}`;
    case "maxLength":
      return `Maximum length is ${rule.value}`;
    case "pattern":
      return "Invalid format";
    default:
      return "Invalid input";
  }
}

// Updated rule validation function
//{'required':true,'minLength':3,'maxLength':4,'pattern':'','type':'string'}
const _isThisRule210 = async (rule, value) => {
  switch (rule.type) {
    case "required":
      return value != null && value !== "";
    case "minLength":
      return value.length >= rule.value;
    case "maxLength":
      return value.length <= rule.value;
    case "pattern":
      return new RegExp(rule.value).test(value);
    case "type":
      return _checkType(rule.value, value);
    default:
      return true;
  }
};

// Function to check data types
const _checkType = (type, value) => {
  switch (type) {
    case "number":
      return !isNaN(value);
    case "string":
      return typeof value === "string";
    case "array":
      return Array.isArray(value);
    case "object":
      return typeof value === "object" && !Array.isArray(value);
    default:
      return false;
  }
};
</script>

<style scoped>


@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideOut {
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

div {
  transition: background-color 0.3s ease;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.popup {
  /* display: none; */
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 300px;
  text-align: center;
  animation: fadeIn 0.3s;
}

.popup-content h2 {
  margin-top: 0;
}

.popup-content p {
  color: #666;
  margin: 15px 0;
}

.popup-content .action-btn {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #28a745;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s;
}

.popup-content .action-btn:hover {
  background-color: #218838;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #000;
  cursor: pointer;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
