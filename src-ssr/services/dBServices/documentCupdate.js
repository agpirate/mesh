

let _returnRecords ={}
const documentCupdateList = (thisModel,lists=[]) =>{
  _returnRecords ={}

    try{
        thisModel.create(lists).then((createdDoc) => {console.log('Products created:', createdDoc); })
        .catch((error) => {console.error('Error creating products:', error); });
    }catch{  }

    return true
}

 async function documentCupdate (thisModel,documentRecords,updateKey=false,overWrite=false){
  console.log('\n============= Document Update ============= updateKey ='+updateKey+' <<START>>')
    _returnRecords ={}
    for (let doc in documentRecords) //[{'group':'a','model1':{},'model2':{},'model3':{}}]
        {
    try {
       let documentRecord = documentRecords[doc]//.toObject()
      //------------Preparing finding Query
      // console.log(documentRecord,'creating Item')
      let findBy={} 
      if (updateKey ?? false) {
        findBy[updateKey]= documentRecord[updateKey] ?? null//updating by id
      }else{ 
        findBy={updatedAt:null} //Existing_columns(for Null O/P)
        //return res.status(404).send({ message: "NullData(P) Received." });
      }
      //---
      //-----------finding Record__
       await thisModel
        .findOne(findBy) //if findby is null it returns index_0 item
        .then(async(modelQA) => {
          // let columnOperation = documentRecords['onplayOps'] ?? true
          if(modelQA==null){ 
             modelQA = new thisModel(documentRecord)
          console.log('Creating Document =',modelQA.updateKey ?? '',findBy,' ;;Newly Creating Process Debug',modelQA)
          }else{//----------------Column Computing_I
            //=============S1================Computing Service
            if(!updateKey){return false}
            modelQA=Object.assign(modelQA, documentRecord);
            console.log('Updating Document =',modelQA.updateKey ?? '',findBy,';\n Incoming AccKey =',modelQA)
          }
          //---------------Computer ModelData
          //=============S2===============Content Weighting Service
          //-----------Saving Model_START
          return  await modelQA.save().then((modelData) => {
            // console.log(modelData['quantity'],'Update ===')
          console.log('Final Acckey =',modelData.acckey ?? modelData._id,'')
            modelData = modelData.toObject() ?? false//lean()
            if (modelData && Object.keys(modelData).length) {
               if(updateKey){_returnRecords[findBy[updateKey]]=modelData} //return the id of each records = (updateKey_Value)
                console.log('\n============= Document Update ============ END Success '+doc)
              return { status: 200, data: _returnRecords}
            } else {return { status: 501, data: modelData}; }
          }).catch((modelError) => {
            console.log(modelError,'Creating Process Debug Error')
            return { status: 500, data: modelError}; 
          });
        //-------------------------Saving Model_END
      }).catch((modelQAR)=>{
        return { status:500, data:modelQAR}
      }) //------------
    } catch(error) { return { status: 500, data: error};}
            }
            
    return {status:200,'data':_returnRecords}
}


export {documentCupdate,documentCupdateList}
