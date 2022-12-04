import React,{ useState} from 'react';
import {CButton,CCard,CCardBody,CCol,CContainer,CRow,} from '@coreui/react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik'
import Box from '@mui/material/Box';
import * as Yup from 'yup'
import MyControl from "src/components/mycontroles/MyControl";
import { isValidMobileNumber,isValidNationalCode,isValidPasswordLen } from '../../formik/Validates'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import CountDown from 'src/components/formik/CountDown'
import CIcon from '@coreui/icons-react'
import {  cilMobile } from '@coreui/icons'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import smsService from 'src/services/SMSService';
import publicService from 'src/services/PublicService'
import InputText from 'src/components/formik/InputText';

const SmsModalDialog = (props) => {
    const { mobileNumber , open, setOpen, onConfirm } = props;
    
   
  
    const smsRefreshTimeMinutes=1
    const [showSmsButton,setShowSmsButton]=useState(true)
    const [smsKeyErsali,setSmsKeyErsali]=useState('')
    const [smsKey,setSmsKey]=useState('')
    
    const handleClose = () => {
      setSmsKey('')
      setOpen(false)
      
    };
    const SendToken=(formik)=>{
      formik.setSubmitting(true)
    
      let smsErsali=Math.floor(Math.random()*90000) + 10000
      let mobileData={Mobile:mobileNumber,Message:"کد تایید شرکت ایران خودرو دیزل : "+smsErsali}
      
      smsService.sendMessage(mobileData).then((res)=>{
        setSmsKeyErsali(smsErsali)
        formik.setSubmitting(false)
        publicService.showNotification({message:"رمز موقت به تلفن همراه شما ارسال شد",type:"success"})
        setShowSmsButton(false)
        setTimeout(() => {
          
          setSmsKey('')
          setSmsKeyErsali('')
          setShowSmsButton(true)
        }, smsRefreshTimeMinutes*60*1000);
      }).catch((res)=>{
        publicService.showNotification({message:"خطا در ارسال کد تایید ",type:"danger"})
        formik.setSubmitting(false)
      })
  }

    const initialValues = {
    smsKey:'',
  }
  const validationSchema = Yup.object({
    //smsKey: Yup.string().required('کد تایید ارسالی به موبایل را وارد کنید'),
  })
  
  const onOk = () => {
    if(!smsKey){
      publicService.showNotification({message:"کد تایید را وارد کنید",type:"danger"})
      setOpen(true)
    }
    else if(smsKey!=smsKeyErsali){
      publicService.showNotification({message:"کد تایید نادرست میباشد",type:"danger"})
      setOpen(true)
    }
    else {
      publicService.showNotification({message:"کد تایید  صحیح میباشد",type:"success"})
      setOpen(false)
      onConfirm()
    }
  }

  const onSubmit = (values) => {
  }
  const handleChange = (event) => {
    setSmsKey(event.target.value);
  };
  return (
    <div>
      <Dialog 
        fullWidth={true}
        maxWidth={'sm'} 
        open={open} 
        onClose={handleClose} 
        >
           <ReactNotifications />
        <DialogTitle>دریافت کد تایید</DialogTitle>
        <DialogContent>
        <CContainer>
       
        <CRow className="justify-content-center" >
          <CCol lg={10} md={10}  sm={12}>
            <CCard className="mx-12">
            <CCardBody className="p-4" >
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}> 
                    {
                        formik => {
                            return(
                                <Form> 
                                  <Box sx={{ flexGrow: 1}}>
                                  <Grid container spacing={3}> 
                                    <Grid item xs={6} md={6}>
                                    <InputText name = 'smsKey' value={smsKey} label = 'کد تایید' type = 'text' 
                                        onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={6}>
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
                                  
                                    </Grid>

                                  </Box>
                                  <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={onOk}>Subscribe</Button>
                                  </DialogActions>
                          </Form>
                        )}
                    }
              </Formik>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        </CContainer>
        </DialogContent>
        
      </Dialog>
    </div>
   
    
   
  )
}

export default SmsModalDialog
