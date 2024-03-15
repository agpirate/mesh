import { defineStore } from "pinia";
//import TheDate from "src/utilis/services/timeService.js";
import { ref, computed } from "vue";
import { morph, date } from "quasar";
//import { useStorage } from "@vueuse/core";

const STORE_NAME = "timeStore";

export const timeStore = defineStore(STORE_NAME, () => {
  //state
  const utilDService = ref({ id: 0, Time: null, description: "" });
  // ----------------------- Testing store......state

  // getters
  const getNow = computed(() => utilDService.value.Time);

  // actions
  const timeMachine = () => {
    setInterval(() => {
      //calling itself every 10 seconds and update the value....
      const timeStamp = Date.now(); //new Date().toJSON().slice(0, 10).replace(/-/g, "/");,,.getHours() getMinutes()
      utilDService.value.Time = date.formatDate(
        timeStamp,
        "DD-MM-YYYY _ HH:mm:ss"
      );
      utilDService.value.Time = new Date().toLocaleString("en-US", {
        timeZoneName: "short",
      }); //.toDateString()[Wed May 30 2023] ;;; .toISOString()[2023-05-30T00:00:00.000Z] ;; .toLocaleDateString()[5/30/2023]
      //.toLocaleString('en-US', { timeZoneName: 'short' });[5/30/2023, 12:00:00 AM PDT] ;;.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit',});
      return true;
    }, 5000);
  };
  // ---------------Testing Actions

  return {
    //-------------------Direct data porting...
    utilDService,
    //-------------------getter porting
    getNow,
    //--------------actions porting
    timeMachine,
  };
});

export const useTimeserStore2 = defineStore(STORE_NAME, () => {
  //state

  const utilDService = ref({ id: 0, Time: null, description: "" });

  // getters
  const getNow = computed(() => utilDService.value.Time);

  // actions
  const timeMachine = () => {
    setInterval(() => {
      //dateNow.value[0] = TheDate();
      utilDService.value.Time = new Date();
    }, 5000);
  };

  return {
    utilDService,
    getNow,
    timeMachine,
  };
});
