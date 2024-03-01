import React, { useState, useEffect } from 'react'
import axios from 'axios';


const secretToken = import.meta.env.VITE_SECRET_TOKEN

// todo: need to lift state or put in context 
// should it be on App level instead? where to move it? determine hierarchy 


const AllCsvs = () => {
    
    const [csvList, setCsvList] = useState([])

    useEffect(() => {
        const url = 'http://localhost:8000/api/get_all_csvs/'
        const config = {
            withCredentials: true,
            headers: {
                'X-CSRFToken': token,
            },
        }
        axios.get(url, config)
            .then((res) => {
                console.log("RESSS DATAAA--->", res.data.csvs)
                setCsvList(res.data.csvs)
            })
            .catch((err) => {
                console.log("err", err)
            })
    }, [])

    return (
        <div>
            <div className="dropdown inline-block relative">
                <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                    <span className="mr-1">Uploaded CSV Files</span>
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                </button>
                <ul className="dropdown-menu absolute hidden text-gray-100 pt-1">
                    <li className="">
                        {csvList.map((csv, idx) => (
                            <a key={idx} href="#" className="rounded-t bg-gray-700 hover:bg-gray-500 py-2 px-4 block whitespace-no-wrap">{csv.file_name}</a>
                        ))}
                    </li>
                </ul>
            </div>

        </div>




    )
}
export default AllCsvs