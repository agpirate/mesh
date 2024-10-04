import { ref, reactive, computed, watch, onUnmounted, onMounted } from "vue";

const _thisPosition = () => {
  let init_navObj = ref(false);
  let _location = ref(null);
  let _Country = ref([]); //computed(() => getCountry());
  let _State = ref(null);
  let gpsStatus = ref(null);
  let _thislocation = ref(null);

  let askForGPS = ref(false);

  //------------------------------------
  async function _initGeo() {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(async function (permissionStatus) {
        console.log("---------------------------", permissionStatus.state);
        if (permissionStatus.state === "granted") {
          await allowGPS(true);
        } else {
          gpsStatus.value = "permiting_gpsservice";
          askForGPS.value = permissionStatus.state;
        }
      });

    return true;
  }
  async function allowGPS(allow = false) {
    askForGPS.value = false;
    if (!allow) {
      init_navObj.value = false;
      gpsStatus.value = null;
    } else {
      try {
        await watchCurrentPosition();
        gpsStatus.value = "finish";
        return true;
      } catch (e) {}
      gpsStatus.value = null;
    }
    gpsStatus.value = null;
    return false;
  }

  async function watchCurrentPosition() {
    try {
      gpsStatus.value = "active_gpsservice";
      navigator.geolocation.watchPosition(
        (geodata) => {
          var _geolat = parseFloat(geodata.coords.latitude ?? 0);
          var _geolong = parseFloat(geodata.coords.longitude ?? 0);
          if (_geolat && _geolat != (_thislocation.value?.lat ?? false)) {
            console.log("Updating User GPS Add.", _thislocation.value, _geolat);
            _thislocation.value = { lat: _geolat, long: _geolong };
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
      gpsStatus.value = "active_gpsservice";
    } catch (e) {
      gpsStatus.value = "granted_,but gpsservice";
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 4000);
    });
  }
  async function getCurrentPosition() {
    // Access geolocation
    init_navObj.value.getCurrentPosition(
      (position) => console.log(position),
      (error) => console.error(error)
    );
  }

  return {
    askForGPS,
    _thislocation,
    gpsStatus,
    allowGPS,
    _initGeo,
    getCurrentPosition,
  };
};

export default _thisPosition;
