const data1 = '{"name":"prem"}'
const data2 = '';

const r1 = data1? 'data irukku': 'data illa ';
const r2 = data2? 'data irukku ': 'data illa'; 

console.log(r1);
console.log(r2)

console.log(0 ?'truthy':'falsy') // falsy
console.log(5 ? 'truthy':'falsy') // true
console.log('' ? 'truthy':'falsy')// falsy
console.log(' '? 'truthy':'false') // truthy
console.log(null ? 'truthy' : 'falsy')// falsy

console.log(undefined?'truthy' : 'false') // false
console.log('false' ? 'truthy':'falsy')// truthu
console.log(false?'truthy':'false') // false
console.log({} ? 'truthy': 'false') // truthy


// try{
//     JSON.parse('');
// }catch{
//     console.log('The Error message is ',  err.message);
// }


const datas = '';
const body = datas?JSON.parse(datas):{}
console.log(body)