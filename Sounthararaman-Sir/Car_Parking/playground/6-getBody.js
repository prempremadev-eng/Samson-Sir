const EventEmitter = require('events');

function getBody(req) {
    return new Promise((resolve)=>{

        let data ='';

        req.on('data',(chunk)=>{
            data +=chunk;
        })
        req.on('end',(chunk)=>{
            try{
                resolve(data?JSON.parse(data):{})
            }
            catch{
                resolve({});
            }
        })
    })
}

const req = new EventEmitter();

getBody(req).then((body)=>{
    console.log('Body kidaichathu:', body)
    console.log('Name:', body.name);
})

req.emit('data', '{"name":');
req.emit('data', '"prem"}')
req.emit('end');

// Test 1: sariyana body

const req1 = new EventEmitter();
getBody(req1).then((body)=>console.log('Test 1:', body));
req1.emit('data','{"name":"prem"}');
req1.emit('end');

// Test 2: body illa
const req2 = new EventEmitter();
getBody(req2).then((body)=>console.log('Test2 :', body));
req2.emit('end')

// Test 3 : thappana body
const req3 = new EventEmitter();
getBody(req3).then((body)=>console.log('Test 3:',body));
req3.emit('data','{"name":"divya"}')
req3.emit('end');