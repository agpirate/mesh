
const nul = [null, undefined, false, "", [], {}, NaN];

  
  async function computeProfileMeta(reqData) {

    var keyhasValue = (key) => !nul.includes(reqData[key]) && Object.keys(reqData[key]).length != 0 ? true : false;
    //------------preprocess
    //----------
    reqData={
      ...reqData,
    //---------
    _stage_:1,
    //---------------- computing one

    //-----------computing two
    }
    //--------------------------------


    //------------
    return reqData;
    
  }
  //
  export default computeProfileMeta