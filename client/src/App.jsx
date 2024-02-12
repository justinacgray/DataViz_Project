import './App.css'
import Home from './components/home'
import Dashboard from './views/Dashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  

  return (
    <div className="dark:bg-gray-400 bg-gray-200 min-h-screen flex flex-col">
    <Navbar/>
    <Dashboard className='flex-1'/>
    <Footer />
    </div>
  )
}

export default App
