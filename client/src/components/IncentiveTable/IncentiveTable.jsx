import React, { useCallback, useContext, useEffect, useState } from "react";
import { CRMContext } from "../../context/crmContext";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { IncentiveContext } from "../../context/incentiveContext";

const IncentiveTable = ({ setIncentiveFormShow, setIncentiveFormData }) => {

  const { incentives, setIncentives, token, userData, URL } = useContext(CRMContext)
  const { fetchIncentive, allIncentives, setAllIncentives } = useContext(IncentiveContext)
  


  const onEditHandler = (item) => {
    setIncentiveFormShow(true)
    setIncentiveFormData(item)
  }



  useEffect(() => {

    fetchIncentive()

  }, [token])


  const onCoordinateHandler = (e) => {
    const coordinateValue = e.target.value
    console.log(coordinateValue)

    if (coordinateValue !== "") {
      const selectedIncentives = incentives.filter((item) => {
        return item.name == coordinateValue
      })
      setAllIncentives(selectedIncentives)
    } else {


      setAllIncentives(incentives)

    }
  }


  const onSearchHandler = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    // If search value is empty, show all incentives
    if (searchValue === "") {
      setAllIncentives(incentives);
    } else {
      // Filter incentives based on the invoiceId (ensure invoiceId is a string)
      const filterIncentive = incentives.filter((item) => {
        const invoiceId = String(item.invoiceId); // Convert to string
        return invoiceId.includes(searchValue);
      });
      setAllIncentives(filterIncentive);
    }
  };





  return (
    <div className="p-4 bg-gray-200 rounded-lg ">
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Incentive</h2>
        {userData.role === "sales" ? (
          <button
            className="bg-gray-900 text-white px-2 py-1 md:px-4 md:py-2 rounded-md"
            onClick={() => setIncentiveFormShow(true)}
          >
            + Add Incentive
          </button>
        ) : null}

        {userData.role === "accounts" ? (
          <input type="text" placeholder="Enter by invoiceid" onChange={(e) => onSearchHandler(e)} className="w-[200px] px-2 py-1 border rounded-md focus:ring-2 focus:ring-black focus:outline-none " />
        ) : null}


        <div className="flex gap-3 sm:flex-row flex-col">
          {userData.role === "accounts" ? (
            <select
              className="bg-gray-900 text-white px-2 py-1 md:px-4 md:py-2 rounded-md"
              onChange={(e) => onCoordinateHandler(e)}
            >
              <option value="">-- Select Coordinator --</option>
              <option value="rajat">rajat</option>
              <option value="arsh">arsh</option>

            </select>
          ) : null}

          <button onClick={fetchIncentive} className="bg-gray-900 w-[100px] text-white px-2 py-1 md:px-4 md:py-2 rounded-md" >refresh</button>
        </div>


      </div>
      <div className="my-2 text-left md:text-right">

      </div>
      <div className="overflow-x-scroll">
        <table className="min-w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-center font-semibold">No</th>
              <th className="p-4 text-center font-semibold">User Name</th>
              <th className="p-4 text-center font-semibold">Invoice Id</th>
              <th className="p-4 text-center font-semibold">Commission</th>
              <th className="p-4 text-center font-semibold">Bill Amount</th>
              {
                userData.role === "accounts" && (
                  <th className="p-4 text-center font-semibold">Invoice Currency</th>
                )
              }
              <th className="p-4 text-center font-semibold">Received Amount</th>
              <th className="p-4 text-center font-semibold">Commission  Amount</th>
              <th className="p-4 text-center font-semibold">Status</th>
              <th className="p-4 text-center font-semibold">Date</th>
              {
                userData.role === "accounts" && (
                  <th className="p-4 text-center font-semibold">Created Date</th>
                )
              }
              {userData.role !== "sales" && (
                <th className="p-4 text-center font-semibold">Edit</th>
              )}
            </tr>
          </thead>
          <tbody>
            {allIncentives.map((product, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-4 text-center">{index + 1}</td>
                <td className="p-4 text-center">{product.name}</td>
                <td className="p-4 text-center">{product.invoiceId}</td>
                <td className="p-4 text-center">{product.commission}</td>
                <td className="p-4 text-center">{product.billAmount}</td>
                {
                  userData.role === "accounts" ? <td className="p-4 text-center">{product.invoiceCurrency}</td> : <></>
                }
                <td className="p-4 text-center">{product.receivedAmount}</td>
                <td className="p-4 text-center">{product.commissionAmount}</td>
                <td
                  className={`p-4 ${product.status === "approved"
                    ? "text-green-600"
                    : product.status === "pending"
                      ? "text-yellow-600"
                      : product.status === "rejected"
                        ? "text-red-600"
                        : ""
                    }`}
                >
                  {product.status}
                </td>
                <td className="p-4 text-center">{product.date}</td>
                {
                  userData.role === "accounts" ? <td className="p-4 text-center">{product.createdDate}</td> : <></>
                }
                {
                  userData.role == "accounts" ? <td className="p-4 text-center cursor-pointer" onClick={() => onEditHandler(product)}>< FaEdit /></td> : <></>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


  );
};

export default IncentiveTable;
