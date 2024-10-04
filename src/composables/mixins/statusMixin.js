import { ref,reactive,computed,watch,onUnmounted,onMounted } from "vue";
import {schemaSklt} from "src/composables/schemaSklts";
  

  // Define your mixin-like functionality
   const useStatusMixin = () => {
    // Define reactive state
    const count = ref(0);

    var status_Loading=ref([])

    var status_DoneMessage=ref([])
    var status_KnowthisMessage=ref([])    
    var status_WarnthisMessage=ref([])
    
    //-----
    // Define methods

    function status_timerLoad(period = 6000, message = "",title='') {
      status_Loading.value.push({'color':'grey','content':message,'title':title})
      console.log('inform Status',message)
      setTimeout(() => {
        status_Loading.value.shift()
          return false;}, 
          period);
      return true
    }

    //timerLoading
     function status_timerDone(period = 6000, message = "",title="") {
      status_DoneMessage.value.push({'color':'green','content':message,'title':title})
      setTimeout(() => {
          status_DoneMessage.value.shift()
          return false;}, 
          period);
      return true

     }

     function status_timerInformthis(period = 6000, message = "",title='') {
      status_KnowthisMessage.value.push({'color':'grey','content':message,'title':title})
      console.log('inform Status',message)
      setTimeout(() => {
        status_KnowthisMessage.value.shift()
          return false;}, 
          period);
      return true

    }

     function status_timerError(period = 6000, message = "",title="") {
      status_WarnthisMessage.value.push({'color':'red','content':message,'title':title})
      setTimeout(() => {
        status_WarnthisMessage.value.shift()
          return false;}, 
          period);
      return true


    }

    // async function _set
    // const _allColumnName = async (schemaColumn) => _allColumnNames.value.push(schemaColumn); //Holding topLayer Name of Columns
    // const _rolesColumn = async (_col) =>  _rolesColumns.value.push(_col);  //( Object List of author__this_clientColumns Details)
    // const visibleColumn = async (visibleCols) =>  visibleColumns.value = visibleCols; //.slice[0,_allColumnNames.value.length]
    //------------------------------------------

    // Return data and methods
    return {
      status_Loading,
      status_DoneMessage,
      status_KnowthisMessage,
      status_WarnthisMessage,
      //----------returning values
      status_timerLoad,
      status_timerDone,
      status_timerInformthis,
      status_timerError
    };
  };

  export default useStatusMixin;