import { ref, reactive, computed, watch, onUnmounted, onMounted } from "vue";
import { schemaSklt } from "src/composables/schemaSklts";

// Define your mixin-like functionality
const usefileMixin = () => {
  let _thisMedia = ref(null);
  let _fileAttributeName = ref(null); //does give _image_attribute has single/multiple values of images ( sends it as 'file':name_attr, or 'files':name_attr)
  // Define reactive state

  //---
  let _fileSourceFoCam = ref(null); //is folder or camera file source
  //---------------------
  let _cameraBox = ref(false);
  //----------------------
  let _fileAsRaw = ref([]); //_file in Upload_Mode
  //---------------------
  let _fileAsSRC = ref([]); //_file in Show_Mode (Non_String / As_SRC)
  let _fileAsString = ref([]); //_file in Show_Mode (Non_String / As_SRC)

  let _fileAsSRCIndex = ref(0); ///_fileAsSRC_Array_index
  let _fileAsSRCOps = ref(false); //tis could for deleting/

  let slideIndex = ref(0);
  let slideFullscreen = ref(true);

  /*//--------File as string is not actuall file(just path).
      File Could Have 2 source
        1. cameara
        2. file(folder)
      in both ways file enters 2 phases
      phase1: RAW Stage
      phase2: SRC stage

    */
  //-------------------------------------------------------File_Source(ONE)==== File
  async function _fileSourceFolder(e, _attributeName) {
    // Check if file is selected
    let _isthereFiles =
      e.target.files == null || e.target.files.length == 0
        ? false
        : e.target.files;
    ///--------------
    //_file.value[_attributeName]=[]
    if (_isthereFiles) {
      await _resetFileSource();
      //---------reset _file_setting(params)
      _fileAttributeName.value = _attributeName;
      //--------
      _fileSourceFoCam.value = "folder";
      ////////console.log(_file.value[_attributeName],'foldering0000')
      for (let i = 0; i < _isthereFiles.length; i++) {
        _fileAsRaw.value.push(_isthereFiles[i]);
        _fileAsSRC.value.push(URL.createObjectURL(_isthereFiles[i]));
      }
    }
  }

  //-------------------------------------------------------File_Source(TWO)==== CAEMERA

  let _liveFeedSRC = ref({});
  let _liveFeedSRCStreaming = ref("");
  _liveFeedSRC.value["width"] = 100; //window.innerWidth;
  _liveFeedSRC.value["height"] = 100; //window.innerHeight;

  //-------------------------------------------------------File_Source(Two=== CAMERA

  ////================================Operations OVER File (AS RAW=>SRC)
  async function _resetFileSource() {
    _fileAttributeName.value = null;

    _fileSourceFoCam.value = null;

    _cameraBox.value = false;

    _fileAsString.value = [];
    _fileAsSRC.value = [];
    _fileAsRaw.value = [];

    _fileAsSRCIndex.value = 0; ///_fileAsSRC_Array_index
    _fileAsSRCOps.value = false;
    return true;
  }

  async function _fileAsSRCOpsCall(SRCIndex) {
    //__thisIndex.value=index
    if (_fileAsSRCOps.value ?? false) {
      //if delete operations is checked(or calling for selecting)
      // await _SRCDelOps(SRCIndex)
      _fileAsSRC.value.splice(SRCIndex, 1); //remove from display
      _fileAsRaw.value.splice(SRCIndex, 1); //remove from file_tobe uploaded
      _fileAsSRCIndex.value = 0;

    } else {
      _fileAsSRCIndex.value = SRCIndex;
    }
    return true;
  }
  async function _fileAsSRCOpsCall2(SRCIndex) {
    //__thisIndex.value=index
    if (_fileAsSRCOps.value ?? false) {
      //if delete operations is checked(or calling for selecting)
      // await _SRCDelOps(SRCIndex)
      _fileAsString.value.splice(SRCIndex, 1); //remove from display
      // _fileAsRaw.value.splice(SRCIndex, 1); //remove from file_tobe uploaded
      _fileAsSRCIndex.value = 0;

    } else {
      _fileAsSRCIndex.value = SRCIndex;
    }
    return true;
  }
  let _listNavDevices = ref({});

  let _listCameraSource = ref([]);
  let _listMicSource = ref([]);

  let _selectedCameraById = ref(false);
  let _selectedCameraByface = ref(true);

  let _selectedMicById = ref("");

  let _liveFeedRaw = ref("");
  let _liveFeedRawStreaming = ref({});

  let __liveFeedRawStreamingHeight = ref("");
  let __liveFeedRawStreamingWidth = ref("");

  const _liveFeedRawAudAttribute = ref(false);
  const _liveFeedRawVidAttribute = ref({
    facingMode: "user",
    aspectRatio: { min: 1, max: 1.7777777778 },
    width: { min: 1280 },
    height: { min: 720 },
  });

  class _cameraDevice {
    //_navigateDevice();

     constructor() {
      //_init_onPlayNavigator class
      console.error("Init.. Device Naviator");
      try {
        // Check if geolocation is supported by the browser
      } catch {}

    }
    async _navigateDevice() {

      try {
        // Request permission to access the user's camera
        _thisMedia.value =  navigator.mediaDevices
        console.error(_thisMedia.value,"Navigating mediaDevice.op");
        if (_thisMedia.value ?? false) {
          _listNavDevices.value["getUserMedia"] =
            _thisMedia.value.getUserMedia ?? {};
          for (let mediaDevice of [
            "getUserMedia",
            "webkitGetUserMedia",
            "mozGetUserMedia",
            "msGetUserMedia",
          ]) {
            var _doesCamera = navigator[mediaDevice] ?? false;
            if (_doesCamera) {
              _listNavDevices.value[mediaDevice] = _doesCamera;
            }
          }
        } else{ _thisMedia.value =null}
      } catch(e) {
        _thisMedia.value =null;
        console.log(e,'EEEEEEEEEEEEEEEEEEEEEEEEEEEE')}
      return true;
    }

    async _enumNavigateDevice() {
      try {
        return await _thisMedia.value.enumerateDevices().then((_camDevices) => {
          _listCameraSource.value = [];
          for (let index in _camDevices) {
            let _camDevice = _camDevices[index];
            ////////console.log('graphic device',_camDevice)
            if (_camDevice.kind === "videoinput") {
              _selectedCameraById.value = _camDevice["deviceId"]; //default camera_id
              _listCameraSource.value.push(_camDevice); //listing all available_camera media_device
            } else {
              //for audio input
              _selectedMicById.value = _camDevice["deviceId"]; //default mic_id
              _listMicSource.value.push(_camDevice); //listing all available_mic media_device
            }
          }
          return true;
        });
      } catch (error) {
        //////console.log('Error No Camera Detected...Know this');
      }
      return true;
    }
    //-----------------------------------------
    async _openCamera(_attributeName = "") {
      console.error("Navigating mediaDevice.");
      await _resetFileSource();

      await this._navigateDevice();
      //------------
      _cameraBox.value = true;
      _fileSourceFoCam.value='camera'
      //-------
      if (_listNavDevices.value["getUserMedia"] ?? false) {
        //in priority use ( this device_ for media_sources)
        await this._enumNavigateDevice();
        _fileAttributeName.value = _attributeName;
        //------------------
        // _fileSourceFoCam.value = "camera";
        //--------
        if (_selectedCameraById.value ?? false) {
          //if 'user'
          _liveFeedRawVidAttribute.value["deviceId"] = {
            exact: _selectedCameraById.value,
          };
          _liveFeedRawVidAttribute.value["facingMode"] =
            _selectedCameraByface.value ? "user" : "environment";
        } else {
          _liveFeedRawVidAttribute.value["facingMode"] =
            _selectedCameraByface.value ? "user" : "environment";
        }
        //booting the feed ( for streaming...)
        _liveFeedRaw.value = await _thisMedia.value.getUserMedia({
          video: _liveFeedRawVidAttribute.value,
          audio: _liveFeedRawAudAttribute.value,
        });
        //initialize the video streaming
        _liveFeedRawStreaming.value["srcObject"] = _liveFeedRaw.value;
        //_liveFeedRawStreaming.value.play()
        _liveFeedRawStreaming.value.onloadedmetadata = () => {
          _liveFeedRawStreaming.value.play();
        };
      } else {
        console.error("Navigating mediaDevice.Error");
      }

      return true;
    }
    async _stopCamera() {
      //----shutdown camera RawFeed_& displaying
      await _resetFileSource();
      try {
        _liveFeedRaw.value.getTracks().forEach((_streamTrack) => {
          _streamTrack.stop();
          _streamTrack = false;
        });
      } catch {
        _liveFeedRaw.value.getVideoTracks().forEach((_streamTrack) => {
          _streamTrack.stop();
          _streamTrack = false;
        });
      }
      _liveFeedRawStreaming.value.src = null;
      //------
      return true;
    }

    async _operateDevice(cmd) {
      if (cmd == "pause") {
        _liveFeedRawStreaming.value.pause();
      } else if (cmd == "play") {
        _liveFeedRawStreaming.value.play();
      }
      return true;
    }

    async _saveScreenShoots() {
      //----shutdown camera RawFeed_& displaying
      _cameraBox.value = false;
      //--------
      try {
        _liveFeedRaw.value.getTracks().forEach((_streamTrack) => {
          _streamTrack.stop();
          _streamTrack = false;
        });
      } catch {
        _liveFeedRaw.value.getVideoTracks().forEach((_streamTrack) => {
          _streamTrack.stop();
          _streamTrack = false;
        });
      }
      //---------
      _liveFeedRawStreaming.value.src = null;
      //--------
      return true;
    }
    async _screenShoot(_reset = false) {
      if (_reset) {
        _fileAsRaw.value = [];
        _fileAsSRC.value = []; //viewable content
        return true;
      }
      //_save screenshoots _for_canvas_display(if needed ? )
      _liveFeedSRCStreaming.value = _liveFeedSRC.value.getContext("2d");
      _liveFeedSRCStreaming.value.drawImage(
        _liveFeedRawStreaming.value,
        0,
        0,
        _liveFeedSRC.value.width,
        _liveFeedSRC.value.height
      );
      try {
        //_save screenshoots _for_SRC_display ( being used method__now!) as [PNG]____as primary choice
        _fileAsSRC.value.push(_liveFeedSRC.value.toDataURL("image/png")); //_save as jpeg
        //_save screeshots _As_Raw_for_uploading
        _liveFeedSRC.value.toBlob((blob) => {
          _fileAsRaw.value.push(
            new File(
              [blob],
              "fileName.png" + String(new Date()),
              { type: "image/png" },
              0.9
            )
          );
        }, "image/png");
      } catch {
        //_save screenshoots _for_SRC_display ( being used method__now!) as [JPEG]__if Not
        _fileAsSRC.value.push(_liveFeedSRC.value.toDataURL("image/jpeg")); //or _save as jpeg
        //_save screeshots _As_Raw_for_uploading
        _liveFeedSRC.value.toBlob((blob) => {
          _fileAsRaw.value.push(
            new File(
              [blob],
              "fileName.jpeg" + String(new Date()),
              { type: "image/jpeg" },
              0.9
            )
          );
        }, "image/jpeg");
      }
      console.log(_liveFeedSRCStreaming, "lllllllllll");
      return true;
    }
    //--------------setting camera_view & Mic
    async _setCameraParam(cameraID = "", _facetoggler = false) {
      //switching camera
      _selectedCameraByface.value = _facetoggler;
      _selectedCameraById.value = cameraID;
      return await _openCamera();
    }

    async _setMicParam(audioID = "") {
      _selectedMicById.value = _listMicSource.value["deviceId"][audioID];
      return await _openCamera();
    }
  }
  // Return data and methods
  return {
    _thisMedia,
    _fileAttributeName,
    //-------
    _cameraBox,
    _fileSourceFoCam,
    _fileAsSRC,
    _fileAsString,
    _fileAsRaw,

    _liveFeedSRC,
    _fileAsSRCIndex,
    //---
    _cameraDevice,
    _listCameraSource,
    _selectedCameraById,
    _selectedCameraByface,
    _liveFeedRawStreaming,
    //--------
    _fileSourceFolder,
    //--------
    _fileAsSRCOps,
    _fileAsSRCOpsCall,
    _fileAsSRCOpsCall2,
    //-----------
    _resetFileSource,
    //-----
  };
};

export default usefileMixin;
