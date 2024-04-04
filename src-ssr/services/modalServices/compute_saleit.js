import { profileModel } from "app/src-ssr/backendCore/models/profileModels";

const nul = [null, undefined, false, "", [], {}, NaN];
  
  async function compute_Saleit(reqData) {

    //------------preprocess
    var keyhasValue = (key) => !nul.includes(reqData[key]) && Object.keys(reqData[key]).length != 0 ? true : false;

    //----------
    reqData={
      ...reqData,
    //---------
    //----------
    tQs: 0, //on store qunatity (which varries as sold/taken)
    //---------------- computing one
    tC: 0, tQC: 0, //total qunatity & costs(unit) && totalCost
    //-----------computing two
    tQt:0,tCt: 0, tQCt: 0,//taken(sold) qunatity & costs(unit) && totalCost
    //--
    tQCtonD:0,tQCttech:0
    }
  //console.log(reqData,parseFloat(totalOnstore),parseFloat(totalTaken),'buyer One final')
    
    //----------
    var totalQuantity = parseFloat(reqData["tQ"]  ?? 0 ) ; //unit price give as number or set_of_object like below
    //reqData['tQt'] = nul.includes(reqData["tQt"]) ? 0 : Number(reqData["tQt"]); //unit price give as number or set_of_object like below
    //--------------------------------
    //reqData['tQCtonD'] = nul.includes(reqData["tQCtonD"]) ? 0 : Number(reqData["tQCtonD"]); //taken with onDelivery method
    //reqData['tQCttech'] = nul.includes(reqData["tQCttech"]) ? 0 : Number(reqData["tQCttech"]); //taken with payed(online) meth..reqData['tQCt']
    //---------Key & Value Existance Checking...
    var _stage_ = parseFloat(reqData["_stage_"]  ?? 0 ); //unit price give as number or set_of_object like below

    //-------------Procurment Stage----Cost Vs Quantity
    var procurmentCost = parseFloat(reqData["price"]  ?? 0 ); //unit price give as number or set_of_object like below
    var costDisc = parseFloat(reqData["discount"] ?? 0 );
    procurmentCost = (costDisc || procurmentCost) ?? 0;

    var totalOnstore = parseFloat(reqData["quantity"]  ?? 0); //unit price give as number or set_of_object like below
    
    var totalTaken = 0;
    var totalTakenPrice = 0;
    var _clientCart = null //will hold ids all the contents.....

    console.log('saling init',reqData['clients'])
    try{
      //-------------
      var sold=false
      if ((reqData['clients']?.length ?? false)  && procurmentCost) {
        var saleIndex = {};
        var saleIndexIDs = [];

        for (let ins in reqData["clients"]) {
          //----
          saleIndex = reqData["clients"][ins] ?? false ;//nul.includes(reqData["clients"][ins])  ? false : reqData["clients"][ins];
          console.log('served is ',saleIndex["served"] == 'Requested',saleIndex["orderID"],saleIndex['phone'],reqData['phone'])
          if(saleIndex){
          var _isorderID = saleIndex["orderID"] ?? false //? parseFloat(saleIndex["quantity"]) : 0 // nul.includes(saleIndex["quantity"]) ? 0 : parseFloat(saleIndex["quantity"])
          var _isserved = saleIndex["served"] ?? false //? parseFloat(saleIndex["quantity"]) : 0 // nul.includes(saleIndex["quantity"]) ? 0 : parseFloat(saleIndex["quantity"])

          saleIndexIDs.push(_isorderID) //saleIndexIDs.includes()
          var itmtotake = parseFloat(saleIndex["quantity"] ?? 0 )//? parseFloat(saleIndex["quantity"]) : 0 // nul.includes(saleIndex["quantity"]) ? 0 : parseFloat(saleIndex["quantity"])
          var itmtakenprice = 0
          console.log('quan',itmtotake,itmtakenprice)
          if((saleIndex['phone'] ?? false) && reqData['phone']){ //is order requesting from client itself(compare registered phone with incoming phone)
              //---------------------
          console.log('quan',_isserved,_isorderID)

              if((_isserved == 'Requested') && _isorderID) //or is coming for buying New
              {
                var itmtotakeuprice = procurmentCost;//nul.includes(saleIndex["unitprice"]) ? 0 : Number(saleIndex["unitprice"]) //unit price..including vatZ
                var itmtotakeprice= (itmtotake) * itmtotakeuprice
              
                if (itmtotake > totalOnstore ) {                  
                  itmtotake=  totalOnstore
                }
                //---
                if (saleIndex["paymentMethod"] === "onDelivery") {
                  reqData["tQCtonD"] = parseFloat(reqData["tQCtonD"] ?? 0) + itmtotakeprice
                } else {  reqData["tQCttech"] = parseFloat(reqData["tQCttech"] ?? 0 ) + itmtotakeprice; 
                }
                
                //---------------- item to take...  
                 reqData["clients"][ins]["quantity"] = itmtotake;
                 reqData["clients"][ins]["price"] = itmtotakeprice;

                console.log('quan',itmtotake,itmtotakeprice)

                //---------------
                totalTaken = totalTaken + itmtotake;
                totalTakenPrice = totalTakenPrice + itmtotakeprice;
                //--
                sold=true        
                //if(itmtotake){  _stage_ = Math.max(Number(_stage_),2) }   //item  
                reqData["clients"][ins]["served"] ='Requested'
                reqData["clients"][ins]["description"] = 'waiting for Delivery Infos'
                //console.log(saleIndex,'buyer One is confirming')
                _clientCart = reqData['id'] ?? null //collect all content as card interms of ids..
              } else{ //coming for editing....
                itmtakenprice = parseFloat(saleIndex["price"] ?? 0  )               
                if(['Served','Queed'].includes(_isserved) && _isorderID){
                  totalTaken = totalTaken + itmtotake
                  totalTakenPrice = totalTakenPrice + ((itmtakenprice))
                  //--
                  if (saleIndex["paymentMethod"] === "onDelivery") {
                    reqData["tQCtonD"] = parseFloat(((reqData["tQCtonD"] ?? 0) + itmtakenprice))
                  } else {  reqData["tQCttech"] = parseFloat(((reqData["tQCttech"] ?? 0) + itmtakenprice)); }
                  
                }
      
              }
            //  }
          }
          else{ //counting all confirmed buys

              if(_isorderID){                
                itmtakenprice = parseFloat(saleIndex["price"] ?? 0 )

                totalTaken = totalTaken + itmtotake
                totalTakenPrice = totalTakenPrice + itmtakenprice
                //--
                if (saleIndex["paymentMethod"] === "onDelivery") {
                  reqData["tQCtonD"] = parseFloat(((reqData["tQCtonD"] ?? 0) + itmtakenprice))
                } else {  reqData["tQCttech"] = parseFloat(((reqData["tQCttech"] ?? 0) + itmtakenprice)); }
                
              }           
          }
          }

        }
      } else {
        reqData["clients"]=[] //when object is array is coming null ..let the mongodb create default one...that is best
        reqData["tQCt"] = 0;
        reqData["tPrice"] = 0;
        reqData["tQCttech"] = 0;
        reqData["tQCtonD"] = 0;
      }
  
        //-------this is stage 3
          if(totalTaken ?? false){ //if quantity has been taken or now being taken (stage It)
                  //----------------------Finalizing
                  totalOnstore = totalQuantity - totalTaken;

                  if(totalOnstore ?? false){
                    _stage_ =Math.max(Number(_stage_),2) // if there is no left
                  }else{
                    if(reqData['completed'] ?? false){
                      _stage_ =Math.max(Number(_stage_),4) // if there is no left
                    }else{
                      _stage_ =Math.max(Number(_stage_),3) // if there is no left
                    }
                  }
          }else
                {
                //----------------------Finalizing
                if(totalQuantity > totalOnstore){ //if order are deleted or quantity is smaller(mean_ ) take the original number
                  totalOnstore = totalQuantity
                }
                _stage_ =Math.max(Number(_stage_),1) // if there is no left
          }

        //-------
        reqData['tPrice']=parseFloat( totalTakenPrice);// + (itmtotakeprice + Number(itmtotakeprice * 0.15))
        reqData['tQCt']=parseFloat( totalTakenPrice);// + (itmtotakeprice + Number(itmtotakeprice * 0.15))
        //--------------New Data checking        
        //---
        reqData['quantity']= totalOnstore
        //-----
        reqData.tQs = (totalOnstore);
        reqData.tQt = (totalTaken);
        //-----
        reqData['tQ']=parseFloat((totalTaken + totalOnstore));// + (itmtotakeprice + Number(itmtotakeprice * 0.15))
        reqData.tC = procurmentCost; //holding the unitcost or set_of_unitCost
        reqData.tQC = (totalOnstore+totalTaken)*procurmentCost;
  }

  catch(Error){ return false  }
  //----------
  reqData['_stage_']=_stage_
  //-------------------
  const _enumCat = {"Households":'25',"Phones":'50',"Displays":'75',"Vehicles":'100'}
  let _cat=reqData['catagory']
  const _enumUsage = {"":'25', "?":'50',"Used":'75',"New":'100'}
  let _usage=reqData['usage']

  let qweight=(reqData['queryWeight'] ?? '25.25.0.0').split('.')
  qweight=qweight.map(Number) ?? [25,25,0,0]

  //let _weight=qweight.split('.') ?? false
  let _cctweight=qweight[3] ? qweight[3] : 0

  reqData['queryWeight']=(_enumCat[_cat] ?? '25') + '.'+(_enumUsage[_usage] ?? '25')+'.'+'0'+'.'+(_cctweight+1)
  
  _computeClient(reqData['phone'],qweight,_clientCart)
  _clientCart=null
  console.log(_clientCart,parseFloat(totalOnstore),totalOnstore,totalQuantity,parseFloat(totalTaken),'buyer One final')
  return reqData;    
  }

  async function smsCode(){

    //send sms to user & return the code
    return 'abcd123'
  }

  export default compute_Saleit

  async function _computeClient(_phone,_weight,_cart){

    return await profileModel
        .findOne({'phone':_phone})
        //.sort({ _id: -1 })
        //.limit(1)
        .then((modelQA) => {
            //for(let _doc in modelQA){
            //let _modelQA=modelQA[_doc]
            //--------     -------------
            //let incmdata ={'queryWeight':''}
            console.log(modelQA,'modalqa',_phone)
            if(modelQA ?? false){

              //--------     ---------------
            let newcweight = (modelQA['queryWeight'] ?? '25.25.0.0.0').split('.') //Existing client...query weight
            newcweight=newcweight.map(Number) ?? [25,25,0,0]

            //let newqweight=(_weight ?? '25.25.0.0.0').split('.')  ///new client ...query weight
            //newqweight=newqweight.map(Number) ?? [25,25,0,0]

            newcweight[0] = newcweight[0] ? newcweight[0] : 50 //preventing NaN _values
            newcweight[1] = newcweight[1] ? newcweight[1] : 50
            _weight[0] = _weight[0] ? _weight[0] : 50
            _weight[1] = _weight[1] ? _weight[1] : 50

            modelQA['queryWeight']=(_weight[0] + newcweight[0])/2 + '.'+  ///averageing new query weights
            (_weight[1]+newcweight[1])/2 +'.'+ +'0'+'.'+'0'

            modelQA['cart'] = modelQA['cart'] ?? []
            if(_cart ?? false){  modelQA['cart'].push(_cart)  }

            console.log(_cart,'model saveing conteee')
            //----------
            //ErrorDepth="incmdata is Unique..."
            //Object.assign(modelQA, incmdata);
            //ErrorDepth="incmdata Assignation Completed.....withFile_"+isxFile
            return  modelQA
                .save()
                .then((modelData) => {
    
    
                })


            }
            
          }
         // }
         )

    //return true
  }