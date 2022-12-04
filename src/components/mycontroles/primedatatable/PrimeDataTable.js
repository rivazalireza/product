import React ,{useRef, useState }from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ContextMenu } from 'primereact/contextmenu';

import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './PrimeDataTable.scss'

import { Ripple } from 'primereact/ripple';
import { Dropdown } from 'primereact/dropdown';
import Button from '@mui/material/Button';
import { FilterMatchMode } from 'primereact/api';
import { Box, Grid, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExportIcon from '@mui/icons-material/FileUpload';
import { CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilActionUndo, cilReload } from '@coreui/icons';


const dropdownOptions = [
  { label: 5, value: 5 },
  { label: 10, value: 10 },
  { label: 50, value: 50 },
  { label: 100, value: 100 },
];
const PrimeDataTable = ({responsiveLayout,onRelaod,headerColor,paginator,firstTemplate,menuModel,addClick,excelClick,title,multiSelect,filterDisplay,dataKey,pageSize,rows,totalRecords,columns,lazyParams,setLazyParams,onRowSelect,handleClose,...rest}) => {
  
    const curentRef = useRef(0);
    const [selectedRow, setSelectedRow] = useState(null);
    // const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    // const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;



    const onSelectionChange = (value) => {
        setSelectedRow(value);
        if(onRowSelect)
          onRowSelect(value);
      }
    const MyPaginatorTemplate = {
        layout: ' RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport',
        'RowsPerPageDropdown': (options) => {
          return (
            <React.Fragment>
              <Dropdown style={{maxWidth:'70px',height:'30px',marginTop:'3px'}} value={options.value} options={dropdownOptions} onChange={options.onChange} />
            </React.Fragment>
          )},
        'FirstPageLink': (options) => {
          return (
            <Button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
              <span className="p-1" style={{ fontFamily: 'vazir' }}> <i className="pi pi-angle-double-right" /></span>
              <Ripple />
            </Button>
          )},
        'PrevPageLink': (options) => {
          return (
            <Button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
              <span className="p-1" style={{ fontFamily: 'vazir' }}><i className="pi pi-angle-right" /></span>
              <Ripple />
            </Button>
          )},
        'NextPageLink': (options) => {
          return (
            <Button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
              <span className="p-1" style={{ fontFamily: 'vazir' }}><i className="pi pi-angle-left" /></span>
              <Ripple />
            </Button>
          )},
        'LastPageLink': (options) => {
          return (
            <Button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
              <span className="p-1" style={{ fontFamily: 'vazir' }}><i className="pi pi-angle-double-left" /></span>
              <Ripple />
            </Button>
          )},
        'CurrentPageReport': (options) => {
          return (
            <span style={{ color: 'darkblue', userSelect: 'none', marginRight: '3px' }}>
               {options.first} تا  {options.last} از {options.totalRecords}
            </span>
          )}
      };
    const matchModes = [
      { label: 'بخشی از متن', value: FilterMatchMode.CONTAINS },    
      { label: 'شروع متن ', value: FilterMatchMode.STARTS_WITH },  
      { label: 'مساوی', value: FilterMatchMode.EQUALS },
      { label: 'مخالف', value: FilterMatchMode.NOT_EQUALS },
      { label: 'بزرگتر', value: FilterMatchMode.GREATER_THAN },
      { label: 'بزرگتر مساوی', value: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
      { label: 'کوچکتر', value: FilterMatchMode.LESS_THAN },
      { label: 'کوچکتر مساوی', value: FilterMatchMode.LESS_THAN_OR_EQUAL_TO },
      ];
    
    
      const filterClearTemplate = (options) => {
        return <Button variant="contained" style={{ fontFamily: 'Vazir' }} onClick={options.filterClearCallback} color="error" >پاک</Button>
      }
    
      const filterApplyTemplate = (options) => {
        return <Button variant="contained" style={{ fontFamily: 'Vazir' }} onClick={options.filterApplyCallback} color="success" >اعمال</Button>
      }
    const filterTemplate = (options) => {
      return <input type="text" className="form-control" id={options.field} 
      style={{minWidth:'80px'}}
      value={options.value? options.value : ''} 
        onChange={(e) => {options.filterCallback(e.target.value, options.index)}}
        onKeyDown={(e)=> {
           if (e.which === 13) {
              options.filterApplyCallback(e.target.value, options.index)
              e.preventDefault(); 
           }
        }}
        />
      }
    let dynamicColumns = columns?.map((col,i) => {
        if(col.bodyTemplate)
          return <Column key={col.field} header={col.header} body={col.bodyTemplate}></Column>
        else 
          return <Column 
          key={col.field} field={col.field} header={col.header} sortable={col.sortable} filter={col.filter} 
          filterPlaceholder={col.filterPlaceholder? col.filterPlaceholder : col.header}
          filterMatchModeOptions={matchModes} showFilterOperator={false} showAddButton={true} 
          bodyStyle={col.bodyStyle? col.bodyStyle:{textAlign:'center'}}
          headerStyle={col.headerStyle? col.headerStyle:{textAlign:'center'}}
          // alignHeader='right'
          filterClear={filterClearTemplate} 
          filterApply={filterApplyTemplate}
          filterElement={col.filter? filterTemplate : null}
          
          />;
    });
    
    const onPage = (event) => {
      setLazyParams(event);
    }
    const onFilter = (event) => {
      event['first'] = 0;
      setLazyParams(event);
    }
    const onSort = (event) => {
      setLazyParams(event);
    }
   
    const exportExcel = () => {
      if(excelClick)
        excelClick()
    }
    const onAddClick = () => {
      if(addClick)
        addClick()
    }
    
    const headerTemplate = () => {
      return (
        <Box sx={{p: 1,bgcolor: headerColor? headerColor : '#88a9cb' ,borderRadius:0}}  >
          <Stack direction="row-reverse" spacing={1}>
            <Grid container>
              <Grid item xs={1} md={1}>
                <CIcon icon={cilReload}   style={{ marginTop: '7px' ,cursor:'pointer',marginRight:'5px',color:'yellow'}} onClick={()=>{ if(onRelaod)onRelaod()}} />
              </Grid>
              <Grid item xs={8} md={8}>
                <h5 style={{textAlign:'center',marginTop:'1px'}}>{title}</h5>
              </Grid>
              <Grid item xs={12} md={3} >
                  {addClick &&( <Button variant="contained" style={{float:'left', fontFamily: 'Vazir' }} color="success" onClick={onAddClick} endIcon={<AddIcon />} >ایجاد</Button>)}
                  {excelClick &&(<Button variant="contained" style={{ float:'left',fontFamily: 'Vazir' }} onClick={exportExcel} endIcon={<ExportIcon />}>اکسل </Button>)}
                  {handleClose && (
                    <CButton size='sm' style={{float:'left',cursor:'pointer',backgroundColor:'white',color:'red'}}  onClick={handleClose}>
                      برگشت   
                      <CIcon icon={cilActionUndo} />
                    </CButton>
                  )}
              
              </Grid>
          
          </Grid>
          </Stack>
        </Box>
      )
    }
   
    return (
      <>
      {menuModel &&  menuModel!=undefined &&
        (<ContextMenu model={menuModel} ref={curentRef} 
        // onHide={() => setSelectedRow(null)} 
        />)}
        <DataTable 
            paginatorTemplate={MyPaginatorTemplate}
            responsiveLayout={multiSelect?'scroll': responsiveLayout?responsiveLayout:'scroll'}
            rows={lazyParams.rows}
            header={headerTemplate}
            value={rows}
            totalRecords={totalRecords}
            dataKey={dataKey}
            lazy={true}
            paginator={paginator===undefined?true:paginator}
            showGridlines={true}
            filterDisplay={filterDisplay}
            size="small"
            selectionMode="single"
            emptyMessage="رکوردی یافت نشد"
            sortField={lazyParams.sortField} 
            sortOrder={lazyParams.sortOrder}
            filters={lazyParams.filters}
            first={lazyParams.first}
            onSelectionChange={e => onSelectionChange(e.value)}
            selection={selectedRow}
            contextMenuSelection={selectedRow}
            onContextMenuSelectionChange={e => {
              if(menuModel && menuModel!=undefined)
                onSelectionChange(e.value)
            }
            }
            onContextMenu={e => {
              if(menuModel && menuModel!=undefined)
                curentRef.current.show(e.originalEvent)
            }
            }
            onPage={onPage}
            onFilter={onFilter}
            onSort={onSort} 
            
            {...rest}
            >
            {multiSelect && ( <Column selectionMode="multiple" headerStyle={{width:'10px'}} />) }
            {dynamicColumns}
            </DataTable>
      </>
      
    );
}

export default PrimeDataTable