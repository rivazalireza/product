import React from 'react';
import { useLocation, useNavigate, } from 'react-router-dom'
import { authProvider } from 'src/components/auth/AuthProvider'
import { useState, useEffect } from "react";
import { CButton, CCard, CCardBody, CCol, CContainer, CRow, } from '@coreui/react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputText from 'src/components/mycontroles/mui/InputText';
import CIcon from '@coreui/icons-react'
import { TextField } from "@mui/material";
import { useFormik } from 'formik';
import appService from 'src/services/AppService';
import { useQuery } from '@tanstack/react-query'
const OrderNumber = () => {

  const [personelInfo, setProductRow] = useState([]);
  const { state } = useLocation();

  /* useEffect(() => {
    authProvider.orderNumber(state).then((res) => {
      console.log(res.data[0][0])
      //setProductRow(res.data[0][0].ShomareSefaresh)
      console.log(2);
      setProductRow({
        ShomareSefaresh: res.data[0][0].ShomareSefaresh,
        FanniNo: res.data[0][0].FanniNo,
        FarsiP: res.data[0][0].FarsiP,
        MarhaleCode: res.data[0][0].MarhaleCode,
        MarhaleName: res.data[0][0].MarhaleName,
      });
    });
  }, []);
 */
  const onSuccess = (data) => {

    setProductRow(data.data.personelInfo)



  }
  const { isLoading, isError, error, data } = useQuery(['orderNumber'], () => appService.orderNumber(state),
    {
      onSuccess,
    })

  if (isLoading || !data) return 'در حال خواندن اطلاعات ...'
  if (isError) return 'خطا: ' + error.message
  if (data.data.personelInfo == undefined) {
    return <h5 style={{ color: 'red', textAlign: 'center' }}>خطا در خواندن اطلاعات</h5>
  }


   const initialValues = {
    ShomareSefaresh: data.data.personelInfo.ShomareSefaresh,
    FanniNo: data.data.personelInfo.FanniNo,
    FarsiP: data.data.personelInfo.FarsiP,
    Tedad: data.data.personelInfo.Tedad[0] + "," + data.data.personelInfo.Tedad[1],
    MarhaleCode:data.data.personelInfo.MarhaleCode,
    MarhaleName:data.data.personelInfo.MarhaleName,
    DateFaal:data.data.personelInfo.DateFaal,
 
 
  }  

  return (

    <CRow className="justify-content-center">

      <CCol lg={12} md={12} sm={12}>

        <CCard className="mx-12">

          <CCardBody className="p-4" >
            <Formik   initialValues={initialValues}  >
              {
                formik => {
                  return (
                    <Form>
                      <h4 style={{ textAlign: 'center' }} >صدور مراحل تولید</h4>
                      <Box sx={{ flexGrow: 1 }} >
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={12} style={{ paddingTop: '0px' }}>
                            <hr style={{ pading: '0px' }} />
                            <h6 style={{ color: 'gary' }}>شناسه تولید:</h6>
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <InputText name='ShomareSefaresh' disabled={true} label='شماره سفارش' type='text' />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <InputText name='FanniNo' disabled={true} type='text' label='شماره فنی' />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <InputText name='Tedad' disabled={true} label='تعداد سفارش' type='text' />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <InputText name='MarhaleCode' disabled={true} label='کد مرحله' type='text' />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <InputText name='MarhaleName' disabled={true} label='شرح مرحله' type='text' />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <InputText name='DateFaal' disabled={true} label='تاریخ سفارش' type='text' />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <InputText name='FarsiP' disabled={true} label='شرح فنی' type='text' />
                          </Grid>

                        </Grid>
                      </Box>

                    </Form>
                  )
                }
              }
            </Formik>

          </CCardBody>
        </CCard>

      </CCol>

    </CRow>





  );
}

export default OrderNumber;
