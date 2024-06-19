

import { ref,reactive,computed,watch,onUnmounted, onMounted } from "vue";
import {useQuasar, useMeta } from "quasar";
//import print from 'print-js';
import { useRouter } from "vue-router";
//import { storeToRefs } from "pinia";
const $q = useQuasar();

// myMixin.js
export default {
    data() {
      return {
        _thisModel2:'',
        Objprops2: ''
      };
    },

    methods: {
        /*
        modal_iss() {  //role and permission definitions

            let _modal_iss= this.Objprops._issModal[this._thisModel] ?? false
            let _thisIss= this.Objprops._iss[this._thisModel] ?? false
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
            return _resp
      },

*/



      decrement() {
        this.count--;
      }
    }



  };


