
import {useState} from 'react'
import './App.css'
import Home from './pages/Home.jsx'
import VehicleOut from './pages/VehicleOut.jsx' 
import Dashboard from './pages/Dashboard.jsx'


function App() {
  const [page, setPage] = useState('home');
  
  return (
    <div>
      <h1>🚗 Lancor Entrance</h1>
      
      <button onClick={()=>setPage("home")}>Home</button>
      <button onClick={()=>setPage("out")}>VehicleOut</button>
       <button onClick={()=>setPage('dashboard')}>Dashboard </button>  

      {page ==='home' && <Home/>}
      {page==='out' && <VehicleOut /> }
      {page==='dashboard' && <Dashboard/>}
      
       </div>
  )
}

export default App