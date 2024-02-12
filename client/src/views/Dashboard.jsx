import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CsrfToken from '../components/CsrfToken';
import StatCards from '../components/StatCards';
import SearchBar from '../components/SearchBar';



const Dashboard = () => {
  const token = CsrfToken('csrftoken');

  console.log('CSRF Token:', CsrfToken);
  
  const [spreadsheet, setSpreadsheet] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8000/api/dash`)
    .then((response)=>{
      console.log("RESPONSE---->", response)
    }).catch((error)=>{
      console.log(error)
    }, [])



  }



    
  return (
    <>
<<<<<<< Updated upstream
      <form className="" onSubmit={submitForm}>
        <section className="">
          <h2>Upload a Spreadsheet</h2>
        </section>
          <input name="spreadsheet" type="text" placeholder="enter spreadsheet" onChange={(e) => setSpreadsheet(e.target.value)} />
        <section className="">
          <input className="btn btn-primary" type="submit" value="Enter!" />
        </section>
      </form>
=======
    <div className="flex flex-wrap justify-center align-center mx-auto m-10">
      <div className="w-full sm:w-1/2 md:w-1/4 p-4"><StatCards /></div>
      <div className="w-full sm:w-1/2 md:w-1/4 p-4"><StatCards /></div>
      <div className="w-full sm:w-1/2 md:w-1/4 p-4"><StatCards /></div>
      <div className="w-full sm:w-1/2 md:w-1/4 p-4"><StatCards /></div>
    </div>

    <div className="relative flex py-5 items-center">
      <div className="flex-grow border-t border-gray-200"></div>
      <span className="flex-shrink mx-4 text-gray-400 dark:text-white">Statistics</span>
      <div className="flex-grow border-t border-gray-200"></div>
    </div>

    <div className="block mx-auto w-1/2 text-center">
      <SearchBar />
    </div>

    <div className='flex flex-wrap justify-around w-full mx-auto m-10 p-10'>
      <div className="shadow w-full p-10 sm:w-5/12 md:w-5/12 dark:bg-gray-700">
        <form className="" onSubmit={submitForm}>
          <section className="">
            <h2>Upload a Spreadsheet</h2>
          </section>
            <input name="spreadsheet" type="text" placeholder="enter spreadsheet" onChange={(e) => setSpreadsheet(e.target.value)} />
            <input type="hidden" name="csrfmiddlewaretoken" value={token} />
          <section className="">
            <button className="btn rounded-lg p-2 bg-[#144769]" type="submit" value="Enter!" > Enter </button>
          </section>
        </form>
      </div>
      <div className="shadow w-full sm:w-5/12 md:w-5/12 p-10 dark:bg-gray-700">
          THIS IS JUST DUMMY TEXT
      </div>
    </div>
>>>>>>> Stashed changes
    </>
  )
}

export default Dashboard