import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilUserFollow,
  cilAccountLogout,
  cilUser,
  cilAvTimer,
  cilActionRedo,
  cilBusAlt,
  cilReportSlash,
  cilTerrain,
  cilSend,
  cilCalendarCheck,
  cilTruck,
  cilHandPointRight,
  cilAddressBook,
  cilContact,
  cilPaperclip,
  cilPaperPlane,
  cilNewspaper,
  cilQrCode,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { authProvider } from './components/auth/AuthProvider'

const myStyle = {
  paddingRight:"35px"
};

const menuItems = [
  
  {
    component: CNavGroup,
    name: 'محصول',
    // permission:'Test.BaseInfo',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'صدور مراحل تولید',
        to: '/listProducts',
        icon: <CIcon icon={cilQrCode} customClassName="nav-icon" />,
        private : 'false',
      },
    ],
  },

  {
    component: CNavItem,
    name: 'تغییر رمز عبور',
    to: '/changepassword',
    icon: <CIcon icon={cilActionRedo} customClassName="nav-icon" />,
    
  },

  
]

if(authProvider.isAuth()){
menuItems.push( {
  component: CNavItem,
  name: 'خروج',
  to: '/logout',
  icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
  
})
}
else {
  menuItems.push( {
    component: CNavItem,
    name: 'ورود',
    to: '/login',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    
  })

}
export default menuItems
