


<template>



    <div class="" style="font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
">
        <div class="slides">
            <img :src="image" alt="Image 1" :key="inx" v-for="image,inx in images">
           
        </div>
        <!-- <button class="prev" onclick="moveSlide(-1)">&#10094;</button>
        <button class="next" onclick="moveSlide(1)">&#10095;</button> -->
    </div>

    <!-- <button class="fullscreen-btn" onclick="toggleFullscreen()">Full Screen</button> -->

  </template>
  
  <script setup>
  import { defineEmits,ref, reactive, onMounted, defineAsyncComponent, computed } from "vue";
  // import { ref, reactive, computed, onMounted, onBeforeMount, watch } from "vue";

    var props = defineProps({
      images: { type: Object, default: () => ({}) },

    });
    // var _blocedColumns =ref(['companyID','userID'])
    var images = computed(()=>{return props.images})

    const emit = defineEmits(['create','update','close']);
    function emitCreate(_action) {
      emit('create', _thiss.value);
    }



    let slideIndex = 0;


// Auto-slide every 3 seconds (optional)
setInterval(() => {
    moveSlide(1);
}, 3000);


function moveSlide(n) {
    const slides = document.querySelector('.slides');
    const images = document.querySelectorAll('.slides img');

    slideIndex += n;

    if (slideIndex < 0) {
        slideIndex = images.length - 1;
    } else if (slideIndex >= images.length) {
        slideIndex = 0;
    }

    slides.style.transform = `translateX(${-slideIndex * 100}%)`;
}

function toggleFullscreen() {
    const slider = document.querySelector('.slider');
    if (!document.fullscreenElement) {
        slider.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}



  </script>
  
  <style scoped>

.slider {
    position: relative;
    max-width: 600px;
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.slides {
    display: flex;
    width: 100%;
    transition: transform 0.5s ease;
}

.slides img {
    width: 100%;
    border-radius: 10px;
}

.prev, .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 50%;
    font-size: 18px;
}

.prev {
    left: 10px;
}

.next {
    right: 10px;
}

.fullscreen-btn {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
}

.fullscreen-btn:focus {
    outline: none;
}
  </style>

