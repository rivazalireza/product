import axios from 'axios'
import jwt_decode from "jwt-decode";
const nodeAddress=process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_NODE: process.env.REACT_APP_API_NODE_SERVER;

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': "*",
    }
  };
const getToken= () => {
    return localStorage.getItem( process.env.REACT_APP_SYSTEMCODE)
}
const axiosConfigToken=()=>{
    let token= getToken()
    return {
        headers: { 
            'Content-Type': 'application/json;charset=UTF-8',  
            'Access-Control-Allow-Origin': "*",  
            authorization: `Bearer ${token}` 
        }
    }
}

const authProvider = {
    getDate:async  () =>  {
        return axios.get(nodeAddress+'/users/getDate', axiosConfig)
    },
    login:async  (postData) =>  {
        return axios.post(nodeAddress+'/users/authenticate', postData, axiosConfig)
    },
    authenticate:async  (postData) =>  {
        return axios.post(nodeAddress+'/users/authenticate', postData, axiosConfig)
    },
    getCaptchaData:async  (postData) =>  {
        return axios.post(nodeAddress+'/users/getCaptchaData', postData, axiosConfigToken())
    },
    isHuman:async  (postData) =>  {
        return axios.post(nodeAddress+'/users/isHuman', postData, axiosConfigToken())
    },
    register:async  (data) =>  {
        const postData = JSON.parse(JSON.stringify(data))
        if(postData.birthCityId.value)
            postData.birthCityId=postData.birthCityId.value;
        if(postData.issueCityId.value)
            postData.issueCityId=postData.issueCityId.value;
        if(postData.addressCityId.value)
            postData.addressCityId=postData.addressCityId.value;
        if(postData.agencyId.value)
            postData.agencyId=postData.agencyId.value;
        return axios.post(nodeAddress+'/users/register', postData, axiosConfig)
    },
    registerEdit:async  (data) =>  {
        const postData = JSON.parse(JSON.stringify(data))
        if(postData.addressCityId.value)
            postData.addressCityId=postData.addressCityId.value;
        if(postData.agencyId.value)
            postData.agencyId=postData.agencyId.value;
        return axios.post(nodeAddress+'/users/registerEdit', postData, axiosConfigToken())
    },
    getRegisterInfo :async ()=>{
        return axios.post(nodeAddress+'/users/getRegisterInfo', {}, axiosConfigToken())
    },
    sendSmsForgotPassword:async  (postData) =>  {
        return axios.post(nodeAddress+'/users/sendSmsForgotPassword', postData, axiosConfig)
    },
    sendSmsRegisterEdit:async  () =>  {
        return axios.post(nodeAddress+'/users/sendSmsRegisterEdit', {}, axiosConfigToken())
    },
    sendSmsRegister:async  (postData) =>  {
        return axios.post(nodeAddress+'/users/sendSmsRegister', postData, axiosConfig)
    },
    recoverPassword:async  (postData) =>  {
        return axios.post(nodeAddress+'/users/recoverPassword', postData, axiosConfig)
    },
    changePassword:async  (postData) =>  {
        return axios.post(nodeAddress+'/users/changePassword', postData, axiosConfigToken())
    },
    logout: () => {
        localStorage.removeItem(process.env.REACT_APP_SYSTEMCODE)
        return Promise.resolve()
    },
    setIdentity: (token) => {
        localStorage.setItem(process.env.REACT_APP_SYSTEMCODE, token)
    },
    getIdentity: () => {
        try {
            const token=getToken();
            if(token){
                return jwt_decode(token)
            }
            else return null;
        } catch (error) {
            return null
        }
        
    },
    isAuth: () => {
        let token= getToken()
        if(token){
            var decoded = jwt_decode(token);
            if (decoded.exp * 1000 < Date.now() || !decoded.privateData || !decoded.fullName) {
                localStorage.removeItem(process.env.REACT_APP_SYSTEMCODE)
                return false;
              }
              else return true
        }
        else return false
    },
    getPermissions: () => {
        
        const token=getToken();
        if(token){
            let permissions= jwt_decode(token).permissions
            return permissions? permissions:[]
        }
        else return [];
        
    },
    isAuth: () => {
        let token= getToken()
        if(token){
            var decoded = jwt_decode(token);
            if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem(process.env.REACT_APP_SYSTEMCODE)
                return false;
              }
              else return true
        }
        else return false
    },
    isPermission: (permissionName) => {
        const token=getToken();
        if(token){
            let permissions= jwt_decode(token).permissions
            return permissions? (permissions.indexOf(permissionName) > -1? true:false):false
        }
        else return false;
    },
    checkOptionPermission:(permissions,columns)=>{
        var privateColumns=columns.filter(x => x.isPrivate)
        privateColumns.forEach((col)=>{
            var i=permissions.findIndex(x => x.PermissionName.endsWith('.'+col.field) );
            if (i<0 ) {
                var index=columns.findIndex(x => x.field === col.field)
                columns.splice(index, 1);
            }
        })
    },
    isOptionPermission:(permissions,option)=>{
        var i=permissions.findIndex(x => x.PermissionName.endsWith('.'+option) );
        if (i>=0 ) {
            return true
        }
        else 
            return false
    },
    optionPermission: (permissionName) => {
        return axios.post(nodeAddress+'/users/optionPermission', {permissionName:permissionName}, axiosConfigToken())
    },
}

export { axiosConfigToken,authProvider}