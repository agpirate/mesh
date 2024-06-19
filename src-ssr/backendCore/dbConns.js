import { mongoose } from "mongoose";

const saleitMongodApi = process.env.API_MNGDB + "/saleit";//mongodb DB_Name could be none plular_Values,but tables....
const profileMongodApi = process.env.API_MNGDB + "/profile";
const chatMongodApi = process.env.API_MNGDB + "/chat";
const MONGO_adminURI = process.env.API_MNGDB + "/admin";

try {
  // create mongoose instance of named profileDBs with DB_name of saleitProfile
  var profileDBs = mongoose.createConnection(profileMongodApi, {});
  console.log("Connecting to saleitProfile DataBases....");
} catch (err) {
  console.log("Error Connecting to saleitProfile DB_"+err);
  process.exit(1);
}
const profileConnection = profileDBs.connection; // check if the Mongood Server has Already created_DBS and return connection status
profileDBs.once("open", (_) => {
  console.log(`saleitProfile Database connected: ${profileMongodApi}`);
});

profileDBs.on("error", (err) => {
  console.error(`saleitProfile DB connection error: ${err}`);
});

try {
  // create mongoose instance of named chatDBs with DB_name of saleitProfile
  var chatDBs = mongoose.createConnection(chatMongodApi, {});
  console.log("Connecting to saleitProfile DataBases....");
} catch (err) {
  console.log("Error Connecting to saleitProfile DB_"+err);
  process.exit(1);
}
const chatConnection = chatDBs.connection; // check if the Mongood Server has Already created_DBS and return connection status
chatDBs.once("open", (_) => {
  console.log(`saleitProfile Database connected: ${chatMongodApi}`);
});

chatDBs.on("error", (err) => {
  console.error(`saleitProfile DB connection error: ${err}`);
});

try {
  // create mongoose instance of named saleitDBs with DB_name of humanResource
  var saleitDBs = mongoose.createConnection(saleitMongodApi, {});
  console.log("Connecting to saleit DataBases....");
} catch (err) {
  console.log("Error Connecting to saleitProfile DB_"+err);
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
      console.log("Error Connecting to saleitProfile DB_"+err);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

//}
export { profileDBs,chatDBs, saleitDBs, adminDBs };

//proc()
//module.exports = {   proc2,proc,mongoose }
// var conn = require(../dconns);
// conn.proc.model(); // for proc access..
// mongoose.model(); ///for admin acess
