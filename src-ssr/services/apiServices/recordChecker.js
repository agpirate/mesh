
export  async function _multi (dbModel,findBy=[],returnWat={}) {
    try {
      return await dbModel
        .findOne({ $or: findBy }, returnWat)
        .then((modelData) => {
          if (modelData && modelData.length) { return { status: 200, data: modelData }; //returns null or object_
          } else { return { status: 200, data:[] }; //not found Error
          } }).catch((modelError) => {
          return { status: 404, data: modelError }; //DBs_Schema or Rules_validations Error
        }); 
    } catch(error) { return { status: 404, data: error};  } //DBs Connections or Configurations, modules Error
  };

export  async function _one (dbModel,findBy=[],returnWat={},limits=100) {
    try {
      return await dbModel
        .findOne({ $or: findBy }, returnWat)
        .limit(limits) 
        .then((modelData) => {
          if (modelData && modelData.length) { return { status: 200, data: modelData }; //returns null or object_
          } else { return { status: 200, data:[] }; //not found Error
          } }).catch((modelError) => {
          return { status: 404, data: modelError }; //DBs_Schema or Rules_validations Error
        }); 
    } catch(error) { return { status: 404, data: error};  } //DBs Connections or Configurations, modules Error
  };


