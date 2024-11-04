import { createContext, useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { currencySymbol } from "../assets/currencySymbol";

export const CRMContext = createContext(null);

const CRMContextProvider = (props) => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [invoiceData, setInvoiceData] = useState(null);
    const [totalInvoiceAmount, setTotalInvoiceAmount] = useState();
    const [currencyRate, setCurrencyRate] = useState();
    const [otherData, setOtherData] = useState();
    const [downloadBtnShow, setDownloadBtnShow] = useState();
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
        numberToWord:"",
        currencySymbol:""
    });

    const navigate = useNavigate();

    const getInvoiceData = async (invoiceId) => {
        const url = `https://ndayurveda.info/api/invoice/byid?billid=${invoiceId}`;
        try {
            const response = await axios.get(url);
            console.log('Invoice Data:', response.data);
            setInvoiceData(response.data);
            formData.discount = response.data[0].pbill.discount;
            formData.courierCost = response.data[0].pbill.courier;
            formData.consultationCost = response.data[0].pbill.consultation;
            getInvoiceDate(response.data[0].pbill.dated);
            handlerCurrencyFetcher(response.data[0].pbill.currency, response.data);
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
            setTimeout(() => {
                handleTotalAmount(invoiceData, response.data.result);
            }, 2000);
        } catch (error) {
            console.error(error);
        }
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
        numberToWords(formData.totalAmount)

    };

    const currencySymbolFetch = (currency) =>{
        currencySymbol.map(item => {
            if(item.abbreviation === currency){
                formData.currencySymbol = item.symbol
                console.log(item.symbol);
                
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
      
        formData.numberToWord =  word.trim() + " " + "only";
      }

    // Authentication Functions
    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setToken("");
        localStorage.removeItem('token');
        navigate('/'); // Navigate after clearing token
        setIsAuthenticated(false);
    };

    const loadData = useCallback(() => {
        const loginToken = localStorage.getItem("token");
        if (loginToken) {
            setToken(loginToken);
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const contextValue = {
        URL, token, setToken,
        formData, setFormData,
        invoiceData, setInvoiceData,
        currencyRate, setCurrencyRate,
        downloadBtnShow, setDownloadBtnShow,
        isAuthenticated, setIsAuthenticated,
        totalInvoiceAmount, setTotalInvoiceAmount,
        login, logout, loading, setLoading, 
        setValuesFunc, handlerCurrencyFetcher,
        getInvoiceData, handleTotalAmount, numberToWords,
        currencySymbolFetch,
    };

    return (
        <CRMContext.Provider value={contextValue}>
            {props.children}
        </CRMContext.Provider>
    );
};

export default CRMContextProvider;
