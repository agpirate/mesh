import { mongoose } from "mongoose";
import { saleitDBs } from "../dbConns";
import { saleitSchema } from "../schemas/saleitSchema";
import { saleitMetaSchema } from "../schemas/saleitSchema";
//import { accComputing } from "../../services/accessComputing"
// initialize the connections on boots...
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

mongoose.set("strictQuery", true);

//-------
var todday = () => new Date().toLocaleString();
const _dateConv = 1000 * 60 * 60 * 24

function _eldate(startDate) {
  var elapsedTime = new Date() - new Date(startDate)
  // Calculate days and hours from milliseconds
  var days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
  var hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  var minutes = Math.floor(elapsedTime / (1000 * 60));
    hours %= 24;
    minutes %= 60;

  return { days: days, hours: hours,minutes:minutes};
}

//------------------------------empy Schema

let _saleit = new Schema(
  saleitSchema,
  { timestamps: todday }
);
_saleit.method("toJSON",  function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;

  //object.updatedAt= object.updatedAt
  object.fupdatedAt= _eldate(object.updatedAt)
  //---------------
  return object;
});

//------------------------------Attendance Schema
let _saleitMeta = new Schema(
  saleitMetaSchema,
  { timestamps: todday }
);
_saleitMeta.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;

  object.updatedAt=object.updatedAt.toLocaleDateString()
  object.date=object.date.toLocaleDateString()

  return object;
});

//------------------------------comment Schema

//----------------------modeling Schemass  // it would check if model/Document exists or create new Docs.
var saleitModel;
//console.log('is empyModel Exist',Object.keys(procDBs.model.empy))
if (saleitDBs.model.saleitModel) {
  console.log("sale it Collections already existed on saleit content");
} else {
  saleitModel = saleitDBs.model("saleit _Content", _saleit);
}
//-----
var saleitMetaModel;
//console.log('is empyModel Exist',Object.keys(procDBs.model.empy))
if (saleitDBs.model.reportModel) {
  console.log("sale it Collections already existed on saleit content");
} else {
  reportModel = saleitDBs.model("saleit _Meta", _saleitMeta);
}

//-------------------- exporting schemas

export {
  saleitModel,
  saleitMetaModel,
}; //,rawModel,supplierModel };
