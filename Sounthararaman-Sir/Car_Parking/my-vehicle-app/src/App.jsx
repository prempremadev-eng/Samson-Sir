
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import VehicleOut from './pages/VehicleOut.jsx' 
import Dashboard from './pages/Dashboard.jsx'

const PAGE_PATHS = {
  home: '/',
  out: '/out',
  dashboard: '/entries',

}

function App() {
  const navigate=  useNavigate();

  const handleNavigate =(page) =>{
    navigate (PAGE_PATHS[page] || '/')
  }
 
  
  return (
    <div>
      <h1>Lancor Entrance</h1>
      <button onClick={()=>handleNavigate('home')}>Home</button>
      <button onClick={()=>handleNavigate('out')}>VehicleOut</button>
      <button onClick={()=>handleNavigate('dashboard')}>Dashboard</button>
      

      <Routes>
        <Route path='/' element={<Home onNavigate={handleNavigate}/>}></Route> 
        <Route path='/out' element={<VehicleOut onNavigate={handleNavigate}/>}></Route>
        <Route path='/entries' element={<Dashboard onNavigate={handleNavigate}/>}></Route>
      </Routes>


    </div>
  )
} 

export default App;