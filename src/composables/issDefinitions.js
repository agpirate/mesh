



export async function modal_iss (_modal_iss,_thisIss) {
    //------------------All Groups && Permission && Roles
    if(_thisIss){
      let group= _thisIss['group'] ?? false
      let stage= _thisIss['accstage'] ?? false
      let role= _thisIss['role'] ?? false
      let capability= _thisIss['capability'] ?? false
      //-------setup the users permissions_sets
      //-----Return Total Roles of Model
      let _resp ={
         role:_modal_iss['role'][0],
        _isGroupof:group ?? null,
        _isStageeof:stage ?? null,
        //------------------All Groups && Permission && Roles
        _isRoleof:role ?? null,
        _isCapabelof:capability ?? null

      }
      return _resp
    }
    return _modal_iss['role'][0]
  } 


let _thisModels =[]
//==========-----------Generating====The Schematic Models
//---main Defaulting(Schema)------takes the model require table_view && filtering...
let _this_clientSchema=saleitClientSchema
_this_clientSchema['time']={default:''} //-----add require custom columns
_this_clientSchema['action']={default:''}
let _this_clientModels =[]
let _this_clientColumns = ref([]); //Actual Table_Columns ++Descriptions

///-----setting variable to hold main_schema Values
let _allColumnNames = ref([]); //Actual OuterMost Table_Column_Names [Top(Layer_1] _Columns _Name_List]
let _rolesColumns = ref([]); //Filtered/Authorized_Table_Columns ++Descriptions for Editing/Adding.... but not Viewing
let lockedColumns = ref([ "userID","userName",'time','action']); //are blacklist of _this_clientColumns tobe not shown during the Registerations..form submitting
let visibleColumns = ref([]); //column invisiblity on table_
let invisibleColumns = [
    //"financeStatus",
    'saleitID','userID','confirmID','phoneCode','geolocation','paymentMethod'
]; //defualt hidden _this_clientColumns
if ($q.screen.lt.md) {
    //invisibleColumns.push("storeStatus");
}
if ($q.screen.lt.lg) {
    //invisibleColumns.push("storeStatus");
}
  //==================-----------Generating====The Schematic Models
  //using above schema_models,schema build default values by the logedUser Roles (permission level)
 async function _this_clientColumns() { 
      //if (Object.values(Objprops).length === 0) { //is User_Fully_Authenticated &&  or Return Null_Columns
      //  return [{}];
      //} else {
  
        //--------------Preparing this_model role_schemas
        let rolesWall = gen_modal_iss.role.value['enum']//?.['role'] ?? false
        //------==== building columns of thisMoel
        let _tableColumn = []; //HOLDING_  all the ---"Columns"--- of the Data_model ( TOTAL Columns)
        let _visibleColsName = [];  ////--HOLDING_ all the ---"Visible" Columns"---- of the Data_model ( TOTAL Columns)
        for (let schemaColumn in _this_clientSchema) {
          //----------------loging all _this_clientColumns_ as table _this_clientColumns_format
          let _col = { name: schemaColumn,schema: _this_clientSchema[schemaColumn], }; //the q-table format of Column Definitions... && Hold Every Columns
          _tableColumn.push(_col); 
          //----------------loging all _this_clientColumns name as normal list format
          _allColumnName(schemaColumn); 
          //---------------loging Visible Columns list(on table)
          invisibleColumns.includes(schemaColumn) ? "" : _visibleColsName.push(schemaColumn);
          //----
          //----------------loging Role Based  && whitelisted Columns-Start
          if (schemaColumn === "extraColumn" || lockedColumns.value.includes(schemaColumn)) { //if _this_clientColumns is locked(for not display or analysis).. passit.
            continue;
          } else {
            _rolesColumn(_col)
          }
          //------------------------roleBase Columns-End
        }
        //--------------------------build other columns_set by roleBase or just Listing
        //------==== building columns of thisMoel
         _this_clientModels = ['phone',"userName","geolocation",'location','phoneCode'] //
  
         //------==== building columns of thisMoel
         _thisModels = ['orderID',"quantity","saleitID",'userID','userName','phone',
        'confirmID','served','phoneCode','geolocation','location'] //
        //-------------------------
  
        _model_Defaulting(); 
        visibleColumn(_visibleColsName);
        return _tableColumn;
      //}
    }

    const _allColumnName = async (schemaColumn) => _allColumnNames.value.push(schemaColumn); //Holding topLayer Name of Columns
    const _rolesColumn = async (_col) =>  _rolesColumns.value.push(_col);  //( Object List of author__this_clientColumns Details)
    const visibleColumn = async (visibleCols) =>  visibleColumns.value = visibleCols; //.slice[0,_allColumnNames.value.length]
    //------------------------------------------
    async function _model_Defaulting() {
      if (!_rolesColumns.value.length) {
        _thisDefault_client.value={};      
        return false;
      }    
      return await schemaSklt(_rolesColumns.value).then(async (_this_Sckelton)=>{
        _thisDefault_client.value= await _modal_Defaulting(_this_Sckelton);
        console.log('defaultitems',_thisDefault_client.value,_thisDefault_client,_this_chatDefault)
        return true
      }).catch((error)=>{_thisDefault_client.value={};return true })
    }
  
  async function _modal_Defaulting(_this_Sckelton) { //should excute once on boot or on changing location(geolocation)
      //------------------------Useable Values
       //-------------Primary Data Model  (primary _this_)
      for (let kkey of _this_clientModels) { //modify column's updateable data
      _this_Sckelton[kkey] = Objprops._profile[kkey] ?? ''
      }
      //--------------Client_Data  Model (Secondary _this_)
      for (let kkey of _thisModels) { //modify column's updateable data
      _thisDefault.value[kkey] = Objprops._profile[kkey] ?? ''
      }
      //_thisDefault_client.value['orderID']=await _genOrderID()
      _thisDefault.value['quantity']=1
      _thisDefault.value['userID']=Objprops.userID
     // _thisDefault_client.value['served'] = 'Requesting' ; //Requesting.... is let'us know it's new Order
  
      //-------------Primary Data Model  (primary _this_)
  
      //------------Exiting Default(primary data Model)
      return _this_Sckelton
    }
