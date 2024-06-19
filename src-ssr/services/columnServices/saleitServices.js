import { profileModel } from "app/src-ssr/backendCore/models/profileModels";
import { saleClientModel } from "app/src-ssr/backendCore/models/saleitModels";
import {saleChatModel } from "../../backendCore/models/chatModels.js";
import { model, mongoose } from "mongoose";
import { response } from "express";
//var Schema = mongoose.Schema,
ObjectId = mongoose.Types.ObjectId;

const saleCatagory = {"Households":'10',"Clothing":"25",
  "Food":"35",
  "Electronics":'50',"Vehicles":'75',"Land/House":'100',"Others":'0'}
  const saleUsage = {"New":'100',"Used":'75',"Others":'0'}

let _nullKey={'updatedAt':null}

  
class _foreign_Operations{
    constructor(_currentModel,reqData) {
        this._reqData=reqData
        this._model =_currentModel ?? ''

        this.userId=null
        this._modalId=null
        this._createNew=true
    }

    //----------------Geo
    async computeuser(){
    //----=== Preconditions && setups
    let _thisWeight= this._reqData['weight'] ?? false
    if(!_thisWeight){
        return { status: 400, data:"No Weights to be updated." } 
    }

    this.userId=this._reqData?.['userId'] ?? null
    this.userId = this.userId ? {'_id':new ObjectId(this.userId)} : _nullKey
    //-------------== Finde Item
    return await profileModel
    .findOne(this.userId, {}) //findeOne returns :--- Object or null values (while find returns [],[values,....])
    .then(async(modelQA) => { //----------  Check For The Data __Existance (Operate only if Exist)
        //----=== defined to create new or modifies
        if(modelQA){
        }else{ return { status: 501, data:"User doesn't exist" } }

        //-----------------------------------============== Compute Intermediate Data
    //grab existing..weights
    let _userAll_kg = modelQA['queryWeight'] ?? false
    //check weight_value existance(for Saleit Founde ?)
    if(_userAll_kg && (_userAll_kg?.['1'] ?? false)){
        //have saleit(index '1')_ weight
        let userSaleit_kg = (_userAll_kg['1'] ?? [1,1,1,1])//.trim().split('.') //Extract Existing Query or set_default && splitBy (.)
        let _inx=0
        //comput the existing weight array with incomming array
        userSaleit_kg=userSaleit_kg.map(function(str) {   
        let _parsed = Math.ceil((str + _thisWeight[_inx])/2 -1 ); _inx++         
        return _parsed});// ?? [0,0,0,0] //converting splited Str_Number into Number
        //--------------
        //re compute the trend value
        userSaleit_kg[3] = Math.ceil(userSaleit_kg[3]+1)
        //remodel the client_weight_value
        modelQA['queryWeight']['1']=[1,userSaleit_kg[1],userSaleit_kg[2],userSaleit_kg[3]]
        }
        else{modelQA['queryWeight']['1']=[1,1,1,1]}
        //----------------------------------------=============================
        //---=====================Saving Model
        return  await modelQA.save().then((modelData) => {

            if (modelData && Object.keys(modelData).length) {
                return { status: 200, data: modelData };
            } 
            else {
                return { status: 400, data:modelData};
            }
        }).catch((modelError) => {return { status: 400, data: modelError};});
    }).catch((modelQAR)=>{return { status:505, data:modelQAR}})
    }

    async saveItem(_saveNew = true) {
        this._createNew=_saveNew;

        this._modalId=this._reqData['id'] ?? null
        this._modalId = this._modalId ? {'_id':new ObjectId(this._modalId)} : _nullKey
        return await this._save()
    }
    async deleteItem() {
        this._modalId=this._reqData['id'] ?? null
        this._modalId = this._modalId ? {'_id':new ObjectId(this._modalId)} : _nullKey
        return await this._delete() 
    }
    //------------Operations
    async  _save(){
    //--------------setup data sets
    //----finding item
    return await this._model
    .findOne(this._modalId, {}) //findeOne returns :--- Object or null values (while find returns [],[values,....])
    .then(async(modelQA) => { //----------  Check For The Data __Existance
    //----Decided to add new or Modifies (or both)
        if(modelQA){  //is't New or Exited
            Object.assign(modelQA,this._reqData); 
        }else{ 
        if(this._createNew){
                modelQA = new this._model(this._reqData)
              }else{
                return { status: 501, data:"Client Doesn't exists .." }
              }
          }
          console.log('Saving Comment / Client---101',modelQA)
          return  await modelQA.save().then((modelData) => {
                console.log('Saving Comment / Client---102',modelData)

                if (modelData && Object.keys(modelData).length) {
                    return { status: 200, data: modelData };
                } else {
                  return { status: 400, data:modelData};
                }
            }).catch((modelError) => {return { status: 400, data: modelError};});

      }).catch((modelQAR)=>{return { status:505, data:modelQAR}})
    }

    async _delete(){
    try {
        return await this._model.findByIdAndDelete(this._modalId).then((modelData) => {
            if (modelData && Object.keys(modelData).length) {
            return { status: 200, data: JSON.stringify(modelData) }; //returns null or object_
            } 
            else { 
                return { status: 400, data:modelData }; //not found Error
            } 
        }).catch((modelError) => {
            return { status: 400, data: modelError }; //DBs_Schema or Rules_validations Error
        }); 
    } catch(modelQAR) { return { status: 505, data: modelQAR };  }
    }

}

async function _primaryOperations(modelQA,reqData,operation,_foreignOperation){

    // reqData['weight']=await _saleitWeight()
    if(operation =='likes'){  
          //------
          reqData['weight']=await _saleitWeight()
          let _cactivities=new _foreign_Operations(null,reqData)
          _cactivities.computeuser() 

          modelQA['likes']['like']++
          return {status:200,data:modelQA}
        }
    else if(operation =='_itServiceRating'){
        //------
        reqData['weight']=await _saleitWeight()
        let _cactivities=new _foreign_Operations(null,reqData)
        _cactivities.computeuser() 

        modelQA['_itServiceRating'] = reqData['_itServiceRating']//++
        return {status:200,data:modelQA}
    }

    else if(operation =='CreateRowItem'){
        reqData['weight']=await _saleitWeight(true)
        //------validating UseInput
        let _quantity = parseFloat(reqData["quantity"] ?? 0) //casting Values
        let _price = parseFloat(reqData["price"] ?? 0)
        let _discount = parseFloat(reqData["discount"] ?? 0)
  
        reqData["quantity"]=_quantity > 0 ? _quantity : 1 //Assigning Values
        reqData["price"]=_price > 0 ? _price : 0
        reqData["discount"]=(_discount > 0) ? _discount : 0
  
        //------------s
        modelQA=Object.assign(modelQA,reqData) 
        modelQA['tQs'] = reqData["quantity"]
        modelQA['tQ'] =  reqData["quantity"]
        
        return {status:200,data:modelQA}
      }
      else if(operation =='UpdateRowItem'){
        reqData['weight']=await _saleitWeight(true)
        //------validating UseInput
        let _quantity = parseFloat(reqData["quantity"] ?? 0) //casting Values
        let _price = parseFloat(reqData["price"] ?? 0)
        let _discount = parseFloat(reqData["discount"] ?? 0)
  
        reqData["quantity"]=_quantity > 0 ? _quantity : 1 //Assigning Values
        reqData["price"]=_price > 0 ? _price : 0
        reqData["discount"]=(_discount > 0) ? _discount : 0
  
        //------------
        modelQA=Object.assign(modelQA,reqData) 
        modelQA['tQs'] = reqData["quantity"]
        modelQA['tQ'] = (modelQA["tQt"]) + reqData["quantity"]
  
        return {status:200,data:modelQA}
      }

    else if(operation =='comments'){
        //------------Computed Data ?
        let _computedData = Object.assign({},reqData['comments'])
        _computedData['contentId'] =reqData['id'] ?? ''
        _computedData['weight'] =reqData['weight'] ?? ''
        _computedData['userId'] =reqData['userId'] ?? ''
        //------
        // let _foreignOperation = (reqData["onplaySubops"] ?? false)
        //------
        _computedData['weight']=await _saleitWeight()
        let _cactivities=new _foreign_Operations(saleChatModel,_computedData)
        _cactivities.computeuser() 

        if(_foreignOperation == 'delete'){
            return await _cactivities.deleteItem()// _saveChat(_clientDatas['id'] ?? false,_onplaySubops =='delete' ? null : _clientDatas)
            .then((res)=>{
              return {status:200,data:modelQA,foreignData:res.data}
            }).catch((error)=>{console.log(error);return {status:401,data:error}})
        }else{
            return await _cactivities.saveItem(true)// _saveChat(_clientDatas['id'] ?? false,_onplaySubops =='delete' ? null : _clientDatas)
            .then((res)=>{
              return {status:200,data:modelQA,foreignData:res.data}
            }).catch((error)=>{console.log(error);return {status:401,data:error}})
        }
    }

    else if(operation =='clients'){

        //------------Computed Data 1
        let _computedData = Object.assign({},reqData['clients'])
        _computedData['contentId'] =reqData['id']//weight
        _computedData['weight'] =reqData['weight']//weight
        _computedData['userId'] =reqData['userId']//weight
        _computedData['saleitID'] =modelQA['id']//weight
        // _computedData['operation'] =reqData['onplaySubops']//weight

        //------------------- OnStore Quantity Argument
        var totalOnstore = parseFloat(modelQA["quantity"] ?? 1) // (modelQA["quantity"] == 0) ? reqData["quantity"] : modelQA["quantity"];//?? 0; //unit price give as number or set_of_object like below
        var totalTaken =parseFloat(modelQA["tQt"] ??0) // (modelQA["quantity"] == 0) ? reqData["quantity"] : modelQA["quantity"];//?? 0; //unit price give as number or set_of_object like below
        var totalClient =parseFloat(modelQA["tClient"] ?? 0) // (modelQA["quantity"] == 0) ? reqData["quantity"] : modelQA["quantity"];//?? 0; //unit price give as number or set_of_object like below
        var _stage_ = parseFloat(modelQA["_stage_"] ?? 1)//  ?? 0 ); 
        //--------------------Total Quantity Argument

        // let _foreignOperation = (reqData["onplaySubops"] ?? false)
        // var _tocart = _clientDatas["store"] ?? false //if to cart don' computer value just save_topocket
        if(_foreignOperation == 'delete'){ //deleting Client .. 

            //--------------Computing ClientData...2?
            //----------------
            // reqData['weight']=await _saleitWeight()
            let _cactivities=new _foreign_Operations(saleClientModel,_computedData)
            // _cactivities.computeuser() 

            return await _cactivities.deleteItem().then(async (res)=>{
              if(res.status == 200){
                totalOnstore = totalOnstore  + parseFloat(_computedData['quantity']) 
                totalTaken = totalTaken > 0 ? totalTaken - parseFloat(_computedData['quantity']) : 0
                totalClient =  totalClient > 0 ? totalClient -1 : 0

                let _modalData =await _secondaryOperations(modelQA,totalOnstore,totalTaken,totalClient,_stage_)
                return {status:200,data:_modalData,foreignData:res.data}
                }
                else{return res}
              }).catch((error)=>{console.log(error);return {status:401,data:error}})
        }else{
            //--------Pricing Argument
            var procurmentCost = modelQA["discount"] > 0 ? modelQA["discount"] : modelQA["price"]   //unit price give as number or set_of_object like below
            //--------------Computing ClientData...2
            
            let computedClient ={status:501}
            try{
              _computedData.totalOnstore=totalOnstore
              _computedData.totalTaken=totalTaken
              _computedData.procurmentCost=procurmentCost
              computedClient  = await _computeClient(_computedData)
            }catch{}

            if(computedClient.status != 200){ return computedClient}
            _computedData = computedClient.data
            //------
            _computedData['weight']=await _saleitWeight()
            let _cactivities=new _foreign_Operations(saleClientModel,_computedData) //Update User Weights && save the ClientData
            _cactivities.computeuser() 


            return await _cactivities.saveItem(true).then(async (res)=>{
              if(res.status == 200){
                 totalOnstore =parseFloat(_computedData["totalOnstore"] ?? 0 );
                 totalTaken=parseFloat(_computedData["totalTaken"] ?? 0 ); 
                //  _stage_=_computedData['_stage_'] ?? _stage_
                 totalClient =  totalClient ? totalClient+1 : 1
                let _modalData =await _secondaryOperations(modelQA,totalOnstore,totalTaken,totalClient,_stage_) //Apply Client Data into Content Effect
                return {status:200,data:_modalData,foreignData:res.data}
                }
              else{return res}
            }).catch((error)=>{console.log(error);return {status:401,data:error}})
        }
    }


    async function _saleitWeight(_isNewweight=false){

      //------Holding exist product scores or have it default as 1
      let catagoryScore=parseInt(modelQA['catagoryScore'] ?? 1)
      let usageScore=parseInt(modelQA['usageScore'] ?? 1)
      let trendScore=parseInt(((modelQA['trendScore'] ?? 1)))

      if(_isNewweight){ //if it's new acquire new score by catagory and usage value or use default above score
        try{
          usageScore= (reqData['usage'] ?? false) ? parseInt(saleUsage[reqData['usage']] ) : usageScore
          catagoryScore= (reqData['catagory'] ?? false) ? parseInt(saleCatagory[reqData['catagory']]) : catagoryScore
          
          reqData['catagoryScore']=isNaN(catagoryScore) ? 10 : catagoryScore //take it to assign to modelqa
          reqData['usageScore']=isNaN(usageScore) ? 10 : usageScore
          reqData['trendScore']= isNaN(trendScore) ? 10 : trendScore+1
        }catch{     }
      }else{
        modelQA['trendScore']=trendScore+1
      }
      return [1,catagoryScore,usageScore,trendScore] //return it to use on user scoring system
    }
}

async function _computeClient(_clientDatas){
  
  var _isserved = _clientDatas["served"] ?? false 
  var _tocart = _clientDatas["store"] ?? false //if to cart don' computer value just save_topocket
  let _response =null
  try{
          if(_tocart =='cart' || !_isserved){//saving as cart
              _clientDatas["store"]='cart'
              _clientDatas["quantity"]=_clientDatas.quantity ?? 0
              _clientDatas["price"]=(_clientDatas.quantity ?? 0)*(_clientDatas.procurmentCost)
              _clientDatas["served"] ='Requesting'
              // _clientDatas["saleitID"] = modelQA['id'];                      
              _clientDatas['_stage_'] = 0
              _response ={status:200,data:_clientDatas}
              return _response
          }else{//saving as bought

              if(_clientDatas.procurmentCost){    ///Cost Fixed ?    or Saveit

                    let itmtotake = parseFloat(_clientDatas["quantity"] ?? 1 ) // && totalOnstore//? parseFloat(_clientDatas["quantity"]) : 0 // nul.includes(_clientDatas["quantity"]) ? 0 : parseFloat(_clientDatas["quantity"])
                    itmtotake=itmtotake ? itmtotake : 1

                      if(_isserved == 'Requesting' || !_clientDatas["price"]){ //New Buyer ?  or Modified it.

                            if(_clientDatas.totalOnstore ){  //Quantity Existed ? or Saveit

                                  if (itmtotake > _clientDatas.totalOnstore ) { itmtotake =  _clientDatas.totalOnstore }   
                                  _clientDatas.totalOnstore= _clientDatas.totalOnstore  - itmtotake
                                  _clientDatas.totalTaken=_clientDatas.totalTaken + itmtotake

                                  var itmtotakeprice= parseFloat((itmtotake) * _clientDatas.procurmentCost);

                                  //---------------- item to take...  
                                  // _clientDatas["saleitID"] = modelQA['id'];                      
                                  _clientDatas["quantity"] = itmtotake;
                                  // totalClient++
                                  _clientDatas["price"] = itmtotakeprice;                   
                                  _clientDatas["served"] ='Requested'
                                  _clientDatas["store"]='buy'
                                  _clientDatas["description"] = 'waiting for Delivery Infos'

                                  _clientDatas['_stage_'] = 1

                                  //------Binding New Data
                                  _response ={status:200,data:_clientDatas}

                            }else{
                              _clientDatas["store"]='cart'
                              _clientDatas["quantity"]=_clientDatas["quantity"] ?? 0
                              _clientDatas["served"] ='Requesting'
                              // _clientDatas["saleitID"] = modelQA['id'];                      
                              _clientDatas['_stage_'] = 0
                              _response ={status:200,data:_clientDatas}                            
                            }  
                    }else{ //existing buyer (Update buy options)

                      if(_clientDatas['served'] == 'Queed'){ _clientDatas['_stage_'] = 3 }
                      if(_clientDatas['served'] == 'Served'){ _clientDatas['_stage_'] = 4}
                      
                      _response ={status:200,data:_clientDatas}
                    }            
                      
                  }else{
                    _clientDatas["store"]='cart'
                    _clientDatas["quantity"]=_clientDatas["quantity"] ?? 0
                    _clientDatas["served"] ='Requesting'
                    // _clientDatas["saleitID"] = modelQA['id'];                      
                    _clientDatas['_stage_'] = 0
                    _response ={status:200,data:_clientDatas}
                  }
            return _response
            }
            //------Binding New Data
            // _response ={status:501,data:_clientDatas}
  }catch(error){return {status:501,data:error}}
}

async function _secondaryOperations(_modalData,totalOnstore,totalTaken,totalClient,_stage_){

    //----------------------------Final Datas
    if(totalOnstore ?? false){ ///if there is leftOver                     
        _stage_ =Math.max(Number(_stage_),2) // if there is no left
        _modalData["completed"] ='no';
    }else{
      _modalData["completed"] ='yes';
        _stage_ =Math.max(Number(_stage_),4)                    
    }

    //--------Save Final
    // _modalData['tPrice']=parseFloat(_modalData['tPrice']+ itmtotakePrice);// + (itmtotakeprice + Number(itmtotakeprice * 0.15))
    // _modalData['tQCt']=parseFloat(_modalData['tQCt']+ itmtotakePrice);// + (itmtotakeprice + Number(itmtotakeprice * 0.15))
    // //--------------New Data checking        
    _modalData['quantity']= totalOnstore
    _modalData['tQs'] = totalOnstore;
    _modalData['tQt'] = totalTaken;
    _modalData["tClient"] =totalClient 
    //-----
    _modalData['tQ']=(totalTaken + totalOnstore);// + (itmtotakeprice + Number(itmtotakeprice * 0.15))
    //_modalData.tC = procurmentCost; //holding the unitcost or set_of_unitCost
    //--------------
    //_modalData.tQC = (_modalData.tQC ?? 0) + ((itmtotake)*procurmentCost);
    //----------
    _modalData['_stage_']=_stage_

    return _modalData
}



  export default _primaryOperations

