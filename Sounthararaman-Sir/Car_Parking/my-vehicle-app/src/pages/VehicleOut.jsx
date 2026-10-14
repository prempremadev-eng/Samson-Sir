
import {useEffect,useState} from 'react'

function VehicleOut({onNavigate}) {

  const [rows,setRows] = useState([])

  useEffect(()=>{
    const loadRows = async ()=>{
      const response = await fetch(import.meta.env.VITE_API_BASE)
      const data = await response.json()
      console.log(data)
      setRows(data.rows.filter((row)=> { return row.Status==='IN'}))
    }
    loadRows()
  },[])

  const handleMarkOut = async(id) => {
    const response = await fetch(import.meta.env.VITE_API_BASE,{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({rowId:id})
    })
    if(!response.ok) return

    setRows(rows.filter((row)=> row.ROWID !== id))
  }

  return (
    <div>
    <h2>VehicleOut</h2>
   { rows.length ===0 && <p>No vehicles Parked</p>}
   <ul className="record-list">
    {
      rows.map((row)=>(
        <li className="record-card" key={row.ROWID}>
          <div className="record-card-row">
            <span>{row.VehicleNumber}</span>
            <button onClick={()=>{handleMarkOut(row.ROWID)}}>MarkOUT</button>
          </div>
          <div className="record-card-meta">{row.EntryType}</div>
          <div className="record-card-meta">🕐{row.InTime}</div>
        </li>
      ))
    }
   </ul>
    <button onClick={()=>onNavigate('home')}>Home</button>
    </div>
    )
    
}


export default VehicleOut