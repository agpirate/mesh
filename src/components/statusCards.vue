<template>
  <div
    style="
      position: fixed;

      bottom: 5%;
      right: 3%;
    "
    class="z-top column justify-end"
    :class="screenSize == 'Small' ? 'mobile' : 'desktop'"
  >
    <!-- :style="{ backgroundColor: color }" -->

    <!-- <q-btn  :dense="true" color="green" icon="done"  > </q-btn>     -->
    <div
      class="notification q-pa-sm column font0astyle"
      :style="'color:' + message.color"
      v-for="(message, index) in messages"
      :key="index"
    >
      <div
        class="row justify-between"
        style="
          background-color: #fff;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          min-width: 300px;
        "
      >
        <!-- <span style="font-size: 16px; font-weight: bold;">{{ message.title ?? '' }}</span> -->
        <p style="font-size: 14px; color: #555">{{ message.content ?? "" }}</p>
        <!-- <q-btn size="sm" icon="close" @click="emitPress('close',index)" style="color:red; position: absolute; top: 10px; right: 10px; background-color: whitesmoke; border: none; font-size: 18px; cursor: pointer;">
          </q-btn> -->
        <!-- <q-btn flat round @click="emitPress('close',index)" color="primary" label="" icon="close"/> -->

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
    <div></div>
  </div>
</template>

<script setup>
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
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;

  transform: translateY(-40px);
  animation: slideIn 0.9s forwards;
}
.notification.mobile {
  min-width: 90%;
  min-height: 10vh;
  margin-bottom: 15%;
}
.notification.desktop {
  margin-bottom: 15%;
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
