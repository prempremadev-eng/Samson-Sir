function VehicleOut({onNavigate}){
    return (
        <div>
        <h1>Vehicle OUT </h1>
        <p>TN 12 TN 1222</p>

    <button onClick={()=>onNavigate('home')}>Home</button>    
        </div>
    )
}
export default VehicleOut;