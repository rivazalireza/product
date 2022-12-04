import React from 'react'
import {
  useLocation,
  Navigate
} from "react-router-dom";
import {authProvider} from './AuthProvider'
  
function RequireAuth({ children }) {
    let location = useLocation();
    if (!authProvider.isAuth()) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}
export default RequireAuth