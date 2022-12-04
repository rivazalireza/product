import React ,{ useEffect,useRef }from 'react'
import {useNavigate, useLocation } from "react-router-dom"
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {CButton,CCard,CCardBody,CCardGroup,CCol,CContainer,CRow,} from '@coreui/react'

import { authProvider } from 'src/components/auth/AuthProvider'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import { cilInput } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import publicService from 'src/services/PublicService'
import InputText from 'src/components/mycontroles/mui/InputText'
import InputPassword from 'src/components/mycontroles/mui/InputPassword'

const Login = () => {
 
  const location = useLocation()
  const from=location?.state
  let navigate = useNavigate()
  useEffect(() => {
    if(authProvider.isAuth()){
      navigate(process.env.REACT_APP_API_FIRST_PAGE);
      window.location.reload();
      }
  }, []);
  const forgetPassword = () => {
    navigate('/forgotpassword')
  }
  
  const initialValues = {
      systemCode: process.env.REACT_APP_SYSTEMCODE,
      userName: '',
      password: '',
  }
  const validationSchema = Yup.object({
      userName: Yup.string().required(" کد کاربری را وارد کنید"),
      password: Yup.string().required('رمز عبور را وارد کنید'),
  })
  const onSubmit = (values, { setSubmitting }) => {
    
    authProvider.authenticate( values ).then((res)=>{
        if(res.data.statusResult===0){
          authProvider.setIdentity(res.data.token);
          if(from){
            navigate(from.from.pathname);
          }
          else {
            navigate(process.env.REACT_APP_API_FIRST_PAGE);
          }
          window.location.reload()
        }
        else {
          publicService.showNotification({message:res.data.message,type:"danger"})
          setSubmitting(false)
        }
      }).catch((res) => {
        publicService.showNotification({message:"خطا در برقراری ارتباط با شبکه",type:"danger"})
        setSubmitting(false)
      })
  }
  
  return (
    <div className="bg-light min-vh-30 d-flex flex-row align-items-center">
      <CContainer>
      <ReactNotifications />
            <CRow className="justify-content-center">
            <CCol md={8} xs={12}>
              <CCardGroup>
                <CCard className="p-12">
                  <CCardBody>
                    <h2>{'ورود به سیستم'}</h2>
                      <p className="text-medium-emphasis"> کد کاربری و رمز عبور را وارد کنید</p>
                      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}> 
                      {formik => {
                          return(
                            <Form>
                               <Box sx={{ flexGrow: 1 }}>
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                    <InputText name = 'userName' label = 'کد کاربری' type = 'text'   />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                    <InputPassword name = 'password' label = 'رمز عبور' type = 'password'   />
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                      <CButton color="info" className="px-4" type="submit" disabled={formik.isSubmitting}>
                                        <CIcon icon={cilInput} className="me-2" />
                                        تایید
                                      </CButton>
                                      <React.Fragment>
                                       {formik.isSubmitting   ? (
                                            <CircularProgress
                                                color="inherit"
                                                size={20}
                                            />
                                        ) : null}
                                    </React.Fragment>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                      <CButton color="link" className="px-0" style={{ textDecoration:'none'}} onClick={forgetPassword}>
                                      فراموشی رمز ؟
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
                <CCard className="text-white bg-primary py-5" >
                  <CCardBody className="text-center">
                    <div>
                      <h4>
                        کاربر گرامی
                      </h4>
                      <p>
                       برای ورود به سیستم در قسمت کد کاربری   
                        <br></br>
                        از شماره پرسنلی
                        استفاده کنید 
                      </p>
                      <p>
                      </p>
                    </div>
                    
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
          
      </CContainer>
    </div>
  )
}

export default Login
