import { ref,reactive,computed,watch,onUnmounted,onMounted } from "vue";
// import {useQuasar, useMeta } from "quasar";
  
  // const $q = useQuasar();

  // Define your mixin-like functionality
   const useMainMixin = () => {
    // Define reactive state
    const count = ref(0);
    const Objprops_=ref('')
    const _thisModel=ref('')
    let _this_Schema =ref('')
    //---------
    const _iss=ref('')
    //-----
        
    let _this_Rows = ref([]); 

    let columns = ref([]); 
    //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
    let status_thisDetail =ref(null)
    let _this = ref(null); //the selected row_actual_Data..as object
    let _this_RowsStatus = ref(null); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
    let _this_Query = ref({}); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
    
    let _thisDefault = ref({});

    //-------------
    let _allColumnNames = ref([]); //Actual OuterMost Table_Column_Names [Top(Layer_1] _Columns _Name_List]
    let _rolesColumns = ref([]); //Filtered/Authorized_Table_Columns ++Descriptions for Editing/Adding.... but not Viewing
    let lockedColumns = ref([ "userID","userName",'time','action']); //are blacklist of _this_clientColumns tobe not shown during the Registerations..form submitting
    let visibleColumns = ref([]); //column invisiblity on table_
    let invisibleColumns=ref('')

  
    //----foreignDefaulting and columns
    
    // let lockedColumns = ref([ "userID","userName"]); //are blacklist of columns tobe not shown during the Registerations..form submitting
    let visible_clientColumns =ref(['','orderID','quantity','price','description','time','action'])
    // Define methods


    //---------modalColumns ( columns require syncing_of liveData)
    let _thisModels = ref(['phone',"userName","geolocation",'location','userID','phoneCode']) //
    var _this_acctype =ref({})



    // Return data and methods
    return {
      count,
      //----------returning values
      _allColumnNames,
      _rolesColumns,
      visibleColumns,
      //---------settings
      Objprops_,
      _thisModel,
      _this_acctype,
      _this_Schema,

      lockedColumns,
      invisibleColumns,
      //----------------functions
      _this_Rows,
      status_thisDetail,
      _this,
      // _this_RowsStatus,
      _this_Query,

      columns,
      //----------returning values
      _thisDefault,
      //------------
      //-------
      _thisModels,
      // modal_iss,
      //--------
      //------preparing the main default and table_design

      //------preparing the foreign default and table_design
      // foreign_Columns,
      // _this_foreignDefaulting,

      //-----
      // visible_clientColumns,
    };
  };

  export default useMainMixin;