import React, { memo, useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import { assets } from '../../assets/assets';
import { CRMContext } from '../../context/crmContext';


const Sidebar = () => {

    const { token } = useContext(CRMContext)
    const [showSideBar, setShowSideBar] = useState(true)

    return (
        <div>

            <div className={` w-full h-[100vh] bg-[#16423C] p-4 shadow-xl shadow-blue-gray-900/5 flex flex-col items-center  transition-all`}>

                <img src={assets.logo} alt="" width='100px' />

                <div className={` bg-[#16423C] ${!showSideBar ? "mt-10" : ""} my-6 flex flex-col items-center `} >

                    <div className=''>
                        <ul
                            className={`flex flex-col text-md justify-center ${showSideBar ? 'items-start' : 'items-center'
                                } gap-3 text-gray-400 flex-wrap`}
                        >
                            <li className='w-full'>
                                <NavLink
                                    to='/dashboard'
                                    className={({ isActive }) =>
                                        `flex gap-4 px-4 p-2 w-full rounded-md items-center font-normal ${isActive
                                            ? 'bg-[#bae0bf] text-[#16423C]'
                                            : 'hover:bg-[#bae0bf] hover:text-[#16423C]'
                                        }`
                                    }
                                >
                                    <FaHome />
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className='w-full'>
                                <NavLink
                                    to='/invoice'
                                    className={({ isActive }) =>
                                        `flex gap-4 px-4 p-2 w-full rounded-md items-center font-normal ${isActive
                                            ? 'bg-[#bae0bf] text-[#16423C]'
                                            : 'hover:bg-[#bae0bf] hover:text-[#16423C]'
                                        }`
                                    }
                                >
                                    <FaFileInvoice />
                                    Invoice
                                </NavLink>
                            </li>
                        </ul>
                    </div>


                </div>

            </div>


        </div>
    )
}

export default Sidebar