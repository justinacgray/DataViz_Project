import {useState, useEffect, useContext} from 'react'
import Home from './components/Home'
import Dashboard from './views/Dashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { DataframeProvider } from './context/DataframeContext.jsx'
import {CsrfProvider, CsrfContext} from './context/CsrfContext'

function App() {
  const {csrfToken, setCsrfToken} = useContext(CsrfContext)

  useEffect(() => {
    const getCSRFToken = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get_csrf/', {withCredentials: true});
        const newCsrfToken = response.data.csrfToken;
        setCsrfToken(newCsrfToken)
        console.log("RESPONSE from DB", response.data.csrfToken)
        // Set the CSRF token in the headers for subsequent requests
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };
    getCSRFToken();
  }, []);

  return (
    <div className="dark:bg-gray-400 bg-gray-200 min-h-screen flex flex-col">
    <Navbar/>
      <CsrfProvider>
        <DataframeProvider>
          <Dashboard className='flex-1'/>
        </DataframeProvider>
      </CsrfProvider>
    <Footer />
    </div>
  )
}

export default App
