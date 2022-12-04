import React from 'react'
import { Field } from 'formik'
import Box from '@mui/material/Box';
import { CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilInput } from '@coreui/icons';
import { CircularProgress } from '@mui/material';

function SubmitButton(props) {
  const { label, name ,onchange , ...rest } = props
  return (
    <div >
        <Field name={name} {...rest}  >
            {({ form}) => {
                return (
                    <Box>
                     <CButton color="info" className="px-4" type="submit" disabled={form.isSubmitting}>
                      <CIcon icon={cilInput} className="me-2" />{label}
                    </CButton>
                    <React.Fragment>
                      {form.isSubmitting   ? (
                          <CircularProgress
                              color="inherit"
                              size={20}
                          />
                      ) : null}
                  </React.Fragment>    
                  </Box>
                )
            }}
        </Field>
    </div>
  )
  
}

export default SubmitButton

