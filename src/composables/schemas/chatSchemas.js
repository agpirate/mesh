
//import _permission from "src/hooks/_permission";
var ObjectId = ''//Schema.ObjectId;

const publicChatSchema = {
    userID: { type:ObjectId, ref: "profiles" },
    content: { type:String,default:''},
    phone: { type:String,default:0},
    }

const saleChatSchema = {
      comment: {
        type: String,vtype:"String",
        default: "",
        $ifNull: "",
      },
      saleitID: { type:ObjectId, ref: "saleits" },
      userID: { type:ObjectId, ref: "profiles" },
      userName: {
        type: String,vtype:"String",
        default: "",
        $ifNull: "",
      },
      phone: {
        type: Number,vtype:"Number",
        default: "",
        $ifNull: "",
      },
    }

  export { saleChatSchema,publicChatSchema}



