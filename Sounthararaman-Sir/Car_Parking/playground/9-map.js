const rows = [
    {VehicleNumber: 'TN01',Name:'Ravi'},
    {VehicleNumber: 'TN02', Name:'Kumar'},
]
 const result = rows.map((row)=> {
    return row.VehicleNumber + ' - ' + row.Name
})
console.log(result)