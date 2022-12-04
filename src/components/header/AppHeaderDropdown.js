import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,

} from '@coreui/react'
import {
  cilAccountLogout,
  cilActionRedo,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import userlogo from '../../assets/images/user.png'
import { useNavigate } from 'react-router-dom';
import { authProvider } from 'src/components/auth/AuthProvider'

const AppHeaderDropdown = () => {
  let navigate = useNavigate()
  const logout = () => {
    authProvider.logout()
    window.location.reload()
    navigate('/login')
    
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={userlogo} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">کاربر</CDropdownHeader>
        <CDropdownItem href="#/changepassword">
          <CIcon icon={cilActionRedo} className="me-2" />
          تغییر رمز عبور
        </CDropdownItem>
       
        <CDropdownDivider />
        <CDropdownItem onClick={logout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          خروج
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          پیگیری وضعیت قراردادها
        </CDropdownItem> */}
        {/* <CDropdownItem href="#/login">
          <CIcon icon={cilAccountLogout} className="me-2" /> 
          خروج
        </CDropdownItem> */}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
