
//import _acctype from "src/hooks/_acctype";
//var todday = () => Math.floor(Date.now() / 1000);
var todday = () => new Date().toLocaleDateString();//.split("T")[0];

const _acctype ={
  profile: {
    type: String,
     default: "client",
     vmeta:{'creator_rw':[],},
     enum: ["admin","creator_rwx","client"],
   },
   profileMeta: {
    type: String,
     default: "client",
     vmeta:{'creator_rw':[],},
     enum: ["creator_rw", "creator_rwx","upgraded", "client","admin"],
   },

   saleit: {
    type: String,
     default: "client",
     enum: ["creator_rw", "creator_rwx","upgraded", "client","admin"],
   }

}

//-------------USER profileSchema_Variables..
//--profileSchema shema

const profileSchemaCompute = {
  _rank:{
    type: String,
    default: "0",
  },
}

const profileSchema = {

  _stage_: {
    type:Number,
    default:1,
    $ifNull: 1,

  },
  profile: { type: String,vtype:'file',default: "/profile/profilejpeg.jpeg" },

  cover: {
    type:String,
    vtype:'file',
    default:'/cover/itService.jpg',
    contentType: "String",
  },
userName: {
    type: String,
     default: "",
     $ifNull: "",
     //required: true,
     //index: { unique: true, dropDups: true },
   },
    
  userName: {
      type: String,
       default: "",
       $ifNull: "",
       //required: true,
       //index: { unique: true, dropDups: true },
     },

  userID: {
     type: String,
      default: "xyxy",
      $ifNull: "",
      //required: true,
      //index: { unique: true, dropDups: true },
    },

  name: {
     type: String,
      default: "",
      $ifNull: "",
      //required: true,
      //index: { unique: true, dropDups: true },
      //---
      validRuleset:"[ val => val && val.length > 0 || 'Please type something']"
    },
    
  lastName: {
     type: String,
      default: "",
      $ifNull: "",
      //required: true,
      //index: { unique: true, dropDups: true },
    },

    phone: {
      type: String,
       default: "+251 0000000000",
       $ifNull: "",
       required:true,
       index: { unique: true, dropDups: true,length:10 },
     },
   phoneCode: {
       type: String,
        default: "+251",
        $ifNull: "",
        required:true,
      },

address: {
  Country: {
    type: String,
      default: "Ethi",
      $ifNull: "",
    },
    Provinance: {
    type: String,
      default: "Tigrai",
      $ifNull: "",
    },
    City: {
    type: String,
      default: "Mekelle",
      $ifNull: "",
    },
  },
  __liveCord: {
    lat: {
      type: String,
        default: "000123",
        $ifNull: "",
      },
      long: {
      type: String,
        default: "000123",
        $ifNull: "",
      },

    },

//img: {
//  type: String,
//},

//--------------------------------
acctype: _acctype,
//---------------------------------
//profileCompute,
  
  }

const profileMetaCompute = {
    _rank:{
      type: String,
      default: "0",
    },
  }
  
const profileMetaSchema = {
    userID: {
      type: String,
      default: "",
      ref:"profileSchema"
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


  export { profileSchema,profileMetaSchema}



