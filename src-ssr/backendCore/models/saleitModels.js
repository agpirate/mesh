import { saleitDBs } from "../dbConns";
import { saleitSchema } from "../schemas/saleitSchemas";
import { saleitClientSchema } from "../schemas/saleitSchemas";
import { _dateformating } from "../../services/modalServices/dateServices.js";

//import { accComputing } from "../../services/accessComputing"
// initialize the connections on boots...
import { mongoose } from "mongoose";
var Schema = mongoose.Schema;
// var ObjectId = mongoose.Types.ObjectId;

mongoose.set("strictQuery", true);
var todday = (sampledate = null) => new Date(sampledate).toLocaleString();
//------------------------------empy Schema
let _saleit = new Schema(saleitSchema, { timestamps: todday });
_saleit.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.fupdatedAt = _dateformating(object.updatedAt);
  object.fcreatedAt = _dateformating(object.createdAt);
  let _strPhone = String(object.phone);
  object.fphone = _strPhone.slice(0, 3) + "****" + _strPhone[7] + _strPhone[8];
  //------Product Item Status Calculating .....
  //-- net price (discount > price)
  object.netPrice = (object.discount ?? 0) || (object.price ?? 0);
  //--- is open (Quantity && Price)
  object.isOpen = (object.netPrice ?? 0) * (object.quantity ?? 0);
  //---------------
  return object;
});

//------------------------------Attendance Schema
let _saleitClient = new Schema(saleitClientSchema, { timestamps: todday });
_saleitClient.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.fupdatedAt = _dateformating(object.updatedAt);
  object.fcreatedAt = _dateformating(object.createdAt);
  let _strPhone = String(object.phone);
  object.fphone = _strPhone.slice(0, 3) + "****" + _strPhone[7] + _strPhone[8];
  return object;
});

//------------------------------comment Schema

//----------------------modeling Schemass  // it would check if model/Document exists or create new Docs.
var saleitModel;
if (saleitDBs.model.saleitModel) {
  console.log("sale it Collections already existed on saleit content");
} else {
  saleitModel = saleitDBs.model("sales", _saleit);
  console.log(saleitModel, "New Created !");
}
//-----
var saleitClientModel;
if (saleitDBs.model.saleitClientModel) {
  console.log("sale it Collections already existed on saleit content");
} else {
  saleitClientModel = saleitDBs.model("saleitClients", _saleitClient);
  console.log(saleitClientModel, "New Created !");
}

//-------------------- exporting schemas
export { saleitModel, saleitClientModel }; //,rawModel,supplierModel };
