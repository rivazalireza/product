import React,{useEffect} from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'
import { authProvider } from 'src/components/auth/AuthProvider'

var permissions=[];

export const AppSidebarNav = ({ items }) => {
  const location = useLocation()
  useEffect(() => {
    permissions=authProvider.getPermissions();
  }, []);
  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }
  const isPermission=(rest)=>{
    if(!rest.permission || rest.permission===undefined) return true;
    if(permissions.length==0)
      permissions=authProvider.getPermissions();
    return permissions.length>0 && permissions.indexOf(rest.permission)>=0 ? true : false
  }
  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
       isPermission(rest) && 
        <Component
        {...(rest.to && !rest.items && { 
            component: NavLink,
            // activeClassName: 'active',
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      isPermission(rest) && 
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
