
import { ref,reactive,computed,watch,onUnmounted,onMounted } from "vue";
import {schemaSklt} from "src/composables/schemaSklts";
import {useQuasar, useMeta } from "quasar";


const useTableFilter = () =>{

  // console.log('loging search,terms')

    let _enableRowFilter=ref(false)
    //------------Setting up all the search attributes
    let _filteredRow =ref(null)

    //-------------the search Engine..
    function _thisFiltering(rows, terms) {
      if(_enableRowFilter.value && rows.length){
        // return rows
      }// rows contain the entire data
      // _filteredRow.value = null
      // console.log('loging search,terms',terms)
      //============Search Service_ONE(serach Box)
      let lowerSearch = terms.search ? terms.search.toLowerCase() : ""; //holding search bar...value
      //------Serialize search input_Value && iterate each row_against it.
      const filteredRows = rows.filter((row, i) => {
    
          let _group0 = true;
          //let _group2 = false;
    
          //-----------------------Search field specific matching
          if (lowerSearch != "") {
            _group0 = false;
            let s1_values = Object.values(row);//row_all_values
    
            let s1_lower = s1_values.map((x) => {//iterate row_Values &&serialize each
              try {return x.toString().toLowerCase();
                } catch {return " ";  }
            });
    
            for (let val = 0; val < s1_lower.length; val++) { //matching row_values agains serch_term
              if (s1_lower[val].includes(lowerSearch)) {
                _group0 = true;
                break;
              }
            }
          }
          //--------------- filtering tech
          if(_group0){
            // _filteredRow.value ++
            return true
          }
          //--------------------
          return false
      });
    // console.log(_filteredRow.value,'filtttttttttttttttttttttt2222222',filteredRows)
    _filteredRow.value = filteredRows.length ? filteredRows.length : Math.random()
    console.log(_filteredRow.value,'tableMixing Filters',filteredRows)
    return filteredRows;
    }


    return {
        _enableRowFilter,
        //--------------
        _filteredRow,
        //---------
        _thisFiltering,

    }




}


export { useTableFilter }