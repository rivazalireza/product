import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function InputText(props) {
  const {name,label,type,multiline, digit, required,  ...rest } = props
  const onKeyPress=(event)=>{
    if (digit && !/[0-9]/.test(event.key)) {
          event.preventDefault();
      }
  }
  
  return (
    <div >
        <Field name={name} {...rest}  >
            {({ form, field}) => {
              
                const { setFieldValue} = form
                const { value} = field
                return (
                    <Box >
                    <FormControl  style={{width:'100%'}} size={'small'} variant="outlined" required={required}  >
                      <InputLabel htmlFor={name} >{label}</InputLabel>
                      <OutlinedInput size="small"  type={type}  id={name} value={value} name={name} label={label} multiline={multiline} {...field} {...rest}  onKeyPress={onKeyPress}  
                      inputProps={{...rest}}
                      />
                    </FormControl>
                    <ErrorMessage className='mb-1' name={name} component={TextError}></ErrorMessage>
                  </Box>
                )
            }}
        </Field>
    </div>
  )
}
export default InputText