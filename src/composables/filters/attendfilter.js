
import { ref } from "vue";

const useAssetFilter = () =>{

    let _enableRowFilter=ref(true)
    //------------Setting up all the search attributes

    //-------------the search Engine..
    function _thisFiltering(rows, terms) {

      if(_enableRowFilter.value || !(terms ?? false)){
        return rows
      }// rows contain the entire data
      //============Search Service_ONE(serach Box)
      //------Serialize search input_Value && iterate each row_against it.
      
      const filteredRows = rows.filter((row, i) => {
    
        let _group00 = true;
        let _group0 = false;
        let _group2 = false;
        let _group3 = false;
  
          //------Filter Scheme -Search Box-----------Search field specific matching
          let lowerSearch = terms.search ? terms.search.toLowerCase() : ""; //holding search bar...value
          if (lowerSearch != "") {
            _group00 = false;
            let s1_values = Object.values(row);//row_all_values
    
            let s1_lower = s1_values.map((x) => {//iterate row_Values &&serialize each
              try {return x.toString().toLowerCase();
                } catch {return " ";  }
            });
    
            for (let val = 0; val < s1_lower.length; val++) { //matching row_values agains serch_term
              if (s1_lower[val].includes(lowerSearch)) {
                _group00 = true;
                break;
              }
            }
          }

        //-----------Filter Schema Gather toggle conditions (Store Status)
        let _cat = row.catagories ?? false
        if(_cat == "Machinery" ){ _group0 = terms.Machines }
        else if(_cat == "Consumable"){ _group0 = terms.Consumable }
        else if(_cat == "Accessory"){ _group0 = terms.Acce }
        else if(_cat == "Tools"){ _group0 = terms.Tools }
        else if(_cat == "Spares"){ _group0 = terms.Spares }
        else if(_cat == "Sanitary"){ _group0 = terms.Sanitary }
        else if(_cat == "RaWMatterial"){ _group0 = terms.Raws }

        //-----------Filter Schema (Stor Status)-----
        let Issued = false;
        let stored = false;
        let taken = false;
        if (row.storeStatus ?? false) {
          Issued = row.storeStatus["status"] ? false: true
          //--------
          stored = !row.storeStatus["Onstore"] && Issued ? false : true;
          taken = row.storeStatus["taken"]  ? true : false
        } //is sold(onStore zero) ? no or yes
    
        _group2 = terms.Issued && Issued ? true : _group2;
        _group2 = terms.Onstore && stored ? true : _group2;
        _group2 = terms.taken && taken ? true : _group2;

        //------Days Filter
        // let _group3 = false;
        let filterDays = terms.filterDays ?? false
        if (row.updatedAt && filterDays) {
          let updatedAt = row.updatedAt.split("/")

          let itemMonth = Number(updatedAt[0])
          let itemDay = Number(updatedAt[1])

          if(itemMonth >= (new Date().getMonth())+1){
          if(itemDay >= (new Date().getDate() - filterDays.max)){
            _group3 =true
            } 
          else  if(filterDays.max == 2 || filterDays.max == 8){
            _group3=true
            }
          }     
        }else{_group3 = true} 
          //--------------- filtering tech
        if(_group00 && _group0 && _group2 && _group3){
            return true
          }
          //--------------------
          return false
      });
    return filteredRows;
    }

    return {
        _enableRowFilter,
        _thisFiltering,
    }




}


export { useAssetFilter }