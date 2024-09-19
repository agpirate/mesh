


// Creating role and permissions tables
// and let user assign permissions sets by ID

/*  
Permissions Rule;- like ubunut/linux file permissions schecma

                group: name (user type)
                capability: has 4 permissions status indicators ; 0-0-0-0
                        Value Rules ; ==> 0 = no any(block any) , 1=yes this(role listed columns) , 2=yes any(all column_of document)
                            Create : the first index of ; creating new item ; 
                            Read(R): the second Index of capability digits ; read permissions : 0 = yes , 1=no
                            Write (W) : the thrid index of capabilit digitst : write/modifie permi ; 0 = yes , 1=no
                            Excute (x) : the thrid index of capability digit : execute/ run it or delete ; 0 = yes , 1=no
                            Group  : the fifth index of capability digit : group of applications ; 0 = self-group(his Own) , 1= root-group , ... other groups
                accstage : at what stage of the content is the capability, could work (be functional)
                            [1,2,3,4,5,6]
                role : to what part of the contents is the capability specified ( to all the documents or by column specified)
                            ['','columnNames']
*/
import {documentCupdate,documentCupdateList} from "../services/dBServices/documentCupdate"
import { threeaModel,profileModel } from "../backendCore/models/profileModels"
let letRolePermissions =[
  {
    group: "client",
    saleit: {
      group: "upgraded",
      role: ["likes", "comments", "clients"],
      capability: "22220",
      accstage: [1, 3, 4, 5],
    },
    profile: {
      group: "client",
      role: [""],
      capability: "22220",
      accstage: [1, 3, 4, 5],
    },
    profileMeta: "client",
    saleitClient: {
      group: "client",
      role: [""],
      capability: "22220",
      accstage: [1, 3, 4, 5],
    },
    saleitChat: {
      group: "client",
      role: [""],
      capability: "22220",
      accstage: [1, 3,8],
    },
    publicChat: {
      group: "client",
      role: [""],
      capability: "22220",
      accstage: [1, 3,8],
    },
  },
  {
    group: "upgraded",
    profile: {
      group: "upgraded",
      role: [""],
      capability: "22220",
      accstage: [1, 3, 4, 5],
    },
    profileMeta: "upgraded",
    saleitClient: {
      group: "upgraded",
      role: [""],
      capability: "22220",
      accstage: [1, 3, 4, 5],
    },
    saleitChat: {
      group: "upgraded",
      role: [""],
      capability: "22220",
      accstage: [1, 3,8],
    },
    publicChat: {
      group: "upgraded",
      role: [""],
      capability: "22220",
      accstage: [1, 3,8],
    },
  },
  {
    group: "creator",
    saleit: {
      group: "creator",
      role: [""],
      capability: "22220",
      accstage: [1, 2, 3, 4, 5],
    }, //can do all @HisContent
    profile: {
      group: "creator",
      role: [""],
      capability: "22220",
      accstage: [1, 3, 4, 5],
    }, //can do all @HisContent
    profileMeta: "creator",
    saleitClient: {
      group: "creator",
      role: [""],
      capability: "22220",
      accstage: [1,2,3,4,5],
    },
    saleitChat: {
      group: "creator",
      role: [""],
      capability: "22220",
      accstage: [1, 3,8],
    },
    publicChat: {
      group: "creator",
      role: [""],
      capability: "22220",
      accstage: [1, 3,8],
    },
  },
  {
    group: "admin",
    saleit: {
      group: "admin",
      role: [""],
      capability: "22220",
      accstage: [1, 2, 3, 4, 5],
    },
    profile: {
      group: "admin",
      role: [""],
      capability: "22220",
      accstage: [1, 3, 4, 5],
    },
    profileMeta: "admin",

    saleitClient: {
      group: "admin",
      role: [""],
      capability: "22220",
      accstage: [1, 3,8],
    },
    saleitChat: {
      group: "admin",
      role: [""],
      capability: "22220",
      accstage: [1, 3,8],
    },
    publicChat: {
      group: "admin",
      role: [""],
      capability: "22220",
      accstage: [1, 3,2,3],
    },
  },
    ]
let createUpdateKey = 'group'
let userSampleRole ='creator'
let createUpdatePKey = 'phone'
async function createRolePermissions(){
  // let letRolePermissions =reqData.roles
  console.log('\n\n-==--------------------------------Role & Permissions Managment---------------START')

  return await documentCupdate(threeaModel,letRolePermissions,createUpdateKey).then(async (modelData)=>{
    console.log('\n'+Object.keys(modelData.data),' = Sum of Role and Permissions <=>\n')
    for(let i in modelData.data){console.log(`\n Role Name = ${i} && acckey = ${modelData.data[i]._id}\n`)}
    //---and Create sample users
    let _sampleRole =null
    if(modelData.status == 200){
       _sampleRole= modelData.data[userSampleRole] ?? false
    }else{return true}
    console.log(`\n Creating Sample User = ${userSampleRole} && with accKey ${_sampleRole._id ?? null}`)
    const letProfiles = [
      {name:'root',lastName:'root',phone:'123456787','acckey':_sampleRole ? new ObjectId(_sampleRole._id) : null},
      // {name:'admin3',lastName:'12345',phone:'12345899',companyID:'00029','acckey':_sampleRole ? new ObjectId(_sampleRole._id) : null},
    ]
    let modelData2 = await documentCupdate(profileModel,letProfiles,createUpdatePKey)
    console.log(`User Creating  ====>> ${modelData2.status ==200 ? 'success' : 'Error'}`)
    // console.log(modelData2.data['123456787'])
    //-----   
    console.log('---------------------------------Role & Permissions Managment---------------END\n\n')
    return true                 
  })   
}
   export {createRolePermissions}