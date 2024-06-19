

import { mongoose } from "mongoose";
//var Schema = mongoose.Schema,
var ObjectId = mongoose.Types.ObjectId;

let _queryKeys = ["catagoryScore", "usageScore"]
let _primaryKeys = ["id", "Id", "ID"]
let _foreignKeys = ["saleitID","userID"] //for
let _numerical=['phone'] //Casting to NumberValues
var _blackArray=['returnWat','limits','upload','timestamp','latest']
//--------------
/*
mongodb ObjectID //reference or id(primary keys) doesn't require 
objectId casting... only asssing 24character length(sting) it would handle it self..

but when searching item by referencekey or primary key.. casting objectId would must.
&& nulling item record require using searchParams of {'updatedAt':null}

*/
let _queryDesign=true

export async function _getdeleteParams(reqParams = {}) {
  //------No Parameters

  if (!reqParams) {return [false,false,false];}
  //---------Intialize the Queries,limits,returnin values..
  var queryParam ={} //searcher parameters
  let returnWat = []; //filtering parameters
  let limits = 100; //limitter parameters
  //------------Filter NonSearching(Queries) Purposed Params...()
  try {
    for (let paramName of Object.keys(reqParams)){
      if(_blackArray.includes(paramName)){          
      }else{
        let _pvalue= reqParams[paramName]          
        queryParam[paramName]=isNaN(Number(_pvalue)) ? 
        _pvalue : Number(_pvalue)
      }
    }
  } catch {}
  //-------------------
  let findBy = Object.keys(queryParam).length  ? await _queryBuilder(queryParam) : [{}];
  //------------------
  // console.log('log_analysis ===>',findBy,queryParam)
  return [findBy, returnWat, limits];
}

async function _queryBuilder(params = {}) { //JSON.parse(params);
  let searchQueries = []; //Initialize the Query Object

  if(params && Object.keys(params).length){ //does Paramer Existed as Object(K:V)
    for (let paramKey in params) { //Iterate Over The Parameters Object(K:V)
      //----Get and Serialize the Parameter Value
      let keySerialize = paramKey; //Reassign query Namings
      //--------------
      var paramValue = params[paramKey] ?? ''
      //--------------
      let query = {};
      if(keySerialize == 'qweight'){ //queryWeight Based Parameter Treated Differentlly
        
            //let parsedValue=paramValue.split('-')
            let cataVal= parseInt(paramValue[1])
            let usageVal= parseInt(paramValue[2])
            let trendeVal= parseInt(paramValue[3]) 
            if(trendeVal == 3){ //show searched(catagories content from butttons)
              searchQueries=[{catagoryScore:cataVal == 1 ? {$gte:cataVal-1} : cataVal }, //ranging and exact searching
                              {usageScore:usageVal == 1 ? {$gte:usageVal-1} : usageVal }];
            }else{
              if(trendeVal == 2){ //show userSpecific(history weight(profileContents))...&& show up/down values of given depth
                searchQueries=[{catagoryScore:{$gte:cataVal-(cataVal/2),$lte:cataVal+(cataVal/2)}},
                  {usageScore:{$gte:usageVal-(usageVal/2),$lte:usageVal+(usageVal/2)}}];//,{Qwt:{$lt:1000000}}];
              }else{
                if(paramValue.length ==5){ //show searched(catagories content fromm othen than buttons)
                searchQueries=[{catagoryScore:{$gte:0}},{usageScore:{$gte:0}}];
                searchQueries.push({'trendScore':{$lte:10000}})
                }else{ }
              } //showing userWeight(ranged)
            }
            //searchQueries.push({'trendScore':{$lt:10000}})s
          break;
      }else{
          if (_primaryKeys.includes(paramKey)) {//break; 
              try{query['_id']=new ObjectId(paramValue)}catch{}                
            }
          else{ //----if Query Involves drived(ObjectID)..Referencekey base...ReArrange the ObjectID Naming
            if (_foreignKeys.includes(paramKey)) {
                  try{query[paramKey]=new ObjectId((params[paramKey] ?? ''))}catch{}  
            }else{ ///---if Query is Normal Columns Value....for String_base search && Object(obj.key..) or Number_base sarch use Below Techni..
                  query[paramKey]=(typeof paramValue) == 'string' ? {$regex :paramValue, "$options": "i" }  : paramValue
            }
          }
        }
      //-------Append Constructed Queries into Query_Object
      searchQueries.push(query);
    }
    //------Recheck Queries Object(for null or error) && Filter Query Objects
    if (searchQueries.length) { 
      searchQueries = searchQueries.filter((querycheck) => (Object.keys(querycheck).length));
    } else {searchQueries = [{}];
    }
  }
  console.log('searching query',searchQueries)
  return searchQueries;
}
