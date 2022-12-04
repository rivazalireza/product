import React, { useState  } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

import {  useQuery } from '@tanstack/react-query'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import PrimeDataTable from 'src/components/mycontroles/primedatatable/PrimeDataTable';
import CIcon from '@coreui/icons-react';
import { cilCheck } from '@coreui/icons';
import appService from 'src/services/AppService';

function ListForm({listInfo,firstFilter,handleSelect,handleClose,handleSuccess,addClick,onRowSelect,menuModel,permissionName,reload, ...rest}) {
    const [lazyParams, setLazyParams] = useState(listInfo.lazyParams);    
    const [masterData, setMasterData] = useState({rows:[],totalRecords:0});
    const [myRelaod,setMyRelaod]=useState(false)
    const [downloding, setDownloading] = useState(false);
    
	const onSuccess=(res)=>{
		if(res.data.statusResult===0){
            if(handleSuccess)
                handleSuccess(res.data,lazyParams)
            setMasterData({rows:res.data.rows,totalRecords:res.data.totalRecords})
        }
	}
	const { isLoading, isError, error, data  } = useQuery([listInfo.api, lazyParams,firstFilter,reload,myRelaod], 
        async () => appService.postApi(listInfo.api,{lazyParams:lazyParams,firstFilter:firstFilter}),
	{
		onSuccess,
        refetchOnWindowFocus:false,
    
	})
    const onRelaod=()=>{
        setMyRelaod(!myRelaod)
    }
    const onDownloded=()=>{
        setDownloading(false)
    }
    const onExcelClick=()=>{
        if(listInfo.tableName){
            
            confirmDialog({
                message: 'آیا از ایجاد فایل مطمئن هستید؟',
                header: 'ایجاد فایل',
                // icon: 'pi pi-info-circle',
                acceptClassName: 'p-button-success',
                acceptLabel:'بله',
                rejectLabel:'خیر',
                closeOnEscape:true,
                accept: () => { 
                    setDownloading(true)
                    let lazyP=JSON.parse(JSON.stringify(lazyParams))
                    lazyP.rows=masterData.totalRecords;
                    appService.downloadFile({lazyParams:lazyP,tableName:listInfo.tableName,columns:listInfo.columns},onDownloded)     
                },
                reject: () => {},
                onHide:()=>{}
            });
            
        }
    }
    // if (isLoading ) return 'در حال خواندن اطلاعات ...'
    if (isError) return 'خطا: ' + error.message
    const onRowDoubleClick=(event)=>{
        if(handleSelect)
            handleSelect(event.data);
    }
   const selectBodyTemplate = (rowData) => {
    return (
        <>
        <span size='sm' style={{cursor:'pointer',color:'green'}} 
            onClick={()=>{
                if(handleSelect)
                    handleSelect(rowData)
            }}
            >
            <CIcon icon={cilCheck} />
        </span>
        </>
        
    )
    }
    
    var selectTemplateColumns=[
        { field: 'SelectedField', header: 'انتخاب', bodyTemplate:(row)=>{return selectBodyTemplate(row);}},
    ]
    if(!handleClose || handleClose===undefined)
        selectTemplateColumns=[]
    const merged = [...selectTemplateColumns, ...listInfo.columns];
    return (
         <React.Fragment>
            <ReactNotifications />
            <ConfirmDialog />
            
           <PrimeDataTable 
            {...rest}
            menuModel={menuModel}
            columns={merged}  
            dataKey={listInfo.id} 
            title={listInfo.title}
            excelClick={listInfo.excel? onExcelClick:null}
            addClick={addClick? addClick:null}
            onRowSelect={onRowSelect}
            multiSelect={listInfo.multiSelect? true:false}
            
            handleClose={handleClose}
            setLazyParams={setLazyParams}
            lazyParams={lazyParams} 
            loading={isLoading}
            value={masterData.rows} 
            totalRecords={masterData.totalRecords} 
            filterDisplay="row" 
            onRowDoubleClick={onRowDoubleClick}
            headerColor={listInfo.headerColor}
            onRelaod={onRelaod}
            resizableColumns={listInfo.resizableColumns===undefined? true:listInfo.resizableColumns }
            />
             {downloding  ? (<CircularProgress color="inherit" size={40} />) : null}
        </React.Fragment>
    )
}

export default ListForm




