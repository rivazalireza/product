import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { FormGroup } from '@mui/material';

function InputCheckBox(props) {
  const {label,  name, value, onchange, labelclick, ...rest } = props
  return (
    <div >
        <Field  {...rest}  >
            {({ form, field}) => {
                const { setFieldValue} = form
                // const { value} = field
                return (
                    <Box style={{paddingRight:'0px',float:'right',textAlign:'right'}}>
                      <FormControlLabel style={{marginLeft:'0px'}} name={name} id={name} control={<Checkbox   
                        checked={form.values[name]} 
                        label='' onChange={(event)=>{
                        setFieldValue(name,event.target.checked)
                        if(onchange)onchange(event.target.checked)
                      }
                        
                      } 
                        />} />
                      {
                      labelclick? (<span style={{color:'darkblue',cursor:'pointer',textAlign:'right'}} onClick={labelclick}>{label}</span>)
                      :(<span >{label}</span>)
                      }
                      <ErrorMessage className='mb-1' name={name} component={TextError}></ErrorMessage>
                  </Box>
                )
            }}
        </Field>
    </div>
  )
  
}
export default InputCheckBox