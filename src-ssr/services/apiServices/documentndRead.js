
  //----------------------------------Query Builder
  export const rOps = async function (dbModel,findBy=[],returnWat={},limits=100) {
    try {
      return await dbModel
        .find({ $and: findBy }, returnWat)
        .sort({updatedAt:-1 })
        .limit(limits) 
        .then((modelData) => {  
          if (modelData) { return { status: 200, data: modelData }; //returns null or object_
          } else { return { status: 301, data:modelData }; //not found Error
          } }).catch((modelError) => {
          return { status: 404, data: modelError }; //DBs_Schema or Rules_validations Error
        }); 
    } catch(error) { return { status: 404, data: error};  } //DBs Connections or Configurations, modules Error
  };
  //---------------------------Reading Filtered Data
 export const rOp = async function (dbModel,findBy=[],returnWat={},limits=100) {
    try {
      return await dbModel
        .find({ $and: findBy }, returnWat)
        .sort({updatedAt:-1 })
        .limit(limits) 
        .then((modelData) => {
          console.log(modelData.length,'ffffffffffff',findBy)
          if (modelData) { return { status: 200, data: modelData }; //returns null or object_
          } else { return { status: 301, data:modelData }; //not found Error
          } }).catch((modelError) => {
          return { status: 404, data: modelError }; //DBs_Schema or Rules_validations Error
        }); 
    } catch(error) { return { status: 404, data: error};  } //DBs Connections or Configurations, modules Error
  };
  
  export const dOps = async function (dbModel, itemId) {
    try {
      return await dbModel
        .findByIdAndDelete(itemId) //or simply >>--  findBy['id']
        .then((modelData) => {
          if (modelData && Object.keys(modelData).length) { return { status: 200, data: modelData }; //returns null or object_
          } else { return { status: 200, data:null }; //not found Error
          } }).catch((modelError) => {
          return { status: 404, data: modelError }; //DBs_Schema or Rules_validations Error
        }); 
    } catch(error) { return { status: 404, data: error};  } //DBs Connections or Configurations, modules Error
  };

