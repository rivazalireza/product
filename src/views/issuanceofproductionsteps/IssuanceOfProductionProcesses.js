import React, { useState, useEffect } from 'react'
import { CButton, CCard, CCardBody, CCol, CContainer, CRow, } from '@coreui/react'
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik'
import Box from '@mui/material/Box';
import * as Yup from 'yup'
import InputText from 'src/components/mycontroles/mui/InputText'
import InputDate from 'src/components/mycontroles/mui/InputDate';
import InputTime from 'src/components/mycontroles/mui/InputTime';
import InputButton from 'src/components/mycontroles/mui/InputButton';
import InputPickList from 'src/components/mycontroles/mui/InputPickList';
import publicService from 'src/services/PublicService'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import appService from 'src/services/AppService';
import { authProvider } from 'src/components/auth/AuthProvider'
import momentService from 'src/services/MomentService';
import { useLocation, useNavigate } from 'react-router-dom';
import SubmitButton from 'src/components/mycontroles/mui/SubmitBottun';
import { Link } from 'react-router-dom'
const productPickList = {
  title: 'اطلاعات کنترل تولید روزانه',
  api: '/product/getDate',
  id: 'ID',
  code: 'IdSefaresh',
  labelShow: 'IdSefaresh',
  lazyParams: { sortField: 'IdSefaresh', rows: 10, first: 0, page: 1, sortOrder: -1 },
  columns: [
    { field: "ShomareSefaresh", header: "شماره سفارش", alignHeader: "center", sortable: true, filter: true },
    { field: "FanniNo", header: "شماره فنی", alignHeader: "center", sortable: false, filter: true },
    { field: "FarsiP", header: "شرح فنی", alignHeader: "center", sortable: false, filter: true },
    { field: "ShomareMarhale", header: "شماره مرحله سفارش", alignHeader: "center", sortable: false, filter: true },
    { field: "Tedad", header: "تعداد قطعه در مرحله", alignHeader: "center", sortable: false, filter: true },
    { field: "MarhaleCode", header: "کد مرحله ساخت قطعه", alignHeader: "center", sortable: false, filter: true },
    { field: "MarhaleName", header: "شرح مرحله", alignHeader: "center", sortable: false, filter: true },
    { field: "ZamanTahvil", header: "زمان تحویل", alignHeader: "center", sortable: false, filter: true },

  ],
}
const nameDivice = {
  title: 'لیست شماره سفارش',
  api: '/product/getNameDevise',
  id: 'ID',
  code: 'Code',
  labelShow: 'Code',
  lazyParams: { sortField: 'Code', rows: 10, first: 0, page: 1, sortOrder: -1 },
  columns: [
    { field: "Code", header: "کد و نام دستگاه", alignHeader: "center", sortable: true, filter: true },
    { field: "TTitle", header: "شرح مرحله", alignHeader: "center", sortable: false, filter: true },

  ],
}

const IssuanceOfProductionProcesses = () => {


  const location = useLocation();
  let navigate = useNavigate()
  const rowData = location?.state
  if (!rowData) { navigate('/ListProduct'); }
  console.log('ali', rowData)

  const [userName, setUserName] = useState('')

  useEffect(() => {
    setUserName(authProvider.getIdentity().userName)
  }, []);



  console.log(userName);
  const handleChange = (row, formik) => {
    console.log('row', row);
    console.log('row', formik)
    formik.setFieldValue('FanniNo', row.FanniNo)
    formik.setFieldValue('FarsiP', row['FarsiP'])
    formik.setFieldValue('ShomareMarhale', row['ShomareMarhale'])
    formik.setFieldValue('Tedad', row['Tedad'])
    formik.setFieldValue('MarhaleCode', row['MarhaleCode'])
    formik.setFieldValue('MarhaleName', row['MarhaleName'])
    formik.setFieldValue('ZamanTahvil', row['ZamanTahvil'])
    formik.setFieldValue('IdMarhaleSefaresh', row['IdMarhaleSefaresh'])
    formik.setFieldValue('idMarhale', row['idMarhale'])


  }


  const handleNameDevice = (row, formik) => {
    formik.setFieldValue('TTitle', row.TTitle)
  }

  const initialValues = {
    ShomareSefaresh: '',//شماره سفارش
    FanniNo: '',//شماره فنی قطعه
    FarsiP: '',//شرح فنی
    Tedad: '',
    ShomareMarhale: '',//شماره مرحله
    MarhaleName: '',
    DateFaal: '',
    IdMarhaleTolid: '',
    MarhaleCode: '',
    MarhaleName: '',
    ZamanTahvil: '',
    Code: '',
    TTitle: '',
    IdMarhaleSefaresh: '',
    zaribTabdil: '',
    TeddadZarb: '',
    LastVaziat: '',
    TedadShoro: '',
    TedadKhateme: '',
    TedadTolid: '',
    saatShoro: '',
    StartDate: '',
    EndDateTime: '',
    EndDate: '',
    saatKhateme: '',

    paletNumber: '',
    IdMarhaleTolid: rowData.IdMarhaleTolid,


  }

  const validationSchema = Yup.object({
    zaribTabdil: Yup.number().required('عدد وارد کنید'),
    TeddadZarb: Yup.number().required('عدد وارد کنید'),
    LastVaziat: Yup.number().required('عدد وارد کنید'),
    TedadShoro: Yup.number().required('عدد وارد کنید'),
    TedadKhateme: Yup.number().required('عدد وارد کنید')
  })
  const onSubmit = (values) => {

    console.log(momentService.getHHMMInt(values.saatShoro));
    appService.saveProductList({
      IdMarhaleTolid: values.IdMarhaleTolid,
      ShomareSefaresh: values.ShomareSefaresh,
      FanniNo: values.FanniNo,
      FarsiP: values.FarsiP,
      zaribTabdil: values.zaribTabdil,
      StartDate: values.StartDate,
      saatShoro: momentService.getHHMM(values.saatShoro),
      EndDate: values.EndDate,
      saatKhateme: momentService.getHHMM(values.saatKhateme),
      TeddadZarb: values.TeddadZarb,
      LastVaziat: values.LastVaziat,
      TedadTolid: values.TedadTolid,
      TedadShoro: values.TedadShoro,
      TedadKhateme: values.TedadKhateme,
      ShomareMarhale: values.ShomareMarhale,
      IdMarhaleSefaresh: values.IdMarhaleSefaresh,
      Tedad: values.Tedad,
      MarhaleCode: values.MarhaleCode,
      idMarhale: values.idMarhale,
      MarhaleName: values.MarhaleName,
      Code: values.Code,
      TTitle: values.TTitle,
      ZamanTahvil: values.ZamanTahvil,
      paletNumber: values.paletNumber,
      userName: userName

    }).then((res) => {
      if (res.data.statusResult === 0) {
        publicService.showNotification({ message: "ثبت اطلاعات با موفقعیت انجام شد.", type: "success" })

      }

    }).catch((res) => {
      publicService.showNotification({ message: "خطا در ثبت اطلاعات", type: "danger" })
    })

  }
  return (
    <div>
      <ReactNotifications />
      <CRow className="justify-content-center">

        <CCol lg={12} md={12} sm={12}>

          <CCard className="mx-12">

            <CCardBody className="p-4" >
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                  formik => {
                    return (
                      <Form>
                        <h4 style={{ textAlign: 'center' }} >اطلاعات کنترل تولید روزانه</h4>
                        <Box sx={{ flexGrow: 1 }} >
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={12} style={{ paddingTop: '0px' }}>
                              <hr style={{ pading: '0px' }} />
                            </Grid>

                            <Grid item xs={12} md={3}>
                              <InputPickList name='ShomareSefaresh' label='شماره سفارش'
                                valueId='ShomareSefaresh'
                                valueShow='ShomareSefaresh'
                                formik={formik}
                                pickListInfo={productPickList}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={12} md={7}>
                              <InputText hidden={true} name='IdMarhaleTolid' type='text' />
                            </Grid>
                            <Grid item xs={12} md={2}>
                          
                              <Link to={"/issuanceOfProductionProcessesQr"} style={{paddingLeft: 13, textDecoration: 'none'}}>

                                خواندن از QR کد
                              </Link>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <InputText name='FanniNo' disabled={true} type='text' label='شماره فنی قطعه' />
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <InputText name='FarsiP' disabled={true} label='شرح فنی' type='text' />
                            </Grid>

                            <Grid item xs={12} md={4}>
                              <InputText name='ShomareMarhale' disabled={true} label='شماره مرحله سفارش' type='text' />
                            </Grid>
                            <Grid item xs={12} md={1}>
                              <InputText hidden={true} name='IdMarhaleSefaresh' type='text' />
                            </Grid>
                            <Grid item xs={12} md={7}>
                              <InputText name='Tedad' disabled={true} label='تعداد قطعه در مرحله' type='text' />
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <InputText name='MarhaleCode' disabled={true} label='کد مرحله ساخت قطعه' type='text' />
                            </Grid>
                            <Grid item xs={12} md={1}>
                              <InputText hidden={true} name='idMarhale' type='text' />
                            </Grid>
                            <Grid item xs={12} md={7}>
                              <InputText name='MarhaleName' disabled={true} label='شرح مرحله' type='text' />
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <InputPickList name='Code' label='کد و نام دستگاه'
                                valueId='Code'
                                valueShow='Code'
                                formik={formik}
                                pickListInfo={nameDivice}
                                onChange={handleNameDevice}
                              />
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <InputText name='TTitle' disabled={true} label='شرح دستگاه' type='text' />
                            </Grid>
                            <Grid item xs={12} md={12}>
                              <InputText name='ZamanTahvil' disabled={true} label='زمان تحویل مورد انتظار' type='text' />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <InputDate name='StartDate' label='از تاریخ' type='text' />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <InputTime name='saatShoro' label='از ساعت' type='text' />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <InputDate name='EndDate' label='تا تاریخ' type='text' />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <InputTime name='saatKhateme' label='تا ساعت' type='text' />
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <InputText name='zaribTabdil' disabled={false} label='ضریب تبدیل' type='text' />
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <InputText name='TeddadZarb' disabled={false} label='تعداد ضرب در ساعت' type='text' />
                            </Grid>

                            <Grid item xs={12} md={3}>
                              <InputText name='LastVaziat' disabled={false} label='آخرین وضعیت مرحله' type='text' />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <InputText name='TedadShoro' disabled={false} label='تعداد شروع' type='text' />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <InputText name='TedadKhateme' disabled={false} label='تعداد خاتمه' type='text' />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <InputText name='TedadTolid' disabled={false} label='تعداد تولید' type='text' />
                            </Grid>
                            <Grid item xs={12} md={12}>
                              <InputText name='paletNumber' disabled={false} label='شماره پالت و توضیحات' type='text' />
                            </Grid>

                            <Grid item xs={12} md={1}>
                              <CButton color="primary" className="px-4" type="submit" >
                                تایید
                              </CButton>
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

    </div>

  );
}

export default IssuanceOfProductionProcesses;
