import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CsrfToken from '../components/CsrfToken';


const Dashboard = () => {
  const token = CsrfToken('XCSRF-TOKEN');
  console.log('CSRF Token:', token);
  
  const [spreadsheet, setSpreadsheet] = useState('');

  useEffect(() => {
    const getCSRFToken = async () => {
      try {
        const response = await axios.get('/api/get_token');
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
    axios.post(
      'http://localhost:8000/api/dash/',
      {},
      {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': token,
        },
      }
    )
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
          <input type="hidden" name="csrfmiddlewaretoken" value={token} />
        <section className="">
          <input className="btn btn-primary" type="submit" value="Enter!" />
        </section>
      </form>
      <p> ---------------------- </p>
   
    </div>
  )
}

export default Dashboard