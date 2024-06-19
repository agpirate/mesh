
//import user3A from "src/hooks/user3A";
//var new Date() = () => Math.floor(Date.now() / 1000);
var todday = () => new Date().toLocaleString()//.split("T")[0];
// initialize the connections on boots...
// import { mongoose } from "mongoose";
// var Schema = mongoose.Schema
var ObjectId = ''//Schema.ObjectId;

//-------------USER PROFILE_Variables..sss
const saleitSchema = {
  //-------------item_staus(stage)
  _stage_: {
    type:Number,vtype:"Number",
    default:1,
  },
  userID: { type:ObjectId, ref: "profiles" },
  userName: { // will hold User_ID/phone as ref_value
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },  
  //------- 
  phone: { // will hold User_ID/phone as ref_value
    type: Number,vtype:"Number",
    default: "",
    $ifNull: "",
  },
  phoneCode: {
    type: Array,vtype:"Array",
    default: ['',''],
    $ifNull: ['',''],
    required:true,
  },

  //---------//----  jack
  catagory: {
    type: String,vtype:"String",
    default: "Households",
    $ifNull: "Households",
    enum: ["Electronics","Vehicles", "Households","Land/House","Clothing","Food","Others"],
  },
  queryWeight: { //saleit(year)-00(catagoryindex)-00(subCat_)-0(trend)-......
    type: String,vtype:"String",
    default: "1.1.1.1",
    $ifNull: "1.1.1.1",
  },
  catagoryScore: { //saleit(year)-00(catagoryindex)-00(subCat_)-0(trend)-......
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  usageScore: { //saleit(year)-00(catagoryindex)-00(subCat_)-0(trend)-......
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },  
  trendScore: { //saleit(year)-00(catagoryindex)-00(subCat_)-0(trend)-......
    type: Number,vtype:"Number",
    default: 0,
    $ifNull: 0,
  },
  //---------
  usage: { //
      type: String,vtype:"String",
      default: "Used",
      $ifNull: "Used",
      enum: ["New", "Used",'Others'],
    },
  //---------
  saleitgr:{
    type:Array,
    default:["/saleitgr/saleitpng.png"],
    vtype:'file'
    },
  header: {
      type: String,vtype:"String",
      default: "....",
      $ifNull: "....",
      validRuleset:"[ val => val && val.length > 0 || 'Please type something']"
    },
  content: {
     type: String,vtype:"String",
      textarea:true,
      default: "....", 
      $ifNull: "....",
      //---
    },
  quantity: {
      type: Number,vtype:'Number',
       default: 0,
       $ifNull: 0,
     },
  price: {
     type: Number,vtype:'Number',
      default: 0,
      $ifNull: 0,
    },
  discount: {
      type: Number,vtype:'Number',
       default: 0,
       $ifNull: 0,
     },
  tPrice: {
      type: Number,vtype:'Number',
       default: 0,
       $ifNull: 0,
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
    //---------put timer for action 
    timer:{
        action:{
          type:String,vtype:"String",
          enum:['delete','expired','sold',''],
          default:'',
          $ifNull:''
        },
        hours:{
          type:Number,
          vtype:'Number',
          default:-1,
          $ifNull:-1
        },
        days:{
          type:Number,
          vtype:'Number',
          default:-1,
          $ifNull:-1
        }
    },
    //String
    //---------
    status: {
      type: String,vtype:"String",
       default: "posted",
       $ifNull: "posted",
       enum: ["posted", "sold","Paused","discarded"],
     },
     likes: {
      like: {
        type: Number,vtype:"Number",
        default: 0,
        $ifNull: 0,
      },
      dislike: {
        type: Number,vtype:"Number",
        default: 0,
        $ifNull: 0,
      }
      },
      completed: {
        type: String,vtype:'String', //it hold winner_client id of registered clients
        default: 'no',
        $ifNull: "no",
      },
      _itServiceRating: {
        type: Number,vtype:'Number', //it hold winner_client id of registered clients
        default: 0,
        $ifNull: 0,
      },
       //---------------------------------
    //saleitcompute,
    //---------on store items
    tClient:{
      type: Number,vtype:'Number',
       default: 0,
       $ifNull: 0,
     },
    tQs: {
      type: Number,vtype:'Number',
       default: 0,
       $ifNull: 0,
     },
     //-----------total activities
     tQ: {
      type: Number,vtype:'Number',
       default: 0,
       $ifNull: 0,
     },
     tC: {
      type: Number,vtype:'Number',
       default: 0,
       $ifNull: 0,
     },
     tQC: {
      type: Number,vtype:'Number',
       default: 0,
       $ifNull: 0,
     },
     //------------bought items
     tQt: {
      type: Number,vtype:'Number',
       default: 0,
       $ifNull: 0,
     },
     tCt: {
      type: Number,vtype:'Number',
       default: 0,
       $ifNull: 0,
     },
     tQCt: {
      type: Number,vtype:'Number',
       default: 0,
       $ifNull: 0,
     },
     //---
     tQCtonD: {
      type: Number,vtype:'Number',
       default: 0,
       $ifNull: 0,
     },

     tQCttech: {
      type: Number,vtype:'Number',
       default: 0,
       $ifNull: 0,
     },
    //---------------------------------
  };
  
const saleitClientSchema ={
  geolocation: { //content GPS locations
    lat: {
      type: String,vtype:"String",
      default: "000000",
      $ifNull: "000000",
    },
    long: {
      type:String,vtype:"String",
      default: "000001",
      $ifNull: "000001",
    }
  },
  phone: { // will hold User_ID/phone as ref_value
    type: Number,vtype:"Number",
    default: "",
    $ifNull: "",
  },
  phoneCode: {
    type: Array,vtype:"Array",
    default: ['',''],
    $ifNull: ['',''],
    required:true,
  },
  saleitID:{ type:ObjectId, ref: "saleits" },
  userID: { type:ObjectId, ref: "profiles" },
  orderID: { //---
    type: String,vtype:"String",
    default: "xyxy",
    $ifNull: "+xyxy",
  },
  confirmID: {
    type: String,vtype:"String",
    default: "xyxy",
    $ifNull: "+xyxy",
  },
  quantity: {
    type: Number,vtype:'Number',
    default: 0,
    $ifNull: 0,
  },
  price: {
    type: Number,vtype:'Number',
    default: 0,
    $ifNull: 0,
  },
  paymentMethod: {
    type: String,vtype:"String",
    default: "onDelivery",
    $ifNull: "onDelivery",
    enum: ["onDelivery","TELBirr","EBCBirr","others"],
  },
  served: {
    type: String,vtype:"String",
    default: "Requested",
    $ifNull: "Requested",
    enum: ["Served","Queed", "Requested","Requesting"],
  },
  store: {
    type: String,vtype:"String",
    default: "cart",
    $ifNull: "cart",
    enum: ["cart","buy",'bought'],
  },
  description: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  time: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  action: {
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
}


export { saleitSchema,saleitClientSchema}