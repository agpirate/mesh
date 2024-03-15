<template>



<q-dialog
    v-model="ADDEEditpopUp"
    transition-show="scale"
    transition-hide="scale"
    style="background: rgba(73, 255, 1, 0.342); border: 15px solid rgb(0, 0, 117)"
    persistent
  >
    <q-card style="width: 40vw; max-width: 60vw">
      <q-separator />

      <q-card-section
        class="scroll shadow-5 text-white"
        style="max-height: 60vh; background: rgb(233, 231, 231)"
      >
        <fieldset
          class="q-px-md no-border  text-secondary "
        >
          <legend>
            <div
              class=" row items-between text-weight-bolder text-green"
              v-if="_popOperation === 'Reg'"
            >
              <div>@ {{ "ADD New Item  " }}</div>
            </div>
            <div   class=" row items-between text-weight-bolder text-orange" v-else>
              @ {{ "Edit Item  ~" + onplayRowItem["assetName"] }}
            </div>
          </legend>
          <q-separator inset></q-separator>

          <q-list>
            <q-item
              v-for="(columns, index) in authorizedColumns"
              :key="index"
              :set="(topColName = columns.name)"
              class="row"
            >
              <!--- Columns to be Hidden----------------3 stages(blockedColumns takenControllles & returnColumns Status)-->

              <div  class="col">
                <q-item-section
                  v-if="'type' in columns.schema"
                  :set="(topColumnsName = columns['name'])"
                  class="text-wight-bold"
                >
                <fieldset
                    style="border-radius: 4px 4px; background: rgb(217, 219, 224)"
                    class="rounded-borders"
                  >
                  <legend class="  text-weight-bold" style="color:rgb(0, 23, 85);">
                      {{ columns.name }} 
                    </legend>
                     <!--is Type_Start-->
                    <div style="border-radius: 4px 4px; background: rgb(20, 202, 3)"> 
                    <!--- is it Enumuratable -->
                    <template v-if="columns.schema['type'] =='Array'"> 

                      <template v-if="'venum' in columns.schema">
                          <q-select
                          style="min-width: 7vw"
                          color="secondary"
                          outlined
                          dense
                          v-model="onplayRowItem[columns.name]"
                          :options="columns.schema.venum"
                          multiple
                          use-chips
                          stack-label
                          label-color="black"
                          class="col  text-weight-bold"
                          :label="` -${[columns.name]}`"
                        >
                        </q-select>
    
                      </template>

                      <template v-else>
                      </template>
                      
                    </template>
                    
                    <template v-else>
                        <template v-if="'enum' in columns.schema">
                              <q-select
                                style="min-width: 7vw"
                                color="secondary"
                                outlined
                                dense
                                v-model="onplayRowItem[columns.name]"
                                :options="columns.schema.enum"
                                single
                                use-chips
                                stack-label
                                label-color="black"
                                class="col  text-weight-bold"
                                :label="`Select Options -${[columns.name]}`"
                              >
                            </q-select>
      
                        </template>
                        <template  v-else-if="!nul.includes(columns.schema['vtype'])" >
                          <q-input
                              style="min-width: 7vw"
                              dense
                              outlined
                              v-model="onplayRowItem[columns.name]"
                              :type="columns.schema['vtype']"
                              capture="user"
                              class="col  text-weight-bold"
                              :style="[
                                [null, undefined, false, ''].includes(
                                  onplayRowItem[columns.name]
                                )
                                  ? { background: 'grey-2' }
                                  : { 'text-color': 'grey-6' },
                              ]"
                            >                       
                            </q-input>
                        </template>
                        <template  v-else-if="!nul.includes(columns.schema['textarea'])" >
                          <q-editor
                            dense
                            outlined
                            v-model="onplayRowItem[columns.name]"
                            filled
                            autogrow
                            :label="columns.name"
                            class="col  text-weight-bold"
                            :style="[
                              nul.includes(onplayRowItem[columns.name][0])
                                ? { background: 'grey-1' }
                                : { 'text-color': 'grey-5' },
                            ]"
                          >
                          </q-editor>

                        </template>
                        <template  v-else>
                          <q-input
                              style="min-width: 7vw"
                              dense
                              outlined
                              v-model="onplayRowItem[columns.name]"
                              :type="columns.schema['type']"
                              class="col  text-weight-bold"
                              :style="[
                                [null, undefined, false, ''].includes(
                                  onplayRowItem[columns.name]
                                )
                                  ? { background: 'grey-2' }
                                  : { 'text-color': 'grey-6' },
                              ]"
                            >
                              <!--q-badge class="q-mx-xs">
                                              <q-badge
                                                color="blue"
                                                rounded
                                                class="q-mr-sm"
                                                label="...Loading."
                                            /></q-badge-->
                            </q-input>

                        </template>
                    </template>

                  </div>
                  </fieldset>
                </q-item-section>

                <!--is Type_End-->

                <!--is Array_Begins-->

                <!--- or is it Object _valued TOP columnss-->
                <q-item-section v-else class="column q-gutter-xs col">
                  <fieldset class="col q-gutter-xs">
                    <legend class=" text-weight-bolder">
                      {{ columns.name }}
                    </legend>
                    <q-list
                      v-for="(columnsG, topColumnsNameG) in columns.schema"
                      :key="topColumnsNameG"
                      class="col q-gutter-xs row"
                      style="min-width: 7vw"
                    >
                      <div v-if="lockedColumns.includes(topColumnsNameG)"></div>

                      <div v-else class="col q-gutter-xs row">
                        <q-item v-if="'type' in columnsG" class="col">
                         
                          <!--- is it Enumuratable -->
                          <template v-if="columnsG.schema['type'] =='Array'"> 

                            <template v-if="'venum' in columnsG.schema">
                                <q-select
                                style="min-width: 7vw"
                                color="secondary"
                                outlined
                                dense
                                v-model="onplayRowItem[columns.name][topColumnsNameG]"
                                :options="columnsG.schema.venum"
                                multiple
                                use-chips
                                stack-label
                                label-color="black"
                                class="col  text-weight-bold"
                                :label="` -${[topColumnsNameG]}`"
                              >
                              </q-select>
          
                            </template>

                            <template v-else>
                            </template>
                            
                          </template>
                          
                          <template v-else>
                              <template v-if="'enum' in columnsG.schema">
                                    <q-select
                                      style="min-width: 7vw"
                                      color="secondary"
                                      outlined
                                      dense
                                      v-model="onplayRowItem[columns.name][topColumnsNameG]"
                                      :options="columnsG.schema.enum"
                                      single
                                      use-chips
                                      stack-label
                                      label-color="black"
                                      class="col  text-weight-bold"
                                      :label="`Select Options -${[topColumnsNameG]}`"
                                    >
                                  </q-select>
            
                              </template>
                              <template  v-else-if="!nul.includes(columnsG.schema['vtype'])" >
                                <q-input
                                    style="min-width: 7vw"
                                    dense
                                    outlined
                                    v-model="onplayRowItem[columns.name][topColumnsNameG]"
                                    :type="columnsG.schema['vtype']"
                                    capture="user"
                                    class="col  text-weight-bold"
                                    :style="[
                                      [null, undefined, false, ''].includes(
                                        onplayRowItem[columns.name][topColumnsNameG]
                                      )
                                        ? { background: 'grey-2' }
                                        : { 'text-color': 'grey-6' },
                                    ]"
                                  >                       
                                  </q-input>
                              </template>
                              <template  v-else-if="!nul.includes(columnsG.schema['textarea'])" >
                                <q-editor
                                  dense
                                  outlined
                                  v-model="onplayRowItem[columns.name][topColumnsNameG]"
                                  filled
                                  autogrow
                                  :label="topColumnsNameG"
                                  class="col  text-weight-bold"
                                  :style="[
                                    nul.includes(onplayRowItem[columns.name][topColumnsNameG])
                                      ? { background: 'grey-1' }
                                      : { 'text-color': 'grey-5' },
                                  ]"
                                >
                                </q-editor>

                              </template>
                              <template  v-else>
                                <q-input
                                    style="min-width: 7vw"
                                    dense
                                    outlined
                                    v-model="onplayRowItem[columns.name][topColumnsNameG]"
                                    :type="columnsG.schema['type']"
                                    class="col  text-weight-bold"
                                    :style="[
                                      [null, undefined, false, ''].includes(
                                        onplayRowItem[columns.name][topColumnsNameG]
                                      )
                                        ? { background: 'grey-2' }
                                        : { 'text-color': 'grey-6' },
                                    ]"
                                  >
                                    <!--q-badge class="q-mx-xs">
                                                    <q-badge
                                                      color="blue"
                                                      rounded
                                                      class="q-mr-sm"
                                                      label="...Loading."
                                                  /></q-badge-->
                                  </q-input>

                              </template>
                          </template>


                        </q-item>

                        <q-item v-else class="row q-gutter-xs col">
                          
                        </q-item>

                      </div>

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
        <q-btn outlined label="CANCEL" color="red" @click="closePUPForm()" />
        <q-btn outlined label="Submit" color="green" @click="AcceptPUPForm()" />
      </q-card-actions>
    </q-card>
  </q-dialog>


  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
   
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
