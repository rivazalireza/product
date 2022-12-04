import React from 'react'
import { Field, ErrorMessage } from 'formik'
import moment from 'jalali-moment'
import Box from '@mui/material/Box';
import  AdapterJalali  from '@date-io/date-fns-jalali';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';
import TextError from '../TextError';

function InputTime(props) {
const  {label, name, ...rest } = props
//const [value, setValue] = React.useState<Date | null>(new Date());
  return (
    <div>
        <Field name={name} {...rest} className="form-control" >
            {({ form, field}) => {
                const { setFieldValue} = form
                const { value} = field
                return (
                  <Box >
                  <LocalizationProvider dateAdapter={AdapterJalali} >
                  <TimePicker
                      ampm={false}
                      openTo="hours"
                      inputFormat="HH:mm"
                      mask="__:__"
                      label={label}
                      value={value}
                      onChange={
                        val => {
                          if(moment(val).isValid()){
                            setFieldValue(name,val===null? '' : val);
                          }
                        }
                        
                      }
                      renderInput={(params) => 
                      <TextField {...params} 
                      // inputProps={{ 
                      //   min: '00:00', 
                      //   max: '23:59',
                      // }}
                      size="small" type='time' id={name} value={value} name={name} {...field} {...rest}  />
                    }
                    />
                  </LocalizationProvider>
                  <ErrorMessage name={name} component={TextError}></ErrorMessage>
                </Box>
                )
            }}
        </Field>
    </div>
       
  )
}

export default InputTime