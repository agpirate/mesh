
export function _dateformating(startDate) {
    var elapsedTime = new Date() - new Date(startDate)
    // Calculate days and hours from milliseconds
    var days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    if(days){return new Date(startDate).toLocaleString()}
    //---------------
    var hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    var minutes = Math.floor(elapsedTime / (1000 * 60));
      hours %= 24;
      minutes %= 60;
  
    return { days: days, hours: hours,minutes:minutes};
  }