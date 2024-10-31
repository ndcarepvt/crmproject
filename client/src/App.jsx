import React, { useContext } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { CRMContext } from './context/crmContext'

const App = () => {

  const {token} = useContext(CRMContext)

  return (
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
  )
}

export default App

