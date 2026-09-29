import {useState} from 'react'


const emptyForm = {
    vehicleNumber: '',
    name: '',
    phoneNumber: '',
}



function VehicleEntry({onNavigate}){
    const[form, setForm] = useState(emptyForm)
    const[successMessage, setSuccessMessage] = useState('')
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log("saving, ", form)
        setSuccessMessage(`✅ ${form.vehicleNumber} saved!`)
        setForm(emptyForm)
    }


    return (
    <div>
        <form onSubmit={handleSubmit}>
        
            <h2>Vehicle IN</h2>
        {successMessage && <p>{successMessage}</p>}

            <label>Vehicle Number</label>
            <input
                  value={form.vehicleNumber}
                  onChange={(e)=>setForm({...form, vehicleNumber: e.target.value})}
            />

            <label>Name</label>
            <input
                  value={form.name}
                  onChange={(e)=>setForm({...form, name: e.target.value})}
            />

             <label>phone Number</label>
            <input
                  value={form.phoneNumber}
                  onChange={(e)=>setForm({...form, phoneNumber: e.target.value})}
            />

            <pre>{JSON.stringify(form, null, 2)}</pre>
                  
         
         <button type="submit">submit</button>  
        
        </form>
        <button onClick={()=>onNavigate('home')}>Home</button> 
        </div>

    )
}
export default VehicleEntry;