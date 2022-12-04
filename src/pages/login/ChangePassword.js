import React,{ useState ,useEffect} from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {CButton,CCard,CCardBody,CCardGroup,CCol,CContainer,CRow,} from '@coreui/react'
import {useNavigate } from "react-router-dom";
import { authProvider } from 'src/components/auth/AuthProvider'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import publicService from 'src/services/PublicService'
import InputPassword from 'src/components/mycontroles/mui/InputPassword';

const ChangePassword = () => {
  const [userName,setUserName]=useState('')

  useEffect(() => {
    setUserName(authProvider.getIdentity().userName)
  }, []); 

  let navigate = useNavigate();
  const initialValues = {
    systemCode: process.env.REACT_APP_SYSTEMCODE,
    oldPassword:'',
    newPassword:'',
    newPasswordConfirm:''
  }
  const validationSchema = Yup.object({
      oldPassword: Yup.string().required('رمز عبور قبلی را وارد کنید'),
      newPassword: Yup.string().required('رمز عبور جدید را وارد کنید'),
      newPasswordConfirm: Yup.string().required('تکرار رمز عبور جدید را وارد کنید')
  })

 
const submitForm = (values) => {
    if(values.newPassword!=values.newPasswordConfirm){
      publicService.showNotification({message:"خطا در تکرار رمز عبور جدید",type:"danger"})
    }
    else {
      authProvider.changePassword({systemCode:values.systemCode,userName:userName,oldPassword:values.oldPassword,newPassword:values.newPassword}).then((res)=>{
        if(res.data.statusResult===0){
          publicService.showNotification({message:"تغییر رمز با موفقیت انجام شد",type:"success"})
          setTimeout(() => {
            authProvider.logout();
            navigate('/login');
            
          }, 2000);
        }else {
          publicService.showNotification({message:res.data.message,type:"danger"})
        }
       
          
      }).catch((res) => {
        publicService.showNotification({message:"خطا در اصلاح رمز  ",type:"danger"})
      })
    }
  }
  return (
    <div className="bg-light min-vh-30 d-flex flex-row align-items-center">
    <CContainer>
        <ReactNotifications />
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                    <p className="text-medium-emphasis">تغییر رمز</p>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}> 
                    {
                        formik => {
                            return(
                                <Form >
                                  {/* <FormObServer /> */}
                                    <Box sx={{ flexGrow: 1 }}>
                                      <Grid container spacing={2}>
                                        <Grid item xs={12} md={12}>
                                        <InputPassword name = 'oldPassword' label = 'رمز عبور قبلی' type = 'password'   />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                        <InputPassword name = 'newPassword' label = 'رمز عبور جدید' type = 'password'   />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                        <InputPassword name = 'newPasswordConfirm' label = 'تکرار رمز عبور جدید' type = 'password'   />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                        <CButton color="primary" className="px-4" type="submit" > 
                                            تایید
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
            </CCardGroup>
          </CCol>
        </CRow>
    </CContainer>
    </div>
  )
}

export default ChangePassword
