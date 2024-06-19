

<template>
    <div style="display: flex;flex-flow: row nowrap;justify-content: space-between;
    border-radius: 5px;" class="saleitContentOps-Glass"
    >
      <div class="fontastyle"> {{  title }}</div>
      <q-btn @click="emitPress(true)" icon="close" :dense="true" flat size="xs"
      :style="{ backgroundColor: background,color:textcolor }"
      >
     
    </q-btn>
    </div>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue';
  
  const props = defineProps({
    //--------------confirm button
    title: {
      type: String,
      required: true
    },
    textcolor: {
      type: String,
      required: true
    },
    background: {
      type: String,
      required: true
    },
  });

  const emit = defineEmits(['closeButton']);
  function emitPress(_action) {
    emit('closeButton', _action);
  }
  </script>

<style>

.btn {
  padding: 0px 0px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.btn-dense {
  padding: 10px 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}


</style>