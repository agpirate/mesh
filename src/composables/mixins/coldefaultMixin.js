import { ref,reactive,computed,watch,onUnmounted,onMounted } from "vue";
  

  // Define your mixin-like functionality
   const useCounterMixin = () => {
    // Define reactive state
    const count = ref(0);
    const Objprops_=ref('')
    const _thisModel=ref('')
    //---------
    const _iss=ref('')
    
    // Define methods
    const increment = () => {
      count.value++;
    };
  
    const decrement = () => {
      count.value--;
    };

    let modal_iss = () => {
      //------------------All Groups && Permission && Roles
      let _modal_iss= Objprops_.value._issModal[_thisModel.value] ?? false
      let _thisIss= Objprops_.value._iss[_thisModel.value] ?? false
      //------------------All Groups && Permission && Roles
      let _resp ={'role': _modal_iss ? _modal_iss['role'][0] : false}
      if(_thisIss){
        let group= _thisIss['group'] ?? false
        let stage= _thisIss['accstage'] ?? false
        let role= _thisIss['role'] ?? false
        let capability= _thisIss['capability'] ?? false
        //-------setup the users permissions_sets
        //-----Return Total Roles of Model
        _resp ={
           role:_modal_iss['role'][0],
          _isGroupof:group ?? null,
          _isStageeof:stage ?? null,
          //------------------All Groups && Permission && Roles
          _isRoleof:role ?? null,
          _isCapabelof:capability ?? null
        }
      }
      _iss.value=_resp
      return _resp
    } 
  



    // Return data and methods
    return {
      count,
      Objprops_,
      _thisModel,
      modal_iss,
      increment,
      decrement
    };
  };

  export default useCounterMixin;