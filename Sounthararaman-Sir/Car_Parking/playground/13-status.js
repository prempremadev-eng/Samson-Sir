const rows = [
  { VehicleNumber: 'TN01', Status: 'IN' },
  { VehicleNumber: 'TN02', Status: 'OUT' },
  { VehicleNumber: 'TN03', Status: 'IN' },
]   

const statusFilter = 'OUT'

const result = rows.filter((row)=>{
    return row.Status === statusFilter
})
console.log(result)