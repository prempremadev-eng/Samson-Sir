function Home({onNavigate}){
    return (

<div>
        <h2> Guard Home</h2>
        <button onClick={()=>onNavigate('in')} >Vehicle IN</button>
        <button onClick={()=>onNavigate('out')}>Vehicle OUT </button>
</div>
    )
}
export default Home;