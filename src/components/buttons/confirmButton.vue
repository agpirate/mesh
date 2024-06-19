

<template>
  <div class="column">
    <div class="fontestyle q-py-md">{{  header }}</div>

    <div class="row justify-between q-gutter-sm fontestyle" style="width:100%">
      <q-btn @click="emitPress(true)" 
      :style="{ backgroundColor: background,color:textcolor }"
      >
      {{  title }}
    </q-btn>

    <q-btn @click="emitPress(false)" 
      :style="{ backgroundColor: background2,color:textcolor2 }"
      >
      {{  title2 }}
    </q-btn>

    </div>

  </div>
   
  </template>
  
  <script setup>
  import { defineEmits } from 'vue';
  
  const props = defineProps({
    header: {
      type: String,
      required: true
    },
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
    //--------------cancel button
    title2: {
      type: String,
      required: true
    },
    textcolor2: {
      type: String,
      required: true
    },
    background2: {
      type: String,
      required: true
    }
  });

  const emit = defineEmits(['confirmButton']);
  function emitPress(_action) {
    emit('confirmButton', _action);
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

/* Primary Styling */
.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}


/* Secondary Styles */
.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

/* thri Style */
.btn-outline {
  background-color: transparent;
  color: #007bff;
  border: 2px solid #007bff;
}

.btn-outline:hover {
  background-color: #007bff;
  color: white;
}

/* general Style */
.btn-rounded {
  background-color: #28a745;
  color: white;
  border-radius: 50px;
}

.btn-rounded:hover {
  background-color: #218838;
}

.btn-icon {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #17a2b8;
  color: white;
}

.btn-icon:hover {
  background-color: #138496;
}


</style>