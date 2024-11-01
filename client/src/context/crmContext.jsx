import { createContext, useCallback, useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const CRMContext = createContext(null)

const CRMContextProvider = (props) => {

    const URL = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()
    const [token, setToken] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [invoiceData, setInvoiceData] = useState(null)
    const [totalInvoiceAmount, setTotalInvoiceAmount] = useState()
    const [currencyRate, setCurrencyRate] = useState()
    const [otherData, setOtherData] = useState()
    const [downloadBtnShow, setDownloadBtnShow] = useState()
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
        consultationCost: 0
    });


    // INVOICE FUNCTIONS


    const getInvoiceData = async (invoiceId) => {

        const url = `https://ndayurveda.info/api/invoice/byid?billid=${invoiceId}`;

        axios.get(url)
            .then(response => {

                console.log('Invoice Data:', response.data);
                setInvoiceData(response.data)
                console.log(response.data)
                formData.discount = response.data[0].pbill.discount
                formData.courierCost = response.data[0].pbill.courier
                formData.consultationCost = response.data[0].pbill.consultation
                getInvoiceDate(response.data[0].pbill.dated)
                handlerCurrencyFetcher(response.data[0].pbill.currency, response.data)
                getPatientDetail(response.data[0].pbill.enq_code)

            })
            .catch(error => {
                console.error('Error fetching invoice:', error);
            });
    }

    const getInvoiceDate = (dateString) => {
        const date = new Date(dateString);

        // Format date as YYYY-MM-DD
        const formattedDate = date.toISOString().split("T")[0];

        // Or format with toLocaleDateString for a more readable format
        const readableDate = date.toLocaleDateString("en-GB", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        formData.invoiceDate = readableDate
    }

    const getPatientDetail = (patientId) => {
        const url = `https://ndayurveda.info/api/invoice/patient?enqid=${patientId}`;

        axios.get(url)
            .then(response => {

                // console.log('Patient Data:', response.data);
                // console.log(response.data)
                formData.patientName = response.data.patient_name
                formData.patientAddress = response.data.address

            })
            .catch(error => {
                console.error('Error fetching invoice:', error);
            });
    }

    const handlerCurrencyFetcher = async (currency, invoiceData) => {

        const options = {
            method: 'GET',
            url: 'https://currency-converter-pro1.p.rapidapi.com/convert',
            params: {
                from: currency,
                to: formData.currency,
                amount: '1',
            },
            headers: {
                'x-rapidapi-key': '3a502a33famsh003e2d375ecab8dp1d7a4ajsnbd0447a22137',
                'x-rapidapi-host': 'currency-converter-pro1.p.rapidapi.com'
            },
        };

        try {
            const response = await axios.request(options);
            // console.log(response.data);
            setCurrencyRate(response.data.result)
            setTimeout(() => {
                handleTotalAmount(invoiceData, response.data.result)
            }, 2000);

        } catch (error) {
            console.error(error);
        }

    }

    const setValuesFunc = (company) => {
        if (company == "nirogam") {
            formData.iecNumber = '1214001602'
            formData.lutNumber = 'AD030119000043Z'
            formData.gstNumber = '03CQEPS7769C1ZM'
            formData.company = "Nirogam"

        } else if (company == 'nd-care-nirogam-pvt-limited') {
            formData.iecNumber = '1215002521'
            formData.lutNumber = 'AD030219000085P'
            formData.gstNumber = '03AAECN7808A1ZX'
            formData.company = "Nd Care Nirogam PVT Limited"
        } else {
            formData.iecNumber = ''
            formData.lutNumber = ''
            formData.gstNumber = ''
        }
    }

    const handleTotalAmount = (invoiceData, currencyRate) => {
        let totalAmount = 0;

        // console.log(currencyRate);
        // console.log(invoiceData);

        invoiceData.map(item => {
            // console.log(item.pbill.total);

            totalAmount += (Number(item.pbill.total) * currencyRate);
            // console.log(item.pbill.total, currencyRate);
            // console.log(totalAmount);

        });

        // Apply .toFixed(2) after the entire sum is calculated
        totalAmount = (totalAmount).toFixed(2)
        // console.log(totalAmount, formData.courierCost, formData.consultationCost, Number(totalAmount) + Number(formData.courierCost) + Number(formData.consultationCost));

        formData.totalAmount = (Number(totalAmount) + Number(formData.courierCost) + Number(formData.consultationCost)).toFixed(2);

        // console.log(formData);
        // setTotalInvoiceAmount(parseFloat(totalAmount));  // Convert back to number if needed
    };


    // Authentication Functions

    const login = () => {
        setIsAuthenticated(true)
    };


    const logout = () => {
        setToken("")
        localStorage.removeItem('token')
        navigate('/')
        setIsAuthenticated(false)
    };

    const loadData = useCallback(() => {
        const loginToken = localStorage.getItem("token");
        if (loginToken) {
            setToken(loginToken);
            setIsAuthenticated(true)
        }
    }, []);

    useEffect(() => {
        loadData();
        // console.log(URL);
        setIsAuthenticated(true)

    }, [loadData]);




    const contextValue = {

        // Variables 

        URL, token, setToken,
        formData, setFormData,
        invoiceData, setInvoiceData,
        currencyRate, setCurrencyRate,
        downloadBtnShow, setDownloadBtnShow,
        isAuthenticated, setIsAuthenticated,
        totalInvoiceAmount, setTotalInvoiceAmount,

        // Functions

        login, logout,
        setValuesFunc, handlerCurrencyFetcher,
        getInvoiceData, handleTotalAmount,

    }

    return (
        <CRMContext.Provider value={contextValue}>
            {props.children}
        </CRMContext.Provider>
    )
}

export default CRMContextProvider