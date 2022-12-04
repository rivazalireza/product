import React ,{useState }from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button, Input } from '@mui/material';

function InputFile(props) {
  const {name,label,type, required,onchange, ...rest } = props
  const [fileName, setFileName] = useState('');
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setFileName(file.name)
    if(onchange){
      onchange(file);
      // if (file.size > 1024)alert("File size cannot exceed more than 1MB");
    }
  };
  return (
    <div >
        <Field name={name} {...rest}  >
            {({ form, field}) => {
              
                const { setFieldValue} = form
                const { value} = field
                return (
                    <Box style={{float:'right'}}>
                        <Button variant="contained" component="label"  >
                        {label} 
                        <input type="file" onChange={handleFileInput}  hidden accept="image/*,application/pdf"/>
                      </Button>
                      <Input disabled value={fileName}  style={{paddingLeft:'5px',paddingRight:'5px',minWidth:'250px',direction:'ltr'}}/>
                    <ErrorMessage className='mb-1' name={name} component={TextError}></ErrorMessage>
                  </Box>
                )
            }}
        </Field>
    </div>
  )
}
export default InputFile