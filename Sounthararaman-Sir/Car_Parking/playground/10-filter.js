const rows = [
    {vehicleNumber : 'TN01', Status: 'IN'},
    {vehicleNumber : 'TN02', Status: 'OUT'},
    {vehicleNumber : 'TN03', Status: 'IN'},
    
]

const inRow = rows.filter((row)=>{
    return row.Status==='IN'
})

console.log(inRow)
console.log(inRow.length)