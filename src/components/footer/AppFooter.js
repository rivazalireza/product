import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1" style={{fontSize:'12px'}}>
        {process.env.REACT_APP_FOOTER_RIGHT}
        </span>
      </div>
      <div className="ms-auto">
        <span className="me-1 " style={{color:'darkblue'}}>
        {process.env.REACT_APP_FOOTER_LEFT}
        </span>
        
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
