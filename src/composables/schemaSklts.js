async function schemaSklt(schemaData) {
  console.log('schemaSklt Called')

  //onplayRowItemm Scheleton of Data...Imaging acording the authorized_columns schema
  let onplayRowItemm = {};

  let topcolumnName; //require with qtable_schema..

  let columns = schemaData; //iterating with values...at first & require temptopcolumnName
  for (let column of columns) {  //Iterating Over List of Columns Details_Object

      //Check if Naming_ Existing (MUST)..ifNot..
    if (typeof column.name === "string") {//rechecking...if it has proper name
      topcolumnName = column["name"];
    } 
    else {
      return null;
    } 

    //--------------------------------------NB:- We are using the Q-table column Format
    let tempCols = column["schema"]; //columns[topcolumnName]
    //-----
    //Check if Type is Existing ..[String,Number,file...]
    if ("type" in tempCols) {
      onplayRowItemm[topcolumnName] = ""; //Registering column_name      { the Name  }
      onplayRowItemm[topcolumnName] = tempCols.default ?? '';
    } 
   //----is Object(dictionary)
    else {
      //----------- Column is Object ( multiValued...).....
      onplayRowItemm[topcolumnName] = {}; //Registering the Object_name
      let columnsG = tempCols;
      for (let topcolumnNameG in columnsG) {
        tempCols = columnsG[topcolumnNameG];

        if ("type" in tempCols) {
          //----is String L2
          onplayRowItemm[topcolumnName][topcolumnNameG] = "";
 
          onplayRowItemm[topcolumnName][topcolumnNameG] = tempCols.default ?? '';
          ////console.log(column.name)

        } else {
          //-----------is Object (Layer_3)
          onplayRowItemm[topcolumnName][topcolumnNameG] = {};

          let columnsGG = tempCols;
          for (let topcolumnNameGG in columnsGG) {
            //--------is String L3

            tempCols = columnsGG[topcolumnNameGG];
            if ("type" in tempCols) {
              onplayRowItemm[topcolumnName][topcolumnNameG][topcolumnNameGG] =
                "";
            
              onplayRowItemm[topcolumnName][topcolumnNameG][topcolumnNameGG] =
                tempCols.default ?? '';
            } else {
              //-----------is Object (Layer_3)
              onplayRowItemm[topcolumnName][topcolumnNameG][topcolumnNameGG] =
                "";

              let columnsGGG = tempCols;
              for (let topcolumnNameGGG in columnsGGG) {
                //--------is String L3

                let tempCols = columnsGGG[topcolumnNameGG];
                if ("type" in tempCols) {
                  onplayRowItemm[topcolumnName][topcolumnNameG][topcolumnNameGG][
                    topcolumnNameGGG
                  ] = "";
               
                  onplayRowItemm[topcolumnName][topcolumnNameG][topcolumnNameGG][
                    topcolumnNameGGG
                  ] = tempCols.default ?? '';
                } else {
                  onplayRowItemm[topcolumnName][topcolumnNameG][topcolumnNameGG][
                    topcolumnNameGGG
                  ] = "";

                  let columnsGGGG = tempCols;
                  for (let topcolumnNameGGGG in columnsGGGG) {                //--------is String L3
                    let tempCols = columns[topcolumnNameGGGG];
                    if ("type" in tempCols) {
                      onplayRowItemm[topcolumnName][topcolumnNameG][
                        topcolumnNameGG
                      ][topcolumnNameGGG][topcolumnNameGGGG] = "";
                    
                      onplayRowItemm[topcolumnName][topcolumnNameG][
                        topcolumnNameGG
                      ][topcolumnNameGGG][topcolumnNameGGGG] = tempCols.default ?? '';
                    }
                  } }
              }
            }
          }
        }
      }
    }
  }

  return onplayRowItemm;
}
export { schemaSklt };
