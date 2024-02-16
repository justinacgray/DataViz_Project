import React,{useState} from 'react'

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('')

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };


  return (
    <div>
      <form>
        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-[#c0392b] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-[#c0392b]" placeholder="Search" required value={searchValue}
            onChange={handleChange} />
          <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-[#e74c3c] hover:bg-[#c0392b] focus:ring-1 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#c0392b] dark:hover:bg-[#e74c3c] dark:focus:ring-white" >Search</button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar