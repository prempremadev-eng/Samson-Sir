
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
    <table>
      <thead>
        <tr>
          <th>VehicleNumber </th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody >
        {rows.map((row)=>(
         <tr key={row.ROWID}>
          <td>{row.VehicleNumber}</td>
          <td>{row.Name}</td>
         </tr> 
        ))}
        
      </tbody>
    </table>
    <button onClick={()=>onNavigate('home')}>Home</button>
    </div>
  )
}

export default Dashboard;