import React, { useState ,useEffect } from 'react';
import {  useQuery } from '@tanstack/react-query'
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import PrimeDataTable from 'src/components/mycontroles/primedatatable/PrimeDataTable';
import CIcon from '@coreui/icons-react';
import { cilCheck } from '@coreui/icons';
import appService from 'src/services/AppService';

function PickListForm({pickListInfo,firstFilter,handleSelect,handleClose}) {
  
  const [selectedRow,setSelectedRow]=useState([])
  const [lazyParams, setLazyParams] = useState(pickListInfo.lazyParams);    
  const [masterData, setMasterData] = useState({rows:[],totalRecords:0});
  
	const onSuccess=(res)=>{
		if(res.data.statusResult!=2){
            setMasterData({rows:res.data.rows,totalRecords:res.data.totalRecords})
    }
	}
	const { isLoading, isError, error, data } = useQuery(['pickList', lazyParams], 
        async () => appService.postApi(pickListInfo.api,{lazyParams:lazyParams,firstFilter:firstFilter}),
	{
		onSuccess,
        refetchOnWindowFocus:false,
    
	})
  // if (isLoading ) return 'در حال خواندن اطلاعات ...'
  if (isError) return 'خطا: ' + error.message

    const onSelectedRow=(selectedRow)  =>{
        setSelectedRow(selectedRow)
    }
    const onCancelClick = () =>{
        handleClose()
    }
    const selectBodyTemplate = (rowData) => {
    return (
        <>
        <span size='sm' style={{cursor:'pointer',color:'green'}} 
            onClick={()=>{
                handleSelect(rowData)
            }}
            >
            <CIcon icon={cilCheck} />
        </span>
        </>
        
    )
    }
    const onRowDoubleClick=(event)=>{
        handleSelect(event.data);
    }
    const templateColunms=[
    { field: 'Select', header: 'انتخاب',  bodyTemplate:(row)=>{return selectBodyTemplate(row);}},
    ]
    
    return (
        <div>
        <ReactNotifications />
        <PrimeDataTable 
        firstTemplate
        templates={templateColunms} 
        pickList
        dataKey={pickListInfo.id} 
        title={pickListInfo.title}
        excel={false}
        loading={isLoading}
        onCancelClick={onCancelClick}
        onRowSelect={onSelectedRow}
        value={masterData.rows} 
        totalRecords={masterData.totalRecords} 
        lazyParams={lazyParams} 
        setLazyParams={setLazyParams}
        responsiveLayout='Scroll'
        filterDisplay="row" 
        columns={pickListInfo.columns}  
        onRowDoubleClick={onRowDoubleClick}
        scrollHeight='560px'
        />
        </div>
    )
}

export default PickListForm




