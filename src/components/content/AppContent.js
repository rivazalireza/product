import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import RequireAuth from '../auth/RequireAuth'
// routes config
import routes from '../../routes'
const AppContent = () => {
  return (
    <CContainer  >
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.isPrivate? 
              route.component &&  (
                <Route key={idx} path={route.path} exact={route.exact} name={route.name}
                 element={<RequireAuth> <route.component /> </RequireAuth> } />)
                 : route.component &&  (
                  <Route key={idx} path={route.path} exact={route.exact} name={route.name}
                   element={<route.component /> } />)
            )
          })}
          <Route path="/" element={<Navigate to={process.env.REACT_APP_API_FIRST_PAGE} replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
