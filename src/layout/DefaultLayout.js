import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'



import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()


const DefaultLayout = () => {
  return (
    <div >
     
      <QueryClientProvider client={queryClient}>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light" >
        <AppHeader />
        <div className="body flex-grow-1 px-3" >
          <AppContent />
        </div>
        <AppFooter />
      </div>
      </QueryClientProvider>
    </div>
  )
}

export default DefaultLayout
