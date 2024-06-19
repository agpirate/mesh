import { ref,reactive,computed,watch,onUnmounted,onMounted } from "vue";

  // Define your mixin-like functionality
   const useThisMixin = () => {
    // Define reactive state
    
    let _this_Rows = ref([]); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
    let _this_Details =ref(null)
    let _this_RowsStatus = ref(null); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
    let _this_Query = ref({}); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
    
    let _thisDefault = ref({});
    let _this = ref(null); //the selected row_actual_Data..as object
  
    //------- Original/_UpdateRowItem:CreateRowItem _Commands
    let __thisBox = ref(null); //true...
    //-------
    let __thisIndex = ref(null); //_row_item_index..0/1/2
    let __thisOps = ref(null); //_is UpdateRowItem/Creating_New
    let __thisOpsStatus =ref(null)
    


     //==-----tabular side_box ( Pop_by_Id and tell the Operation)
  let __this_foreignBox = ref(null); //clients,...
  //--------
  let __this_foreignBoxIndex = ref(null); //array_index_0/1/2/3
  let __this_foreignBoxOps = ref(null); //editing,deleting,creating
  let __this_foreignBoxOpsStatus =ref(null)
  let __this_foreignBoxsubOps = ref(null); //editing,deleting,creating
  //--------------------CONTENTING (CREATING  && EDITING....)====ENDS 

    return {
      _this_Rows,
      _this_Details,
      _this_RowsStatus,
      _this_Query,
      //----------returning values
      _thisDefault,
      _this,

      //---------settings
      __thisBox,
      //----------
      __thisIndex,
      __thisOps,
      __thisOpsStatus,
      //----------------functions
      
      __this_foreignBox ,
      //--------
       __this_foreignBoxIndex ,
       __this_foreignBoxOps ,
       __this_foreignBoxOpsStatus ,
       __this_foreignBoxsubOps ,
       //--------
      //  _resetfBox,
    };
  };

  export default useThisMixin;