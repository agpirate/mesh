import { saleitDBs } from "../dbConns";
import { saleitSchema } from "../schemas/saleitSchemas";
import { saleitClientSchema } from "../schemas/saleitSchemas";
import { _dateformating } from "../../services/modalServices/dateServices.js";

//import { accComputing } from "../../services/accessComputing"
// initialize the connections on boots...
import { mongoose } from "mongoose";
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;

mongoose.set("strictQuery", true);
//------------------------------empy Schema
let _saleit = new Schema(
  saleitSchema,
  { timestamps:  new Date() }
);
_saleit.method("toJSON",  function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.fupdatedAt= _dateformating(object.updatedAt)
  let _strPhone=String(object.phone)
  object.fphone= _strPhone.slice(0,3)+'****'+_strPhone[7]+_strPhone[8]
  //---------------
  return object;
});

//------------------------------Attendance Schema
let _saleitClient = new Schema(
  saleitClientSchema,
  { timestamps: new Date() }
);
_saleitClient.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.fupdatedAt= _dateformating(object.updatedAt)
  let _strPhone=String(object.phone)
  object.fphone= _strPhone.slice(0,3)+'****'+_strPhone[7]+_strPhone[8]
  return object;
});


//------------------------------comment Schema

//----------------------modeling Schemass  // it would check if model/Document exists or create new Docs.
var saleitModel;
//console.log('is empyModel Exist',Object.keys(procDBs.model.empy))
if (saleitDBs.model.saleitModel) {
  console.log("sale it Collections already existed on saleit content");
} else {
  saleitModel = saleitDBs.model("sales", _saleit);
}
//-----
var saleClientModel;
//console.log('is empyModel Exist',Object.keys(procDBs.model.empy))
if (saleitDBs.model.saleClientModel) {
  console.log("sale it Collections already existed on saleit content");
} else {
  saleClientModel = saleitDBs.model("saleclients", _saleitClient);
}

//-------------------- exporting schemas
export {
  saleitModel,
  saleClientModel,
  
}; //,rawModel,supplierModel };
