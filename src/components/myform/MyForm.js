import React from 'react';
import { Formik, Form } from 'formik'
import Box from '@mui/material/Box';
import {  Grid } from '@mui/material';
import MyControl from 'src/components/mycontroles/MyControl';
import {  CCard, CCardBody, CCol, CRow } from '@coreui/react';
import { ReactNotifications } from 'react-notifications-component';

function MyForm({inputControles,initialValues,validationSchema,onSubmit}) {
  return (
    <div>
       <CRow className="justify-content-center" >
        <ReactNotifications />
        <CCol lg={12} md={12}  sm={12}>
          <CCard className="mx-12">
            <CCardBody className="p-4" >
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}> 
                  {
                      formik => {
                          return(
                              <Form> 
                                <Box sx={{ flexGrow: 1}}>
                                <Grid container spacing={2}>
                                    {
                                    inputControles?.map((item) => {
                                        return(
                                            <Grid item xs={item.xs?item.xs:12} md={item.md?item.md:3} key = {item.name}>
                                            <MyControl  
                                                type = {item.type} 
                                                value = {item.value} 
                                                name = {item.name}  
                                                label = {item.label}  
                                                control = {item.control}
                                                options = {item.options}
                                                // options = {[]}
                                                onchange = {item.onchange}
                                            />
                                          </Grid>    
                                        )
                                    })
                                    }
                                  </Grid>
                                </Box>
                        </Form>
                      )}
                  }
            </Formik>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default MyForm