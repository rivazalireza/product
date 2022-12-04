import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextError from '../TextError';

function InputButton(props) {
  const { type,label, name ,onClick , ...rest } = props
  return (
    <div >
        <Field name={name} {...rest}  >
            {({ form, field}) => {
                const { setFieldValue} = form
                const { value} = field
                return (
                    <Box style={{margin:'8px'}}>
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" onClick={onClick}>{label}</Button>
                            <TextField  size="small"  type={type}  id={name} name={name} {...rest}  
                            //label={label} 
                            variant="standard"
                            {...field} style={{width:'30%'}}/>
                        </Stack>
                    <ErrorMessage className='mb-1' name={name} component={TextError}></ErrorMessage>
                  </Box>
                )
            }}
        </Field>
    </div>
  )
  
}

export default InputButton

