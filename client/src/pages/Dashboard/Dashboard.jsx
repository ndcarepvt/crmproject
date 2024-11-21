import React, { useContext, useState } from "react";
import SalesDashbord from "../../components/dash-component/SalesDashboard/SalesDashbord";
import AccountsDashboard from "../../components/dash-component/AccountsDashboard/AccountsDashboard";
import AdminDashboard from "../../components/dash-component/AdminDashboard/AdminDashboard";
import { CRMContext } from "../../context/crmContext";


const Dashboard = () => {

  const {userData} = useContext(CRMContext)


  return (
    <>
      {
        userData.role === "sales" ? <SalesDashbord /> : <></>
      }
      {
        userData.role === "accounts" ? <AccountsDashboard /> : <></>
      }
      {
        userData.role === "admin" ? <AdminDashboard /> : <></>
      }
    </>
  );
};

export default Dashboard;
