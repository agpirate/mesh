import { mongoose } from "mongoose";
import { profileDBs } from "../dbConns";
import { profileSchema } from "../schemas/profileSchemas";
import { profileMetaSchema } from "../schemas/profileSchemas";
//import { saleitSchema } from "../schemas/saleitSchema";
// initialize the connections on boots...
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var todday = () => new Date().toLocaleDateString();//.split("T");
//------------------------------------------------------------------
let _profileSchema = new Schema(
  profileSchema,
  {
    timestamps: todday,
    //{currentTime: () => Math.floor(Date.now() / 1000) }
  }
);

_profileSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.updatedAt=object.updatedAt.toLocaleDateString()
  return object;
});


//--------------defining / importing Schemas
let _profileMetaSchema = new Schema(
  profileMetaSchema,
  {
    timestamps: todday,
    //{currentTime: () => Math.floor(Date.now() / 1000) }
  }
);

_profileMetaSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.updatedAt=object.updatedAt.toLocaleDateString()
  return object;
});


//----------------------modeling Schemass
//----------------------------------------------------------------------
var profileModel;

if (profileDBs.model.profileModel) {
  console.log("assets Collections already existed on Procurment");
} else {
  profileModel = profileDBs.model("profile", _profileSchema);
}
/**/
var profileMetaModel;

if (profileDBs.model.profileMetaModel) {
  console.log("assets Collections already existed on Procurment");
} else {
  profileMetaModel = profileDBs.model("profileMeta", _profileMetaSchema);
}

//-------------------- exporting schemas
export { profileModel,profileMetaModel }; //,rawmatterialModel,supplierModel };
