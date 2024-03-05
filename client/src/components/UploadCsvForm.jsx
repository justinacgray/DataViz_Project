import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as Yup from "yup";
import { CsrfContext } from '../context/CsrfContext';
import { DataframeContext } from '../context/DataframeContext';
import Papa from "papaparse";

const UploadCsvForm = () => {
    
    const { dataframe, setDataframe, parsedFileData, setParsedFileData } = useContext(DataframeContext)
    const {csrfToken, setCsrfToken} = useContext(CsrfContext)
    console.log('CSRF Token is in Form:', csrfToken);

    
    const [file, setFile] = useState({})
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleCSVChange = (e) => {
        setFile(e.target.files[0]);
    };

    const schema = Yup.object().shape({
        file: Yup.mixed().required('CSV file is required'),
    });

    const showCsvFile = () => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: false,
            complete: function (results) {
                setParsedFileData(results.data)
                console.log("PAPAPARSE----->", results.data)
            },
        },
        );
    }
    const submitForm = (e) => {
        e.preventDefault();
        // todo had frontend validations 

        const url = 'http://localhost:8000/api/upload_csv/'
        const formData = new FormData();
        formData.append('file', file);
        console.log("file ---> ", file)
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = "XCSRF-TOKEN"

        const config = {
            withCredentials: true,
            headers: {
                'X-CSRFToken': csrfToken,
            },
        }
        axios.post(url, formData, config)
            .then((response) => {
                console.log("RESPONSE---->", response)
                console.log("FileData---->", response.data.df_info)
                setDataframe(response.data)
                setUploadStatus('File Uploaded Successfully')
                showCsvFile()

            }).catch((error) => {
                console.error('Error uploading file ========', error);
                setUploadStatus('File upload failed');
            })
    }
    console.log("DF", dataframe)


    return (
        <>
        <form className="" onSubmit={submitForm} encType='multipart/form-data' >
            <section className="">
                <h2 className="">Upload a Spreadsheet</h2>
            </section>
            <div className="relative mb-10">
                <input className="block w-full p-2 ps-7 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-[#c0392b] dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-[#c0392b]" name="file" type="file" placeholder="upload spreadsheet" onChange={handleCSVChange} accept={".csv"} />
                <button className="text-white absolute end-2 bottom-1.5 bg-[#e74c3c] hover:bg-[#c0392b] focus:ring-1 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-2 py-1 dark:bg-[#c0392b] dark:hover:bg-[#e74c3c] dark:focus:ring-white" type="submit" value="upload" > Upload </button>
            </div>
        </form>
        {uploadStatus && <p>{uploadStatus}</p>}
        </>
    )
}

export default UploadCsvForm