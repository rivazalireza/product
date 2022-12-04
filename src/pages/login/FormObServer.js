import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'
const FormObServer=()=>{
    const {values}=useFormikContext();
    useEffect(()=>{
      },[values]);
    return null;
  }
  export default FormObServer