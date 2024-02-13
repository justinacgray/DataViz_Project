import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CsrfToken from '../components/CsrfToken';


const Dashboard = () => {
  const token = CsrfToken('XCSRF-TOKEN');
  console.log('CSRF Token:', token);
  
  const [file, setFile] = useState('')
  const [uploadStatus, setUploadStatus] = useState(null);

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
    const url = 'http://localhost:8000/api/dash/'
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config =  {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': token,
      },
    }
    axios.post(url, formData, config)
    .then((response)=>{
      console.log("RESPONSE---->", response)
    }).catch ((error) => {
      console.error('Error uploading file:', error);
      setUploadStatus('File upload failed');
      })
  }



    
  return (
    <>
      <form className="" onSubmit={submitForm}>
        <section className="">
          <h2>Upload a Spreadsheet</h2>
        </section>
          <input name="spreadsheet" type="file" placeholder="enter spreadsheet" onChange={(e) => setFile(e.target.files[0])} />
        <section className="">
          <button className= 'btn bg-[#7283ad]' >Upload</button>
        </section>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}

    </>

  )
}

export default Dashboard