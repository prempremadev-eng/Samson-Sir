import {useState} from 'react'

function VehicleEntry({onNavigate}){
    const[vehicleNumber, setVehicleNumber] = useState('')
    return (
        <div>
            <h2>Vehicle IN</h2>

            <label>Vehicle Number</label>
            <input
                  value={vehicleNumber}
                  onChange={(e)=>setVehicleNumber(e.target.value)}
            />
            <p>you typed : {vehicleNumber}</p>
                  
         <button onClick={()=>onNavigate('home')}>Home</button>   
        </div>
    )
}
export default VehicleEntry;