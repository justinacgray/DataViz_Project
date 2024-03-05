import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

//! Components
import StatCards from '../components/StatCards';
import TestChart from '../components/TestChart';
import TableData from '../components/TableData';
import AllCsvs from '../components/AllCsvs';
import UploadCsvForm from '../components/UploadCsvForm';
import { DataframeContext } from '../context/DataframeContext';
import { CsrfContext } from '../context/CsrfContext';


// const secretToken = import.meta.env.VITE_SECRET_TOKEN 

const Dashboard = () => {
  const {csrfToken, setCsrfToken} = useContext(CsrfContext)
  console.log('CSRF Token is in Dash:', csrfToken);
  const { parsedFileData, setParsedFileData } = useContext(DataframeContext)
 
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

          <UploadCsvForm />

          {/* chart component */}
          <TestChart />

        </div>

        {/* right side div for visual of form  */}

        <div className="shadow w-full sm:w-5/12 md:w-5/12 p-10 bg-white dark:bg-gray-700">
          <TableData parsedFileData={parsedFileData} />
        </div>
      </div>
    </>

  )
}

export default Dashboard