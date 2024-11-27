import React, { useContext, useState } from 'react'
import { CRMContext } from '../../context/crmContext'
import { useNavigate } from 'react-router-dom'
import { FaBars } from "react-icons/fa";

const Header = ({ showSideBar, setShowSideBar }) => {

    const { setToken, logout } = useContext(CRMContext)

    return (
        <div className="flex justify-between items-center bg-white shadow px-6 py-4">
            <div>
                <p className='text-[#343a40] text-lg cursor-pointer' onClick={() => setShowSideBar(showSideBar ? false : true)}><FaBars /></p>
            </div>
            <div>
                <h1 className="text-2xl text-center font-semibold">Hello, Margaret</h1>
                <p className="text-gray-600 hidden md:block">Track team progress here. You almost reached a goal!</p>
            </div>
            {/* <div className="text-sm text-gray-500">
                <span>16 May, 2023</span>
            </div> */}
            <div className=" bg-[#343a40] text-white font-semibold py-2 px-3 rounded-md hover:bg-oxley transition cursor-pointer" onClick={logout}>
                Logout
            </div>
        </div>
    );
};

export default Header;
