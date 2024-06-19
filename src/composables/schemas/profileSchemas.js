
//import _permission from "src/hooks/_permission";
var ObjectId = ''//Schema.ObjectId;

const _permission ={
  group:{ type: String,  default: "client"},
  profile: {
    group:{
      type: String,
       default: "client",
       role:{'xrole':[],'clients':['likes','comment'],'upgraded':['clients','likes','comment'],'creatorrw':2001,'creator':2001,'admin':2001},
       enum: ["upgraded","client","creator","admin","xrole"],
     },
     role:[{
      type: String,
      default: "",
      enum: ["likes","comments",'clients',"*","***",""],
    }], 
    capability: {
      type: String,
       default: '1010',
     },
     accstage: {
      type: Array,
       default:[],
     }
   },

   profileMeta: {
    type: String,
     default: "client",
     role:{'client':['clients','likes','comments']},
     enum: ["upgraded", "client","creator","admin"], 
   },
   saleit: {
    group:{
      type: String,
       default: "client",
       role:{'xrole':[],'client':['likes','comments','clients'],'upgraded':['clients','likes','comments'],'creatorrw':2001,'creator':2001,'admin':2001},
       enum: ["upgraded","client","creator","admin","xrole"],
     },
     role:[{
      type: String,
      default: "",
      enum: ["likes","comments",'clients',"*","***",""],
    }],
    capability: {
      type: String,
       default: '1010',
     },
     accstage: {
      type: Array,
       default:[],
     }
   },
   saleclient: {
    group:{
      type: String,
       default: "client",
       role:{'xrole':[],'client':['likes','comments','clients'],'upgraded':['clients','likes','comments'],'creatorrw':2001,'creator':2001,'admin':2001},
       enum: ["upgraded","client","creator","admin","xrole"],
     },
     role:[{
      type: String,
      default: "",
      enum: ["likes","comments",'clients',"*","***",""],
    }],
    capability: {
      type: String,
       default: '1010',
     },
     accstage: {
      type: Array,
       default:[],
     }
   }
}

const _userPermissions = {
  //user_id:{ type:ObjectId, ref: "profile" }, //acctype_:{ type:ObjectId, ref: "acctypes" },
  //acctype_id:{ type:ObjectId, ref: "acctypes" },
  acctype_group:{ type:String,default:'clients'},
}
//-------------USER profileSchema_Variables..
const profileSchema = {
  _stage_: {
    type:Number,
    default:1,
    $ifNull: 1,
  },
  profile: {     
    type:Array,
    default:["/saleitgr/saleitpng.png"],
    $ifNull:["/saleitgr/saleitpng.png"],
    vtype:'file'
    },
  cover: {
    type:String,
    default:"/saleitgr/saleitpng.png",
    $ifNull:"/saleitgr/saleitpng.png",
    vtype:'file'
    },

  profileMeta : {
    type:Array,
    default:[  {mimetype:'',encoding:'',originalname:'',destination:'',fieldname:'',filename:'',size:'',path:'',geoLocation:''}  ],
    ifNull:[  {mimetype:'',encoding:'',originalname:'',destination:'',fieldname:'',filename:'',size:'',path:'',geoLocation:''}  ]
  },

  userName: {
    type: String,Vtype:"String",

       default: "",
       $ifNull: "",
       //required: true,
       //index: { unique: true, dropDups: true },
     },
    name: {
      type: String,Vtype:"String",

       default: "",
       $ifNull: "",
       //required: true,
       //index: { unique: true, dropDups: true },
       //---
       validRuleset:"[ val => val && val.length > 0 || 'Please type something']"
     },
     
   lastName: {
    type: String,Vtype:"String",

       default: "",
       $ifNull: "",
       //required: true,
       //index: { unique: true, dropDups: true },
 
     },
 
     phone: {
      type: Number,vtype:"Number",
       default: 0,
       $ifNull: 0,
       required:true,
       index: { unique: true, dropDups: true,length:10 },
     },
   phoneCode: {
        type: Array,vtype:"Array",
        default: ['',''],
        $ifNull: ['',''],
        required:true,
      },

location: {
  country: {
    type: String,
      default: "",
      $ifNull: "",
    },
    provinance: {
    type: String,
      default: "",
      $ifNull: "",
    },
    city: {
    type: String,
      default: "",
      $ifNull: "",
    },
    street: {
      type: String,
        default: "",
        $ifNull: "",
      },
  },
  geolocation: {
    lat: {
      type: Number,vtype:"Number",
        default:0,
        $ifNull: 0,
      },
      long: {
        type: Number,vtype:"Number",
         default: 0,
         $ifNull: 0,
       },
     },
  verified: {
      type: String,Vtype:"String",
       default: "0",
       $ifNull: "",
       enum:['0','1']
     },
     cart: {
      type: Array,Vtype:"Array",
       default: [],
       $ifNull: [],
     },
     queryWeight: {
      '1':{ type: Array,Vtype:"Array", ///userProfile for saleit_contents
            default: [1,50,50,50],
            $ifNull: [1,50,50,50],},
      '2':{ type: String,Vtype:"String",  ///userProfile for rentit_contents
            default: "1.1.1.1",
            $ifNull: "1.1.1.1",},
      '3':{ type: String,Vtype:"String",  ///userProfile for ..._contents
            default: "1.1.1.1",
            $ifNull: "1.1.1.1",}
     },
    //--------------------------------
      acckey:{ type:ObjectId, ref: "acctypes" }, //"acctype"/"_id": ObjectId("62d01d17cdd1b7c8a5f945b9")
    //---------------------------------
  }
const profileMetaSchema = {
    userID: {
      type: String,
      default: "",
      //ref:"profileSchema"
    },  
    location: {
     type: String,
      default: "",
    },
    activities: {
      name: {
       type: String,
        default: "",
      },
      amount: {
       type: Number,vtype:"Number",
        default: 0,
      },
    },
    interests: {
     type: String,
      default: "",
    },
    //---------------------------------s
  }

export { profileSchema,profileMetaSchema,_permission,_userPermissions}



