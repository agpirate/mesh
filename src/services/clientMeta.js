

var _clientCountry=""
var _clientCountryCode=""
var _clientPhone =""
var _clientGeolocation ={_lat:'',_long:''}


var _Countrycode ={

    "Ethiopia":'+251',
    "Ethiopia1":'+251',
    "Ethiopia2":'+251',
    "Ethiopia3":'+251',
    "Ethiopia4":'+251',
    "Ethiopia5":'+251',
}

//------------------Services (get_user_devicenavigator)
async function _init_(){

    _clientCountry='Ethiopia'
    _clientCountryCode= _Countrycode['Ethiopia']
    //initialize all navigatore (GPS)...

    return true
}
async function _navigatePhone(){

    var _clientPhone="091421"

    return [_clientCountryCode,_clientPhone]
}

async function _navigateGeoloc(){
    
    _clientGeolocation={_lat:'xxxxxxx',_long:'YYYYYYYYYYYY'}

    return _clientGeolocation
}

async function _navigateMeta(){

    var _Phone=_navigatePhone()
    var _nGeo=_navigateGeoloc()

    return [_Phone,_nGeo]
}
_init_() //initialization called on boot

export {_navigateMeta}
//------------------------------------PreDefined Data

