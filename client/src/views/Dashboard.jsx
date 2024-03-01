import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Papa from "papaparse";
//! Components
// import CsrfToken from '../components/CsrfToken';
import StatCards from '../components/StatCards';
import TestChart from '../components/TestChart';
import TableData from '../components/TableData';
import AllCsvs from '../components/AllCsvs';
import { DataframeContext } from '../context/DataframeContext';

const secretToken = import.meta.env.VITE_SECRET_TOKEN 

const Dashboard = () => {
  // const token = CsrfToken(secretToken);
  // console.log('CSRF Token is in Dash:', token);
  const [cookieValue, setCookieValue] = useState(null)

  const [file, setFile] = useState({})
  const [uploadStatus, setUploadStatus] = useState(null);
  const [parsedFileData, setParsedFileData] = useState([]);
  
  const {dataframe, setDataframe} = useContext(DataframeContext)


  const handleCSVChange = (e) => {
    setFile(e.target.files[0]);
  };

  const showCsvFile = () => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: false,
      complete: function (results) {
        setParsedFileData(results.data)
        console.log("PAPAPARSE----->",results.data)
      },
    },
    );
  }

  const processData = (each_row, each_value) => {
    // You can do whatever you need with the processed data here
    console.log('Rows:', each_row);
    console.log('Values:', each_value);
  };

  useEffect(() => {
    const getCSRFToken = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get_csrf/', {withCredentials: true});
        const newCsrfToken = response.data.csrfToken;
        setCookieValue(newCsrfToken)
        console.log("RESPONSE from DB", response.data.csrfToken)
        // Set the CSRF token in the headers for subsequent requests
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    getCSRFToken();
  }, []);

  const submitForm = (e) => {
    e.preventDefault();

    const url = 'http://localhost:8000/api/upload_csv/'
    const formData = new FormData();
    formData.append('file', file);
    console.log("file ---> ", file)
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = "XCSRF-TOKEN"

    const config = {
      withCredentials: true,
      headers: {
        'X-CSRFToken': cookieValue,
      },
    }
    axios.post(url, formData, config)
      .then((response) => {
        console.log("RESPONSE---->", response)
        console.log("FileData---->", response.data.df_info)
        setDataframe(response.data)
        showCsvFile()

      }).catch((error) => {
        console.error('Error uploading file ========', error);
        setUploadStatus('File upload failed');
      })
  }
  console.log("DF", dataframe)

  return (
    <>
      <div className="flex flex-wrap justify-center align-center mx-auto m-10">
        <div className="w-full sm:w-1/2 md:w-1/4 p-4"><StatCards /> Basic Summary - # of rows/ columns/ duplicates/ missing values</div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4"><StatCards /> Describe (mean, medium)</div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4"><StatCards /> Data Types</div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4"><StatCards /></div>
      </div>

      {/* the divider after the top cards */}

      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-400 dark:border-gray-200"></div>
        <span className="flex-shrink mx-4 text-gray-400 dark:text-white">Statistics</span>
        <div className="flex-grow border-t border-gray-400 dark:border-gray-200"></div>
      </div>

      {/* SearchBar Component */}

      <div className="block mx-auto w-1/2 text-center">
        <AllCsvs/>
      </div>

      {/* Bottom half of screen */}

      <div className='flex flex-wrap justify-around w-full mx-auto m-10 p-10'>
        <div className="shadow w-full p-10 sm:w-5/12 md:w-5/12 bg-white dark:bg-gray-700">

          {/* Upload form  */}

          <form className="" onSubmit={submitForm} encType='multipart/form-data' >
            <section className="">
              <h2 className="">Upload a Spreadsheet</h2>
            </section>
            <div className="relative mb-10">
              <input className="block w-full p-2 ps-7 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-[#c0392b] dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-[#c0392b]" name="file" type="file" placeholder="upload spreadsheet" onChange={handleCSVChange} />
              <button className="text-white absolute end-2 bottom-1.5 bg-[#e74c3c] hover:bg-[#c0392b] focus:ring-1 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-2 py-1 dark:bg-[#c0392b] dark:hover:bg-[#e74c3c] dark:focus:ring-white" type="submit" value="upload" > Upload </button>
            </div>
          </form>

          {/* chart component */}
          <TestChart />
          {/* <TableData fileData={fileData}/> */}

        </div>

        {/* right side div for visual of form  */}
        {uploadStatus && <p>{uploadStatus}</p>}

        <div className="shadow w-full sm:w-5/12 md:w-5/12 p-10 bg-white dark:bg-gray-700">
          <TableData parsedFileData={parsedFileData}  processData={processData}/>
        </div>
      </div>
    </>

  )
}

export default Dashboard