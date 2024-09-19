import { ref,reactive,computed,watch,onUnmounted,onMounted } from "vue";
import { saleitClientSchema } from "src/composables/schemas/saleitSchemas";


  // Define your mixin-like functionality
   const useClientMixin = () => {
    let _this_modelOneSchema=ref(saleitClientSchema)
 
    let _modelOneQuery =ref({})
    // Define reactive state
    let _this_modelOneColumns = ref([]);
    let visibleColumns_client = ref([]);
    let invisibleColumns_client =ref(['phone',"paymentMethod","userName","geolocation",'location','userID','phoneCode']) 

    let _this_modelOneRows = ref([]); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
    let status_modelOneDetails = ref(null)
    let _thisDefault_client=ref({})
    let _this_modelOneforeign = ref(null); //the selected row_actual_Data..as object
    let _is_modelOneOwner=ref(false)


    return {
      _this_modelOneSchema,

      _modelOneQuery,
      
      _this_modelOneColumns,
      visibleColumns_client,
      invisibleColumns_client,

      _this_modelOneRows,
      status_modelOneDetails,

      _thisDefault_client,
      _this_modelOneforeign,
      _is_modelOneOwner
    };
  };

  export default useClientMixin;