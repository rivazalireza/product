import React, { Component } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import './App.css'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
//mui
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Page404 = React.lazy(() => import('./pages/page404/Page404'))
const Page500 = React.lazy(() => import('./pages/page500/Page500'))

const queryClient=new QueryClient()


class App extends Component {
render() {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <HashRouter>
            <React.Suspense fallback={loading}>
              <Routes>
                <Route exact path="/404" name="Page 404" element={<Page404 />} />
                <Route exact path="/500" name="Page 500" element={<Page500 />} />
                <Route path="*" name="/" element={<DefaultLayout />} />
              </Routes>
            </React.Suspense>
          </HashRouter>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  )}}
export default App
