
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='flex'>
          <Sidebar />    
        <section className='flex flex-1'>
            <Outlet />
        </section>
    </div>
  )
}

export default RootLayout