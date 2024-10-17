
let isEmpty = ["null", "undefined", "", null, undefined,false];
var _localStorage = {

  _get: (_key = null, ifNotnewValue = null) => {
    try {
      const data = localStorage.getItem(_key);
      if (isEmpty.includes(data) && ifNotnewValue) {
        localStorage.setItem(_key, ifNotnewValue); //JSON.parse(data)
        return ifNotnewValue;
      } else {return data;}
    }
    catch {return false;}
  },
  _set: (_key = null, _item = null) => {
    return _item ? localStorage.setItem(_key,_item) : false;
  },
  _getsession: (_item = null) => {
    return _item ? sessionStorage.getItem(_item) : false;
  },
  _setsession: (_key = null, _item = null) => {
    return _item ? sessionStorage.set(_key, _item) : false;
  },
  _clear: (_key = null, _item = null) => {
    if(_key){
      localStorage.removeItem(_key)
    }else{
      sessionStorage.clear();
      localStorage.clear();
    }
    return { path: "/", name: "", query: { userid: "" }, params: {} };
  },
  _reroute: (_pathName, _pathUrl, deviceSmall) => {
    let _ismobile=[];
      if(deviceSmall){
         _ismobile =  [`/play/s${_pathUrl}`, "s" + _pathName]
         localStorage.setItem('path', `s${_pathUrl}`)
      }else{
         _ismobile =   [`/play/${_pathUrl}`, _pathName]
         localStorage.setItem('path',`${_pathUrl}`)
      }
    return {
      path: _ismobile[0],
      name: _ismobile[1],
      query: { userid: "" },
      params: {},
    };
  },
};

// const _localStorage2 = {
//   _get: (_item) => {
//     return $q.localStorage.getItem(_item);
//   },
//   _set: (_key, _item) => {
//     return $q.localStorage.set(_key, _item);
//   },
//   _clear: (_key, _item) => {
//     return $q.localStorage.clear();
//   },
// };

var _sessionStorage = {
  _get: (_item) => {
    return sessionStorage.getItem(_item);
  },
  _set: (_key, _item) => {
    return sessionStorage.set(_key, _item);
  },
  _clear: (_key, _item) => {
    sessionStorage.clear();
    localStorage.clear();
    return { path: "/", name: "", query: { userid: "" }, params: {} };
  },
  _reroute: (_pathUrl, _pathName, deviceSmall) => {
    let _ismobile = deviceSmall
      ? [`/play/s${_pathUrl}`, "s" + _pathName]
      : [`/play/${_pathUrl}`, _pathName];
    return {
      path: _ismobile[0],
      name: _ismobile[1],
      query: { userid: "" },
      params: {},
    };
  },
};
export default _localStorage;
