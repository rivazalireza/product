import React, { useState,useEffect  } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
// import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';
import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {  useQuery } from 'react-query'
import appService from 'src/services/AppService';
import CIcon from '@coreui/icons-react';
import { cilDelete, cilPencil, cilPlus, cilRecycle, cilSearch } from '@coreui/icons';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MyControl from 'src/components/mycontroles/MyControl';
import { CButton, CCard, CCardBody, CCol, CRow } from '@coreui/react';
import publicService from 'src/services/PublicService';
import { ReactNotifications } from 'react-notifications-component';
import momentService from 'src/services/MomentService';
import MyDataTable from 'src/components/mycontroles/mydatatable/MyDataTable';
import 'src/scss/_table.scss'
import InputComboBox from 'src/components/mycontroles/mui/InputComboBox';
function RequestList(props) {
  const [currentRow,setCurrentRow]= useState(null);
  const getRowSelectedClass=(row)=>{
    return currentRow && row && currentRow.RequestId===row.RequestId ? "rowselected" : "";
  }
  // ------------------------
  const today=momentService.jalali(new Date())
  const mountList =[
      {value:'01',label:'فروردین'},
      {value:'02',label:'اردیبهشت'},
      {value:'03',label:'خرداد'},
      {value:'04',label:'تیر'},
      {value:'05',label:'مرداد'},
      {value:'06',label:'شهریور'},
      {value:'07',label:'مهر'},
      {value:'08',label:'آبان'},
      {value:'09',label:'آذر'},
      {value:'10',label:'دی'},
      {value:'11',label:'بهمن'},
      {value:'12',label:'اسفند'},
    ]
    const yearList =[
      {value:'1401',label:'1401'},
      {value:'1400',label:'1400'},
      {value:'1399',label:'1399'},
      {value:'1398',label:'1398'},
      {value:'1397',label:'1397'},
      {value:'1396',label:'1396'},
      {value:'1395',label:'1395'},
    ]
    const filterRequestListType=[
      {value:'9',label:'کارتابل جاری'},
      {value:'8',label:'مشاهده کلی'},
    ]
    const rowDataEmpty ={
      RequestId: 0,
      PrsnId:'',
      FullName:'',
      RequestDate:today,
      RequestTypeName:'',
      RequestTypeId:'1',
      RequestModeName:'',
      RequestModeRef:'1',
      StartDate:today,
      EndDate:today,
      StartTimeHM:'',
      EndTimeHM:'',
      StatusApplyDescr:'',
      UnitOrgName:'',
      Comment:'',
  }
  
  let navigate = useNavigate()
	const [rows, setRows] = useState([]);
  const [currentMM, setcurrentMM] = useState('');
  const [currentYY, setcurrentYY] = useState('');
  const [filterRequestList,setfilterRequestList]=useState('9')
  const [yy,setYY]=useState('')
  const [mm,setMM]=useState('')
  
	const onSuccess=(res)=>{
		if(res.data.statusResult!=2){
      setRows(res.data.rows)
      setcurrentMM(res.data.CurrentYYMM.CurrentMM)
      setcurrentYY(res.data.CurrentYYMM.CurrentYY)
      if(yy===''){
        setYY(res.data.CurrentYYMM.CurrentYY)
        setMM(res.data.CurrentYYMM.CurrentMM)
      }
      
    }
	}
	const { isLoading, isError, error, data } = useQuery(['getRequestList'],()=> appService.getRequestList({yy:yy,mm:mm,filterRequestList:filterRequestList}),
	{
		onSuccess,
    // refetchOnMount:false,
    // refetchOnWindowFocus:false,
	})
 
   if (isLoading ) return 'در حال خواندن اطلاعات ...'
   if (isError) return 'خطا: ' + error.message
   if(data.data.statusResult===2){return <h5 style={{color:'red',textAlign:'center'}}>خطا در خواندن اطلاعات</h5>}
  const initialValues = {
    mm: data.data.CurrentYYMM.CurrentMM,
    yy: data.data.CurrentYYMM.CurrentYY,
    filterRequestList:'9',
  }
   
  
  const reloadData = (values) => {
    appService.getRequestList({yy:values.yy,mm:values.mm,filterRequestList:values.filterRequestList}).then((res)=>{
      if(res.data.statusResult===0){
        setRows(res.data.rows)
      }
      else {
        publicService.showNotification({message:res.data.message,type:"danger"})
        
      }
    }).catch((res) => {
      publicService.showNotification({message:"خطا در برقراری ارتباط با شبکه",type:"danger"})
    })
  }
const addClick=()=>{
  navigate('/request', { state: rowDataEmpty })
}

const editClick=(rowData)=>{
  navigate('/request', { state: rowData })
}


const editBodyTemplate = (rowData) => {
  return (
      <CButton size='sm' style={{cursor:'pointer',backgroundColor:'white',color:'blue'}} disabled={ rowData.StatusApply!=0 } onClick={()=>{editClick(rowData)}}>
        <CIcon icon={cilPencil} />
      </CButton>
  )
}
const deleteClick=(rowData)=>{
  appService.requestDelete({RequestId:rowData.RequestId}).then((res)=>{
    if(res.data.statusResult===0){
      publicService.showNotification({message:'حذف با موفقیت انجام شد',type:"success"});
      reloadData({yy:yy,mm:mm,filterRequestList:filterRequestList})
    }
    else {
      publicService.showNotification({message:res.data.message,type:"danger"})
    }
  }).catch((res) => {
    publicService.showNotification({message:"خطا در برقراری ارتباط با شبکه",type:"danger"})
  })
}
const cellStyle=(row,col)=>{
  if(col.field==='StatusApplyDescr' && row.StatusApplyDescr==='عدم تاييد')
     return  {textAlign:'center',color:'red'} ;
  return  {textAlign:'center'}
}
const deleteBodyTemplate = (rowData) => {
  return (
        <CButton  size='sm' style={{cursor:'pointer',backgroundColor:'white',color:'red'}} disabled={ rowData.StatusApply!=0 } onClick={()=>{deleteClick(rowData)}} >
          <CIcon icon={cilDelete} />
      </CButton>
  )
}
const validationSchema = Yup.object({

})

const columns=[
  { field:"RequestDate",  header:"تاریخ درخواست" , style: {width: '5%',textAlign:'center'} },
  { field:"RequestTypeName", header:"درخواست",  style: {width: '5%',textAlign:'center'} },
  { field:"RequestModeName", header:"نوع درخواست",  style: {width: '5%',textAlign:'center'} },
  { field:"StartDate"  , header:"از تاریخ",  style: {width: '3%',textAlign:'center'} },
  { field:"EndDate"  , header:"تا تاریخ",  style: {width: '3%',textAlign:'center'} },
  { field:"StartTimeHM"  , header:"از ساعت",  style: {width: '3%',textAlign:'center'} },
  { field:"EndTimeHM" , header:"تا ساعت" ,  style: {width: '3%',textAlign:'center'} },
  { field:"StatusApplyDescr"  , header:"وضعیت",  style: {width: '7%',textAlign:'center'} },
  { field: 'Edit', header: 'اصلاح',  style: {width: '1%',textAlign:'center'} ,bodytemplate:(row,col)=>{return editBodyTemplate(row);}},
  { field: 'Delete', header: 'حذف',  style: {width: '1%',textAlign:'center'} ,bodytemplate:(row,col)=>{return deleteBodyTemplate(row);}},
]
	return (
		<div>
       <CRow className="justify-content-center" >
          <ReactNotifications />
          <CCol lg={12} md={12}  sm={12}>
          
            <CCard className="mx-12">
              <CCardBody className="p-4" >
              <Formik initialValues={initialValues} validationSchema={validationSchema} > 
                    {
                        formik => {
                            return(
                                <Form> 
                                  <Box sx={{ flexGrow: 1}}>
                                  <Grid container spacing={2}>
                                    
                                  <Grid item xs={12} md={2}>
                                  <InputComboBox name = 'filterRequestList'  label = 'نوع کارتابل' type = 'text'  options={filterRequestListType}
                                      onchange={(value)=>{
                                        setfilterRequestList(value);
                                        reloadData(formik.values);
                                      }}
                                      />
                                    </Grid>
                                    <Grid item xs={6} md={2}>
                                    <InputComboBox name = 'yy' value={yy} label = 'سال' type = 'text'  options={yearList}
                                      onchange={(value)=>{
                                        setYY(value);
                                        reloadData(formik.values);
                                      }}
                                      />
                                    </Grid>
                                    <Grid item xs={6} md={2}>
                                    <InputComboBox name = 'mm' value={mm} label = 'ماه' type = 'text'  options={mountList}
                                      onchange={
                                        (value)=>{
                                           setMM(value);
                                           reloadData(formik.values);
                                        }
                                    }
                                      />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                    <span style={{color:'red',fontSize:'14px',textAlign:'center'}}>
                                      توجه : 
                                      تقاضاي مرخصي روزانه، بايد 24 ساعت قبل از شروع مرخصي در سيستم ثبت و به اداره کل کارگزيني ارجاع گردد.
                                    </span>
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
      
        {/* <DataTable
          header={
              <Card className="text-center" style={{backgroundColor:'rgb(67 107 165)'}}>
              <CardContent style={{color:'white'}}>
                ثبت درخواست 
                { 
                <Button variant="outlined" style={{minWidth:'80px',float:'left',fontFamily:'vazir', color:'darkblue',backgroundColor:'white'}} onClick={addClick}>
                  <span style={{marginLeft:'5px'}}> ایجاد </span>
                  <CIcon icon={cilPlus}  size="xl" />
                </Button>
                }
              </CardContent>
          </Card>
          }
          selectionMode="single" 
          emptyMessage='رکوردی یافت نشد'
          value={rows}
          resizableColumns   
          responsiveLayout="stack"
          size="small"
          rowHover 
          onRowClick={(e)=>{setCurrentRow(e.data)}}
          >
          <Column  field="RequestDate"  header="تاریخ درخواست" sortable={true}/>
          <Column  field="RequestTypeName" header="درخواست"  sortable={false} ></Column>
          <Column  field="RequestModeName" header="نوع درخواست"  sortable={false} ></Column>
          <Column  field="StartDate"  header="از تاریخ"  sortable={true}/>
          <Column  field="EndDate"  header="تا تاریخ"  sortable={false}/>
          <Column  field="StartTimeHM"  header="از ساعت"  sortable={false}/>
          <Column  field="EndTimeHM"  header="تا ساعت"  sortable={false}/>
          <Column  field="StatusApplyDescr"  header="وضعیت" sortable={false}/>
          <Column  header="اصلاح" body={editBodyTemplate}></Column>
          <Column  header="حذف" body={deleteBodyTemplate}></Column>
        </DataTable> */}
        <Card className="text-center" style={{backgroundColor:'rgb(67 107 165)'}}>
              <CardContent style={{color:'white'}}>
                ثبت درخواست 
                { 
                <Button variant="outlined" style={{minWidth:'80px',float:'left',fontFamily:'vazir', color:'darkblue',backgroundColor:'white'}} onClick={addClick}>
                  <span style={{marginLeft:'5px'}}> ایجاد </span>
                  <CIcon icon={cilPlus}  size="xl" />
                </Button>
                }
              </CardContent>
          </Card>
        <MyDataTable columns={columns}  rows={rows} keyname='RequestId' cellstyle={cellStyle}/>
    </div>
	);
}

export default RequestList;