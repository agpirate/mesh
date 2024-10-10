import { mongoose } from "mongoose";
//var Schema = mongoose.Schema,
var ObjectId = mongoose.Types.ObjectId;

let _queryKeys = ["catagoryScore", "usageScore"];
let _primaryKeys = ["id", "Id", "ID"];
let _foreignKeys = ["saleitID", "userID"]; //for
let _numerical = ["phone"]; //Casting to NumberValues
var _blackArray = [
  "geoSearch",
  "queryOperator",
  "returnWat",
  "limits",
  "skips",
  "sortBy",
  "upload",
  "timestamp",
  "latest",
  "lat",
  "long",
  "paginationID",
];
//--------------
/*
mongodb ObjectID //reference or id(primary keys) doesn't require
objectId casting... only asssing 24character length(sting) it would handle it self..

but when searching item by referencekey or primary key.. casting objectId would must.
&& nulling item record require using searchParams of {'updatedAt':null}

*/
let _queryDesign = true;

export async function _getdeleteParams(reqParams = {}) {
  //------No Parameters

  if (!reqParams) {
    return [false, false, false, false, false];
  }
  //---------Intialize the Queries,limits,returnin values..
  var queryParam = {}; //searcher parameters
  let returnWat = []; //filtering parameters
  let limits = reqParams["limits"] ?? 0; //limitter parameters
  let skips = reqParams["skips"] ?? 0; //limitter parameters
  let sortBy = reqParams["sortBy"] ?? { createdAt: -1 }; //limitter parameters
  //------------Filter NonSearching(Queries) Purposed Params...()
  console.log("\n Incoming Query \n", reqParams);
  // try {
  //   for (let paramName of Object.keys(reqParams)) {
  //     if (_blackArray.includes(paramName)) {
  //     } else {
  //       let _pvalue = reqParams[paramName];
  //       queryParam[paramName] = isNaN(Number(_pvalue))
  //         ? _pvalue
  //         : Number(_pvalue);
  //     }
  //   }
  // } catch {}
  //-------------------
  let findBy = Object.keys(reqParams).length
    ? await _queryBuilder(reqParams)
    : [{}];
  //------------------
  // console.log('log_analysis ===>',findBy,queryParam)
  return [findBy, returnWat, limits, sortBy, skips];
}

const userWeightDegree = 3;
async function _queryBuilder(params = {}) {
  //JSON.parse(params);
  let searchQueries = []; //Initialize the Query Object
  console.log("\n Incoming Cleared Query \n", params);
  // if (params && queryNames.length) {
  //does Paramer Existed as Object(K:V)
  //--------------
  let geoSearch = params["geoSearch"] ?? "off";
  let searchType = (params["queryOperator"] ?? "-or").split("-");
  for (let paramKey in params) {
    //Iterate Over The Parameters Object(K:V)
    //----Get and Serialize the Parameter Value
    let keySerialize = paramKey; //Reassign query Namings
    //----------
    var paramValue = params[paramKey] ?? "";
    if (_blackArray.includes(paramKey)) {
      continue;
    }
    try {
      paramValue = isNaN(Number(paramValue)) ? paramValue : Number(paramValue);
    } catch {}
    //--------------

    let query = {};
    //--------
    if (keySerialize == "qweight") {
      //queryWeight Based Parameter Treated Differentlly

      //let parsedValue=paramValue.split('-')
      let cataVal = parseInt(paramValue[1]);
      let usageVal = parseInt(paramValue[2]);
      console.log("\n ", searchType[0]);
      if (searchType[0] == "productSpecific") {
        searchQueries = [
          { catagoryScore: cataVal == 0 ? { $gte: 0 } : cataVal }, //ranging and exact searching
          { usageScore: usageVal == 0 ? { $gte: 0 } : usageVal },
        ];

        // $options: "i",
      } else {
        if (searchType[0] == "userSpecific") {
          //show userSpecific(history weight(profileContents))...&& show up/down values of given depth
          searchQueries = [
            {
              catagoryScore: {
                $gte: cataVal - cataVal / userWeightDegree,
                $lte: cataVal + cataVal / userWeightDegree,
              },
            },
            {
              usageScore: {
                $gte: usageVal - usageVal / userWeightDegree,
                $lte: usageVal + usageVal / userWeightDegree,
              },
            },
          ]; //,{Qwt:{$lt:1000000}}];
        } else {
          if (paramValue.length == 5) {
            //show searched(catagories content fromm othen than buttons)
            searchQueries = [
              { catagoryScore: { $gte: 0 } },
              { usageScore: { $gte: 0 } },
            ];
            searchQueries.push({ trendScore: { $lte: 10000 } });
          } else {
          }
        } //showing userWeight(ranged)
      }
      //searchQueries.push({'trendScore':{$lt:10000}})s   params["lat"]
      //---------if Searching Content Existed ( ADD Automatic)
      break;
    } else {
      if (_primaryKeys.includes(paramKey)) {
        //break;
        try {
          query["_id"] = new ObjectId(paramValue);
        } catch {}
      } else {
        //----if Query Involves drived(ObjectID)..Referencekey base...ReArrange the ObjectID Naming
        if (_foreignKeys.includes(paramKey)) {
          try {
            query[paramKey] = new ObjectId(params[paramKey] ?? "");
          } catch {}
        } else {
          ///---if Query is Normal Columns Value....for String_base search && Object(obj.key..) or Number_base sarch use Below Techni..
          query[paramKey] =
            typeof paramValue == "string"
              ? { $regex: paramValue, $options: "i" }
              : paramValue;
        }
      }
    }
    //-------Append Constructed Queries into Query_Object
    searchQueries.push(query);
  }
  //---------if Searching Content Existed ( ADD Automatic)
  // if(params.filterContent ?? false){
  //   searchQueries.push({'content':params.filterContent})
  // }
  //-------pagination required with paginationID && greater
  if (params["paginationID"] ?? false) {
    try {
      searchQueries.push({
        _id: { $gt: new ObjectId(params["paginationID"]) },
      });
    } catch {
      console.log("\n Error Formating Pagination ID ...");
    }
  }
  if (geoSearch != "off") {
    let geoDictionary = { nearMe: 7, myCity: 5, myCountry: 0, off: 0 };
    let geoDegree = geoDictionary[geoSearch];
    searchQueries.push({
      $expr: {
        $regexMatch: {
          input: { $toString: "$geolocation.long" },
          regex: "^" + String(params["long"]).slice(0, geoDegree),
        },
      },
    });
    searchQueries.push({
      $expr: {
        $regexMatch: {
          input: { $toString: "$geolocation.lat" },
          regex: "^" + String(params["lat"]).slice(0, geoDegree),
        },
      },
    });
  }
  //------Recheck Queries Object(for null or error) && Filter Query Objects
  if (searchQueries.length) {
    searchQueries = searchQueries.filter(
      (querycheck) => Object.keys(querycheck).length
    );
  } else {
    searchQueries = [{}];
  }
  // }
  console.log("\nYield Query \n", searchQueries);
  return searchQueries;
}
