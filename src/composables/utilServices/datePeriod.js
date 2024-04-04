

// One day Time in ms (milliseconds)
let one_day = 1000 * 60 * 60 * 24;

// To set present_dates to two variables
let present_date = new Date();

async function _dateBetweenDates(_thisDate,_thatDate){
    if(!_thisDate){
        _thisDate=present_date
    }
    if(!_thatDate){
        _thatDate = new Date(present_date.setDate(present_date.getDate() + 0));
    }

    let Difference_In_Time = _thisDate.getTime() - _thatDate.getTime(); //in terms of milliseconds

    let Difference_In_Days =  Math.round(Difference_In_Time / one_day); //in terms of days

    return [Difference_In_Time,Difference_In_Days]

}

async function _dateBetweenDateDay(_thisDate,_thatDateDays){

    if(!_thisDate){
        _thisDate=present_date
    }
    if(!_thatDateDays){
        _thatDateDays = new Date(present_date.setDate(present_date.getDate() + 0));
    }else{
        _thatDateDays = new Date(present_date.setDate(present_date.getDate() + _thatDateDays));
    }

    let Difference_In_Time = _thisDate.getTime() - _thatDate.getTime(); //in terms of milliseconds
    let Difference_In_Days =  Math.round(Difference_In_Time / one_day); //in terms of days

    return [Difference_In_Time,Difference_In_Days]
}


async function _wiseDating(_theDate){

    if(!_theDate){
        _theDate=present_date
    }

    //--------------------String Formated date
    _theDate=String(_theDate).split('T')
    //---------


    return _theDate
}


export { _wiseDating}