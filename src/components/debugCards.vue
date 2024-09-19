<template>
  <div
    :class="screenSize == 'Small' ? 'mobile' : 'desktop'"
    class="z-top column justify-center notification q-pa-none q-ma-none"
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
      <div
        class="row justify-between items-align-center q-pa-none q-ma-none"
        style="
          position: relative;
          border-radius: 7px;
          padding: 5px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
          margin-bottom: 1px;
          width: 100%;
          max-width: 350px;
        "
      >
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
.notification {
  display: flex;
  flex-flow: column nowrap;
  /* justify-content: flex-start; */
  /* padding: 2px; */
  /* margin-bottom: 10px; */
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(500px);
  opacity: 0;

  transform: translateY(-40px);
  animation: slideIn 0.9s forwards;
}
.notification.mobile {
  min-width: 90%;
  min-height: 10vh;
  /* margin-bottom: 15%; */
}
.notification.desktop {
  /* margin-bottom: 15%; */
  max-width: 40vw;
  min-width: 20vw;
  min-height: 5vh;

  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: black;
}
.notification.info {
  background-color: #007bff;
  color: white;
}

.notification.error {
  background-color: #ff3b30;
  color: white;
}

.notification h4 {
  margin: 0 0 2px 0;
  font-size: 16px;
}

.notification p {
  margin: 0;
  font-size: 14px;
}

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
