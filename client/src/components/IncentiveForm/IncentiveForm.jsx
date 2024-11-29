import React, { useContext, useEffect, useState } from "react";
import { CRMContext } from "../../context/crmContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IncentiveContext } from "../../context/incentiveContext";

const IncentiveForm = ({ setIncentiveFormShow, incentiveFormData }) => {
  const { userData, setIncentives, URL, token, setLoading } = useContext(CRMContext); // Get user data from context
  const { fetchIncentive } = useContext(IncentiveContext); // Get user data from context
  const { role } = userData; // Assume `role` contains the current user's role
  const isSalesperson = role === "sales";
  const navigate = useNavigate()
  const isAdminOrAccount = role === "admin" || role === "accounts";
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    userId: '',
    invoiceId: '',
    patientId: '',
    commission: '',
    createdDate: '',
    billAmount: '',
    courierCharge: 0,
    packingCharges: 0,
    receivedAmount: 0,
    supportCharges: 0,
    commissionAmount: '',
    invoiceCurrency: "",
    status: userData.role ? 'pending' : '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Initialize form data if userData or incentiveFormData is provided
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        name: userData.name,
        userId: userData.userId,
        role: userData.role,
        commission: userData.commission,
      }));
    }

    if (incentiveFormData) {
      setFormData((prev) => ({
        ...prev,
        ...incentiveFormData,
      }));
    }
  }, [userData, incentiveFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await getInvoiceData(formData.invoiceId);
      console.log(formData);
    } catch (err) {
      console.error("Error handling submit:", err);
    }
  };

  const getInvoiceData = async (invoiceId) => {
    const url = `https://ndayurveda.info/api/invoice/byid?billid=${invoiceId}`;
    try {
      const response = await axios.get(url);
      let currency = response.data[0].pbill.currency;
      console.log(response.data);
      formData.invoiceCurrency = currency;
      formData.patientId = response.data[0].pbill.enq_code;
      formData.createdDate = response.data[0].pbill.createddate;
      handleTotalAmount(response.data, currency);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  const handleTotalAmount = (invoiceData, currency) => {
    let totalAmount = invoiceData.reduce(
      (sum, item) => sum + Number(item.pbill.total),
      0
    );
    // setFormData((prev) => ({ ...prev, billAmount: totalAmount }));
    formData.billAmount = totalAmount;


    setTimeout(() => {
      postData();
    }, 2000);
  };


  // handlerCurrencyFetcher(totalAmount, currency);
  // const handlerCurrencyFetcher = async (amount, currency) => {
  //   const options = {
  //     method: "GET",
  //     url: "https://currency-converter-pro1.p.rapidapi.com/convert",
  //     params: { from: currency, to: "INR", amount: amount },
  //     headers: {
  //       "x-rapidapi-key": "your-api-key",
  //       "x-rapidapi-host": "currency-converter-pro1.p.rapidapi.com",
  //     },
  //   };
  //   try {
  //     const response = await axios.request(options);
  //     setFormData((prev) => ({
  //       ...prev,
  //       billAmount: response.data.result,
  //     }));
  //     postData();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  const postData = async () => {
    try {
      console.log("run", formData);

      const response = await axios.post(`${URL}/api/incentive/add`, formData, { headers: { token } });
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message)
        setIncentiveFormShow(false)
        setLoading(false)
        fetchIncentive()
        navigate('/dashboard');
        console.log("Response:", response.data);
      } else {
        toast.error(response.data.message)
        setIncentiveFormShow(false)
        setLoading(false)
      }


    } catch (err) {
      console.error("Error:", err);
      toast.error(err.message)
    }
  };


  // Function to calculate commission
  function calculateCommission(receivedAmount, commissionRate, bankCharges, supportCharges, packingCharges, courierCharge) {

    // Calculate bank charges as a percentage
    const bankCharge = (receivedAmount * bankCharges) / 100;

    // calculate recievedpayment without charges
    const actualRecievedAmount = receivedAmount - bankCharge - supportCharges - packingCharges - courierCharge;

    // Calculate commission
    const commissionAmount = (actualRecievedAmount * commissionRate) / 100;


    return commissionAmount;
  }


  const onUpdateHandler = async (e) => {
    e.preventDefault();

    // Ensure formData is initialized properly
    if (!formData) {
      console.error("formData is undefined or null.");
      return;
    }
    setLoading(true)


    // Extract values with fallback to avoid runtime errors
    const commissionRate = formData.commission
    const receivedAmount = formData.receivedAmount
    const bankCharges = formData.bankCharges
    const supportCharges = formData.supportCharges
    let packingCharges = formData.packingCharges
    let courierCharge = formData.courierCharge

    if (formData.invoiceCurrency === "USD") {
      packingCharges = 400
    } else if (formData.invoiceCurrency === "INR") {
      packingCharges = 200
    }
    if (formData.invoiceCurrency === "USD") {
      courierCharge = 5000
    } else if (formData.invoiceCurrency === "INR") {
      courierCharge = 500
    }

    // Ensure `calculateCommission` is defined
    if (typeof calculateCommission !== "function") {
      console.error("calculateCommission function is not defined.");
      return;
    }

    // Calculate commission and update formData immutably
    const commissionAmount = calculateCommission(receivedAmount, commissionRate, bankCharges, supportCharges, packingCharges, courierCharge)
    console.log(commissionAmount);

    formData.commissionAmount = commissionAmount


    try {

      const response = await axios.post(`${URL}/api/incentive/update`, formData);

      if (response.data.success) {
        toast.success(response.data.message)
        setIncentiveFormShow(false)
        setLoading(false)
        fetchIncentive()
      } else {
        toast.error(response.data.message)
        setLoading(false)
      }

      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to update incentive. Please try again.");
    }

  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
      onClick={() => setIncentiveFormShow(false)}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
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
        <form className="space-y-4" onSubmit={isAdminOrAccount ? onUpdateHandler : handleSubmit}>
          {/* Invoice Id */}
          <div>
            <label htmlFor="invoiceId" className="block text-sm font-medium">
              Invoice Id*
            </label>
            <input
              type="text"
              name="invoiceId"
              id="invoiceId"
              onChange={handleInputChange}
              value={formData.invoiceId}
              placeholder="Enter Invoice Id"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
              readOnly={isAdminOrAccount}
            />
          </div>

          {/* User Details */}
          {isAdminOrAccount && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  UserName
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  readOnly={isAdminOrAccount}
                />
              </div>
              <div>
                <label
                  htmlFor="commission"
                  className="block text-sm font-medium"
                >
                  Commission
                </label>
                <input
                  type="text"
                  name="commission"
                  id="commission"
                  placeholder="Enter commission"
                  value={formData.commission}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  readOnly={isAdminOrAccount}
                />
              </div>
              <div>
                <label
                  htmlFor="billAmount"
                  className="block text-sm font-medium"
                >
                  Bill Amount
                </label>
                <input
                  type="text"
                  name="billAmount"
                  id="billAmount"
                  placeholder="Enter Amount"
                  value={formData.billAmount}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  readOnly={isAdminOrAccount}
                />
              </div>
            </>
          )}

          {/* Status */}
          {isAdminOrAccount && (
            <div>
              <label htmlFor="status" className="block text-sm font-medium">
                Status*
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
              >
                <option value="">-- Select Status --</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          )}

          {isAdminOrAccount && formData.status === "approved" && (
            <div>
              <label
                htmlFor="receivedAmount"
                className="block text-sm font-medium"
              >
                Received Amount
              </label>
              <input
                type="text"
                name="receivedAmount"
                id="receivedAmount"
                placeholder="Enter Received"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                value={formData.receivedAmount === 0 ? "" : formData.receivedAmount}
                onChange={(e) => setFormData((prev) => ({ ...prev, receivedAmount: Number(e.target.value), }))} // Add this to handle updates
              />
            </div>
          )}


          {isAdminOrAccount && (
            <div>
              <label
                htmlFor="bankCharges"
                className="block text-sm font-medium"
              >
                Bank Charges
              </label>
              <input
                type="text"
                name="bankCharges"
                id="bankCharges"
                placeholder="Enter Bank Charges"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                value={formData.bankCharges === 0 ? "" : formData.bankCharges}
                onChange={(e) => setFormData((prev) => ({ ...prev, bankCharges: Number(e.target.value), }))} // Add this to handle updates
              />
            </div>
          )}

          {isAdminOrAccount && (
            <div>
              <label
                htmlFor="supportCharges"
                className="block text-sm font-medium"
              >
                Support Charges
              </label>
              <input
                type="text"
                name="supportCharges"
                id="supportCharges"
                placeholder="Enter Support Charges"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                value={formData.supportCharges === 0 ? "" : formData.supportCharges}
                onChange={(e) => setFormData((prev) => ({ ...prev, supportCharges: Number(e.target.value), }))} // Add this to handle updates
              />
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
