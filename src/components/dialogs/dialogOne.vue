<template>
    <div v-if="isOpen" class="overlay z-top" @click="click0(null)" >
      <div class="q-gutter-md">
      <div class="column  col" @click.stop>
        <slot class="col"></slot>
        <!-- This Slot enables us to inject values from parent_Components 
         Or you can use props to receive informations to display-->

      </div>
   
      <div  class="row" v-if="enableCloser">
        <q-btn rounded :dense="true" class="col-auto fontestyle" label="close" @click="click0(false)" color="red" />
      </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    isOpen: null,
    // eslint-disable-next-line vue/require-prop-type-constructor
    enableCloser: false,
  });
  
  const emit = defineEmits(['emitClick0']);
  function click0(value) {
    emit('emitClick0', value);
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