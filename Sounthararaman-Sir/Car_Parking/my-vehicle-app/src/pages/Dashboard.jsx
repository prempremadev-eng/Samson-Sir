
import {useEffect,useState} from 'react'
function Dashboard({onNavigate}) {
const [rows, setRows] = useState([]);
   useEffect(()=>{

    const loadRows = async ()=>{
      const response = await fetch(import.meta.env.VITE_API_BASE)
      const data = await response.json()
      console.log(data)  
      setRows(data.rows) 
    }
    loadRows()
  },[])
  

  return (
    <div>    
    <h2>Dashboard</h2>
    <p>{rows.length} vandi irukku</p>
    <ul className="record-list">
      { rows.map((row)=>(
        <li className="record-card" key={row.ROWID}>
          <div className="record-card-row">
            <span>{row.VehicleNumber}</span>
            <span>{row.Status}</span>
          </div>  
          <div className="record-card-meta">{row.EntryType}</div>
          <div className="record-card-meta">{row.InTime}</div>

        </li>
      ))

      }
    </ul>
    <button onClick={()=>onNavigate('home')}>Home</button>
    </div>
  )
}

export default Dashboard;