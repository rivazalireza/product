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

  
const customerService = {

    getCustomers :async (postData)=>{
        return axios.post(nodeAddress+'/sales/getCustomers', postData, axiosConfigToken())
    },

    getCustomerUIData :async ()=>{
        return axios.post(nodeAddress+'/sales/getCustomerUIData', {}, axiosConfigToken())
    },
   
}
export default customerService