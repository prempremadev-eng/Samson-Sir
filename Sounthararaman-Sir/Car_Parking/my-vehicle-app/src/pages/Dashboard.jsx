
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
  
  const total = rows.length;
  const inCount = rows.filter((row)=>{
    return row.Status === 'IN'
  })
  const outCount = rows.filter((row)=> {return row.Status ==='OUT'})

  return (
    <div>    
    <h2>Dashboard</h2>
    {/* <p>{rows.length} vandi irukku</p> */}
    
    <div className="summary-row">
      <div className="summary-card">
        <span>👥</span>
        <span>{total}</span>
        <span>Total</span>
      </div>
      <div className="summary-card">
        <span>⬇️</span>
        <span>{inCount.length}</span>
        <span>IN</span>

      </div>
      <div className="summary-card">
        <span>⬆️</span>
        <span>{outCount.length}</span>
        <span>OUT</span>

      </div>


    </div>


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