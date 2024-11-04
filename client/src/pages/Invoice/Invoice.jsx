import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Pdf from './Pdf/PdfDocument';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { CRMContext } from '../../context/crmContext';
import { useNavigate } from 'react-router-dom';
import PdfDocument from './Pdf/PdfDocument';

const Invoice = () => {
  
  const { getInvoiceData, invoiceData, formData, setFormData, setValuesFunc, currencyRate, totalInvoiceAmount, downloadBtnShow, setDownloadBtnShow } = useContext(CRMContext)
  const navigate = useNavigate()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
    console.log(formData);
    getInvoiceData(formData.invoiceId)
    setValuesFunc(formData.company)
    setTimeout(() => {
      setDownloadBtnShow(true)
    }, 5000);
    
  };


  return (
    <div>
        <div className="max-w-md mx-auto my-8 p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Invoice Details</h2>
          <form onSubmit={handleSubmit}>
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

              </select>
            </div>



            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-msu-green text-white font-semibold p-3 rounded hover:bg-oxley transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* <PDFViewer style={{ width: '100%', height: "100vh" }}>
            <PdfDocument data={invoiceData}/>
          </PDFViewer> */}
        {downloadBtnShow ? <div className="max-w-md mx-auto my-8 p-8 bg-white rounded-lg shadow-lg">
          <div className="w-full bg-msu-green text-white font-semibold p-3 rounded hover:bg-oxley transition">
            <PDFDownloadLink document={<PdfDocument data={invoiceData} formData={formData} currencyRate={currencyRate} totalInvoiceAmount={totalInvoiceAmount} />} fileName="invoice.pdf" >
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Download now!'
              }
            </PDFDownloadLink>
          </div> 
        </div> : '' }

      </div>
  );
}

export default Invoice
