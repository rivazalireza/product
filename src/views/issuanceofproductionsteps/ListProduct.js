import React, { useState } from 'react'

import { Box, Grid } from '@mui/material';
import ListForm from 'src/components/mycontroles/mui/ListForm';
import momentService from 'src/services/MomentService';
import {IconButton,Stack } from '@mui/material';
import { BorderColor } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';



const ListProduct = () => {
  let navigate = useNavigate()

  const editClick = (rowData) => {
    console.log(rowData)
    navigate('/IssuanceOfProductionProcesses', { state: rowData })
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Stack direction="row" alignItems="center" spacing={1.2}  >
          <IconButton  aria-label="edit" size="small" color="primary" onClick={() => { editClick(rowData) }}>  <BorderColor fontSize="small" />      </IconButton>
        </Stack>
      </React.Fragment>
    );
  }

  const IntroBankList = {
    title: 'اطلاعات کنترل تولید',
    api: '/product/getProductListHeader',
    id: 'ShomareSefaresh',
    code: 'ShomareSefaresh',
    lazyParams: { sortField: 'ShomareSefaresh', rows: 10, first: 0, page: 1, sortOrder: -1 },
    columns: [
      { field: 'ShomareSefaresh', header: 'شماره سفارش', filter: true, sortable: true },
      { field: 'Tedad', header: 'تعداد', filter: true, sortable: true },
      { field: 'FanniNo', header: 'شماره فنی قطعه', filter: true, sortable: true },
      { field: 'FarsiP', header: 'شرح فنی', filter: true, sortable: true },
      { field: 'ShomareMarhale', header: 'شماره مرحله سفارش', filter: true, sortable: true },
      { field: 'MarhaleCode', header: 'کد مرحله', filter: true, sortable: true },
      { field: 'MarhaleName', header: 'شرح مرحله', filter: true, sortable: true },
  
    ],
  }
  
  const InitPaymentSumPrivateList = {
    title: 'کنترل تولید',
    api: '/product/getControlTolid',
    id: 'CodeDastgah',
    lazyParams: { sortField: 'CodeDastgah', rows: 10, first: 0, page: 1, sortOrder: -1 },
    columns: [
      { field: 'StartDateTime', header: 'تاریخ شروع', sortable: true  },
      { field: 'SaatShoro', header: 'از شروع' },
      { field: 'EndDateTime', header: 'تاریخ پایان'},
      { field: 'SaatKhateme', header: 'تا ساعت' },
      { field: 'ZaribTabdil', header: 'ضریب تبدیل'},
      { field: 'TedadZarb', header: 'تعداد ضرب' },
      { field: 'LastVaziat', header: 'آخرین وضعیت' },
      { field: 'TedadShoro', header: 'تعداد شروع' },
      { field: 'CodeDastgah', header: 'کد دستگاه'},
      { field: 'Edit', header: 'ویرایش',  bodyTemplate:(row)=>{return actionBodyTemplate(row);}},
    
  
    ]
  }
  const [firstFilterItroBank, setfirstFilterItroBank] = useState('1=0');
  const onRowSelect = (rowSelected) => {
    console.log('rowSelected', rowSelected.IdMarhaleTolid)
    setfirstFilterItroBank('IdMarhaleTolid=' + rowSelected.IdMarhaleTolid)
  }
 
  return (<>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
       
        <Grid item xs={12} md={12}>
          <ListForm listInfo={IntroBankList} onRowSelect={onRowSelect}  />
        </Grid>

        <Grid item xs={12} md={12}>
          <ListForm listInfo={InitPaymentSumPrivateList} firstFilter={firstFilterItroBank} />
        </Grid>
      </Grid>
    </Box>
   
                 
  </>);
}

export default ListProduct;
