import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CIcon from '@coreui/icons-react'
import {  cilMobile } from '@coreui/icons'
import {CButton,CCard,CCardBody,CCol,CContainer,CRow,} from '@coreui/react'
import {useNavigate } from "react-router-dom";
import { authProvider } from 'src/components/auth/AuthProvider'
import CountDown from 'src/components/mycontroles/CountDown'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import publicService from 'src/services/PublicService'
import InputPassword from 'src/components/mycontroles/mui/InputPassword'
import InputText from 'src/components/mycontroles/mui/InputText'

const ForgotPassword = () => {
   const [showSmsButton,setShowSmsButton]=useState(true)
   const [smsKeyErsali,setSmsKeyErsali]=useState('')
   const smsRefreshTimeMinutes=2  

  let navigate = useNavigate();
  const initialValues = {
    systemCode: process.env.REACT_APP_SYSTEMCODE,
    userName:'',
    smsKey:'',
    mobileNumber:'',
    newPassword:'',
    newPasswordConfirm:''

  }
  const validationSchema = Yup.object({
      userName: Yup.string().required("کد ملی را وارد کنید"),
      smsKey: Yup.string().required('کد تایید ارسالی به موبایل را وارد کنید'),
      newPassword: Yup.string().required('رمز عبور جدید را وارد کنید'),
      newPasswordConfirm: Yup.string().required('تکرار رمز عبور جدید را وارد کنید'),
  })
  const SendToken=(formik)=>{
    formik.setSubmitting(true)
    if(!formik.values.userName){
      publicService.showNotification({message:"لطفا کد ملی را وارد کنید",type:"warning"})
      formik.setSubmitting(false)
      return
    }
    authProvider.sendSmsForgotPassword({systemCode:formik.values.systemCode,userName:formik.values.userName}).then((res)=>{
        setSmsKeyErsali('')
        let mobile=res.data.mobile
        let msg=`رمز موقت به تلفن همراه به شماره 
        ${mobile.substring(6,11)}***${mobile.substring(0,4)}
        ارسال شد
        `
        publicService.showNotification({message:msg,type:"success"})
        formik.setSubmitting(false)
        setShowSmsButton(false)
        setTimeout(() => {
          setShowSmsButton(true)
          formik.setFieldValue('smsKey','')
        }, smsRefreshTimeMinutes*60*1000);
    }).catch((res)=> {
      publicService.showNotification({message:" خطا در ارسال کد",type:"warning"})
      formik.setSubmitting(false)
    })
}
const onSubmit = (values, { setSubmitting }) => {
    if(!values.smsKey){
      publicService.showNotification({message:"کد تایید را وارد کنید",type:"danger"})
      setSubmitting(false)
    }
    else if(values.newPassword!=values.newPasswordConfirm){
      publicService.showNotification({message:"خطا در تکرار رمز عبور جدید",type:"danger"})
      setSubmitting(false)
    }
    else {
      authProvider.recoverPassword({systemCode:values.systemCode,userName:values.userName,password:values.newPassword,smsKey:values.smsKey}).then((res)=>{
        if(res.data.statusResult===0){
          publicService.showNotification({message:"تغییر رمز با موفقیت انجام شد",type:"success"})
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
        else {
          publicService.showNotification({message:res.data.message,type:"danger"})
          setSubmitting(false)
        }
        
        
        }).catch((res) => {
          publicService.showNotification({message:"خطا در اصلاح رمز  ",type:"danger"})
          setSubmitting(false)
        })
    }
  }
  {/*
  
*/}
  return (
  
    <div className="bg-light min-vh-30 d-flex flex-row align-items-center">
    <CContainer>
      <ReactNotifications />
      <CRow className="justify-content-center">
      <CCol md={6}>
        
      <CCard className="mx-12">
          <CCardBody className="p-4" >
                <h3>{process.env.REACT_APP_APPLICATION_NAME}</h3>
                <p className="text-medium-emphasis">فراموشی رمز</p>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}> 
                {
                    formik => {
                        return(
                            <Form >
                                <Box sx={{ flexGrow: 1 }}>
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                    <InputText name = 'userName' label = 'کد ملی' type = 'text'  />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                    <InputPassword  name = 'newPassword' label = 'رمز عبور جدید' type = 'password'   />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                    <InputPassword name = 'newPasswordConfirm' label = 'تکرار رمز عبور جدید' type = 'password'   />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                    {showSmsButton? (
                                        <CButton color="info" className="px-3" disabled={formik.isSubmitting}
                                        onClick={()=>{
                                        formik.setFieldValue("smsKey",'')
                                        SendToken(formik)
                                        
                                        }}>
                                        دریافت کد
                                        <CIcon icon={cilMobile} className="me-1"  />
                                        </CButton>
                                    
                                    ):(
                                    <CountDown hours={0} initialMinute={smsRefreshTimeMinutes} />
                                    )
                                    }
                                </Grid>
                                <Grid item xs={12} md={6}>
                                <InputText name = 'smsKey'  label = 'کد تایید' type = 'text'  />
                                </Grid>
                                    <Grid item xs={12} md={12} >
                                    <CButton  color="info" className="px-4" style={{float:'left'}}  type="submit" disabled={formik.isSubmitting} > 
                                        تغییر رمز
                                      </CButton>
                                    </Grid>

                                  </Grid>
                                </Box>
                              </Form>
                              )}
                              }
                </Formik>
            </CCardBody>
          </CCard>
        
      </CCol>
      </CRow>
    </CContainer>
    </div>
  )
}

export default ForgotPassword
