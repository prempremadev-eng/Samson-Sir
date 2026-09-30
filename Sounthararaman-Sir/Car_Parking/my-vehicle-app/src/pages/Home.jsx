
function Home({onNavigate}) {
  return (
   <div>
    <h2>Welcome to Our App</h2>
    <button onClick={()=>onNavigate('in')}>VehicleIn</button>
    <button onClick={()=> onNavigate('out')}>VehicleOut</button>
   </div>
  )
}

export default Home