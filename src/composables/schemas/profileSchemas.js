
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
  profile: {     
    type:Array,
    default:["/saleitgr/saleitpng.png"],
    $ifNull:["/saleitgr/saleitpng.png"],
    vtype:'file'
    },
  cover: {
    type:Array,
    default:["/saleitgr/saleitpng.png"],
    $ifNull:["/saleitgr/saleitpng.png"],
    vtype:'file'
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
      type: String,Vtype:"String",
      default: "25.25.0.0",
      $ifNull: "25.25.0.0",
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



