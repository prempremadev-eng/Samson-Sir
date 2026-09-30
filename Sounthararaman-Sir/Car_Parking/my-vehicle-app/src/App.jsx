import Home from './pages/Home.jsx'
import VehicleOut from './pages/VehicleOut.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { Route, Routes, useNavigate } from 'react-router-dom'
import VehicleEntry from './pages/VehicleEntry.jsx'

const PAGE_PATHS = {
  home: '/',
  out: '/out',
  dashboard: '/entries',
  in: '/in'
}

function App(){
  const navigate = useNavigate();
   
  const handleNavigate = (page)=>{
    navigate(PAGE_PATHS[page] || '/')
  }
  return (
   
    <div>
    <h2> Lancor Entrance</h2>

    <button onClick={()=>handleNavigate('home')}>Home</button>
    <button onClick={()=>handleNavigate('out')}>VehicleOut</button>
    <button onClick={()=>handleNavigate('dashboard')}>Dashboard</button>



    <Routes>
    <Route path='/' element={<Home onNavigate={handleNavigate}/>}></Route>
    <Route path='/out' element={<VehicleOut onNavigate={handleNavigate}/>}/>
    <Route path='/entries' element={<Dashboard onNavigate={handleNavigate}/>}/>
    <Route path='/in' element={<VehicleEntry onNavigate={handleNavigate}/>}/>
    </Routes>
    </div>
  )
}
export default App;