import React,{useState } from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function InputPassword(props) {
  const { type,label, name, ...rest } = props
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <div >
        <Field name={name} {...rest}  >
            {({ form, field}) => {
              
                const { setFieldValue} = form
                const { value} = field
                return (
                    <Box>
                    <FormControl  variant="outlined"
                    style={{width:'100%'}}
                    size={'small'}
                    >
                      <InputLabel style={{fontFamily:'Vazir'}} htmlFor={name}>{label}</InputLabel>
                      <OutlinedInput style={{fontFamily:'Vazir'}}
                       {...field} 
                       {...rest}   
                        id={name}
                        name={name}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label={label}
                        
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

export default InputPassword