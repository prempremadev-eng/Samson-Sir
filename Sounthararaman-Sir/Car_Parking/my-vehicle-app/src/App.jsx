
import {useState} from 'react'
import './App.css'
import Home from './pages/Home.jsx'
import VehicleOut from './pages/VehicleOut.jsx' 
import Dashboard from './pages/Dashboard.jsx'


function App({onNavigate}) {
  const [page, setPage] = useState('home');
  
  return (
    <div>
      <h1>🚗 Lancor Entrance</h1>
      
      <button onClick={()=>setPage("home")}>Home</button>
      <button onClick={()=>setPage("out")}>VehicleOut</button>
       <button onClick={()=>setPage('dashboard')}>Dashboard </button>  

      {page ==='home' && <Home onNavigate={setPage}/>}
      {page==='out' && <VehicleOut onNavigate={setPage} /> }
      {page==='dashboard' && <Dashboard onNavigate={setPage}/>}
      
       </div>
  )
}

export default App