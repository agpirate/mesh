import { ref, reactive } from "vue";

const useRowFilter = () => {
  let totalPrice = ref(0);
  let storeTime = reactive(0);
  let storeItems = ref({ cart: 0, buy: 0 });
  let serveItems = ref({ Requesting: 0, Requested: 0, Queed: 0, Served: 0 });

  let _enableRowFilter = ref(true);
  //------------Setting up all the search attributes
  let _filteredRow = ref(null);

  //-------------the search Engine..
  function _thisFiltering(rows, terms) {
    console.error("Row Filtering...", terms, _enableRowFilter.value);
    if (!_enableRowFilter.value || !(terms ?? false)) {
      return rows;
    } // rows contain the entire data
    //-------intialize Data
    totalPrice.value = 0;
    let totalPrice_ = 0;
    let storeItems_ = { cart: 0, buy: 0 };
    let serveItems_ = { Requesting: 0, Requested: 0, Queed: 0, Served: 0 };
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
        let s1_values = Object.values(row); //row_all_values

        let s1_lower = s1_values.map((x) => {
          //iterate row_Values &&serialize each
          try {
            return x.toString().toLowerCase();
          } catch {
            return " ";
          }
        });

        for (let val = 0; val < s1_lower.length; val++) {
          //matching row_values agains serch_term
          if (s1_lower[val].includes(lowerSearch)) {
            _group00 = true;
            break;
          }
        }
      }

      //-----------Filter Schema Gather toggle conditions (Store Status)
      let _serveStatus = row.served ?? false;
      _group0 = terms[_serveStatus] ?? true;
      //-----------Filter Schema (Stor Status)-----
      let _storeStatus = row.store ?? false;
      _group2 = terms[_storeStatus] ?? true;
      //-----------Filter Schema (Stor Status)-----

      //------Days Filter
      let _dayfilter = false;
      let filterDays = terms.filterDays ?? false;
      if (row.updatedAt && filterDays) {
        let updatedAt = row.updatedAt.split("/");

        let itemMonth = Number(updatedAt[0]);
        let itemDay = Number(updatedAt[1]);

        if (itemMonth >= new Date().getMonth() + 1) {
          if (itemDay >= new Date().getDate() - filterDays.max) {
            _dayfilter = true;
          } else if (filterDays.max == 2 || filterDays.max == 8) {
            _dayfilter = true;
          }
        }
      } else {
        _dayfilter = true;
      }
      //-------------Date filter
      let _datefilter = true;
      let filterDates = terms.recordDate ?? false;

      if (row.createdAt && filterDates) {
        _datefilter =
          new Date(filterDates).toLocaleDateString() ==
          new Date(row.createdAt).toLocaleDateString();
      } else {
      }

      //--------------- filtering tech
      if (_group00 && _group0 && _group2 && _datefilter) {
        storeItems_[row.store]++ ?? false;
        serveItems_[row.served]++ ?? false;
        totalPrice_ = totalPrice_ + parseFloat(row.price ?? 0);
        return true;
      }
      //--------------------
      return false;
    });

    totalPrice.value = totalPrice_;
    storeItems.value = storeItems_;
    serveItems.value = serveItems_;
    //============Search Service_TWO(serach XY)
    _filteredRow.value = filteredRows.length
      ? filteredRows.length
      : Math.random();

    return filteredRows;
  }

  return {
    totalPrice,
    storeItems,
    serveItems,

    _enableRowFilter,
    _filteredRow,
    _thisFiltering,
  };
};

export { useRowFilter };
