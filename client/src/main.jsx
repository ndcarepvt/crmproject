import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Invoice from './pages/Invoice/Invoice.jsx';
import Pdf from './pages/Invoice/Pdf/PdfDocument.jsx';
import CRMContextProvider from './context/crmContext.jsx';
import Login from './pages/Login/Login.jsx';


// Dummy function to check authentication (replace with your actual authentication logic)
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // or however you manage authentication
};

// ProtectedRoute component to secure routes
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute element={<Dashboard />} />,
      },
      {
        path: "/invoice",
        element: <ProtectedRoute element={<Invoice />} />,
      },
      {
        path: "/pdf",
        element: <ProtectedRoute element={<Pdf />} />,
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CRMContextProvider>
    <RouterProvider router={router} />
    </CRMContextProvider>
  </StrictMode>,
)



