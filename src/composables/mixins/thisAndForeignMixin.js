import { ref, reactive, computed, watch, onUnmounted, onMounted } from "vue";

// Define your mixin-like functionality
const useThisMixin = () => {
  let __thisFileAttribute =ref(null)
  // Define reactive state
  let thisOps = ref({
    hover: false,
    active: false,
    selected: false,
    details: false,
    clients: false,
    comments: false,
  }); //_is UpdateRowItem/Creating_New
  let thissubOpsStatus = ref(null); //_is UpdateRowItem/Creating_New

  //------- Original/_UpdateRowItem:CreateRowItem _Commands
  let __thisBox_CDialog = ref(false);
  let __thisBox = ref(null); //true...
  let __this_foreignBoxDialog = ref(null);
  let __this_foreignBoxFilter = ref(null);

  //-------
  let __thisIndex = ref(null); //_row_item_index..0/1/2
  let __thisOps = ref(null); //_is UpdateRowItem/Creating_New
  let __thisOpsStatus = ref(null);
  let __thissubOps = ref(null); //_is UpdateRowItem/Creating_New
  let __thissubOpsStatus = ref(null); //_is UpdateRowItem/Creating_New
  // let __thisBoxsubOps = ref(null); //editing,deleting,creating

  let _is_thisOwner = ref(false);
  let _is_this_netPrice = ref();
  let _is_this_open = ref();
  let _is_this_currency = ref();

  //==-----tabular side_box ( Pop_by_Id and tell the Operation)
  let __this_foreignBox = ref(null); //clients,...
  //--------
  let __this_foreignBoxIndex = ref(null); //array_index_0/1/2/3
  let __this_foreignBoxOps = ref(null); //editing,deleting,creating
  let __this_foreignBoxOpsStatus = ref(null);
  let __this_foreignBoxsubOps = ref(null); //editing,deleting,creating
  //--------------------CONTENTING (CREATING  && EDITING....)====ENDS

  return {
    __thisFileAttribute,
    //--
    thisOps,
    thissubOpsStatus,
    // _this,
    //----------------
    _is_thisOwner,
    _is_this_netPrice,
    _is_this_open,
    _is_this_currency,
    //---------settings
    __thisBox,
    //----------
    __thisIndex,
    __thisOps,
    __thisOpsStatus,
    __thissubOps,
    __thissubOpsStatus,
    //----------------functions
    __this_foreignBox,
    __this_foreignBoxDialog,
    __this_foreignBoxFilter,
    //--------
    __this_foreignBoxIndex,
    __this_foreignBoxOps,
    __this_foreignBoxOpsStatus,
    __this_foreignBoxsubOps,
    //--------
    //  _resetfBox,
    // __thisBox_UDialog,
    // Reset_this,
  };
};

export default useThisMixin;
