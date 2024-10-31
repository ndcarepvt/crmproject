import React, { memo, useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import { assets } from '../../assets/assets';
import { CRMContext } from '../../context/crmContext';


const Sidebar = () => {

    const {token} = useContext(CRMContext)
    const [showSideBar, setShowSideBar] = useState(true)

    return (
        <div>

            <div className={` w-full h-[100vh] bg-[#16423C] p-4 shadow-xl shadow-blue-gray-900/5 flex flex-col items-center  transition-all`}>
              
                <img src={assets.logo} alt="" width='100px'/>

                <div className={` bg-[#16423C] ${!showSideBar ? "mt-10" : ""} my-6 flex flex-col items-center `} >

                    <div className='' >
                        <ul className={`flex flex-col text-md justify-center ${showSideBar ? "items-start" : "items-center"} gap-3 text-gray-400 flex-wrap `} >
                            <li className='w-[100%]'><a href="/dashboard" className={ `flex gap-4 px-4 p-2 w-full  hover:bg-[#bae0bf] rounded-md items-center hover:text-[#16423C] font-normal`}><FaHome />Dashbord</a></li>
                            <li className='w-[100%]'><a href="/invoice" className={ `flex gap-4 px-4 p-2 w-full  hover:bg-[#bae0bf] rounded-md items-center hover:text-[#16423C] font-normal`}><FaFileInvoice />Invoice</a></li>
                            
                        </ul>
                    </div>
                    

                </div>
                
            </div>

            
        </div>
    )
}

export default Sidebar