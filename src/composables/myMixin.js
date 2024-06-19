import { ref,reactive,computed,watch,onUnmounted,onMounted } from "vue";
import {schemaSklt} from "src/composables/schemaSklts";
  

  // Define your mixin-like functionality
   const useDefaulMixin = () => {
    // Define reactive state
    const count = ref(0);
    const Objprops_=ref('')
    const _thisModel=ref('')
    let _this_Schema =ref('')
    //---------
    const _iss=ref('')
    //-----
    let _allColumnNames = ref([]); //Actual OuterMost Table_Column_Names [Top(Layer_1] _Columns _Name_List]
    let _rolesColumns = ref([]); //Filtered/Authorized_Table_Columns ++Descriptions for Editing/Adding.... but not Viewing
    let lockedColumns = ref([ "userID","userName",'time','action']); //are blacklist of _this_clientColumns tobe not shown during the Registerations..form submitting
    let visibleColumns = ref([]); //column invisiblity on table_
    let invisibleColumns=ref('')

    //----foreignDefaulting and columns
    let visible_clientColumns =ref(['','orderID','quantity','price','description','time','action'])
    // Define methods

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

    // async function _set
    const _allColumnName = async (schemaColumn) => _allColumnNames.value.push(schemaColumn); //Holding topLayer Name of Columns
    const _rolesColumn = async (_col) =>  _rolesColumns.value.push(_col);  //( Object List of author__this_clientColumns Details)
    const visibleColumn = async (visibleCols) =>  visibleColumns.value = visibleCols; //.slice[0,_allColumnNames.value.length]
    //------------------------------------------
    async function _model_Defaulting(_this_clientModels) {
      if (!_rolesColumns.value.length) {
        // _thisDefault_client.value={};      
        return {};
      }  

      return await schemaSklt(_rolesColumns.value).then(async (_this_Sckelton)=>{
        // _thisDefault_client.value= await _modal_Defaulting(_this_Sckelton);
        for (let kkey of _this_clientModels) { //modify column's updateable data
          _this_Sckelton[kkey] = Objprops_.value._profile[kkey] ?? ''
          }
        console.log('defaultitems333333333',_this_Sckelton,)

        return _this_Sckelton;
      }).catch((error)=>{
        // _thisDefault_client.value={};
        return {} })
    }
  
    //---------------------

    let modal_Columns_ =async (_schema) =>{
        let _tableColumn = []; //HOLDING_  all the ---"Columns"--- of the Data_model ( TOTAL Columns)
        let _visibleColsName = [];  ////--HOLDING_ all the ---"Visible" Columns"---- of the Data_model ( TOTAL Columns)
        for (let schemaColumn in _schema) {
          //----------------loging all _this_clientColumns_ as table _this_clientColumns_format
          let _col = { name: schemaColumn,schema: _schema[schemaColumn], }; //the q-table format of Column Definitions... && Hold Every Columns
          _tableColumn.push(_col); 
          //----------------loging all _this_clientColumns name as normal list format
          // await _allColumnName(schemaColumn); 
          //---------------loging Visible Columns list(on table)
          // invisibleColumns.value.includes(schemaColumn) ? "" : _visibleColsName.push(schemaColumn);
          //----
          _visibleColsName.push(schemaColumn);
          //----------------loging Role Based  && whitelisted Columns-Start
          //------------------------roleBase Columns-End
        }
        // let _models = await _modal_Defaulting_(_visibleColsName)
        return [_tableColumn,_visibleColsName]
    }

   async function _modal_Defaulting_(_thisModels) { //should excute once on boot or on changing location(geolocation)
     console.log(_thisModels,'kdfjdkajfdlakjflsakjf')
    //------------------------Useable Values
      let _thisDefault={}
      for (let kkey of _thisModels) { //modify column's updateable data
        _thisDefault[kkey] = Objprops_.value._profile[kkey] ?? ''
      }
      return _thisDefault
    }

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
      _this_Schema,
      invisibleColumns,
      //----------------functions
      _allColumnName,
      _rolesColumn,
      visibleColumn,

      modal_iss,
      //------preparing the main default and table_design
      _model_Defaulting,

      //------preparing the foreign default and table_design
      modal_Columns_,
      _modal_Defaulting_,
      visible_clientColumns,
    };
  };

  export default useDefaulMixin;