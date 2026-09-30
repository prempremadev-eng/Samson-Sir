
function Home({onNavigate}) {
  return (
   <div>
    <h2>Welcome to Our App</h2>
    <button onClick={()=>onNavigate('in','employee')}>Employee</button>
    <button onClick={()=>onNavigate('in','visitor')}>Visitor</button>
    <button onClick={()=>onNavigate('in','vendor')}>Vendor</button>
    
    <button onClick={()=> onNavigate('out')}>VehicleOut</button>
   </div>
  )
}

export default Home