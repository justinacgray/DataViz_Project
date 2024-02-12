import React from 'react'
import ThemeSwitch from './ThemeSwitch'

const Navbar = () => {
  return (
   <>
    <nav className=" mx-auto font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-center py-1 px-6 bg-[#e74c3c] sm:items-baseline w-full shadow-md border-b border-[#c0392b]">
        <div className="mb-2 sm:mb-0">
          <a href="#" className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">DataViz</a>
          <ThemeSwitch />
        </div>
      </nav>
      </>
    
  )
}

export default Navbar