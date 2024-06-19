


<template>

    <div  style="position: fixed;
    
    bottom: 5%;
    right: 3%;
    max-width: 40vw;
    min-width:20vw;
    min-height:30vh;
    "
    class = "z-top  column justify-end">
    <!-- :style="{ backgroundColor: color }" -->

    <!-- <q-btn  :dense="true" color="green" icon="done"  > </q-btn>     -->
    <div class = "notification q-pa-sm" :style="'backgroud-color:'+message.color" v-for="message,index in messages" :key="index" >

        <div class="row justify-between" style="width:100%;">
            <!-- <h4 class="fontastyle">{{ message.title ?? '' }}</h4> -->
            <!-- <q-btn   :color="message.color ?? 'blue'"  @click="emitPress('close')" :dense="true"  label="Ok" /> -->
        
        </div>

  <p class="fontbstyle">{{ message.content ?? '' }}</p>
  <div class="row justify-end">
      <p class="fontbstyle">{{  new Date().toLocaleString() }}</p>

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
  const props = defineProps({
    messages: { type: Object, default: () => ({}) },
  });

  const emit = defineEmits(['closeButton']);
  function emitPress(_action) {
    emit('closeButton', _action);
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

.notification.info {
    background-color: #007BFF;
    color: white;
}

.notification.error {
    background-color: #FF3B30;
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
    background-color: #007BFF;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

.popup {
    /* display: none; */
    display: flex;flex-flow: column wrap;justify-content:center;align-items:center;

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
    from { opacity: 0; }
    to { opacity: 1; }
}


  </style>

