
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
    //----------
    var totalQuantity = nul.includes(reqData["tQ"]) ? 0 : parseFloat(reqData["tQ"]); //unit price give as number or set_of_object like below
    //reqData['tQt'] = nul.includes(reqData["tQt"]) ? 0 : Number(reqData["tQt"]); //unit price give as number or set_of_object like below
    //--------------------------------
    //reqData['tQCtonD'] = nul.includes(reqData["tQCtonD"]) ? 0 : Number(reqData["tQCtonD"]); //taken with onDelivery method
    //reqData['tQCttech'] = nul.includes(reqData["tQCttech"]) ? 0 : Number(reqData["tQCttech"]); //taken with payed(online) meth..reqData['tQCt']
    //---------Key & Value Existance Checking...
    var _stage_ = nul.includes(reqData['_stage_']) ? 1 : parseFloat(reqData["_stage_"]); //unit price give as number or set_of_object like below

    //-------------Procurment Stage----Cost Vs Quantity
    var procurmentCost = nul.includes(reqData["price"]) ? 0 : parseFloat(reqData["price"]); //unit price give as number or set_of_object like below
    var totalOnstore = nul.includes(reqData["quantity"]) ? 0 : parseFloat(reqData["quantity"]); //unit price give as number or set_of_object like below
    
    var totalTaken = 0;
    var totalTakenPrice = 0;

    try{
      //-------------
      var sold=false
      if (keyhasValue("clients")) {
        var saleIndex = {};

        for (let ins in reqData["clients"]) {
          //----
          saleIndex = nul.includes(reqData["clients"][ins])  ? false : reqData["clients"][ins];
          //console.log('locked is ',saleIndex["locked"] == 'No',saleIndex["orderID"],saleIndex['phone'],reqData['phone'])

          if(saleIndex){

          var itmtotake = itmtotake = nul.includes(saleIndex["quantity"]) ? 0 : parseFloat(saleIndex["quantity"])
          var itmtakenprice = nul.includes(saleIndex["price"]) ? 0 : parseFloat(saleIndex["price"])

          var itmtotakeuprice = procurmentCost;//nul.includes(saleIndex["unitprice"]) ? 0 : Number(saleIndex["unitprice"]) //unit price..including vatZ
          var itmtotakeprice= (itmtotake) * itmtotakeuprice

          if(  saleIndex && saleIndex['phone'] == reqData['phone'] ){ //is order requesting from client itself(compare registered phone with incoming phone)
          
              //---------------------
            if(nul.includes(saleIndex["confirmID"]) && saleIndex["orderID"] ){ //is the request confirmations or request_for_confirmation (if so only send the confirm_ID)
              reqData["clients"][ins]["confirmID"] = '123'//await smsCode()            
              //console.log(saleIndex,'buyer One is requesting')
            }else { //if not.. compute all the saling staffs
            
              if(saleIndex["locked"] == 'No' && saleIndex["orderID"]) //or is coming for buying New
              {
                //itmtotake = nul.includes(saleIndex["quantity"]) ? 0 : parseFloat(saleIndex["quantity"])
                //var _val = totalOnstore-itmtotake//totalTaken
                if (itmtotake > totalOnstore ) {                  
                  itmtotake=  totalOnstore
                }


                //---
                if (saleIndex["paymentMethod"] === "onDelivery") {
                  reqData["tQCtonD"] = parseFloat((reqData["tQCtonD"] +itmtotakeprice).toFixed(2))
                } else {  reqData["tQCttech"] = parseFloat((reqData["tQCttech"] + itmtotakeprice).toFixed(2)); }
                
                //---------------- item to take...  
                 reqData["clients"][ins]["quantity"] = parseFloat((itmtotake).toFixed(2));
                 reqData["clients"][ins]["price"] = parseFloat((itmtotakeprice).toFixed(2))

                //---------------
                totalTaken = totalTaken + itmtotake;
                totalTakenPrice = totalTakenPrice + itmtotakeprice;
                //--
                sold=true        
                //if(itmtotake){  _stage_ = Math.max(Number(_stage_),2) }   //item 
                reqData["clients"][ins]["locked"] ='Yes'
                reqData["clients"][ins]["description"] = 'Delivery time @sunday PM'
                //console.log(saleIndex,'buyer One is confirming')
              } else{ //coming for editing....

                if(saleIndex["locked"] == 'Yes' && saleIndex["orderID"]){
                  totalTaken = totalTaken + itmtotake
                  totalTakenPrice = totalTakenPrice + ((itmtakenprice))
                  //--
                  if (saleIndex["paymentMethod"] === "onDelivery") {
                    reqData["tQCtonD"] = parseFloat((Number(reqData["tQCtonD"]) + itmtakenprice).toFixed(2))
                  } else {  reqData["tQCttech"] = parseFloat((Number(reqData["tQCttech"]) + itmtakenprice).toFixed(2)); }
                  
                }
      
              }
              }
          }else{ //counting all confirmed buys

            if(saleIndex["locked"] == 'Yes' && saleIndex["orderID"]){
              totalTaken = totalTaken + itmtotake
              totalTakenPrice = totalTakenPrice + itmtakenprice
              //--
              if (saleIndex["paymentMethod"] === "onDelivery") {
                reqData["tQCtonD"] = parseFloat((Number(reqData["tQCtonD"]) + itmtakenprice).toFixed(2))
              } else {  reqData["tQCttech"] = parseFloat((Number(reqData["tQCttech"]) + itmtakenprice).toFixed(2)); }
              
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
          if(parseFloat(totalTaken)){ //if quantity has been taken or now being taken (stage It)
          //----------------------Finalizing
          totalOnstore = totalQuantity - totalTaken;

          if(parseFloat(totalOnstore)){
            _stage_ =Math.max(Number(_stage_),2) // if there is no left
          }else{
            if(reqData['completed']){
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
        reqData['tPrice']=parseFloat(reqData['tPrice'])+parseFloat((totalTakenPrice).toFixed(2));// + (itmtotakeprice + Number(itmtotakeprice * 0.15)).toFixed(2)
        reqData['tQCt']=parseFloat(reqData['tQCt'])+parseFloat((totalTakenPrice).toFixed(2));// + (itmtotakeprice + Number(itmtotakeprice * 0.15)).toFixed(2)

        //--------------New Data checking        
        reqData['tQ']=parseFloat((totalTaken+totalOnstore).toFixed(2));// + (itmtotakeprice + Number(itmtotakeprice * 0.15)).toFixed(2)
        //---
        reqData['quantity']= totalOnstore
        //-----
        reqData.tQs = parseFloat((totalOnstore).toFixed(2));
        reqData.tQt = parseFloat((totalTaken).toFixed(2));

        //-----
        reqData.tQ = parseFloat((totalOnstore+totalTaken).toFixed(2))
        reqData.tC = parseFloat((procurmentCost).toFixed(2)); //holding the unitcost or set_of_unitCost
        reqData.tQC = parseFloat(((totalOnstore+totalTaken)*procurmentCost).toFixed(2));
  }

  catch(Error){ return false  }
  //----------
  reqData['_stage_']=_stage_
  //-------------------

  console.log(reqData,parseFloat(totalOnstore),parseFloat(totalTaken),'buyer One final')

  return reqData;
    
  }

  async function smsCode(){

    //send sms to user & return the code
    return 'abcd123'
  }

  export default compute_Saleit