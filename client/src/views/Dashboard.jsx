import React, { useState, useEffect, useContext } from 'react';

//! Components
import TestChart from '../components/TestChart';
import TableData from '../components/TableData';
import AllCsvs from '../components/AllCsvs';
import UploadCsvForm from '../components/UploadCsvForm';
import { DataframeContext } from '../context/DataframeContext';
import StatCardsData from '../utils/StatCardsData';
import { CsrfContext } from '../context/CsrfContext';

// const secretToken = import.meta.env.VITE_SECRET_TOKEN 

const Dashboard = () => {
  const { csrfToken, setCsrfToken } = useContext(CsrfContext)
  const { dataframe } = useContext(DataframeContext)
  console.log('CSRF Token is in Dash:', csrfToken);
  const { parsedFileData, setParsedFileData } = useContext(DataframeContext)

  return (
    <>
      <div className="flex flex-wrap justify-center align-center mx-auto m-10">
        <div className="">
          <StatCardsData dataframe={dataframe} />
        </div>
      </div>

      {/* the divider after the top cards */}
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-400 dark:border-gray-200"></div>
        <span className="flex-shrink mx-4 text-gray-400 dark:text-white">Statistics</span>
        <div className="flex-grow border-t border-gray-400 dark:border-gray-200"></div>
      </div>

      {/* SearchBar Component */}
      <div className="block mx-auto w-1/2 text-center">
        <AllCsvs />
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