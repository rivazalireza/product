import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';



// import jMoment from "moment-jalaali";
// import { DatePicker, PickersUtilsProvider } from "@material-ui/pickers";
// jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

import  AdapterJalali  from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function InputDate(props) {
const  {label, name,onchange , ...rest } = props
  return (
    <div>
        <Field name={name} {...rest} className="form-control" >
            {({ form, field}) => {
                const { setFieldValue} = form
                const { value} = field
                return (
                  <Box >
                  <LocalizationProvider dateAdapter={AdapterJalali} >
                      <DatePicker 
                      
                      labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                      size="small"
                      mask="____/__/__"
                      value={value}
                      calendarPosition="bottom-right"
                      id={name}
                      {...field}
                      {...rest}
                      selected={value}
                      onChange={ val =>
                        {
                        setFieldValue(name,val===null? '' : val);
                        if(onchange)onchange(val,form)
                        }
                      }
                      label={label}
                      renderInput={(params) => 
                        {
                          const {InputLabelProps,InputProps,...rest2} = params;
                          return (
                            <FormControl  style={{width:'100%'}} size={'small'} variant="outlined">
                              <InputLabel htmlFor={name} style={{fontFamily:'Vazir'}}>{label}</InputLabel>
                              <OutlinedInput style={{fontFamily:'Vazir'}} size="small"   id={name} 
                              value={value} name={name} label={label} 
                              {...field} 
                              {...rest}  
                              {...InputProps} 
                              {...rest2}  
                              />
                            </FormControl>
                          )
                        }
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

export default InputDate