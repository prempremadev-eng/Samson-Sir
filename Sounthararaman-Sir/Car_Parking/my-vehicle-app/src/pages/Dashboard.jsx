
function Dashboard({onNavigate}) {
  return (
    <div>    
    <h2>Dashboard</h2>
    <button onClick={()=>onNavigate('home')}>Home</button>
    </div>
  )
}

export default Dashboard;