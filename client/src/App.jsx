// App.jsx
import React, { useContext, useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { CRMContext } from './context/crmContext';
import Loading from './components/Loading/Loading';

const App = () => {
  const { isAuthenticated, loading } = useContext(CRMContext);
  const [showSideBar, setShowSideBar] = useState(true)

  return (
    <div className="w-full flex">
      {loading ? <div className='absolute z-50 bg-transparent w-[100vw] h-[100vh]'>
      <div className='h-[100vh] bg-black opacity-55 w-[100%] absolute top-[0%] '></div>
      <Loading />
      </div> : ""}
      {isAuthenticated && (
        <div className={`w-[20%] ${showSideBar ? '' : 'hidden'} `}>
          <Sidebar />
        </div>
      )}
      <div className={`${isAuthenticated ? (showSideBar ? 'w-[80%]' : 'w-full') : 'w-full'}`}>
        {isAuthenticated && <Navbar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />}
        <Outlet />
      </div>
    </div>
  );
};

export default App;
