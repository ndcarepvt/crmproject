// main.jsx
import { StrictMode, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Invoice from './pages/Invoice/Invoice.jsx';
import CRMContextProvider, { CRMContext } from './context/crmContext.jsx';
import Login from './pages/Login/Login.jsx';
import IncentiveContextProvider from './context/incentiveContext.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Incentive from './pages/Incentive/Incentive.jsx';

// SecureRoute Component
const SecureRoute = ({ children }) => {
  const { isAuthenticated } = useContext(CRMContext);
  return isAuthenticated ? children : <Navigate to="/" />;
};

// Render the app with CRMContextProvider and BrowserRouter
createRoot(document.getElementById('root')).render(

  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <BrowserRouter>
      <CRMContextProvider>
        <IncentiveContextProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Login />} />
              <Route path="dashboard" element={
                <SecureRoute>
                  <Dashboard />
                </SecureRoute>
              } />
              <Route path="invoice" element={
                <SecureRoute>
                  <Invoice />
                </SecureRoute>
              } />
              <Route path="incentive" element={
                <SecureRoute>
                  <Incentive />
                </SecureRoute>
              } />

            </Route>
          </Routes>
        </IncentiveContextProvider>
      </CRMContextProvider>
    </BrowserRouter>
  </ LocalizationProvider>

);
