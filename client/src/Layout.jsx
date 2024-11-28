import React, { useContext } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import CRMContextProvider, { CRMContext } from './context/crmContext'
import IncentiveContextProvider from './context/incentiveContext'

const Layout = () => {

  const { token } = useContext(CRMContext)

  return (
    <div>
      <CRMContextProvider>
        <IncentiveContextProvider>
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
        </IncentiveContextProvider>
      </CRMContextProvider>
    </div>
  )
}

export default Layout

