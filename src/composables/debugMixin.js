import { ref, reactive, computed, watch, onUnmounted, onMounted } from "vue";
import { schemaSklt } from "src/composables/schemaSklts";

// Define your mixin-like functionality
const useDebugMixin = () => {
  // Define reactive state
  const count = ref(0);

  var Loadingevent = ref({});
  var Loadingpage = ref(null);

  var Loading = ref([]);
  var DoneMessage = ref([]);
  var KnowthisMessage = ref([]);
  var WarnthisMessage = ref([]);

  //-----
  // Define methods
  // async function timerLoadpage(
  //   period_e = 6000,
  //   period = 6000,
  //   message = "",
  //   title = ""
  // ) {
  //   // Loadingpage.value.push({'color':'green','content':message,'title':title})
  //   Loadingevent.value = true;
  //   Loadingpage.value = { color: "green", content: message, title: title };

  //   period_e
  //     ? setTimeout(() => {
  //         Loadingevent.value = false;
  //         return false;
  //       }, period_e)
  //     : true;
  //   period
  //     ? setTimeout(() => {
  //         Loadingpage.value = false;
  //         return false;
  //       }, period)
  //     : true;
  //   return true;
  // }

  async function timerLoadevent(
    event = { main: 0 }, //is event working for main/loginpage/loading and for how long should it activates
    //0 timer, show not timemout to reset the value(only if other request comes)
    period = 6000,
    message = ""
    // title = ""
  ) {
    let title = "";
    // Loadingpage.value.push({'color':'green','content':message,'title':title})
    Loadingevent.value = {}; //will Holde 'main','login','contnueform' or null
    Loadingpage.value = { color: "green", content: message, title: title }; //the content and descriptsion or null

    //event Messages
    let eventEntries = Object.entries(event);
    Loadingevent.value[eventEntries[0][0]] = true;

    if (eventEntries[0][1]) {
      new Promise((resolve) => {
        setTimeout(() => {
          Loadingevent.value[eventEntries[0][0]] = false;
          resolve(true);
        }, eventEntries[0][1]);
      });
    } else {
    }

    //The Messages
    return period
      ? new Promise((resolve) => {
          setTimeout(() => {
            Loadingpage.value = false;
            resolve(true);
          }, period);
        })
      : true;
  }

  async function timerLoad(period = 6000, message = "", title = "") {
    Loading.value.push({ color: "green", content: message, title: title });
    return period
      ? new Promise((resolve) => {
          setTimeout(() => {
            Loading.value.shift();
            resolve(true);
          }, period);
        })
      : true;
  }
  //timerLoading
  function timerDone(period = 6000, message = "", title = "") {
    DoneMessage.value.push({ color: "green", content: message, title: title });
    return period
      ? new Promise((resolve) => {
          setTimeout(() => {
            DoneMessage.value.shift();
            resolve(true);
          }, period);
        })
      : true;
  }

  function timerInformthis(period = 6000, message = "", title = title) {
    KnowthisMessage.value.push({
      color: "cyan",
      content: message,
      title: title,
    });

    return period
      ? new Promise((resolve) => {
          setTimeout(() => {
            KnowthisMessage.value.shift();
            resolve(true);
          }, period);
        })
      : true;
  }
  function timerError(period = 6000, message = "", title = "") {
    WarnthisMessage.value.push({
      color: "red",
      content: message,
      title: title,
    });
    return period
      ? new Promise((resolve) => {
          setTimeout(() => {
            WarnthisMessage.value.shift();
            resolve(true);
          }, period);
        })
      : true;
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
    // timerLoadpage,
    timerLoadevent,
    timerLoad,

    timerDone,
    timerInformthis,
    timerError,
  };
};

export default useDebugMixin;
