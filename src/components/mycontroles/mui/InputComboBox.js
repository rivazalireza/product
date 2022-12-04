import React from 'react'
import { Field, ErrorMessage,useField  } from 'formik'
import TextError from '../TextError'
import Box from '@mui/material/Box';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

function InputComboBox(props) {
    const {label, name, options, onchange,noselectlabel, ...rest } = props
    const [selectedItem, setSelectedItem] = React.useState('');
    const handleChange = (event) => {
      setSelectedItem(event.target.value );
      if(onchange){onchange(e.target.value,form)} 
    };
    return (
      <div>
          <Field  {...rest}  >
              {({ form, field}) => {
                  const { setFieldValue } = form
                  const {value}=field
                  return (
                    <Box sx={{ minWidth: 120 }}>
                    <FormControl  fullWidth size="small"  style={{textAlign:'right'}} >
                      <InputLabel id={name}>{label}</InputLabel>
                      <Select
                         
                        {...rest}
                        labelId={name}
                        id={name}
                        value={form.values[name]}
                        label={label}
                        onChange={(e) => {
                            setSelectedItem(e.target.value );
                            form.values[name]=e.target.value;
                            if(onchange){onchange(e.target.value,form)} 
                          }}
                      >
                        {
                        options.map((option) => (
                                <MenuItem key={option.value} value={option.value} style={{dir:'rtl',fontSize:'14px'}} >{option.label}</MenuItem>
                            ))
                      }
                      </Select>
                    </FormControl>
                  </Box>
                  )
              }}
              
          </Field>
        </div>
    )
}
export default InputComboBox






