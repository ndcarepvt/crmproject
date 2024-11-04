// App.jsx
import React, { useContext, useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { CRMContext } from './context/crmContext';

const App = () => {
  const { isAuthenticated } = useContext(CRMContext);
  const [showSideBar, setShowSideBar] = useState(true)

  return (
    <div className="w-full flex">
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
