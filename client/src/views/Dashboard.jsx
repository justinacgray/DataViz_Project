import React, { useState, useEffect, useContext } from 'react';

//! Components
import TestChart from '../components/TestChart';
import TableData from '../components/TableData';
import AllCsvs from '../components/AllCsvs';
import UploadCsvForm from '../components/UploadCsvForm';
import { DataframeContext } from '../context/DataframeContext';
import StatCardsData from '../utils/StatCardsData';
import { CsrfContext } from '../context/CsrfContext';
import DataAnalysisForm from '../components/DataAnalysisForm'

// const secretToken = import.meta.env.VITE_SECRET_TOKEN 

const Dashboard = () => {
  const { csrfToken, setCsrfToken } = useContext(CsrfContext)
  const { dataframe } = useContext(DataframeContext)
  console.log('CSRF Token is in Dash:', csrfToken);
  const { parsedFileData, setParsedFileData } = useContext(DataframeContext)

  return (
    <>
      <div className="flex flex-wrap justify-center m-10 mx-auto align-center">
        <div className="">
          <StatCardsData dataframe={dataframe} />
        </div>
      </div>

      {/* the divider after the top cards */}
      <div className="relative flex items-center py-5">
        <div className="flex-grow border-t border-gray-400 dark:border-gray-200"></div>
        <span className="flex-shrink mx-4 text-gray-400 dark:text-white">Statistics</span>
        <div className="flex-grow border-t border-gray-400 dark:border-gray-200"></div>
      </div>

      {/* Dropdown Component */}
      <div className="block w-1/2 mx-auto text-center">
        <AllCsvs />
      </div>

      {/* Bottom half of screen */}
      <div className='flex flex-wrap justify-around w-full p-10 m-10 mx-auto'>
        <div className="w-full p-10 bg-white shadow sm:w-5/12 md:w-5/12 dark:bg-gray-700">

          {/* Upload Form  */}
          <UploadCsvForm />
          {/* DataAnalysis Form */}
          <DataAnalysisForm />
        </div>
        
        {/* right side div for visual of form  */}
        <div className="w-full p-10 bg-white shadow sm:w-5/12 md:w-5/12 dark:bg-gray-700">
          <TableData parsedFileData={parsedFileData} />
        </div>
      </div>
    </>

  )
}

export default Dashboard