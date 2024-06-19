import { ref,reactive,computed,watch,onUnmounted,onMounted } from "vue";

  // Define your mixin-like functionality
   const useConfirmMixin = () => {
    // Define reactive state
    var confirmWaite=ref(null)
    var confirmMessage=ref(false)
    //-----  
    // Define methods
    async function timerConfirm(period = 120000, message = null) {
      console.log('timerConfirmation=====')
      if(message == null){
          return setTimeout(async () => {
          // Loadingpage.value=[]
          return 'confirmMessage.value1';
        },period);
        return 'confirmWaite.value0'
      }else{
        // confirmWaite.value.clear();
        // confirmWaite.value=null
        confirmMessage.value=message;
        // confirmWaite.value=message
        return message
      }
    }
    // Return data and methods
    return {
      confirmWaite,
      //----------returning values
      timerConfirm,
    };
  };

  export default useConfirmMixin;