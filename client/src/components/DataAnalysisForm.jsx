import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios';
import { CsrfContext } from '../context/CsrfContext';


const DataAnalysisForm = () => {
    
    const {csrfToken, setCsrfToken} = useContext(CsrfContext)
    const [functonNames, setFunctionNames] = useState([]);

    useEffect(() => {
        // const url = 'http://localhost:8000/api/get_all_function_names/'
        const config = {
            withCredentials: true,
            headers: {
                'X-CSRFToken': csrfToken,
            },
        }
        // axios.get(url, config)
        .then((response) => {
            console.log("RESPONSE---->", response)
        }).catch((error) => {
            console.error('Error with function names========', error);
    }, [])

    return (
        <form>
            DataAnalysisForm
        </form>
    )
}

export default DataAnalysisForm