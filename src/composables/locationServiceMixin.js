let init_navObj = ref(false);
let _location = ref(null);
let _Country = ref([]); //computed(() => getCountry());
let _State = ref(null);
let _activeService = ref(null);
let _thislocation = ref(null);

let askForGPS = ref(false);
var _thisPosition = function () {
  return {
    _thislocation,
    _activeService,
    //------------------------------------
    _init: async function () {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(async function (permissionStatus) {
          if (permissionStatus.state === "granted") {
            await positionInstance.allowGPS(true);
          } else {
            _activeService.value = "permiting_gpsservice";
            askForGPS.value = permissionStatus.state;
          }
        });

      return true;
    },
    allowGPS: async function (allow = false) {
      askForGPS.value = false;
      if (!allow) {
        init_navObj.value = false;
        _activeService.value = null;
      } else {
        try {
          await positionInstance.watchCurrentPosition();
          _activeService.value = "finish";
          return true;
        } catch (e) {}
        _activeService.value = null;
      }
      _activeService.value = null;
      return false;
    },

    watchCurrentPosition: async function () {
      try {
        _activeService.value = "active_gpsservice";
        navigator.geolocation.watchPosition(
          (geodata) => {
            var _geolat = parseFloat(geodata.coords.latitude ?? 0);
            var _geolong = parseFloat(geodata.coords.longitude ?? 0);
            if (_geolat && _geolat != _thislocation) {
              _thislocation = { lat: _geolat, long: _geolong };
              // _location.value = { country:null, city: null, street: null };
            }
            init_navObj.value = navigator.geolocation;
            return this;
          },
          (e) => {
            return this;
          },
          {
            enableHighAccuracy: true,
            timeout: 100 * 60 * 24,
            maximumAge: 60000,
          }
        );
        _activeService.value = "active_gpsservice";
      } catch (e) {
        _activeService.value = "granted_,but gpsservice";
      }

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 4000);
      });
    },
    getCurrentPosition: async function () {
      // Access geolocation
      init_navObj.value.getCurrentPosition(
        (position) => console.log(position),
        (error) => console.error(error)
      );
    },
  };
};

export default _thisPosition;
