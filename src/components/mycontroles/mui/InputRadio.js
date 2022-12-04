import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'
import Box from '@mui/material/Box';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


function InputRadio(props) {
  const {label, name, options, ...rest } = props
  return (
    <div >
        <Field name={name} {...rest}  >
            {({ form, field}) => {
                const { setFieldValue} = form
                const { value} = field
                return (
                    <Box className='form-inline'>
                    <FormLabel id={name} style={{marginTop:'7px',marginLeft:'10px',fontFamily:'vazir'}}>{label}</FormLabel>
                    <FormControl {...rest}>
                      <RadioGroup
                        size="small"
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        id={name} name={name} {...rest}  label={label} 
                        defaultValue={value}
                        >
                           {
                            options.map(option => {
                              return(
                                <FormControlLabel 
                                key={option.value} 
                                value={option.value} 
                                control={<Radio />} 
                                label={option.label}/>
                                )
                              })
                            }
                      </RadioGroup>
                      
                      
                    </FormControl>
                    <ErrorMessage className='mb-1' name={name} component={TextError}></ErrorMessage>
                  </Box>
                )
            }}
        </Field>
    </div>
  )
}
export default InputRadio

