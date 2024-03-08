import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { CsrfContext } from '../context/CsrfContext';


const DataAnalysisForm = () => {

    const { csrfToken, setCsrfToken } = useContext(CsrfContext);
    const [functonNames, setFunctionNames] = useState([]);


    useEffect(() => {
        const url = 'http://localhost:8000/api/get_all_function_names/'
        const config = {
            withCredentials: true,
            headers: {
                'X-CSRFToken': csrfToken,
            }
        }
        const getFunctionNames = async () => {
                try {
                    const response = await axios.get(url, config);
                    console.log("RESPONSE ^^^^^ ", response)
                    // Set the CSRF token in the headers for subsequent requests
                } catch (error) {
                    console.error('Error fetching Function Name:', error);
                }
            };
            getFunctionNames();
        }, []);

    return (
        <form>
            DataAnalysisForm
        </form>
    )
}

export default DataAnalysisForm