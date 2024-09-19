import { ref } from "vue"

////////////////////////
export const months = Array.from({ length: 12 }, (e, i) => {
    return new Date(null, i, null).toLocaleDateString("en", {
      month: "short",
    }); //short || long
  });
  
  const _thisDate = new Date();
  ///------screen observer
  const _thisYear = _thisDate.getFullYear(); //current_year_number
  export var _startofthisYear = new Date(_thisYear, 0, 1); //01,01 (Year(startMonth=01(_in_js:0),startDate=01(_in_js:1)))
  export var _endofthisYear = new Date(_thisYear, 11, 31); //12,31 (Year(endMonth=12(_in_js:11),endDate=31(_in_js:31)))
  
  var _previouseYear = _thisYear - 1; //previouse_yearnumber
  
  const _thisMonth = _thisDate.getMonth(); //current_month_number
  export const _startofthisMonth = new Date(_thisYear, _thisMonth, 1);
  export const _endofthisMonth = new Date(_thisYear, _thisMonth + 1, 0);