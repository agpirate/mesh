<template>
  <q-layout>
    <q-page-container>
      <!-- Install Button -->
      <q-btn
        v-if="canInstallPWA"
        style="position: fixed; top: 100px; z-index: 100"
        icon="add_to_home_screen"
        @click="installPWA()"
      />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { reactive, ref, watch, computed, onMounted } from "vue";
import { LocalStorage, useQuasar, useMeta } from "quasar";
const $q = useQuasar();

//-----------------------Local Varialbles

var iservicei_Menu = ref();
var iservicei_MenuDesc = ref(false);
iservicei_Menu.value = {
  SaleIt: ["Anything To Sale ?", "photo", "saleIt", false],
  RentIt: ["Anything For Rent ?", "collections_bookmark", "rentIt", false],
  Market: ["Show current Market Price", "assistant", "marketIt", false],
  OrderIt: ["Looking Service you Like!", "group", "orderIt", false],
  locateIt: ["Locate Your Need", "import_contacts", "locateIt", false],
};

//-----Layout_Style & behaviors
//------variables
var leftDrawerOpen = ref(false); //hide & show sideBar
//-------bots(littleService)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
  return true;
}

const _responsiveWindow = computed(() => ({
  //computer Screen size on gowing
  height: $q.screen.height - 22 + "px",
  width: $q.screen.width + "px",
}));

//-------------------
//-------------PWA Features
var deferredPrompt = null; // Holds the beforeinstallprompt event
var canInstallPWA = false; // Flag to show/hide install button
// Listen for the beforeinstallprompt event

onMounted(async () => {
  try {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile
      // event.preventDefault();
      alert("incc");
      // Store the event for later use
      deferredPrompt = event;
      // Show the install button
      canInstallPWA = true;
    });
  } catch {}
});
async function installPWA() {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // Reset the deferredPrompt variable, since it can only be used once.
    deferredPrompt = null;
    // Hide the install button
    canInstallPWA = false;
  }
}
</script>

<style>
.iserviceMenu-Glass {
  backdrop-filter: blur(3px);
  background-color: rgba(0, 110, 255, 0.11);
  color: rgb(0, 0, 255);
}

.iserviceMenu-Glass:hover {
  backdrop-filter: blur(0.2px);
  width: 5vw;
}

.animMarketValue {
  position: relative;
  animation: move-words 20s linear infinite;
  margin: 0;
}

.marquee {
  animation: myfirst 1.5s linear infinite;
  -webkit-animation: rightThenLeft 20s linear;
}

@keyframes myfirst /* Firefox */ {
  50% {
    opacity: 50;
  }
}
</style>
