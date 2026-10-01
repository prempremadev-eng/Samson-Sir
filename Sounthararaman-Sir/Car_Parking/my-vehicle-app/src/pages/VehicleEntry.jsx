import { useState } from "react"
import { useParams } from "react-router-dom"
import { ENTRY_TYPE_LABELS } from "../constants"



const emptyForm ={
    vehicleNumber : "",
    name: "",
    phoneNumber: ""
}

function VehicleEntry({onNavigate}) {
    const [form,setForm] = useState(emptyForm)
    const [error,setError] = useState('')
    const [success, setSuccess] = useState('')
   const {entryType} =  useParams();

   const entryTypeLabel = ENTRY_TYPE_LABELS[entryType] || 'Unknown'

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(!form.vehicleNumber.trim())
        {
            
            setError("Enter the vehicleNumber")
            setSuccess('')
            return 
        }
        // console.log('Saving:', form)
        setSuccess(`vehicleNumber ${form.vehicleNumber} added`)
        setForm(emptyForm)
        setError('')

    }
  return (
    
    <div className="page">
        <h2>{entryTypeLabel}</h2>
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}

        <form className="entry-form" onSubmit={handleSubmit}>
    

            <div className="field">
            <label>Vehicle Number</label>
            <input
                 value={form.vehicleNumber}
                 onChange={(e)=> setForm({...form, vehicleNumber: e.target.value})}
             /> 
             </div>

             <div className="field">
             <label>Name</label>
             <input
                   value={form.name}
                   onChange={(e)=> setForm({...form, name:e.target.value})}
             />
             </div>

             <div className="field"> 
            <label>Phone Number </label>  
             <input
                   value={form.phoneNumber}
                   onChange={(e)=> setForm({...form, phoneNumber:e.target.value})}
             /> 
              </div>           


            <button type="submit">Submit</button>
            {/* <pre>{JSON.stringify(form, null, 2)}</pre>    */}
        </form>
        <button onClick={()=>onNavigate('home')}>Home</button>
    </div>
  )
}

export default VehicleEntry