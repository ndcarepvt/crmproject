import React, { useContext, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CRMContext } from '../../context/crmContext';
import { useNavigate } from 'react-router-dom';
import PdfDocument from './Pdf/PdfDocument';
import Loading from '../../components/Loading/Loading';
import EstimatedBill from './Pdf/documents/EstimatedBill';

const Invoice = () => {
  const {
    getInvoiceData,
    userData,
    invoiceData,
    formData,
    setFormData,
    setValuesFunc,
    currencyRate,
    totalInvoiceAmount,
    loading,
    setLoading,
    currencySymbolFetch,
  } = useContext(CRMContext);

  const [downloadBtnVisible, setDownloadBtnVisible] = useState({
    tax: false,
    estimate: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showDownloadButton = (type) => {
    setTimeout(() => {
      setLoading(false);
      setDownloadBtnVisible((prev) => ({ ...prev, [type]: true }));
    }, 5000);
  };

  const handleGeneratePDF = (pdfType) => {
    getInvoiceData(formData.invoiceId);
    setValuesFunc(formData.company);
    setLoading(true);
    currencySymbolFetch(formData.currency);
    showDownloadButton(pdfType);
  };

  return (
    <div>
      <nav className="flex gap-5 px-20 py-4">
        {userData?.role === "accountant" && (
          <button
            onClick={() => handleGeneratePDF("tax")}
            className="w-full bg-msu-green text-white max-w-[200px] font-semibold p-3 rounded hover:bg-oxley transition"
          >
            Tax Bill
          </button>
        )}
        {userData?.role === "sales" && (
          <button
            onClick={() => handleGeneratePDF("estimate")}
            className="w-full bg-msu-green text-white max-w-[200px] font-semibold p-3 rounded hover:bg-oxley transition"
          >
            Estimated Bill
          </button>
        )}
      </nav>

      <div className="max-w-md mx-auto my-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Invoice Details</h2>
        <form>
          {/* Invoice ID */}
          <FormInput
            label="Invoice ID"
            name="invoiceId"
            value={formData.invoiceId}
            onChange={handleChange}
            placeholder="Enter Invoice ID"
          />
          {/* Company */}
          <FormSelect
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            options={[
              { value: "", label: "-- Select Company --" },
              { value: "nirogam", label: "Nirogam" },
              { value: "nd-care-nirogam-pvt-limited", label: "Nd Care Nirogam PVT Limited" },
            ]}
          />
          {/* Currency */}
          <FormSelect
            label="Currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            options={[
              { value: "", label: "-- Select Currency --" },
              { value: "USD", label: "USD" },
              { value: "GBP", label: "GBP" },
              { value: "EUR", label: "EUR" },
            ]}
          />
        </form>
      </div>

      {loading && <Loading />}

      {downloadBtnVisible.tax && (
        <DownloadButton
          document={
            <PdfDocument
              data={invoiceData}
              formData={formData}
              currencyRate={currencyRate}
              totalInvoiceAmount={totalInvoiceAmount}
            />
          }
          fileName="invoice.pdf"
          label="Invoice PDF Download!"
        />
      )}

      {downloadBtnVisible.estimate && (
        <DownloadButton
          document={
            <EstimatedBill
              data={invoiceData}
              formData={formData}
              currencyRate={currencyRate}
              totalInvoiceAmount={totalInvoiceAmount}
            />
          }
          fileName="estimate.pdf"
          label="Estimate PDF Download!"
        />
      )}
    </div>
  );
};

const FormInput = ({ label, name, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-600 font-semibold mb-2">
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
      placeholder={placeholder}
    />
  </div>
);

const FormSelect = ({ label, name, value, onChange, options }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-600 font-semibold mb-2">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const DownloadButton = ({ document, fileName, label }) => (
  <div className="max-w-md mx-auto my-8 p-8 bg-white rounded-lg shadow-lg">
    <div className="w-full bg-msu-green text-white font-semibold p-3 rounded hover:bg-oxley transition">
      <PDFDownloadLink document={document} fileName={fileName}>
        {({ loading }) => (loading ? "Loading document..." : label)}
      </PDFDownloadLink>
    </div>
  </div>
);

export default Invoice;
