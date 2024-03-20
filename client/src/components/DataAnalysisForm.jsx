import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { CsrfContext } from '../context/CsrfContext';
import DataCleanseDropDown from './DataCleanseDropDown';


const DataAnalysisForm = () => {

    const { csrfToken, setCsrfToken } = useContext(CsrfContext);
    const [functionNames, setFunctionNames] = useState([]);
    const [selectedFunctionNames, setSelectedFunctionNames] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleanseFromData = new FormData(e.target);
        const formFunctionNames = cleanseFromData.getAll('functionNames');
        console.log('Selected function names:', formFunctionNames);
    };


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
                    setFunctionNames(response.data.function_names);
                    // Set the CSRF token in the headers for subsequent requests
                } catch (error) {
                    console.error('Error fetching Function Name:', error);
                }
            };
            getFunctionNames();
            
        }, []);




    return (
        <form onSubmit={handleSubmit}>
        <DataCleanseDropDown functionNames={functionNames} onSelectChange={setSelectedFunctionNames} selectedFunctionNames={selectedFunctionNames}/>
        <button type="submit">Submit</button>
    </form>
    )
}

export default DataAnalysisForm