import React, { useContext, memo } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa6";
import { CRMContext } from "../../context/crmContext";
import { assets } from "../../assets/assets";
import { GrDocumentPerformance } from "react-icons/gr"

const DashSidebar = () => {
  const { userData } = useContext(CRMContext);

  // Ensure `userData` is properly defined to avoid runtime errors
  const { pages = [] } = userData || {};

  // Define all available routes
  const allRoutes = [
    { path: "/dashboard", name: "Dashboard", icon: <MdDashboard /> },
    { path: "/invoice", name: "Invoice", icon: <FaFileInvoice /> },
    { path: "/incentive", name: "Incentive", icon:<GrDocumentPerformance /> },
    { path: "/reports", name: "Reports" },
    { path: "/settings", name: "Settings" },
    { path: "/customers", name: "Customers" },
    { path: "/leads", name: "Leads" },
    { path: "/transactions", name: "Transactions" },
  ];

  // Filter routes based on `pages` (user's accessible pages)
  const accessibleRoutes = allRoutes.filter((route) => pages.includes(route.path.slice(1)));

  

  return (
    <div  className="w-64 bg-gray-900 flex flex-col " >
      {/* Logo Section */}
      <div className=" text-xl font-bold my-8">
        <img src={assets.logo} alt="Logo" width="80px" className="md:mx-auto" />
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {accessibleRoutes.map((route) => (
            <li key={route.path}>
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 text-gray-100 text-center rounded ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-500"
                  }`
                }
              >
                {route.icon && <span>{route.icon}</span>}
                <span className="md:block hidden">{route.name}</span> 
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

// Memoize the component to avoid unnecessary re-renders
export default memo(DashSidebar);
