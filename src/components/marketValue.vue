
<template>

<div class="col-auto q-gutter-none justify-center items-center row" style="">
          
          <div class="col content-center "  style="background-color:transparent;">
          <div class="marqueeBox" style="background-color:transparent;" >
              <span class="transparent marquee">
                <div class="row flex flex-center"  style="">                
                  <q-item-label class="triShape triShapeU" > </q-item-label> %5
                  <q-item-label class="triShape triShapeD " /> %0.1 
                  Toguamino                 
                </div>
              </span>
              <q-separator inset />              
            </div>
          </div>
  
  
      </div>


</template>


<script setup>
        import { ref, reactive, computed } from "vue";
        import {WebSocket } from "ws";

        async function connectWebSocket(url) {
        return new Promise((resolve, reject) => {
            const socket = new WebSocket(url);

            socket.onopen = function() {
                resolve(socket);
            };
            socket.onerror = function(error) {
                reject(error);
            };
        });
    }

async function exampleUsage() {
    try {
        const socket = await connectWebSocket('ws://127.0.0.1:9100');
        console.log('WebSocket connection established');
        // Do something with the socket
    } catch (error) {
        console.error('Error connecting to WebSocket:', error);
    }

}

// Call the function
exampleUsage();

</script>