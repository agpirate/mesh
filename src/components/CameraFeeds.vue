
<template>

<div>
      <video ref="video" @canplay="initiaCanvas()"> w </video>
      <canvas ref="canvas" style="display: none;"></canvas>
      <q-btn @click="takePicture()">tpic</q-btn>

    </div>


</template>


<script setup>
import { ref, reactive, computed } from "vue";

var video=ref('video')
var canvas=ref('video')
//startCapture()

var cameraStream;
let stream = null;
  let constraints = {
            video: true,
            audio: true
        }

var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


//stream =  navigator(constraints);

getUserMedia(navigator, {
    video: true,
    audio: true //optional
}, function (stream) {
    /*
    Here's where you handle the stream differently. Chrome needs to convert the stream
    to an object URL, but Firefox's stream already is one.
    */
    if (window.webkitURL) {
        ///video.src = window.webkitURL.createObjectURL(stream);
    } else {
        //video.src = stream;
    }
    //save it for later
    cameraStream = stream;
    //video.play();
});


async function getMedia() {

  navigator = ( 
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia    ||
                           navigator.msGetUserMedia );


                           if (navigator) {


                           }

                         
  try {
    stream = await navigator(constraints);
    console.log('1YYYYYYYYYYYYYYYY')
    /* use the stream */
  } catch (err) {
    /* handle the error */
    console.log(err,'error device')
  }
}
//getMedia()

function startCapture(){

    navigator.mediaDevices.getUserMedia({video:true,audio:false}).then((stream)=>{

    video.value.srcObject=stream;
    video.value.play()

  }).catch(error=>{
    console.log(error,'media device error')

  })
}

function initiaCanvas(){

  canvas.value.setAttribute('width',video.value.videoWidth)
  canvas.value.setAttribute('heiht',video.value.videoHeight)
}

function takeScreen(){

  let context=canvas.value.getContext('2D')
  context.drawImage(video.value,0,0,video.value.videoWidth,video.value.videoHeight)
  emit('Picture-taken',canvas.value.toDataUrl('image/png'))
}


</script>