import { profileModel } from "app/src-ssr/backendCore/models/profileModels";
import { saleitClientModel } from "app/src-ssr/backendCore/models/saleitModels";
import { saleChatModel } from "../../backendCore/models/chatModels.js";
import { model, mongoose } from "mongoose";
import { response } from "express";
//var Schema = mongoose.Schema,
ObjectId = mongoose.Types.ObjectId;

const saleCatagory = {
  Households: 5,
  Clothing: 20,
  Food: 35,
  Electronics: 50,
  Vehicles: 65,
  "Land/House": 80,
  Others: 100,
};
const saleUsage = { New: 100, Used: 75, All: 1 };

let _foreignKeys = ["saleitID", "userID"]; //for

let nullKey = { updatedAt: null };

//--------- After Main_model (saleit) get's update it's modelData
//-----Operate on Secondery model (Users,buyerInformations...)
class _user_Und_foreign_Operations {
  constructor(currentModel, reqData) {
    console.log(
      "\n_user_Und_foreign_Operations Init \n With User++currentModel =",
      currentModel,
      " & Data of UserID= \n",
      reqData.userID ?? false
    );
    this.reqData = reqData;
    this.model = currentModel || "";
    this.userID = null;
    this.modalId = null;
    this.createNew = true;
  }
  //----------Operations over the User Profile who interacting

  async addFollowing() {
    //------get the user_ID and Formating It
    this.userID = this.reqData["userID"]
      ? { _id: new ObjectId(this.reqData["userID"]) }
      : nullKey;
    try {
      //-------- Check if UserExisted
      const modelQA = await profileModel.findOne(this.userID, {});
      if (!modelQA) {
        return { status: 501, foreignData: "User doesn't exist" };
      }
      //--------------------------- Update the Values Required
      const _usertoFollow = this.reqData["followingPhone"] || "";
      if (!(modelQA.contacts ?? false)) {
        modelQA.contacts = [];
      }
      //---Update the contacts column && save
      if (!modelQA.contacts.includes(_usertoFollow)) {
        modelQA.contacts.push(_usertoFollow);
      }

      //SAve the User with Newlly Updated Data
      const modelData = await modelQA.save();
      return modelData && Object.keys(modelData).length
        ? { status: 200, foreignData: modelData }
        : { status: 400, foreignData: modelData };
    } catch (e) {
      return { status: 505, foreignData: e };
    }
  }

  async computeUser() {
    //------get the user_ID and Formating It
    this.userID = this.reqData["userID"]
      ? { _id: new ObjectId(this.reqData["userID"]) }
      : nullKey;
    try {
      const modelQA = await profileModel.findOne(this.userID, {});
      if (!modelQA) {
        return { status: 501, foreignData: "User doesn't exist" };
      }
      //--------------------------- Update the Values Required (queryWeight)

      //----------------update user's "queryweight" after user_get interacted.
      const thisWeight = this.reqData["weight"] || false;
      if (!thisWeight) {
        return { status: 400, foreignData: "No Weights to be updated." };
      }

      let userAllKg = modelQA["queryWeight"] || false;

      if (userAllKg && userAllKg["1"]) {
        //if query weight existed for saleit_service(index_1)
        let userSaleitKg = userAllKg["1"];
        userSaleitKg = userSaleitKg.map((str, idx) =>
          Math.ceil((str + thisWeight[idx]) / 2 - 1)
        );
        userSaleitKg[3] = Math.ceil(userSaleitKg[3] + 1);
        modelQA["queryWeight"]["1"] = [
          1,
          userSaleitKg[1],
          userSaleitKg[2],
          userSaleitKg[3],
        ];
      } else {
        //if not set to default
        modelQA["queryWeight"]["1"] = [1, 1, 1, 1];
      }

      //SAve the User with Newlly Updated Data
      const modelData = await modelQA.save();
      return modelData && Object.keys(modelData).length
        ? { status: 200, foreignData: modelData }
        : { status: 400, foreignData: modelData };
    } catch (e) {
      return { status: 505, foreignData: e };
    }
  }

  //-------------&& Operations over the Secondary Model
  async saveItem(saveNew = true) {
    this.createNew = saveNew;
    if (this.reqData["id"] == null) {
      this.modalId = nullKey;
    } else {
      this.modalId = { _id: new ObjectId(this.reqData["id"]) };
    }
    return await this.save();
  }

  async deleteItem() {
    if (this.reqData["id"] == null) {
      return { status: 401, foreignData: "" };
    }
    this.modalId = { _id: new ObjectId(this.reqData["id"]) };
    return await this.delete();
  }

  //--------------------------- sub Operations
  async save() {
    try {
      let modelQA = await this.model.findOne(this.modalId, {});
      if (modelQA) {
        Object.assign(modelQA, this.reqData);
      } else {
        if (this.createNew) {
          modelQA = new this.model(this.reqData);
        } else {
          return { status: 501, foreignData: "Client Doesn't exist" };
        }
      }
      const modelData = await modelQA.save();
      return modelData && Object.keys(modelData).length
        ? { status: 200, foreignData: modelData }
        : { status: 400, foreignData: modelData };
    } catch (e) {
      return { status: 505, foreignData: e };
    }
  }

  async delete() {
    try {
      return await this.model
        .findByIdAndDelete(this.modalId)
        .then((modelData) => {
          if (modelData && Object.keys(modelData).length) {
            return { status: 200, foreignData: modelData }; //returns null or object_
          } else {
            return { status: 400, foreignData: modelData }; //not found Error
          }
        })
        .catch((e) => {
          return { status: 400, foreignData: e }; //DBs_Schema or Rules_validations Error
        });
    } catch (e) {
      return { status: 505, foreignData: e };
    }
  }
}

async function _primaryOperations(
  modelQA,
  reqData,
  operation,
  _foreignOperation
) {
  // reqData['weight']=await _saleitWeight()
  //  console.log('\nSaleit Primary_Operations Init...\n MainOperation =',operation,' ForeignOperation = ',_foreignOperation,'\n')

  if (operation == "likes") {
    //------
    reqData["weight"] = await _saleitWeight();

    let _cactivities = new _user_Und_foreign_Operations(null, reqData);
    let cactivitiesResp = null;
    try {
      cactivitiesResp = await _cactivities.computeUser();
    } catch (e) {}
    console.log(
      operation,
      "\n  Sale UserData Status Result \n",
      cactivitiesResp.status
    );
    if (cactivitiesResp.status != 200) {
      return cactivitiesResp;
    }

    modelQA = Object.assign(modelQA, reqData);
    modelQA["likes"]["like"]++;
    cactivitiesResp["data"] = modelQA;
    return cactivitiesResp;
  } else if (operation == "following") {
    reqData["followingPhone"] = modelQA.phoneCode[1] + " " + modelQA.phone;
    reqData["weight"] = await _saleitWeight();
    //------
    let _cactivities = new _user_Und_foreign_Operations(null, reqData);
    let cactivitiesResp = null;
    try {
      cactivitiesResp = await _cactivities.addFollowing();
    } catch (e) {}
    console.log(
      operation,
      "\n Sale UserData Status Result  \n",
      cactivitiesResp.status
    );
    if (cactivitiesResp.status != 200) {
      return cactivitiesResp;
    }

    // modelQA=Object.assign(modelQA, cactivitiesResp.status == 200 ? cactivitiesResp.status : reqData)
    modelQA = Object.assign(modelQA, reqData);
    cactivitiesResp["data"] = modelQA;
    return cactivitiesResp;
  } else if (operation == "_itServiceRating") {
    //------
    reqData["weight"] = await _saleitWeight();
    let _cactivities = new _user_Und_foreign_Operations(null, reqData);
    let cactivitiesResp = null;
    try {
      cactivitiesResp = await _cactivities.computeUser();
    } catch (e) {}
    console.log(
      operation,
      "\n Sale UserData Status Result  \n",
      cactivitiesResp.status
    );
    if (cactivitiesResp.status != 200) {
      return cactivitiesResp;
    }

    modelQA = Object.assign(modelQA, reqData);
    // Calculate new average incrementally
    modelQA["_itServiceRating"] =
      modelQA["_itServiceRating"] +
      (reqData["_itServiceRating"] - modelQA["_itServiceRating"]) / 2;

    // Ensure the score does not exceed 5
    modelQA["_itServiceRating"] = Math.min(modelQA["_itServiceRating"], 5);
    cactivitiesResp["data"] = modelQA;
    return cactivitiesResp;
  } else if (operation == "CreateRowItem") {
    reqData["weight"] = await _saleitWeight(true);
    //------validating UseInput
    let _quantity = parseFloat(reqData["quantity"] ?? 0); //casting Values
    let _price = parseFloat(reqData["price"] ?? 0);
    let _discount = parseFloat(reqData["discount"] ?? 0);

    reqData["quantity"] = _quantity > 0 ? _quantity : 1; //Assigning Values
    reqData["price"] = _price > 0 ? _price : 0;
    reqData["discount"] = _discount > 0 ? _discount : 0;

    //------------s
    modelQA = Object.assign(modelQA, reqData);
    modelQA["tQs"] = reqData["quantity"];
    modelQA["tQ"] = reqData["quantity"];

    return { status: 200, data: modelQA };
  } else if (operation == "UpdateRowItem") {
    reqData["weight"] = await _saleitWeight(true);
    //------validating UseInput
    let _quantity = parseFloat(reqData["quantity"] ?? 0); //casting Values
    let _price = parseFloat(reqData["price"] ?? 0);
    let _discount = parseFloat(reqData["discount"] ?? 0);

    reqData["quantity"] = _quantity > 0 ? _quantity : 1; //Assigning Values
    reqData["price"] = _price > 0 ? _price : 0;
    reqData["discount"] = _discount > 0 ? _discount : 0;

    //------------
    modelQA = Object.assign(modelQA, reqData);
    modelQA["tQs"] = reqData["quantity"];
    modelQA["tQ"] = modelQA["tQt"] + reqData["quantity"];

    return { status: 200, data: modelQA };
  } else if (operation == "comments") {
    //------------Computed Data ?
    let _computedData = Object.assign({}, reqData["comments"]);
    //------
    _computedData["saleitID"] = new ObjectId(reqData["id"] ?? "");
    _computedData["weight"] = reqData["weight"] ?? "";
    _computedData["userID"] = reqData["userID"] ?? "";
    // let _foreignOperation = (reqData["thisSubOps"] ?? false)
    //------
    _computedData["weight"] = await _saleitWeight();
    let _cactivities = new _user_Und_foreign_Operations(
      saleChatModel,
      _computedData
    );
    let cactivitiesResp = null;
    try {
      cactivitiesResp = await _cactivities.computeUser();
    } catch (e) {}
    console.log(
      operation,
      "\n Sale UserData Status Result  \n",
      cactivitiesResp.status
    );
    if (cactivitiesResp.status != 200) {
      return cactivitiesResp;
    }

    if (_foreignOperation == "delete") {
      return await _cactivities
        .deleteItem() // _saveChat(_clientDatas['id'] ?? false,_thisSubOps =='delete' ? null : _clientDatas)
        .then((res) => {
          console.log(
            _foreignOperation,
            "\n  Sale  Status Result \n",
            res.status
          );
          if (res.status == 200) res["data"] = modelQA;
          return res;
        })
        .catch((e) => {
          console.log(e);
          return { status: 401, data: e, foreignData: e };
        });
    } else {
      return await _cactivities
        .saveItem(true) // _saveChat(_clientDatas['id'] ?? false,_thisSubOps =='delete' ? null : _clientDatas)
        .then((res) => {
          console.log(
            _foreignOperation,
            "\n  Sale  Status Result \n",
            res.status
          );
          if (res.status == 200) res["data"] = modelQA;
          return res;
        })
        .catch((e) => {
          console.log(e);
          return { status: 401, data: e, foreignData: e };
        });
    }
  } else if (operation == "clients") {
    //------------Computed Data 1
    let _computedData = Object.assign({}, reqData["clients"]);

    // _computedData['operation'] =reqData['thisSubOps']//weight

    //------------------- OnStore Quantity Argument
    var totalOnstore = parseFloat(modelQA["quantity"] ?? 1); // (modelQA["quantity"] == 0) ? reqData["quantity"] : modelQA["quantity"];//?? 0; //unit price give as number or set_of_object like below
    var totalTaken = parseFloat(modelQA["tQt"] ?? 0); // (modelQA["quantity"] == 0) ? reqData["quantity"] : modelQA["quantity"];//?? 0; //unit price give as number or set_of_object like below
    var totalClient = parseFloat(modelQA["tClient"] ?? 0); // (modelQA["quantity"] == 0) ? reqData["quantity"] : modelQA["quantity"];//?? 0; //unit price give as number or set_of_object like below
    var _stage_ = parseFloat(modelQA["_stage_"] ?? 1); //  ?? 0 );
    //--------------------Total Quantity Argument

    // let _foreignOperation = (reqData["thisSubOps"] ?? false)
    // var _tocart = _clientDatas["store"] ?? false //if to cart don' computer value just save_topocket
    if (_foreignOperation == "delete") {
      //deleting Client ..

      //--------------Computing ClientData...2?
      //----------------
      // reqData['weight']=await _saleitWeight()
      let _cactivities = new _user_Und_foreign_Operations(
        saleitClientModel,
        _computedData
      );
      // let cactivitiesResp=null
      // try{ cactivitiesResp = await _cactivities.computeUser()}catch(e){ }
      // if(cactivitiesResp.status != 200){return  cactivitiesResp }

      return await _cactivities
        .deleteItem()
        .then(async (res) => {
          console.log(
            _foreignOperation,
            "\n  Sale  Status Result \n",
            res.status
          );
          res["data"] = null;
          if (res.status == 200) {
            totalOnstore = totalOnstore + parseFloat(_computedData["quantity"]);
            totalTaken =
              totalTaken > 0
                ? totalTaken - parseFloat(_computedData["quantity"])
                : 0;
            if (_computedData.store == "buy") {
              totalClient = totalClient > 0 ? totalClient - 1 : 0;
            }

            let _modalData = await _secondaryOperations(
              modelQA,
              totalOnstore,
              totalTaken,
              totalClient,
              _stage_
            );
            console.log(
              "\n SecondaryOperation Sale  Status Result \n",
              _modalData ? true : false
            );
            res["data"] = _modalData;
            if (!_modalData) {
              res["status"] = 401;
            }
          }
          return res;
        })
        .catch((e) => {
          console.log(e);
          return { status: 401, data: e, foreignData: e };
        });
    } else if (["create", "update"].includes(_foreignOperation)) {
      //--------Pricing Argument
      var salePrice =
        modelQA["discount"] > 0 ? modelQA["discount"] : modelQA["price"]; //unit price give as number or set_of_object like below
      //--------------Computing ClientData...2

      let computedClient = { status: 501, data: "Computing Client Error" };
      _computedData.totalOnstore = totalOnstore ?? 0;
      _computedData.totalTaken = totalTaken ?? 0;
      _computedData.salePrice = salePrice ?? 0;
      try {
        computedClient = await _computeClient(
          _computedData,
          modelQA["currency"] ?? ""
        );
      } catch {}
      if (computedClient.status != 200) {
        return computedClient;
      }
      _computedData = computedClient.data;

      _computedData["contentId"] = reqData["id"]; //weight
      _computedData["weight"] = reqData["weight"]; //weight
      _computedData["userID"] = reqData["userID"]; //weight
      _computedData["saleitID"] = modelQA["id"]; //weight
      //------
      _computedData["weight"] = await _saleitWeight();
      let _cactivities = new _user_Und_foreign_Operations(
        saleitClientModel,
        _computedData
      ); //Update User Weights && save the ClientData
      let cactivitiesResp = null;
      try {
        cactivitiesResp = await _cactivities.computeUser();
      } catch (e) {}
      console.log(
        operation,
        "\n Sale UserData Status Result  \n",
        cactivitiesResp.status
      );
      if (cactivitiesResp.status != 200) {
        return cactivitiesResp;
      }

      return await _cactivities
        .saveItem(true)
        .then(async (res) => {
          res["data"] = null;
          console.log(
            _foreignOperation,
            "\n  Sale  Status Result \n",
            res.status
          );
          if (res.status == 200) {
            totalOnstore = parseFloat(_computedData["totalOnstore"] ?? 0);
            totalTaken = parseFloat(_computedData["totalTaken"] ?? 0);
            totalClient = totalClient + (_computedData["newClient"] ?? 0);

            //  _stage_=_computedData['_stage_'] ?? _stage_
            let _modalData = await _secondaryOperations(
              modelQA,
              totalOnstore,
              totalTaken,
              totalClient,
              _stage_
            ); //Apply Client Data into Content Effect
            console.log(
              "\n SecondaryOperation Sale  Status Result \n",
              _modalData ? true : false
            );
            res["data"] = _modalData;
            if (!_modalData) {
              res["status"] = 401;
            }
          }
          return res;
        })
        .catch((e) => {
          console.log(e);
          return { status: 401, data: e, foreignData: e };
        });
    } else {
      return {
        status: 401,
        data: "no Sub Operation for  :- " + operation,
        foreignData: "no Sub Operations",
      };
    }
  } else {
    return { status: 401, data: "no Operation", foreignData: "no Operations" };
  }

  async function _saleitWeight(_isNewweight = false) {
    //------Holding exist product scores or have it default as 1
    let catagoryScore = parseInt(modelQA["catagoryScore"] ?? 1);
    let usageScore = parseInt(modelQA["usageScore"] ?? 1);
    let trendScore = parseInt(modelQA["trendScore"] ?? 1);

    if (_isNewweight) {
      //if it's new acquire new score by catagory and usage value or use default above score
      try {
        usageScore =
          reqData["usage"] ?? false
            ? parseInt(saleUsage[reqData["usage"]])
            : usageScore;
        catagoryScore =
          reqData["catagory"] ?? false
            ? parseInt(saleCatagory[reqData["catagory"]])
            : catagoryScore;

        reqData["catagoryScore"] = isNaN(catagoryScore) ? 10 : catagoryScore; //take it to assign to modelqa
        reqData["usageScore"] = isNaN(usageScore) ? 10 : usageScore;
        reqData["trendScore"] = isNaN(trendScore) ? 10 : trendScore + 1;
      } catch {}
    } else {
      modelQA["trendScore"] = trendScore + 1;
    }
    return [1, catagoryScore, usageScore, trendScore]; //return it to use on user scoring system
  }
}

async function _computeClient(_clientDatas, currency) {
  var _isserved = _clientDatas["served"] ?? false;
  var _tocart = _clientDatas["store"] ?? false; //if to cart don' computer value just save_topocket
  let _response = null;
  try {
    if (_tocart == "cart" || !_isserved) {
      //saving as cart
      _clientDatas["store"] = "cart";
      _clientDatas["quantity"] = _clientDatas.quantity ?? 0;
      _clientDatas["price"] =
        (_clientDatas.quantity ?? 0) * _clientDatas.salePrice;
      _clientDatas["served"] = "Requesting";
      _clientDatas["currency"] = currency;
      // _clientDatas["saleitID"] = modelQA['id'];
      _clientDatas["_stage_"] = 0;
      _response = { status: 200, data: _clientDatas };
      return _response;
    } else {
      //saving as bought

      if (_clientDatas.salePrice) {
        ///Cost Fixed ?    or Saveit

        let itmtotake = parseFloat(_clientDatas["quantity"] ?? 1); // && totalOnstore//? parseFloat(_clientDatas["quantity"]) : 0 // nul.includes(_clientDatas["quantity"]) ? 0 : parseFloat(_clientDatas["quantity"])
        itmtotake = itmtotake ? itmtotake : 1;

        if (_isserved == "Requesting" || !_clientDatas["price"]) {
          //New Buyer ?  or Modified it.

          if (_clientDatas.totalOnstore) {
            //Quantity Existed ? or Saveit

            if (itmtotake > _clientDatas.totalOnstore) {
              itmtotake = _clientDatas.totalOnstore;
            }
            _clientDatas.totalOnstore = _clientDatas.totalOnstore - itmtotake;
            _clientDatas.totalTaken = _clientDatas.totalTaken + itmtotake;

            var itmtotakeprice = parseFloat(itmtotake * _clientDatas.salePrice);

            //---------------- item to take...
            // _clientDatas["saleitID"] = modelQA['id'];
            _clientDatas["quantity"] = itmtotake;
            // totalClient++
            _clientDatas["price"] = itmtotakeprice;
            _clientDatas["served"] = "Requested";
            _clientDatas["currency"] = currency;
            _clientDatas["store"] = "buy";
            _clientDatas["newClient"] = 1;
            _clientDatas["description"] = "waiting for Delivery Infos";

            _clientDatas["_stage_"] = 1;

            //------Binding New Data
            _response = { status: 200, data: _clientDatas };
          } else {
            _clientDatas["store"] = "cart";
            _clientDatas["currency"] = currency;
            _clientDatas["quantity"] = _clientDatas["quantity"] ?? 0;
            _clientDatas["served"] = "Requesting";
            // _clientDatas["saleitID"] = modelQA['id'];
            _clientDatas["_stage_"] = 0;
            _response = { status: 200, data: _clientDatas };
          }
        } else {
          //existing buyer (Update buy options)

          if (_clientDatas["served"] == "Queed") {
            _clientDatas["_stage_"] = 3;
          }
          if (_clientDatas["served"] == "Served") {
            _clientDatas["_stage_"] = 4;
          }

          _response = { status: 200, data: _clientDatas };
        }
      } else {
        _clientDatas["store"] = "cart";
        _clientDatas["quantity"] = _clientDatas["quantity"] ?? 0;
        _clientDatas["served"] = "Requesting";
        // _clientDatas["saleitID"] = modelQA['id'];
        _clientDatas["_stage_"] = 0;
        _response = { status: 200, data: _clientDatas };
      }
      return _response;
    }
    //------Binding New Data
    // _response ={status:501,data:_clientDatas}
  } catch (error) {
    return { status: 501, data: error };
  }
}

async function _secondaryOperations(
  _modalData,
  totalOnstore,
  totalTaken,
  totalClient,
  _stage_
) {
  //----------------------------Final Datas
  if (totalOnstore ?? false) {
    ///if there is leftOver
    _stage_ = Math.max(Number(_stage_), 2); // if there is no left
    _modalData["completed"] = "no";
  } else {
    _modalData["completed"] = "yes";
    _stage_ = Math.max(Number(_stage_), 4);
  }

  //--------Save Final
  // _modalData['tPrice']=parseFloat(_modalData['tPrice']+ itmtotakePrice);// + (itmtotakeprice + Number(itmtotakeprice * 0.15))
  // _modalData['tQCt']=parseFloat(_modalData['tQCt']+ itmtotakePrice);// + (itmtotakeprice + Number(itmtotakeprice * 0.15))
  // //--------------New Data checking
  _modalData["quantity"] = totalOnstore;
  _modalData["tQs"] = totalOnstore;
  _modalData["tQt"] = totalTaken;
  _modalData["tClient"] = totalClient;
  //-----
  _modalData["tQ"] = totalTaken + totalOnstore; // + (itmtotakeprice + Number(itmtotakeprice * 0.15))
  //_modalData.tC = salePrice; //holding the unitcost or set_of_unitCost
  //--------------
  //_modalData.tQC = (_modalData.tQC ?? 0) + ((itmtotake)*salePrice);
  //----------
  _modalData["_stage_"] = _stage_;

  return _modalData;
}

export default _primaryOperations;
