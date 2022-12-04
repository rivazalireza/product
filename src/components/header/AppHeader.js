import React, { useState } from 'react'
import {  useQuery } from '@tanstack/react-query';
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCol,
  CButton,
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CImage,
  CHeaderDivider,
  CBreadcrumb,
  CBreadcrumbItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilMenu } from '@coreui/icons'
import { authProvider } from 'src/components/auth/AuthProvider'
import { AppHeaderDropdown } from './index'
import { logo } from 'src/assets/brand/logo'

import userloginImage from '../../assets/images/userlogin.png'
import AppBreadcrumb from './AppBreadcrumb';

const AppHeader = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [isAuth, setIsAuth] = useState(authProvider.isAuth())
  const [user, setUser] = useState(authProvider.getIdentity())
  const [today, setToday] = useState('')
  const [textMessage, setTextMessage] = useState('')
  
  const onSuccess=(data)=>{
    if(data.data.statusResult===0){
      setToday(data.data.today);
      setTextMessage(data.data.textMessage)
    }
  }

  const { isLoading, isError, error, data  } = useQuery(['getDate'],()=> authProvider.getDate(),
  {
		onSuccess,
    refetchOnWindowFocus:false,
    staleTime:5000000,
	})
  if (isLoading ) return 'در حال خواندن اطلاعات ...'
  if (isError) return 'خطا: ' + error.message
  if(data.data.statusResult===2 ){return <h5 style={{color:'red',textAlign:'center'}}>خطا در خواندن اطلاعات</h5>}
  

  const login = () => {
    navigate('/login')
    
  }
  const logout = () => {
    authProvider.logout()
    window.location.reload()
    navigate('/login')
  }
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink  to={process.env.REACT_APP_API_FIRST_PAGE} component={NavLink} >
            <CImage src={'Images/logo.jpg'} size="sm" width={50} height={50} />
              <b style={{color:'#5c5fcb',marginRight:'5px'}} 
              >
              {process.env.REACT_APP_APPLICATION_NAME}
              </b>
            
            </CNavLink>
          </CNavItem>
        
        </CHeaderNav>
       
        <CHeaderNav>
        <CNavItem>
            <CCol >
                  <CIcon icon={cilCalendar} size="lg" />
                  <span style={{ marginLeft:'20px' ,color:'darkblue'}} >{`      ${today}`}</span>
            </CCol>
          </CNavItem>
          <CNavItem>
            <CCol >
              {!isAuth && (
                <>
                <CButton color={'info'} size="sm" variant="outline" shape="rounded-pill" onClick={login}>
                  <CImage src={userloginImage}   />  
                  {/* <CIcon icon={cilExitToApp} className="me-2" /> */}
                  <span >ورود{'\u00A0'}</span>
                  
                </CButton>
                </>
              )}
              {isAuth && (<span>{`${user.fullName}`}</span>)}
            </CCol>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
        {isAuth && (
          <AppHeaderDropdown />
        )}
        </CHeaderNav>
      </CContainer>
      { textMessage!='' && textMessage!=undefined && (
        <>
          <CHeaderDivider />
          <CContainer fluid>
          <CBreadcrumb className="m-0 ms-2" >
          <CBreadcrumbItem style={{color:'red'}}>
          {`${textMessage}`}
          </CBreadcrumbItem>
          </CBreadcrumb>
      </CContainer>
        </>)}
      
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
