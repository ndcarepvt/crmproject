import React, { useContext, useState } from 'react'
import { CRMContext } from '../../context/crmContext'
import { useNavigate } from 'react-router-dom'
import { FaBars } from "react-icons/fa";

const Navbar = ({ showSideBar, setShowSideBar }) => {

  const { setToken, logout } = useContext(CRMContext)
  const navigate = useNavigate()


  return (
    <div className='h-[70px] flex items-center justify-between px-10 bg-oxley msu-green '>
      <div>
        <p className='text-[#343a40] text-lg cursor-pointer' onClick={() => setShowSideBar(showSideBar ? false : true)}><FaBars /></p>
      </div>
      <div className=" bg-msu-green text-white font-semibold p-3 rounded-md hover:bg-oxley transition cursor-pointer" onClick={logout}>
        Logout
      </div>
    </div>
  )
}

export default Navbar