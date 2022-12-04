import React from 'react'
import { useNavigate } from 'react-router-dom';
function Default() {
  let navigate = useNavigate()
  navigate('/listProducts')
  return (
    <h1>صفحه اصلی</h1>
  )
}

export default Default