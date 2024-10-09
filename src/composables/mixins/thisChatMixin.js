import { ref, reactive, computed, watch, onUnmounted, onMounted } from "vue";
import { saleChatSchema } from "src/schemas/chatSchemas";

// Define your mixin-like functionality
const useChatMixin = () => {
  // Define reactive state
  let _this_chatSchema = ref(saleChatSchema);

  let _chatQuery = ref({});
  // Define reactive state
  let _this_chatColumns = ref([]);
  let visibleColumns_chat = ref([]);
  let invisibleColumns_chat = ref([
    "geolocation",
    "userID",
    "phoneCode",
    "saleitID",
  ]);

  let _this_modelTwoRows = ref([]); //Data's projected with the Columns variable [ calling function.....Crud_this.readDatas(top_100)]
  let _thisDefault_chat = ref({});
  let _this_chatforeign = ref({}); //the selected row_actual_Data..as object
  let _is_modelTwoOwner = ref(false);

  return {
    _this_chatSchema,

    _this_chatColumns,
    visibleColumns_chat,
    invisibleColumns_chat,

    _chatQuery,

    _this_modelTwoRows,
    _thisDefault_chat,
    _this_chatforeign,
    _is_modelTwoOwner,
  };
};

export default useChatMixin;
