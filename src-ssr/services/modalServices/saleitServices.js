
import {
  saleitModel,saleitClientModel
  } from "../../backendCore/models/saleitModels.js";

//---------saleit_computing services
import _primaryOperations  from "../columnServices/saleitServices.js";

import { mongoose } from "mongoose";
//var Schema = mongoose.Schema,
var ObjectId = mongoose.Types.ObjectId;

let ignoreUpdates =['likes','']
//---------
let createKey='id'
let updateKey='id'
let delKey='id'

let _nullKey={'updatedAt':null}

  async function createSaleit(reqData,columnOperation =null,columnsubOperation =null){
    try {
      //------------Preparing finding Query
      let findBy={} //Edit Existing
      if (reqData[createKey] ?? false) {findBy['_'+createKey]=new ObjectId(reqData[createKey]) //updating by id
      }else{ //creatNew  
        findBy=_nullKey //Existing_columns(for Null O/P)
        //return res.status(404).send({ message: "NullData(P) Received." });
      }
      let computed_ModalQA ={}

      //-----------finding Record
      return await saleitModel
        .findOne(findBy) //findeOne returns:--- Object or null values (while find returns [],[values,....])
        .then(async(modelQA) => { ///if findby is null it returns index_0 item
          console.log('\n-------------------New CreateSaleit--------------------------\n')
          console.log('\nUpdateSale >== mainOps = ',columnOperation,'\n subOps = ',columnsubOperation,'UpdatingOperations Ends Succefully of UserID',reqData.userID ?? false)
            if(modelQA==null){ 
              //==============Computing New Service -001 (for New)
              if(columnOperation){ //isRequired Computing Operations
                   computed_ModalQA = await _primaryOperations({},reqData,columnOperation,columnsubOperation)
                  //  console.log('\n',computed_ModalQA,'\n')
                   console.log('\n mainOps = ',columnOperation,'\n subOps = ',columnsubOperation,'PrimaryOperations- New ')   
                  if(computed_ModalQA.status != 200){return computed_ModalQA}

                  modelQA=new saleitModel(computed_ModalQA.data)
              }else{ modelQA = new saleitModel(reqData)}           
            }else{
              //==============Computing Existing Service -002 (for Existing)
              if(columnOperation){//isRequired Computing Operations
                let computed_ModalQA = await _primaryOperations(modelQA,reqData,columnOperation,columnsubOperation)
                // console.log('\n',computed_ModalQA,'\n')
                console.log('\n mainOps = ',columnOperation,'\n subOps = ',columnsubOperation,'PrimaryOperations - Updating ')   
                if(computed_ModalQA.status != 200){return computed_ModalQA}

                modelQA=computed_ModalQA.data
              }else{ modelQA=Object.assign(modelQA, reqData);}
            }
          console.log('\n mainOps = ',columnOperation,'\n subOps = ',columnsubOperation,'UpdatingOperations Ends Succefully')
            //--------Computed ModelData
            //=============S2===============Content Weighting Service
            //-----------Saving Model_START    
            return  await modelQA.save().then((modelData) => {
            console.log('\n === ==============Saved Finally    =================\n',modelData ? true : false)
              if (modelData && Object.keys(modelData).length) {
                return { status: 200, data: modelData,foreignData:computed_ModalQA.foreignData ?? {status:401}}
              } else {return { status: 501, data: modelData}; }
            }).catch((e) => {
              return { status: 501, data: e}; 
            });
          //-------------------------Saving Model_END
        }).catch((e)=>{
          return { status:501, data:e}
        }) //------------
  } catch(e) { return { status: 501, data:e};}
}


async function updateSaleit(reqData,columnOperation =null,columnsubOperation =null){
    try {
      //------------Preparing finding Query
      let findBy={} 
      if (reqData[updateKey] ?? false) {findBy['_'+updateKey]= new ObjectId(reqData[updateKey])//updating by id
      }else{ 
        findBy=_nullKey //Existing_columns(for Null O/P)
        //return res.status(404).send({ message: "NullData(P) Received." });
      }
      //---
      let computed_ModalQA ={}
      //-----------finding Record
      return await saleitModel
        .findOne(findBy) //if findby is null it returns index_0 item
        .then(async(modelQA) => {
          // let columnOperation = reqData['onplayOps'] ?? true
          console.log('\n-------------------New UpdateSaleit--------------------------\n')
          console.log('\nUpdateSale >== mainOps = ',columnOperation,'\n subOps = ',columnsubOperation,'\n UpdatingOperations Ends Succefully of UserID',reqData.userID ?? false)
          
          if(modelQA==null){ 
             //==============Computing New Service -001 (Only for ExistingRecords)
            return { status: 404, data:"Saleit Record Doesn't Found." }
          }else{//----------------Column Computing_I
            //=============S1================Computing Service
            if(columnOperation){//isRequired Computing Operations
               computed_ModalQA = await _primaryOperations(modelQA,reqData,columnOperation,columnsubOperation)
               console.log('\_primaryOperations UpdateSale ==<',computed_ModalQA.status,'\n')
              if(computed_ModalQA.status != 200){return computed_ModalQA}
              modelQA=Object.assign(modelQA, computed_ModalQA.data);
            }else{ modelQA=Object.assign(modelQA, reqData);}
          }
          //---------------Computer ModelData
          //=============S2===============Content Weighting Service
          //-----------Saving Model_START
          return  await modelQA.save().then((modelData) => {
            console.log('\n === ==============Saved Finally    =================\n',modelData ? true : false)
            if (modelData && Object.keys(modelData).length) {
              return { status: 200, data: modelData ,foreignData:computed_ModalQA.foreignData ?? {status:401}}
            } else {return { status: 501, data: modelData}; }
          }).catch((e) => {
            return { status: 500, data: e}; 
          });
        //-------------------------Saving Model_END
      }).catch((e)=>{
        return { status:500, data:e}
      }) //------------
} catch(e) { return { status: 500, data: e};}
}

export {createSaleit,updateSaleit}