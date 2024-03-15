import { mongoose } from "mongoose";

import { mongodAPI_URL } from "../config";

const saleitMongodApi = mongodAPI_URL + "/saleit";
const profileMongodApi = mongodAPI_URL + "/profile";
const MONGO_adminURI = mongodAPI_URL + "/admin";

//-------------
const supportedMimes = {
  "text/csv": "csv",
};

const uploadsFolder = "uploads";
// defing the database instance as variable mean as this js_module is imported the get excuted..

try {
  // create mongoose instance of named profileDBs with DB_name of finance
  var profileDBs = mongoose.createConnection(profileMongodApi, {});
  console.log("Connecting to Finance DataBases....");
} catch (err) {
  console.log("Error Connecting to Finance DB_"+err);
  process.exit(1);
}
const profileConnection = profileDBs.connection; // check if the Mongood Server has Already created_DBS and return connection status
profileDBs.once("open", (_) => {
  console.log(`Finance Database connected: ${profileMongodApi}`);
});

profileDBs.on("error", (err) => {
  console.error(`Finance DB connection error: ${err}`);
});


try {
  // create mongoose instance of named saleitDBs with DB_name of humanResource
  var saleitDBs = mongoose.createConnection(saleitMongodApi, {});
  console.log("Connecting to saleit DataBases....");
} catch (err) {
  console.log("Error Connecting to Finance DB_"+err);
  process.exit(1);
}
const saleitConnection = saleitDBs.connection; // check if the Mongood Server has Already created_DBS and return connection status
saleitDBs.once("open", (_) => {
  console.log(`saleit Database connected: ${saleitMongodApi}`);
});

saleitDBs.on("error", (err) => {
  console.error(`Procurment DB connection error: ${err}`);
});



var adminDBs = async () => {
  try {
    // create mongoose instance of named adminDBS in here the admin_DBs is holding the original mongoose_instance
    // mongodb connection string
    var adminDBs = mongoose.createConnection(MONGO_adminURI, {});

    const adminConnection = saleDBs.connection;
    adminDBs.once("open", (_) => {
      console.log(`Admin Database connected: ${MONGO_adminURI}`);
      console.log(`MongoDB connected at: ${adminDBs.host}:${adminDBs.port}`);
    });

    adminDBs.on("error", (err) => {
      console.log("Error Connecting to Finance DB_"+err);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

//}
export { profileDBs, saleitDBs, adminDBs };

//proc()
//module.exports = {   proc2,proc,mongoose }
// var conn = require(../dconns);
// conn.proc.model(); // for proc access..
// mongoose.model(); ///for admin acess
