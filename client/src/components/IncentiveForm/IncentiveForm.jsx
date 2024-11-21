import React, { useContext, useEffect, useState } from "react";
import { CRMContext } from "../../context/crmContext";
import axios from "axios";


const IncentiveForm = ({ setIncentiveFormShow }) => {
  const { userData, setIncentives, URL } = useContext(CRMContext); // Get user data from context
  const { role } = userData; // Assume `role` contains the current user's role
  const isSalesperson = role === "sales";
  const isAdminOrAccount = role === "admin" || role === "account";
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    invoiceId: '',
    commission: '',
    billAmount: '',
    recievedAmount: '',
    commissionAmount: '',
    status: userData.role ? 'pending' : '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData)
  };


  useEffect(() => {

    if (userData) {
      formData.name = userData.name;
      formData.role = userData.role;
      formData.commission = userData.commission;
    }

  }, [])



  // Handle form submission (POST data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    getInvoiceData(formData.invoiceId)
    console.log(formData);


  };

  const getInvoiceData = async (invoiceId) => {
    const url = `https://ndayurveda.info/api/invoice/byid?billid=${invoiceId}`;
    try {
      const response = await axios.get(url);
      console.log(response.data);

      let currency = response.data[0].pbill.currency
      handleTotalAmount(response.data, currency)


    } catch (error) {
      console.error('Error fetching invoice:', error);
    }
  };


  const handleTotalAmount = (invoiceData, currency) => {
    let totalAmount = 0;
    invoiceData.forEach(item => {
      totalAmount += Number(item.pbill.total)
    });

    handlerCurrencyFetcher(totalAmount, currency)
    formData.billAmount = totalAmount
  };


  const handlerCurrencyFetcher = async (amount, currency) => {
    const options = {
      method: 'GET',
      url: 'https://currency-converter-pro1.p.rapidapi.com/convert',
      params: { from: currency, to: 'INR', amount: amount },
      headers: {
        'x-rapidapi-key': '3a502a33famsh003e2d375ecab8dp1d7a4ajsnbd0447a22137',
        'x-rapidapi-host': 'currency-converter-pro1.p.rapidapi.com'
      },
    };
    try {
      const response = await axios.request(options);
      formData.billAmount = response.data.result;
      postData()

    } catch (error) {
      console.error(error);
    };
  };

  const postData = async () => {
    try {

      console.log(formData);
      const response = await axios.post(`${URL}/api/incentive/add`, formData); // Update with your backend
      alert('Incentive added successfully');
      console.log('Response:', response.data);
    } catch (err) {

      console.error('Error:', err);
    }
  }



  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
      onClick={() => setIncentiveFormShow(false)}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
      >
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-4">
            {isSalesperson ? "Add Incentive" : "Edit Incentive"}
          </h2>
          <p
            className="font-bold cursor-pointer"
            onClick={() => setIncentiveFormShow(false)}
          >
            X
          </p>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          {isSalesperson
            ? "Fill out the incentive details below."
            : "Review and edit the incentive details."}
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Invoice Id */}
          <div>
            <label htmlFor="invoiceId" className="block text-sm font-medium">
              Invoice Id*
            </label>
            <input
              type="text"
              name="invoiceId"
              id="invoiceId" onChange={handleInputChange}
              placeholder="Enter Invoice Id"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
              readOnly={isAdminOrAccount} // Admin and Account can only view
              defaultValue={isAdminOrAccount ? "INV12345" : ""}
            />
          </div>

          {/* UserName */}
          {/* <div>
            <label htmlFor="name" className="block text-sm font-medium">
              User Name*
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter User Name"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
              readOnly={isAdminOrAccount} // Admin and Account can only view
              defaultValue={isAdminOrAccount ? "John Doe" : ""}
            />
          </div> */}

          {/* Description */}
          {isAdminOrAccount && (
            <div>
              <label htmlFor="description" className="block text-sm font-medium">
                Description
              </label>
              <input
                type="text"
                id="description"
                placeholder="Enter Description"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                defaultValue="Monthly incentive based on sales."
              />
            </div>
          )}

          {/* Status */}
          {isAdminOrAccount && (
            <div>
              <label htmlFor="status" className="block text-sm font-medium">
                Status*
              </label>
              <select
                id="status"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                defaultValue="Pending"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="doubling">Doubling</option>
              </select>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between items-center">
            {isSalesperson && (
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Submit Incentive
              </button>
            )}

            {isAdminOrAccount && (
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncentiveForm;
