import React, {useState, useEffect} from 'react'
import axios from 'axios';
import CsrfToken from './CsrfToken';

const secretToken = import.meta.env.VITE_SECRET_TOKEN 


const AllCsvs = () => {
    const token = CsrfToken(secretToken);
    const [csvList, setCsvList] = useState([])

    useEffect(() => {
        const url = 'http://localhost:8000/api/get_all_csvs/'
        const config =  {
            withCredentials: true,
            headers: {
                'X-CSRFToken': token,
            },
        }
        axios.get(url,config)
        .then((res) => {
            console.log("res--->", res.data)
            setCsvList(res.data.csvs)
        })
        .catch((err) => {
            console.log("err", err)
        })
    }, [])

    console.log("csvList", csvList)
    return (
        
        <li>
            {csvList.map((csv, idx) => (
                <a key={idx} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{csv.file_name}</a>
            ))}
        </li>
    )
}

export default AllCsvs