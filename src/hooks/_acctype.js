
//------- userProfile or Data Representative(Schema) defined column_wise 3A


    const _acctype =
      {
        profile: {
          type: String,
           default: "client",
           vmeta:{creator_rw:[],},
           enum: ["admin","creator_rwx"],
         },
         profileMeta: {
          type: String,
           default: "client",
           vmeta:{creator_rw:[],},
           enum: ["creator_rw", "creator_rwx","client_upg", "client","admin"],
         },
    
         saleit: {
          type: String,
           default: "client",
           vmeta:{creator_rw:[],},
           enum: ["creator_rw", "creator_rwx","client_upg", "client","admin"],
         }
    }

export default _acctype