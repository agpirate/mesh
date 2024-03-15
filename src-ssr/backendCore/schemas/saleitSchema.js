
//import user3A from "src/hooks/user3A";
//var todday = () => Math.floor(Date.now() / 1000);
var todday = () => new Date().toLocaleDateString();//.split("T")[0];
var ObjectID =""
//-------------USER PROFILE_Variables..

const saleitcompute ={
  _rank:{
    type: String,
    default: "others",
  },
}
const saleitSchema = {
  //-------------item_staus(stage)
  _stage_: {
    type:Number,vtype:"Number",
    default:1,
  },
  //-------
  userID: { // will hold User_ID/phone as ref_value
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  phone: { // will hold User_ID/phone as ref_value
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },
  userName: { // will hold User_ID/phone as ref_value
    type: String,vtype:"String",
    default: "",
    $ifNull: "",
  },  
  //---------//----  jack
  catagory: {
    type: String,vtype:"String",
    default: "Vehicles",
    $ifNull: "",
    enum: ["Vehicles", "Households","Phones","Displays","?",""],
  },
  usage: { //
      type: String,vtype:"String",
      default: "Used",
      $ifNull: "Used",
      enum: ["New", "Used","?",""],
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
       default: 1,
       $ifNull: 1,
     },
  price: {
     type: Number,vtype:'Number',
      default: 0,
      $ifNull: 0,
    },
  tPrice: {
      type: Number,vtype:'Number',
       default: 0,
       $ifNull: 0,
     },
  location: { //content physical location
    city: {
      type: String,vtype:"String",
      default: "Mekelle - Tigrai",
      $ifNull: "Mekelle - Tigrai",
    },
    street: {
      type: String,vtype:"String",
      default: "Hawelti",
      $ifNull: "Hawelti",
    },
    },
  coordinate: { //content GPS locations
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
     clients:{
      type:Array,
      default:[{ phone:"",userID:'',userName:'',orderID:'',confirmID:'', quantity:0,price:0,paymentMethod:'onDelivery',locked:"No",time:new Date() } ],
      vdata: {
        phone: {
          type: String,vtype:"String",
          default: "+251-",
          $ifNull: "+251-",
        },
        userName: {
          type: String,vtype:"String",
          default: "",
          $ifNull: "",
        },
        userID: {
          type: String,vtype:"String",
          default: "",
          $ifNull: "",
        },
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
          enum: ["onDelivery","Tele_Birr","EBC_Birr","others"],
        },
        time: {
          type: Date,vtype:'Date',
          default:new Date(),
          $ifNull:new Date(),
        },
        locked: {
          type: String,vtype:"String",
          default: "No",
          $ifNull: "No",
          enum: ["Yes", "No"],
        },
        description: {
          type: String,vtype:"String",
          default: "",
          $ifNull: "",
        },
      }
    },
     comments:{
      type:Array,
      default:[ { comment:"", UserID:"",time:new Date() } ],
      vdata: {
        comment: {
          type: String,vtype:"String",
          default: "",
          $ifNull: "",
        },
        userID: {
          type: String,vtype:"String",
          default: "",
          $ifNull: "",
        },
        time:{
          type:Date,
          vtype:'Date',
          default:new Date(),
          $ifNull:new Date(),
        } 
      }
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
        type: Boolean,vtype:'Boolean', //it hold winner_client id of registered clients
        default: false,
        $ifNull: false,
      },
      _itServiceRating: {
        type: Number,vtype:'Number', //it hold winner_client id of registered clients
        default: 0,
        $ifNull: 0,
      },
       //---------------------------------
    //saleitcompute,
    //---------on store items
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
  }

const saleitMetacompute ={
    _rank:{
      type: String,
      default: "others",
    },
  }
const saleitMetaSchema ={
  _stage_: {
    type:Number,
    default:1,
  },
  }


export { saleitSchema,saleitMetaSchema}