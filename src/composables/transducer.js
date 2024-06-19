import {useQuasar, useMeta } from "quasar";
import { ref, reactive, computed, onMounted, onBeforeMount, watch } from "vue";

var $q = useQuasar();

//watch(warningDisplay, (currentValue, oldValue) => _confirmDialog());
var _fiyObj = (obj)=>$q.notify({obj});
var _ldObj = (obj)=>$q.loading.show({obj});
const notifyit = {
    info: (notes = "") => {
        _fiyObj({caption: "<div class='transparent' style='border-radius:10px;'>" + notes+" </div>",
            timeout:700,html:true,spinner:true,progress: true,classes:'flat rounded-borders bg-light-page text-dark' })
    },
    warn: (notes = "") => {
        _fiyObj({caption: "<div class='transparent' style='border-radius:10px;'>" + notes+" </div>",type: "negative",
            timeout:700,html:true,spinner:true,progress: true,classes:'flat rounded-borders bg-light-page text-dark'  })
    },
    succes: (notes = "",) => {
        _fiyObj({caption: "<div class='transparent' style='border-radius:10px;'>" + notes+" </div>",type: "negative",
            timeout:700,html:true,spinner:true,progress: true,classes:'flat rounded-borders bg-light-page text-dark'   })
    },
    simple: (notes = "") => {
        _fiyObj({caption: "<div class='transparent' style='border-radius:10px;'>" + notes+" </div>",type: "negative",
            timeout:700,html:true,spinner:true,progress: true,classes:'flat rounded-borders bg-light-page text-dark'   })
    },
  };
  //------DIALOGS  
  const loadit = {
    wellcome: async function (notes = "Loading...Weblog....!", period = 9000) {
        _ldObj({ message: notes,boxClass: "bg-secondary",spinnerColor: "orange",backgroundColor: "black",  })
      // hiding in 3s
      let loaditwellcometimer = setTimeout(() => {$q.loading.hide();loaditwellcometimer = void 0;}, period);
      return " ";
    },
    process: async function (notes = "wellcom", period = 5000) {

        _ldObj({ message: notes,boxClass: "transparent",spinnerColor: "orange",backgroundColor: "black",  })
        // hiding in 3s
        let loaditwellcometimer = setTimeout(() => {$q.loading.hide();loaditwellcometimer = void 0;}, period);
        return " ";
    },
  };


  export { loadit,notifyit}