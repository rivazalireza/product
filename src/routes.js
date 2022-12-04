import React from 'react'


const Login = React.lazy(() => import('./pages/login/Login'))
const Logout = React.lazy(() => import('./pages/logout/Logout'))
const ForgotPassword = React.lazy(() => import('./pages/login/ForgotPassword'))
const ChangePassword = React.lazy(() => import('./pages/login/ChangePassword'))
const Default = React.lazy(() => import('./views/default/Default'))
const listProducts = React.lazy(() => import('./views/issuanceofproductionsteps/ListProduct'))
const issuanceOfProductionProcesses = React.lazy(() => import('./views/issuanceofproductionsteps/IssuanceOfProductionProcesses'))
const issuanceOfProductionProcessesQr = React.lazy(() => import('./views/issuanceofproductionsteps/Issuanceofproductionsteps'))
const ordernumber = React.lazy(() => import('./views/issuanceofproductionsteps/OrderNumber'))
//  App


const routes = [
  { path: '/changepassword',  name: 'تغییر رمز عبور',component: ChangePassword ,isPrivate:true},
  { path: '/', exact: true, name: 'ثبت مرخصی / ماموریت' },
  { path: '/login',  name: 'ورود',component: Login },
  { path: '/logout',  name: 'خروج',component: Logout },
  { path: '/forgotpassword',  name: 'فراموشی رمز عبور',component: ForgotPassword },
  { path: '/default',  name: 'صفحه اصلی',component: Default },
  { path: '/listProducts', name: 'صدور مراحل تولید', component: listProducts , isPrivate:true},
  { path: '/issuanceOfProductionProcesses', name: 'صدور مراحل تولید', component: issuanceOfProductionProcesses , isPrivate:true},
  { path: '/issuanceOfProductionProcessesQr', name: 'صدور مراحل تولید', component: issuanceOfProductionProcessesQr , isPrivate:true},
  { path: '/ordernumber', name: 'شماره سفارش', component: ordernumber , isPrivate:true},
  // ------------------------------
]

export default routes
