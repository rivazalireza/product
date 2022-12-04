import React,{useState } from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from "@mui/icons-material/Search";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ListForm from './ListForm';
import appService from 'src/services/AppService';




function InputPickList(props) {
  const { name, label, valueId, valueShow,firstFilter,onChange,formik,pickListInfo, ...rest } = props
  const [open,setOpen] = useState(false);
  const [pickList,setPickList]=useState({value:formik.values[name],result:formik.values[valueShow]})
  
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('100%');
  const handleClickShowModal = () => {
    pickListInfo.lazyParams.filters={}
    pickListInfo.columns?.map((col)=>{
      pickListInfo.lazyParams.filters[col.field]= { value:null , matchMode: 'contains' }
    })
    if(formik.values[name]!=''){
      pickListInfo.lazyParams.filters[pickListInfo.code]= { value:formik.values[name] , matchMode: 'contains' }
    }
    setOpen(true);
  }

  const handleSelect = (rowSelected) => {
    formik.setFieldValue(name,rowSelected[pickListInfo.code])
    formik.setFieldValue(valueId,rowSelected[pickListInfo.id])
    formik.setFieldValue(valueShow,rowSelected[pickListInfo.labelShow])
    setPickList({value:rowSelected[pickListInfo.code],result:rowSelected[pickListInfo.labelShow]})
    setOpen(false)
    if(onChange)
      onChange(rowSelected,formik)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const onBlurField = () => {

    if(formik.values[name]===''){
      setPickList({value:'',result:''})
    }else {
      if(formik.values[name]!=pickList.value){
        const lazyParam = JSON.parse(JSON.stringify(pickListInfo.lazyParams))
        lazyParam.filters= {}
        lazyParam.filters[pickListInfo.code]= { value:formik.values[name] , matchMode: 'equals' }
        appService.postApi(pickListInfo.api,{lazyParams:lazyParam,firstFilter:firstFilter}).then((res)=>{
          if(res.data.statusResult===0 && res.data.totalRecords==1){
            handleSelect(res.data.rows[0])
          }
          else {
            setPickList({value:'',result:''})
            formik.setFieldValue(name,'')
          }
        }).catch((res) => {
        })
        
        
      }
    }
    
  }
  return (
    <div >
        <Field name={name} {...rest}  >
            {({ form, field}) => {
                const { setFieldValue} = form
                const { value} = field
                return (
                  <>
                  <Box>
                    <FormControl  variant="outlined"
                      style={{width:'100%'}}
                      size={'small'}
                    >
                      <span>
                        <InputLabel style={{fontFamily:'Vazir'}} htmlFor={name}>{label}</InputLabel>
                        <OutlinedInput style={{fontFamily:'Vazir',maxWidth:'170px'}}
                          {...field} 
                          {...rest}   
                          id={name}
                          name={name}
                          onBlur={() => onBlurField()}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowModal} edge="end" tabIndex={-1} >
                                <SearchIcon />
                              </IconButton>
                            </InputAdornment>
                          }
                          label={label}
                        />
                      <span style={{marginRight:'5px',color:'darkgreen'}}>
                            {pickList.result} 
                      </span>
                      </span>
                    
                    </FormControl>
                    <ErrorMessage className='mb-1' name={name} component={TextError}></ErrorMessage>
                  </Box>
                  <div>
                  <Dialog 
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={handleClose}
                    scroll='paper'
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    >
                    <DialogContent>
                      <ListForm 
                      firstFilter={firstFilter}
                      listInfo={pickListInfo} 
                      handleSelect={handleSelect} 
                      handleClose={handleClose}/>
                    </DialogContent>
                  </Dialog>
                  </div>
                  </>
                    
                )
            }}
        </Field>
    </div>
  )
}
export default InputPickList