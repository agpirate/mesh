import axios from "axios"

const setDHeaders = (_setHeader =null) =>{
    if(_setHeader){
        axios.defaults.headers=Object.assign({},_setHeader)
    }else{
        delete axios.defaults.headers.Authorization;
    }
    return true
}

export default setDHeaders