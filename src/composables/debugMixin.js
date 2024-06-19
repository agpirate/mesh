import { ref,reactive,computed,watch,onUnmounted,onMounted } from "vue";
import {schemaSklt} from "src/composables/schemaSklts";
  

  // Define your mixin-like functionality
   const useDebugMixin = () => {
    // Define reactive state
    const count = ref(0);

    var Loadingevent=ref([])
    var Loadingpage=ref([])
    var Loading=ref([])

    var DoneMessage=ref([])
    var KnowthisMessage=ref([])    
    var WarnthisMessage=ref([])
    
    //-----  
    // Define methods
    async function timerLoadpage(period = 6000, message = "",title="") {
      Loadingpage.value.push({'color':'green','content':message,'title':title})
      return setTimeout(() => {
          Loadingpage.value=[]
          return false;}, 
          period);
    }
    async function timerLoadevent(period = 6000, message = "",title="") {
      Loadingevent.value.push({'color':'green','content':message,'title':title})
      return setTimeout(() => {
          Loadingevent.value.shift()
          return false;}, 
          period);
    }

    async function timerLoad(period = 6000, message = "",title="") {
      Loading.value.push({'color':'green','content':message,'title':title})
      return setTimeout(() => {
        Loading.value.shift()
          return false;}, 
          period);
    }
    //timerLoading
     function timerDone(period = 6000, message = "",title="") {
      DoneMessage.value.push({'color':'green','content':message,'title':title})
      return setTimeout(() => {
          DoneMessage.value.shift()
          return false;}, 
          period);
    }

     function timerInformthis(period = 6000, message = "",title=title) {
      KnowthisMessage.value.push({'color':'green','content':message,'title':title})
      return setTimeout(() => {
        KnowthisMessage.value.shift()
          return false;}, 
          period);

    }
     function timerError(period = 6000, message = "",title="") {
      WarnthisMessage.value.push({'color':'green','content':message,'title':title})
      return setTimeout(() => {
        WarnthisMessage.value.shift()
          return false;}, 
          period);

    }

    // async function _set
    // const _allColumnName = async (schemaColumn) => _allColumnNames.value.push(schemaColumn); //Holding topLayer Name of Columns
    // const _rolesColumn = async (_col) =>  _rolesColumns.value.push(_col);  //( Object List of author__this_clientColumns Details)
    // const visibleColumn = async (visibleCols) =>  visibleColumns.value = visibleCols; //.slice[0,_allColumnNames.value.length]
    //------------------------------------------

    // Return data and methods
    return {
      Loadingpage,
      Loadingevent,
      Loading,
      DoneMessage,
      KnowthisMessage,
      WarnthisMessage,
      //----------returning values
      timerLoadpage,
      timerLoadevent,
      timerLoad,
      
      timerDone,
      timerInformthis,
      timerError
    };
  };

  export default useDebugMixin;