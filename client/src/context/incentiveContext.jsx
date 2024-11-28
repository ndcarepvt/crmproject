import { createContext, useContext, useState } from "react";
import { CRMContext } from "./crmContext";
import axios from "axios";
import { toast } from "react-toastify";

export const IncentiveContext = createContext(null)

const IncentiveContextProvider = (props) => {

    const { incentives, setIncentives, token, userData, URL } = useContext(CRMContext)
    const [allIncentives, setAllIncentives] = useState([])

    // Fetch all incentives (GET data)
  const fetchIncentives = async () => {
    try {
      const response = await axios.get(`/api/incentive/getall`); // Update with your backend URL
      setIncentives(response.data.data);
      setAllIncentives(response.data.data);
      console.log(response.data.data);

    } catch (err) {

      console.error('Error:', err);
    }
  };

    const fetchFilteredIncentives = async () => {
        try {

            // Axios GET request with query string
            const response = await axios.get(`/api/incentive/getfilter`, { headers: { token } }); // Adjust the URL as needed
            setIncentives(response.data.data);
            setAllIncentives(response.data.data)
            console.log(response.data.data);

        } catch (err) {

            console.error('Error:', err);
            toast.error(err.message)
        }
    };

    const fetchIncentive = () => {
        if (userData.role === 'accounts') {
            fetchIncentives()
        } else if (userData.role === 'sales') {
            fetchFilteredIncentives()
        }
    }


    const contextValue = {
        fetchIncentives, fetchFilteredIncentives, fetchIncentive, allIncentives, setAllIncentives
    };

    return (
        <IncentiveContext.Provider value={contextValue}>
            {props.children}
        </IncentiveContext.Provider>
    )
}

export default IncentiveContextProvider