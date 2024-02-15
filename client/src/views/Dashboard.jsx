import React, { useState, useEffect } from 'react';
import axios from 'axios';

//! Components
import CsrfToken from '../components/CsrfToken';
import StatCards from '../components/StatCards';
import SearchBar from '../components/SearchBar';
import TestChart from '../components/TestChart';

const Dashboard = () => {
  const token = CsrfToken('XCSRF-TOKEN');
  console.log('CSRF Token:', token);

  const [file, setFile] = useState('')
  const [uploadStatus, setUploadStatus] = useState(null);

  useEffect(() => {
    const getCSRFToken = async () => {
      try {
        const response = await axios.get('/api/get_csrf/');
        console.log("resp", response)
        const csrfToken = response.data.CSRFToken;

        // Set the CSRF token in the headers for subsequent requests
        axios.defaults.headers.post['XCSRF-TOKEN'] = csrfToken;
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    getCSRFToken();
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    
    const url = 'http://localhost:8000/api/dash/'
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config =  {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': token,
      },
    }
    axios.post(url, formData, config)
    .then((response)=>{
      console.log("RESPONSE---->", response)
    }).catch ((error) => {
      console.error('Error uploading file:', error);
      setUploadStatus('File upload failed');
      })
  }

  return (
    <>
      <div className="flex flex-wrap justify-center align-center mx-auto m-10">
        <div className="w-full sm:w-1/2 md:w-1/4 p-4"><StatCards /></div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4"><StatCards /></div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4"><StatCards /></div>
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
        <SearchBar />
      </div>

      {/* Bottom half of screen */}

      <div className='flex flex-wrap justify-around w-full mx-auto m-10 p-10'>
        <div className="shadow w-full p-10 sm:w-5/12 md:w-5/12 bg-white dark:bg-gray-700">

        {/* Upload form  */}

          <form className="" onSubmit={submitForm}>
            <section className="">
              <h2 className="">Upload a Spreadsheet</h2>
            </section>
            <div className="relative mb-10">
              <input className="block w-full p-2 ps-7 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-[#c0392b] dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-[#c0392b]" name="spreadsheet" type="file" placeholder="upload spreadsheet"  onChange={(e) => setFile(e.target.value)} />
              <button className="text-white absolute end-2 bottom-1.5 bg-[#e74c3c] hover:bg-[#c0392b] focus:ring-1 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-2 py-1 dark:bg-[#c0392b] dark:hover:bg-[#e74c3c] dark:focus:ring-white" type="submit" value="upload" > Upload </button>
            </div>
          </form>
          
          {/* chart component */}
          <TestChart />

        </div>

        {/* right side div for visual of form  */}
        {uploadStatus && <p>{uploadStatus}</p>}

        <div className="shadow w-full sm:w-5/12 md:w-5/12 p-10 bg-white dark:bg-gray-700">
          THIS IS JUST DUMMY TEXT
        </div>
      </div>
    </>

  )
}

export default Dashboard