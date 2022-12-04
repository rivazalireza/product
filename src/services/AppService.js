import axios from 'axios'
const nodeAddress=process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_NODE: process.env.REACT_APP_API_NODE_SERVER;
import { axiosConfigToken } from 'src/components/auth/AuthProvider'
const axiosConfig = {
    "async": true,
    "crossDomain": false,
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        'Access-Control-Allow-Origin': "*",
    },
    "processData": true,
    
  };

const appService = {
    postApi  : async (api,postData)=>{
  
        return  axios.post(nodeAddress+api, postData, axiosConfigToken())
    },
    getMobileConfirm: async (postData)=>{
        return axios.post(nodeAddress+'/sms/getMobileConfirm', postData, axiosConfigToken())
    },

    saveProductList: async (postData)=>{
        return axios.post(nodeAddress+'/product/saveProductList', postData, axiosConfigToken())
    },
    
    orderNumber:async  (postData) =>  {
        
         return axios.post(nodeAddress+'/product/bp', postData, axiosConfigToken())
     },
}
export default appService