import { ref } from "vue";

let isEmpty = ["null", "undefined", "", null, undefined];
var _localStorage = {
  _get: (_key = null, ifNotnewValue = null) => {
    try {
      let fetchStore = localStorage.getItem(_key); //fetch if stored, or return & save default
      if (isEmpty.includes(fetchStore)) {
        localStorage.setItem(_key, ifNotnewValue);
        return ifNotnewValue;
      } else {
        return fetchStore;
      }
    } catch {
      return false;
    }
  },
  _set: (_key = null, _item = null) => {
    return _item ? localStorage.setItem(_key, _item) : false;
  },
  _getsession: (_item = null) => {
    return _item ? sessionStorage.getItem(_item) : false;
  },
  _setsession: (_key = null, _item = null) => {
    return _item ? sessionStorage.set(_key, _item) : false;
  },
  _clear: (_key = null, _item = null) => {
    sessionStorage.clear();
    _key ? localStorage.clear(_key) : localStorage.clear();
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
