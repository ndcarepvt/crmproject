import React, { useContext, useEffect } from "react";
import { CRMContext } from "../../context/crmContext";
import axios from "axios";

const IncentiveTable = ({ setIncentiveFormShow }) => {

  const { incentives, setIncentives, token, userData, URL } = useContext(CRMContext)

  const products = [
    {
      id: 1,
      invoiceid: "url-to-image", // Replace with image URLs
      username: "Rajat",
      commision: "$46.52",
      status: "Available",
      billAmount: 128,
      recievedAmount: 12308,
      date: "$5,954",
    },
    {
      id: 2,
      invoiceid: "url-to-image",
      username: "Money",
      commision: "$48.76",
      status: "Out of stock",
      billAmount: 102,
      recievedAmount: 14120,
      date: "$4,973",
    },
    // Add more products...
  ];


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

      // Axios GET request with query string
      const response = await axios.get(`${URL}/api/incentive/getfilter?${query}`); // Adjust the URL as needed
      setIncentives(response.data.data);
      console.log(response.data.data);


    } catch (err) {

      console.error('Error:', err);
    }
  };

  useEffect(() => {

    if (userData.role === 'admin') {
      fetchIncentives()
    } else if (userData.role === 'sales') {
      fetchFilteredIncentives()
    }

  }, [token])



  return (
    <div className="p-4 bg-gray-200 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Incentive</h2>
        {
          userData.role === "sales" ? <button className="bg-gray-900 text-white px-4 py-2 rounded-md" onClick={() => setIncentiveFormShow(true)}>
            + Add Incentive
          </button> : <></>
        }
      </div>
      <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden ">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left font-semibold">No</th>
            <th className="p-4 text-left font-semibold">User Name</th>
            <th className="p-4 text-left font-semibold">Invoice Id</th>
            <th className="p-4 text-left font-semibold">Commission</th>
            <th className="p-4 text-left font-semibold">Bill Amount</th>
            <th className="p-4 text-left font-semibold">Recived Amount</th>
            <th className="p-4 text-left font-semibold">Status</th>
            <th className="p-4 text-left font-semibold">Date</th>
            {
              userData.role != "sales" ? <th className="p-4 text-left font-semibold">Edit</th>:""
            }
            
          </tr>
        </thead>
        <tbody>
          {incentives.map((product, index) => (
            <tr
              key={product.id}
              className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <td className="p-4">{index + 1}</td>
              <td className="p-4">{product.name}</td>
              <td className="p-4">{product.invoiceId}</td>
              <td className="p-4">{product.commission}</td>
              <td className="p-4">{product.billAmount}</td>
              <td className="p-4">{product.recievedAmount}</td>
              <td
                className={`p-4 ${product.status === "approved"
                  ? "text-green-600"
                  : product.status === "pending"
                    ? "text-red-600"
                    : ""
                  }`}
              >
                {product.status}
              </td>

              <td className="p-4">{product.date}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncentiveTable;
