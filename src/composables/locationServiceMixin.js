var locationService = function () {

  // let _thisMedia=ref(null)
let init_navObj = ref(null);
let _thisPosition = ref(null);
let _location = ref(null);

  return {
    _thisPosition,
    _location,
    _init: async function () {
      try {
        if (navigator?.geolocation ?? false) {
          init_navObj.value = navigator.geolocation;
        }
      } catch {}

      return true;
    },
    // navigatePhoneInfo: async function () {
    //   let _clientPhone = null;
    //   _thisPosition.value.phone = _clientPhone ?? null;
    //   _thisPosition.value.phoneCode = _phoneCode.value;
    //   //--------------
    //   return true;
    // },
    watchCurrentPosition: async function () {
      if (init_navObj.value ?? false) {
        init_navObj.value.watchPosition(
        (geodata) => {
          var _geolat = parseFloat(geodata.coords?.latitude ?? 0);
          var _geolong = parseFloat(geodata.coords?.longitude ?? 0);
          if (_geolat && _geolat != _thisPosition.value.geolocation.lat) {
            _thisPosition.value.geolocation = {'lat':_geolat,'long':_geolong};
            _location.value = { country: "", city: "", street: "" };
          }
          return this;
        },
        (error) => {
          return this;
        },
        { enableHighAccuracy: true, timeout: 100 * 60 * 24, maximumAge: 60000 }
      );
      } else {
        init_navObj.value.watchPosition(
        (geodata) => {
          var _geolat = parseFloat(geodata.coords?.latitude ?? 0);
          var _geolong = parseFloat(geodata.coords?.longitude ?? 0);
          if (_geolat && _geolat != _thisPosition.value.geolocation.lat) {
            _thisPosition.value.geolocation = {'lat':_geolat,'long':_geolong};
            _location.value = { country: "", city: "", street: "" };
          }
          return this;
        },
        (error) => {
          return this;
        },
        { enableHighAccuracy: true, timeout: 100 * 60 * 24, maximumAge: 60000 }
      );
      }
      return true;
    },
    getCurrentPosition : async function (){
      if (navigator.geolocation) {
        // Access geolocation
        init_navObj.value.getCurrentPosition(
            position => console.log(position),
            error => console.error(error)
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
    }
  };
};

export default locationService