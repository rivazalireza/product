import React from 'react'
import {useNavigate  } from "react-router-dom"
import { authProvider } from 'src/components/auth/AuthProvider'
const Logout = () => {
    let navigate = useNavigate()
    React.useEffect(() => {
      authProvider.logout();
      navigate('/login');
      return () => {
        window.location.reload();
      };
    }, []);
    
  return (
  <div ></div>
  )
}

export default Logout
