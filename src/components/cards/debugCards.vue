<template>
  <div
    :class="screenSize == 'Small' ? 'mobile' : 'desktop'"
    class="z-top flexlyt columnitm"
    style="
      position: fixed;
      bottom: 5%;
      left: 3%;
      border-radius: 3px;
      padding: 3px;
      margin: 2px;
    "
  >
    <!-- :style="{ backgroundColor: color }" -->
    <!-- <q-btn  :dense="true" color="green" icon="done"  > </q-btn>     -->
    <div v-for="(message, index) in messages" :key="index">
      <div class="notification">
        <!-- <span style="font-size: 18px; font-weight: 600; color: #333;">{{ message.title }}</span> -->
        <p style="color: whitesmoke; margin: 10px 0 0" class="fontastyle">
          {{ message.content }}
        </p>
        <!-- <q-btn   :color="message.color ?? ''"  @click="emitPress('close',index)" :dense="true"  label="" 
                style="position: absolute; top: 15px; right: 15px; background-color: #ff4d4d; border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 14px; color: white; cursor: pointer; line-height: 20px; text-align: center; transition: background-color 0.3s ease;">&times;</q-btn>
                 -->
        <div class="col-auto row transparent">
          <button
            style="background-color: transparent; color: red"
            class="btn btn-close"
            @click="emitPress('close', index)"
          >
            <q-icon name="close" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="popup z-top">
        <div class="popup-content">
            <span class="close-btn" id="closePopupBtn">&times;</span>
            <h2>{{title}}</h2>
            <p>{{content}}</p>
            <button class="action-btn">Take Action</button>
        </div>
    </div> -->
</template>

<script setup>
import { screenSize } from "src/services/utils";

const props = defineProps({
  messages: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["closeButton"]);
function emitPress(_action, index) {
  emit("closeButton", _action, index);
}
</script>

<style scoped>
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
