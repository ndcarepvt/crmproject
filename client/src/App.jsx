// App.jsx
import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CRMContext } from './context/crmContext';
import Loading from './components/Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import DashSidebar from './components/Sidebar/DashSidebar';

const App = () => {
  const { isAuthenticated, loading } = useContext(CRMContext);
  const [showSideBar, setShowSideBar] = useState(true)

  return (
    <div className="w-full flex max-w-[100%]">
      <ToastContainer />
      {loading ? <div className='absolute z-50 bg-transparent w-[100vw] h-[100vh]'>
        <div className='h-[100vh] bg-black opacity-55 w-[100%] absolute top-[0%] '></div>
        <Loading />
      </div> : ""}
      {isAuthenticated && (
        <div className={`w-[18%] ${showSideBar ? '' : 'hidden'} bg-gray-900` }>
          <DashSidebar />
        </div>
      )}
      <div className={`${isAuthenticated ? (showSideBar ? 'w-[82%]' : 'w-full') : 'w-full'} `}>
        {isAuthenticated && <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />}
        <Outlet />
      </div>
    </div>
  );
};

export default App;
