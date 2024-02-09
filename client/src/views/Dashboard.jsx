import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CsrfToken from '../components/CsrfToken';



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
    <div>
      <form className="" onSubmit={submitForm}>
        <section className="">
          <h2>Upload a Spreadsheet</h2>
        </section>
          <input name="spreadsheet" type="text" placeholder="enter spreadsheet" onChange={(e) => setSpreadsheet(e.target.value)} />
        <section className="">
          <input className="btn btn-primary" type="submit" value="Enter!" />
        </section>
      </form>
    </div>
  )
}

export default Dashboard