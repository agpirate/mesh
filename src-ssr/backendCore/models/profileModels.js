//import { mongoose } from "mongoose";
import { profileDBs } from "../dbConns";
import {_userPermissions,
        _permission,profileSchema,
        profileMetaSchema } 
  from "../schemas/profileSchemas";
import { _dateformating } from "../../services/modalServices/dateServices.js";
//import { saleitSchema } from "../schemas/saleitSchema";
import { mongoose } from "mongoose";
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;

//-------new Date().toLocaleString()
var todday = (sampledate=null) => new Date(sampledate).toLocaleString()
//------------------------------------------------------------------
let acctypeSchema = new Schema(
  _permission,
  {
    timestamps: todday,
  }
);
acctypeSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

//-----------
let _profileSchema = new Schema(
  profileSchema,
  {
    timestamps: todday,
  }
);
_profileSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.fupdatedAt=_dateformating(object.updatedAt)
  return object;
});

//-----------
//--------------defining / importing Schemas
let _profileMetaSchema = new Schema(
  profileMetaSchema,
  {
    timestamps: todday,
  }
);
_profileMetaSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.fupdatedAt=_dateformating(object.updatedAt)
  return object;
});


//----------------------modeling Schemass
//----------------------------------------------------------------------acctypeSchema _userPermissions
var acctypeModel;
if (profileDBs.model.acctypeModel) {
  console.log("assets Collections already existed on Procurment");
} else {
  acctypeModel = profileDBs.model("acctypes", acctypeSchema);
}

var profileModel;
if (profileDBs.model.profileModel) {
  console.log("assets Collections already existed on Procurment");
} else {
  profileModel = profileDBs.model("profiles", _profileSchema);
}
/**/
var profileMetaModel;

if (profileDBs.model.profileMetaModel) {
  console.log("assets Collections already existed on Procurment");
} else {
  profileMetaModel = profileDBs.model("profileMetas", _profileMetaSchema);
}

//--------------------Initializing Databasess (and Create permissions)
const _acc = [
  {   group:'client',
     profile:{ group:'client',role:['*'],capability:'1110'},
     profileMeta:'client',
     saleit:{ group:'client',role:["likes","comments"],capability:'1000',accstage:[1,3,4,5]},
     saleitcli:{ group:'client',role:["***"],capability:'1110',accstage:[1,3,4,5]},
  },
  {    group:'upgraded',
    profile:{ group:'upgraded',role:['*'],capability:'1110'},
    profileMeta:'upgraded',
    saleit:{ group:'upgraded',role:["likes","comments",'clients',],capability:'1110',accstage:[1,3,4,5]},
    saleitcli:{ group:'upgraded',role:["***"],capability:'1110',accstage:[1,3,4,5]},
 },
 {   group:'creator',
 profile:{ group:'creator',role:['*'],capability:'1110'},//can do all @HisContent
 profileMeta:'creator',
 saleit:{ group:'creator',role:['*'],capability:'1110',accstage:[1,2,3,4,5]}, //can do all @HisContent
 saleitcli:{ group:'creator',role:["***"],capability:'1110',accstage:[1,3,4,5]},

},
  {   group:'admin',
    profile:{ group:'admin',role:['***'],capability:'1111'},
    profileMeta:'admin',
    saleit:{ group:'admin',role:['***'],capability:'1111',accstage:[1,2,3,4,5]},
    saleitcli:{ group:'admin',role:["***"],capability:'1111',accstage:[1,3,4,5]},

 },
];  
//Once Permission Rules Created ---Cooment both_Below Lines....
//acctypeModel.create(_acc).then((createdProducts) => {console.log('Products created:', createdProducts); })
//  .catch((error) => {console.error('Error creating products:', error); });

//-------------------- exporting schemas
export { acctypeModel,profileModel,profileMetaModel }; //,rawmatterialModel,supplierModel };
