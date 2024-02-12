import React from 'react'

const Navbar = () => {
  return (
   <>
    <nav className=" mx-auto font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-center py-4 px-6 bg-[#144769] shadow sm:items-baseline w-full">
        <div className="mb-2 sm:mb-0">
          <a href="#" className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">DataViz</a>
        </div>
      </nav>
      </>
    
  )
}

export default Navbar