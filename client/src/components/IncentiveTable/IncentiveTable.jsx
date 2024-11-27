import React, { useContext, useEffect } from "react";
import { CRMContext } from "../../context/crmContext";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

const IncentiveTable = ({ setIncentiveFormShow, setIncentiveFormData }) => {

  const { incentives, setIncentives, token, userData, URL } = useContext(CRMContext)

  const onEditHandler = (item) => {
    setIncentiveFormShow(true)
    setIncentiveFormData(item)
  }


  // Fetch all incentives (GET data)
  const fetchIncentives = async () => {
    try {
      const response = await axios.get(`${URL}/api/incentive/getall`); // Update with your backend URL
      setIncentives(response.data.data);
      console.log(response.data.data);

    } catch (err) {

      console.error('Error:', err);
    }
  };

  const fetchFilteredIncentives = async () => {
    try {

      // Construct the query string

      const query = { name: userData.name, role: userData.role }
      console.log("run");
      console.log(query);

      const userId = userData.userId

      // Axios GET request with query string
      const response = await axios.get(`${URL}/api/incentive/getfilter`, { headers: { token } }); // Adjust the URL as needed
      setIncentives(response.data.data);
      console.log(response.data.data);


    } catch (err) {

      console.error('Error:', err);
    }
  };

  useEffect(() => {

    if (userData.role === 'accounts') {
      fetchIncentives()
    } else if (userData.role === 'sales') {
      fetchFilteredIncentives()
    }

  }, [token])



  return (
    <div className="p-4 bg-gray-200 rounded-lg ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Incentive</h2>
        {userData.role === "sales" ? (
          <button
            className="bg-gray-900 text-white px-2 py-1 md:px-4 md:py-2 rounded-md"
            onClick={() => setIncentiveFormShow(true)}
          >
            + Add Incentive
          </button>
        ) : null}
        {userData.role === "account" ? (
          <select
            className="bg-gray-900 text-white px-2 py-1 md:px-4 md:py-2 rounded-md"
          >
            -- Select Coordinator --
          </select>
        ) : null}
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
            {incentives.map((product, index) => (
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
