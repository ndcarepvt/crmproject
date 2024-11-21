import React, { useContext, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CRMContext } from '../../context/crmContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import EstimatedBill from './Pdf/documents/EstimatedBill';
import PdfDocument from './Pdf/documents/PdfDocument';
import axios from 'axios';


const Invoice = () => {
  const {
    userData,
    loading,
    setLoading,
  } = useContext(CRMContext);

  const [invoiceData, setInvoiceData] = useState(null);
    const [totalInvoiceAmount, setTotalInvoiceAmount] = useState();
    const [currencyRate, setCurrencyRate] = useState();
    const [otherData, setOtherData] = useState();

    const [formData, setFormData] = useState({
        invoiceId: '',
        invoiceDate: '',
        patientName: '',
        patientAddress: '',
        company: '',
        courier: '',
        iecNumber: '',
        gstNumber: '',
        lutNumber: '',
        currency: '',
        totalAmount: 0,
        discount: '',
        courierCost: 0,
        consultationCost: 0,
        numberToWord: "",
        currencySymbol: ""
    });

  const [downloadBtnVisible, setDownloadBtnVisible] = useState({
    tax: false,
    estimate: false,
  });
  const navigate = useNavigate();


  const getInvoiceData = async (invoiceId) => {
    const url = `https://ndayurveda.info/api/invoice/byid?billid=${invoiceId}`;
    try {
      const response = await axios.get(url);
      setInvoiceData(response.data);
      console.log(response.data);

      handlerCurrencyFetcher(response.data[0].pbill.currency, response.data);
      getInvoiceDate(response.data[0].pbill.dated);
      getPatientDetail(response.data[0].pbill.enq_code);


    } catch (error) {
      console.error('Error fetching invoice:', error);
    }
  };

  const getInvoiceDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0];
    const readableDate = date.toLocaleDateString("en-GB", {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    formData.invoiceDate = readableDate;
  };

  const getPatientDetail = async (patientId) => {
    const url = `https://ndayurveda.info/api/invoice/patient?enqid=${patientId}`;
    try {
      const response = await axios.get(url);
      formData.patientName = response.data.patient_name;
      formData.patientAddress = response.data.address;
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  const handlerCurrencyFetcher = async (currency, invoiceData) => {
    const options = {
      method: 'GET',
      url: 'https://currency-converter-pro1.p.rapidapi.com/convert',
      params: { from: currency, to: formData.currency, amount: '1' },
      headers: {
        'x-rapidapi-key': '3a502a33famsh003e2d375ecab8dp1d7a4ajsnbd0447a22137',
        'x-rapidapi-host': 'currency-converter-pro1.p.rapidapi.com'
      },
    };
    try {
      const response = await axios.request(options);
      setCurrencyRate(response.data.result);
      let currencyRate = response.data.result

      formData.discount = Math.round(Number(invoiceData[0].pbill.discount) * currencyRate);
      formData.courierCost = Math.round(Number(invoiceData[0].pbill.courier) * currencyRate);
      formData.consultationCost = Math.round(Number(invoiceData[0].pbill.consultation) * currencyRate);

      setTimeout(() => {
        handleTotalAmount(invoiceData, response.data.result);
      }, 2000);
    } catch (error) {
      console.error(error);
    };
  };

  const setValuesFunc = (company) => {
    if (company === "nirogam") {
      formData.iecNumber = '1214001602';
      formData.lutNumber = 'AD030119000043Z';
      formData.gstNumber = '03CQEPS7769C1ZM';
      formData.company = "Nirogam";
    } else if (company === 'nd-care-nirogam-pvt-limited') {
      formData.iecNumber = '1215002521';
      formData.lutNumber = 'AD030219000085P';
      formData.gstNumber = '03AAECN7808A1ZX';
      formData.company = "Nd Care Nirogam PVT Limited";
    } else {
      formData.iecNumber = '';
      formData.lutNumber = '';
      formData.gstNumber = '';
    }
  };

  const handleTotalAmount = (invoiceData, currencyRate) => {
    let totalAmount = 0;
    invoiceData.forEach(item => {
      totalAmount += Number(item.pbill.total) * currencyRate;
    });
    formData.totalAmount = Math.round((Number(totalAmount) + Number(formData.courierCost) + Number(formData.consultationCost)).toFixed(2));
    const number = Number(formData.totalAmount - formData.discount)
    numberToWords(number)
  };

  const currencySymbolFetch = (currency) => {
    currencySymbol.map(item => {
      if (item.abbreviation === currency) {
        formData.currencySymbol = item.symbol

      } else {
        formData.currencySymbol = ""
      }
    })
  }


  const numberToWords = (num) => {
    if (num === 0) return "zero";

    const belowTwenty = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
      "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen",
      "eighteen", "nineteen"];

    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const thousands = ["", "thousand", "million", "billion"];

    function helper(n) {
      if (n === 0) return "";
      else if (n < 20) return belowTwenty[n] + " ";
      else if (n < 100) return tens[Math.floor(n / 10)] + " " + helper(n % 10);
      else return belowTwenty[Math.floor(n / 100)] + " hundred " + helper(n % 100);
    }

    let word = "";
    let thousandIdx = 0;

    while (num > 0) {
      if (num % 1000 !== 0) {
        word = helper(num % 1000) + thousands[thousandIdx] + " " + word;
      }
      num = Math.floor(num / 1000);
      thousandIdx++;
    }

    formData.numberToWord = word.trim() + " " + "only";
  }

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
    <div className='bg-gray-100 h-screen'>
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
