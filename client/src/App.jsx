// App.jsx
import React, { useContext } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { CRMContext } from './context/crmContext';

const App = () => {
  const { isAuthenticated } = useContext(CRMContext);

  return (
    <div className="w-full flex">
      {isAuthenticated && (
        <div className="w-[20%]">
          <Sidebar />
        </div>
      )}
      <div className={isAuthenticated ? 'w-[80%]' : 'w-full'}>
        {isAuthenticated && <Navbar />}
        <Outlet />
      </div>
    </div>
  );
};

export default App;
