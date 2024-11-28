import { createContext, useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { currencySymbol } from "../assets/currencySymbol";
import { toast } from "react-toastify";

export const CRMContext = createContext(null);

const CRMContextProvider = (props) => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(false)
    const [incentives, setIncentives] = useState([]);
    const [userData, setUserData] = useState({})
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();


    // Authentication Functions
    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setToken("");
        localStorage.removeItem('token');
        toast.info("User Logout")
        navigate('/'); // Navigate after clearing token
        setIsAuthenticated(false);
    };

    const fetchUserData = useCallback(async (token) => {
        try {
            const response = await axios.post(URL + "/api/user/getuserdetails", {}, { headers: { token } });
            if (response.data.success) {
                setUserData(response.data.userData);
                console.log(response.data.userData);
                toast.success(response.data.message);

            } else {
                console.log("hi");

                if (response.data.message === "Expire token, please log in again." || response.data.message === "Invalid token, please log in again.") {
                    toast.error(response.data.message);
                    setToken("");
                    localStorage.removeItem("token");
                    navigate('/');
                } else {
                    toast.error(response.data.message);

                }
            }
        } catch (error) {

            if (error.response.data.message == "Expired token, please log in again." || error.response.data.message == "Invalid token, please log in again.") {
                console.log(error.response.data.message);
                toast.error(error.response.data.message);
                localStorage.removeItem("token");
                setToken("");
                setIsAuthenticated(false)
                navigate('/');

            } else {
                toast.error(error.response.data.message);
            }
            console.log(error);
        }
    }, []);

    const loadData = useCallback(() => {
        const loginToken = localStorage.getItem("token");
        if (loginToken) {
            setToken(loginToken);
            fetchUserData(loginToken);
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const contextValue = {
        URL, token, setToken,
        isAuthenticated, setIsAuthenticated,
        login, logout, loading, setLoading,
        userData, setUserData, fetchUserData, incentives, setIncentives
    };

    return (
        <CRMContext.Provider value={contextValue}>
            {props.children}
        </CRMContext.Provider>
    );
};

export default CRMContextProvider;
