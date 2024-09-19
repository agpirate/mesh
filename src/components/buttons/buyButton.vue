<template>
  <div class="row justify-between items-center q-gutter-md q-py-md">
    <div class="col-auto column justify-evenly q-gutter-xs">
      <q-btn
        :label="title"
        icon="remove"
        flat
        style="background-color: red"
        class=""
        :style="{
          backgroundColor: background ?? 'red',
          color: textcolor ?? 'black',
        }"
        :dense="true"
        @click="parseFloat(quantity) > 1 ? emitPressd(true) : false"
      >
      </q-btn>

      <q-btn
        color="orange"
        size="md"
        class="q-mx-xs"
        no-caps
        :label="'Qty = ' + quantity"
        :dense="true"
      />

      <q-btn
        @click="
          parseFloat(quantity) < (onstore ?? 1000000)
            ? emitPressi(false)
            : false
        "
        :label="title2"
        icon="add"
        class=""
        flat
        :dense="true"
        :style="{
          backgroundColor: background2 ?? 'orange',
          color: textcolor2 ?? 'black',
        }"
      >
      </q-btn>
    </div>
    <div class="col" style="backdrop-filter: blur(200px); border-radius: 10%">
      <div
        class="fontcstyle q-pa-xs"
        :style="{ backgroundColor: background2, color: textcolor2 ?? 'black' }"
        style="border: 1px solid black; border-radius: 5px"
      >
        {{ price * quantity }} {{ currency ?? "" }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

const props = defineProps({
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  //--------------confirm button
  title: {
    type: String,
    required: true,
  },
  textcolor: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  //--------------cancel button
  title2: {
    type: String,
    required: true,
  },
  textcolor2: {
    type: String,
    required: true,
  },
  background2: {
    type: String,
    required: true,
  },
  //----
  currency: {
    type: String,
    required: true,
  },
  onstore: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["decreaseButton", "increaseButton"]);

function emitPressd(_action) {
  emit("decreaseButton", _action);
}
function emitPressi(_action) {
  console.log("increasing button", _action);
  emit("increaseButton", _action);
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
