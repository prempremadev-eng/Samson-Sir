const text = '{"vehicleNumber" : "TN09ABI234","name": "prem"}';
console.log(typeof text)
console.log(text.name)


const obj = JSON.parse(text)
console.log(typeof obj)
console.log(obj)
console.log(obj.name)

const back = JSON.stringify(obj)
console.log(typeof back)
console.log(back.name)

