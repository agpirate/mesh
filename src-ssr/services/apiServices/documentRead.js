//----------------------------------Query Builder
export const rOps = async function (
  dbModel,
  findBy = [],
  returnWat = {},
  limits = 100,
  sortBy = { createdAt: -1 },
  skips = 0
) {
  try {
    return await dbModel
      .find({ $or: findBy }, returnWat)
      .sort(sortBy)
      .skip(Number(skips))
      .limit(Number(limits))
      .then((modelData) => {
        console.log(
          modelData.length,
          "or Fetching..",
          "skips =",
          skips,
          "limits =",
          limits,
          "sortBy =",
          sortBy
        );
        if (modelData) {
          return { status: 200, data: modelData }; //returns null or object_
        } else {
          return { status: 200, data: modelData }; //not found Error
        }
      })
      .catch((modelError) => {
        return { status: 501, data: modelError }; //DBs_Schema or Rules_validations Error
      });
  } catch (error) {
    return { status: 500, data: error };
  } //DBs Connections or Configurations, modules Error
};
//---------------------------Reading Filtered Data
export const rOp = async function (
  dbModel,
  findBy = [],
  returnWat = {},
  limits = 100,
  sortBy = { createdAt: -1 },
  skips = 0
) {
  try {
    return await dbModel
      .find({ $and: findBy }, returnWat)
      .sort(sortBy)
      .skip(Number(skips))
      .limit(Number(limits))
      .then((modelData) => {
        console.log(
          modelData.length,
          "and& Fetching..",
          "skips =",
          skips,
          "limits =",
          limits,
          "sortBy =",
          sortBy
        );
        if (modelData) {
          return { status: 200, data: modelData }; //returns null or object_
        } else {
          return { status: 200, data: modelData }; //not found Error
        }
      })
      .catch((modelError) => {
        return { status: 501, data: modelError }; //DBs_Schema or Rules_validations Error
      });
  } catch (error) {
    return { status: 500, data: error };
  } //DBs Connections or Configurations, modules Error
};

export const rOrp = async function (
  dbModel,
  findBy = [],
  returnWat = {},
  limits = 100,
  sortBy = { createdAt: -1 }
) {
  try {
    return await dbModel
      .find({ $or: findBy }, returnWat)
      .sort(sortBy)
      .limit(limits)
      .then((modelData) => {
        console.log(modelData.length, "Or Fetching");
        if (modelData) {
          return { status: 200, data: modelData }; //returns null or object_
        } else {
          return { status: 200, data: modelData }; //not found Error
        }
      })
      .catch((modelError) => {
        return { status: 501, data: modelError }; //DBs_Schema or Rules_validations Error
      });
  } catch (error) {
    return { status: 500, data: error };
  } //DBs Connections or Configurations, modules Error
};

export const dOps = async function (dbModel, itemId) {
  try {
    return await dbModel
      .findByIdAndDelete(itemId) //or simply >>--  findBy['id']
      .then((modelData) => {
        if (modelData && Object.keys(modelData).length) {
          return { status: 200, data: modelData }; //returns null or object_
        } else {
          return { status: 200, data: null }; //not found Error
        }
      })
      .catch((modelError) => {
        return { status: 501, data: modelError }; //DBs_Schema or Rules_validations Error
      });
  } catch (error) {
    return { status: 500, data: error };
  } //DBs Connections or Configurations, modules Error
};
