import React, { useState, useEffect } from 'react'
import axios from 'axios';
import CsrfToken from './CsrfToken';

const secretToken = import.meta.env.VITE_SECRET_TOKEN


const AllCsvs = () => {
    const token = CsrfToken(secretToken);
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
                console.log("res--->", res.data)
                setCsvList(res.data.csvs)
            })
            .catch((err) => {
                console.log("err", err)
            })
    }, [])

    console.log("csvList", csvList)
    return (
        <div>
            <div className="hs-dropdown relative inline-flex [--trigger:hover]">
                <button id="hs-dropdown-hover-event" type="button" className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    Choose a dataframe
                    <svg className="hs-dropdown-open:rotate-180 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </button>

                <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full" aria-labelledby="hs-dropdown-hover-event">

                        {csvList.map((csv, idx) => (
                            <a key={idx} href="#" className="flex items-center gap-x-3.5 py-1 px-2 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700">{csv.file_name}</a>
                        ))}
        
                </div>
            </div>

            
        </div>
            )
} 
export default AllCsvs