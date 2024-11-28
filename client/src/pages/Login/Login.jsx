import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { CRMContext } from '../../context/crmContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

    const {URL, token, setToken, setIsAuthenticated, setLoading, fetchUserData} = useContext(CRMContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // handle form submission here
        setLoading(true)
        
        try {
            const response = await axios.post( `${URL}/api/user/login`, formData)
            if(response.data.success){
                setToken(response.data.authData)
                localStorage.setItem('token', response.data.authData)
                fetchUserData( response.data.authData )
                setLoading(false)
                toast.success(response.data.message)
                navigate('/dashboard')
                setIsAuthenticated(true)

            } else {
                setLoading(false)
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(response.data.message)
        }


    };

    useEffect(() => {
      
        if(token){
            navigate('/dashboard')
        }

    }, [token])
    



    return (
        <div className='my-[20%] xl:my-[8%]'>
            <div className="max-w-md mx-auto my-8 p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login Form</h2>
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-600 font-semibold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter Name"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter Password"
                        />
                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-msu-green text-white font-semibold p-3 rounded hover:bg-oxley transition"
                    >
                        Login
                    </button>
                </form>
            </div>

        </div>
    )
}

export default Login