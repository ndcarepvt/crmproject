// Import statements
import { StrictMode, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Invoice from './pages/Invoice/Invoice.jsx';
import Pdf from './pages/Invoice/Pdf/PdfDocument.jsx';
import CRMContextProvider, { CRMContext } from './context/crmContext.jsx';
import Login from './pages/Login/Login.jsx';

// SecureRoute Component
const SecureRoute = ({ children }) => {
  const { isAuthenticated } = useContext(CRMContext);

  return isAuthenticated ? children : <Navigate to="/" />;
};

// Create routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: (
          <SecureRoute>
            <Dashboard />
          </SecureRoute>
        ),
      },
      {
        path: 'invoice',
        element: (
          <SecureRoute>
            <Invoice />
          </SecureRoute>
        ),
      },
      {
        path: 'pdf',
        element: (
          <SecureRoute>
            <Pdf />
          </SecureRoute>
        ),
      },
    ],
  },
]);

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CRMContextProvider>
      <RouterProvider router={router} />
    </CRMContextProvider>
  </StrictMode>
);
