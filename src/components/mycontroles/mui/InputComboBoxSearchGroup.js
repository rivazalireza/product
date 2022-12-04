import React from 'react'
import { Field, ErrorMessage,useField  } from 'formik'
import TextError from '../TextError'
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';



function InputComboBoxSearchGroup(props) {
    const {label, name, options, onchange, ...rest } = props
    return (
      <div>
          <Field  {...rest}  >
              {({ form, field}) => {
                  const { setFieldValue } = form
                  // const {value}=field
                  return (
                    <Box >
                      <Autocomplete
                        {...rest}
                        disablePortal
                        size="small"
                        id={name}
                        name={name}
                        getOptionLabel={(option) => option?.label? option.label:''}
                        options={ options }
                        groupBy={(option) => option?.groupName}
                        renderInput={(params) => <TextField id={name} {...params} size={'small'} variant="outlined" label={label}/>}
                        value={form.values[name]}
                        onChange={(e, newValue) => {
                          form.handleChange({target: { name: {name}, value: newValue?.value },})
                          setFieldValue(name,newValue)
                          //form.values[name]=newValue;
                          if(onchange){onchange(newValue,form)} 
                        }}
                      />
                      <ErrorMessage className='mb-1' name={name} component={TextError}></ErrorMessage>
                    </Box>
                  )
              }}
              
          </Field>
        </div>
    )
}
export default InputComboBoxSearchGroup






