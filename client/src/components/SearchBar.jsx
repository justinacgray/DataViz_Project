import React, { useState } from 'react';
import AllCsvs from '../components/AllCsvs';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('')

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

// todo- fix dropdown
  return (

    <div>

      <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
      </svg>
      </button>

  
      <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <AllCsvs/>
        </ul>
      </div>

    </div>

  )
}

export default SearchBar