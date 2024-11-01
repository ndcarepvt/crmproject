import React, { useContext } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import CRMContextProvider, { CRMContext } from './context/crmContext'

const Layout = () => {

  const { token } = useContext(CRMContext)

  return (
    <div>
      <CRMContextProvider>
        <div className="w-full flex">
          {token && (
            <div className="w-[20%]">
              <Sidebar />
            </div>
          )}
          <div className={token ? 'w-[80%]' : 'w-full'}>
            {token && <Navbar />}
            <Outlet />
          </div>
        </div>
      </CRMContextProvider>
    </div>
  )
}

export default Layout

