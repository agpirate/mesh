<template>

<q-layout>

  <q-page-container>

<router-view  />


       </q-page-container>


</q-layout>

</template>

<script setup>
import {  reactive, ref, watch, computed } from "vue";
import { LocalStorage, useQuasar, useMeta } from "quasar";
const $q = useQuasar();

//-----------------------Local Varialbles

var iservicei_Menu = ref();
var iservicei_MenuDesc=ref(false);
iservicei_Menu.value={
  'SaleIt':["Anything To Sale ?","photo","saleIt",false],
  'RentIt':["Anything For Rent ?","collections_bookmark","rentIt",false],
  'Market':["Show current Market Price","assistant","marketIt",false],
  'OrderIt':["Looking Service you Like!","group","orderIt",false],
  'locateIt':["Locate Your Need","import_contacts","locateIt",false],
}

//-----Layout_Style & behaviors
//------variables
var leftDrawerOpen =ref(false) //hide & show sideBar
//-------bots(littleService)
function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
      return true;
    }
    
const _responsiveWindow = computed(() => ({  //computer Screen size on gowing
     height: $q.screen.height-22 +'px',
      width: $q.screen.width + 'px'
    }))


//-------------------

</script>

<style>

.iserviceMenu-Glass {
  backdrop-filter: blur(3px);
  background-color: rgba(0, 110, 255, 0.11);
  color: rgb(0, 0, 255);
}

.iserviceMenu-Glass:hover {
  backdrop-filter: blur(0.2px);
  width:5vw;
}


.animMarketValue


  {
  position: relative;
  animation: move-words 20s linear infinite;
  margin: 0;
}


.marquee {
    animation:myfirst 1.5s linear infinite;
    -webkit-animation: rightThenLeft 20s linear;
}

@keyframes myfirst /* Firefox */{
            50% {
                    opacity: 50;
                }
}

</style>
