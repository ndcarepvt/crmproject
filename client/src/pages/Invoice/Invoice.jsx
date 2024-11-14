import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Pdf from './Pdf/PdfDocument';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { CRMContext } from '../../context/crmContext';
import { useNavigate } from 'react-router-dom';
import PdfDocument from './Pdf/PdfDocument';
import Loading from '../../components/Loading/Loading';
import EstimatedBill from './Pdf/documents/EstimatedBill';

const Invoice = () => {

  const { getInvoiceData, userData, invoiceData, formData, setFormData, setValuesFunc, currencyRate, totalInvoiceAmount, loading, setLoading, currencySymbolFetch } = useContext(CRMContext)
  const tax = "tax"
  const estimate = "estimate"
  const [taxdownloadBtnShow, setTaxDownloadBtnShow] = useState(false);
  const [estimatedownloadBtnShow, setEstimateDownloadBtnShow] = useState(false);
  const navigate = useNavigate()



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // handle form submission here
  //   console.log(formData);
  //   getInvoiceData(formData.invoiceId)
  //   setValuesFunc(formData.company)
  //   setLoading(true)
  //   currencySymbolFetch(formData.currency)
  //   setTimeout(() => {
  //     setLoading(false)
  //     setTaxDownloadBtnShow(true)
  //   }, 5000);

  // };

  const handleGeneratePDF = async (pdf) => {
    // handle form submission here
    console.log(formData);
    getInvoiceData(formData.invoiceId)
    setValuesFunc(formData.company)
    setLoading(true)
    currencySymbolFetch(formData.currency)
    if (pdf == "tax") {
      setTimeout(() => {
        setLoading(false)
        setTaxDownloadBtnShow(true)
      }, 5000);
    } else if (pdf === "estimate") {
      setTimeout(() => {
        setLoading(false)
        setEstimateDownloadBtnShow(true)
      }, 5000);
    }
  }


  return (
    <div>
      <nav className='flex gap-5 px-20 py-4'>
        {userData?.role === "accountant" ? <button
          onClick={() => handleGeneratePDF(tax)}
          className="w-full bg-msu-green text-white max-w-[100px] font-semibold p-3 rounded hover:bg-oxley transition"
        >
          Tax Bill
        </button>:<></>}
        {userData?.role === "sales" ? <button
          onClick={() => handleGeneratePDF(estimate)}
          className="w-full bg-msu-green text-white max-w-[100px] font-semibold p-3 rounded hover:bg-oxley transition"
        >
          Estimated Bill
        </button>:<></>}
      </nav>
      <div className="max-w-md mx-auto my-8 p-8 bg-white rounded-lg shadow-lg">

        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Invoice Details</h2>
        <form >
          {/* Invoice ID */}
          <div className="mb-4">
            <label htmlFor="invoiceId" className="block text-gray-600 font-semibold mb-2">
              Invoice ID
            </label>
            <input
              type="text"
              id="invoiceId"
              name="invoiceId"
              value={formData.invoiceId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter Invoice ID"
            />
          </div>

          {/* IEC Number */}
          <div className="mb-4">
            <label htmlFor="company" className="block text-gray-600 font-semibold mb-2">
              Company
            </label>
            <select
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter IEC Number"
            >
              <option value=''>-- Select Company --</option>
              <option value='nirogam'>Nirogam</option>
              <option value='nd-care-nirogam-pvt-limited'>Nd Care Nirogam PVT Limited</option>

            </select>
          </div>


          <div className="mb-4">
            <label htmlFor="currency" className="block text-gray-600 font-semibold mb-2">
              Currency
            </label>
            <select
              type="text"
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter IEC Number"
            >
              <option value=''>-- Select Currency --</option>
              <option value='USD'>USD</option>
              <option value='GBP'>GBP</option>
              <option value='EUR'>EUR</option>

            </select>
          </div>



          {/* Submit Button */}
          {/* <button
            type="submit"
            className="w-full bg-msu-green text-white font-semibold p-3 rounded hover:bg-oxley transition"
          >
            Submit
          </button> */}
        </form>
      </div>

      {loading ? <Loading /> : ""}

      {/* <PDFViewer style={{ width: '100%', height: "100vh" }}>
            <PdfDocument data={invoiceData}/>
          </PDFViewer> */}
      {taxdownloadBtnShow ? <div className="max-w-md mx-auto my-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="w-full bg-msu-green text-white font-semibold p-3 rounded hover:bg-oxley transition">
          <PDFDownloadLink document={<PdfDocument data={invoiceData} formData={formData} currencyRate={currencyRate} totalInvoiceAmount={totalInvoiceAmount} />} fileName="invoice.pdf" >
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Invoice PDF Download!'
            }
          </PDFDownloadLink>
        </div>
      </div> : ''}


      {estimatedownloadBtnShow ? <div className="max-w-md mx-auto my-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="w-full bg-msu-green text-white font-semibold p-3 rounded hover:bg-oxley transition">
          <PDFDownloadLink document={<EstimatedBill data={invoiceData} formData={formData} currencyRate={currencyRate} totalInvoiceAmount={totalInvoiceAmount} />} fileName="invoice.pdf" >
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Invoice PDF Download!'
            }
          </PDFDownloadLink>
        </div>
      </div> : ''}

    </div>
  );
}

export default Invoice
