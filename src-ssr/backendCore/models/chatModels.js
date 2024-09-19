//import { mongoose } from "mongoose";
import { chatDBs } from "../dbConns";
import { publicChatSchema, saleChatSchema } from "../schemas/chatSchemas.js";
import { _dateformating } from "../../services/modalServices/dateServices.js";
//import { saleitSchema } from "../schemas/saleitSchema";
import { mongoose } from "mongoose";
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//-------new Date().toLocaleString()
var todday = (sampledate = null) => new Date(sampledate).toLocaleString();
//------------------------------------------------------------------

//-----------
let _publicChatSchema = new Schema(publicChatSchema, {
  timestamps: todday,
});
_publicChatSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.fupdatedAt = _dateformating(object.updatedAt);
  object.fcreatedAt = _dateformating(object.createdAt);
  return object;
});

let _saleChatSchema = new Schema(saleChatSchema, {
  timestamps: todday,
});
_saleChatSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.fupdatedAt = _dateformating(object.updatedAt);
  object.fcreatedAt = _dateformating(object.createdAt);
  return object;
});

//----------------------modeling Schemass
//----------------------------------------------------------------------acctypeSchema _userPermissions

var publicChatModel;

if (chatDBs.model.publicChatModel) {
  console.log("assets Collections already existed on Procurment");
} else {
  publicChatModel = chatDBs.model("publicChats", _publicChatSchema);
}

var saleChatModel;
//console.log('is empyModel Exist',Object.keys(procDBs.model.empy))
if (chatDBs.model.saleChatModel) {
  console.log("sale it Collections already existed on saleit content");
} else {
  saleChatModel = chatDBs.model("contentChats", _saleChatSchema);
}
//--------------------Initializing Databasess (and Create permissions)
//-------------------- exporting schemas
export { saleChatModel, publicChatModel }; //,rawmatterialModel,supplierModel };
