import {
  defineEmits,
  ref,
  reactive,
  onMounted,
  defineAsyncComponent,
  computed,
} from "vue";
// import { saleitSchema } from "src/composables/schemas/saleitSchemas";
import dynamicModular from "./dynamicModule.js";

// import { ref, reactive, computed, watch, onUnmounted, onMounted } from "vue";

// Define your mixin-like functionality
const useschemaValidator = () => {
  var thisSchemaPath = ref("saleitSchemas");
  var thisSchemaFile = ref("saleitSchema");

  //---------------------
  let _thisReturn = ref({}); //ignore it
  let _debugObj = ref({});

  //----------------------

  // var schemaPath = "../../composables/schemas/"+props.thisSchemaPath
  let schematoValidate;
  dynamicModular(thisSchemaPath.value, thisSchemaFile.value).then((m)=>{
    if(m) schematoValidate = m
      return true
    })

  //------------------------------------  submittting and Checking Forms
  // New data types and rules
  let _inputCharacter = {
    numbericInteger: /^\d+$/,
    numbericFloat: /^-?\d*(\.?\d+)?$/,
    alphanumericString: /^[a-z0-9]+$/,
    alphaString: /^[a-zA-Z]+$/,
  };
  //-----------------------
  async function _validateThis(field, _thisValue = null) {
    if (!schematoValidate) {
      return false;
    }
    let _fieldRule = schematoValidate[field]["rules"] ?? null; // Changed from 'rule' to 'rules'
    let value = _thisReturn.value[field] ?? null ?? _thisValue;
    if (!_fieldRule) {
      console.log(
        "No Validator Set; For",
        schematoValidate[field] ?? false,
        field
      );
      return true;
    }
    _debugObj.value[field] = null;
    //------------------
    for (let rule of _fieldRule) {
      let _check = await _isThisRule210(rule, value);
      if (!_check) {
        _debugObj.value[field] = _getErrorMessage(rule); // Improved error message handling
        console.log("No Validated  for = " + field);
        break;
      }
    }
    console.log(_debugObj.value, " Validatiotion Obj.");
    return true;
  }
  // Helper function to get error messages based on rule type
  function _getErrorMessage(rule) {
    switch (rule.type) {
      case "required":
        return "Field is required";
      case "minValue":
        return "Minimum Value Error";
      case "maxValue":
        return "Maximam Value Error";
      case "minLength":
        return `Minimum length is ${rule.value}`;
      case "maxLength":
        return `Maximum length is ${rule.value}`;
      case "pattern":
        return "Invalid format";
      default:
        return "Invalid input";
    }
  }

  // Updated rule validation function
  // rules: [
  //   { type: "required" },
  //   { type: "minLength", value: 3 },
  //   { type: "maxLength", value: 20 },
  //   { type: "pattern", value: "^[a-zA-Z0-9]+$" },
  // ],
  const _isThisRule210 = async (rule, value) => {
    console.log(typeof rule, typeof value, "validation is thisrule210");
    switch (rule.type) {
      case "required":
        return value != null && value != "";
      case "minValue":
        return value >= rule.value;
      case "maxValue":
        return value <= rule.value;
      case "minLength":
        return value.length >= rule.value;
      case "maxLength":
        return value.length <= rule.value;
      case "pattern":
        return new RegExp(rule.value).test(value);
      case "type":
        return _checkType(rule.value, value);
      default:
        return true;
    }
  };

  // Function to check data types
  const _checkType = (type, value) => {
    switch (type) {
      case "number":
        return !isNaN(value);
      case "string":
        return typeof value === "string";
      case "array":
        return Array.isArray(value);
      case "object":
        return typeof value === "object" && !Array.isArray(value);
      default:
        return false;
    }
  };

  return {
    thisSchemaPath,
    thisSchemaFile,
    //---------
    _debugObj,
    //----------returning values
    _validateThis,
  };
};

export default useschemaValidator;
